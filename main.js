  const rawSeedValue = elements.seedInput ? elements.seedInput.value : state.settings.seedString;
  const seedString = (rawSeedValue || '').trim();
  if (elements.seedInput) {
    elements.seedInput.value = world.seedString;
  }
  if (elements.seedInput) {
    elements.seedInput.value = randomSeed;
  }
