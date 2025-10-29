import { clamp } from './utils/math.js';

export const tileSheets = {
  base: {
    key: 'base',
    path: 'tilesheet/Overworld.png',
    tileSize: 32,
    image: null
  },
  worldDetails: {
    key: 'worldDetails',
    path: 'Dwarf.Fortress/data/vanilla/vanilla_world_map/graphics/images/world_map_details.png',
    tileSize: 16,
    image: null
  },
  worldEdgeGlacier: {
    key: 'worldEdgeGlacier',
    path: 'Dwarf.Fortress/data/vanilla/vanilla_world_map/graphics/images/world_map_edge_glacier.png',
    tileSize: 16,
    image: null
  },
  dwarfTest: {
    key: 'dwarfTest',
    path: 'Dwarf.Fortress/data/vanilla/vanilla_world_map/graphics/images/world_map_tiles.png',
    tileSize: 16,
    image: null
  }
};

export const dwarfSpriteSheets = {
  body: {
    key: 'body',
    path: 'Dwarf.Fortress/data/vanilla/vanilla_creatures_graphics/graphics/images/dwarf_body.png',
    tileSize: 32,
    image: null
  },
  eyes: {
    key: 'eyes',
    path: 'Dwarf.Fortress/data/vanilla/vanilla_creatures_graphics/graphics/images/dwarf_body_special.png',
    tileSize: 32,
    image: null
  },
  hair: {
    key: 'hair',
    path: 'Dwarf.Fortress/data/vanilla/vanilla_creatures_graphics/graphics/images/dwarf_hair_straight.png',
    tileSize: 32,
    image: null
  },
  hairCurly: {
    key: 'hairCurly',
    path: 'Dwarf.Fortress/data/vanilla/vanilla_creatures_graphics/graphics/images/dwarf_hair_curly.png',
    tileSize: 32,
    image: null
  }
};

export const characterCreatorPortraitAssets = {
  maleBody: {
    key: 'maleBody',
    path: 'tilesheet/Character Creator/body_male.png',
    image: null
  },
  femaleBody: {
    key: 'femaleBody',
    path: 'tilesheet/Character Creator/body_female.png',
    image: null
  },
  headDefault: {
    key: 'headDefault',
    path: 'tilesheet/Character Creator/head_default.png',
    image: null
  },
  beard1: {
    key: 'beard1',
    path: 'tilesheet/Character Creator/beard_1.png',
    image: null
  },
  beard2: {
    key: 'beard2',
    path: 'tilesheet/Character Creator/beard_2.png',
    image: null
  },
  beard3: {
    key: 'beard3',
    path: 'tilesheet/Character Creator/beard_3.png',
    image: null
  },
  beard4: {
    key: 'beard4',
    path: 'tilesheet/Character Creator/beard_4.png',
    image: null
  },
  beard5: {
    key: 'beard5',
    path: 'tilesheet/Character Creator/beard_5.png',
    image: null
  },
  beard6: {
    key: 'beard6',
    path: 'tilesheet/Character Creator/beard_6.png',
    image: null
  },
  beard7: {
    key: 'beard7',
    path: 'tilesheet/Character Creator/beard_7.png',
    image: null
  },
  beardRinged: {
    key: 'beardRinged',
    path: 'tilesheet/Character Creator/7.png',
    image: null
  },
  mustache: {
    key: 'mustache',
    path: 'tilesheet/Character Creator/mustache.png',
    image: null
  },
  hairShort: {
    key: 'hairShort',
    path: 'tilesheet/Character Creator/hair_3.png',
    image: null
  },
  hairMedium: {
    key: 'hairMedium',
    path: 'tilesheet/Character Creator/hair_1.png',
    image: null
  },
  hairLong: {
    key: 'hairLong',
    path: 'tilesheet/Character Creator/hair_2.png',
    image: null
  },
  hairBraided: {
    key: 'hairBraided',
    path: 'tilesheet/Character Creator/hair_4.png',
    image: null
  },
  nose: {
    key: 'nose',
    path: 'tilesheet/Character Creator/nose.png',
    image: null
  }
};

export const characterCreatorBeardAssetMap = {
  short: 'beard1',
  full: 'beard2',
  braided: 'beard3',
  forked: 'beard4',
  mutton: 'beard5',
  stubble: 'beard6',
  trimmed: 'beard6',
  goatee: 'beard6',
  imperial: 'mustache',
  wizard: 'beard7',
  ringed: 'beardRinged'
};

export const characterCreatorHairAssetMap = {
  short: 'hairShort',
  medium: 'hairMedium',
  long: 'hairLong',
  braided: 'hairBraided'
};

export const characterCreatorHairStyleCategoryMap = {
  bald: null,
  straight_shoulder: 'medium',
  straight_short: 'short',
  straight_braided: 'braided',
  curly_stubble: 'short',
  curly_short_unkempt: 'short',
  curly_mid_unkempt: 'medium',
  curly_long_unkempt: 'long',
  curly_short_combed: 'short',
  curly_mid_combed: 'medium',
  curly_long_combed: 'long',
  curly_short_braided: 'braided',
  curly_mid_braided: 'braided',
  curly_long_braided: 'braided',
  curly_short_double_braids: 'braided',
  curly_mid_double_braids: 'braided',
  curly_long_double_braids: 'braided'
};

export function normaliseHexColor(hex) {
  if (typeof hex !== 'string') {
    return '#000000';
  }
  let value = hex.trim();
  if (!value) {
    return '#000000';
  }
  if (!value.startsWith('#')) {
    value = `#${value}`;
  }
  const hexPart = value.slice(1);
  if (/^[0-9a-f]{3}$/i.test(hexPart)) {
    const expanded = hexPart
      .split('')
      .map((char) => char.repeat(2))
      .join('');
    return `#${expanded.toLowerCase()}`;
  }
  if (/^[0-9a-f]{6}$/i.test(hexPart)) {
    return `#${hexPart.toLowerCase()}`;
  }
  return '#000000';
}

export function hexToRgb(hex) {
  const normalised = normaliseHexColor(hex);
  const value = normalised.slice(1);
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return {
    r: Number.isNaN(r) ? 0 : r,
    g: Number.isNaN(g) ? 0 : g,
    b: Number.isNaN(b) ? 0 : b
  };
}

export const characterCreatorDefaultSkinColor = '#c47231';
export const characterCreatorDefaultHairColor = '#141015';

const characterCreatorSkinTintCache = new Map();
const characterCreatorHairTintCache = new Map();

const characterCreatorSkinBaseRgb = hexToRgb(characterCreatorDefaultSkinColor);
const characterCreatorSkinBaseColorSum = Math.max(
  characterCreatorSkinBaseRgb.r + characterCreatorSkinBaseRgb.g + characterCreatorSkinBaseRgb.b,
  1
);
const characterCreatorSkinBaseNormalised = {
  r: characterCreatorSkinBaseRgb.r / characterCreatorSkinBaseColorSum,
  g: characterCreatorSkinBaseRgb.g / characterCreatorSkinBaseColorSum,
  b: characterCreatorSkinBaseRgb.b / characterCreatorSkinBaseColorSum
};

function isCharacterCreatorSkinPixel(r, g, b, a) {
  if (a < 16) {
    return false;
  }
  const sum = r + g + b;
  if (sum === 0) {
    return false;
  }
  const brightnessRatio = sum / characterCreatorSkinBaseColorSum;
  if (brightnessRatio < 0.28 || brightnessRatio > 1.95) {
    return false;
  }
  const normalisedR = r / sum;
  const normalisedG = g / sum;
  const normalisedB = b / sum;
  const diffR = Math.abs(normalisedR - characterCreatorSkinBaseNormalised.r);
  const diffG = Math.abs(normalisedG - characterCreatorSkinBaseNormalised.g);
  const diffB = Math.abs(normalisedB - characterCreatorSkinBaseNormalised.b);
  return diffR + diffG + diffB <= 0.22;
}

function analyseCharacterCreatorSkinAsset(assetKey) {
  if (characterCreatorSkinTintCache.has(assetKey)) {
    return characterCreatorSkinTintCache.get(assetKey);
  }
  const asset = characterCreatorPortraitAssets[assetKey];
  const image = asset?.image;
  if (!image || !image.width || !image.height) {
    const fallback = {
      hasSkin: false,
      baseCanvas: null,
      tinted: new Map()
    };
    characterCreatorSkinTintCache.set(assetKey, fallback);
    return fallback;
  }
  const width = image.width;
  const height = image.height;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    const fallback = {
      hasSkin: false,
      baseCanvas: null,
      tinted: new Map()
    };
    characterCreatorSkinTintCache.set(assetKey, fallback);
    return fallback;
  }
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  const { data } = imageData;
  const pixelCount = width * height;
  const mask = new Uint8Array(pixelCount);
  const alpha = new Uint8Array(pixelCount);
  const multiplierR = new Float32Array(pixelCount);
  const multiplierG = new Float32Array(pixelCount);
  const multiplierB = new Float32Array(pixelCount);
  let hasSkin = false;
  for (let i = 0, p = 0; i < data.length; i += 4, p += 1) {
    const a = data[i + 3];
    if (a < 16) {
      continue;
    }
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (isCharacterCreatorSkinPixel(r, g, b, a)) {
      mask[p] = 1;
      alpha[p] = a;
      const safeR = characterCreatorSkinBaseRgb.r || 1;
      const safeG = characterCreatorSkinBaseRgb.g || 1;
      const safeB = characterCreatorSkinBaseRgb.b || 1;
      multiplierR[p] = clamp(r / safeR, 0.15, 2.4);
      multiplierG[p] = clamp(g / safeG, 0.15, 2.4);
      multiplierB[p] = clamp(b / safeB, 0.15, 2.4);
      data[i + 3] = 0;
      hasSkin = true;
    }
  }
  if (hasSkin) {
    ctx.putImageData(imageData, 0, 0);
  }
  const analysis = {
    hasSkin,
    baseCanvas: canvas,
    mask,
    alpha,
    multiplierR,
    multiplierG,
    multiplierB,
    tinted: new Map()
  };
  characterCreatorSkinTintCache.set(assetKey, analysis);
  return analysis;
}

function createCharacterCreatorSkinTintCanvas(analysis, colorHex) {
  const { baseCanvas, mask, alpha, multiplierR, multiplierG, multiplierB } = analysis;
  if (!baseCanvas || !mask || !multiplierR || !multiplierG || !multiplierB) {
    return null;
  }
  const tint = hexToRgb(colorHex);
  const width = baseCanvas.width;
  const height = baseCanvas.height;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return null;
  }
  const imageData = ctx.createImageData(width, height);
  const { data } = imageData;
  for (let i = 0, p = 0; p < mask.length; i += 4, p += 1) {
    if (!mask[p]) {
      continue;
    }
    const alphaValue = alpha[p];
    if (alphaValue <= 0) {
      continue;
    }
    data[i] = clamp(Math.round(tint.r * multiplierR[p]), 0, 255);
    data[i + 1] = clamp(Math.round(tint.g * multiplierG[p]), 0, 255);
    data[i + 2] = clamp(Math.round(tint.b * multiplierB[p]), 0, 255);
    data[i + 3] = alphaValue;
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

export function getCharacterCreatorSkinTintLayers(assetKey, tintColor) {
  const analysis = analyseCharacterCreatorSkinAsset(assetKey);
  if (!analysis || !analysis.hasSkin || !analysis.baseCanvas) {
    return null;
  }
  const colourKey = normaliseHexColor(tintColor || characterCreatorDefaultSkinColor);
  let tintedCanvas = analysis.tinted.get(colourKey);
  if (!tintedCanvas) {
    tintedCanvas = createCharacterCreatorSkinTintCanvas(analysis, colourKey);
    if (tintedCanvas) {
      analysis.tinted.set(colourKey, tintedCanvas);
    }
  }
  if (!tintedCanvas) {
    return null;
  }
  return {
    baseCanvas: analysis.baseCanvas,
    tintedCanvas
  };
}

function analyseCharacterCreatorHairAsset(assetKey) {
  if (characterCreatorHairTintCache.has(assetKey)) {
    return characterCreatorHairTintCache.get(assetKey);
  }
  const asset = characterCreatorPortraitAssets[assetKey];
  const image = asset?.image;
  if (!image || !image.width || !image.height) {
    const fallback = {
      hasHair: false,
      baseCanvas: null,
      tinted: new Map()
    };
    characterCreatorHairTintCache.set(assetKey, fallback);
    return fallback;
  }
  const width = image.width;
  const height = image.height;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    const fallback = {
      hasHair: false,
      baseCanvas: null,
      tinted: new Map()
    };
    characterCreatorHairTintCache.set(assetKey, fallback);
    return fallback;
  }
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  const { data } = imageData;
  const pixelCount = width * height;
  const mask = new Uint8Array(pixelCount);
  const alpha = new Uint8Array(pixelCount);
  const multiplierR = new Float32Array(pixelCount);
  const multiplierG = new Float32Array(pixelCount);
  const multiplierB = new Float32Array(pixelCount);
  let hasHair = false;
  for (let i = 0, p = 0; i < data.length; i += 4, p += 1) {
    const a = data[i + 3];
    if (a < 8) {
      continue;
    }
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r + g + b <= 0) {
      continue;
    }
    mask[p] = 1;
    alpha[p] = a;
    multiplierR[p] = clamp(r / 255, 0.05, 1.2);
    multiplierG[p] = clamp(g / 255, 0.05, 1.2);
    multiplierB[p] = clamp(b / 255, 0.05, 1.2);
    data[i] = 0;
    data[i + 1] = 0;
    data[i + 2] = 0;
    data[i + 3] = 0;
    hasHair = true;
  }
  if (hasHair) {
    ctx.putImageData(imageData, 0, 0);
  }
  const analysis = {
    hasHair,
    baseCanvas: canvas,
    mask,
    alpha,
    multiplierR,
    multiplierG,
    multiplierB,
    tinted: new Map()
  };
  characterCreatorHairTintCache.set(assetKey, analysis);
  return analysis;
}

function createCharacterCreatorHairTintCanvas(analysis, colorHex) {
  const { baseCanvas, mask, alpha, multiplierR, multiplierG, multiplierB } = analysis;
  if (!baseCanvas || !mask || !alpha || !multiplierR || !multiplierG || !multiplierB) {
    return null;
  }
  const tint = hexToRgb(colorHex);
  const width = baseCanvas.width;
  const height = baseCanvas.height;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return null;
  }
  const imageData = ctx.createImageData(width, height);
  const { data } = imageData;
  for (let i = 0, p = 0; p < mask.length; i += 4, p += 1) {
    if (!mask[p]) {
      continue;
    }
    const alphaValue = alpha[p];
    if (alphaValue <= 0) {
      continue;
    }
    data[i] = clamp(Math.round(tint.r * multiplierR[p]), 0, 255);
    data[i + 1] = clamp(Math.round(tint.g * multiplierG[p]), 0, 255);
    data[i + 2] = clamp(Math.round(tint.b * multiplierB[p]), 0, 255);
    data[i + 3] = alphaValue;
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

export function getCharacterCreatorHairTintLayers(assetKey, tintColor) {
  if (!assetKey) {
    return null;
  }
  const analysis = analyseCharacterCreatorHairAsset(assetKey);
  if (!analysis || !analysis.hasHair || !analysis.baseCanvas) {
    return null;
  }
  const colourKey = normaliseHexColor(tintColor || characterCreatorDefaultHairColor);
  let tintedCanvas = analysis.tinted.get(colourKey);
  if (!tintedCanvas) {
    tintedCanvas = createCharacterCreatorHairTintCanvas(analysis, colourKey);
    if (tintedCanvas) {
      analysis.tinted.set(colourKey, tintedCanvas);
    }
  }
  if (!tintedCanvas) {
    return null;
  }
  return {
    baseCanvas: analysis.baseCanvas,
    tintedCanvas
  };
}

export const baseTileCoords = {
  SAND: { row: 0, col: 0 },
  GRASS: { row: 0, col: 1 },
  BADLANDS: { row: 1, col: 2 },
  MINE: { row: 1, col: 3 },
  MARSH: { row: 4, col: 2 },
  SNOW: { row: 2, col: 3 },
  TREE: { row: 1, col: 0 },
  TREE_LONE: { row: 5, col: 6 },
  TREE_SNOW: { row: 1, col: 1 },
  JUNGLE_TREE: { row: 3, col: 0 },
  CUT_TREES: { row: 6, col: 1 },
  AMBIENT_LUMBER_MILL: { row: 6, col: 0 },
  WATER: { row: 1, col: 4 },
  MOUNTAIN: { row: 0, col: 3 },
  MOUNTAIN_TOP_A: { row: 0, col: 4 },
  MOUNTAIN_TOP_B: { row: 0, col: 5 },
  MOUNTAIN_BOTTOM_A: { row: 0, col: 7 },
  MOUNTAIN_BOTTOM_B: { row: 0, col: 8 },
  DAM: { row: 1, col: 8 },
  MOUNTAIN_PEAK: { row: 0, col: 10 },
  STONE: { row: 0, col: 2 },
  DWARFHOLD: { row: 2, col: 9 },
  ABANDONED_DWARFHOLD: { row: 2, col: 8 },
  GREAT_DWARFHOLD: { row: 0, col: 6 },
  HILLHOLD: { row: 2, col: 10 },
  CAVE: { row: 1, col: 5 },
  TOWER: { row: 1, col: 6 },
  EVIL_WIZARDS_TOWER: { row: 3, col: 3 },
  WOOD_ELF_GROVES: { row: 2, col: 4 },
  WOOD_ELF_GROVES_LARGE: { row: 2, col: 5 },
  WOOD_ELF_GROVES_GRAND: { row: 2, col: 6 },
  HILLS: { row: 3, col: 1 },
  HILLS_BADLANDS: { row: 4, col: 1 },
  HILLS_VARIANT_A: { row: 4, col: 4 },
  HILLS_VARIANT_B: { row: 5, col: 2 },
  HILLS_SNOW: { row: 3, col: 2 },
  TOWN: { row: 2, col: 1 },
  PORT_TOWN: { row: 4, col: 5 },
  CASTLE: { row: 4, col: 6 },
  ROADSIDE_TAVERN: { row: 1, col: 12 },
  HAMLET: { row: 1, col: 13 },
  ACTIVE_VOLCANO: { row: 2, col: 12 },
  VOLCANO: { row: 2, col: 13 },
  LAVA: { row: 2, col: 14 },
  OASIS: { row: 0, col: 12 },
  HAMLET_SNOW: { row: 0, col: 13 },
  AMBIENT_SLEEPING_DRAGON: { row: 0, col: 14 },
  AMBIENT_MOONWELL: { row: 6, col: 2 },
  AMBIENT_FARM: { row: 1, col: 15 },
  AMBIENT_GREAT_TREE: { row: 1, col: 14 },
  AMBIENT_GREAT_TREE_ALT: { row: 2, col: 14 },
  LIZARDMEN_CITY: { row: 2, col: 11 },
  SAINT_SHRINE: { row: 1, col: 11 },
  MONASTERY: { row: 2, col: 2 },
  ORC_CAMP: { row: 6, col: 0 },
  GNOLL_CAMP: { row: 6, col: 0 },
  TROLL_CAMP: { row: 6, col: 0 },
  OGRE_CAMP: { row: 6, col: 0 },
  BANDIT_CAMP: { row: 6, col: 0 },
  TRAVELERS_CAMP: { row: 6, col: 0 },
  DUNGEON: { row: 2, col: 7 },
  CENTAUR_ENCAMPMENT: { row: 2, col: 10 }
};

export const ROAD_DIRECTION_BITS = {
  NORTH: 1,
  EAST: 2,
  SOUTH: 4,
  WEST: 8
};

export const roadTileSpriteDefinitions = (() => {
  const sheet = tileSheets.base;
  if (!sheet) {
    return null;
  }
  const tileSize = sheet.tileSize;
  const row = 4;
  const makeDefinition = (column) => ({
    sheetKey: sheet.key,
    sx: column * tileSize,
    sy: row * tileSize,
    size: tileSize
  });

  return {
    isolated: makeDefinition(18),
    deadEndWest: makeDefinition(21),
    straightEastWest: makeDefinition(8),
    cornerNorthEast: makeDefinition(11),
    cornerSouthEast: makeDefinition(9),
    cornerSouthWest: makeDefinition(10),
    cornerNorthWest: makeDefinition(12),
    teeMissingWest: makeDefinition(13),
    teeMissingEast: makeDefinition(16),
    teeMissingNorth: makeDefinition(14),
    teeMissingSouth: makeDefinition(15),
    cross: makeDefinition(17)
  };
})();

export const riverTileCoords = {
  RIVER_NS: { row: 4, col: 0 },
  RIVER_WE: { row: 4, col: 1 },
  RIVER_SE: { row: 4, col: 2 },
  RIVER_SW: { row: 4, col: 3 },
  RIVER_NE: { row: 4, col: 4 },
  RIVER_NW: { row: 4, col: 5 },
  RIVER_NSE: { row: 4, col: 6 },
  RIVER_SWE: { row: 4, col: 7 },
  RIVER_NWE: { row: 4, col: 8 },
  RIVER_NSW: { row: 4, col: 9 },
  RIVER_NSWE: { row: 4, col: 10 },
  RIVER_0: { row: 4, col: 11 },
  RIVER_N: { row: 4, col: 12 },
  RIVER_S: { row: 4, col: 13 },
  RIVER_W: { row: 4, col: 14 },
  RIVER_E: { row: 4, col: 15 },
  RIVER_MAJOR_NS: { row: 5, col: 0 },
  RIVER_MAJOR_WE: { row: 5, col: 1 },
  RIVER_MAJOR_SE: { row: 5, col: 2 },
  RIVER_MAJOR_SW: { row: 5, col: 3 },
  RIVER_MAJOR_NE: { row: 5, col: 4 },
  RIVER_MAJOR_NW: { row: 5, col: 5 },
  RIVER_MAJOR_NSE: { row: 5, col: 6 },
  RIVER_MAJOR_SWE: { row: 5, col: 7 },
  RIVER_MAJOR_NWE: { row: 5, col: 8 },
  RIVER_MAJOR_NSW: { row: 5, col: 9 },
  RIVER_MAJOR_NSWE: { row: 5, col: 10 },
  RIVER_MAJOR_0: { row: 5, col: 11 },
  RIVER_MAJOR_N: { row: 5, col: 12 },
  RIVER_MAJOR_S: { row: 5, col: 13 },
  RIVER_MAJOR_W: { row: 5, col: 14 },
  RIVER_MAJOR_E: { row: 5, col: 15 },
  RIVER_MOUTH_NARROW_N: { row: 7, col: 12 },
  RIVER_MOUTH_NARROW_S: { row: 7, col: 13 },
  RIVER_MOUTH_NARROW_W: { row: 7, col: 14 },
  RIVER_MOUTH_NARROW_E: { row: 7, col: 15 },
  RIVER_MAJOR_MOUTH_NARROW_N: { row: 8, col: 12 },
  RIVER_MAJOR_MOUTH_NARROW_S: { row: 8, col: 13 },
  RIVER_MAJOR_MOUTH_NARROW_W: { row: 8, col: 14 },
  RIVER_MAJOR_MOUTH_NARROW_E: { row: 8, col: 15 }
};

const icebergTileOptions = [
  { row: 3, col: 4 },
  { row: 3, col: 5 }
];

export const icebergTileCoords = (() => {
  const keys = ['ICEBERG_SURROUND_1', 'ICEBERG_SURROUND_2'];
  return keys.reduce((coords, key, index) => {
    const option = icebergTileOptions[index % icebergTileOptions.length];
    coords[key] = { ...option };
    return coords;
  }, {});
})();

export const tileLookup = new Map();

export function registerTiles(sheetKey, coordMap) {
  const sheet = tileSheets[sheetKey];
  if (!sheet) {
    return;
  }
  Object.entries(coordMap).forEach(([name, coords]) => {
    tileLookup.set(name, {
      sheet: sheetKey,
      sx: coords.col * sheet.tileSize,
      sy: coords.row * sheet.tileSize,
      size: sheet.tileSize
    });
  });
}

export function registerCustomStructure(key, drawFn) {
  if (!key || typeof drawFn !== 'function') {
    return;
  }
  if (tileLookup.has(key)) {
    return;
  }
  tileLookup.set(key, {
    sheet: null,
    sx: 0,
    sy: 0,
    size: tileSheets.base?.tileSize || 32,
    draw: drawFn
  });
}
