const drawSize = 32;

const tileSheets = {
  base: {
    key: 'base',
    path: 'Dwarf.Fortress/data/vanilla/vanilla_world_map/graphics/images/world_map_tiles.png',
    tileSize: 16,
    image: null
  },
  details: {
    key: 'details',
    path: 'Dwarf.Fortress/data/vanilla/vanilla_world_map/graphics/images/world_map_details.png',
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
  }
};

const baseTileCoords = {
  GRASSLAND_TEMP: { row: 0, col: 2 },
  GRASSLAND_TEMP_EVIL: { row: 0, col: 7 },
  GRASSLAND_TEMP_GOOD: { row: 0, col: 17 },
  GRASSLAND_TEMP_EVILSAV: { row: 0, col: 12 },
  GRASSLAND_TEMP_GOODSAV: { row: 0, col: 22 },
  GRASSLAND_TROP: { row: 1, col: 2 },
  GRASSLAND_TROP_EVIL: { row: 1, col: 7 },
  GRASSLAND_TROP_GOOD: { row: 1, col: 17 },
  GRASSLAND_TROP_EVILSAV: { row: 1, col: 12 },
  GRASSLAND_TROP_GOODSAV: { row: 1, col: 22 },
  HILLS: { row: 2, col: 2 },
  HILLS_EVIL: { row: 2, col: 7 },
  HILLS_GOOD: { row: 2, col: 17 },
  HILLS_EVILSAV: { row: 2, col: 12 },
  HILLS_GOODSAV: { row: 2, col: 22 },
  SHRUBLAND: { row: 3, col: 2 },
  SHRUBLAND_EVIL: { row: 3, col: 7 },
  SHRUBLAND_GOOD: { row: 3, col: 17 },
  SHRUBLAND_EVILSAV: { row: 3, col: 12 },
  SHRUBLAND_GOODSAV: { row: 3, col: 22 },
  MARSH: { row: 4, col: 2 },
  MARSH_EVIL: { row: 4, col: 7 },
  MARSH_GOOD: { row: 4, col: 17 },
  MARSH_EVILSAV: { row: 4, col: 12 },
  MARSH_GOODSAV: { row: 4, col: 22 },
  SWAMP: { row: 5, col: 2 },
  SWAMP_EVIL: { row: 5, col: 7 },
  SWAMP_GOOD: { row: 5, col: 17 },
  SWAMP_EVILSAV: { row: 5, col: 12 },
  SWAMP_GOODSAV: { row: 5, col: 22 },
  SAVANNA_TROP: { row: 6, col: 2 },
  SAVANNA_TROP_EVIL: { row: 6, col: 7 },
  SAVANNA_TROP_GOOD: { row: 6, col: 17 },
  SAVANNA_TROP_EVILSAV: { row: 6, col: 12 },
  SAVANNA_TROP_GOODSAV: { row: 6, col: 22 },
  SAVANNA_TEMP: { row: 7, col: 2 },
  SAVANNA_TEMP_EVIL: { row: 7, col: 7 },
  SAVANNA_TEMP_GOOD: { row: 7, col: 17 },
  SAVANNA_TEMP_EVILSAV: { row: 7, col: 12 },
  SAVANNA_TEMP_GOODSAV: { row: 7, col: 22 },
  BADLANDS: { row: 8, col: 2 },
  BADLANDS_EVIL: { row: 8, col: 7 },
  BADLANDS_GOOD: { row: 8, col: 17 },
  BADLANDS_EVILSAV: { row: 8, col: 12 },
  BADLANDS_GOODSAV: { row: 8, col: 22 },
  ROCKY_HILLS: { row: 9, col: 2 },
  ROCKY_HILLS_EVIL: { row: 9, col: 7 },
  ROCKY_HILLS_GOOD: { row: 9, col: 17 },
  ROCKY_HILLS_EVILSAV: { row: 9, col: 12 },
  ROCKY_HILLS_GOODSAV: { row: 9, col: 22 },
  ROCKY_PLAINS: { row: 10, col: 2 },
  ROCKY_PLAINS_EVIL: { row: 10, col: 7 },
  ROCKY_PLAINS_GOOD: { row: 10, col: 17 },
  ROCKY_PLAINS_EVILSAV: { row: 10, col: 12 },
  ROCKY_PLAINS_GOODSAV: { row: 10, col: 22 },
  SAND_DESERT: { row: 11, col: 2 },
  SAND_DESERT_EVIL: { row: 11, col: 7 },
  SAND_DESERT_GOOD: { row: 11, col: 17 },
  SAND_DESERT_EVILSAV: { row: 11, col: 12 },
  SAND_DESERT_GOODSAV: { row: 11, col: 22 },
  BEACH: { row: 12, col: 2 },
  BEACH_EVIL: { row: 12, col: 7 },
  BEACH_GOOD: { row: 12, col: 17 },
  BEACH_EVILSAV: { row: 12, col: 12 },
  BEACH_GOODSAV: { row: 12, col: 22 },
  TUNDRA: { row: 13, col: 2 },
  TUNDRA_EVIL: { row: 13, col: 7 },
  TUNDRA_GOOD: { row: 13, col: 17 },
  TUNDRA_EVILSAV: { row: 13, col: 12 },
  TUNDRA_GOODSAV: { row: 13, col: 22 },
  GLACIER: { row: 14, col: 2 },
  GLACIER_EVIL: { row: 14, col: 7 },
  GLACIER_GOOD: { row: 14, col: 17 },
  GLACIER_EVILSAV: { row: 14, col: 12 },
  GLACIER_GOODSAV: { row: 14, col: 22 },
  FROZEN_OCEAN: { row: 15, col: 2 },
  FROZEN_OCEAN_EVIL: { row: 15, col: 7 },
  FROZEN_OCEAN_GOOD: { row: 15, col: 17 },
  FROZEN_OCEAN_EVILSAV: { row: 15, col: 12 },
  FROZEN_OCEAN_GOODSAV: { row: 15, col: 22 },
  LAKE: { row: 16, col: 2 },
  LAKE_EVIL: { row: 16, col: 7 },
  LAKE_GOOD: { row: 16, col: 17 },
  LAKE_EVILSAV: { row: 16, col: 12 },
  LAKE_GOODSAV: { row: 16, col: 22 },
  OCEAN: { row: 17, col: 2 },
  OCEAN_EVIL: { row: 17, col: 7 },
  OCEAN_GOOD: { row: 17, col: 17 },
  OCEAN_EVILSAV: { row: 17, col: 12 },
  OCEAN_GOODSAV: { row: 17, col: 22 },
  OCEAN_DEEP: { row: 18, col: 2 },
  OCEAN_DEEP_EVIL: { row: 18, col: 7 },
  OCEAN_DEEP_GOOD: { row: 18, col: 17 },
  OCEAN_DEEP_EVILSAV: { row: 18, col: 12 },
  OCEAN_DEEP_GOODSAV: { row: 18, col: 22 }
};

const detailTileCoords = {
  RIVER_0: { row: 11, col: 4 },
  RIVER_N: { row: 12, col: 4 },
  RIVER_S: { row: 13, col: 4 },
  RIVER_W: { row: 14, col: 4 },
  RIVER_E: { row: 15, col: 4 },
  RIVER_NS: { row: 0, col: 4 },
  RIVER_WE: { row: 1, col: 4 },
  RIVER_NE: { row: 4, col: 4 },
  RIVER_NW: { row: 5, col: 4 },
  RIVER_SE: { row: 2, col: 4 },
  RIVER_SW: { row: 3, col: 4 },
  RIVER_NSE: { row: 6, col: 4 },
  RIVER_SWE: { row: 7, col: 4 },
  RIVER_NWE: { row: 8, col: 4 },
  RIVER_NSW: { row: 9, col: 4 },
  RIVER_NSWE: { row: 10, col: 4 }
};

const tileLookup = new Map();

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
registerTiles('details', detailTileCoords);

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
  'Shannara World',
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

function resolveTileName(baseKey, suffix) {
  const preferred = suffix ? `${baseKey}${suffix}` : baseKey;
  if (tileLookup.has(preferred)) {
    return preferred;
  }
  if (suffix && tileLookup.has(baseKey)) {
    return baseKey;
  }
  return tileLookup.has(baseKey) ? baseKey : 'OCEAN';
}

const state = {
  settings: {
    width: 200,
    height: 150,
    seedString: '',
    lastSeedString: ''
  },
  tileSheets,
  landMask: null,
  ready: false,
  worldName: '',
  worldChronology: null,
  dwarfParty: {
    dwarves: [],
    activeIndex: 0
  }
};

const defaultDwarfCount = 1;

const dwarfOptions = {
  gender: [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'nonbinary', label: 'Non-binary' }
  ],
  skin: [
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
  hair: [
    { value: 'obsidian', label: 'Obsidian Black', color: '#141015' },
    { value: 'umber', label: 'Rich Umber', color: '#3f2416' },
    { value: 'auburn', label: 'Deep Auburn', color: '#5b2813' },
    { value: 'copper', label: 'Copper Red', color: '#8c3d17' },
    { value: 'golden', label: 'Golden Wheat', color: '#b58a2f' },
    { value: 'ashen', label: 'Ashen Silver', color: '#c0c6d1' },
    { value: 'white', label: 'Snow White', color: '#f1f2f4' }
  ],
  beard: [
    { value: 'clean', label: 'Clean-shaven' },
    { value: 'short', label: 'Short Beard' },
    { value: 'full', label: 'Full Beard' },
    { value: 'braided', label: 'Braided Beard' },
    { value: 'forked', label: 'Forked Beard' },
    { value: 'mutton', label: 'Mutton Chops' }
  ]
};

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
  ],
  nonbinary: [
    'Armak',
    'Lor',
    'Egil',
    'Falk',
    'Nerin',
    'Isarn',
    'Edda',
    'Kol'
  ],
  clan: [
    'Stonebeard',
    'Ironfist',
    'Coppervein',
    'Graniteheart',
    'Deepdelver',
    'Amberpick',
    'Oakenshield',
    'Frosthammer',
    'Berylbraid',
    'Silverhollow'
  ]
};

const dwarfHairColorToFrame = {
  obsidian: { column: 2 },
  umber: { column: 6 },
  auburn: { column: 3 },
  copper: { column: 5, tint: '#b56a33' },
  golden: { column: 4 },
  ashen: { column: 1, tint: '#c0c6d1' },
  white: { column: 1 }
};

const dwarfHairStyleRows = {
  male: 4,
  female: 5,
  nonbinary: 5,
  default: 4
};

const dwarfBeardRows = {
  clean: null,
  short: 24,
  full: 26,
  braided: 29,
  forked: 23,
  mutton: 21,
  default: 26
};

const dwarfPortraitConfig = {
  tileSize: 32,
  scale: 4,
  baseFrame: { sheet: 'body', col: 4, row: 8, tint: '#5b473c', offsetY: 4 },
  headFrame: { sheet: 'eyes', col: 4, row: 0, offsetY: 0 },
  hairOffsetY: -2,
  beardOffsetY: 2,
  eyePositions: [
    { x: 13, y: 15 },
    { x: 18, y: 15 }
  ],
  eyeSize: 2
};

const dwarfPortraitState = {
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
  initialised: false
};

const elements = {
  startButton: document.getElementById('start-button'),
  titleScreen: document.getElementById('title-screen'),
  gameContainer: document.getElementById('game-container'),
  optionsButton: document.getElementById('title-options-button'),
  inGameOptions: document.getElementById('in-game-options'),
  optionsPanel: document.getElementById('options-panel'),
  closeOptions: document.getElementById('close-options'),
  optionsForm: document.getElementById('options-form'),
  regenerate: document.getElementById('regenerate-button'),
  canvas: document.getElementById('world-canvas'),
  canvasWrapper: document.querySelector('.canvas-wrapper'),
  seedDisplay: document.querySelector('.seed-display'),
  mapWidthInput: document.getElementById('map-width'),
  mapHeightInput: document.getElementById('map-height'),
  seedInput: document.getElementById('world-seed'),
  musicToggle: document.getElementById('music-toggle'),
  musicVolume: document.getElementById('music-volume'),
  musicNowPlaying: document.getElementById('music-now-playing'),
  audioElement: document.getElementById('background-music'),
  worldInfoModal: document.getElementById('world-info'),
  worldInfoForm: document.getElementById('world-info-form'),
  worldInfoSize: document.getElementById('world-info-size'),
  worldInfoSeed: document.getElementById('world-info-seed'),
  worldInfoChronology: document.getElementById('world-info-chronology'),
  worldYearInput: document.getElementById('world-year-input'),
  worldAgeInput: document.getElementById('world-age-input'),
  worldChronologyRandom: document.getElementById('world-chronology-random'),
  worldNameInput: document.getElementById('world-name-input'),
  worldNameRandom: document.getElementById('world-name-random'),
  worldInfoCancel: document.getElementById('world-info-cancel'),
  dwarfCustomizer: document.getElementById('dwarf-customizer'),
  dwarfCustomizerForm: document.getElementById('dwarf-customizer-form'),
  dwarfRosterList: document.getElementById('dwarf-roster-list'),
  dwarfRandomiseAll: document.getElementById('dwarf-randomise-all'),
  dwarfPrev: document.getElementById('dwarf-prev'),
  dwarfNext: document.getElementById('dwarf-next'),
  dwarfSlotLabel: document.getElementById('dwarf-slot-label'),
  dwarfNameInput: document.getElementById('dwarf-name-input'),
  dwarfGenderSelect: document.getElementById('dwarf-gender-select'),
  dwarfSkinSelect: document.getElementById('dwarf-skin-select'),
  dwarfEyeSelect: document.getElementById('dwarf-eye-select'),
  dwarfHairSelect: document.getElementById('dwarf-hair-select'),
  dwarfBeardSelect: document.getElementById('dwarf-beard-select'),
  dwarfRandomise: document.getElementById('dwarf-randomise'),
  dwarfBack: document.getElementById('dwarf-back'),
  dwarfPortrait: document.getElementById('dwarf-portrait'),
  dwarfPortraitCanvas: document.getElementById('dwarf-portrait-canvas'),
  dwarfTraitSummary: document.getElementById('dwarf-trait-summary')
};

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

const assetPromises = Promise.all([
  ...tileSheetPromises,
  ...dwarfSpriteSheetPromises,
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

function toggleOptions(forceState) {
  optionsVisible = typeof forceState === 'boolean' ? forceState : !optionsVisible;
  elements.optionsPanel.classList.toggle('hidden', !optionsVisible);
}

function applyFormSettings() {
  const width = clamp(parseInt(elements.mapWidthInput.value, 10) || state.settings.width, 30, 1024);
  const height = clamp(parseInt(elements.mapHeightInput.value, 10) || state.settings.height, 20, 1024);
  const seedString = (elements.seedInput.value || '').trim();

  state.settings.width = width;
  state.settings.height = height;
  state.settings.seedString = seedString;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
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
  return bucket.find((option) => option.value === value) || bucket[0];
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
  return randomChoice(dwarfNamePools.clan) || 'Stonebeard';
}

function generateDwarfName(gender) {
  const firstName = generateDwarfFirstName(gender);
  const clanName = generateDwarfClanName();
  return `${firstName} ${clanName}`;
}

function createRandomDwarf(preferredGender) {
  const genderOption = preferredGender
    ? getOptionByValue('gender', preferredGender)
    : randomChoice(dwarfOptions.gender);
  const genderValue = genderOption ? genderOption.value : dwarfOptions.gender[0].value;
  const skinOption = randomChoice(dwarfOptions.skin) || dwarfOptions.skin[0];
  const eyeOption = randomChoice(dwarfOptions.eyes) || dwarfOptions.eyes[0];
  const hairOption = randomChoice(dwarfOptions.hair) || dwarfOptions.hair[0];
  const beardOption = randomChoice(dwarfOptions.beard) || dwarfOptions.beard[0];

  return {
    name: generateDwarfName(genderValue),
    gender: genderValue,
    skin: skinOption.value,
    eyes: eyeOption.value,
    hair: hairOption.value,
    beard: beardOption.value
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

function getHairFrame(dwarf, hairOption) {
  const genderKey = dwarfHairStyleRows[dwarf.gender] !== undefined ? dwarf.gender : 'default';
  const row = dwarfHairStyleRows[genderKey] ?? dwarfHairStyleRows.default;
  const mapping = dwarfHairColorToFrame[hairOption?.value] || dwarfHairColorToFrame.obsidian;
  if (typeof row !== 'number' || !mapping || typeof mapping.column !== 'number') {
    return null;
  }
  return {
    sheet: 'hair',
    col: mapping.column,
    row,
    tint: mapping.tint || null,
    offsetY: dwarfPortraitConfig.hairOffsetY
  };
}

function getBeardFrame(beardValue, hairOption) {
  const row = dwarfBeardRows[beardValue] ?? dwarfBeardRows.default;
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

function renderDwarfPortrait(dwarf, skinOption, hairOption, eyeOption) {
  const ctx = ensurePortraitContext();
  if (!ctx) {
    return;
  }
  const canvas = dwarfPortraitState.canvas;
  if (!canvas) {
    return;
  }
  const { tileSize, scale, baseFrame, headFrame, eyePositions, eyeSize } = dwarfPortraitConfig;
  const destSize = tileSize * scale;
  const baseX = Math.floor((canvas.width - destSize) / 2);
  const baseY = Math.floor((canvas.height - destSize) / 2);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (baseFrame) {
    drawTintedSprite(ctx, baseFrame.sheet, baseFrame, baseX, baseY, scale, baseFrame.tint);
  }

  if (headFrame) {
    const skinColor = skinOption?.color || '#c59b7d';
    drawTintedSprite(ctx, headFrame.sheet, headFrame, baseX, baseY, scale, skinColor);
  }

  const hairFrame = getHairFrame(dwarf, hairOption);
  if (hairFrame) {
    drawTintedSprite(ctx, hairFrame.sheet, hairFrame, baseX, baseY, scale, hairFrame.tint);
  }

  const beardFrame = getBeardFrame(dwarf.beard || 'clean', hairOption);
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

function updateDwarfPortrait(dwarf) {
  if (!elements.dwarfPortrait || !dwarf) {
    return;
  }
  const skinOption = getOptionByValue('skin', dwarf.skin);
  const hairOption = getOptionByValue('hair', dwarf.hair);
  const eyeOption = getOptionByValue('eyes', dwarf.eyes);

  renderDwarfPortrait(dwarf, skinOption, hairOption, eyeOption);

  const beardValue = dwarf.beard || 'clean';
  const genderLabel = getOptionLabel('gender', dwarf.gender);
  const skinLabel = getOptionLabel('skin', dwarf.skin).toLowerCase();
  const hairLabel = getOptionLabel('hair', dwarf.hair).toLowerCase();
  const eyeLabel = getOptionLabel('eyes', dwarf.eyes).toLowerCase();
  const beardLabel = getOptionLabel('beard', beardValue).toLowerCase();
  const ariaDescription = `${genderLabel} dwarf with ${skinLabel} skin, ${hairLabel} hair, ${eyeLabel} eyes, and ${beardLabel}.`;
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
  const hairLabel = getOptionLabel('hair', dwarf.hair).toLowerCase();
  const beardLabel = getOptionLabel('beard', dwarf.beard).toLowerCase();
  return `${genderLabel} dwarf with ${skinLabel} skin, ${hairLabel} hair, ${eyeLabel} eyes, and ${beardLabel}.`;
}

function getDwarfDisplayName(dwarf) {
  if (!dwarf) {
    return 'Unnamed Founder';
  }
  const trimmed = (dwarf.name || '').trim();
  return trimmed || 'Unnamed Founder';
}

function updateDwarfTraitSummary() {
  if (!elements.dwarfTraitSummary) {
    return;
  }
  const dwarf = getActiveDwarf();
  elements.dwarfTraitSummary.textContent = buildDwarfSummary(dwarf);
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
    const hairLabel = getOptionLabel('hair', dwarf.hair);
    const beardLabel = getOptionLabel('beard', dwarf.beard);
    traits.textContent = `${genderLabel} • ${hairLabel} • ${beardLabel}`;

    item.appendChild(name);
    item.appendChild(traits);

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

function updateCustomizerUI() {
  ensureDwarfParty();
  const dwarf = getActiveDwarf();
  if (!dwarf) {
    return;
  }
  const total = state.dwarfParty.dwarves.length;
  if (elements.dwarfSlotLabel) {
    elements.dwarfSlotLabel.textContent = `Dwarf ${state.dwarfParty.activeIndex + 1} of ${total}`;
  }
  if (elements.dwarfNameInput) {
    elements.dwarfNameInput.value = dwarf.name;
  }

  ensureSelectValue(
    elements.dwarfGenderSelect,
    dwarf.gender,
    dwarfOptions.gender[0].value
  );
  ensureSelectValue(
    elements.dwarfSkinSelect,
    dwarf.skin,
    dwarfOptions.skin[0].value
  );
  ensureSelectValue(
    elements.dwarfEyeSelect,
    dwarf.eyes,
    dwarfOptions.eyes[0].value
  );
  ensureSelectValue(
    elements.dwarfHairSelect,
    dwarf.hair,
    dwarfOptions.hair[0].value
  );
  ensureSelectValue(
    elements.dwarfBeardSelect,
    dwarf.beard,
    dwarfOptions.beard[0].value
  );

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
  if (trait in dwarf) {
    dwarf[trait] = value;
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

function randomiseEntireParty() {
  initialiseDwarfParty();
  updateCustomizerUI();
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
  const focusTarget = elements.dwarfNameInput || elements.dwarfGenderSelect;
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

const ageWeights = Array.from({ length: 30 }, (_, index) => {
  const age = index + 1;
  if (age >= 3 && age <= 6) {
    return 12;
  }
  if (age <= 2) {
    return 4;
  }
  if (age <= 10) {
    return 6;
  }
  if (age <= 20) {
    return 3;
  }
  return 1;
});

const yearBands = [
  { min: 100, max: 5000, weight: 0.65 },
  { min: 1, max: 99, weight: 0.1 },
  { min: 5001, max: 20000, weight: 0.15 },
  { min: 20001, max: 50000, weight: 0.1 }
];

const yearBandWeights = yearBands.map((band) => band.weight);

function weightedRandomIndex(weights) {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  if (totalWeight <= 0) {
    return 0;
  }
  let roll = Math.random() * totalWeight;
  for (let i = 0; i < weights.length; i += 1) {
    roll -= weights[i];
    if (roll <= 0) {
      return i;
    }
  }
  return weights.length - 1;
}

function randomAge() {
  const index = weightedRandomIndex(ageWeights);
  return index + 1;
}

function randomYear() {
  const index = weightedRandomIndex(yearBandWeights);
  const selectedBand = yearBands[index] || yearBands[0];
  return randomInt(selectedBand.min, selectedBand.max);
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
    year >= 1 &&
    year <= 50000 &&
    age >= 1 &&
    age <= 30
  );
}

function sanitizeChronologyValues(yearValue, ageValue) {
  const safeYear = clamp(Math.round(yearValue), 1, 50000);
  const safeAge = clamp(Math.round(ageValue), 1, 30);
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
    parsedYear < 1 ||
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
  const width = state.settings.width;
  const height = state.settings.height;
  elements.worldInfoSize.textContent = `${width} × ${height} tiles`;

  const seed = ensureSeedString();
  elements.worldInfoSeed.textContent = seed;
  if (elements.seedInput) {
    elements.seedInput.value = seed;
  }

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
  wrapperSize: { width: 0, height: 0 },
  worldSize: { width: 0, height: 0 },
  hasInteracted: false
};

function applyViewTransform() {
  if (!elements.canvas) {
    return;
  }
  elements.canvas.style.transform = `translate(${viewState.translateX}px, ${viewState.translateY}px) scale(${viewState.scale})`;
}

function resetView(worldWidth, worldHeight) {
  if (!elements.canvasWrapper) {
    return;
  }
  const rect = elements.canvasWrapper.getBoundingClientRect();
  viewState.wrapperSize = { width: rect.width, height: rect.height };
  viewState.worldSize = { width: worldWidth, height: worldHeight };
  const scaleX = rect.width / worldWidth;
  const scaleY = rect.height / worldHeight;
  const fitScale = Math.min(scaleX, scaleY);
  const safeScale = Number.isFinite(fitScale) && fitScale > 0 ? fitScale : 1;
  viewState.minScale = Math.min(0.25, safeScale);
  viewState.maxScale = Math.max(6, safeScale * 8);
  viewState.scale = safeScale;
  viewState.translateX = (rect.width - worldWidth * viewState.scale) / 2;
  viewState.translateY = (rect.height - worldHeight * viewState.scale) / 2;
  viewState.hasInteracted = false;
  applyViewTransform();
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

  if (!viewState.hasInteracted) {
    const scaleX = rect.width / viewState.worldSize.width;
    const scaleY = rect.height / viewState.worldSize.height;
    const fitScale = Math.min(scaleX, scaleY);
    const safeScale = Number.isFinite(fitScale) && fitScale > 0 ? fitScale : viewState.scale;
    viewState.minScale = Math.min(0.25, safeScale);
    viewState.maxScale = Math.max(6, safeScale * 8);
    viewState.scale = safeScale;
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
}

function setupMapInteractions() {
  if (!elements.canvasWrapper) {
    return;
  }

  let isPanning = false;
  let activePointerId = null;
  const lastPosition = { x: 0, y: 0 };

  const handleWheel = (event) => {
    if (!elements.canvas) {
      return;
    }
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
    if (event.button !== undefined && event.button !== 0 && event.pointerType !== 'touch') {
      return;
    }
    event.preventDefault();
    isPanning = true;
    activePointerId = event.pointerId;
    lastPosition.x = event.clientX;
    lastPosition.y = event.clientY;
    elements.canvasWrapper.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isPanning || event.pointerId !== activePointerId) {
      return;
    }
    event.preventDefault();
    const dx = event.clientX - lastPosition.x;
    const dy = event.clientY - lastPosition.y;
    lastPosition.x = event.clientX;
    lastPosition.y = event.clientY;
    viewState.translateX += dx;
    viewState.translateY += dy;
    viewState.hasInteracted = true;
    applyViewTransform();
  };

  const handlePointerUp = (event) => {
    if (event.pointerId !== activePointerId) {
      return;
    }
    elements.canvasWrapper.releasePointerCapture(event.pointerId);
    isPanning = false;
    activePointerId = null;
  };

  const handleDoubleClick = () => {
    if (!viewState.worldSize.width || !viewState.worldSize.height) {
      return;
    }
    resetView(viewState.worldSize.width, viewState.worldSize.height);
  };

  elements.canvasWrapper.addEventListener('wheel', handleWheel, { passive: false });
  elements.canvasWrapper.addEventListener('pointerdown', handlePointerDown);
  elements.canvasWrapper.addEventListener('pointermove', handlePointerMove);
  elements.canvasWrapper.addEventListener('pointerup', handlePointerUp);
  elements.canvasWrapper.addEventListener('pointercancel', handlePointerUp);
  elements.canvasWrapper.addEventListener('dblclick', handleDoubleClick);
  window.addEventListener('resize', handleResize);
}

function updateMusicToggleLabel() {
  if (!elements.musicToggle) {
    return;
  }
  elements.musicToggle.textContent = audioState.isPlaying ? 'Pause Music' : 'Play Music';
  elements.musicToggle.setAttribute('aria-pressed', audioState.isPlaying.toString());
}

function updateNowPlaying() {
  if (!elements.musicNowPlaying || !audioState.tracks.length) {
    return;
  }
  const track = audioState.tracks[audioState.currentIndex];
  elements.musicNowPlaying.textContent = audioState.isPlaying
    ? `Now playing: ${track.title}`
    : `Ready: ${track.title}`;
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
  if (!elements.audioElement || !elements.musicToggle) {
    return;
  }
  if (!audioState.initialised) {
    loadTrack(audioState.currentIndex);
  }
  attemptPlay();
}

function setupAudioControls() {
  if (!elements.audioElement || !elements.musicToggle || !elements.musicVolume) {
    return;
  }

  const volumeValue = clamp(parseFloat(elements.musicVolume.value) || 0.5, 0, 1);
  elements.audioElement.volume = volumeValue;
  elements.musicVolume.value = volumeValue.toString();
  loadTrack(audioState.currentIndex);
  updateMusicToggleLabel();

  elements.musicVolume.addEventListener('input', (event) => {
    const newVolume = clamp(parseFloat(event.target.value), 0, 1);
    elements.audioElement.volume = Number.isNaN(newVolume) ? elements.audioElement.volume : newVolume;
  });

  elements.musicToggle.addEventListener('click', () => {
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
  });

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

function buildRiverMap(elevation, rainfall, drainage, width, height, seaLevel) {
  const riverMap = new Uint8Array(width * height);
  const candidates = [];
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const idx = y * width + x;
      const elev = elevation[idx];
      if (elev <= seaLevel + 0.02) {
        continue;
      }
      const rain = rainfall[idx];
      if (rain < 0.5) {
        continue;
      }
      const sink = 1 - drainage[idx];
      const weight = rain * rain * (elev - seaLevel) * (0.5 + sink * 0.5);
      if (weight > 0.12) {
        candidates.push({ x, y, weight });
      }
    }
  }

  candidates.sort((a, b) => b.weight - a.weight);
  const maxSources = Math.max(8, Math.floor((width * height) / 3200));
  const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]
  ];

  for (let i = 0; i < candidates.length && i < maxSources; i += 1) {
    let { x, y } = candidates[i];
    let steps = 0;
    let strength = candidates[i].weight > 0.35 ? 2 : 1;
    while (steps < width + height) {
      const idx = y * width + x;
      riverMap[idx] = Math.min(4, riverMap[idx] + strength);
      steps += 1;

      let lowestIdx = idx;
      let lowestValue = elevation[idx];
      for (let d = 0; d < directions.length; d += 1) {
        const nx = x + directions[d][0];
        const ny = y + directions[d][1];
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
          continue;
        }
        const nIdx = ny * width + nx;
        const value = elevation[nIdx] - drainage[nIdx] * 0.02;
        if (value < lowestValue) {
          lowestValue = value;
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

  return riverMap;
}

function resolveRiverTile(riverMap, width, height, x, y) {
  const idx = y * width + x;
  if (riverMap[idx] === 0) {
    return null;
  }

  const prefix = 'RIVER_';
  const neighbors = [
    { dx: 0, dy: -1, key: 'N', bit: 1 },
    { dx: 1, dy: 0, key: 'E', bit: 2 },
    { dx: 0, dy: 1, key: 'S', bit: 4 },
    { dx: -1, dy: 0, key: 'W', bit: 8 }
  ];

  let mask = 0;
  neighbors.forEach(({ dx, dy, bit }) => {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
      return;
    }
    if (riverMap[ny * width + nx] > 0) {
      mask |= bit;
    }
  });

  switch (mask) {
    case 0:
      return `${prefix}0`;
    case 1:
      return `${prefix}N`;
    case 2:
      return `${prefix}E`;
    case 4:
      return `${prefix}S`;
    case 8:
      return `${prefix}W`;
    case 1 | 4:
      return `${prefix}NS`;
    case 2 | 8:
      return `${prefix}WE`;
    case 1 | 2:
      return `${prefix}NE`;
    case 1 | 8:
      return `${prefix}NW`;
    case 2 | 4:
      return `${prefix}SE`;
    case 4 | 8:
      return `${prefix}SW`;
    case 1 | 2 | 4:
      return `${prefix}NSE`;
    case 1 | 4 | 8:
      return `${prefix}NSW`;
    case 1 | 2 | 8:
      return `${prefix}NWE`;
    case 2 | 4 | 8:
      return `${prefix}SWE`;
    case 1 | 2 | 4 | 8:
    default:
      return `${prefix}NSWE`;
  }
}

function createWorld(seedString) {
  const seedNumber = stringToSeed(seedString);
  const rng = mulberry32(seedNumber || 1);
  const width = state.settings.width;
  const height = state.settings.height;
  const size = width * height;

  const offsetX = rng() * 2048;
  const offsetY = rng() * 2048;

  const fieldSeeds = {
    elevation: Math.floor(rng() * 0xffffffff),
    rainfall: Math.floor(rng() * 0xffffffff),
    drainage: Math.floor(rng() * 0xffffffff),
    temperature: Math.floor(rng() * 0xffffffff),
    volcanism: Math.floor(rng() * 0xffffffff),
    evilness: Math.floor(rng() * 0xffffffff),
    savagery: Math.floor(rng() * 0xffffffff)
  };

  const elevation = new Float32Array(size);
  const rainfall = new Float32Array(size);
  const drainage = new Float32Array(size);
  const temperatureNoise = new Float32Array(size);
  const volcanism = new Float32Array(size);
  const evilness = new Float32Array(size);
  const savagery = new Float32Array(size);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      const sampleX = (x + offsetX) / width;
      const sampleY = (y + offsetY) / height;
      const landMaskValue = sampleLandMask((x + 0.5) / width, (y + 0.5) / height);

      const continental = octaveNoise(sampleX * 0.75, sampleY * 0.75, fieldSeeds.elevation, 5, 0.6, 1.95);
      const ridge = octaveNoise(sampleX * 2.6, sampleY * 2.6, fieldSeeds.elevation + 97, 4, 0.5, 2.35);
      const shelf = octaveNoise(sampleX * 0.22, sampleY * 0.22, fieldSeeds.elevation + 503, 3, 0.68, 1.7);
      let heightValue = continental * 0.55 + ridge * 0.35 + shelf * 0.1;

      const radialX = x / width - 0.5;
      const radialY = y / height - 0.5;
      const radialDistance = Math.sqrt(radialX * radialX + radialY * radialY);
      const radialInfluence = clamp(1 - Math.pow(radialDistance, 1.15), 0, 1);
      heightValue = lerp(heightValue, radialInfluence, 0.18) - (1 - radialInfluence) * 0.12;

      if (landMaskValue !== null) {
        heightValue = lerp(heightValue, landMaskValue, 0.45) + (landMaskValue - 0.5) * 0.08;
      }

      elevation[idx] = heightValue;
      rainfall[idx] = octaveNoise(sampleX * 1.35, sampleY * 1.35, fieldSeeds.rainfall, 5, 0.58, 2.1);
      drainage[idx] = octaveNoise(sampleX * 1.9, sampleY * 1.9, fieldSeeds.drainage, 4, 0.55, 2.35);
      temperatureNoise[idx] = octaveNoise(sampleX * 0.95, sampleY * 0.95, fieldSeeds.temperature, 4, 0.6, 2.05);
      volcanism[idx] = octaveNoise(sampleX * 2.4, sampleY * 2.4, fieldSeeds.volcanism, 3, 0.48, 2.45);
      evilness[idx] = octaveNoise(sampleX * 1.1, sampleY * 1.1, fieldSeeds.evilness, 3, 0.6, 2.25);
      savagery[idx] = octaveNoise(sampleX * 2.15, sampleY * 2.15, fieldSeeds.savagery, 4, 0.52, 2.4);
    }
  }

  normalizeField(elevation);
  applyThermalErosion(elevation, width, height, 4, 0.03);

  normalizeField(rainfall);
  normalizeField(drainage);
  normalizeField(temperatureNoise);
  normalizeField(volcanism);
  normalizeField(evilness);
  normalizeField(savagery);

  const rainShadow = applyRainShadow(elevation, rainfall, width, height);
  for (let i = 0; i < size; i += 1) {
    rainfall[i] = clamp(rainfall[i] * 0.6 + rainShadow[i] * 0.4, 0, 1);
  }

  const temperature = new Float32Array(size);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      const latitude = Math.abs((y + 0.5) / height - 0.5) * 2;
      const baseTemp = 1 - latitude;
      const altitudePenalty = Math.pow(elevation[idx], 1.4) * 0.55;
      let tempValue = baseTemp * 0.6 + temperatureNoise[idx] * 0.4 - altitudePenalty;
      tempValue += volcanism[idx] * 0.05;
      temperature[idx] = clamp(tempValue, 0, 1);
    }
  }

  const seaLevel = 0.42;
  const deepSeaLevel = 0.24;
  const beachBand = 0.035;
  const mountainSlope = 0.7;
  const mountainPeak = 0.82;

  const riverMap = buildRiverMap(elevation, rainfall, drainage, width, height, seaLevel);
  const tiles = Array.from({ length: height }, () => new Array(width));

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      const elev = elevation[idx];
      const rain = rainfall[idx];
      const drain = drainage[idx];
      const temp = temperature[idx];
      const evil = evilness[idx] * 2 - 1;
      const savage = savagery[idx];
      const dry = clamp(1 - rain + volcanism[idx] * 0.05, 0, 1);

      let baseKey;
      let suffix = determineAlignmentSuffix(evil, savage);

      if (elev < seaLevel) {
        const isFrozen = temp < 0.2;
        let landNeighbors = 0;
        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            if (dx === 0 && dy === 0) {
              continue;
            }
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              continue;
            }
            if (elevation[ny * width + nx] >= seaLevel) {
              landNeighbors += 1;
            }
          }
        }
        const isLake = landNeighbors >= 4 && elev > seaLevel - 0.05;
        if (isFrozen) {
          baseKey = 'FROZEN_OCEAN';
        } else if (isLake) {
          baseKey = 'LAKE';
        } else if (elev < deepSeaLevel) {
          baseKey = 'OCEAN_DEEP';
        } else {
          baseKey = 'OCEAN';
        }
        const resolved = resolveTileName(baseKey, suffix);
        tiles[y][x] = { base: resolved, overlay: null };
        continue;
      }

      if (elev < seaLevel + beachBand) {
        baseKey = 'BEACH';
      } else if (temp < 0.16 && elev > seaLevel + 0.1) {
        baseKey = 'GLACIER';
      } else if (temp < 0.28) {
        baseKey = 'TUNDRA';
      } else if (elev > mountainPeak) {
        baseKey = 'ROCKY_HILLS';
      } else if (elev > mountainSlope) {
        baseKey = dry > 0.55 ? 'ROCKY_HILLS' : 'HILLS';
      } else if (dry > 0.78) {
        baseKey = 'SAND_DESERT';
      } else if (dry > 0.64) {
        baseKey = temp > 0.6 ? 'SAVANNA_TROP' : 'SAVANNA_TEMP';
      } else if (rain > 0.78 && drain < 0.45) {
        baseKey = temp > 0.6 ? 'SWAMP' : 'MARSH';
      } else if (rain > 0.72) {
        baseKey = 'SHRUBLAND';
      } else if (dry > 0.58 && drain > 0.62) {
        baseKey = 'ROCKY_PLAINS';
      } else if (dry > 0.52) {
        baseKey = 'BADLANDS';
      } else {
        baseKey = temp > 0.6 ? 'GRASSLAND_TROP' : 'GRASSLAND_TEMP';
      }

      const resolved = resolveTileName(baseKey, suffix);
      tiles[y][x] = { base: resolved, overlay: null };
    }
  }

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const riverTile = resolveRiverTile(riverMap, width, height, x, y);
      if (riverTile && tileLookup.has(riverTile)) {
        tiles[y][x].overlay = riverTile;
      }
    }
  }

  const finalSeed = seedString && seedString.trim().length ? seedString.trim() : generateSeedString(seedNumber);
  return { tiles, seedString: finalSeed };
}

function generateSeedString(seedNumber) {
  return seedNumber.toString(16).padStart(8, '0');
}

function drawWorld(world) {
  const { tiles, seedString } = world;
  const height = tiles.length;
  const width = tiles[0].length;
  const ctx = elements.canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  elements.canvas.width = width * drawSize;
  elements.canvas.height = height * drawSize;
  const pixelWidth = width * drawSize;
  const pixelHeight = height * drawSize;
  elements.canvas.style.width = `${pixelWidth}px`;
  elements.canvas.style.height = `${pixelHeight}px`;

  resetView(pixelWidth, pixelHeight);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const cell = tiles[y][x];
      const baseDefinition = tileLookup.get(cell.base) || tileLookup.get('OCEAN');
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

      if (cell.overlay) {
        const overlayDefinition = tileLookup.get(cell.overlay);
        if (!overlayDefinition) {
          continue;
        }
        const overlaySheet = state.tileSheets[overlayDefinition.sheet];
        if (!overlaySheet || !overlaySheet.image) {
          continue;
        }
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

  state.settings.lastSeedString = seedString;
  state.settings.seedString = seedString;
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
  const world = createWorld(seedToUse);
  drawWorld(world);
  elements.seedInput.value = world.seedString;
}

function randomSeedString() {
  return Math.random().toString(36).slice(2, 10);
}

function handleRegenerate() {
  const randomSeed = randomSeedString();
  state.settings.seedString = randomSeed;
  elements.seedInput.value = randomSeed;
  generateAndRender(randomSeed);
}

function syncInputsWithSettings() {
  elements.mapWidthInput.value = state.settings.width.toString();
  elements.mapHeightInput.value = state.settings.height.toString();
  elements.seedInput.value = state.settings.seedString;
}

function attachEvents() {
  elements.optionsButton.addEventListener('click', () => {
    syncInputsWithSettings();
    toggleOptions(true);
  });

  elements.inGameOptions.addEventListener('click', () => {
    syncInputsWithSettings();
    toggleOptions(true);
  });

  elements.closeOptions.addEventListener('click', () => toggleOptions(false));

  elements.optionsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    applyFormSettings();
    toggleOptions(false);
    if (!elements.gameContainer.classList.contains('hidden')) {
      generateAndRender();
    }
  });

  elements.startButton.addEventListener('click', () => {
    if (!state.ready) {
      return;
    }
    toggleOptions(false);
    openWorldInfoModal();
  });

  if (elements.worldInfoForm) {
    elements.worldInfoForm.addEventListener('submit', (event) => {
      event.preventDefault();
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
    });
  }

  if (elements.dwarfRandomiseAll) {
    elements.dwarfRandomiseAll.addEventListener('click', () => {
      randomiseEntireParty();
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

  if (elements.dwarfGenderSelect) {
    elements.dwarfGenderSelect.addEventListener('change', (event) => {
      updateDwarfTrait('gender', event.target.value);
    });
  }

  if (elements.dwarfSkinSelect) {
    elements.dwarfSkinSelect.addEventListener('change', (event) => {
      updateDwarfTrait('skin', event.target.value);
    });
  }

  if (elements.dwarfEyeSelect) {
    elements.dwarfEyeSelect.addEventListener('change', (event) => {
      updateDwarfTrait('eyes', event.target.value);
    });
  }

  if (elements.dwarfHairSelect) {
    elements.dwarfHairSelect.addEventListener('change', (event) => {
      updateDwarfTrait('hair', event.target.value);
    });
  }

  if (elements.dwarfBeardSelect) {
    elements.dwarfBeardSelect.addEventListener('change', (event) => {
      updateDwarfTrait('beard', event.target.value);
    });
  }

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
      if (isDwarfCustomizerVisible()) {
        closeDwarfCustomizer({ returnFocus: true });
        return;
      }
      if (elements.worldInfoModal && !elements.worldInfoModal.classList.contains('hidden')) {
        closeWorldInfoModal({ returnFocus: true });
        return;
      }
      toggleOptions(false);
    }
  });
}

attachEvents();

function initialise() {
  syncInputsWithSettings();
  setupAudioControls();
  setupMapInteractions();
  handleResize();
}

initialise();
