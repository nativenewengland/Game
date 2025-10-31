function getSeedStringFromInputs() {
  if (elements.seedInput && typeof elements.seedInput.value === 'string') {
    return elements.seedInput.value.trim();
  }
  return (state.settings.seedString || '').trim();
}

function syncSeedInputs(seedValue) {
  if (elements.seedInput) {
    elements.seedInput.value = seedValue;
  }
  if (elements.worldSeedInput) {
    elements.worldSeedInput.value = seedValue;
  }
}

  const seedString = getSeedStringFromInputs();
  syncSeedInputs(world.seedString);
  syncSeedInputs(randomSeed);
  syncSeedInputs(state.settings.seedString);
