import { clamp } from '../utils/math.js';

const structureTypeLabels = {
  GREAT_DWARFHOLD: 'Great Dwarfhold',
  ABANDONED_DWARFHOLD: 'Abandoned Dwarfhold',
  HILLHOLD: 'Hillhold',
  DWARFHOLD: 'Dwarven Hold'
};

const interiorTileSprites = {
  cobblestone_floor1: { sheet: 'dwarfholdInterior', row: 1, col: 0, size: 16 },
  cobblestone_floor2: { sheet: 'dwarfholdInterior', row: 2, col: 0, size: 16 },
  cobblestone_floor3: { sheet: 'dwarfholdInterior', row: 3, col: 0, size: 16 },
  cobblestone_floor4: { sheet: 'dwarfholdInterior', row: 4, col: 0, size: 16 },
  cobblestone_floor5: { sheet: 'dwarfholdInterior', row: 0, col: 1, size: 16 },    
  cobblestone_floor6: { sheet: 'dwarfholdInterior', row: 0, col: 2, size: 16 },   
  cobblestone_floor7: { sheet: 'dwarfholdInterior', row: 0, col: 3, size: 16 },   
  cobblestone_floor8: { sheet: 'dwarfholdInterior', row: 0, col: 4, size: 16 },   
  cobblestone_floor9: { sheet: 'dwarfholdInterior', row: 1, col: 1, size: 16 },   
  cobblestone_floor10: { sheet: 'dwarfholdInterior', row: 1, col: 2, size: 16 },   
  cobblestone_floor11: { sheet: 'dwarfholdInterior', row: 1, col: 3, size: 16 },   
  cobblestone_floor12: { sheet: 'dwarfholdInterior', row: 1, col: 4, size: 16 },   
  wallcorner1: { sheet: 'dwarfholdInterior', row: 0, col: 4, size: 16 },
  wallcorner2: { sheet: 'dwarfholdInterior', row: 1, col: 4, size: 16 },
  wallcorner3: { sheet: 'dwarfholdInterior', row: 2, col: 4, size: 16 },
  wallcorner4: { sheet: 'dwarfholdInterior', row: 3, col: 4, size: 16 },
  door: { sheet: 'dwarfholdInterior', row: 4, col: 3, size: 16 },
  table: { sheet: 'dwarfholdInterior', row: 1, col: 15, size: 16 },
  forge: { sheet: 'dwarfholdInterior', row: 10, col: 10, size: 16 },
  barrel: { sheet: 'dwarfholdInterior', row: 1, col: 14, size: 16 },
  bed: { sheet: 'dwarfholdInterior', row: 5, col: 7, size: 16 },
  keg: { sheet: 'dwarfholdInterior', row: 8, col: 6, size: 16 },
  worktable: { sheet: 'dwarfholdInterior', row: 4, col: 8, size: 16 },
  redcarpertopleft: { sheet: 'dwarfholdInterior', row: 12, col: 0, size: 16 },
  redcarpertopmiddle: { sheet: 'dwarfholdInterior', row: 13, col: 0, size: 16 },
  redcarpertopright: { sheet: 'dwarfholdInterior', row: 14, col: 0, size: 16 },
  redcarpertmiddleleft: { sheet: 'dwarfholdInterior', row: 12, col: 1, size: 16 },
  redcarpetmiddlemiddle: { sheet: 'dwarfholdInterior', row: 13, col: 1, size: 16 },
  redcarpetmiddleright: { sheet: 'dwarfholdInterior', row: 14, col: 1, size: 16 },
  redcarpetbottomleft: { sheet: 'dwarfholdInterior', row: 12, col: 2, size: 16 },
  redcarpetbottommiddle: { sheet: 'dwarfholdInterior', row: 13, col: 2, size: 16 },
  redcarpetbottomirght: { sheet: 'dwarfholdInterior', row: 14, col: 2, size: 16 },
  pot: { sheet: 'dwarfholdInterior', row: 17, col: 21, size: 16 },
  pottedplant1: { sheet: 'dwarfholdInterior', row: 16, col: 12, size: 16 },
  pottedplant2: { sheet: 'dwarfholdInterior', row: 16, col: 13, size: 16 },
  pottedplant3: { sheet: 'dwarfholdInterior', row: 16, col: 14, size: 16 },
  stool: { sheet: 'dwarfholdInterior', row: 14, col: 2, size: 16 }
};

const baseLegend = {
  rock: {
    color: '#111827',
    label: 'Carved stone',
    description: 'Unworked mountain rock surrounding the hold.',
    sprite: interiorTileSprites.rock
  },
  corridor: {
    color: '#6b7280',
    label: 'Worked corridors',
    description: 'Main arteries linking districts and quarters.',
    texture: 'speckled',
    accent: 'rgba(17, 24, 39, 0.25)',
    sprite: interiorTileSprites.corridor
  },
  entrance: {
    color: '#9ca3af',
    label: 'Gatehouse',
    description: 'Fortified approaches with portcullises and embrasures.',
    borderColor: '#d1d5db',
    sprite: interiorTileSprites.entrance
  },
  hall: {
    color: '#fcd34d',
    label: 'Great hall',
    description: 'Feasting and assembly chamber beneath vaulted arches.',
    borderColor: '#f59e0b',
    sprite: interiorTileSprites.hall
  },
  forge: {
    color: '#ea580c',
    label: 'Great forge',
    description: 'Smithies, smelters, and crucibles blazing with industry.',
    borderColor: '#b45309',
    sprite: interiorTileSprites.forge
  },
  market: {
    color: '#f59e0b',
    label: 'Deep market',
    description: 'Bazaar arcades trading gemstones, metals, and surface wares.',
    texture: 'speckled',
    accent: 'rgba(250, 204, 21, 0.24)',
    sprite: interiorTileSprites.market
  },
  dormitory: {
    color: '#60a5fa',
    label: 'Barracks and bunks',
    description: 'Sleeping quarters and messes for clan cohorts.',
    borderColor: '#2563eb',
    sprite: interiorTileSprites.dormitory
  },
  brewery: {
    color: '#c08457',
    label: 'Brewery caverns',
    description: 'Stills and barrel racks for the hold’s famed ales.',
    texture: 'speckled',
    accent: 'rgba(248, 250, 252, 0.16)',
    sprite: interiorTileSprites.brewery
  },
  garden: {
    color: '#4ade80',
    label: 'Mushroom gardens',
    description: 'Glowcap terraces and fungal beds feeding the populace.',
    texture: 'speckled',
    accent: 'rgba(74, 222, 128, 0.35)',
    sprite: interiorTileSprites.garden
  },
  water: {
    color: '#2563eb',
    label: 'Reservoir',
    description: 'Subterranean cistern fed by seepage and aquifer flow.',
    borderColor: '#1d4ed8',
    sprite: interiorTileSprites.water
  },
  shrine: {
    color: '#e5e7eb',
    label: 'Ancestor shrine',
    description: 'Runic alcoves honoring revered thanes and founders.',
    borderColor: '#cbd5f5',
    sprite: interiorTileSprites.shrine
  },
  throne: {
    color: '#fde68a',
    label: 'Throne dais',
    description: 'Seat of the ruling thane overlooking the grand hall.',
    borderColor: '#f59e0b',
    sprite: interiorTileSprites.throne
  },
  stairs: {
    color: '#a855f7',
    label: 'Deep stairs',
    description: 'Spiral descent toward mines and lower districts.',
    borderColor: '#7c3aed',
    sprite: interiorTileSprites.stairs
  },
  storage: {
    color: '#d8b4fe',
    label: 'Vaulted stores',
    description: 'Reinforced vaults protecting supplies and ingots.',
    borderColor: '#a855f7',
    sprite: interiorTileSprites.storage
  }
};

const levelNames = ['Upper Halls', 'Gatehouse Level', 'Clan Quarter', 'Great Hall', 'Surface Approach'];

const stoneDescriptors = ['granite', 'basalt', 'obsidian', 'marble', 'slate', 'limestone'];

const activeHallDescriptors = [
  'a rune-lit grand hall ringed with banners',
  'a pillared assembly chamber humming with song',
  'a vaulted feasting chamber glowing with braziers'
];

const ruinedHallDescriptors = [
  'a dust-choked hall strewn with toppled pillars',
  'a silent vault where banners hang in tatters',
  'a cracked throne room echoing with distant drips'
];

const featureNotes = {
  forge: [
    'Great Forge — master smiths hammer runed steel beside roaring furnaces.',
    'Anvil Gallery — slag pits glow while apprentices temper new blades.'
  ],
  market: [
    'Deep Market — stone stalls hawk gemstones, spices, and rare relics.',
    'Mercantile Quarter — guild factors barter under vaulted arcades.'
  ],
  dormitory: [
    'Barracks Row — bunkhouses line the halls for off-duty miners.',
    'Clan Dormitories — carved alcoves display clan crests above bunks.'
  ],
  brewery: [
    'Brewery Caverns — copper stills drip cavernsweet spirits into oak barrels.',
    'Stout Halls — fermenting vats bubble with malty subterranean ale.'
  ],
  storage: [
    'Vaulted Stores — rune-locked vaults protect ingots and trade bars.',
    'Supply Vaults — meticulously inventoried stores await future expeditions.'
  ],
  garden: [
    'Mushroom Gardens — glowcap terraces feed the hold through long winters.',
    'Cultivation Caverns — irrigated beds sprout plump cave tubers and fungi.'
  ],
  water: [
    'Reservoir — underground cisterns capture the slow trickle of mountain springs.',
    'Aquifer Basin — tiered pools brim with crystal-clear meltwater.'
  ],
  shrine: [
    'Ancestor Shrine — statues of founders watch over votive braziers.',
    'Hall of Memory — rune-inscribed pillars honor the hold’s revered heroes.'
  ],
  throne: [
    'Throne Dais — the thane presides beneath a canopy of clan standards.',
    'Seat of Stone — a rune-carved throne anchors the authority of the hold.'
  ],
  stairs: [
    'Deep Stairs — spiral steps descend toward the lower mines.',
    'Lower Vault Access — guarded stairways drop into sealed districts.'
  ],
  entrance: [
    'Gatehouse — twin portcullises and arrow slits secure the mountain door.'
  ],
  corridor: [
    'Main Arteries — wide corridors bustle with carts and patrols.'
  ]
};
function hashString(value) {
  const input = typeof value === 'string' ? value : JSON.stringify(value);
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
    hash >>>= 0;
  }
  return hash >>> 0;
}

function createRng(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let result = Math.imul(state ^ (state >>> 15), 1 | state);
    result ^= result + Math.imul(result ^ (result >>> 7), 61 | result);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function randomInt(randomFn, min, max) {
  if (max <= min) {
    return min;
  }
  const range = max - min + 1;
  return min + Math.floor(randomFn() * range);
}

function pick(array, randomFn) {
  if (!Array.isArray(array) || array.length === 0) {
    return null;
  }
  const index = Math.floor(randomFn() * array.length);
  return array[clamp(index, 0, array.length - 1)];
}

function shuffle(array, randomFn) {
  const result = Array.isArray(array) ? array.slice() : [];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(randomFn() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function ensureOdd(value, min, max) {
  let result = clamp(Math.round(value), min, max);
  if (result % 2 === 0) {
    if (result + 1 <= max) {
      result += 1;
    } else if (result - 1 >= min) {
      result -= 1;
    }
  }
  if (result % 2 === 0) {
    const lowerOdd = min % 2 === 0 ? min + 1 : min;
    result = clamp(lowerOdd, min, max);
  }
  if (result % 2 === 0) {
    const upperOdd = max % 2 === 0 ? max - 1 : max;
    result = clamp(upperOdd, min, max);
  }
  if (result % 2 === 0) {
    result = Math.max(min, Math.min(max, result | 1));
  }
  return clamp(result, min, max);
}

function createEmptyGrid(width, height, usedTypes) {
  const tiles = [];
  for (let y = 0; y < height; y += 1) {
    const row = [];
    for (let x = 0; x < width; x += 1) {
      row.push({ type: 'rock' });
    }
    tiles.push(row);
  }
  usedTypes.add('rock');
  return tiles;
}

function setCell(tiles, x, y, type, usedTypes, extras = {}) {
  if (!tiles || y < 0 || y >= tiles.length) {
    return;
  }
  const row = tiles[y];
  if (!row || x < 0 || x >= row.length) {
    return;
  }
  row[x] = { type, ...extras };
  usedTypes.add(type);
}

function fillRect(tiles, startX, startY, width, height, type, usedTypes, extras = {}) {
  const rectWidth = Math.max(0, Math.floor(width));
  const rectHeight = Math.max(0, Math.floor(height));
  for (let y = 0; y < rectHeight; y += 1) {
    for (let x = 0; x < rectWidth; x += 1) {
      setCell(tiles, startX + x, startY + y, type, usedTypes, extras);
    }
  }
}

function carveCorridorHorizontal(tiles, y, startX, endX, corridorWidth, type, usedTypes) {
  const half = Math.max(0, Math.floor(corridorWidth / 2));
  const minX = Math.min(startX, endX);
  const maxX = Math.max(startX, endX);
  for (let x = minX; x <= maxX; x += 1) {
    for (let offset = -half; offset <= half; offset += 1) {
      setCell(tiles, x, y + offset, type, usedTypes);
    }
  }
}

function carveCorridorVertical(tiles, x, startY, endY, corridorWidth, type, usedTypes) {
  const half = Math.max(0, Math.floor(corridorWidth / 2));
  const minY = Math.min(startY, endY);
  const maxY = Math.max(startY, endY);
  for (let y = minY; y <= maxY; y += 1) {
    for (let offset = -half; offset <= half; offset += 1) {
      setCell(tiles, x + offset, y, type, usedTypes);
    }
  }
}

function addMarker(markers, x, y, options = {}) {
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return;
  }
  markers.push({ x, y, ...options });
}

function addFeatureNote(type, features, featureSet, randomFn, fallback) {
  const notes = featureNotes[type];
  let note = null;
  if (Array.isArray(notes) && notes.length > 0) {
    note = notes[Math.floor(randomFn() * notes.length)];
  }
  if (!note && fallback) {
    note = fallback;
  }
  if (note && !featureSet.has(note)) {
    featureSet.add(note);
    features.push(note);
  }
}

function resolveFactionLabel(raw) {
  if (!raw) {
    return null;
  }
  if (typeof raw === 'string') {
    return raw;
  }
  if (typeof raw === 'object') {
    if (typeof raw.name === 'string' && raw.name.trim()) {
      return raw.name.trim();
    }
    if (typeof raw.label === 'string' && raw.label.trim()) {
      return raw.label.trim();
    }
    if (typeof raw.title === 'string' && raw.title.trim()) {
      return raw.title.trim();
    }
  }
  return null;
}

export function generateDwarfholdMap(options = {}) {
  const structureKey = typeof options.structureKey === 'string' ? options.structureKey : 'DWARFHOLD';
  const structureName =
    typeof options.structureName === 'string' && options.structureName.trim()
      ? options.structureName.trim()
      : '';
  const factionLabel = resolveFactionLabel(options.faction);
  const tileX = Number.isFinite(options.tileX) ? options.tileX : 0;
  const tileY = Number.isFinite(options.tileY) ? options.tileY : 0;
  const worldSeed = typeof options.worldSeed === 'string' ? options.worldSeed : 'dwarfhold';
  const seedValue = hashString(`${worldSeed}:${structureKey}:${structureName}:${tileX}:${tileY}`);
  const randomFn = createRng(seedValue);
  const widthBase = 34 + randomInt(randomFn, 0, 4);
  const heightBase = 22 + randomInt(randomFn, 0, 4);
  const width = ensureOdd(widthBase, 29, 41);
  const height = ensureOdd(heightBase, 21, 33);
  const usedTypes = new Set();
  const tiles = createEmptyGrid(width, height, usedTypes);
  const features = [];
  const featureSet = new Set();
  const markers = [];
  const corridorWidth = 3;
  const corridorHalf = Math.floor(corridorWidth / 2);

  const entranceX = Math.floor(width / 2);
  carveCorridorVertical(tiles, entranceX, 0, height - 4, corridorWidth, 'corridor', usedTypes);
  for (let y = 0; y < Math.min(2, height); y += 1) {
    for (let dx = -corridorHalf; dx <= corridorHalf; dx += 1) {
      setCell(tiles, entranceX + dx, y, 'entrance', usedTypes);
    }
  }
  addFeatureNote('entrance', features, featureSet, randomFn);
  addMarker(markers, entranceX, Math.min(1, height - 1), {
    color: '#f8fafc',
    stroke: '#1f2937',
    radius: 0.28,
    shadowColor: 'rgba(148, 163, 184, 0.45)'
  });

  const hallWidth = ensureOdd(Math.floor(width * 0.6), 13, width - 5);
  const hallHeight = ensureOdd(8 + randomInt(randomFn, 0, 2), 7, Math.max(7, height - 10));
  const hallStartX = clamp(Math.floor((width - hallWidth) / 2), 2, Math.max(2, width - hallWidth - 2));
  const hallStartY = clamp(4 + randomInt(randomFn, 0, 2), 3, Math.max(3, height - hallHeight - 6));
  fillRect(tiles, hallStartX, hallStartY, hallWidth, hallHeight, 'hall', usedTypes);

  const hallEndY = hallStartY + hallHeight - 1;
  const hallMidY = hallStartY + Math.floor(hallHeight / 2);
  for (let offset = -1; offset <= 1; offset += 1) {
    setCell(tiles, hallStartX, hallMidY + offset, 'corridor', usedTypes);
    setCell(tiles, hallStartX + hallWidth - 1, hallMidY + offset, 'corridor', usedTypes);
  }
  carveCorridorHorizontal(tiles, hallMidY, 1, hallStartX, corridorWidth, 'corridor', usedTypes);
  carveCorridorHorizontal(tiles, hallMidY, hallStartX + hallWidth - 1, width - 2, corridorWidth, 'corridor', usedTypes);

  const leftCorridorX = clamp(hallStartX - 4, 2, hallStartX - 2);
  const rightCorridorX = clamp(hallStartX + hallWidth + 3, hallStartX + hallWidth + 1, width - 3);
  carveCorridorVertical(tiles, leftCorridorX, hallStartY - 2, hallEndY + 2, corridorWidth, 'corridor', usedTypes);
  carveCorridorVertical(tiles, rightCorridorX, hallStartY - 2, hallEndY + 2, corridorWidth, 'corridor', usedTypes);
  carveCorridorHorizontal(tiles, hallMidY, leftCorridorX, hallStartX, corridorWidth, 'corridor', usedTypes);
  carveCorridorHorizontal(tiles, hallMidY, hallStartX + hallWidth - 1, rightCorridorX, corridorWidth, 'corridor', usedTypes);
  addFeatureNote('corridor', features, featureSet, randomFn);
  const roomWidth = 6;
  const roomHeight = 6;
  const leftRoomX = clamp(leftCorridorX - roomWidth - 2, 1, width - roomWidth - 2);
  const leftUpperY = clamp(hallStartY - roomHeight + 1, 1, height - roomHeight - 2);
  const leftLowerY = clamp(hallEndY - roomHeight + 1, 1, height - roomHeight - 2);
  const rightRoomX = clamp(rightCorridorX + 2, 1, width - roomWidth - 2);
  const rightUpperY = clamp(hallStartY - roomHeight + 1, 1, height - roomHeight - 2);
  const rightLowerY = clamp(hallEndY - roomHeight + 1, 1, height - roomHeight - 2);

  const leftUpperType = 'forge';
  const rightUpperType = 'market';
  const extraPool = shuffle(['dormitory', 'storage', 'brewery'], randomFn);
  const leftLowerType = extraPool.shift() || 'dormitory';
  const rightLowerType = extraPool.shift() || 'brewery';

  fillRect(tiles, leftRoomX, leftUpperY, roomWidth, roomHeight, leftUpperType, usedTypes);
  const leftUpperDoorY = clamp(leftUpperY + Math.floor(roomHeight / 2), leftUpperY, leftUpperY + roomHeight - 1);
  setCell(tiles, leftCorridorX - 1, leftUpperDoorY, 'corridor', usedTypes);
  addFeatureNote(leftUpperType, features, featureSet, randomFn);

  fillRect(tiles, leftRoomX, leftLowerY, roomWidth, roomHeight, leftLowerType, usedTypes);
  const leftLowerDoorY = clamp(leftLowerY + Math.floor(roomHeight / 2), leftLowerY, leftLowerY + roomHeight - 1);
  setCell(tiles, leftCorridorX - 1, leftLowerDoorY, 'corridor', usedTypes);
  addFeatureNote(leftLowerType, features, featureSet, randomFn);

  fillRect(tiles, rightRoomX, rightUpperY, roomWidth, roomHeight, rightUpperType, usedTypes);
  const rightUpperDoorY = clamp(rightUpperY + Math.floor(roomHeight / 2), rightUpperY, rightUpperY + roomHeight - 1);
  setCell(tiles, rightCorridorX + 1, rightUpperDoorY, 'corridor', usedTypes);
  addFeatureNote(rightUpperType, features, featureSet, randomFn);

  fillRect(tiles, rightRoomX, rightLowerY, roomWidth, roomHeight, rightLowerType, usedTypes);
  const rightLowerDoorY = clamp(rightLowerY + Math.floor(roomHeight / 2), rightLowerY, rightLowerY + roomHeight - 1);
  setCell(tiles, rightCorridorX + 1, rightLowerDoorY, 'corridor', usedTypes);
  addFeatureNote(rightLowerType, features, featureSet, randomFn);

  const shrineWidth = 5;
  const shrineHeight = 3;
  const shrineX = hallStartX + Math.floor((hallWidth - shrineWidth) / 2);
  const shrineY = clamp(hallStartY + 1, hallStartY + 1, hallEndY - shrineHeight - 2);
  fillRect(tiles, shrineX, shrineY, shrineWidth, shrineHeight, 'shrine', usedTypes);
  addFeatureNote('shrine', features, featureSet, randomFn);

  const throneWidth = 3;
  const throneHeight = 3;
  const throneX = hallStartX + Math.floor((hallWidth - throneWidth) / 2);
  const throneY = clamp(hallEndY - throneHeight - 1, hallStartY + 1, hallEndY - throneHeight);
  fillRect(tiles, throneX, throneY, throneWidth, throneHeight, 'throne', usedTypes);
  addFeatureNote('throne', features, featureSet, randomFn);
  addMarker(markers, clamp(throneX + Math.floor(throneWidth / 2), 0, width - 1), clamp(throneY + Math.floor(throneHeight / 2), 0, height - 1), {
    color: '#fbbf24',
    stroke: '#78350f',
    radius: 0.4,
    shadowColor: 'rgba(250, 204, 21, 0.45)'
  });

  const gardenWidth = Math.max(6, hallWidth - 6);
  const gardenHeight = clamp(4 + randomInt(randomFn, 0, 1), 3, Math.max(3, height - hallEndY - 7));
  const gardenStartX = hallStartX + Math.floor((hallWidth - gardenWidth) / 2);
  const gardenStartY = clamp(hallEndY + 2, hallEndY + 2, height - gardenHeight - 6);
  if (gardenWidth > 4 && gardenStartY + gardenHeight < height - 3) {
    fillRect(tiles, gardenStartX, gardenStartY, gardenWidth, gardenHeight, 'garden', usedTypes);
    addFeatureNote('garden', features, featureSet, randomFn);
  }



  let stairsY = gardenStartY + gardenHeight + 2;
  if (!Number.isFinite(stairsY) || stairsY <= hallEndY + 1) {
    stairsY = clamp(hallEndY + 2, hallEndY + 2, height - 3);
  }
  if (stairsY < height - 1) {
    for (let dx = -1; dx <= 1; dx += 1) {
      setCell(tiles, entranceX + dx, stairsY, 'stairs', usedTypes);
    }
    addFeatureNote('stairs', features, featureSet, randomFn);
    addMarker(markers, entranceX, clamp(stairsY, 0, height - 1), {
      color: '#a855f7',
      stroke: '#581c87',
      radius: 0.32,
      shadowColor: 'rgba(168, 85, 247, 0.35)'
    });
  }

  const structureLabel = structureTypeLabels[structureKey] || 'Dwarven Hold';
  const levelName = pick(levelNames, randomFn) || 'Upper Halls';
  const stone = pick(stoneDescriptors, randomFn) || 'granite';
  const isRuined = structureKey === 'ABANDONED_DWARFHOLD';
  const hallDescriptor = pick(isRuined ? ruinedHallDescriptors : activeHallDescriptors, randomFn) ||
    (isRuined ? 'a silent hall' : 'a vaulted hall');
  const resolvedName = structureName || structureLabel;

  let description = `${resolvedName} opens into ${hallDescriptor}, hewn from ${stone}.`;
  if (isRuined) {
    description += ' Dust motes swirl through the stale air while distant drips echo from unseen caverns.';
  } else if (factionLabel) {
    description += ` Standards of ${factionLabel} hang between the pillars, their colors reflecting off polished stone.`;
  } else {
    description += ' Clan standards sway between the pillars, and amber braziers cast long, warm shadows across the stone.';
  }

  if (isRuined) {
    const ruinNote = 'Collapsed Galleries — rubble blocks many of the deeper tunnels.';
    if (!featureSet.has(ruinNote)) {
      featureSet.add(ruinNote);
      features.push(ruinNote);
    }
  }

  const legend = {};
  usedTypes.forEach((type) => {
    const definition = baseLegend[type];
    if (definition) {
      legend[type] = { ...definition };
    } else {
      legend[type] = {
        color: '#1f2937',
        label: type.charAt(0).toUpperCase() + type.slice(1),
        description: 'Chamber'
      };
    }
  });

  const title = resolvedName || structureLabel;
  const subtitle = `${levelName} — ${structureLabel}`;

  return {
    width,
    height,
    tiles,
    legend,
    title,
    subtitle,
    description,
    features,
    markers
  };
}
