const drawSize = 32;

const tileSheets = {
  base: {
    key: 'base',
    path: 'tilesheet/Overworld.png',
    tileSize: 32,
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

const baseTileCoords = {
  GRASS: { row: 0, col: 1 },
  TREE: { row: 1, col: 0 },
  WATER: { row: 1, col: 4 },
  MOUNTAIN: { row: 0, col: 3 },
  STONE: { row: 0, col: 3 },
  DWARFHOLD: { row: 1, col: 3 },
  WOOD_ELF_GROVES: { row: 1, col: 4 },
  TOWN: { row: 2, col: 1 }
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

const mapSizePresets = [
  { key: 'mini', label: 'Mini', width: 120, height: 90 },
  { key: 'small', label: 'Small', width: 160, height: 120 },
  { key: 'normal', label: 'Normal', width: 200, height: 150 },
  { key: 'large', label: 'Large', width: 260, height: 195 },
  { key: 'extra-large', label: 'Extra Large', width: 320, height: 240 }
];

const mapSizeByKey = mapSizePresets.reduce((acc, preset) => {
  acc[preset.key] = preset;
  return acc;
}, {});

function getMapSizePreset(key) {
  return mapSizeByKey[key] || mapSizeByKey.normal;
}

const defaultMapSize = getMapSizePreset('normal');

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

function pickRandomFrom(array, random) {
  if (!Array.isArray(array) || array.length === 0) {
    return '';
  }
  const randomFn = typeof random === 'function' ? random : Math.random;
  const index = Math.floor(randomFn() * array.length);
  const clampedIndex = Math.max(0, Math.min(array.length - 1, index));
  return array[clampedIndex];
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

function resolveTileName(baseKey) {
  return tileLookup.has(baseKey) ? baseKey : 'GRASS';
}

const state = {
  settings: {
    mapSize: defaultMapSize.key,
    width: defaultMapSize.width,
    height: defaultMapSize.height,
    seedString: '',
    lastSeedString: '',
    forestFrequency: 50,
    mountainFrequency: 50
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
  currentWorld: null
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
  { value: 'stone-wardens', label: 'Stone Wardens Guild' },
  { value: 'anvilguard', label: 'Anvilguard Guild' },
  { value: 'brewmasters', label: 'Brewmasters Circle' },
  { value: 'gearwrights', label: 'Gearwrights Assembly' },
  { value: 'lorekeepers', label: 'Lorekeepers Consortium' },
  { value: 'hearthguard', label: 'Hearthguard Lodge' },
  { value: 'artificers', label: 'Artificers Union' },
  { value: 'merchants', label: "Merchant's League" }
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
  curly_short: {
    label: 'Curly — Close Curls',
    description: 'close-cropped curly',
    sheet: 'hairCurly',
    rows: { default: 4 }
  },
  curly_full: {
    label: 'Curly — Full Curls',
    description: 'full curly',
    sheet: 'hairCurly',
    rows: { default: 5 }
  },
  curly_wild: {
    label: 'Curly — Wild Mane',
    description: 'wild curly',
    sheet: 'hairCurly',
    rows: { default: 6 }
  }
};

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
  beard: [
    { value: 'clean', label: 'Clean-shaven' },
    { value: 'short', label: 'Short Beard' },
    { value: 'full', label: 'Full Beard' },
    { value: 'braided', label: 'Braided Beard' },
    { value: 'forked', label: 'Forked Beard' },
    { value: 'mutton', label: 'Mutton Chops' }
  ],
  clan: dwarfClanOptions,
  guild: dwarfGuildOptions,
  profession: dwarfProfessionOptions
};

const editableDwarfTraits = new Set([
  'gender',
  'skin',
  'eyes',
  'hairStyle',
  'hair',
  'beard',
  'clan',
  'guild',
  'profession'
]);

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

function resolveHairStyleValue(value) {
  return value && dwarfHairStyles[value] ? value : defaultHairStyleValue;
}

function getHairStyleConfig(value) {
  const key = resolveHairStyleValue(value);
  return dwarfHairStyles[key];
}

function getHairStyleDescription(value) {
  const config = getHairStyleConfig(value);
  return config?.description || getOptionLabel('hairStyle', value);
}

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
  mapTooltip: document.getElementById('world-tooltip'),
  seedDisplay: document.querySelector('.seed-display'),
  mapSizeSelect: document.getElementById('map-size'),
  seedInput: document.getElementById('world-seed'),
  forestFrequencyInput: document.getElementById('forest-frequency'),
  forestFrequencyValue: document.getElementById('forest-frequency-value'),
  mountainFrequencyInput: document.getElementById('mountain-frequency'),
  mountainFrequencyValue: document.getElementById('mountain-frequency-value'),
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
  dwarfRollNew: document.getElementById('dwarf-roll-new'),
  dwarfPrev: document.getElementById('dwarf-prev'),
  dwarfNext: document.getElementById('dwarf-next'),
  dwarfSlotLabel: document.getElementById('dwarf-slot-label'),
  dwarfNameInput: document.getElementById('dwarf-name-input'),
  dwarfGenderButtons: document.getElementById('dwarf-gender-buttons'),
  dwarfClanSelect: document.getElementById('dwarf-clan-select'),
  dwarfGuildSelect: document.getElementById('dwarf-guild-select'),
  dwarfProfessionSelect: document.getElementById('dwarf-profession-select'),
  dwarfSkinSelect: document.getElementById('dwarf-skin-select'),
  dwarfEyeSelect: document.getElementById('dwarf-eye-select'),
  dwarfHairStyleSelect: document.getElementById('dwarf-hair-style-select'),
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
  const selectedKey = elements.mapSizeSelect ? elements.mapSizeSelect.value : state.settings.mapSize;
  const preset = getMapSizePreset(selectedKey);
  const seedString = (elements.seedInput.value || '').trim();
  const forestFrequencyRaw = elements.forestFrequencyInput
    ? Number.parseInt(elements.forestFrequencyInput.value, 10)
    : state.settings.forestFrequency;
  const mountainFrequencyRaw = elements.mountainFrequencyInput
    ? Number.parseInt(elements.mountainFrequencyInput.value, 10)
    : state.settings.mountainFrequency;

  state.settings.mapSize = preset.key;
  state.settings.width = preset.width;
  state.settings.height = preset.height;
  state.settings.seedString = seedString;
  state.settings.forestFrequency = sanitizeFrequencyValue(
    Number.isNaN(forestFrequencyRaw) ? state.settings.forestFrequency : forestFrequencyRaw,
    state.settings.forestFrequency
  );
  state.settings.mountainFrequency = sanitizeFrequencyValue(
    Number.isNaN(mountainFrequencyRaw) ? state.settings.mountainFrequency : mountainFrequencyRaw,
    state.settings.mountainFrequency
  );
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
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
  const option = randomChoice(dwarfOptions.clan) || dwarfOptions.clan[0];
  return option?.label || 'Stonebeard';
}

function generateDwarfName(gender, clanValue) {
  const firstName = generateDwarfFirstName(gender);
  const clanName = clanValue ? getOptionLabel('clan', clanValue) : generateDwarfClanName();
  return `${firstName} ${clanName}`;
}

function createRandomDwarf(preferredGender) {
  const genderOption = preferredGender
    ? getOptionByValue('gender', preferredGender)
    : randomChoice(dwarfOptions.gender);
  const genderValue = genderOption ? genderOption.value : dwarfOptions.gender[0].value;
  const skinOption = randomChoice(dwarfOptions.skin) || dwarfOptions.skin[0];
  const eyeOption = randomChoice(dwarfOptions.eyes) || dwarfOptions.eyes[0];
  const hairStyleOption = randomChoice(dwarfOptions.hairStyle) || dwarfOptions.hairStyle[0];
  const hairOption = randomChoice(dwarfOptions.hair) || dwarfOptions.hair[0];
  const beardOption = randomChoice(dwarfOptions.beard) || dwarfOptions.beard[0];
  const clanOption = randomChoice(dwarfOptions.clan) || dwarfOptions.clan[0];
  const guildOption = randomChoice(dwarfOptions.guild) || dwarfOptions.guild[0];
  const professionOption = randomChoice(dwarfOptions.profession) || dwarfOptions.profession[0];

  return {
    name: generateDwarfName(genderValue, clanOption?.value),
    gender: genderValue,
    skin: skinOption.value,
    eyes: eyeOption.value,
    hairStyle: resolveHairStyleValue(hairStyleOption.value),
    hair: hairOption.value,
    beard: beardOption.value,
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

function renderDwarfPortrait(dwarf, skinOption, hairOption, eyeOption, hairStyleOption) {
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

  const hairStyleValue = resolveHairStyleValue(hairStyleOption?.value ?? dwarf?.hairStyle);
  const hairFrame = getHairFrame(dwarf, hairOption, hairStyleValue);
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
  const hairStyleOption = getOptionByValue('hairStyle', dwarf.hairStyle);

  renderDwarfPortrait(dwarf, skinOption, hairOption, eyeOption, hairStyleOption);

  const beardValue = dwarf.beard || 'clean';
  const genderLabel = getOptionLabel('gender', dwarf.gender);
  const skinLabel = getOptionLabel('skin', dwarf.skin).toLowerCase();
  const hairLabel = getOptionLabel('hair', dwarf.hair).toLowerCase();
  const hairStyleDescription = getHairStyleDescription(dwarf.hairStyle).toLowerCase();
  const hairPhrase = hairStyleDescription
    ? `${hairStyleDescription} ${hairLabel} hair`
    : `${hairLabel} hair`;
  const eyeLabel = getOptionLabel('eyes', dwarf.eyes).toLowerCase();
  const beardLabel = getOptionLabel('beard', beardValue).toLowerCase();
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
  let ariaDescription = `${genderLabel} dwarf with ${skinLabel} skin, ${hairPhrase}, ${eyeLabel} eyes, and ${beardLabel}.`;
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
  const hairLabel = getOptionLabel('hair', dwarf.hair).toLowerCase();
  const hairStyleDescription = getHairStyleDescription(dwarf.hairStyle).toLowerCase();
  const hairPhrase = hairStyleDescription
    ? `${hairStyleDescription} ${hairLabel} hair`
    : `${hairLabel} hair`;
  const beardLabel = getOptionLabel('beard', dwarf.beard).toLowerCase();
  const clanLabel = getOptionLabel('clan', dwarf.clan);
  const guildLabel = getOptionLabel('guild', dwarf.guild);
  const professionLabel = getOptionLabel('profession', dwarf.profession);
  let summary = `${genderLabel} dwarf with ${skinLabel} skin, ${hairPhrase}, ${eyeLabel} eyes, and ${beardLabel}.`;
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
    const hairStyleLabel = getOptionLabel('hairStyle', dwarf.hairStyle);
    const hairLabel = getOptionLabel('hair', dwarf.hair);
    const beardLabel = getOptionLabel('beard', dwarf.beard);
    traits.textContent = `${genderLabel} • ${hairStyleLabel} • ${hairLabel} • ${beardLabel}`;

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

function updateCustomizerUI() {
  ensureDwarfParty();
  const dwarf = getActiveDwarf();
  if (!dwarf) {
    return;
  }
  const total = state.dwarfParty.dwarves.length;
  if (elements.dwarfSlotLabel) {
    if (total === 1) {
      elements.dwarfSlotLabel.textContent = 'Founding Dwarf';
    } else {
      elements.dwarfSlotLabel.textContent = `Dwarf ${state.dwarfParty.activeIndex + 1} of ${total}`;
    }
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
    elements.dwarfHairStyleSelect,
    resolveHairStyleValue(dwarf.hairStyle),
    defaultHairStyleValue
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
    dwarf[trait] = trait === 'hairStyle' ? resolveHairStyleValue(value) : value;
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

function rollNewDwarfProfile() {
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
  const range = upper - lower;
  const clampedWeight = clamp(biasWeight, 0, 1);
  const biasedSample = Math.pow(Math.random(), Math.max(exponent, 1));
  const uniformSample = Math.random();
  const blended = clampedWeight * biasedSample + (1 - clampedWeight) * uniformSample;
  const value = lower + Math.round(blended * range);
  return clamp(value, lower, upper);
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
  const sizePreset = getMapSizePreset(state.settings.mapSize);
  const sizeLabel = sizePreset ? `${sizePreset.label} — ${sizePreset.width} × ${sizePreset.height} tiles` : `${width} × ${height} tiles`;
  elements.worldInfoSize.textContent = sizeLabel;

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
  containScale: 1,
  coverScale: 1,
  wrapperSize: { width: 0, height: 0 },
  worldSize: { width: 0, height: 0 },
  hasInteracted: false
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

function showMapTooltip(label, pointerX, pointerY, boundsRect) {
  if (!elements.mapTooltip) {
    return;
  }
  const tooltip = elements.mapTooltip;
  tooltip.textContent = label;
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
  hideMapTooltip();
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

  const updateHover = (event) => {
    if (!elements.canvasWrapper) {
      return;
    }
    const tiles = state.currentWorld ? state.currentWorld.tiles : null;
    if (!Array.isArray(tiles) || tiles.length === 0) {
      hideMapTooltip();
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
    const rect = elements.canvasWrapper.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;
    if (!Number.isFinite(pointerX) || !Number.isFinite(pointerY)) {
      hideMapTooltip();
      return;
    }
    if (pointerX < 0 || pointerY < 0 || pointerX > rect.width || pointerY > rect.height) {
      hideMapTooltip();
      return;
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
      hideMapTooltip();
      return;
    }
    const tileX = Math.floor(worldPixelX / drawSize);
    const tileY = Math.floor(worldPixelY / drawSize);
    if (tileY < 0 || tileY >= tiles.length) {
      hideMapTooltip();
      return;
    }
    const row = tiles[tileY];
    if (!Array.isArray(row) || tileX < 0 || tileX >= row.length) {
      hideMapTooltip();
      return;
    }
    const tile = row[tileX];
    if (!tile || !tile.structureName) {
      hideMapTooltip();
      return;
    }
    showMapTooltip(tile.structureName, pointerX, pointerY, rect);
  };

  const handleWheel = (event) => {
    if (!elements.canvas) {
      return;
    }
    hideMapTooltip();
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
    hideMapTooltip();
    event.preventDefault();
    isPanning = true;
    activePointerId = event.pointerId;
    lastPosition.x = event.clientX;
    lastPosition.y = event.clientY;
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
    lastPosition.x = event.clientX;
    lastPosition.y = event.clientY;
    viewState.translateX += dx;
    viewState.translateY += dy;
    viewState.hasInteracted = true;
    applyViewTransform();
  };

  const handlePointerUp = (event) => {
    if (event.pointerId === activePointerId) {
      elements.canvasWrapper.releasePointerCapture(event.pointerId);
      isPanning = false;
      activePointerId = null;
      updateHover(event);
      return;
    }
    updateHover(event);
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
  elements.canvasWrapper.addEventListener('pointerenter', updateHover);
  elements.canvasWrapper.addEventListener('pointerleave', hideMapTooltip);
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
  const forestFrequencySetting = sanitizeFrequencyValue(state.settings.forestFrequency, 50);
  const mountainFrequencySetting = sanitizeFrequencyValue(state.settings.mountainFrequency, 50);
  const forestBias = forestFrequencySetting / 50 - 1;
  const mountainBias = mountainFrequencySetting / 50 - 1;

  const continentalPlates = generateContinentalPlates(rng);
  const elevationField = new Float32Array(width * height);
  const tectonicActivityField = new Float32Array(width * height);

  const baseNoiseOffsetX = rng() * 2048;
  const baseNoiseOffsetY = rng() * 2048;
  const detailNoiseOffsetX = rng() * 4096;
  const detailNoiseOffsetY = rng() * 4096;

  const baseNoiseScale = 1.2 + rng() * 0.8;
  const detailNoiseScale = 3.6 + rng() * 3.2;
  const ridgeNoiseScale = 6.4 + rng() * 4.2;
  const edgeTaper = 2.4 + rng() * 0.8;
  const edgeDrop = 0.28 + rng() * 0.14;

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
        heightValue = lerp(heightValue, maskSample, 0.5);
      }

      heightValue = clamp(heightValue, -1, 1);
      elevationField[idx] = heightValue;
    }
  }

  normalizeField(elevationField);
  normalizeField(tectonicActivityField);

  const { seaLevel } = estimateSeaLevels(elevationField, 0.47);
  const grassTileKey = resolveTileName('GRASS');
  const waterTileKey = resolveTileName('WATER');
  const stoneTileKey = tileLookup.has('STONE') ? 'STONE' : grassTileKey;
  const tiles = Array.from(
    { length: height },
    () =>
      Array.from({ length: width }, () => ({
        base: grassTileKey,
        overlay: null,
        structure: null,
        structureName: null
      }))
  );
  const dwarfholds = [];
  const towns = [];
  const woodElfGroves = [];
  const waterMask = new Uint8Array(width * height);
  const hasMountainTile = tileLookup.has('MOUNTAIN');
  const mountainOverlayKey = hasMountainTile ? 'MOUNTAIN' : null;
  let mountainBaseThreshold = hasMountainTile ? Math.min(Math.max(seaLevel + 0.1, 0.58), 0.82) : 1;
  let mountainFullThreshold = hasMountainTile ? Math.min(0.98, mountainBaseThreshold + 0.35) : 1;
  let mountainRange = hasMountainTile ? Math.max(mountainFullThreshold - mountainBaseThreshold, 0.0001) : 1;
  if (hasMountainTile) {
    const thresholdShift = mountainBias * 0.1;
    const minBaseThreshold = Math.min(Math.max(seaLevel + 0.05, 0.5), 0.9);
    mountainBaseThreshold = clamp(mountainBaseThreshold - thresholdShift, minBaseThreshold, 0.9);
    mountainFullThreshold = clamp(
      mountainFullThreshold - thresholdShift * 1.2,
      mountainBaseThreshold + 0.1,
      0.99
    );
    mountainRange = Math.max(mountainFullThreshold - mountainBaseThreshold, 0.0001);
  }
  let mountainScores = null;
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
      tile.base = isWater ? waterTileKey : grassTileKey;
      tile.overlay = null;
      tile.structure = null;
      tile.structureName = null;
    }
  }

  if (hasMountainTile) {
    mountainScores = new Float32Array(width * height);
    const mountainHeightField = new Float32Array(width * height);
    let ridgeField = new Float32Array(width * height);
    const ridgeDirectionIndex = new Int8Array(width * height);
    ridgeDirectionIndex.fill(-1);
    const ridgeDirectionStrength = new Float32Array(width * height);
    const mountainMask = new Uint8Array(width * height);
    const directionOpposites = new Int8Array([7, 6, 5, 4, 3, 2, 1, 0]);
    const baseMountainSeedThreshold = 0.76;
    const baseMountainCandidateThreshold = 0.46;
    const baseMountainPruneThreshold = 0.88;
    const mountainSeedThreshold = clamp(
      baseMountainSeedThreshold - mountainBias * 0.18,
      0.55,
      0.96
    );
    const mountainCandidateThreshold = clamp(
      baseMountainCandidateThreshold - mountainBias * 0.18,
      0.22,
      0.7
    );
    const mountainPruneThreshold = clamp(
      baseMountainPruneThreshold - mountainBias * 0.14,
      0.65,
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
      const limit = Math.min(6, fallbackCandidates.length);
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
      const baseLength = 2 + Math.floor((seedScore * 6 + ridgeStrength * 5) * (0.6 + reliability * 0.5));
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

    for (let pass = 0; pass < 3; pass += 1) {
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
          const probability = Math.min(0.95, 0.18 + score * 0.75 + orientationStrength * 0.2);
          if (mountainNeighbors >= minNeighbors && (score > 0.75 || rng() < probability)) {
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
        const requiredNeighbors = orientationStrength > 0.6 ? 2 : orientationStrength > 0.35 ? 3 : 4;
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
        const effectiveThreshold = mountainPruneThreshold * (1 - orientationStrength * 0.25);
        if (mountainNeighbors <= minSupport && score < effectiveThreshold) {
          mountainMask[idx] = 0;
        }
      }
    }

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (mountainMask[idx]) {
          const tile = tiles[y][x];
          tile.overlay = mountainOverlayKey;
          if (tile.base === grassTileKey) {
            tile.base = stoneTileKey;
          }
        }
      }
    }

    const dwarfholdKey = tileLookup.has('DWARFHOLD') ? 'DWARFHOLD' : null;
    if (dwarfholdKey) {
      const dwarfholdCandidates = [];
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          const tile = tiles[y][x];
          if (tile.overlay !== mountainOverlayKey) {
            continue;
          }
          const score = mountainScores ? mountainScores[idx] : 0;
          dwarfholdCandidates.push({ x, y, score });
        }
      }

      if (dwarfholdCandidates.length > 0) {
        dwarfholdCandidates.sort((a, b) => b.score - a.score);
        const desiredCount = Math.max(1, Math.round(dwarfholdCandidates.length / 500));
        const maxDwarfholds = Math.min(desiredCount, 24);
        const minDistance = 5;
        const minDistanceSq = minDistance * minDistance;
        const placed = [];

        for (let i = 0; i < dwarfholdCandidates.length; i += 1) {
          if (placed.length >= maxDwarfholds) {
            break;
          }
          const candidate = dwarfholdCandidates[i];
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
          if (!tile || tile.overlay !== mountainOverlayKey || tile.structure) {
            continue;
          }
          const name = generateDwarfholdName(rng);
          tile.structure = dwarfholdKey;
          tile.structureName = name;
          placed.push(candidate);
          dwarfholds.push({ x: candidate.x, y: candidate.y, name });
        }
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
        tile.base = grassTileKey;
        tile.overlay = null;
        tile.structure = null;
        tile.structureName = null;
      }
    }
  }

  const townKey = tileLookup.has('TOWN') ? 'TOWN' : null;
  if (townKey) {
    const townCandidates = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || tile.base !== grassTileKey || tile.overlay || tile.structure) {
          continue;
        }
        const elevationValue = elevationField[idx];
        const elevationScore = clamp(1 - Math.abs(elevationValue - (seaLevel + 0.08)) * 2.6, 0, 1);
        let waterNeighbors = 0;
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          if (waterMask[ny * width + nx]) {
            waterNeighbors += 1;
          }
        }
        const waterScore = waterNeighbors / neighborOffsets8.length;
        const edgeDistance = Math.min(x, width - 1 - x, y, height - 1 - y);
        const maxEdgeDistance = Math.max(1, Math.min(width, height) / 2);
        const edgeScore = clamp(edgeDistance / maxEdgeDistance, 0, 1);
        const score = elevationScore * 0.55 + waterScore * 0.25 + edgeScore * 0.15 + rng() * 0.2;
        townCandidates.push({ x, y, score });
      }
    }

    if (townCandidates.length > 0) {
      townCandidates.sort((a, b) => b.score - a.score);
      const area = width * height;
      const desiredCount = Math.max(2, Math.round(area / 4800));
      const maxTowns = Math.min(desiredCount, 36);
      const minDistance = Math.max(6, Math.round(Math.min(width, height) / 12));
      const minDistanceSq = minDistance * minDistance;
      const placed = [];

      for (let i = 0; i < townCandidates.length; i += 1) {
        if (placed.length >= maxTowns) {
          break;
        }
        const candidate = townCandidates[i];
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
        if (!tile || tile.base !== grassTileKey || tile.overlay || tile.structure) {
          continue;
        }
        const name = generateTownName(rng);
        tile.structure = townKey;
        tile.structureName = name;
        towns.push({ x: candidate.x, y: candidate.y, name });
        placed.push(candidate);
      }
    }
  }

  const hasTreeTile = tileLookup.has('TREE');
  if (hasTreeTile) {
    const treeOverlayKey = 'TREE';
    const treeBaseSeed = (seedNumber + 0x27d4eb2f) >>> 0;
    const treeDetailSeed = (seedNumber + 0x165667b1) >>> 0;
    const treeBaseScale = 2.4 + rng() * 1.6;
    const treeDetailScale = 6.6 + rng() * 4.6;
    const treeBaseOffsetX = rng() * 4096;
    const treeBaseOffsetY = rng() * 4096;
    const treeDetailOffsetX = rng() * 8192;
    const treeDetailOffsetY = rng() * 8192;
    const treeDensityField = new Float32Array(width * height);
    const treeMask = new Uint8Array(width * height);
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
    const baseSeedThreshold = 0.66;
    const baseSoftSeedThreshold = 0.56;
    const baseGrowthBaseline = 0.48;
    const baseNeighborBonus = 0.08;
    const baseDensityAlwaysAdd = 0.6;
    const baseSoftSeedMultiplier = 1.8;
    const seedThreshold = clamp(baseSeedThreshold - forestBias * 0.18, 0.35, 0.9);
    const softSeedThreshold = clamp(baseSoftSeedThreshold - forestBias * 0.16, 0.25, 0.85);
    const growthBaseline = clamp(baseGrowthBaseline - forestBias * 0.14, 0.2, 0.7);
    const neighborBonus = clamp(baseNeighborBonus + forestBias * 0.04, 0.02, 0.14);
    const densityAlwaysAddThreshold = clamp(
      baseDensityAlwaysAdd - forestBias * 0.12,
      0.4,
      0.78
    );
    const softSeedMultiplier = clamp(baseSoftSeedMultiplier + forestBias * 0.6, 0.8, 2.6);

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
        density = clamp(density * (1 + forestBias * 0.25), 0, 1);
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
        if (tile.overlay || tile.base !== grassTileKey || tile.structure) {
          continue;
        }
        const density = treeDensityField[idx];
        if (
          density >= seedThreshold ||
          (density > softSeedThreshold && rng() < (density - softSeedThreshold) * softSeedMultiplier)
        ) {
          treeMask[idx] = 1;
          tile.overlay = treeOverlayKey;
        }
      }
    }

    const maxGrowthIterations = 2;
    for (let iteration = 0; iteration < maxGrowthIterations; iteration += 1) {
      const additions = [];
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (waterMask[idx]) {
            continue;
          }
          const tile = tiles[y][x];
          if (tile.overlay || tile.base !== grassTileKey || tile.structure) {
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
          const probability = clamp(
            (density - growthBaseline) / 0.52 + neighborTrees * neighborBonus,
            0,
            1
          );
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
        if (tile.overlay || tile.base !== grassTileKey || tile.structure) {
          continue;
        }
        treeMask[idx] = 1;
        tile.overlay = treeOverlayKey;
      }
    }

    const woodElfGroveKey = tileLookup.has('WOOD_ELF_GROVES') ? 'WOOD_ELF_GROVES' : null;
    if (woodElfGroveKey) {
      const groveCandidates = [];
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          const tile = tiles[y][x];
          if (!tile || tile.overlay !== treeOverlayKey || tile.structure) {
            continue;
          }
          const score = treeDensityField ? treeDensityField[idx] : 0;
          groveCandidates.push({ x, y, score });
        }
      }

      if (groveCandidates.length > 0) {
        groveCandidates.sort((a, b) => b.score - a.score);
        const desiredCount = Math.max(1, Math.round(groveCandidates.length / 450));
        const maxGroves = Math.min(desiredCount, 28);
        const minDistance = 6;
        const minDistanceSq = minDistance * minDistance;
        const placed = [];

        for (let i = 0; i < groveCandidates.length; i += 1) {
          if (placed.length >= maxGroves) {
            break;
          }
          const candidate = groveCandidates[i];
          if (candidate.score < 0.28) {
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
          if (!tile || tile.overlay !== treeOverlayKey || tile.structure) {
            continue;
          }
          const name = generateWoodElfGroveName(rng);
          tile.structure = woodElfGroveKey;
          tile.structureName = name;
          placed.push(candidate);
          woodElfGroves.push({ x: candidate.x, y: candidate.y, name });
        }
      }
    }
  }

  const finalSeed = seedString && seedString.trim().length ? seedString.trim() : generateSeedString(seedNumber);
  return { tiles, seedString: finalSeed, dwarfholds, towns, woodElfGroves };
}

function generateSeedString(seedNumber) {
  return seedNumber.toString(16).padStart(8, '0');
}

function drawWorld(world) {
  const { tiles, seedString } = world;
  hideMapTooltip();
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

      if (cell.structure) {
        const structureDefinition = tileLookup.get(cell.structure);
        if (!structureDefinition) {
          continue;
        }
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
  hideMapTooltip();
  const world = createWorld(seedToUse);
  state.currentWorld = world;
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
  if (elements.mapSizeSelect) {
    elements.mapSizeSelect.value = state.settings.mapSize;
  }
  if (elements.seedInput) {
    elements.seedInput.value = state.settings.seedString;
  }
  if (elements.forestFrequencyInput) {
    const value = sanitizeFrequencyValue(state.settings.forestFrequency, 50);
    elements.forestFrequencyInput.value = value.toString();
    updateFrequencyDisplay(elements.forestFrequencyValue, value);
  }
  if (elements.mountainFrequencyInput) {
    const value = sanitizeFrequencyValue(state.settings.mountainFrequency, 50);
    elements.mountainFrequencyInput.value = value.toString();
    updateFrequencyDisplay(elements.mountainFrequencyValue, value);
  }
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

  if (elements.dwarfRollNew) {
    elements.dwarfRollNew.addEventListener('click', () => {
      rollNewDwarfProfile();
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

  if (elements.dwarfHairStyleSelect) {
    elements.dwarfHairStyleSelect.addEventListener('change', (event) => {
      updateDwarfTrait('hairStyle', event.target.value);
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
