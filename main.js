// Replacement main.js that wires up the interactive title flow.
// The original bundled script in this repository was truncated which
// prevented the UI from responding to any input (including the Start Game
// button). This version re-implements the high level screen flow and a set of
// lightweight helpers so the experience works again without the original
// build output.

const elements = {
  startButton: document.getElementById('start-button'),
  titleScreen: document.getElementById('title-screen'),
  optionsButton: document.getElementById('title-options-button'),
  optionsScreen: document.getElementById('options-screen'),
  closeOptions: document.getElementById('close-options'),
  optionsForm: document.getElementById('options-form'),
  worldCanvas: document.getElementById('world-canvas'),
  mapSizeSelect: document.getElementById('map-size'),
  worldGenerationTypeSelect: document.getElementById('world-generation-type'),
  seedInput: document.getElementById('world-seed'),
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
  sfxToggle: document.getElementById('sfx-toggle'),
  sfxVolume: document.getElementById('sfx-volume'),
  worldInfoScreen: document.getElementById('world-info'),
  worldInfoForm: document.getElementById('world-info-form'),
  worldInfoCancel: document.getElementById('world-info-cancel'),
  worldInfoSize: document.getElementById('world-info-size'),
  worldInfoGenerationType: document.getElementById('world-info-generation-type'),
  worldInfoSeed: document.getElementById('world-info-seed'),
  worldInfoChronology: document.getElementById('world-info-chronology'),
  worldYearInput: document.getElementById('world-year-input'),
  worldAgeInput: document.getElementById('world-age-input'),
  worldChronologyRandom: document.getElementById('world-chronology-random'),
  worldMapSizeSelect: document.getElementById('world-map-size-select'),
  worldInfoGenerationTypeSelect: document.getElementById('world-generation-type-select'),
  worldSeedInput: document.getElementById('world-seed-input'),
  worldNameInput: document.getElementById('world-name-input'),
  worldNameRandom: document.getElementById('world-name-random'),
  dwarfCustomizer: document.getElementById('dwarf-customizer'),
  dwarfCustomizerForm: document.getElementById('dwarf-customizer-form'),
  dwarfBack: document.getElementById('dwarf-back'),
  dwarfRandomise: document.getElementById('dwarf-randomise'),
  dwarfPrev: document.getElementById('dwarf-prev'),
  dwarfNext: document.getElementById('dwarf-next'),
  dwarfSlotLabel: document.getElementById('dwarf-slot-label'),
  dwarfNameInput: document.getElementById('dwarf-name-input'),
  dwarfGenderButtons: document.getElementById('dwarf-gender-buttons'),
  dwarfClanSelect: document.getElementById('dwarf-clan-select'),
  dwarfProfessionSelect: document.getElementById('dwarf-profession-select'),
  dwarfSkinSlider: document.getElementById('dwarf-skin-slider'),
  dwarfSkinSliderValue: document.getElementById('dwarf-skin-slider-value'),
  dwarfEyeSlider: document.getElementById('dwarf-eye-slider'),
  dwarfEyeSliderValue: document.getElementById('dwarf-eye-slider-value'),
  dwarfHairSlider: document.getElementById('dwarf-hair-slider'),
  dwarfHairSliderValue: document.getElementById('dwarf-hair-slider-value'),
  dwarfHairStyleSlider: document.getElementById('dwarf-hair-style-slider'),
  dwarfHairStyleSliderValue: document.getElementById('dwarf-hair-style-slider-value'),
  dwarfBeardSlider: document.getElementById('dwarf-beard-slider'),
  dwarfBeardSliderValue: document.getElementById('dwarf-beard-slider-value'),
  dwarfBeardFieldGroup: document.getElementById('dwarf-beard-field-group'),
  dwarfTraitSummary: document.getElementById('dwarf-trait-summary'),
  dwarfTraitAttributes: document.getElementById('dwarf-trait-attributes'),
  dwarfTestButton: document.getElementById('dwarf-test'),
  dwarfTestDungeonButton: document.getElementById('dwarf-test-dungeon'),
  dwarfTestArea: document.getElementById('dwarf-test-area'),
  gameContainer: document.getElementById('game-container'),
  seedDisplay: document.querySelector('.seed-display'),
  regenerateButton: document.getElementById('regenerate-button'),
  inGameOptions: document.getElementById('in-game-options'),
  musicToggleGame: document.getElementById('music-toggle-game'),
  musicVolumeGame: document.getElementById('music-volume-game'),
  musicNowPlayingGame: document.getElementById('music-now-playing-game'),
  loadingScreen: document.getElementById('loading-screen'),
  loadingPanel: document.querySelector('#loading-screen .loading-panel'),
  loadingStatus: document.getElementById('loading-status'),
  loadingProgress: document.getElementById('loading-progress'),
  loadingProgressFill: document.getElementById('loading-progress-fill'),
  mapEditorToggle: document.getElementById('toggle-map-editor'),
  mapEditorPanel: document.getElementById('map-editor'),
  mapEditorClose: document.getElementById('map-editor-close'),
  structureHighlightToggle: document.getElementById('toggle-structure-highlights'),
  structureHighlightMenu: document.getElementById('structure-highlight-menu'),
  mapEditorTerrainInput: document.getElementById('map-editor-terrain'),
  mapEditorStructureInput: document.getElementById('map-editor-structure'),
  mapEditorApplyTerrain: document.getElementById('map-editor-apply-terrain'),
  mapEditorApplyStructure: document.getElementById('map-editor-apply-structure'),
  mapEditorBrushSizeInput: document.getElementById('map-editor-brush-size'),
  mapEditorClearStructure: document.getElementById('map-editor-clear-structure'),
  politicalBordersToggle: document.getElementById('toggle-political-borders'),
  politicalInfluenceToggle: document.getElementById('toggle-political-influence'),
  elevationToggle: document.getElementById('toggle-elevation'),
  biomeToggle: document.getElementById('toggle-biomes'),
  temperatureToggle: document.getElementById('toggle-temperature'),
  locationLabelToggle: document.getElementById('toggle-location-labels'),
  regionNameToggle: document.getElementById('toggle-region-names')
};

const mapSizeLabels = {
  mini: 'Mini — 120 × 90',
  small: 'Small — 160 × 120',
  normal: 'Normal — 200 × 150',
  large: 'Large — 260 × 195',
  'extra-large': 'Extra Large — 320 × 240'
};

const worldGenerationLabels = {
  normal: 'Normal',
  major_continent: 'Major Continent',
  twin_continents: 'Twin Continents',
  inland_sea: 'Inland Sea',
  archipelago: 'Archipelago'
};

const frequencyDescriptors = [
  { max: 5, label: 'Minimal' },
  { max: 20, label: 'Sparse' },
  { max: 45, label: 'Low' },
  { max: 60, label: 'Balanced' },
  { max: 80, label: 'High' },
  { max: 95, label: 'Abundant' },
  { max: 100, label: 'Legendary' }
];

const worldNamePool = [
  'Stonehome',
  'Ironhaven',
  'Bronzevein',
  'Deepdelve',
  'Hammerfast',
  'Silverhold',
  'Coalwatch',
  'Anvilgard',
  'Granite Reach',
  'Obsidian Gate',
  'Vault of Echoes'
];

const dwarfNamePool = [
  'Dorin',
  'Balin',
  'Kazrik',
  'Thorgar',
  'Eldeth',
  'Maela',
  'Brynja',
  'Harbek',
  'Mardra',
  'Rurik',
  'Vistra',
  'Drogan'
];

const traitOptions = {
  skin: ['Frostfair', 'Copperglow', 'Stonebronze', 'Deep umber', 'Molten ember'],
  eyes: ['Amber', 'Hazel', 'Jade', 'Sapphire', 'Onyx'],
  hairColour: ['Chestnut', 'Coal black', 'Firebrand auburn', 'Honey flax', 'Silversteel'],
  hairStyle: ['Braided mane', 'Cavalier crest', 'Scholar waves', 'Forge braids', 'Wanderer cut'],
  beardStyle: ['Clean shaven', 'Rune braids', 'Forked beard', 'Broad plaits', 'Ring-bound beard']
};

const loadingSteps = [
  'Surveying mountain peaks…',
  'Charting river deltas…',
  'Rousing the forges…',
  'Stockpiling expedition goods…',
  'Assigning founding duties…'
];

const musicTracks = ['Mountain Echoes', 'Deepstone Overture', 'Forgeborn March', 'Runes in the Deep'];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function chooseRandom(list, avoid) {
  if (!Array.isArray(list) || list.length === 0) {
    return null;
  }
  const filtered = typeof avoid === 'undefined' ? list : list.filter((item) => item !== avoid);
  const pool = filtered.length > 0 ? filtered : list;
  return pool[Math.floor(Math.random() * pool.length)];
}

function generateSeed() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let seed = '';
  for (let index = 0; index < 8; index += 1) {
    seed += chars[Math.floor(Math.random() * chars.length)];
  }
  return seed;
}

let worldMapImagePromise = null;

function loadWorldMapImage() {
  if (!worldMapImagePromise) {
    worldMapImagePromise = new Promise((resolve, reject) => {
      const image = new Image();
      image.src = 'tilesheet/Overworld.png';
      image.addEventListener('load', () => resolve(image), { once: true });
      image.addEventListener(
        'error',
        () => {
          reject(new Error('Failed to load world map image.'));
        },
        { once: true }
      );
    });
  }
  return worldMapImagePromise;
}

async function drawWorldMap() {
  const canvas = elements.worldCanvas;
  if (!canvas || typeof canvas.getContext !== 'function') {
    return;
  }
  const context = canvas.getContext('2d');
  if (!context) {
    return;
  }
  context.imageSmoothingEnabled = false;
  context.imageSmoothingQuality = 'low';
  context.clearRect(0, 0, canvas.width, canvas.height);
  try {
    const image = await loadWorldMapImage();
    const scale = Math.min(canvas.width / image.width, canvas.height / image.height);
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    const offsetX = (canvas.width - drawWidth) / 2;
    const offsetY = (canvas.height - drawHeight) / 2;
    context.drawImage(image, 0, 0, image.width, image.height, offsetX, offsetY, drawWidth, drawHeight);
  } catch (error) {
    context.fillStyle = '#111827';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#f59e0b';
    context.font = '48px "Cormorant Garamond", serif';
    context.fillText('Map failed to load', 80, Math.min(canvas.height - 40, 140));
  }
}

function formatFrequency(value) {
  const numeric = Number.parseInt(value, 10) || 0;
  const descriptor = frequencyDescriptors.find((entry) => numeric <= entry.max)?.label ?? 'Unknown';
  return `${numeric}% — ${descriptor}`;
}

function setHidden(element, hidden) {
  if (!element) {
    return;
  }
  element.classList.toggle('hidden', hidden);
  if (hidden) {
    element.setAttribute('aria-hidden', 'true');
  } else {
    element.removeAttribute('aria-hidden');
  }
}

function setText(element, value) {
  if (!element) {
    return;
  }
  element.textContent = value;
}

function focusFirstInput(container) {
  if (!container) {
    return;
  }
  const target = container.querySelector('input, select, button, textarea');
  if (target && typeof target.focus === 'function') {
    target.focus();
  }
}

const state = {
  mapSize: elements.mapSizeSelect?.value || 'normal',
  worldGenerationType: elements.worldGenerationTypeSelect?.value || 'normal',
  seed: '',
  forestFrequency: Number(elements.forestFrequencyInput?.value) || 35,
  mountainFrequency: Number(elements.mountainFrequencyInput?.value) || 35,
  riverFrequency: Number(elements.riverFrequencyInput?.value) || 45,
  humanSettlementFrequency: Number(elements.humanSettlementFrequencyInput?.value) || 35,
  dwarfSettlementFrequency: Number(elements.dwarfSettlementFrequencyInput?.value) || 35,
  woodElfSettlementFrequency: Number(elements.woodElfSettlementFrequencyInput?.value) || 50,
  lizardmenSettlementFrequency: Number(elements.lizardmenSettlementFrequencyInput?.value) || 50,
  worldYear: 1250,
  worldAge: 6,
  worldName: worldNamePool[0],
  lastOptionsTrigger: null,
  dwarf: {
    gender: 'female',
    currentIndex: 0,
    name: dwarfNamePool[0],
    clan: elements.dwarfClanSelect?.value || 'stonebeard',
    profession: elements.dwarfProfessionSelect?.value || 'miner',
    traits: {
      skin: 2,
      eyes: 3,
      hairColour: 1,
      hairStyle: 0,
      beardStyle: 1
    }
  },
  audio: {
    isPlaying: false,
    volume: 0.5,
    isSfxEnabled: true
  },
  dwarfTest: {
    active: false,
    mode: 'overworld'
  },
  gameStarted: false
};

state.seed = generateSeed();
state.dwarf.name = dwarfNamePool[state.dwarf.currentIndex];

function updateFrequencyDisplays() {
  const pairs = [
    [elements.forestFrequencyInput, elements.forestFrequencyValue],
    [elements.mountainFrequencyInput, elements.mountainFrequencyValue],
    [elements.riverFrequencyInput, elements.riverFrequencyValue],
    [elements.humanSettlementFrequencyInput, elements.humanSettlementFrequencyValue],
    [elements.dwarfSettlementFrequencyInput, elements.dwarfSettlementFrequencyValue],
    [elements.woodElfSettlementFrequencyInput, elements.woodElfSettlementFrequencyValue],
    [elements.lizardmenSettlementFrequencyInput, elements.lizardmenSettlementFrequencyValue]
  ];
  pairs.forEach(([input, display]) => {
    if (!input || !display) {
      return;
    }
    display.textContent = formatFrequency(input.value);
  });
}

function updateWorldInfoSummary() {
  setText(elements.worldInfoSize, mapSizeLabels[state.mapSize] ?? '—');
  setText(elements.worldInfoGenerationType, worldGenerationLabels[state.worldGenerationType] ?? '—');
  setText(elements.worldInfoSeed, state.seed || 'Random');
  const chronology = `${state.worldYear.toLocaleString()} — Age ${state.worldAge}`;
  setText(elements.worldInfoChronology, chronology);
}

function updateWorldInfoFormFromState() {
  if (elements.worldYearInput) {
    elements.worldYearInput.value = state.worldYear;
  }
  if (elements.worldAgeInput) {
    elements.worldAgeInput.value = state.worldAge;
  }
  if (elements.worldMapSizeSelect) {
    elements.worldMapSizeSelect.value = state.mapSize;
  }
  if (elements.worldInfoGenerationTypeSelect) {
    elements.worldInfoGenerationTypeSelect.value = state.worldGenerationType;
  }
  if (elements.worldSeedInput) {
    elements.worldSeedInput.value = state.seed;
  }
  if (elements.worldNameInput) {
    elements.worldNameInput.value = state.worldName;
  }
}

function updateOptionsFormFromState() {
  if (elements.mapSizeSelect) {
    elements.mapSizeSelect.value = state.mapSize;
  }
  if (elements.worldGenerationTypeSelect) {
    elements.worldGenerationTypeSelect.value = state.worldGenerationType;
  }
  if (elements.seedInput) {
    elements.seedInput.value = state.seed;
  }
  if (elements.forestFrequencyInput) {
    elements.forestFrequencyInput.value = state.forestFrequency;
  }
  if (elements.mountainFrequencyInput) {
    elements.mountainFrequencyInput.value = state.mountainFrequency;
  }
  if (elements.riverFrequencyInput) {
    elements.riverFrequencyInput.value = state.riverFrequency;
  }
  if (elements.humanSettlementFrequencyInput) {
    elements.humanSettlementFrequencyInput.value = state.humanSettlementFrequency;
  }
  if (elements.dwarfSettlementFrequencyInput) {
    elements.dwarfSettlementFrequencyInput.value = state.dwarfSettlementFrequency;
  }
  if (elements.woodElfSettlementFrequencyInput) {
    elements.woodElfSettlementFrequencyInput.value = state.woodElfSettlementFrequency;
  }
  if (elements.lizardmenSettlementFrequencyInput) {
    elements.lizardmenSettlementFrequencyInput.value = state.lizardmenSettlementFrequency;
  }
  updateFrequencyDisplays();
}

function updateSeedDisplay() {
  if (elements.seedDisplay) {
    elements.seedDisplay.textContent = `Seed: ${state.seed}`;
  }
}

function openOptionsScreen(trigger) {
  state.lastOptionsTrigger = trigger ?? null;
  setHidden(elements.optionsScreen, false);
  updateOptionsFormFromState();
  focusFirstInput(elements.optionsScreen);
}

function closeOptionsScreen() {
  setHidden(elements.optionsScreen, true);
  if (state.lastOptionsTrigger && typeof state.lastOptionsTrigger.focus === 'function') {
    state.lastOptionsTrigger.focus();
  }
  state.lastOptionsTrigger = null;
}

function applyOptionsForm(form) {
  if (!form) {
    return;
  }
  const data = new FormData(form);
  state.mapSize = data.get('mapSize') || state.mapSize;
  state.worldGenerationType = data.get('worldGenerationType') || state.worldGenerationType;
  const newSeed = (data.get('worldSeed') || '').toString().trim();
  state.seed = newSeed || generateSeed();
  state.forestFrequency = Number(data.get('forestFrequency')) || state.forestFrequency;
  state.mountainFrequency = Number(data.get('mountainFrequency')) || state.mountainFrequency;
  state.riverFrequency = Number(data.get('riverFrequency')) || state.riverFrequency;
  state.humanSettlementFrequency = Number(data.get('humanSettlementFrequency')) || state.humanSettlementFrequency;
  state.dwarfSettlementFrequency = Number(data.get('dwarfSettlementFrequency')) || state.dwarfSettlementFrequency;
  state.woodElfSettlementFrequency = Number(data.get('woodElfSettlementFrequency')) || state.woodElfSettlementFrequency;
  state.lizardmenSettlementFrequency = Number(data.get('lizardmenSettlementFrequency')) || state.lizardmenSettlementFrequency;
  updateWorldInfoSummary();
  updateWorldInfoFormFromState();
  updateSeedDisplay();
  updateFrequencyDisplays();
}

function enterWorldInfo() {
  closeOptionsScreen();
  setHidden(elements.titleScreen, true);
  setHidden(elements.worldInfoScreen, false);
  updateWorldInfoSummary();
  updateWorldInfoFormFromState();
  focusFirstInput(elements.worldInfoScreen);
}

function leaveWorldInfo() {
  setHidden(elements.worldInfoScreen, true);
  setHidden(elements.titleScreen, false);
  focusFirstInput(elements.titleScreen);
}

function updateDwarfSlotLabel() {
  if (elements.dwarfSlotLabel) {
    elements.dwarfSlotLabel.textContent = '';
  }
}

function updateTraitSliderMaximums() {
  const sliderConfigs = [
    [elements.dwarfSkinSlider, traitOptions.skin.length - 1, 'skin'],
    [elements.dwarfEyeSlider, traitOptions.eyes.length - 1, 'eyes'],
    [elements.dwarfHairSlider, traitOptions.hairColour.length - 1, 'hairColour'],
    [elements.dwarfHairStyleSlider, traitOptions.hairStyle.length - 1, 'hairStyle'],
    [elements.dwarfBeardSlider, traitOptions.beardStyle.length - 1, 'beardStyle']
  ];
  sliderConfigs.forEach(([input, max, key]) => {
    if (!input) {
      return;
    }
    input.max = String(Math.max(0, max));
    const value = clamp(state.dwarf.traits[key], 0, max);
    input.value = String(value);
    state.dwarf.traits[key] = value;
  });
}

function describeTrait(key, index) {
  const options = traitOptions[key];
  if (!options) {
    return 'Unknown';
  }
  const safeIndex = clamp(index, 0, options.length - 1);
  return options[safeIndex];
}

function updateTraitSummary() {
  if (elements.dwarfTraitSummary) {
    const clanLabel = state.dwarf.clan.replace(/_/g, ' ');
    const profession = state.dwarf.profession;
    const genderTitle = state.dwarf.gender === 'female' ? 'Matron' : 'Thane';
    elements.dwarfTraitSummary.textContent = `${state.dwarf.name} — ${genderTitle} of Clan ${capitalizeWords(clanLabel)} · ${profession}`;
  }
  if (elements.dwarfTraitAttributes) {
    const traits = [
      `Skin tone: ${describeTrait('skin', state.dwarf.traits.skin)}`,
      `Eyes: ${describeTrait('eyes', state.dwarf.traits.eyes)}`,
      `Hair colour: ${describeTrait('hairColour', state.dwarf.traits.hairColour)}`,
      `Hair style: ${describeTrait('hairStyle', state.dwarf.traits.hairStyle)}`
    ];
    if (state.dwarf.gender !== 'female') {
      traits.push(`Beard: ${describeTrait('beardStyle', state.dwarf.traits.beardStyle)}`);
    }
    elements.dwarfTraitAttributes.innerHTML = traits
      .map((trait) => `<div role="listitem">${trait}</div>`)
      .join('');
  }
}

function updateTraitSliderOutputs() {
  if (elements.dwarfSkinSliderValue) {
    elements.dwarfSkinSliderValue.textContent = describeTrait('skin', state.dwarf.traits.skin);
  }
  if (elements.dwarfEyeSliderValue) {
    elements.dwarfEyeSliderValue.textContent = describeTrait('eyes', state.dwarf.traits.eyes);
  }
  if (elements.dwarfHairSliderValue) {
    elements.dwarfHairSliderValue.textContent = describeTrait('hairColour', state.dwarf.traits.hairColour);
  }
  if (elements.dwarfHairStyleSliderValue) {
    elements.dwarfHairStyleSliderValue.textContent = describeTrait('hairStyle', state.dwarf.traits.hairStyle);
  }
  if (elements.dwarfBeardSliderValue) {
    elements.dwarfBeardSliderValue.textContent = describeTrait('beardStyle', state.dwarf.traits.beardStyle);
  }
}

function updateBeardAvailability() {
  const hideBeard = state.dwarf.gender === 'female';
  setHidden(elements.dwarfBeardFieldGroup, hideBeard);
  if (elements.dwarfBeardSlider) {
    elements.dwarfBeardSlider.disabled = hideBeard;
  }
}

function capitalizeWords(value) {
  return value
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function updateDwarfNameField() {
  if (elements.dwarfNameInput) {
    elements.dwarfNameInput.value = state.dwarf.name;
  }
}

function enterDwarfCustomizer() {
  setHidden(elements.worldInfoScreen, true);
  setHidden(elements.dwarfCustomizer, false);
  updateDwarfSlotLabel();
  updateTraitSliderMaximums();
  updateTraitSliderOutputs();
  updateTraitSummary();
  updateDwarfNameField();
  focusFirstInput(elements.dwarfCustomizer);
}

function leaveDwarfCustomizer() {
  setHidden(elements.dwarfCustomizer, true);
  setHidden(elements.worldInfoScreen, false);
  focusFirstInput(elements.worldInfoScreen);
}

function toggleMusic(toggleButton, nowPlayingDisplay) {
  if (!toggleButton) {
    return;
  }
  state.audio.isPlaying = !state.audio.isPlaying;
  toggleButton.setAttribute('aria-pressed', state.audio.isPlaying ? 'true' : 'false');
  toggleButton.textContent = state.audio.isPlaying ? 'Pause Music' : 'Play Music';
  const targetDisplay = nowPlayingDisplay || elements.musicNowPlaying || elements.musicNowPlayingGame;
  if (targetDisplay) {
    if (state.audio.isPlaying) {
      const track = chooseRandom(musicTracks);
      targetDisplay.textContent = `Now playing: ${track}`;
    } else {
      targetDisplay.textContent = '';
    }
  }
}

function toggleSfx(button) {
  if (!button) {
    return;
  }
  state.audio.isSfxEnabled = !state.audio.isSfxEnabled;
  button.setAttribute('aria-pressed', state.audio.isSfxEnabled ? 'true' : 'false');
  button.textContent = state.audio.isSfxEnabled ? 'Sound Effects On' : 'Sound Effects Off';
}

function showLoadingScreen(message) {
  if (elements.loadingStatus && message) {
    elements.loadingStatus.textContent = message;
  }
  if (elements.loadingProgressFill) {
    elements.loadingProgressFill.style.width = '0%';
  }
  if (elements.loadingProgress) {
    elements.loadingProgress.setAttribute('aria-valuenow', '0');
  }
  setHidden(elements.loadingScreen, false);
  if (elements.loadingPanel) {
    elements.loadingPanel.focus?.();
  }
}

function hideLoadingScreen() {
  setHidden(elements.loadingScreen, true);
}

function runLoadingSequence(onComplete) {
  let stepIndex = 0;
  const totalSteps = loadingSteps.length;
  const advance = () => {
    if (!elements.loadingStatus || !elements.loadingProgress || !elements.loadingProgressFill) {
      return;
    }
    const status = loadingSteps[stepIndex];
    if (status) {
      elements.loadingStatus.textContent = status;
    }
    const progress = Math.round(((stepIndex + 1) / totalSteps) * 100);
    elements.loadingProgress.setAttribute('aria-valuenow', String(progress));
    elements.loadingProgressFill.style.width = `${progress}%`;
    stepIndex += 1;
    if (stepIndex >= totalSteps) {
      clearInterval(timer);
      setTimeout(() => {
        onComplete?.();
      }, 300);
    }
  };
  advance();
  const timer = setInterval(() => {
    if (stepIndex >= totalSteps) {
      clearInterval(timer);
      return;
    }
    advance();
  }, 600);
}

function showGameScreen() {
  hideLoadingScreen();
  setHidden(elements.titleScreen, true);
  setHidden(elements.worldInfoScreen, true);
  setHidden(elements.dwarfCustomizer, true);
  setHidden(elements.gameContainer, false);
  updateSeedDisplay();
  void drawWorldMap();
  state.gameStarted = true;
}

function beginGameFlow() {
  showLoadingScreen('Forging your realm…');
  runLoadingSequence(() => {
    showGameScreen();
  });
}

function regenerateWorld() {
  showLoadingScreen('Regenerating realm…');
  runLoadingSequence(() => {
    showGameScreen();
  });
}

function togglePressedButton(button, { onLabel, offLabel }) {
  if (!button) {
    return;
  }
  const isPressed = button.getAttribute('aria-pressed') === 'true';
  const nextState = !isPressed;
  button.setAttribute('aria-pressed', nextState ? 'true' : 'false');
  if (onLabel && offLabel) {
    button.textContent = nextState ? offLabel : onLabel;
  }
  return nextState;
}

function toggleStructureHighlightMenu() {
  if (!elements.structureHighlightToggle || !elements.structureHighlightMenu) {
    return;
  }
  const expanded = elements.structureHighlightToggle.getAttribute('aria-expanded') === 'true';
  const nextState = !expanded;
  elements.structureHighlightToggle.setAttribute('aria-expanded', nextState ? 'true' : 'false');
  setHidden(elements.structureHighlightMenu, !nextState);
  if (nextState) {
    elements.structureHighlightMenu.focus?.();
  }
}

function closeStructureHighlightMenu() {
  if (!elements.structureHighlightToggle || !elements.structureHighlightMenu) {
    return;
  }
  elements.structureHighlightToggle.setAttribute('aria-expanded', 'false');
  setHidden(elements.structureHighlightMenu, true);
}

function openMapEditor(trigger) {
  if (!elements.mapEditorPanel || !elements.mapEditorToggle) {
    return;
  }
  elements.mapEditorToggle.setAttribute('aria-pressed', 'true');
  elements.mapEditorToggle.setAttribute('aria-expanded', 'true');
  setHidden(elements.mapEditorPanel, false);
  elements.mapEditorPanel.dataset.returnFocus = trigger ? 'true' : 'false';
  focusFirstInput(elements.mapEditorPanel);
}

function closeMapEditor({ restoreFocus = true } = {}) {
  if (!elements.mapEditorPanel || !elements.mapEditorToggle) {
    return;
  }
  elements.mapEditorToggle.setAttribute('aria-pressed', 'false');
  elements.mapEditorToggle.setAttribute('aria-expanded', 'false');
  setHidden(elements.mapEditorPanel, true);
  if (restoreFocus && typeof elements.mapEditorToggle.focus === 'function') {
    elements.mapEditorToggle.focus();
  }
}

function toggleDwarfTest(mode) {
  if (!elements.dwarfTestArea) {
    return;
  }
  if (state.dwarfTest.active && state.dwarfTest.mode === mode) {
    state.dwarfTest.active = false;
  } else {
    state.dwarfTest.active = true;
    state.dwarfTest.mode = mode;
  }
  setHidden(elements.dwarfTestArea, !state.dwarfTest.active);
  if (state.dwarfTest.active) {
    elements.dwarfTestArea.setAttribute('data-mode', mode);
  } else {
    elements.dwarfTestArea.removeAttribute('data-mode');
  }
  if (elements.dwarfTestButton) {
    elements.dwarfTestButton.setAttribute('aria-pressed', state.dwarfTest.active && mode === 'overworld' ? 'true' : 'false');
  }
  if (elements.dwarfTestDungeonButton) {
    elements.dwarfTestDungeonButton.setAttribute('aria-pressed', state.dwarfTest.active && mode === 'dungeon' ? 'true' : 'false');
  }
}

function bindOptionEvents() {
  if (elements.optionsButton) {
    elements.optionsButton.addEventListener('click', () => openOptionsScreen(elements.optionsButton));
  }
  if (elements.inGameOptions) {
    elements.inGameOptions.addEventListener('click', () => openOptionsScreen(elements.inGameOptions));
  }
  if (elements.closeOptions) {
    elements.closeOptions.addEventListener('click', () => closeOptionsScreen());
  }
  if (elements.optionsForm) {
    elements.optionsForm.addEventListener('submit', (event) => {
      event.preventDefault();
      applyOptionsForm(elements.optionsForm);
      closeOptionsScreen();
    });
  }
  if (elements.seedInput) {
    elements.seedInput.addEventListener('input', (event) => {
      const value = event.target.value.trim();
      state.seed = value.toUpperCase();
      updateWorldInfoSummary();
    });
  }
  const sliderInputs = [
    elements.forestFrequencyInput,
    elements.mountainFrequencyInput,
    elements.riverFrequencyInput,
    elements.humanSettlementFrequencyInput,
    elements.dwarfSettlementFrequencyInput,
    elements.woodElfSettlementFrequencyInput,
    elements.lizardmenSettlementFrequencyInput
  ];
  sliderInputs.forEach((input) => {
    input?.addEventListener('input', () => {
      updateFrequencyDisplays();
    });
  });
  if (elements.musicToggle) {
    elements.musicToggle.addEventListener('click', () => toggleMusic(elements.musicToggle, elements.musicNowPlaying));
  }
  if (elements.musicToggleGame) {
    elements.musicToggleGame.addEventListener('click', () => toggleMusic(elements.musicToggleGame, elements.musicNowPlayingGame));
  }
  if (elements.sfxToggle) {
    elements.sfxToggle.addEventListener('click', () => toggleSfx(elements.sfxToggle));
  }
}

function bindWorldInfoEvents() {
  if (elements.startButton) {
    elements.startButton.addEventListener('click', () => {
      enterWorldInfo();
    });
  }
  if (elements.worldInfoCancel) {
    elements.worldInfoCancel.addEventListener('click', () => {
      leaveWorldInfo();
    });
  }
  if (elements.worldInfoForm) {
    elements.worldInfoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      state.worldYear = Number(elements.worldYearInput?.value) || state.worldYear;
      state.worldAge = Number(elements.worldAgeInput?.value) || state.worldAge;
      state.mapSize = elements.worldMapSizeSelect?.value || state.mapSize;
      state.worldGenerationType = elements.worldInfoGenerationTypeSelect?.value || state.worldGenerationType;
      const submittedSeed = elements.worldSeedInput?.value.trim();
      state.seed = submittedSeed || state.seed || generateSeed();
      const submittedName = elements.worldNameInput?.value.trim();
      if (submittedName) {
        state.worldName = submittedName;
      }
      updateWorldInfoSummary();
      enterDwarfCustomizer();
    });
  }
  if (elements.worldChronologyRandom) {
    elements.worldChronologyRandom.addEventListener('click', () => {
      state.worldYear = Math.floor(500 + Math.random() * 2500);
      state.worldAge = Math.floor(2 + Math.random() * 10);
      updateWorldInfoSummary();
      updateWorldInfoFormFromState();
      elements.worldYearInput?.focus();
    });
  }
  if (elements.worldNameRandom) {
    elements.worldNameRandom.addEventListener('click', () => {
      state.worldName = chooseRandom(worldNamePool, state.worldName) || state.worldName;
      updateWorldInfoFormFromState();
      elements.worldNameInput?.focus();
      elements.worldNameInput?.select();
    });
  }
  if (elements.worldSeedInput) {
    elements.worldSeedInput.addEventListener('input', (event) => {
      const value = event.target.value.trim().toUpperCase();
      state.seed = value;
      updateWorldInfoSummary();
    });
  }
}

function randomiseDwarf() {
  state.dwarf.gender = Math.random() < 0.5 ? 'female' : 'male';
  state.dwarf.currentIndex = Math.floor(Math.random() * dwarfNamePool.length);
  state.dwarf.name = dwarfNamePool[state.dwarf.currentIndex];
  state.dwarf.clan = elements.dwarfClanSelect?.options[Math.floor(Math.random() * elements.dwarfClanSelect.options.length)]?.value || state.dwarf.clan;
  state.dwarf.profession = elements.dwarfProfessionSelect?.options[Math.floor(Math.random() * elements.dwarfProfessionSelect.options.length)]?.value || state.dwarf.profession;
  state.dwarf.traits.skin = Math.floor(Math.random() * traitOptions.skin.length);
  state.dwarf.traits.eyes = Math.floor(Math.random() * traitOptions.eyes.length);
  state.dwarf.traits.hairColour = Math.floor(Math.random() * traitOptions.hairColour.length);
  state.dwarf.traits.hairStyle = Math.floor(Math.random() * traitOptions.hairStyle.length);
  state.dwarf.traits.beardStyle = Math.floor(Math.random() * traitOptions.beardStyle.length);
  updateBeardAvailability();
  updateTraitSliderMaximums();
  updateTraitSliderOutputs();
  updateTraitSummary();
  updateDwarfNameField();
  if (elements.dwarfClanSelect) {
    elements.dwarfClanSelect.value = state.dwarf.clan;
  }
  if (elements.dwarfProfessionSelect) {
    elements.dwarfProfessionSelect.value = state.dwarf.profession;
  }
}

function bindDwarfCustomizerEvents() {
  if (elements.dwarfBack) {
    elements.dwarfBack.addEventListener('click', () => {
      leaveDwarfCustomizer();
    });
  }
  if (elements.dwarfRandomise) {
    elements.dwarfRandomise.addEventListener('click', () => {
      randomiseDwarf();
      elements.dwarfRandomise.classList.add('randomise-button__dice--rolled');
      setTimeout(() => {
        elements.dwarfRandomise.classList.remove('randomise-button__dice--rolled');
      }, 600);
    });
  }
  if (elements.dwarfPrev) {
    elements.dwarfPrev.addEventListener('click', () => {
      state.dwarf.currentIndex = (state.dwarf.currentIndex - 1 + dwarfNamePool.length) % dwarfNamePool.length;
      state.dwarf.name = dwarfNamePool[state.dwarf.currentIndex];
      updateDwarfNameField();
      updateTraitSummary();
    });
  }
  if (elements.dwarfNext) {
    elements.dwarfNext.addEventListener('click', () => {
      state.dwarf.currentIndex = (state.dwarf.currentIndex + 1) % dwarfNamePool.length;
      state.dwarf.name = dwarfNamePool[state.dwarf.currentIndex];
      updateDwarfNameField();
      updateTraitSummary();
    });
  }
  if (elements.dwarfNameInput) {
    elements.dwarfNameInput.addEventListener('input', (event) => {
      const value = event.target.value.trim();
      state.dwarf.name = value || dwarfNamePool[state.dwarf.currentIndex];
      updateTraitSummary();
    });
  }
  if (elements.dwarfGenderButtons) {
    elements.dwarfGenderButtons.addEventListener('click', (event) => {
      const button = event.target.closest('[data-gender-value]');
      if (!button || !elements.dwarfGenderButtons.contains(button)) {
        return;
      }
      const gender = button.getAttribute('data-gender-value');
      state.dwarf.gender = gender;
      Array.from(elements.dwarfGenderButtons.querySelectorAll('[data-gender-value]')).forEach((entry) => {
        const isActive = entry === button;
        entry.setAttribute('aria-checked', isActive ? 'true' : 'false');
      });
      updateBeardAvailability();
      updateTraitSummary();
    });
  }
  const traitBindings = [
    [elements.dwarfSkinSlider, 'skin'],
    [elements.dwarfEyeSlider, 'eyes'],
    [elements.dwarfHairSlider, 'hairColour'],
    [elements.dwarfHairStyleSlider, 'hairStyle'],
    [elements.dwarfBeardSlider, 'beardStyle']
  ];
  traitBindings.forEach(([input, key]) => {
    input?.addEventListener('input', (event) => {
      state.dwarf.traits[key] = Number(event.target.value) || 0;
      updateTraitSliderOutputs();
      updateTraitSummary();
    });
  });
  if (elements.dwarfClanSelect) {
    elements.dwarfClanSelect.addEventListener('change', (event) => {
      state.dwarf.clan = event.target.value;
      updateTraitSummary();
    });
  }
  if (elements.dwarfProfessionSelect) {
    elements.dwarfProfessionSelect.addEventListener('change', (event) => {
      state.dwarf.profession = event.target.value;
      updateTraitSummary();
    });
  }
  if (elements.dwarfCustomizerForm) {
    elements.dwarfCustomizerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      beginGameFlow();
    });
  }
  if (elements.dwarfTestButton) {
    elements.dwarfTestButton.addEventListener('click', () => {
      toggleDwarfTest('overworld');
    });
  }
  if (elements.dwarfTestDungeonButton) {
    elements.dwarfTestDungeonButton.addEventListener('click', () => {
      toggleDwarfTest('dungeon');
    });
  }
}

function bindGameControls() {
  if (elements.regenerateButton) {
    elements.regenerateButton.addEventListener('click', () => {
      regenerateWorld();
    });
  }
  const overlayButtons = [
    [elements.politicalBordersToggle, 'Show Borders', 'Hide Borders'],
    [elements.politicalInfluenceToggle, 'Show Cultural Influence', 'Hide Cultural Influence'],
    [elements.elevationToggle, 'Show Elevation', 'Hide Elevation'],
    [elements.biomeToggle, 'Show Biomes', 'Hide Biomes'],
    [elements.temperatureToggle, 'Show Temperature', 'Hide Temperature'],
    [elements.locationLabelToggle, 'Show Location Labels', 'Hide Location Labels'],
    [elements.regionNameToggle, 'Show Region Names', 'Hide Region Names']
  ];
  overlayButtons.forEach(([button, onLabel, offLabel]) => {
    button?.addEventListener('click', () => {
      togglePressedButton(button, { onLabel, offLabel });
    });
  });
  if (elements.mapEditorToggle) {
    elements.mapEditorToggle.addEventListener('click', () => {
      const isPressed = elements.mapEditorToggle.getAttribute('aria-pressed') === 'true';
      if (isPressed) {
        closeMapEditor({ restoreFocus: false });
      } else {
        openMapEditor(elements.mapEditorToggle);
      }
    });
  }
  if (elements.mapEditorClose) {
    elements.mapEditorClose.addEventListener('click', () => closeMapEditor());
  }
  if (elements.mapEditorClearStructure) {
    elements.mapEditorClearStructure.addEventListener('click', () => {
      if (elements.mapEditorStructureInput) {
        elements.mapEditorStructureInput.value = '';
      }
    });
  }
  if (elements.structureHighlightToggle) {
    elements.structureHighlightToggle.addEventListener('click', () => {
      toggleStructureHighlightMenu();
    });
  }
  document.addEventListener('click', (event) => {
    if (!elements.structureHighlightMenu || !elements.structureHighlightToggle) {
      return;
    }
    if (
      event.target === elements.structureHighlightMenu ||
      elements.structureHighlightMenu.contains(event.target) ||
      event.target === elements.structureHighlightToggle ||
      elements.structureHighlightToggle.contains(event.target)
    ) {
      return;
    }
    closeStructureHighlightMenu();
  });
}

function bindGlobalShortcuts() {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (elements.optionsScreen && !elements.optionsScreen.classList.contains('hidden')) {
        closeOptionsScreen();
        event.stopPropagation();
        return;
      }
      if (elements.mapEditorPanel && !elements.mapEditorPanel.classList.contains('hidden')) {
        closeMapEditor();
        event.stopPropagation();
        return;
      }
      if (elements.structureHighlightMenu && !elements.structureHighlightMenu.classList.contains('hidden')) {
        closeStructureHighlightMenu();
        event.stopPropagation();
      }
    }
  });
}

function initialise() {
  updateFrequencyDisplays();
  updateWorldInfoSummary();
  updateOptionsFormFromState();
  updateSeedDisplay();
  loadWorldMapImage().catch(() => {
    // The map will show a fallback message if the image fails to load.
  });
  updateDwarfSlotLabel();
  updateTraitSliderMaximums();
  updateTraitSliderOutputs();
  updateTraitSummary();
  bindOptionEvents();
  bindWorldInfoEvents();
  bindDwarfCustomizerEvents();
  bindGameControls();
  bindGlobalShortcuts();
}

initialise();
