const drawSize = 32;
const defaultWorldGenerationType = 'normal';

const tileSheets = {
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
  }
};

const dwarfSpriteSheets = {
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

const characterCreatorPortraitAssets = {
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

const characterCreatorBeardAssetMap = {
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

const characterCreatorHairAssetMap = {
  short: 'hairShort',
  medium: 'hairMedium',
  long: 'hairLong',
  braided: 'hairBraided'
};

const characterCreatorHairStyleCategoryMap = {
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

function normaliseHexColor(hex) {
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

function hexToRgb(hex) {
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

const characterCreatorSkinTintCache = new Map();
const characterCreatorHairTintCache = new Map();
const characterCreatorDefaultSkinColor = '#c47231';
const characterCreatorDefaultHairColor = '#141015';
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

function getCharacterCreatorSkinTintLayers(assetKey, tintColor) {
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

function getCharacterCreatorHairTintLayers(assetKey, tintColor) {
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

const baseTileCoords = {
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
  HILLS: { row: 3, col: 1 },
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
  OASIS: { row: 0, col: 12 },
  HAMLET_SNOW: { row: 0, col: 13 },
  LIZARDMEN_CITY: { row: 2, col: 11 },
  SAINT_SHRINE: { row: 1, col: 11 },
  MONASTERY: { row: 2, col: 2 },
  ORC_CAMP: { row: 6, col: 0 },
  TRAVELERS_CAMP: { row: 6, col: 0 },
  DUNGEON: { row: 2, col: 7 }
};

const ROAD_DIRECTION_BITS = {
  NORTH: 1,
  EAST: 2,
  SOUTH: 4,
  WEST: 8
};

const roadTileSpriteDefinitions = (() => {
  const sheet = tileSheets.base;
  if (!sheet) {
    return null;
  }
  const tileSize = sheet.tileSize;
  const row = 5;
  const makeDefinition = (column) => ({
    sheetKey: sheet.key,
    sx: column * tileSize,
    sy: row * tileSize,
    size: tileSize
  });

  return {
    isolated: makeDefinition(18),
    deadEndWest: makeDefinition(2),
    straightEastWest: makeDefinition(8),
    cornerNorthEast: makeDefinition(11),
    cornerSouthEast: makeDefinition(9),
    cornerSouthWest: makeDefinition(10),
    cornerNorthWest: makeDefinition(12),
    teeMissingWest: makeDefinition(7),
    teeMissingEast: makeDefinition(1),
    teeMissingNorth: makeDefinition(14),
    teeMissingSouth: makeDefinition(15),
    cross: makeDefinition(16)
  };
})();

const riverTileCoords = {
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

const icebergTileCoords = (() => {
  const keys = ['ICEBERG_SURROUND_1', 'ICEBERG_SURROUND_2'];
  return keys.reduce((coords, key, index) => {
    const option = icebergTileOptions[index % icebergTileOptions.length];
    coords[key] = { ...option };
    return coords;
  }, {});
})();

const tileLookup = new Map();

function registerCustomStructure(key, drawFn) {
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
    size: drawSize,
    draw: drawFn
  });
}

function drawHamletStructure(ctx, { pixelX, pixelY, size }) {
  ctx.save();
  ctx.translate(pixelX, pixelY);

  const groundRadius = size * 0.46;
  ctx.fillStyle = '#6a8c3a';
  ctx.beginPath();
  ctx.arc(size * 0.5, size * 0.58, groundRadius, 0, Math.PI * 2);
  ctx.fill();

  const hutWidth = size * 0.26;
  const hutHeight = size * 0.2;

  ctx.fillStyle = '#d2b48c';
  ctx.fillRect(size * 0.18, size * 0.42, hutWidth, hutHeight);
  ctx.fillRect(size * 0.56, size * 0.48, hutWidth, hutHeight);

  ctx.fillStyle = '#8b5a2b';
  ctx.beginPath();
  ctx.moveTo(size * 0.18, size * 0.42);
  ctx.lineTo(size * 0.31, size * 0.3);
  ctx.lineTo(size * 0.44, size * 0.42);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(size * 0.56, size * 0.48);
  ctx.lineTo(size * 0.69, size * 0.36);
  ctx.lineTo(size * 0.82, size * 0.48);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#c8c79b';
  ctx.beginPath();
  ctx.arc(size * 0.45, size * 0.66, size * 0.08, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#3f2d16';
  ctx.lineWidth = Math.max(1, size * 0.03);
  ctx.beginPath();
  ctx.moveTo(size * 0.3, size * 0.52);
  ctx.lineTo(size * 0.3, size * 0.62);
  ctx.moveTo(size * 0.68, size * 0.56);
  ctx.lineTo(size * 0.68, size * 0.66);
  ctx.stroke();

  ctx.restore();
}

function drawCastleStructure(ctx, { pixelX, pixelY, size }) {
  ctx.save();
  ctx.translate(pixelX, pixelY);
  ctx.fillStyle = '#5b666f';
  ctx.fillRect(size * 0.12, size * 0.3, size * 0.76, size * 0.5);
  ctx.fillStyle = '#77828b';
  ctx.fillRect(size * 0.18, size * 0.36, size * 0.64, size * 0.38);

  ctx.fillStyle = '#4a545c';
  const towerWidth = size * 0.2;
  ctx.fillRect(size * 0.12, size * 0.18, towerWidth, size * 0.42);
  ctx.fillRect(size * 0.68, size * 0.18, towerWidth, size * 0.42);

  ctx.fillStyle = '#2a2f33';
  ctx.fillRect(size * 0.44, size * 0.54, size * 0.12, size * 0.26);

  ctx.fillStyle = '#c7352d';
  ctx.beginPath();
  ctx.moveTo(size * 0.5, size * 0.18);
  ctx.lineTo(size * 0.6, size * 0.32);
  ctx.lineTo(size * 0.4, size * 0.32);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#32393f';
  ctx.lineWidth = Math.max(1, size * 0.03);
  ctx.beginPath();
  const merlonCount = 4;
  for (let i = 0; i < merlonCount; i += 1) {
    const startX = size * 0.22 + (size * 0.56 * i) / merlonCount;
    ctx.moveTo(startX, size * 0.32);
    ctx.lineTo(startX + size * 0.08, size * 0.32);
  }
  ctx.stroke();
  ctx.restore();
}

function drawRoadsideTavernStructure(ctx, { pixelX, pixelY, size }) {
  ctx.save();
  ctx.translate(pixelX, pixelY);
  const baseWidth = size * 0.74;
  const baseHeight = size * 0.44;
  const baseX = (size - baseWidth) / 2;
  const baseY = size * 0.38;

  ctx.fillStyle = '#c7a06b';
  ctx.fillRect(baseX, baseY, baseWidth, baseHeight);

  ctx.fillStyle = '#854c30';
  ctx.beginPath();
  ctx.moveTo(baseX - size * 0.04, baseY);
  ctx.lineTo(size / 2, size * 0.18);
  ctx.lineTo(baseX + baseWidth + size * 0.04, baseY);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#56311f';
  ctx.fillRect(baseX + baseWidth * 0.36, baseY + baseHeight * 0.38, baseWidth * 0.16, baseHeight * 0.62);

  ctx.fillStyle = '#f1d8a5';
  ctx.fillRect(baseX + baseWidth * 0.14, baseY + baseHeight * 0.28, baseWidth * 0.16, baseHeight * 0.32);
  ctx.fillRect(baseX + baseWidth * 0.7, baseY + baseHeight * 0.28, baseWidth * 0.16, baseHeight * 0.32);

  ctx.fillStyle = '#d27d2c';
  ctx.fillRect(baseX + baseWidth * 0.82, baseY + baseHeight * 0.1, baseWidth * 0.14, baseHeight * 0.28);

  ctx.fillStyle = '#311a10';
  ctx.fillRect(baseX + baseWidth * 0.86, baseY + baseHeight * 0.24, baseWidth * 0.06, baseHeight * 0.18);

  ctx.restore();
}

const TOWN_ROAD_OVERLAY_KEY = 'TOWN_ROAD';

const hillOverlayKeySet = new Set(['HILLS', 'HILLS_VARIANT_A', 'HILLS_VARIANT_B', 'HILLS_SNOW']);
const treeOverlayKeySet = new Set(['TREE', 'TREE_LONE', 'TREE_SNOW', 'JUNGLE_TREE']);
const jungleOverlayKey = 'JUNGLE_TREE';

const volcanoOverlayKeySet = new Set(['VOLCANO', 'ACTIVE_VOLCANO']);
const isVolcanoOverlayKey = (key) => typeof key === 'string' && volcanoOverlayKeySet.has(key);
const isMountainOverlayKey = (key) =>
  typeof key === 'string' && (key.startsWith('MOUNTAIN') || isVolcanoOverlayKey(key));
const isHillOverlayKey = (key) => typeof key === 'string' && hillOverlayKeySet.has(key);
const isTreeOverlayKey = (key) => typeof key === 'string' && treeOverlayKeySet.has(key);
const tileHasTreeOverlay = (tile) =>
  Boolean(tile) && (isTreeOverlayKey(tile.overlay) || isTreeOverlayKey(tile.hillOverlay));
const isJungleOverlayKey = (key) => typeof key === 'string' && key === jungleOverlayKey;
const tileHasJungleOverlay = (tile) =>
  Boolean(tile) && (isJungleOverlayKey(tile.overlay) || isJungleOverlayKey(tile.hillOverlay));
const townSettlementTypes = new Set(['town', 'city', 'village']);
const isTownSettlementDetails = (details) =>
  Boolean(details) &&
  details.isSettlement === true &&
  typeof details.type === 'string' &&
  townSettlementTypes.has(details.type);
const tileHasTownSettlement = (tile) => isTownSettlementDetails(tile?.structureDetails);

function evaluateFactionTileSuitability(faction, tile, x, y) {
  if (!faction || !tile) {
    return 0;
  }

  const type =
    (faction.capital && typeof faction.capital.type === 'string' && faction.capital.type) || 'settlement';

  switch (type) {
    case 'hillhold':
    case 'dwarfhold': {
      if (
        tile.structure === 'DWARFHOLD' ||
        tile.structure === 'GREAT_DWARFHOLD' ||
        tile.structure === 'ABANDONED_DWARFHOLD' ||
        tile.structure === 'HILLHOLD'
      ) {
        return 1;
      }
      if (isMountainOverlayKey(tile.overlay) || isMountainOverlayKey(tile.hillOverlay)) {
        return 1;
      }
      if (isHillOverlayKey(tile.overlay) || isHillOverlayKey(tile.hillOverlay)) {
        return 0.45;
      }
      return 0;
    }
    case 'woodElfGrove': {
      if (tile.structure === 'WOOD_ELF_GROVES') {
        return 1;
      }
      if (tileHasTreeOverlay(tile)) {
        return 1;
      }
      return 0;
    }
    case 'lizardmenCity': {
      if (tile.structure === 'LIZARDMEN_CITY') {
        return 1;
      }
      if (tile.base === 'WATER') {
        return 0;
      }
      if (tileHasJungleOverlay(tile)) {
        return 1;
      }
      if (tileHasTreeOverlay(tile)) {
        return 0.3;
      }
      return 0;
    }
    case 'tower':
    case 'evilWizardTower': {
      if (tile.base === 'WATER') {
        return 0;
      }

      const overlayIsMountain = isMountainOverlayKey(tile.overlay) || isMountainOverlayKey(tile.hillOverlay);
      const overlayIsHill = isHillOverlayKey(tile.overlay) || isHillOverlayKey(tile.hillOverlay);
      const overlayIsForest = isTreeOverlayKey(tile.overlay);

      let suitability = 1;

      if (overlayIsMountain) {
        if (Number.isFinite(x) && Number.isFinite(y)) {
          const dx = x - faction.capital.x;
          const dy = y - faction.capital.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance <= Math.SQRT2) {
            suitability *= 0.35;
          } else {
            return 0.05;
          }
        } else {
          return 0.05;
        }
      }

      if (overlayIsHill) {
        suitability *= 0.35;
      }

      if (overlayIsForest) {
        suitability *= 0.35;
      }

      return suitability;
    }
    case 'village': {
      if (tile.base === 'WATER') {
        return 0;
      }

      const overlayIsMountain = isMountainOverlayKey(tile.overlay) || isMountainOverlayKey(tile.hillOverlay);
      const overlayIsHill = isHillOverlayKey(tile.overlay) || isHillOverlayKey(tile.hillOverlay);
      const overlayIsForest = isTreeOverlayKey(tile.overlay);

      let suitability = 1;

      if (overlayIsMountain) {
        suitability *= 0.2;
      } else if (overlayIsHill) {
        suitability *= 0.45;
      }

      if (overlayIsForest) {
        suitability *= 0.5;
      }

      return suitability;
    }
    case 'town': {
      if (tile.base === 'WATER') {
        return 0;
      }

      const overlayIsMountain = isMountainOverlayKey(tile.overlay) || isMountainOverlayKey(tile.hillOverlay);
      const overlayIsHill = isHillOverlayKey(tile.overlay) || isHillOverlayKey(tile.hillOverlay);
      const overlayIsForest = isTreeOverlayKey(tile.overlay);

      let suitability = 1;

      if (overlayIsMountain) {
        suitability *= 0.3;
      } else if (overlayIsHill) {
        suitability *= 0.6;
      }

      if (overlayIsForest) {
        suitability *= 0.75;
      }

      return suitability;
    }
    default:
      return 1;
  }
}

function registerTiles(sheetKey, coordMap) {
  const sheet = tileSheets[sheetKey];
  Object.entries(coordMap).forEach(([name, coords]) => {
    tileLookup.set(name, {
      sheet: sheetKey,
      sx: coords.col * sheet.tileSize,
      sy: coords.row * sheet.tileSize,
      size: sheet.tileSize
    });
  });
}

registerTiles('base', baseTileCoords);
registerTiles('worldDetails', riverTileCoords);
registerTiles('base', icebergTileCoords);

registerCustomStructure('HAMLET', (ctx, drawOptions) => drawHamletStructure(ctx, drawOptions));
registerCustomStructure('ROADSIDE_TAVERN', (ctx, drawOptions) =>
  drawRoadsideTavernStructure(ctx, drawOptions)
);

// The evil wizard tower sprite only shows up on some tilesheets. If the
// currently loaded set does not define it, fall back to the generic tower so
// the generator can still place the structures.
if (!tileLookup.has('EVIL_WIZARDS_TOWER')) {
  const fallbackTower = tileLookup.get('TOWER');
  if (fallbackTower) {
    tileLookup.set('EVIL_WIZARDS_TOWER', { ...fallbackTower });
  }
}

const mapSizePresets = [
  { key: 'mini', label: 'Mini', width: 192, height: 144 },
  { key: 'small', label: 'Small', width: 260, height: 195 },
  { key: 'normal', label: 'Normal', width: 324, height: 243 },
  { key: 'large', label: 'Large', width: 424, height: 318 },
  { key: 'extra-large', label: 'Extra Large', width: 520, height: 390 }
];

const mapSizeByKey = mapSizePresets.reduce((acc, preset) => {
  acc[preset.key] = preset;
  return acc;
}, {});

function getMapSizePreset(key) {
  return mapSizeByKey[key] || mapSizeByKey.normal;
}

function applyMapSizePresetToState(preset) {
  if (!preset) {
    return;
  }
  state.settings.mapSize = preset.key;
  state.settings.width = preset.width;
  state.settings.height = preset.height;
}

function getMapSizeLabel(preset, width, height) {
  if (preset) {
    return `${preset.label} — ${preset.width} × ${preset.height} tiles`;
  }
  if (typeof width === 'number' && typeof height === 'number') {
    return `${width} × ${height} tiles`;
  }
  return '—';
}

const defaultMapSize = getMapSizePreset('normal');
const defaultForestFrequency = 35;
const defaultMountainFrequency = 35;

const worldNames = [
  'Nûrn',
  'Ardganor',
  'Drakmor',
  'Thaldur',
  'Eldrakis',
  'Karrûn',
  'Tholmar',
  'Torra',
  'Albia',
  'Tor',
  'Lassel',
  "Marrov'gar",
  'Planetos',
  'Ulthos',
  'Grrth',
  'Erin',
  'Nûrnheim',
  'Midkemia',
  'Skarnheim',
  'Shannara',
  'Alagaësia',
  'Syf',
  'Elysium',
  'Lankhmar',
  'Arcadia',
  'Eberron',
  'Crobuzon',
  'Valdemar',
  'Uresia',
  'Tiassa',
  'Tairnadal',
  'Solara',
  'Golarion',
  'Aerth',
  'Khand',
  'Sanctuary',
  'Thra',
  'Acheron',
  'Cosmere',
  'Tékumel',
  'Norrathal',
  'Prydain',
  'Kulthea',
  'Bas-Lag',
  'Eternia',
  'Xanth',
  'Abeir-Toril',
  'Earthsea',
  'Pern',
  'Discworld',
  'Hyboria',
  'Avalon',
  'Tyria',
  'Rokugan',
  'Glorantha',
  'Ivalice',
  'The World of the Five Gods',
  'Narnia',
  'Azeroth',
  'Spira',
  'Noxus',
  'Volkran',
  "Tal'Dorei",
  'Exandria',
  'Runeterra',
  'Eorzea',
  'Thraenor',
  'Xadia',
  'Roshar',
  'Teldrassil',
  'Draenor',
  'Valisthea',
  'Gensokyo',
  'Temeria',
  'Nilfgaard',
  'Aedirn',
  'Redania',
  'Kaedwen',
  'Toussaint',
  'Rivellon',
  'Lucis',
  'Gransys',
  'Drangleic',
  'Lothric',
  'Boletaria',
  'Lordran',
  'Caelid',
  'Limgrave',
  'Altus',
  'Plateauonia',
  'Iria',
  'Theros',
  'Dominaria',
  'Zendikar',
  'Innistrad',
  'Ravnica',
  'Kamigawa',
  'Lorwyn',
  'Tarkir',
  'Ikoria',
  'Strixhaven',
  'Brazenforge',
  'Solarae',
  'Ethyra',
  'Lunathor',
  'Aethernis',
  'Veydris',
  'Nytherra',
  'Astralis',
  'Zephyra',
  'Umbryss',
  'Eclipthar',
  'Skibiti Toliterium'
];

const realmNameAdjectives = [
  'Azure',
  'Gilded',
  'Obsidian',
  'Verdant',
  'Crimson',
  'Sable',
  'Ivory',
  'Stormborn',
  'Radiant',
  'Umbral',
  'Ember',
  'Frostbound',
  'Sunlit',
  'Twilight',
  'Shattered',
  'Celestial',
  'Runed',
  'Eclipsed'
];

const realmNameNouns = [
  'Dominion',
  'Compact',
  'Marches',
  'Concord',
  'Throne',
  'Hegemony',
  'Alliance',
  'Syndicate',
  'Banner',
  'Legion',
  'Pact',
  'Confederacy',
  'Circle',
  'Assembly',
  'Holdings',
  'Enclave',
  'Sovereignty',
  'Ward'
];

const factionColorPalette = [
  '#ef4444',
  '#3b82f6',
  '#22c55e',
  '#eab308',
  '#a855f7',
  '#f97316',
  '#0ea5e9',
  '#ec4899',
  '#14b8a6',
  '#c084fc',
  '#facc15',
  '#38bdf8'
];

function pickFactionColor(index) {
  if (!Array.isArray(factionColorPalette) || factionColorPalette.length === 0) {
    return '#f97316';
  }
  const size = factionColorPalette.length;
  if (!Number.isFinite(index)) {
    return factionColorPalette[0];
  }
  const normalized = ((Math.floor(index) % size) + size) % size;
  return factionColorPalette[normalized];
}

const dwarfholdNamePrefixes = [
  'Stone',
  'Iron',
  'Granite',
  'Amber',
  'Bronze',
  'Deep',
  'Rune',
  'Frost',
  'Obsidian',
  'Storm',
  'Thunder',
  'Gilded',
  'Anvil',
  'Forge',
  'Hammer',
  'High',
  'Cinder',
  'Mithril',
  'Coal',
  'Crag',
  'Beryl',
  'Bright',
  'Shield',
  'Ember',
  'Crystal',
  'Bastion',
  'Vault'
];

const dwarfholdNameSuffixes = [
  'hold',
  'hall',
  'gate',
  'delve',
  'keep',
  'reach',
  'spire',
  'guard',
  'vault',
  'crown',
  'forge',
  'fast',
  'home',
  'rest',
  'watch',
  'deep',
  'peak'
];

const dwarfholdNameDescriptors = [
  'Citadel',
  'Stronghold',
  'Holdfast',
  'Sanctum',
  'Throne',
  'Bastion',
  'Redoubt',
  'Garrison',
  'Watch',
  'Reliquary',
  'Enclave',
  'Caverns',
  'Fortress',
  'Outpost',
  'Ward'
];

const dwarfholdNameRegions = [
  'the North',
  'the Deep',
  'the First Kings',
  'the Ancients',
  'Stonehome',
  'Stormpeak',
  'Ember Range',
  'Thunderholt',
  'the Underway',
  'Skyforge',
  'the Iron Sea',
  'Grimspire',
  'Highstone',
  'Runecrest',
  'the Brass Line'
];

const dwarfholdRulerTitles = {
  female: [
    'High Thane',
    'Forge Matron',
    'Hearthmother',
    'Deepwarden',
    'Queen',
    'Thane',
    'High Queen'
  ],
  male: [
    'High Thane',
    'Forge Lord',
    'Mountain King',
    'Deepwarden',
    'Thane',
    'King',
    'King Under The Mountain',
    'Prince',
    'High Runesmith'
  ]
};

const dwarfholdHallmarks = [
  'Renowned for adamantine vaults that hum with runic wards.',
  'Brews ember-ale said to warm even a dragonborn heart.',
  'Forges battleaxes tempered in magmafall cascades.',
  'Gemcutters here carve prisms that sing when struck.',
  'Hosts archives of rune-scribed lore older than empires.',
  'Its sentry golems stand watch over sealed deep-gates.',
  'Stonewrights sculpt living statues of honoured ancestors.',
  'Traders deal in starlight opals mined from midnight caverns.',
  'Their forges are stoked by dragonfire bound in crystal cages.',
  'Tunnel gardens yield luminous mushrooms for distant markets.'
];

const dwarfholdExportOptions = [
  'Cut gemstones and faceted crystals',
  'Masterwork steel arms and armor',
  'Runic circuitry and precision mechanisms',
  'Barrels of triple-aged stout and spirits',
  'Thunderpowder and blasting charges',
  'Refined mithril ingots and alloys',
  'Architectural plans and rune-etched stonework',
  'Highland woolens and leatherwork',
  'Engraved jewelry and heirloom trinkets'
];

const mineNamePrefixes = [
  'Iron',
  'Silver',
  'Copper',
  'Gold',
  'Mithril',
  'Coal',
  'Gem',
  'Obsidian',
  'Crystal',
  'Rune',
  'Ember',
  'Thunder',
  'Star',
  'Deep'
];

const mineNameSuffixes = [
  'delve',
  'reach',
  'shaft',
  'vein',
  'hollow',
  'works',
  'forge',
  'deep',
  'spire',
  'gate'
];

const mineNameDescriptors = ['Mine', 'Delve', 'Excavation', 'Works', 'Prospect'];

const mineResourceProfiles = [
  {
    resource: 'iron ore',
    export: 'pig iron billets',
    description: 'Magnetite seams glow ember-red beneath rune lanterns.'
  },
  {
    resource: 'silver ore',
    export: 'refined silver ingots',
    description: 'Silver veins lace the rock like moonlight trapped in stone.'
  },
  {
    resource: 'gold ore',
    export: 'gold dust and ingots',
    description: 'Gold threads shimmer in quartz pockets with every pick strike.'
  },
  {
    resource: 'mithril ore',
    export: 'mithril flakes and bars',
    description: 'Mithril filaments sing softly when teased free of the bedrock.'
  },
  {
    resource: 'coal seams',
    export: 'smokeless coke bricks',
    description: 'Coal seams burn clean and hot, prized by deep forges.'
  },
  {
    resource: 'gemstone geodes',
    export: 'uncut gemstones',
    description: 'Geodes crack open to reveal lantern-lit caverns of colour.'
  },
  {
    resource: 'copper ore',
    export: 'worked copper ingots',
    description: 'Copper veins patina the tunnels with a verdant sheen.'
  }
];

const mineHazardOptions = [
  'sulfur vents that hiss until rune chimneys release the pressure',
  'echo spirits that steal tools left unattended in dark galleries',
  'shatterstone pockets that collapse without rune-braced timbers',
  'flood-prone shafts kept dry by steam-powered pumps',
  'tunnelwyrms that gnaw the deepest stopes if watchfires go dim',
  'glittermote swarms that daze miners who forget their goggles'
];

const mineCrewNames = [
  'Deepdelver Crew',
  'Amberpick Syndicate',
  'Runehammer Shift',
  'Thunderpick Assembly',
  'Glowforge Line',
  'Stonebite League'
];

const mineSecondaryExports = [
  'runed support struts',
  'cut granite blocks',
  'slagglass baubles',
  'precision drill heads',
  'barrels of blasting powder'
];

const hillholdNamePrefixes = [
  'Stone',
  'Amber',
  'Bronze',
  'Granite',
  'Cloud',
  'Storm',
  'Frost',
  'Ember',
  'Ridge',
  'Hearth',
  'Rune',
  'Copper',
  'Oak',
  'Pine',
  'Crown',
  'Deep',
  'Iron'
];

const hillholdNameSuffixes = [
  'watch',
  'guard',
  'hold',
  'fast',
  'hearth',
  'delve',
  'gate',
  'spire',
  'tor',
  'bastion'
];

const hillholdNameDescriptors = [
  'Hill',
  'Heights',
  'Tor',
  'Rise',
  'Overlook',
  'Sentinel',
  'Cairn',
  'Keep'
];

const hillholdHallmarks = [
  'Terraced stone halls clutch the hillside with iron-rooted buttresses.',
  'Signal beacons line the ridge, flaring to warn the mountain clans.',
  'Stonecut breweries age ember-ale in vaults carved into the slope.',
  'A ring of rune-warded cairns keeps avalanches at bay.',
  'Watchful ballistae peer over the passes, ready for skyborne threats.',
  'Ancestral murals glow softly where the hill meets the mountain.',
  'Tunnel orchards cultivate silverleaf whose sap steeps hardy brews.',
  'Gear-driven lifts ferry caravans up the steep approach roads.'
];

const hillholdWatchOrders = [
  'Ridgeguard Brotherhood',
  'Hearthward Sentinels',
  'Torwatch Lodge',
  'Amberhorn Vigil',
  'Thunderpeak Watch',
  'Mistveil Wardens',
  'Stoneflare Rangers',
  'Copper Torches'
];

const hillholdWardenTitles = [
  'Holdthane',
  'Ridgekeeper',
  'Beacon Marshal',
  'Hearthwarden',
  'Overthane',
  'Watch Captain',
  'Stoneward',
  'Beaconwarden'
];

const hillholdExports = [
  'Granite keystones for mountain keeps',
  'Casks of ember-aged hill ale',
  'Runic beacons and signal braziers',
  'Polished horn trumpets for war warnings',
  'Refined copper filigree and fastenings',
  'Carved cairn-stones blessed by runepriests',
  'Seasoned pine from terraced groves',
  'Skybridge chains and hoist mechanisms'
];

const hillholdDefensiveTraits = [
  'Triple-beacon towers crown the ridgeline.',
  'Hidden sally tunnels open behind the hill.',
  'Rampart ballistae track the mountain pass day and night.',
  'Iron portcullises seal the ascent at a gesture.',
  'Seismic wards rumble whenever giants near.',
  'Water-driven sirens wail when the beacons ignite.'
];

const hillholdSentinelFocuses = [
  'guarding the trade-lanes that skirt the mountains',
  'keeping troll warbands from spilling onto the plains',
  'escorting caravans between hill clans and deep holds',
  'tracking wyvern flights that nest in the cliffs',
  'holding vigil for goblin raiders slipping through the passes',
  'surveying avalanche-prone slopes for signs of collapse',
  'maintaining the beacon-chain that links the northern holds',
  'patrolling ancient roads carved before the age of kings'
];

const dwarfholdPopulationRaceOptions = [
  { key: 'dwarves', label: 'Dwarves', color: '#f4c069' },
  { key: 'humans', label: 'Humans', color: '#9bb6d8' },
  { key: 'halflings', label: 'Halflings', color: '#f7a072' },
  { key: 'gnomes', label: 'Gnomes', color: '#c9a3e6' },
  { key: 'goblins', label: 'Goblins', color: '#7f8c4d' },
  { key: 'kobolds', label: 'Kobolds', color: '#b1c8ff' },
  { key: 'others', label: 'Others', color: '#9e9e9e' }
];

const dwarfholdNearbyTownRadius = 12;

const evilWizardTowerPopulationRaceOptions = [
  { key: 'wizards', label: 'Wizards', color: '#9c5cff' },
  { key: 'apprentices', label: 'Apprentices', color: '#b389ff' },
  { key: 'thralls', label: 'Thralls', color: '#646e78' },
  { key: 'summoned', label: 'Summoned Entities', color: '#ff8ba7' },
  { key: 'guards', label: 'Enslaved Guards', color: '#f2cd5c' },
  { key: 'others', label: 'Others', color: '#9e9e9e' }
];

const towerCommanderTitles = [
  'Castellan',
  'Commander of the Watch',
  'High Warden',
  'Beacon Marshal',
  'Captain of the Rampart',
  'Signal Master'
];

const towerCommanderGivenNames = [
  'Aldren',
  'Briala',
  'Cordan',
  'Davia',
  'Elric',
  'Faelan',
  'Garrick',
  'Helena',
  'Ivor',
  'Jasra',
  'Kaelin',
  'Liora',
  'Marek',
  'Neriah',
  'Orin',
  'Phaedra',
  'Rothan',
  'Selene',
  'Tarin',
  'Vaelis'
];

const towerCommanderSurnames = [
  'Stonewatch',
  'Dawnshield',
  'Greybanner',
  'Stormgaze',
  'Ironflame',
  'Swiftspire',
  'Highward',
  'Lighthelm',
  'Crownguard',
  'Starwall',
  'Deepward',
  'Brightmarch'
];

const towerOrderNames = [
  'Order of the Dawnwatch',
  'Azure Sentinel Brigade',
  'Wardens of the Highroad',
  'Gilded Lantern Cohort',
  'Scarlet Banner Watch',
  'Guardians of the Stormline',
  'Emerald Rampart Order'
];

const towerDetachmentOptions = [
  'Hawkrider Wing',
  'Rune-Signal Corps',
  'Ballista Battery',
  'Skysteel Artillery',
  'Shadow Lanterners',
  'Emberguard Phalanx',
  'Stormlance Cavalry'
];

const towerDutyOptions = [
  'Guarding the high pass road',
  'Maintaining the beacon chain',
  'Patrolling the border marches',
  'Escorting vital trade caravans',
  'Watching over ancient ruins nearby',
  'Shielding frontier villages from raiders'
];

const towerHallmarks = [
  'Beacon flames that can be seen clear across the frontier.',
  'Clockwork lifts that carry scouts to the highest parapets.',
  'Signal mirrors that flash messages to distant allies at dusk.',
  'A vaulted armoury stocked with relic blades and bannered shields.',
  'An observatory dome charting the movements of stormclouds and foes alike.',
  'Stone walls etched with oath-runes that glow at the approach of danger.'
];

const towerPopulationRaceOptions = [
  { key: 'elves', label: 'Elves', color: '#6ecf85' },
  { key: 'humans', label: 'Humans', color: '#9bb6d8' },
  { key: 'dwarves', label: 'Dwarves', color: '#f4c069' },
  { key: 'halflings', label: 'Halflings', color: '#f7a072' },
  { key: 'dragonborn', label: 'Dragonborn', color: '#c16a6a' },
  { key: 'tieflings', label: 'Tieflings', color: '#b064b0' },
  { key: 'others', label: 'Others', color: '#9e9e9e' }
];

const townRulerTitles = {
  male: ['Mayor', 'Lord Mayor', 'High Steward', 'Burgomaster', 'Castellan'],
  female: ['Mayor', 'Lady Mayor', 'High Steward', 'Burgomistress', 'Castellan'],
  neutral: ['Governor', 'Magistrate', 'Marshal', 'Chamberlain', 'Steward']
};

const townHallmarks = [
  'Celebrated for its midsummer lantern festivals that light the riverways.',
  'Known for bustling markets where spices and silks trade hands till dusk.',
  'Renowned scribes illuminate tomes commissioned by distant courts.',
  'Shipwrights here launch swift river cutters and stout coastal cogs.',
  'Bards gather nightly in its echoing amphitheatre for tale and song.',
  'Town gardens brim with rare herbs prized by alchemists abroad.',
  'Its watchfires are said to be seen from the bordering highlands.',
  'Pilgrims arrive seasonally to venerate relics kept in the hilltop chapel.',
  'Stone bridges arch over canals lined with copper-roofed warehouses.',
  'Famous for street performers who juggle embers without being burned.'
];

const townExportOptions = [
  'Fine woolens and dyed textiles',
  'Barrels of spiced wine and cordial',
  'Carved hardwood furniture and cabinetry',
  'Glazed ceramics and painted pottery',
  'Ironmongery tools and horseshoes',
  'Salted riverfish and smoked eel',
  'Illuminated manuscripts and scrolls',
  'Perfumed oils and soaps',
  'Handcrafted musical instruments',
  'Leather saddles and tack'
];

const townPopulationRaceOptions = [
  { key: 'humans', label: 'Humans', color: '#9bb6d8' },
  { key: 'dwarves', label: 'Dwarves', color: '#f4c069' },
  { key: 'elves', label: 'Elves', color: '#6ecf85' },
  { key: 'halflings', label: 'Halflings', color: '#f7a072' },
  { key: 'gnomes', label: 'Gnomes', color: '#c9a3e6' },
  { key: 'dragonborn', label: 'Dragonborn', color: '#c16a6a' },
  { key: 'tieflings', label: 'Tieflings', color: '#b064b0' },
  { key: 'others', label: 'Others', color: '#9e9e9e' }
];

const townProminentFamilyNames = [
  'Ambermere',
  'Briarhelm',
  'Crownhill',
  'Dunleigh',
  'Emberfast',
  'Fairbloom',
  'Hallowmere',
  'Kestrelbourne',
  'Marrowind',
  'Ravenbrook',
  'Stormholt',
  'Thornwall',
  'Underford',
  'Wintermere'
];

const townGuildOptions = [
  'Merchants Consortium',
  'River Bargemen Union',
  'Artisan Collective',
  'Scribes and Illuminators Guild',
  'Shipwrights Assembly',
  'Alchemists Conclave',
  'Vintners Circle',
  'Weavers Syndicate',
  'Stevedores Brotherhood',
  'Stonemasons Chapter',
  'Cartographers Fellowship',
  'Apothecaries Guild',
  'Wrights and Carpenters Lodge',
  'Guard Captains Council',
  'Miners Exchange'
];

const snowVillageNamePrefixes = [
  'Aput',
  'Nanu',
  'Siku',
  'Qimmi',
  'Tuktu',
  'Aklaq',
  'Sila',
  'Ukpik',
  'Imaq',
  'Nuna',
  'Kangi',
  'Talir'
];

const snowVillageNameSuffixes = [
  'vik',
  'ruq',
  'naq',
  'lik',
  'juq',
  'toq',
  'riaq',
  'suk',
  'aluk',
  'tuuq'
];

const snowVillageNameDescriptors = ['Camp', 'Harbor', 'Haven', 'Settlement', 'Encampment'];

const snowVillageLeaderNamePools = {
  male: ['Aputi', 'Tulugaq', 'Inuk', 'Panik', 'Qajaq', 'Nanuq'],
  female: ['Sila', 'Nukka', 'Pipaluk', 'Kaya', 'Tala', 'Tekkeitsertok'],
  neutral: ['Siku', 'Atka', 'Ilu', 'Tuktu', 'Amaruq']
};

const snowVillageClanNames = ['Qimmiq', 'Sirmiq', 'Ukialik', 'Auyuittuq', 'Nunavik', 'Kugluktuk', 'Panaq', 'Talur'];

const snowVillageRulerTitles = {
  male: ['Isumataq', 'Angakkuq', 'Head Elder'],
  female: ['Isumataq', 'Angakkuq', 'Head Elder'],
  neutral: ['Isumataq', 'Angakkuq', 'Storykeeper']
};

const townFirstNamePools = {
  male: ['Aldric', 'Berend', 'Cedric', 'Darian', 'Edric', 'Garran', 'Henric', 'Loric', 'Rowan', 'Therin'],
  female: ['Adela', 'Brienne', 'Celia', 'Elowen', 'Fiora', 'Gwendolyn', 'Isolde', 'Maren', 'Rowena', 'Seren'],
  neutral: ['Arlen', 'Ember', 'Finley', 'Morgan', 'Robin', 'Sage', 'Tarian']
};

const settlementDetailTypes = new Set([
  'dwarfhold',
  'greatDwarfhold',
  'abandonedDwarfhold',
  'mine',
  'town',
  'city',
  'village',
  'hamlet',
  'evilWizardTower',
  'tower',
  'woodElfGrove',
  'lizardmenCity'
]);

function resolveTownRulerTitle(gender, randomFn) {
  const genderPool =
    (gender === 'male' && townRulerTitles.male) ||
    (gender === 'female' && townRulerTitles.female) ||
    townRulerTitles.neutral;
  const fallbackPool = townRulerTitles.neutral.length > 0 ? townRulerTitles.neutral : townRulerTitles.male;
  return pickRandomFrom(genderPool && genderPool.length > 0 ? genderPool : fallbackPool, randomFn) || 'Magistrate';
}

const townNamePrefixes = [
  'Oak',
  'River',
  'Stone',
  'Amber',
  'Green',
  'Silver',
  'Gold',
  'Iron',
  'Autumn',
  'Frost',
  'Sun',
  'Star',
  'Moon',
  'Wolf',
  'Wind',
  'Bright',
  'High',
  'Low',
  'Cedar',
  'Elm',
  'Maple',
  'Ash',
  'Willow',
  'King',
  'Queens',
  'Dragon',
  'Hearth',
  'North',
  'South',
  'East',
  'West'
];

const townNameSuffixes = [
  'ford',
  'field',
  'holm',
  'stead',
  'wich',
  'wick',
  'haven',
  'crest',
  'gate',
  'watch',
  'brook',
  'ton',
  'ham',
  'bridge',
  'moor',
  'port',
  'fall',
  'mere',
  'bury',
  'ridge',
  'moor',
  'bank',
  'view',
  'grove',
  'vale',
  'reach',
  'cross',
  'run',
  'rise',
  'pass'
];

const townNameDescriptors = [
  'Market',
  'Crossroads',
  'Commons',
  'Harbor',
  'Square',
  'Heights',
  'Heath',
  'Village',
  'Town',
  'Hold',
  'Keep',
  'Exchange',
  'Quarter',
  'Reach',
  'Hollow'
];

const towerNamePrefixes = [
  'Obsidian',
  'Gilded',
  'Runed',
  'Frost',
  'Storm',
  'Ivory',
  'Crimson',
  'Verdant',
  'Azure',
  'Shadow',
  'Sunset',
  'Moonrise',
  'Starfall',
  'Ember',
  'Sapphire'
];

const towerNameNouns = [
  'Tower',
  'Spire',
  'Watch',
  'Keep',
  'Pinnacle',
  'Bastion',
  'Citadel',
  'Lantern'
];

const towerNameQualifiers = [
  'of Dawn',
  'of Twilight',
  'of Storms',
  'of Secrets',
  'of Embers',
  'of Whispers',
  'of the North',
  'of the Veil',
  'of Echoes',
  'of the First Light',
  'of the Last Watch',
  'of the Silent Choir'
];

const evilWizardRulerTitles = [
  'Archwizard',
  'Grand Warlock',
  'Mistress of Hexes',
  'Dread Magister',
  'Shadow Thaumaturge',
  'High Necromancer'
];

const evilWizardGivenNames = [
  'Malachar',
  'Ilyria',
  'Vorstag',
  'Seraphine',
  'Kharzul',
  'Nymera',
  'Vaelix',
  'Thalorin',
  'Mordra',
  'Zephyros',
  'Elandra',
  'Raziel'
];

const evilWizardSurnames = [
  'Nightweaver',
  'Grimspire',
  'Voidbinder',
  'Dusksong',
  'Ashmantle',
  'Frostvein',
  'Starshroud',
  'Runeveil'
];

const evilWizardEpithets = [
  'the Unseen',
  'the Cruel',
  'the Whisperer',
  'the Pale Flame',
  'the Crimson Star',
  'the Endless',
  'the Voidcalled',
  'the Shadowed',
  'the Withering Gale',
  'the Stormbinder'
];

const evilWizardCabalNames = [
  'Circle of Nightglass',
  'Order of the Ebon Star',
  'Covenant of Ashen Veils',
  'Cabal of Thorned Sigils',
  'Symphony of Hollow Suns',
  'Chorus of Silent Bells'
];

const evilWizardTowerHallmarks = [
  'Shrouded perpetually in stormclouds that crackle with violet lightning.',
  'Whispers say its halls rearrange themselves with each moonrise.',
  'The central spire hums with runes that siphon magic from the ley.',
  'Populated by constructs wrought from obsidian and bone.',
  'Its beacon pulses nightly, summoning spirits from distant graves.',
  'Said to house a library bound in the memories of captured heroes.'
];

const woodElfGrovePrefixes = [
  'Sylvan',
  'Moon',
  'Star',
  'Silver',
  'Verdant',
  'Thorn',
  'Whisper',
  'Autumn',
  'Lark',
  'Eversong',
  'Glimmer',
  'Sun',
  'Briar',
  'Moss',
  'Willow'
];

const woodElfGroveSuffixes = [
  'Grove',
  'Glade',
  'Haven',
  'Refuge',
  'Circle',
  'Hollow',
  'Sanctum',
  'Enclave',
  'Retreat',
  'Thicket'
];

const woodElfGroveDescriptors = [
  'of the Dawn Chorus',
  'of Whispering Leaves',
  'of Starlit Boughs',
  'of the Emerald Court',
  'of the Eternal Spring',
  'of the Moonlit Vale',
  'of the Verdant Watch',
  'of the First Trees',
  'of Glimmering Dew',
  'of the Silver Song'
];

const woodElfGroveElderTitles = [
  'Grove Warden',
  'Verdant Speaker',
  'Circle Elder',
  'Keeper of Boughs',
  'Songwarden',
  'Dawnwatcher'
];

const woodElfGroveElderGivenNames = [
  'Aelar',
  'Lethariel',
  'Thamior',
  'Keyleth',
  'Varis',
  'Nymeria',
  'Caelynn',
  'Theren',
  'Sylvar',
  'Ilyana',
  'Faelar',
  'Lunessa'
];

const woodElfGroveElderSurnames = [
  'Silversong',
  'Oakenshade',
  'Nightbloom',
  'Moonglade',
  'Thornweaver',
  'Starpetal',
  'Sunshadow',
  'Mistralwind',
  'Fernstep',
  'Willowstrand'
];

const woodElfGroveHallmarks = [
  'Moonlit rites that weave auroras between the branches.',
  'Ancient treants stand guard over every winding path.',
  'Hidden pools shimmer with restorative starlight dew.',
  'The groves chorus echoes across the forest at dusk.',
  'Bough-bridges knit the canopy into spiralling promenades.',
  'Druidic songcraft summons blossoms even in winter.'
];

const forestRegionNamePrefixes = [
  'Verdant',
  'Whispering',
  'Emerald',
  'Silver',
  'Shadow',
  'Golden',
  'Moonlit',
  'Ancient',
  'Wild',
  'Sunset'
];

const forestRegionNameSuffixes = [
  'Groves',
  'Woods',
  'Thicket',
  'Wilds',
  'Canopy',
  'Boughs',
  'Hollows',
  'Glade',
  'Expanse',
  'Reserve'
];

const forestRegionNameMotifs = [
  'Echoes',
  'Mists',
  'Cicadas',
  'Fables',
  'Starlight',
  'Owls',
  'Whispers',
  'Lanterns',
  'Spirits',
  'Willows'
];

const mountainRangeNamePrefixes = [
  'Stone',
  'Iron',
  'Storm',
  'Thunder',
  'Frost',
  'Dragon',
  'Obsidian',
  'Moon',
  'Sunspire',
  'Titan'
];

const mountainRangeNameSuffixes = [
  'Peaks',
  'Range',
  'Highlands',
  'Crown',
  'Mountains',
  'Spines',
  'Escarpment',
  'Ridge',
  'Tor',
  'Bastions'
];

const mountainRangeNameMotifs = [
  'Storms',
  'Giants',
  'Dawn',
  'Ash',
  'Echoes',
  'Legends',
  'Stars',
  'Anvils',
  'Dragons',
  'Auroras'
];

const desertNameDescriptors = [
  'Shifting',
  'Burning',
  'Golden',
  'Silent',
  'Glass',
  'Crimson',
  'Howling',
  'Endless',
  'Scoured',
  'Sunken'
];

const desertNameNouns = [
  'Dunes',
  'Waste',
  'Expanse',
  'Sea',
  'Desert',
  'Reach',
  'Barrens',
  'Quarter',
  'Wastes',
  'Sands'
];

const desertNameMotifs = [
  'Mirages',
  'Ashes',
  'Suns',
  'Bones',
  'Scorpions',
  'Dust',
  'Secrets',
  'Hollows',
  'Echoes',
  'Zephyrs'
];

const tundraNameDescriptors = [
  'Frozen',
  'Ivory',
  'Bleak',
  'Glimmering',
  'Shivering',
  'Frostbound',
  'Auric',
  'Pale',
  'Windshorn',
  'Starlit'
];

const tundraNameNouns = [
  'Tundra',
  'Reach',
  'Steppes',
  'Barrens',
  'Fields',
  'Expanse',
  'Marches',
  'Plateau',
  'Glade',
  'March'
];

const tundraNameMotifs = [
  'Auroras',
  'Frost',
  'Comets',
  'Stars',
  'Echoes',
  'Drifts',
  'Owls',
  'Lights',
  'Mammoths',
  'Silence'
];

const grasslandNameDescriptors = [
  'Windward',
  'Emerald',
  'Golden',
  'Rolling',
  'Open',
  'Skylit',
  'Silver',
  'Gentle',
  'Breezy',
  'Sunlit'
];

const grasslandNameNouns = [
  'Plains',
  'Meadows',
  'Fields',
  'Prairies',
  'Steppes',
  'Expanse',
  'Downs',
  'Reach',
  'Hearth',
  'Lowlands'
];

const grasslandNameMotifs = [
  'Larks',
  'Horizon',
  'Harvests',
  'Echoes',
  'Sunsets',
  'Breezes',
  'Lanterns',
  'Auroras',
  'Stones',
  'Dreams'
];

const jungleNameDescriptors = [
  'Emerald',
  'Verdant',
  'Sun-dappled',
  'Obsidian',
  'Mist-shrouded',
  'Ancient',
  'Thundering',
  'Canopy',
  'Moonlit',
  'Serpent'
];

const jungleNameNouns = [
  'Jungle',
  'Wilds',
  'Canopy',
  'Rainforest',
  'Tangle',
  'Deepwood',
  'Labyrinth',
  'Greenway',
  'Expanse',
  'Verdure'
];

const jungleNameMotifs = [
  'Serpents',
  'Drums',
  'Monsoons',
  'Spirits',
  'Cenotes',
  'Orchids',
  'Tempests',
  'Roots',
  'Jaguar Spirits',
  'Emerald Dawn'
];

const marshNameDescriptors = [
  'Glimmer',
  'Mire',
  'Gloom',
  'Low',
  'Sodden',
  'Willow',
  'Brackish',
  'Sable',
  'Sunken',
  'Twilight'
];

const marshNameNouns = [
  'Bog',
  'Fen',
  'Morass',
  'Quagmire',
  'Wetlands',
  'Mires',
  'Marsh',
  'Reeds',
  'Pools',
  'Sinks'
];

const marshNameMotifs = [
  'Fireflies',
  'Lilies',
  'Secrets',
  'Mist',
  'Echoes',
  'Cranes',
  'Reeds',
  'Moss',
  'Shadows',
  'Frogs'
];

const badlandsNameDescriptors = [
  'Shattered',
  'Redstone',
  'Sundered',
  'Dustfallen',
  'Sunblasted',
  'Windswept',
  'Bleached',
  'Broken',
  'Scorched',
  'Cracked'
];

const badlandsNameNouns = [
  'Badlands',
  'Wastes',
  'Breaks',
  'Barrens',
  'Tablelands',
  'Escarpment',
  'Canyons',
  'Bluffs',
  'Ridges',
  'Maze'
];

const badlandsNameMotifs = [
  'Bones',
  'Dust',
  'Echoes',
  'Thunderheads',
  'Vultures',
  'Ash',
  'Mirages',
  'Sunstorms',
  'Ruins',
  'Storms'
];

const oceanNameDescriptors = [
  'Sapphire',
  'Tempest',
  'Sunken',
  'Cerulean',
  'Midnight',
  'Gilded',
  'Storm',
  'Azure',
  'Silent',
  'Everdeep'
];

const oceanNameNouns = [
  'Sea',
  'Ocean',
  'Gulf',
  'Sound',
  'Reach',
  'Current',
  'Depths',
  'Expanse',
  'Waters',
  'Strait'
];

const oceanNameMotifs = [
  'Sirens',
  'Stars',
  'Moons',
  'Whales',
  'Voyagers',
  'Storms',
  'Legends',
  'Coral',
  'Mists',
  'Echoes'
];

const lakeNameDescriptors = [
  'Silver',
  'Crystal',
  'Mirror',
  'Still',
  'Glimmer',
  'Duskwater',
  'Bright',
  'Moon',
  'Amber',
  'Serene'
];

const lakeNameNouns = [
  'Lake',
  'Mere',
  'Loch',
  'Pond',
  'Basin',
  'Reservoir',
  'Waters',
  'Lagoon',
  'Pool',
  'Bay'
];

const lakeNameMotifs = [
  'Echoes',
  'Willows',
  'Lanterns',
  'Dreams',
  'Reflections',
  'Whispers',
  'Herons',
  'Lilies',
  'Dawn',
  'Stars'
];

const woodElfGroveCircleNames = [
  'Circle of the Silver Bough',
  'Circle of Verdant Stars',
  'Circle of Whispering Winds',
  'Circle of Dawnpetals',
  'Circle of the Emerald Veil',
  'Circle of Moonshadow Paths',
  'Circle of the Luminous Seed',
  'Circle of the Elder Stag'
];

const woodElfGroveOrders = [
  'Wardens of the High Canopy',
  'Rangers of the Verdant Way',
  'Singers of the Luminous Thread',
  'Druids of the Moonwell Accord',
  'Keepers of the Auric Grove',
  'Mistwalkers of the Emerald Watch'
];

const woodElfGroveExports = [
  'Phials of rejuvenating moonwater',
  'Runed arrowheads carved from starwood',
  'Perfumed resins and incense petals',
  'Luminous moss for healing rituals',
  'Silken banners woven from leaf-fibres',
  'Seedstones that sprout protective thickets'
];

const woodElfGrovePopulationRoleOptions = [
  { key: 'elves', label: 'Wood Elves', color: '#6ecf85' },
  { key: 'satyrs', label: 'Satyrs', color: '#c18c5d' },
  { key: 'nymphs', label: 'Nymphs', color: '#9bd4a9' },
  { key: 'ents', label: 'Ents', color: '#8bbbcf' }
];

const lizardmenCityPopulationRoleOptions = [
  { key: 'skinks', label: 'Skink Artisans', color: '#6bd38f' },
  { key: 'saurus', label: 'Saurus Cohorts', color: '#3a9f68' },
  { key: 'priests', label: 'Temple Acolytes', color: '#8cd1c6' },
  { key: 'beastmasters', label: 'Beastmasters', color: '#b0f0d0' }
];

const lizardmenCityPrefixes = ['Ix', 'Zan', 'Tla', 'Chal', 'Maz', 'Quet', 'Ssz', 'Olo', 'Yax', 'Huac'];
const lizardmenCitySuffixes = ['atl', 'tlan', 'co', 'maz', 'naka', 'zotl', 'chan', 'poc', 'quil', 'pan'];
const lizardmenCityClassifications = [
  'Temple City',
  'Sacred Ziggurat',
  'Jungle Metropolis',
  'Canal Citadel',
  'Sun Pyramid Enclave'
];
const lizardmenCityHallmarks = [
  'Sun-drenched step pyramids rising above the canopy.',
  'Mist-draped terraces fed by warm jungle springs.',
  'Obsidian causeways linking flooded plazas.',
  'Crocodilian cavalry drilling in emerald plazas.',
  'Sacred cenotes ringed with chanting acolytes.',
  'Jade-lined canals glowing with bioluminescent algae.'
];
const lizardmenCityRulerTitles = [
  'High Scale-Priest',
  'Sunblood Speaker',
  'Serpent King',
  'Celadon Oracle',
  'Dawn-Caller',
  'Mist Matron'
];
const lizardmenCityRulerNames = [
  'Xilqua',
  'Mazaton',
  'Tezcali',
  'Chakli',
  'Zazamet',
  'Itzali',
  'Qaztil',
  'Sszara',
  'Olotec',
  'Tzimek'
];
const lizardmenCityOrders = [
  'Order of the Dawnfang',
  'Jade Sentinel Cohort',
  'Scaled Oracle Council',
  'Mistfang Navigators',
  'Emerald Tide Wardens',
  'Obsidian Fang Legion',
  'Sunblood Procession',
  'Stormscale Tidewatch'
];
const lizardmenCityExports = [
  'Sun-baked obsidian blades',
  'Jade ritual masks',
  'Rare dyes pressed from jungle blooms',
  'Sacred incense cones',
  'Feathered cloaks lacquered in gold',
  'Fermented serpentwine',
  'Glittering shell mosaics'
];

const orcTribeAdjectives = [
  'Ironjaw',
  'Bloodfang',
  'Stormhide',
  'Ashen',
  'Bonegnaw',
  'Thunderhoof',
  'Grimgaze',
  'Skullsplitter',
  'Nightscar',
  'Rageborn'
];
const orcTribeNouns = [
  'Clan',
  'Warband',
  'Legion',
  'Brood',
  'Horde',
  'Reavers',
  'Marauders',
  'Prowlers'
];
const orcCampFeatures = [
  'War drums thunder at dusk from within the palisade.',
  'Spiked palisades bear trophies from raided caravans.',
  'Tattered war banners crackle in the smoky wind.',
  'An arena of packed earth hosts nightly combat rites.',
  'Blacksmith forges belch sparks as crude blades are hammered.',
  'Watchfires burn green with alchemical fumes.',
  'Captured standards hang as warnings to intruders.'
];
const orcWarLeaders = [
  'Gorath the Red',
  'Mazrak One-Eye',
  'Thura Ironhide',
  'Balgrom Spinebreaker',
  'Igra Wildfang',
  'Vorgh the Thunderer',
  'Sagra the Ember Fist',
  'Druza Stormchant'
];
const orcThreatDescriptors = ['Elevated', 'Severe', 'Dire', 'Menacing'];
const travelerCampHosts = [
  'the Emberlane siblings',
  'Matron Heila Oakshaw',
  'a circle of veteran rangers',
  'Quartermaster Brond of the West March',
  'the caravan guild of Lanterntrail',
  'Scoutmaster Vessa Quillsong'
];
const travelerCampFocuses = [
  'guiding caravans through the border wilds',
  'trading maps and rumours for supplies',
  'harbouring refugees bound for safer lands',
  'drilling outriders to patrol the marches',
  'stockpiling goods for a distant expedition',
  'watching the roads for bandit movement'
];
const travelerCampSupplies = [
  'fresh water skins, smoked meats, and wagon grease',
  'oiled cloaks, mended harnesses, and hardy ponies',
  'herbal poultices, coil rope, and trimmed torches',
  'arrow sheaves, spare axles, and starlight charts',
  'travel bread, pitch tarps, and finely balanced spears'
];
const travelerCampAtmospheres = [
  'Lanterns sway from tall poles, casting amber halos across the tents.',
  'A cookfire crackles beside a ring of storytellers comparing pathfinding lore.',
  'Watchmen pace the palisade while scouts tally the night sky.',
  'Scribes annotate trail ledgers by the glow of rune-lit stones.',
  'Children chase one another between carts while lookouts scan the horizon.'
];
const travelerCampServices = [
  'fresh mounts for weary outriders',
  'hireling guards to bolster caravan ranks',
  'trail wardens who escort pilgrims between towns',
  'medics stitching wounds earned on the road',
  'scouts selling the latest safe passage reports'
];

const tavernAdjectives = ['Golden', 'Starlit', 'Roaring', 'Whispering', 'Copper', 'Moonlit', 'Wandering'];
const tavernNouns = ['Hearth', 'Steed', 'Keg', 'Anvil', 'Lantern', 'Drum', 'Oak'];
const tavernDescriptors = [
  'Crossroads Inn',
  'Wayside Rest',
  'Taphouse',
  'Roadhouse',
  "Pilgrim's Lodge",
  'Caravan Hostel'
];
const tavernInnkeepers = [
  'Innkeep Mara Hearthspoon',
  'Old Rulfen Barrelhelm',
  'Mistress Sera Dawnsong',
  'Tarin Embercoat and his wife Lysa',
  'The twins Peira and Pell',
  'Guilder Hask of the Wayfarer League'
];
const tavernSpecialties = [
  'cinder-spiced stout poured over hot stones',
  'wildberry mead and cedar-smoked trout',
  'poppyseed bread with cavern cheese',
  'applejack mulled with sprig-mint',
  'honey-glazed boar shanks carved tableside'
];
const tavernReputations = [
  'favoured by caravan guards trading tall tales',
  'famed for calming border disputes over shared cups',
  'whispered about by merchants chasing lucky omens',
  'beloved by pilgrims making the long journey north',
  'a trusted muster point for royal couriers'
];
const tavernAmenities = [
  'a roaring hearth and slate-tiled baths',
  'private loft bunks lined with fleece blankets',
  'secure stables tended through the night',
  'a stage for bards and a loft for dice games',
  'a stocked cellar with rare vintages on tap'
];
const tavernAtmospheres = [
  'Music drifts into the road while travellers warm chilled hands.',
  'Lantern light spills across wagon ruts like melted gold.',
  'Scented smoke and laughter mingle beneath the eaves.',
  'Patrons cluster around maps pinned to the main beam.',
  'Night watch bells hang ready beside the doorway.'
];
const tavernServices = [
  'message runners willing to brave the moonlit pass',
  'guides charting quick routes between duchies',
  'lockboxes for merchant tithes and purses',
  'farriers who shoe beasts while you dine',
  'scribes drafting contracts over candlelight'
];
const tavernRatePhrases = [
  'four silver a room with hearth-warmed blankets',
  "a single gold buys a week's board and fodder",
  'two silver a night, breakfast and stall included',
  'one silver for the common loft, five for a private suite',
  'coin or fresh news accepted for a bed and a meal'
];
const tavernSpecialGuests = [
  'wandering magi swapping spellcraft rumours',
  'dwarven merchants peddling gem-cut curios',
  'elves mapping safe shadow crossings',
  'lancers offering escort to the next hold',
  'minstrels composing sagas for generous patrons'
];

const dungeonNamePrefixes = [
  'Whispering',
  'Sunken',
  'Forsaken',
  'Crumbling',
  'Midnight',
  'Shrouded',
  'Veiled',
  'Obsidian'
];
const dungeonNameSuffixes = [
  'Vault',
  'Depths',
  'Catacomb',
  'Sepulchre',
  'Labyrinth',
  'Halls',
  'Crypt'
];
const dungeonPerils = [
  'echo with restless spirits',
  'are laced with shifting stonework traps',
  'are patrolled by tireless constructs',
  'hide relics bound with cursed wards',
  'are veiled in ever-burning witchfire',
  'conceal a slumbering wyrm'
];
const dungeonDepths = ['three', 'five', 'seven', 'nine'];

const monasteryOrders = [
  'Order of the Dawn Lantern',
  'Order of Silent Rivers',
  'Brotherhood of the Verdant Star',
  'Scribes of the Hidden Song',
  'Wardens of the Azure Flame',
  'Sisters of the Gentle Bell'
];
const monasteryVirtues = [
  'contemplation',
  'vigilance',
  'compassion',
  'illumination',
  'endurance',
  'harmony'
];
const monasteryRelics = [
  'a saintly bell that rings without wind',
  'scrolls penned in starlight ink',
  'the Ember Chalice of first dawn',
  'a reliquary of luminous feathers',
  'a mirror that remembers forgotten hymns'
];

const castleHouseNames = [
  'House Blackthorn',
  'House Rivenshield',
  'House Cindergate',
  'House Frostmere',
  'House Dawnspear',
  'House Emberhall'
];
const castleDefensiveTraits = [
  'Commands a triple-ring curtain wall.',
  'Boasts arrow-slitted towers overlooking the vale.',
  'Is girded by rune-carved gatehouses.',
  'Holds a hidden sally tunnel for swift sorties.',
  'Is anchored to living stone by dwarven masonry.'
];
const castleBanners = [
  'a silver gryphon on midnight blue',
  'twin suns over a crimson field',
  'a sable stag wreathed in ivy',
  'interlocked hammers upon gold',
  'a white phoenix rising from ash'
];

const saintlyNames = [
  'Saint Elowen',
  'Saint Calder',
  'Saint Miriel',
  'Saint Tharan',
  'Saint Ysoria',
  'Saint Brannoc'
];
const saintMiracles = [
  'calmed a wildfire with a whispered prayer',
  'healed an entire plague-struck village',
  'turned back a tide of marauding spirits',
  'walked across a frozen sea to guide refugees',
  'struck down a demon with a blade of light'
];
const shrineOfferings = [
  'garlands of moonpetals',
  'etched votive coins',
  'bottled starlight dew',
  'hand-carved icons',
  'woven prayer cords'
];
const shrinePilgrims = [
  'penitents seeking absolution',
  'knights pledging holy vows',
  'healers learning forgotten benedictions',
  'pilgrims chasing whispered visions',
  'shepherds praying for gentle winters'
];

function pickRandomFrom(array, random) {
  if (!Array.isArray(array) || array.length === 0) {
    return '';
  }
  const randomFn = typeof random === 'function' ? random : Math.random;
  const index = Math.floor(randomFn() * array.length);
  const clampedIndex = Math.max(0, Math.min(array.length - 1, index));
  return array[clampedIndex];
}

function pickUniqueFrom(array, count, random) {
  if (!Array.isArray(array) || array.length === 0 || count <= 0) {
    return [];
  }
  const randomFn = typeof random === 'function' ? random : Math.random;
  const pool = array.slice();
  const picks = [];
  const maxCount = Math.min(Math.max(count, 0), pool.length);
  for (let i = 0; i < maxCount; i += 1) {
    const index = Math.floor(randomFn() * pool.length);
    const clampedIndex = Math.max(0, Math.min(pool.length - 1, index));
    const [choice] = pool.splice(clampedIndex, 1);
    if (choice !== undefined) {
      picks.push(choice);
    }
  }
  return picks;
}

function formatListWithConjunction(items, conjunction = 'and') {
  if (!Array.isArray(items)) {
    return '';
  }
  const filtered = items
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter((item) => item.length > 0);

  if (filtered.length === 0) {
    return '';
  }

  if (filtered.length === 1) {
    return filtered[0];
  }

  if (filtered.length === 2) {
    return `${filtered[0]} ${conjunction} ${filtered[1]}`;
  }

  const parts = filtered.slice(0, -1);
  const last = filtered[filtered.length - 1];
  return `${parts.join(', ')}, ${conjunction} ${last}`;
}

function generateForestRegionName(random, context = {}) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const prefix = pickRandomFrom(forestRegionNamePrefixes, randomFn) || 'Verdant';
  const suffix = pickRandomFrom(forestRegionNameSuffixes, randomFn) || 'Woods';
  const motif = pickRandomFrom(forestRegionNameMotifs, randomFn);
  if (motif && randomFn() < 0.65) {
    return `${prefix} ${suffix} of the ${motif}`;
  }
  if (randomFn() < 0.35) {
    return `The ${prefix} ${suffix}`;
  }
  return `${prefix} ${suffix}`;
}

function generateMountainRangeName(random, context = {}) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const prefix = pickRandomFrom(mountainRangeNamePrefixes, randomFn) || 'Stone';
  const suffix = pickRandomFrom(mountainRangeNameSuffixes, randomFn) || 'Peaks';
  const motif = pickRandomFrom(mountainRangeNameMotifs, randomFn);
  if (motif && randomFn() < 0.6) {
    return `${prefix} ${suffix} of the ${motif}`;
  }
  return `The ${prefix} ${suffix}`;
}

function generateDesertName(random, context = {}) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const descriptor = pickRandomFrom(desertNameDescriptors, randomFn) || 'Shifting';
  const noun = pickRandomFrom(desertNameNouns, randomFn) || 'Dunes';
  const motif = pickRandomFrom(desertNameMotifs, randomFn);
  if (motif && randomFn() < 0.5) {
    return `${noun} of the ${motif}`;
  }
  return `The ${descriptor} ${noun}`;
}

function generateTundraName(random, context = {}) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const descriptor = pickRandomFrom(tundraNameDescriptors, randomFn) || 'Frozen';
  const noun = pickRandomFrom(tundraNameNouns, randomFn) || 'Tundra';
  const motif = pickRandomFrom(tundraNameMotifs, randomFn);
  if (motif && randomFn() < 0.55) {
    return `${noun} of the ${motif}`;
  }
  return `The ${descriptor} ${noun}`;
}

function generateGrasslandName(random, context = {}) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const descriptor = pickRandomFrom(grasslandNameDescriptors, randomFn) || 'Golden';
  const noun = pickRandomFrom(grasslandNameNouns, randomFn) || 'Plains';
  const motif = pickRandomFrom(grasslandNameMotifs, randomFn);
  if (motif && randomFn() < 0.5) {
    return `${noun} of the ${motif}`;
  }
  if (randomFn() < 0.4) {
    return `The ${descriptor} ${noun}`;
  }
  return `${descriptor} ${noun}`;
}

function generateJungleName(random, context = {}) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const descriptor = pickRandomFrom(jungleNameDescriptors, randomFn) || 'Emerald';
  const noun = pickRandomFrom(jungleNameNouns, randomFn) || 'Jungle';
  const motif = pickRandomFrom(jungleNameMotifs, randomFn);
  if (motif && randomFn() < 0.65) {
    return `${noun} of the ${motif}`;
  }
  if (randomFn() < 0.45) {
    return `The ${descriptor} ${noun}`;
  }
  return `${descriptor} ${noun}`;
}

function generateMarshlandName(random, context = {}) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const descriptor = pickRandomFrom(marshNameDescriptors, randomFn) || 'Sunken';
  const noun = pickRandomFrom(marshNameNouns, randomFn) || 'Bog';
  const motif = pickRandomFrom(marshNameMotifs, randomFn);
  if (motif && randomFn() < 0.6) {
    return `${descriptor} ${noun} of the ${motif}`;
  }
  return `The ${descriptor} ${noun}`;
}

function generateBadlandsName(random, context = {}) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const descriptor = pickRandomFrom(badlandsNameDescriptors, randomFn) || 'Shattered';
  const noun = pickRandomFrom(badlandsNameNouns, randomFn) || 'Badlands';
  const motif = pickRandomFrom(badlandsNameMotifs, randomFn);
  if (motif && randomFn() < 0.55) {
    return `${noun} of the ${motif}`;
  }
  if (randomFn() < 0.35) {
    return `The ${descriptor} ${noun}`;
  }
  return `${descriptor} ${noun}`;
}

function generateOceanName(random, context = {}) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const descriptor = pickRandomFrom(oceanNameDescriptors, randomFn) || 'Sapphire';
  let noun = pickRandomFrom(oceanNameNouns, randomFn) || 'Sea';
  const motif = pickRandomFrom(oceanNameMotifs, randomFn);
  if (context && context.size && context.size < 120 && noun === 'Ocean') {
    noun = 'Sea';
  }
  if (motif && randomFn() < 0.65) {
    return `${noun} of the ${motif}`;
  }
  return `The ${descriptor} ${noun}`;
}

function generateLakeName(random, context = {}) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const descriptor = pickRandomFrom(lakeNameDescriptors, randomFn) || 'Silver';
  const noun = pickRandomFrom(lakeNameNouns, randomFn) || 'Lake';
  const motif = pickRandomFrom(lakeNameMotifs, randomFn);
  const normalizedNoun = noun.toLowerCase();
  if (normalizedNoun === 'lake' || normalizedNoun === 'loch') {
    if (motif && randomFn() < 0.7) {
      return `${noun} ${motif}`;
    }
    return `${noun} ${descriptor}`;
  }
  if (motif && randomFn() < 0.6) {
    return `The ${descriptor} ${noun} of the ${motif}`;
  }
  return `The ${descriptor} ${noun}`;
}

const biomeTypeDefinitions = {
  forest: { label: 'Forest', generator: generateForestRegionName },
  jungle: { label: 'Jungle', generator: generateJungleName },
  mountain: { label: 'Mountain Range', generator: generateMountainRangeName },
  desert: { label: 'Desert', generator: generateDesertName },
  badlands: { label: 'Badlands', generator: generateBadlandsName },
  tundra: { label: 'Tundra', generator: generateTundraName },
  grassland: { label: 'Grassland', generator: generateGrasslandName },
  marsh: { label: 'Marsh', generator: generateMarshlandName },
  ocean: { label: 'Ocean', generator: generateOceanName },
  lake: { label: 'Lake', generator: generateLakeName }
};

function generateBiomeAreaName(biomeType, random, context = {}) {
  if (!biomeType) {
    return null;
  }
  const definition = biomeTypeDefinitions[biomeType];
  if (!definition || typeof definition.generator !== 'function') {
    return null;
  }
  const name = definition.generator(random, context);
  if (typeof name === 'string') {
    const trimmed = name.trim();
    if (trimmed.length > 0) {
      return trimmed;
    }
  }
  return null;
}

function generatePopulationBreakdownFromOptions(options, population, random, config = {}) {
  if (!Array.isArray(options) || options.length === 0) {
    return [];
  }

  const randomFn = typeof random === 'function' ? random : Math.random;
  const {
    majorityIndex = 0,
    majorityShareRange = [0, 1],
    ensureMajority = true
  } = config;

  const shares = [];
  const candidates = options.slice();
  let majorityShare = 0;

  if (ensureMajority && candidates.length > 0) {
    const rawIndex = Number.isFinite(majorityIndex) ? Math.round(majorityIndex) : 0;
    const index = clamp(rawIndex, 0, candidates.length - 1);
    const [rangeMinRaw, rangeMaxRaw] = Array.isArray(majorityShareRange)
      ? majorityShareRange
      : [0, 1];
    const rangeMin = clamp(Number.isFinite(rangeMinRaw) ? rangeMinRaw : 0, 0, 1);
    const rangeMax = clamp(Number.isFinite(rangeMaxRaw) ? rangeMaxRaw : 1, rangeMin, 1);
    const [selected] = candidates.splice(index, 1);
    if (selected) {
      const shareRange = rangeMax - rangeMin;
      const share = shareRange <= 0 ? rangeMin : rangeMin + randomFn() * shareRange;
      majorityShare = clamp(share, 0, 1);
      shares.push({ config: selected, share: majorityShare });
    }
  }

  const remainingConfigs = candidates;
  if (remainingConfigs.length > 0) {
    const remainingShare = ensureMajority ? Math.max(0, 1 - majorityShare) : 1;
    const weights = remainingConfigs.map(() => 0.2 + randomFn());
    const weightSum = weights.reduce((sum, value) => sum + value, 0) || 1;
    remainingConfigs.forEach((config, index) => {
      const portion = weights[index] / weightSum;
      shares.push({ config, share: remainingShare * portion });
    });
  }

  let totalShare = shares.reduce((sum, entry) => sum + entry.share, 0);
  if (shares.length > 0 && Number.isFinite(totalShare) && totalShare !== 1) {
    const lastEntry = shares[shares.length - 1];
    const adjustment = clamp(1 - totalShare, -1, 1);
    lastEntry.share = clamp(lastEntry.share + adjustment, 0, 1);
    totalShare = shares.reduce((sum, entry) => sum + entry.share, 0);
  }

  const safeTotalShare = totalShare > 0 ? totalShare : 1;
  const normalizedShares = shares.map((entry) => ({
    config: entry.config,
    share: clamp(entry.share / safeTotalShare, 0, 1)
  }));

  const percentageDecimals = 2;
  const percentageScale = 10 ** percentageDecimals;
  const totalUnits = 100 * percentageScale;

  const scaledEntries = normalizedShares.map(({ config, share }) => {
    const safeShare = clamp(share, 0, 1);
    const rawPercentage = safeShare * 100;
    const scaledRaw = rawPercentage * percentageScale;
    const baseUnit = Math.floor(scaledRaw);
    const fraction = Math.max(0, Math.min(1, scaledRaw - baseUnit));
    return {
      config,
      baseUnit,
      fraction
    };
  });

  const baseUnits = scaledEntries.map((entry) => entry.baseUnit);
  let remainderUnits = totalUnits - baseUnits.reduce((sum, value) => sum + value, 0);
  const fractionalOrder = scaledEntries
    .map((entry, index) => ({ index, fraction: entry.fraction }))
    .sort((a, b) => b.fraction - a.fraction);

  if (fractionalOrder.length > 0) {
    let incrementIndex = 0;
    while (remainderUnits > 0) {
      const target = fractionalOrder[incrementIndex % fractionalOrder.length];
      baseUnits[target.index] += 1;
      remainderUnits -= 1;
      incrementIndex += 1;
    }

    const ascending = fractionalOrder.slice().reverse();
    let decrementIndex = 0;
    while (remainderUnits < 0 && ascending.length > 0) {
      const target = ascending[decrementIndex % ascending.length];
      if (baseUnits[target.index] > 0) {
        baseUnits[target.index] -= 1;
        remainderUnits += 1;
      }
      decrementIndex += 1;
    }
  }

  if (remainderUnits !== 0 && baseUnits.length > 0) {
    const lastIndex = baseUnits.length - 1;
    const adjusted = Math.max(0, Math.min(totalUnits, baseUnits[lastIndex] + remainderUnits));
    remainderUnits -= adjusted - baseUnits[lastIndex];
    baseUnits[lastIndex] = adjusted;
  }

  const resolvedPopulation = Number.isFinite(population) ? Math.max(0, Math.round(population)) : null;

  return scaledEntries.map(({ config }, index) => {
    const percentage = clamp(baseUnits[index] / percentageScale, 0, 100);
    const count =
      resolvedPopulation === null
        ? null
        : Math.max(0, Math.round((resolvedPopulation * percentage) / 100));
    return {
      key: config.key,
      label: config.label,
      color: config.color,
      percentage,
      population: count
    };
  });
}

function generateTowerPopulationBreakdown(population, random) {
  return generatePopulationBreakdownFromOptions(towerPopulationRaceOptions, population, random, {
    majorityIndex: 0,
    majorityShareRange: [0.9, 0.98],
    ensureMajority: true
  });
}

function generateDwarfholdPopulationBreakdown(population, random, options = {}) {
  if (!Array.isArray(dwarfholdPopulationRaceOptions) || dwarfholdPopulationRaceOptions.length === 0) {
    return [];
  }

  const randomFn = typeof random === 'function' ? random : Math.random;
  const hasNearbyHumanSettlement = Boolean(options && options.hasNearbyHumanSettlement);
  const configMap = new Map(dwarfholdPopulationRaceOptions.map((config) => [config.key, config]));
  const dwarfConfig = configMap.get('dwarves');

  if (!dwarfConfig) {
    return [];
  }

  const resolvedPopulation = Number.isFinite(population) ? Math.max(0, Math.round(population)) : null;
  const majorityRange = hasNearbyHumanSettlement ? [0.85, 0.93] : [0.9, 0.96];
  const rangeMin = clamp(majorityRange[0], 0, 1);
  const rangeMax = clamp(majorityRange[1], rangeMin, 1);
  const shareRange = rangeMax - rangeMin;
  const dwarfShare = shareRange <= 0 ? rangeMin : rangeMin + randomFn() * shareRange;
  const shares = [{ config: dwarfConfig, share: clamp(dwarfShare, 0, 1) }];
  const remainderShare = Math.max(0, 1 - shares[0].share);

  const weightPlans = hasNearbyHumanSettlement
    ? [
        { key: 'humans', min: 0.9, max: 1.6 },
        { key: 'halflings', min: 0.7, max: 1.2 },
        { key: 'gnomes', min: 0.15, max: 0.4 },
        { key: 'goblins', min: 0.12, max: 0.35 },
        { key: 'kobolds', min: 0.12, max: 0.35 },
        { key: 'others', min: 0, max: 0.2 }
      ]
    : [
        { key: 'gnomes', min: 0.8, max: 1.4 },
        { key: 'goblins', min: 0.9, max: 1.5 },
        { key: 'kobolds', min: 0.7, max: 1.2 },
        { key: 'others', min: 0, max: 0.25 }
      ];

  const weightEntries = weightPlans
    .map((plan) => {
      const config = configMap.get(plan.key);
      if (!config) {
        return null;
      }
      const min = Math.max(0, Number.isFinite(plan.min) ? plan.min : 0);
      const max = Math.max(min, Number.isFinite(plan.max) ? plan.max : min);
      if (max <= 0) {
        return null;
      }
      const weight = min + randomFn() * (max - min);
      if (weight <= 0) {
        return null;
      }
      return { config, weight };
    })
    .filter(Boolean);

  const weightSum = weightEntries.reduce((sum, entry) => sum + entry.weight, 0);

  if (remainderShare > 0 && weightSum > 0) {
    weightEntries.forEach((entry) => {
      const share = (entry.weight / weightSum) * remainderShare;
      shares.push({ config: entry.config, share });
    });
  }

  const totalShare = shares.reduce((sum, entry) => sum + entry.share, 0);
  const safeTotalShare = totalShare > 0 ? totalShare : 1;
  const normalizedShares = shares.map((entry) => ({
    config: entry.config,
    share: clamp(entry.share / safeTotalShare, 0, 1)
  }));

  const percentageDecimals = 2;
  const percentageScale = 10 ** percentageDecimals;
  const totalUnits = 100 * percentageScale;

  const scaledEntries = normalizedShares.map(({ config, share }) => {
    const safeShare = clamp(share, 0, 1);
    const rawPercentage = safeShare * 100;
    const scaledRaw = rawPercentage * percentageScale;
    const baseUnit = Math.floor(scaledRaw);
    const fraction = Math.max(0, Math.min(1, scaledRaw - baseUnit));
    return {
      config,
      baseUnit,
      fraction
    };
  });

  const baseUnits = scaledEntries.map((entry) => entry.baseUnit);
  let remainderUnits = totalUnits - baseUnits.reduce((sum, value) => sum + value, 0);
  const fractionalOrder = scaledEntries
    .map((entry, index) => ({ index, fraction: entry.fraction }))
    .sort((a, b) => b.fraction - a.fraction);

  if (fractionalOrder.length > 0) {
    let incrementIndex = 0;
    while (remainderUnits > 0) {
      const target = fractionalOrder[incrementIndex % fractionalOrder.length];
      baseUnits[target.index] += 1;
      remainderUnits -= 1;
      incrementIndex += 1;
    }

    const ascending = fractionalOrder.slice().reverse();
    let decrementIndex = 0;
    while (remainderUnits < 0 && ascending.length > 0) {
      const target = ascending[decrementIndex % ascending.length];
      if (baseUnits[target.index] > 0) {
        baseUnits[target.index] -= 1;
        remainderUnits += 1;
      }
      decrementIndex += 1;
    }
  }

  if (remainderUnits !== 0 && baseUnits.length > 0) {
    const lastIndex = baseUnits.length - 1;
    const adjusted = Math.max(0, Math.min(totalUnits, baseUnits[lastIndex] + remainderUnits));
    remainderUnits -= adjusted - baseUnits[lastIndex];
    baseUnits[lastIndex] = adjusted;
  }

  return scaledEntries.map(({ config }, index) => {
    const percentage = clamp(baseUnits[index] / percentageScale, 0, 100);
    const count =
      resolvedPopulation === null
        ? null
        : Math.max(0, Math.round((resolvedPopulation * percentage) / 100));
    return {
      key: config.key,
      label: config.label,
      color: config.color,
      percentage,
      population: count
    };
  });
}

function generateEvilWizardTowerPopulationBreakdown(population, random, wizardCount) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const resolvedPopulation = Math.max(0, Math.round(Number.isFinite(population) ? population : 0));
  const resolvedWizardCount = Math.max(
    0,
    Math.min(
      Math.round(Number.isFinite(wizardCount) ? wizardCount : 0),
      resolvedPopulation
    )
  );
  const remainderPopulation = Math.max(0, resolvedPopulation - resolvedWizardCount);

  const remainderBreakdown =
    remainderPopulation > 0
      ? generatePopulationBreakdownFromOptions(
          evilWizardTowerPopulationRaceOptions.slice(1),
          remainderPopulation,
          randomFn,
          {
            majorityIndex: 1,
            majorityShareRange: [0.35, 0.6],
            ensureMajority: true
          }
        )
      : [];

  const wizardEntry = {
    ...evilWizardTowerPopulationRaceOptions[0],
    percentage:
      resolvedPopulation === 0
        ? 0
        : clamp((resolvedWizardCount / resolvedPopulation) * 100, 0, 100),
    population: resolvedWizardCount
  };

  if (remainderBreakdown.length === 0) {
    return [wizardEntry];
  }

  return [
    wizardEntry,
    ...remainderBreakdown.map((entry) => ({
      ...entry,
      percentage:
        resolvedPopulation === 0
          ? 0
          : clamp((entry.population / resolvedPopulation) * 100, 0, 100)
    }))
  ];
}

function generateTownPopulationBreakdown(population, random) {
  return generatePopulationBreakdownFromOptions(townPopulationRaceOptions, population, random, {
    majorityIndex: 0,
    majorityShareRange: [0.6, 0.85],
    ensureMajority: true
  });
}

function generateWoodElfGrovePopulationBreakdown(population, random) {
  return generatePopulationBreakdownFromOptions(
    woodElfGrovePopulationRoleOptions,
    population,
    random,
    {
      majorityIndex: 0,
      majorityShareRange: [0.9, 0.97],
      ensureMajority: true
    }
  );
}

function generateLizardmenCityPopulationBreakdown(population, random) {
  return generatePopulationBreakdownFromOptions(
    lizardmenCityPopulationRoleOptions,
    population,
    random,
    {
      majorityIndex: 0,
      majorityShareRange: [0.45, 0.6],
      ensureMajority: true
    }
  );
}

function generateDwarfholdName(random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const prefix = pickRandomFrom(dwarfholdNamePrefixes, randomFn) || 'Stone';
  const suffix = pickRandomFrom(dwarfholdNameSuffixes, randomFn) || 'hold';
  const baseName = `${prefix}${suffix}`;
  const descriptor = pickRandomFrom(dwarfholdNameDescriptors, randomFn);
  const region = pickRandomFrom(dwarfholdNameRegions, randomFn);
  const styleRoll = randomFn();
  if (styleRoll < 0.4 && descriptor) {
    return `${baseName} ${descriptor}`;
  }
  if (styleRoll < 0.8 && region) {
    return `${baseName} of ${region}`;
  }
  if (descriptor && styleRoll < 0.95) {
    return `${baseName} ${descriptor}`;
  }
  return baseName;
}

function generateDwarfholdDetails(name, random, options = {}) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const isAbandoned = Boolean(options && options.isAbandoned);

  if (isAbandoned) {
    return {
      type: 'abandonedDwarfhold',
      classification: 'Ruined Dwarfhold',
      name,
      population: 0,
      populationLabel: 'Population',
      populationDescriptor: 'dwarves',
      isSettlement: true,
      ruler: null,
      foundedYearsAgo: null,
      prominentClan: null,
      prominentGroup: null,
      prominentGroupLabel: null,
      hallmark: null,
      majorGuilds: [],
      majorExports: [],
      populationBreakdown: []
    };
  }

  const population = Math.max(120, Math.floor(450 + randomFn() * 4200));
  const genderRoll = randomFn();
  const gender = genderRoll < 0.9 ? 'male' : 'female';
  const namePool = dwarfNamePools[gender] || dwarfNamePools.male;
  const firstName = pickRandomFrom(namePool, randomFn) || 'Urist';
  const clanOption = pickRandomFrom(dwarfOptions.clan, randomFn) || dwarfOptions.clan?.[0];
  const clanName = clanOption?.label || 'Stonebeard';
  const titlePool = dwarfholdRulerTitles[gender] || dwarfholdRulerTitles.male;
  const titleFallback = 'Thane';
  const thaneBiasRoll = randomFn();
  const nonThaneTitles = titlePool.filter((title) => title !== 'Thane');
  const rulerTitle =
    thaneBiasRoll < 0.65 || nonThaneTitles.length === 0
      ? 'Thane'
      : pickRandomFrom(nonThaneTitles, randomFn) || titleFallback;
  const hallmark = pickRandomFrom(dwarfholdHallmarks, randomFn) ||
    'Renowned for stout walls and heartier spirits.';
  const foundedYearsAgo = Math.max(30, Math.floor(80 + randomFn() * 540));
  const prominentClanOption = randomFn() < 0.35 ? pickRandomFrom(dwarfOptions.clan, randomFn) : clanOption;
  const prominentClan = prominentClanOption?.label || clanName;
  const majorGuildCount = clamp(Math.floor(2 + randomFn() * 3), 1, dwarfGuildOptions.length);
  const majorGuilds = pickUniqueFrom(
    dwarfGuildOptions.map((option) => option.label),
    majorGuildCount,
    randomFn
  );
  const majorExportCount = clamp(Math.floor(2 + randomFn() * 2), 1, dwarfholdExportOptions.length);
  const majorExports = pickUniqueFrom(dwarfholdExportOptions, majorExportCount, randomFn);
  const majorClanPool = Array.isArray(dwarfOptions?.clan)
    ? dwarfOptions.clan.map((option) => option?.label).filter((label) => typeof label === 'string' && label.trim())
    : [];
  let majorClans = [];
  if (majorClanPool.length > 0) {
    const targetCount = clamp(Math.floor(2 + randomFn() * 3), 2, majorClanPool.length);
    const available = majorClanPool.filter((label) => label !== prominentClan);
    const additional = pickUniqueFrom(available, Math.max(0, targetCount - 1), randomFn);
    majorClans = [prominentClan, ...additional];
  }
  if (majorClans.length > 0) {
    majorClans = Array.from(new Set(majorClans));
  }
  const majorClansDescription = formatListWithConjunction(majorClans);
  const description = majorClansDescription ? `Major clans represented: ${majorClansDescription}.` : null;
  const populationBreakdown = generateDwarfholdPopulationBreakdown(population, randomFn, {
    hasNearbyHumanSettlement: Boolean(options && options.hasNearbyHumanSettlement)
  });

  const classification = population >= 4000 ? 'greatDwarfhold' : 'dwarfhold';
  const classificationLabel = classification === 'greatDwarfhold' ? 'Great Dwarfhold' : 'Dwarfhold';

  return {
    type: classification,
    classification: classificationLabel,
    name,
    population,
    populationLabel: 'Population',
    populationDescriptor: 'dwarves',
    isSettlement: true,
    ruler: {
      title: rulerTitle,
      name: `${firstName} ${clanName}`
    },
    foundedYearsAgo,
    prominentClan,
    prominentGroup: prominentClan,
    prominentGroupLabel: 'Prominent Clan',
    hallmark,
    majorGuilds,
    majorExports,
    majorClans,
    majorClansLabel: 'Major Clans',
    populationBreakdown,
    description
  };
}

function generateMineName(random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const prefix = pickRandomFrom(mineNamePrefixes, randomFn) || 'Iron';
  const suffix = pickRandomFrom(mineNameSuffixes, randomFn) || 'delve';
  const descriptor = pickRandomFrom(mineNameDescriptors, randomFn) || 'Mine';
  const combinedSuffix = suffix.charAt(0).toUpperCase() + suffix.slice(1);
  const style = randomFn();
  if (style < 0.35) {
    return `${prefix}${combinedSuffix} ${descriptor}`;
  }
  if (style < 0.65) {
    return `${prefix} ${descriptor}`;
  }
  if (style < 0.85) {
    return `${descriptor} of ${prefix}${combinedSuffix}`;
  }
  return `${prefix}${combinedSuffix}`;
}

function generateMineDetails(name, random, options = {}) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const profile = pickRandomFrom(mineResourceProfiles, randomFn) || mineResourceProfiles[0];
  const hazard = pickRandomFrom(mineHazardOptions, randomFn) || mineHazardOptions[0];
  const crew = pickRandomFrom(mineCrewNames, randomFn) || mineCrewNames[0];
  const workforce = Math.max(28, Math.floor(60 + randomFn() * 220));
  const overseerRoll = randomFn();
  const overseerGender = overseerRoll < 0.6 ? 'male' : overseerRoll < 0.9 ? 'female' : 'male';
  const overseerPool = dwarfNamePools[overseerGender] || dwarfNamePools.male;
  const overseerFirst = pickRandomFrom(overseerPool, randomFn) || 'Urist';
  const clanOption = pickRandomFrom(dwarfClanOptions, randomFn) || dwarfClanOptions[0];
  const overseerClan = clanOption?.label || 'Stonebeard';
  const overseerName = `${overseerFirst} ${overseerClan}`;
  const foundedYearsAgo = Math.max(2, Math.floor(5 + randomFn() * 60));
  const shiftCount = Math.max(2, Math.round(2 + randomFn() * 2));
  const nearestHoldLabel = formatSettlementLabelForDetails(options?.nearestDwarfhold);
  const nearestHoldDistance = Number.isFinite(options?.nearestHoldDistance)
    ? Math.max(1, Math.round(options.nearestHoldDistance))
    : null;

  const guildSet = new Set(['Miners Guild']);
  if (randomFn() < 0.65) {
    guildSet.add('Smelters Guild');
  }
  if (randomFn() < 0.35) {
    guildSet.add('Engineers Guild');
  }
  const majorGuilds = Array.from(guildSet);

  const exports = [profile.export];
  if (randomFn() < 0.45) {
    exports.push(pickRandomFrom(mineSecondaryExports, randomFn) || mineSecondaryExports[0]);
  }
  const uniqueExports = Array.from(new Set(exports));

  const hallmarkParts = [profile.description];
  if (nearestHoldLabel) {
    hallmarkParts.push(
      `Ore caravans supply ${nearestHoldLabel}${
        nearestHoldDistance ? ` after ${nearestHoldDistance} leagues through the passes` : ''
      }.`
    );
  }
  const hazardSentence = `Hazard: ${hazard.charAt(0).toUpperCase()}${hazard.slice(1)}.`;
  hallmarkParts.push(hazardSentence);
  const hallmark = hallmarkParts.join(' ');

  const breakdownTemplate = [
    { key: 'dwarves', label: 'Dwarves', percentage: 0.72, color: '#c08452' },
    { key: 'humans', label: 'Humans', percentage: 0.1, color: '#d1b58f' },
    { key: 'gnomes', label: 'Gnomes', percentage: 0.08, color: '#b8a7d9' },
    { key: 'others', label: 'Others', percentage: 0.1, color: '#9e9e9e' }
  ];

  let assigned = 0;
  const populationBreakdown = breakdownTemplate.map((entry, index) => {
    let percentage = entry.percentage;
    if (index === breakdownTemplate.length - 1) {
      percentage = clamp(1 - assigned, 0, 1);
    }
    assigned += percentage;
    return {
      key: entry.key,
      label: entry.label,
      percentage,
      color: entry.color,
      population: Math.max(0, Math.round(workforce * percentage))
    };
  });

  return {
    type: 'mine',
    classification: 'Mine',
    name,
    population: workforce,
    populationLabel: 'Workforce',
    populationDescriptor: 'miners',
    isSettlement: true,
    ruler: {
      title: 'Overseer',
      name: overseerName
    },
    foundedYearsAgo,
    prominentGroup: `${crew} — Shift ${shiftCount}`,
    prominentGroupLabel: 'Crew in Charge',
    majorGuilds,
    majorGuildsLabel: 'Guild Presence',
    majorExports: uniqueExports,
    majorExportsLabel: 'Primary Exports',
    populationBreakdown,
    hallmark,
    hallmarkLabel: 'Notable Features'
  };
}

function generateHillholdName(random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const prefix = pickRandomFrom(hillholdNamePrefixes, randomFn) || 'Stone';
  const suffix = pickRandomFrom(hillholdNameSuffixes, randomFn) || 'hold';
  const descriptor = pickRandomFrom(hillholdNameDescriptors, randomFn);
  const baseName = `${prefix}${suffix}`;
  const style = randomFn();
  if (style < 0.3 && descriptor) {
    return `${baseName} ${descriptor}`;
  }
  if (style < 0.6 && descriptor) {
    return `${descriptor} Hillhold`;
  }
  if (style < 0.85) {
    return `${baseName} Hillhold`;
  }
  return `${baseName} Hold`;
}

function generateHillholdDetails(name, random, options = {}) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const population = Math.max(90, Math.floor(180 + randomFn() * 1600));
  let classification = 'Hillhold Outpost';
  if (population >= 1500) {
    classification = 'Great Hillhold';
  } else if (population >= 900) {
    classification = 'Foothill Stronghold';
  } else if (population >= 420) {
    classification = 'Hillhold';
  }

  const genderRoll = randomFn();
  const gender = genderRoll < 0.82 ? 'male' : genderRoll < 0.95 ? 'female' : 'neutral';
  const namePool = dwarfNamePools[gender] || dwarfNamePools.male;
  const firstName = pickRandomFrom(namePool, randomFn) || 'Urist';
  const clanOption = pickRandomFrom(dwarfOptions.clan, randomFn) || dwarfOptions.clan?.[0];
  const clanName = clanOption?.label || 'Stonebeard';
  const wardenTitle = pickRandomFrom(hillholdWardenTitles, randomFn) || 'Holdthane';
  const hallmark = pickRandomFrom(hillholdHallmarks, randomFn) || hillholdHallmarks[0];
  const watchOrder = pickRandomFrom(hillholdWatchOrders, randomFn) || 'Ridgeguard Brotherhood';
  const exportCount = clamp(Math.floor(1 + randomFn() * 2), 1, hillholdExports.length);
  const exports = pickUniqueFrom(hillholdExports, exportCount, randomFn);
  const defensiveTrait = pickRandomFrom(hillholdDefensiveTraits, randomFn) || hillholdDefensiveTraits[0];
  const sentinelFocus = pickRandomFrom(hillholdSentinelFocuses, randomFn) || hillholdSentinelFocuses[0];
  const foundedYearsAgo = Math.max(18, Math.floor(40 + randomFn() * 260));
  const majorClanPool = Array.isArray(dwarfOptions?.clan)
    ? dwarfOptions.clan.map((option) => option?.label).filter((label) => typeof label === 'string' && label.trim())
    : [];
  let majorClans = [];
  if (majorClanPool.length > 0) {
    const targetCount = clamp(Math.floor(2 + randomFn() * 2), 2, majorClanPool.length);
    const available = majorClanPool.filter((label) => label !== clanName);
    const additional = pickUniqueFrom(available, Math.max(0, targetCount - 1), randomFn);
    majorClans = [clanName, ...additional];
  }
  if (majorClans.length > 0) {
    majorClans = Array.from(new Set(majorClans));
  }

  const nearestHoldInfo = options?.nearestDwarfhold || null;
  const nearestHoldPoint = nearestHoldInfo?.point || null;
  const nearestHoldName =
    nearestHoldPoint?.name ||
    nearestHoldPoint?.structureName ||
    (typeof nearestHoldPoint?.label === 'string' ? nearestHoldPoint.label : null);
  const dwarfholdDistance = Number.isFinite(nearestHoldInfo?.distance)
    ? Math.max(1, Math.round(nearestHoldInfo.distance))
    : null;
  const mountainDistance = Number.isFinite(options?.mountainDistance)
    ? Math.max(1, Math.round(options.mountainDistance))
    : null;

  const caravanSentence = nearestHoldName
    ? `Caravans from ${nearestHoldName} arrive after ${dwarfholdDistance || 'several'} leagues along the ridge paths.`
    : 'It stands as an independent bastion for scattered hill clans.';
  const beaconSentence = mountainDistance
    ? `Beacon-crews report the nearest crags are only ${mountainDistance} leagues away.`
    : 'Beacon-crews keep sight on the surrounding crags.';
  const descriptionParts = [
    `${watchOrder} keep watch here, ${sentinelFocus}. ${defensiveTrait} ${caravanSentence} ${beaconSentence}`.trim()
  ];
  const majorClansDescription = formatListWithConjunction(majorClans);
  if (majorClansDescription) {
    descriptionParts.push(`Major clans present: ${majorClansDescription}.`);
  }
  const description = descriptionParts.join(' ').trim();

  const populationBreakdown = generateDwarfholdPopulationBreakdown(population, randomFn, {
    hasNearbyHumanSettlement: Boolean(options?.hasNearbyHumanSettlement)
  });

  return {
    type: 'hillhold',
    classification,
    name,
    population,
    populationLabel: 'Population',
    populationDescriptor: 'dwarves',
    isSettlement: true,
    ruler: {
      title: wardenTitle,
      name: `${firstName} ${clanName}`
    },
    foundedYearsAgo,
    prominentGroup: watchOrder,
    prominentGroupLabel: 'Sentinel Order',
    hallmark,
    hallmarkLabel: 'Renowned For',
    majorExports: exports,
    majorExportsLabel: 'Exports',
    majorClans,
    majorClansLabel: 'Major Clans',
    populationBreakdown,
    description
  };
}

function generateEvilWizardTowerDetails(name, random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const population = Math.max(1, Math.floor(1 + randomFn() * 599));
  const wizardRoll = randomFn();
  const wizardCount =
    wizardRoll < 0.7
      ? 1
      : 2 + Math.floor(randomFn() * 9);
  const resolvedWizardCount = Math.max(1, Math.min(wizardCount, population));
  let classification = 'Wizard Tower';
  if (population >= 400) {
    classification = 'Dread Citadel';
  } else if (population >= 240) {
    classification = 'Shadow Spire';
  } else if (population >= 140) {
    classification = 'Arcane Bastion';
  }

  const rulerTitle = pickRandomFrom(evilWizardRulerTitles, randomFn) || 'Archwizard';
  const rulerName = generateEvilWizardName(randomFn);
  const foundedYearsAgo = Math.max(6, Math.floor(20 + randomFn() * 240));
  const cabal = pickRandomFrom(evilWizardCabalNames, randomFn);
  const prominentGroup = cabal || null;
  const hallmark = pickRandomFrom(evilWizardTowerHallmarks, randomFn) ||
    'Shrouded in eldritch wards that thrum through the night.';
  const populationBreakdown = generateEvilWizardTowerPopulationBreakdown(
    population,
    randomFn,
    resolvedWizardCount
  );

  return {
    type: 'evilWizardTower',
    classification,
    name,
    population,
    populationLabel: 'Population',
    populationDescriptor: 'denizens',
    isSettlement: true,
    ruler: {
      title: rulerTitle,
      name: rulerName
    },
    foundedYearsAgo,
    prominentGroup,
    prominentGroupLabel: 'Dominant Cabal',
    hallmark,
    hallmarkLabel: 'Notorious For',
    populationBreakdown
  };
}

function generateTownName(random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const prefix = pickRandomFrom(townNamePrefixes, randomFn) || 'Oak';
  const suffix = pickRandomFrom(townNameSuffixes, randomFn) || 'ford';
  const baseName = `${prefix}${suffix}`;
  const descriptor = pickRandomFrom(townNameDescriptors, randomFn);
  const styleRoll = randomFn();
  if (styleRoll < 0.3 && descriptor) {
    return `${baseName} ${descriptor}`;
  }
  if (styleRoll < 0.65) {
    return baseName;
  }
  return `Town of ${baseName}`;
}

function generateSnowVillageName(random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const prefix = pickRandomFrom(snowVillageNamePrefixes, randomFn) || 'Siku';
  const suffix = pickRandomFrom(snowVillageNameSuffixes, randomFn) || 'vik';
  const baseName = `${prefix}${suffix}`;
  const descriptor = pickRandomFrom(snowVillageNameDescriptors, randomFn);
  const styleRoll = randomFn();
  if (descriptor && styleRoll < 0.35) {
    return `${baseName} ${descriptor}`;
  }
  if (descriptor && styleRoll > 0.85) {
    return `${descriptor} of ${baseName}`;
  }
  return baseName;
}

function generateTownDetails(name, random, options = {}) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const isSnowVillage = Boolean(options.snowVillage);
  const population = isSnowVillage
    ? Math.max(20, Math.floor(30 + randomFn() * 70))
    : Math.max(20, Math.floor(20 + randomFn() * 6000));
  let classification = 'Village';
  if (!isSnowVillage) {
    if (population >= 6000) {
      classification = 'City';
    } else if (population >= 3600) {
      classification = 'Large Town';
    } else if (population >= 100) {
      classification = 'Town';
    }
  }

  const type = classification === 'City' ? 'city' : classification === 'Village' ? 'village' : 'town';
  const genderRoll = randomFn();
  const gender = genderRoll < 0.45 ? 'male' : genderRoll < 0.9 ? 'female' : 'neutral';
  const firstNamePool = isSnowVillage
    ? (gender === 'male' && snowVillageLeaderNamePools.male) ||
      (gender === 'female' && snowVillageLeaderNamePools.female) ||
      snowVillageLeaderNamePools.neutral
    : (gender === 'male' && townFirstNamePools.male) ||
      (gender === 'female' && townFirstNamePools.female) ||
      townFirstNamePools.neutral;
  const fallbackPool = isSnowVillage
    ? snowVillageLeaderNamePools.neutral || snowVillageLeaderNamePools.male || []
    : townFirstNamePools.male || townFirstNamePools.neutral || [];
  const firstName = pickRandomFrom(
    firstNamePool && firstNamePool.length > 0 ? firstNamePool : fallbackPool,
    randomFn
  ) || (isSnowVillage ? 'Siku' : 'Aldric');
  const familyNamePool = isSnowVillage ? snowVillageClanNames : townProminentFamilyNames;
  const defaultFamilyName = isSnowVillage ? 'Qimmiq' : 'Ambermere';
  const familyName = pickRandomFrom(familyNamePool, randomFn) || defaultFamilyName;
  const rulerTitle = isSnowVillage
    ? (pickRandomFrom(
        ((gender === 'male' && snowVillageRulerTitles.male) ||
          (gender === 'female' && snowVillageRulerTitles.female) ||
          snowVillageRulerTitles.neutral) ||
          snowVillageRulerTitles.neutral,
        randomFn
      ) || 'Isumataq')
    : resolveTownRulerTitle(gender, randomFn);
  const hallmark = pickRandomFrom(townHallmarks, randomFn) || 'Bustling markets draw traders from afar.';
  const foundedYearsAgo = Math.max(12, Math.floor(30 + randomFn() * 420));
  const prominentGroupLabel = isSnowVillage ? 'Prominent Clan' : 'Prominent House';
  const prominentFamily = pickRandomFrom(familyNamePool, randomFn) || familyName;
  const prominentGroup = isSnowVillage ? `${prominentFamily} Clan` : `House ${prominentFamily}`;
  let majorGuilds = [];
  if (classification !== 'Village') {
    const majorGuildCount = clamp(Math.floor(1 + randomFn() * 3), 1, townGuildOptions.length);
    majorGuilds = pickUniqueFrom(townGuildOptions, majorGuildCount, randomFn);
  }
  const majorExportCount = clamp(Math.floor(1 + randomFn() * 3), 1, townExportOptions.length);
  const majorExports = pickUniqueFrom(townExportOptions, majorExportCount, randomFn);
  const populationBreakdown = generateTownPopulationBreakdown(population, randomFn);
  let populationDescriptor = 'residents';
  if (classification === 'City') {
    populationDescriptor = 'citizens';
  } else if (classification === 'Large Town') {
    populationDescriptor = 'townsfolk';
  } else if (classification === 'Village') {
    populationDescriptor = 'villagers';
  }

  return {
    type,
    classification,
    name,
    population,
    populationLabel: 'Population',
    populationDescriptor,
    isSettlement: true,
    ruler: {
      title: rulerTitle,
      name: `${firstName} ${familyName}`
    },
    foundedYearsAgo,
    prominentGroup,
    prominentGroupLabel,
    hallmark,
    majorGuilds,
    majorExports,
    populationBreakdown
  };
}

function generateHamletDetails(name, random, options = {}) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const isSnowHamlet = Boolean(options.snowHamlet);
  const baseDetails = generateTownDetails(name, randomFn, { snowVillage: isSnowHamlet });
  const population = isSnowHamlet
    ? Math.max(18, Math.floor(24 + randomFn() * 60))
    : Math.max(22, Math.floor(28 + randomFn() * 140));
  const hallmark = pickRandomFrom(townHallmarks, randomFn) || baseDetails.hallmark;
  const exportCount = clamp(Math.floor(randomFn() * 2) + 1, 1, townExportOptions.length);
  const majorExports = pickUniqueFrom(townExportOptions, exportCount, randomFn);
  return {
    ...baseDetails,
    type: 'village',
    classification: 'Village',
    population,
    populationDescriptor: 'villagers',
    majorGuilds: [],
    majorExports,
    hallmark
  };
}

function generateEvilWizardName(random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const givenName = pickRandomFrom(evilWizardGivenNames, randomFn) || 'Malachar';
  const surnameRoll = randomFn();
  let name = givenName;
  if (surnameRoll < 0.55) {
    const surname = pickRandomFrom(evilWizardSurnames, randomFn);
    if (surname) {
      name = `${givenName} ${surname}`;
    }
  }
  const epithet = pickRandomFrom(evilWizardEpithets, randomFn);
  if (epithet && randomFn() < 0.8) {
    const baseName = name || givenName;
    name = `${baseName} ${epithet}`;
  }
  return name;
}

function generateTowerName(random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const prefix = pickRandomFrom(towerNamePrefixes, randomFn) || 'Obsidian';
  const noun = pickRandomFrom(towerNameNouns, randomFn) || 'Tower';
  const qualifier = pickRandomFrom(towerNameQualifiers, randomFn);
  const styleRoll = randomFn();
  if (styleRoll < 0.35 && qualifier) {
    return `${prefix} ${noun} ${qualifier}`;
  }
  if (styleRoll < 0.65) {
    return `${prefix} ${noun}`;
  }
  if (qualifier) {
    return `Tower ${qualifier}`;
  }
  return `${prefix} ${noun}`;
}

function generateTowerDetails(name, random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const population = Math.max(24, Math.floor(60 + randomFn() * 360));
  let classification = 'Watchtower';
  if (population >= 320) {
    classification = 'Border Fortress';
  } else if (population >= 240) {
    classification = 'Signal Bastion';
  } else if (population >= 160) {
    classification = 'Garrison Keep';
  } else if (population >= 100) {
    classification = 'Beacon Tower';
  }

  const commanderTitle = pickRandomFrom(towerCommanderTitles, randomFn) || 'Castellan';
  const firstName = pickRandomFrom(towerCommanderGivenNames, randomFn) || 'Aldren';
  const surname = pickRandomFrom(towerCommanderSurnames, randomFn) || 'Stonewatch';
  const commanderName = `${firstName} ${surname}`;
  const foundedYearsAgo = Math.max(6, Math.floor(14 + randomFn() * 220));
  const prominentGroup = pickRandomFrom(towerOrderNames, randomFn) || 'Order of the Dawnwatch';
  const hallmark = pickRandomFrom(towerHallmarks, randomFn) ||
    'Maintains vigilant watch over the frontier beacons.';
  const detachmentCount = clamp(Math.floor(1 + randomFn() * 3), 1, towerDetachmentOptions.length);
  const detachments = pickUniqueFrom(towerDetachmentOptions, detachmentCount, randomFn);
  const dutyCount = clamp(Math.floor(1 + randomFn() * 2), 1, towerDutyOptions.length);
  const duties = pickUniqueFrom(towerDutyOptions, dutyCount, randomFn);
  const populationBreakdown = generateTowerPopulationBreakdown(population, randomFn);

  return {
    type: 'tower',
    classification,
    name,
    population,
    populationLabel: 'Garrison Strength',
    populationDescriptor: 'guards',
    isSettlement: true,
    ruler: {
      title: commanderTitle,
      name: commanderName
    },
    foundedYearsAgo,
    prominentGroup,
    prominentGroupLabel: 'Garrison Order',
    hallmark,
    hallmarkLabel: 'Renowned For',
    majorGuilds: detachments,
    majorGuildsLabel: 'Special Detachments',
    majorExports: duties,
    majorExportsLabel: 'Primary Duties',
    populationBreakdown
  };
}

function generateWoodElfGroveName(random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const prefix = pickRandomFrom(woodElfGrovePrefixes, randomFn) || 'Sylvan';
  const suffix = pickRandomFrom(woodElfGroveSuffixes, randomFn) || 'Grove';
  const baseName = `${prefix} ${suffix}`;
  const descriptor = pickRandomFrom(woodElfGroveDescriptors, randomFn);
  if (descriptor && randomFn() < 0.65) {
    return `${baseName} ${descriptor}`;
  }
  return baseName;
}

function generateWoodElfGroveDetails(name, random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const population = Math.max(60, Math.floor(140 + randomFn() * 420));
  let classification = 'Forest Retreat';
  if (population >= 500) {
    classification = 'Ancient Grove';
  } else if (population >= 360) {
    classification = 'Sacred Grove';
  } else if (population >= 240) {
    classification = 'Hidden Enclave';
  } else if (population >= 180) {
    classification = 'Canopy Sanctuary';
  }

  let populationDescriptor = 'wardens';
  if (classification === 'Ancient Grove') {
    populationDescriptor = 'elders';
  } else if (classification === 'Sacred Grove') {
    populationDescriptor = 'keepers';
  } else if (classification === 'Hidden Enclave') {
    populationDescriptor = 'sentinels';
  } else if (classification === 'Canopy Sanctuary') {
    populationDescriptor = 'guardians';
  }

  const elderTitle = pickRandomFrom(woodElfGroveElderTitles, randomFn) || 'Grove Warden';
  const givenName = pickRandomFrom(woodElfGroveElderGivenNames, randomFn) || 'Aelar';
  const surname = pickRandomFrom(woodElfGroveElderSurnames, randomFn) || 'Silversong';
  const hallmark = pickRandomFrom(woodElfGroveHallmarks, randomFn) ||
    'Moonlit rites that weave auroras between the branches.';
  const foundedYearsAgo = Math.max(40, Math.floor(120 + randomFn() * 520));
  const prominentGroup = pickRandomFrom(woodElfGroveCircleNames, randomFn) || 'Circle of the Silver Bough';
  const majorGuildCount = clamp(Math.floor(1 + randomFn() * 2), 1, woodElfGroveOrders.length);
  const majorGuilds = pickUniqueFrom(woodElfGroveOrders, majorGuildCount, randomFn);
  const majorExportCount = clamp(Math.floor(1 + randomFn() * 2), 1, woodElfGroveExports.length);
  const majorExports = pickUniqueFrom(woodElfGroveExports, majorExportCount, randomFn);
  const populationBreakdown = generateWoodElfGrovePopulationBreakdown(population, randomFn);

  return {
    type: 'woodElfGrove',
    classification,
    name,
    population,
    populationLabel: 'Population',
    populationDescriptor,
    isSettlement: true,
    ruler: {
      title: elderTitle,
      name: `${givenName} ${surname}`
    },
    foundedYearsAgo,
    prominentGroup,
    prominentGroupLabel: 'Circle in Residence',
    hallmark,
    hallmarkLabel: 'Revered For',
    majorGuilds,
    majorGuildsLabel: 'Sacred Orders',
    majorExports,
    majorExportsLabel: 'Seasonal Offerings',
    populationBreakdown
  };
}

function generateLizardmenCityName(random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const prefix = pickRandomFrom(lizardmenCityPrefixes, randomFn) || 'Ix';
  const suffix = pickRandomFrom(lizardmenCitySuffixes, randomFn) || 'tlan';
  const extraSuffix = randomFn() < 0.25 ? pickRandomFrom(lizardmenCitySuffixes, randomFn) : '';
  const separatorRoll = randomFn();
  let separator = '';
  if (separatorRoll < 0.35) {
    separator = "'";
  } else if (separatorRoll < 0.45) {
    separator = '-';
  }
  const baseName = `${prefix}${separator}${suffix}${extraSuffix}`;
  return baseName;
}

function generateLizardmenCityDetails(name, random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const population = Math.max(400, Math.floor(2600 + randomFn() * 3200));
  const classification = pickRandomFrom(lizardmenCityClassifications, randomFn) || 'Temple City';
  const hallmark =
    pickRandomFrom(lizardmenCityHallmarks, randomFn) || 'Sun-drenched step pyramids rising above the canopy.';
  const rulerTitle = pickRandomFrom(lizardmenCityRulerTitles, randomFn) || 'High Scale-Priest';
  const rulerName = pickRandomFrom(lizardmenCityRulerNames, randomFn) || 'Xilqua';
  const rulerLabel = randomFn() < 0.5 ? 'Supreme Voice' : 'Sacred Regent';
  const foundedYearsAgo = Math.max(80, Math.floor(140 + randomFn() * 460));
  const majorGuildCount = clamp(Math.floor(1 + randomFn() * 2), 1, lizardmenCityOrders.length);
  const majorGuilds = pickUniqueFrom(lizardmenCityOrders, majorGuildCount, randomFn);
  const majorExportCount = clamp(Math.floor(1 + randomFn() * 2), 1, lizardmenCityExports.length);
  const majorExports = pickUniqueFrom(lizardmenCityExports, majorExportCount, randomFn);
  const prominentGroup =
    majorGuilds.length > 0
      ? pickRandomFrom(majorGuilds, randomFn)
      : pickRandomFrom(lizardmenCityOrders, randomFn) || 'Sunblood Procession';
  const populationBreakdown = generateLizardmenCityPopulationBreakdown(population, randomFn);

  return {
    type: 'lizardmenCity',
    classification,
    name,
    population,
    populationLabel: 'Population',
    populationDescriptor: 'scaled souls',
    isSettlement: true,
    ruler: {
      title: rulerTitle,
      name: rulerName,
      label: rulerLabel
    },
    foundedYearsAgo,
    prominentGroup,
    prominentGroupLabel: 'Sacred Order',
    hallmark,
    hallmarkLabel: 'Revered For',
    majorGuilds,
    majorGuildsLabel: 'Temple Orders',
    majorExports,
    majorExportsLabel: 'Tributes & Trade',
    populationBreakdown
  };
}

function generateOrcCampName(random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const adjective = pickRandomFrom(orcTribeAdjectives, randomFn) || 'Ironjaw';
  const noun = pickRandomFrom(orcTribeNouns, randomFn) || 'Clan';
  const style = randomFn();
  if (style < 0.35) {
    return `${adjective} ${noun} Camp`;
  }
  if (style < 0.7) {
    return `${adjective} ${noun} Warcamp`;
  }
  return `Camp of the ${adjective} ${noun}`;
}

function generateOrcCampDetails(name, random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const adjective = pickRandomFrom(orcTribeAdjectives, randomFn) || 'Ironjaw';
  const noun = pickRandomFrom(orcTribeNouns, randomFn) || 'Clan';
  const tribeName = `${adjective} ${noun}`;
  const warLeader = pickRandomFrom(orcWarLeaders, randomFn) || 'Gorath the Red';
  const feature = pickRandomFrom(orcCampFeatures, randomFn) ||
    'War drums thunder at dusk from within the palisade.';
  const threatLevel = pickRandomFrom(orcThreatDescriptors, randomFn) || 'Severe';
  const raidingFocus = pickRandomFrom(['plundered caravans', 'frontier villages', 'wandering merchants', 'remote farmsteads'], randomFn);

  return {
    type: 'orcCamp',
    name,
    displayType: 'Orc War Camp',
    tribe: tribeName,
    warLeader,
    threatLevel,
    inhabitants: `${tribeName} warriors`,
    description: `${tribeName} raiders gather here, their sights set on ${raidingFocus || 'nearby lands'}. ${feature}`,
    banner: pickRandomFrom(orcTribeAdjectives, randomFn) || 'Rageborn',
    vow: 'Blood Oaths'
  };
}

function generateTravelerCampName(random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const adjectives = ['Lantern', 'Amber', 'Star', 'Frontier', 'Drift', 'Iron', 'Wayfarer', 'Cedar'];
  const landmarks = ['Crossing', 'Hollow', 'Trail', 'Fork', 'Pass', 'Fields', 'Meadow'];
  const nouns = ['Camp', 'Encampment', 'Outpost', 'Commons', 'Waystation'];
  const adjective = pickRandomFrom(adjectives, randomFn) || 'Lantern';
  const noun = pickRandomFrom(nouns, randomFn) || 'Camp';
  const landmark = pickRandomFrom(landmarks, randomFn);
  const style = randomFn();
  if (style < 0.35 && landmark) {
    return `${adjective} ${landmark} ${noun}`;
  }
  if (style < 0.7) {
    return `${adjective} ${noun}`;
  }
  return `${noun} of the ${adjective} Road`;
}

function formatSettlementLabelForDetails(settlement) {
  if (!settlement) {
    return null;
  }
  if (typeof settlement.name === 'string' && settlement.name) {
    return settlement.name;
  }
  if (typeof settlement.structureName === 'string' && settlement.structureName) {
    return settlement.structureName;
  }
  if (typeof settlement.displayType === 'string' && settlement.displayType) {
    return settlement.displayType;
  }
  if (typeof settlement.type === 'string' && settlement.type) {
    return formatStructureDetailLabel(settlement.type);
  }
  return null;
}

function generateTravelerCampDetails(name, random, options = {}) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const host = pickRandomFrom(travelerCampHosts, randomFn) || 'the Emberlane siblings';
  const focus = pickRandomFrom(travelerCampFocuses, randomFn) || 'guiding caravans through the border wilds';
  const supplies = pickRandomFrom(travelerCampSupplies, randomFn) ||
    'fresh water skins, smoked meats, and wagon grease';
  const atmosphere = pickRandomFrom(travelerCampAtmospheres, randomFn) ||
    'Lanterns sway from tall poles, casting amber halos across the tents.';
  const service = pickRandomFrom(travelerCampServices, randomFn) || 'fresh mounts for weary outriders';
  const settlementLabel = formatSettlementLabelForDetails(options?.nearbySettlement);
  const settlementDistance = Number.isFinite(options?.settlementDistance)
    ? Math.max(1, Math.round(options.settlementDistance))
    : null;
  const settlementSentence = settlementLabel
    ? `Caravans from ${settlementLabel} often rest here${
        settlementDistance ? ` after ${settlementDistance} leagues on the road` : ''
      }.`
    : 'Wayfarers raise their tents where trade paths converge.';

  return {
    type: 'travelerCamp',
    name,
    displayType: 'Frontier Camp',
    hosts: host.charAt(0).toUpperCase() + host.slice(1),
    campFocus: focus.charAt(0).toUpperCase() + focus.slice(1),
    supplies: supplies.charAt(0).toUpperCase() + supplies.slice(1),
    services: service.charAt(0).toUpperCase() + service.slice(1),
    description: `${settlementSentence} ${atmosphere}`
  };
}

function generateRoadsideTavernName(random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const adjective = pickRandomFrom(tavernAdjectives, randomFn) || 'Golden';
  const noun = pickRandomFrom(tavernNouns, randomFn) || 'Hearth';
  const descriptor = pickRandomFrom(tavernDescriptors, randomFn) || 'Roadhouse';
  const style = randomFn();
  if (style < 0.45) {
    return `The ${adjective} ${noun}`;
  }
  if (style < 0.75) {
    return `${adjective} ${noun} ${descriptor}`;
  }
  return `${descriptor} of the ${adjective} ${noun}`;
}

function generateRoadsideTavernDetails(name, random, options = {}) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const innkeeper = pickRandomFrom(tavernInnkeepers, randomFn) || 'Innkeep Mara Hearthspoon';
  const specialty = pickRandomFrom(tavernSpecialties, randomFn) || 'cinder-spiced stout poured over hot stones';
  const reputation = pickRandomFrom(tavernReputations, randomFn) || 'favoured by caravan guards trading tall tales';
  const amenities = pickRandomFrom(tavernAmenities, randomFn) || 'a roaring hearth and slate-tiled baths';
  const service = pickRandomFrom(tavernServices, randomFn) || 'guides charting quick routes between duchies';
  const rate = pickRandomFrom(tavernRatePhrases, randomFn) || 'two silver a night, breakfast and stall included';
  const notableGuests = pickRandomFrom(tavernSpecialGuests, randomFn) || 'wandering magi swapping spellcraft rumours';
  const rooms = Math.max(6, Math.floor(8 + randomFn() * 6));
  const settlementLabel = formatSettlementLabelForDetails(options?.nearbySettlement);
  const settlementDistance = Number.isFinite(options?.settlementDistance)
    ? Math.max(1, Math.round(options.settlementDistance))
    : null;
  const atmosphere = pickRandomFrom(tavernAtmospheres, randomFn) ||
    'Lantern light spills across wagon ruts like melted gold.';
  const settlementSentence = settlementLabel
    ? `Caravans bound for ${settlementLabel} pause here${
        settlementDistance ? ` after ${settlementDistance} leagues on the road` : ''
      }.`
    : 'Travellers on the long road gather here to rest and trade news.';

  return {
    type: 'roadsideTavern',
    name,
    displayType: 'Roadside Tavern',
    innkeeper,
    specialty,
    reputation,
    amenities,
    services: service,
    rooms: `${rooms} rooms prepared for weary guests`,
    rates: rate,
    notableGuests,
    description: `${settlementSentence} ${atmosphere}`
  };
}

function generateDungeonName(random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const prefix = pickRandomFrom(dungeonNamePrefixes, randomFn) || 'Sunken';
  const suffix = pickRandomFrom(dungeonNameSuffixes, randomFn) || 'Vault';
  const style = randomFn();
  if (style < 0.4) {
    return `${prefix} ${suffix}`;
  }
  if (style < 0.75) {
    return `${suffix} of ${prefix} Echoes`;
  }
  return `${prefix} ${suffix} of Dread`;
}

function generateDungeonDetails(name, random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const peril = pickRandomFrom(dungeonPerils, randomFn) || 'echo with restless spirits';
  const depth = pickRandomFrom(dungeonDepths, randomFn) || 'five';
  const guardian = pickRandomFrom(
    [
      'bone sentries',
      'arcane sentinels',
      'chittering horrors',
      'shadow-haunting spectres',
      'oozing slimes'
    ],
    randomFn
  ) || 'ancient wardens';

  return {
    type: 'dungeon',
    name,
    displayType: 'Ancient Dungeon',
    threatLevel: 'High',
    guardians: guardian,
    depth: `${depth} levels`,
    description: `Rumoured to ${peril}, the ${name} descends ${depth} levels where ${guardian} stalk forgotten halls.`
  };
}

function generateMonasteryName(random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const orderName = pickRandomFrom(monasteryOrders, randomFn) || 'Order of the Dawn Lantern';
  const virtue = pickRandomFrom(monasteryVirtues, randomFn) || 'contemplation';
  const virtueName = virtue.charAt(0).toUpperCase() + virtue.slice(1);
  if (randomFn() < 0.5) {
    const trimmedOrder = orderName.toLowerCase().includes('monastery')
      ? orderName
      : `${orderName} Monastery`;
    return trimmedOrder;
  }
  return `Monastery of ${virtueName}`;
}

function generateMonasteryDetails(name, random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const orderName = pickRandomFrom(monasteryOrders, randomFn) || 'Order of the Dawn Lantern';
  const virtue = pickRandomFrom(monasteryVirtues, randomFn) || 'contemplation';
  const virtueName = virtue.charAt(0).toUpperCase() + virtue.slice(1);
  const relic = pickRandomFrom(monasteryRelics, randomFn) || 'a saintly bell that rings without wind';
  const caretakerTitle = randomFn() < 0.5 ? 'Abbot' : 'Abbess';
  const caretakerName = pickRandomFrom(
    [...(townFirstNamePools.male || []), ...(townFirstNamePools.female || []), ...(townFirstNamePools.neutral || [])],
    randomFn
  ) || 'Seren';

  return {
    type: 'monastery',
    name,
    displayType: 'Sacred Monastery',
    order: orderName,
    devotion: `Vow of ${virtueName}`,
    caretaker: `${caretakerTitle} ${caretakerName}`,
    description: `${orderName} keep solemn watch here, dedicated to ${virtue}. Their cloisters guard ${relic}.`
  };
}

function generateCastleName(random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const house = pickRandomFrom(castleHouseNames, randomFn) || 'House Blackthorn';
  const base = house.replace(/^House\s+/i, '') || 'Blackthorn';
  const style = randomFn();
  if (style < 0.4) {
    return `Castle ${base}`;
  }
  if (style < 0.7) {
    return `${base} Keep`;
  }
  return `${base} Holdfast`;
}

function generateCastleDetails(name, random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const house = pickRandomFrom(castleHouseNames, randomFn) || 'House Blackthorn';
  const banner = pickRandomFrom(castleBanners, randomFn) || 'a silver gryphon on midnight blue';
  const trait = pickRandomFrom(castleDefensiveTraits, randomFn) || 'Commands a triple-ring curtain wall.';
  const garrison = Math.max(60, Math.floor(120 + randomFn() * 380));

  return {
    type: 'castle',
    name,
    displayType: 'Fortified Castle',
    rulingHouse: house,
    banner,
    garrison,
    description: `${name} stands loyal to ${house}, its banner of ${banner}. ${trait}`
  };
}

function generateSaintShrineName(random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const saint = pickRandomFrom(saintlyNames, randomFn) || 'Saint Elowen';
  if (randomFn() < 0.5) {
    return `Shrine of ${saint}`;
  }
  return `${saint}'s Shrine`;
}

function generateSaintShrineDetails(name, random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const saint = pickRandomFrom(saintlyNames, randomFn) || 'Saint Elowen';
  const miracle = pickRandomFrom(saintMiracles, randomFn) || 'calmed a wildfire with a whispered prayer';
  const offerings = pickRandomFrom(shrineOfferings, randomFn) || 'garlands of moonpetals';
  const pilgrims = pickRandomFrom(shrinePilgrims, randomFn) || 'penitents seeking absolution';

  return {
    type: 'saintShrine',
    name,
    displayType: 'Saintly Shrine',
    patronSaint: saint,
    devotion: `Honours the miracle that ${saint.toLowerCase().includes('saint') ? '' : 'Saint '}${saint} ${miracle}.`,
    description: `${name} marks where ${saint} ${miracle}. Pilgrims leave ${offerings}, and ${pilgrims} gather in hushed prayer.`
  };
}

function generatePoliticalLandscape({ width, height, tiles, waterMask, random, settlements }) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  if (!Array.isArray(tiles) || tiles.length === 0 || width <= 0 || height <= 0) {
    return { factions: [] };
  }

  const toKey = (x, y) => `${x},${y}`;
  const cardinalNeighborOffsets = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];
  const surroundingNeighborOffsets = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1]
  ];
  let hasLand = false;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      const tile = tiles[y] ? tiles[y][x] : null;
      if (!tile) {
        continue;
      }
      if (waterMask && waterMask[idx]) {
        tile.factionId = null;
        tile.factionInfluence = 0;
        continue;
      }
      tile.factionId = null;
      tile.factionInfluence = 0;
      hasLand = true;
    }
  }

  if (!hasLand) {
    return { factions: [] };
  }

  const settlementSeeds = Array.isArray(settlements) ? settlements : [];
  const uniqueSeeds = [];
  const seenSeeds = new Set();

  settlementSeeds.forEach((seed) => {
    if (!seed || !Number.isFinite(seed.x) || !Number.isFinite(seed.y)) {
      return;
    }
    const normalizedType = typeof seed.type === 'string' ? seed.type.trim().toLowerCase() : '';
    const normalizedKind =
      typeof seed.settlementKind === 'string' ? seed.settlementKind.trim().toLowerCase() : '';
    if (normalizedType === 'abandoneddwarfhold' || normalizedKind === 'abandoneddwarfhold') {
      return;
    }
    const key = toKey(seed.x, seed.y);
    if (seenSeeds.has(key)) {
      return;
    }
    seenSeeds.add(key);
    uniqueSeeds.push({
      x: seed.x,
      y: seed.y,
      label: typeof seed.label === 'string' ? seed.label.trim() : '',
      type: seed.type || 'settlement',
      population: Number.isFinite(seed.population) ? seed.population : null,
      settlementKind:
        typeof seed.settlementKind === 'string' && seed.settlementKind.trim().length > 0
          ? seed.settlementKind.trim()
          : null
    });
  });

  if (uniqueSeeds.length === 0) {
    return { factions: [] };
  }

  const adjustClaimRadiusByPopulation = (seed, baseRadius) => {
    if (!seed || seed.type !== 'town') {
      return baseRadius;
    }

    const population = Number(seed.population);
    if (!Number.isFinite(population) || population <= 0) {
      return baseRadius;
    }

    const minPopulation = 120;
    const fullPopulation = 2000;
    const isVillage = seed.settlementKind === 'village';
    const minMultiplierBase = isVillage ? 0.24 : 0.4;
    const minMultiplier = clamp(minMultiplierBase, 0.1, 0.99);
    const normalized = clamp((population - minPopulation) / (fullPopulation - minPopulation), 0, 1);
    const multiplier = minMultiplier + normalized * (1 - minMultiplier);
    const scaledRadius = baseRadius * multiplier;
    let adjustedRadius = Math.max(8, scaledRadius);
    if (isVillage) {
      const maxVillageRadius = Math.max(12, baseRadius * 0.7);
      adjustedRadius = Math.min(adjustedRadius, maxVillageRadius);
    }
    return adjustedRadius;
  };

  const resolveClaimRadius = (seed) => {
    if (!seed || !seed.type) {
      return 26;
    }
    let baseRadius = 26;
    switch (seed.type) {
      case 'dwarfhold':
        baseRadius = 36;
        break;
      case 'hillhold':
        baseRadius = 30;
        break;
      case 'town':
        baseRadius = 32;
        break;
      case 'tower':
        baseRadius = 24;
        break;
      case 'evilWizardTower':
        baseRadius = 24;
        break;
      case 'woodElfGrove':
        baseRadius = 28;
        break;
      case 'lizardmenCity':
        baseRadius = 30;
        break;
      default:
        baseRadius = 26;
    }
    return adjustClaimRadiusByPopulation(seed, baseRadius);
  };

  const resolveFactionName = (seed) => {
    if (!seed) {
      return generateRealmName(randomFn);
    }
    const label = typeof seed.label === 'string' ? seed.label.trim() : '';
    if (!label) {
      return generateRealmName(randomFn);
    }
    switch (seed.type) {
      case 'dwarfhold':
        return `${label} Thanedom`;
      case 'hillhold':
        return `${label} Holdfast`;
      case 'woodElfGrove':
        return `${label} Canopy`;
      case 'lizardmenCity':
        return `${label} Temple-Host`;
      case 'evilWizardTower':
        return `${label} Enclave`;
      case 'tower':
        return `${label} Marches`;
      case 'town':
        return `${label} Compact`;
      default:
        return `${label} Dominion`;
    }
  };

  const claimRadiusScale = 0.25; // shrink territorial growth range by 75%

  const shuffledSeeds = shuffleArray(uniqueSeeds, randomFn);
  const factions = shuffledSeeds.map((seed, index) => {
    const claimRadius = resolveClaimRadius(seed);
    const scaledClaimRadius = Math.max(1, claimRadius * claimRadiusScale);
    return {
      id: index,
      name: resolveFactionName(seed),
      color: pickFactionColor(index),
      capital: {
        x: seed.x,
        y: seed.y,
        label: seed.label || null,
        type: seed.settlementKind || seed.type || 'settlement'
      },
      territory: 0,
      claimRadius: scaledClaimRadius,
      contestScale: Math.max(4, scaledClaimRadius * 0.6)
    };
  });

  const factionById = new Map(factions.map((faction) => [faction.id, faction]));

  const enforceFactionConnectivity = () => {
    if (factions.length === 0) {
      return;
    }

    const connectedByFactionId = new Map();

    factions.forEach((faction) => {
      const capital = faction.capital || {};
      const cx = Number.isFinite(capital.x) ? capital.x : null;
      const cy = Number.isFinite(capital.y) ? capital.y : null;

      if (cx === null || cy === null || cx < 0 || cy < 0 || cx >= width || cy >= height) {
        connectedByFactionId.set(faction.id, new Set());
        return;
      }

      const startRow = tiles[cy];
      const startTile = startRow ? startRow[cx] : null;
      if (!startTile || startTile.factionId !== faction.id) {
        connectedByFactionId.set(faction.id, new Set());
        return;
      }

      const visited = new Set();
      const queue = [[cx, cy]];
      let index = 0;
      visited.add(toKey(cx, cy));

      while (index < queue.length) {
        const [tx, ty] = queue[index];
        index += 1;

        for (let i = 0; i < cardinalNeighborOffsets.length; i += 1) {
          const offset = cardinalNeighborOffsets[i];
          const nx = tx + offset[0];
          const ny = ty + offset[1];

          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }

          const neighborRow = tiles[ny];
          const neighborTile = neighborRow ? neighborRow[nx] : null;
          if (!neighborTile || neighborTile.factionId !== faction.id) {
            continue;
          }

          const neighborKey = toKey(nx, ny);
          if (!visited.has(neighborKey)) {
            visited.add(neighborKey);
            queue.push([nx, ny]);
          }
        }
      }

      connectedByFactionId.set(faction.id, visited);
    });

    for (let y = 0; y < height; y += 1) {
      const row = tiles[y];
      if (!row) {
        continue;
      }
      for (let x = 0; x < width; x += 1) {
        const tile = row[x];
        if (!tile || tile.factionId === null || tile.factionId === undefined) {
          continue;
        }
        const connectedKeys = connectedByFactionId.get(tile.factionId);
        if (!connectedKeys) {
          tile.factionId = null;
          tile.factionInfluence = 0;
          continue;
        }
        const key = toKey(x, y);
        if (!connectedKeys.has(key)) {
          tile.factionId = null;
          tile.factionInfluence = 0;
        }
      }
    }

    factions.forEach((faction) => {
      faction.territory = 0;
    });

    for (let y = 0; y < height; y += 1) {
      const row = tiles[y];
      if (!row) {
        continue;
      }
      for (let x = 0; x < width; x += 1) {
        const tile = row[x];
        if (!tile || tile.factionId === null || tile.factionId === undefined) {
          continue;
        }
        const faction = factionById.get(tile.factionId);
        if (faction) {
          faction.territory += 1;
        }
      }
    }
  };

  const applyOverlordVassalRules = () => {
    if (!Array.isArray(factions) || factions.length === 0) {
      return;
    }

    const neighborMap = new Map();
    const recordNeighbor = (sourceId, targetId) => {
      if (sourceId === null || sourceId === undefined || targetId === null || targetId === undefined) {
        return;
      }
      if (sourceId === targetId) {
        return;
      }
      if (!neighborMap.has(sourceId)) {
        neighborMap.set(sourceId, new Set());
      }
      neighborMap.get(sourceId).add(targetId);
    };

    for (let y = 0; y < height; y += 1) {
      const row = tiles[y];
      if (!row) {
        continue;
      }
      for (let x = 0; x < width; x += 1) {
        const tile = row[x];
        if (!tile) {
          continue;
        }
        const factionId = tile.factionId;
        if (factionId === null || factionId === undefined) {
          continue;
        }
        for (let i = 0; i < cardinalNeighborOffsets.length; i += 1) {
          const [ox, oy] = cardinalNeighborOffsets[i];
          const nx = x + ox;
          const ny = y + oy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const neighborRow = tiles[ny];
          const neighborTile = neighborRow ? neighborRow[nx] : null;
          if (!neighborTile) {
            continue;
          }
          const neighborFactionId = neighborTile.factionId;
          if (neighborFactionId === null || neighborFactionId === undefined) {
            continue;
          }
          recordNeighbor(factionId, neighborFactionId);
        }
      }
    }

    if (neighborMap.size === 0) {
      return;
    }

    const assignmentCandidates = [];

    const resolveCapitalType = (faction) => {
      if (!faction || !faction.capital || typeof faction.capital.type !== 'string') {
        return '';
      }
      return faction.capital.type.trim().toLowerCase();
    };

    const resolveDistanceBetween = (a, b) => {
      const ax = Number.isFinite(a?.capital?.x) ? a.capital.x : null;
      const ay = Number.isFinite(a?.capital?.y) ? a.capital.y : null;
      const bx = Number.isFinite(b?.capital?.x) ? b.capital.x : null;
      const by = Number.isFinite(b?.capital?.y) ? b.capital.y : null;
      if (ax === null || ay === null || bx === null || by === null) {
        return Infinity;
      }
      return Math.hypot(bx - ax, by - ay);
    };

    factions.forEach((faction) => {
      if (!faction || faction.id === null || faction.id === undefined) {
        return;
      }
      const capitalType = resolveCapitalType(faction);
      if (!capitalType) {
        return;
      }
      const neighbors = neighborMap.get(faction.id);
      if (!neighbors || neighbors.size === 0) {
        return;
      }

      const allowedVassalTypes = [];
      if (capitalType === 'greatdwarfhold') {
        allowedVassalTypes.push('dwarfhold');
      } else if (capitalType === 'castle') {
        allowedVassalTypes.push('town', 'city', 'village');
      }

      if (allowedVassalTypes.length === 0) {
        return;
      }

      neighbors.forEach((neighborId) => {
        const neighborFaction = factionById.get(neighborId);
        if (!neighborFaction) {
          return;
        }
        const neighborType = resolveCapitalType(neighborFaction);
        if (!allowedVassalTypes.includes(neighborType)) {
          return;
        }
        assignmentCandidates.push({
          vassalId: neighborFaction.id,
          overlordId: faction.id,
          distance: resolveDistanceBetween(faction, neighborFaction)
        });
      });
    });

    if (assignmentCandidates.length === 0) {
      return;
    }

    assignmentCandidates.sort((a, b) => {
      const distA = Number.isFinite(a.distance) ? a.distance : Infinity;
      const distB = Number.isFinite(b.distance) ? b.distance : Infinity;
      return distA - distB;
    });

    const vassalAssignments = new Map();

    assignmentCandidates.forEach(({ vassalId, overlordId }) => {
      if (vassalId === overlordId) {
        return;
      }
      if (vassalAssignments.has(vassalId)) {
        return;
      }
      const overlordFaction = factionById.get(overlordId);
      const vassalFaction = factionById.get(vassalId);
      if (!overlordFaction || !vassalFaction) {
        return;
      }
      const overlordType = resolveCapitalType(overlordFaction);
      const vassalType = resolveCapitalType(vassalFaction);
      if (overlordType === 'greatdwarfhold' && vassalType !== 'dwarfhold') {
        return;
      }
      if (overlordType === 'castle' && !['town', 'city', 'village'].includes(vassalType)) {
        return;
      }
      vassalAssignments.set(vassalId, overlordId);
    });

    if (vassalAssignments.size === 0) {
      return;
    }

    factions.forEach((faction) => {
      if (!faction) {
        return;
      }
      faction.vassals = [];
      faction.isVassal = false;
      faction.overlordId = null;
    });

    vassalAssignments.forEach((overlordId, vassalId) => {
      const overlordFaction = factionById.get(overlordId);
      const vassalFaction = factionById.get(vassalId);
      if (!overlordFaction || !vassalFaction) {
        return;
      }
      vassalFaction.isVassal = true;
      vassalFaction.overlordId = overlordId;
      if (!Array.isArray(overlordFaction.vassals)) {
        overlordFaction.vassals = [];
      }
      overlordFaction.vassals.push(vassalId);
    });

    for (let y = 0; y < height; y += 1) {
      const row = tiles[y];
      if (!row) {
        continue;
      }
      for (let x = 0; x < width; x += 1) {
        const tile = row[x];
        if (!tile) {
          continue;
        }
        const currentFactionId = tile.factionId;
        if (currentFactionId === null || currentFactionId === undefined) {
          continue;
        }
        const overlordId = vassalAssignments.get(currentFactionId);
        if (overlordId === undefined) {
          continue;
        }
        tile.factionId = overlordId;
        tile.factionInfluence = clamp(Number(tile.factionInfluence) || 0, 0, 1);
      }
    }

    factions.forEach((faction) => {
      if (faction) {
        faction.territory = 0;
      }
    });

    for (let y = 0; y < height; y += 1) {
      const row = tiles[y];
      if (!row) {
        continue;
      }
      for (let x = 0; x < width; x += 1) {
        const tile = row[x];
        if (!tile) {
          continue;
        }
        const tileFactionId = tile.factionId;
        if (tileFactionId === null || tileFactionId === undefined) {
          continue;
        }
        const faction = factionById.get(tileFactionId);
        if (faction) {
          faction.territory += 1;
        }
      }
    }

    factions.forEach((faction) => {
      const capitalX = Number.isFinite(faction?.capital?.x) ? faction.capital.x : null;
      const capitalY = Number.isFinite(faction?.capital?.y) ? faction.capital.y : null;
      if (capitalX === null || capitalY === null) {
        return;
      }
      const row = tiles[capitalY];
      const tile = row ? row[capitalX] : null;
      if (!tile || tile.factionId !== faction.id) {
        return;
      }
      tile.factionInfluence = Math.max(Number(tile.factionInfluence) || 0, 0.9);
    });
  };

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      const tile = tiles[y] ? tiles[y][x] : null;
      if (!tile) {
        continue;
      }
      if (waterMask && waterMask[idx]) {
        tile.factionId = null;
        tile.factionInfluence = 0;
        continue;
      }

      let bestFaction = null;
      let bestDistance = Infinity;
      let bestAdjustedDistance = Infinity;
      let bestSuitability = 0;
      let secondDistance = Infinity;
      let secondAdjustedDistance = Infinity;

      for (let i = 0; i < factions.length; i += 1) {
        const faction = factions[i];
        const suitability = evaluateFactionTileSuitability(faction, tile, x, y);
        if (suitability <= 0) {
          continue;
        }

        const dx = x - faction.capital.x;
        const dy = y - faction.capital.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const adjustedDistance = distance / suitability;

        if (adjustedDistance < bestAdjustedDistance) {
          secondAdjustedDistance = bestAdjustedDistance;
          secondDistance = bestDistance;
          bestAdjustedDistance = adjustedDistance;
          bestDistance = distance;
          bestFaction = faction;
          bestSuitability = suitability;
        } else if (adjustedDistance < secondAdjustedDistance) {
          secondAdjustedDistance = adjustedDistance;
          secondDistance = distance;
        }
      }

      if (!bestFaction || !Number.isFinite(bestDistance)) {
        tile.factionId = null;
        tile.factionInfluence = 0;
        continue;
      }

      const suitabilityRadiusFactor = clamp(0.55 + bestSuitability * 0.45, 0.55, 1);
      const effectiveClaimRadius = bestFaction.claimRadius * suitabilityRadiusFactor;

      if (bestDistance > effectiveClaimRadius) {
        tile.factionId = null;
        tile.factionInfluence = 0;
        continue;
      }

      const proximity = clamp(1 - bestDistance / effectiveClaimRadius, 0, 1);
      let contestFactor = 1;
      if (Number.isFinite(secondDistance) && secondDistance < Infinity) {
        const gap = Math.max(0, secondDistance - bestDistance);
        const contestScale = bestFaction.contestScale * (1 / Math.max(bestSuitability, 0.35));
        contestFactor = clamp(gap / contestScale, 0, 1);
      }
      const influence = clamp(proximity * (0.7 + contestFactor * 0.3) * bestSuitability, 0, 1);

      tile.factionId = bestFaction.id;
      tile.factionInfluence = influence;
      bestFaction.territory += 1;
    }
  }

  const fillUnclaimedEnclaves = () => {
    const visited = new Set();

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        const row = tiles[y];
        const tile = row ? row[x] : null;
        if (!tile) {
          continue;
        }
        if (waterMask && waterMask[idx]) {
          continue;
        }
        if (tile.factionId !== null && tile.factionId !== undefined) {
          continue;
        }

        const key = toKey(x, y);
        if (visited.has(key)) {
          continue;
        }

        const component = [];
        const queue = [[x, y]];
        let queueIndex = 0;
        let touchesEdge = false;
        const borderingFactions = new Set();
        visited.add(key);

        while (queueIndex < queue.length) {
          const [cx, cy] = queue[queueIndex];
          queueIndex += 1;
          component.push([cx, cy]);

          for (let i = 0; i < cardinalNeighborOffsets.length; i += 1) {
            const [ox, oy] = cardinalNeighborOffsets[i];
            const nx = cx + ox;
            const ny = cy + oy;

            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              touchesEdge = true;
              continue;
            }

            const nIdx = ny * width + nx;
            const neighborRow = tiles[ny];
            const neighborTile = neighborRow ? neighborRow[nx] : null;
            if (!neighborTile) {
              touchesEdge = true;
              continue;
            }
            if (waterMask && waterMask[nIdx]) {
              touchesEdge = true;
              continue;
            }

            if (neighborTile.factionId === null || neighborTile.factionId === undefined) {
              const neighborKey = toKey(nx, ny);
              if (!visited.has(neighborKey)) {
                visited.add(neighborKey);
                queue.push([nx, ny]);
              }
              continue;
            }

            borderingFactions.add(neighborTile.factionId);
          }

          if (touchesEdge) {
            continue;
          }

          for (let i = 0; i < surroundingNeighborOffsets.length; i += 1) {
            const [ox, oy] = surroundingNeighborOffsets[i];
            const nx = cx + ox;
            const ny = cy + oy;

            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              touchesEdge = true;
              continue;
            }

            const neighborRow = tiles[ny];
            const neighborTile = neighborRow ? neighborRow[nx] : null;
            if (!neighborTile) {
              touchesEdge = true;
              continue;
            }
            if (neighborTile.factionId !== null && neighborTile.factionId !== undefined) {
              borderingFactions.add(neighborTile.factionId);
            }
          }
        }

        if (touchesEdge || borderingFactions.size !== 1) {
          continue;
        }

        const [factionId] = borderingFactions;
        if (!factionById.has(factionId)) {
          continue;
        }

        for (let i = 0; i < component.length; i += 1) {
          const [cx, cy] = component[i];
          const componentTile = tiles[cy][cx];
          componentTile.factionId = factionId;
          componentTile.factionInfluence = Math.max(componentTile.factionInfluence || 0, 0.2);
        }
      }
    }
  };

  fillUnclaimedEnclaves();
  enforceFactionConnectivity();
  applyOverlordVassalRules();

  return { factions };
}

function describeInfluenceStrength(value) {
  const strength = clamp(Number(value) || 0, 0, 1);
  if (strength >= 0.85) {
    return 'Seat of Power';
  }
  if (strength >= 0.65) {
    return 'Heartland';
  }
  if (strength >= 0.45) {
    return 'Core Territory';
  }
  if (strength >= 0.25) {
    return 'Border March';
  }
  if (strength >= 0.12) {
    return 'Outer Reach';
  }
  return 'Faint Influence';
}

const defaultCultureColorByKey = {
  dwarves: '#f4c069',
  humans: '#9bb6d8',
  elves: '#6ecf85',
  halflings: '#f7a072',
  gnomes: '#c9a3e6',
  goblins: '#7f8c4d',
  kobolds: '#b1c8ff',
  dragonborn: '#c16a6a',
  tieflings: '#b064b0',
  orcs: '#556b2f',
  satyrs: '#c18c5d',
  nymphs: '#9bd4a9',
  ents: '#8bbbcf',
  skinks: '#6bd38f',
  saurus: '#3a9f68',
  priests: '#8cd1c6',
  beastmasters: '#b0f0d0',
  wizards: '#9c5cff',
  apprentices: '#b389ff',
  thralls: '#646e78',
  summoned: '#ff8ba7',
  guards: '#f2cd5c',
  others: '#9e9e9e'
};

function normaliseCultureKey(key, fallbackLabel) {
  if (typeof key === 'string' && key.trim()) {
    return key.trim().toLowerCase();
  }
  if (typeof fallbackLabel === 'string' && fallbackLabel.trim()) {
    return fallbackLabel
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
  }
  return null;
}

function formatCultureLabel(key) {
  if (typeof key !== 'string' || key.trim().length === 0) {
    return 'Unknown';
  }
  return key
    .trim()
    .replace(/[_-]+/g, ' ')
    .split(' ')
    .filter((part) => part.length > 0)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function resolveCultureColor(color, key) {
  if (typeof color === 'string' && color.trim()) {
    return color;
  }
  if (typeof key === 'string' && key) {
    const normalised = key.trim().toLowerCase();
    if (defaultCultureColorByKey[normalised]) {
      return defaultCultureColorByKey[normalised];
    }
  }
  return '#9e9e9e';
}

function getDefaultCulturalBreakdownForSettlement(settlement) {
  const type = typeof settlement?.type === 'string' ? settlement.type.trim() : '';
  if (type === 'orcCamp') {
    return [
      {
        key: 'orcs',
        label: 'Orcs',
        percentage: 100,
        color: defaultCultureColorByKey.orcs
      }
    ];
  }
  if (type === 'castle') {
    return [
      {
        key: 'humans',
        label: 'Humans',
        percentage: 85,
        color: defaultCultureColorByKey.humans
      },
      {
        key: 'dwarves',
        label: 'Dwarves',
        percentage: 15,
        color: defaultCultureColorByKey.dwarves
      }
    ];
  }
  return null;
}

function resolveFallbackClaimRadius(type) {
  switch (type) {
    case 'dwarfhold':
      return 34;
    case 'hillhold':
      return 30;
    case 'town':
      return 32;
    case 'tower':
    case 'evilWizardTower':
      return 28;
    case 'lizardmenCity':
      return 36;
    case 'woodElfGrove':
      return 30;
    case 'mine':
      return 26;
    case 'orcCamp':
      return 28;
    default:
      return 24;
  }
}

function resolveCulturalRadiusMultiplier(type) {
  switch (type) {
    case 'dwarfhold':
      return 2;
    case 'hillhold':
      return 1.9;
    case 'town':
      return 1.85;
    case 'tower':
      return 1.6;
    case 'evilWizardTower':
      return 1.7;
    case 'lizardmenCity':
      return 2.1;
    case 'woodElfGrove':
      return 1.8;
    case 'mine':
      return 1.55;
    case 'orcCamp':
      return 1.75;
    default:
      return 1.6;
  }
}

function resolveCulturalFalloffPower(type) {
  switch (type) {
    case 'dwarfhold':
    case 'lizardmenCity':
      return 1.25;
    case 'hillhold':
    case 'town':
      return 1.28;
    case 'woodElfGrove':
      return 1.3;
    case 'tower':
    case 'evilWizardTower':
      return 1.36;
    case 'mine':
      return 1.42;
    case 'orcCamp':
      return 1.3;
    default:
      return 1.35;
  }
}

function applyCulturalInfluence({
  width,
  height,
  tiles,
  settlements,
  factions,
  isLandBaseTile
}) {
  if (!Array.isArray(tiles) || tiles.length === 0) {
    return;
  }

  const mapHeight = Number.isFinite(height) ? Math.max(0, Math.floor(height)) : tiles.length;
  const mapWidth = Number.isFinite(width) ? Math.max(0, Math.floor(width)) : tiles[0]?.length || 0;
  if (mapWidth <= 0 || mapHeight <= 0) {
    return;
  }

  for (let y = 0; y < mapHeight; y += 1) {
    const row = tiles[y];
    if (!row) {
      continue;
    }
    for (let x = 0; x < mapWidth; x += 1) {
      const tile = row[x];
      if (!tile) {
        continue;
      }
      tile.culturalInfluence = null;
      if (tile.culturalInfluenceScores) {
        delete tile.culturalInfluenceScores;
      }
    }
  }

  const radiusByLocation = new Map();
  if (Array.isArray(factions)) {
    factions.forEach((faction) => {
      const capitalX = Number.isFinite(faction?.capital?.x) ? Math.floor(faction.capital.x) : null;
      const capitalY = Number.isFinite(faction?.capital?.y) ? Math.floor(faction.capital.y) : null;
      if (capitalX === null || capitalY === null) {
        return;
      }
      const claimRadius = Number.isFinite(faction?.claimRadius) ? faction.claimRadius : null;
      if (claimRadius === null) {
        return;
      }
      const key = `${capitalX},${capitalY}`;
      radiusByLocation.set(key, claimRadius);
    });
  }

  const raceMetadata = new Map();
  const culturalSources = [];

  if (Array.isArray(settlements)) {
    settlements.forEach((settlement) => {
      const rawX = Number.isFinite(settlement?.x) ? Math.floor(settlement.x) : null;
      const rawY = Number.isFinite(settlement?.y) ? Math.floor(settlement.y) : null;
      if (rawX === null || rawY === null) {
        return;
      }
      if (rawX < 0 || rawY < 0 || rawX >= mapWidth || rawY >= mapHeight) {
        return;
      }

      const breakdownSource = Array.isArray(settlement?.populationBreakdown)
        ? settlement.populationBreakdown
        : getDefaultCulturalBreakdownForSettlement(settlement);
      if (!Array.isArray(breakdownSource) || breakdownSource.length === 0) {
        return;
      }

      const entries = breakdownSource
        .map((entry) => {
          const key = normaliseCultureKey(entry?.key, entry?.label);
          const share = clamp(Number(entry?.percentage) / 100, 0, 1);
          if (!key || share <= 0) {
            return null;
          }
          const label =
            typeof entry?.label === 'string' && entry.label.trim()
              ? entry.label.trim()
              : formatCultureLabel(key);
          const color = resolveCultureColor(entry?.color, key);
          return { key, share, label, color };
        })
        .filter(Boolean);

      if (entries.length === 0) {
        return;
      }

      entries.forEach((entry) => {
        if (!raceMetadata.has(entry.key)) {
          raceMetadata.set(entry.key, { label: entry.label, color: entry.color });
        }
      });

      const type = typeof settlement?.type === 'string' ? settlement.type : null;
      const locationKey = `${rawX},${rawY}`;
      const baseClaimRadius = radiusByLocation.get(locationKey) || resolveFallbackClaimRadius(type);
      const multiplier = resolveCulturalRadiusMultiplier(type);
      const radius = Math.max(8, baseClaimRadius * multiplier);
      const falloff = resolveCulturalFalloffPower(type);

      culturalSources.push({
        x: rawX,
        y: rawY,
        radius,
        entries,
        falloff: falloff > 0 ? falloff : 1.35
      });
    });
  }

  if (culturalSources.length === 0) {
    return;
  }

  const isLandFn = typeof isLandBaseTile === 'function' ? isLandBaseTile : null;

  for (let i = 0; i < culturalSources.length; i += 1) {
    const { x, y, radius, entries, falloff } = culturalSources[i];
    const minX = Math.max(0, Math.floor(x - radius));
    const maxX = Math.min(mapWidth - 1, Math.ceil(x + radius));
    const minY = Math.max(0, Math.floor(y - radius));
    const maxY = Math.min(mapHeight - 1, Math.ceil(y + radius));

    for (let ty = minY; ty <= maxY; ty += 1) {
      const row = tiles[ty];
      if (!row) {
        continue;
      }
      for (let tx = minX; tx <= maxX; tx += 1) {
        const tile = row[tx];
        if (!tile) {
          continue;
        }
        if (isLandFn && !isLandFn(tile.base)) {
          continue;
        }
        const dx = tx - x;
        const dy = ty - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > radius) {
          continue;
        }
        const proximity = clamp(1 - distance / radius, 0, 1);
        if (proximity <= 0) {
          continue;
        }
        const influenceFactor = Math.pow(proximity, falloff);
        if (influenceFactor <= 0) {
          continue;
        }
        let store = tile.culturalInfluenceScores;
        if (!store) {
          store = Object.create(null);
          tile.culturalInfluenceScores = store;
        }
        for (let j = 0; j < entries.length; j += 1) {
          const entry = entries[j];
          const contribution = entry.share * influenceFactor;
          if (contribution <= 0) {
            continue;
          }
          store[entry.key] = (store[entry.key] || 0) + contribution;
        }
      }
    }
  }

  for (let y = 0; y < mapHeight; y += 1) {
    const row = tiles[y];
    if (!row) {
      continue;
    }
    for (let x = 0; x < mapWidth; x += 1) {
      const tile = row[x];
      if (!tile) {
        continue;
      }
      const scores = tile.culturalInfluenceScores;
      if (!scores) {
        tile.culturalInfluence = null;
        continue;
      }
      const keys = Object.keys(scores);
      if (keys.length === 0) {
        tile.culturalInfluence = null;
        delete tile.culturalInfluenceScores;
        continue;
      }
      let bestKey = null;
      let bestScore = 0;
      let totalScore = 0;
      const breakdown = [];

      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const score = Number(scores[key]) || 0;
        if (score <= 0) {
          continue;
        }
        totalScore += score;
        breakdown.push({ key, score });
        if (score > bestScore) {
          bestScore = score;
          bestKey = key;
        }
      }

      if (!bestKey || bestScore <= 0) {
        tile.culturalInfluence = null;
        delete tile.culturalInfluenceScores;
        continue;
      }

      breakdown.sort((a, b) => b.score - a.score);
      const dominantMeta = raceMetadata.get(bestKey) || {
        label: formatCultureLabel(bestKey),
        color: resolveCultureColor(null, bestKey)
      };
      const dominantStrength = clamp(bestScore, 0, 1);
      const normalizedBreakdown =
        totalScore > 0
          ? breakdown.map((entry) => {
              const meta = raceMetadata.get(entry.key) || {
                label: formatCultureLabel(entry.key),
                color: resolveCultureColor(null, entry.key)
              };
              return {
                key: entry.key,
                label: meta.label,
                color: meta.color,
                strength: clamp(entry.score, 0, 1),
                share: clamp(entry.score / totalScore, 0, 1)
              };
            })
          : [];

      tile.culturalInfluence = {
        key: bestKey,
        label: dominantMeta.label,
        color: dominantMeta.color,
        strength: dominantStrength,
        breakdown: normalizedBreakdown
      };

      delete tile.culturalInfluenceScores;
    }
  }
}

function resolveTileName(baseKey) {
  return tileLookup.has(baseKey) ? baseKey : 'GRASS';
}

const landMaskCache = new Map();

const state = {
  settings: {
    mapSize: defaultMapSize.key,
    width: defaultMapSize.width,
    height: defaultMapSize.height,
    seedString: '',
    lastSeedString: '',
    forestFrequency: defaultForestFrequency,
    mountainFrequency: defaultMountainFrequency,
    riverFrequency: 50,
    humanSettlementFrequency: 50,
    dwarfSettlementFrequency: 50,
    woodElfSettlementFrequency: 50,
    lizardmenSettlementFrequency: 50,
    worldGenerationType: defaultWorldGenerationType
  },
  tileSheets,
  landMask: null,
  ready: false,
  worldName: '',
  worldChronology: null,
  dwarfParty: {
    dwarves: [],
    activeIndex: 0
  },
  ui: {
    showPoliticalBorders: false,
    showPoliticalInfluence: false,
    showElevation: false,
    showBiomes: false,
    showTemperature: false
  },
  currentWorld: null,
  localView: {
    active: false,
    centerX: null,
    centerY: null,
    bounds: null
  }
};

const defaultDwarfCount = 1;
const defaultHairStyleValue = 'straight_shoulder';

const dwarfClanOptions = [
  { value: 'stonebeard', label: 'Stonebeard' },
  { value: 'ironfist', label: 'Ironfist' },
  { value: 'coppervein', label: 'Coppervein' },
  { value: 'graniteheart', label: 'Graniteheart' },
  { value: 'deepdelver', label: 'Deepdelver' },
  { value: 'amberpick', label: 'Amberpick' },
  { value: 'oakenshield', label: 'Oakenshield' },
  { value: 'frosthammer', label: 'Frosthammer' },
  { value: 'berylbraid', label: 'Berylbraid' },
  { value: 'silverhollow', label: 'Silverhollow' }
];

const dwarfGuildOptions = [
  { value: 'miners-guild', label: 'Miners Guild' },
  { value: 'merchants-guild', label: 'Merchants Guild' },
  { value: 'commerce-guild', label: 'Commerce Guild' },
  { value: 'armourers-weaponsmiths-guild', label: 'Armourers and Weaponsmiths Guild' },
  { value: 'artisans-guild', label: 'Artisans Guild' },
  { value: 'bakers-guild', label: 'Bakers Guild' },
  { value: 'brewers-guild', label: 'Brewers Guild' },
  { value: 'carpenters-guild', label: 'Carpenters Guild' },
  { value: 'construction-guild', label: 'Construction Guild' },
  { value: 'corpsebinders-guild', label: 'Corpsebinders Guild' },
  { value: 'distiller-guild', label: 'Distiller Guild' },
  { value: 'dyers-guild', label: 'Dyers Guild' },
  { value: 'engineers-guild', label: 'Engineers Guild' },
  { value: 'farmers-herders-guild', label: 'Farmers and Herders Guild' },
  { value: 'gemcutters-guild', label: 'Gemcutters Guild' },
  { value: 'goldsmiths-guild', label: 'Goldsmiths Guild' },
  { value: 'guild-of-alchemists', label: 'Guild of Alchemists' },
  { value: 'jewelsmiths-guild', label: 'Jewelsmiths Guild' },
  { value: 'leatherworkers-guild', label: 'Leatherworkers Guild' },
  { value: 'metalsmiths-guild', label: 'Metalsmiths Guild' },
  { value: 'powdermakers-guild', label: 'Powdermakers Guild' },
  { value: 'saltworkers-guild', label: 'Saltworkers Guild' },
  { value: 'stonemasons-guild', label: 'Stonemasons Guild' },
  { value: 'runescribes-guild', label: 'Runescribes Guild' },
  { value: 'runesmiths', label: 'Runesmiths' },
  { value: 'warriors-guild', label: 'Warriors Guild' },
  { value: 'toolmakers-guild', label: "Toolmakers' Guild" },
  { value: 'soapmakers-guild', label: 'Soapmakers Guild' },
  { value: 'candlelighters-guild', label: 'Candlelighters Guild' },
  { value: 'lamplighters-guild', label: 'Lamplighters Guild' },
  { value: 'butchers-guild', label: 'Butchers Guild' },
  { value: 'ropemakers-guild', label: 'Ropemakers Guild' },
  { value: 'cartwrights-wheelwrights-guild', label: 'Cartwrights & Wheelwrights Guild' },
  { value: 'glassblowers-guild', label: 'Glassblowers Guild' },
  { value: 'millers-guild', label: 'Millers Guild' },
  { value: 'cobblers-guild', label: 'Cobblers Guild' },
  { value: 'cartographers-guild', label: 'Cartographers Guild' },
  { value: 'lorekeepers-guild', label: 'Lorekeepers Guild' },
  { value: 'tunnel-wardens-guild', label: 'Tunnel Wardens Guild' },
  { value: 'smelters-guild', label: 'Smelters Guild' }
];

const dwarfProfessionOptions = [
  { value: 'miner', label: 'Miner' },
  { value: 'mason', label: 'Master Mason' },
  { value: 'smith', label: 'Master Smith' },
  { value: 'brewer', label: 'Brewmaster' },
  { value: 'engineer', label: 'Chief Engineer' },
  { value: 'scholar', label: 'Lore Scholar' },
  { value: 'ranger', label: 'Ranger Captain' },
  { value: 'carpenter', label: 'Master Carpenter' },
  { value: 'jewelcrafter', label: 'Gemcutter' }
];

const dwarfHairStyles = {
  bald: {
    label: 'Bald',
    description: 'bald',
    rows: { default: null },
    hideHairColorDescription: true
  },
  straight_shoulder: {
    label: 'Straight — Shoulder Length',
    description: 'shoulder-length straight',
    sheet: 'hair',
    rows: { default: 5 }
  },
  straight_short: {
    label: 'Straight — Short Crop',
    description: 'short straight',
    sheet: 'hair',
    rows: { default: 4 }
  },
  straight_braided: {
    label: 'Straight — Braided Tail',
    description: 'braided straight',
    sheet: 'hair',
    rows: { default: 8 }
  },
  curly_stubble: {
    label: 'Curly — Close Shave',
    description: 'closely shorn curly',
    sheet: 'hairCurly',
    rows: { default: 0 }
  },
  curly_short_unkempt: {
    label: 'Curly — Short & Tousled',
    description: 'short unkempt curly',
    sheet: 'hairCurly',
    rows: { default: 1 }
  },
  curly_mid_unkempt: {
    label: 'Curly — Mid-Length Tousled',
    description: 'mid-length unkempt curly',
    sheet: 'hairCurly',
    rows: { default: 2 }
  },
  curly_long_unkempt: {
    label: 'Curly — Long & Tousled',
    description: 'long unkempt curly',
    sheet: 'hairCurly',
    rows: { default: 3 }
  },
  curly_short_combed: {
    label: 'Curly — Short Combed',
    description: 'short combed curly',
    sheet: 'hairCurly',
    rows: { default: 4 }
  },
  curly_mid_combed: {
    label: 'Curly — Mid-Length Combed',
    description: 'mid-length combed curly',
    sheet: 'hairCurly',
    rows: { default: 5 }
  },
  curly_long_combed: {
    label: 'Curly — Long Combed',
    description: 'long combed curly',
    sheet: 'hairCurly',
    rows: { default: 6 }
  },
  curly_short_braided: {
    label: 'Curly — Short Braids',
    description: 'short braided curly',
    sheet: 'hairCurly',
    rows: { default: 7 }
  },
  curly_mid_braided: {
    label: 'Curly — Mid Braids',
    description: 'mid-length braided curly',
    sheet: 'hairCurly',
    rows: { default: 8 }
  },
  curly_long_braided: {
    label: 'Curly — Long Braids',
    description: 'long braided curly',
    sheet: 'hairCurly',
    rows: { default: 9 }
  },
  curly_short_double_braids: {
    label: 'Curly — Short Double Braids',
    description: 'short double-braided curly',
    sheet: 'hairCurly',
    rows: { default: 10 }
  },
  curly_mid_double_braids: {
    label: 'Curly — Mid Double Braids',
    description: 'mid-length double-braided curly',
    sheet: 'hairCurly',
    rows: { default: 11 }
  },
  curly_long_double_braids: {
    label: 'Curly — Long Double Braids',
    description: 'long double-braided curly',
    sheet: 'hairCurly',
    rows: { default: 12 }
  }
};

const dwarfHairStyleAliases = {
  curly_short: 'curly_short_combed',
  curly_full: 'curly_mid_combed',
  curly_wild: 'curly_long_combed'
};

const dwarfHeadTypes = {
  type1: { label: 'Head Type I', column: 0 },
  type2: { label: 'Head Type II', column: 1 },
  type3: { label: 'Head Type III', column: 2 },
  type4: { label: 'Head Type IV', column: 3 },
  type5: { label: 'Head Type V', column: 4 },
  type6: { label: 'Head Type VI', column: 5 },
  type7: { label: 'Head Type VII', column: 6 },
  type8: { label: 'Head Type VIII', column: 7 }
};

const dwarfHeadOptions = Object.entries(dwarfHeadTypes).map(([value, config]) => ({
  value,
  label: config.label
}));

const defaultHeadTypeValue = 'type5';

function resolveHeadTypeValue(value) {
  if (!value) {
    return defaultHeadTypeValue;
  }
  return Object.prototype.hasOwnProperty.call(dwarfHeadTypes, value) ? value : defaultHeadTypeValue;
}

const dwarfOptions = {
  gender: [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' }
  ],
  skin: [
    { value: 'coal', label: 'Coal Black', color: '#1a0f10' },
    { value: 'umber', label: 'Deep Umber', color: '#4d3123' },
    { value: 'russet', label: 'Russet Bronze', color: '#6b3a22' },
    { value: 'sienna', label: 'Burnt Sienna', color: '#8a4b2a' },
    { value: 'dawn', label: 'Dawn Rose', color: '#c68d7d' },
    { value: 'pearl', label: 'Pale Pearl', color: '#dfc4b3' },
    { value: 'ashen', label: 'Ashen Slate', color: '#9c8f8b' }
  ],
  eyes: [
    { value: 'amber', label: 'Amber', color: '#c18f32' },
    { value: 'hazel', label: 'Hazel', color: '#7f5b30' },
    { value: 'emerald', label: 'Emerald', color: '#3b8b4f' },
    { value: 'ice', label: 'Ice Blue', color: '#7fb8d6' },
    { value: 'onyx', label: 'Onyx', color: '#1f1b1c' },
    { value: 'steel', label: 'Steel Grey', color: '#8d9aa7' },
    { value: 'violet', label: 'Violet', color: '#8d6bb0' }
  ],
  hairStyle: Object.entries(dwarfHairStyles).map(([value, config]) => ({
    value,
    label: config.label
  })),
  hair: [
    { value: 'obsidian', label: 'Obsidian Black', color: '#141015' },
    { value: 'umber', label: 'Rich Umber', color: '#3f2416' },
    { value: 'auburn', label: 'Deep Auburn', color: '#5b2813' },
    { value: 'copper', label: 'Copper Red', color: '#8c3d17' },
    { value: 'golden', label: 'Golden Wheat', color: '#b58a2f' },
    { value: 'ashen', label: 'Ashen Silver', color: '#c0c6d1' },
    { value: 'white', label: 'Snow White', color: '#f1f2f4' }
  ],
  head: dwarfHeadOptions,
  beard: [
    { value: 'clean', label: 'Clean-shaven' },
    { value: 'short', label: 'Short Beard' },
    { value: 'full', label: 'Full Beard' },
    { value: 'braided', label: 'Braided Beard' },
    { value: 'forked', label: 'Forked Beard' },
    { value: 'mutton', label: 'Mutton Chops' },
    { value: 'stubble', label: 'Stubble Beard' },
    { value: 'trimmed', label: 'Trimmed Beard' },
    { value: 'goatee', label: 'Goatee' },
    { value: 'imperial', label: 'Imperial Mustache' },
    { value: 'wizard', label: 'Wizard Beard' },
    { value: 'ringed', label: 'Ringed Beard' }
  ],
  clan: dwarfClanOptions,
  guild: dwarfGuildOptions,
  profession: dwarfProfessionOptions
};

const editableDwarfTraits = new Set([
  'gender',
  'skin',
  'eyes',
  'head',
  'hairStyle',
  'hair',
  'beard',
  'clan',
  'guild',
  'profession'
]);

const dwarfTraitAttributeDefinitions = [
  {
    key: 'beardless',
    label: 'Beardless',
    description:
      'You are the shame of your clan and the disgrace of your holdfast. Without a beard a dwarf is nothing, consider this path to be one that will lead to scorn and ridicule among your peers.',
    icon: 'tilesheet/beardless.png',
    isActive: (dwarf) => {
      if (dwarf?.gender !== 'male') {
        return false;
      }
      const beardValue = dwarf?.beard || 'clean';
      const hasBeardConfig = Object.prototype.hasOwnProperty.call(dwarfBeardRows, beardValue);
      const row = hasBeardConfig ? dwarfBeardRows[beardValue] : dwarfBeardRows.default;
      return row === null || row === undefined;
    }
  },
  {
    key: 'dark-dwarf',
    label: 'Dark Dwarf Heritage',
    description:
      'Your soot colored skin indicates you to hail from the ash covered lands of Dun Mortis. You are known by your ivory skinned cousins as the Dark Dwarves, a race cast away from the light of the All-father into the refuge bin of Stonebeards furance. You are hated by your kin as an oathbreaker by virture of your birthright and if you attempt to enter into their holds will likely be killed on sight.',
    icon: 'tilesheet/darkdwarf.png',
    isActive: (dwarf) => dwarf?.skin === 'umber' || dwarf?.skin === 'coal'
  }
];

const dwarfNamePools = {
  female: [
    'Domas',
    'Rigòth',
    'Kadôl',
    'Meng',
    'Onol',
    'Rith',
    'Sigrid',
    'Thilda',
    'Asgrid',
    'Helga',
    'Goden',
    'Emera'
  ],
  male: [
    'Urist',
    'Thob',
    'Kadol',
    'Stukos',
    'Likot',
    'Datan',
    'Mörul',
    'Logem',
    'Rakust',
    'Thorin',
    'Gorim',
    'Norgrim'
  ]
};

const presetDwarfFirstNames = new Set(
  Object.values(dwarfNamePools).reduce((allNames, pool) => allNames.concat(pool), [])
);

const dwarfHairColorToFrame = {
  obsidian: { column: 2 },
  umber: { column: 6 },
  auburn: { column: 3 },
  copper: { column: 5, tint: '#b56a33' },
  golden: { column: 4 },
  ashen: { column: 1, tint: '#c0c6d1' },
  white: { column: 1 }
};

function resolveHairStyleValue(value) {
  if (!value) {
    return defaultHairStyleValue;
  }
  const alias = dwarfHairStyleAliases[value];
  const key = alias || value;
  return dwarfHairStyles[key] ? key : defaultHairStyleValue;
}

function getHairStyleConfig(value) {
  const key = resolveHairStyleValue(value);
  return dwarfHairStyles[key];
}

function getHairStyleDescription(value) {
  const config = getHairStyleConfig(value);
  return config?.description || getOptionLabel('hairStyle', value);
}

function getHairSummaryPhrase(dwarf) {
  const styleConfig = getHairStyleConfig(dwarf?.hairStyle);
  const hairStyleDescription = (getHairStyleDescription(dwarf?.hairStyle) || '').toLowerCase();
  if (styleConfig?.hideHairColorDescription) {
    return hairStyleDescription || 'bald';
  }
  const hairLabel = (getOptionLabel('hair', dwarf?.hair) || '').toLowerCase();
  if (hairStyleDescription && hairLabel) {
    return `${hairStyleDescription} ${hairLabel} hair`;
  }
  if (hairStyleDescription) {
    return `${hairStyleDescription} hair`;
  }
  if (hairLabel) {
    return `${hairLabel} hair`;
  }
  return 'hair';
}

const dwarfBeardRows = {
  clean: null,
  short: 24,
  full: 26,
  braided: 29,
  forked: 23,
  mutton: 21,
  stubble: null,
  trimmed: null,
  goatee: null,
  imperial: null,
  wizard: null,
  ringed: null,
  default: 26
};

const dwarfBaseBodyTint = '#5b473c';

const dwarfPortraitBaseFrames = {
  male: { sheet: 'body', col: 4, row: 8, tint: dwarfBaseBodyTint, offsetY: 4 },
  female: { sheet: 'body', col: 4, row: 9, tint: dwarfBaseBodyTint, offsetY: 4 }
};

const dwarfPortraitConfig = {
  tileSize: 32,
  scale: 4,
  baseFrame: dwarfPortraitBaseFrames.male,
  baseFrames: dwarfPortraitBaseFrames,
  head: { sheet: 'eyes', row: 0, offsetY: 0 },
  hairOffsetY: -2,
  beardOffsetY: 2,
  eyePositions: [
    { x: 10.75, y: 8.75 },
    { x: 15.75, y: 8.75 }
  ],
  eyeSize: 2
};

const dwarfPortraitState = {
  canvas: null,
  ctx: null
};

const dwarfBodyPortraitState = {
  canvas: null,
  ctx: null
};

const musicTracks = [
  { title: 'Another Year', src: 'sound/tracks/another_year/AY_Full.ogg' },
  { title: 'Craftsdwarfship', src: 'sound/tracks/craftsdwarfship/CS_Full.ogg' },
  { title: 'Death Spiral', src: 'sound/tracks/death_spiral/DS_Full.ogg' },
  { title: 'Drink & Industry', src: 'sound/tracks/drink_&_industry/DI_Full.ogg' },
  { title: 'Dwarf Fortress', src: 'sound/tracks/dwarf_fortress/Dwarf_Fortress.ogg' },
  { title: 'Expansive Cavern', src: 'sound/tracks/expansive_cavern/EC_Full.ogg' },
  { title: 'First Year', src: 'sound/tracks/first_year/FY_Full.ogg' },
  { title: 'Forgotten Beast', src: 'sound/tracks/forgotten_beast/FB_Full.ogg' },
  { title: 'Hill Dwarf', src: 'sound/tracks/hill_dwarf/HD_Full.ogg' },
  { title: 'Koganusan', src: 'sound/tracks/koganusan/KG_Full.ogg' },
  { title: 'Mountainhome', src: 'sound/tracks/mountainhome/MH_Full.ogg' },
  { title: 'Strike the Earth!', src: 'sound/tracks/strike_the_earth!/STE_Full.ogg' },
  { title: 'Strange Moods', src: 'sound/tracks/strange_moods/SM_Full.ogg' },
  { title: 'Vile Force of Darkness', src: 'sound/tracks/vile_force_of_darkness/VFOD_Full.ogg' },
  { title: 'Winter Entombs You', src: 'sound/tracks/winter_entombs_you/WEY_Full.ogg' }
];

const audioState = {
  tracks: musicTracks,
  currentIndex: 0,
  isPlaying: false,
  initialised: false,
  effectsMuted: false,
  effectsVolume: 0.6
};

const soundEffects = {
  randomiseClick: createSoundEffect('sound/sounds/rolling-dice.mp3', {
    volume: 0.6
  })
};

const elements = {
  startButton: document.getElementById('start-button'),
  titleScreen: document.getElementById('title-screen'),
  gameContainer: document.getElementById('game-container'),
  optionsButton: document.getElementById('title-options-button'),
  inGameOptions: document.getElementById('in-game-options'),
  optionsScreen: document.getElementById('options-screen'),
  closeOptions: document.getElementById('close-options'),
  optionsForm: document.getElementById('options-form'),
  regenerate: document.getElementById('regenerate-button'),
  canvas: document.getElementById('world-canvas'),
  canvasWrapper: document.querySelector('.canvas-wrapper'),
  mapTooltip: document.getElementById('world-tooltip'),
  structureContextMenu: document.getElementById('structure-context-menu'),
  structureContextMenuBegin: document.getElementById('structure-context-menu-begin'),
  structureContextMenuMoreInfo: document.getElementById('structure-context-menu-more-info'),
  localMapPanel: document.getElementById('local-map-panel'),
  localMapCanvas: document.getElementById('local-map-canvas'),
  localMapTitle: document.getElementById('local-map-title'),
  localMapSubtitle: document.getElementById('local-map-subtitle'),
  localMapCoordinates: document.getElementById('local-map-coordinates'),
  localMapClose: document.getElementById('local-map-close'),
  localMapDetails: document.getElementById('local-map-details'),
  structureDetailsPanel: document.getElementById('structure-details'),
  structureDetailsTitle: document.getElementById('structure-details-title'),
  structureDetailsSubtitle: document.getElementById('structure-details-subtitle'),
  structureDetailsContent: document.getElementById('structure-details-content'),
  structureDetailsClose: document.getElementById('structure-details-close'),
  seedDisplay: document.querySelector('.seed-display'),
  politicalBordersToggle: document.getElementById('toggle-political-borders'),
  politicalInfluenceToggle: document.getElementById('toggle-political-influence'),
  elevationToggle: document.getElementById('toggle-elevation'),
  biomeToggle: document.getElementById('toggle-biomes'),
  temperatureToggle: document.getElementById('toggle-temperature'),
  mapSizeSelect: document.getElementById('map-size'),
  worldGenerationTypeSelect: document.getElementById('world-generation-type'),
  seedInput: document.getElementById('world-seed'),
  worldMapSizeSelect: document.getElementById('world-map-size-select'),
  worldSeedInput: document.getElementById('world-seed-input'),
  forestFrequencyInput: document.getElementById('forest-frequency'),
  forestFrequencyValue: document.getElementById('forest-frequency-value'),
  mountainFrequencyInput: document.getElementById('mountain-frequency'),
  mountainFrequencyValue: document.getElementById('mountain-frequency-value'),
  riverFrequencyInput: document.getElementById('river-frequency'),
  riverFrequencyValue: document.getElementById('river-frequency-value'),
  humanSettlementFrequencyInput: document.getElementById('human-settlement-frequency'),
  humanSettlementFrequencyValue: document.getElementById('human-settlement-frequency-value'),
  dwarfSettlementFrequencyInput: document.getElementById('dwarf-settlement-frequency'),
  dwarfSettlementFrequencyValue: document.getElementById('dwarf-settlement-frequency-value'),
  woodElfSettlementFrequencyInput: document.getElementById('wood-elf-settlement-frequency'),
  woodElfSettlementFrequencyValue: document.getElementById('wood-elf-settlement-frequency-value'),
  lizardmenSettlementFrequencyInput: document.getElementById('lizardmen-settlement-frequency'),
  lizardmenSettlementFrequencyValue: document.getElementById('lizardmen-settlement-frequency-value'),
  musicToggle: document.getElementById('music-toggle'),
  musicVolume: document.getElementById('music-volume'),
  musicNowPlaying: document.getElementById('music-now-playing'),
  musicToggleGame: document.getElementById('music-toggle-game'),
  musicVolumeGame: document.getElementById('music-volume-game'),
  musicNowPlayingGame: document.getElementById('music-now-playing-game'),
  sfxToggle: document.getElementById('sfx-toggle'),
  sfxVolume: document.getElementById('sfx-volume'),
  audioElement: document.getElementById('background-music'),
  worldInfoModal: document.getElementById('world-info'),
  worldInfoForm: document.getElementById('world-info-form'),
  worldInfoSize: document.getElementById('world-info-size'),
  worldInfoGenerationType: document.getElementById('world-info-generation-type'),
  worldInfoSeed: document.getElementById('world-info-seed'),
  worldInfoChronology: document.getElementById('world-info-chronology'),
  worldYearInput: document.getElementById('world-year-input'),
  worldAgeInput: document.getElementById('world-age-input'),
  worldChronologyRandom: document.getElementById('world-chronology-random'),
  worldInfoGenerationTypeSelect: document.getElementById('world-generation-type-select'),
  worldNameInput: document.getElementById('world-name-input'),
  worldNameRandom: document.getElementById('world-name-random'),
  worldInfoCancel: document.getElementById('world-info-cancel'),
  dwarfCustomizer: document.getElementById('dwarf-customizer'),
  dwarfCustomizerForm: document.getElementById('dwarf-customizer-form'),
  dwarfRosterList: document.getElementById('dwarf-roster-list'),
  dwarfPrev: document.getElementById('dwarf-prev'),
  dwarfNext: document.getElementById('dwarf-next'),
  dwarfSlotLabel: document.getElementById('dwarf-slot-label'),
  dwarfNameInput: document.getElementById('dwarf-name-input'),
  dwarfGenderButtons: document.getElementById('dwarf-gender-buttons'),
  dwarfClanSelect: document.getElementById('dwarf-clan-select'),
  dwarfGuildSelect: document.getElementById('dwarf-guild-select'),
  dwarfProfessionSelect: document.getElementById('dwarf-profession-select'),
  dwarfSkinSlider: document.getElementById('dwarf-skin-slider'),
  dwarfSkinSliderValue: document.getElementById('dwarf-skin-slider-value'),
  dwarfEyeSlider: document.getElementById('dwarf-eye-slider'),
  dwarfEyeSliderValue: document.getElementById('dwarf-eye-slider-value'),
  dwarfHairStyleSlider: document.getElementById('dwarf-hair-style-slider'),
  dwarfHairStyleSliderValue: document.getElementById('dwarf-hair-style-slider-value'),
  dwarfHairSlider: document.getElementById('dwarf-hair-slider'),
  dwarfHairSliderValue: document.getElementById('dwarf-hair-slider-value'),
  dwarfBeardSlider: document.getElementById('dwarf-beard-slider'),
  dwarfBeardSliderValue: document.getElementById('dwarf-beard-slider-value'),
  dwarfBeardFieldGroup: document.getElementById('dwarf-beard-field-group'),
  dwarfRandomise: document.getElementById('dwarf-randomise'),
  dwarfBack: document.getElementById('dwarf-back'),
  dwarfPortrait: document.getElementById('dwarf-portrait'),
  dwarfPortraitCanvas: document.getElementById('dwarf-portrait-canvas'),
  dwarfBodyPortraitCanvas: document.getElementById('dwarf-body-portrait-canvas'),
  dwarfTraitSummary: document.getElementById('dwarf-trait-summary'),
  dwarfTraitAttributes: document.getElementById('dwarf-trait-attributes')
};

function createSoundEffect(src, options = {}) {
  const audio = new Audio(src);
  audio.preload = options.preload ?? 'auto';
  if (typeof options.volume === 'number') {
    const clampedVolume = Math.max(0, Math.min(1, options.volume));
    audio.volume = clampedVolume;
  }
  return audio;
}

function playSoundEffect(audio) {
  if (!audio || audioState.effectsMuted || audioState.effectsVolume <= 0) {
    return;
  }
  try {
    audio.volume = clamp(audioState.effectsVolume, 0, 1);
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  } catch (error) {
    /* ignore playback errors triggered by browser policies */
  }
}

function createLandMask(image) {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) {
    return null;
  }

  context.drawImage(image, 0, 0);
  const { data } = context.getImageData(0, 0, image.width, image.height);
  const maskData = new Float32Array(image.width * image.height);

  const horizontalMargin = Math.max(1, Math.floor(image.width * 0.06));
  const verticalMargin = Math.max(1, Math.floor(image.height * 0.06));
  let borderSum = 0;
  let borderCount = 0;

  for (let y = 0; y < image.height; y += 1) {
    for (let x = 0; x < image.width; x += 1) {
      const idx = (y * image.width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
      maskData[y * image.width + x] = brightness;

      if (
        x < horizontalMargin ||
        x >= image.width - horizontalMargin ||
        y < verticalMargin ||
        y >= image.height - verticalMargin
      ) {
        borderSum += brightness;
        borderCount += 1;
      }
    }
  }

  const borderAverage = borderCount > 0 ? borderSum / borderCount : 0;
  let minValue = Infinity;
  let maxValue = -Infinity;

  for (let i = 0; i < maskData.length; i += 1) {
    const centered = maskData[i] - borderAverage;
    maskData[i] = centered;
    if (centered < minValue) {
      minValue = centered;
    }
    if (centered > maxValue) {
      maxValue = centered;
    }
  }

  const range = maxValue - minValue || 1;

  for (let i = 0; i < maskData.length; i += 1) {
    const normalized = (maskData[i] - minValue) / range;
    maskData[i] = clamp(normalized, 0, 1);
  }

  return {
    width: image.width,
    height: image.height,
    data: maskData
  };
}

function loadLandMask(src) {
  return loadImage(src)
    .then((image) => {
      const mask = createLandMask(image);
      if (!mask) {
        throw new Error('Failed to create land mask context.');
      }
      state.landMask = mask;
      landMaskCache.set(defaultWorldGenerationType, mask);
      return mask;
    })
    .catch((error) => {
      console.warn('Failed to load land mask, falling back to noise-based shape.', error);
      state.landMask = null;
      return null;
    });
}

const tileSheetPromises = Object.values(tileSheets).map((sheet) =>
  loadImage(sheet.path)
    .then((img) => {
      sheet.image = img;
      return img;
    })
    .catch((error) => {
      console.error(`Failed to load tile sheet at ${sheet.path}`, error);
      throw error;
    })
);

const dwarfSpriteSheetPromises = Object.values(dwarfSpriteSheets).map((sheet) =>
  loadImage(sheet.path)
    .then((img) => {
      sheet.image = img;
      return img;
    })
    .catch((error) => {
      console.error(`Failed to load dwarf sprite sheet at ${sheet.path}`, error);
      throw error;
    })
);

const characterCreatorPortraitPromises = Object.values(characterCreatorPortraitAssets).map((asset) =>
  loadImage(asset.path)
    .then((img) => {
      asset.image = img;
      return img;
    })
    .catch((error) => {
      console.warn(`Failed to load character creator portrait asset at ${asset.path}`, error);
      asset.image = null;
      return null;
    })
);

const assetPromises = Promise.all([
  ...tileSheetPromises,
  ...dwarfSpriteSheetPromises,
  ...characterCreatorPortraitPromises,
  loadLandMask('titlescreen/Titlescreen image.png')
]);

elements.startButton.disabled = true;
elements.startButton.textContent = 'Loading tiles…';

assetPromises
  .catch((error) => {
    console.error('One or more assets failed to load.', error);
  })
  .finally(() => {
    state.ready = true;
    elements.startButton.disabled = false;
    elements.startButton.textContent = 'Start Game';
  });

let optionsVisible = false;
let optionsContext = {
  source: 'title',
  returnFocus: null
};

function getMusicToggleElements() {
  return [elements.musicToggle, elements.musicToggleGame].filter(Boolean);
}

function getMusicVolumeInputs() {
  return [elements.musicVolume, elements.musicVolumeGame].filter(Boolean);
}

function getMusicNowPlayingDisplays() {
  return [elements.musicNowPlaying, elements.musicNowPlayingGame].filter(Boolean);
}

function updateOptionsBackButtonLabel() {
  if (!elements.closeOptions) {
    return;
  }
  const label = optionsContext.source === 'game' ? 'Return to Game' : 'Back to Title';
  elements.closeOptions.textContent = label;
}

function openOptionsScreen(source = 'title') {
  if (!elements.optionsScreen) {
    return;
  }
  optionsVisible = true;
  const activeElement =
    typeof document !== 'undefined' && document.activeElement &&
    typeof document.activeElement.focus === 'function'
      ? document.activeElement
      : null;
  optionsContext = {
    source,
    returnFocus: activeElement
  };
  syncInputsWithSettings();
  if (source === 'title' && elements.titleScreen) {
    elements.titleScreen.classList.add('hidden');
  }
  if (source === 'game' && elements.gameContainer) {
    elements.gameContainer.classList.add('hidden');
  }
  elements.optionsScreen.classList.remove('hidden');
  updateOptionsBackButtonLabel();
  if (elements.closeOptions) {
    elements.closeOptions.focus();
  }
}

function closeOptionsScreen({ restoreScreen = true, returnFocus = true } = {}) {
  if (!elements.optionsScreen) {
    return optionsContext.source;
  }
  const previousSource = optionsContext.source;
  if (!optionsVisible) {
    return previousSource;
  }
  optionsVisible = false;
  elements.optionsScreen.classList.add('hidden');
  if (restoreScreen) {
    if (previousSource === 'title' && elements.titleScreen) {
      elements.titleScreen.classList.remove('hidden');
    }
    if (previousSource === 'game' && elements.gameContainer) {
      elements.gameContainer.classList.remove('hidden');
    }
  }
  if (
    returnFocus &&
    optionsContext.returnFocus &&
    typeof optionsContext.returnFocus.focus === 'function'
  ) {
    optionsContext.returnFocus.focus();
  }
  optionsContext = {
    source: 'title',
    returnFocus: null
  };
  return previousSource;
}

function applyFormSettings() {
  const selectedKey = elements.mapSizeSelect ? elements.mapSizeSelect.value : state.settings.mapSize;
  const preset = getMapSizePreset(selectedKey);
  const seedString = (elements.seedInput.value || '').trim();
  const generationTypeValue = elements.worldGenerationTypeSelect
    ? elements.worldGenerationTypeSelect.value
    : state.settings.worldGenerationType;
  const forestFrequencyRaw = elements.forestFrequencyInput
    ? Number.parseInt(elements.forestFrequencyInput.value, 10)
    : state.settings.forestFrequency;
  const mountainFrequencyRaw = elements.mountainFrequencyInput
    ? Number.parseInt(elements.mountainFrequencyInput.value, 10)
    : state.settings.mountainFrequency;
  const riverFrequencyRaw = elements.riverFrequencyInput
    ? Number.parseInt(elements.riverFrequencyInput.value, 10)
    : state.settings.riverFrequency;
  const humanSettlementFrequencyRaw = elements.humanSettlementFrequencyInput
    ? Number.parseInt(elements.humanSettlementFrequencyInput.value, 10)
    : state.settings.humanSettlementFrequency;
  const dwarfSettlementFrequencyRaw = elements.dwarfSettlementFrequencyInput
    ? Number.parseInt(elements.dwarfSettlementFrequencyInput.value, 10)
    : state.settings.dwarfSettlementFrequency;
  const woodElfSettlementFrequencyRaw = elements.woodElfSettlementFrequencyInput
    ? Number.parseInt(elements.woodElfSettlementFrequencyInput.value, 10)
    : state.settings.woodElfSettlementFrequency;
  const lizardmenSettlementFrequencyRaw = elements.lizardmenSettlementFrequencyInput
    ? Number.parseInt(elements.lizardmenSettlementFrequencyInput.value, 10)
    : state.settings.lizardmenSettlementFrequency;

  applyMapSizePresetToState(preset);
  state.settings.seedString = seedString;
  if (seedString) {
    state.settings.lastSeedString = seedString;
  }
  state.settings.forestFrequency = sanitizeFrequencyValue(
    Number.isNaN(forestFrequencyRaw) ? state.settings.forestFrequency : forestFrequencyRaw,
    state.settings.forestFrequency
  );
  state.settings.mountainFrequency = sanitizeFrequencyValue(
    Number.isNaN(mountainFrequencyRaw) ? state.settings.mountainFrequency : mountainFrequencyRaw,
    state.settings.mountainFrequency
  );
  state.settings.riverFrequency = sanitizeFrequencyValue(
    Number.isNaN(riverFrequencyRaw) ? state.settings.riverFrequency : riverFrequencyRaw,
    state.settings.riverFrequency
  );
  state.settings.humanSettlementFrequency = sanitizeFrequencyValue(
    Number.isNaN(humanSettlementFrequencyRaw)
      ? state.settings.humanSettlementFrequency
      : humanSettlementFrequencyRaw,
    state.settings.humanSettlementFrequency
  );
  state.settings.dwarfSettlementFrequency = sanitizeFrequencyValue(
    Number.isNaN(dwarfSettlementFrequencyRaw)
      ? state.settings.dwarfSettlementFrequency
      : dwarfSettlementFrequencyRaw,
    state.settings.dwarfSettlementFrequency
  );
  state.settings.woodElfSettlementFrequency = sanitizeFrequencyValue(
    Number.isNaN(woodElfSettlementFrequencyRaw)
      ? state.settings.woodElfSettlementFrequency
      : woodElfSettlementFrequencyRaw,
    state.settings.woodElfSettlementFrequency
  );
  state.settings.lizardmenSettlementFrequency = sanitizeFrequencyValue(
    Number.isNaN(lizardmenSettlementFrequencyRaw)
      ? state.settings.lizardmenSettlementFrequency
      : lizardmenSettlementFrequencyRaw,
    state.settings.lizardmenSettlementFrequency
  );
  setWorldGenerationType(generationTypeValue);

  if (elements.worldMapSizeSelect) {
    elements.worldMapSizeSelect.value = state.settings.mapSize;
  }
  updateWorldInfoSizeDisplay();
  updateWorldInfoGenerationTypeDisplay();

  if (elements.worldSeedInput) {
    elements.worldSeedInput.value = state.settings.seedString;
  }
  updateWorldInfoSeedDisplay(state.settings.seedString);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function sampleRange(randomFn, range, fallbackMin, fallbackMax) {
  const hasRange = Array.isArray(range) && range.length === 2;
  const min = hasRange && Number.isFinite(range[0]) ? range[0] : fallbackMin;
  const max = hasRange && Number.isFinite(range[1]) ? range[1] : fallbackMax;
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    const defaultSpan = fallbackMax - fallbackMin;
    return fallbackMin + randomFn() * defaultSpan;
  }
  if (max <= min) {
    return min;
  }
  const span = max - min;
  return min + randomFn() * span;
}

function shuffleArray(items, random = Math.random) {
  if (!Array.isArray(items) || items.length <= 1) {
    return Array.isArray(items) ? items.slice() : [];
  }
  const result = items.slice();
  const rng = typeof random === 'function' ? random : Math.random;
  for (let i = result.length - 1; i > 0; i -= 1) {
    const sample = clamp(rng(), 0, 1);
    const j = Math.floor(sample * (i + 1));
    const swapIndex = clamp(Number.isFinite(j) ? j : 0, 0, i);
    if (swapIndex !== i) {
      const temp = result[i];
      result[i] = result[swapIndex];
      result[swapIndex] = temp;
    }
  }
  return result;
}

function compute1dDistanceTransform(sourceLine, length, outputLine, v, z) {
  let k = 0;
  v[0] = 0;
  z[0] = Number.NEGATIVE_INFINITY;
  z[1] = Number.POSITIVE_INFINITY;
  for (let q = 1; q < length; q += 1) {
    let s;
    do {
      const p = v[k];
      const numerator = sourceLine[q] + q * q - (sourceLine[p] + p * p);
      const denominator = 2 * (q - p);
      s = numerator / denominator;
      if (s <= z[k]) {
        k -= 1;
      } else {
        break;
      }
    } while (k >= 0);
    k += 1;
    v[k] = q;
    z[k] = s;
    z[k + 1] = Number.POSITIVE_INFINITY;
  }
  k = 0;
  for (let q = 0; q < length; q += 1) {
    while (z[k + 1] < q) {
      k += 1;
    }
    const p = v[k];
    const diff = q - p;
    outputLine[q] = diff * diff + sourceLine[p];
  }
}

function computeEuclideanDistanceField(sourceMask, width, height) {
  const size = width * height;
  const distances = new Float64Array(size);
  const inf = 1e12;
  for (let i = 0; i < size; i += 1) {
    distances[i] = sourceMask[i] ? 0 : inf;
  }
  const maxDim = Math.max(width, height);
  const lineBuffer = new Float64Array(maxDim);
  const lineResult = new Float64Array(maxDim);
  const v = new Int32Array(maxDim);
  const z = new Float64Array(maxDim + 1);

  for (let y = 0; y < height; y += 1) {
    const offset = y * width;
    for (let x = 0; x < width; x += 1) {
      lineBuffer[x] = distances[offset + x];
    }
    compute1dDistanceTransform(lineBuffer, width, lineResult, v, z);
    for (let x = 0; x < width; x += 1) {
      distances[offset + x] = lineResult[x];
    }
  }

  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      lineBuffer[y] = distances[y * width + x];
    }
    compute1dDistanceTransform(lineBuffer, height, lineResult, v, z);
    for (let y = 0; y < height; y += 1) {
      distances[y * width + x] = lineResult[y];
    }
  }

  return distances;
}

function escapeHtml(value) {
  if (value === null || value === undefined) {
    return '';
  }
  return String(value).replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return char;
    }
  });
}

function sanitizeFrequencyValue(value, fallback) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return clamp(value, 0, 100);
  }
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    return clamp(fallback, 0, 100);
  }
  return clamp(parsed, 0, 100);
}

function describeFrequency(value) {
  const numeric = clamp(Math.round(value), 0, 100);
  if (numeric <= 10) {
    return 'Minimal';
  }
  if (numeric <= 30) {
    return 'Sparse';
  }
  if (numeric <= 45) {
    return 'Low';
  }
  if (numeric < 60) {
    return 'Balanced';
  }
  if (numeric <= 75) {
    return 'High';
  }
  if (numeric <= 90) {
    return 'Dense';
  }
  return 'Abundant';
}

function updateFrequencyDisplay(displayElement, value) {
  if (!displayElement) {
    return;
  }
  const numeric = clamp(Math.round(value), 0, 100);
  displayElement.textContent = `${numeric}% — ${describeFrequency(numeric)}`;
}

function computeFrequencyMultiplier(setting, minMultiplier = 0.25, maxMultiplier = 1.75) {
  const normalized = clamp(setting / 100, 0, 1);
  return lerp(minMultiplier, maxMultiplier, normalized);
}

function computeStructurePlacementLimit(baseTarget, baseLimit, multiplier) {
  const scaledTarget = Math.max(1, Math.round(baseTarget * multiplier));
  const scaledLimit = Math.max(1, Math.round(baseLimit * multiplier));
  return Math.min(scaledTarget, scaledLimit);
}

function adjustMinDistance(baseDistance, normalized) {
  const scale = lerp(1.35, 0.7, clamp(normalized, 0, 1));
  return Math.max(2, Math.round(baseDistance * scale));
}

function computeAbandonedDwarfholdChance(normalizedFrequency) {
  const scarcity = 1 - clamp(normalizedFrequency, 0, 1);
  return clamp(lerp(0.08, 0.28, scarcity), 0, 1);
}

function connectTownsWithinRange(tiles, towns, options = {}) {
  if (!Array.isArray(tiles) || !Array.isArray(towns) || towns.length < 2) {
    return;
  }

  const {
    maxDistance = 25,
    overlayKey = TOWN_ROAD_OVERLAY_KEY,
    width,
    height,
    isLandBaseTile,
    waterMask,
    treeOverlayKey,
    treeSnowOverlayKey,
    treeOverlayKeys: allTreeOverlayKeys,
    isMountainOverlay,
    replaceableOverlays
  } = options;

  if (!overlayKey || !Number.isFinite(maxDistance) || maxDistance <= 0) {
    return;
  }

  const mapHeight = Number.isFinite(height) ? height : tiles.length;
  const mapWidth = Number.isFinite(width)
    ? width
    : tiles.length > 0 && Array.isArray(tiles[0])
      ? tiles[0].length
      : 0;

  if (!Number.isFinite(mapWidth) || mapWidth <= 0 || !Number.isFinite(mapHeight) || mapHeight <= 0) {
    return;
  }

  const maxDistanceSq = maxDistance * maxDistance;

  for (let i = 0; i < towns.length; i += 1) {
    const townA = towns[i];
    if (!townA || !Number.isFinite(townA.x) || !Number.isFinite(townA.y)) {
      continue;
    }
    for (let j = i + 1; j < towns.length; j += 1) {
      const townB = towns[j];
      if (!townB || !Number.isFinite(townB.x) || !Number.isFinite(townB.y)) {
        continue;
      }
      const dx = townA.x - townB.x;
      const dy = townA.y - townB.y;
      if (dx * dx + dy * dy > maxDistanceSq) {
        continue;
      }
      if (
        doesDirectTownConnectionCrossWater(
          townA,
          townB,
          mapWidth,
          mapHeight,
          waterMask
        )
      ) {
        continue;
      }
      carveRoadBetweenPoints(townA, townB, {
        tiles,
        overlayKey,
        width: mapWidth,
        height: mapHeight,
        isLandBaseTile,
        waterMask,
        treeOverlayKey,
        treeSnowOverlayKey,
        treeOverlayKeys: allTreeOverlayKeys,
        isMountainOverlay,
        replaceableOverlays
      });
    }
  }
}

function doesDirectTownConnectionCrossWater(start, end, width, height, waterMask) {
  if (
    !start ||
    !end ||
    !Number.isFinite(start.x) ||
    !Number.isFinite(start.y) ||
    !Number.isFinite(end.x) ||
    !Number.isFinite(end.y)
  ) {
    return false;
  }

  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return false;
  }

  if (!waterMask || (!Array.isArray(waterMask) && !(waterMask instanceof Uint8Array))) {
    return false;
  }

  const totalTiles = width * height;
  if (!Number.isFinite(totalTiles) || totalTiles <= 0) {
    return false;
  }

  let x0 = clamp(Math.round(start.x), 0, width - 1);
  let y0 = clamp(Math.round(start.y), 0, height - 1);
  const x1 = clamp(Math.round(end.x), 0, width - 1);
  const y1 = clamp(Math.round(end.y), 0, height - 1);

  const dx = Math.abs(x1 - x0);
  const sx = x0 < x1 ? 1 : -1;
  const dy = -Math.abs(y1 - y0);
  const sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;

  while (true) {
    const index = y0 * width + x0;
    if (index >= 0 && index < waterMask.length && waterMask[index]) {
      return true;
    }
    if (x0 === x1 && y0 === y1) {
      break;
    }
    const e2 = err * 2;
    if (e2 >= dy) {
      err += dy;
      x0 += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y0 += sy;
    }
  }

  return false;
}

function carveRoadBetweenPoints(start, end, options) {
  if (!start || !end || !options || !options.tiles) {
    return;
  }

  const path = findRoadPathBetweenPoints(start, end, options);
  if (Array.isArray(path) && path.length > 0) {
    for (let i = 0; i < path.length; i += 1) {
      const step = path[i];
      placeRoadOverlayAt(step.x, step.y, options);
    }
    return;
  }

  let x0 = Math.round(start.x);
  let y0 = Math.round(start.y);
  const x1 = Math.round(end.x);
  const y1 = Math.round(end.y);

  const dx = Math.abs(x1 - x0);
  const sx = x0 < x1 ? 1 : -1;
  const dy = -Math.abs(y1 - y0);
  const sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;

  while (true) {
    placeRoadOverlayAt(x0, y0, options);
    if (x0 === x1 && y0 === y1) {
      break;
    }
    const e2 = err * 2;
    if (e2 >= dy) {
      err += dy;
      x0 += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y0 += sy;
    }
  }
}

function placeRoadOverlayAt(x, y, options) {
  const {
    tiles,
    overlayKey = TOWN_ROAD_OVERLAY_KEY,
    width,
    height,
    isLandBaseTile,
    waterMask,
    treeOverlayKey,
    treeSnowOverlayKey,
    treeOverlayKeys: allTreeOverlayKeys,
    isMountainOverlay,
    replaceableOverlays
  } = options || {};

  const evaluation = evaluateRoadTileForPath(x, y, options);
  if (!evaluation.passableForPlacement || !tiles || !overlayKey) {
    return;
  }

  const row = tiles[y];
  if (!Array.isArray(row)) {
    return;
  }

  const tile = row[x];
  if (!tile) {
    return;
  }

  tile.overlay = overlayKey;
}

function evaluateRoadTileForPath(x, y, options) {
  const {
    tiles,
    overlayKey = TOWN_ROAD_OVERLAY_KEY,
    width,
    height,
    isLandBaseTile,
    waterMask,
    treeOverlayKey,
    treeSnowOverlayKey,
    treeOverlayKeys: allTreeOverlayKeys,
    isMountainOverlay,
    replaceableOverlays
  } = options || {};

  const defaultResult = {
    passable: false,
    passableForPlacement: false,
    cost: Number.POSITIVE_INFINITY,
    tile: null,
    isHill: false,
    isWater: false
  };

  if (!tiles || x < 0 || y < 0 || !Number.isFinite(x) || !Number.isFinite(y)) {
    return defaultResult;
  }

  const mapWidth = Number.isFinite(width) ? width : tiles.length > 0 ? tiles[0].length : 0;
  const mapHeight = Number.isFinite(height) ? height : tiles.length;

  if (x >= mapWidth || y >= mapHeight) {
    return defaultResult;
  }

  const row = tiles[y];
  if (!Array.isArray(row)) {
    return defaultResult;
  }

  const tile = row[x];
  if (!tile) {
    return defaultResult;
  }

  if (tile.river) {
    return { ...defaultResult, tile, isWater: true };
  }

  if (typeof isLandBaseTile === 'function' && !isLandBaseTile(tile.base)) {
    return { ...defaultResult, tile };
  }

  const waterResult = { ...defaultResult, tile, isWater: true };

  if (waterMask && (Array.isArray(waterMask) || waterMask instanceof Uint8Array)) {
    const idx = y * mapWidth + x;
    if (idx >= 0 && idx < waterMask.length && waterMask[idx]) {
      return waterResult;
    }
  }

  let passable = true;
  let passableForPlacement = true;
  let cost = 1;

  if (tile.structure) {
    passableForPlacement = false;
    passable = false;
  }

  const treeOverlays = Array.isArray(allTreeOverlayKeys) && allTreeOverlayKeys.length > 0
    ? allTreeOverlayKeys
    : [treeOverlayKey, treeSnowOverlayKey].filter((key, index, array) => key && array.indexOf(key) === index);

  const tileOverlay = tile.overlay;
  const mountainOverlayPresent =
    typeof isMountainOverlay === 'function' &&
    (isMountainOverlay(tileOverlay) || (tile.hillOverlay && isMountainOverlay(tile.hillOverlay)));

  if (mountainOverlayPresent) {
    passable = false;
    passableForPlacement = false;
  }

  const isHillOverlayPresent =
    typeof isHillOverlayKey === 'function' &&
    (isHillOverlayKey(tileOverlay) || (tile.hillOverlay && isHillOverlayKey(tile.hillOverlay)));

  if (isHillOverlayPresent) {
    cost = Math.max(cost, 6);
  }

  if (tileOverlay && tileOverlay !== overlayKey) {
    let canReplace = false;
    if (replaceableOverlays) {
      if (typeof replaceableOverlays.has === 'function') {
        canReplace = replaceableOverlays.has(tileOverlay);
      } else if (Array.isArray(replaceableOverlays)) {
        canReplace = replaceableOverlays.includes(tileOverlay);
      }
    }
    if (!canReplace) {
      const isTreeOverlay = treeOverlays.length > 0 && treeOverlays.includes(tileOverlay);
      if (!isTreeOverlay && tileOverlay !== overlayKey) {
        passable = false;
        passableForPlacement = false;
      }
    }
  }

  if (!passable) {
    return { ...defaultResult, tile, passable: false, passableForPlacement, cost: Number.POSITIVE_INFINITY, isHill: isHillOverlayPresent };
  }

  return {
    passable,
    passableForPlacement,
    cost,
    tile,
    isHill: isHillOverlayPresent,
    isWater: false
  };
}

function findRoadPathBetweenPoints(start, end, options) {
  if (!options || !options.tiles) {
    return null;
  }

  const {
    width,
    height
  } = options;

  const mapWidth = Number.isFinite(width) ? width : options.tiles.length > 0 ? options.tiles[0].length : 0;
  const mapHeight = Number.isFinite(height) ? height : options.tiles.length;

  if (!Number.isFinite(mapWidth) || !Number.isFinite(mapHeight) || mapWidth <= 0 || mapHeight <= 0) {
    return null;
  }

  const startX = clamp(Math.round(start.x), 0, mapWidth - 1);
  const startY = clamp(Math.round(start.y), 0, mapHeight - 1);
  const endX = clamp(Math.round(end.x), 0, mapWidth - 1);
  const endY = clamp(Math.round(end.y), 0, mapHeight - 1);

  const padding = 8;
  const minX = Math.max(0, Math.min(startX, endX) - padding);
  const maxX = Math.min(mapWidth - 1, Math.max(startX, endX) + padding);
  const minY = Math.max(0, Math.min(startY, endY) - padding);
  const maxY = Math.min(mapHeight - 1, Math.max(startY, endY) + padding);

  const searchWidth = maxX - minX + 1;
  const searchHeight = maxY - minY + 1;
  const totalCells = searchWidth * searchHeight;

  if (totalCells <= 0) {
    return null;
  }

  const evaluations = new Array(totalCells);
  for (let localY = 0; localY < searchHeight; localY += 1) {
    for (let localX = 0; localX < searchWidth; localX += 1) {
      const worldX = minX + localX;
      const worldY = minY + localY;
      const index = localY * searchWidth + localX;
      evaluations[index] = evaluateRoadTileForPath(worldX, worldY, options);
    }
  }

  const startIndex = (startY - minY) * searchWidth + (startX - minX);
  const goalIndex = (endY - minY) * searchWidth + (endX - minX);

  const startInfo = evaluations[startIndex];
  const goalInfo = evaluations[goalIndex];

  if (startInfo) {
    if (!startInfo.passable && startInfo.tile && !startInfo.isWater) {
      startInfo.passable = true;
      startInfo.cost = Math.min(startInfo.cost, 1);
    }
  }

  if (goalInfo) {
    if (!goalInfo.passable && goalInfo.tile && !goalInfo.isWater) {
      goalInfo.passable = true;
      goalInfo.cost = Math.min(goalInfo.cost, 1);
    }
  }

  if (!startInfo || !startInfo.passable || !goalInfo || !goalInfo.passable) {
    return null;
  }

  const gScores = new Array(totalCells).fill(Number.POSITIVE_INFINITY);
  const fScores = new Array(totalCells).fill(Number.POSITIVE_INFINITY);
  const cameFrom = new Array(totalCells).fill(-1);
  const openSet = [];
  const inOpenSet = new Array(totalCells).fill(false);

  const heuristic = (x, y) => {
    const dx = Math.abs(x - (endX - minX));
    const dy = Math.abs(y - (endY - minY));
    return Math.max(dx, dy);
  };

  gScores[startIndex] = 0;
  fScores[startIndex] = heuristic(startX - minX, startY - minY);
  openSet.push(startIndex);
  inOpenSet[startIndex] = true;

  const neighborSteps = [
    { dx: 1, dy: 0, cost: 1 },
    { dx: -1, dy: 0, cost: 1 },
    { dx: 0, dy: 1, cost: 1 },
    { dx: 0, dy: -1, cost: 1 },
    { dx: 1, dy: 1, cost: Math.SQRT2 },
    { dx: 1, dy: -1, cost: Math.SQRT2 },
    { dx: -1, dy: 1, cost: Math.SQRT2 },
    { dx: -1, dy: -1, cost: Math.SQRT2 }
  ];

  const isIndexValid = (index) => index >= 0 && index < totalCells;

  while (openSet.length > 0) {
    openSet.sort((a, b) => fScores[a] - fScores[b]);
    const currentIndex = openSet.shift();
    inOpenSet[currentIndex] = false;

    if (currentIndex === goalIndex) {
      return reconstructRoadPath(cameFrom, currentIndex, searchWidth, minX, minY);
    }

    const currentY = Math.floor(currentIndex / searchWidth);
    const currentX = currentIndex - currentY * searchWidth;

    for (let i = 0; i < neighborSteps.length; i += 1) {
      const step = neighborSteps[i];
      const neighborX = currentX + step.dx;
      const neighborY = currentY + step.dy;

      if (neighborX < 0 || neighborY < 0 || neighborX >= searchWidth || neighborY >= searchHeight) {
        continue;
      }

      const neighborIndex = neighborY * searchWidth + neighborX;
      if (!isIndexValid(neighborIndex)) {
        continue;
      }

      const neighborInfo = evaluations[neighborIndex];
      if (!neighborInfo || !neighborInfo.passable || neighborInfo.isWater) {
        continue;
      }

      if (Math.abs(step.dx) + Math.abs(step.dy) === 2) {
        const adjX = currentX + step.dx;
        const adjY = currentY;
        const adjIndex = adjY * searchWidth + adjX;
        const otherAdjX = currentX;
        const otherAdjY = currentY + step.dy;
        const otherAdjIndex = otherAdjY * searchWidth + otherAdjX;
        const adjInfo = evaluations[adjIndex];
        const otherAdjInfo = evaluations[otherAdjIndex];
        if ((adjInfo && !adjInfo.passable) || (otherAdjInfo && !otherAdjInfo.passable)) {
          continue;
        }
      }

      const traversalCost = neighborInfo.cost * step.cost;
      const tentativeG = gScores[currentIndex] + traversalCost;

      if (tentativeG >= gScores[neighborIndex]) {
        continue;
      }

      cameFrom[neighborIndex] = currentIndex;
      gScores[neighborIndex] = tentativeG;
      fScores[neighborIndex] = tentativeG + heuristic(neighborX, neighborY);

      if (!inOpenSet[neighborIndex]) {
        openSet.push(neighborIndex);
        inOpenSet[neighborIndex] = true;
      }
    }
  }

  return null;
}

function reconstructRoadPath(cameFrom, currentIndex, width, offsetX, offsetY) {
  const path = [];
  let current = currentIndex;
  while (current !== -1) {
    const y = Math.floor(current / width);
    const x = current - y * width;
    path.push({ x: offsetX + x, y: offsetY + y });
    current = cameFrom[current];
  }
  path.reverse();
  return path;
}

function computeDwarfholdDistributionAdjustment(x, y, height, seed) {
  if (!Number.isFinite(y) || !Number.isFinite(height) || height <= 1) {
    return 0;
  }

  const normalizedLatitude = clamp(y / (height - 1), 0, 1);
  const centerLift = Math.max(0, 0.5 - Math.abs(normalizedLatitude - 0.5)) * 0.12;
  const southernBoost = Math.max(0, normalizedLatitude - 0.45) * 0.08;
  const northernPenalty = Math.max(0, 0.38 - normalizedLatitude) * 0.12;
  const jitter = (hashCoords(x, y, seed >>> 0) - 0.5) * 0.06;

  return centerLift + southernBoost - northernPenalty + jitter;
}

function tryPlaceDwarfhold(candidate, options) {
  if (!candidate || !options) {
    return false;
  }
  const {
    placed,
    minDistanceSq,
    tiles,
    width,
    waterMask,
    mountainScores,
    fallbackMountainScoreThreshold,
    mountainOverlayKey,
    dwarfholdKey,
    greatDwarfholdKey,
    abandonedDwarfholdKey,
    abandonedDwarfholdChance,
    rng,
    dwarfholds,
    towns,
    nearbyTownDistanceSq
  } = options;

  if (!tiles || !Array.isArray(tiles[candidate.y])) {
    return false;
  }

  const tile = tiles[candidate.y][candidate.x];
  if (!tile || tile.structure || tile.river) {
    return false;
  }

  if (
    Array.isArray(placed) &&
    Number.isFinite(minDistanceSq) &&
    minDistanceSq > 0 &&
    placed.length > 0
  ) {
    for (let i = 0; i < placed.length; i += 1) {
      const other = placed[i];
      const dx = candidate.x - other.x;
      const dy = candidate.y - other.y;
      if (dx * dx + dy * dy < minDistanceSq) {
        return false;
      }
    }
  }

  const idx = candidate.y * width + candidate.x;
  const qualifiesForPlacement =
    candidate.isMountainTile ||
    (!tile.overlay &&
      mountainScores &&
      mountainScores[idx] >= fallbackMountainScoreThreshold &&
      waterMask &&
      !waterMask[idx]);

  if (!qualifiesForPlacement) {
    return false;
  }

  if (!candidate.isMountainTile && mountainOverlayKey && !tile.overlay) {
    tile.overlay = mountainOverlayKey;
  }

  const resolvedTownDistanceSq =
    Number.isFinite(nearbyTownDistanceSq) && nearbyTownDistanceSq >= 0
      ? nearbyTownDistanceSq
      : dwarfholdNearbyTownRadius * dwarfholdNearbyTownRadius;

  const hasNearbyHumanSettlement =
    Array.isArray(towns) &&
    towns.some((town) => {
      if (!town || !Number.isFinite(town.x) || !Number.isFinite(town.y)) {
        return false;
      }
      const dx = candidate.x - town.x;
      const dy = candidate.y - town.y;
      const distanceSq = dx * dx + dy * dy;
      if (distanceSq > resolvedTownDistanceSq) {
        return false;
      }
      const type = typeof town.type === 'string' ? town.type.toLowerCase() : '';
      if (type === 'city' || type === 'town' || type === 'village') {
        return true;
      }
      const classification =
        typeof town.classification === 'string' ? town.classification.toLowerCase() : '';
      if (classification === 'city' || classification === 'village' || classification.includes('town')) {
        return true;
      }
      return false;
    });

  const randomFn = typeof rng === 'function' ? rng : Math.random;
  const resolvedAbandonedChance = clamp(
    Number.isFinite(abandonedDwarfholdChance) ? abandonedDwarfholdChance : 0,
    0,
    1
  );
  const isAbandoned = resolvedAbandonedChance > 0 && randomFn() < resolvedAbandonedChance;
  const name = generateDwarfholdName(randomFn);
  const details = generateDwarfholdDetails(name, randomFn, {
    hasNearbyHumanSettlement,
    isAbandoned
  });
  let structureKey = dwarfholdKey;
  if (details.type === 'abandonedDwarfhold') {
    structureKey = abandonedDwarfholdKey || dwarfholdKey || greatDwarfholdKey || null;
  } else if (details.type === 'greatDwarfhold') {
    structureKey = greatDwarfholdKey || dwarfholdKey || null;
  }

  tile.structure = structureKey;
  tile.structureName = name;
  tile.structureDetails = details;

  if (Array.isArray(placed)) {
    placed.push(candidate);
  }
  if (Array.isArray(dwarfholds)) {
    dwarfholds.push({ x: candidate.x, y: candidate.y, ...details });
  }

  return true;
}

function randomInt(min, max) {
  const lower = Math.ceil(min);
  const upper = Math.floor(max);
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

function randomChoice(options) {
  if (!Array.isArray(options) || options.length === 0) {
    return null;
  }
  const index = randomInt(0, options.length - 1);
  return options[index];
}

function getOptionByValue(category, value) {
  const bucket = dwarfOptions[category];
  if (!bucket || bucket.length === 0) {
    return null;
  }
  let resolvedValue = value;
  if (category === 'hairStyle') {
    resolvedValue = resolveHairStyleValue(value);
  } else if (category === 'head') {
    resolvedValue = resolveHeadTypeValue(value);
  }
  return bucket.find((option) => option.value === resolvedValue) || bucket[0];
}

function getOptionLabel(category, value) {
  const option = getOptionByValue(category, value);
  return option ? option.label : value;
}

function generateDwarfFirstName(gender) {
  const pool = dwarfNamePools[gender] || dwarfNamePools.male;
  return randomChoice(pool) || 'Urist';
}

function generateDwarfClanName() {
  const option = randomChoice(dwarfOptions.clan) || dwarfOptions.clan[0];
  return option?.label || 'Stonebeard';
}

function generateDwarfName(gender, clanValue) {
  const firstName = generateDwarfFirstName(gender);
  const clanName = clanValue ? getOptionLabel('clan', clanValue) : generateDwarfClanName();
  return `${firstName} ${clanName}`;
}

function extractFirstName(fullName) {
  if (!fullName) {
    return '';
  }
  const trimmed = fullName.trim();
  if (!trimmed) {
    return '';
  }
  const [firstName] = trimmed.split(/\s+/);
  return firstName || '';
}

function isPresetDwarfFirstName(firstName) {
  return presetDwarfFirstNames.has(firstName);
}

function createRandomDwarf(preferredGender) {
  const genderOption = preferredGender
    ? getOptionByValue('gender', preferredGender)
    : randomChoice(dwarfOptions.gender);
  const genderValue = genderOption ? genderOption.value : dwarfOptions.gender[0].value;
  const skinOption = randomChoice(dwarfOptions.skin) || dwarfOptions.skin[0];
  const eyeOption = randomChoice(dwarfOptions.eyes) || dwarfOptions.eyes[0];
  const headOption = randomChoice(dwarfOptions.head) || dwarfOptions.head[0];
  const hairStyleOption = randomChoice(dwarfOptions.hairStyle) || dwarfOptions.hairStyle[0];
  const hairOption = randomChoice(dwarfOptions.hair) || dwarfOptions.hair[0];
  const beardOption =
    genderValue === 'female'
      ? dwarfOptions.beard.find((option) => option.value === 'clean') || dwarfOptions.beard[0]
      : randomChoice(dwarfOptions.beard) || dwarfOptions.beard[0];
  const clanOption = randomChoice(dwarfOptions.clan) || dwarfOptions.clan[0];
  const guildOption = randomChoice(dwarfOptions.guild) || dwarfOptions.guild[0];
  const professionOption = randomChoice(dwarfOptions.profession) || dwarfOptions.profession[0];

  return {
    name: generateDwarfName(genderValue, clanOption?.value),
    gender: genderValue,
    skin: skinOption.value,
    eyes: eyeOption.value,
    head: resolveHeadTypeValue(headOption.value),
    hairStyle: resolveHairStyleValue(hairStyleOption.value),
    hair: hairOption.value,
    beard: genderValue === 'female' ? 'clean' : beardOption.value,
    clan: clanOption?.value,
    guild: guildOption?.value,
    profession: professionOption?.value
  };
}

function initialiseDwarfParty() {
  const dwarves = Array.from({ length: defaultDwarfCount }, () => createRandomDwarf());
  state.dwarfParty = {
    dwarves,
    activeIndex: 0
  };
}

function ensureDwarfParty({ forceReset = false } = {}) {
  if (forceReset || !Array.isArray(state.dwarfParty?.dwarves) || state.dwarfParty.dwarves.length === 0) {
    initialiseDwarfParty();
    return;
  }
  state.dwarfParty.activeIndex = clamp(
    state.dwarfParty.activeIndex,
    0,
    Math.max(0, state.dwarfParty.dwarves.length - 1)
  );
}

function getActiveDwarf() {
  if (!state.dwarfParty || !Array.isArray(state.dwarfParty.dwarves)) {
    return null;
  }
  return state.dwarfParty.dwarves[state.dwarfParty.activeIndex] || null;
}

function ensurePortraitContext() {
  const canvas = elements.dwarfPortraitCanvas || null;
  if (!canvas) {
    dwarfPortraitState.canvas = null;
    dwarfPortraitState.ctx = null;
    return null;
  }
  if (canvas !== dwarfPortraitState.canvas) {
    const context = canvas.getContext('2d');
    if (!context) {
      dwarfPortraitState.canvas = null;
      dwarfPortraitState.ctx = null;
      return null;
    }
    context.imageSmoothingEnabled = false;
    dwarfPortraitState.canvas = canvas;
    dwarfPortraitState.ctx = context;
  }
  return dwarfPortraitState.ctx;
}

function ensureBodyPortraitContext() {
  const canvas = elements.dwarfBodyPortraitCanvas || null;
  if (!canvas) {
    dwarfBodyPortraitState.canvas = null;
    dwarfBodyPortraitState.ctx = null;
    return null;
  }
  if (canvas !== dwarfBodyPortraitState.canvas) {
    const context = canvas.getContext('2d');
    if (!context) {
      dwarfBodyPortraitState.canvas = null;
      dwarfBodyPortraitState.ctx = null;
      return null;
    }
    context.imageSmoothingEnabled = false;
    dwarfBodyPortraitState.canvas = canvas;
    dwarfBodyPortraitState.ctx = context;
  }
  return dwarfBodyPortraitState.ctx;
}

function getBaseBodyFrame(dwarf) {
  const frames = dwarfPortraitConfig.baseFrames;
  const gender = dwarf?.gender;
  if (gender && frames && Object.prototype.hasOwnProperty.call(frames, gender)) {
    return frames[gender];
  }
  return dwarfPortraitConfig.baseFrame || null;
}

function drawTintedSprite(ctx, sheetKey, frame, baseX, baseY, scale, tint) {
  const sheet = dwarfSpriteSheets[sheetKey];
  if (!sheet?.image) {
    return;
  }
  const { tileSize } = sheet;
  const sx = frame.col * tileSize;
  const sy = frame.row * tileSize;
  const sw = tileSize;
  const sh = tileSize;
  const destX = baseX;
  const destY = baseY + Math.round((frame.offsetY || 0) * scale);
  const destW = sw * scale;
  const destH = sh * scale;

  const offscreen = document.createElement('canvas');
  offscreen.width = sw;
  offscreen.height = sh;
  const offscreenCtx = offscreen.getContext('2d');
  if (!offscreenCtx) {
    return;
  }
  offscreenCtx.imageSmoothingEnabled = false;
  offscreenCtx.drawImage(sheet.image, sx, sy, sw, sh, 0, 0, sw, sh);
  if (tint) {
    offscreenCtx.globalCompositeOperation = 'source-atop';
    offscreenCtx.fillStyle = tint;
    offscreenCtx.globalAlpha = 0.9;
    offscreenCtx.fillRect(0, 0, sw, sh);
    offscreenCtx.globalAlpha = 1;
    offscreenCtx.globalCompositeOperation = 'source-over';
  }
  ctx.drawImage(offscreen, 0, 0, sw, sh, destX, destY, destW, destH);
}

function getHeadFrame(headValue) {
  const headConfig = dwarfPortraitConfig.head;
  const resolvedValue = resolveHeadTypeValue(headValue);
  const headType = dwarfHeadTypes[resolvedValue];
  if (!headConfig || !headType) {
    return null;
  }
  return {
    sheet: headConfig.sheet,
    col: headType.column,
    row: headConfig.row,
    offsetY: headConfig.offsetY ?? 0
  };
}

function getHairFrame(dwarf, hairOption, hairStyleValue) {
  const styleConfig = getHairStyleConfig(hairStyleValue ?? dwarf?.hairStyle);
  const rows = styleConfig?.rows || {};
  const genderRow = rows[dwarf?.gender];
  const row = typeof genderRow === 'number' ? genderRow : rows.default;
  const mapping = dwarfHairColorToFrame[hairOption?.value] || dwarfHairColorToFrame.obsidian;
  if (typeof row !== 'number' || !mapping || typeof mapping.column !== 'number') {
    return null;
  }
  return {
    sheet: styleConfig?.sheet || 'hair',
    col: mapping.column,
    row,
    tint: mapping.tint || null,
    offsetY: styleConfig?.offsetY ?? dwarfPortraitConfig.hairOffsetY
  };
}

function getBeardFrame(dwarf, hairOption) {
  if (!dwarf || dwarf.gender === 'female') {
    return null;
  }
  const beardValue = dwarf.beard || 'clean';
  const hasBeardConfig = Object.prototype.hasOwnProperty.call(dwarfBeardRows, beardValue);
  const row = hasBeardConfig ? dwarfBeardRows[beardValue] : dwarfBeardRows.default;
  if (row === null || row === undefined) {
    return null;
  }
  const mapping = dwarfHairColorToFrame[hairOption?.value] || dwarfHairColorToFrame.obsidian;
  if (!mapping || typeof mapping.column !== 'number') {
    return null;
  }
  return {
    sheet: 'hair',
    col: mapping.column,
    row,
    tint: mapping.tint || null,
    offsetY: dwarfPortraitConfig.beardOffsetY
  };
}

function shouldUseCharacterCreatorPortrait(dwarf) {
  if (!dwarf) {
    return false;
  }
  const gender = dwarf.gender === 'female' ? 'female' : 'male';
  const bodyKey = gender === 'female' ? 'femaleBody' : 'maleBody';
  const bodyImage = characterCreatorPortraitAssets[bodyKey]?.image || null;
  const headImage = characterCreatorPortraitAssets.headDefault?.image || null;
  return Boolean(bodyImage && headImage);
}

function getCharacterCreatorHairAssetKey(dwarf) {
  if (!dwarf) {
    return null;
  }
  const resolvedStyle = resolveHairStyleValue(dwarf.hairStyle);
  const category = characterCreatorHairStyleCategoryMap[resolvedStyle];
  if (!category) {
    return null;
  }
  const assetKey = characterCreatorHairAssetMap[category];
  return assetKey || null;
}

function getCharacterCreatorBeardAssetKey(dwarf) {
  if (!dwarf || dwarf.gender !== 'male') {
    return null;
  }
  const beardValue = dwarf.beard || 'clean';
  const assetKey = characterCreatorBeardAssetMap[beardValue];
  return assetKey || null;
}

function getCharacterCreatorBeardImage(dwarf) {
  const assetKey = getCharacterCreatorBeardAssetKey(dwarf);
  if (!assetKey) {
    return null;
  }
  return characterCreatorPortraitAssets[assetKey]?.image || null;
}

function renderCharacterCreatorPortrait(ctx, canvas, dwarf, hairOption) {
  const gender = dwarf?.gender === 'female' ? 'female' : 'male';
  const bodyKey = gender === 'female' ? 'femaleBody' : 'maleBody';
  const bodyImage = characterCreatorPortraitAssets[bodyKey]?.image;
  const headImage = characterCreatorPortraitAssets.headDefault?.image;
  if (!bodyImage || !headImage) {
    return;
  }
  ctx.imageSmoothingEnabled = false;
  const scale = Math.min(canvas.width / bodyImage.width, canvas.height / bodyImage.height);
  const drawWidth = bodyImage.width * scale;
  const drawHeight = bodyImage.height * scale;
  const offsetX = Math.floor((canvas.width - drawWidth) / 2);
  const offsetY = Math.floor((canvas.height - drawHeight) / 2);
  const skinOption = getOptionByValue('skin', dwarf?.skin);
  const skinColor = skinOption?.color || characterCreatorDefaultSkinColor;
  const bodyLayers = getCharacterCreatorSkinTintLayers(bodyKey, skinColor);
  if (bodyLayers) {
    ctx.drawImage(bodyLayers.baseCanvas, offsetX, offsetY, drawWidth, drawHeight);
    ctx.drawImage(bodyLayers.tintedCanvas, offsetX, offsetY, drawWidth, drawHeight);
  } else {
    ctx.drawImage(bodyImage, offsetX, offsetY, drawWidth, drawHeight);
  }
  const headLayers = getCharacterCreatorSkinTintLayers('headDefault', skinColor);
  if (headLayers) {
    ctx.drawImage(headLayers.baseCanvas, offsetX, offsetY, drawWidth, drawHeight);
    ctx.drawImage(headLayers.tintedCanvas, offsetX, offsetY, drawWidth, drawHeight);
  } else {
    ctx.drawImage(headImage, offsetX, offsetY, drawWidth, drawHeight);
  }
  const hairAssetKey = getCharacterCreatorHairAssetKey(dwarf);
  const hairTintLayers = getCharacterCreatorHairTintLayers(
    hairAssetKey,
    hairOption?.color || characterCreatorDefaultHairColor
  );
  if (hairTintLayers) {
    ctx.drawImage(hairTintLayers.baseCanvas, offsetX, offsetY, drawWidth, drawHeight);
    ctx.drawImage(hairTintLayers.tintedCanvas, offsetX, offsetY, drawWidth, drawHeight);
  } else {
    const hairImage = hairAssetKey ? characterCreatorPortraitAssets[hairAssetKey]?.image : null;
    if (hairImage) {
      ctx.drawImage(hairImage, offsetX, offsetY, drawWidth, drawHeight);
    }
  }
  const beardAssetKey = getCharacterCreatorBeardAssetKey(dwarf);
  if (beardAssetKey) {
    const beardTintLayers = getCharacterCreatorHairTintLayers(
      beardAssetKey,
      hairOption?.color || characterCreatorDefaultHairColor
    );
    if (beardTintLayers) {
      ctx.drawImage(beardTintLayers.baseCanvas, offsetX, offsetY, drawWidth, drawHeight);
      ctx.drawImage(beardTintLayers.tintedCanvas, offsetX, offsetY, drawWidth, drawHeight);
    } else {
      const beardImage = characterCreatorPortraitAssets[beardAssetKey]?.image;
      if (beardImage) {
        ctx.drawImage(beardImage, offsetX, offsetY, drawWidth, drawHeight);
      }
    }
  }
  const noseImage = characterCreatorPortraitAssets.nose?.image;
  if (noseImage) {
    ctx.drawImage(noseImage, offsetX, offsetY, drawWidth, drawHeight);
  }
}

function renderTilesheetPortrait(ctx, canvas, dwarf, skinOption, hairOption, eyeOption, hairStyleOption, headOption) {
  const { tileSize, scale, head, eyePositions, eyeSize } = dwarfPortraitConfig;
  const destSize = tileSize * scale;
  const baseX = Math.floor((canvas.width - destSize) / 2);
  const baseY = Math.floor((canvas.height - destSize) / 2);

  const baseFrame = getBaseBodyFrame(dwarf);
  if (baseFrame) {
    drawTintedSprite(ctx, baseFrame.sheet, baseFrame, baseX, baseY, scale, baseFrame.tint);
  }

  if (head) {
    const headFrame = getHeadFrame(headOption?.value ?? dwarf?.head);
    if (headFrame) {
      const skinColor = skinOption?.color || '#c59b7d';
      drawTintedSprite(ctx, headFrame.sheet, headFrame, baseX, baseY, scale, skinColor);
    }
  }

  const hairStyleValue = resolveHairStyleValue(hairStyleOption?.value ?? dwarf?.hairStyle);
  const hairFrame = getHairFrame(dwarf, hairOption, hairStyleValue);
  if (hairFrame) {
    drawTintedSprite(ctx, hairFrame.sheet, hairFrame, baseX, baseY, scale, hairFrame.tint);
  }

  const beardFrame = getBeardFrame(dwarf, hairOption);
  if (beardFrame) {
    drawTintedSprite(ctx, beardFrame.sheet, beardFrame, baseX, baseY, scale, beardFrame.tint);
  }

  const eyeColor = eyeOption?.color || '#604a2b';
  ctx.fillStyle = eyeColor;
  eyePositions.forEach(({ x, y }) => {
    ctx.fillRect(baseX + Math.round(x * scale), baseY + Math.round(y * scale), eyeSize * scale, eyeSize * scale);
  });

  ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';
  eyePositions.forEach(({ x, y }) => {
    const highlightSize = Math.max(1, Math.floor(scale / 2));
    ctx.fillRect(
      baseX + Math.round((x + 0.5) * scale),
      baseY + Math.round((y + 0.5) * scale),
      highlightSize,
      highlightSize
    );
  });
}

function renderDwarfPortrait(dwarf, skinOption, hairOption, eyeOption, hairStyleOption, headOption) {
  const ctx = ensurePortraitContext();
  if (!ctx) {
    return;
  }
  const canvas = dwarfPortraitState.canvas;
  if (!canvas) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (shouldUseCharacterCreatorPortrait(dwarf)) {
    renderCharacterCreatorPortrait(ctx, canvas, dwarf, hairOption);
    return;
  }
  renderTilesheetPortrait(ctx, canvas, dwarf, skinOption, hairOption, eyeOption, hairStyleOption, headOption);
}

function renderBodyPanelPortrait(dwarf, skinOption, hairOption, eyeOption, hairStyleOption, headOption) {
  const ctx = ensureBodyPortraitContext();
  if (!ctx) {
    return;
  }
  const canvas = dwarfBodyPortraitState.canvas;
  if (!canvas) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderTilesheetPortrait(ctx, canvas, dwarf, skinOption, hairOption, eyeOption, hairStyleOption, headOption);
}

function updateDwarfPortrait(dwarf) {
  if (!elements.dwarfPortrait || !dwarf) {
    return;
  }
  const skinOption = getOptionByValue('skin', dwarf.skin);
  const hairOption = getOptionByValue('hair', dwarf.hair);
  const eyeOption = getOptionByValue('eyes', dwarf.eyes);
  const hairStyleOption = getOptionByValue('hairStyle', dwarf.hairStyle);
  const headOption = getOptionByValue('head', dwarf.head);

  renderDwarfPortrait(dwarf, skinOption, hairOption, eyeOption, hairStyleOption, headOption);
  renderBodyPanelPortrait(dwarf, skinOption, hairOption, eyeOption, hairStyleOption, headOption);

  const beardValue = dwarf.beard || 'clean';
  const genderLabel = getOptionLabel('gender', dwarf.gender);
  const skinLabel = getOptionLabel('skin', dwarf.skin).toLowerCase();
  const hairPhrase = getHairSummaryPhrase(dwarf);
  const eyeLabel = getOptionLabel('eyes', dwarf.eyes).toLowerCase();
  const beardLabel = getOptionLabel('beard', beardValue).toLowerCase();
  const headLabel = getOptionLabel('head', dwarf.head).toLowerCase();
  const clanLabel = getOptionLabel('clan', dwarf.clan);
  const guildLabel = getOptionLabel('guild', dwarf.guild);
  const professionLabel = getOptionLabel('profession', dwarf.profession);
  const affiliationParts = [];
  if (clanLabel) {
    affiliationParts.push(`member of the ${clanLabel} clan`);
  }
  if (professionLabel && guildLabel) {
    affiliationParts.push(`${professionLabel.toLowerCase()} of the ${guildLabel}`);
  } else if (professionLabel) {
    affiliationParts.push(professionLabel.toLowerCase());
  } else if (guildLabel) {
    affiliationParts.push(`of the ${guildLabel}`);
  }
  let ariaDescription = `${genderLabel} dwarf with ${headLabel} features, ${skinLabel} skin, ${hairPhrase}, ${eyeLabel} eyes, and ${beardLabel}.`;
  if (affiliationParts.length > 0) {
    ariaDescription += ` ${affiliationParts.join(', ')}.`;
  }
  const displayName = getDwarfDisplayName(dwarf);
  elements.dwarfPortrait.setAttribute('aria-label', `${displayName}: ${ariaDescription}`);
}

function buildDwarfSummary(dwarf) {
  if (!dwarf) {
    return '';
  }
  const genderLabel = getOptionLabel('gender', dwarf.gender);
  const skinLabel = getOptionLabel('skin', dwarf.skin).toLowerCase();
  const eyeLabel = getOptionLabel('eyes', dwarf.eyes).toLowerCase();
  const hairPhrase = getHairSummaryPhrase(dwarf);
  const beardLabel = getOptionLabel('beard', dwarf.beard).toLowerCase();
  const headLabel = getOptionLabel('head', dwarf.head).toLowerCase();
  const clanLabel = getOptionLabel('clan', dwarf.clan);
  const guildLabel = getOptionLabel('guild', dwarf.guild);
  const professionLabel = getOptionLabel('profession', dwarf.profession);
  let summary = `${genderLabel} dwarf with ${headLabel} features, ${skinLabel} skin, ${hairPhrase}, ${eyeLabel} eyes, and ${beardLabel}.`;
  const affiliationSentences = [];
  if (clanLabel) {
    affiliationSentences.push(`Member of the ${clanLabel} clan`);
  }
  if (professionLabel && guildLabel) {
    affiliationSentences.push(`${professionLabel} of the ${guildLabel}`);
  } else if (professionLabel) {
    affiliationSentences.push(professionLabel);
  } else if (guildLabel) {
    affiliationSentences.push(`Of the ${guildLabel}`);
  }
  if (affiliationSentences.length > 0) {
    summary += ` ${affiliationSentences.join('. ')}.`;
  }
  return summary;
}

function getDwarfDisplayName(dwarf) {
  if (!dwarf) {
    return 'Unnamed Founder';
  }
  const trimmed = (dwarf.name || '').trim();
  return trimmed || 'Unnamed Founder';
}

function updateDwarfTraitSummary() {
  const dwarf = getActiveDwarf();
  if (elements.dwarfTraitSummary) {
    elements.dwarfTraitSummary.textContent = buildDwarfSummary(dwarf);
  }
  updateDwarfTraitAttributes(dwarf);
}

function getActiveTraitAttributes(dwarf) {
  if (!dwarf) {
    return [];
  }
  return dwarfTraitAttributeDefinitions.filter((attribute) => {
    try {
      return typeof attribute.isActive === 'function' ? attribute.isActive(dwarf) : false;
    } catch (error) {
      return false;
    }
  });
}

function createTraitAttributeElement(attribute) {
  const item = document.createElement('div');
  item.className = 'trait-attribute';
  item.setAttribute('role', 'listitem');
  item.setAttribute('tabindex', '0');
  item.setAttribute('aria-label', attribute.label);

  const icon = document.createElement('img');
  icon.className = 'trait-attribute__icon';
  icon.src = attribute.icon;
  icon.alt = attribute.label;
  icon.loading = 'lazy';

  const tooltip = document.createElement('span');
  tooltip.className = 'trait-attribute__tooltip';
  tooltip.textContent = attribute.description;

  item.appendChild(icon);
  item.appendChild(tooltip);

  return item;
}

function updateDwarfTraitAttributes(dwarf = getActiveDwarf()) {
  const container = elements.dwarfTraitAttributes;
  if (!container) {
    return;
  }
  container.innerHTML = '';
  const activeAttributes = getActiveTraitAttributes(dwarf);
  if (activeAttributes.length === 0) {
    container.setAttribute('aria-hidden', 'true');
    container.dataset.hasAttributes = 'false';
    return;
  }
  container.setAttribute('aria-hidden', 'false');
  container.dataset.hasAttributes = 'true';
  const fragment = document.createDocumentFragment();
  activeAttributes.forEach((attribute) => {
    fragment.appendChild(createTraitAttributeElement(attribute));
  });
  container.appendChild(fragment);
}

function updateRosterList() {
  if (!elements.dwarfRosterList || !state.dwarfParty || !Array.isArray(state.dwarfParty.dwarves)) {
    return;
  }
  const { dwarves, activeIndex } = state.dwarfParty;
  const fragment = document.createDocumentFragment();

  dwarves.forEach((dwarf, index) => {
    const item = document.createElement('li');
    item.classList.toggle('active', index === activeIndex);
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-pressed', index === activeIndex ? 'true' : 'false');
    item.dataset.index = index.toString();

    const name = document.createElement('p');
    name.className = 'dwarf-roster-name';
    name.textContent = getDwarfDisplayName(dwarf);

    const traits = document.createElement('p');
    traits.className = 'dwarf-roster-traits';
    const genderLabel = getOptionLabel('gender', dwarf.gender);
    const headLabel = getOptionLabel('head', dwarf.head);
    const hairStyleLabel = getOptionLabel('hairStyle', dwarf.hairStyle);
    const hairLabel = getOptionLabel('hair', dwarf.hair);
    const beardLabel = getOptionLabel('beard', dwarf.beard);
    traits.textContent = `${genderLabel} • ${headLabel} • ${hairStyleLabel} • ${hairLabel} • ${beardLabel}`;

    const affiliations = document.createElement('p');
    affiliations.className = 'dwarf-roster-traits dwarf-roster-affiliations';
    const affiliationParts = [];
    const clanLabel = getOptionLabel('clan', dwarf.clan);
    const guildLabel = getOptionLabel('guild', dwarf.guild);
    const professionLabel = getOptionLabel('profession', dwarf.profession);
    if (clanLabel) {
      affiliationParts.push(`${clanLabel} Clan`);
    }
    if (guildLabel) {
      affiliationParts.push(guildLabel);
    }
    if (professionLabel) {
      affiliationParts.push(professionLabel);
    }
    affiliations.textContent = affiliationParts.join(' • ');

    item.appendChild(name);
    item.appendChild(traits);
    if (affiliationParts.length > 0) {
      item.appendChild(affiliations);
    }

    item.addEventListener('click', () => {
      setActiveDwarf(index);
    });

    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setActiveDwarf(index);
      }
    });

    fragment.appendChild(item);
  });

  elements.dwarfRosterList.replaceChildren(fragment);
}

function ensureSelectValue(selectElement, value, fallback) {
  if (!selectElement) {
    return;
  }
  selectElement.value = value;
  if (selectElement.value !== value) {
    selectElement.value = fallback;
  }
}

function getTraitOptions(trait) {
  const options = dwarfOptions[trait];
  return Array.isArray(options) ? options : [];
}

function updateTraitSliderDisplay(trait, sliderElement, valueElement, indexOverride) {
  if (!sliderElement) {
    return;
  }
  const options = getTraitOptions(trait);
  const maxIndex = Math.max(0, options.length - 1);
  const rawIndex =
    typeof indexOverride === 'number' && Number.isFinite(indexOverride)
      ? indexOverride
      : Math.round(Number(sliderElement.value) || 0);
  const index = clamp(rawIndex, 0, maxIndex);
  const option = options[index];

  sliderElement.setAttribute('aria-valuemin', '0');
  sliderElement.setAttribute('aria-valuemax', String(maxIndex));
  sliderElement.setAttribute('aria-valuenow', String(index));
  sliderElement.setAttribute('aria-valuetext', option ? option.label : '');

  if (valueElement) {
    if (option) {
      valueElement.textContent = option.label;
      if (option.color) {
        valueElement.style.setProperty('--trait-color', option.color);
        valueElement.classList.add('has-color');
      } else {
        valueElement.style.removeProperty('--trait-color');
        valueElement.classList.remove('has-color');
      }
      valueElement.dataset.traitValue = option.value;
    } else {
      valueElement.textContent = '—';
      valueElement.style.removeProperty('--trait-color');
      valueElement.classList.remove('has-color');
      delete valueElement.dataset.traitValue;
    }
  }
}

function ensureTraitSliderValue(trait, sliderElement, valueElement, value, fallback) {
  if (!sliderElement) {
    return;
  }
  const options = getTraitOptions(trait);
  const fallbackValue = fallback ?? options[0]?.value ?? null;
  let targetIndex = options.findIndex((option) => option.value === value);
  if (targetIndex === -1 && fallbackValue) {
    targetIndex = options.findIndex((option) => option.value === fallbackValue);
  }
  if (targetIndex === -1) {
    targetIndex = 0;
  }
  targetIndex = clamp(targetIndex, 0, Math.max(0, options.length - 1));
  sliderElement.max = String(Math.max(0, options.length - 1));
  sliderElement.value = String(targetIndex);
  updateTraitSliderDisplay(trait, sliderElement, valueElement, targetIndex);
}

function setupTraitSliderControl(trait, sliderElement, valueElement) {
  if (!sliderElement) {
    return;
  }
  const options = getTraitOptions(trait);
  const maxIndex = Math.max(0, options.length - 1);
  sliderElement.min = '0';
  sliderElement.max = String(maxIndex);
  sliderElement.step = '1';
  sliderElement.value = clamp(Number(sliderElement.value) || 0, 0, maxIndex).toString();
  sliderElement.dataset.trait = trait;
  sliderElement.disabled = options.length === 0;

  const updateDisplay = (index) => {
    updateTraitSliderDisplay(trait, sliderElement, valueElement, index);
  };

  sliderElement.addEventListener('input', () => {
    const currentIndex = clamp(Math.round(Number(sliderElement.value)), 0, maxIndex);
    sliderElement.value = String(currentIndex);
    updateDisplay(currentIndex);
    const option = options[currentIndex];
    if (option) {
      updateDwarfTrait(trait, option.value);
    }
  });

  sliderElement.addEventListener('change', () => {
    const currentIndex = clamp(Math.round(Number(sliderElement.value)), 0, maxIndex);
    sliderElement.value = String(currentIndex);
    updateDisplay(currentIndex);
  });

  updateDisplay();
}
function updateGenderButtonsUI(selectedValue) {
  const container = elements.dwarfGenderButtons;
  if (!container) {
    return;
  }
  const buttons = Array.from(container.querySelectorAll('[data-gender-value]'));
  if (buttons.length === 0) {
    return;
  }
  const fallback = dwarfOptions.gender[0]?.value;
  const targetValue = buttons.some((button) => button.dataset.genderValue === selectedValue)
    ? selectedValue
    : fallback;

  buttons.forEach((button) => {
    const isActive = button.dataset.genderValue === targetValue;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-checked', isActive ? 'true' : 'false');
    button.tabIndex = isActive ? 0 : -1;
  });
}

function updateBeardFieldState(dwarf) {
  const fieldGroup = elements.dwarfBeardFieldGroup;
  const beardSlider = elements.dwarfBeardSlider;
  if (!fieldGroup || !beardSlider) {
    return;
  }
  const isFemale = dwarf?.gender === 'female';
  fieldGroup.classList.toggle('hidden', isFemale);
  fieldGroup.setAttribute('aria-hidden', isFemale ? 'true' : 'false');
  beardSlider.disabled = isFemale;
  if (isFemale) {
    beardSlider.setAttribute('tabindex', '-1');
  } else {
    beardSlider.removeAttribute('tabindex');
  }
}

function updateCustomizerUI() {
  ensureDwarfParty();
  const dwarf = getActiveDwarf();
  if (!dwarf) {
    return;
  }
  dwarf.head = resolveHeadTypeValue(dwarf.head);
  const total = state.dwarfParty.dwarves.length;
  if (elements.dwarfSlotLabel) {
    elements.dwarfSlotLabel.textContent =
      total > 1 ? `Dwarf ${state.dwarfParty.activeIndex + 1} of ${total}` : '';
  }
  if (elements.dwarfNameInput) {
    elements.dwarfNameInput.value = dwarf.name;
  }

  updateGenderButtonsUI(dwarf.gender);
  ensureSelectValue(
    elements.dwarfClanSelect,
    dwarf.clan,
    dwarfOptions.clan[0].value
  );
  ensureSelectValue(
    elements.dwarfGuildSelect,
    dwarf.guild,
    dwarfOptions.guild[0].value
  );
  ensureSelectValue(
    elements.dwarfProfessionSelect,
    dwarf.profession,
    dwarfOptions.profession[0].value
  );
  ensureTraitSliderValue(
    'skin',
    elements.dwarfSkinSlider,
    elements.dwarfSkinSliderValue,
    dwarf.skin,
    dwarfOptions.skin[0].value
  );
  ensureTraitSliderValue(
    'eyes',
    elements.dwarfEyeSlider,
    elements.dwarfEyeSliderValue,
    dwarf.eyes,
    dwarfOptions.eyes[0].value
  );
  ensureTraitSliderValue(
    'hairStyle',
    elements.dwarfHairStyleSlider,
    elements.dwarfHairStyleSliderValue,
    resolveHairStyleValue(dwarf.hairStyle),
    defaultHairStyleValue
  );
  ensureTraitSliderValue(
    'hair',
    elements.dwarfHairSlider,
    elements.dwarfHairSliderValue,
    dwarf.hair,
    dwarfOptions.hair[0].value
  );
  if (dwarf.gender === 'female' && dwarf.beard !== 'clean') {
    dwarf.beard = 'clean';
  }
  ensureTraitSliderValue(
    'beard',
    elements.dwarfBeardSlider,
    elements.dwarfBeardSliderValue,
    dwarf.beard,
    dwarfOptions.beard[0].value
  );

  updateBeardFieldState(dwarf);

  updateDwarfPortrait(dwarf);
  updateDwarfTraitSummary();
  updateRosterList();
}

function setActiveDwarf(index) {
  ensureDwarfParty();
  const total = state.dwarfParty.dwarves.length;
  const clampedIndex = clamp(index, 0, Math.max(0, total - 1));
  state.dwarfParty.activeIndex = clampedIndex;
  updateCustomizerUI();
}

function changeActiveDwarf(step) {
  ensureDwarfParty();
  const total = state.dwarfParty.dwarves.length;
  if (total === 0) {
    return;
  }
  const nextIndex = (state.dwarfParty.activeIndex + step + total) % total;
  setActiveDwarf(nextIndex);
}

function updateDwarfTrait(trait, value) {
  const dwarf = getActiveDwarf();
  if (!dwarf) {
    return;
  }
  if (trait === 'name') {
    dwarf.name = value;
    updateDwarfPortrait(dwarf);
    updateRosterList();
    return;
  }
  if (trait === 'clan') {
    const previousClanValue = dwarf.clan;
    dwarf.clan = value;
    const previousClanLabel = previousClanValue ? getOptionLabel('clan', previousClanValue) : null;
    const nextClanLabel = value ? getOptionLabel('clan', value) : null;
    const trimmedName = (dwarf.name || '').trim();
    if (nextClanLabel && trimmedName) {
      const matchesPreviousClan =
        previousClanLabel && trimmedName.endsWith(` ${previousClanLabel}`);
      const baseName = matchesPreviousClan
        ? trimmedName.slice(0, trimmedName.length - previousClanLabel.length).trim()
        : trimmedName;
      if (matchesPreviousClan || !previousClanLabel) {
        const rebuiltName = `${baseName} ${nextClanLabel}`.trim();
        dwarf.name = rebuiltName;
      }
    } else if (nextClanLabel) {
      dwarf.name = generateDwarfName(dwarf.gender, value);
    }
  } else if (editableDwarfTraits.has(trait)) {
    if (trait === 'gender') {
      const previousGender = dwarf.gender;
      const trimmedName = (dwarf.name || '').trim();
      dwarf.gender = value;
      if (value === 'female') {
        dwarf.beard = 'clean';
      }
      if (value !== previousGender && trimmedName) {
        const firstName = extractFirstName(trimmedName);
        const clanLabel = dwarf.clan ? getOptionLabel('clan', dwarf.clan) : null;
        const matchesClan = clanLabel
          ? trimmedName === `${firstName} ${clanLabel}`
          : trimmedName === firstName;
        if (firstName && matchesClan && isPresetDwarfFirstName(firstName)) {
          const newFirstName = generateDwarfFirstName(value);
          dwarf.name = clanLabel ? `${newFirstName} ${clanLabel}` : newFirstName;
        }
      }
    } else if (trait === 'head') {
      dwarf.head = resolveHeadTypeValue(value);
    } else if (trait === 'hairStyle') {
      dwarf[trait] = resolveHairStyleValue(value);
    } else if (trait === 'beard' && dwarf.gender === 'female') {
      dwarf.beard = 'clean';
    } else {
      dwarf[trait] = value;
    }
  }
  updateCustomizerUI();
}

function randomiseActiveDwarf() {
  ensureDwarfParty();
  const { activeIndex, dwarves } = state.dwarfParty;
  if (!dwarves || !dwarves[activeIndex]) {
    return;
  }
  dwarves[activeIndex] = createRandomDwarf();
  setActiveDwarf(activeIndex);
}

function isDwarfCustomizerVisible() {
  return Boolean(elements.dwarfCustomizer && !elements.dwarfCustomizer.classList.contains('hidden'));
}

function openDwarfCustomizer(options = {}) {
  const { resetParty = false } = options;
  ensureDwarfParty({ forceReset: resetParty });
  if (elements.worldInfoModal) {
    elements.worldInfoModal.classList.add('hidden');
  }
  if (elements.dwarfCustomizer) {
    elements.dwarfCustomizer.classList.remove('hidden');
  }
  updateCustomizerUI();
  const activeGenderButton = elements.dwarfGenderButtons
    ? elements.dwarfGenderButtons.querySelector('.gender-toggle-button.active') ||
      elements.dwarfGenderButtons.querySelector('.gender-toggle-button')
    : null;
  const focusTarget = elements.dwarfNameInput || activeGenderButton;
  if (focusTarget) {
    focusTarget.focus();
    if (typeof focusTarget.select === 'function') {
      focusTarget.select();
    }
  }
}

function closeDwarfCustomizer(options = {}) {
  const { keepWorldInfoHidden = false, returnFocus = false } = options;
  if (elements.dwarfCustomizer) {
    elements.dwarfCustomizer.classList.add('hidden');
  }
  if (!keepWorldInfoHidden && elements.worldInfoModal) {
    elements.worldInfoModal.classList.remove('hidden');
    if (returnFocus && elements.worldNameInput) {
      elements.worldNameInput.focus();
      elements.worldNameInput.select();
    }
  }
}

const chronologyBias = {
  age: {
    min: 2,
    max: 20,
    exponent: 1.6
  },
  year: {
    min: 0,
    max: 50000,
    exponent: 2.8,
    biasWeight: 0.65
  }
};

function biasedRandomInt(min, max, exponent = 1) {
  const lower = Math.ceil(min);
  const upper = Math.floor(max);
  if (upper <= lower) {
    return lower;
  }
  if (!Number.isFinite(exponent) || exponent <= 0) {
    return randomInt(lower, upper);
  }
  const range = upper - lower + 1;
  const skewed = Math.pow(Math.random(), exponent);
  const offset = Math.floor(skewed * range);
  return clamp(lower + offset, lower, upper);
}

function randomAge() {
  const { min, max, exponent } = chronologyBias.age;
  return biasedRandomInt(min, max, exponent);
}

function randomYear() {
  const { min, max, exponent, biasWeight = 1 } = chronologyBias.year;
  const lower = Math.ceil(min);
  const upper = Math.floor(max);
  if (upper <= lower) {
    return lower;
  }
  if (!Number.isFinite(exponent) || exponent <= 0) {
    return randomInt(lower, upper);
  }
  const clampedWeight = clamp(biasWeight, 0, 1);
  const effectiveExponent = 1 + clampedWeight * (exponent - 1);
  const quadrupleDigitThreshold = 1000;
  const maxRetries = 4;
  const highYearPenalty = 0.85;

  let year = biasedRandomInt(lower, upper, effectiveExponent);

  if (year >= quadrupleDigitThreshold) {
    let retries = 0;
    const amplifiedExponent = effectiveExponent * 1.5;
    while (
      year >= quadrupleDigitThreshold &&
      retries < maxRetries &&
      Math.random() < highYearPenalty
    ) {
      year = biasedRandomInt(lower, upper, amplifiedExponent);
      retries += 1;
    }
  }

  return year;
}

function generateRandomChronology() {
  return { year: randomYear(), age: randomAge() };
}

function isChronologyValid(chronology) {
  if (!chronology) {
    return false;
  }
  const { year, age } = chronology;
  return (
    Number.isFinite(year) &&
    Number.isFinite(age) &&
    year >= chronologyBias.year.min &&
    year <= chronologyBias.year.max &&
    age >= chronologyBias.age.min &&
    age <= chronologyBias.age.max
  );
}

function sanitizeChronologyValues(yearValue, ageValue) {
  const { min: yearMin, max: yearMax } = chronologyBias.year;
  const safeYear = clamp(Math.round(yearValue), yearMin, yearMax);
  const { min: ageMin, max: ageMax } = chronologyBias.age;
  const safeAge = clamp(Math.round(ageValue), ageMin, ageMax);
  return { year: safeYear, age: safeAge };
}

function ensureChronology() {
  if (!isChronologyValid(state.worldChronology)) {
    state.worldChronology = generateRandomChronology();
  }
  return state.worldChronology;
}

function formatOrdinal(value) {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) {
    return 'th';
  }
  switch (value % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

function formatChronology(year, age) {
  const ordinal = formatOrdinal(age);
  const formattedYear = Number.isFinite(year)
    ? year.toLocaleString('en-US')
    : String(year);
  return `Year ${formattedYear} of the ${age}${ordinal} Age`;
}

function getSanitisedChronologyFromInputs() {
  if (!elements.worldYearInput || !elements.worldAgeInput) {
    return null;
  }
  const parsedYear = Number.parseInt(elements.worldYearInput.value, 10);
  const parsedAge = Number.parseInt(elements.worldAgeInput.value, 10);
  if (
    Number.isNaN(parsedYear) ||
    Number.isNaN(parsedAge) ||
    parsedYear < chronologyBias.year.min ||
    parsedAge < 1
  ) {
    return null;
  }
  return sanitizeChronologyValues(parsedYear, parsedAge);
}

function updateChronologyDisplay() {
  if (!elements.worldInfoChronology) {
    return;
  }
  const inputChronology = getSanitisedChronologyFromInputs();
  if (inputChronology) {
    elements.worldInfoChronology.textContent = formatChronology(
      inputChronology.year,
      inputChronology.age
    );
    return;
  }
  if (isChronologyValid(state.worldChronology)) {
    elements.worldInfoChronology.textContent = formatChronology(
      state.worldChronology.year,
      state.worldChronology.age
    );
    return;
  }
  elements.worldInfoChronology.textContent = '—';
}

function updateWorldInfoSizeDisplay() {
  if (!elements.worldInfoSize) {
    return;
  }
  const preset = getMapSizePreset(state.settings.mapSize);
  elements.worldInfoSize.textContent = getMapSizeLabel(
    preset,
    state.settings.width,
    state.settings.height
  );
}

function getWorldGenerationProfile(key) {
  if (key && worldGenerationProfiles[key]) {
    return worldGenerationProfiles[key];
  }
  return worldGenerationProfiles[defaultWorldGenerationType];
}

function getWorldGenerationProfileLabel(key) {
  const profile = getWorldGenerationProfile(key);
  if (profile && profile.label) {
    return profile.label;
  }
  const fallbackProfile = worldGenerationProfiles[defaultWorldGenerationType];
  return fallbackProfile && fallbackProfile.label ? fallbackProfile.label : 'Normal';
}

function ensureLandMaskForProfile(profileKey) {
  const profile = getWorldGenerationProfile(profileKey);
  if (!profile) {
    return state.landMask;
  }
  const cacheKey = profile.key;
  if (landMaskCache.has(cacheKey)) {
    const cachedMask = landMaskCache.get(cacheKey);
    if (cachedMask) {
      state.landMask = cachedMask;
    }
    return cachedMask || state.landMask;
  }
  if (typeof profile.createMask === 'function') {
    const generatedMask = profile.createMask();
    if (generatedMask) {
      landMaskCache.set(cacheKey, generatedMask);
      state.landMask = generatedMask;
      return generatedMask;
    }
  }
  if (cacheKey === defaultWorldGenerationType && state.landMask) {
    landMaskCache.set(cacheKey, state.landMask);
    return state.landMask;
  }
  if (cacheKey !== defaultWorldGenerationType) {
    return ensureLandMaskForProfile(defaultWorldGenerationType);
  }
  return state.landMask;
}

function setWorldGenerationType(type) {
  const profile = getWorldGenerationProfile(type);
  state.settings.worldGenerationType = profile.key;
  ensureLandMaskForProfile(profile.key);
  if (elements.worldGenerationTypeSelect) {
    elements.worldGenerationTypeSelect.value = profile.key;
  }
  if (elements.worldInfoGenerationTypeSelect) {
    elements.worldInfoGenerationTypeSelect.value = profile.key;
  }
  updateWorldInfoGenerationTypeDisplay();
}

function updateWorldInfoGenerationTypeDisplay() {
  if (!elements.worldInfoGenerationType) {
    return;
  }
  const label = getWorldGenerationProfileLabel(state.settings.worldGenerationType);
  elements.worldInfoGenerationType.textContent = label;
}

function updateWorldInfoSeedDisplay(seedValue) {
  if (!elements.worldInfoSeed) {
    return;
  }
  const trimmed = typeof seedValue === 'string' ? seedValue.trim() : '';
  elements.worldInfoSeed.textContent = trimmed || 'Random';
}

function getRandomWorldName(excludeName) {
  if (worldNames.length === 0) {
    return 'Unnamed World';
  }
  if (!excludeName || worldNames.length === 1) {
    return worldNames[Math.floor(Math.random() * worldNames.length)];
  }
  let name = worldNames[Math.floor(Math.random() * worldNames.length)];
  while (name === excludeName) {
    name = worldNames[Math.floor(Math.random() * worldNames.length)];
  }
  return name;
}

function ensureSeedString() {
  const trimmed = (state.settings.seedString || '').trim();
  if (trimmed) {
    state.settings.seedString = trimmed;
    return trimmed;
  }
  const generated = randomSeedString();
  state.settings.seedString = generated;
  return generated;
}

function openWorldInfoModal() {
  state.dwarfParty = {
    dwarves: [],
    activeIndex: 0
  };
  if (
    !elements.worldInfoModal ||
    !elements.worldInfoSize ||
    !elements.worldInfoSeed ||
    !elements.worldNameInput
  ) {
    if (!state.worldName) {
      state.worldName = getRandomWorldName();
    }
    ensureChronology();
    beginGame();
    ensureMusicStarted();
    return;
  }
  const sizePreset = getMapSizePreset(state.settings.mapSize);
  applyMapSizePresetToState(sizePreset);
  if (elements.worldMapSizeSelect) {
    elements.worldMapSizeSelect.value = state.settings.mapSize;
  }
  if (elements.mapSizeSelect) {
    elements.mapSizeSelect.value = state.settings.mapSize;
  }
  updateWorldInfoSizeDisplay();
  if (elements.worldInfoGenerationTypeSelect) {
    elements.worldInfoGenerationTypeSelect.value = state.settings.worldGenerationType;
  }
  updateWorldInfoGenerationTypeDisplay();

  const seed = ensureSeedString();
  state.settings.lastSeedString = seed;
  if (elements.worldSeedInput) {
    elements.worldSeedInput.value = seed;
  }
  if (elements.seedInput) {
    elements.seedInput.value = seed;
  }
  updateWorldInfoSeedDisplay(seed);

  const chronology = ensureChronology();
  if (elements.worldYearInput) {
    elements.worldYearInput.value = chronology.year.toString();
  }
  if (elements.worldAgeInput) {
    elements.worldAgeInput.value = chronology.age.toString();
  }
  updateChronologyDisplay();

  const currentName = (state.worldName || '').trim();
  const nameToUse = currentName || getRandomWorldName();
  state.worldName = nameToUse;
  elements.worldNameInput.value = nameToUse;

  if (elements.titleScreen) {
    elements.titleScreen.classList.add('hidden');
  }
  elements.worldInfoModal.classList.remove('hidden');
  ensureMusicStarted();
  const focusInput = () => {
    if (!elements.worldNameInput) {
      return;
    }
    elements.worldNameInput.focus();
    elements.worldNameInput.select();
  };
  if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
    window.requestAnimationFrame(focusInput);
  } else {
    focusInput();
  }
}

function closeWorldInfoModal(options = {}) {
  const { returnFocus = false, keepTitleHidden = false } = options;
  if (elements.worldInfoModal) {
    elements.worldInfoModal.classList.add('hidden');
  }
  if (
    !keepTitleHidden &&
    elements.titleScreen &&
    elements.gameContainer &&
    elements.gameContainer.classList.contains('hidden')
  ) {
    elements.titleScreen.classList.remove('hidden');
  }
  if (returnFocus && elements.startButton) {
    elements.startButton.focus();
  }
}

function estimateSeaLevels(elevationField, targetWaterRatio = 0.45) {
  const sorted = Array.from(elevationField).sort((a, b) => a - b);
  const total = sorted.length;
  if (total === 0) {
    return { seaLevel: 0.42, deepSeaLevel: 0.24 };
  }
  const clampedRatio = clamp(targetWaterRatio, 0.2, 0.8);
  const waterIndex = Math.min(total - 1, Math.max(0, Math.floor(total * clampedRatio)));
  const seaLevel = clamp(sorted[waterIndex], 0.25, 0.65);
  const deepSeaLevel = clamp(seaLevel - 0.18, 0.05, seaLevel - 0.05);
  return { seaLevel, deepSeaLevel };
}

const viewState = {
  scale: 1,
  translateX: 0,
  translateY: 0,
  minScale: 0.25,
  maxScale: 6,
  containScale: 1,
  coverScale: 1,
  wrapperSize: { width: 0, height: 0 },
  worldSize: { width: 0, height: 0 },
  hasInteracted: false
};

const localViewConfig = {
  radius: 4,
  baseScale: 3,
  minScale: 2,
  maxCanvasSize: 768
};

const localMapDefaultMessage = 'Click the world map to open a local preview.';

const structureDetailsState = {
  visible: false
};

const structureContextMenuState = {
  visible: false,
  tile: null,
  tileX: null,
  tileY: null
};

function computeViewScales(wrapperWidth, wrapperHeight, worldWidth, worldHeight) {
  if (!worldWidth || !worldHeight || !wrapperWidth || !wrapperHeight) {
    return { contain: 1, cover: 1 };
  }

  const scaleX = wrapperWidth / worldWidth;
  const scaleY = wrapperHeight / worldHeight;
  const safeScaleX = Number.isFinite(scaleX) && scaleX > 0 ? scaleX : 1;
  const safeScaleY = Number.isFinite(scaleY) && scaleY > 0 ? scaleY : 1;
  const contain = Math.min(safeScaleX, safeScaleY);
  const cover = Math.max(safeScaleX, safeScaleY);
  return { contain, cover };
}

function applyViewTransform() {
  if (!elements.canvas) {
    return;
  }
  elements.canvas.style.transform = `translate(${viewState.translateX}px, ${viewState.translateY}px) scale(${viewState.scale})`;
}

function hideMapTooltip() {
  if (!elements.mapTooltip) {
    return;
  }
  elements.mapTooltip.classList.remove('visible');
  elements.mapTooltip.setAttribute('aria-hidden', 'true');
}

function hideStructureContextMenu() {
  structureContextMenuState.visible = false;
  structureContextMenuState.tile = null;
  structureContextMenuState.tileX = null;
  structureContextMenuState.tileY = null;

  if (!elements.structureContextMenu) {
    return;
  }

  elements.structureContextMenu.classList.remove('visible');
  elements.structureContextMenu.setAttribute('aria-hidden', 'true');
  elements.structureContextMenu.style.left = '';
  elements.structureContextMenu.style.top = '';
}

function showStructureContextMenu(resolved) {
  if (!resolved || !elements.structureContextMenu) {
    hideStructureContextMenu();
    return;
  }

  const { pointerX, pointerY, rect, tile, tileX, tileY } = resolved;
  if (!Number.isFinite(pointerX) || !Number.isFinite(pointerY)) {
    hideStructureContextMenu();
    return;
  }

  structureContextMenuState.tile = tile || null;
  structureContextMenuState.tileX = Number.isFinite(tileX) ? tileX : null;
  structureContextMenuState.tileY = Number.isFinite(tileY) ? tileY : null;

  const menu = elements.structureContextMenu;
  const margin = 16;
  const boundsRect = rect || (elements.canvasWrapper ? elements.canvasWrapper.getBoundingClientRect() : null);
  const menuWidth = menu.offsetWidth || 0;
  const menuHeight = menu.offsetHeight || 0;
  const fallbackWidth =
    typeof window !== 'undefined' && Number.isFinite(window.innerWidth)
      ? window.innerWidth
      : menuWidth + margin * 2;
  const fallbackHeight =
    typeof window !== 'undefined' && Number.isFinite(window.innerHeight)
      ? window.innerHeight
      : menuHeight + margin * 2;
  const containerWidth = boundsRect && Number.isFinite(boundsRect.width) ? boundsRect.width : fallbackWidth;
  const containerHeight =
    boundsRect && Number.isFinite(boundsRect.height) ? boundsRect.height : fallbackHeight;

  let left = pointerX + margin;
  if (left + menuWidth > containerWidth - margin) {
    left = pointerX - menuWidth - margin;
  }
  if (left < margin) {
    left = Math.max(margin, containerWidth - menuWidth - margin);
  }

  let top = pointerY + margin;
  if (top + menuHeight > containerHeight - margin) {
    top = pointerY - menuHeight - margin;
  }
  if (top < margin) {
    top = Math.max(margin, containerHeight - menuHeight - margin);
  }

  menu.style.left = `${Math.round(left)}px`;
  menu.style.top = `${Math.round(top)}px`;
  menu.classList.add('visible');
  menu.setAttribute('aria-hidden', 'false');
  structureContextMenuState.visible = true;

  const focusTarget = elements.structureContextMenuBegin;
  if (focusTarget && typeof focusTarget.focus === 'function') {
    const focusAction = () => {
      if (structureContextMenuState.visible) {
        focusTarget.focus();
      }
    };
    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(focusAction);
    } else {
      focusAction();
    }
  }
}

function formatPercentageDisplay(value) {
  if (!Number.isFinite(value)) {
    return '0';
  }
  const rounded = Math.round(value * 100) / 100;
  return rounded.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

function formatGradientPercentage(value) {
  if (!Number.isFinite(value)) {
    return '0';
  }
  const rounded = Math.round(value * 100) / 100;
  return Number(rounded.toFixed(2)).toString();
}

function buildPopulationBreakdownSection(resolvedName, breakdown) {
  if (!Array.isArray(breakdown) || breakdown.length === 0) {
    return '';
  }

  const resolvedEntries = breakdown
    .filter((entry) => Number.isFinite(entry?.percentage) && entry.percentage > 0)
    .map((entry) => {
      const rawPercentage = Number(entry.percentage);
      const safePercentage = Number.isFinite(rawPercentage) ? Math.max(0, rawPercentage) : 0;
      const roundedPercentage = Math.round(safePercentage * 100) / 100;
      return {
        key: typeof entry.key === 'string' && entry.key ? entry.key : null,
        label: entry.label || entry.key || 'Unknown',
        percentage: roundedPercentage,
        color: entry.color || '#999999',
        population:
          Number.isFinite(entry.population) && entry.population > 0
            ? Math.max(0, Math.round(entry.population))
            : null
      };
    });

  const priorityEntries = [];
  const majorEntries = [];
  let otherPercentage = 0;
  let otherPopulation = 0;
  let otherPopulationKnown = true;

  resolvedEntries.forEach((entry) => {
    if (entry.key === 'wizards') {
      priorityEntries.push(entry);
      return;
    }

    if (entry.percentage < 0.5) {
      otherPercentage += entry.percentage;
      if (entry.population === null) {
        otherPopulationKnown = false;
      } else if (otherPopulationKnown) {
        otherPopulation += entry.population;
      }
    } else {
      majorEntries.push(entry);
    }
  });

  const combinedEntries = [...priorityEntries, ...majorEntries];

  if (otherPercentage > 0) {
    const roundedOtherPercentage = Math.round(otherPercentage * 100) / 100;
    combinedEntries.push({
      label: 'Other',
      percentage: roundedOtherPercentage,
      color: '#666666',
      population: otherPopulationKnown ? otherPopulation : null
    });
  }

  const displayEntries = combinedEntries.length > 0 ? combinedEntries : resolvedEntries;

  if (displayEntries.length === 0) {
    return '';
  }

  let cumulative = 0;
  const stops = displayEntries.map((entry, index) => {
    const start = Math.min(100, Math.max(0, Math.round(cumulative * 100) / 100));
    cumulative = Math.round((cumulative + entry.percentage) * 100) / 100;
    const end =
      index === displayEntries.length - 1
        ? 100
        : Math.min(100, Math.max(0, Math.round(cumulative * 100) / 100));
    return `${entry.color} ${formatGradientPercentage(start)}% ${formatGradientPercentage(end)}%`;
  });

  if (stops.length === 0) {
    return '';
  }

  const pieStyle = `background: conic-gradient(${stops.join(', ')});`;
  const ariaLabelParts = ['Population breakdown'];
  if (resolvedName) {
    ariaLabelParts.push(`for ${resolvedName}`);
  }
  const ariaLabel = ariaLabelParts.join(' ');

  const legendItems = displayEntries
    .map((entry) => {
      const valueParts = [`${formatPercentageDisplay(entry.percentage)}%`];
      if (entry.population !== null) {
        valueParts.push(`(${entry.population.toLocaleString('en-US')})`);
      }
      return `
        <li>
          <span class="legend-swatch" style="background:${escapeHtml(entry.color)}"></span>
          <span class="legend-label">${escapeHtml(entry.label)}</span>
          <span class="legend-value">${escapeHtml(valueParts.join(' '))}</span>
        </li>
      `;
    })
    .join('');

  return `
    <div class="tooltip-subtitle">Population Breakdown</div>
    <div class="tooltip-chart">
      <div
        class="tooltip-chart-pie"
        role="img"
        aria-label="${escapeHtml(ariaLabel)}"
        style="${escapeHtml(pieStyle)}"
      ></div>
      <ul class="tooltip-chart-legend">${legendItems}</ul>
    </div>
  `;
}

function getFactionForTile(tile) {
  if (!tile || tile.factionId === null || tile.factionId === undefined) {
    return null;
  }
  const factionIndex = Number(tile.factionId);
  if (!Number.isFinite(factionIndex)) {
    return null;
  }
  const world = state.currentWorld;
  if (!world || !Array.isArray(world.factions)) {
    return null;
  }
  return world.factions[factionIndex] || null;
}

function getDominantCulturalInfluence(tile) {
  if (!tile || !tile.culturalInfluence) {
    return null;
  }
  const { key, label, color, strength, breakdown } = tile.culturalInfluence;
  if (!key) {
    return null;
  }
  const resolvedLabel =
    typeof label === 'string' && label.trim() ? label.trim() : formatCultureLabel(key);
  const resolvedColor = resolveCultureColor(color, key);
  const resolvedStrength = clamp(Number(strength) || 0, 0, 1);
  return {
    key,
    label: resolvedLabel,
    color: resolvedColor,
    strength: resolvedStrength,
    breakdown: Array.isArray(breakdown) ? breakdown : []
  };
}

function buildStructureTooltipContent(tile) {
  if (!tile) {
    return null;
  }

  if (!tile.structureName) {
    const biomeType = tile.biomeType;
    const areaName = tile.areaName;
    if (!biomeType && !areaName) {
      return null;
    }
    const definition = biomeType ? biomeTypeDefinitions[biomeType] : null;
    let biomeLabel = definition && definition.label ? definition.label : null;
    if (!biomeLabel && typeof biomeType === 'string' && biomeType.length > 0) {
      biomeLabel = biomeType.charAt(0).toUpperCase() + biomeType.slice(1);
    }
    const fallbackTitle = biomeLabel ? `Unnamed ${biomeLabel}` : 'Unnamed Region';
    const resolvedTitle = areaName || fallbackTitle;
    if (!resolvedTitle) {
      return null;
    }
    const sections = [`<div class="tooltip-title">${escapeHtml(resolvedTitle)}</div>`];
    if (biomeLabel) {
      const listItems =
        `<li><span class="tooltip-term">Biome</span><span class="tooltip-value">${escapeHtml(biomeLabel)}</span></li>`;
      sections.push(`<ul class="tooltip-list">${listItems}</ul>`);
    }
    return sections.join('');
  }

  const details = tile.structureDetails;
  const isSettlement =
    details && (details.isSettlement || (details.type && settlementDetailTypes.has(details.type)));
  if (isSettlement) {
    const sections = [];
    const entries = [];
    const resolvedName = details.name || tile.structureName;
    sections.push(`<div class="tooltip-title">${escapeHtml(resolvedName)}</div>`);

    const faction = getFactionForTile(tile);
    if (faction && faction.name) {
      entries.push({ label: 'Realm', value: faction.name });
    }

    const dominantCulture = getDominantCulturalInfluence(tile);
    if (dominantCulture) {
      const influenceDescription = describeInfluenceStrength(dominantCulture.strength);
      const value = influenceDescription
        ? `${dominantCulture.label} — ${influenceDescription}`
        : dominantCulture.label;
      entries.push({ label: 'Cultural Influence', value });
    }

    if (details.classification) {
      entries.push({ label: 'Classification', value: details.classification });
    }

    if (Number.isFinite(details.population)) {
      const populationValue = Math.max(0, Math.round(details.population));
      const formattedPopulation = populationValue.toLocaleString('en-US');
      const populationLabel = details.populationLabel || 'Population';
      const populationDescriptor = details.populationDescriptor || null;
      const populationDisplay = populationDescriptor
        ? `${formattedPopulation} ${populationDescriptor}`
        : formattedPopulation;
      entries.push({ label: populationLabel, value: populationDisplay });
    }

    if (details.ruler) {
      const rulerTitle = details.ruler.title ? `${details.ruler.title} ` : '';
      const rulerName = details.ruler.name || '';
      const combined = `${rulerTitle}${rulerName}`.trim();
      if (combined) {
        const rulerLabel = details.ruler.label || 'Ruler';
        entries.push({ label: rulerLabel, value: combined });
      }
    }

    if (Number.isFinite(details.foundedYearsAgo)) {
      const foundedValue = Math.max(1, Math.round(details.foundedYearsAgo));
      entries.push({ label: 'Founded', value: `${foundedValue} years ago` });
    }

    const prominentGroup = details.prominentGroup || details.prominentClan;
    if (prominentGroup) {
      const prominentLabel = details.prominentGroupLabel || (details.prominentClan ? 'Prominent Clan' : 'Prominent Group');
      entries.push({ label: prominentLabel, value: prominentGroup });
    }

    if (Array.isArray(details.majorClans) && details.majorClans.length > 0) {
      const formattedClans = formatListWithConjunction(details.majorClans);
      if (formattedClans) {
        const majorClansLabel = details.majorClansLabel || 'Major Clans';
        entries.push({ label: majorClansLabel, value: formattedClans });
      }
    }

    if (Array.isArray(details.majorGuilds) && details.majorGuilds.length > 0) {
      const uniqueGuilds = Array.from(
        new Set(details.majorGuilds.filter((guild) => typeof guild === 'string' && guild.trim()))
      );
      if (uniqueGuilds.length > 0) {
        const guildsLabel = details.majorGuildsLabel || 'Major Guilds';
        entries.push({ label: guildsLabel, value: uniqueGuilds.join(', ') });
      }
    }

    if (Array.isArray(details.majorExports) && details.majorExports.length > 0) {
      const uniqueExports = Array.from(
        new Set(details.majorExports.filter((item) => typeof item === 'string' && item.trim()))
      );
      if (uniqueExports.length > 0) {
        const exportsLabel = details.majorExportsLabel || 'Major Exports';
        entries.push({ label: exportsLabel, value: uniqueExports.join(', ') });
      }
    }

    if (entries.length > 0) {
      const listItems = entries
        .map(
          ({ label, value }) =>
            `<li><span class="tooltip-term">${escapeHtml(label)}</span><span class="tooltip-value">${escapeHtml(
              value
            )}</span></li>`
        )
        .join('');
      sections.push(`<ul class="tooltip-list">${listItems}</ul>`);
    }

    const breakdownSection = buildPopulationBreakdownSection(resolvedName, details.populationBreakdown);

    if (breakdownSection) {
      sections.push(breakdownSection);
    }

    if (details.hallmark) {
      const hallmarkLabel = details.hallmarkLabel;
      const noteContent = escapeHtml(details.hallmark);
      if (hallmarkLabel) {
        sections.push(`
          <div class="tooltip-subtitle">${escapeHtml(hallmarkLabel)}</div>
          <p class="tooltip-note">${noteContent}</p>
        `);
      } else {
        sections.push(`<p class="tooltip-note">${noteContent}</p>`);
      }
    }

    return sections.join('');
  }

  const fallbackTitle = `<div class="tooltip-title">${escapeHtml(tile.structureName)}</div>`;
  const sections = [fallbackTitle];
  const entries = [];
  const faction = getFactionForTile(tile);
  if (faction && faction.name) {
    entries.push({ label: 'Realm', value: faction.name });
  }

  const dominantCulture = getDominantCulturalInfluence(tile);
  if (dominantCulture) {
    const influenceDescription = describeInfluenceStrength(dominantCulture.strength);
    const value = influenceDescription
      ? `${dominantCulture.label} — ${influenceDescription}`
      : dominantCulture.label;
    entries.push({ label: 'Cultural Influence', value });
  }

  if (details) {
    if (details.displayType) {
      entries.push({ label: 'Type', value: details.displayType });
    }
    if (details.hosts) {
      entries.push({ label: 'Hosts', value: details.hosts });
    }
    if (details.campFocus) {
      entries.push({ label: 'Focus', value: details.campFocus });
    }
    if (details.supplies) {
      entries.push({ label: 'Provisions', value: details.supplies });
    }
    if (details.services) {
      entries.push({ label: 'Services', value: details.services });
    }
    if (details.tribe) {
      entries.push({ label: 'Tribe', value: details.tribe });
    }
    if (details.threatLevel) {
      entries.push({ label: 'Threat Level', value: details.threatLevel });
    }
    if (details.inhabitants) {
      entries.push({ label: 'Inhabitants', value: details.inhabitants });
    }
    if (details.warLeader) {
      entries.push({ label: 'Warlord', value: details.warLeader });
    }
    if (details.guardians) {
      entries.push({ label: 'Guardians', value: details.guardians });
    }
    if (details.depth) {
      entries.push({ label: 'Depth', value: details.depth });
    }
    if (details.order) {
      entries.push({ label: 'Order', value: details.order });
    }
    if (details.devotion) {
      entries.push({ label: 'Devotion', value: details.devotion });
    }
    if (details.caretaker) {
      entries.push({ label: 'Caretaker', value: details.caretaker });
    }
    if (details.innkeeper) {
      entries.push({ label: 'Innkeeper', value: details.innkeeper });
    }
    if (details.specialty) {
      entries.push({ label: 'House Specialty', value: details.specialty });
    }
    if (details.reputation) {
      entries.push({ label: 'Reputation', value: details.reputation });
    }
    if (details.amenities) {
      entries.push({ label: 'Amenities', value: details.amenities });
    }
    if (details.rooms) {
      entries.push({ label: 'Rooms', value: details.rooms });
    }
    if (details.rates) {
      entries.push({ label: 'Rates', value: details.rates });
    }
    if (details.notableGuests) {
      entries.push({ label: 'Notable Patrons', value: details.notableGuests });
    }
    if (details.rulingHouse) {
      entries.push({ label: 'Ruling House', value: details.rulingHouse });
    }
    if (details.banner) {
      entries.push({ label: 'Banner', value: details.banner });
    }
    if (Number.isFinite(details.garrison)) {
      entries.push({ label: 'Garrison', value: Math.max(0, Math.round(details.garrison)).toLocaleString('en-US') });
    }
    if (details.patronSaint) {
      entries.push({ label: 'Patron Saint', value: details.patronSaint });
    }
    if (details.description) {
      sections.push(`<p class="tooltip-note">${escapeHtml(details.description)}</p>`);
    }
  }

  if (entries.length > 0) {
    const listItems = entries
      .map(
        ({ label, value }) =>
          `<li><span class="tooltip-term">${escapeHtml(label)}</span><span class="tooltip-value">${escapeHtml(
            value
          )}</span></li>`
      )
      .join('');
    sections.push(`<ul class="tooltip-list">${listItems}</ul>`);
  }

  return sections.join('');
}

function computeLocalViewBounds(tileX, tileY, width, height, radius) {
  const clampedRadius = Math.max(0, Math.floor(radius));
  const startX = Math.max(0, tileX - clampedRadius);
  const endX = Math.min(width - 1, tileX + clampedRadius);
  const startY = Math.max(0, tileY - clampedRadius);
  const endY = Math.min(height - 1, tileY + clampedRadius);
  return {
    startX,
    startY,
    endX,
    endY,
    width: endX - startX + 1,
    height: endY - startY + 1
  };
}

function resolveLocalSubtitle(tile) {
  if (!tile) {
    return 'Local terrain preview';
  }
  const subtitleParts = [];
  const details = tile.structureDetails;
  if (details) {
    if (details.displayType) {
      subtitleParts.push(details.displayType);
    }
    if (details.classification && !subtitleParts.includes(details.classification)) {
      subtitleParts.push(details.classification);
    }
  }
  if (subtitleParts.length === 0 && tile.biomeType) {
    const definition = biomeTypeDefinitions[tile.biomeType];
    if (definition && definition.label) {
      subtitleParts.push(definition.label);
    } else {
      subtitleParts.push(tile.biomeType.charAt(0).toUpperCase() + tile.biomeType.slice(1));
    }
  }
  return subtitleParts.length > 0 ? subtitleParts.join(' • ') : 'Local terrain preview';
}

function refreshLocalMapPreview() {
  if (!elements.localMapPanel || !elements.localMapCanvas) {
    return;
  }
  const world = state.currentWorld;
  const localView = state.localView;
  if (
    !world ||
    !localView ||
    !localView.active ||
    localView.centerX === null ||
    localView.centerY === null ||
    !localView.bounds
  ) {
    elements.localMapPanel.classList.add('hidden');
    elements.localMapPanel.setAttribute('aria-hidden', 'true');
    if (elements.localMapCanvas) {
      elements.localMapCanvas.setAttribute('aria-hidden', 'true');
    }
    if (elements.localMapTitle) {
      elements.localMapTitle.textContent = 'Local View';
    }
    if (elements.localMapSubtitle) {
      elements.localMapSubtitle.textContent = 'Select a site to examine the surrounding terrain.';
    }
    if (elements.localMapDetails) {
      elements.localMapDetails.textContent = localMapDefaultMessage;
    }
    if (elements.localMapCoordinates) {
      elements.localMapCoordinates.textContent = '';
    }
    return;
  }

  const tiles = Array.isArray(world.tiles) ? world.tiles : null;
  if (!tiles || tiles.length === 0) {
    return;
  }

  const centerRow = tiles[localView.centerY];
  if (!Array.isArray(centerRow)) {
    return;
  }

  const focusTile = centerRow[localView.centerX] || null;
  const bounds = localView.bounds;
  const tileWidth = Math.max(1, bounds.width);
  const tileHeight = Math.max(1, bounds.height);

  elements.localMapPanel.classList.remove('hidden');
  elements.localMapPanel.setAttribute('aria-hidden', 'false');

  if (elements.localMapTitle) {
    elements.localMapTitle.textContent = focusTile
      ? focusTile.structureName || focusTile.areaName || 'Local View'
      : 'Local View';
  }

  if (elements.localMapSubtitle) {
    elements.localMapSubtitle.textContent = resolveLocalSubtitle(focusTile);
  }

  if (elements.localMapCoordinates) {
    elements.localMapCoordinates.textContent = `World Tile ${localView.centerX + 1}, ${localView.centerY + 1} — ${
      tileWidth
    }×${tileHeight} tiles`;
  }

  if (elements.localMapDetails) {
    const tooltipContent = buildStructureTooltipContent(focusTile);
    if (tooltipContent) {
      elements.localMapDetails.innerHTML = tooltipContent;
    } else {
      elements.localMapDetails.textContent = localMapDefaultMessage;
    }
  }

  const canvas = elements.localMapCanvas;
  const context = canvas ? canvas.getContext('2d') : null;
  if (!canvas || !context || !elements.canvas) {
    return;
  }

  const sourceX = bounds.startX * drawSize;
  const sourceY = bounds.startY * drawSize;
  const sourceWidth = tileWidth * drawSize;
  const sourceHeight = tileHeight * drawSize;
  const baseScale = localViewConfig.baseScale;
  const maxSize = localViewConfig.maxCanvasSize;
  const baseWidth = sourceWidth * baseScale;
  let scale = baseScale;
  if (baseWidth > maxSize) {
    const possibleScale = Math.floor(maxSize / Math.max(1, sourceWidth));
    scale = Math.max(localViewConfig.minScale, possibleScale);
    if (!Number.isFinite(scale) || scale < 1) {
      scale = 1;
    }
  }

  const destWidth = Math.max(1, Math.round(sourceWidth * scale));
  const destHeight = Math.max(1, Math.round(sourceHeight * scale));
  canvas.width = destWidth;
  canvas.height = destHeight;
  canvas.style.width = '100%';
  canvas.style.height = 'auto';
  canvas.setAttribute(
    'aria-label',
    `Local preview covering ${tileWidth} by ${tileHeight} tiles around world tile ${localView.centerX + 1}, ${
      localView.centerY + 1
    }.`
  );
  canvas.setAttribute('aria-hidden', 'false');

  context.imageSmoothingEnabled = false;
  context.clearRect(0, 0, destWidth, destHeight);
  context.fillStyle = '#05060b';
  context.fillRect(0, 0, destWidth, destHeight);
  context.drawImage(elements.canvas, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, destWidth, destHeight);

  const tilePixelWidth = destWidth / tileWidth;
  const tilePixelHeight = destHeight / tileHeight;

  context.save();
  context.strokeStyle = 'rgba(12, 14, 22, 0.6)';
  context.lineWidth = 1;
  for (let x = 1; x < tileWidth; x += 1) {
    const px = Math.round(x * tilePixelWidth) + 0.5;
    context.beginPath();
    context.moveTo(px, 0);
    context.lineTo(px, destHeight);
    context.stroke();
  }
  for (let y = 1; y < tileHeight; y += 1) {
    const py = Math.round(y * tilePixelHeight) + 0.5;
    context.beginPath();
    context.moveTo(0, py);
    context.lineTo(destWidth, py);
    context.stroke();
  }
  context.restore();

  const highlightX = (localView.centerX - bounds.startX) * tilePixelWidth;
  const highlightY = (localView.centerY - bounds.startY) * tilePixelHeight;
  context.save();
  const minTileSize = Math.max(1, Math.min(tilePixelWidth, tilePixelHeight));
  const lineWidth = Math.max(2, Math.round(minTileSize * 0.12));
  context.lineWidth = lineWidth;
  context.strokeStyle = 'rgba(240, 198, 116, 0.9)';
  context.fillStyle = 'rgba(240, 198, 116, 0.12)';
  context.fillRect(highlightX, highlightY, tilePixelWidth, tilePixelHeight);
  context.strokeRect(
    highlightX + lineWidth / 2,
    highlightY + lineWidth / 2,
    tilePixelWidth - lineWidth,
    tilePixelHeight - lineWidth
  );
  context.restore();
}

function hideLocalView(options = {}) {
  state.localView.active = false;
  state.localView.centerX = null;
  state.localView.centerY = null;
  state.localView.bounds = null;
  if (elements.localMapPanel) {
    elements.localMapPanel.classList.add('hidden');
    elements.localMapPanel.setAttribute('aria-hidden', 'true');
  }
  if (elements.localMapCanvas) {
    elements.localMapCanvas.setAttribute('aria-hidden', 'true');
    elements.localMapCanvas.setAttribute('aria-label', 'Local map preview');
  }
  if (elements.localMapTitle) {
    elements.localMapTitle.textContent = 'Local View';
  }
  if (elements.localMapSubtitle) {
    elements.localMapSubtitle.textContent = 'Select a site to examine the surrounding terrain.';
  }
  if (elements.localMapDetails) {
    elements.localMapDetails.textContent = localMapDefaultMessage;
  }
  if (elements.localMapCoordinates) {
    elements.localMapCoordinates.textContent = '';
  }
  if (!options.suppressRedraw && state.currentWorld) {
    drawWorld(state.currentWorld, { preserveView: true });
  }
}

function showLocalViewAt(tileX, tileY) {
  const world = state.currentWorld;
  if (!world || !Array.isArray(world.tiles) || world.tiles.length === 0) {
    return;
  }
  const height = world.tiles.length;
  const width = Array.isArray(world.tiles[0]) ? world.tiles[0].length : 0;
  if (width === 0) {
    return;
  }
  const clampedX = clamp(tileX, 0, width - 1);
  const clampedY = clamp(tileY, 0, height - 1);
  const bounds = computeLocalViewBounds(clampedX, clampedY, width, height, localViewConfig.radius);
  state.localView.active = true;
  state.localView.centerX = clampedX;
  state.localView.centerY = clampedY;
  state.localView.bounds = bounds;
  drawWorld(world, { preserveView: true });
}

function drawLocalSelectionOverlay(ctx) {
  if (!ctx || !state.localView || !state.localView.active || !state.localView.bounds) {
    return;
  }
  const bounds = state.localView.bounds;
  const widthTiles = Math.max(1, bounds.endX - bounds.startX + 1);
  const heightTiles = Math.max(1, bounds.endY - bounds.startY + 1);
  const pixelX = bounds.startX * drawSize;
  const pixelY = bounds.startY * drawSize;
  const pixelWidth = widthTiles * drawSize;
  const pixelHeight = heightTiles * drawSize;
  const lineWidth = Math.max(2, Math.round(drawSize * 0.18));
  ctx.save();
  ctx.fillStyle = 'rgba(240, 198, 116, 0.12)';
  ctx.fillRect(pixelX, pixelY, pixelWidth, pixelHeight);
  ctx.strokeStyle = 'rgba(240, 198, 116, 0.85)';
  ctx.lineWidth = lineWidth;
  const dash = Math.max(4, Math.round(drawSize * 0.6));
  ctx.setLineDash([dash, dash]);
  ctx.strokeRect(
    pixelX + lineWidth / 2,
    pixelY + lineWidth / 2,
    Math.max(0, pixelWidth - lineWidth),
    Math.max(0, pixelHeight - lineWidth)
  );
  ctx.restore();
}

function formatStructureDetailLabel(value) {
  if (value === null || value === undefined) {
    return null;
  }
  const stringValue = String(value)
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .trim();
  if (!stringValue) {
    return null;
  }
  return stringValue
    .split(' ')
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
    .join(' ');
}

function buildPopulationBreakdownPanelSection(resolvedName, breakdown) {
  if (!Array.isArray(breakdown) || breakdown.length === 0) {
    return '';
  }

  const resolvedEntries = breakdown
    .filter((entry) => Number.isFinite(entry?.percentage) && entry.percentage > 0)
    .map((entry) => {
      const rawPercentage = Number(entry.percentage);
      const safePercentage = Number.isFinite(rawPercentage) ? Math.max(0, rawPercentage) : 0;
      const roundedPercentage = Math.round(safePercentage * 100) / 100;
      return {
        key: typeof entry.key === 'string' && entry.key ? entry.key : null,
        label: entry.label || entry.key || 'Unknown',
        percentage: roundedPercentage,
        color: entry.color || '#999999',
        population:
          Number.isFinite(entry.population) && entry.population > 0
            ? Math.max(0, Math.round(entry.population))
            : null
      };
    });

  const priorityEntries = [];
  const majorEntries = [];
  let otherPercentage = 0;
  let otherPopulation = 0;
  let otherPopulationKnown = true;

  resolvedEntries.forEach((entry) => {
    if (entry.key === 'wizards') {
      priorityEntries.push(entry);
      return;
    }

    if (entry.percentage < 0.5) {
      otherPercentage += entry.percentage;
      if (entry.population === null) {
        otherPopulationKnown = false;
      } else if (otherPopulationKnown) {
        otherPopulation += entry.population;
      }
    } else {
      majorEntries.push(entry);
    }
  });

  const combinedEntries = [...priorityEntries, ...majorEntries];

  if (otherPercentage > 0) {
    const roundedOtherPercentage = Math.round(otherPercentage * 100) / 100;
    combinedEntries.push({
      label: 'Other',
      percentage: roundedOtherPercentage,
      color: '#666666',
      population: otherPopulationKnown ? otherPopulation : null
    });
  }

  const displayEntries = combinedEntries.length > 0 ? combinedEntries : resolvedEntries;

  if (displayEntries.length === 0) {
    return '';
  }

  let cumulative = 0;
  const stops = displayEntries.map((entry, index) => {
    const start = Math.min(100, Math.max(0, Math.round(cumulative * 100) / 100));
    cumulative = Math.round((cumulative + entry.percentage) * 100) / 100;
    const end =
      index === displayEntries.length - 1
        ? 100
        : Math.min(100, Math.max(0, Math.round(cumulative * 100) / 100));
    return `${entry.color} ${formatGradientPercentage(start)}% ${formatGradientPercentage(end)}%`;
  });

  if (stops.length === 0) {
    return '';
  }

  const pieStyle = `background: conic-gradient(${stops.join(', ')});`;
  const ariaLabelParts = ['Population breakdown'];
  if (resolvedName) {
    ariaLabelParts.push(`for ${resolvedName}`);
  }
  const ariaLabel = ariaLabelParts.join(' ');

  const legendItems = displayEntries
    .map((entry) => {
      const valueParts = [`${formatPercentageDisplay(entry.percentage)}%`];
      if (entry.population !== null) {
        valueParts.push(`(${entry.population.toLocaleString('en-US')})`);
      }
      return `
        <li>
          <span class="structure-details-legend-swatch" style="background:${escapeHtml(entry.color)}"></span>
          <span class="structure-details-legend-label">${escapeHtml(entry.label)}</span>
          <span class="structure-details-legend-value">${escapeHtml(valueParts.join(' '))}</span>
        </li>
      `;
    })
    .join('');

  return `
    <section class="structure-details-section structure-details-section--chart">
      <h3 class="structure-details-heading">Population Breakdown</h3>
      <div class="structure-details-chart">
        <div
          class="structure-details-chart-pie"
          role="img"
          aria-label="${escapeHtml(ariaLabel)}"
          style="${escapeHtml(pieStyle)}"
        ></div>
        <ul class="structure-details-chart-legend">${legendItems}</ul>
      </div>
    </section>
  `;
}

function hashStringToNumber(value) {
  if (value === null || value === undefined) {
    return 0;
  }
  const stringValue = String(value);
  if (!stringValue) {
    return 0;
  }
  let hash = 0;
  for (let index = 0; index < stringValue.length; index += 1) {
    const charCode = stringValue.charCodeAt(index);
    hash = (hash << 5) - hash + charCode;
    hash |= 0; // eslint-disable-line no-bitwise
  }
  return hash;
}

function buildRulerPortraitTheme(seed) {
  const hash = hashStringToNumber(seed || '');
  const baseHue = ((hash % 360) + 360) % 360;
  const highlightHue = (baseHue + 24) % 360;
  const accentHue = (baseHue + 160) % 360;
  return {
    background: `linear-gradient(155deg, hsl(${baseHue}, 38%, 26%), hsl(${highlightHue}, 46%, 34%))`,
    accent: `hsl(${accentHue}, 68%, 72%)`,
    border: `hsl(${baseHue}, 46%, 18%)`,
    glow: `hsla(${accentHue}, 70%, 60%, 0.35)`
  };
}

function getRulerInitials(name, fallbackLabel) {
  const source = typeof name === 'string' && name.trim() ? name.trim() : fallbackLabel || '';
  if (!source) {
    return '?';
  }
  const parts = source
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 3);
  if (parts.length === 0) {
    return '?';
  }
  return parts
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function buildRulerPortraitPanelSection(resolvedName, details) {
  if (!details || !details.isSettlement) {
    return '';
  }

  const ruler = details.ruler;
  if (!ruler || (!ruler.name && !ruler.title && !ruler.label)) {
    return '';
  }

  const title = typeof ruler.title === 'string' ? ruler.title.trim() : '';
  const name = typeof ruler.name === 'string' ? ruler.name.trim() : '';
  const label =
    typeof ruler.label === 'string' && ruler.label.trim() ? ruler.label.trim() : title || 'Ruler';
  const displayName = [title, name].filter(Boolean).join(' ').trim();
  const settlementDescriptor = resolvedName ? `of ${resolvedName}` : '';
  const roleText = settlementDescriptor ? `${label} ${settlementDescriptor}` : label;
  const epithet = typeof ruler.epithet === 'string' && ruler.epithet.trim() ? ruler.epithet.trim() : '';
  const motto = typeof ruler.motto === 'string' && ruler.motto.trim() ? ruler.motto.trim() : '';
  const secondaryLine = motto || epithet;
  const seedParts = [
    resolvedName,
    name,
    title,
    label,
    details.banner,
    details.rulingHouse,
    details.prominentGroup
  ]
    .filter((value) => typeof value === 'string' && value.trim())
    .join('|');
  const theme = buildRulerPortraitTheme(seedParts);
  const initials = getRulerInitials(name, displayName || label);
  const figureLabelParts = [];
  if (displayName) {
    figureLabelParts.push(displayName);
  }
  if (roleText && roleText !== displayName) {
    figureLabelParts.push(roleText);
  }
  if (secondaryLine) {
    figureLabelParts.push(secondaryLine);
  }
  const figureAriaLabel =
    figureLabelParts.length > 0 ? figureLabelParts.join(' — ') : 'Ruler portrait';
  const styleParts = [];
  if (theme.background) {
    styleParts.push(`--portrait-background:${theme.background}`);
  }
  if (theme.accent) {
    styleParts.push(`--portrait-accent:${theme.accent}`);
  }
  if (theme.border) {
    styleParts.push(`--portrait-border:${theme.border}`);
  }
  if (theme.glow) {
    styleParts.push(`--portrait-glow:${theme.glow}`);
  }
  const styleAttr = escapeHtml(styleParts.join(';'));

  return `
    <section class="structure-details-section structure-details-section--portrait">
      <h3 class="structure-details-heading">Ruler Portrait</h3>
      <figure class="ruler-portrait" role="group" aria-label="${escapeHtml(figureAriaLabel)}">
        <div class="ruler-portrait-frame" style="${styleAttr}">
          <div class="ruler-portrait-image">
            <span class="ruler-portrait-emblem">${escapeHtml(initials)}</span>
          </div>
        </div>
        <figcaption class="ruler-portrait-caption">
          ${displayName ? `<span class="ruler-portrait-name">${escapeHtml(displayName)}</span>` : ''}
          ${roleText ? `<span class="ruler-portrait-role">${escapeHtml(roleText)}</span>` : ''}
          ${secondaryLine ? `<span class="ruler-portrait-epithet">${escapeHtml(secondaryLine)}</span>` : ''}
        </figcaption>
      </figure>
    </section>
  `;
}

function buildStructureDetailsPanelContent(tile, context = {}) {
  if (!tile || !tile.structureName) {
    return null;
  }

  const details = tile.structureDetails || {};
  const resolvedName = details.name || tile.structureName;
  const subtitleParts = [];
  if (details.classification) {
    subtitleParts.push(details.classification);
  }
  const typeLabel = details.displayType || formatStructureDetailLabel(details.type);
  if (typeLabel) {
    subtitleParts.push(typeLabel);
  }
  const subtitle = subtitleParts.join(' • ') || null;

  const overviewEntries = [];
  const addOverviewEntry = (label, value) => {
    if (value === null || value === undefined) {
      return;
    }
    const isNumber = typeof value === 'number';
    const stringValue = isNumber
      ? value.toLocaleString('en-US')
      : typeof value === 'string'
      ? value.trim()
      : String(value).trim();
    if (!stringValue) {
      return;
    }
    overviewEntries.push({ label, value: stringValue });
  };

  const listSections = [];
  const listSectionKeys = new Set();
  const addListSection = (items, label, key) => {
    if (!Array.isArray(items) || items.length === 0) {
      return;
    }
    const uniqueItems = Array.from(
      new Set(
        items
          .map((item) => (typeof item === 'string' ? item.trim() : ''))
          .filter((item) => item.length > 0)
      )
    );
    if (uniqueItems.length === 0) {
      return;
    }
    const sectionKey = key || label;
    if (sectionKey && listSectionKeys.has(sectionKey)) {
      return;
    }
    if (sectionKey) {
      listSectionKeys.add(sectionKey);
    }
    listSections.push({ label, items: uniqueItems });
  };

  const narrativeSections = [];
  const addNarrativeSection = (label, text) => {
    if (!text) {
      return;
    }
    narrativeSections.push({ label, text });
  };

  if (tile.areaName) {
    addOverviewEntry('Region', tile.areaName);
  }

  if (tile.biomeType) {
    const definition = biomeTypeDefinitions[tile.biomeType];
    let biomeLabel = definition && definition.label ? definition.label : null;
    if (!biomeLabel) {
      biomeLabel = formatStructureDetailLabel(tile.biomeType);
    }
    if (biomeLabel) {
      addOverviewEntry('Biome', biomeLabel);
    }
  }

  const faction = getFactionForTile(tile);
  if (faction && faction.name) {
    addOverviewEntry('Realm', faction.name);
  }
  const dominantCulture = getDominantCulturalInfluence(tile);
  if (dominantCulture) {
    const influenceDescription = describeInfluenceStrength(dominantCulture.strength);
    const value = influenceDescription
      ? `${dominantCulture.label} — ${influenceDescription}`
      : dominantCulture.label;
    addOverviewEntry('Cultural Influence', value);
  }

  if (details.population !== null && details.population !== undefined) {
    const roundedPopulation = Math.max(0, Math.round(Number(details.population)));
    if (Number.isFinite(roundedPopulation)) {
      const formattedPopulation = roundedPopulation.toLocaleString('en-US');
      const populationLabel = details.populationLabel || 'Population';
      const descriptor = details.populationDescriptor || null;
      const populationDisplay = descriptor
        ? `${formattedPopulation} ${descriptor}`
        : formattedPopulation;
      addOverviewEntry(populationLabel, populationDisplay);
    }
  }

  if (details.classification && !subtitleParts.includes(details.classification)) {
    addOverviewEntry('Classification', details.classification);
  }

  if (details.displayType) {
    addOverviewEntry('Type', details.displayType);
  } else if (!details.displayType && details.type) {
    const formattedType = formatStructureDetailLabel(details.type);
    if (formattedType) {
      addOverviewEntry('Type', formattedType);
    }
  }

  if (details.tribe) {
    addOverviewEntry('Tribe', details.tribe);
  }
  if (details.threatLevel) {
    addOverviewEntry('Threat Level', details.threatLevel);
  }
  if (details.inhabitants) {
    addOverviewEntry('Inhabitants', details.inhabitants);
  }
  if (details.warLeader) {
    addOverviewEntry('Warlord', details.warLeader);
  }
  if (details.guardians) {
    addOverviewEntry('Guardians', details.guardians);
  }
  if (details.depth) {
    addOverviewEntry('Depth', details.depth);
  }
  if (details.order) {
    addOverviewEntry('Order', details.order);
  }
  if (details.devotion) {
    addOverviewEntry('Devotion', details.devotion);
  }
  if (details.caretaker) {
    addOverviewEntry('Caretaker', details.caretaker);
  }
  if (details.rulingHouse) {
    addOverviewEntry('Ruling House', details.rulingHouse);
  }
  if (details.banner) {
    addOverviewEntry('Banner', details.banner);
  }
  if (Number.isFinite(details.garrison)) {
    addOverviewEntry('Garrison', Math.max(0, Math.round(details.garrison)).toLocaleString('en-US'));
  }
  if (details.patronSaint) {
    addOverviewEntry('Patron Saint', details.patronSaint);
  }
  if (details.vow) {
    addOverviewEntry('Vow', details.vow);
  }

  if (details.ruler && (details.ruler.title || details.ruler.name)) {
    const rulerTitle = details.ruler.title ? `${details.ruler.title} ` : '';
    const rulerName = details.ruler.name || '';
    const combined = `${rulerTitle}${rulerName}`.trim();
    if (combined) {
      const rulerLabel = details.ruler.label || 'Ruler';
      addOverviewEntry(rulerLabel, combined);
    }
  }

  if (Number.isFinite(details.foundedYearsAgo)) {
    const foundedValue = Math.max(1, Math.round(details.foundedYearsAgo));
    addOverviewEntry('Founded', `${foundedValue} years ago`);
  }

  const prominentGroup = details.prominentGroup || details.prominentClan;
  if (prominentGroup) {
    const prominentLabel =
      details.prominentGroupLabel || (details.prominentClan ? 'Prominent Clan' : 'Prominent Group');
    addOverviewEntry(prominentLabel, prominentGroup);
  }

  if (Array.isArray(details.majorClans) && details.majorClans.length > 0) {
    const formattedClans = formatListWithConjunction(details.majorClans);
    if (formattedClans) {
      const majorClansLabel = details.majorClansLabel || 'Major Clans';
      addOverviewEntry(majorClansLabel, formattedClans);
    }
  }

  addListSection(details.majorGuilds, details.majorGuildsLabel || 'Major Guilds', 'majorGuilds');
  addListSection(details.majorExports, details.majorExportsLabel || 'Major Exports', 'majorExports');

  const excludedArrayKeys = new Set(['populationBreakdown', 'majorGuilds', 'majorExports', 'majorClans']);
  Object.entries(details).forEach(([key, value]) => {
    if (!Array.isArray(value) || excludedArrayKeys.has(key)) {
      return;
    }
    const label = formatStructureDetailLabel(key);
    if (label) {
      addListSection(value, label, key);
    }
  });

  if (details.description) {
    addNarrativeSection('Description', details.description);
  }
  if (details.hallmark) {
    const hallmarkLabel = details.hallmarkLabel || 'Hallmark';
    addNarrativeSection(hallmarkLabel, details.hallmark);
  }

  const breakdownSection = buildPopulationBreakdownPanelSection(resolvedName, details.populationBreakdown);

  const columnSections = [[], [], []];

  const rulerPortraitSection = buildRulerPortraitPanelSection(resolvedName, details);
  if (rulerPortraitSection) {
    columnSections[0].push(rulerPortraitSection);
  }

  if (overviewEntries.length > 0) {
    const overviewItems = overviewEntries
      .map(
        (entry) => `
          <div>
            <dt>${escapeHtml(entry.label)}</dt>
            <dd>${escapeHtml(entry.value)}</dd>
          </div>
        `
      )
      .join('');
    columnSections[0].push(`
      <section class="structure-details-section structure-details-section--overview">
        <h3 class="structure-details-heading">Overview</h3>
        <dl class="structure-details-list">${overviewItems}</dl>
      </section>
    `);
  }

  if (breakdownSection) {
    columnSections[1].push(breakdownSection);
  }

  if (listSections.length > 0) {
    const collections = listSections
      .map((section) => {
        const items = section.items
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join('');
        return `
          <article class="structure-details-collection">
            <h4 class="structure-details-collection-title">${escapeHtml(section.label)}</h4>
            <ul class="structure-details-collection-list">${items}</ul>
          </article>
        `;
      })
      .join('');
    columnSections[2].push(`
      <section class="structure-details-section structure-details-section--collections">
        <h3 class="structure-details-heading">Notable Groups &amp; Orders</h3>
        <div class="structure-details-collections-grid">${collections}</div>
      </section>
    `);
  }

  narrativeSections.forEach((section) => {
    columnSections[2].push(`
      <section class="structure-details-section structure-details-section--narrative">
        <h3 class="structure-details-heading">${escapeHtml(section.label)}</h3>
        <p class="structure-details-paragraph">${escapeHtml(section.text)}</p>
      </section>
    `);
  });

  const populatedColumns = columnSections
    .map((items, index) => {
      if (items.length === 0) {
        return '';
      }
      const columnNames = ['primary', 'secondary', 'tertiary'];
      const columnClass = columnNames[index] || `col-${index + 1}`;
      return `
        <div class="structure-details-column structure-details-column--${columnClass}">
          ${items.join('')}
        </div>
      `;
    })
    .filter(Boolean);

  const body = populatedColumns.length > 0
    ? populatedColumns.join('')
    : '<p class="structure-details-empty structure-details-empty--standalone">No additional records found for this location.</p>';

  return {
    title: resolvedName,
    subtitle,
    body
  };
}

function showStructureDetails(tile, context = {}) {
  hideStructureContextMenu();
  if (!elements.structureDetailsPanel) {
    return;
  }

  const content = buildStructureDetailsPanelContent(tile, context);
  if (!content) {
    hideStructureDetails();
    return;
  }

  structureDetailsState.visible = true;
  elements.structureDetailsPanel.classList.remove('hidden');
  elements.structureDetailsPanel.setAttribute('aria-hidden', 'false');

  if (elements.structureDetailsTitle) {
    elements.structureDetailsTitle.textContent = content.title || tile.structureName;
  }

  if (elements.structureDetailsSubtitle) {
    if (content.subtitle) {
      elements.structureDetailsSubtitle.textContent = content.subtitle;
      elements.structureDetailsSubtitle.classList.remove('hidden');
    } else {
      elements.structureDetailsSubtitle.textContent = '';
      elements.structureDetailsSubtitle.classList.add('hidden');
    }
  }

  if (elements.structureDetailsContent) {
    elements.structureDetailsContent.innerHTML = content.body;
  }

  if (elements.structureDetailsClose && typeof elements.structureDetailsClose.focus === 'function') {
    elements.structureDetailsClose.focus();
  }
}

function hideStructureDetails(options = {}) {
  hideStructureContextMenu();
  if (!elements.structureDetailsPanel) {
    return;
  }

  elements.structureDetailsPanel.classList.add('hidden');
  elements.structureDetailsPanel.setAttribute('aria-hidden', 'true');
  if (elements.structureDetailsContent) {
    elements.structureDetailsContent.innerHTML = '';
  }
  structureDetailsState.visible = false;

  if (options.returnFocus && elements.canvasWrapper && typeof elements.canvasWrapper.focus === 'function') {
    elements.canvasWrapper.focus();
  }
}

function showMapTooltip(content, pointerX, pointerY, boundsRect) {
  if (!elements.mapTooltip) {
    return;
  }
  if (!content) {
    hideMapTooltip();
    return;
  }
  const tooltip = elements.mapTooltip;
  tooltip.innerHTML = content;
  tooltip.classList.add('visible');
  tooltip.setAttribute('aria-hidden', 'false');
  const margin = 16;
  const tooltipWidth = tooltip.offsetWidth || 0;
  const tooltipHeight = tooltip.offsetHeight || 0;
  const availableWidth = boundsRect ? boundsRect.width : tooltipWidth + margin * 2;
  const availableHeight = boundsRect ? boundsRect.height : tooltipHeight + margin * 2;

  let left = pointerX + margin;
  if (left + tooltipWidth > availableWidth - margin) {
    left = Math.max(margin, availableWidth - tooltipWidth - margin);
  }
  let top = pointerY - tooltipHeight - margin;
  if (top < margin) {
    top = pointerY + margin;
  }
  if (top + tooltipHeight > availableHeight - margin) {
    top = Math.max(margin, availableHeight - tooltipHeight - margin);
  }

  tooltip.style.left = `${Math.round(left)}px`;
  tooltip.style.top = `${Math.round(top)}px`;
}

function resetView(worldWidth, worldHeight) {
  if (!elements.canvasWrapper) {
    return;
  }
  const rect = elements.canvasWrapper.getBoundingClientRect();
  viewState.wrapperSize = { width: rect.width, height: rect.height };
  viewState.worldSize = { width: worldWidth, height: worldHeight };
  const { contain, cover } = computeViewScales(rect.width, rect.height, worldWidth, worldHeight);
  viewState.containScale = contain;
  viewState.coverScale = cover;
  viewState.minScale = Math.min(0.25, contain);
  viewState.maxScale = Math.max(6, cover * 4);
  viewState.scale = cover;
  viewState.translateX = (rect.width - worldWidth * viewState.scale) / 2;
  viewState.translateY = (rect.height - worldHeight * viewState.scale) / 2;
  viewState.hasInteracted = false;
  applyViewTransform();
  hideStructureDetails();
  hideMapTooltip();
  hideStructureContextMenu();
}

function handleResize() {
  if (!elements.canvasWrapper) {
    return;
  }
  const previousWidth = viewState.wrapperSize.width;
  const previousHeight = viewState.wrapperSize.height;
  const rect = elements.canvasWrapper.getBoundingClientRect();
  viewState.wrapperSize = { width: rect.width, height: rect.height };

  if (!viewState.worldSize.width || !viewState.worldSize.height) {
    applyViewTransform();
    return;
  }

  const { contain, cover } = computeViewScales(
    rect.width,
    rect.height,
    viewState.worldSize.width,
    viewState.worldSize.height
  );
  viewState.containScale = contain;
  viewState.coverScale = cover;
  viewState.minScale = Math.min(0.25, contain);
  viewState.maxScale = Math.max(6, cover * 4);

  if (!viewState.hasInteracted) {
    viewState.scale = cover;
    viewState.translateX = (rect.width - viewState.worldSize.width * viewState.scale) / 2;
    viewState.translateY = (rect.height - viewState.worldSize.height * viewState.scale) / 2;
  } else {
    const deltaX = (rect.width - previousWidth) / 2;
    const deltaY = (rect.height - previousHeight) / 2;
    if (Number.isFinite(deltaX)) {
      viewState.translateX += deltaX;
    }
    if (Number.isFinite(deltaY)) {
      viewState.translateY += deltaY;
    }
  }

  applyViewTransform();
  hideMapTooltip();
}

function setupMapInteractions() {
  if (!elements.canvasWrapper) {
    return;
  }

  let isPanning = false;
  let activePointerId = null;
  const lastPosition = { x: 0, y: 0 };
  const initialPosition = { x: 0, y: 0 };
  let pointerMovedDuringPan = false;

  const resolveTileAtPointer = (event) => {
    if (!elements.canvasWrapper) {
      return null;
    }
    const world = state.currentWorld;
    const tiles = world && Array.isArray(world.tiles) ? world.tiles : null;
    if (!tiles || tiles.length === 0) {
      return null;
    }
    const rect = elements.canvasWrapper.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;
    if (!Number.isFinite(pointerX) || !Number.isFinite(pointerY)) {
      return null;
    }
    if (pointerX < 0 || pointerY < 0 || pointerX > rect.width || pointerY > rect.height) {
      return null;
    }
    const worldPixelX = (pointerX - viewState.translateX) / viewState.scale;
    const worldPixelY = (pointerY - viewState.translateY) / viewState.scale;
    if (
      !Number.isFinite(worldPixelX) ||
      !Number.isFinite(worldPixelY) ||
      worldPixelX < 0 ||
      worldPixelY < 0 ||
      worldPixelX >= viewState.worldSize.width ||
      worldPixelY >= viewState.worldSize.height
    ) {
      return null;
    }
    const tileX = Math.floor(worldPixelX / drawSize);
    const tileY = Math.floor(worldPixelY / drawSize);
    if (tileY < 0 || tileY >= tiles.length) {
      return null;
    }
    const row = tiles[tileY];
    if (!Array.isArray(row) || tileX < 0 || tileX >= row.length) {
      return null;
    }
    const tile = row[tileX];
    if (!tile) {
      return null;
    }
    return { tile, tileX, tileY, pointerX, pointerY, rect };
  };

  const updateHover = (event) => {
    if (!elements.canvasWrapper) {
      return;
    }
    if (structureContextMenuState.visible) {
      return;
    }
    if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') {
      hideMapTooltip();
      return;
    }
    if (isPanning && event.pointerId === activePointerId) {
      hideMapTooltip();
      return;
    }
    const resolved = resolveTileAtPointer(event);
    if (!resolved) {
      hideMapTooltip();
      return;
    }
    const tooltipContent = buildStructureTooltipContent(resolved.tile);
    if (!tooltipContent) {
      hideMapTooltip();
      return;
    }
    showMapTooltip(tooltipContent, resolved.pointerX, resolved.pointerY, resolved.rect);
  };

  const handleWheel = (event) => {
    if (!elements.canvas) {
      return;
    }
    hideMapTooltip();
    hideStructureContextMenu();
    hideStructureDetails();
    event.preventDefault();
    const rect = elements.canvasWrapper.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;
    const zoomIntensity = 0.1;
    const direction = event.deltaY > 0 ? -1 : 1;
    const scaleFactor = 1 + zoomIntensity * direction;
    const targetScale = clamp(viewState.scale * scaleFactor, viewState.minScale, viewState.maxScale);
    const originX = (pointerX - viewState.translateX) / viewState.scale;
    const originY = (pointerY - viewState.translateY) / viewState.scale;
    viewState.scale = targetScale;
    viewState.translateX = pointerX - originX * viewState.scale;
    viewState.translateY = pointerY - originY * viewState.scale;
    viewState.hasInteracted = true;
    applyViewTransform();
  };

  const handlePointerDown = (event) => {
    if (activePointerId !== null) {
      return;
    }
    const isPrimaryPointer = !(
      event.button !== undefined && event.button !== 0 && event.pointerType !== 'touch'
    );
    hideStructureDetails();
    hideStructureContextMenu();
    if (!isPrimaryPointer) {
      return;
    }
    hideMapTooltip();
    event.preventDefault();
    isPanning = true;
    activePointerId = event.pointerId;
    lastPosition.x = event.clientX;
    lastPosition.y = event.clientY;
    initialPosition.x = event.clientX;
    initialPosition.y = event.clientY;
    pointerMovedDuringPan = false;
    elements.canvasWrapper.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    updateHover(event);
    if (!isPanning || event.pointerId !== activePointerId) {
      return;
    }
    event.preventDefault();
    const dx = event.clientX - lastPosition.x;
    const dy = event.clientY - lastPosition.y;
    if (!pointerMovedDuringPan) {
      const totalDx = event.clientX - initialPosition.x;
      const totalDy = event.clientY - initialPosition.y;
      const distance = Math.hypot(totalDx, totalDy);
      if (distance > 3) {
        pointerMovedDuringPan = true;
      }
    }
    lastPosition.x = event.clientX;
    lastPosition.y = event.clientY;
    viewState.translateX += dx;
    viewState.translateY += dy;
    viewState.hasInteracted = true;
    applyViewTransform();
  };

  const handlePointerUp = (event) => {
    const wasActivePointer = event.pointerId === activePointerId;
    if (wasActivePointer) {
      elements.canvasWrapper.releasePointerCapture(event.pointerId);
      isPanning = false;
      activePointerId = null;
      if (!pointerMovedDuringPan) {
        const resolved = resolveTileAtPointer(event);
        if (resolved) {
          showLocalViewAt(resolved.tileX, resolved.tileY);
        }
      } else {
        updateHover(event);
      }
      return;
    }
    updateHover(event);
  };

  const handlePointerLeave = () => {
    hideMapTooltip();
    hideStructureContextMenu();
  };

  const handleDoubleClick = () => {
    if (!viewState.worldSize.width || !viewState.worldSize.height) {
      return;
    }
    hideStructureContextMenu();
    hideStructureDetails();
    resetView(viewState.worldSize.width, viewState.worldSize.height);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    hideMapTooltip();
    const resolved = resolveTileAtPointer(event);
    if (!resolved || !resolved.tile || !resolved.tile.structureName) {
      hideStructureContextMenu();
      return;
    }
    showStructureContextMenu(resolved);
  };

  elements.canvasWrapper.addEventListener('wheel', handleWheel, { passive: false });
  elements.canvasWrapper.addEventListener('pointerdown', handlePointerDown);
  elements.canvasWrapper.addEventListener('pointermove', handlePointerMove);
  elements.canvasWrapper.addEventListener('pointerup', handlePointerUp);
  elements.canvasWrapper.addEventListener('pointercancel', handlePointerUp);
  elements.canvasWrapper.addEventListener('pointerenter', updateHover);
  elements.canvasWrapper.addEventListener('pointerleave', handlePointerLeave);
  elements.canvasWrapper.addEventListener('contextmenu', handleContextMenu);
  elements.canvasWrapper.addEventListener('dblclick', handleDoubleClick);
  window.addEventListener('resize', handleResize);
}

function updateMusicToggleLabel() {
  const toggles = getMusicToggleElements();
  if (toggles.length === 0) {
    return;
  }
  const label = audioState.isPlaying ? 'Pause Music' : 'Play Music';
  toggles.forEach((toggle) => {
    toggle.textContent = label;
    toggle.setAttribute('aria-pressed', audioState.isPlaying.toString());
  });
}

function updateNowPlaying() {
  if (!audioState.tracks.length) {
    return;
  }
  const track = audioState.tracks[audioState.currentIndex];
  const displays = getMusicNowPlayingDisplays();
  if (displays.length === 0) {
    return;
  }
  const message = audioState.isPlaying
    ? `Now playing: ${track.title}`
    : `Ready: ${track.title}`;
  displays.forEach((display) => {
    display.textContent = message;
  });
}

function loadTrack(index) {
  if (!elements.audioElement || !audioState.tracks.length) {
    return;
  }
  const trackCount = audioState.tracks.length;
  const normalizedIndex = ((index % trackCount) + trackCount) % trackCount;
  audioState.currentIndex = normalizedIndex;
  const track = audioState.tracks[normalizedIndex];
  const encodedSrc = encodeURI(track.src);
  elements.audioElement.src = encodedSrc;
  elements.audioElement.load();
  audioState.initialised = true;
  updateNowPlaying();
}

function attemptPlay() {
  if (!elements.audioElement) {
    return Promise.resolve();
  }
  const playPromise = elements.audioElement.play();
  if (playPromise && typeof playPromise.then === 'function') {
    return playPromise
      .then(() => {
        audioState.isPlaying = true;
        updateMusicToggleLabel();
        updateNowPlaying();
      })
      .catch((error) => {
        console.warn('Music playback prevented:', error);
        audioState.isPlaying = false;
        updateMusicToggleLabel();
        updateNowPlaying();
      });
  }
  audioState.isPlaying = true;
  updateMusicToggleLabel();
  updateNowPlaying();
  return Promise.resolve();
}

function playNextTrack() {
  if (!audioState.tracks.length) {
    return;
  }
  const nextIndex = (audioState.currentIndex + 1) % audioState.tracks.length;
  loadTrack(nextIndex);
  attemptPlay();
}

function ensureMusicStarted() {
  if (!elements.audioElement || getMusicToggleElements().length === 0) {
    return;
  }
  if (!audioState.initialised) {
    loadTrack(audioState.currentIndex);
  }
  attemptPlay();
}

function setupAudioControls() {
  if (!elements.audioElement) {
    return;
  }

  const volumeInputs = getMusicVolumeInputs();
  const toggles = getMusicToggleElements();
  if (toggles.length === 0 && volumeInputs.length === 0) {
    return;
  }

  const initialVolumeSource = volumeInputs[0];
  const initialVolume = clamp(
    parseFloat(initialVolumeSource ? initialVolumeSource.value : elements.audioElement.volume) || 0.5,
    0,
    1
  );
  elements.audioElement.volume = initialVolume;
  volumeInputs.forEach((input) => {
    input.value = initialVolume.toString();
  });

  const handleVolumeInput = (event) => {
    const newVolume = clamp(parseFloat(event.target.value), 0, 1);
    const resolvedVolume = Number.isNaN(newVolume) ? elements.audioElement.volume : newVolume;
    elements.audioElement.volume = resolvedVolume;
    volumeInputs.forEach((input) => {
      if (input !== event.target) {
        input.value = resolvedVolume.toString();
      }
    });
  };

  volumeInputs.forEach((input) => {
    input.addEventListener('input', handleVolumeInput);
  });

  const handleToggle = () => {
    if (!audioState.initialised) {
      loadTrack(audioState.currentIndex);
    }
    if (audioState.isPlaying) {
      elements.audioElement.pause();
      audioState.isPlaying = false;
      updateMusicToggleLabel();
      updateNowPlaying();
    } else {
      attemptPlay();
    }
  };

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', handleToggle);
    toggle.setAttribute('aria-pressed', audioState.isPlaying.toString());
  });

  loadTrack(audioState.currentIndex);
  updateMusicToggleLabel();
  updateNowPlaying();

  elements.audioElement.addEventListener('ended', () => {
    audioState.isPlaying = false;
    playNextTrack();
  });

  elements.audioElement.addEventListener('play', () => {
    audioState.isPlaying = true;
    updateMusicToggleLabel();
    updateNowPlaying();
  });

  elements.audioElement.addEventListener('pause', () => {
    audioState.isPlaying = false;
    updateMusicToggleLabel();
    updateNowPlaying();
  });

  elements.audioElement.addEventListener('error', () => {
    console.error('Failed to play track, skipping to next.');
    audioState.isPlaying = false;
    playNextTrack();
  });
}

function updateSoundEffectsToggleLabel() {
  if (elements.sfxToggle) {
    const enabled = !audioState.effectsMuted;
    elements.sfxToggle.textContent = enabled ? 'Sound Effects On' : 'Sound Effects Off';
    elements.sfxToggle.setAttribute('aria-pressed', enabled.toString());
  }
  if (elements.sfxVolume) {
    elements.sfxVolume.disabled = audioState.effectsMuted;
    elements.sfxVolume.setAttribute('aria-disabled', audioState.effectsMuted.toString());
  }
  const finalVolume = audioState.effectsMuted ? 0 : clamp(audioState.effectsVolume, 0, 1);
  Object.values(soundEffects).forEach((audio) => {
    if (audio) {
      audio.volume = finalVolume;
    }
  });
}

function setupSoundEffectControls() {
  if (!elements.sfxToggle && !elements.sfxVolume) {
    return;
  }

  if (elements.sfxVolume) {
    const initialVolume = clamp(
      parseFloat(elements.sfxVolume.value) || audioState.effectsVolume,
      0,
      1
    );
    audioState.effectsVolume = initialVolume;
    elements.sfxVolume.value = initialVolume.toString();
    elements.sfxVolume.addEventListener('input', (event) => {
      const newVolume = clamp(parseFloat(event.target.value), 0, 1);
      if (Number.isNaN(newVolume)) {
        return;
      }
      audioState.effectsVolume = newVolume;
      if (newVolume > 0 && audioState.effectsMuted) {
        audioState.effectsMuted = false;
      }
      updateSoundEffectsToggleLabel();
    });
  }

  if (elements.sfxToggle) {
    elements.sfxToggle.addEventListener('click', () => {
      audioState.effectsMuted = !audioState.effectsMuted;
      updateSoundEffectsToggleLabel();
    });
  }

  updateSoundEffectsToggleLabel();
}

function loadImage(src) {
  const img = new Image();
  img.src = src;
  img.decoding = 'async';
  if (img.decode) {
    return img.decode().then(() => img);
  }
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

function stringToSeed(str) {
  if (!str) {
    return Math.floor(Math.random() * 0xffffffff);
  }
  let hash = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(a) {
  return function rng() {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashCoords(x, y, seed) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ seed;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function sampleLandMask(normalizedX, normalizedY) {
  const landMask = state.landMask;
  if (!landMask) {
    return null;
  }

  const clampedX = clamp(normalizedX, 0, 1);
  const clampedY = clamp(normalizedY, 0, 1);
  const scaledX = clampedX * (landMask.width - 1);
  const scaledY = clampedY * (landMask.height - 1);

  const x0 = Math.floor(scaledX);
  const y0 = Math.floor(scaledY);
  const x1 = Math.min(x0 + 1, landMask.width - 1);
  const y1 = Math.min(y0 + 1, landMask.height - 1);
  const tx = scaledX - x0;
  const ty = scaledY - y0;

  const idx00 = y0 * landMask.width + x0;
  const idx10 = y0 * landMask.width + x1;
  const idx01 = y1 * landMask.width + x0;
  const idx11 = y1 * landMask.width + x1;

  const v00 = landMask.data[idx00];
  const v10 = landMask.data[idx10];
  const v01 = landMask.data[idx01];
  const v11 = landMask.data[idx11];

  const top = lerp(v00, v10, tx);
  const bottom = lerp(v01, v11, tx);
  return lerp(top, bottom, ty);
}

function valueNoise(x, y, seed) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = x0 + 1;
  const y1 = y0 + 1;
  const sx = fade(x - x0);
  const sy = fade(y - y0);

  const n00 = hashCoords(x0, y0, seed);
  const n10 = hashCoords(x1, y0, seed);
  const n01 = hashCoords(x0, y1, seed);
  const n11 = hashCoords(x1, y1, seed);

  const ix0 = lerp(n00, n10, sx);
  const ix1 = lerp(n01, n11, sx);
  return lerp(ix0, ix1, sy);
}

function createProceduralMask(width, height, sampler) {
  const data = new Float32Array(width * height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const nx = (x + 0.5) / width;
      const ny = (y + 0.5) / height;
      const value = sampler(nx, ny);
      data[y * width + x] = clamp(value, 0, 1);
    }
  }
  return { width, height, data };
}

function createTwinContinentsMask() {
  const size = 512;
  return createProceduralMask(size, size, (nx, ny) => {
    const left = Math.hypot((nx - 0.32) / 0.55, (ny - 0.48) / 0.33);
    const right = Math.hypot((nx - 0.68) / 0.55, (ny - 0.52) / 0.33);
    let value = 1 - Math.min(left, right);
    value = Math.pow(clamp(value, 0, 1), 0.82);
    const saddle = Math.cos((ny - 0.5) * Math.PI * 2.2) * 0.05;
    const noise = (valueNoise(nx * 12.5 + 3.1, ny * 12.5 + 7.9, 0x9e3779b) - 0.5) * 0.12;
    const detail = (valueNoise(nx * 34.2 + 11.3, ny * 34.2 + 4.6, 0x85ebca6) - 0.5) * 0.06;
    value += saddle + noise + detail;
    return value;
  });
}

function createInlandSeaMask() {
  const size = 512;
  return createProceduralMask(size, size, (nx, ny) => {
    const dx = nx - 0.5;
    const dy = ny - 0.53;
    const distance = Math.sqrt(dx * dx + dy * dy);
    let ring = clamp((distance - 0.18) * 3.25, 0, 1);
    ring = Math.pow(ring, 0.82);
    const coastline = clamp(1 - distance * 1.05, 0, 1) * 0.4;
    let value = ring + coastline;
    value += (valueNoise(nx * 9.5 + 0.2, ny * 9.5 + 0.4, 0x6c8e9cf) - 0.5) * 0.18;
    value += (valueNoise(nx * 26.5 + 8.1, ny * 26.5 + 2.3, 0x51a7f5d) - 0.5) * 0.08;
    value -= 0.05;
    return value;
  });
}

function createArchipelagoMask() {
  const size = 512;
  return createProceduralMask(size, size, (nx, ny) => {
    const islands = [
      { x: 0.28, y: 0.32, radiusX: 0.22, radiusY: 0.18, height: 1.05, power: 1.35 },
      { x: 0.52, y: 0.28, radiusX: 0.18, radiusY: 0.16, height: 0.92, power: 1.4 },
      { x: 0.68, y: 0.38, radiusX: 0.16, radiusY: 0.2, height: 0.88, power: 1.45 },
      { x: 0.36, y: 0.62, radiusX: 0.2, radiusY: 0.18, height: 0.94, power: 1.3 },
      { x: 0.54, y: 0.58, radiusX: 0.22, radiusY: 0.2, height: 1.02, power: 1.32 },
      { x: 0.73, y: 0.57, radiusX: 0.15, radiusY: 0.17, height: 0.86, power: 1.48 },
      { x: 0.46, y: 0.44, radiusX: 0.24, radiusY: 0.22, height: 1.08, power: 1.28 }
    ];

    let sum = 0;
    for (let i = 0; i < islands.length; i += 1) {
      const island = islands[i];
      const dx = nx - island.x;
      const dy = ny - island.y;
      const distance = Math.sqrt(
        (dx * dx) / (island.radiusX * island.radiusX) +
          (dy * dy) / (island.radiusY * island.radiusY)
      );
      let influence = clamp(1 - distance, 0, 1);
      influence = Math.pow(influence, island.power) * island.height;
      sum += influence;
    }

    const jagged = (valueNoise(nx * 18.3 + 4.7, ny * 18.3 + 9.1, 0x3c6ef372) - 0.5) * 0.32;
    const detail = (valueNoise(nx * 42.7 + 12.5, ny * 42.7 + 3.8, 0xa54ff53a) - 0.5) * 0.18;
    const micro = (valueNoise(nx * 82.1 + 6.2, ny * 82.1 + 14.4, 0x510e527f) - 0.5) * 0.08;

    let value = sum * 0.7 + jagged + detail + micro;
    const clusterBias = 1 - Math.hypot(nx - 0.52, ny - 0.49) * 1.1;
    value += clusterBias * 0.08;

    const edge = Math.min(nx, 1 - nx, ny, 1 - ny);
    value -= clamp(0.2 - edge, 0, 0.2) * 3.2;
    value -= 0.46;
    return value;
  });
}

const worldGenerationProfiles = {
  normal: {
    key: 'normal',
    label: 'Normal',
    baseNoiseScaleRange: [1.6, 2.6],
    detailNoiseScaleRange: [4.2, 7.4],
    ridgeNoiseScaleRange: [7, 11.4],
    edgeTaperRange: [2.1, 2.9],
    edgeDropRange: [0.24, 0.36],
    maskInfluence: 0.38,
    seaLevelShift: 0.02,
    rainfallBias: 0
  },
  major_continent: {
    key: 'major_continent',
    label: 'Major Continent',
    baseNoiseScaleRange: [1.2, 2],
    detailNoiseScaleRange: [3.6, 6.8],
    ridgeNoiseScaleRange: [6.4, 10.6],
    edgeTaperRange: [2.4, 3.2],
    edgeDropRange: [0.28, 0.42],
    maskInfluence: 0.5,
    seaLevelShift: 0,
    rainfallBias: 0
  },
  twin_continents: {
    key: 'twin_continents',
    label: 'Twin Continents',
    baseNoiseScaleRange: [1, 1.6],
    detailNoiseScaleRange: [3.2, 5.4],
    ridgeNoiseScaleRange: [5.6, 8.4],
    edgeTaperRange: [2.2, 3],
    edgeDropRange: [0.24, 0.36],
    maskInfluence: 0.65,
    seaLevelShift: -0.02,
    rainfallBias: -0.02,
    createMask: createTwinContinentsMask
  },
  inland_sea: {
    key: 'inland_sea',
    label: 'Inland Sea',
    baseNoiseScaleRange: [1.1, 1.8],
    detailNoiseScaleRange: [3.4, 6],
    ridgeNoiseScaleRange: [6, 9.2],
    edgeTaperRange: [2.6, 3.4],
    edgeDropRange: [0.3, 0.46],
    maskInfluence: 0.62,
    seaLevelShift: 0.04,
    rainfallBias: 0.03,
    createMask: createInlandSeaMask
  },
  archipelago: {
    key: 'archipelago',
    label: 'Archipelago',
    baseNoiseScaleRange: [1.4, 2.2],
    detailNoiseScaleRange: [4, 6.6],
    ridgeNoiseScaleRange: [7.2, 11],
    edgeTaperRange: [2.1, 2.8],
    edgeDropRange: [0.22, 0.34],
    maskInfluence: 0.68,
    seaLevelShift: 0.08,
    rainfallBias: 0.05,
    createMask: createArchipelagoMask
  }
};

function octaveNoise(x, y, seed, octaves = 4, persistence = 0.5, lacunarity = 2.1) {
  let amplitude = 1;
  let frequency = 1;
  let sum = 0;
  let maxAmplitude = 0;
  for (let i = 0; i < octaves; i += 1) {
    sum += amplitude * valueNoise(x * frequency, y * frequency, seed + i * 131);
    maxAmplitude += amplitude;
    amplitude *= persistence;
    frequency *= lacunarity;
  }
  return sum / maxAmplitude;
}

function generateContinentalPlates(rng) {
  const plates = [];
  const majorTarget = 4 + Math.floor(rng() * 4);
  const fragmentTarget = 3 + Math.floor(rng() * 5);
  const totalTarget = majorTarget + fragmentTarget;
  const maxAttempts = totalTarget * 40;
  const minDistance = 0.14;
  const fragmentDistance = 0.08;

  const randomUint32 = () => Math.floor(rng() * 0xffffffff);

  for (let attempt = 0; attempt < maxAttempts && plates.length < totalTarget; attempt += 1) {
    const isFragment = plates.length >= majorTarget;
    const radiusBase = isFragment ? 0.08 + rng() * 0.14 : 0.18 + rng() * 0.24;
    const rotation = rng() * Math.PI * 2;
    const oceanChance = isFragment ? 0.25 : 0.4;
    const isOcean = rng() < oceanChance;
    const strengthBase = isOcean
      ? -(0.4 + rng() * 0.35) * (isFragment ? 0.7 : 1)
      : (0.6 + rng() * 0.55) * (isFragment ? 0.75 : 1);
    const jaggedness = isFragment ? 0.8 + rng() * 1.1 : 0.45 + rng() * 0.8;
    const turbulence = 0.4 + rng() * 0.6;

    const candidate = {
      x: clamp(rng() * 0.82 + 0.09, 0.03, 0.97),
      y: clamp(rng() * 0.82 + 0.09, 0.03, 0.97),
      radiusX: radiusBase * (0.7 + rng() * 1.6),
      radiusY: radiusBase * (0.6 + rng() * 1.4),
      falloff: 1.15 + rng() * 1.8,
      sharpness: 1.1 + rng() * 1.3,
      strength: strengthBase,
      rotation,
      cos: Math.cos(rotation),
      sin: Math.sin(rotation),
      type: isOcean ? 'ocean' : 'land',
      jaggedness,
      turbulence,
      noiseScale: isFragment ? 6 + rng() * 10 : 3 + rng() * 6,
      noiseSeed: randomUint32(),
      noiseOffsetX: rng() * 256,
      noiseOffsetY: rng() * 256
    };

    const edgeDistance = Math.min(candidate.x, 1 - candidate.x, candidate.y, 1 - candidate.y);
    const minEdge = isFragment ? 0.02 : 0.06;
    if (edgeDistance < minEdge) {
      continue;
    }

    let tooClose = false;
    for (let i = 0; i < plates.length; i += 1) {
      const existing = plates[i];
      const separation = Math.hypot(candidate.x - existing.x, candidate.y - existing.y);
      const limit = existing.type === candidate.type ? (isFragment ? fragmentDistance : minDistance) : minDistance * 0.75;
      if (separation < limit) {
        tooClose = true;
        break;
      }
    }

    if (tooClose) {
      continue;
    }

    plates.push(candidate);
  }

  if (!plates.some((plate) => plate.strength > 0)) {
    const rotation = rng() * Math.PI * 2;
    plates.push({
      x: 0.5,
      y: 0.5,
      radiusX: 0.26,
      radiusY: 0.2,
      falloff: 1.5,
      sharpness: 1.3,
      strength: 0.85,
      rotation,
      cos: Math.cos(rotation),
      sin: Math.sin(rotation),
      type: 'land',
      jaggedness: 0.7,
      turbulence: 0.6,
      noiseScale: 4.5,
      noiseSeed: randomUint32(),
      noiseOffsetX: rng() * 128,
      noiseOffsetY: rng() * 128
    });
  }

  return plates;
}

function sampleContinentalPlates(x, y, plates) {
  if (!plates || plates.length === 0) {
    return { height: 0, mask: 0, tectonic: 0 };
  }

  let landSum = 0;
  let landWeight = 0;
  let oceanSum = 0;
  let oceanWeight = 0;
  let maxLand = 0;
  let secondLand = 0;
  let maxOcean = 0;
  let secondOcean = 0;
  let variation = 0;
  let landTurbulence = 0;
  let boundaryMix = 0;

  for (let i = 0; i < plates.length; i += 1) {
    const plate = plates[i];
    const dx = x - plate.x;
    const dy = y - plate.y;
    const rotatedX = dx * plate.cos + dy * plate.sin;
    const rotatedY = dy * plate.cos - dx * plate.sin;

    const boundaryNoise = octaveNoise(
      (rotatedX + plate.noiseOffsetX) * plate.noiseScale,
      (rotatedY + plate.noiseOffsetY) * plate.noiseScale,
      plate.noiseSeed,
      3,
      0.55 + plate.turbulence * 0.25,
      2 + plate.turbulence * 0.9
    );

    const radiusScale = clamp(1 + (boundaryNoise - 0.5) * plate.jaggedness, 0.35, 2.8);
    const distX = rotatedX / (plate.radiusX * radiusScale);
    const distY = rotatedY / (plate.radiusY * radiusScale);
    const distance = Math.sqrt(distX * distX + distY * distY);

    let influence = clamp(1 - Math.pow(distance, plate.falloff), 0, 1);
    influence = Math.pow(influence, plate.sharpness);

    if (influence <= 0) {
      continue;
    }

    const contribution = influence * Math.abs(plate.strength);
    const turbulence = Math.pow(Math.abs(boundaryNoise - 0.5) * 2, 1.35) * plate.turbulence * influence;

    if (plate.strength >= 0) {
      if (contribution > maxLand) {
        secondLand = maxLand;
        maxLand = contribution;
      } else if (contribution > secondLand) {
        secondLand = contribution;
      }
      landSum += contribution;
      landWeight += Math.abs(plate.strength);
      variation += turbulence;
      landTurbulence += turbulence;
      boundaryMix += contribution * 0.75;
    } else {
      if (contribution > maxOcean) {
        secondOcean = maxOcean;
        maxOcean = contribution;
      } else if (contribution > secondOcean) {
        secondOcean = contribution;
      }
      oceanSum += contribution;
      oceanWeight += Math.abs(plate.strength);
      variation -= turbulence;
      boundaryMix += contribution * 0.45;
    }
  }

  if (landWeight === 0 && oceanWeight === 0) {
    return { height: 0, mask: 0, tectonic: 0 };
  }

  const landAvg = landWeight > 0 ? landSum / landWeight : 0;
  const oceanAvg = oceanWeight > 0 ? oceanSum / oceanWeight : 0;

  const separation = Math.max(0, maxLand - secondLand * 0.65);
  const oceanSeparation = Math.max(0, maxOcean - secondOcean * 0.7);

  let height = landAvg - oceanAvg * 0.9 + separation * 0.25 - oceanSeparation * 0.22 + variation * 0.18;
  const mask = clamp(landAvg + separation * 0.6 - oceanAvg * 0.8, 0, 1);

  height = clamp(height, -1, 1);

  const normalizedLandTurbulence = landTurbulence / (landWeight || 1);
  const totalWeight = landWeight + oceanWeight;
  const normalizedBoundaryMix = boundaryMix / (totalWeight || 1);
  const tectonicActivity = clamp(
    separation * 0.85 +
      oceanSeparation * 0.55 +
      Math.max(0, variation) * 0.4 +
      normalizedLandTurbulence * 0.3 +
      normalizedBoundaryMix * 0.15,
    0,
    1
  );

  return { height, mask, tectonic: tectonicActivity };
}

function normalizeField(field) {
  let minValue = Infinity;
  let maxValue = -Infinity;
  for (let i = 0; i < field.length; i += 1) {
    const value = field[i];
    if (value < minValue) {
      minValue = value;
    }
    if (value > maxValue) {
      maxValue = value;
    }
  }
  const range = maxValue - minValue || 1;
  for (let i = 0; i < field.length; i += 1) {
    field[i] = (field[i] - minValue) / range;
  }
  return field;
}

function applyThermalErosion(field, width, height, iterations = 3, talus = 0.035) {
  const temp = new Float32Array(field.length);
  const directions = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1]
  ];

  for (let iter = 0; iter < iterations; iter += 1) {
    temp.set(field);
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        let value = temp[idx];
        let total = value;
        let count = 1;
        for (let d = 0; d < directions.length; d += 1) {
          const nx = x + directions[d][0];
          const ny = y + directions[d][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const nIdx = ny * width + nx;
          const diff = Math.abs(value - temp[nIdx]);
          if (diff > talus) {
            total += temp[nIdx];
            count += 1;
          }
        }
        field[idx] = total / count;
      }
    }
  }

  return normalizeField(field);
}

function applyRainShadow(elevation, rainfall, width, height) {
  const adjusted = new Float32Array(rainfall);

  const sweep = (startX, endX, step) => {
    for (let y = 0; y < height; y += 1) {
      let carried = rainfall[y * width + startX];
      for (let x = startX + step; step > 0 ? x < endX : x > endX; x += step) {
        const idx = y * width + x;
        const prevIdx = y * width + (x - step);
        const slope = elevation[prevIdx] - elevation[idx];
        if (slope > 0.05) {
          carried -= slope * 0.5;
        } else if (slope < -0.05) {
          carried += (-slope) * 0.35;
        }
        carried = clamp(carried, 0, 1);
        adjusted[idx] = clamp((adjusted[idx] * 2 + carried) / 3, 0, 1);
      }
    }
  };

  sweep(0, width, 1);
  sweep(width - 1, -1, -1);

  return normalizeField(adjusted);
}

function determineAlignmentSuffix(alignment, savagery) {
  const goodThreshold = 0.33;
  const savageThreshold = 0.65;
  if (alignment > goodThreshold) {
    return savagery > savageThreshold ? '_GOODSAV' : '_GOOD';
  }
  if (alignment < -goodThreshold) {
    return savagery > savageThreshold ? '_EVILSAV' : '_EVIL';
  }
  return '';
}

function buildRiverMap(
  elevation,
  rainfall,
  drainage,
  width,
  height,
  seaLevel,
  waterMask,
  options = {}
) {
  const frequencyNormalized = clamp(
    typeof options.frequencyNormalized === 'number' ? options.frequencyNormalized : 0.5,
    0,
    1
  );
  const frequencyMultiplier = lerp(0.45, 1.75, frequencyNormalized);
  const weightThreshold = 0.12 * lerp(1.45, 0.45, frequencyNormalized);
  const majorRiverThreshold = lerp(0.45, 0.28, frequencyNormalized);
  const randomFn =
    typeof options.random === 'function'
      ? options.random
      : typeof options.rng === 'function'
      ? options.rng
      : Math.random;

  const riverMap = new Uint8Array(width * height);
  const candidates = [];
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const idx = y * width + x;
      const elev = elevation[idx];
      if (elev <= seaLevel + 0.02) {
        continue;
      }
      const sink = 1 - drainage[idx];
      const heightFactor = Math.max(0, elev - seaLevel);
      const randomness = 0.35 + randomFn() * 0.65;
      const weight = (heightFactor * 0.7 + sink * 0.3) * randomness;
      if (weight > weightThreshold) {
        candidates.push({ x, y, weight });
      }
    }
  }

  candidates.sort((a, b) => b.weight - a.weight);
  const baseSources = Math.max(8, Math.floor((width * height) / 3200));
  const sourceDensityMultiplier = lerp(1.8, 3.1, frequencyNormalized);
  const maxSources = Math.max(
    4,
    Math.round(baseSources * frequencyMultiplier * sourceDensityMultiplier)
  );
  const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]
  ];

  const oceanDistance = new Float32Array(width * height);
  oceanDistance.fill(Number.POSITIVE_INFINITY);
  const oceanMask = new Uint8Array(width * height);
  let hasOceanTiles = false;
  if (waterMask && typeof waterMask.length === 'number') {
    const queue = new Int32Array(width * height);
    let queueHead = 0;
    let queueTail = 0;
    const enqueue = (value) => {
      queue[queueTail] = value;
      queueTail += 1;
    };

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (!waterMask[idx]) {
          continue;
        }
        if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
          oceanMask[idx] = 1;
          hasOceanTiles = true;
          enqueue(idx);
        }
      }
    }

    if (queueTail === 0) {
      for (let i = 0; i < waterMask.length; i += 1) {
        if (waterMask[i]) {
          oceanMask[i] = 1;
          hasOceanTiles = true;
          enqueue(i);
        }
      }
    }

    while (queueHead < queueTail) {
      const current = queue[queueHead];
      queueHead += 1;
      const cx = current % width;
      const cy = Math.floor(current / width);
      for (let d = 0; d < directions.length; d += 1) {
        const nx = cx + directions[d][0];
        const ny = cy + directions[d][1];
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
          continue;
        }
        const nIdx = ny * width + nx;
        if (!waterMask[nIdx] || oceanMask[nIdx]) {
          continue;
        }
        oceanMask[nIdx] = 1;
        enqueue(nIdx);
      }
    }

    queueHead = 0;
    queueTail = 0;

    for (let i = 0; i < oceanMask.length; i += 1) {
      if (oceanMask[i]) {
        oceanDistance[i] = 0;
        hasOceanTiles = true;
        enqueue(i);
      }
    }

    if (queueTail === 0) {
      for (let i = 0; i < waterMask.length; i += 1) {
        if (waterMask[i]) {
          oceanDistance[i] = 0;
          hasOceanTiles = true;
          enqueue(i);
        }
      }
    }

    while (queueHead < queueTail) {
      const current = queue[queueHead];
      queueHead += 1;
      const cx = current % width;
      const cy = Math.floor(current / width);
      const baseDistance = oceanDistance[current];
      for (let d = 0; d < directions.length; d += 1) {
        const nx = cx + directions[d][0];
        const ny = cy + directions[d][1];
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
          continue;
        }
        const nIdx = ny * width + nx;
        const nextDistance = baseDistance + 1;
        if (nextDistance < oceanDistance[nIdx]) {
          oceanDistance[nIdx] = nextDistance;
          enqueue(nIdx);
        }
      }
    }
  } else {
    oceanDistance.fill(width + height);
  }

  const oceanInfluence = lerp(0.008, 0.02, frequencyNormalized);

  for (let i = 0; i < candidates.length && i < maxSources; i += 1) {
    let { x, y } = candidates[i];
    let steps = 0;
    let strength = candidates[i].weight > majorRiverThreshold ? 2 : 1;
    while (steps < width + height) {
      const idx = y * width + x;
      riverMap[idx] = Math.min(4, riverMap[idx] + strength);
      steps += 1;

      let lowestIdx = idx;
      const currentBaseValue = elevation[idx] - drainage[idx] * 0.02;
      let lowestScore = currentBaseValue;
      let lowestBaseValue = currentBaseValue;
      const currentOceanDistance = oceanDistance[idx];
      for (let d = 0; d < directions.length; d += 1) {
        const nx = x + directions[d][0];
        const ny = y + directions[d][1];
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
          continue;
        }
        const nIdx = ny * width + nx;
        const neighborBaseValue = elevation[nIdx] - drainage[nIdx] * 0.02;
        let score = neighborBaseValue;
        if (Number.isFinite(currentOceanDistance) && Number.isFinite(oceanDistance[nIdx])) {
          const distanceDelta = oceanDistance[nIdx] - currentOceanDistance;
          score += distanceDelta * oceanInfluence;
        }
        if (score < lowestScore - 1e-6) {
          lowestScore = score;
          lowestBaseValue = neighborBaseValue;
          lowestIdx = nIdx;
        } else if (Math.abs(score - lowestScore) <= 1e-6 && neighborBaseValue < lowestBaseValue) {
          lowestBaseValue = neighborBaseValue;
          lowestIdx = nIdx;
        }
      }

      if (lowestIdx === idx) {
        break;
      }

      const nextElevation = elevation[lowestIdx];
      if (nextElevation <= seaLevel) {
        const seaIdx = lowestIdx;
        riverMap[seaIdx] = Math.max(riverMap[seaIdx], strength);
        break;
      }

      x = lowestIdx % width;
      y = Math.floor(lowestIdx / width);

      if (riverMap[lowestIdx] > 0 && steps > 3) {
        break;
      }
    }
  }

  if (
    hasOceanTiles &&
    waterMask &&
    typeof waterMask.length === 'number' &&
    frequencyNormalized > 0.05
  ) {
    const coastalCandidates = [];
    const coastalTaken = new Uint8Array(width * height);

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (!oceanMask[idx]) {
          continue;
        }

        for (let d = 0; d < directions.length; d += 1) {
          const nx = x + directions[d][0];
          const ny = y + directions[d][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const nIdx = ny * width + nx;
          if (waterMask[nIdx] || coastalTaken[nIdx]) {
            continue;
          }
          if (elevation[nIdx] <= seaLevel) {
            continue;
          }
          const sink = 1 - drainage[nIdx];
          const lowlandBoost = Math.max(0, seaLevel + 0.12 - elevation[nIdx]);
          const randomness = 0.4 + randomFn() * 0.6;
          const basePotential = Math.max(0, elevation[nIdx] - seaLevel) * 0.5 + sink * 0.5;
          const weight = (basePotential + lowlandBoost * 3.2) * randomness;
          const strength = weight > majorRiverThreshold ? 2 : 1;
          coastalTaken[nIdx] = 1;
          coastalCandidates.push({
            x: nx,
            y: ny,
            weight,
            strength,
            idx: nIdx
          });
        }
      }
    }

    coastalCandidates.sort((a, b) => b.weight - a.weight);
    const oceanSourceFactor = lerp(0.18, 0.5, frequencyNormalized);
    const maxOceanSources = Math.min(
      coastalCandidates.length,
      Math.max(0, Math.round(maxSources * oceanSourceFactor))
    );

    if (maxOceanSources > 0) {
      const inlandInfluence = lerp(0.006, 0.018, frequencyNormalized);
      const maxReverseLength = Math.max(
        6,
        Math.round(
          Math.sqrt(width * height) * lerp(0.32, 0.58, frequencyNormalized)
        )
      );
      const detourProbability = lerp(0.08, 0.22, frequencyNormalized);

      for (let i = 0; i < maxOceanSources; i += 1) {
        const start = coastalCandidates[i];
        if (!start || riverMap[start.idx] > 0) {
          continue;
        }

        const pathIndices = [];
        const localVisited = new Set();
        let currentIdx = start.idx;

        while (pathIndices.length < maxReverseLength) {
          if (localVisited.has(currentIdx)) {
            break;
          }
          localVisited.add(currentIdx);
          pathIndices.push(currentIdx);

          let bestIdx = -1;
          let bestScore = Number.POSITIVE_INFINITY;
          const cx = currentIdx % width;
          const cy = Math.floor(currentIdx / width);
          const currentDistance = oceanDistance[currentIdx];
          const currentBaseValue = elevation[currentIdx] - drainage[currentIdx] * 0.02;

          for (let d = 0; d < directions.length; d += 1) {
            const nx = cx + directions[d][0];
            const ny = cy + directions[d][1];
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              continue;
            }
            const nIdx = ny * width + nx;
            if (waterMask[nIdx] || localVisited.has(nIdx)) {
              continue;
            }
            if (riverMap[nIdx] > 0 && pathIndices.length > 2) {
              continue;
            }
            const neighborDistance = oceanDistance[nIdx];
            const distanceDelta = neighborDistance - currentDistance;
            if (distanceDelta < 0) {
              continue;
            }
            if (distanceDelta === 0 && pathIndices.length > 4) {
              continue;
            }
            const neighborBaseValue =
              elevation[nIdx] - drainage[nIdx] * 0.02;
            if (
              neighborBaseValue - currentBaseValue >
              0.22 + pathIndices.length * 0.015
            ) {
              continue;
            }
            if (pathIndices.length > 4 && randomFn() < detourProbability) {
              continue;
            }

            let score = neighborBaseValue;
            score -= distanceDelta * inlandInfluence;
            score -= randomFn() * 0.02;

            if (score < bestScore) {
              bestScore = score;
              bestIdx = nIdx;
            }
          }

          if (bestIdx === -1) {
            break;
          }

          const nextDistance = oceanDistance[bestIdx];
          if (nextDistance <= currentDistance && pathIndices.length > 5) {
            break;
          }

          currentIdx = bestIdx;
        }

        if (pathIndices.length >= 3) {
          for (let p = 0; p < pathIndices.length; p += 1) {
            const idx = pathIndices[p];
            const t =
              pathIndices.length <= 1 ? 0 : p / (pathIndices.length - 1);
            const strengthAtTile = Math.max(
              1,
              Math.round(lerp(start.strength, 1, t))
            );
            riverMap[idx] = Math.max(riverMap[idx], strengthAtTile);
          }
        }
      }
    }
  }

  return riverMap;
}

const riverNeighborDefinitions = [
  { dx: 0, dy: -1, key: 'N', bit: 1 },
  { dx: 1, dy: 0, key: 'E', bit: 2 },
  { dx: 0, dy: 1, key: 'S', bit: 4 },
  { dx: -1, dy: 0, key: 'W', bit: 8 }
];

function computeEdgeConnectedWaterMask(waterMask, width, height) {
  if (!waterMask || typeof waterMask.length !== 'number') {
    return null;
  }

  const totalSize = width * height;
  if (totalSize === 0) {
    return null;
  }

  const mask = new Uint8Array(totalSize);
  const queue = new Int32Array(totalSize);
  let queueHead = 0;
  let queueTail = 0;

  const enqueue = (idx) => {
    if (mask[idx]) {
      return;
    }
    mask[idx] = 1;
    queue[queueTail] = idx;
    queueTail += 1;
  };

  for (let x = 0; x < width; x += 1) {
    const topIdx = x;
    if (waterMask[topIdx]) {
      enqueue(topIdx);
    }
    if (height > 1) {
      const bottomIdx = (height - 1) * width + x;
      if (waterMask[bottomIdx]) {
        enqueue(bottomIdx);
      }
    }
  }

  for (let y = 1; y < height - 1; y += 1) {
    const leftIdx = y * width;
    if (waterMask[leftIdx]) {
      enqueue(leftIdx);
    }
    if (width > 1) {
      const rightIdx = leftIdx + (width - 1);
      if (waterMask[rightIdx]) {
        enqueue(rightIdx);
      }
    }
  }

  if (queueTail === 0) {
    return null;
  }

  while (queueHead < queueTail) {
    const current = queue[queueHead];
    queueHead += 1;
    const cx = current % width;
    const cy = Math.floor(current / width);
    for (let i = 0; i < riverNeighborDefinitions.length; i += 1) {
      const { dx, dy } = riverNeighborDefinitions[i];
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
        continue;
      }
      const nIdx = ny * width + nx;
      if (!waterMask[nIdx] || mask[nIdx]) {
        continue;
      }
      enqueue(nIdx);
    }
  }

  return mask;
}

const riverMaskSuffixLookup = {
  0: '0',
  1: 'N',
  2: 'E',
  3: 'NE',
  4: 'S',
  5: 'NS',
  6: 'SE',
  7: 'NSE',
  8: 'W',
  9: 'NW',
  10: 'WE',
  11: 'NWE',
  12: 'SW',
  13: 'NSW',
  14: 'SWE',
  15: 'NSWE'
};

function resolveRiverTile(riverMap, width, height, x, y, waterMask, oceanMask) {
  const idx = y * width + x;
  const strength = riverMap[idx];
  if (strength === 0) {
    return null;
  }

  const prefix = 'RIVER_';

  let mask = 0;
  let riverNeighborCount = 0;
  riverNeighborDefinitions.forEach(({ dx, dy, bit }) => {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
      return;
    }
    if (riverMap[ny * width + nx] > 0) {
      mask |= bit;
      riverNeighborCount += 1;
    }
  });
  let touchesOcean = false;
  if (oceanMask && riverNeighborCount === 1) {
    for (let i = 0; i < riverNeighborDefinitions.length; i += 1) {
      const { dx, dy, bit } = riverNeighborDefinitions[i];
      if (mask & bit) {
        continue;
      }
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
        continue;
      }
      const nIdx = ny * width + nx;
      if (oceanMask[nIdx]) {
        mask |= bit;
        touchesOcean = true;
      }
    }
  }
  const suffix = riverMaskSuffixLookup[mask] || 'NSWE';
  const baseKey = `${prefix}${suffix}`;
  const majorKey = `RIVER_MAJOR_${suffix}`;
  const hasMajor = tileLookup.has(majorKey);
  const useMajor = strength >= 3 && hasMajor;

  let tileKey = useMajor ? majorKey : baseKey;

  if (!useMajor && suffix.length === 1 && suffix !== '0' && waterMask && !touchesOcean) {
    const direction = suffix;
    const mouthKey = `RIVER_MOUTH_NARROW_${direction}`;
    if (tileLookup.has(mouthKey)) {
      const neighbor = riverNeighborDefinitions.find(({ key }) => key === direction);
      if (neighbor) {
        const nx = x + neighbor.dx;
        const ny = y + neighbor.dy;
        if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
          const nIdx = ny * width + nx;
          if (waterMask[nIdx]) {
            tileKey = mouthKey;
          }
        }
      }
    }
  }

  if (useMajor && suffix.length === 1 && suffix !== '0' && waterMask && !touchesOcean) {
    const direction = suffix;
    const mouthKey = `RIVER_MAJOR_MOUTH_NARROW_${direction}`;
    if (tileLookup.has(mouthKey)) {
      const neighbor = riverNeighborDefinitions.find(({ key }) => key === direction);
      if (neighbor) {
        const nx = x + neighbor.dx;
        const ny = y + neighbor.dy;
        if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
          const nIdx = ny * width + nx;
          if (waterMask[nIdx]) {
            tileKey = mouthKey;
          }
        }
      }
    }
  }

  return {
    key: tileKey,
    mask,
    strength,
    connections: suffix,
    tileKey
  };
}

function ensureRiverConnectionsToWater(riverMap, waterMask, tiles, width, height) {
  const waterTileKey = tileLookup.has('WATER') ? 'WATER' : null;
  if (!waterTileKey) {
    return;
  }

  const visited = new Uint8Array(width * height);

  const convertToWater = (idx) => {
    if (waterMask[idx]) {
      return true;
    }
    const x = idx % width;
    const y = Math.floor(idx / width);
    const tile = tiles[y] && tiles[y][x];
    if (!tile) {
      return false;
    }
    tile.base = waterTileKey;
    tile.overlay = null;
    tile.hillOverlay = null;
    tile.structure = null;
    tile.structureName = null;
    tile.structureDetails = null;
    tile.river = null;
    tile.biomeType = null;
    tile.areaName = null;
    tile.waterDepth = 0;
    tile.coastProximity = 0;
    tile.marshProximity = 0;
    tile.desertProximity = 0;
    tile.volcanoProximity = 0;
    waterMask[idx] = 1;
    return true;
  };

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      if (visited[idx] || riverMap[idx] === 0) {
        continue;
      }

      const stack = [idx];
      const component = [];
      const endpoints = [];
      let touchesWater = false;

      while (stack.length > 0) {
        const current = stack.pop();
        if (visited[current]) {
          continue;
        }
        visited[current] = 1;
        component.push(current);
        const cx = current % width;
        const cy = Math.floor(current / width);

        let neighborCount = 0;
        riverNeighborDefinitions.forEach(({ dx, dy }) => {
          const nx = cx + dx;
          const ny = cy + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            return;
          }
          const nIdx = ny * width + nx;
          if (waterMask[nIdx]) {
            touchesWater = true;
          }
          if (riverMap[nIdx] > 0) {
            neighborCount += 1;
            if (!visited[nIdx]) {
              stack.push(nIdx);
            }
          }
        });

        if (neighborCount <= 1) {
          endpoints.push(current);
        }
      }

      if (touchesWater) {
        continue;
      }

      const candidates = endpoints.length > 0 ? endpoints : component;
      for (let i = 0; i < candidates.length; i += 1) {
        if (convertToWater(candidates[i])) {
          touchesWater = true;
          break;
        }
      }

      if (!touchesWater && component.length > 0) {
        convertToWater(component[0]);
      }
    }
  }
}

function createWorld(seedString) {
  const seedNumber = stringToSeed(seedString);
  const rng = mulberry32(seedNumber || 1);
  const width = state.settings.width;
  const height = state.settings.height;
  const chronology = ensureChronology();
  const isFirstAge = chronology && chronology.age === 1;
  const forestFrequencySetting = sanitizeFrequencyValue(
    state.settings.forestFrequency,
    defaultForestFrequency
  );
  const mountainFrequencySetting = sanitizeFrequencyValue(
    state.settings.mountainFrequency,
    defaultMountainFrequency
  );
  const riverFrequencySetting = sanitizeFrequencyValue(state.settings.riverFrequency, 50);
  const humanSettlementFrequencySetting = sanitizeFrequencyValue(
    state.settings.humanSettlementFrequency,
    50
  );
  const dwarfSettlementFrequencySetting = sanitizeFrequencyValue(
    state.settings.dwarfSettlementFrequency,
    50
  );
  const woodElfSettlementFrequencySetting = sanitizeFrequencyValue(
    state.settings.woodElfSettlementFrequency,
    50
  );
  const lizardmenSettlementFrequencySetting = sanitizeFrequencyValue(
    state.settings.lizardmenSettlementFrequency,
    50
  );
  const profile = getWorldGenerationProfile(state.settings.worldGenerationType);
  const maskInfluence = clamp(
    typeof profile.maskInfluence === 'number' ? profile.maskInfluence : 0.5,
    0,
    1
  );
  const targetWaterRatio = clamp(0.47 + (profile.seaLevelShift || 0), 0.2, 0.8);
  const rainfallBias = Number.isFinite(profile.rainfallBias) ? profile.rainfallBias : 0;
  const forestBias = clamp(
    // Normalize relative to the default slider position so negative values mean "sparser"
    // and positive values mean "denser", then clip extremes to keep the downstream math stable.
    (forestFrequencySetting - defaultForestFrequency) / Math.max(1, defaultForestFrequency),
    -1.5,
    1.5
  );
  const mountainFrequencyNormalized = clamp(mountainFrequencySetting / 100, 0, 1);
  const riverFrequencyNormalized = clamp(riverFrequencySetting / 100, 0, 1);
  const humanSettlementFrequencyNormalized = clamp(humanSettlementFrequencySetting / 100, 0, 1);
  const dwarfSettlementFrequencyNormalized = clamp(dwarfSettlementFrequencySetting / 100, 0, 1);
  const woodElfSettlementFrequencyNormalized = clamp(woodElfSettlementFrequencySetting / 100, 0, 1);
  const lizardmenSettlementFrequencyNormalized = clamp(
    lizardmenSettlementFrequencySetting / 100,
    0,
    1
  );
  const towerSettlementFrequencySetting =
    (humanSettlementFrequencySetting + dwarfSettlementFrequencySetting) / 2;
  const towerSettlementFrequencyNormalized = clamp(towerSettlementFrequencySetting / 100, 0, 1);
  const humanSettlementMultiplier = computeFrequencyMultiplier(humanSettlementFrequencySetting);
  const dwarfSettlementMultiplier = computeFrequencyMultiplier(dwarfSettlementFrequencySetting);
  const woodElfSettlementMultiplier = computeFrequencyMultiplier(woodElfSettlementFrequencySetting);
  const lizardmenSettlementMultiplier = computeFrequencyMultiplier(lizardmenSettlementFrequencySetting);
  const towerSettlementMultiplier = computeFrequencyMultiplier(towerSettlementFrequencySetting);
  const mountainBiasLinear = mountainFrequencyNormalized * 2 - 1;
  const mountainBias =
    mountainBiasLinear === 0
      ? 0
      : Math.sign(mountainBiasLinear) * Math.pow(Math.abs(mountainBiasLinear), 0.8);
  const mountainScarcity = 1 - mountainFrequencyNormalized;
  const mountainGrowthFactor = 0.42 + mountainFrequencyNormalized * 0.7;

  const continentalPlates = generateContinentalPlates(rng);
  const elevationField = new Float32Array(width * height);
  const tectonicActivityField = new Float32Array(width * height);

  const baseNoiseOffsetX = rng() * 2048;
  const baseNoiseOffsetY = rng() * 2048;
  const detailNoiseOffsetX = rng() * 4096;
  const detailNoiseOffsetY = rng() * 4096;

  const baseNoiseScale = sampleRange(rng, profile.baseNoiseScaleRange, 1.2, 2);
  const detailNoiseScale = sampleRange(rng, profile.detailNoiseScaleRange, 3.6, 6.8);
  const ridgeNoiseScale = sampleRange(rng, profile.ridgeNoiseScaleRange, 6.4, 10.6);
  const edgeTaper = sampleRange(rng, profile.edgeTaperRange, 2.4, 3.2);
  const edgeDrop = sampleRange(rng, profile.edgeDropRange, 0.28, 0.42);

  const baseNoiseSeed = (seedNumber + 0x9e3779b9) >>> 0;
  const detailNoiseSeed = (seedNumber + 0x85ebca6b) >>> 0;
  const ridgeNoiseSeed = (seedNumber + 0xc2b2ae35) >>> 0;
  const ridgeDetailSeed = (seedNumber + 0x4cf5ad43) >>> 0;
  const ridgeOrientationSeed = (seedNumber + 0x94d049bb) >>> 0;
  const ridgeDetailOffsetX = rng() * 8192;
  const ridgeDetailOffsetY = rng() * 8192;
  const ridgeOrientationOffsetX = rng() * 4096;
  const ridgeOrientationOffsetY = rng() * 4096;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const normalizedX = (x + 0.5) / width;
      const normalizedY = (y + 0.5) / height;

      const idx = y * width + x;
      const plateSample = sampleContinentalPlates(normalizedX, normalizedY, continentalPlates);
      tectonicActivityField[idx] = plateSample.tectonic;

      const baseNoise = octaveNoise(
        (normalizedX + baseNoiseOffsetX) * baseNoiseScale,
        (normalizedY + baseNoiseOffsetY) * baseNoiseScale,
        baseNoiseSeed,
        3,
        0.6,
        1.9
      );

      const detailNoise = octaveNoise(
        (normalizedX + detailNoiseOffsetX) * detailNoiseScale,
        (normalizedY + detailNoiseOffsetY) * detailNoiseScale,
        detailNoiseSeed,
        4,
        0.55,
        2.2
      );

      const ridgeNoise = octaveNoise(
        (normalizedX + detailNoiseOffsetX * 0.5) * ridgeNoiseScale,
        (normalizedY + detailNoiseOffsetY * 0.5) * ridgeNoiseScale,
        ridgeNoiseSeed,
        2,
        0.45,
        2.4
      );

      const maskSample = sampleLandMask(normalizedX, normalizedY);
      const edgeDistance = Math.min(normalizedX, 1 - normalizedX, normalizedY, 1 - normalizedY);
      const edgeFalloff = clamp(1 - edgeDistance * edgeTaper, 0, 1);

      let heightValue = plateSample.height;
      heightValue = lerp(heightValue, plateSample.mask, 0.35);
      heightValue += (baseNoise - 0.5) * (0.35 + plateSample.mask * 0.25);
      heightValue += (detailNoise - 0.5) * 0.18;
      heightValue += (ridgeNoise - 0.5) * 0.1 * plateSample.mask;
      heightValue -= edgeFalloff * edgeFalloff * edgeDrop;

      if (maskSample !== null && maskSample !== undefined) {
        heightValue = lerp(heightValue, maskSample, maskInfluence);
      }

      heightValue = clamp(heightValue, -1, 1);
      elevationField[idx] = heightValue;
    }
  }

  normalizeField(elevationField);
  normalizeField(tectonicActivityField);

  const { seaLevel } = estimateSeaLevels(elevationField, targetWaterRatio);
  const rainfallField = new Float32Array(width * height);
  const drainageField = new Float32Array(width * height);
  const rainfallBaseSeed = (seedNumber + 0x7f4a7c15) >>> 0;
  const rainfallDetailSeed = (seedNumber + 0x6c8e9cf1) >>> 0;
  const rainfallBaseScale = 2.2 + rng() * 1.8;
  const rainfallDetailScale = 5.4 + rng() * 4.1;
  const rainfallBaseOffsetX = rng() * 4096;
  const rainfallBaseOffsetY = rng() * 4096;
  const rainfallDetailOffsetX = rng() * 8192;
  const rainfallDetailOffsetY = rng() * 8192;
  const drainageNoiseSeed = (seedNumber + 0x51a7f5d3) >>> 0;
  const drainageNoiseOffsetX = rng() * 4096;
  const drainageNoiseOffsetY = rng() * 4096;
  const drainageNoiseScale = 4.3 + rng() * 3.6;
  const drainageOffsets = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1]
  ];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      const normalizedX = (x + 0.5) / width;
      const normalizedY = (y + 0.5) / height;
      const elevationValue = elevationField[idx];
      const baseRainNoise = octaveNoise(
        (normalizedX + rainfallBaseOffsetX) * rainfallBaseScale,
        (normalizedY + rainfallBaseOffsetY) * rainfallBaseScale,
        rainfallBaseSeed,
        3,
        0.6,
        2.05
      );
      const detailRainNoise = octaveNoise(
        (normalizedX + rainfallDetailOffsetX) * rainfallDetailScale,
        (normalizedY + rainfallDetailOffsetY) * rainfallDetailScale,
        rainfallDetailSeed,
        4,
        0.55,
        2.25
      );
      const latitudeInfluence = 1 - Math.abs(normalizedY - 0.5) * 1.8;
      const coastalInfluence = clamp(1 - Math.abs(elevationValue - seaLevel) * 2.4, 0, 1);
      let rainfallValue = baseRainNoise * 0.65 + detailRainNoise * 0.35;
      rainfallValue = clamp(
        rainfallValue * 0.55 + latitudeInfluence * 0.25 + coastalInfluence * 0.2 + rainfallBias,
        0,
        1
      );
      rainfallField[idx] = rainfallValue;

      let outwardSlope = 0;
      let inwardSlope = 0;
      let neighborCount = 0;
      for (let i = 0; i < drainageOffsets.length; i += 1) {
        const nx = x + drainageOffsets[i][0];
        const ny = y + drainageOffsets[i][1];
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
          continue;
        }
        const nIdx = ny * width + nx;
        const diff = elevationValue - elevationField[nIdx];
        if (diff > 0) {
          outwardSlope += diff;
        } else {
          inwardSlope += -diff;
        }
        neighborCount += 1;
      }
      const slopeAverage = neighborCount > 0 ? outwardSlope / neighborCount : 0;
      const basinAverage = neighborCount > 0 ? inwardSlope / neighborCount : 0;
      const slopeComponent = clamp(slopeAverage * 5.2, 0, 1);
      const basinComponent = clamp(basinAverage * 3.2, 0, 1);
      const drainageNoise = octaveNoise(
        (normalizedX + drainageNoiseOffsetX) * drainageNoiseScale,
        (normalizedY + drainageNoiseOffsetY) * drainageNoiseScale,
        drainageNoiseSeed,
        3,
        0.6,
        2.2
      );
      let drainageValue = slopeComponent * 0.7 + (1 - basinComponent) * 0.3;
      drainageValue = clamp(drainageValue * 0.68 + drainageNoise * 0.32, 0, 1);
      if (elevationValue <= seaLevel) {
        drainageValue = 1;
      }
      drainageField[idx] = drainageValue;
    }
  }

  const adjustedRainfall = applyRainShadow(elevationField, rainfallField, width, height);
  rainfallField.set(adjustedRainfall);
  normalizeField(drainageField);
  const grassTileKey = resolveTileName('GRASS');
  const hasMarshTile = tileLookup.has('MARSH');
  const marshTileKey = hasMarshTile ? 'MARSH' : grassTileKey;
  const waterTileKey = resolveTileName('WATER');
  const hasSnowTile = tileLookup.has('SNOW');
  const snowTileKey = hasSnowTile ? 'SNOW' : grassTileKey;
  // Enable desert generation so sand tiles can appear on the world map.
  const sandGenerationEnabled = true;
  const hasSandTile = sandGenerationEnabled && tileLookup.has('SAND');
  const sandTileKey = hasSandTile ? 'SAND' : grassTileKey;
  const oasisTileKey = hasSandTile && tileLookup.has('OASIS') ? 'OASIS' : null;
  const hasBadlandsTile = sandGenerationEnabled && tileLookup.has('BADLANDS');
  const badlandsTileKey = hasBadlandsTile ? 'BADLANDS' : sandTileKey;
  const hasStoneTile = tileLookup.has('STONE');
  const stoneTileKey = hasStoneTile ? 'STONE' : grassTileKey;
  const landBaseKeys = new Set([grassTileKey]);
  if (hasSnowTile) {
    landBaseKeys.add(snowTileKey);
  }
  if (hasSandTile) {
    landBaseKeys.add(sandTileKey);
  }
  if (hasBadlandsTile) {
    landBaseKeys.add(badlandsTileKey);
  }
  if (hasStoneTile) {
    landBaseKeys.add(stoneTileKey);
  }
  if (hasMarshTile) {
    landBaseKeys.add(marshTileKey);
  }
  const snowLatitudeStart = 0.7;
  const snowLatitudeFull = 0.86;
  const snowLatitudeRange = Math.max(snowLatitudeFull - snowLatitudeStart, 0.0001);
  const snowNoiseSeed = (seedNumber + 0x27d4eb2d) >>> 0;
  const snowNoiseScale = 5.3 + rng() * 3.2;
  const snowNoiseOffsetX = rng() * 4096;
  const snowNoiseOffsetY = rng() * 4096;

  const computeSnowPresence = (normalizedX, normalizedY, heightValue) => {
    const latitude = 1 - normalizedY;
    if (latitude >= snowLatitudeFull) {
      return true;
    }
    if (latitude > snowLatitudeStart) {
      const snowBandFactor = clamp((latitude - snowLatitudeStart) / snowLatitudeRange, 0, 1);
      const elevationFactor = clamp((heightValue - seaLevel) * 3.8, 0, 1);
      const coverage = clamp(snowBandFactor * 0.7 + elevationFactor * 0.3, 0, 1);
      const snowNoise = octaveNoise(
        (normalizedX + snowNoiseOffsetX) * snowNoiseScale,
        (normalizedY + snowNoiseOffsetY) * snowNoiseScale,
        snowNoiseSeed,
        3,
        0.55,
        2.2
      );
      return snowNoise < coverage;
    }
    return false;
  };

  const icebergOverlayKeys = Object.keys(icebergTileCoords).filter((key) => tileLookup.has(key));
  const hasIcebergOverlay = icebergOverlayKeys.length > 0;
  const needSnowPresenceField = hasSnowTile || hasIcebergOverlay;
  const snowPresenceField = needSnowPresenceField ? new Uint8Array(width * height) : null;
  const icebergVariantSeed = hasIcebergOverlay ? (seedNumber + 0x3d0e12f7) >>> 0 : 0;
  const icebergPresenceSeed = hasIcebergOverlay ? (seedNumber + 0x5ad1f32b) >>> 0 : 0;
  let snowDistanceField = null;

  const marshNoiseSeed = hasMarshTile ? (seedNumber + 0x1922b3a5) >>> 0 : 0;
  const marshNoiseScale = hasMarshTile ? 2.2 + rng() * 1.6 : 1;
  const marshNoiseOffsetX = hasMarshTile ? rng() * 4096 : 0;
  const marshNoiseOffsetY = hasMarshTile ? rng() * 4096 : 0;
  const marshWarpSeedX = hasMarshTile ? (seedNumber + 0x0c1b9d17) >>> 0 : 0;
  const marshWarpSeedY = hasMarshTile ? (seedNumber + 0x91e10dac) >>> 0 : 0;
  const marshWarpScale = hasMarshTile ? 2.6 + rng() * 2.4 : 1;
  const marshWarpStrength = hasMarshTile ? 0.08 + rng() * 0.12 : 0;
  const marshWarpOffsetX = hasMarshTile ? rng() * 4096 : 0;
  const marshWarpOffsetY = hasMarshTile ? rng() * 4096 : 0;
  const marshSuitabilitySeed = hasMarshTile ? (seedNumber + 0x243f6a88) >>> 0 : 0;
  const marshSuitabilityScale = hasMarshTile ? 2.8 + rng() * 2.6 : 1;
  const marshSuitabilityOffsetX = hasMarshTile ? rng() * 4096 : 0;
  const marshSuitabilityOffsetY = hasMarshTile ? rng() * 4096 : 0;
  const marshSuitabilityStrength = hasMarshTile ? 0.16 + rng() * 0.14 : 0;
  const marshVariationSeed = hasMarshTile ? (seedNumber + 0x13198a2e) >>> 0 : 0;
  const marshVariationScale = hasMarshTile ? 3.4 + rng() * 3 : 1;
  const marshVariationOffsetX = hasMarshTile ? rng() * 4096 : 0;
  const marshVariationOffsetY = hasMarshTile ? rng() * 4096 : 0;
  const marshVariationStrength = hasMarshTile ? 0.12 + rng() * 0.11 : 0;
  const marshThresholdSeed = hasMarshTile ? (seedNumber + 0xa4093822) >>> 0 : 0;
  const marshThresholdScale = hasMarshTile ? 2.6 + rng() * 2.8 : 1;
  const marshThresholdOffsetX = hasMarshTile ? rng() * 4096 : 0;
  const marshThresholdOffsetY = hasMarshTile ? rng() * 4096 : 0;
  const marshThresholdStrength = hasMarshTile ? 0.05 + rng() * 0.05 : 0;
  const marshDistributionStrength = hasMarshTile ? 0.1 + rng() * 0.1 : 0;
  const baseMarshThreshold = 0.6;
  const marshSuitabilityField = hasMarshTile ? new Float32Array(width * height) : null;
  const marshMaskField = hasMarshTile ? new Uint8Array(width * height) : null;
  const desertNoiseSeed = hasSandTile ? (seedNumber + 0x51b74f03) >>> 0 : 0;
  const desertNoiseScale = hasSandTile ? 3.8 + rng() * 2.6 : 1;
  const desertNoiseOffsetX = hasSandTile ? rng() * 4096 : 0;
  const desertNoiseOffsetY = hasSandTile ? rng() * 4096 : 0;
  const desertWarpSeedX = hasSandTile ? (seedNumber + 0x2a58d2a5) >>> 0 : 0;
  const desertWarpSeedY = hasSandTile ? (seedNumber + 0x165667b1) >>> 0 : 0;
  const desertWarpScale = hasSandTile ? 2.2 + rng() * 2.6 : 1;
  const desertWarpStrength = hasSandTile ? 0.12 + rng() * 0.18 : 0;
  const desertWarpOffsetX = hasSandTile ? rng() * 4096 : 0;
  const desertWarpOffsetY = hasSandTile ? rng() * 4096 : 0;
  const desertHeatSeed = hasSandTile ? (seedNumber + 0x3b1d23c7) >>> 0 : 0;
  const desertHeatScale = hasSandTile ? 3.1 + rng() * 3.3 : 1;
  const desertHeatOffsetX = hasSandTile ? rng() * 4096 : 0;
  const desertHeatOffsetY = hasSandTile ? rng() * 4096 : 0;
  const desertBandSeed = hasSandTile ? (seedNumber + 0x6a09e667) >>> 0 : 0;
  const desertBandScale = hasSandTile ? 1.4 + rng() * 1.6 : 1;
  const desertBandOffsetX = hasSandTile ? rng() * 2048 : 0;
  const desertBandOffsetY = hasSandTile ? rng() * 2048 : 0;
  const desertBandStrength = hasSandTile ? 0.12 + rng() * 0.18 : 0;
  const desertBandSeedSecondary = hasSandTile ? (seedNumber + 0x1f83d9ab) >>> 0 : 0;
  const desertBandSeedTertiary = hasSandTile ? (seedNumber + 0x5be0cd19) >>> 0 : 0;
  const desertBandScaleSecondary = hasSandTile ? desertBandScale * (0.85 + rng() * 0.5) : 1;
  const desertBandScaleTertiary = hasSandTile ? desertBandScale * (0.75 + rng() * 0.6) : 1;
  const desertBandOffsetXSecondary = hasSandTile ? rng() * 2048 : 0;
  const desertBandOffsetYSecondary = hasSandTile ? rng() * 2048 : 0;
  const desertBandOffsetXTertiary = hasSandTile ? rng() * 2048 : 0;
  const desertBandOffsetYTertiary = hasSandTile ? rng() * 2048 : 0;
  const desertBandRotation = hasSandTile ? rng() * Math.PI * 2 : 0;
  const desertBandRotationSecondary = hasSandTile ? rng() * Math.PI * 2 : 0;
  const desertBandCos = Math.cos(desertBandRotation);
  const desertBandSin = Math.sin(desertBandRotation);
  const desertBandCosSecondary = Math.cos(desertBandRotationSecondary);
  const desertBandSinSecondary = Math.sin(desertBandRotationSecondary);
  const desertSuitabilitySeed = hasSandTile ? (seedNumber + 0xbb67ae85) >>> 0 : 0;
  const desertSuitabilityScale = hasSandTile ? 2.8 + rng() * 2.8 : 1;
  const desertSuitabilityOffsetX = hasSandTile ? rng() * 8192 : 0;
  const desertSuitabilityOffsetY = hasSandTile ? rng() * 8192 : 0;
  const desertSuitabilityStrength = hasSandTile ? 0.18 + rng() * 0.15 : 0;
  const desertThresholdSeed = hasSandTile ? (seedNumber + 0x84caa73d) >>> 0 : 0;
  const desertThresholdScale = hasSandTile ? 3.6 + rng() * 3.2 : 1;
  const desertThresholdOffsetX = hasSandTile ? rng() * 4096 : 0;
  const desertThresholdOffsetY = hasSandTile ? rng() * 4096 : 0;
  const desertThresholdStrength = hasSandTile ? 0.05 + rng() * 0.06 : 0;
  const desertVariationSeed = hasSandTile ? (seedNumber + 0x7c3f0a5b) >>> 0 : 0;
  const desertVariationScale = hasSandTile ? 4.4 + rng() * 3.8 : 1;
  const desertVariationOffsetX = hasSandTile ? rng() * 4096 : 0;
  const desertVariationOffsetY = hasSandTile ? rng() * 4096 : 0;
  const desertVariationStrength = hasSandTile ? 0.08 + rng() * 0.07 : 0;
  const desertSuitabilityField = hasSandTile ? new Float32Array(width * height) : null;
  const desertHeatField = hasSandTile ? new Float32Array(width * height) : null;
  const desertMask = hasSandTile ? new Uint8Array(width * height) : null;
  const badlandsMask = hasBadlandsTile ? new Uint8Array(width * height) : null;
  const desertBadlandsSeed = hasBadlandsTile ? (seedNumber + 0x428a2f98) >>> 0 : 0;
  const desertBadlandsScale = hasBadlandsTile ? 3.4 + rng() * 3.6 : 1;
  const desertBadlandsOffsetX = hasBadlandsTile ? rng() * 4096 : 0;
  const desertBadlandsOffsetY = hasBadlandsTile ? rng() * 4096 : 0;

  const sampleLatitudeWarp = (normalizedX, normalizedY, latitude) => {
    if (!hasSandTile || desertWarpStrength <= 0) {
      return { warpX: 0, warpY: 0, warpedLatitude: latitude };
    }
    const warpSampleX = octaveNoise(
      (normalizedX + desertWarpOffsetX) * desertWarpScale,
      (normalizedY + desertWarpOffsetY) * desertWarpScale,
      desertWarpSeedX,
      3,
      0.55,
      2.05
    );
    const warpSampleY = octaveNoise(
      (normalizedX + desertWarpOffsetX + 37.71) * (desertWarpScale * 1.1),
      (normalizedY + desertWarpOffsetY + 11.53) * (desertWarpScale * 0.92),
      desertWarpSeedY,
      3,
      0.55,
      2.05
    );
    const warpX = (warpSampleX * 2 - 1) * desertWarpStrength;
    const warpY = (warpSampleY * 2 - 1) * desertWarpStrength;
    return { warpX, warpY, warpedLatitude: clamp(latitude + warpY * 0.8, 0, 1) };
  };

  const calculateMarshSuitability = (
    x,
    y,
    heightValue,
    rainfallValue,
    drainageValue,
    recordFields
  ) => {
    const idx = y * width + x;
    if (!hasMarshTile || heightValue <= seaLevel) {
      if (recordFields && marshSuitabilityField) {
        marshSuitabilityField[idx] = 0;
      }
      if (recordFields && marshMaskField) {
        marshMaskField[idx] = 0;
      }
      return { score: -Infinity, threshold: baseMarshThreshold, qualifies: false };
    }
    const normalizedX = (x + 0.5) / width;
    const normalizedY = (y + 0.5) / height;
    if (rainfallValue === undefined) {
      rainfallValue = rainfallField[idx];
    }
    if (drainageValue === undefined) {
      drainageValue = drainageField[idx];
    }
    const latitude = 1 - normalizedY;
    const { warpedLatitude } = sampleLatitudeWarp(normalizedX, normalizedY, latitude);
    const equatorialAlignment = clamp(1 - Math.abs(warpedLatitude - 0.5) * 2, 0, 1);
    const elevationAboveSea = heightValue - seaLevel;
    const positiveElevation = Math.max(0, elevationAboveSea);
    const elevationPenalty = clamp(positiveElevation * 3.4, 0, 1);
    const heat = clamp(equatorialAlignment * 0.6 + (1 - elevationPenalty) * 0.4, 0, 1);
    const wetness = clamp(rainfallValue * 0.75 + (1 - drainageValue) * 0.25, 0, 1);
    const lowlandFactor = clamp(1 - positiveElevation * 4.2, 0, 1);
    const baseSuitability = clamp(wetness * 0.68 + lowlandFactor * 0.2 + heat * 0.12, 0, 1);
    if (wetness <= 0.55 || lowlandFactor <= 0.22 || heat <= 0.45) {
      if (recordFields && marshSuitabilityField) {
        marshSuitabilityField[idx] = baseSuitability;
      }
      if (recordFields && marshMaskField) {
        marshMaskField[idx] = 0;
      }
      return { score: -Infinity, threshold: baseMarshThreshold, qualifies: false };
    }
    let warpX = 0;
    let warpY = 0;
    if (marshWarpStrength > 0) {
      const warpSampleX = octaveNoise(
        (normalizedX + marshWarpOffsetX) * marshWarpScale,
        (normalizedY + marshWarpOffsetY) * marshWarpScale,
        marshWarpSeedX,
        3,
        0.55,
        2.05
      );
      const warpSampleY = octaveNoise(
        (normalizedX + marshWarpOffsetX + 17.31) * (marshWarpScale * 0.94),
        (normalizedY + marshWarpOffsetY + 23.77) * (marshWarpScale * 1.06),
        marshWarpSeedY,
        3,
        0.55,
        2.05
      );
      warpX = (warpSampleX * 2 - 1) * marshWarpStrength;
      warpY = (warpSampleY * 2 - 1) * marshWarpStrength;
    }
    let suitability = baseSuitability;
    if (marshSuitabilityStrength > 0) {
      const suitabilityNoise =
        octaveNoise(
          (normalizedX + warpX + marshSuitabilityOffsetX) * marshSuitabilityScale,
          (normalizedY + warpY + marshSuitabilityOffsetY) * marshSuitabilityScale,
          marshSuitabilitySeed,
          4,
          0.55,
          2.15
        ) *
          2 -
        1;
      suitability = clamp(suitability + suitabilityNoise * marshSuitabilityStrength, 0, 1);
    }
    if (marshVariationStrength > 0) {
      const variationNoise =
        octaveNoise(
          (normalizedX + warpX + marshVariationOffsetX) * marshVariationScale,
          (normalizedY + warpY + marshVariationOffsetY) * marshVariationScale,
          marshVariationSeed,
          4,
          0.55,
          2.1
        ) *
          2 -
        1;
      suitability = clamp(suitability + variationNoise * marshVariationStrength, 0, 1);
    }
    if (marshDistributionStrength > 0) {
      const distributionNoise =
        octaveNoise(
          (normalizedX + warpX + marshNoiseOffsetX) * marshNoiseScale,
          (normalizedY + warpY + marshNoiseOffsetY) * marshNoiseScale,
          marshNoiseSeed,
          3,
          0.55,
          2.15
        ) *
          2 -
        1;
      suitability = clamp(suitability + distributionNoise * marshDistributionStrength, 0, 1);
    }
    let threshold = baseMarshThreshold;
    if (marshThresholdStrength > 0) {
      const thresholdNoise =
        octaveNoise(
          (normalizedX + warpX + marshThresholdOffsetX) * marshThresholdScale,
          (normalizedY + warpY + marshThresholdOffsetY) * marshThresholdScale,
          marshThresholdSeed,
          3,
          0.55,
          2.1
        ) *
          2 -
        1;
      threshold = clamp(threshold + thresholdNoise * marshThresholdStrength, 0.5, 0.7);
    }
    const qualifies = suitability > threshold;
    if (recordFields && marshSuitabilityField) {
      marshSuitabilityField[idx] = suitability;
    }
    if (recordFields && marshMaskField) {
      marshMaskField[idx] = qualifies ? 1 : 0;
    }
    return { score: suitability, threshold, qualifies };
  };

  const computeMarshSuitabilityScore = (x, y, heightValue) => {
    const idx = y * width + x;
    const rainfallValue = rainfallField[idx];
    const drainageValue = drainageField[idx];
    return calculateMarshSuitability(
      x,
      y,
      heightValue,
      rainfallValue,
      drainageValue,
      false
    ).score;
  };

  const determineLandBaseTile = (x, y, heightValue) => {
    const normalizedX = (x + 0.5) / width;
    const normalizedY = (y + 0.5) / height;
    const latitude = 1 - normalizedY;
    const { warpX, warpY, warpedLatitude } = sampleLatitudeWarp(normalizedX, normalizedY, latitude);
    const idx = y * width + x;

    if (hasSandTile) {
      desertSuitabilityField[idx] = 0;
      desertMask[idx] = 0;
    }
    if (hasMarshTile) {
      marshSuitabilityField[idx] = 0;
      marshMaskField[idx] = 0;
    }

    if (hasSnowTile && computeSnowPresence(normalizedX, normalizedY, heightValue)) {
      return snowTileKey;
    }

    const rainfallValue = rainfallField[idx];
    const drainageValue = drainageField[idx];
    if (hasMarshTile) {
      const marshEvaluation = calculateMarshSuitability(
        x,
        y,
        heightValue,
        rainfallValue,
        drainageValue,
        true
      );
      if (marshEvaluation.qualifies) {
        return marshTileKey;
      }
    }

    if (hasSandTile) {
      const aridity = clamp(1 - rainfallValue * 1.2, 0, 1);
      let equatorialAlignment = clamp(1 - Math.abs(warpedLatitude - 0.5) * 2, 0, 1);
      if (desertBandStrength > 0) {
        const bandNoisePrimary = octaveNoise(
          (normalizedX + desertBandOffsetX) * desertBandScale,
          (normalizedY + desertBandOffsetY) * desertBandScale,
          desertBandSeed,
          4,
          0.55,
          2.1
        );
        const centeredX = normalizedX - 0.5;
        const centeredY = normalizedY - 0.5;
        const rotatedPrimaryX = centeredX * desertBandCos - centeredY * desertBandSin;
        const rotatedPrimaryY = centeredX * desertBandSin + centeredY * desertBandCos;
        const bandNoiseSecondary = octaveNoise(
          (rotatedPrimaryX + 0.5 + desertBandOffsetXSecondary) * desertBandScaleSecondary,
          (rotatedPrimaryY + 0.5 + desertBandOffsetYSecondary) * desertBandScaleSecondary,
          desertBandSeedSecondary,
          4,
          0.55,
          2.1
        );
        const rotatedSecondaryX = centeredX * desertBandCosSecondary - centeredY * desertBandSinSecondary;
        const rotatedSecondaryY = centeredX * desertBandSinSecondary + centeredY * desertBandCosSecondary;
        const bandNoiseTertiary = octaveNoise(
          (rotatedSecondaryX + 0.5 + desertBandOffsetXTertiary) * desertBandScaleTertiary,
          (rotatedSecondaryY + 0.5 + desertBandOffsetYTertiary) * desertBandScaleTertiary,
          desertBandSeedTertiary,
          4,
          0.55,
          2.1
        );
        const combinedBandNoise = (bandNoisePrimary + bandNoiseSecondary + bandNoiseTertiary) / 3;
        const bandWarp = (combinedBandNoise * 2 - 1) * desertBandStrength;
        equatorialAlignment = clamp(equatorialAlignment + bandWarp, 0, 1);
      }
      const elevationFactor = clamp((heightValue - seaLevel) * 2.6, 0, 1);
      const desertHeatNoise =
        (octaveNoise(
          (normalizedX + warpX + desertHeatOffsetX) * desertHeatScale,
          (normalizedY + warpY + desertHeatOffsetY) * desertHeatScale,
          desertHeatSeed,
          4,
          0.55,
          2.2
        ) *
          2 -
          1) *
        0.25;
      const heat = clamp(equatorialAlignment * 0.55 + (1 - elevationFactor) * 0.3 + desertHeatNoise, 0, 1);
      if (desertHeatField) {
        desertHeatField[idx] = heat;
      }
      let suitability = clamp(aridity * 0.68 + heat * 0.42, 0, 1);
      if (desertSuitabilityStrength > 0) {
        const suitabilityNoise =
          octaveNoise(
            (normalizedX + warpX + desertSuitabilityOffsetX) * desertSuitabilityScale,
            (normalizedY + warpY + desertSuitabilityOffsetY) * desertSuitabilityScale,
            desertSuitabilitySeed,
            4,
            0.55,
            2.2
          ) *
            2 -
          1;
        suitability = clamp(
          suitability + suitabilityNoise * desertSuitabilityStrength,
            0,
            1
        );
      }
      if (desertVariationStrength > 0) {
        const variationNoise =
          octaveNoise(
            (normalizedX + warpX + desertVariationOffsetX) * desertVariationScale,
            (normalizedY + warpY + desertVariationOffsetY) * desertVariationScale,
            desertVariationSeed,
            4,
            0.55,
            2.15
          ) *
            2 -
          1;
        suitability = clamp(
          suitability + variationNoise * desertVariationStrength,
          0,
          1
        );
      }
      desertSuitabilityField[idx] = suitability;
      desertMask[idx] = 0;
      if (suitability > 0.52) {
        const desertNoise = octaveNoise(
          (normalizedX + warpX + desertNoiseOffsetX) * desertNoiseScale,
          (normalizedY + warpY + desertNoiseOffsetY) * desertNoiseScale,
          desertNoiseSeed,
          3,
          0.55,
          2.15
        );
        let latitudeThreshold = lerp(0.58, 0.52, equatorialAlignment);
        if (desertThresholdStrength > 0) {
          const thresholdNoise =
            octaveNoise(
              (normalizedX + warpX + desertThresholdOffsetX) * desertThresholdScale,
              (normalizedY + warpY + desertThresholdOffsetY) * desertThresholdScale,
              desertThresholdSeed,
              3,
              0.55,
              2.1
            ) *
              2 -
            1;
          latitudeThreshold = clamp(
            latitudeThreshold + thresholdNoise * desertThresholdStrength,
            0.45,
            0.65
          );
        }
        if (desertNoise < suitability && suitability > latitudeThreshold) {
          desertMask[idx] = 1;
          return sandTileKey;
        }
      }
    }

    return grassTileKey;
  };

  const isLandBaseTile = (baseKey) => landBaseKeys.has(baseKey);
  const tiles = Array.from(
    { length: height },
    () =>
      Array.from({ length: width }, () => ({
        base: grassTileKey,
        overlay: null,
        hillOverlay: null,
        structure: null,
        structureName: null,
        structureDetails: null,
        river: null,
        biomeType: null,
        areaName: null,
        waterDepth: 0,
        coastProximity: 0,
        marshProximity: 0,
        desertProximity: 0,
        volcanoProximity: 0,
        elevation: 0,
        temperature: 0,
        moisture: 0
      }))
  );
  const dwarfholds = [];
  const mines = [];
  const hillholds = [];
  const towns = [];
  const towers = [];
  const caves = [];
  const evilWizardTowers = [];
  const towerProximityPoints = [];
  const woodElfGroves = [];
  const lizardmenCities = [];
  const orcCamps = [];
  const travelerCamps = [];
  const dungeons = [];
  const monasteries = [];
  const castles = [];
  const saintShrines = [];
  const roadsideTaverns = [];
  const hamletPoints = [];
  const hamletPlacementStats = { grass: 0, snow: 0 };
  const recordHamletPlacement = (x, y, isSnow) => {
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return;
    }
    hamletPoints.push({ x, y });
    if (isSnow) {
      hamletPlacementStats.snow += 1;
    } else {
      hamletPlacementStats.grass += 1;
    }
  };
  const recordTowerProximityPoint = (x, y) => {
    if (Number.isFinite(x) && Number.isFinite(y)) {
      towerProximityPoints.push({ x, y });
    }
  };
  const computeNearestDistanceSq = (x, y, points) => {
    if (!Array.isArray(points) || points.length === 0) {
      return Infinity;
    }
    let best = Infinity;
    for (let i = 0; i < points.length; i += 1) {
      const point = points[i];
      if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) {
        continue;
      }
      const dx = x - point.x;
      const dy = y - point.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < best) {
        best = distSq;
      }
    }
    return best;
  };
  const findNearestPointWithDetails = (x, y, points) => {
    if (!Array.isArray(points) || points.length === 0) {
      return null;
    }
    let bestPoint = null;
    let bestDistanceSq = Infinity;
    for (let i = 0; i < points.length; i += 1) {
      const point = points[i];
      if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) {
        continue;
      }
      const dx = x - point.x;
      const dy = y - point.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < bestDistanceSq) {
        bestDistanceSq = distSq;
        bestPoint = point;
      }
    }
    if (bestPoint === null) {
      return null;
    }
    return {
      point: bestPoint,
      distanceSq: bestDistanceSq,
      distance: Math.sqrt(bestDistanceSq)
    };
  };
  const waterMask = new Uint8Array(width * height);
  const hasMountainTile = tileLookup.has('MOUNTAIN');
  const mountainOverlayKey = hasMountainTile ? 'MOUNTAIN' : null;
  const mountainPeakKey = hasMountainTile && tileLookup.has('MOUNTAIN_PEAK') ? 'MOUNTAIN_PEAK' : null;
  const activeVolcanoKey = hasMountainTile && tileLookup.has('ACTIVE_VOLCANO') ? 'ACTIVE_VOLCANO' : null;
  const dormantVolcanoKey = hasMountainTile && tileLookup.has('VOLCANO') ? 'VOLCANO' : null;
  const volcanoOverlayKeys = hasMountainTile
    ? [activeVolcanoKey, dormantVolcanoKey].filter(Boolean)
    : [];
  const mountainPeakHeightThreshold = 0.97;
  const mountainTopVariantKeys = hasMountainTile
    ? ['MOUNTAIN_TOP_A', 'MOUNTAIN_TOP_B'].filter((key) => tileLookup.has(key))
    : [];
  const mountainBottomVariantKeys = hasMountainTile
    ? ['MOUNTAIN_BOTTOM_A', 'MOUNTAIN_BOTTOM_B'].filter((key) => tileLookup.has(key))
    : [];
  const mountainOverlayKeySet = hasMountainTile
    ? new Set([
        mountainOverlayKey,
        mountainPeakKey,
        ...mountainTopVariantKeys,
        ...mountainBottomVariantKeys,
        ...volcanoOverlayKeys
      ].filter(Boolean))
    : new Set();
  const isMountainOverlay = (overlayKey) =>
    overlayKey != null && mountainOverlayKeySet.has(overlayKey);
  let mountainBaseThreshold = hasMountainTile ? Math.min(Math.max(seaLevel + 0.1, 0.58), 0.82) : 1;
  let mountainFullThreshold = hasMountainTile ? Math.min(0.98, mountainBaseThreshold + 0.35) : 1;
  let mountainRange = hasMountainTile ? Math.max(mountainFullThreshold - mountainBaseThreshold, 0.0001) : 1;
  if (hasMountainTile) {
    const thresholdShift = mountainBias * 0.18;
    const minBaseThreshold = Math.min(
      Math.max(seaLevel + 0.08 + mountainScarcity * 0.05, 0.5),
      0.92
    );
    mountainBaseThreshold = clamp(mountainBaseThreshold - thresholdShift, minBaseThreshold, 0.92);
    mountainFullThreshold = clamp(
      mountainFullThreshold - thresholdShift * 1.3,
      mountainBaseThreshold + 0.12,
      0.99
    );
    mountainRange = Math.max(mountainFullThreshold - mountainBaseThreshold, 0.0001);
  }
  let mountainScores = null;
  let mountainCandidateThreshold = null;
  let mountainMask = null;
  let mountainHeightField = null;
  const cardinalOffsets = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]
  ];
  const neighborOffsets8 = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1]
  ];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      const heightValue = elevationField[idx];
      const isWater = heightValue <= seaLevel;
      waterMask[idx] = isWater ? 1 : 0;
      const tile = tiles[y][x];
      tile.base = isWater ? waterTileKey : determineLandBaseTile(x, y, heightValue);
      tile.overlay = null;
      tile.hillOverlay = null;
      tile.structure = null;
      tile.structureName = null;
      tile.structureDetails = null;
      tile.river = null;
      tile.biomeType = null;
      tile.areaName = null;
      tile.waterDepth = 0;
      tile.coastProximity = 0;
      tile.desertProximity = 0;
      tile.volcanoProximity = 0;
      tile.elevation = heightValue;
    }
  }

  if (hasSandTile) {
    const isAdjacentToWater = (x, y) => {
      for (let i = 0; i < neighborOffsets8.length; i += 1) {
        const nx = x + neighborOffsets8[i][0];
        const ny = y + neighborOffsets8[i][1];
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
          continue;
        }
        const nIdx = ny * width + nx;
        if (waterMask[nIdx]) {
          return true;
        }
      }
      return false;
    };

    const hasAdjacentSand = (x, y, excludeIndices = null) => {
      for (let i = 0; i < neighborOffsets8.length; i += 1) {
        const nx = x + neighborOffsets8[i][0];
        const ny = y + neighborOffsets8[i][1];
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
          continue;
        }
        const nIdx = ny * width + nx;
        if (excludeIndices && excludeIndices.has(nIdx)) {
          continue;
        }
        if (tiles[ny][nx].base === sandTileKey) {
          return true;
        }
      }
      return false;
    };

    const blurIterations = 2;
    const blurRadius = 2;
    const smoothingSamples = [];
    for (let dy = -blurRadius; dy <= blurRadius; dy += 1) {
      for (let dx = -blurRadius; dx <= blurRadius; dx += 1) {
        const distance = Math.sqrt(dx * dx + dy * dy);
        const weight = distance === 0 ? 1.25 : 1 / (1 + distance);
        smoothingSamples.push({ dx, dy, weight });
      }
    }
    let blurFieldCurrent = new Float32Array(width * height);
    let blurFieldBuffer = new Float32Array(width * height);
    blurFieldCurrent.set(desertSuitabilityField);

    for (let iteration = 0; iteration < blurIterations; iteration += 1) {
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (waterMask[idx]) {
            blurFieldBuffer[idx] = 0;
            continue;
          }
          const baseTile = tiles[y][x].base;
          if (baseTile === snowTileKey) {
            blurFieldBuffer[idx] = 0;
            continue;
          }
          let weightSum = 0;
          let sampleSum = 0;
          for (let i = 0; i < smoothingSamples.length; i += 1) {
            const { dx, dy, weight } = smoothingSamples[i];
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              continue;
            }
            const nIdx = ny * width + nx;
            if (waterMask[nIdx]) {
              continue;
            }
            const neighborTile = tiles[ny][nx].base;
            if (neighborTile === snowTileKey) {
              continue;
            }
            sampleSum += blurFieldCurrent[nIdx] * weight;
            weightSum += weight;
          }
          if (weightSum > 0) {
            blurFieldBuffer[idx] = sampleSum / weightSum;
          } else {
            blurFieldBuffer[idx] = blurFieldCurrent[idx];
          }
        }
      }
      const swap = blurFieldCurrent;
      blurFieldCurrent = blurFieldBuffer;
      blurFieldBuffer = swap;
    }

    const updatedMask = new Uint8Array(width * height);
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          updatedMask[idx] = 0;
          continue;
        }
        const baseTile = tiles[y][x].base;
        if (baseTile === snowTileKey) {
          updatedMask[idx] = 0;
          continue;
        }
        const baseSuitability = desertSuitabilityField[idx];
        const clusteredSuitability = blurFieldCurrent[idx];
        let neighborDesert = 0;
        let neighborCount = 0;
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const nIdx = ny * width + nx;
          if (waterMask[nIdx]) {
            continue;
          }
          const neighborTile = tiles[ny][nx].base;
          if (neighborTile === snowTileKey) {
            continue;
          }
          neighborDesert += desertMask[nIdx];
          neighborCount += 1;
        }
        const localDensity = neighborCount > 0 ? neighborDesert / neighborCount : desertMask[idx];
        const combinedScore = baseSuitability * 0.55 + clusteredSuitability * 0.45 + localDensity * 0.15;
        if (combinedScore > 0.62 && baseSuitability > 0.48) {
          updatedMask[idx] = 1;
        } else if (combinedScore < 0.5 || baseSuitability < 0.45) {
          updatedMask[idx] = 0;
        } else {
          updatedMask[idx] = desertMask[idx];
        }
      }
    }

    desertMask.set(updatedMask);

    if (hasSandTile) {
      const verticalIsolation = [];
      for (let y = 1; y < height - 1; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (!desertMask[idx]) {
            continue;
          }
          const aboveIdx = idx - width;
          const belowIdx = idx + width;
          const aboveIsDesert = desertMask[aboveIdx] === 1;
          const belowIsDesert = desertMask[belowIdx] === 1;
          if (!aboveIsDesert && !belowIsDesert) {
            verticalIsolation.push(idx);
          }
        }
      }
      if (verticalIsolation.length > 0) {
        for (let i = 0; i < verticalIsolation.length; i += 1) {
          desertMask[verticalIsolation[i]] = 0;
        }
      }

      const isolatedSingles = [];
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (!desertMask[idx]) {
            continue;
          }
          let hasDesertNeighbor = false;
          for (let i = 0; i < neighborOffsets8.length; i += 1) {
            const nx = x + neighborOffsets8[i][0];
            const ny = y + neighborOffsets8[i][1];
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              continue;
            }
            const nIdx = ny * width + nx;
            if (desertMask[nIdx]) {
              hasDesertNeighbor = true;
              break;
            }
          }
          if (!hasDesertNeighbor) {
            isolatedSingles.push(idx);
          }
        }
      }
      if (isolatedSingles.length > 0) {
        for (let i = 0; i < isolatedSingles.length; i += 1) {
          desertMask[isolatedSingles[i]] = 0;
        }
      }
    }

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          if (badlandsMask) {
            badlandsMask[idx] = 0;
          }
          continue;
        }
        if (desertMask[idx]) {
          let baseTileName = sandTileKey;
          if (hasBadlandsTile) {
            const heatValue = desertHeatField ? desertHeatField[idx] : 1;
            const dryness = desertSuitabilityField ? desertSuitabilityField[idx] : heatValue;
            if (heatValue > 0.58 && dryness > 0.5) {
              const normalizedX = (x + 0.5) / width;
              const normalizedY = (y + 0.5) / height;
              const badlandsNoise = octaveNoise(
                (normalizedX + desertBadlandsOffsetX) * desertBadlandsScale,
                (normalizedY + desertBadlandsOffsetY) * desertBadlandsScale,
                desertBadlandsSeed,
                3,
                0.55,
                2.15
              );
              const badlandsLikelihood = clamp((heatValue - 0.58) * 1.25 + (dryness - 0.5) * 0.85, 0, 1);
              if (
                badlandsNoise < badlandsLikelihood &&
                !isAdjacentToWater(x, y) &&
                hasAdjacentSand(x, y)
              ) {
                baseTileName = badlandsTileKey;
              }
            }
          }
          tiles[y][x].base = baseTileName;
          if (badlandsMask) {
            badlandsMask[idx] = baseTileName === badlandsTileKey ? 1 : 0;
          }
        } else if (tiles[y][x].base === sandTileKey || (hasBadlandsTile && tiles[y][x].base === badlandsTileKey)) {
          tiles[y][x].base = grassTileKey;
          if (badlandsMask) {
            badlandsMask[idx] = 0;
          }
        }
      }
    }

    if (badlandsMask) {
      const badlandsFillRadius = 2;
      const badlandsFillOffsets = [];
      for (let dy = -badlandsFillRadius; dy <= badlandsFillRadius; dy += 1) {
        for (let dx = -badlandsFillRadius; dx <= badlandsFillRadius; dx += 1) {
          if (dx === 0 && dy === 0) {
            continue;
          }
          if (Math.max(Math.abs(dx), Math.abs(dy)) > badlandsFillRadius) {
            continue;
          }
          badlandsFillOffsets.push([dx, dy]);
        }
      }
      const badlandsFillIterations = 2;
      for (let iteration = 0; iteration < badlandsFillIterations; iteration += 1) {
        const additions = [];
        for (let y = 0; y < height; y += 1) {
          for (let x = 0; x < width; x += 1) {
            const idx = y * width + x;
            if (!desertMask[idx] || badlandsMask[idx]) {
              continue;
            }
            if (isAdjacentToWater(x, y)) {
              continue;
            }
            let neighborCount = 0;
            let hasLeft = false;
            let hasRight = false;
            let hasUp = false;
            let hasDown = false;
            for (let i = 0; i < badlandsFillOffsets.length; i += 1) {
              const offset = badlandsFillOffsets[i];
              const nx = x + offset[0];
              const ny = y + offset[1];
              if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
                continue;
              }
              const nIdx = ny * width + nx;
              if (!badlandsMask[nIdx]) {
                continue;
              }
              neighborCount += 1;
              if (offset[0] < 0) {
                hasLeft = true;
              } else if (offset[0] > 0) {
                hasRight = true;
              }
              if (offset[1] < 0) {
                hasUp = true;
              } else if (offset[1] > 0) {
                hasDown = true;
              }
            }
            const hasHorizontalBridge = hasLeft && hasRight;
            const hasVerticalBridge = hasUp && hasDown;
            const hasCrossBridge =
              (hasLeft || hasRight) && (hasUp || hasDown) && neighborCount >= 3;
            if (
              neighborCount >= 2 &&
              (hasHorizontalBridge || hasVerticalBridge || hasCrossBridge) &&
              hasAdjacentSand(x, y)
            ) {
              additions.push({ idx, x, y });
            }
          }
        }
        if (additions.length === 0) {
          break;
        }
        const additionSet = new Set(additions.map(({ idx }) => idx));
        const validAdditions = additions.filter(({ x, y }) =>
          hasAdjacentSand(x, y, additionSet)
        );
        if (validAdditions.length === 0) {
          break;
        }
        for (let i = 0; i < validAdditions.length; i += 1) {
          const { idx, x, y } = validAdditions[i];
          badlandsMask[idx] = 1;
          tiles[y][x].base = badlandsTileKey;
        }
      }
    }

    if (badlandsMask) {
      const revertIndices = [];
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (!badlandsMask[idx]) {
            continue;
          }
          if (isAdjacentToWater(x, y) || !hasAdjacentSand(x, y)) {
            revertIndices.push({ idx, x, y });
          }
        }
      }
      if (revertIndices.length > 0) {
        for (let i = 0; i < revertIndices.length; i += 1) {
          const { idx, x, y } = revertIndices[i];
          badlandsMask[idx] = 0;
          tiles[y][x].base = sandTileKey;
        }
      }
    }

    if (hasBadlandsTile && badlandsMask) {
      const surroundedSand = [];
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (tiles[y][x].base !== sandTileKey) {
            continue;
          }
          let hasNeighbor = false;
          let allBadlands = true;
          for (let i = 0; i < neighborOffsets8.length; i += 1) {
            const nx = x + neighborOffsets8[i][0];
            const ny = y + neighborOffsets8[i][1];
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              allBadlands = false;
              continue;
            }
            hasNeighbor = true;
            if (tiles[ny][nx].base !== badlandsTileKey) {
              allBadlands = false;
              break;
            }
          }
          if (hasNeighbor && allBadlands) {
            surroundedSand.push({ idx, x, y });
          }
        }
      }
      for (let i = 0; i < surroundedSand.length; i += 1) {
        const { idx, x, y } = surroundedSand[i];
        tiles[y][x].base = badlandsTileKey;
        badlandsMask[idx] = 1;
        if (desertMask) {
          desertMask[idx] = 1;
        }
      }
    }

    if (hasSnowTile) {
      const snowClearRadius = 2;
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (
            tiles[y][x].base !== sandTileKey &&
            (!hasBadlandsTile || tiles[y][x].base !== badlandsTileKey)
          ) {
            continue;
          }
          let nearSnow = false;
          for (let dy = -snowClearRadius; dy <= snowClearRadius && !nearSnow; dy += 1) {
            for (let dx = -snowClearRadius; dx <= snowClearRadius; dx += 1) {
              if (dx === 0 && dy === 0) {
                continue;
              }
              const nx = x + dx;
              const ny = y + dy;
              if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
                continue;
              }
              const neighborTile = tiles[ny][nx].base;
              if (neighborTile === snowTileKey) {
                nearSnow = true;
                break;
              }
            }
          }
          if (nearSnow) {
            tiles[y][x].base = grassTileKey;
            desertMask[idx] = 0;
            if (badlandsMask) {
              badlandsMask[idx] = 0;
            }
          }
        }
      }
    }

    const cardinalNeighborOffsets = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0]
    ];

    const sandGrassConversions = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        const baseKey = tiles[y][x].base;
        if (baseKey !== sandTileKey && baseKey !== grassTileKey) {
          continue;
        }

        let hasAllNeighbors = true;
        let allGrass = true;
        let allSand = true;
        for (let i = 0; i < cardinalNeighborOffsets.length; i += 1) {
          const nx = x + cardinalNeighborOffsets[i][0];
          const ny = y + cardinalNeighborOffsets[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            hasAllNeighbors = false;
            break;
          }
          const neighborBase = tiles[ny][nx].base;
          if (neighborBase !== grassTileKey) {
            allGrass = false;
          }
          if (neighborBase !== sandTileKey) {
            allSand = false;
          }
          if (!allGrass && !allSand) {
            break;
          }
        }

        if (!hasAllNeighbors) {
          continue;
        }

        if (baseKey === sandTileKey && allGrass) {
          sandGrassConversions.push({ idx, x, y, target: grassTileKey });
        } else if (baseKey === grassTileKey && allSand) {
          sandGrassConversions.push({ idx, x, y, target: sandTileKey });
        }
      }
    }

    for (let i = 0; i < sandGrassConversions.length; i += 1) {
      const { idx, x, y, target } = sandGrassConversions[i];
      tiles[y][x].base = target;
      if (desertMask) {
        desertMask[idx] = target === sandTileKey ? 1 : 0;
      }
      if (badlandsMask) {
        badlandsMask[idx] = 0;
      }
    }
  }

  if (hasSandTile) {
    const desertMaskForDistance = new Uint8Array(width * height);
    let desertTileCount = 0;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        const tile = tiles[y][x];
        if (!tile) {
          continue;
        }
        const baseKey = tile.base;
        const isDesertTile =
          baseKey === sandTileKey || (hasBadlandsTile && baseKey === badlandsTileKey);
        if (isDesertTile) {
          desertMaskForDistance[idx] = 1;
          desertTileCount += 1;
          tile.desertProximity = 0;
        } else {
          desertMaskForDistance[idx] = 0;
        }
      }
    }

    if (desertTileCount > 0) {
      const desertDistanceField = computeEuclideanDistanceField(
        desertMaskForDistance,
        width,
        height
      );
      const desertTransitionFalloff = 4.5;
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          const tile = tiles[y][x];
          if (!tile || desertMaskForDistance[idx]) {
            continue;
          }
          if (tile.base === grassTileKey) {
            const distanceToDesert = Math.sqrt(desertDistanceField[idx]);
            const proximity = clamp(1 - distanceToDesert / desertTransitionFalloff, 0, 1);
            tile.desertProximity = proximity;
          } else {
            tile.desertProximity = 0;
          }
        }
      }
    }

    if (oasisTileKey) {
      const oasisBaseChance = 0.00025;
      const oasisSuitabilityScale = 0.002;
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (!desertMask[idx]) {
            continue;
          }
          const tile = tiles[y][x];
          if (!tile || tile.base !== sandTileKey) {
            continue;
          }
          if (tile.overlay || tile.hillOverlay || tile.structure || tile.river) {
            continue;
          }
          let hasNeighborOasis = false;
          for (let i = 0; i < neighborOffsets8.length; i += 1) {
            const nx = x + neighborOffsets8[i][0];
            const ny = y + neighborOffsets8[i][1];
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              continue;
            }
            const neighborTile = tiles[ny][nx];
            if (neighborTile && neighborTile.overlay === oasisTileKey) {
              hasNeighborOasis = true;
              break;
            }
          }
          if (hasNeighborOasis) {
            continue;
          }
          const suitability = desertSuitabilityField ? desertSuitabilityField[idx] : 0;
          const oasisChance = clamp(
            oasisBaseChance + suitability * oasisSuitabilityScale,
            0,
            0.12
          );
          if (oasisChance <= 0) {
            continue;
          }
          if (rng() < oasisChance) {
            tile.overlay = oasisTileKey;
          }
        }
      }
    }
  }

  if (hasMarshTile) {
    const marshMask = marshMaskField ? new Uint8Array(marshMaskField) : new Uint8Array(width * height);
    const marshBuffer = new Uint8Array(width * height);
    const marshIterations = 2;
    for (let iteration = 0; iteration < marshIterations; iteration += 1) {
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (waterMask[idx]) {
            marshBuffer[idx] = 0;
            continue;
          }
          const tile = tiles[y][x];
          if (!tile) {
            marshBuffer[idx] = 0;
            continue;
          }
          const currentIsMarsh = marshMask[idx] === 1;
          let marshNeighbors = 0;
          for (let i = 0; i < neighborOffsets8.length; i += 1) {
            const nx = x + neighborOffsets8[i][0];
            const ny = y + neighborOffsets8[i][1];
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              continue;
            }
            const nIdx = ny * width + nx;
            if (waterMask[nIdx]) {
              continue;
            }
            if (marshMask[nIdx]) {
              marshNeighbors += 1;
            }
          }
          const heightValue = elevationField[idx];
          const rainfallValue = rainfallField[idx];
          const drainageValue = drainageField[idx];
          const {
            score: marshScore,
            threshold: marshThreshold,
            qualifies: marshQualifies
          } = calculateMarshSuitability(
            x,
            y,
            heightValue,
            rainfallValue,
            drainageValue,
            false
          );
          let nextIsMarsh = currentIsMarsh;
          if (currentIsMarsh) {
            if (!marshQualifies && marshNeighbors <= 1) {
              nextIsMarsh = false;
            } else if (marshNeighbors <= 2 && marshScore < marshThreshold) {
              nextIsMarsh = false;
            } else if (marshScore < marshThreshold - 0.08) {
              nextIsMarsh = false;
            }
          } else if (tile.base === grassTileKey) {
            if (
              marshQualifies &&
              (marshNeighbors >= 3 || (marshNeighbors >= 2 && marshScore > marshThreshold + 0.05))
            ) {
              nextIsMarsh = true;
            } else if (marshNeighbors >= 4 && marshScore > marshThreshold - 0.02) {
              nextIsMarsh = true;
            } else {
              nextIsMarsh = false;
            }
          } else {
            nextIsMarsh = false;
          }
          if (!Number.isFinite(marshScore) || marshScore === -Infinity) {
            nextIsMarsh = false;
          }
          marshBuffer[idx] = nextIsMarsh ? 1 : 0;
        }
      }
      marshMask.set(marshBuffer);
    }

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        const shouldBeMarsh = marshMask[idx] === 1;
        if (shouldBeMarsh) {
          tiles[y][x].base = marshTileKey;
        } else if (tiles[y][x].base === marshTileKey) {
          tiles[y][x].base = grassTileKey;
        }
        if (marshMaskField) {
          marshMaskField[idx] = shouldBeMarsh ? 1 : 0;
        }
      }
    }

    // Remove isolated marsh tiles by converting them to match surrounding terrain.
    const isolatedMarshes = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const tile = tiles[y][x];
        if (!tile || tile.base !== marshTileKey) {
          continue;
        }
        let validNeighborCount = 0;
        let marshNeighborCount = 0;
        const neighborOptions = [];
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          validNeighborCount += 1;
          const neighborTile = tiles[ny][nx];
          if (!neighborTile) {
            continue;
          }
          if (neighborTile.base === marshTileKey) {
            marshNeighborCount += 1;
          } else {
            neighborOptions.push(neighborTile.base);
          }
        }
        if (
          validNeighborCount > 0 &&
          marshNeighborCount === 0 &&
          neighborOptions.length === validNeighborCount
        ) {
          const replacementIndex = Math.floor(rng() * neighborOptions.length);
          isolatedMarshes.push({ x, y, base: neighborOptions[replacementIndex] });
        }
      }
    }
    for (let i = 0; i < isolatedMarshes.length; i += 1) {
      const { x, y, base } = isolatedMarshes[i];
      const tile = tiles[y][x];
      if (tile) {
        tile.base = base;
        if (marshMaskField) {
          marshMaskField[y * width + x] = base === marshTileKey ? 1 : 0;
        }
      }
    }

    const marshDistanceMask = new Uint8Array(width * height);
    let marshTileCount = 0;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        const tile = tiles[y][x];
        if (!tile) {
          continue;
        }
        if (waterMask[idx]) {
          tile.marshProximity = 0;
          continue;
        }
        if (tile.base === marshTileKey) {
          marshDistanceMask[idx] = 1;
          marshTileCount += 1;
          tile.marshProximity = 0;
        } else {
          marshDistanceMask[idx] = 0;
          tile.marshProximity = 0;
        }
      }
    }

    if (marshTileCount > 0) {
      const marshDistanceField = computeEuclideanDistanceField(
        marshDistanceMask,
        width,
        height
      );
      const marshTransitionFalloff = 3.5;
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (waterMask[idx] || marshDistanceMask[idx]) {
            continue;
          }
          const tile = tiles[y][x];
          if (!tile) {
            continue;
          }
          if (tile.base !== grassTileKey) {
            tile.marshProximity = 0;
            continue;
          }
          const distanceToMarsh = Math.sqrt(marshDistanceField[idx]);
          const proximity = clamp(1 - distanceToMarsh / marshTransitionFalloff, 0, 1);
          tile.marshProximity = proximity;
        }
      }
    }
  }

  if (hasSnowTile) {
    const surroundedGrassTiles = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const tile = tiles[y][x];
        if (!tile || tile.base !== grassTileKey) {
          continue;
        }
        let surroundedBySnow = true;
        for (let i = 0; i < cardinalOffsets.length; i += 1) {
          const nx = x + cardinalOffsets[i][0];
          const ny = y + cardinalOffsets[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            surroundedBySnow = false;
            break;
          }
          const neighbor = tiles[ny][nx];
          if (!neighbor || neighbor.base !== snowTileKey) {
            surroundedBySnow = false;
            break;
          }
        }
        if (surroundedBySnow) {
          surroundedGrassTiles.push({ x, y });
        }
      }
    }

    for (let i = 0; i < surroundedGrassTiles.length; i += 1) {
      const { x, y } = surroundedGrassTiles[i];
      tiles[y][x].base = snowTileKey;
    }
  }

  if (hasMountainTile) {
    mountainScores = new Float32Array(width * height);
    mountainHeightField = new Float32Array(width * height);
    let ridgeField = new Float32Array(width * height);
    const ridgeDirectionIndex = new Int8Array(width * height);
    ridgeDirectionIndex.fill(-1);
    const ridgeDirectionStrength = new Float32Array(width * height);
    mountainMask = new Uint8Array(width * height);
    const directionOpposites = new Int8Array([7, 6, 5, 4, 3, 2, 1, 0]);
    const baseMountainSeedThreshold = 0.8;
    const baseMountainCandidateThreshold = 0.52;
    const baseMountainPruneThreshold = 0.9;
    const mountainSeedThreshold = clamp(
      baseMountainSeedThreshold - mountainBias * 0.32,
      0.52,
      0.97
    );
    mountainCandidateThreshold = clamp(
      baseMountainCandidateThreshold - mountainBias * 0.28,
      0.2,
      0.78
    );
    const mountainPruneThreshold = clamp(
      baseMountainPruneThreshold - mountainBias * 0.2,
      0.62,
      0.97
    );

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          mountainHeightField[idx] = 0;
          ridgeField[idx] = 0;
          continue;
        }

        const heightValue = elevationField[idx];
        const normalizedHeight = clamp((heightValue - mountainBaseThreshold) / mountainRange, 0, 1);
        mountainHeightField[idx] = normalizedHeight;

        const normalizedX = (x + 0.5) / width;
        const normalizedY = (y + 0.5) / height;
        const left = x > 0 ? elevationField[idx - 1] : heightValue;
        const right = x < width - 1 ? elevationField[idx + 1] : heightValue;
        const up = y > 0 ? elevationField[idx - width] : heightValue;
        const down = y < height - 1 ? elevationField[idx + width] : heightValue;

        const gradX = (right - left) * 0.5;
        const gradY = (down - up) * 0.5;
        const slopeMagnitude = Math.sqrt(gradX * gradX + gradY * gradY);

        const tectLeft = x > 0 ? tectonicActivityField[idx - 1] : tectonicActivityField[idx];
        const tectRight = x < width - 1 ? tectonicActivityField[idx + 1] : tectonicActivityField[idx];
        const tectUp = y > 0 ? tectonicActivityField[idx - width] : tectonicActivityField[idx];
        const tectDown = y < height - 1 ? tectonicActivityField[idx + width] : tectonicActivityField[idx];
        const tectGradX = (tectRight - tectLeft) * 0.5;
        const tectGradY = (tectDown - tectUp) * 0.5;
        const tectMag = Math.sqrt(tectGradX * tectGradX + tectGradY * tectGradY);

        let neighborSum = 0;
        let neighborCount = 0;
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          neighborSum += elevationField[ny * width + nx];
          neighborCount += 1;
        }
        const neighborAvg = neighborCount > 0 ? neighborSum / neighborCount : heightValue;
        const localContrast = Math.max(0, heightValue - neighborAvg);

        const ridgedBase = octaveNoise(
          (normalizedX + ridgeDetailOffsetX) * 7.4,
          (normalizedY + ridgeDetailOffsetY) * 7.4,
          ridgeDetailSeed,
          5,
          0.47,
          2.28
        );
        const ridged = Math.pow(1 - Math.abs(ridgedBase * 2 - 1), 1.25);

        const tectonicValue = clamp(tectonicActivityField[idx], 0, 1);
        const tectonicBoost = Math.pow(tectonicValue, 0.85);
        const slopeComponent = clamp(slopeMagnitude * 2.4, 0, 1);

        let dirX = 0;
        let dirY = 0;
        if (tectMag > 0.0003) {
          dirX += -tectGradY * 1.6;
          dirY += tectGradX * 1.6;
        }
        if (slopeMagnitude > 0.00035) {
          dirX += -gradY * 0.7;
          dirY += gradX * 0.7;
        }
        const orientationNoise = octaveNoise(
          (normalizedX + ridgeOrientationOffsetX) * 9.2,
          (normalizedY + ridgeOrientationOffsetY) * 9.2,
          ridgeOrientationSeed,
          3,
          0.58,
          2.05
        );
        const noiseAngle = (orientationNoise * 2 - 1) * Math.PI;
        if (Math.abs(dirX) + Math.abs(dirY) < 1e-4) {
          dirX = Math.cos(noiseAngle);
          dirY = Math.sin(noiseAngle);
        } else {
          const dirMag = Math.hypot(dirX, dirY) || 1;
          dirX = (dirX / dirMag) * 0.8 + Math.cos(noiseAngle) * 0.2;
          dirY = (dirY / dirMag) * 0.8 + Math.sin(noiseAngle) * 0.2;
        }
        const finalDirMag = Math.hypot(dirX, dirY);
        if (finalDirMag > 1e-4) {
          dirX /= finalDirMag;
          dirY /= finalDirMag;
          const orientationStrength = clamp(Math.sqrt(tectMag) * 3.5 + slopeMagnitude * 2.1, 0, 1);
          ridgeDirectionStrength[idx] = orientationStrength;
          let bestIndex = -1;
          let bestDot = 0.35;
          for (let i = 0; i < neighborOffsets8.length; i += 1) {
            const offset = neighborOffsets8[i];
            const length = Math.hypot(offset[0], offset[1]) || 1;
            const dot = (dirX * offset[0] + dirY * offset[1]) / length;
            if (dot > bestDot) {
              bestDot = dot;
              bestIndex = i;
            }
          }
          ridgeDirectionIndex[idx] = bestIndex;
        }

        const erosionPenalty = Math.max(0, neighborAvg - heightValue) * 0.35;
        const rawRidgeScore =
          normalizedHeight * 0.28 +
          Math.pow(Math.max(0, normalizedHeight), 1.6) * 0.3 +
          localContrast * 0.9 +
          slopeComponent * 0.55 +
          tectonicBoost * 0.75 +
          ridged * 0.4 -
          erosionPenalty;

        ridgeField[idx] = Math.max(0, rawRidgeScore);
      }
    }

    let ridgeWorking = ridgeField;
    let ridgeBuffer = new Float32Array(ridgeField.length);
    for (let iter = 0; iter < 2; iter += 1) {
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (waterMask[idx]) {
            ridgeBuffer[idx] = 0;
            continue;
          }
          const dirIndex = ridgeDirectionIndex[idx];
          if (dirIndex < 0) {
            ridgeBuffer[idx] = ridgeWorking[idx];
            continue;
          }
          const strength = ridgeDirectionStrength[idx];
          const baseValue = ridgeWorking[idx];
          let weight = 1;
          let weightedSum = baseValue;
          const offsets = [dirIndex, directionOpposites[dirIndex]];
          for (let i = 0; i < offsets.length; i += 1) {
            const offset = neighborOffsets8[offsets[i]];
            const nx = x + offset[0];
            const ny = y + offset[1];
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              continue;
            }
            const nIdx = ny * width + nx;
            if (waterMask[nIdx]) {
              continue;
            }
            const neighborWeight = 0.8 + strength * 0.6;
            weightedSum += ridgeWorking[nIdx] * neighborWeight;
            weight += neighborWeight;
          }
          ridgeBuffer[idx] = weightedSum / weight;
        }
      }
      const swap = ridgeWorking;
      ridgeWorking = ridgeBuffer;
      ridgeBuffer = swap;
    }
    ridgeField = ridgeWorking;
    normalizeField(ridgeField);

    for (let idx = 0; idx < mountainScores.length; idx += 1) {
      if (waterMask[idx]) {
        mountainScores[idx] = 0;
        continue;
      }
      const normalizedHeight = mountainHeightField[idx];
      const ridgeValue = ridgeField[idx];
      const tectonicValue = clamp(tectonicActivityField[idx], 0, 1);
      const orientationBonus = ridgeDirectionStrength[idx] * 0.18;
      const combined = clamp(
        ridgeValue * 0.6 +
          Math.pow(Math.max(0, normalizedHeight), 1.6) * 0.25 +
          normalizedHeight * 0.18 +
          Math.pow(tectonicValue, 0.9) * 0.35 +
          orientationBonus,
        0,
        1
      );
      mountainScores[idx] = combined;
    }

    const isTooCoastal = (x, y) => {
      const idx = y * width + x;
      let coastalNeighbors = 0;
      for (let i = 0; i < cardinalOffsets.length; i += 1) {
        const nx = x + cardinalOffsets[i][0];
        const ny = y + cardinalOffsets[i][1];
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
          coastalNeighbors += 1;
          continue;
        }
        if (waterMask[ny * width + nx]) {
          coastalNeighbors += 1;
        }
      }
      if (coastalNeighbors < 2) {
        return false;
      }
      const tectonic = tectonicActivityField[idx];
      if (coastalNeighbors >= 3) {
        return tectonic < 0.6;
      }
      return tectonic < 0.35;
    };

    let seedCount = 0;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        const score = mountainScores[idx];
        if (score >= mountainSeedThreshold && !isTooCoastal(x, y)) {
          mountainMask[idx] = 1;
          seedCount += 1;
        }
      }
    }

    if (seedCount === 0) {
      const fallbackCandidates = [];
      for (let idx = 0; idx < mountainScores.length; idx += 1) {
        if (waterMask[idx]) {
          continue;
        }
        const score = mountainScores[idx];
        if (score >= mountainSeedThreshold * 0.85) {
          fallbackCandidates.push(idx);
        }
      }
      fallbackCandidates.sort((a, b) => mountainScores[b] - mountainScores[a]);
      const maxFallbackSeeds = Math.max(1, Math.round(4 * mountainFrequencyNormalized));
      const limit = Math.min(maxFallbackSeeds, fallbackCandidates.length);
      for (let i = 0; i < limit; i += 1) {
        const idx = fallbackCandidates[i];
        const x = idx % width;
        const y = Math.floor(idx / width);
        if (!isTooCoastal(x, y)) {
          mountainMask[idx] = 1;
        }
      }
    }

    const traceDirection = (startX, startY, startDirIndex, maxSteps, initialReliability) => {
      let cx = startX;
      let cy = startY;
      let currentDirIndex = startDirIndex;
      let reliability = initialReliability;
      for (let step = 0; step < maxSteps; step += 1) {
        const offset = neighborOffsets8[currentDirIndex];
        const nx = cx + offset[0];
        const ny = cy + offset[1];
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
          break;
        }
        const nIdx = ny * width + nx;
        if (waterMask[nIdx]) {
          break;
        }
        if (mountainScores[nIdx] < mountainCandidateThreshold * 0.85) {
          break;
        }
        mountainMask[nIdx] = 1;
        cx = nx;
        cy = ny;
        const nextDirIndex = ridgeDirectionIndex[nIdx];
        if (nextDirIndex >= 0) {
          currentDirIndex = nextDirIndex;
        }
        reliability = Math.max(ridgeDirectionStrength[nIdx], reliability * 0.82);
        if (reliability < 0.06) {
          break;
        }
      }
    };

    const extendRangeFromSeed = (seedIdx) => {
      const baseDirIndex = ridgeDirectionIndex[seedIdx];
      const reliability = ridgeDirectionStrength[seedIdx];
      if (baseDirIndex < 0 || reliability < 0.05) {
        return;
      }
      const seedScore = mountainScores[seedIdx];
      const ridgeStrength = ridgeField[seedIdx];
      const rangeScale = (seedScore * 4 + ridgeStrength * 3) * (0.5 + reliability * 0.4);
      const baseLength = 2 + Math.floor(rangeScale);
      const forwardSteps = Math.min(18, baseLength + Math.floor(rng() * 3));
      const backwardSteps = Math.max(1, Math.floor(forwardSteps * 0.45));
      const startX = seedIdx % width;
      const startY = Math.floor(seedIdx / width);
      traceDirection(startX, startY, baseDirIndex, forwardSteps, reliability);
      traceDirection(startX, startY, directionOpposites[baseDirIndex], backwardSteps, reliability * 0.85);
    };

    const seedIndices = [];
    for (let idx = 0; idx < mountainMask.length; idx += 1) {
      if (mountainMask[idx]) {
        seedIndices.push(idx);
      }
    }
    seedIndices.sort((a, b) => mountainScores[b] - mountainScores[a]);
    for (let i = 0; i < seedIndices.length; i += 1) {
      extendRangeFromSeed(seedIndices[i]);
    }

    for (let pass = 0; pass < 2; pass += 1) {
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (waterMask[idx] || mountainMask[idx]) {
            continue;
          }
          const score = mountainScores[idx];
          if (score <= 0 || isTooCoastal(x, y)) {
            continue;
          }
          let mountainNeighbors = 0;
          for (let i = 0; i < neighborOffsets8.length; i += 1) {
            const nx = x + neighborOffsets8[i][0];
            const ny = y + neighborOffsets8[i][1];
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              continue;
            }
            if (mountainMask[ny * width + nx]) {
              mountainNeighbors += 1;
            }
          }
          const orientationStrength = ridgeDirectionStrength[idx];
          let minNeighbors = 3;
          if (score > 0.82 || orientationStrength > 0.7) {
            minNeighbors = 1;
          } else if (score > 0.66) {
            minNeighbors = orientationStrength > 0.45 ? 1 : 2;
          } else if (orientationStrength > 0.55) {
            minNeighbors = 2;
          }
          const dirIndex = ridgeDirectionIndex[idx];
          let directionalSupport = false;
          if (dirIndex >= 0) {
            const directionalOffsets = [dirIndex, directionOpposites[dirIndex]];
            for (let i = 0; i < directionalOffsets.length; i += 1) {
              const offset = neighborOffsets8[directionalOffsets[i]];
              const nx = x + offset[0];
              const ny = y + offset[1];
              if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
                continue;
              }
              if (mountainMask[ny * width + nx]) {
                directionalSupport = true;
                break;
              }
            }
          }
          const baseProbability = 0.12 + score * 0.6 + orientationStrength * 0.25;
          let probability = Math.min(0.85, baseProbability * mountainGrowthFactor);
          if (!directionalSupport) {
            probability *= 0.45;
            if (orientationStrength > 0.6) {
              probability *= 0.6;
            }
          }
          const highScoreThreshold = 0.75 + mountainScarcity * 0.12;
          if (
            mountainNeighbors >= minNeighbors &&
            (score > highScoreThreshold || rng() < probability)
          ) {
            mountainMask[idx] = 1;
          }
        }
      }
    }

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx] || mountainMask[idx]) {
          continue;
        }
        const score = mountainScores[idx];
        if (score < mountainCandidateThreshold || isTooCoastal(x, y)) {
          continue;
        }
        let mountainNeighbors = 0;
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          if (mountainMask[ny * width + nx]) {
            mountainNeighbors += 1;
          }
        }
        const orientationStrength = ridgeDirectionStrength[idx];
        const baseRequiredNeighbors = orientationStrength > 0.6 ? 2 : orientationStrength > 0.35 ? 3 : 4;
        const scarcityNeighborPenalty = mountainScarcity > 0.6 ? 2 : mountainScarcity > 0.35 ? 1 : 0;
        const requiredNeighbors = Math.min(7, baseRequiredNeighbors + scarcityNeighborPenalty);
        if (mountainNeighbors >= requiredNeighbors) {
          mountainMask[idx] = 1;
        }
      }
    }

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (!mountainMask[idx]) {
          continue;
        }
        const score = mountainScores[idx];
        let mountainNeighbors = 0;
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          if (mountainMask[ny * width + nx]) {
            mountainNeighbors += 1;
          }
        }
        const orientationStrength = ridgeDirectionStrength[idx];
        const minSupport = orientationStrength > 0.65 ? 0 : 1;
        const pruneBoost = lerp(1.18, 0.85, mountainFrequencyNormalized);
        const effectiveThreshold =
          mountainPruneThreshold * pruneBoost * (1 - orientationStrength * 0.25);
        if (mountainNeighbors <= minSupport && score < effectiveThreshold) {
          mountainMask[idx] = 0;
        }
      }
    }

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (!mountainMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile) {
          continue;
        }
        const normalizedHeight = mountainHeightField ? mountainHeightField[idx] : 0;
        const usePeakOverlay =
          mountainPeakKey && normalizedHeight >= mountainPeakHeightThreshold;
        tile.overlay = usePeakOverlay ? mountainPeakKey : mountainOverlayKey;
        const isSandBase = hasSandTile && tile.base === sandTileKey;
        const isBadlandsBase = hasBadlandsTile && tile.base === badlandsTileKey;
        if (isSandBase || isBadlandsBase) {
          tile.base = stoneTileKey;
        } else if (tile.base === marshTileKey) {
          tile.base = grassTileKey;
        }
      }
    }

    if (volcanoOverlayKeys.length > 0) {
      const volcanoCandidates = [];
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (!mountainMask[idx]) {
            continue;
          }
          const tile = tiles[y][x];
          if (!tile || tile.structure || tile.river) {
            continue;
          }
          if (tile.overlay !== mountainOverlayKey && tile.overlay !== mountainPeakKey) {
            continue;
          }
          const normalizedHeight = mountainHeightField ? mountainHeightField[idx] : 0;
          const score = mountainScores ? mountainScores[idx] : 0;
          volcanoCandidates.push({ x, y, idx, height: normalizedHeight, score });
        }
      }

      if (volcanoCandidates.length > 0) {
        volcanoCandidates.sort((a, b) => {
          if (b.height !== a.height) {
            return b.height - a.height;
          }
          return b.score - a.score;
        });

        const minVolcanoCount = Math.min(volcanoOverlayKeys.length, volcanoCandidates.length);
        const baseVolcanoCount = Math.round(volcanoCandidates.length / 600);
        const volcanoBaseTarget = Math.max(1, Math.max(minVolcanoCount, baseVolcanoCount));
        const volcanoRarityFactor = 0.15;
        const rarityAdjustedTarget = Math.max(
          1,
          Math.round(volcanoBaseTarget * volcanoRarityFactor)
        );
        const desiredVolcanoCount = clamp(
          rarityAdjustedTarget,
          1,
          Math.min(volcanoCandidates.length, 6)
        );

        if (desiredVolcanoCount > 0) {
          const selectionPoolSize = Math.min(
            volcanoCandidates.length,
            Math.max(desiredVolcanoCount * 5, desiredVolcanoCount + 3)
          );
          const selectionPool = volcanoCandidates.slice(0, selectionPoolSize);
          const placedVolcanoes = [];
          const volcanoMinDistance = 6;
          const volcanoMinDistanceSq = volcanoMinDistance * volcanoMinDistance;
          let attempts = 0;
          const maxAttempts = selectionPool.length * 3;

          while (
            selectionPool.length > 0 &&
            placedVolcanoes.length < desiredVolcanoCount &&
            attempts < maxAttempts
          ) {
            attempts += 1;
            const pickIndex = Math.floor(rng() * selectionPool.length);
            const candidate = selectionPool.splice(pickIndex, 1)[0];
            if (!candidate) {
              continue;
            }

            let tooClose = false;
            for (let i = 0; i < placedVolcanoes.length; i += 1) {
              const placed = placedVolcanoes[i];
              const dx = candidate.x - placed.x;
              const dy = candidate.y - placed.y;
              if (dx * dx + dy * dy < volcanoMinDistanceSq) {
                tooClose = true;
                break;
              }
            }
            if (tooClose) {
              continue;
            }

            const tile = tiles[candidate.y][candidate.x];
            if (!tile || tile.structure || tile.river) {
              continue;
            }

            const overlayKey =
              placedVolcanoes.length === 0 && activeVolcanoKey
                ? activeVolcanoKey
                : dormantVolcanoKey || activeVolcanoKey;

            if (!overlayKey) {
              break;
            }

            tile.overlay = overlayKey;
            if (stoneTileKey && tile.base !== stoneTileKey) {
              tile.base = stoneTileKey;
            }

            placedVolcanoes.push({ x: candidate.x, y: candidate.y, overlayKey });
          }
        }
      }
    }

    const dwarfholdKey = tileLookup.has('DWARFHOLD') ? 'DWARFHOLD' : null;
    const greatDwarfholdKey = tileLookup.has('GREAT_DWARFHOLD') ? 'GREAT_DWARFHOLD' : null;
    const abandonedDwarfholdKey = tileLookup.has('ABANDONED_DWARFHOLD') ? 'ABANDONED_DWARFHOLD' : null;
    const mineKey = tileLookup.has('MINE') ? 'MINE' : null;
    let fallbackMountainScoreThreshold = 0.45;
    const mountainSettlementCandidates = [];
    const dwarfholdDistributionSeed = dwarfholdKey ? (seedNumber + 0x3bd39e8f) >>> 0 : 0;

    if (dwarfholdKey || mineKey) {
      fallbackMountainScoreThreshold =
        mountainScores && mountainCandidateThreshold !== null
          ? clamp(mountainCandidateThreshold * 0.85, 0.28, 0.62)
          : 0.45;
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (waterMask[idx]) {
            continue;
          }
          const tile = tiles[y][x];
          if (!tile) {
            continue;
          }
          if (isVolcanoOverlayKey(tile.overlay)) {
            continue;
          }
          if (tile.river) {
            continue;
          }
          const score = mountainScores ? mountainScores[idx] : 0;
          const isMountainTile = isMountainOverlay(tile.overlay);
          const fallbackEligible =
            !isMountainTile &&
            !tile.overlay &&
            mountainScores &&
            score >= fallbackMountainScoreThreshold;
          if (!isMountainTile && !fallbackEligible) {
            continue;
          }
          const dwarfholdPriority = dwarfholdKey
            ? score +
              computeDwarfholdDistributionAdjustment(
                x,
                y,
                height,
                dwarfholdDistributionSeed
              )
            : score;

          mountainSettlementCandidates.push({
            x,
            y,
            score,
            isMountainTile,
            dwarfholdPriority
          });
        }
      }
    }

    if (!dwarfholdKey && mineKey && mountainSettlementCandidates.length > 0) {
      mountainSettlementCandidates.sort((a, b) => b.score - a.score);
    }

    if (dwarfholdKey) {
      const dwarfholdCandidates = mountainSettlementCandidates;
      if (dwarfholdCandidates.length > 0) {
        dwarfholdCandidates.sort((a, b) => {
          const aPriority = Number.isFinite(a.dwarfholdPriority)
            ? a.dwarfholdPriority
            : a.score;
          const bPriority = Number.isFinite(b.dwarfholdPriority)
            ? b.dwarfholdPriority
            : b.score;
          const diff = bPriority - aPriority;
          if (Math.abs(diff) > 1e-6) {
            return diff;
          }
          return b.score - a.score;
        });
        const baseTarget = Math.max(1, Math.round(dwarfholdCandidates.length / 500));
        const maxDwarfholds = computeStructurePlacementLimit(
          baseTarget,
          24,
          dwarfSettlementMultiplier
        );
        const abandonedDwarfholdChance = computeAbandonedDwarfholdChance(
          dwarfSettlementFrequencyNormalized
        );
        const minDistanceBase = 6;
        const minDistance = adjustMinDistance(minDistanceBase, dwarfSettlementFrequencyNormalized);
        const minDistanceSq = minDistance * minDistance;
        const placed = [];

        const basePlacementContext = {
          tiles,
          width,
          waterMask,
          mountainScores,
          fallbackMountainScoreThreshold,
          mountainOverlayKey,
          dwarfholdKey,
          greatDwarfholdKey,
          abandonedDwarfholdKey,
          abandonedDwarfholdChance,
          rng,
          dwarfholds,
          towns,
          nearbyTownDistanceSq: dwarfholdNearbyTownRadius * dwarfholdNearbyTownRadius
        };

        for (let i = 0; i < dwarfholdCandidates.length && placed.length < maxDwarfholds; i += 1) {
          const candidate = dwarfholdCandidates[i];
          tryPlaceDwarfhold(candidate, {
            ...basePlacementContext,
            placed,
            minDistanceSq
          });
        }

        if (placed.length === 0) {
          for (let i = 0; i < dwarfholdCandidates.length; i += 1) {
            if (
              tryPlaceDwarfhold(dwarfholdCandidates[i], {
                ...basePlacementContext,
                placed,
                minDistanceSq: null
              })
            ) {
              break;
            }
          }
        }

        const southBoundary = Math.floor(height * 0.45);
        let southernCandidateCount = 0;
        for (let i = 0; i < dwarfholdCandidates.length; i += 1) {
          if (dwarfholdCandidates[i].y >= southBoundary) {
            southernCandidateCount += 1;
          }
        }

        if (southernCandidateCount > 0) {
          let placedSouthCount = 0;
          for (let i = 0; i < placed.length; i += 1) {
            if (placed[i].y >= southBoundary) {
              placedSouthCount += 1;
            }
          }

          const southBaseTarget = Math.max(1, Math.round(southernCandidateCount / 650));
          const southMax = computeStructurePlacementLimit(
            southBaseTarget,
            16,
            dwarfSettlementMultiplier
          );
          const southLimitFromTotal = Math.max(1, Math.ceil(maxDwarfholds * 0.5));
          const southCandidateCapacity = southernCandidateCount - placedSouthCount;
          const southExtraNeeded = Math.max(
            0,
            Math.min(southMax - placedSouthCount, southLimitFromTotal, southCandidateCapacity)
          );

          if (southExtraNeeded > 0) {
            const southMinDistanceBase = Math.max(3, Math.round(minDistanceBase * 0.85));
            const southMinDistance = adjustMinDistance(
              southMinDistanceBase,
              dwarfSettlementFrequencyNormalized
            );
            const southMinDistanceSq = southMinDistance * southMinDistance;
            let southPlaced = 0;

            for (
              let i = 0;
              i < dwarfholdCandidates.length && southPlaced < southExtraNeeded;
              i += 1
            ) {
              const candidate = dwarfholdCandidates[i];
              if (candidate.y < southBoundary) {
                continue;
              }
              if (
                tryPlaceDwarfhold(candidate, {
                  ...basePlacementContext,
                  placed,
                  minDistanceSq: southMinDistanceSq
                })
              ) {
                southPlaced += 1;
              }
            }
          }
        }
      }
    }

    if (mineKey && mountainSettlementCandidates.length > 0) {
      if (dwarfholdKey && mountainSettlementCandidates.length > 0) {
        mountainSettlementCandidates.sort((a, b) => b.score - a.score);
      }
      const mineCandidates = mountainSettlementCandidates.filter(
        (candidate) => candidate.isMountainTile && candidate.score >= 0.18
      );
      if (mineCandidates.length > 0) {
        const baseTarget = Math.max(1, Math.round(mineCandidates.length / 420));
        const maxMines = computeStructurePlacementLimit(baseTarget, 28, dwarfSettlementMultiplier);
        const minDistanceBase = 3;
        const minDistance = adjustMinDistance(minDistanceBase, dwarfSettlementFrequencyNormalized);
        const minDistanceSq = minDistance * minDistance;
        const placedMines = [];

        for (let i = 0; i < mineCandidates.length && placedMines.length < maxMines; i += 1) {
          const candidate = mineCandidates[i];
          const tile = tiles[candidate.y][candidate.x];
          if (!tile || tile.structure || tile.river) {
            continue;
          }
          if (!isMountainOverlay(tile.overlay)) {
            continue;
          }
          let tooClose = false;
          for (let j = 0; j < placedMines.length; j += 1) {
            const other = placedMines[j];
            const dx = candidate.x - other.x;
            const dy = candidate.y - other.y;
            if (dx * dx + dy * dy < minDistanceSq) {
              tooClose = true;
              break;
            }
          }
          if (!tooClose) {
            const distanceToHoldSq = computeNearestDistanceSq(candidate.x, candidate.y, dwarfholds);
            if (distanceToHoldSq !== Infinity && distanceToHoldSq < 9) {
              tooClose = true;
            }
          }
          if (!tooClose) {
            const distanceToHillholdSq = computeNearestDistanceSq(candidate.x, candidate.y, hillholds);
            if (distanceToHillholdSq !== Infinity && distanceToHillholdSq < 9) {
              tooClose = true;
            }
          }
          if (tooClose) {
            continue;
          }

          const name = generateMineName(rng);
          const nearestHoldInfo = findNearestPointWithDetails(candidate.x, candidate.y, dwarfholds);
          const details = generateMineDetails(name, rng, {
            nearestDwarfhold: nearestHoldInfo ? nearestHoldInfo.point : null,
            nearestHoldDistance: nearestHoldInfo ? nearestHoldInfo.distance : null
          });

          tile.structure = mineKey;
          tile.structureName = name;
          tile.structureDetails = details;

          placedMines.push(candidate);
          mines.push({ x: candidate.x, y: candidate.y, ...details });
        }

        if (placedMines.length === 0) {
          for (let i = 0; i < mineCandidates.length; i += 1) {
            const candidate = mineCandidates[i];
            const tile = tiles[candidate.y][candidate.x];
            if (!tile || tile.structure || tile.river) {
              continue;
            }
            if (!isMountainOverlay(tile.overlay)) {
              continue;
            }
            const name = generateMineName(rng);
            const nearestHoldInfo = findNearestPointWithDetails(candidate.x, candidate.y, dwarfholds);
            const details = generateMineDetails(name, rng, {
              nearestDwarfhold: nearestHoldInfo ? nearestHoldInfo.point : null,
              nearestHoldDistance: nearestHoldInfo ? nearestHoldInfo.distance : null
            });
            tile.structure = mineKey;
            tile.structureName = name;
            tile.structureDetails = details;
            mines.push({ x: candidate.x, y: candidate.y, ...details });
            break;
          }
        }
      }
    }
  }

  const hillholdKey = tileLookup.has('HILLHOLD') ? 'HILLHOLD' : null;
  if (hillholdKey) {
    const hillholdNoiseSeed = (seedNumber + 0x9b17a4c3) >>> 0;
    const hillholdCandidates = [];
    const hillSearchRadius = 6;
    const hillSearchRadiusSq = hillSearchRadius * hillSearchRadius;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        const overlayIsHill = isHillOverlayKey(tile.overlay) || isHillOverlayKey(tile.hillOverlay);
        if (!overlayIsHill) {
          continue;
        }
        if (!isLandBaseTile(tile.base)) {
          continue;
        }

        let bestMountainDistSq = Infinity;
        outer: for (let dy = -hillSearchRadius; dy <= hillSearchRadius; dy += 1) {
          const ny = y + dy;
          if (ny < 0 || ny >= height) {
            continue;
          }
          for (let dx = -hillSearchRadius; dx <= hillSearchRadius; dx += 1) {
            const nx = x + dx;
            if (nx < 0 || nx >= width) {
              continue;
            }
            const distSq = dx * dx + dy * dy;
            if (distSq === 0 || distSq > hillSearchRadiusSq) {
              continue;
            }
            const nIdx = ny * width + nx;
            if (mountainMask && mountainMask[nIdx]) {
              if (distSq < bestMountainDistSq) {
                bestMountainDistSq = distSq;
              }
              if (bestMountainDistSq <= 1) {
                break outer;
              }
              continue;
            }
            const neighborRow = tiles[ny];
            const neighborTile = neighborRow ? neighborRow[nx] : null;
            if (neighborTile && (isMountainOverlay(neighborTile.overlay) || isMountainOverlay(neighborTile.hillOverlay))) {
              if (distSq < bestMountainDistSq) {
                bestMountainDistSq = distSq;
              }
              if (bestMountainDistSq <= 1) {
                break outer;
              }
            }
          }
        }

        if (!Number.isFinite(bestMountainDistSq) || bestMountainDistSq === Infinity) {
          continue;
        }

        const mountainDistance = Math.sqrt(bestMountainDistSq);
        const mountainProximity = clamp(1 - mountainDistance / (hillSearchRadius + 0.5), 0, 1);
        const mountainScore = mountainScores ? mountainScores[idx] : 0;
        const mountainAffinity = Math.max(mountainProximity, mountainScore * 0.6);
        const heightValue = elevationField ? elevationField[idx] : seaLevel;

        let slopeSum = 0;
        let neighborCount = 0;
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const nIdx = ny * width + nx;
          if (waterMask[nIdx]) {
            continue;
          }
          slopeSum += Math.abs(heightValue - elevationField[nIdx]);
          neighborCount += 1;
        }
        const averageSlope = neighborCount > 0 ? slopeSum / neighborCount : 0;
        const slopeScore = clamp(averageSlope * 32, 0, 0.25);
        const elevationScore = clamp((heightValue - seaLevel + 0.08) * 1.3, 0, 0.22);
        const baseIsSnow = tile.base === snowTileKey;
        const climateBonus = baseIsSnow ? 0.1 : 0.16;
        const holdDistanceSq = computeNearestDistanceSq(x, y, dwarfholds);
        const holdBonus =
          holdDistanceSq === Infinity ? 0.04 : clamp(1 - Math.sqrt(holdDistanceSq) / 24, 0, 0.15);
        const noise = hashCoords(x, y, hillholdNoiseSeed) - 0.5;
        const score =
          climateBonus +
          mountainAffinity * 0.45 +
          slopeScore * 0.18 +
          elevationScore * 0.18 +
          holdBonus +
          noise * 0.12;

        if (score <= 0.22) {
          continue;
        }

        hillholdCandidates.push({
          x,
          y,
          score,
          mountainDistance,
          elevation: heightValue,
          holdDistanceSq
        });
      }
    }

    if (hillholdCandidates.length > 0) {
      hillholdCandidates.sort((a, b) => b.score - a.score);
      const baseTarget = Math.max(1, Math.round(hillholdCandidates.length / 900));
      const maxHillholds = computeStructurePlacementLimit(baseTarget, 18, dwarfSettlementMultiplier);
      const minDistanceBase = 4;
      const minDistance = adjustMinDistance(minDistanceBase, dwarfSettlementFrequencyNormalized);
      const minDistanceSq = minDistance * minDistance;
      const placed = [];

      for (let i = 0; i < hillholdCandidates.length && placed.length < maxHillholds; i += 1) {
        const candidate = hillholdCandidates[i];
        if (candidate.score < 0.24) {
          continue;
        }
        let tooClose = false;
        for (let j = 0; j < placed.length; j += 1) {
          const other = placed[j];
          const dx = candidate.x - other.x;
          const dy = candidate.y - other.y;
          if (dx * dx + dy * dy < minDistanceSq) {
            tooClose = true;
            break;
          }
        }
        if (tooClose) {
          continue;
        }

        const tile = tiles[candidate.y][candidate.x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        const overlayIsHill = isHillOverlayKey(tile.overlay) || isHillOverlayKey(tile.hillOverlay);
        if (!overlayIsHill) {
          continue;
        }
        const nearestHoldDistanceSq = computeNearestDistanceSq(candidate.x, candidate.y, dwarfholds);
        if (nearestHoldDistanceSq !== Infinity && nearestHoldDistanceSq < 9) {
          continue;
        }

        const name = generateHillholdName(rng);
        const nearestHoldInfo = findNearestPointWithDetails(candidate.x, candidate.y, dwarfholds);
        const details = generateHillholdDetails(name, rng, {
          nearestDwarfhold: nearestHoldInfo,
          mountainDistance: candidate.mountainDistance,
          hasNearbyHumanSettlement: false
        });

        tile.structure = hillholdKey;
        tile.structureName = name;
        tile.structureDetails = details;

        placed.push(candidate);
        hillholds.push({ x: candidate.x, y: candidate.y, ...details });
      }
    }
  }

  const damKey = tileLookup.has('DAM') ? 'DAM' : null;
  if (damKey && Array.isArray(dwarfholds) && dwarfholds.length > 0) {
    const damRadius = 10;
    const damRadiusSq = damRadius * damRadius;
    const damChance = 0.35;
    const damNoiseSeed = (seedNumber + 0x4b5f29d3) >>> 0;
    const isMountainTile = (tile) =>
      Boolean(tile) && (isMountainOverlay(tile.overlay) || isMountainOverlay(tile.hillOverlay));

    for (let y = 1; y < height - 1; y += 1) {
      const aboveRow = tiles[y - 1];
      const row = tiles[y];
      for (let x = 1; x < width - 1; x += 1) {
        const tile = row && row[x];
        if (!tile || tile.structure || !tile.river) {
          continue;
        }

        const aboveIdx = (y - 1) * width + x;
        const aboveTile = Array.isArray(aboveRow) ? aboveRow[x] : null;
        const aboveIsWater =
          (aboveIdx >= 0 && waterMask[aboveIdx]) ||
          (aboveTile && waterTileKey && aboveTile.base === waterTileKey);
        if (!aboveIsWater) {
          continue;
        }

        const leftTile = row[x - 1];
        const rightTile = row[x + 1];
        if (!isMountainTile(leftTile) || !isMountainTile(rightTile)) {
          continue;
        }

        const nearestHoldInfo = findNearestPointWithDetails(x, y, dwarfholds);
        if (!nearestHoldInfo || nearestHoldInfo.distanceSq > damRadiusSq) {
          continue;
        }

        const placementRoll = hashCoords(x, y, damNoiseSeed);
        if (placementRoll >= damChance) {
          continue;
        }

        const controllingHoldName =
          typeof nearestHoldInfo.point?.name === 'string' && nearestHoldInfo.point.name.trim()
            ? nearestHoldInfo.point.name.trim()
            : null;
        const damName = controllingHoldName ? `${controllingHoldName} Dam` : 'Dwarven Dam';

        tile.structure = damKey;
        tile.structureName = damName;
        tile.structureDetails = {
          type: 'dam',
          displayType: 'Dam',
          classification: 'Dwarven Works',
          name: damName,
          controllingHold: controllingHoldName,
          description: controllingHoldName
            ? `Engineers from ${controllingHoldName} raised a stone dam to harness the river.`
            : 'Dwarven engineers raised a stone dam to harness the river.'
        };
      }
    }
  }

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const idx = y * width + x;
      if (!waterMask[idx]) {
        continue;
      }
      let landNeighbors = 0;
      for (let i = 0; i < neighborOffsets8.length; i += 1) {
        const nx = x + neighborOffsets8[i][0];
        const ny = y + neighborOffsets8[i][1];
        if (waterMask[ny * width + nx] === 0) {
          landNeighbors += 1;
        }
      }
      if (landNeighbors >= 6) {
        waterMask[idx] = 0;
        const tile = tiles[y][x];
        const heightValue = elevationField[idx];
        tile.base = determineLandBaseTile(x, y, heightValue);
        tile.overlay = null;
        tile.hillOverlay = null;
        tile.structure = null;
        tile.structureName = null;
        tile.structureDetails = null;
        tile.river = null;
        tile.biomeType = null;
        tile.areaName = null;
      }
    }
  }

  if (snowPresenceField) {
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        const normalizedX = (x + 0.5) / width;
        const normalizedY = (y + 0.5) / height;
        const heightValue = elevationField[idx];
        snowPresenceField[idx] = computeSnowPresence(normalizedX, normalizedY, heightValue) ? 1 : 0;
      }
    }
  }

  if (hasMarshTile && hasSnowTile) {
    const snowMask = new Uint8Array(width * height);
    let snowCount = 0;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        const tile = tiles[y][x];
        if (tile && tile.base === snowTileKey) {
          snowMask[idx] = 1;
          snowCount += 1;
        }
      }
    }
    if (snowCount > 0) {
      const distanceField = computeEuclideanDistanceField(snowMask, width, height);
      const marshExclusionRadiusSq = 75 * 75;
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          const tile = tiles[y][x];
          if (tile && tile.base === marshTileKey && distanceField[idx] <= marshExclusionRadiusSq) {
            tile.base = grassTileKey;
          }
        }
      }
    }
  }

  if (hasSnowTile && hasIcebergOverlay && waterTileKey) {
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        const tile = tiles[y][x];
        if (!tile || tile.base !== snowTileKey) {
          continue;
        }
        let fullySurroundedByWater = true;
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (ny < 0) {
            if (y === 0) {
              continue;
            }
            fullySurroundedByWater = false;
            break;
          }
          if (nx < 0 || nx >= width || ny >= height) {
            fullySurroundedByWater = false;
            break;
          }
          if (!waterMask[ny * width + nx]) {
            fullySurroundedByWater = false;
            break;
          }
        }
        if (!fullySurroundedByWater) {
          continue;
        }
        waterMask[idx] = 1;
        tile.base = waterTileKey;
        tile.overlay = null;
        tile.hillOverlay = null;
        tile.structure = null;
        tile.structureName = null;
        tile.structureDetails = null;
        tile.river = null;
        tile.biomeType = null;
        tile.areaName = null;
        tile.waterDepth = 0;
        tile.coastProximity = 0;
        tile.desertProximity = 0;
        tile.volcanoProximity = 0;
        const variantNoise = hashCoords(x, y, icebergVariantSeed);
        const variantIndex = Math.min(
          icebergOverlayKeys.length - 1,
          Math.floor(variantNoise * icebergOverlayKeys.length)
        );
        const overlayKey = icebergOverlayKeys[Math.max(0, variantIndex)];
        tile.overlay = overlayKey;
        if (snowPresenceField) {
          snowPresenceField[idx] = 1;
        }
      }
    }
  }

  if (hasIcebergOverlay && snowPresenceField) {
    const icebergChance = 1 / 50;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (!waterMask[idx] || !snowPresenceField[idx]) {
          continue;
        }
        const normalizedY = (y + 0.5) / height;
        const latitude = 1 - normalizedY;
        if (latitude < snowLatitudeStart) {
          continue;
        }
        const presenceNoise = hashCoords(x, y, icebergPresenceSeed);
        if (presenceNoise >= icebergChance) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || tile.overlay) {
          continue;
        }
        const variantNoise = hashCoords(x, y, icebergVariantSeed);
        const variantIndex = Math.min(
          icebergOverlayKeys.length - 1,
          Math.floor(variantNoise * icebergOverlayKeys.length)
        );
        const overlayKey = icebergOverlayKeys[Math.max(0, variantIndex)];
        tile.overlay = overlayKey;
      }
    }
  }

  if (hasSnowTile) {
    const snowMask = new Uint8Array(width * height);
    let snowCount = 0;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        const tile = tiles[y][x];
        if (tile && tile.base === snowTileKey) {
          snowMask[idx] = 1;
          snowCount += 1;
        }
      }
    }
    snowDistanceField = snowCount > 0 ? computeEuclideanDistanceField(snowMask, width, height) : null;
  }

  const riverMap = buildRiverMap(
    elevationField,
    rainfallField,
    drainageField,
    width,
    height,
    seaLevel,
    waterMask,
    {
      frequencyNormalized: riverFrequencyNormalized,
      random: rng
    }
  );
  ensureRiverConnectionsToWater(riverMap, waterMask, tiles, width, height);

  const edgeConnectedOceanMask = computeEdgeConnectedWaterMask(
    waterMask,
    width,
    height
  );

  const coastlineFalloff = 4.2;
  let oceanMask = waterTileKey ? new Uint8Array(width * height) : null;

  if (waterTileKey) {
    const landMaskForDistance = new Uint8Array(width * height);
    for (let i = 0; i < waterMask.length; i += 1) {
      landMaskForDistance[i] = waterMask[i] ? 0 : 1;
    }
    const waterDistanceField = computeEuclideanDistanceField(landMaskForDistance, width, height);
    const landDistanceField = computeEuclideanDistanceField(waterMask, width, height);

    let maxWaterDepth = 0;
    for (let idx = 0; idx < waterDistanceField.length; idx += 1) {
      if (!waterMask[idx]) {
        continue;
      }
      const depth = Math.sqrt(waterDistanceField[idx]);
      if (depth > maxWaterDepth) {
        maxWaterDepth = depth;
      }
    }
    const depthNormalization = maxWaterDepth > 0 ? 1 / maxWaterDepth : 1;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        const tile = tiles[y][x];
        if (!tile) {
          continue;
        }
        if (waterMask[idx]) {
          const depth = Math.sqrt(waterDistanceField[idx]);
          tile.waterDepth = clamp(depth * depthNormalization, 0, 1);
          tile.coastProximity = 0;
          tile.marshProximity = 0;
          tile.desertProximity = 0;
          tile.volcanoProximity = 0;
        } else {
          const distanceToWater = Math.sqrt(landDistanceField[idx]);
          const proximity = clamp(1 - distanceToWater / coastlineFalloff, 0, 1);
          tile.coastProximity = proximity;
          tile.waterDepth = 0;
        }
      }
    }
  }

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      const tile = tiles[y][x];
      if (!tile) {
        continue;
      }
      if (riverMap[idx] === 0 || waterMask[idx]) {
        tile.river = null;
        continue;
      }
      const riverTile = resolveRiverTile(
        riverMap,
        width,
        height,
        x,
        y,
        waterMask,
        edgeConnectedOceanMask
      );
      tile.river = riverTile || null;
    }
  }

  if (mountainMask || mountainOverlayKey) {
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        const tile = tiles[y][x];
        if (!tile || !tile.river) {
          continue;
        }
        if (mountainMask && mountainMask[idx]) {
          mountainMask[idx] = 0;
        }
        if (tile.overlay && isMountainOverlay(tile.overlay)) {
          tile.overlay = null;
          tile.hillOverlay = null;
        }
      }
    }
  }

  const townKey = tileLookup.has('TOWN') ? 'TOWN' : null;
  const portTownKey = tileLookup.has('PORT_TOWN') ? 'PORT_TOWN' : null;
  const hamletKey = tileLookup.has('HAMLET') ? 'HAMLET' : null;
  const hamletSnowKey = tileLookup.has('HAMLET_SNOW') ? 'HAMLET_SNOW' : null;
  if (townKey) {
    const townCandidates = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || !isLandBaseTile(tile.base) || tile.overlay || tile.structure || tile.river) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSnow = hasSnowTile && tile.base === snowTileKey;
        if (!baseIsGrass && !baseIsSnow) {
          continue;
        }
        const elevationValue = elevationField[idx];
        const preferredElevation = seaLevel + 0.18;
        const elevationScore = clamp(1 - Math.abs(elevationValue - preferredElevation) * 2.1, 0, 1);
        const rainfallValue = rainfallField[idx];
        const drainageValue = drainageField[idx];
        const localMoisture = clamp(rainfallValue * 0.7 + (1 - drainageValue) * 0.3, 0, 1);
        let roughness = 0;
        let neighborCount = 0;
        let neighborhoodMoistureSum = 0;
        let neighborhoodMoistureSamples = 0;
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const nIdx = ny * width + nx;
          if (waterMask[nIdx]) {
            continue;
          }
          roughness += Math.abs(elevationValue - elevationField[nIdx]);
          neighborCount += 1;
          const neighborMoisture = clamp(
            rainfallField[nIdx] * 0.7 + (1 - drainageField[nIdx]) * 0.3,
            0,
            1
          );
          neighborhoodMoistureSum += neighborMoisture;
          neighborhoodMoistureSamples += 1;
        }
        const averageRoughness = neighborCount > 0 ? roughness / neighborCount : 0;
        const slopeScore = clamp(1 - averageRoughness * 12, 0, 1);
        const edgeDistance = Math.min(x, width - 1 - x, y, height - 1 - y);
        const maxEdgeDistance = Math.max(1, Math.min(width, height) / 2);
        const edgeScore = clamp(edgeDistance / maxEdgeDistance, 0, 1);
        const neighborhoodMoisture =
          neighborhoodMoistureSamples > 0
            ? neighborhoodMoistureSum / neighborhoodMoistureSamples
            : localMoisture;
        const blendedMoisture = localMoisture * 0.65 + neighborhoodMoisture * 0.35;
        const dryness = 1 - blendedMoisture;
        const humidityExcess = Math.max(0, blendedMoisture - 0.52);
        const swampPressure = Math.max(0, blendedMoisture - 0.68);
        const aridPressure = Math.max(0, dryness - 0.55);
        const poorDrainage = Math.max(0, 0.48 - drainageValue);
        const normalizedY = (y + 0.5) / height;
        const latitudeFactor = 1 - Math.abs(normalizedY - 0.5) * 2;
        const elevationAboveSea = Math.max(elevationValue - seaLevel, 0);
        const elevationCooling = clamp(1 - elevationAboveSea * 3.5, 0, 1);
        const approximateTemperature = clamp(
          latitudeFactor * 0.75 + elevationCooling * 0.25,
          0,
          1
        );
        const relativeElevation = elevationValue - seaLevel;
        let biomeTendency = 'grassland';
        if (relativeElevation < 0.05) {
          if (blendedMoisture > 0.7) {
            biomeTendency = 'marsh';
          } else if (blendedMoisture > 0.54 && approximateTemperature > 0.52) {
            biomeTendency = 'forest';
          }
        } else if (blendedMoisture < 0.3) {
          biomeTendency = 'badlands';
        } else if (approximateTemperature < 0.3) {
          biomeTendency = 'tundra';
        } else if (blendedMoisture > 0.72) {
          biomeTendency = 'marsh';
        } else if (blendedMoisture > 0.52 && approximateTemperature > 0.55) {
          biomeTendency = 'forest';
        }
        let grassPreference = clamp(
          1 - humidityExcess * 1.4 - swampPressure * 1.25 - aridPressure * 1.05 - poorDrainage * 0.55,
          0,
          1
        );
        if (biomeTendency === 'forest') {
          grassPreference *= 0.12;
        } else if (biomeTendency === 'marsh') {
          grassPreference *= 0.08;
        } else if (biomeTendency === 'tundra' || biomeTendency === 'badlands') {
          grassPreference *= 0.35;
        }
        if (!baseIsSnow && grassPreference < 0.22) {
          continue;
        }
        let riverAdjacency = 0;
        for (let i = 0; i < cardinalOffsets.length; i += 1) {
          const nx = x + cardinalOffsets[i][0];
          const ny = y + cardinalOffsets[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const neighborTile = tiles[ny][nx];
          if (neighborTile && neighborTile.river) {
            riverAdjacency += 1;
          }
        }
        const riverScore = riverAdjacency > 0 ? clamp(0.18 + riverAdjacency * 0.06, 0, 0.32) : 0;
        const biomePenalty =
          biomeTendency === 'forest'
            ? 0.24
            : biomeTendency === 'marsh'
            ? 0.18
            : biomeTendency === 'tundra' || biomeTendency === 'badlands'
            ? 0.08
            : 0;
        const score =
          elevationScore * 0.35 +
          slopeScore * 0.2 +
          edgeScore * 0.12 +
          riverScore +
          grassPreference * 0.32 -
          biomePenalty +
          rng() * 0.12;
        townCandidates.push({ x, y, score, grassPreference, baseIsSnow });
      }
    }

    if (townCandidates.length > 0) {
      townCandidates.sort((a, b) => b.score - a.score);
      const area = width * height;
      const baseTarget = Math.max(2, Math.round(area / 4800));
      const maxTowns = computeStructurePlacementLimit(baseTarget, 36, humanSettlementMultiplier);
      const baseMinDistance = Math.max(6, Math.round(Math.min(width, height) / 12));
      const minDistance = adjustMinDistance(baseMinDistance, humanSettlementFrequencyNormalized);
      const minDistanceSq = minDistance * minDistance;
      const placed = [];

      for (let i = 0; i < townCandidates.length; i += 1) {
        if (placed.length >= maxTowns) {
          break;
        }
        const candidate = townCandidates[i];
        if (
          !candidate.baseIsSnow &&
          candidate.grassPreference != null &&
          candidate.grassPreference < 0.25
        ) {
          continue;
        }
        let tooClose = false;
        for (let j = 0; j < placed.length; j += 1) {
          const other = placed[j];
          const dx = candidate.x - other.x;
          const dy = candidate.y - other.y;
          if (dx * dx + dy * dy < minDistanceSq) {
            tooClose = true;
            break;
          }
        }
        if (tooClose) {
          continue;
        }
        const tile = tiles[candidate.y][candidate.x];
        if (!tile || !isLandBaseTile(tile.base) || tile.overlay || tile.structure || tile.river) {
          continue;
        }
        const baseIsSnowPlacement = hasSnowTile && tile.base === snowTileKey;
        const name = baseIsSnowPlacement ? generateSnowVillageName(rng) : generateTownName(rng);
        const details = generateTownDetails(name, rng, { snowVillage: baseIsSnowPlacement });
        const isSmallVillage = details.type === 'village' && details.population < 100;
        if (baseIsSnowPlacement && !isSmallVillage) {
          continue;
        }
        let structureKey = townKey;
        if (portTownKey) {
          let touchesWater = false;
          for (let i = 0; i < neighborOffsets8.length; i += 1) {
            const nx = candidate.x + neighborOffsets8[i][0];
            const ny = candidate.y + neighborOffsets8[i][1];
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              continue;
            }
            const nIdx = ny * width + nx;
            if (waterMask[nIdx]) {
              touchesWater = true;
              break;
            }
          }
          if (touchesWater) {
            structureKey = portTownKey;
          }
        }
        let isHamletStructure = false;
        if (isSmallVillage) {
          if (baseIsSnowPlacement) {
            const snowHamletChance = 0.5;
            if (hamletSnowKey && rng() < snowHamletChance) {
              structureKey = hamletSnowKey;
              isHamletStructure = true;
            } else if (!hamletSnowKey && hamletKey && rng() < snowHamletChance) {
              structureKey = hamletKey;
              isHamletStructure = true;
            }
          } else if (hamletKey) {
            structureKey = hamletKey;
            isHamletStructure = true;
          }
        }
        tile.structure = structureKey;
        tile.structureName = name;
        tile.structureDetails = details;
        towns.push({ x: candidate.x, y: candidate.y, ...details });
        if (isHamletStructure) {
          recordHamletPlacement(candidate.x, candidate.y, baseIsSnowPlacement);
        }
        placed.push(candidate);
      }
    }
  }

  if (hamletKey) {
    const totalTiles = width * height;
    const hamletExpansionNoiseSeed = (seedNumber + 0x62bd3e45) >>> 0;
    const baseGrassHamlets = hamletPlacementStats.grass;
    const desiredGrassHamlets = Math.max(
      baseGrassHamlets * 6,
      Math.round((totalTiles / 12000) * humanSettlementMultiplier)
    );
    const additionalHamletsNeeded = Math.max(0, desiredGrassHamlets - baseGrassHamlets);
    if (additionalHamletsNeeded > 0) {
      const hamletCandidates = [];
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (waterMask[idx]) {
            continue;
          }
          const tile = tiles[y][x];
          if (!tile || tile.structure || tile.river) {
            continue;
          }
          if (tile.base !== grassTileKey) {
            continue;
          }
          if (mountainOverlayKey && isMountainOverlay(tile.overlay)) {
            continue;
          }
          if (isTreeOverlayKey(tile.overlay)) {
            continue;
          }
          const settlementDistSq = computeNearestDistanceSq(x, y, towns);
          if (settlementDistSq < 25) {
            continue;
          }
          const hamletDistSq = computeNearestDistanceSq(x, y, hamletPoints);
          if (hamletDistSq < 25) {
            continue;
          }
          const rainfallValue = rainfallField[idx];
          const drainageValue = drainageField[idx];
          const moisture = clamp(rainfallValue * 0.7 + (1 - drainageValue) * 0.3, 0, 1);
          const moistureScore = clamp(1 - Math.abs(moisture - 0.55) * 2.2, 0, 1) * 0.24;
          let grassNeighbors = 0;
          let neighborSamples = 0;
          let waterAdjacency = 0;
          for (let i = 0; i < neighborOffsets8.length; i += 1) {
            const nx = x + neighborOffsets8[i][0];
            const ny = y + neighborOffsets8[i][1];
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              continue;
            }
            const nIdx = ny * width + nx;
            if (waterMask[nIdx]) {
              waterAdjacency += 1;
              continue;
            }
            const neighborTile = tiles[ny][nx];
            if (!neighborTile) {
              continue;
            }
            if (neighborTile.river) {
              waterAdjacency += 1;
            }
            if (neighborTile.base === grassTileKey) {
              grassNeighbors += 1;
            }
            neighborSamples += 1;
          }
          const adjacencyScore = neighborSamples > 0 ? (grassNeighbors / neighborSamples) * 0.18 : 0;
          const waterScore = clamp(waterAdjacency * 0.04, 0, 0.18);
          const settlementDistance = Number.isFinite(settlementDistSq)
            ? Math.sqrt(settlementDistSq)
            : Math.max(width, height);
          const proximityScore = clamp((settlementDistance - 6) / 14, 0, 1) * 0.2;
          const latitude = (y + 0.5) / height;
          const latitudeWave = Math.sin((latitude + 0.15) * Math.PI * 2);
          const latitudeScore = Math.abs(latitudeWave) * 0.08;
          const noise = hashCoords(x, y, hamletExpansionNoiseSeed) - 0.5;
          const score =
            0.28 +
            moistureScore +
            adjacencyScore +
            waterScore +
            proximityScore +
            latitudeScore +
            noise * 0.18 +
            rng() * 0.08;
          hamletCandidates.push({ x, y, score });
        }
      }

      if (hamletCandidates.length > 0) {
        hamletCandidates.sort((a, b) => b.score - a.score);
        const minDistance = 5;
        const minDistanceSq = minDistance * minDistance;
        let placed = 0;
        for (let i = 0; i < hamletCandidates.length; i += 1) {
          if (placed >= additionalHamletsNeeded) {
            break;
          }
          const candidate = hamletCandidates[i];
          if (candidate.score < 0.24) {
            continue;
          }
          const distanceToExistingHamletSq = computeNearestDistanceSq(
            candidate.x,
            candidate.y,
            hamletPoints
          );
          if (distanceToExistingHamletSq < minDistanceSq) {
            continue;
          }
          const distanceToTownsSq = computeNearestDistanceSq(candidate.x, candidate.y, towns);
          if (distanceToTownsSq < 20) {
            continue;
          }
          const tile = tiles[candidate.y][candidate.x];
          if (!tile || tile.structure || tile.river) {
            continue;
          }
          if (tile.base !== grassTileKey) {
            continue;
          }
          if (mountainOverlayKey && isMountainOverlay(tile.overlay)) {
            continue;
          }
          if (isTreeOverlayKey(tile.overlay)) {
            continue;
          }
          const name = generateTownName(rng);
          const details = generateHamletDetails(name, rng, { snowHamlet: false });
          tile.structure = hamletKey;
          tile.structureName = name;
          tile.structureDetails = details;
          towns.push({ x: candidate.x, y: candidate.y, ...details });
          recordHamletPlacement(candidate.x, candidate.y, false);
          placed += 1;
        }
      }
    }
  }

  const baseHillOverlayOptions = ['HILLS', 'HILLS_VARIANT_A', 'HILLS_VARIANT_B'].filter((key) =>
    tileLookup.has(key)
  );
  const primaryHillOverlayKey = tileLookup.has('HILLS') ? 'HILLS' : baseHillOverlayOptions[0] || null;
  const snowHillOverlayKey = tileLookup.has('HILLS_SNOW') ? 'HILLS_SNOW' : primaryHillOverlayKey;
  const hillOverlayPresenceKeys = [...baseHillOverlayOptions, snowHillOverlayKey].filter(Boolean);
  const hillOverlayPresenceKeySet = new Set(hillOverlayPresenceKeys);
  const hillOverlayKeys = Array.from(hillOverlayPresenceKeySet);
  const hillVariantSelectionSeed = (seedNumber + 0x3ab41d7f) >>> 0;
  const selectBaseHillOverlayKey = (x, y) => {
    if (baseHillOverlayOptions.length === 0) {
      return null;
    }
    if (baseHillOverlayOptions.length === 1) {
      return baseHillOverlayOptions[0];
    }
    const noise = hashCoords(x, y, hillVariantSelectionSeed);
    const index = Math.min(
      Math.floor(noise * baseHillOverlayOptions.length),
      baseHillOverlayOptions.length - 1
    );
    return baseHillOverlayOptions[index];
  };
  const isHillOverlay = (overlayKey) => overlayKey != null && hillOverlayPresenceKeySet.has(overlayKey);
  const getHillOverlayKeyForTile = (tile) => {
    if (!tile) {
      return null;
    }
    if (tile.hillOverlay && isHillOverlay(tile.hillOverlay)) {
      return tile.hillOverlay;
    }
    if (tile.overlay && isHillOverlay(tile.overlay)) {
      return tile.overlay;
    }
    return null;
  };
  if (hillOverlayPresenceKeySet.size > 0 && (primaryHillOverlayKey || snowHillOverlayKey)) {
    const hillUpperThreshold = hasMountainTile
      ? mountainBaseThreshold
      : Math.min(0.92, seaLevel + 0.32);
    const hillLowerBaseline = hasMountainTile
      ? mountainBaseThreshold - Math.max(0.16, mountainRange * 0.9)
      : seaLevel + 0.12;
    const hillLowerThreshold = clamp(
      hillLowerBaseline,
      seaLevel + 0.08,
      hillUpperThreshold - 0.04
    );
    if (hillUpperThreshold - hillLowerThreshold > 0.015) {
      const hillRange = Math.max(hillUpperThreshold - hillLowerThreshold, 0.0001);
      const hillPresenceSeed = (seedNumber + 0x0d4d0015) >>> 0;
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (waterMask[idx]) {
            continue;
          }
          const tile = tiles[y][x];
          if (
            !tile ||
            tile.overlay ||
            tile.structure ||
            tile.river
          ) {
            continue;
          }
          const baseIsGrass = tile.base === grassTileKey;
          const baseIsSnow = tile.base === snowTileKey;
          if (!baseIsGrass && !baseIsSnow) {
            continue;
          }
          const heightValue = elevationField[idx];
          if (heightValue < hillLowerThreshold || heightValue >= hillUpperThreshold) {
            continue;
          }
          let slopeSum = 0;
          let neighborCount = 0;
          let hasMountainNeighbor = false;
          for (let i = 0; i < neighborOffsets8.length; i += 1) {
            const nx = x + neighborOffsets8[i][0];
            const ny = y + neighborOffsets8[i][1];
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              continue;
            }
            const nIdx = ny * width + nx;
            const neighborHeight = elevationField[nIdx];
            slopeSum += Math.abs(heightValue - neighborHeight);
            neighborCount += 1;
            if (!hasMountainNeighbor) {
              if (mountainMask && mountainMask[nIdx]) {
                hasMountainNeighbor = true;
              } else {
                const neighborTile = tiles[ny][nx];
                if (
                  neighborTile &&
                  mountainOverlayKey &&
                  isMountainOverlay(neighborTile.overlay)
                ) {
                  hasMountainNeighbor = true;
                }
              }
            }
          }
          const averageSlope = neighborCount > 0 ? slopeSum / neighborCount : 0;
          const slopeScore = clamp((averageSlope - 0.01) * 32, 0, 1);
          if (slopeScore < 0.08 && !hasMountainNeighbor) {
            continue;
          }
          const heightScore = clamp((heightValue - hillLowerThreshold) / hillRange, 0, 1);
          let mountainBonus = hasMountainNeighbor ? 0.25 : 0;
          if (!hasMountainNeighbor && mountainScores) {
            mountainBonus = Math.max(mountainBonus, clamp(mountainScores[idx] * 0.2, 0, 0.2));
          }
          const noiseValue = hashCoords(x, y, hillPresenceSeed) - 0.5;
          const compositeScore =
            heightScore * 0.6 +
            slopeScore * 0.3 +
            mountainBonus +
            noiseValue * 0.12;
          const threshold = 0.5 - mountainBonus * 0.18;
          if (compositeScore > threshold) {
            const overlayKey = baseIsSnow ? snowHillOverlayKey : selectBaseHillOverlayKey(x, y);
            if (overlayKey) {
              tile.hillOverlay = overlayKey;
              tile.overlay = overlayKey;
            }
          }
        }
      }
    }
  }

  const caveKey = tileLookup.has('CAVE') ? 'CAVE' : null;
  if (caveKey) {
    const caveCandidates = [];
    const caveNoiseSeed = (seedNumber + 0x21f0e1eb) >>> 0;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSnow = tile.base === snowTileKey;
        if (!baseIsGrass && !baseIsSnow) {
          continue;
        }
        const overlayIsHill =
          isHillOverlay(tile.overlay) || isHillOverlay(tile.hillOverlay);
        if (tile.overlay && !isHillOverlay(tile.overlay)) {
          continue;
        }
        const heightValue = elevationField[idx];
        let slopeSum = 0;
        let neighborCount = 0;
        let mountainNeighbors = 0;
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const nIdx = ny * width + nx;
          if (waterMask[nIdx]) {
            continue;
          }
          slopeSum += Math.abs(heightValue - elevationField[nIdx]);
          neighborCount += 1;
          if (mountainMask && mountainMask[nIdx]) {
            mountainNeighbors += 1;
          } else {
            const neighborTile = tiles[ny][nx];
            if (neighborTile && mountainOverlayKey && isMountainOverlay(neighborTile.overlay)) {
              mountainNeighbors += 1;
            }
          }
        }
        const averageSlope = neighborCount > 0 ? slopeSum / neighborCount : 0;
        const slopeScore = clamp((averageSlope - 0.009) * 36, 0, 1);
        const hillBonus = overlayIsHill ? 0.35 : 0;
        const mountainBonus = Math.min(0.25, mountainNeighbors * 0.08);
        const elevationScore = clamp((heightValue - seaLevel) * 1.9, 0, 1);
        const noise = hashCoords(x, y, caveNoiseSeed) - 0.5;
        const compositeScore =
          hillBonus + slopeScore * 0.45 + mountainBonus + elevationScore * 0.2 + noise * 0.15;
        if (compositeScore > 0.22) {
          caveCandidates.push({ x, y, score: compositeScore, hill: overlayIsHill });
        }
      }
    }

    if (caveCandidates.length > 0) {
      caveCandidates.sort((a, b) => b.score - a.score);
      const area = width * height;
      const baseTarget = Math.max(1, Math.round(area / 9000));
      const maxCaves = computeStructurePlacementLimit(baseTarget, 22, 1);
      const minDistanceBase = 6;
      const minDistance = Math.max(3, minDistanceBase);
      const placed = [];

      for (let i = 0; i < caveCandidates.length; i += 1) {
        if (placed.length >= maxCaves) {
          break;
        }
        const candidate = caveCandidates[i];
        if (candidate.score < 0.28) {
          continue;
        }
        const requiredDistance = candidate.hill ? Math.max(3, minDistance - 1) : minDistance;
        const requiredDistanceSq = requiredDistance * requiredDistance;
        let tooClose = false;
        for (let j = 0; j < placed.length; j += 1) {
          const other = placed[j];
          const dx = candidate.x - other.x;
          const dy = candidate.y - other.y;
          if (dx * dx + dy * dy < requiredDistanceSq) {
            tooClose = true;
            break;
          }
        }
        if (tooClose) {
          continue;
        }
        const tile = tiles[candidate.y][candidate.x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        const overlay = tile.overlay;
        const overlayIsHill = isHillOverlay(overlay) || isHillOverlay(tile.hillOverlay);
        if (overlay && !isHillOverlay(overlay)) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSnow = tile.base === snowTileKey;
        if (!baseIsGrass && !baseIsSnow) {
          continue;
        }
        tile.structure = caveKey;
        tile.structureName = 'Cave';
        tile.structureDetails = { type: 'cave' };
        placed.push(candidate);
        caves.push({ x: candidate.x, y: candidate.y });
      }
    }
  }

  const hasTreeTile = tileLookup.has('TREE');
  const treeOverlayKey = hasTreeTile ? 'TREE' : null;
  const treeSnowOverlayKey = hasTreeTile && tileLookup.has('TREE_SNOW') ? 'TREE_SNOW' : treeOverlayKey;
  const treeJungleOverlayKey = hasTreeTile && tileLookup.has('JUNGLE_TREE') ? 'JUNGLE_TREE' : null;
  const treeLoneOverlayKey = hasTreeTile && tileLookup.has('TREE_LONE') ? 'TREE_LONE' : null;
  let jungleMask = null;
  const treeOverlayKeys = [
    treeOverlayKey,
    treeSnowOverlayKey,
    treeJungleOverlayKey,
    treeLoneOverlayKey
  ].filter(
    (key, index, array) => key && array.indexOf(key) === index
  );
  const isTreeOverlayKey = (overlayKey) =>
    hasTreeTile && overlayKey != null && treeOverlayKeys.includes(overlayKey);
  const isDesertBaseTile = (baseKey) =>
    hasSandTile && (baseKey === sandTileKey || (hasBadlandsTile && baseKey === badlandsTileKey));
  const selectTreeOverlayForTile = (tile, idx) => {
    if (!tile || !treeOverlayKey) {
      return treeOverlayKey;
    }
    if (tile.base === snowTileKey && treeSnowOverlayKey) {
      return treeSnowOverlayKey;
    }
    if (treeJungleOverlayKey && jungleMask && jungleMask[idx]) {
      return treeJungleOverlayKey;
    }
    return treeOverlayKey;
  };
  let treeDensityField = null;

  if (hasTreeTile) {
    const treeBaseSeed = (seedNumber + 0x27d4eb2f) >>> 0;
    const treeDetailSeed = (seedNumber + 0x165667b1) >>> 0;
    const treeBaseScale = (isFirstAge ? 2.4 : 3.3) + rng() * (isFirstAge ? 1.6 : 2.6);
    const treeDetailScale = (isFirstAge ? 6.6 : 8.4) + rng() * (isFirstAge ? 4.6 : 5.6);
    const treeBaseOffsetX = rng() * 4096;
    const treeBaseOffsetY = rng() * 4096;
    const treeDetailOffsetX = rng() * 8192;
    const treeDetailOffsetY = rng() * 8192;
    const treeClusterSeed = isFirstAge ? 0 : (seedNumber + 0x4f1bbcd1) >>> 0;
    const treeClusterScale = isFirstAge ? 1 : 8.2 + rng() * 4.8;
    const treeClusterOffsetX = isFirstAge ? 0 : rng() * 8192;
    const treeClusterOffsetY = isFirstAge ? 0 : rng() * 8192;
    treeDensityField = new Float32Array(width * height);
    const treeMask = new Uint8Array(width * height);
    if (treeJungleOverlayKey) {
      jungleMask = new Uint8Array(width * height);
      const jungleBaseSeed = (seedNumber + 0x4b9c1fcb) >>> 0;
      const jungleDetailSeed = (seedNumber + 0x1e35a9bd) >>> 0;
      const jungleBaseScale = 1.65 + rng() * 1.15;
      const jungleDetailScale = 5.1 + rng() * 2.9;
      const jungleBaseOffsetX = rng() * 4096;
      const jungleBaseOffsetY = rng() * 4096;
      const jungleDetailOffsetX = rng() * 8192;
      const jungleDetailOffsetY = rng() * 8192;
      const jungleSnowBufferSq = 100 * 100;
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (waterMask[idx]) {
            continue;
          }
          const tile = tiles[y][x];
          if (!tile || !isLandBaseTile(tile.base)) {
            continue;
          }
          if (hasSnowTile && tile.base === snowTileKey) {
            continue;
          }
          if (hasSandTile && tile.base === sandTileKey) {
            continue;
          }
          if (hasBadlandsTile && tile.base === badlandsTileKey) {
            continue;
          }
          if (snowDistanceField && snowDistanceField[idx] < jungleSnowBufferSq) {
            continue;
          }
          const normalizedX = (x + 0.5) / width;
          const normalizedY = (y + 0.5) / height;
          const baseNoise = octaveNoise(
            (normalizedX + jungleBaseOffsetX) * jungleBaseScale,
            (normalizedY + jungleBaseOffsetY) * jungleBaseScale,
            jungleBaseSeed,
            3,
            0.6,
            1.95
          );
          const detailNoise = octaveNoise(
            (normalizedX + jungleDetailOffsetX) * jungleDetailScale,
            (normalizedY + jungleDetailOffsetY) * jungleDetailScale,
            jungleDetailSeed,
            4,
            0.5,
            2.35
          );
          const noiseValue = baseNoise * 0.68 + detailNoise * 0.32;
          const rainfallValue = rainfallField[idx];
          const drainageValue = drainageField[idx];
          const humidity = clamp(rainfallValue * 0.82 + (1 - drainageValue) * 0.18, 0, 1);
          const equatorialAlignment = clamp(1 - Math.abs(normalizedY - 0.5) * 3.4, 0, 1);
          const elevationValue = elevationField[idx];
          const elevationAboveSea = Math.max(0, elevationValue - seaLevel);
          const elevationScore = clamp(0.28 - elevationAboveSea, 0, 1);
          const elevationPenalty = clamp(elevationAboveSea * 3.1, 0, 1);
          const heat = clamp(equatorialAlignment * 0.85 + (1 - elevationPenalty) * 0.25, 0, 1);
          if (heat < 0.68 || humidity < 0.74 || equatorialAlignment < 0.45) {
            continue;
          }
          const drainageScore = clamp(0.55 - drainageValue, 0, 1);
          const combinedScore =
            (heat - 0.68) * 0.35 +
            (humidity - 0.74) * 0.45 +
            (equatorialAlignment - 0.45) * 0.25 +
            drainageScore * 0.2 +
            elevationScore * 0.3 +
            (noiseValue - 0.55) * 0.25;
          if (combinedScore > 0.12) {
            jungleMask[idx] = 1;
          }
        }
      }
    }
    const clusterNeighborOffsets = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1]
    ];
    const baseSeedThreshold = isFirstAge ? 0.66 : 0.6;
    const baseSoftSeedThreshold = isFirstAge ? 0.56 : 0.5;
    const baseGrowthBaseline = isFirstAge ? 0.48 : 0.42;
    const baseNeighborBonus = isFirstAge ? 0.08 : 0.085;
    const baseDensityAlwaysAdd = isFirstAge ? 0.6 : 0.58;
    const baseSoftSeedMultiplier = isFirstAge ? 1.8 : 1.85;
    const growthSpeedModifier = clamp(
      (isFirstAge ? 0.45 : 0.35) + forestBias * 0.2,
      isFirstAge ? 0.35 : 0.28,
      isFirstAge ? 0.8 : 0.65
    );
    const growthIterationModifier = clamp(
      (isFirstAge ? 0.5 : 0.38) + forestBias * 0.25,
      isFirstAge ? 0.5 : 0.35,
      isFirstAge ? 0.95 : 0.75
    );
    const seedThreshold = clamp(
      baseSeedThreshold - forestBias * (isFirstAge ? 0.18 : 0.13),
      0.35,
      0.92
    );
    const softSeedThreshold = clamp(
      baseSoftSeedThreshold - forestBias * (isFirstAge ? 0.16 : 0.13),
      0.25,
      0.88
    );
    const growthBaseline = clamp(
      baseGrowthBaseline - forestBias * (isFirstAge ? 0.14 : 0.12),
      0.2,
      0.72
    );
    const neighborBonus = clamp(
      baseNeighborBonus + forestBias * (isFirstAge ? 0.04 : 0.035),
      0.02,
      0.12
    );
    const densityAlwaysAddThreshold = clamp(
      baseDensityAlwaysAdd - forestBias * (isFirstAge ? 0.12 : 0.08) + (1 - growthSpeedModifier) * 0.1,
      0.45,
      0.84
    );
    const softSeedMultiplier = clamp(
      baseSoftSeedMultiplier + forestBias * (isFirstAge ? 0.6 : 0.55),
      0.8,
      2.2
    );
    const maxGrowthIterations = Math.max(1, Math.round((isFirstAge ? 2 : 1.5) * growthIterationModifier));

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        const normalizedX = (x + 0.5) / width;
        const normalizedY = (y + 0.5) / height;
        const baseNoise = octaveNoise(
          (normalizedX + treeBaseOffsetX) * treeBaseScale,
          (normalizedY + treeBaseOffsetY) * treeBaseScale,
          treeBaseSeed,
          3,
          0.55,
          2.05
        );
        const detailNoise = octaveNoise(
          (normalizedX + treeDetailOffsetX) * treeDetailScale,
          (normalizedY + treeDetailOffsetY) * treeDetailScale,
          treeDetailSeed,
          4,
          0.5,
          2.3
        );
        const elevationValue = elevationField[idx];
        const elevationPreference = clamp(1 - Math.abs(elevationValue - (seaLevel + 0.12)) * 2.6, 0, 1);
        let density = baseNoise * 0.68 + detailNoise * 0.32;
        density = clamp(density * 0.6 + elevationPreference * 0.4, 0, 1);
        const rainfallValue = rainfallField[idx];
        density = clamp(density * 0.55 + rainfallValue * 0.45, 0, 1);
        const biasMultiplier = isFirstAge ? 1 + forestBias * 0.25 : 1 + forestBias * 0.2;
        density = clamp(density * biasMultiplier, 0, 1);
        // Apply a small additive push so that the highest slider values can still create forests
        // even when the multiplicative bias is already clamped by rainfall or elevation limits.
        density = clamp(density + forestBias * 0.08, 0, 1);
        if (!isFirstAge) {
          const clusterNoise = octaveNoise(
            (normalizedX + treeClusterOffsetX) * treeClusterScale,
            (normalizedY + treeClusterOffsetY) * treeClusterScale,
            treeClusterSeed,
            3,
            0.55,
            2.2
          );
          const clusterWeight = clamp((clusterNoise - 0.35) * 1.6, 0, 1);
          density = clamp(density * (0.55 + clusterWeight * 0.65), 0, 1);
        }
        treeDensityField[idx] = density;
      }
    }

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        const hillOverlayKeyForTile = getHillOverlayKeyForTile(tile);
        const overlay = tile.overlay;
        const overlayBlocksTree = overlay && (!hillOverlayKeyForTile || overlay !== hillOverlayKeyForTile);
        if (
          overlayBlocksTree ||
          !isLandBaseTile(tile.base) ||
          tile.structure ||
          tile.river ||
          isDesertBaseTile(tile.base)
        ) {
          continue;
        }
        const density = treeDensityField[idx];
        if (
          density >= seedThreshold ||
          (density > softSeedThreshold && rng() < (density - softSeedThreshold) * softSeedMultiplier)
        ) {
          treeMask[idx] = 1;
          if (tile.base === marshTileKey) {
            tile.base = grassTileKey;
          }
          if (hillOverlayKeyForTile) {
            tile.hillOverlay = hillOverlayKeyForTile;
          }
          tile.overlay = selectTreeOverlayForTile(tile, idx);
        }
      }
    }

    for (let iteration = 0; iteration < maxGrowthIterations; iteration += 1) {
      const additions = [];
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (waterMask[idx]) {
            continue;
          }
          const tile = tiles[y][x];
          const hillOverlayKeyForTile = getHillOverlayKeyForTile(tile);
          const overlay = tile.overlay;
          const overlayBlocksTree = overlay && (!hillOverlayKeyForTile || overlay !== hillOverlayKeyForTile);
          if (
            overlayBlocksTree ||
            !isLandBaseTile(tile.base) ||
            tile.structure ||
            tile.river ||
            isDesertBaseTile(tile.base)
          ) {
            continue;
          }
          let neighborTrees = 0;
          for (let i = 0; i < clusterNeighborOffsets.length; i += 1) {
            const nx = x + clusterNeighborOffsets[i][0];
            const ny = y + clusterNeighborOffsets[i][1];
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              continue;
            }
            const nIdx = ny * width + nx;
            if (treeMask[nIdx]) {
              neighborTrees += 1;
            }
          }
          if (neighborTrees < 2) {
            continue;
          }
          const density = treeDensityField[idx];
          const baseGrowthChance =
            (density - growthBaseline) / 0.52 + neighborTrees * neighborBonus;
          const probability = clamp(baseGrowthChance * growthSpeedModifier, 0, 1);
          if (density > densityAlwaysAddThreshold || rng() < probability) {
            additions.push(idx);
          }
        }
      }

      if (additions.length === 0) {
        break;
      }

      for (let i = 0; i < additions.length; i += 1) {
        const idx = additions[i];
        if (treeMask[idx]) {
          continue;
        }
        if (waterMask[idx]) {
          continue;
        }
        const y = Math.floor(idx / width);
        const x = idx % width;
        const tile = tiles[y][x];
        const hillOverlayKeyForTile = getHillOverlayKeyForTile(tile);
        const overlay = tile.overlay;
        const overlayBlocksTree = overlay && (!hillOverlayKeyForTile || overlay !== hillOverlayKeyForTile);
        if (
          overlayBlocksTree ||
          !isLandBaseTile(tile.base) ||
          tile.structure ||
          tile.river ||
          isDesertBaseTile(tile.base)
        ) {
          continue;
        }
        treeMask[idx] = 1;
        if (tile.base === marshTileKey) {
          tile.base = grassTileKey;
        }
        if (hillOverlayKeyForTile) {
          tile.hillOverlay = hillOverlayKeyForTile;
        }
        tile.overlay = selectTreeOverlayForTile(tile, idx);
      }
    }

    if ((hasSandTile || hasBadlandsTile) && treeOverlayKeys.length > 0) {
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (!treeMask[idx]) {
            continue;
          }
          const tile = tiles[y][x];
          if (!tile || !isTreeOverlayKey(tile.overlay)) {
            continue;
          }
          let adjacentToDesert = false;
          for (let i = 0; i < neighborOffsets8.length; i += 1) {
            const nx = x + neighborOffsets8[i][0];
            const ny = y + neighborOffsets8[i][1];
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              continue;
            }
            const neighborTile = tiles[ny][nx];
            if (neighborTile && isDesertBaseTile(neighborTile.base)) {
              adjacentToDesert = true;
              break;
            }
          }
          if (!adjacentToDesert) {
            continue;
          }
          treeMask[idx] = 0;
          tile.overlay = null;
        }
      }
    }

    if (treeOverlayKey && treeLoneOverlayKey) {
      const loneTreeVariantChance = 0.5;
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (!treeMask[idx]) {
            continue;
          }
          const tile = tiles[y][x];
          if (!tile || tile.overlay !== treeOverlayKey) {
            continue;
          }
          let hasNeighborTree = false;
          for (let i = 0; i < neighborOffsets8.length; i += 1) {
            const nx = x + neighborOffsets8[i][0];
            const ny = y + neighborOffsets8[i][1];
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              continue;
            }
            const neighborTile = tiles[ny][nx];
            if (tileHasTreeOverlay(neighborTile)) {
              hasNeighborTree = true;
              break;
            }
          }
          if (!hasNeighborTree && rng() < loneTreeVariantChance) {
            tile.overlay = treeLoneOverlayKey;
          }
        }
      }
    }

    const woodElfGroveKey = tileLookup.has('WOOD_ELF_GROVES') ? 'WOOD_ELF_GROVES' : null;
    if (woodElfGroveKey) {
      const getOceanMask = (() => {
        let computed = false;
        return () => {
          if (computed) {
            return oceanMask && oceanMask.length === width * height ? oceanMask : null;
          }
          computed = true;
          if (!oceanMask || !waterMask || waterMask.length !== width * height) {
            return null;
          }
          oceanMask.fill(0);
          const queue = new Int32Array(width * height);
          let head = 0;
          let tail = 0;
          const enqueue = (idx) => {
            if (oceanMask[idx]) {
              return;
            }
            oceanMask[idx] = 1;
            queue[tail] = idx;
            tail += 1;
          };
          for (let x = 0; x < width; x += 1) {
            const topIdx = x;
            if (waterMask[topIdx]) {
              enqueue(topIdx);
            }
            const bottomIdx = (height - 1) * width + x;
            if (waterMask[bottomIdx]) {
              enqueue(bottomIdx);
            }
          }
          for (let y = 1; y < height - 1; y += 1) {
            const leftIdx = y * width;
            if (waterMask[leftIdx]) {
              enqueue(leftIdx);
            }
            const rightIdx = y * width + (width - 1);
            if (waterMask[rightIdx]) {
              enqueue(rightIdx);
            }
          }
          while (head < tail) {
            const current = queue[head];
            head += 1;
            const cx = current % width;
            const cy = Math.floor(current / width);
            for (let i = 0; i < neighborOffsets8.length; i += 1) {
              const nx = cx + neighborOffsets8[i][0];
              const ny = cy + neighborOffsets8[i][1];
              if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
                continue;
              }
              const nIdx = ny * width + nx;
              if (!waterMask[nIdx] || oceanMask[nIdx]) {
                continue;
              }
              enqueue(nIdx);
            }
          }
          return oceanMask;
        };
      })();

      const isTileNearOcean = (x, y) => {
        if (x < 0 || y < 0 || x >= width || y >= height) {
          return true;
        }
        const mask = getOceanMask();
        if (!mask) {
          return false;
        }
        const idx = y * width + x;
        if (mask[idx]) {
          return true;
        }
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const nIdx = ny * width + nx;
          if (mask[nIdx]) {
            return true;
          }
        }
        return false;
      };
      const groveCandidates = [];
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          const tile = tiles[y][x];
          if (
            !tile ||
            !tileHasTreeOverlay(tile) ||
            tileHasJungleOverlay(tile) ||
            tile.structure ||
            (hasSnowTile && tile.base === snowTileKey)
          ) {
            continue;
          }
          if (isTileNearOcean(x, y)) {
            continue;
          }
          const score = treeDensityField ? treeDensityField[idx] : 0;
          groveCandidates.push({ x, y, score });
        }
      }

      if (groveCandidates.length > 0) {
        groveCandidates.sort((a, b) => b.score - a.score);
        const baseTarget = Math.max(1, Math.round(groveCandidates.length / 1350));
        const maxGroves = computeStructurePlacementLimit(
          baseTarget,
          28,
          woodElfSettlementMultiplier
        );
        // Increase the base separation so wood elf groves feel rare and distinct.
        const minDistanceBase = 14;
        const minDistance = adjustMinDistance(minDistanceBase, woodElfSettlementFrequencyNormalized);
        const minDistanceSq = minDistance * minDistance;
        const placed = [];

        for (let i = 0; i < groveCandidates.length; i += 1) {
          if (placed.length >= maxGroves) {
            break;
          }
          const candidate = groveCandidates[i];
          if (candidate.score < 0.32) {
            continue;
          }
          let tooClose = false;
          for (let j = 0; j < placed.length; j += 1) {
            const other = placed[j];
            const dx = candidate.x - other.x;
            const dy = candidate.y - other.y;
            if (dx * dx + dy * dy < minDistanceSq) {
              tooClose = true;
              break;
            }
          }
          if (tooClose) {
            continue;
          }
          const tile = tiles[candidate.y][candidate.x];
          if (
            !tile ||
            !tileHasTreeOverlay(tile) ||
            tileHasJungleOverlay(tile) ||
            tile.structure ||
            (hasSnowTile && tile.base === snowTileKey) ||
            isTileNearOcean(candidate.x, candidate.y)
          ) {
            continue;
          }
          const name = generateWoodElfGroveName(rng);
          const details = generateWoodElfGroveDetails(name, rng);
          tile.structure = woodElfGroveKey;
          tile.structureName = details.name || name;
          tile.structureDetails = details;
          placed.push(candidate);
          woodElfGroves.push({ x: candidate.x, y: candidate.y, ...details });
        }
      }
    }
  }

  const lizardmenCityKey =
    tileLookup.has('LIZARDMEN_CITY') && treeJungleOverlayKey ? 'LIZARDMEN_CITY' : null;
  if (lizardmenCityKey && treeJungleOverlayKey) {
    const cityCandidates = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        const tile = tiles[y][x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        if (!tileHasJungleOverlay(tile)) {
          continue;
        }
        const rainfallValue = rainfallField[idx];
        const drainageValue = drainageField[idx];
        const normalizedY = (y + 0.5) / height;
        const equatorialAlignment = clamp(1 - Math.abs(normalizedY - 0.5) * 2, 0, 1);
        const humidity = clamp(rainfallValue * 0.7 + (1 - drainageValue) * 0.3, 0, 1);
        const elevationValue = elevationField[idx];
        const elevationPreference = clamp(1 - Math.abs(elevationValue - (seaLevel + 0.08)) * 3, 0, 1);
        const density = treeDensityField ? treeDensityField[idx] : 0;
        const score =
          density * 0.45 + humidity * 0.25 + equatorialAlignment * 0.15 + elevationPreference * 0.15;
        cityCandidates.push({ x, y, score });
      }
    }

    if (cityCandidates.length > 0) {
      cityCandidates.sort((a, b) => b.score - a.score);
      const baseTarget = Math.max(1, Math.round(cityCandidates.length / 1650));
      const maxCities = computeStructurePlacementLimit(baseTarget, 18, lizardmenSettlementMultiplier);
      const minDistanceBase = 18;
      const minDistance = adjustMinDistance(minDistanceBase, lizardmenSettlementFrequencyNormalized);
      const minDistanceSq = minDistance * minDistance;
      const placed = [];

      for (let i = 0; i < cityCandidates.length; i += 1) {
        if (placed.length >= maxCities) {
          break;
        }
        const candidate = cityCandidates[i];
        if (candidate.score < 0.33) {
          continue;
        }
        let tooClose = false;
        for (let j = 0; j < placed.length; j += 1) {
          const other = placed[j];
          const dx = candidate.x - other.x;
          const dy = candidate.y - other.y;
          if (dx * dx + dy * dy < minDistanceSq) {
            tooClose = true;
            break;
          }
        }
        if (tooClose) {
          continue;
        }
        const tile = tiles[candidate.y][candidate.x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        if (!tileHasJungleOverlay(tile)) {
          continue;
        }
        const name = generateLizardmenCityName(rng);
        const details = generateLizardmenCityDetails(name, rng);
        tile.structure = lizardmenCityKey;
        tile.structureName = details.name || name;
        tile.structureDetails = details;
        placed.push(candidate);
        lizardmenCities.push({ x: candidate.x, y: candidate.y, ...details });
      }
    }
  }

  const roadReplaceableOverlays = new Set([...treeOverlayKeys, ...hillOverlayKeys]);

  if (towns.length > 1) {
    connectTownsWithinRange(tiles, towns, {
      maxDistance: 25,
      overlayKey: TOWN_ROAD_OVERLAY_KEY,
      width,
      height,
      isLandBaseTile,
      waterMask,
      treeOverlayKey,
      treeSnowOverlayKey,
      treeOverlayKeys,
      isMountainOverlay,
      replaceableOverlays: roadReplaceableOverlays
    });
  }

  const evilWizardTowerKey = tileLookup.has('EVIL_WIZARDS_TOWER') ? 'EVIL_WIZARDS_TOWER' : null;
  if (evilWizardTowerKey) {
    const towerCandidates = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        if (treeOverlayKeys.length > 0 && isTreeOverlayKey(tile.overlay)) {
          continue;
        }
        if (mountainOverlayKey && isMountainOverlay(tile.overlay)) {
          continue;
        }
        if (tile.overlay) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSnow = tile.base === snowTileKey;
        if (!baseIsGrass && !baseIsSnow) {
          continue;
        }
        const heightValue = elevationField[idx];
        const elevationScore = clamp((heightValue - seaLevel) * 3.1, 0, 1);
        const rainfallValue = rainfallField[idx];
        const drynessScore = clamp(1 - rainfallValue, 0, 1);
        let terrainBonus = 0;
        if (baseIsSnow) {
          terrainBonus += 0.18;
        } else if (baseIsGrass) {
          terrainBonus += 0.12;
        }
        const edgeDistance = Math.min(x, width - 1 - x, y, height - 1 - y);
        const maxEdgeDistance = Math.max(1, Math.min(width, height) / 2.2);
        const edgeScore = clamp(edgeDistance / maxEdgeDistance, 0, 1);
        const score =
          elevationScore * 0.35 + drynessScore * 0.2 + terrainBonus + edgeScore * 0.15 + rng() * 0.3;
        towerCandidates.push({ x, y, score });
      }
    }

    if (towerCandidates.length > 0) {
      towerCandidates.sort((a, b) => b.score - a.score);
      const area = width * height;
      const baseTarget = Math.max(1, Math.round(area / 20000));
      const maxTowers = computeStructurePlacementLimit(baseTarget, 18, towerSettlementMultiplier);
      const baseMinDistance = Math.max(5, Math.round(Math.min(width, height) / 14));
      const minDistance = adjustMinDistance(baseMinDistance, towerSettlementFrequencyNormalized);
      const minDistanceSq = minDistance * minDistance;
      const placed = [];

      for (let i = 0; i < towerCandidates.length; i += 1) {
        if (placed.length >= maxTowers) {
          break;
        }
        const candidate = towerCandidates[i];
        if (candidate.score < 0.22) {
          continue;
        }
        let tooClose = false;
        for (let j = 0; j < placed.length; j += 1) {
          const other = placed[j];
          const dx = candidate.x - other.x;
          const dy = candidate.y - other.y;
          if (dx * dx + dy * dy < minDistanceSq) {
            tooClose = true;
            break;
          }
        }
        if (!tooClose) {
          for (let j = 0; j < towerProximityPoints.length; j += 1) {
            const other = towerProximityPoints[j];
            if (!other) {
              continue;
            }
            const dx = candidate.x - other.x;
            const dy = candidate.y - other.y;
            if (dx * dx + dy * dy < minDistanceSq) {
              tooClose = true;
              break;
            }
          }
        }
        if (tooClose) {
          continue;
        }
        const tile = tiles[candidate.y][candidate.x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        if (treeOverlayKeys.length > 0 && isTreeOverlayKey(tile.overlay)) {
          continue;
        }
        if (mountainOverlayKey && isMountainOverlay(tile.overlay)) {
          continue;
        }
        if (tile.overlay) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSnow = tile.base === snowTileKey;
        if (!baseIsGrass && !baseIsSnow) {
          continue;
        }
        const name = `Evil Wizard's ${generateTowerName(rng)}`;
        const details = generateEvilWizardTowerDetails(name, rng);
        tile.structure = evilWizardTowerKey;
        tile.structureName = name;
        tile.structureDetails = details;
        placed.push(candidate);
        recordTowerProximityPoint(candidate.x, candidate.y);
        evilWizardTowers.push({ x: candidate.x, y: candidate.y, ...details });
      }
    }
  }

  const towerKey = tileLookup.has('TOWER') ? 'TOWER' : null;
  if (towerKey) {
    const towerCandidates = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        if (treeOverlayKeys.length > 0 && isTreeOverlayKey(tile.overlay)) {
          continue;
        }
        if (tile.overlay) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSnow = tile.base === snowTileKey;
        if (!baseIsGrass && !baseIsSnow) {
          continue;
        }
        const heightValue = elevationField[idx];
        const elevationScore = clamp((heightValue - seaLevel) * 3.1, 0, 1);
        const rainfallValue = rainfallField[idx];
        const drynessScore = clamp(1 - rainfallValue, 0, 1);
        let terrainBonus = 0;
        if (baseIsSnow) {
          terrainBonus += 0.18;
        } else if (baseIsGrass) {
          terrainBonus += 0.12;
        }
        const edgeDistance = Math.min(x, width - 1 - x, y, height - 1 - y);
        const maxEdgeDistance = Math.max(1, Math.min(width, height) / 2.2);
        const edgeScore = clamp(edgeDistance / maxEdgeDistance, 0, 1);
        const score =
          elevationScore * 0.35 + drynessScore * 0.2 + terrainBonus + edgeScore * 0.15 + rng() * 0.3;
        towerCandidates.push({ x, y, score });
      }
    }

    if (towerCandidates.length > 0) {
      towerCandidates.sort((a, b) => b.score - a.score);
      const area = width * height;
      const baseTarget = Math.max(1, Math.round(area / 20000));
      const maxTowers = computeStructurePlacementLimit(baseTarget, 18, towerSettlementMultiplier);
      const baseMinDistance = Math.max(5, Math.round(Math.min(width, height) / 14));
      const minDistance = adjustMinDistance(baseMinDistance, towerSettlementFrequencyNormalized);
      const minDistanceSq = minDistance * minDistance;
      const placed = [];

      for (let i = 0; i < towerCandidates.length; i += 1) {
        if (placed.length >= maxTowers) {
          break;
        }
        const candidate = towerCandidates[i];
        if (candidate.score < 0.22) {
          continue;
        }
        let tooClose = false;
        for (let j = 0; j < placed.length; j += 1) {
          const other = placed[j];
          const dx = candidate.x - other.x;
          const dy = candidate.y - other.y;
          if (dx * dx + dy * dy < minDistanceSq) {
            tooClose = true;
            break;
          }
        }
        if (!tooClose) {
          for (let j = 0; j < towerProximityPoints.length; j += 1) {
            const other = towerProximityPoints[j];
            if (!other) {
              continue;
            }
            const dx = candidate.x - other.x;
            const dy = candidate.y - other.y;
            if (dx * dx + dy * dy < minDistanceSq) {
              tooClose = true;
              break;
            }
          }
        }
        if (tooClose) {
          continue;
        }
        const tile = tiles[candidate.y][candidate.x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        if (treeOverlayKeys.length > 0 && isTreeOverlayKey(tile.overlay)) {
          continue;
        }
        if (tile.overlay) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSnow = tile.base === snowTileKey;
        if (!baseIsGrass && !baseIsSnow) {
          continue;
        }
        const name = generateTowerName(rng);
        const details = generateTowerDetails(name, rng);
        tile.structure = towerKey;
        tile.structureName = name;
        tile.structureDetails = details;
        placed.push(candidate);
        recordTowerProximityPoint(candidate.x, candidate.y);
        towers.push({ x: candidate.x, y: candidate.y, ...details });
      }
    }
  }

  const dwarvenSettlements = [...dwarfholds, ...hillholds, ...mines];
  const majorSettlementPoints = [
    ...dwarvenSettlements,
    ...towns,
    ...woodElfGroves,
    ...lizardmenCities,
    ...towers,
    ...evilWizardTowers
  ];
  const hillOverlayKeysForStructures = new Set(
    ['HILLS', 'HILLS_VARIANT_A', 'HILLS_VARIANT_B', 'HILLS_SNOW'].filter((key) => tileLookup.has(key))
  );
  const isHillOverlayForStructures = (overlayKey) =>
    overlayKey != null && hillOverlayKeysForStructures.has(overlayKey);
  const mapArea = width * height;
  const orcCampNoiseSeed = (seedNumber + 0x4a1d2b7f) >>> 0;
  const travelerCampNoiseSeed = (seedNumber + 0x579c3d11) >>> 0;
  const dungeonNoiseSeed = (seedNumber + 0x5c8d3a1f) >>> 0;
  const monasteryNoiseSeed = (seedNumber + 0x6f12c43d) >>> 0;
  const monasteryLatitudeSeed = (seedNumber + 0x71c2d9a7) >>> 0;
  const castleNoiseSeed = (seedNumber + 0x7be21a59) >>> 0;
  const shrineNoiseSeed = (seedNumber + 0x8cf43123) >>> 0;
  const shrineLatitudeSeed = (seedNumber + 0x90a2f4c1) >>> 0;
  const tavernNoiseSeed = (seedNumber + 0x9324f8b1) >>> 0;

  const orcCampKey = tileLookup.has('ORC_CAMP') ? 'ORC_CAMP' : null;
  if (orcCampKey) {
    const allowedOrcBases = new Set(
      [grassTileKey, sandTileKey, marshTileKey, badlandsTileKey].filter((key) => typeof key === 'string')
    );
    const orcCampCandidates = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        if (!allowedOrcBases.has(tile.base)) {
          continue;
        }
        if (mountainOverlayKey && isMountainOverlay(tile.overlay)) {
          continue;
        }
        const settlementDistSq = computeNearestDistanceSq(x, y, majorSettlementPoints);
        if (settlementDistSq < 36) {
          continue;
        }
        const rainfallValue = rainfallField[idx];
        const dryness = clamp(1 - rainfallValue, 0, 1);
        let baseScore = 0.2;
        if (tile.base === badlandsTileKey) {
          baseScore += 0.45;
        } else if (tile.base === sandTileKey) {
          baseScore += 0.36;
        } else if (tile.base === marshTileKey) {
          baseScore += 0.28;
        } else {
          baseScore += 0.24;
        }
        const hillBonus =
          (isHillOverlayForStructures(tile.overlay) || isHillOverlayForStructures(tile.hillOverlay)) && tile.base !== marshTileKey
            ? 0.16
            : 0;
        let waterAdjacency = 0;
        for (let i = 0; i < cardinalOffsets.length; i += 1) {
          const nx = x + cardinalOffsets[i][0];
          const ny = y + cardinalOffsets[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const nIdx = ny * width + nx;
          if (waterMask[nIdx]) {
            waterAdjacency += 1;
          }
        }
        const waterScore = clamp(waterAdjacency * 0.08, 0, 0.18);
        let settlementPenalty = 0;
        if (settlementDistSq !== Infinity) {
          const distance = Math.sqrt(settlementDistSq);
          settlementPenalty = clamp((10 - distance) * 0.05, 0, 0.35);
        }
        const borderDistance = Math.min(x, width - 1 - x, y, height - 1 - y);
        const edgeScore = clamp(borderDistance / Math.max(6, Math.min(width, height) / 3.2), 0, 1) * 0.12;
        const noise = hashCoords(x, y, orcCampNoiseSeed) - 0.5;
        const score =
          baseScore +
          dryness * 0.35 +
          hillBonus +
          waterScore +
          edgeScore +
          noise * 0.22 +
          rng() * 0.18 -
          settlementPenalty;
        if (score > 0.28) {
          orcCampCandidates.push({ x, y, score });
        }
      }
    }

    if (orcCampCandidates.length > 0) {
      orcCampCandidates.sort((a, b) => b.score - a.score);
      const baseTarget = Math.max(1, Math.round(mapArea / 14000));
      const maxCamps = computeStructurePlacementLimit(baseTarget, 16, 1);
      const minDistance = 8;
      const minDistanceSq = minDistance * minDistance;
      const placed = [];

      for (let i = 0; i < orcCampCandidates.length; i += 1) {
        if (placed.length >= maxCamps) {
          break;
        }
        const candidate = orcCampCandidates[i];
        if (candidate.score < 0.3) {
          continue;
        }
        let tooClose = false;
        for (let j = 0; j < placed.length; j += 1) {
          const other = placed[j];
          const dx = candidate.x - other.x;
          const dy = candidate.y - other.y;
          if (dx * dx + dy * dy < minDistanceSq) {
            tooClose = true;
            break;
          }
        }
        if (tooClose) {
          continue;
        }
        const tile = tiles[candidate.y][candidate.x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        if (mountainOverlayKey && isMountainOverlay(tile.overlay)) {
          continue;
        }
        const settlementDistSq = computeNearestDistanceSq(candidate.x, candidate.y, majorSettlementPoints);
        if (settlementDistSq < 36) {
          continue;
        }
        const name = generateOrcCampName(rng);
        const details = generateOrcCampDetails(name, rng);
        tile.structure = orcCampKey;
        tile.structureName = name;
        tile.structureDetails = details;
        placed.push(candidate);
        orcCamps.push({ x: candidate.x, y: candidate.y, ...details });
      }
    }
  }

  const travelerCampKey = tileLookup.has('TRAVELERS_CAMP') ? 'TRAVELERS_CAMP' : null;
  if (travelerCampKey) {
    const travelerCampCandidates = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSand = tile.base === sandTileKey;
        const baseIsBadlands = hasBadlandsTile && tile.base === badlandsTileKey;
        const baseIsMarsh = tile.base === marshTileKey;
        if (!baseIsGrass && !baseIsSand && !baseIsBadlands && !baseIsMarsh) {
          continue;
        }
        if (mountainOverlayKey && isMountainOverlay(tile.overlay)) {
          continue;
        }
        const nearestSettlement = findNearestPointWithDetails(x, y, majorSettlementPoints);
        if (!nearestSettlement || !Number.isFinite(nearestSettlement.distance)) {
          continue;
        }
        const distance = nearestSettlement.distance;
        if (distance < 4 || distance > 26) {
          continue;
        }
        const distanceToOrcsSq = computeNearestDistanceSq(x, y, orcCamps);
        if (distanceToOrcsSq < 49) {
          continue;
        }
        let waterAdjacency = 0;
        for (let i = 0; i < cardinalOffsets.length; i += 1) {
          const nx = x + cardinalOffsets[i][0];
          const ny = y + cardinalOffsets[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const nIdx = ny * width + nx;
          if (waterMask[nIdx]) {
            waterAdjacency += 1;
            continue;
          }
          const neighborTile = tiles[ny][nx];
          if (neighborTile && neighborTile.river) {
            waterAdjacency += 1;
          }
        }
        const rainfallValue = rainfallField[idx];
        const drainageValue = drainageField[idx];
        const dryness = clamp(1 - rainfallValue, 0, 1);
        const soilSoftness = clamp(1 - drainageValue, 0, 1);
        const hillBonus =
          isHillOverlayForStructures(tile.overlay) || isHillOverlayForStructures(tile.hillOverlay) ? 0.08 : 0;
        const distanceScore = clamp(1 - Math.abs(distance - 10) / 9, 0, 1) * 0.32;
        const waterScore = clamp(waterAdjacency * 0.07, 0, 0.2);
        const drynessScore = dryness * 0.18;
        const comfortScore = soilSoftness * 0.12;
        const noise = hashCoords(x, y, travelerCampNoiseSeed) - 0.5;
        const score =
          0.24 +
          distanceScore +
          hillBonus +
          waterScore +
          drynessScore +
          comfortScore +
          noise * 0.18 +
          rng() * 0.12;
        if (score > 0.3) {
          travelerCampCandidates.push({ x, y, score, nearestSettlement });
        }
      }
    }

    if (travelerCampCandidates.length > 0) {
      travelerCampCandidates.sort((a, b) => b.score - a.score);
      const baseTarget = Math.max(1, Math.round(mapArea / 20000));
      const maxCamps = computeStructurePlacementLimit(baseTarget, 14, 1);
      const minDistance = 7;
      const minDistanceSq = minDistance * minDistance;
      const placed = [];

      for (let i = 0; i < travelerCampCandidates.length; i += 1) {
        if (placed.length >= maxCamps) {
          break;
        }
        const candidate = travelerCampCandidates[i];
        if (candidate.score < 0.31) {
          continue;
        }
        let tooClose = false;
        for (let j = 0; j < placed.length; j += 1) {
          const other = placed[j];
          const dx = candidate.x - other.x;
          const dy = candidate.y - other.y;
          if (dx * dx + dy * dy < minDistanceSq) {
            tooClose = true;
            break;
          }
        }
        if (tooClose) {
          continue;
        }
        const tile = tiles[candidate.y][candidate.x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        if (mountainOverlayKey && isMountainOverlay(tile.overlay)) {
          continue;
        }
        const nearest =
          candidate.nearestSettlement || findNearestPointWithDetails(candidate.x, candidate.y, majorSettlementPoints);
        const name = generateTravelerCampName(rng);
        const details = generateTravelerCampDetails(name, rng, {
          nearbySettlement: nearest ? nearest.point : null,
          settlementDistance: nearest ? nearest.distance : null
        });
        tile.structure = travelerCampKey;
        tile.structureName = name;
        tile.structureDetails = details;
        placed.push(candidate);
        travelerCamps.push({ x: candidate.x, y: candidate.y, ...details });
      }
    }
  }

  const tavernKey = tileLookup.has('ROADSIDE_TAVERN') ? 'ROADSIDE_TAVERN' : null;
  if (tavernKey) {
    const civilSettlements = [...towns, ...dwarfholds, ...hillholds, ...woodElfGroves, ...castles];
    const tavernCandidates = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSand = tile.base === sandTileKey;
        const baseIsBadlands = hasBadlandsTile && tile.base === badlandsTileKey;
        if (!baseIsGrass && !baseIsSand && !baseIsBadlands) {
          continue;
        }
        if (mountainOverlayKey && isMountainOverlay(tile.overlay)) {
          continue;
        }
        const nearestCivil = findNearestPointWithDetails(x, y, civilSettlements);
        if (!nearestCivil || !Number.isFinite(nearestCivil.distance)) {
          continue;
        }
        const distance = nearestCivil.distance;
        if (distance < 3 || distance > 20) {
          continue;
        }
        let riverAdjacency = 0;
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const nIdx = ny * width + nx;
          if (waterMask[nIdx]) {
            riverAdjacency += 1;
            continue;
          }
          const neighborTile = tiles[ny][nx];
          if (neighborTile && neighborTile.river) {
            riverAdjacency += 1;
          }
        }
        const rainfallValue = rainfallField[idx];
        const drainageValue = drainageField[idx];
        const fertility = clamp(rainfallValue * 0.6 + (1 - drainageValue) * 0.4, 0, 1);
        const distanceScore = clamp(1 - Math.abs(distance - 8) / 6.5, 0, 1) * 0.36;
        const riverScore = clamp(riverAdjacency * 0.09, 0, 0.24);
        const fertilityScore = fertility * 0.18;
        const noise = hashCoords(x, y, tavernNoiseSeed) - 0.5;
        const score = 0.26 + distanceScore + riverScore + fertilityScore + noise * 0.18 + rng() * 0.1;
        if (score > 0.24) {
          tavernCandidates.push({ x, y, score, nearestCivil });
        }
      }
    }

    if (tavernCandidates.length > 0) {
      tavernCandidates.sort((a, b) => b.score - a.score);
      const baseTarget = Math.max(1, Math.round(mapArea / 18000));
      const maxTaverns = computeStructurePlacementLimit(baseTarget, 12, 1);
      const minDistance = 4;
      const minDistanceSq = minDistance * minDistance;
      const placed = [];

      for (let i = 0; i < tavernCandidates.length; i += 1) {
        if (placed.length >= maxTaverns) {
          break;
        }
        const candidate = tavernCandidates[i];
        if (candidate.score < 0.26) {
          continue;
        }
        let tooClose = false;
        for (let j = 0; j < placed.length; j += 1) {
          const other = placed[j];
          const dx = candidate.x - other.x;
          const dy = candidate.y - other.y;
          if (dx * dx + dy * dy < minDistanceSq) {
            tooClose = true;
            break;
          }
        }
        if (!tooClose) {
          const distanceToCampSq = computeNearestDistanceSq(candidate.x, candidate.y, travelerCamps);
          if (distanceToCampSq < 25) {
            tooClose = true;
          }
        }
        if (!tooClose) {
          const distanceToOrcSq = computeNearestDistanceSq(candidate.x, candidate.y, orcCamps);
          if (distanceToOrcSq < 64) {
            tooClose = true;
          }
        }
        if (tooClose) {
          continue;
        }
        const tile = tiles[candidate.y][candidate.x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        if (mountainOverlayKey && isMountainOverlay(tile.overlay)) {
          continue;
        }
        const nearest =
          candidate.nearestCivil || findNearestPointWithDetails(candidate.x, candidate.y, civilSettlements);
        const name = generateRoadsideTavernName(rng);
        const details = generateRoadsideTavernDetails(name, rng, {
          nearbySettlement: nearest ? nearest.point : null,
          settlementDistance: nearest ? nearest.distance : null
        });
        tile.structure = tavernKey;
        tile.structureName = name;
        tile.structureDetails = details;
        placed.push(candidate);
        roadsideTaverns.push({ x: candidate.x, y: candidate.y, ...details });
      }

      if (placed.length === 0) {
        const fallbackCandidate = tavernCandidates[0];
        const tile = tiles[fallbackCandidate.y][fallbackCandidate.x];
        if (tile && !tile.structure && !tile.river) {
          if (!(mountainOverlayKey && isMountainOverlay(tile.overlay))) {
            const nearest =
              fallbackCandidate.nearestCivil ||
              findNearestPointWithDetails(fallbackCandidate.x, fallbackCandidate.y, civilSettlements);
            const name = generateRoadsideTavernName(rng);
            const details = generateRoadsideTavernDetails(name, rng, {
              nearbySettlement: nearest ? nearest.point : null,
              settlementDistance: nearest ? nearest.distance : null
            });
            tile.structure = tavernKey;
            tile.structureName = name;
            tile.structureDetails = details;
            placed.push(fallbackCandidate);
            roadsideTaverns.push({ x: fallbackCandidate.x, y: fallbackCandidate.y, ...details });
          }
        }
      }
    }
  }

  const pathEligibleSettlements = [
    ...towns,
    ...castles,
    ...roadsideTaverns,
    ...travelerCamps,
    ...orcCamps,
    ...towers,
    ...evilWizardTowers
  ];

  if (pathEligibleSettlements.length > 1) {
    connectTownsWithinRange(tiles, pathEligibleSettlements, {
      maxDistance: 25,
      overlayKey: TOWN_ROAD_OVERLAY_KEY,
      width,
      height,
      isLandBaseTile,
      waterMask,
      treeOverlayKey,
      treeSnowOverlayKey,
      treeOverlayKeys,
      isMountainOverlay,
      replaceableOverlays: roadReplaceableOverlays
    });
  }

  const dungeonKey = tileLookup.has('DUNGEON') ? 'DUNGEON' : null;
  if (dungeonKey) {
    const dungeonCandidates = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        if (!isLandBaseTile(tile.base)) {
          continue;
        }
        if (mountainOverlayKey && isMountainOverlay(tile.overlay)) {
          continue;
        }
        const settlementDistSq = computeNearestDistanceSq(x, y, majorSettlementPoints);
        if (settlementDistSq < 49) {
          continue;
        }
        const heightValue = elevationField[idx];
        let slopeSum = 0;
        let neighborCount = 0;
        let mountainNeighbors = 0;
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const nIdx = ny * width + nx;
          if (waterMask[nIdx]) {
            continue;
          }
          slopeSum += Math.abs(heightValue - elevationField[nIdx]);
          neighborCount += 1;
          if (mountainMask && mountainMask[nIdx]) {
            mountainNeighbors += 1;
          } else {
            const neighborTile = tiles[ny][nx];
            if (neighborTile && mountainOverlayKey && isMountainOverlay(neighborTile.overlay)) {
              mountainNeighbors += 1;
            }
          }
        }
        const averageSlope = neighborCount > 0 ? slopeSum / neighborCount : 0;
        const slopeScore = clamp((averageSlope - 0.008) * 38, 0, 1);
        const hillBonus =
          isHillOverlayForStructures(tile.overlay) || isHillOverlayForStructures(tile.hillOverlay) ? 0.12 : 0;
        const mountainBonus = Math.min(0.3, mountainNeighbors * 0.08);
        const moisture = clamp(rainfallField[idx] * 0.55 + (1 - drainageField[idx]) * 0.45, 0, 1);
        const dampBonus = clamp(moisture * 0.25, 0, 0.18);
        const noise = hashCoords(x, y, dungeonNoiseSeed) - 0.5;
        const score = slopeScore * 0.45 + mountainBonus + hillBonus + dampBonus + noise * 0.3 + rng() * 0.15;
        if (score > 0.2) {
          dungeonCandidates.push({ x, y, score });
        }
      }
    }

    if (dungeonCandidates.length > 0) {
      dungeonCandidates.sort((a, b) => b.score - a.score);
      const baseTarget = Math.max(1, Math.round(mapArea / 21000));
      const maxDungeons = computeStructurePlacementLimit(baseTarget, 14, 1);
      const minDistance = 9;
      const minDistanceSq = minDistance * minDistance;
      const placed = [];

      for (let i = 0; i < dungeonCandidates.length; i += 1) {
        if (placed.length >= maxDungeons) {
          break;
        }
        const candidate = dungeonCandidates[i];
        if (candidate.score < 0.22) {
          continue;
        }
        let tooClose = false;
        for (let j = 0; j < placed.length; j += 1) {
          const other = placed[j];
          const dx = candidate.x - other.x;
          const dy = candidate.y - other.y;
          if (dx * dx + dy * dy < minDistanceSq) {
            tooClose = true;
            break;
          }
        }
        if (tooClose) {
          continue;
        }
        const tile = tiles[candidate.y][candidate.x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        if (!isLandBaseTile(tile.base)) {
          continue;
        }
        if (mountainOverlayKey && isMountainOverlay(tile.overlay)) {
          continue;
        }
        const name = generateDungeonName(rng);
        const details = generateDungeonDetails(name, rng);
        tile.structure = dungeonKey;
        tile.structureName = name;
        tile.structureDetails = details;
        placed.push(candidate);
        dungeons.push({ x: candidate.x, y: candidate.y, ...details });
      }
    }
  }

  const monasteryKey = tileLookup.has('MONASTERY') ? 'MONASTERY' : null;
  if (monasteryKey) {
    const monasteryCandidates = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSnow = hasSnowTile && tile.base === snowTileKey;
        const baseIsMarsh = hasMarshTile && tile.base === marshTileKey;
        if (!baseIsGrass && !baseIsSnow && !baseIsMarsh) {
          continue;
        }
        if (mountainOverlayKey && isMountainOverlay(tile.overlay)) {
          continue;
        }
        const distanceToTownSq = computeNearestDistanceSq(x, y, towns);
        const distanceToHoldSq = computeNearestDistanceSq(x, y, dwarvenSettlements);
        const settlementDistanceSq = Math.min(distanceToTownSq, distanceToHoldSq);
        if (settlementDistanceSq === Infinity) {
          continue;
        }
        const settlementDistance = Math.sqrt(settlementDistanceSq);
        if (settlementDistance < 4 || settlementDistance > 46) {
          continue;
        }
        const distanceToOrcsSq = computeNearestDistanceSq(x, y, orcCamps);
        if (distanceToOrcsSq < 49) {
          continue;
        }
        let riverAdjacency = 0;
        for (let i = 0; i < cardinalOffsets.length; i += 1) {
          const nx = x + cardinalOffsets[i][0];
          const ny = y + cardinalOffsets[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const neighborTile = tiles[ny][nx];
          if (neighborTile && neighborTile.river) {
            riverAdjacency += 1;
          }
        }
        const hillBonus =
          isHillOverlayForStructures(tile.overlay) || isHillOverlayForStructures(tile.hillOverlay) ? 0.18 : 0;
        const riverScore = riverAdjacency > 0 ? clamp(0.18 + riverAdjacency * 0.08, 0, 0.3) : 0;
        const noise = hashCoords(x, y, monasteryNoiseSeed) - 0.5;
        const distanceScore = clamp((settlementDistance - 4) / 18, 0, 1) * 0.22;
        const elevationValue = elevationField[idx];
        const elevationScore = clamp((elevationValue - seaLevel) * 2, 0, 1) * 0.18;
        const baseSuitability = baseIsGrass ? 0.18 : baseIsSnow ? 0.12 : 0.08;
        const latitude = (y + 0.5) / height;
        const latitudeNoise =
          hashCoords(x, Math.floor(latitude * 1024), monasteryLatitudeSeed) - 0.5;
        const latitudeWave = Math.sin((latitude + latitudeNoise * 0.35) * Math.PI * 2);
        const latitudeScore = Math.abs(latitudeWave) * 0.14;
        const score =
          0.28 +
          hillBonus +
          riverScore +
          distanceScore +
          elevationScore +
          baseSuitability +
          latitudeScore +
          noise * 0.2 +
          rng() * 0.12;
        monasteryCandidates.push({ x, y, score });
      }
    }

    if (monasteryCandidates.length > 0) {
      monasteryCandidates.sort((a, b) => b.score - a.score);
      const baseTarget = Math.max(1, Math.round(mapArea / 24000));
      const maxMonasteries = computeStructurePlacementLimit(baseTarget, 12, 1);
      const minDistance = 11;
      const minDistanceSq = minDistance * minDistance;
      const placed = [];

      for (let i = 0; i < monasteryCandidates.length; i += 1) {
        if (placed.length >= maxMonasteries) {
          break;
        }
        const candidate = monasteryCandidates[i];
        if (candidate.score < 0.32) {
          continue;
        }
        let tooClose = false;
        for (let j = 0; j < placed.length; j += 1) {
          const other = placed[j];
          const dx = candidate.x - other.x;
          const dy = candidate.y - other.y;
          if (dx * dx + dy * dy < minDistanceSq) {
            tooClose = true;
            break;
          }
        }
        if (tooClose) {
          continue;
        }
        const tile = tiles[candidate.y][candidate.x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSnow = hasSnowTile && tile.base === snowTileKey;
        const baseIsMarsh = hasMarshTile && tile.base === marshTileKey;
        if (!baseIsGrass && !baseIsSnow && !baseIsMarsh) {
          continue;
        }
        if (mountainOverlayKey && isMountainOverlay(tile.overlay)) {
          continue;
        }
        const name = generateMonasteryName(rng);
        const details = generateMonasteryDetails(name, rng);
        tile.structure = monasteryKey;
        tile.structureName = name;
        tile.structureDetails = details;
        placed.push(candidate);
        monasteries.push({ x: candidate.x, y: candidate.y, ...details });
      }
    }
  }

  const castleKey = tileLookup.has('CASTLE') ? 'CASTLE' : null;
  if (castleKey) {
    const castleCandidates = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        if (isTreeOverlayKey(tile.overlay)) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSnow = tile.base === snowTileKey;
        if (!baseIsGrass && !baseIsSnow) {
          continue;
        }
        if (mountainOverlayKey && isMountainOverlay(tile.overlay)) {
          continue;
        }
        const hillBonus =
          isHillOverlayForStructures(tile.overlay) || isHillOverlayForStructures(tile.hillOverlay) ? 0.24 : 0;
        const distanceToTownSq = computeNearestDistanceSq(x, y, towns);
        const distanceToHoldSq = computeNearestDistanceSq(x, y, dwarvenSettlements);
        const settlementDistanceSq = Math.min(distanceToTownSq, distanceToHoldSq);
        if (settlementDistanceSq === Infinity) {
          continue;
        }
        const settlementDistance = Math.sqrt(settlementDistanceSq);
        if (settlementDistance < 6) {
          continue;
        }
        const edgeDistance = Math.min(x, width - 1 - x, y, height - 1 - y);
        const edgeScore = clamp(edgeDistance / Math.max(8, Math.min(width, height) / 2.6), 0, 1) * 0.18;
        const heightValue = elevationField[idx];
        let slopeSum = 0;
        let neighborCount = 0;
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const nIdx = ny * width + nx;
          if (waterMask[nIdx]) {
            continue;
          }
          slopeSum += Math.abs(heightValue - elevationField[nIdx]);
          neighborCount += 1;
        }
        const averageSlope = neighborCount > 0 ? slopeSum / neighborCount : 0;
        const slopeScore = clamp(averageSlope * 42, 0, 0.35);
        const settlementScore = clamp((settlementDistance - 6) / 20, 0, 1) * 0.28;
        const noise = hashCoords(x, y, castleNoiseSeed) - 0.5;
        const score = hillBonus + edgeScore + slopeScore + settlementScore + noise * 0.22 + rng() * 0.12;
        if (score > 0.32) {
          castleCandidates.push({ x, y, score });
        }
      }
    }

    if (castleCandidates.length > 0) {
      castleCandidates.sort((a, b) => b.score - a.score);
      const baseTarget = Math.max(1, Math.round(mapArea / 26000));
      const maxCastles = computeStructurePlacementLimit(baseTarget, 10, 1);
      const minDistance = 12;
      const minDistanceSq = minDistance * minDistance;
      const placed = [];

      for (let i = 0; i < castleCandidates.length; i += 1) {
        if (placed.length >= maxCastles) {
          break;
        }
        const candidate = castleCandidates[i];
        if (candidate.score < 0.34) {
          continue;
        }
        let tooClose = false;
        for (let j = 0; j < placed.length; j += 1) {
          const other = placed[j];
          const dx = candidate.x - other.x;
          const dy = candidate.y - other.y;
          if (dx * dx + dy * dy < minDistanceSq) {
            tooClose = true;
            break;
          }
        }
        if (tooClose) {
          continue;
        }
        const tile = tiles[candidate.y][candidate.x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        if (isTreeOverlayKey(tile.overlay)) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSnow = tile.base === snowTileKey;
        if (!baseIsGrass && !baseIsSnow) {
          continue;
        }
        const name = generateCastleName(rng);
        const details = generateCastleDetails(name, rng);
        tile.structure = castleKey;
        tile.structureName = name;
        tile.structureDetails = details;
        placed.push(candidate);
        castles.push({ x: candidate.x, y: candidate.y, ...details });
      }
    }
  }

  const saintShrineKey = tileLookup.has('SAINT_SHRINE') ? 'SAINT_SHRINE' : null;
  if (saintShrineKey) {
    const shrineCandidates = [];
    const monasteryPoints = monasteries.slice();
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSnow = tile.base === snowTileKey;
        const baseIsMarsh = tile.base === marshTileKey;
        if (!baseIsGrass && !baseIsSnow && !baseIsMarsh) {
          continue;
        }
        if (mountainOverlayKey && isMountainOverlay(tile.overlay)) {
          continue;
        }
        const distanceToMonasterySq = computeNearestDistanceSq(x, y, monasteryPoints);
        if (distanceToMonasterySq === Infinity || distanceToMonasterySq < 25 || distanceToMonasterySq > 1600) {
          continue;
        }
        const distanceToSettlementSq = computeNearestDistanceSq(x, y, majorSettlementPoints);
        if (distanceToSettlementSq < 25) {
          continue;
        }
        let waterAdjacency = 0;
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const nIdx = ny * width + nx;
          if (waterMask[nIdx]) {
            waterAdjacency += 1;
          } else {
            const neighborTile = tiles[ny][nx];
            if (neighborTile && neighborTile.river) {
              waterAdjacency += 1;
            }
          }
        }
        if (waterAdjacency === 0) {
          continue;
        }
        const moisture = clamp(rainfallField[idx] * 0.6 + (1 - drainageField[idx]) * 0.4, 0, 1);
        const moistureScore = clamp(moisture * 0.4, 0, 0.28);
        const hillBonus =
          isHillOverlayForStructures(tile.overlay) || isHillOverlayForStructures(tile.hillOverlay) ? 0.12 : 0;
        const monasteryDistance = Math.sqrt(distanceToMonasterySq);
        const devotionScore = clamp((monasteryDistance - 5) / 18, 0, 1) * 0.22;
        const noise = hashCoords(x, y, shrineNoiseSeed) - 0.5;
        const baseSuitability = baseIsGrass ? 0.16 : baseIsSnow ? 0.12 : 0.1;
        const latitude = (y + 0.5) / height;
        const latitudeNoise =
          hashCoords(x, Math.floor(latitude * 1024), shrineLatitudeSeed) - 0.5;
        const latitudeWave = Math.sin((latitude + latitudeNoise * 0.3) * Math.PI * 2);
        const latitudeScore = Math.abs(latitudeWave) * 0.12;
        const score =
          0.25 +
          moistureScore +
          hillBonus +
          devotionScore +
          waterAdjacency * 0.05 +
          baseSuitability +
          latitudeScore +
          noise * 0.22 +
          rng() * 0.12;
        shrineCandidates.push({ x, y, score });
      }
    }

    if (shrineCandidates.length > 0) {
      shrineCandidates.sort((a, b) => b.score - a.score);
      const baseTarget = Math.max(1, Math.round(mapArea / 24000));
      const maxShrines = computeStructurePlacementLimit(baseTarget, 14, 1);
      const minDistance = 9;
      const minDistanceSq = minDistance * minDistance;
      const placed = [];

      for (let i = 0; i < shrineCandidates.length; i += 1) {
        if (placed.length >= maxShrines) {
          break;
        }
        const candidate = shrineCandidates[i];
        if (candidate.score < 0.3) {
          continue;
        }
        let tooClose = false;
        for (let j = 0; j < placed.length; j += 1) {
          const other = placed[j];
          const dx = candidate.x - other.x;
          const dy = candidate.y - other.y;
          if (dx * dx + dy * dy < minDistanceSq) {
            tooClose = true;
            break;
          }
        }
        if (tooClose) {
          continue;
        }
        const tile = tiles[candidate.y][candidate.x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSnow = tile.base === snowTileKey;
        const baseIsMarsh = tile.base === marshTileKey;
        if (!baseIsGrass && !baseIsSnow && !baseIsMarsh) {
          continue;
        }
        const name = generateSaintShrineName(rng);
        const details = generateSaintShrineDetails(name, rng);
        tile.structure = saintShrineKey;
        tile.structureName = name;
        tile.structureDetails = details;
        placed.push(candidate);
        saintShrines.push({ x: candidate.x, y: candidate.y, ...details });
      }
    }
  }

  if (
    mountainOverlayKey &&
    mountainMask &&
    (mountainTopVariantKeys.length > 0 || mountainBottomVariantKeys.length > 0)
  ) {
    const selectVariant = (keys, x, y) => {
      if (!keys || keys.length === 0) {
        return null;
      }
      const hash = ((x + 1) * 73856093) ^ ((y + 1) * 19349663);
      const index = Math.abs(hash) % keys.length;
      return keys[index];
    };

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (!mountainMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || !isMountainOverlay(tile.overlay)) {
          continue;
        }
        if (isVolcanoOverlayKey(tile.overlay)) {
          continue;
        }
        if (mountainPeakKey && tile.overlay === mountainPeakKey) {
          continue;
        }
        const normalizedHeight = mountainHeightField ? mountainHeightField[idx] : 0;
        if (mountainPeakKey && normalizedHeight >= mountainPeakHeightThreshold) {
          tile.overlay = mountainPeakKey;
          continue;
        }
        const hasMountainAbove = y > 0 && mountainMask[(y - 1) * width + x];
        const hasMountainBelow = y < height - 1 && mountainMask[(y + 1) * width + x];
        if (!hasMountainAbove && hasMountainBelow) {
          const variant = selectVariant(mountainTopVariantKeys, x, y);
          if (variant) {
            tile.overlay = variant;
            continue;
          }
        }
        if (!hasMountainBelow && hasMountainAbove) {
          const variant = selectVariant(mountainBottomVariantKeys, x, y);
          if (variant) {
            tile.overlay = variant;
            continue;
          }
        }
        tile.overlay = mountainOverlayKey;
      }
    }
  }

  const treeProximityRadius = 3;
  const hasTreeWithinRadius = (x, y, radius = treeProximityRadius) => {
    const clampedRadius = Math.max(0, Math.floor(radius));
    for (let dy = -clampedRadius; dy <= clampedRadius; dy += 1) {
      const ny = y + dy;
      if (ny < 0 || ny >= height) {
        continue;
      }
      for (let dx = -clampedRadius; dx <= clampedRadius; dx += 1) {
        const nx = x + dx;
        if (nx < 0 || nx >= width) {
          continue;
        }
        const neighborTile = tiles[ny][nx];
        if (tileHasTreeOverlay(neighborTile)) {
          return true;
        }
      }
    }
    return false;
  };

  const biomeRandom = mulberry32((seedNumber + 0x4c95e6d9) >>> 0);
  const temperatureNoiseSeed = (seedNumber + 0x52f6af13) >>> 0;
  const temperatureNoiseScale = 2.7 + biomeRandom() * 1.8;
  const temperatureNoiseOffsetX = biomeRandom() * 8192;
  const temperatureNoiseOffsetY = biomeRandom() * 8192;
  const moistureNoiseSeed = (seedNumber + 0x6a4b5c27) >>> 0;
  const moistureNoiseScale = 3.1 + biomeRandom() * 2.3;
  const moistureNoiseOffsetX = biomeRandom() * 8192;
  const moistureNoiseOffsetY = biomeRandom() * 8192;
  const temperatureField = new Float32Array(width * height);
  const moistureField = new Float32Array(width * height);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      const normalizedX = (x + 0.5) / width;
      const normalizedY = (y + 0.5) / height;
      const tile = tiles[y][x];
      const latitudeFactor = 1 - Math.abs(normalizedY - 0.5) * 2;
      const elevationValue = elevationField[idx];
      const elevationAboveSea = Math.max(elevationValue - seaLevel, 0);
      const elevationCooling = clamp(1 - elevationAboveSea * 3.5, 0, 1);
      const temperatureNoise = octaveNoise(
        (normalizedX + temperatureNoiseOffsetX) * temperatureNoiseScale,
        (normalizedY + temperatureNoiseOffsetY) * temperatureNoiseScale,
        temperatureNoiseSeed,
        3,
        0.55,
        2.1
      );
      const baseTemperature = clamp(latitudeFactor * 0.75 + elevationCooling * 0.25, 0, 1);
      temperatureField[idx] = clamp(baseTemperature + (temperatureNoise - 0.5) * 0.18, 0, 1);

      const rainfallValue = rainfallField[idx];
      const drainageValue = drainageField[idx];
      const baseMoisture = clamp(rainfallValue * 0.7 + (1 - drainageValue) * 0.3, 0, 1);
      const moistureNoise = octaveNoise(
        (normalizedX + moistureNoiseOffsetX) * moistureNoiseScale,
        (normalizedY + moistureNoiseOffsetY) * moistureNoiseScale,
        moistureNoiseSeed,
        3,
        0.55,
        2.2
      );
      moistureField[idx] = clamp(baseMoisture + (moistureNoise - 0.5) * 0.14, 0, 1);
      if (tile) {
        tile.temperature = temperatureField[idx];
        tile.moisture = moistureField[idx];
      }
    }
  }

  const initialBiomeField = new Array(width * height);

  const computeInitialBiome = (tile, idx, x, y) => {
    if (!tile) {
      return waterMask[idx] ? 'water' : null;
    }
    if (waterMask[idx] || tile.base === waterTileKey) {
      return 'water';
    }
    if (tileHasTownSettlement(tile)) {
      return 'grassland';
    }
    if (mountainOverlayKey && isMountainOverlay(tile.overlay)) {
      return 'mountain';
    }
    if (hasMarshTile && tile.base === marshTileKey) {
      return 'marsh';
    }
    if (hasBadlandsTile && tile.base === badlandsTileKey) {
      return 'badlands';
    }
    if (hasSandTile && tile.base === sandTileKey) {
      return 'desert';
    }
    if (hasSnowTile && tile.base === snowTileKey) {
      if (tileHasTreeOverlay(tile)) {
        return temperatureField[idx] > 0.35 ? 'forest' : 'tundra';
      }
      return 'tundra';
    }
    if (tileHasJungleOverlay(tile)) {
      if (temperatureField[idx] > 0.38 && moistureField[idx] > 0.55) {
        return 'jungle';
      }
      return temperatureField[idx] < 0.22 ? 'tundra' : 'forest';
    }
    if (tileHasTreeOverlay(tile)) {
      return temperatureField[idx] < 0.22 ? 'tundra' : 'forest';
    }

    const temperature = temperatureField[idx];
    const moisture = moistureField[idx];
    const dryness = 1 - moisture;
    const relativeElevation = elevationField[idx] - seaLevel;

    let nearbyWaterTiles = 0;
    for (let i = 0; i < neighborOffsets8.length; i += 1) {
      const nx = x + neighborOffsets8[i][0];
      const ny = y + neighborOffsets8[i][1];
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
        continue;
      }
      const nIdx = ny * width + nx;
      if (waterMask[nIdx]) {
        nearbyWaterTiles += 1;
      }
    }

    if (moisture > 0.78 && (relativeElevation < 0.06 || nearbyWaterTiles >= 3)) {
      return 'marsh';
    }
    if (temperature < 0.2) {
      return 'tundra';
    }
    if (dryness > 0.64 && temperature > 0.32) {
      return 'desert';
    }
    if (dryness > 0.52 && temperature > 0.35) {
      return 'badlands';
    }
    if (moisture > 0.62 || (moisture > 0.52 && nearbyWaterTiles >= 2)) {
      return hasTreeWithinRadius(x, y) ? 'forest' : 'grassland';
    }
    if (moisture > 0.5 && temperature > 0.55) {
      return hasTreeWithinRadius(x, y) ? 'forest' : 'grassland';
    }
    return 'grassland';
  };

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      const tile = tiles[y][x];
      const biomeType = computeInitialBiome(tile, idx, x, y);
      initialBiomeField[idx] = biomeType;
      if (tile) {
        tile.biomeType = null;
        tile.areaName = null;
      }
    }
  }

  let biomeField = initialBiomeField.slice();
  let biomeBuffer = new Array(width * height);
  const biomeSmoothingIterations = 2;

  for (let iteration = 0; iteration < biomeSmoothingIterations; iteration += 1) {
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        const currentType = biomeField[idx];
        biomeBuffer[idx] = currentType;
        const tile = tiles[y][x];
        if (tileHasTownSettlement(tile)) {
          continue;
        }
        if (!currentType || currentType === 'water' || currentType === 'mountain') {
          continue;
        }
        const neighborCounts = new Map();
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const neighborType = biomeField[ny * width + nx];
          if (!neighborType || neighborType === 'water') {
            continue;
          }
          neighborCounts.set(neighborType, (neighborCounts.get(neighborType) || 0) + 1);
        }
        let bestType = currentType;
        let bestCount = 0;
        neighborCounts.forEach((count, type) => {
          if (count > bestCount || (count === bestCount && type === currentType)) {
            bestType = type;
            bestCount = count;
          }
        });
        if (bestType === currentType) {
          continue;
        }
        const bestIsMarsh = bestType === 'marsh';
        const currentIsMarsh = currentType === 'marsh';
        if (currentIsMarsh) {
          const marshSupport = neighborCounts.get('marsh') || 0;
          if (marshSupport >= 2 && bestCount < 6) {
            continue;
          }
        }
        const requiredNeighbors = bestIsMarsh ? 4 : 5;
        if (bestCount >= requiredNeighbors) {
          biomeBuffer[idx] = bestType;
        }
      }
    }
    const swap = biomeField;
    biomeField = biomeBuffer;
    biomeBuffer = swap;
  }

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      if (biomeField[idx] !== 'forest') {
        continue;
      }
      if (!hasTreeWithinRadius(x, y)) {
        biomeField[idx] = 'grassland';
      }
    }
  }

  const biomeVisited = new Uint8Array(width * height);
  const biomeClusters = [];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      if (biomeVisited[idx]) {
        continue;
      }
      const baseBiome = biomeField[idx];
      const tile = tiles[y][x];
      if (!baseBiome) {
        biomeVisited[idx] = 1;
        if (tile) {
          tile.biomeType = null;
          tile.areaName = null;
        }
        continue;
      }
      const stack = [idx];
      biomeVisited[idx] = 1;
      const members = [];
      let touchesEdge = x === 0 || y === 0 || x === width - 1 || y === height - 1;
      while (stack.length > 0) {
        const current = stack.pop();
        const cx = current % width;
        const cy = Math.floor(current / width);
        members.push(current);
        if (cx === 0 || cy === 0 || cx === width - 1 || cy === height - 1) {
          touchesEdge = true;
        }
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = cx + neighborOffsets8[i][0];
          const ny = cy + neighborOffsets8[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const nIdx = ny * width + nx;
          if (biomeVisited[nIdx]) {
            continue;
          }
          const neighborBiome = biomeField[nIdx];
          if (neighborBiome === baseBiome) {
            biomeVisited[nIdx] = 1;
            stack.push(nIdx);
          }
        }
      }
      biomeClusters.push({ type: baseBiome, indices: members, touchesEdge, size: members.length });
    }
  }

  for (let i = 0; i < biomeClusters.length; i += 1) {
    const cluster = biomeClusters[i];
    if (cluster.type !== 'grassland') {
      continue;
    }
    let hasDesertNeighbor = false;
    let hasBlockingNeighbor = false;
    for (let j = 0; j < cluster.indices.length && !hasBlockingNeighbor; j += 1) {
      const clusterIdx = cluster.indices[j];
      const cx = clusterIdx % width;
      const cy = Math.floor(clusterIdx / width);
      for (let k = 0; k < neighborOffsets8.length; k += 1) {
        const nx = cx + neighborOffsets8[k][0];
        const ny = cy + neighborOffsets8[k][1];
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
          continue;
        }
        const neighborType = biomeField[ny * width + nx];
        if (!neighborType || neighborType === 'grassland') {
          continue;
        }
        if (neighborType === 'desert') {
          hasDesertNeighbor = true;
        } else {
          hasBlockingNeighbor = true;
          break;
        }
      }
    }
    if (hasDesertNeighbor && !hasBlockingNeighbor) {
      cluster.type = 'desert';
      for (let j = 0; j < cluster.indices.length; j += 1) {
        const clusterIdx = cluster.indices[j];
        biomeField[clusterIdx] = 'desert';
      }
    }
  }

  const oceanSizeThreshold = Math.max(80, Math.round((width * height) / 80));

  for (let i = 0; i < biomeClusters.length; i += 1) {
    const cluster = biomeClusters[i];
    let resolvedType = cluster.type;
    if (resolvedType === 'water') {
      const qualifiesAsOcean = cluster.touchesEdge || cluster.size >= oceanSizeThreshold;
      resolvedType = qualifiesAsOcean ? 'ocean' : 'lake';
    }
    const definition = biomeTypeDefinitions[resolvedType] || null;
    const context = { size: cluster.size, touchesEdge: cluster.touchesEdge };
    const generatedName = generateBiomeAreaName(resolvedType, rng, context);
    const fallbackLabel = definition ? definition.label : null;
    const resolvedName = generatedName || (fallbackLabel ? `Unnamed ${fallbackLabel}` : null);
    for (let j = 0; j < cluster.indices.length; j += 1) {
      const clusterIdx = cluster.indices[j];
      const cx = clusterIdx % width;
      const cy = Math.floor(clusterIdx / width);
      const clusterTile = tiles[cy][cx];
      if (!clusterTile) {
        continue;
      }
      if (resolvedType === 'ocean' && oceanMask) {
        oceanMask[clusterIdx] = 1;
      }
      clusterTile.biomeType = resolvedType;
      clusterTile.areaName = resolvedName;
    }
  }

  if (oceanMask) {
    let hasOcean = false;
    for (let i = 0; i < oceanMask.length; i += 1) {
      if (oceanMask[i]) {
        hasOcean = true;
        break;
      }
    }
    if (hasOcean) {
      const oceanDistanceField = computeEuclideanDistanceField(oceanMask, width, height);
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          const tile = tiles[y][x];
          if (!tile) {
            continue;
          }
          if (waterMask[idx]) {
            tile.coastProximity = 0;
            tile.marshProximity = 0;
            continue;
          }
          const distanceToOcean = Math.sqrt(oceanDistanceField[idx]);
          const proximity = clamp(1 - distanceToOcean / coastlineFalloff, 0, 1);
          tile.coastProximity = proximity;
        }
      }
    } else {
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (waterMask[idx]) {
            continue;
          }
          const tile = tiles[y][x];
          if (tile) {
            tile.coastProximity = 0;
          }
        }
      }
    }
  }

  if (volcanoOverlayKeys.length > 0) {
    const volcanoMask = new Uint8Array(width * height);
    let hasVolcanoTile = false;
    const volcanoEligibleBases = new Set(
      [grassTileKey, stoneTileKey, sandTileKey, snowTileKey].filter((key) => typeof key === 'string')
    );

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        const tile = tiles[y][x];
        if (!tile) {
          continue;
        }
        if (isVolcanoOverlayKey(tile.overlay)) {
          volcanoMask[idx] = 1;
          hasVolcanoTile = true;
          tile.volcanoProximity = 1;
        } else if (!volcanoEligibleBases.has(tile.base) || waterMask[idx]) {
          tile.volcanoProximity = 0;
        }
      }
    }

    if (hasVolcanoTile) {
      const volcanoDistanceField = computeEuclideanDistanceField(volcanoMask, width, height);
      const volcanoFalloff = 5.2;
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (volcanoMask[idx]) {
            continue;
          }
          const tile = tiles[y][x];
          if (!tile || !volcanoEligibleBases.has(tile.base) || waterMask[idx]) {
            if (tile) {
              tile.volcanoProximity = 0;
            }
            continue;
          }
          const distanceToVolcano = Math.sqrt(volcanoDistanceField[idx]);
          const proximity = clamp(1 - distanceToVolcano / volcanoFalloff, 0, 1);
          tile.volcanoProximity = proximity;
        }
      }
    } else {
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const tile = tiles[y][x];
          if (tile) {
            tile.volcanoProximity = 0;
          }
        }
      }
    }
  } else {
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const tile = tiles[y][x];
        if (tile) {
          tile.volcanoProximity = 0;
        }
      }
    }
  }

  const finalSeed = seedString && seedString.trim().length ? seedString.trim() : generateSeedString(seedNumber);
  const settlementSeeds = [
    ...dwarfholds.map((hold) => ({
      x: hold.x,
      y: hold.y,
      label: hold.name || hold.structureName || 'Hold',
      type: 'dwarfhold',
      population: Number.isFinite(hold?.population) ? hold.population : null,
      settlementKind: typeof hold?.type === 'string' ? hold.type : null
    })),
    ...hillholds.map((hold) => ({
      x: hold.x,
      y: hold.y,
      label: hold.name || hold.structureName || 'Hillhold',
      type: 'hillhold',
      population: Number.isFinite(hold?.population) ? hold.population : null,
      settlementKind: typeof hold?.type === 'string' ? hold.type : null
    })),
    ...towns.map((town) => ({
      x: town.x,
      y: town.y,
      label: town.name || town.structureName || 'Town',
      type: 'town',
      population: Number.isFinite(town?.population) ? town.population : null,
      settlementKind: typeof town?.type === 'string' ? town.type : null
    })),
    ...towers.map((tower) => ({
      x: tower.x,
      y: tower.y,
      label: tower.name || tower.structureName || 'Tower',
      type: 'tower',
      population: Number.isFinite(tower?.population) ? tower.population : null,
      settlementKind: typeof tower?.type === 'string' ? tower.type : null
    })),
    ...evilWizardTowers.map((tower) => ({
      x: tower.x,
      y: tower.y,
      label: tower.name || tower.structureName || "Wizard's Tower",
      type: 'evilWizardTower',
      population: Number.isFinite(tower?.population) ? tower.population : null,
      settlementKind: typeof tower?.type === 'string' ? tower.type : null
    })),
    ...lizardmenCities.map((city) => ({
      x: city.x,
      y: city.y,
      label: city.name || 'Temple City',
      type: 'lizardmenCity',
      population: Number.isFinite(city?.population) ? city.population : null,
      settlementKind: typeof city?.type === 'string' ? city.type : null
    })),
    ...woodElfGroves.map((grove) => ({
      x: grove.x,
      y: grove.y,
      label: grove.name || grove.structureName || 'Grove',
      type: 'woodElfGrove',
      population: Number.isFinite(grove?.population) ? grove.population : null,
      settlementKind: typeof grove?.type === 'string' ? grove.type : null
    })),
    ...castles.map((castle) => ({
      x: castle.x,
      y: castle.y,
      label: castle.name || castle.structureName || 'Castle',
      type: 'castle',
      population: Number.isFinite(castle?.garrison) ? castle.garrison : null,
      settlementKind: typeof castle?.type === 'string' ? castle.type : null
    }))
  ];

  const politicalData = generatePoliticalLandscape({
    width,
    height,
    tiles,
    waterMask,
    random: rng,
    settlements: settlementSeeds
  });
  const factions = politicalData.factions || [];
  applyCulturalInfluence({
    width,
    height,
    tiles,
    settlements: [
      ...dwarfholds,
      ...hillholds,
      ...towns,
      ...towers,
      ...evilWizardTowers,
      ...lizardmenCities,
      ...woodElfGroves,
      ...mines,
      ...castles,
      ...orcCamps
    ],
    factions,
    isLandBaseTile
  });
  return {
    tiles,
    grassTileKey,
    waterTileKey,
    width,
    height,
    seaLevel,
    elevationField,
    temperatureField,
    moistureField,
    biomeField,
    seedString: finalSeed,
    dwarfholds,
    mines,
    hillholds,
    towns,
    towers,
    caves,
    evilWizardTowers,
    lizardmenCities,
    woodElfGroves,
    orcCamps,
    travelerCamps,
    dungeons,
    monasteries,
    castles,
    saintShrines,
    roadsideTaverns,
    factions
  };
}

function generateSeedString(seedNumber) {
  return seedNumber.toString(16).padStart(8, '0');
}

function drawRiverSegment(ctx, river, x, y) {
  if (!river) {
    return;
  }
  const definition = tileLookup.get(river.tileKey || river.key);
  if (!definition) {
    return;
  }
  const sheet = state.tileSheets[definition.sheet];
  if (!sheet || !sheet.image) {
    return;
  }
  ctx.drawImage(
    sheet.image,
    definition.sx,
    definition.sy,
    definition.size,
    definition.size,
    x * drawSize,
    y * drawSize,
    drawSize,
    drawSize
  );
}

function computeRoadNeighborMask(x, y, overlayKey = TOWN_ROAD_OVERLAY_KEY) {
  const world = state.currentWorld;
  if (!world || !Array.isArray(world.tiles)) {
    return 0;
  }

  const tiles = world.tiles;
  const height = tiles.length;
  if (!Number.isFinite(x) || !Number.isFinite(y) || y < 0 || y >= height) {
    return 0;
  }

  const row = tiles[y];
  if (!Array.isArray(row) || x < 0 || x >= row.length) {
    return 0;
  }

  let mask = 0;
  const directions = [
    { bit: ROAD_DIRECTION_BITS.NORTH, dx: 0, dy: -1 },
    { bit: ROAD_DIRECTION_BITS.EAST, dx: 1, dy: 0 },
    { bit: ROAD_DIRECTION_BITS.SOUTH, dx: 0, dy: 1 },
    { bit: ROAD_DIRECTION_BITS.WEST, dx: -1, dy: 0 }
  ];

  for (let i = 0; i < directions.length; i += 1) {
    const { bit, dx, dy } = directions[i];
    const nx = x + dx;
    const ny = y + dy;
    if (ny < 0 || ny >= height) {
      continue;
    }
    const neighborRow = tiles[ny];
    if (!Array.isArray(neighborRow) || nx < 0 || nx >= neighborRow.length) {
      continue;
    }
    const neighbor = neighborRow[nx];
    if (neighbor && neighbor.overlay === overlayKey) {
      mask |= bit;
    }
  }

  return mask;
}

function selectRoadTileSprite(mask) {
  if (!roadTileSpriteDefinitions) {
    return null;
  }

  const { NORTH, EAST, SOUTH, WEST } = ROAD_DIRECTION_BITS;

  if (mask === 0) {
    return { definition: roadTileSpriteDefinitions.isolated, rotation: 0 };
  }

  const singleDirectionRotations = {
    [WEST]: 0,
    [NORTH]: 1,
    [EAST]: 2,
    [SOUTH]: 3
  };
  if (singleDirectionRotations[mask] !== undefined) {
    return {
      definition: roadTileSpriteDefinitions.deadEndWest,
      rotation: singleDirectionRotations[mask]
    };
  }

  if (mask === (EAST | WEST)) {
    return { definition: roadTileSpriteDefinitions.straightEastWest, rotation: 0 };
  }
  if (mask === (NORTH | SOUTH)) {
    return { definition: roadTileSpriteDefinitions.straightEastWest, rotation: 1 };
  }

  const cornerDefinition = {
    [NORTH | EAST]: roadTileSpriteDefinitions.cornerNorthEast,
    [EAST | SOUTH]: roadTileSpriteDefinitions.cornerSouthEast,
    [SOUTH | WEST]: roadTileSpriteDefinitions.cornerSouthWest,
    [WEST | NORTH]: roadTileSpriteDefinitions.cornerNorthWest
  }[mask];
  if (cornerDefinition) {
    return { definition: cornerDefinition, rotation: 0 };
  }

  if (mask === (NORTH | EAST | SOUTH)) {
    return { definition: roadTileSpriteDefinitions.teeMissingWest, rotation: 0 };
  }
  if (mask === (EAST | SOUTH | WEST)) {
    return { definition: roadTileSpriteDefinitions.teeMissingNorth, rotation: 0 };
  }
  if (mask === (SOUTH | WEST | NORTH)) {
    return { definition: roadTileSpriteDefinitions.teeMissingEast, rotation: 0 };
  }
  if (mask === (WEST | NORTH | EAST)) {
    return { definition: roadTileSpriteDefinitions.teeMissingSouth, rotation: 0 };
  }

  if (mask === (NORTH | EAST | SOUTH | WEST)) {
    return { definition: roadTileSpriteDefinitions.cross, rotation: 0 };
  }

  return { definition: roadTileSpriteDefinitions.cross, rotation: 0 };
}

function drawRoadSprite(ctx, definition, x, y, rotationSteps = 0) {
  if (!ctx || !definition) {
    return false;
  }

  const sheet = state.tileSheets[definition.sheetKey];
  if (!sheet || !sheet.image) {
    return false;
  }

  const normalizedRotation = ((Number.isFinite(rotationSteps) ? rotationSteps : 0) % 4 + 4) % 4;
  const pixelX = x * drawSize;
  const pixelY = y * drawSize;

  if (normalizedRotation === 0) {
    ctx.drawImage(
      sheet.image,
      definition.sx,
      definition.sy,
      definition.size,
      definition.size,
      pixelX,
      pixelY,
      drawSize,
      drawSize
    );
    return true;
  }

  ctx.save();
  ctx.translate(pixelX + drawSize / 2, pixelY + drawSize / 2);
  ctx.rotate((Math.PI / 2) * normalizedRotation);
  ctx.drawImage(
    sheet.image,
    definition.sx,
    definition.sy,
    definition.size,
    definition.size,
    -drawSize / 2,
    -drawSize / 2,
    drawSize,
    drawSize
  );
  ctx.restore();
  return true;
}

function drawRoadOverlay(ctx, x, y) {
  if (!ctx || !roadTileSpriteDefinitions) {
    return false;
  }

  const mask = computeRoadNeighborMask(x, y, TOWN_ROAD_OVERLAY_KEY);
  const selection = selectRoadTileSprite(mask);
  if (!selection || !selection.definition) {
    return false;
  }

  return drawRoadSprite(ctx, selection.definition, x, y, selection.rotation || 0);
}

function drawCustomOverlay(ctx, overlayKey, x, y) {
  if (overlayKey === TOWN_ROAD_OVERLAY_KEY) {
    return drawRoadOverlay(ctx, x, y);
  }
  return false;
}

function drawOverlayCell(ctx, x, y, color, alpha = 0.3) {
  if (!ctx || !color) {
    return;
  }
  const clampedAlpha = clamp(Number.isFinite(alpha) ? alpha : 0.3, 0, 1);
  if (clampedAlpha <= 0) {
    return;
  }
  ctx.save();
  ctx.globalAlpha = clampedAlpha;
  ctx.fillStyle = color;
  ctx.fillRect(x * drawSize, y * drawSize, drawSize, drawSize);
  ctx.restore();
}

function mixColors(colorA, colorB, t) {
  const factor = clamp(Number.isFinite(t) ? t : 0, 0, 1);
  return {
    r: Math.round(colorA.r + (colorB.r - colorA.r) * factor),
    g: Math.round(colorA.g + (colorB.g - colorA.g) * factor),
    b: Math.round(colorA.b + (colorB.b - colorA.b) * factor)
  };
}

function rgbToCss({ r, g, b }) {
  const red = Math.round(Number.isFinite(r) ? r : 0);
  const green = Math.round(Number.isFinite(g) ? g : 0);
  const blue = Math.round(Number.isFinite(b) ? b : 0);
  return `rgb(${red}, ${green}, ${blue})`;
}

function getElevationOverlayColor(value, seaLevel) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const safeSeaLevel = Number.isFinite(seaLevel) ? clamp(seaLevel, 0, 1) : 0.5;
  const clampedValue = clamp(value, 0, 1);
  if (clampedValue <= safeSeaLevel) {
    const ratio = safeSeaLevel <= 0 ? 0 : clamp(clampedValue / safeSeaLevel, 0, 1);
    const deep = { r: 23, g: 63, b: 140 };
    const shallow = { r: 88, g: 164, b: 218 };
    return rgbToCss(mixColors(deep, shallow, ratio));
  }
  const landSpan = Math.max(1 - safeSeaLevel, 0.0001);
  const landRatio = clamp((clampedValue - safeSeaLevel) / landSpan, 0, 1);
  const foothills = { r: 96, g: 158, b: 94 };
  const highlands = { r: 168, g: 124, b: 80 };
  const peaks = { r: 236, g: 230, b: 220 };
  if (landRatio < 0.5) {
    return rgbToCss(mixColors(foothills, highlands, landRatio * 2));
  }
  return rgbToCss(mixColors(highlands, peaks, (landRatio - 0.5) * 2));
}

function getTemperatureOverlayColor(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const t = clamp(value, 0, 1);
  const cold = { r: 32, g: 74, b: 135 };
  const temperate = { r: 245, g: 208, b: 112 };
  const hot = { r: 204, g: 65, b: 52 };
  if (t < 0.5) {
    return rgbToCss(mixColors(cold, temperate, t * 2));
  }
  return rgbToCss(mixColors(temperate, hot, (t - 0.5) * 2));
}

const biomeOverlayColors = {
  forest: '#2f855a',
  jungle: '#0f766e',
  mountain: '#9c6644',
  desert: '#f4a261',
  badlands: '#d97706',
  tundra: '#94a3b8',
  grassland: '#65a30d',
  marsh: '#1d948a',
  ocean: '#2563eb',
  lake: '#38bdf8',
  water: '#38bdf8'
};

function getBiomeOverlayColor(type) {
  if (typeof type !== 'string' || type.length === 0) {
    return null;
  }
  const normalized = type.toLowerCase();
  return biomeOverlayColors[normalized] || null;
}

function applyCoastalShading(ctx, cell, x, y, waterTileKey, grassTileKey) {
  if (!ctx || !cell) {
    return;
  }
  const pixelX = x * drawSize;
  const pixelY = y * drawSize;
  const hasDistinctWaterTile = Boolean(waterTileKey) && waterTileKey !== grassTileKey;
  const isWaterTile = hasDistinctWaterTile && cell.base === waterTileKey;
  if (isWaterTile) {
    const depth = clamp(Number.isFinite(cell.waterDepth) ? cell.waterDepth : 0, 0, 1);
    const shallowFactor = clamp(1 - depth, 0, 1);
    if (shallowFactor > 0.01) {
      const alpha = shallowFactor * 0.32;
      ctx.fillStyle = `rgba(88, 164, 218, ${alpha})`;
      ctx.fillRect(pixelX, pixelY, drawSize, drawSize);
    }
    return;
  }
  if (!grassTileKey || cell.base !== grassTileKey) {
    return;
  }
  const marshProximity = clamp(
    Number.isFinite(cell.marshProximity) ? cell.marshProximity : 0,
    0,
    1
  );
  if (marshProximity > 0.01) {
    const alpha = marshProximity * 0.55;
    ctx.save();
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = `rgba(82, 64, 40, ${alpha})`;
    ctx.fillRect(pixelX, pixelY, drawSize, drawSize);
    ctx.restore();
  }
  const desertProximity = clamp(
    Number.isFinite(cell.desertProximity) ? cell.desertProximity : 0,
    0,
    1
  );
  if (desertProximity > 0.01) {
    const desertAlpha = desertProximity * 0.45;
    ctx.save();
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = `rgba(96, 74, 42, ${desertAlpha})`;
    ctx.fillRect(pixelX, pixelY, drawSize, drawSize);
    ctx.restore();
  }
}

function applyVolcanoShading(ctx, cell, x, y) {
  if (!ctx || !cell) {
    return;
  }

  const overlayKey = typeof cell.overlay === 'string' ? cell.overlay : null;
  const hillOverlayKey = typeof cell.hillOverlay === 'string' ? cell.hillOverlay : null;

  if (isMountainOverlayKey(overlayKey) || isMountainOverlayKey(hillOverlayKey)) {
    // Mountain tiles handle volcano shading separately to avoid double-darkening.
    return;
  }

  const proximity = clamp(Number.isFinite(cell.volcanoProximity) ? cell.volcanoProximity : 0, 0, 1);
  if (proximity <= 0.01) {
    return;
  }

  const pixelX = x * drawSize;
  const pixelY = y * drawSize;
  const alpha = proximity * 0.4;
  ctx.save();
  ctx.globalCompositeOperation = 'source-atop';
  ctx.fillStyle = `rgba(28, 14, 10, ${alpha})`;
  ctx.fillRect(pixelX, pixelY, drawSize, drawSize);
  ctx.restore();
}

function applyMountainShading(ctx, cell, x, y) {
  if (!ctx || !cell) {
    return;
  }

  const overlayKey = typeof cell.overlay === 'string' ? cell.overlay : null;
  const hillOverlayKey = typeof cell.hillOverlay === 'string' ? cell.hillOverlay : null;
  if (!isMountainOverlayKey(overlayKey) && !isMountainOverlayKey(hillOverlayKey)) {
    return;
  }

  const peakOverlay = typeof overlayKey === 'string' && overlayKey.includes('PEAK');
  const volcanoOverlay = isVolcanoOverlayKey(overlayKey) || isVolcanoOverlayKey(hillOverlayKey);
  const baseAlpha = volcanoOverlay ? 0.35 : peakOverlay ? 0.35 : 0.3;
  const volcanoProximity = clamp(
    Number.isFinite(cell.volcanoProximity) ? cell.volcanoProximity : 0,
    0,
    1
  );
  const volcanoAlphaBoost = volcanoProximity > 0 ? volcanoProximity * 0.35 : 0;
  const shadingAlpha = clamp(baseAlpha + volcanoAlphaBoost, 0, 0.75);
  ctx.save();
  ctx.globalCompositeOperation = 'source-atop';
  ctx.fillStyle = `rgba(24, 20, 18, ${shadingAlpha})`;
  ctx.fillRect(x * drawSize, y * drawSize, drawSize, drawSize);
  ctx.restore();
}

function applyDesertMountainTint(ctx, cell, x, y) {
  if (!ctx || !cell) {
    return;
  }

  const overlayKey = typeof cell.overlay === 'string' ? cell.overlay : null;
  if (!overlayKey || !isMountainOverlayKey(overlayKey)) {
    return;
  }

  const baseKey = typeof cell.base === 'string' ? cell.base : '';
  const isSandBase = baseKey === 'SAND';
  const isBadlandsBase = baseKey === 'BADLANDS';
  if (!isSandBase && !isBadlandsBase) {
    return;
  }

  ctx.save();
  ctx.globalCompositeOperation = 'source-atop';
  ctx.globalAlpha = isBadlandsBase ? 0.35 : 0.45;
  ctx.fillStyle = isBadlandsBase ? '#b38a5c' : '#dcbf7e';
  ctx.fillRect(x * drawSize, y * drawSize, drawSize, drawSize);
  ctx.restore();
}

function drawWorld(world, options = {}) {
  const { preserveView = false } = options;
  const { tiles, seedString } = world;
  const factions = Array.isArray(world.factions) ? world.factions : [];
  const showPoliticalBorders = Boolean(state.ui && state.ui.showPoliticalBorders);
  const showPoliticalInfluence = Boolean(state.ui && state.ui.showPoliticalInfluence);
  const showElevation = Boolean(state.ui && state.ui.showElevation);
  const showBiomes = Boolean(state.ui && state.ui.showBiomes);
  const showTemperature = Boolean(state.ui && state.ui.showTemperature);
  const shouldDrawDataOverlay = showElevation || showBiomes || showTemperature;
  const elevationField = showElevation && world.elevationField ? world.elevationField : null;
  const temperatureField = showTemperature && world.temperatureField ? world.temperatureField : null;
  const seaLevel = Number.isFinite(world.seaLevel) ? world.seaLevel : null;
  const hasBorderOverlay = showPoliticalBorders && factions.length > 0;
  const waterTileKey = world.waterTileKey || resolveTileName('WATER');
  const grassTileKey = world.grassTileKey || resolveTileName('GRASS');
  hideStructureDetails();
  hideMapTooltip();
  const height = tiles.length;
  const width = tiles[0].length;
  const previousView = preserveView
    ? {
        scale: viewState.scale,
        translateX: viewState.translateX,
        translateY: viewState.translateY,
        hasInteracted: viewState.hasInteracted
      }
    : null;

  const ctx = elements.canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  elements.canvas.width = width * drawSize;
  elements.canvas.height = height * drawSize;
  const pixelWidth = width * drawSize;
  const pixelHeight = height * drawSize;
  elements.canvas.style.width = `${pixelWidth}px`;
  elements.canvas.style.height = `${pixelHeight}px`;

  if (preserveView && elements.canvasWrapper) {
    const rect = elements.canvasWrapper.getBoundingClientRect();
    viewState.wrapperSize = { width: rect.width, height: rect.height };
    viewState.worldSize = { width: pixelWidth, height: pixelHeight };
    const { contain, cover } = computeViewScales(rect.width, rect.height, pixelWidth, pixelHeight);
    viewState.containScale = contain;
    viewState.coverScale = cover;
    viewState.minScale = Math.min(0.25, contain);
    viewState.maxScale = Math.max(6, cover * 4);
    const targetScale = previousView ? previousView.scale : viewState.scale;
    viewState.scale = clamp(targetScale, viewState.minScale, viewState.maxScale);
    viewState.translateX = previousView ? previousView.translateX : viewState.translateX;
    viewState.translateY = previousView ? previousView.translateY : viewState.translateY;
    viewState.hasInteracted = previousView ? previousView.hasInteracted : viewState.hasInteracted;
    applyViewTransform();
  } else {
    resetView(pixelWidth, pixelHeight);
  }
  refreshOverlayToggleButtons();

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const cell = tiles[y][x];
      const cellIndex = shouldDrawDataOverlay ? y * width + x : null;
      const baseDefinition = tileLookup.get(cell.base) || tileLookup.get('GRASS');
      if (!baseDefinition) {
        continue;
      }
      const baseSheet = state.tileSheets[baseDefinition.sheet];
      if (!baseSheet || !baseSheet.image) {
        continue;
      }
      ctx.drawImage(
        baseSheet.image,
        baseDefinition.sx,
        baseDefinition.sy,
        baseDefinition.size,
        baseDefinition.size,
        x * drawSize,
        y * drawSize,
        drawSize,
        drawSize
      );

      applyCoastalShading(ctx, cell, x, y, waterTileKey, grassTileKey);
      applyVolcanoShading(ctx, cell, x, y);

      if (cell.hillOverlay && cell.hillOverlay !== cell.overlay) {
        const hillDefinition = tileLookup.get(cell.hillOverlay);
        if (hillDefinition) {
          const hillSheet = state.tileSheets[hillDefinition.sheet];
          if (hillSheet && hillSheet.image) {
            ctx.drawImage(
              hillSheet.image,
              hillDefinition.sx,
              hillDefinition.sy,
              hillDefinition.size,
              hillDefinition.size,
              x * drawSize,
              y * drawSize,
              drawSize,
              drawSize
            );
          }
        }
      }

      if (cell.overlay) {
        const overlayDefinition = tileLookup.get(cell.overlay);
        if (!overlayDefinition) {
          drawCustomOverlay(ctx, cell.overlay, x, y);
        } else {
          const overlaySheet = state.tileSheets[overlayDefinition.sheet];
          if (overlaySheet && overlaySheet.image) {
            ctx.drawImage(
              overlaySheet.image,
              overlayDefinition.sx,
              overlayDefinition.sy,
              overlayDefinition.size,
              overlayDefinition.size,
              x * drawSize,
              y * drawSize,
              drawSize,
              drawSize
            );
          }
        }
      }

      applyDesertMountainTint(ctx, cell, x, y);
      applyMountainShading(ctx, cell, x, y);

      if (showElevation && elevationField && cellIndex !== null) {
        const elevationValue = elevationField[cellIndex];
        const elevationColor = getElevationOverlayColor(elevationValue, seaLevel);
        if (elevationColor) {
          drawOverlayCell(ctx, x, y, elevationColor, 0.55);
        }
      }

      if (showTemperature && temperatureField && cellIndex !== null) {
        const temperatureValue = temperatureField[cellIndex];
        const temperatureColor = getTemperatureOverlayColor(temperatureValue);
        if (temperatureColor) {
          drawOverlayCell(ctx, x, y, temperatureColor, 0.55);
        }
      }

      if (showBiomes) {
        const biomeColor = getBiomeOverlayColor(cell && cell.biomeType);
        if (biomeColor) {
          drawOverlayCell(ctx, x, y, biomeColor, 0.35);
        }
      }

      if (cell.river) {
        drawRiverSegment(ctx, cell.river, x, y);
      }

      if (cell.structure) {
        const structureDefinition = tileLookup.get(cell.structure);
        if (!structureDefinition) {
          continue;
        }
        if (typeof structureDefinition.draw === 'function') {
          structureDefinition.draw(ctx, {
            x,
            y,
            pixelX: x * drawSize,
            pixelY: y * drawSize,
            size: drawSize,
            cell,
            world
          });
        } else {
          const structureSheet = state.tileSheets[structureDefinition.sheet];
          if (!structureSheet || !structureSheet.image) {
            continue;
          }
          ctx.drawImage(
            structureSheet.image,
            structureDefinition.sx,
            structureDefinition.sy,
            structureDefinition.size,
            structureDefinition.size,
            x * drawSize,
            y * drawSize,
            drawSize,
            drawSize
          );
        }
      }

      if (showPoliticalInfluence && cell && cell.culturalInfluence && cell.culturalInfluence.color) {
        const culture = cell.culturalInfluence;
        const influenceStrength = clamp(Number(culture.strength) || 0, 0, 1);
        const overlayAlpha = clamp(0.24 + influenceStrength * 0.45, 0.2, 0.75);
        ctx.save();
        ctx.fillStyle = culture.color;
        ctx.globalAlpha = overlayAlpha;
        ctx.fillRect(x * drawSize, y * drawSize, drawSize, drawSize);
        ctx.restore();
      }

      if (hasBorderOverlay && cell && cell.factionId !== null && cell.factionId !== undefined) {
        const factionIndex = Number(cell.factionId);
        const safeIndex = Number.isFinite(factionIndex) ? Math.floor(factionIndex) : NaN;
        const faction =
          Number.isFinite(safeIndex) && safeIndex >= 0 && safeIndex < factions.length
            ? factions[safeIndex]
            : null;
        if (faction && faction.color) {
          const influenceStrength = clamp(Number(cell.factionInfluence) || 0, 0, 1);
          const overlayAlphaBase = showPoliticalInfluence
            ? clamp(0.1 + influenceStrength * 0.2, 0.08, 0.25)
            : 0.2;
          ctx.save();
          ctx.fillStyle = faction.color;
          ctx.globalAlpha = Math.min(0.35, overlayAlphaBase);
          ctx.fillRect(x * drawSize, y * drawSize, drawSize, drawSize);
          ctx.restore();

          if (showPoliticalBorders) {
            const borderThickness = Math.max(1, Math.round(drawSize / 16));
            const leftNeighbor = x > 0 ? tiles[y][x - 1] : null;
            const rightNeighbor = x < width - 1 ? tiles[y][x + 1] : null;
            const topNeighbor = y > 0 ? tiles[y - 1][x] : null;
            const bottomNeighbor = y < height - 1 ? tiles[y + 1][x] : null;
            ctx.save();
            ctx.fillStyle = '#0f172a';
            ctx.globalAlpha = 0.55;
            if (!topNeighbor || topNeighbor.factionId !== cell.factionId) {
              ctx.fillRect(x * drawSize, y * drawSize, drawSize, borderThickness);
            }
            if (!bottomNeighbor || bottomNeighbor.factionId !== cell.factionId) {
              ctx.fillRect(
                x * drawSize,
                y * drawSize + drawSize - borderThickness,
                drawSize,
                borderThickness
              );
            }
            if (!leftNeighbor || leftNeighbor.factionId !== cell.factionId) {
              ctx.fillRect(x * drawSize, y * drawSize, borderThickness, drawSize);
            }
            if (!rightNeighbor || rightNeighbor.factionId !== cell.factionId) {
              ctx.fillRect(
                x * drawSize + drawSize - borderThickness,
                y * drawSize,
                borderThickness,
                drawSize
              );
            }
            ctx.restore();
          }
        }
      }
    }
  }

  drawLocalSelectionOverlay(ctx);
  refreshLocalMapPreview();

  state.settings.lastSeedString = seedString;
  state.settings.seedString = seedString;
  if (elements.worldSeedInput) {
    elements.worldSeedInput.value = seedString;
  }
  updateWorldInfoSeedDisplay(seedString);
  if (elements.worldMapSizeSelect) {
    elements.worldMapSizeSelect.value = state.settings.mapSize;
  }
  updateWorldInfoSizeDisplay();
  const worldLabel = state.worldName ? `World: ${state.worldName} | ` : '';
  const chronologyLabel = isChronologyValid(state.worldChronology)
    ? `${formatChronology(state.worldChronology.year, state.worldChronology.age)} | `
    : '';
  elements.seedDisplay.textContent = `${worldLabel}${chronologyLabel}Seed: ${seedString} | ${width}×${height}`;
}

function beginGame() {
  closeDwarfCustomizer({ keepWorldInfoHidden: true });
  closeWorldInfoModal({ keepTitleHidden: true });
  if (elements.titleScreen) {
    elements.titleScreen.classList.add('hidden');
  }
  elements.gameContainer.classList.remove('hidden');
  elements.seedDisplay.textContent = '';
  generateAndRender();
}

function generateAndRender(seedOverride) {
  const seedToUse = typeof seedOverride === 'string' ? seedOverride : state.settings.seedString;
  ensureLandMaskForProfile(state.settings.worldGenerationType);
  hideMapTooltip();
  hideLocalView({ suppressRedraw: true });
  const world = createWorld(seedToUse);
  state.currentWorld = world;
  drawWorld(world);
  elements.seedInput.value = world.seedString;
  if (elements.worldSeedInput) {
    elements.worldSeedInput.value = world.seedString;
  }
  updateWorldInfoSeedDisplay(world.seedString);
}

function updateOverlayToggleButton(button, isActive, labels) {
  if (!button) {
    return;
  }
  button.classList.toggle('active', Boolean(isActive));
  button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  if (labels && labels.active && labels.inactive) {
    button.textContent = isActive ? labels.active : labels.inactive;
  }
}

function refreshOverlayToggleButtons() {
  const showBorders = Boolean(state.ui && state.ui.showPoliticalBorders);
  const showInfluence = Boolean(state.ui && state.ui.showPoliticalInfluence);
  const showElevation = Boolean(state.ui && state.ui.showElevation);
  const showBiomes = Boolean(state.ui && state.ui.showBiomes);
  const showTemperature = Boolean(state.ui && state.ui.showTemperature);
  updateOverlayToggleButton(elements.politicalBordersToggle, showBorders, {
    active: 'Hide Borders',
    inactive: 'Show Borders'
  });
  updateOverlayToggleButton(elements.politicalInfluenceToggle, showInfluence, {
    active: 'Hide Cultural Influence',
    inactive: 'Show Cultural Influence'
  });
  updateOverlayToggleButton(elements.elevationToggle, showElevation, {
    active: 'Hide Elevation',
    inactive: 'Show Elevation'
  });
  updateOverlayToggleButton(elements.biomeToggle, showBiomes, {
    active: 'Hide Biomes',
    inactive: 'Show Biomes'
  });
  updateOverlayToggleButton(elements.temperatureToggle, showTemperature, {
    active: 'Hide Temperature',
    inactive: 'Show Temperature'
  });
}

function randomSeedString() {
  return Math.random().toString(36).slice(2, 10);
}

function handleRegenerate() {
  const randomSeed = randomSeedString();
  state.settings.seedString = randomSeed;
  elements.seedInput.value = randomSeed;
  if (elements.worldSeedInput) {
    elements.worldSeedInput.value = randomSeed;
  }
  updateWorldInfoSeedDisplay(randomSeed);
  generateAndRender(randomSeed);
}

function syncInputsWithSettings() {
  if (elements.mapSizeSelect) {
    elements.mapSizeSelect.value = state.settings.mapSize;
  }
  if (elements.worldMapSizeSelect) {
    elements.worldMapSizeSelect.value = state.settings.mapSize;
  }
  updateWorldInfoSizeDisplay();
  if (elements.worldGenerationTypeSelect) {
    elements.worldGenerationTypeSelect.value = state.settings.worldGenerationType;
  }
  if (elements.worldInfoGenerationTypeSelect) {
    elements.worldInfoGenerationTypeSelect.value = state.settings.worldGenerationType;
  }
  updateWorldInfoGenerationTypeDisplay();
  if (elements.seedInput) {
    elements.seedInput.value = state.settings.seedString;
  }
  if (elements.worldSeedInput) {
    elements.worldSeedInput.value = state.settings.seedString;
  }
  updateWorldInfoSeedDisplay(state.settings.seedString);
  if (elements.forestFrequencyInput) {
    const value = sanitizeFrequencyValue(
      state.settings.forestFrequency,
      defaultForestFrequency
    );
    elements.forestFrequencyInput.value = value.toString();
    updateFrequencyDisplay(elements.forestFrequencyValue, value);
  }
  if (elements.mountainFrequencyInput) {
    const value = sanitizeFrequencyValue(
      state.settings.mountainFrequency,
      defaultMountainFrequency
    );
    elements.mountainFrequencyInput.value = value.toString();
    updateFrequencyDisplay(elements.mountainFrequencyValue, value);
  }
  if (elements.riverFrequencyInput) {
    const value = sanitizeFrequencyValue(state.settings.riverFrequency, 50);
    elements.riverFrequencyInput.value = value.toString();
    updateFrequencyDisplay(elements.riverFrequencyValue, value);
  }
  if (elements.humanSettlementFrequencyInput) {
    const value = sanitizeFrequencyValue(state.settings.humanSettlementFrequency, 50);
    elements.humanSettlementFrequencyInput.value = value.toString();
    updateFrequencyDisplay(elements.humanSettlementFrequencyValue, value);
  }
  if (elements.dwarfSettlementFrequencyInput) {
    const value = sanitizeFrequencyValue(state.settings.dwarfSettlementFrequency, 50);
    elements.dwarfSettlementFrequencyInput.value = value.toString();
    updateFrequencyDisplay(elements.dwarfSettlementFrequencyValue, value);
  }
  if (elements.woodElfSettlementFrequencyInput) {
    const value = sanitizeFrequencyValue(state.settings.woodElfSettlementFrequency, 50);
    elements.woodElfSettlementFrequencyInput.value = value.toString();
    updateFrequencyDisplay(elements.woodElfSettlementFrequencyValue, value);
  }
  if (elements.lizardmenSettlementFrequencyInput) {
    const value = sanitizeFrequencyValue(state.settings.lizardmenSettlementFrequency, 50);
    elements.lizardmenSettlementFrequencyInput.value = value.toString();
    updateFrequencyDisplay(elements.lizardmenSettlementFrequencyValue, value);
  }
}

function attachEvents() {
  const dismissContextMenuOnPointerDown = (event) => {
    if (!structureContextMenuState.visible) {
      return;
    }
    if (event.button !== undefined && event.button !== 0) {
      return;
    }
    const menu = elements.structureContextMenu;
    if (menu && menu.contains(event.target)) {
      return;
    }
    hideStructureContextMenu();
  };

  const dismissContextMenuOnKeyDown = (event) => {
    if (!structureContextMenuState.visible) {
      return;
    }
    if (event.key === 'Escape' || event.key === 'Esc') {
      hideStructureContextMenu();
    }
  };

  const dismissContextMenuOnScroll = () => {
    if (structureContextMenuState.visible) {
      hideStructureContextMenu();
    }
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('pointerdown', dismissContextMenuOnPointerDown, true);
    document.addEventListener('keydown', dismissContextMenuOnKeyDown, true);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        hideStructureContextMenu();
      }
    });
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', dismissContextMenuOnScroll, true);
    window.addEventListener('blur', dismissContextMenuOnScroll);
  }

  if (elements.canvasWrapper) {
    elements.canvasWrapper.addEventListener('focusout', () => {
      if (structureContextMenuState.visible) {
        hideStructureContextMenu();
      }
    });
  }

  if (elements.optionsButton) {
    elements.optionsButton.addEventListener('click', () => {
      openOptionsScreen('title');
    });
  }

  if (elements.inGameOptions) {
    elements.inGameOptions.addEventListener('click', () => {
      openOptionsScreen('game');
    });
  }

  if (elements.closeOptions) {
    elements.closeOptions.addEventListener('click', () => {
      closeOptionsScreen();
    });
  }

  if (elements.structureDetailsClose) {
    elements.structureDetailsClose.addEventListener('click', () => {
      hideStructureDetails({ returnFocus: true });
    });
  }

  if (elements.structureContextMenuBegin) {
    elements.structureContextMenuBegin.addEventListener('click', () => {
      const { tileX, tileY } = structureContextMenuState;
      hideStructureContextMenu();
      if (Number.isInteger(tileX) && Number.isInteger(tileY)) {
        showLocalViewAt(tileX, tileY);
      }
    });
  }

  if (elements.structureContextMenuMoreInfo) {
    elements.structureContextMenuMoreInfo.addEventListener('click', () => {
      const { tile, tileX, tileY } = structureContextMenuState;
      hideStructureContextMenu();
      if (tile && tile.structureName) {
        showStructureDetails(tile, { tileX, tileY });
      }
    });
  }

  if (elements.localMapClose) {
    elements.localMapClose.addEventListener('click', () => {
      hideLocalView();
      if (elements.canvasWrapper) {
        elements.canvasWrapper.focus();
      }
    });
  }

  if (elements.politicalBordersToggle) {
    elements.politicalBordersToggle.addEventListener('click', () => {
      state.ui.showPoliticalBorders = !state.ui.showPoliticalBorders;
      refreshOverlayToggleButtons();
      if (state.currentWorld) {
        drawWorld(state.currentWorld);
      }
    });
  }

  if (elements.politicalInfluenceToggle) {
    elements.politicalInfluenceToggle.addEventListener('click', () => {
      state.ui.showPoliticalInfluence = !state.ui.showPoliticalInfluence;
      refreshOverlayToggleButtons();
      if (state.currentWorld) {
        drawWorld(state.currentWorld);
      }
    });
  }

  if (elements.elevationToggle) {
    elements.elevationToggle.addEventListener('click', () => {
      state.ui.showElevation = !state.ui.showElevation;
      refreshOverlayToggleButtons();
      if (state.currentWorld) {
        drawWorld(state.currentWorld);
      }
    });
  }

  if (elements.biomeToggle) {
    elements.biomeToggle.addEventListener('click', () => {
      state.ui.showBiomes = !state.ui.showBiomes;
      refreshOverlayToggleButtons();
      if (state.currentWorld) {
        drawWorld(state.currentWorld);
      }
    });
  }

  if (elements.temperatureToggle) {
    elements.temperatureToggle.addEventListener('click', () => {
      state.ui.showTemperature = !state.ui.showTemperature;
      refreshOverlayToggleButtons();
      if (state.currentWorld) {
        drawWorld(state.currentWorld);
      }
    });
  }

  if (elements.forestFrequencyInput) {
    elements.forestFrequencyInput.addEventListener('input', (event) => {
      const value = sanitizeFrequencyValue(event.target.value, state.settings.forestFrequency);
      updateFrequencyDisplay(elements.forestFrequencyValue, value);
    });
  }

  if (elements.mountainFrequencyInput) {
    elements.mountainFrequencyInput.addEventListener('input', (event) => {
      const value = sanitizeFrequencyValue(event.target.value, state.settings.mountainFrequency);
      updateFrequencyDisplay(elements.mountainFrequencyValue, value);
    });
  }

  if (elements.riverFrequencyInput) {
    elements.riverFrequencyInput.addEventListener('input', (event) => {
      const value = sanitizeFrequencyValue(event.target.value, state.settings.riverFrequency);
      updateFrequencyDisplay(elements.riverFrequencyValue, value);
    });
  }

  if (elements.humanSettlementFrequencyInput) {
    elements.humanSettlementFrequencyInput.addEventListener('input', (event) => {
      const value = sanitizeFrequencyValue(
        event.target.value,
        state.settings.humanSettlementFrequency
      );
      updateFrequencyDisplay(elements.humanSettlementFrequencyValue, value);
    });
  }

  if (elements.dwarfSettlementFrequencyInput) {
    elements.dwarfSettlementFrequencyInput.addEventListener('input', (event) => {
      const value = sanitizeFrequencyValue(
        event.target.value,
        state.settings.dwarfSettlementFrequency
      );
      updateFrequencyDisplay(elements.dwarfSettlementFrequencyValue, value);
    });
  }

  if (elements.woodElfSettlementFrequencyInput) {
    elements.woodElfSettlementFrequencyInput.addEventListener('input', (event) => {
      const value = sanitizeFrequencyValue(
        event.target.value,
        state.settings.woodElfSettlementFrequency
      );
      updateFrequencyDisplay(elements.woodElfSettlementFrequencyValue, value);
    });
  }

  if (elements.lizardmenSettlementFrequencyInput) {
    elements.lizardmenSettlementFrequencyInput.addEventListener('input', (event) => {
      const value = sanitizeFrequencyValue(
        event.target.value,
        state.settings.lizardmenSettlementFrequency
      );
      updateFrequencyDisplay(elements.lizardmenSettlementFrequencyValue, value);
    });
  }

  elements.optionsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    applyFormSettings();
    const previousSource = closeOptionsScreen();
    if (previousSource === 'game' && elements.gameContainer) {
      generateAndRender();
    }
  });

  elements.startButton.addEventListener('click', () => {
    if (!state.ready) {
      return;
    }
    if (optionsVisible) {
      closeOptionsScreen({ restoreScreen: false, returnFocus: false });
    }
    openWorldInfoModal();
  });

  if (elements.worldInfoForm) {
    elements.worldInfoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const selectedMapSizeKey = elements.worldMapSizeSelect
        ? elements.worldMapSizeSelect.value
        : state.settings.mapSize;
      const selectedPreset = getMapSizePreset(selectedMapSizeKey);
      applyMapSizePresetToState(selectedPreset);
      if (elements.worldMapSizeSelect) {
        elements.worldMapSizeSelect.value = state.settings.mapSize;
      }
      if (elements.mapSizeSelect) {
        elements.mapSizeSelect.value = state.settings.mapSize;
      }
      updateWorldInfoSizeDisplay();
      const selectedGenerationType = elements.worldInfoGenerationTypeSelect
        ? elements.worldInfoGenerationTypeSelect.value
        : state.settings.worldGenerationType;
      setWorldGenerationType(selectedGenerationType);

      if (elements.worldSeedInput) {
        state.settings.seedString = elements.worldSeedInput.value.trim();
      }
      let finalSeed = state.settings.seedString;
      if (!finalSeed) {
        finalSeed = ensureSeedString();
        if (elements.worldSeedInput) {
          elements.worldSeedInput.value = finalSeed;
        }
      }
      state.settings.lastSeedString = finalSeed;
      if (elements.seedInput) {
        elements.seedInput.value = finalSeed;
      }
      updateWorldInfoSeedDisplay(finalSeed);

      const submittedName = elements.worldNameInput ? elements.worldNameInput.value.trim() : '';
      state.worldName = submittedName || getRandomWorldName(state.worldName);
      const submittedChronology = getSanitisedChronologyFromInputs();
      if (submittedChronology) {
        state.worldChronology = submittedChronology;
      } else {
        state.worldChronology = generateRandomChronology();
        if (elements.worldYearInput) {
          elements.worldYearInput.value = state.worldChronology.year.toString();
        }
        if (elements.worldAgeInput) {
          elements.worldAgeInput.value = state.worldChronology.age.toString();
        }
      }
      updateChronologyDisplay();
      openDwarfCustomizer();
    });
  }

  if (elements.worldInfoCancel) {
    elements.worldInfoCancel.addEventListener('click', () => {
      closeWorldInfoModal({ returnFocus: true });
    });
  }

  if (elements.worldYearInput) {
    elements.worldYearInput.addEventListener('input', updateChronologyDisplay);
  }

  if (elements.worldAgeInput) {
    elements.worldAgeInput.addEventListener('input', updateChronologyDisplay);
  }

  if (elements.worldChronologyRandom) {
    elements.worldChronologyRandom.addEventListener('click', () => {
      const newChronology = generateRandomChronology();
      state.worldChronology = newChronology;
      if (elements.worldYearInput) {
        elements.worldYearInput.value = newChronology.year.toString();
        elements.worldYearInput.focus();
        elements.worldYearInput.select();
      }
      if (elements.worldAgeInput) {
        elements.worldAgeInput.value = newChronology.age.toString();
      }
      updateChronologyDisplay();
    });
  }

  if (elements.worldNameRandom) {
    elements.worldNameRandom.addEventListener('click', () => {
      const newName = getRandomWorldName(state.worldName);
      state.worldName = newName;
      if (elements.worldNameInput) {
        elements.worldNameInput.value = newName;
        elements.worldNameInput.focus();
        elements.worldNameInput.select();
      }
    });
  }

  if (elements.worldMapSizeSelect) {
    elements.worldMapSizeSelect.addEventListener('change', (event) => {
      const preset = getMapSizePreset(event.target.value);
      applyMapSizePresetToState(preset);
      if (elements.mapSizeSelect) {
        elements.mapSizeSelect.value = state.settings.mapSize;
      }
      updateWorldInfoSizeDisplay();
    });
  }

  if (elements.worldInfoGenerationTypeSelect) {
    elements.worldInfoGenerationTypeSelect.addEventListener('change', (event) => {
      setWorldGenerationType(event.target.value);
      if (elements.worldGenerationTypeSelect) {
        elements.worldGenerationTypeSelect.value = state.settings.worldGenerationType;
      }
    });
  }

  if (elements.worldSeedInput) {
    elements.worldSeedInput.addEventListener('input', (event) => {
      const newValue = event.target.value;
      state.settings.seedString = newValue.trim();
      updateWorldInfoSeedDisplay(newValue);
      if (elements.seedInput && elements.seedInput !== event.target) {
        elements.seedInput.value = newValue;
      }
    });
  }

  elements.regenerate.addEventListener('click', handleRegenerate);

  if (elements.dwarfPrev) {
    elements.dwarfPrev.addEventListener('click', () => {
      changeActiveDwarf(-1);
    });
  }

  if (elements.dwarfNext) {
    elements.dwarfNext.addEventListener('click', () => {
      changeActiveDwarf(1);
    });
  }

  if (elements.dwarfRandomise) {
    elements.dwarfRandomise.addEventListener('click', () => {
      randomiseActiveDwarf();
      playSoundEffect(soundEffects.randomiseClick);
      elements.dwarfRandomise.classList.add('randomise-button__dice--rolled');
    });
  }

  if (elements.dwarfBack) {
    elements.dwarfBack.addEventListener('click', () => {
      closeDwarfCustomizer({ returnFocus: true });
    });
  }

  if (elements.dwarfCustomizerForm) {
    elements.dwarfCustomizerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      beginGame();
      ensureMusicStarted();
    });
  }

  if (elements.dwarfNameInput) {
    elements.dwarfNameInput.addEventListener('input', (event) => {
      updateDwarfTrait('name', event.target.value);
    });
    elements.dwarfNameInput.addEventListener('blur', (event) => {
      const trimmed = event.target.value.trim();
      if (trimmed !== event.target.value) {
        event.target.value = trimmed;
      }
      updateDwarfTrait('name', trimmed);
    });
  }

  if (elements.dwarfGenderButtons) {
    elements.dwarfGenderButtons.addEventListener('click', (event) => {
      const button = event.target.closest('[data-gender-value]');
      if (!button || !elements.dwarfGenderButtons.contains(button)) {
        return;
      }
      const { genderValue } = button.dataset;
      if (!genderValue) {
        return;
      }
      updateDwarfTrait('gender', genderValue);
    });

    elements.dwarfGenderButtons.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        return;
      }
      event.preventDefault();
      const buttons = Array.from(
        elements.dwarfGenderButtons.querySelectorAll('[data-gender-value]')
      );
      if (buttons.length === 0) {
        return;
      }
      const currentIndex = buttons.findIndex((button) => button.classList.contains('active'));
      const direction = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;
      const nextIndex = currentIndex === -1 ? 0 : (currentIndex + direction + buttons.length) % buttons.length;
      const nextButton = buttons[nextIndex];
      if (!nextButton) {
        return;
      }
      nextButton.focus();
      const { genderValue } = nextButton.dataset;
      if (genderValue) {
        updateDwarfTrait('gender', genderValue);
      }
    });
  }

  if (elements.dwarfClanSelect) {
    elements.dwarfClanSelect.addEventListener('change', (event) => {
      updateDwarfTrait('clan', event.target.value);
    });
  }

  if (elements.dwarfGuildSelect) {
    elements.dwarfGuildSelect.addEventListener('change', (event) => {
      updateDwarfTrait('guild', event.target.value);
    });
  }

  if (elements.dwarfProfessionSelect) {
    elements.dwarfProfessionSelect.addEventListener('change', (event) => {
      updateDwarfTrait('profession', event.target.value);
    });
  }

  setupTraitSliderControl('skin', elements.dwarfSkinSlider, elements.dwarfSkinSliderValue);
  setupTraitSliderControl('eyes', elements.dwarfEyeSlider, elements.dwarfEyeSliderValue);
  setupTraitSliderControl(
    'hairStyle',
    elements.dwarfHairStyleSlider,
    elements.dwarfHairStyleSliderValue
  );
  setupTraitSliderControl('hair', elements.dwarfHairSlider, elements.dwarfHairSliderValue);

  setupTraitSliderControl('beard', elements.dwarfBeardSlider, elements.dwarfBeardSliderValue);

  document.addEventListener('keydown', (event) => {
    const activeElement = document.activeElement;
    const isFormControl =
      activeElement && ['INPUT', 'SELECT', 'TEXTAREA'].includes(activeElement.tagName);

    if (isDwarfCustomizerVisible() && !isFormControl) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        changeActiveDwarf(-1);
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        changeActiveDwarf(1);
        return;
      }
    }

    if (event.key === 'Escape') {
      if (state.localView && state.localView.active) {
        hideLocalView();
        return;
      }
      if (structureDetailsState.visible) {
        hideStructureDetails({ returnFocus: true });
        return;
      }
      if (isDwarfCustomizerVisible()) {
        closeDwarfCustomizer({ returnFocus: true });
        return;
      }
      if (elements.worldInfoModal && !elements.worldInfoModal.classList.contains('hidden')) {
        closeWorldInfoModal({ returnFocus: true });
        return;
      }
      if (optionsVisible) {
        closeOptionsScreen();
      }
    }
  });

  refreshOverlayToggleButtons();
}

attachEvents();

function initialise() {
  syncInputsWithSettings();
  setupAudioControls();
  setupSoundEffectControls();
  setupMapInteractions();
  handleResize();
}

initialise();
