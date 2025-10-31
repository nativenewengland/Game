import { getElements, getMusicToggleElements, getMusicVolumeInputs, getMusicNowPlayingDisplays } from './src/ui/elements.js';
import { attachEvents } from './src/ui/events.js';
import {
  tileSheets,
  dwarfSpriteSheets,
  orcSpriteSheets,
  dungeonPlayerSpriteSheets,
  characterCreatorPortraitAssets
} from './src/assets.js';
import { generateDwarfholdMap } from './src/local/dwarfhold-map.js';

const elements = getElements();

const MAP_SIZE_PRESETS = {
  mini: { key: 'mini', label: 'Mini — 120 × 90', worldWidth: 120, worldHeight: 90 },
  small: { key: 'small', label: 'Small — 160 × 120', worldWidth: 160, worldHeight: 120 },
  normal: { key: 'normal', label: 'Normal — 200 × 150', worldWidth: 200, worldHeight: 150 },
  large: { key: 'large', label: 'Large — 260 × 195', worldWidth: 260, worldHeight: 195 },
  'extra-large': { key: 'extra-large', label: 'Extra Large — 320 × 240', worldWidth: 320, worldHeight: 240 }
};

const DEFAULT_WORLD_SETTINGS = {
  mapSize: 'normal',
  worldGenerationType: 'normal',
  seedString: '',
  forestFrequency: 35,
  mountainFrequency: 35,
  riverFrequency: 50,
  humanSettlementFrequency: 50,
  dwarfSettlementFrequency: 50,
  woodElfSettlementFrequency: 50,
  lizardmenSettlementFrequency: 50
};

const STRUCTURE_HIGHLIGHT_OPTIONS = [
  { key: 'dwarfholds', label: 'Dwarven holds' },
  { key: 'humanSettlements', label: 'Human settlements' },
  { key: 'woodElfSettlements', label: 'Wood elf enclaves' },
  { key: 'naturalWonders', label: 'Natural wonders' }
];

const MUSIC_TRACKS = [
  { title: 'Strike the Earth!', file: 'sound/tracks/strike_the_earth!/STE_Full.ogg' },
  { title: 'Another Year', file: 'sound/tracks/another_year/AY_Full.ogg' },
  { title: 'Mountainhome', file: 'sound/tracks/mountainhome/MH_Full.ogg' }
];

const DWARF_CLANS = ['Granitevein', 'Hammerdeep', 'Runeheart', 'Stoneward', 'Bronzebrood', 'Oreborn'];
const DWARF_PROFESSIONS = ['Miner', 'Smith', 'Brewer', 'Carpenter', 'Hunter', 'Scholar'];

const DWARF_NAME_PREFIXES = ['Dur', 'Kil', 'Thra', 'Bel', 'Gar', 'Nor', 'Rok', 'Brom'];
const DWARF_NAME_SUFFIXES = ['in', 'or', 'ain', 'ik', 'drim', 'dil', 'grin', 'rak'];
const WORLD_NAME_PREFIXES = ['Stone', 'Iron', 'Deep', 'Rune', 'Hammer', 'Anvil', 'Frost', 'Ember'];
const WORLD_NAME_SUFFIXES = ['home', 'reach', 'delve', 'spire', 'hall', 'keep', 'hold', 'forge'];
const WORLD_AGE_DESCRIPTORS = ['Age of Stone', 'Era of Embers', 'Century of Thunder', 'Age of Kings'];

const defaultWorldChronology = { year: 1250, age: 5 };

const state = {
  currentWorld: null,
  worldName: 'New Dwarfhold',
  worldChronology: { ...defaultWorldChronology },
  settings: { ...DEFAULT_WORLD_SETTINGS },
  loading: { total: 0, loaded: 0 },
  ui: {
    showPoliticalBorders: false,
    showPoliticalInfluence: false,
    showElevation: false,
    showBiomes: false,
    showTemperature: false,
    showLocationLabels: true,
    structureHighlights: null
  },
  localView: {
    active: false,
    tileX: null,
    tileY: null,
    zoom: 1,
    minZoom: 1,
    maxZoom: 4
  },
  dwarfRoster: [],
  activeDwarfIndex: 0,
  dwarfCustomizerVisible: false,
  dwarfTest: { active: false, mode: null },
  mapEditor: {
    enabled: false,
    terrainKey: '',
    structureKey: '',
    applyTerrain: true,
    applyStructure: true,
    brushSize: 1
  },
  music: {
    started: false,
    playing: false,
    currentTrackIndex: 0
  },
  soundEffects: {
    randomiseClick: createOptionalAudio('sound/sounds/rolling-dice.mp3'),
    confirm: createOptionalAudio('sound/sounds/single-mouse-click-sound.mp3')
  }
};

const structureContextMenuState = {
  visible: false,
  tile: null,
  tileX: null,
  tileY: null
};

const structureDetailsState = {
  visible: false,
  activeTab: 'overview',
  tile: null,
  tileX: null,
  tileY: null
};

const dwarfTraitOptions = {
  skin: ['Pale', 'Fair', 'Tan', 'Bronzed', 'Umber'],
  eyes: ['Amber', 'Hazel', 'Emerald', 'Sapphire', 'Onyx'],
  hair: ['Chestnut', 'Auburn', 'Coal', 'Gold', 'Silver'],
  hairStyle: ['Braided', 'Long', 'Short', 'Shaved', 'Wild'],
  beard: ['Trimmed', 'Braided', 'Forked', 'Ringed', 'Wild']
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

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
  let stateValue = seed >>> 0;
  return () => {
    stateValue += 0x6d2b79f5;
    let result = Math.imul(stateValue ^ (stateValue >>> 15), 1 | stateValue);
    result ^= result + Math.imul(result ^ (result >>> 7), 61 | result);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function randomInt(rng, min, max) {
  if (max <= min) {
    return min;
  }
  const range = max - min + 1;
  return min + Math.floor(rng() * range);
}

function pick(array, rng) {
  if (!Array.isArray(array) || array.length === 0) {
    return null;
  }
  const index = clamp(Math.floor(rng() * array.length), 0, array.length - 1);
  return array[index];
}

function createOptionalAudio(src) {
  if (typeof Audio === 'undefined') {
    return null;
  }
  const audio = new Audio();
  audio.preload = 'auto';
  audio.src = src;
  return audio;
}

function setHidden(element, hidden) {
  if (!element) {
    return;
  }
  element.classList.toggle('hidden', hidden);
  element.setAttribute('aria-hidden', hidden ? 'true' : 'false');
}

function focusElement(element) {
  if (!element || typeof element.focus !== 'function') {
    return;
  }
  requestAnimationFrame(() => {
    element.focus({ preventScroll: true });
  });
}

function setTextContent(element, text) {
  if (!element) {
    return;
  }
  element.textContent = text;
}

function ensureStructureHighlightState() {
  if (!state.ui.structureHighlights) {
    state.ui.structureHighlights = {
      menuOpen: false,
      dwarfholds: true,
      humanSettlements: true,
      woodElfSettlements: false,
      naturalWonders: true
    };
  }
  return state.ui.structureHighlights;
}

function getMapSizePreset(value) {
  return MAP_SIZE_PRESETS[value] || MAP_SIZE_PRESETS.normal;
}

function applyMapSizePresetToState(preset) {
  if (!preset) {
    return;
  }
  state.settings.mapSize = preset.key;
  state.settings.worldWidth = preset.worldWidth;
  state.settings.worldHeight = preset.worldHeight;
}

function ensureSeedString(seed) {
  const trimmed = typeof seed === 'string' ? seed.trim() : '';
  if (trimmed) {
    state.settings.seedString = trimmed;
    return trimmed;
  }
  const generated = `DW-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  state.settings.seedString = generated;
  if (elements.seedInput) {
    elements.seedInput.value = generated;
  }
  if (elements.worldSeedInput) {
    elements.worldSeedInput.value = generated;
  }
  updateWorldInfoSeedDisplay(generated);
  return generated;
}

function generateWorldName(rng) {
  const prefix = pick(WORLD_NAME_PREFIXES, rng) || 'Stone';
  const suffix = pick(WORLD_NAME_SUFFIXES, rng) || 'hold';
  return `${prefix}${suffix}`;
}

function getRandomWorldName(currentName = '') {
  const rng = createRng(hashString(`${currentName}:${Date.now()}`));
  return generateWorldName(rng);
}

function getSanitisedChronologyFromInputs() {
  const yearValue = Number.parseInt(elements.worldYearInput?.value, 10);
  const ageValue = Number.parseInt(elements.worldAgeInput?.value, 10);
  const year = Number.isFinite(yearValue) ? clamp(yearValue, 0, 50000) : defaultWorldChronology.year;
  const age = Number.isFinite(ageValue) ? clamp(ageValue, 2, 20) : defaultWorldChronology.age;
  return { year, age };
}

function generateRandomChronology() {
  const rng = createRng(hashString(`${Date.now()}:chronology`));
  const year = randomInt(rng, 200, 2800);
  const age = randomInt(rng, 2, 12);
  return { year, age };
}

function updateChronologyDisplay() {
  const chronology = getSanitisedChronologyFromInputs();
  state.worldChronology = chronology;
  const descriptor = pick(WORLD_AGE_DESCRIPTORS, createRng(hashString(`${chronology.year}:${chronology.age}`))) ||
    'Age of Legends';
  const text = `Year ${chronology.year} — Age ${chronology.age} (${descriptor})`;
  setTextContent(elements.worldInfoChronology, text);
}

function updateWorldInfoSeedDisplay(seedValue = state.settings.seedString) {
  setTextContent(elements.worldInfoSeed, seedValue || 'Random');
}

function updateWorldInfoSizeDisplay() {
  const preset = getMapSizePreset(state.settings.mapSize);
  setTextContent(elements.worldInfoSize, preset.label);
}

function updateWorldInfoGenerationTypeDisplay() {
  const mapping = {
    normal: 'Normal',
    major_continent: 'Major Continent',
    twin_continents: 'Twin Continents',
    inland_sea: 'Inland Sea',
    archipelago: 'Archipelago'
  };
  setTextContent(elements.worldInfoGenerationType, mapping[state.settings.worldGenerationType] || 'Normal');
}

function setWorldGenerationType(value) {
  state.settings.worldGenerationType = value;
  if (elements.worldGenerationTypeSelect) {
    elements.worldGenerationTypeSelect.value = value;
  }
  updateWorldInfoGenerationTypeDisplay();
}

function sanitizeFrequencyValue(value) {
  const numeric = Number.parseInt(value, 10);
  if (!Number.isFinite(numeric)) {
    return 0;
  }
  return clamp(numeric, 0, 100);
}

function updateFrequencyDisplay(input, output, prefix) {
  if (!input || !output) {
    return;
  }
  const value = sanitizeFrequencyValue(input.value);
  input.value = value;
  let emphasis = 'Balanced';
  if (value < 25) {
    emphasis = 'Sparse';
  } else if (value > 75) {
    emphasis = 'Abundant';
  } else if (value < 45) {
    emphasis = 'Low';
  } else if (value > 55) {
    emphasis = 'High';
  }
  output.textContent = `${value}% — ${prefix || emphasis}`;
}

function createTile(x, y, rng) {
  const terrainNoise = rng();
  const biomeNoise = rng();
  const elevationNoise = rng();
  const temperatureNoise = rng();

  let terrain = 'grass';
  if (terrainNoise < state.settings.riverFrequency / 250) {
    terrain = 'river';
  } else if (terrainNoise < state.settings.mountainFrequency / 200) {
    terrain = 'mountain';
  } else if (terrainNoise < state.settings.forestFrequency / 200) {
    terrain = 'forest';
  } else if (terrainNoise > 0.92) {
    terrain = 'desert';
  }

  const biome = (() => {
    if (terrain === 'mountain') {
      return 'Highlands';
    }
    if (terrain === 'river') {
      return 'Riverlands';
    }
    if (terrain === 'desert') {
      return 'Scorched Plains';
    }
    if (biomeNoise > 0.75) {
      return 'Taiga';
    }
    if (biomeNoise < 0.2) {
      return 'Meadow';
    }
    return 'Forest';
  })();

  const elevation = Math.round(elevationNoise * 4000) - 2000;
  const temperature = Math.round((temperatureNoise * 60) - 20);

  return {
    x,
    y,
    terrain,
    biome,
    elevation,
    temperature,
    structure: null,
    structureCategory: null,
    structureName: null,
    faction: null
  };
}

function assignStructures(world, rng) {
  const dwarfholdCount = Math.max(1, Math.round((world.width * world.height) / 5000));
  const humanSettlementChance = state.settings.humanSettlementFrequency / 3000;
  const elfSettlementChance = state.settings.woodElfSettlementFrequency / 3500;
  const wonderChance = 0.0008;

  const structures = [];
  const dwarfholds = [];

  const availableTiles = [];
  world.tiles.forEach((row) => {
    row.forEach((tile) => {
      if (tile.terrain !== 'river') {
        availableTiles.push(tile);
      }
    });
  });

  const pickTile = () => {
    if (availableTiles.length === 0) {
      return null;
    }
    const index = randomInt(rng, 0, availableTiles.length - 1);
    return availableTiles.splice(index, 1)[0];
  };

  for (let i = 0; i < dwarfholdCount; i += 1) {
    const tile = pickTile();
    if (!tile) {
      continue;
    }
    tile.structure = 'DWARFHOLD';
    tile.structureCategory = 'dwarfholds';
    tile.structureName = `${pick(DWARF_NAME_PREFIXES, rng) || 'Kar'}${pick(DWARF_NAME_SUFFIXES, rng) || 'dak'} Hold`;
    tile.faction = `${pick(DWARF_CLANS, rng) || 'Granitevein'} Clan`;
    const record = {
      type: 'DWARFHOLD',
      name: tile.structureName,
      faction: tile.faction,
      x: tile.x,
      y: tile.y,
      description: `${tile.structureName} watches over the surrounding realm.`
    };
    structures.push(record);
    dwarfholds.push(record);
  }

  world.tiles.forEach((row) => {
    row.forEach((tile) => {
      if (tile.structure) {
        return;
      }
      const chance = rng();
      if (chance < humanSettlementChance) {
        tile.structure = 'TOWN';
        tile.structureCategory = 'humanSettlements';
        tile.structureName = `${pick(['Fort', 'Port', 'Stone', 'High', 'River'], rng) || 'Fort'}${pick(
          ['haven', 'keep', 'watch', 'mere', 'gate'],
          rng
        ) || 'gate'}`;
        tile.faction = 'Human Dominion';
        structures.push({
          type: 'TOWN',
          name: tile.structureName,
          faction: tile.faction,
          x: tile.x,
          y: tile.y,
          description: `${tile.structureName} is a bustling trade hub.`
        });
        return;
      }
      if (chance < humanSettlementChance + elfSettlementChance) {
        tile.structure = 'WOOD_ELF_ENCLAVE';
        tile.structureCategory = 'woodElfSettlements';
        tile.structureName = `${pick(['Sylvan', 'Elder', 'Moon', 'Leaf', 'Glade'], rng) || 'Sylvan'}${pick(
          ['grove', 'glade', 'home', 'reach'],
          rng
        ) || 'grove'}`;
        tile.faction = 'Sylvan Confederacy';
        structures.push({
          type: 'WOOD_ELF_ENCLAVE',
          name: tile.structureName,
          faction: tile.faction,
          x: tile.x,
          y: tile.y,
          description: `${tile.structureName} is hidden beneath towering canopies.`
        });
        return;
      }
      if (chance > 1 - wonderChance) {
        tile.structure = 'WONDER';
        tile.structureCategory = 'naturalWonders';
        tile.structureName = `${pick(['Crystal', 'Sun', 'Eclipse', 'Aurora', 'Runed'], rng) || 'Crystal'} Spire`;
        tile.faction = 'Ancient Builders';
        structures.push({
          type: 'WONDER',
          name: tile.structureName,
          faction: tile.faction,
          x: tile.x,
          y: tile.y,
          description: `${tile.structureName} is a marvel visible for leagues.`
        });
      }
    });
  });

  world.structures = structures;
  world.dwarfholds = dwarfholds;
}

function generateWorld() {
  const preset = getMapSizePreset(state.settings.mapSize);
  applyMapSizePresetToState(preset);
  const seed = ensureSeedString(state.settings.seedString);
  const rng = createRng(hashString(`${seed}:${state.settings.worldGenerationType}`));
  const width = preset.worldWidth;
  const height = preset.worldHeight;
  const tiles = [];
  for (let y = 0; y < height; y += 1) {
    const row = [];
    for (let x = 0; x < width; x += 1) {
      row.push(createTile(x, y, rng));
    }
    tiles.push(row);
  }

  const world = {
    width,
    height,
    tiles,
    seed,
    name: state.worldName,
    generationType: state.settings.worldGenerationType,
    structures: [],
    dwarfholds: []
  };

  assignStructures(world, rng);
  state.currentWorld = world;
  return world;
}

function getCanvasContext(canvas) {
  if (!canvas) {
    return null;
  }
  const context = canvas.getContext('2d');
  if (!context) {
    return null;
  }
  return context;
}

function drawWorld(world, { preserveView = false } = {}) {
  const canvas = elements.canvas;
  const ctx = getCanvasContext(canvas);
  if (!world || !ctx) {
    return;
  }
  const viewWidth = canvas.clientWidth || 960;
  const viewHeight = canvas.clientHeight || 720;
  canvas.width = viewWidth;
  canvas.height = viewHeight;

  const tileWidth = viewWidth / world.width;
  const tileHeight = viewHeight / world.height;

  ctx.fillStyle = '#111827';
  ctx.fillRect(0, 0, viewWidth, viewHeight);

  const highlightState = ensureStructureHighlightState();

  for (let y = 0; y < world.height; y += 1) {
    for (let x = 0; x < world.width; x += 1) {
      const tile = world.tiles[y][x];
      const px = x * tileWidth;
      const py = y * tileHeight;

      let baseColor = '#1f2937';
      if (tile.terrain === 'river') {
        baseColor = '#38bdf8';
      } else if (tile.terrain === 'mountain') {
        baseColor = '#9ca3af';
      } else if (tile.terrain === 'forest') {
        baseColor = '#16a34a';
      } else if (tile.terrain === 'desert') {
        baseColor = '#fbbf24';
      } else {
        baseColor = '#22c55e';
      }

      if (state.ui.showElevation) {
        const elevation = clamp((tile.elevation + 2000) / 4000, 0, 1);
        const grey = Math.round(80 + elevation * 120);
        baseColor = `rgb(${grey}, ${grey}, ${grey})`;
      }

      if (state.ui.showTemperature) {
        const temp = clamp((tile.temperature + 20) / 60, 0, 1);
        const red = Math.round(50 + temp * 205);
        const blue = Math.round(255 - temp * 155);
        baseColor = `rgb(${red}, ${Math.round((red + blue) / 2)}, ${blue})`;
      }

      if (state.ui.showBiomes) {
        const biomeColors = {
          Highlands: '#6b7280',
          Forest: '#166534',
          Meadow: '#a3e635',
          Taiga: '#115e59',
          Riverlands: '#0ea5e9',
          'Scorched Plains': '#f59e0b'
        };
        baseColor = biomeColors[tile.biome] || baseColor;
      }

      ctx.fillStyle = baseColor;
      ctx.fillRect(px, py, tileWidth + 1, tileHeight + 1);

      if (tile.structure && highlightState[tile.structureCategory] !== false) {
        ctx.save();
        ctx.globalAlpha = 0.7;
        let overlayColor = '#f97316';
        if (tile.structureCategory === 'dwarfholds') {
          overlayColor = '#facc15';
        } else if (tile.structureCategory === 'woodElfSettlements') {
          overlayColor = '#22d3ee';
        } else if (tile.structureCategory === 'naturalWonders') {
          overlayColor = '#e879f9';
        }
        ctx.fillStyle = overlayColor;
        ctx.beginPath();
        ctx.roundRect(px + tileWidth * 0.2, py + tileHeight * 0.2, tileWidth * 0.6, tileHeight * 0.6, 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  if (!preserveView) {
    hideStructureContextMenu();
    hideLocalView();
    hideStructureDetails();
  }
}

function updateTooltip(tile, clientX, clientY) {
  const tooltip = elements.mapTooltip;
  if (!tooltip) {
    return;
  }
  if (!tile) {
    tooltip.classList.add('hidden');
    return;
  }
  tooltip.innerHTML = `
    <strong>${tile.structureName || tile.biome}</strong>
    <span>(${tile.x}, ${tile.y})</span>
    <span>${tile.terrain}</span>
  `;
  tooltip.style.left = `${clientX + 12}px`;
  tooltip.style.top = `${clientY + 12}px`;
  tooltip.classList.remove('hidden');
}

function setStructureContextMenuPosition(x, y) {
  const menu = elements.structureContextMenu;
  if (!menu) {
    return;
  }
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const menuRect = menu.getBoundingClientRect();
  let left = x;
  let top = y;
  if (left + menuRect.width > viewportWidth) {
    left = viewportWidth - menuRect.width - 12;
  }
  if (top + menuRect.height > viewportHeight) {
    top = viewportHeight - menuRect.height - 12;
  }
  menu.style.left = `${Math.max(left, 12)}px`;
  menu.style.top = `${Math.max(top, 12)}px`;
}

function showStructureContextMenu(tile, tileX, tileY, clientX, clientY) {
  if (!elements.structureContextMenu) {
    return;
  }
  structureContextMenuState.visible = true;
  structureContextMenuState.tile = tile;
  structureContextMenuState.tileX = tileX;
  structureContextMenuState.tileY = tileY;
  setHidden(elements.structureContextMenu, false);
  setStructureContextMenuPosition(clientX, clientY);
  if (tile && elements.structureContextMenuBegin) {
    elements.structureContextMenuBegin.disabled = false;
  }
}

function hideStructureContextMenu() {
  if (!structureContextMenuState.visible) {
    return;
  }
  structureContextMenuState.visible = false;
  structureContextMenuState.tile = null;
  structureContextMenuState.tileX = null;
  structureContextMenuState.tileY = null;
  setHidden(elements.structureContextMenu, true);
}

function showLocalViewAt(tileX, tileY) {
  const world = state.currentWorld;
  if (!world) {
    return;
  }
  const tile = getWorldTile(tileX, tileY);
  if (!tile) {
    return;
  }
  state.localView.active = true;
  state.localView.tileX = tileX;
  state.localView.tileY = tileY;
  drawLocalMap(tile);
  setHidden(elements.localMapPanel, false);
  setTextContent(elements.localMapTitle, tile.structureName || tile.biome || 'Local view');
  setTextContent(elements.localMapSubtitle, tile.structure ? 'Point of interest' : 'Wilderness region');
  setTextContent(elements.localMapCoordinates, `(${tileX}, ${tileY})`);
  focusElement(elements.localMapPanel);
}

function hideLocalView({ returnFocus = false } = {}) {
  state.localView.active = false;
  setHidden(elements.localMapPanel, true);
  if (returnFocus && elements.canvasWrapper) {
    focusElement(elements.canvasWrapper);
  }
}

function adjustLocalMapZoom(direction) {
  const delta = direction === 'in' ? 1 : -1;
  state.localView.zoom = clamp(state.localView.zoom + delta, state.localView.minZoom, state.localView.maxZoom);
  drawLocalMap();
}

function resetLocalMapZoom() {
  state.localView.zoom = 1;
  drawLocalMap();
}

function drawLocalMap(tile = null) {
  const world = state.currentWorld;
  const canvas = elements.localMapCanvas;
  const ctx = getCanvasContext(canvas);
  if (!world || !ctx) {
    return;
  }
  const targetTile = tile || getWorldTile(state.localView.tileX, state.localView.tileY);
  if (!targetTile) {
    return;
  }
  const zoom = state.localView.zoom;
  const radius = Math.max(3, 6 - zoom);
  const size = radius * 2 + 1;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cellWidth = canvas.width / size;
  const cellHeight = canvas.height / size;

  for (let dy = -radius; dy <= radius; dy += 1) {
    for (let dx = -radius; dx <= radius; dx += 1) {
      const x = clamp(targetTile.x + dx, 0, world.width - 1);
      const y = clamp(targetTile.y + dy, 0, world.height - 1);
      const tileRef = world.tiles[y][x];
      let color = '#0f172a';
      if (tileRef.terrain === 'river') {
        color = '#0ea5e9';
      } else if (tileRef.terrain === 'mountain') {
        color = '#6b7280';
      } else if (tileRef.terrain === 'forest') {
        color = '#16a34a';
      } else if (tileRef.terrain === 'desert') {
        color = '#f59e0b';
      } else {
        color = '#60a5fa';
      }
      const px = (dx + radius) * cellWidth;
      const py = (dy + radius) * cellHeight;
      ctx.fillStyle = color;
      ctx.fillRect(px, py, cellWidth + 1, cellHeight + 1);
      if (tileRef.structure) {
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.arc(px + cellWidth / 2, py + cellHeight / 2, Math.min(cellWidth, cellHeight) / 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 2;
  ctx.strokeRect(radius * cellWidth, radius * cellHeight, cellWidth, cellHeight);
}

function getWorldTile(x, y) {
  const world = state.currentWorld;
  if (!world) {
    return null;
  }
  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    return null;
  }
  const row = world.tiles[y];
  if (!row) {
    return null;
  }
  return row[x] || null;
}

function showDwarfholdInterior(tile, tileX, tileY) {
  if (!elements.dwarfholdScreen || !elements.dwarfholdCanvas) {
    return;
  }
  const map = generateDwarfholdMap({
    tileX,
    tileY,
    structureKey: tile.structure || 'DWARFHOLD',
    structureName: tile.structureName,
    faction: tile.faction,
    worldSeed: state.currentWorld?.seed
  });
  drawDwarfholdMap(map);
  setHidden(elements.dwarfholdScreen, false);
  setTextContent(elements.dwarfholdTitle, tile.structureName || 'Dwarven Hold');
  setTextContent(elements.dwarfholdSubtitle, map.levelName || 'Upper Halls');
  setTextContent(elements.dwarfholdDescription, map.description || 'A mighty dwarven stronghold.');
  setTextContent(elements.dwarfholdCoordinates, `(${tileX}, ${tileY})`);
  renderDwarfholdLegend(map.legend);
  focusElement(elements.dwarfholdScreen);
}

function closeDwarfholdInterior({ returnFocus = false } = {}) {
  setHidden(elements.dwarfholdScreen, true);
  if (returnFocus && elements.canvasWrapper) {
    focusElement(elements.canvasWrapper);
  }
}

function drawDwarfholdMap(map) {
  const canvas = elements.dwarfholdCanvas;
  const ctx = getCanvasContext(canvas);
  if (!canvas || !ctx || !map) {
    return;
  }
  canvas.width = 640;
  canvas.height = 400;
  const tileWidth = canvas.width / map.width;
  const tileHeight = canvas.height / map.height;

  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  map.tiles.forEach((row, y) => {
    row.forEach((cell, x) => {
      const style = map.legend[cell.type] || { color: '#111827' };
      ctx.fillStyle = style.color || '#111827';
      ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth + 1, tileHeight + 1);
      if (style.borderColor) {
        ctx.strokeStyle = style.borderColor;
        ctx.strokeRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
      }
    });
  });
}

function renderDwarfholdLegend(legend) {
  if (!elements.dwarfholdLegend) {
    return;
  }
  if (!legend) {
    elements.dwarfholdLegend.innerHTML = '';
    return;
  }
  const fragment = document.createDocumentFragment();
  Object.entries(legend).forEach(([key, entry]) => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `
      <span class="legend-swatch" style="background:${entry.color}"></span>
      <div class="legend-text">
        <strong>${entry.label || key}</strong>
        <span>${entry.description || ''}</span>
      </div>
    `;
    fragment.appendChild(item);
  });
  elements.dwarfholdLegend.innerHTML = '';
  elements.dwarfholdLegend.appendChild(fragment);
}

function showStructureDetails(tile, { tileX, tileY } = {}) {
  if (!elements.structureDetailsPanel) {
    return;
  }
  structureDetailsState.visible = true;
  structureDetailsState.tile = tile;
  structureDetailsState.tileX = tileX;
  structureDetailsState.tileY = tileY;
  setHidden(elements.structureDetailsPanel, false);
  setTextContent(elements.structureDetailsTitle, tile.structureName || 'Point of Interest');
  setTextContent(elements.structureDetailsSubtitle, tile.faction || 'Unaligned');
  elements.structureDetailsContent.innerHTML = `
    <p>${tile.structureName || 'Unknown location'} sits at coordinates (${tileX}, ${tileY}).</p>
    <p>Biome: ${tile.biome}</p>
    <p>Elevation: ${tile.elevation} ft</p>
    <p>Temperature: ${tile.temperature}°C</p>
  `;
  setActiveStructureDetailsTab(structureDetailsState.activeTab);
  focusElement(elements.structureDetailsPanel);
}

function hideStructureDetails({ returnFocus = false } = {}) {
  if (!structureDetailsState.visible) {
    return;
  }
  structureDetailsState.visible = false;
  structureDetailsState.tile = null;
  setHidden(elements.structureDetailsPanel, true);
  if (returnFocus && elements.canvasWrapper) {
    focusElement(elements.canvasWrapper);
  }
}

function setActiveStructureDetailsTab(tabId) {
  if (!elements.structureDetailsTabs) {
    return;
  }
  structureDetailsState.activeTab = tabId;
  elements.structureDetailsTabs.forEach((tab) => {
    if (!tab) {
      return;
    }
    const active = tab.getAttribute('data-tab-id') === tabId;
    tab.classList.toggle('active', active);
  });
}

function refreshOverlayToggleButtons() {
  const setPressed = (button, pressed) => {
    if (!button) {
      return;
    }
    button.setAttribute('aria-pressed', pressed ? 'true' : 'false');
    button.classList.toggle('active', pressed);
  };
  setPressed(elements.politicalBordersToggle, state.ui.showPoliticalBorders);
  setPressed(elements.politicalInfluenceToggle, state.ui.showPoliticalInfluence);
  setPressed(elements.elevationToggle, state.ui.showElevation);
  setPressed(elements.biomeToggle, state.ui.showBiomes);
  setPressed(elements.temperatureToggle, state.ui.showTemperature);
  setPressed(elements.locationLabelToggle, state.ui.showLocationLabels);
  const highlightToggle = elements.structureHighlightToggle;
  if (highlightToggle) {
    const highlightState = ensureStructureHighlightState();
    highlightToggle.setAttribute('aria-expanded', highlightState.menuOpen ? 'true' : 'false');
  }
  const mapEditorToggle = elements.mapEditorToggle;
  if (mapEditorToggle) {
    mapEditorToggle.setAttribute('aria-pressed', state.mapEditor.enabled ? 'true' : 'false');
    mapEditorToggle.setAttribute('aria-expanded', state.mapEditor.enabled ? 'true' : 'false');
  }
}

function refreshStructureHighlightControls() {
  const menu = elements.structureHighlightMenu;
  const toggle = elements.structureHighlightToggle;
  const highlightState = ensureStructureHighlightState();
  if (!menu) {
    return;
  }
  if (!menu.dataset.initialised) {
    menu.innerHTML = '';
    STRUCTURE_HIGHLIGHT_OPTIONS.forEach((option) => {
      const id = `highlight-${option.key}`;
      const wrapper = document.createElement('label');
      wrapper.className = 'structure-highlight-option';
      wrapper.htmlFor = id;
      wrapper.innerHTML = `
        <input type="checkbox" id="${id}" data-highlight-type="${option.key}" />
        <span>${option.label}</span>
      `;
      menu.appendChild(wrapper);
    });
    menu.dataset.initialised = 'true';
  }
  STRUCTURE_HIGHLIGHT_OPTIONS.forEach((option) => {
    const checkbox = menu.querySelector(`input[data-highlight-type="${option.key}"]`);
    if (checkbox) {
      checkbox.checked = highlightState[option.key] !== false;
    }
  });
  menu.setAttribute('aria-hidden', highlightState.menuOpen ? 'false' : 'true');
  menu.classList.toggle('hidden', !highlightState.menuOpen);
  if (toggle) {
    toggle.textContent = highlightState.menuOpen ? 'Hide Highlights' : 'Show Highlights';
  }
}

function openOptionsScreen(mode = 'title') {
  if (!elements.optionsScreen) {
    return;
  }
  elements.optionsScreen.dataset.mode = mode;
  setHidden(elements.optionsScreen, false);
  focusElement(elements.closeOptions);
}

function closeOptionsScreen() {
  setHidden(elements.optionsScreen, true);
}

function isOptionsVisible() {
  return Boolean(elements.optionsScreen && !elements.optionsScreen.classList.contains('hidden'));
}

function updateRosterUI() {
  renderActiveDwarf();
  if (elements.dwarfSlotLabel) {
    elements.dwarfSlotLabel.textContent = `Dwarf ${state.activeDwarfIndex + 1} of ${state.dwarfRoster.length}`;
  }
}

function createDefaultDwarf(index = 0) {
  return {
    name: `Founder ${index + 1}`,
    gender: index % 2 === 0 ? 'male' : 'female',
    clan: DWARF_CLANS[index % DWARF_CLANS.length],
    profession: DWARF_PROFESSIONS[index % DWARF_PROFESSIONS.length],
    skin: 0,
    eyes: 0,
    hair: 0,
    hairStyle: 0,
    beard: 0
  };
}

function ensureRoster() {
  if (state.dwarfRoster.length === 0) {
    for (let i = 0; i < 7; i += 1) {
      state.dwarfRoster.push(createDefaultDwarf(i));
    }
  }
}

function setActiveDwarfIndex(index) {
  ensureRoster();
  state.activeDwarfIndex = clamp(index, 0, state.dwarfRoster.length - 1);
  updateRosterUI();
}

function changeActiveDwarf(direction) {
  setActiveDwarfIndex(state.activeDwarfIndex + direction);
}

function randomiseActiveDwarf() {
  ensureRoster();
  const dwarf = state.dwarfRoster[state.activeDwarfIndex];
  if (!dwarf) {
    return;
  }
  const rng = createRng(hashString(`${Date.now()}:${state.activeDwarfIndex}`));
  dwarf.name = `${pick(DWARF_NAME_PREFIXES, rng) || 'Dur'}${pick(DWARF_NAME_SUFFIXES, rng) || 'in'}`;
  dwarf.gender = rng() > 0.5 ? 'male' : 'female';
  dwarf.clan = pick(DWARF_CLANS, rng) || dwarf.clan;
  dwarf.profession = pick(DWARF_PROFESSIONS, rng) || dwarf.profession;
  dwarf.skin = randomInt(rng, 0, dwarfTraitOptions.skin.length - 1);
  dwarf.eyes = randomInt(rng, 0, dwarfTraitOptions.eyes.length - 1);
  dwarf.hair = randomInt(rng, 0, dwarfTraitOptions.hair.length - 1);
  dwarf.hairStyle = randomInt(rng, 0, dwarfTraitOptions.hairStyle.length - 1);
  dwarf.beard = randomInt(rng, 0, dwarfTraitOptions.beard.length - 1);
  updateRosterUI();
}

function updateDwarfTrait(trait, value) {
  ensureRoster();
  const dwarf = state.dwarfRoster[state.activeDwarfIndex];
  if (!dwarf) {
    return;
  }
  if (['skin', 'eyes', 'hair', 'hairStyle', 'beard'].includes(trait)) {
    const numeric = Number.parseInt(value, 10);
    dwarf[trait] = clamp(Number.isFinite(numeric) ? numeric : 0, 0, (dwarfTraitOptions[trait] || []).length - 1);
  } else {
    dwarf[trait] = value;
  }
  renderActiveDwarf();
}

function renderActiveDwarf() {
  ensureRoster();
  const dwarf = state.dwarfRoster[state.activeDwarfIndex];
  if (!dwarf) {
    return;
  }
  if (elements.dwarfNameInput) {
    elements.dwarfNameInput.value = dwarf.name;
  }
  if (elements.dwarfClanSelect) {
    elements.dwarfClanSelect.value = dwarf.clan;
  }
  if (elements.dwarfProfessionSelect) {
    elements.dwarfProfessionSelect.value = dwarf.profession;
  }
  if (elements.dwarfTraitSummary) {
    elements.dwarfTraitSummary.textContent = `${dwarf.name} of Clan ${dwarf.clan} — ${dwarf.profession}`;
  }
  if (elements.dwarfTraitAttributes) {
    elements.dwarfTraitAttributes.innerHTML = `
      <p>Skin tone: ${dwarfTraitOptions.skin[dwarf.skin]}</p>
      <p>Eye colour: ${dwarfTraitOptions.eyes[dwarf.eyes]}</p>
      <p>Hair: ${dwarfTraitOptions.hair[dwarf.hair]} (${dwarfTraitOptions.hairStyle[dwarf.hairStyle]})</p>
      <p>Beard: ${dwarfTraitOptions.beard[dwarf.beard]}</p>
    `;
  }
  if (elements.dwarfGenderButtons) {
    const buttons = elements.dwarfGenderButtons.querySelectorAll('[data-gender-value]');
    buttons.forEach((button) => {
      const active = button.dataset.genderValue === dwarf.gender;
      button.classList.toggle('active', active);
      button.setAttribute('aria-checked', active ? 'true' : 'false');
    });
  }
  if (elements.dwarfSkinSlider) {
    elements.dwarfSkinSlider.max = dwarfTraitOptions.skin.length - 1;
    elements.dwarfSkinSlider.value = dwarf.skin;
  }
  if (elements.dwarfEyeSlider) {
    elements.dwarfEyeSlider.max = dwarfTraitOptions.eyes.length - 1;
    elements.dwarfEyeSlider.value = dwarf.eyes;
  }
  if (elements.dwarfHairSlider) {
    elements.dwarfHairSlider.max = dwarfTraitOptions.hair.length - 1;
    elements.dwarfHairSlider.value = dwarf.hair;
  }
  if (elements.dwarfHairStyleSlider) {
    elements.dwarfHairStyleSlider.max = dwarfTraitOptions.hairStyle.length - 1;
    elements.dwarfHairStyleSlider.value = dwarf.hairStyle;
  }
  if (elements.dwarfBeardSlider) {
    elements.dwarfBeardSlider.max = dwarfTraitOptions.beard.length - 1;
    elements.dwarfBeardSlider.value = dwarf.beard;
  }
  if (elements.dwarfBeardFieldGroup) {
    const hidden = dwarf.gender === 'female';
    elements.dwarfBeardFieldGroup.classList.toggle('hidden', hidden);
  }
}

function setupTraitSliderControl(trait, slider, label) {
  if (!slider) {
    return;
  }
  slider.addEventListener('input', (event) => {
    updateDwarfTrait(trait, event.target.value);
    if (label) {
      const options = dwarfTraitOptions[trait];
      if (options) {
        const index = clamp(Number.parseInt(event.target.value, 10) || 0, 0, options.length - 1);
        label.textContent = options[index];
      }
    }
  });
}

function openDwarfCustomizer() {
  setHidden(elements.worldInfoModal, true);
  setHidden(elements.dwarfCustomizer, false);
  state.dwarfCustomizerVisible = true;
  ensureRoster();
  updateRosterUI();
  focusElement(elements.dwarfCustomizer);
}

function closeDwarfCustomizer({ returnFocus = false } = {}) {
  setHidden(elements.dwarfCustomizer, true);
  state.dwarfCustomizerVisible = false;
  if (returnFocus && elements.worldInfoModal) {
    setHidden(elements.worldInfoModal, false);
    focusElement(elements.worldInfoModal);
  }
}

function isDwarfCustomizerVisible() {
  return state.dwarfCustomizerVisible;
}

function closeWorldInfoModal({ returnFocus = false } = {}) {
  setHidden(elements.worldInfoModal, true);
  setHidden(elements.titleScreen, false);
  if (returnFocus) {
    focusElement(elements.startButton);
  }
}

function openWorldInfoModal() {
  setHidden(elements.titleScreen, true);
  setHidden(elements.worldInfoModal, false);
  focusElement(elements.worldInfoModal);
}

function beginGame() {
  closeDwarfCustomizer();
  generateWorld();
  drawWorld(state.currentWorld);
  updateSeedDisplay();
  setHidden(elements.gameContainer, false);
  setHidden(elements.titleScreen, true);
  setHidden(elements.loadingScreen, true);
  focusElement(elements.canvasWrapper || elements.canvas);
}

function handleRegenerate() {
  generateWorld();
  drawWorld(state.currentWorld);
  updateSeedDisplay();
}

function ensureMusicStarted() {
  if (state.music.started) {
    if (!state.music.playing) {
      playCurrentTrack();
    }
    return;
  }
  state.music.started = true;
  state.music.playing = true;
  playCurrentTrack();
}

function getCurrentTrack() {
  if (MUSIC_TRACKS.length === 0) {
    return null;
  }
  state.music.currentTrackIndex = clamp(state.music.currentTrackIndex, 0, MUSIC_TRACKS.length - 1);
  return MUSIC_TRACKS[state.music.currentTrackIndex];
}

function playCurrentTrack() {
  const audio = elements.audioElement;
  if (!audio) {
    return;
  }
  const track = getCurrentTrack();
  if (!track) {
    return;
  }
  audio.src = track.file;
  audio.loop = true;
  audio.volume = Number.parseFloat(elements.musicVolume?.value || '0.5');
  audio.play().catch(() => {});
  state.music.playing = true;
  updateNowPlaying(track.title);
}

function updateNowPlaying(title) {
  getMusicNowPlayingDisplays().forEach((display) => {
    display.textContent = title ? `Now playing: ${title}` : '';
  });
}

function stopMusic() {
  const audio = elements.audioElement;
  if (!audio) {
    return;
  }
  audio.pause();
  state.music.playing = false;
  updateNowPlaying('');
}

function setupMusicControls() {
  getMusicToggleElements().forEach((button) => {
    button.addEventListener('click', () => {
      if (!state.music.started || !state.music.playing) {
        ensureMusicStarted();
        button.textContent = 'Pause Music';
        button.setAttribute('aria-pressed', 'true');
      } else {
        stopMusic();
        button.textContent = 'Play Music';
        button.setAttribute('aria-pressed', 'false');
      }
    });
  });
  getMusicVolumeInputs().forEach((input) => {
    input.addEventListener('input', () => {
      if (elements.audioElement) {
        elements.audioElement.volume = Number.parseFloat(input.value);
      }
    });
  });
}

function playSoundEffect(effect) {
  if (!effect) {
    return;
  }
  if (effect instanceof HTMLAudioElement) {
    effect.currentTime = 0;
    effect.play().catch(() => {});
  } else if (typeof effect.play === 'function') {
    try {
      effect.play();
    } catch (error) {
      // ignore playback errors
    }
  }
}

function toggleMapEditor() {
  state.mapEditor.enabled = !state.mapEditor.enabled;
  if (elements.mapEditorPanel) {
    setHidden(elements.mapEditorPanel, !state.mapEditor.enabled);
  }
  refreshOverlayToggleButtons();
  return state.mapEditor.enabled;
}

function closeMapEditor({ returnFocus = false } = {}) {
  state.mapEditor.enabled = false;
  if (elements.mapEditorPanel) {
    setHidden(elements.mapEditorPanel, true);
  }
  refreshOverlayToggleButtons();
  if (returnFocus && elements.mapEditorToggle) {
    focusElement(elements.mapEditorToggle);
  }
}

function setMapEditorTerrainKey(value) {
  state.mapEditor.terrainKey = value;
}

function setMapEditorStructureKey(value) {
  state.mapEditor.structureKey = value;
}

function setMapEditorApplyTerrain(value) {
  state.mapEditor.applyTerrain = Boolean(value);
}

function setMapEditorApplyStructure(value) {
  state.mapEditor.applyStructure = Boolean(value);
}

function setMapEditorBrushSize(value) {
  const numeric = Number.parseInt(value, 10);
  state.mapEditor.brushSize = clamp(Number.isFinite(numeric) ? numeric : 1, 1, 5);
}

function clearMapEditorStructure() {
  state.mapEditor.structureKey = '';
  if (elements.mapEditorStructureInput) {
    elements.mapEditorStructureInput.value = '';
  }
}

function toggleDwarfTest(mode, { trigger } = {}) {
  const area = elements.dwarfTestArea;
  if (!area) {
    return;
  }
  if (state.dwarfTest.active && state.dwarfTest.mode === mode) {
    closeDwarfTest({ returnFocus: true });
    return;
  }
  state.dwarfTest.active = true;
  state.dwarfTest.mode = mode;
  setHidden(area, false);
  focusElement(area);
  if (trigger) {
    trigger.setAttribute('aria-pressed', 'true');
  }
}

function isDwarfTestActive() {
  return state.dwarfTest.active;
}

function closeDwarfTest({ returnFocus = false } = {}) {
  state.dwarfTest.active = false;
  const area = elements.dwarfTestArea;
  if (area) {
    setHidden(area, true);
  }
  if (returnFocus && elements.dwarfTestButton) {
    focusElement(elements.dwarfTestButton);
  }
}

function updateSeedDisplay() {
  if (elements.seedDisplay) {
    elements.seedDisplay.textContent = `Seed: ${state.settings.seedString}`;
  }
}

function setupStartScreen() {
  if (elements.titleScreen) {
    elements.titleScreen.setAttribute('aria-hidden', 'false');
  }
  elements.startButton?.addEventListener('click', (event) => {
    event.preventDefault();
    openWorldInfoModal();
    updateWorldInfoSizeDisplay();
    updateWorldInfoGenerationTypeDisplay();
    updateWorldInfoSeedDisplay();
    updateChronologyDisplay();
  });
  elements.worldInfoCancel?.addEventListener('click', (event) => {
    event.preventDefault();
    closeWorldInfoModal({ returnFocus: true });
  });
  elements.worldInfoForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const chronology = getSanitisedChronologyFromInputs();
    state.worldChronology = chronology;
    state.worldName = elements.worldNameInput?.value?.trim() || state.worldName;
    ensureSeedString(elements.worldSeedInput?.value || state.settings.seedString);
    openDwarfCustomizer();
  });
  elements.dwarfCustomizerForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    beginGame();
    ensureMusicStarted();
  });
  elements.dwarfBack?.addEventListener('click', (event) => {
    event.preventDefault();
    closeDwarfCustomizer({ returnFocus: true });
  });
}

function applyMapEditorAction(tileX, tileY) {
  const world = state.currentWorld;
  if (!world) {
    return;
  }
  const radius = state.mapEditor.brushSize - 1;
  for (let dy = -radius; dy <= radius; dy += 1) {
    for (let dx = -radius; dx <= radius; dx += 1) {
      const x = clamp(tileX + dx, 0, world.width - 1);
      const y = clamp(tileY + dy, 0, world.height - 1);
      const tile = getWorldTile(x, y);
      if (!tile) {
        continue;
      }
      if (state.mapEditor.applyTerrain && state.mapEditor.terrainKey) {
        tile.terrain = state.mapEditor.terrainKey.toLowerCase();
      }
      if (state.mapEditor.applyStructure) {
        tile.structure = state.mapEditor.structureKey || null;
        tile.structureName = state.mapEditor.structureKey ? `${state.mapEditor.structureKey} ${x},${y}` : null;
        tile.structureCategory = state.mapEditor.structureKey ? 'dwarfholds' : null;
      }
    }
  }
  drawWorld(world, { preserveView: true });
}

function handleCanvasPointer(event) {
  const world = state.currentWorld;
  const canvas = elements.canvas;
  if (!world || !canvas) {
    return;
  }
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(((event.clientX - rect.left) / rect.width) * world.width);
  const y = Math.floor(((event.clientY - rect.top) / rect.height) * world.height);
  const tile = getWorldTile(x, y);
  if (event.type === 'pointermove') {
    updateTooltip(tile, event.clientX, event.clientY);
  }
  if (event.type === 'pointerleave') {
    updateTooltip(null);
  }
  if (event.type === 'click' && tile) {
    if (state.mapEditor.enabled) {
      applyMapEditorAction(x, y);
      return;
    }
    showLocalViewAt(x, y);
  }
  if (event.type === 'contextmenu') {
    event.preventDefault();
    if (!tile || !tile.structure) {
      hideStructureContextMenu();
      return;
    }
    showStructureContextMenu(tile, x, y, event.clientX, event.clientY);
  }
}

function attachCanvasEvents() {
  const canvas = elements.canvas;
  if (!canvas) {
    return;
  }
  canvas.addEventListener('pointermove', handleCanvasPointer);
  canvas.addEventListener('pointerleave', handleCanvasPointer);
  canvas.addEventListener('click', handleCanvasPointer);
  canvas.addEventListener('contextmenu', handleCanvasPointer);
}

function setupFrequencyControls() {
  updateFrequencyDisplay(elements.forestFrequencyInput, elements.forestFrequencyValue);
  updateFrequencyDisplay(elements.mountainFrequencyInput, elements.mountainFrequencyValue);
  updateFrequencyDisplay(elements.riverFrequencyInput, elements.riverFrequencyValue);
  updateFrequencyDisplay(elements.humanSettlementFrequencyInput, elements.humanSettlementFrequencyValue);
  updateFrequencyDisplay(elements.dwarfSettlementFrequencyInput, elements.dwarfSettlementFrequencyValue);
  updateFrequencyDisplay(elements.woodElfSettlementFrequencyInput, elements.woodElfSettlementFrequencyValue);
  updateFrequencyDisplay(elements.lizardmenSettlementFrequencyInput, elements.lizardmenSettlementFrequencyValue);
}

function loadImage(sheet) {
  return new Promise((resolve, reject) => {
    if (!sheet || !sheet.path) {
      resolve(sheet);
      return;
    }
    const image = new Image();
    image.src = sheet.path;
    image.onload = () => resolve({ ...sheet, image });
    image.onerror = reject;
  });
}

function trackAssetProgress(current, total) {
  state.loading.loaded = current;
  state.loading.total = total;
  const percent = total === 0 ? 0 : Math.round((current / total) * 100);
  if (elements.loadingProgressFill) {
    elements.loadingProgressFill.style.width = `${percent}%`;
  }
  if (elements.loadingProgressBar) {
    elements.loadingProgressBar.setAttribute('aria-valuenow', String(percent));
  }
  if (elements.loadingStatus) {
    elements.loadingStatus.textContent = percent >= 100 ? 'Assets ready!' : 'Loading realm assets…';
  }
}

async function preloadAssets() {
  const sheets = [
    ...Object.values(tileSheets),
    ...Object.values(dwarfSpriteSheets),
    ...Object.values(orcSpriteSheets),
    ...Object.values(dungeonPlayerSpriteSheets),
    ...Object.values(characterCreatorPortraitAssets)
  ];
  let loaded = 0;
  trackAssetProgress(loaded, sheets.length);
  for (const sheet of sheets) {
    try {
      const result = await loadImage(sheet);
      if (result && sheet) {
        sheet.image = result.image;
      }
    } catch (error) {
      // ignore asset load failures for now
    }
    loaded += 1;
    trackAssetProgress(loaded, sheets.length);
  }
}

function initializeSoundToggles() {
  if (elements.sfxToggle) {
    elements.sfxToggle.addEventListener('click', () => {
      const pressed = elements.sfxToggle.getAttribute('aria-pressed') === 'true';
      const next = !pressed;
      elements.sfxToggle.setAttribute('aria-pressed', next ? 'true' : 'false');
      elements.sfxToggle.textContent = next ? 'Sound Effects On' : 'Sound Effects Off';
    });
  }
  if (elements.musicToggleGame) {
    elements.musicToggleGame.addEventListener('click', () => {
      if (!state.music.started || !state.music.playing) {
        ensureMusicStarted();
        elements.musicToggleGame.textContent = 'Pause Music';
      } else {
        stopMusic();
        elements.musicToggleGame.textContent = 'Play Music';
      }
    });
  }
}

function bindOptionForm() {
  if (!elements.optionsForm) {
    return;
  }
  elements.optionsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    state.settings.mapSize = elements.mapSizeSelect?.value || state.settings.mapSize;
    setWorldGenerationType(elements.worldGenerationTypeSelect?.value || state.settings.worldGenerationType);
    state.settings.seedString = elements.seedInput?.value?.trim() || state.settings.seedString;
    state.settings.forestFrequency = sanitizeFrequencyValue(elements.forestFrequencyInput?.value);
    state.settings.mountainFrequency = sanitizeFrequencyValue(elements.mountainFrequencyInput?.value);
    state.settings.riverFrequency = sanitizeFrequencyValue(elements.riverFrequencyInput?.value);
    state.settings.humanSettlementFrequency = sanitizeFrequencyValue(elements.humanSettlementFrequencyInput?.value);
    state.settings.dwarfSettlementFrequency = sanitizeFrequencyValue(elements.dwarfSettlementFrequencyInput?.value);
    state.settings.woodElfSettlementFrequency = sanitizeFrequencyValue(elements.woodElfSettlementFrequencyInput?.value);
    state.settings.lizardmenSettlementFrequency = sanitizeFrequencyValue(elements.lizardmenSettlementFrequencyInput?.value);
    updateFrequencyDisplay(elements.forestFrequencyInput, elements.forestFrequencyValue);
    updateFrequencyDisplay(elements.mountainFrequencyInput, elements.mountainFrequencyValue);
    updateFrequencyDisplay(elements.riverFrequencyInput, elements.riverFrequencyValue);
    updateFrequencyDisplay(elements.humanSettlementFrequencyInput, elements.humanSettlementFrequencyValue);
    updateFrequencyDisplay(elements.dwarfSettlementFrequencyInput, elements.dwarfSettlementFrequencyValue);
    updateFrequencyDisplay(elements.woodElfSettlementFrequencyInput, elements.woodElfSettlementFrequencyValue);
    updateFrequencyDisplay(elements.lizardmenSettlementFrequencyInput, elements.lizardmenSettlementFrequencyValue);
    closeOptionsScreen();
    handleRegenerate();
  });
}

const defaultForestFrequency = DEFAULT_WORLD_SETTINGS.forestFrequency;
const defaultMountainFrequency = DEFAULT_WORLD_SETTINGS.mountainFrequency;

function exposeTraitControls() {
  setupTraitSliderControl('skin', elements.dwarfSkinSlider, elements.dwarfSkinSliderValue);
  setupTraitSliderControl('eyes', elements.dwarfEyeSlider, elements.dwarfEyeSliderValue);
  setupTraitSliderControl('hairStyle', elements.dwarfHairStyleSlider, elements.dwarfHairStyleSliderValue);
  setupTraitSliderControl('hair', elements.dwarfHairSlider, elements.dwarfHairSliderValue);
  setupTraitSliderControl('beard', elements.dwarfBeardSlider, elements.dwarfBeardSliderValue);
}

function attachTitleScreenShortcuts() {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOptionsVisible()) {
      closeOptionsScreen();
    }
  });
}

async function initialise() {
  setupStartScreen();
  setupMusicControls();
  initializeSoundToggles();
  bindOptionForm();
  setupFrequencyControls();
  attachCanvasEvents();
  exposeTraitControls();
  refreshOverlayToggleButtons();
  refreshStructureHighlightControls();
  updateSeedDisplay();
  attachTitleScreenShortcuts();

  attachEvents(elements, {
    structureContextMenuState,
    hideStructureContextMenu,
    openOptionsScreen,
    closeOptionsScreen,
    hideStructureDetails,
    showLocalViewAt,
    showDwarfholdInterior,
    showStructureDetails,
    hideLocalView,
    adjustLocalMapZoom,
    resetLocalMapZoom,
    closeDwarfholdInterior,
    state,
    refreshOverlayToggleButtons,
    refreshStructureHighlightControls,
    ensureStructureHighlightState,
    drawWorld,
    updateFrequencyDisplay,
    sanitizeFrequencyValue,
    defaultForestFrequency,
    defaultMountainFrequency,
    ensureSeedString,
    getRandomWorldName,
    getSanitisedChronologyFromInputs,
    generateRandomChronology,
    updateChronologyDisplay,
    openDwarfCustomizer,
    closeWorldInfoModal,
    applyMapSizePresetToState,
    getMapSizePreset,
    handleRegenerate,
    changeActiveDwarf,
    randomiseActiveDwarf,
    playSoundEffect,
    soundEffects: state.soundEffects,
    ensureMusicStarted,
    beginGame,
    updateDwarfTrait,
    setupTraitSliderControl,
    isDwarfCustomizerVisible,
    closeDwarfCustomizer,
    toggleDwarfTest,
    isDwarfTestActive,
    closeDwarfTest,
    structureDetailsState,
    setActiveStructureDetailsTab,
    isOptionsVisible,
    updateWorldInfoSeedDisplay,
    updateWorldInfoSizeDisplay,
    updateWorldInfoGenerationTypeDisplay,
    setWorldGenerationType,
    toggleMapEditor,
    closeMapEditor,
    setMapEditorTerrainKey,
    setMapEditorStructureKey,
    setMapEditorApplyTerrain,
    setMapEditorApplyStructure,
    setMapEditorBrushSize,
    clearMapEditorStructure
  });

  await preloadAssets();
  generateWorld();
  drawWorld(state.currentWorld);
}

initialise().catch((error) => {
  console.error('Failed to initialise Dwarfhold:', error);
});

