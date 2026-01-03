const noop = () => {};

function normalizeMapSize(size = {}) {
  if (!size || typeof size !== 'object') {
    return { key: '', width: 0, height: 0 };
  }
  const width = Number.isFinite(size.width) ? size.width : 0;
  const height = Number.isFinite(size.height) ? size.height : 0;
  const key = typeof size.key === 'string' ? size.key : '';
  return { key, width, height };
}

export function createStateModule(options = {}) {
  const {
    tileSheets = {},
    defaultMapSize = {},
    defaultForestFrequency = 50,
    defaultMountainFrequency = 50,
    defaultWorldGenerationType = 'normal',
    localViewConfig = {},
    structureHighlightTypeKeys = []
  } = options;

  const { key: mapSizeKey, width: mapWidth, height: mapHeight } = normalizeMapSize(defaultMapSize);
  const defaultLocalZoom = Number.isFinite(localViewConfig?.defaultZoom)
    ? localViewConfig.defaultZoom
    : 1;

  const highlightKeys = Array.isArray(structureHighlightTypeKeys) ? structureHighlightTypeKeys : [];

  function createDefaultStructureHighlightState() {
    const baseState = { menuOpen: false };
    highlightKeys.forEach((key) => {
      baseState[key] = false;
    });
    return baseState;
  }

  const state = {
    settings: {
      mapSize: mapSizeKey,
      width: mapWidth,
      height: mapHeight,
      seedString: '',
      lastSeedString: '',
      forestFrequency: Number.isFinite(defaultForestFrequency) ? defaultForestFrequency : 50,
      mountainFrequency: Number.isFinite(defaultMountainFrequency) ? defaultMountainFrequency : 50,
      riverFrequency: 50,
      humanSettlementFrequency: 50,
      dwarfSettlementFrequency: 50,
      woodElfSettlementFrequency: 50,
      lizardmenSettlementFrequency: 50,
      worldGenerationType: defaultWorldGenerationType
    },
    tileSheets: tileSheets || {},
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
      structureHighlights: createDefaultStructureHighlightState()
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
      zoom: defaultLocalZoom || 1
    },
    dwarfholdView: {
      active: false,
      map: null,
      tileX: null,
      tileY: null,
      structure: null
    }
  };

  function ensureStructureHighlightState() {
    if (!state.ui.structureHighlights || typeof state.ui.structureHighlights !== 'object') {
      state.ui.structureHighlights = createDefaultStructureHighlightState();
      return state.ui.structureHighlights;
    }
    const highlightState = state.ui.structureHighlights;
    if (typeof highlightState.menuOpen !== 'boolean') {
      highlightState.menuOpen = false;
    }
    highlightKeys.forEach((key) => {
      if (typeof highlightState[key] !== 'boolean') {
        highlightState[key] = false;
      }
    });
    return highlightState;
  }

  return {
    state,
    ensureStructureHighlightState
  };
}
