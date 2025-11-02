import { tileSheets, baseTileCoords } from '../assets.js';
import {
  defaultMapSize,
  defaultForestFrequency,
  defaultMountainFrequency,
  defaultWorldGenerationType,
  applyMapSizePreset
} from '../world/config.js';
import { clamp } from '../utils/math.js';

export const mapEditorBrushConfig = {
  min: 1,
  max: 9
};

const mapEditorTerrainSuggestionKeys = (() => {
  const coords = baseTileCoords && typeof baseTileCoords === 'object' ? baseTileCoords : {};
  const keys = Object.keys(coords);
  const normalized = keys
    .map((key) => (typeof key === 'string' ? key.trim().toUpperCase() : ''))
    .filter(Boolean);
  const unique = Array.from(new Set(normalized));
  unique.sort();
  return unique;
})();

let structureHighlightKeys = [];

export function setStructureHighlightKeys(keys) {
  structureHighlightKeys = Array.isArray(keys) ? keys.filter((key) => typeof key === 'string' && key) : [];
  structureHighlightKeys = Array.from(new Set(structureHighlightKeys));
  structureHighlightKeys.sort();
  state.ui.structureHighlights = createDefaultStructureHighlightState();
}

export function getDefaultMapEditorTerrainKey() {
  if (mapEditorTerrainSuggestionKeys.length > 0) {
    return mapEditorTerrainSuggestionKeys.includes('GRASS')
      ? 'GRASS'
      : mapEditorTerrainSuggestionKeys[0];
  }
  return '';
}

export function normalizeTileKey(value) {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim().toUpperCase();
}

export function normalizeStructureKey(value) {
  const normalized = normalizeTileKey(value);
  if (!normalized || normalized === 'NONE' || normalized === 'NULL') {
    return '';
  }
  return normalized;
}

export function createDefaultStructureHighlightState() {
  const baseState = { menuOpen: false };
  structureHighlightKeys.forEach((key) => {
    baseState[key] = false;
  });
  return baseState;
}

export const state = {
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
    showTemperature: false,
    showLocationLabels: false,
    structureHighlights: createDefaultStructureHighlightState(),
    mapEditor: {
      enabled: false,
      applyTerrain: true,
      applyStructure: false,
      terrainKey: getDefaultMapEditorTerrainKey(),
      structureKey: '',
      brushSize: mapEditorBrushConfig.min
    }
  },
  currentWorld: null,
  localView: {
    active: false,
    centerX: null,
    centerY: null,
    bounds: null,
    mode: 'world',
    customMap: null,
    structure: null,
    highResolution: null,
    zoom: 1
  },
  dwarfholdView: {
    active: false,
    map: null,
    tileX: null,
    tileY: null,
    structure: null
  }
};

export function ensureStructureHighlightState() {
  if (!state.ui || typeof state.ui !== 'object') {
    state.ui = {};
  }
  if (!state.ui.structureHighlights || typeof state.ui.structureHighlights !== 'object') {
    state.ui.structureHighlights = createDefaultStructureHighlightState();
    return state.ui.structureHighlights;
  }

  const highlightState = state.ui.structureHighlights;
  if (typeof highlightState.menuOpen !== 'boolean') {
    highlightState.menuOpen = false;
  }
  structureHighlightKeys.forEach((key) => {
    if (typeof highlightState[key] !== 'boolean') {
      highlightState[key] = false;
    }
  });
  return highlightState;
}

export function ensureMapEditorState() {
  if (!state.ui || typeof state.ui !== 'object') {
    state.ui = {};
  }
  if (!state.ui.mapEditor || typeof state.ui.mapEditor !== 'object') {
    state.ui.mapEditor = {
      enabled: false,
      applyTerrain: true,
      applyStructure: false,
      terrainKey: getDefaultMapEditorTerrainKey(),
      structureKey: '',
      brushSize: mapEditorBrushConfig.min
    };
    return state.ui.mapEditor;
  }

  const mapEditor = state.ui.mapEditor;
  if (typeof mapEditor.enabled !== 'boolean') {
    mapEditor.enabled = false;
  }
  if (typeof mapEditor.applyTerrain !== 'boolean') {
    mapEditor.applyTerrain = true;
  }
  if (typeof mapEditor.applyStructure !== 'boolean') {
    mapEditor.applyStructure = false;
  }
  mapEditor.terrainKey = normalizeTileKey(mapEditor.terrainKey) || getDefaultMapEditorTerrainKey();
  mapEditor.structureKey = normalizeStructureKey(mapEditor.structureKey);
  const brushBase = Number.isFinite(mapEditor.brushSize) ? mapEditor.brushSize : mapEditorBrushConfig.min;
  mapEditor.brushSize = clamp(brushBase, mapEditorBrushConfig.min, mapEditorBrushConfig.max);
  return mapEditor;
}

export { mapEditorTerrainSuggestionKeys };

export function applyMapSizePresetToState(preset) {
  applyMapSizePreset(state.settings, preset);
}
