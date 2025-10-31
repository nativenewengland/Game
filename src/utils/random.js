import { clamp } from './math.js';

export function hashString(value) {
  const input = typeof value === 'string' ? value : JSON.stringify(value);
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
    hash >>>= 0;
  }
  return hash >>> 0;
}

export function createRng(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let result = Math.imul(state ^ (state >>> 15), 1 | state);
    result ^= result + Math.imul(result ^ (result >>> 7), 61 | result);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomInt(rng, min, max) {
  if (max <= min) {
    return min;
  }
  const range = max - min + 1;
  return min + Math.floor(rng() * range);
}

export function pick(array, rng) {
  if (!Array.isArray(array) || array.length === 0) {
    return null;
  }
  const random = typeof rng === 'function' ? rng : Math.random;
  const index = clamp(Math.floor(random() * array.length), 0, array.length - 1);
  return array[index];
}
