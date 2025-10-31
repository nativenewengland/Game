const elementDefinitions = {
  startButton: { type: 'id', selector: 'start-button' },
  titleScreen: { type: 'id', selector: 'title-screen' },
  gameContainer: { type: 'id', selector: 'game-container' },
  loadingScreen: { type: 'id', selector: 'loading-screen' },
  loadingPanel: { type: 'selector', selector: '#loading-screen .loading-panel' },
  loadingProgressBar: { type: 'id', selector: 'loading-progress' },
  loadingProgressFill: { type: 'id', selector: 'loading-progress-fill' },
  loadingStatus: { type: 'id', selector: 'loading-status' },
  optionsButton: { type: 'id', selector: 'title-options-button' },
  inGameOptions: { type: 'id', selector: 'in-game-options' },
  optionsScreen: { type: 'id', selector: 'options-screen' },
  closeOptions: { type: 'id', selector: 'close-options' },
  optionsForm: { type: 'id', selector: 'options-form' },
  regenerate: { type: 'id', selector: 'regenerate-button' },
  canvas: { type: 'id', selector: 'world-canvas' },
  canvasWrapper: { type: 'selector', selector: '.canvas-wrapper' },
  mapTooltip: { type: 'id', selector: 'world-tooltip' },
  structureContextMenu: { type: 'id', selector: 'structure-context-menu' },
  structureContextMenuBegin: { type: 'id', selector: 'structure-context-menu-begin' },
  structureContextMenuMoreInfo: { type: 'id', selector: 'structure-context-menu-more-info' },
  localMapPanel: { type: 'id', selector: 'local-map-panel' },
  localMapCanvas: { type: 'id', selector: 'local-map-canvas' },
  localMapTitle: { type: 'id', selector: 'local-map-title' },
  localMapSubtitle: { type: 'id', selector: 'local-map-subtitle' },
  localMapCoordinates: { type: 'id', selector: 'local-map-coordinates' },
  localMapClose: { type: 'id', selector: 'local-map-close' },
  localMapZoomIn: { type: 'id', selector: 'local-map-zoom-in' },
  localMapZoomOut: { type: 'id', selector: 'local-map-zoom-out' },
  localMapZoomReset: { type: 'id', selector: 'local-map-zoom-reset' },
  localMapDetails: { type: 'id', selector: 'local-map-details' },
  dwarfholdScreen: { type: 'id', selector: 'dwarfhold-screen' },
  dwarfholdCanvas: { type: 'id', selector: 'dwarfhold-canvas' },
  dwarfholdTitle: { type: 'id', selector: 'dwarfhold-title' },
  dwarfholdSubtitle: { type: 'id', selector: 'dwarfhold-subtitle' },
  dwarfholdDescription: { type: 'id', selector: 'dwarfhold-description' },
  dwarfholdFeatures: { type: 'id', selector: 'dwarfhold-features' },
  dwarfholdLegend: { type: 'id', selector: 'dwarfhold-legend' },
  dwarfholdExit: { type: 'id', selector: 'dwarfhold-exit' },
  dwarfholdCoordinates: { type: 'id', selector: 'dwarfhold-coordinates' },
  structureDetailsPanel: { type: 'id', selector: 'structure-details' },
  structureDetailsTitle: { type: 'id', selector: 'structure-details-title' },
  structureDetailsSubtitle: { type: 'id', selector: 'structure-details-subtitle' },
  structureDetailsContent: { type: 'id', selector: 'structure-details-content' },
  structureDetailsTabs: { type: 'all', selector: '.structure-details-tab' },
  structureDetailsClose: { type: 'id', selector: 'structure-details-close' },
  seedDisplay: { type: 'selector', selector: '.seed-display' },
  politicalBordersToggle: { type: 'id', selector: 'toggle-political-borders' },
  politicalInfluenceToggle: { type: 'id', selector: 'toggle-political-influence' },
  elevationToggle: { type: 'id', selector: 'toggle-elevation' },
  biomeToggle: { type: 'id', selector: 'toggle-biomes' },
  temperatureToggle: { type: 'id', selector: 'toggle-temperature' },
  locationLabelToggle: { type: 'id', selector: 'toggle-location-labels' },
  structureHighlightToggle: { type: 'id', selector: 'toggle-structure-highlights' },
  structureHighlightMenu: { type: 'id', selector: 'structure-highlight-menu' },
  mapEditorToggle: { type: 'id', selector: 'toggle-map-editor' },
  mapEditorPanel: { type: 'id', selector: 'map-editor' },
  mapEditorClose: { type: 'id', selector: 'map-editor-close' },
  mapEditorTerrainInput: { type: 'id', selector: 'map-editor-terrain' },
  mapEditorStructureInput: { type: 'id', selector: 'map-editor-structure' },
  mapEditorApplyTerrain: { type: 'id', selector: 'map-editor-apply-terrain' },
  mapEditorApplyStructure: { type: 'id', selector: 'map-editor-apply-structure' },
  mapEditorBrushSizeInput: { type: 'id', selector: 'map-editor-brush-size' },
  mapEditorClearStructure: { type: 'id', selector: 'map-editor-clear-structure' },
  mapEditorTerrainOptions: { type: 'id', selector: 'map-editor-terrain-options' },
  mapEditorStructureOptions: { type: 'id', selector: 'map-editor-structure-options' },
  mapSizeSelect: { type: 'id', selector: 'map-size' },
  worldGenerationTypeSelect: { type: 'id', selector: 'world-generation-type' },
  seedInput: { type: 'id', selector: 'world-seed' },
  worldMapSizeSelect: { type: 'id', selector: 'world-map-size-select' },
  worldSeedInput: { type: 'id', selector: 'world-seed-input' },
  forestFrequencyInput: { type: 'id', selector: 'forest-frequency' },
  forestFrequencyValue: { type: 'id', selector: 'forest-frequency-value' },
  mountainFrequencyInput: { type: 'id', selector: 'mountain-frequency' },
  mountainFrequencyValue: { type: 'id', selector: 'mountain-frequency-value' },
  riverFrequencyInput: { type: 'id', selector: 'river-frequency' },
  riverFrequencyValue: { type: 'id', selector: 'river-frequency-value' },
  humanSettlementFrequencyInput: { type: 'id', selector: 'human-settlement-frequency' },
  humanSettlementFrequencyValue: { type: 'id', selector: 'human-settlement-frequency-value' },
  dwarfSettlementFrequencyInput: { type: 'id', selector: 'dwarf-settlement-frequency' },
  dwarfSettlementFrequencyValue: { type: 'id', selector: 'dwarf-settlement-frequency-value' },
  woodElfSettlementFrequencyInput: { type: 'id', selector: 'wood-elf-settlement-frequency' },
  woodElfSettlementFrequencyValue: { type: 'id', selector: 'wood-elf-settlement-frequency-value' },
  lizardmenSettlementFrequencyInput: { type: 'id', selector: 'lizardmen-settlement-frequency' },
  lizardmenSettlementFrequencyValue: { type: 'id', selector: 'lizardmen-settlement-frequency-value' },
  musicToggle: { type: 'id', selector: 'music-toggle' },
  musicVolume: { type: 'id', selector: 'music-volume' },
  musicNowPlaying: { type: 'id', selector: 'music-now-playing' },
  musicToggleGame: { type: 'id', selector: 'music-toggle-game' },
  musicVolumeGame: { type: 'id', selector: 'music-volume-game' },
  musicNowPlayingGame: { type: 'id', selector: 'music-now-playing-game' },
  sfxToggle: { type: 'id', selector: 'sfx-toggle' },
  sfxVolume: { type: 'id', selector: 'sfx-volume' },
  audioElement: { type: 'id', selector: 'background-music' },
  structureAmbienceAudio: { type: 'id', selector: 'structure-ambience' },
  worldInfoModal: { type: 'id', selector: 'world-info' },
  worldInfoForm: { type: 'id', selector: 'world-info-form' },
  worldInfoSize: { type: 'id', selector: 'world-info-size' },
  worldInfoGenerationType: { type: 'id', selector: 'world-info-generation-type' },
  worldInfoSeed: { type: 'id', selector: 'world-info-seed' },
  worldInfoChronology: { type: 'id', selector: 'world-info-chronology' },
  worldYearInput: { type: 'id', selector: 'world-year-input' },
  worldAgeInput: { type: 'id', selector: 'world-age-input' },
  worldChronologyRandom: { type: 'id', selector: 'world-chronology-random' },
  worldInfoGenerationTypeSelect: { type: 'id', selector: 'world-generation-type-select' },
  worldNameInput: { type: 'id', selector: 'world-name-input' },
  worldNameRandom: { type: 'id', selector: 'world-name-random' },
  worldInfoCancel: { type: 'id', selector: 'world-info-cancel' },
  dwarfCustomizer: { type: 'id', selector: 'dwarf-customizer' },
  dwarfCustomizerForm: { type: 'id', selector: 'dwarf-customizer-form' },
  dwarfRosterList: { type: 'id', selector: 'dwarf-roster-list' },
  dwarfPrev: { type: 'id', selector: 'dwarf-prev' },
  dwarfNext: { type: 'id', selector: 'dwarf-next' },
  dwarfSlotLabel: { type: 'id', selector: 'dwarf-slot-label' },
  dwarfNameInput: { type: 'id', selector: 'dwarf-name-input' },
  dwarfGenderButtons: { type: 'id', selector: 'dwarf-gender-buttons' },
  dwarfClanSelect: { type: 'id', selector: 'dwarf-clan-select' },
  dwarfProfessionSelect: { type: 'id', selector: 'dwarf-profession-select' },
  dwarfSkinSlider: { type: 'id', selector: 'dwarf-skin-slider' },
  dwarfSkinSliderValue: { type: 'id', selector: 'dwarf-skin-slider-value' },
  dwarfEyeSlider: { type: 'id', selector: 'dwarf-eye-slider' },
  dwarfEyeSliderValue: { type: 'id', selector: 'dwarf-eye-slider-value' },
  dwarfHairStyleSlider: { type: 'id', selector: 'dwarf-hair-style-slider' },
  dwarfHairStyleSliderValue: { type: 'id', selector: 'dwarf-hair-style-slider-value' },
  dwarfHairSlider: { type: 'id', selector: 'dwarf-hair-slider' },
  dwarfHairSliderValue: { type: 'id', selector: 'dwarf-hair-slider-value' },
  dwarfBeardSlider: { type: 'id', selector: 'dwarf-beard-slider' },
  dwarfBeardSliderValue: { type: 'id', selector: 'dwarf-beard-slider-value' },
  dwarfBeardFieldGroup: { type: 'id', selector: 'dwarf-beard-field-group' },
  dwarfRandomise: { type: 'id', selector: 'dwarf-randomise' },
  dwarfBack: { type: 'id', selector: 'dwarf-back' },
  dwarfPortrait: { type: 'id', selector: 'dwarf-portrait' },
  dwarfPortraitCanvas: { type: 'id', selector: 'dwarf-portrait-canvas' },
  dwarfBodyPortraitCanvas: { type: 'id', selector: 'dwarf-body-portrait-canvas' },
  dwarfTestArea: { type: 'id', selector: 'dwarf-test-area' },
  dwarfTestCanvas: { type: 'id', selector: 'dwarf-test-canvas' },
  dwarfTestButton: { type: 'id', selector: 'dwarf-test' },
  dwarfTestDungeonButton: { type: 'id', selector: 'dwarf-test-dungeon' },
  dwarfTraitSummary: { type: 'id', selector: 'dwarf-trait-summary' },
  dwarfTraitAttributes: { type: 'id', selector: 'dwarf-trait-attributes' }
};

const cache = new Map();
const missingWarnings = new Set();

function hasDom() {
  return typeof document !== 'undefined' && typeof document.querySelector === 'function';
}

function isElementConnected(element) {
  if (!hasDom() || !element) {
    return false;
  }
  if (typeof element.isConnected === 'boolean') {
    return element.isConnected;
  }
  return document.contains(element);
}

function isCollectionConnected(collection) {
  if (!Array.isArray(collection)) {
    return false;
  }
  return collection.every((element) => !element || isElementConnected(element));
}

function queryElement(config) {
  switch (config.type) {
    case 'id':
      return document.getElementById(config.selector);
    case 'selector':
      return document.querySelector(config.selector);
    case 'all':
      return Array.from(document.querySelectorAll(config.selector));
    default:
      return null;
  }
}

function warnMissingElement(key, config) {
  if (missingWarnings.has(key)) {
    return;
  }
  const target = config.selector || key;
  console.warn(`UI element "${key}" could not be found for selector "${target}".`);
  missingWarnings.add(key);
}

function resolveElement(key) {
  const config = elementDefinitions[key];
  if (!config) {
    if (!missingWarnings.has(key)) {
      console.warn(`UI element "${key}" is not defined in elementDefinitions.`);
      missingWarnings.add(key);
    }
    return null;
  }

  if (!hasDom()) {
    return config.type === 'all' ? [] : null;
  }

  const cached = cache.get(key);
  const isCollection = config.type === 'all';

  if (cached) {
    if (!isCollection && isElementConnected(cached)) {
      return cached;
    }
    if (isCollection && Array.isArray(cached) && cached.length > 0 && isCollectionConnected(cached)) {
      return cached;
    }
    cache.delete(key);
  }

  const result = queryElement(config);
  if (isCollection) {
    const values = Array.isArray(result) ? result.filter(Boolean) : [];
    if (values.length === 0) {
      warnMissingElement(key, config);
      return [];
    }
    cache.set(key, values);
    missingWarnings.delete(key);
    return values;
  }

  if (!result) {
    warnMissingElement(key, config);
    return null;
  }

  cache.set(key, result);
  missingWarnings.delete(key);
  return result;
}

const elementsProxy = new Proxy(
  {},
  {
    get(_, prop) {
      if (prop === Symbol.toStringTag) {
        return 'ElementsLookup';
      }
      if (typeof prop !== 'string') {
        return undefined;
      }
      return resolveElement(prop);
    },
    has(_, prop) {
      return typeof prop === 'string' && prop in elementDefinitions;
    },
    ownKeys() {
      return Object.keys(elementDefinitions);
    },
    getOwnPropertyDescriptor(_, prop) {
      if (typeof prop === 'string' && prop in elementDefinitions) {
        return { configurable: true, enumerable: true };
      }
      return undefined;
    }
  }
);

export function getElements() {
  return elementsProxy;
}

export function getElement(key) {
  return resolveElement(key);
}

export function getMusicToggleElements() {
  return [getElement('musicToggle'), getElement('musicToggleGame')].filter(Boolean);
}

export function getMusicVolumeInputs() {
  return [getElement('musicVolume'), getElement('musicVolumeGame')].filter(Boolean);
}

export function getMusicNowPlayingDisplays() {
  return [getElement('musicNowPlaying'), getElement('musicNowPlayingGame')].filter(Boolean);
}
