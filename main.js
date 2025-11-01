function identifyPopulationShockEvents(events) {
  if (!Array.isArray(events) || events.length === 0) {
    return [];
  }

  return events
    .map((event) => {
      if (!event || typeof event.description !== 'string') {
        return null;
      }

      const normalizedDescription = event.description.toLowerCase();
      const includesSiege = normalizedDescription.includes('siege');
      const includesDragon = normalizedDescription.includes('dragon');
      const includesOnslaught = normalizedDescription.includes('onslaught');
      if (!includesSiege && !includesDragon && !includesOnslaught) {
        return null;
      }

      const yearsAgo = Number.isFinite(event.yearsAgo) ? Math.max(1, Math.round(event.yearsAgo)) : null;
      if (yearsAgo === null) {
        return null;
      }

      const severity = includesDragon || includesOnslaught ? 'dragon' : 'siege';
      return {
        yearsAgo,
        severity,
        description: event.description
      };
    })
    .filter((entry) => entry !== null)
    .sort((a, b) => b.yearsAgo - a.yearsAgo);
}

function applyPopulationHistoryShocks(timeline, events, rng, options = {}) {
  if (!Array.isArray(timeline) || timeline.length === 0) {
    return timeline;
  }

  const shockEvents = identifyPopulationShockEvents(events);
  if (shockEvents.length === 0) {
    return timeline;
  }

  const randomFn = typeof rng === 'function' ? rng : Math.random;
  const currentYear = Number.isFinite(options?.currentYear) ? Math.round(options.currentYear) : null;
  const finalPopulation = Number.isFinite(options?.finalPopulation)
    ? Math.max(0, Math.round(options.finalPopulation))
    : null;

  const adjustedTimeline = timeline.slice();

  shockEvents.forEach((event) => {
    const yearsAgo = event.yearsAgo;
    let insertIndex = adjustedTimeline.findIndex((point) =>
      Number.isFinite(point?.yearsAgo) && point.yearsAgo <= yearsAgo
    );
    if (insertIndex === -1) {
      insertIndex = adjustedTimeline.length;
    }

    const olderIndex = Math.max(0, insertIndex - 1);
    const olderPoint = adjustedTimeline[olderIndex];
    const newerPoint = adjustedTimeline[insertIndex] || adjustedTimeline[adjustedTimeline.length - 1];

    const olderYears = Number.isFinite(olderPoint?.yearsAgo) ? olderPoint.yearsAgo : yearsAgo;
    const newerYears = Number.isFinite(newerPoint?.yearsAgo) ? newerPoint.yearsAgo : yearsAgo;
    const olderPopulation = Number.isFinite(olderPoint?.population)
      ? olderPoint.population
      : Number.isFinite(newerPoint?.population)
      ? newerPoint.population
      : Number.isFinite(finalPopulation)
      ? finalPopulation
      : 0;
    const newerPopulation = Number.isFinite(newerPoint?.population)
      ? newerPoint.population
      : Number.isFinite(olderPoint?.population)
      ? olderPoint.population
      : Number.isFinite(finalPopulation)
      ? finalPopulation
      : 0;

    let baselinePopulation = newerPopulation;
    if (Number.isFinite(olderYears) && Number.isFinite(newerYears) && olderYears !== newerYears) {
      if (olderYears > newerYears) {
        const span = Math.max(olderYears - newerYears, 1);
        const position = clamp((yearsAgo - newerYears) / span, 0, 1);
        baselinePopulation = Math.round(lerp(newerPopulation, olderPopulation, position));
      } else {
        const span = Math.max(newerYears - olderYears, 1);
        const position = clamp((yearsAgo - olderYears) / span, 0, 1);
        baselinePopulation = Math.round(lerp(olderPopulation, newerPopulation, position));
      }
    } else if (Number.isFinite(olderPopulation)) {
      baselinePopulation = Math.round(olderPopulation);
    }

    const severityRange = event.severity === 'dragon' ? { min: 260, max: 620 } : { min: 160, max: 480 };
    const dropMagnitude = severityRange.min + randomFn() * (severityRange.max - severityRange.min);
    const safeDrop = Math.min(baselinePopulation, Math.round(dropMagnitude));
    const dipPopulation = Math.max(0, baselinePopulation - safeDrop);

    const eventYear = currentYear !== null ? Math.round(currentYear - yearsAgo) : null;
    const existingIndex = adjustedTimeline.findIndex(
      (point) => Number.isFinite(point?.yearsAgo) && point.yearsAgo === yearsAgo
    );

    if (existingIndex !== -1) {
      const updatedPoint = {
        ...adjustedTimeline[existingIndex],
        population: dipPopulation,
        value: dipPopulation,
        year: eventYear
      };
      adjustedTimeline.splice(existingIndex, 1, updatedPoint);
      insertIndex = existingIndex;
    } else {
      const newPoint = {
        population: dipPopulation,
        value: dipPopulation,
        yearsAgo,
        year: eventYear
      };
      adjustedTimeline.splice(insertIndex, 0, newPoint);
    }

  });

  return adjustedTimeline.sort((a, b) => {
    const aYears = Number.isFinite(a?.yearsAgo) ? a.yearsAgo : 0;
    const bYears = Number.isFinite(b?.yearsAgo) ? b.yearsAgo : 0;
    return bYears - aYears;
  });
}

function generateDwarfholdPopulationTimeline(historyContext, events, rng) {
  return applyPopulationHistoryShocks(timeline, events, randomFn, {
    currentYear,
    finalPopulation
  });
  const populationTimeline = generateDwarfholdPopulationTimeline(historyContext, events, rng);
