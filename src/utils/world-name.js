import { createRng, hashString, pick } from './random.js';

const WORLD_NAME_PREFIXES = ['Stone', 'Iron', 'Deep', 'Rune', 'Hammer', 'Anvil', 'Frost', 'Ember'];
const WORLD_NAME_SUFFIXES = ['home', 'reach', 'delve', 'spire', 'hall', 'keep', 'hold', 'forge'];

export function generateWorldName(rng = Math.random) {
  const random = typeof rng === 'function' ? rng : Math.random;
  const prefix = pick(WORLD_NAME_PREFIXES, random) || 'Stone';
  const suffix = pick(WORLD_NAME_SUFFIXES, random) || 'hold';
  return `${prefix}${suffix}`;
}

export function getRandomWorldName(currentName = '') {
  const rng = createRng(hashString(`${currentName}:${Date.now()}`));
  return generateWorldName(rng);
}
