      if (!entry) {
        return null;
      }
      if (!Number.isFinite(rawPercentage) || rawPercentage <= 0) {
        return null;
      }
      const safePercentage = Math.max(0, rawPercentage);
          Number.isFinite(Number(entry.population)) && Number(entry.population) > 0
            ? Math.max(0, Math.round(Number(entry.population)))
    })
    .filter(Boolean);
      if (!entry) {
      if (!Number.isFinite(rawPercentage) || rawPercentage <= 0) {
        return null;
      }
      const safePercentage = Math.max(0, rawPercentage);
      const rawPopulation = Number(entry.population);
      const population = Number.isFinite(rawPopulation) && rawPopulation > 0
        ? Math.max(0, Math.round(rawPopulation))
