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
  const holdTypes = new Set([
    'dwarfhold',
    'greatdwarfhold',
    'hillhold',
    'occupieddwarfhold',
    'occupyddwarfhold',
    'abandoneddwarfhold',
    'ruineddwarfhold'
  ]);
  if (!historyContext || !holdTypes.has(historyContext.type)) {
    return null;
  }

  const randomFn = typeof rng === 'function' ? rng : Math.random;
  const finalPopulation = Number.isFinite(historyContext?.details?.population)
    ? Math.max(0, Math.round(historyContext.details.population))
    : null;
  if (finalPopulation === null) {
    return null;
  }

  const yearsSpan = Number.isFinite(historyContext?.foundedYearsAgo)
    ? clamp(Math.round(historyContext.foundedYearsAgo), 40, 4200)
    : 360;
  const pointCount = clamp(Math.round(yearsSpan / 120) + 5, 6, 14);

  const typeKey = historyContext.type;
  const declineVariants = new Set(['occupieddwarfhold', 'occupyddwarfhold', 'abandoneddwarfhold', 'ruineddwarfhold']);
  const isDeclineVariant = declineVariants.has(typeKey);

  let peakPopulation;
  if (isDeclineVariant) {
    const baseline =
      finalPopulation > 0
        ? finalPopulation * (1.45 + randomFn() * 0.55)
        : 900 + randomFn() * 3200;
    peakPopulation = Math.round(Math.max(baseline, finalPopulation + 400 + randomFn() * 900));
  } else {
    const growthFactor = 1.08 + randomFn() * 0.35;
    const additiveBoost = 180 + randomFn() * 900;
    peakPopulation = Math.round(Math.max(finalPopulation, finalPopulation * growthFactor + additiveBoost));
  }
  if (finalPopulation > 0) {
    const maxMultiplier = isDeclineVariant ? 2.8 : 1.9;
    peakPopulation = Math.min(peakPopulation, Math.round(finalPopulation * maxMultiplier));
  } else {
    peakPopulation = Math.max(peakPopulation, 800);
  }

  const startPopulation = Math.max(40, Math.round(peakPopulation * (0.12 + randomFn() * 0.18)));
  const declineStart = isDeclineVariant ? 0.55 + randomFn() * 0.12 : 0.82 + randomFn() * 0.08;

  const timeline = [];
  const currentYear = Number.isFinite(historyContext?.currentYear) ? Math.round(historyContext.currentYear) : null;

  for (let index = 0; index < pointCount; index += 1) {
    const progress = pointCount === 1 ? 1 : index / (pointCount - 1);
    let targetValue;
    if (isDeclineVariant && progress >= declineStart) {
      const declineProgress = (progress - declineStart) / Math.max(1 - declineStart, 0.0001);
      const easedDecline = Math.pow(clamp(declineProgress, 0, 1), 0.85);
      targetValue = lerp(peakPopulation, finalPopulation, easedDecline);
    } else {
      const growthProgress = Math.min(progress / Math.max(declineStart, 0.0001), 1);
      const easedGrowth = 1 - Math.pow(1 - growthProgress, 1.6);
      const growthTarget = isDeclineVariant ? peakPopulation : finalPopulation;
      targetValue = lerp(startPopulation, growthTarget, easedGrowth);
    }
    const noiseAmplitude = isDeclineVariant ? 0.12 : 0.08;
    const jitter = targetValue * noiseAmplitude * (randomFn() - 0.5) * 2;
    let value = Math.max(0, Math.round(targetValue + jitter));
    if (index === 0) {
      value = startPopulation;
    } else if (index === pointCount - 1) {
      value = finalPopulation;
    } else if (!isDeclineVariant) {
      const previous = timeline[index - 1]?.population || startPopulation;
      value = Math.max(value, previous - Math.round(previous * 0.1));
    } else if (progress < declineStart) {
      const previous = timeline[index - 1]?.population || startPopulation;
      value = Math.max(value, previous);
    }

    const yearsAgo = Math.round(yearsSpan - progress * yearsSpan);
    const year = currentYear !== null ? Math.round(currentYear - yearsAgo) : null;

    timeline.push({
      population: value,
      value,
      yearsAgo,
      year
    });
  }

  return applyPopulationHistoryShocks(timeline, events, randomFn, {
    currentYear,
    finalPopulation
  });
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}
