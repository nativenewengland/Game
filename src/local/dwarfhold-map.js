import { clamp } from '../utils/math.js';

const structureTypeLabels = {
  GREAT_DWARFHOLD: 'Great Dwarfhold',
  ABANDONED_DWARFHOLD: 'Abandoned Dwarfhold',
  HILLHOLD: 'Hillhold',
  DWARFHOLD: 'Dwarven Hold'
};

const interiorTileSprites = {
  rock: [
    { sheet: 'dwarfholdWalls', row: 4, col: 5, size: 16 },
    { sheet: 'dwarfholdWalls', row: 4, col: 6, size: 16 },
    { sheet: 'dwarfholdWalls', row: 4, col: 7, size: 16 },
    { sheet: 'dwarfholdWalls', row: 1, col: 5, size: 16 },
    { sheet: 'dwarfholdWalls', row: 1, col: 7, size: 16 },
    { sheet: 'dwarfholdWalls', row: 1, col: 9, size: 16 },
    { sheet: 'dwarfholdWalls', row: 3, col: 5, size: 16 },
    { sheet: 'dwarfholdWalls', row: 3, col: 7, size: 16 }
  ],
  carvedFloor: [
    { sheet: 'dwarfholdWalls', row: 7, col: 11, size: 16 },
    { sheet: 'dwarfholdWalls', row: 6, col: 10, size: 16 },
    { sheet: 'dwarfholdWalls', row: 6, col: 11, size: 16 },
    { sheet: 'dwarfholdWalls', row: 7, col: 5, size: 16 },
    { sheet: 'dwarfholdWalls', row: 7, col: 6, size: 16 },
    { sheet: 'dwarfholdWalls', row: 7, col: 7, size: 16 },
    { sheet: 'dwarfholdWalls', row: 9, col: 5, size: 16 },
    { sheet: 'dwarfholdWalls', row: 9, col: 7, size: 16 }
  ],
  polishedFloor: [
    { sheet: 'dwarfholdWalls', row: 10, col: 10, size: 16 },
    { sheet: 'dwarfholdWalls', row: 10, col: 11, size: 16 },
    { sheet: 'dwarfholdWalls', row: 11, col: 8, size: 16 },
    { sheet: 'dwarfholdWalls', row: 11, col: 9, size: 16 },
    { sheet: 'dwarfholdWalls', row: 13, col: 7, size: 16 },
    { sheet: 'dwarfholdWalls', row: 13, col: 8, size: 16 },
    { sheet: 'dwarfholdWalls', row: 14, col: 7, size: 16 },
    { sheet: 'dwarfholdWalls', row: 14, col: 8, size: 16 }
  ],
  workFloor: [
    { sheet: 'dwarfholdWalls', row: 15, col: 11, size: 16 },
    { sheet: 'dwarfholdWalls', row: 15, col: 12, size: 16 },
    { sheet: 'dwarfholdWalls', row: 15, col: 13, size: 16 },
    { sheet: 'dwarfholdWalls', row: 15, col: 14, size: 16 }
  ],
  dampFloor: [
    { sheet: 'dwarfholdWalls', row: 13, col: 10, size: 16 },
    { sheet: 'dwarfholdWalls', row: 13, col: 11, size: 16 },
    { sheet: 'dwarfholdWalls', row: 13, col: 13, size: 16 },
    { sheet: 'dwarfholdWalls', row: 14, col: 9, size: 16 },
    { sheet: 'dwarfholdWalls', row: 14, col: 10, size: 16 },
    { sheet: 'dwarfholdWalls', row: 14, col: 11, size: 16 },
    { sheet: 'dwarfholdWalls', row: 14, col: 12, size: 16 },
    { sheet: 'dwarfholdWalls', row: 14, col: 13, size: 16 }
  ],
  water: [
    { sheet: 'dwarfholdWalls', row: 8, col: 2, size: 16 },
    { sheet: 'dwarfholdWalls', row: 7, col: 1, size: 16 }
  ],
  moss: [
    { sheet: 'dwarfholdWalls', row: 13, col: 1, size: 16 },
    { sheet: 'dwarfholdWalls', row: 13, col: 2, size: 16 },
    { sheet: 'dwarfholdWalls', row: 13, col: 3, size: 16 },
    { sheet: 'dwarfholdWalls', row: 13, col: 4, size: 16 }
  ],
  overlays: {
    entrance: [{ sheet: 'dwarfholdObjects', row: 2, col: 2, size: 16, scale: 0.92 }],
    forge: [{ sheet: 'dwarfholdObjects', row: 1, col: 15, size: 16, scale: 0.9 }],
    market: [{ sheet: 'dwarfholdObjects', row: 3, col: 3, size: 16, scale: 0.9 }],
    dormitory: [{ sheet: 'dwarfholdObjects', row: 2, col: 5, size: 16, scale: 0.9 }],
    brewery: [{ sheet: 'dwarfholdObjects', row: 3, col: 6, size: 16, scale: 0.9 }],
    garden: [{ sheet: 'dwarfholdObjects', row: 7, col: 6, size: 16, scale: 0.92 }],
    water: [{ sheet: 'dwarfholdObjects', row: 7, col: 9, size: 16, scale: 0.88 }],
    shrine: [{ sheet: 'dwarfholdObjects', row: 3, col: 1, size: 16, scale: 0.88 }],
    throne: [{ sheet: 'dwarfholdObjects', row: 1, col: 13, size: 16, scale: 0.94 }],
    stairs: [{ sheet: 'dwarfholdObjects', row: 3, col: 4, size: 16, scale: 0.9 }],
    storage: [{ sheet: 'dwarfholdObjects', row: 3, col: 5, size: 16, scale: 0.9 }]
  }
};

const tileVariantPools = {
  rock: { base: interiorTileSprites.rock },
  corridor: { base: interiorTileSprites.carvedFloor },
  entrance: { base: interiorTileSprites.carvedFloor, overlays: interiorTileSprites.overlays.entrance },
  hall: { base: interiorTileSprites.polishedFloor },
  forge: { base: interiorTileSprites.workFloor, overlays: interiorTileSprites.overlays.forge },
  market: { base: interiorTileSprites.polishedFloor, overlays: interiorTileSprites.overlays.market },
  dormitory: { base: interiorTileSprites.dampFloor, overlays: interiorTileSprites.overlays.dormitory },
  brewery: { base: interiorTileSprites.workFloor, overlays: interiorTileSprites.overlays.brewery },
  garden: { base: interiorTileSprites.moss, overlays: interiorTileSprites.overlays.garden },
  water: { base: interiorTileSprites.water, overlays: interiorTileSprites.overlays.water },
  shrine: { base: interiorTileSprites.polishedFloor, overlays: interiorTileSprites.overlays.shrine },
  throne: { base: interiorTileSprites.polishedFloor, overlays: interiorTileSprites.overlays.throne },
  stairs: { base: interiorTileSprites.carvedFloor, overlays: interiorTileSprites.overlays.stairs },
  storage: { base: interiorTileSprites.workFloor, overlays: interiorTileSprites.overlays.storage }
};

tileVariantPools.default = { base: interiorTileSprites.carvedFloor };

const baseLegend = {
  rock: {
    color: '#111827',
    label: 'Carved stone',
    description: 'Unworked mountain rock surrounding the hold.'
  },
  corridor: {
    color: '#6b7280',
    label: 'Worked corridors',
    description: 'Main arteries linking districts and quarters.',
    texture: 'speckled',
    accent: 'rgba(17, 24, 39, 0.25)'
  },
  entrance: {
    color: '#9ca3af',
    label: 'Gatehouse',
    description: 'Fortified approaches with portcullises and embrasures.',
    borderColor: '#d1d5db'
  },
  hall: {
    color: '#fcd34d',
    label: 'Great hall',
    description: 'Feasting and assembly chamber beneath vaulted arches.',
    borderColor: '#f59e0b'
  },
  forge: {
    color: '#ea580c',
    label: 'Great forge',
    description: 'Smithies, smelters, and crucibles blazing with industry.',
    borderColor: '#b45309'
  },
  market: {
    color: '#f59e0b',
    label: 'Deep market',
    description: 'Bazaar arcades trading gemstones, metals, and surface wares.',
    texture: 'speckled',
    accent: 'rgba(250, 204, 21, 0.24)'
  },
  dormitory: {
    color: '#60a5fa',
    label: 'Barracks and bunks',
    description: 'Sleeping quarters and messes for clan cohorts.',
    borderColor: '#2563eb'
  },
  brewery: {
    color: '#c08457',
    label: 'Brewery caverns',
    description: 'Stills and barrel racks for the hold’s famed ales.',
    texture: 'speckled',
    accent: 'rgba(248, 250, 252, 0.16)'
  },
  garden: {
    color: '#4ade80',
    label: 'Mushroom gardens',
    description: 'Glowcap terraces and fungal beds feeding the populace.',
    texture: 'speckled',
    accent: 'rgba(74, 222, 128, 0.35)'
  },
  water: {
    color: '#2563eb',
    label: 'Reservoir',
    description: 'Subterranean cistern fed by seepage and aquifer flow.',
    borderColor: '#1d4ed8'
  },
  shrine: {
    color: '#e5e7eb',
    label: 'Ancestor shrine',
    description: 'Runic alcoves honoring revered thanes and founders.',
    borderColor: '#cbd5f5'
  },
  throne: {
    color: '#fde68a',
    label: 'Throne dais',
    description: 'Seat of the ruling thane overlooking the grand hall.',
    borderColor: '#f59e0b'
  },
  stairs: {
    color: '#a855f7',
    label: 'Deep stairs',
    description: 'Spiral descent toward mines and lower districts.',
    borderColor: '#7c3aed'
  },
  storage: {
    color: '#d8b4fe',
    label: 'Vaulted stores',
    description: 'Reinforced vaults protecting supplies and ingots.',
    borderColor: '#a855f7'
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

function cloneSpriteDefinition(sprite) {
  if (!sprite || typeof sprite !== 'object') {
    return null;
  }
  const {
    sheet,
    row,
    col,
    size,
    sx,
    sy,
    sw,
    sh,
    scale,
    scaleY,
    offsetX,
    offsetY
  } = sprite;
  const copy = { sheet: sheet || null };
  if (Number.isFinite(row)) {
    copy.row = row;
  }
  if (Number.isFinite(col)) {
    copy.col = col;
  }
  if (Number.isFinite(size)) {
    copy.size = size;
  }
  if (Number.isFinite(sx)) {
    copy.sx = sx;
  }
  if (Number.isFinite(sy)) {
    copy.sy = sy;
  }
  if (Number.isFinite(sw)) {
    copy.sw = sw;
  }
  if (Number.isFinite(sh)) {
    copy.sh = sh;
  }
  if (Number.isFinite(scale)) {
    copy.scale = scale;
  }
  if (Number.isFinite(scaleY)) {
    copy.scaleY = scaleY;
  }
  if (Number.isFinite(offsetX)) {
    copy.offsetX = offsetX;
  }
  if (Number.isFinite(offsetY)) {
    copy.offsetY = offsetY;
  }
  return copy;
}

function buildRoomPositions(baseY, direction, count, roomHeight, mapHeight) {
  if (!Number.isFinite(baseY) || !Number.isFinite(direction) || count <= 0) {
    return [];
  }
  const minY = 1;
  const maxY = Math.max(minY, mapHeight - roomHeight - 2);
  let current = clamp(Math.round(baseY), minY, maxY);
  const positions = [];
  for (let i = 0; i < count; i += 1) {
    if (current < minY || current > maxY) {
      break;
    }
    positions.push(current);
    current = clamp(
      direction < 0 ? current - (roomHeight + 2) : current + (roomHeight + 2),
      minY,
      maxY
    );
  }
  return direction < 0 ? positions.sort((a, b) => a - b) : positions;
}

function uniqueSorted(values) {
  if (!Array.isArray(values)) {
    return [];
  }
  const deduped = Array.from(new Set(values.filter((value) => Number.isFinite(value))));
  return deduped.sort((a, b) => a - b);
}

function buildSideRoomSlots(
  roomX,
  corridorX,
  roomYs,
  corridorWidth,
  hallMidY,
  roomWidth,
  roomHeight,
  side
) {
  const slots = [];
  if (!Array.isArray(roomYs) || roomYs.length === 0) {
    return slots;
  }
  const doorX = side === 'left' ? corridorX - 1 : corridorX + 1;
  for (let i = 0; i < roomYs.length; i += 1) {
    const y = roomYs[i];
    const doorY = clamp(y + Math.floor(roomHeight / 2), y, y + roomHeight - 1);
    const distanceFromHall = Math.abs(doorY - hallMidY);
    slots.push({
      x: roomX,
      y,
      doorX,
      doorY,
      side,
      distanceFromHall
    });
  }
  return slots;
}

function buildRoomTypePlan(slotCount, scaleFactor, randomFn) {
  const plan = [];
  if (!Number.isFinite(slotCount) || slotCount <= 0) {
    return plan;
  }
  const normalizedScale = Number.isFinite(scaleFactor) ? scaleFactor : 1;
  const coreTypes = ['forge', 'dormitory', 'market', 'brewery'];
  for (let i = 0; i < coreTypes.length && plan.length < slotCount; i += 1) {
    plan.push(coreTypes[i]);
  }
  const countOf = (type) => plan.filter((entry) => entry === type).length;
  while (plan.length < slotCount) {
    const dormTarget = Math.max(Math.ceil(slotCount * 0.5), Math.ceil(normalizedScale * 2));
    if (countOf('dormitory') < dormTarget) {
      plan.push('dormitory');
      continue;
    }
    const storageTarget = Math.max(0, Math.floor(normalizedScale));
    if (countOf('storage') < storageTarget) {
      plan.push('storage');
      continue;
    }
    const forgeTarget = Math.max(1, Math.ceil(normalizedScale * 1.2));
    if (countOf('forge') < forgeTarget) {
      plan.push('forge');
      continue;
    }
    const marketTarget = Math.max(1, Math.ceil(normalizedScale));
    if (countOf('market') < marketTarget) {
      plan.push('market');
      continue;
    }
    const breweryTarget = Math.max(1, Math.ceil(normalizedScale));
    if (countOf('brewery') < breweryTarget) {
      plan.push('brewery');
      continue;
    }
    plan.push(randomFn() < 0.5 ? 'dormitory' : 'storage');
  }
  return plan;
}

function pickVariantFromPool(variants, seedValue) {
  if (!Array.isArray(variants) || variants.length === 0) {
    return null;
  }
  const rng = createRng(seedValue);
  const index = variants.length === 1 ? 0 : clamp(Math.floor(rng() * variants.length), 0, variants.length - 1);
  const variant = variants[index] || variants[0];
  return cloneSpriteDefinition(variant);
}

function assignTileSpritesToGrid(tiles, baseSeed) {
  if (!Array.isArray(tiles)) {
    return;
  }
  for (let y = 0; y < tiles.length; y += 1) {
    const row = tiles[y];
    if (!Array.isArray(row)) {
      continue;
    }
    for (let x = 0; x < row.length; x += 1) {
      const cell = row[x];
      const type =
        typeof cell?.type === 'string' && cell.type
          ? cell.type
          : typeof cell === 'string'
            ? cell
            : 'rock';
      const pool = tileVariantPools[type] || tileVariantPools.default;
      if (!pool) {
        continue;
      }
      const baseSeedValue = hashString(`${baseSeed}:${type}:${x},${y}:base`);
      const overlaySeedValue = hashString(`${baseSeed}:${type}:${x},${y}:overlay`);
      const nextCell = cell && typeof cell === 'object' ? cell : { type };
      if (Array.isArray(pool.base) && pool.base.length > 0) {
        const sprite = pickVariantFromPool(pool.base, baseSeedValue);
        if (sprite) {
          nextCell.sprite = sprite;
        }
      }
      if (Array.isArray(pool.overlays) && pool.overlays.length > 0) {
        const overlaySprite = pickVariantFromPool(pool.overlays, overlaySeedValue);
        if (overlaySprite) {
          if (Array.isArray(nextCell.overlays)) {
            nextCell.overlays = [...nextCell.overlays, overlaySprite];
          } else if (nextCell.overlay && !Array.isArray(nextCell.overlay)) {
            nextCell.overlays = [nextCell.overlay, overlaySprite].filter(Boolean);
            delete nextCell.overlay;
          } else {
            nextCell.overlays = [overlaySprite];
          }
        }
      }
      row[x] = nextCell;
    }
  }
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
  const resolvedPopulation = Number.isFinite(options.population)
    ? Math.max(0, Math.round(options.population))
    : Number.isFinite(options.populationMax)
    ? Math.max(0, Math.round(options.populationMax))
    : null;
  const baseCapacity = 100;
  const dwarvesToAccommodate =
    resolvedPopulation !== null ? Math.max(10, Math.round(resolvedPopulation / 10)) : null;
  const scaleFactorRaw =
    dwarvesToAccommodate !== null ? Math.sqrt(dwarvesToAccommodate / baseCapacity) : 1;
  const scaleFactor = clamp(scaleFactorRaw, 0.85, 3);
  const heightScaleFactor = clamp(scaleFactor * 1.05, 0.9, 3.4);

  const widthBase = Math.max(1, Math.round((34 + randomInt(randomFn, 0, 4)) * scaleFactor));
  const heightBase = Math.max(1, Math.round((22 + randomInt(randomFn, 0, 4)) * heightScaleFactor));
  const width = ensureOdd(widthBase, 29, 95);
  const height = ensureOdd(heightBase, 21, 75);
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

  const normalizedScale = scaleFactor;
  const hallWidth = ensureOdd(
    Math.floor(width * clamp(0.52 + normalizedScale * 0.1, 0.52, 0.72)),
    13,
    width - 5
  );
  const hallHeightBase = 8 + randomInt(randomFn, 0, 2);
  const hallHeight = ensureOdd(
    Math.max(7, Math.round(hallHeightBase * clamp(normalizedScale, 1, 1.6))),
    7,
    Math.max(7, height - 10)
  );
  const hallStartX = clamp(Math.floor((width - hallWidth) / 2), 2, Math.max(2, width - hallWidth - 2));
  const hallVerticalOffset = clamp(Math.round((normalizedScale - 1) * 2), -2, 4);
  const hallStartY = clamp(
    4 + randomInt(randomFn, 0, 2) + hallVerticalOffset,
    3,
    Math.max(3, height - hallHeight - 6)
  );
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
  addFeatureNote('corridor', features, featureSet, randomFn);
  const maxRoomWidth = Math.max(6, Math.floor(width / 2) - 4);
  const maxRoomHeight = Math.max(5, Math.floor(height / 2) - 4);
  const roomWidth = clamp(Math.round(6 * clamp(normalizedScale * 0.95, 1, 2.2)), 6, maxRoomWidth);
  const roomHeight = clamp(Math.round(6 * clamp(normalizedScale * 0.85, 1, 2)), 5, maxRoomHeight);
  const leftRoomX = clamp(leftCorridorX - roomWidth - 2, 1, width - roomWidth - 2);
  const rightRoomX = clamp(rightCorridorX + 2, 1, width - roomWidth - 2);
  const baseNorthY = clamp(hallStartY - roomHeight + 1, 1, height - roomHeight - 2);
  const baseSouthY = clamp(hallEndY - roomHeight + 1, 1, height - roomHeight - 2);
  const desiredNorthRooms = Math.max(1, Math.round(normalizedScale));
  const desiredSouthRooms = Math.max(1, Math.round(normalizedScale + 0.4));
  const leftNorthYs = buildRoomPositions(baseNorthY, -1, desiredNorthRooms, roomHeight, height);
  const leftSouthYs = buildRoomPositions(baseSouthY, 1, desiredSouthRooms, roomHeight, height);
  const rightNorthSeed = clamp(baseNorthY + randomInt(randomFn, -1, 1), 1, height - roomHeight - 2);
  const rightSouthSeed = clamp(baseSouthY + randomInt(randomFn, -1, 1), 1, height - roomHeight - 2);
  const rightNorthYs = buildRoomPositions(rightNorthSeed, -1, desiredNorthRooms, roomHeight, height);
  const rightSouthYs = buildRoomPositions(rightSouthSeed, 1, desiredSouthRooms, roomHeight, height);
  let leftRoomYs = uniqueSorted([...leftNorthYs, ...leftSouthYs]);
  let rightRoomYs = uniqueSorted([...rightNorthYs, ...rightSouthYs]);
  if (leftRoomYs.length === 0) {
    leftRoomYs = [baseNorthY];
  }
  if (rightRoomYs.length === 0) {
    rightRoomYs = [baseNorthY];
  }
  const leftCorridorTop = Math.max(1, Math.min(hallStartY - 2, leftRoomYs[0]) - 1);
  const leftCorridorBottom = Math.min(
    height - 2,
    Math.max(hallEndY + 2, leftRoomYs[leftRoomYs.length - 1] + roomHeight - 1) + 1
  );
  const rightCorridorTop = Math.max(1, Math.min(hallStartY - 2, rightRoomYs[0]) - 1);
  const rightCorridorBottom = Math.min(
    height - 2,
    Math.max(hallEndY + 2, rightRoomYs[rightRoomYs.length - 1] + roomHeight - 1) + 1
  );
  carveCorridorVertical(tiles, leftCorridorX, leftCorridorTop, leftCorridorBottom, corridorWidth, 'corridor', usedTypes);
  carveCorridorVertical(
    tiles,
    rightCorridorX,
    rightCorridorTop,
    rightCorridorBottom,
    corridorWidth,
    'corridor',
    usedTypes
  );
  carveCorridorHorizontal(tiles, hallMidY, leftCorridorX, hallStartX, corridorWidth, 'corridor', usedTypes);
  carveCorridorHorizontal(
    tiles,
    hallMidY,
    hallStartX + hallWidth - 1,
    rightCorridorX,
    corridorWidth,
    'corridor',
    usedTypes
  );

  const leftSlots = buildSideRoomSlots(
    leftRoomX,
    leftCorridorX,
    leftRoomYs,
    corridorWidth,
    hallMidY,
    roomWidth,
    roomHeight,
    'left'
  );
  const rightSlots = buildSideRoomSlots(
    rightRoomX,
    rightCorridorX,
    rightRoomYs,
    corridorWidth,
    hallMidY,
    roomWidth,
    roomHeight,
    'right'
  );
  const roomSlots = [...leftSlots, ...rightSlots];
  roomSlots.sort((a, b) => {
    if (a.distanceFromHall === b.distanceFromHall) {
      if (a.side === b.side) {
        return a.y - b.y;
      }
      return a.side === 'left' ? -1 : 1;
    }
    return a.distanceFromHall - b.distanceFromHall;
  });
  const roomPlan = buildRoomTypePlan(roomSlots.length, normalizedScale, randomFn);
  for (let i = 0; i < roomSlots.length; i += 1) {
    const slot = roomSlots[i];
    const type = roomPlan[i] || 'dormitory';
    fillRect(tiles, slot.x, slot.y, roomWidth, roomHeight, type, usedTypes);
    setCell(tiles, slot.doorX, slot.doorY, 'corridor', usedTypes);
    addFeatureNote(type, features, featureSet, randomFn);
  }

  const shrineWidth = clamp(
    Math.round(5 * clamp(normalizedScale, 1, 1.3)),
    5,
    Math.max(3, hallWidth - 4)
  );
  const shrineHeight = clamp(
    Math.round(3 * clamp(normalizedScale, 1, 1.2)),
    3,
    Math.max(3, hallHeight - 6)
  );
  const shrineX = hallStartX + Math.floor((hallWidth - shrineWidth) / 2);
  const shrineY = clamp(hallStartY + 1, hallStartY + 1, hallEndY - shrineHeight - 2);
  fillRect(tiles, shrineX, shrineY, shrineWidth, shrineHeight, 'shrine', usedTypes);
  addFeatureNote('shrine', features, featureSet, randomFn);

  const throneWidth = clamp(Math.round(3 * clamp(normalizedScale, 1, 1.1)), 3, Math.max(3, Math.floor(hallWidth / 3)));
  const throneHeight = clamp(Math.round(3 * clamp(normalizedScale, 1, 1.05)), 3, Math.max(3, Math.floor(hallHeight / 3)));
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

  const gardenWidth = clamp(
    Math.round((hallWidth - 6) * clamp(normalizedScale, 1, 1.4)),
    6,
    Math.max(6, hallWidth - 2)
  );
  const gardenHeight = clamp(
    Math.round((4 + randomInt(randomFn, 0, 1)) * clamp(normalizedScale, 1, 1.35)),
    3,
    Math.max(3, height - hallEndY - 7)
  );
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

  assignTileSpritesToGrid(tiles, seedValue);

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

  Object.keys(legend).forEach((type) => {
    const pool = tileVariantPools[type];
    if (!pool) {
      return;
    }
    const spriteSource = pool.legendSprite || (Array.isArray(pool.base) ? pool.base[0] : null);
    if (spriteSource && !legend[type].sprite) {
      legend[type].sprite = cloneSpriteDefinition(spriteSource);
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
