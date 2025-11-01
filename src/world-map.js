import { clamp } from './utils/math.js';

const MAP_SIZE_PRESETS = {
  mini: { width: 120, height: 90 },
  small: { width: 160, height: 120 },
  normal: { width: 200, height: 150 },
  large: { width: 260, height: 195 },
  'extra-large': { width: 320, height: 240 }
};

const FREQUENCY_DESCRIPTORS = [
  { max: 10, label: 'Sparse' },
  { max: 25, label: 'Low' },
  { max: 45, label: 'Moderate' },
  { max: 65, label: 'Balanced' },
  { max: 85, label: 'High' },
  { max: 101, label: 'Abundant' }
];

const BIOME_COLORS = {
  water: '#0f172a',
  coast: '#1d4ed8',
  river: '#2563eb',
  wetland: '#0ea5e9',
  tundra: '#94a3b8',
  taiga: '#4b5563',
  grassland: '#22c55e',
  forest: '#166534',
  jungle: '#15803d',
  desert: '#fbbf24',
  mesa: '#f97316',
  highland: '#f8fafc',
  mountain: '#d1d5db'
};

const STRUCTURE_TYPES = [
  {
    key: 'DWARFHOLD',
    label: 'Dwarven Hold',
    color: '#fbbf24',
    slug: 'dwarf',
    minDistance: 9
  },
  {
    key: 'HUMAN_SETTLEMENT',
    label: 'Human Settlement',
    color: '#f59e0b',
    slug: 'human',
    minDistance: 8
  },
  {
    key: 'ELVEN_GROVE',
    label: 'Elven Grove',
    color: '#4ade80',
    slug: 'elf',
    minDistance: 8
  },
  {
    key: 'LIZARDMEN_TEMPLE',
    label: 'Lizardmen Temple-City',
    color: '#38bdf8',
    slug: 'lizard',
    minDistance: 10
  }
];

const REGION_NAMES = {
  prefix: [
    'Stone',
    'Iron',
    'Gold',
    'Azure',
    'Silver',
    'Frost',
    'Sun',
    'Star',
    'Storm',
    'Ash',
    'Crimson',
    'Marble'
  ],
  suffix: [
    'reach',
    'hold',
    'vale',
    'realm',
    'marches',
    'stead',
    'kingdom',
    'lands',
    'throne',
    'barony'
  ]
};

const STRUCTURE_NAME_PARTS = {
  dwarf: {
    prefix: ['Khaz', 'Dorn', 'Balin', 'Fjor', 'Krum', 'Bar'],
    suffix: ['dûm', 'akaz', 'kazad', 'drin', 'gath', 'gar']
  },
  human: {
    prefix: ['High', 'River', 'Oak', 'Stone', 'Bright', 'North'],
    suffix: ['watch', 'ford', 'brook', 'haven', 'gate', 'hold']
  },
  elf: {
    prefix: ['Silver', 'Emerald', 'Moon', 'Sun', 'Wild', 'Moss'],
    suffix: ['grove', 'glade', 'bloom', 'song', 'dance', 'hollow']
  },
  lizard: {
    prefix: ['Ssz', 'Xaz', 'Izt', 'Qal', 'Zet', 'Oth'],
    suffix: ['at', 'il', 'zan', 'kat', 'oth', 'iss']
  }
};

const OVERLAY_KEYS = {
  politicalBorders: 'politicalBorders',
  politicalInfluence: 'politicalInfluence',
  elevation: 'elevation',
  biomes: 'biomes',
  temperature: 'temperature',
  locationLabels: 'locationLabels'
};

const state = {
  canvas: null,
  ctx: null,
  tooltip: null,
  seedDisplay: null,
  worldInfoSize: null,
  worldInfoGenerationType: null,
  worldInfoSeed: null,
  settings: {
    mapSize: 'normal',
    worldGenerationType: 'normal',
    seed: '',
    forestFrequency: 35,
    mountainFrequency: 35,
    riverFrequency: 50,
    humanSettlementFrequency: 50,
    dwarfSettlementFrequency: 50,
    woodElfSettlementFrequency: 50,
    lizardmenSettlementFrequency: 50
  },
  overlays: {
    politicalBorders: false,
    politicalInfluence: false,
    elevation: false,
    biomes: true,
    temperature: false,
    locationLabels: false
  },
  world: null,
  render: {
    tileSize: 1,
    offsetX: 0,
    offsetY: 0
  }
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

function ensureSeedString(seed) {
  const trimmed = typeof seed === 'string' ? seed.trim() : '';
  if (trimmed) {
    return trimmed;
  }
  const random = Math.random().toString(36).slice(2, 10);
  return `realm-${random}`;
}

function randomFromSeed(seed, x, y, z = 0) {
  let h = seed ^ Math.imul(x, 0x27d4eb2d);
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  h ^= Math.imul(y ^ (y >>> 16), 0x27d4eb2d);
  h ^= Math.imul(z ^ (z >>> 16), 0x165667b1);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function smoothStep(t) {
  return t * t * (3 - 2 * t);
}

function valueNoise(seed, x, y) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const xf = x - x0;
  const yf = y - y0;

  const topLeft = randomFromSeed(seed, x0, y0);
  const topRight = randomFromSeed(seed, x0 + 1, y0);
  const bottomLeft = randomFromSeed(seed, x0, y0 + 1);
  const bottomRight = randomFromSeed(seed, x0 + 1, y0 + 1);

  const top = topLeft + (topRight - topLeft) * smoothStep(xf);
  const bottom = bottomLeft + (bottomRight - bottomLeft) * smoothStep(xf);
  return top + (bottom - top) * smoothStep(yf);
}

function layeredNoise(seed, x, y, layers = 4, lacunarity = 2, persistence = 0.5) {
  let frequency = 1;
  let amplitude = 1;
  let total = 0;
  let divisor = 0;
  for (let i = 0; i < layers; i += 1) {
    const value = valueNoise(seed + i * 1013, x * frequency, y * frequency);
    total += value * amplitude;
    divisor += amplitude;
    amplitude *= persistence;
    frequency *= lacunarity;
  }
  return divisor === 0 ? 0 : total / divisor;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function blendColors(base, overlay, alpha) {
  const clampAlpha = clamp(alpha, 0, 1);
  const baseInt = parseInt(base.slice(1), 16);
  const overlayInt = parseInt(overlay.slice(1), 16);
  const r = Math.round(
    ((baseInt >> 16) & 0xff) * (1 - clampAlpha) + ((overlayInt >> 16) & 0xff) * clampAlpha
  );
  const g = Math.round(
    ((baseInt >> 8) & 0xff) * (1 - clampAlpha) + ((overlayInt >> 8) & 0xff) * clampAlpha
  );
  const b = Math.round((baseInt & 0xff) * (1 - clampAlpha) + (overlayInt & 0xff) * clampAlpha);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function frequencyDescriptor(value) {
  const numeric = clamp(Math.round(Number(value) || 0), 0, 100);
  const match = FREQUENCY_DESCRIPTORS.find((entry) => numeric < entry.max);
  return `${numeric}% — ${(match && match.label) || 'Moderate'}`;
}

function updateSliderDisplay(input, display) {
  if (!input || !display) {
    return;
  }
  display.textContent = frequencyDescriptor(input.value);
}

function setupSlider(id, valueId, onChange) {
  const input = document.getElementById(id);
  const display = document.getElementById(valueId);
  if (!input) {
    return;
  }
  updateSliderDisplay(input, display);
  input.addEventListener('input', (event) => {
    updateSliderDisplay(input, display);
    if (typeof onChange === 'function') {
      onChange(Number(event.target.value));
    }
  });
}

function getMapSizePreset(key) {
  return MAP_SIZE_PRESETS[key] || MAP_SIZE_PRESETS.normal;
}

function generateRegionName(seed, index) {
  const prefix = REGION_NAMES.prefix[index % REGION_NAMES.prefix.length];
  const suffix = REGION_NAMES.suffix[(index + Math.floor(seed % REGION_NAMES.suffix.length)) % REGION_NAMES.suffix.length];
  return `${prefix}${suffix}`;
}

function generateStructureName(type, seedValue, index) {
  const parts = STRUCTURE_NAME_PARTS[type] || STRUCTURE_NAME_PARTS.dwarf;
  const prefix = parts.prefix[(seedValue + index) % parts.prefix.length];
  const suffix = parts.suffix[(seedValue + index * 3) % parts.suffix.length];
  return `${prefix}${suffix.charAt(0).toUpperCase()}${suffix.slice(1)}`;
}

function describeBiome(biome) {
  switch (biome) {
    case 'water':
      return 'Open ocean';
    case 'coast':
      return 'Coastal shallows';
    case 'river':
      return 'River channel';
    case 'wetland':
      return 'Mires and wetlands';
    case 'tundra':
      return 'Frozen tundra';
    case 'taiga':
      return 'Coniferous taiga';
    case 'forest':
      return 'Temperate forest';
    case 'jungle':
      return 'Dense jungle canopy';
    case 'desert':
      return 'Arid desert';
    case 'mesa':
      return 'Eroded mesas';
    case 'highland':
      return 'Highland plains';
    case 'mountain':
      return 'Mountain range';
    case 'grassland':
    default:
      return 'Rolling grassland';
  }
}

function assignBiome(settings, elevation, moisture, temperature, riverMask) {
  const { mountainFrequency } = settings;
  const mountainFactor = mountainFrequency / 100;
  if (elevation < 0.34) {
    return riverMask ? 'river' : 'water';
  }
  if (elevation < 0.36) {
    return 'coast';
  }
  if (riverMask) {
    return 'river';
  }
  if (elevation > 0.78 + mountainFactor * 0.08) {
    return 'mountain';
  }
  if (elevation > 0.65 + mountainFactor * 0.05) {
    return 'highland';
  }
  if (temperature < 0.3) {
    return moisture > 0.55 ? 'taiga' : 'tundra';
  }
  if (temperature > 0.7) {
    if (moisture > 0.6) {
      return 'jungle';
    }
    if (moisture > 0.45) {
      return 'mesa';
    }
    return 'desert';
  }
  if (moisture > 0.65) {
    return 'wetland';
  }
  if (moisture > 0.55) {
    return 'forest';
  }
  if (moisture > 0.45) {
    return 'grassland';
  }
  return 'mesa';
}

function determineLayoutAdjustments(type) {
  switch (type) {
    case 'archipelago':
      return { water: 0.1, mountain: -0.05 };
    case 'inland_sea':
      return { water: 0.05, mountain: 0.02 };
    case 'twin_continents':
      return { water: -0.04, mountain: 0.04 };
    case 'major_continent':
      return { water: -0.06, mountain: 0.06 };
    case 'normal':
    default:
      return { water: 0, mountain: 0 };
  }
}

function generateWorld(settings) {
  const seedString = ensureSeedString(settings.seed);
  const seedValue = hashString(seedString);
  const dimensions = getMapSizePreset(settings.mapSize);
  const { width, height } = dimensions;
  const layout = determineLayoutAdjustments(settings.worldGenerationType);

  const forestFactor = settings.forestFrequency / 100;
  const riverFactor = settings.riverFrequency / 100;
  const elfFactor = settings.woodElfSettlementFrequency / 100;
  const dwarfFactor = settings.dwarfSettlementFrequency / 100;
  const humanFactor = settings.humanSettlementFrequency / 100;
  const lizardFactor = settings.lizardmenSettlementFrequency / 100;

  const world = {
    width,
    height,
    seed: seedString,
    tiles: [],
    structures: [],
    dwarfholds: [],
    regions: []
  };

  const regionCols = Math.max(3, Math.round(width / 60));
  const regionRows = Math.max(2, Math.round(height / 60));
  const regionWidth = Math.ceil(width / regionCols);
  const regionHeight = Math.ceil(height / regionRows);

  for (let ry = 0; ry < regionRows; ry += 1) {
    for (let rx = 0; rx < regionCols; rx += 1) {
      const index = ry * regionCols + rx;
      const baseColor = BIOME_COLORS.forest;
      const randomColor = blendColors(baseColor, '#1f2937', 0.25 + (index % 3) * 0.2);
      world.regions.push({
        id: index,
        name: generateRegionName(seedValue + index, index),
        color: randomColor,
        bounds: {
          x: rx * regionWidth,
          y: ry * regionHeight,
          width: regionWidth,
          height: regionHeight
        }
      });
    }
  }

  for (let y = 0; y < height; y += 1) {
    const row = [];
    const yNorm = y / height;
    for (let x = 0; x < width; x += 1) {
      const xNorm = x / width;
      const elevationBase = layeredNoise(seedValue, xNorm * 6, yNorm * 6, 5, 2, 0.55);
      const moisture = layeredNoise(seedValue + 11, xNorm * 5, yNorm * 5, 4, 2.2, 0.6) * (0.8 + forestFactor * 0.4);
      const temperature = layeredNoise(seedValue + 29, xNorm * 4, yNorm * 4, 4, 2.1, 0.55);
      const riverNoise = layeredNoise(seedValue + 47, xNorm * 9, yNorm * 9, 3, 2.5, 0.7);

      let elevation = elevationBase + layout.mountain * 0.1;
      const latitudinal = Math.abs(yNorm - 0.5);
      elevation += (0.4 - latitudinal) * 0.08;
      elevation += (riverFactor - 0.5) * 0.08;
      elevation = clamp(elevation, 0, 1);

      const waterThreshold = 0.36 + layout.water * 0.2 - riverFactor * 0.08;
      const riverMask = Math.abs(riverNoise - 0.5) < 0.018 + (0.25 - riverFactor * 0.2);
      const biome = assignBiome(settings, elevation, moisture, temperature, riverMask);

      const regionX = Math.min(regionCols - 1, Math.floor(x / regionWidth));
      const regionY = Math.min(regionRows - 1, Math.floor(y / regionHeight));
      const regionId = regionY * regionCols + regionX;

      const finalBiome = elevation < waterThreshold ? (riverMask ? 'river' : 'water') : biome;
      row.push({
        x,
        y,
        biome: finalBiome,
        elevation,
        moisture: clamp(moisture, 0, 1),
        temperature: clamp(temperature, 0, 1),
        regionId,
        description: describeBiome(finalBiome),
        structure: null,
        structureName: null,
        regionName: world.regions[regionId]?.name || 'Unclaimed Realm'
      });
    }
    world.tiles.push(row);
  }

  const structureSettings = [
    { type: STRUCTURE_TYPES[0], factor: dwarfFactor },
    { type: STRUCTURE_TYPES[1], factor: humanFactor },
    { type: STRUCTURE_TYPES[2], factor: elfFactor },
    { type: STRUCTURE_TYPES[3], factor: lizardFactor }
  ];

  const placedStructures = [];
  const maxAttempts = width * height;
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const tileX = Math.floor(randomFromSeed(seedValue, attempt, 17) * width);
    const tileY = Math.floor(randomFromSeed(seedValue, attempt, 89) * height);
    const tile = world.tiles[tileY]?.[tileX];
    if (!tile) {
      continue;
    }
    if (tile.biome === 'water' || tile.biome === 'coast' || tile.biome === 'wetland') {
      continue;
    }
    if (tile.structure) {
      continue;
    }
    const selectionValue = randomFromSeed(seedValue, attempt, 121);
    for (let i = 0; i < structureSettings.length; i += 1) {
      const { type, factor } = structureSettings[i];
      const chance = 0.002 + factor * 0.01;
      if (selectionValue > chance) {
        continue;
      }
      const tooClose = placedStructures.some((structure) => {
        const dx = structure.x - tileX;
        const dy = structure.y - tileY;
        return Math.hypot(dx, dy) < type.minDistance;
      });
      if (tooClose) {
        break;
      }
      const nameSeed = seedValue + attempt + i * 17;
      const name = generateStructureName(type.slug, nameSeed, placedStructures.length);
      const structure = {
        x: tileX,
        y: tileY,
        type: type.key,
        label: type.label,
        color: type.color,
        name
      };
      tile.structure = structure;
      tile.structureName = name;
      placedStructures.push(structure);
      if (type.key === 'DWARFHOLD') {
        world.dwarfholds.push({
          x: tileX,
          y: tileY,
          name,
          type: 'DWARFHOLD'
        });
      }
      world.structures.push(structure);
      break;
    }
  }

  return world;
}

function describeStructure(structure) {
  if (!structure) {
    return '';
  }
  return `${structure.label}: ${structure.name}`;
}

function updateSeedDisplay(seed) {
  if (state.seedDisplay) {
    state.seedDisplay.textContent = `Seed: ${seed}`;
  }
  const seedInput = document.getElementById('world-seed');
  if (seedInput) {
    seedInput.value = seed;
  }
  const worldSeedInput = document.getElementById('world-seed-input');
  if (worldSeedInput) {
    worldSeedInput.value = seed;
  }
  if (state.worldInfoSeed) {
    state.worldInfoSeed.textContent = seed;
  }
}

function updateWorldInfoSummary() {
  if (state.worldInfoSize) {
    const preset = getMapSizePreset(state.settings.mapSize);
    state.worldInfoSize.textContent = `${state.settings.mapSize} — ${preset.width} × ${preset.height}`;
  }
  if (state.worldInfoGenerationType) {
    state.worldInfoGenerationType.textContent = state.settings.worldGenerationType.replace(/_/g, ' ');
  }
}

function drawBorders(world, tileSize, offsetX, offsetY) {
  if (!state.ctx) {
    return;
  }
  state.ctx.save();
  state.ctx.lineWidth = Math.max(1, tileSize * 0.08);
  state.ctx.strokeStyle = 'rgba(15, 23, 42, 0.6)';
  for (let y = 0; y < world.height; y += 1) {
    for (let x = 0; x < world.width; x += 1) {
      const tile = world.tiles[y][x];
      const right = world.tiles[y]?.[x + 1];
      const bottom = world.tiles[y + 1]?.[x];
      if (right && right.regionId !== tile.regionId) {
        const startX = offsetX + (x + 1) * tileSize;
        const startY = offsetY + y * tileSize;
        state.ctx.beginPath();
        state.ctx.moveTo(startX, startY);
        state.ctx.lineTo(startX, startY + tileSize);
        state.ctx.stroke();
      }
      if (bottom && bottom.regionId !== tile.regionId) {
        const startX = offsetX + x * tileSize;
        const startY = offsetY + (y + 1) * tileSize;
        state.ctx.beginPath();
        state.ctx.moveTo(startX, startY);
        state.ctx.lineTo(startX + tileSize, startY);
        state.ctx.stroke();
      }
    }
  }
  state.ctx.restore();
}

function drawLocationLabels(world, tileSize, offsetX, offsetY) {
  if (!state.ctx) {
    return;
  }
  state.ctx.save();
  state.ctx.font = `${Math.max(10, tileSize * 0.5)}px "Cormorant Garamond", serif`;
  state.ctx.textAlign = 'center';
  state.ctx.textBaseline = 'bottom';
  state.ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  world.structures.forEach((structure) => {
    const centerX = offsetX + structure.x * tileSize + tileSize / 2;
    const centerY = offsetY + structure.y * tileSize;
    state.ctx.fillText(structure.name, centerX, centerY - 2);
  });
  state.ctx.restore();
}

function drawWorld(world) {
  if (!world || !state.canvas || !state.ctx) {
    return;
  }
  const { ctx } = state;
  ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
  const tileSize = Math.floor(
    Math.min(state.canvas.width / world.width, state.canvas.height / world.height)
  );
  const offsetX = Math.floor((state.canvas.width - tileSize * world.width) / 2);
  const offsetY = Math.floor((state.canvas.height - tileSize * world.height) / 2);

  world.tiles.forEach((row) => {
    row.forEach((tile) => {
      let baseColor = BIOME_COLORS[tile.biome] || '#334155';
      if (state.overlays.biomes) {
        baseColor = blendColors(baseColor, '#ffffff', 0.12);
      }
      if (tile.biome === 'water') {
        baseColor = blendColors(baseColor, '#38bdf8', 0.2);
      }
      if (tile.biome === 'coast') {
        baseColor = blendColors(baseColor, '#bae6fd', 0.4);
      }
      if (tile.biome === 'river') {
        baseColor = BIOME_COLORS.river;
      }

      if (state.overlays.elevation) {
        const shade = Math.round(tile.elevation * 255);
        const gray = `rgb(${shade}, ${shade}, ${shade})`;
        baseColor = gray;
      } else if (state.overlays.temperature) {
        const coldColor = '#0ea5e9';
        const hotColor = '#f97316';
        baseColor = blendColors(coldColor, hotColor, tile.temperature);
      }

      if (state.overlays.politicalInfluence && tile.biome !== 'water') {
        const regionColor = world.regions[tile.regionId]?.color || '#eab308';
        baseColor = blendColors(baseColor, regionColor, 0.35);
      }

      ctx.fillStyle = baseColor;
      const drawX = offsetX + tile.x * tileSize;
      const drawY = offsetY + tile.y * tileSize;
      ctx.fillRect(drawX, drawY, tileSize, tileSize);
    });
  });

  world.structures.forEach((structure) => {
    const drawX = offsetX + structure.x * tileSize;
    const drawY = offsetY + structure.y * tileSize;
    ctx.fillStyle = structure.color;
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = Math.max(1, tileSize * 0.12);
    const size = Math.max(2, tileSize * 0.5);
    ctx.beginPath();
    ctx.rect(drawX + tileSize / 2 - size / 2, drawY + tileSize / 2 - size / 2, size, size);
    ctx.fill();
    ctx.stroke();
  });

  if (state.overlays.politicalBorders) {
    drawBorders(world, tileSize, offsetX, offsetY);
  }

  if (state.overlays.locationLabels) {
    drawLocationLabels(world, tileSize, offsetX, offsetY);
  }

  state.render = { tileSize, offsetX, offsetY };
  updateSeedDisplay(world.seed);
  updateWorldInfoSummary();
}

function getTileAtCanvasPoint(x, y) {
  const { tileSize, offsetX, offsetY } = state.render;
  if (tileSize <= 0) {
    return null;
  }
  const tileX = Math.floor((x - offsetX) / tileSize);
  const tileY = Math.floor((y - offsetY) / tileSize);
  if (tileX < 0 || tileY < 0) {
    return null;
  }
  return {
    tile: state.world?.tiles[tileY]?.[tileX] || null,
    x: tileX,
    y: tileY
  };
}

function positionTooltip(event) {
  if (!state.tooltip) {
    return;
  }
  const rect = state.canvas.getBoundingClientRect();
  const left = rect.left + event.offsetX + 16;
  const top = rect.top + event.offsetY + 16;
  state.tooltip.style.left = `${left}px`;
  state.tooltip.style.top = `${top}px`;
}

function showTooltip(tileInfo, event) {
  if (!tileInfo || !tileInfo.tile || !state.tooltip) {
    return;
  }
  const { tile, x, y } = tileInfo;
  const elevationMeters = Math.round(tile.elevation * 3000);
  const temperatureC = Math.round(lerp(-10, 38, tile.temperature));
  const moisturePercent = Math.round(tile.moisture * 100);
  const structureDescription = describeStructure(tile.structure);

  const lines = [
    `<strong>${tile.description}</strong> (${x}, ${y})`,
    `Elevation: ${elevationMeters} m`,
    `Temperature: ${temperatureC}°C`,
    `Moisture: ${moisturePercent}%`,
    `Region: ${tile.regionName}`
  ];
  if (structureDescription) {
    lines.push(structureDescription);
  }
  state.tooltip.innerHTML = lines.map((line) => `<div>${line}</div>`).join('');
  state.tooltip.setAttribute('aria-hidden', 'false');
  state.tooltip.classList.remove('hidden');
  positionTooltip(event);
}

function hideTooltip() {
  if (!state.tooltip) {
    return;
  }
  state.tooltip.classList.add('hidden');
  state.tooltip.setAttribute('aria-hidden', 'true');
}

function handleCanvasMove(event) {
  const tileInfo = getTileAtCanvasPoint(event.offsetX, event.offsetY);
  if (!tileInfo || !tileInfo.tile) {
    hideTooltip();
    return;
  }
  showTooltip(tileInfo, event);
}

function readSettingsFromDom() {
  const mapSizeSelect = document.getElementById('map-size');
  const worldMapSizeSelect = document.getElementById('world-map-size-select');
  const generationSelect = document.getElementById('world-generation-type');
  const worldGenerationSelect = document.getElementById('world-generation-type-select');
  const seedInput = document.getElementById('world-seed');
  const worldSeedInput = document.getElementById('world-seed-input');

  if (mapSizeSelect && mapSizeSelect.value) {
    state.settings.mapSize = mapSizeSelect.value;
  }
  if (worldMapSizeSelect && worldMapSizeSelect.value) {
    state.settings.mapSize = worldMapSizeSelect.value;
  }
  if (generationSelect && generationSelect.value) {
    state.settings.worldGenerationType = generationSelect.value;
  }
  if (worldGenerationSelect && worldGenerationSelect.value) {
    state.settings.worldGenerationType = worldGenerationSelect.value;
  }
  const seedValue = worldSeedInput?.value || seedInput?.value || state.settings.seed;
  state.settings.seed = seedValue;
}

function regenerateWorld({ randomiseSeed = false } = {}) {
  readSettingsFromDom();
  if (randomiseSeed) {
    state.settings.seed = ensureSeedString('');
  }
  state.world = generateWorld(state.settings);
  drawWorld(state.world);
  hideTooltip();
}

function setupOverlayToggle(buttonId, overlayKey, labelWhenActive, labelWhenInactive) {
  const button = document.getElementById(buttonId);
  if (!button) {
    return;
  }
  const initial = button.getAttribute('aria-pressed') === 'true';
  state.overlays[overlayKey] = initial;
  button.textContent = initial ? labelWhenActive : labelWhenInactive;
  button.addEventListener('click', () => {
    const current = button.getAttribute('aria-pressed') === 'true';
    const next = !current;
    button.setAttribute('aria-pressed', String(next));
    button.textContent = next ? labelWhenActive : labelWhenInactive;
    state.overlays[overlayKey] = next;
    drawWorld(state.world);
  });
}

function syncSelectValue(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.value = value;
  }
}

function attachFormListeners() {
  const optionsForm = document.getElementById('options-form');
  if (optionsForm) {
    optionsForm.addEventListener('submit', (event) => {
      event.preventDefault();
      readSettingsFromDom();
      regenerateWorld();
    });
  }

  const worldInfoForm = document.getElementById('world-info-form');
  if (worldInfoForm) {
    worldInfoForm.addEventListener('submit', () => {
      readSettingsFromDom();
      regenerateWorld();
    });
  }

  const regenerateButton = document.getElementById('regenerate-button');
  if (regenerateButton) {
    regenerateButton.addEventListener('click', (event) => {
      event.preventDefault();
      regenerateWorld({ randomiseSeed: true });
    });
  }
}

function attachSelectSync() {
  const mapSizeSelect = document.getElementById('map-size');
  const worldMapSizeSelect = document.getElementById('world-map-size-select');
  if (mapSizeSelect) {
    mapSizeSelect.addEventListener('change', (event) => {
      const value = event.target.value;
      state.settings.mapSize = value;
      syncSelectValue('world-map-size-select', value);
      regenerateWorld();
    });
  }
  if (worldMapSizeSelect) {
    worldMapSizeSelect.addEventListener('change', (event) => {
      const value = event.target.value;
      state.settings.mapSize = value;
      syncSelectValue('map-size', value);
      regenerateWorld();
    });
  }

  const generationSelect = document.getElementById('world-generation-type');
  const worldGenerationSelect = document.getElementById('world-generation-type-select');
  if (generationSelect) {
    generationSelect.addEventListener('change', (event) => {
      const value = event.target.value;
      state.settings.worldGenerationType = value;
      syncSelectValue('world-generation-type-select', value);
      regenerateWorld();
    });
  }
  if (worldGenerationSelect) {
    worldGenerationSelect.addEventListener('change', (event) => {
      const value = event.target.value;
      state.settings.worldGenerationType = value;
      syncSelectValue('world-generation-type', value);
      regenerateWorld();
    });
  }
}

function attachSeedInputListeners() {
  const seedInput = document.getElementById('world-seed');
  const worldSeedInput = document.getElementById('world-seed-input');
  const inputs = [seedInput, worldSeedInput].filter(Boolean);
  inputs.forEach((input) => {
    input.addEventListener('input', (event) => {
      const value = event.target.value;
      state.settings.seed = value;
      inputs.forEach((other) => {
        if (other !== event.target) {
          other.value = value;
        }
      });
    });
  });
}

function initWorldMap() {
  if (typeof document === 'undefined') {
    return;
  }
  state.canvas = document.getElementById('world-canvas');
  state.tooltip = document.getElementById('world-tooltip');
  state.seedDisplay = document.querySelector('.seed-display');
  state.worldInfoSize = document.getElementById('world-info-size');
  state.worldInfoGenerationType = document.getElementById('world-info-generation-type');
  state.worldInfoSeed = document.getElementById('world-info-seed');

  if (!state.canvas) {
    return;
  }
  state.ctx = state.canvas.getContext('2d');
  if (!state.ctx) {
    return;
  }
  state.ctx.imageSmoothingEnabled = false;

  setupSlider('forest-frequency', 'forest-frequency-value', (value) => {
    state.settings.forestFrequency = value;
  });
  setupSlider('mountain-frequency', 'mountain-frequency-value', (value) => {
    state.settings.mountainFrequency = value;
  });
  setupSlider('river-frequency', 'river-frequency-value', (value) => {
    state.settings.riverFrequency = value;
  });
  setupSlider('human-settlement-frequency', 'human-settlement-frequency-value', (value) => {
    state.settings.humanSettlementFrequency = value;
  });
  setupSlider('dwarf-settlement-frequency', 'dwarf-settlement-frequency-value', (value) => {
    state.settings.dwarfSettlementFrequency = value;
  });
  setupSlider('wood-elf-settlement-frequency', 'wood-elf-settlement-frequency-value', (value) => {
    state.settings.woodElfSettlementFrequency = value;
  });
  setupSlider('lizardmen-settlement-frequency', 'lizardmen-settlement-frequency-value', (value) => {
    state.settings.lizardmenSettlementFrequency = value;
  });

  attachFormListeners();
  attachSelectSync();
  attachSeedInputListeners();

  setupOverlayToggle(
    'toggle-political-borders',
    OVERLAY_KEYS.politicalBorders,
    'Hide Borders',
    'Show Borders'
  );
  setupOverlayToggle(
    'toggle-political-influence',
    OVERLAY_KEYS.politicalInfluence,
    'Hide Cultural Influence',
    'Show Cultural Influence'
  );
  setupOverlayToggle('toggle-elevation', OVERLAY_KEYS.elevation, 'Hide Elevation', 'Show Elevation');
  setupOverlayToggle('toggle-biomes', OVERLAY_KEYS.biomes, 'Hide Biomes', 'Show Biomes');
  setupOverlayToggle(
    'toggle-temperature',
    OVERLAY_KEYS.temperature,
    'Hide Temperature',
    'Show Temperature'
  );
  setupOverlayToggle(
    'toggle-location-labels',
    OVERLAY_KEYS.locationLabels,
    'Hide Location Labels',
    'Show Location Labels'
  );

  state.canvas.addEventListener('mousemove', handleCanvasMove);
  state.canvas.addEventListener('mouseleave', hideTooltip);

  readSettingsFromDom();
  regenerateWorld();
}

export { initWorldMap };
