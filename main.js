const drawSize = 32;

const tileSheets = {
  base: {
    key: 'base',
    path: 'tilesheet/Overworld.png',
    tileSize: 32,
    image: null
  },
  worldDetails: {
    key: 'worldDetails',
    path: 'Dwarf.Fortress/data/vanilla/vanilla_world_map/graphics/images/world_map_details.png',
    tileSize: 16,
    image: null
  },
  worldEdgeGlacier: {
    key: 'worldEdgeGlacier',
    path: 'Dwarf.Fortress/data/vanilla/vanilla_world_map/graphics/images/world_map_edge_glacier.png',
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
  },
  hairCurly: {
    key: 'hairCurly',
    path: 'Dwarf.Fortress/data/vanilla/vanilla_creatures_graphics/graphics/images/dwarf_hair_curly.png',
    tileSize: 32,
    image: null
  }
};

const baseTileCoords = {
  SAND: { row: 0, col: 0 },
  GRASS: { row: 0, col: 1 },
  MARSH: { row: 5, col: 3 },
  SNOW: { row: 2, col: 3 },
  TREE: { row: 1, col: 0 },
  TREE_SNOW: { row: 1, col: 1 },
  WATER: { row: 1, col: 4 },
  MOUNTAIN: { row: 0, col: 3 },
  MOUNTAIN_TOP_A: { row: 0, col: 4 },
  MOUNTAIN_TOP_B: { row: 0, col: 5 },
  MOUNTAIN_BOTTOM_A: { row: 0, col: 7 },
  MOUNTAIN_BOTTOM_B: { row: 0, col: 8 },
  STONE: { row: 0, col: 3 },
  DWARFHOLD: { row: 2, col: 9 },
  GREAT_DWARFHOLD: { row: 0, col: 6 },
  CAVE: { row: 1, col: 5 },
  TOWER: { row: 1, col: 6 },
  EVIL_WIZARDS_TOWER: { row: 3, col: 3 },
  WOOD_ELF_GROVES: { row: 2, col: 4 },
  HILLS: { row: 3, col: 1 },
  TOWN: { row: 2, col: 1 },
  PORT_TOWN: { row: 4, col: 5 }
};

const roadTileVariantDefinitions = (() => {
  const sheet = tileSheets.base;
  if (!sheet) {
    return [];
  }
  const tileSize = sheet.tileSize;
  const startColumn = 7;
  const variantCount = 8;
  const row = 3;
  return Array.from({ length: variantCount }, (_, index) => ({
    sheetKey: sheet.key,
    sx: (startColumn + index) * tileSize,
    sy: row * tileSize,
    size: tileSize
  }));
})();

const riverTileCoords = {
  RIVER_NS: { row: 4, col: 0 },
  RIVER_WE: { row: 4, col: 1 },
  RIVER_SE: { row: 4, col: 2 },
  RIVER_SW: { row: 4, col: 3 },
  RIVER_NE: { row: 4, col: 4 },
  RIVER_NW: { row: 4, col: 5 },
  RIVER_NSE: { row: 4, col: 6 },
  RIVER_SWE: { row: 4, col: 7 },
  RIVER_NWE: { row: 4, col: 8 },
  RIVER_NSW: { row: 4, col: 9 },
  RIVER_NSWE: { row: 4, col: 10 },
  RIVER_0: { row: 4, col: 11 },
  RIVER_N: { row: 4, col: 12 },
  RIVER_S: { row: 4, col: 13 },
  RIVER_W: { row: 4, col: 14 },
  RIVER_E: { row: 4, col: 15 },
  RIVER_MAJOR_NS: { row: 5, col: 0 },
  RIVER_MAJOR_WE: { row: 5, col: 1 },
  RIVER_MAJOR_SE: { row: 5, col: 2 },
  RIVER_MAJOR_SW: { row: 5, col: 3 },
  RIVER_MAJOR_NE: { row: 5, col: 4 },
  RIVER_MAJOR_NW: { row: 5, col: 5 },
  RIVER_MAJOR_NSE: { row: 5, col: 6 },
  RIVER_MAJOR_SWE: { row: 5, col: 7 },
  RIVER_MAJOR_NWE: { row: 5, col: 8 },
  RIVER_MAJOR_NSW: { row: 5, col: 9 },
  RIVER_MAJOR_NSWE: { row: 5, col: 10 },
  RIVER_MAJOR_0: { row: 5, col: 11 },
  RIVER_MAJOR_N: { row: 5, col: 12 },
  RIVER_MAJOR_S: { row: 5, col: 13 },
  RIVER_MAJOR_W: { row: 5, col: 14 },
  RIVER_MAJOR_E: { row: 5, col: 15 },
  RIVER_MOUTH_NARROW_N: { row: 7, col: 12 },
  RIVER_MOUTH_NARROW_S: { row: 7, col: 13 },
  RIVER_MOUTH_NARROW_W: { row: 7, col: 14 },
  RIVER_MOUTH_NARROW_E: { row: 7, col: 15 },
  RIVER_MAJOR_MOUTH_NARROW_N: { row: 8, col: 12 },
  RIVER_MAJOR_MOUTH_NARROW_S: { row: 8, col: 13 },
  RIVER_MAJOR_MOUTH_NARROW_W: { row: 8, col: 14 },
  RIVER_MAJOR_MOUTH_NARROW_E: { row: 8, col: 15 }
};

const icebergTileOptions = [
  { row: 3, col: 4 },
  { row: 3, col: 5 }
];

const icebergTileCoords = (() => {
  const keys = ['ICEBERG_SURROUND_1', 'ICEBERG_SURROUND_2'];
  return keys.reduce((coords, key, index) => {
    const option = icebergTileOptions[index % icebergTileOptions.length];
    coords[key] = { ...option };
    return coords;
  }, {});
})();

const tileLookup = new Map();
const TOWN_ROAD_OVERLAY_KEY = 'TOWN_ROAD';

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
registerTiles('worldDetails', riverTileCoords);
registerTiles('base', icebergTileCoords);

// The evil wizard tower sprite only shows up on some tilesheets. If the
// currently loaded set does not define it, fall back to the generic tower so
// the generator can still place the structures.
if (!tileLookup.has('EVIL_WIZARDS_TOWER')) {
  const fallbackTower = tileLookup.get('TOWER');
  if (fallbackTower) {
    tileLookup.set('EVIL_WIZARDS_TOWER', { ...fallbackTower });
  }
}

const mapSizePresets = [
  { key: 'mini', label: 'Mini', width: 192, height: 144 },
  { key: 'small', label: 'Small', width: 260, height: 195 },
  { key: 'normal', label: 'Normal', width: 324, height: 243 },
  { key: 'large', label: 'Large', width: 424, height: 318 },
  { key: 'extra-large', label: 'Extra Large', width: 520, height: 390 }
];

const mapSizeByKey = mapSizePresets.reduce((acc, preset) => {
  acc[preset.key] = preset;
  return acc;
}, {});

function getMapSizePreset(key) {
  return mapSizeByKey[key] || mapSizeByKey.normal;
}

function applyMapSizePresetToState(preset) {
  if (!preset) {
    return;
  }
  state.settings.mapSize = preset.key;
  state.settings.width = preset.width;
  state.settings.height = preset.height;
}

function getMapSizeLabel(preset, width, height) {
  if (preset) {
    return `${preset.label} — ${preset.width} × ${preset.height} tiles`;
  }
  if (typeof width === 'number' && typeof height === 'number') {
    return `${width} × ${height} tiles`;
  }
  return '—';
}

const defaultMapSize = getMapSizePreset('normal');
const defaultForestFrequency = 35;
const defaultMountainFrequency = 35;

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

const dwarfholdRulerTitles = {
  female: [
    'High Thane',
    'Forge Matron',
    'Hearthmother',
    'Deepwarden',
    'Queen',
    'Thane',
    'High Queen'
  ],
  male: [
    'High Thane',
    'Forge Lord',
    'Mountain King',
    'Deepwarden',
    'Thane',
    'King',
    'King Under The Mountain',
    'Prince',
    'High Runesmith'
  ]
};

const dwarfholdHallmarks = [
  'Renowned for adamantine vaults that hum with runic wards.',
  'Brews ember-ale said to warm even a dragonborn heart.',
  'Forges battleaxes tempered in magmafall cascades.',
  'Gemcutters here carve prisms that sing when struck.',
  'Hosts archives of rune-scribed lore older than empires.',
  'Its sentry golems stand watch over sealed deep-gates.',
  'Stonewrights sculpt living statues of honoured ancestors.',
  'Traders deal in starlight opals mined from midnight caverns.',
  'Their forges are stoked by dragonfire bound in crystal cages.',
  'Tunnel gardens yield luminous mushrooms for distant markets.'
];

const dwarfholdExportOptions = [
  'Cut gemstones and faceted crystals',
  'Masterwork steel arms and armor',
  'Runic circuitry and precision mechanisms',
  'Barrels of triple-aged stout and spirits',
  'Thunderpowder and blasting charges',
  'Refined mithril ingots and alloys',
  'Architectural plans and rune-etched stonework',
  'Highland woolens and leatherwork',
  'Engraved jewelry and heirloom trinkets'
];

const dwarfholdPopulationRaceOptions = [
  { key: 'dwarves', label: 'Dwarves', color: '#f4c069' },
  { key: 'humans', label: 'Humans', color: '#9bb6d8' },
  { key: 'gnomes', label: 'Gnomes', color: '#c9a3e6' },
  { key: 'elves', label: 'Elves', color: '#6ecf85' },
  { key: 'halflings', label: 'Halflings', color: '#f7a072' },
  { key: 'goblins', label: 'Goblins', color: '#7f8c4d' },
  { key: 'kobolds', label: 'Kobolds', color: '#b1c8ff' },
  { key: 'others', label: 'Others', color: '#9e9e9e' }
];

const evilWizardTowerPopulationRaceOptions = [
  { key: 'wizards', label: 'Wizards', color: '#9c5cff' },
  { key: 'apprentices', label: 'Apprentices', color: '#b389ff' },
  { key: 'thralls', label: 'Thralls', color: '#646e78' },
  { key: 'summoned', label: 'Summoned Entities', color: '#ff8ba7' },
  { key: 'guards', label: 'Enslaved Guards', color: '#f2cd5c' },
  { key: 'others', label: 'Others', color: '#9e9e9e' }
];

const towerCommanderTitles = [
  'Castellan',
  'Commander of the Watch',
  'High Warden',
  'Beacon Marshal',
  'Captain of the Rampart',
  'Signal Master'
];

const towerCommanderGivenNames = [
  'Aldren',
  'Briala',
  'Cordan',
  'Davia',
  'Elric',
  'Faelan',
  'Garrick',
  'Helena',
  'Ivor',
  'Jasra',
  'Kaelin',
  'Liora',
  'Marek',
  'Neriah',
  'Orin',
  'Phaedra',
  'Rothan',
  'Selene',
  'Tarin',
  'Vaelis'
];

const towerCommanderSurnames = [
  'Stonewatch',
  'Dawnshield',
  'Greybanner',
  'Stormgaze',
  'Ironflame',
  'Swiftspire',
  'Highward',
  'Lighthelm',
  'Crownguard',
  'Starwall',
  'Deepward',
  'Brightmarch'
];

const towerOrderNames = [
  'Order of the Dawnwatch',
  'Azure Sentinel Brigade',
  'Wardens of the Highroad',
  'Gilded Lantern Cohort',
  'Scarlet Banner Watch',
  'Guardians of the Stormline',
  'Emerald Rampart Order'
];

const towerDetachmentOptions = [
  'Hawkrider Wing',
  'Rune-Signal Corps',
  'Ballista Battery',
  'Skysteel Artillery',
  'Shadow Lanterners',
  'Emberguard Phalanx',
  'Stormlance Cavalry'
];

const towerDutyOptions = [
  'Guarding the high pass road',
  'Maintaining the beacon chain',
  'Patrolling the border marches',
  'Escorting vital trade caravans',
  'Watching over ancient ruins nearby',
  'Shielding frontier villages from raiders'
];

const towerHallmarks = [
  'Beacon flames that can be seen clear across the frontier.',
  'Clockwork lifts that carry scouts to the highest parapets.',
  'Signal mirrors that flash messages to distant allies at dusk.',
  'A vaulted armoury stocked with relic blades and bannered shields.',
  'An observatory dome charting the movements of stormclouds and foes alike.',
  'Stone walls etched with oath-runes that glow at the approach of danger.'
];

const towerPopulationRoleOptions = [
  { key: 'sentinels', label: 'Sentinels', color: '#8fbf9f' },
  { key: 'marksmen', label: 'Marksmen', color: '#d2a679' },
  { key: 'support', label: 'Support Crew', color: '#9bb6d8' },
  { key: 'mages', label: 'Signal Mages', color: '#b389ff' },
  { key: 'scouts', label: 'Scouts', color: '#f4c069' },
  { key: 'others', label: 'Camp Followers', color: '#9e9e9e' }
];

const townRulerTitles = {
  male: ['Mayor', 'Lord Mayor', 'High Steward', 'Burgomaster', 'Castellan'],
  female: ['Mayor', 'Lady Mayor', 'High Steward', 'Burgomistress', 'Castellan'],
  neutral: ['Governor', 'Magistrate', 'Marshal', 'Chamberlain', 'Steward']
};

const townHallmarks = [
  'Celebrated for its midsummer lantern festivals that light the riverways.',
  'Known for bustling markets where spices and silks trade hands till dusk.',
  'Renowned scribes illuminate tomes commissioned by distant courts.',
  'Shipwrights here launch swift river cutters and stout coastal cogs.',
  'Bards gather nightly in its echoing amphitheatre for tale and song.',
  'Town gardens brim with rare herbs prized by alchemists abroad.',
  'Its watchfires are said to be seen from the bordering highlands.',
  'Pilgrims arrive seasonally to venerate relics kept in the hilltop chapel.',
  'Stone bridges arch over canals lined with copper-roofed warehouses.',
  'Famous for street performers who juggle embers without being burned.'
];

const townExportOptions = [
  'Fine woolens and dyed textiles',
  'Barrels of spiced wine and cordial',
  'Carved hardwood furniture and cabinetry',
  'Glazed ceramics and painted pottery',
  'Ironmongery tools and horseshoes',
  'Salted riverfish and smoked eel',
  'Illuminated manuscripts and scrolls',
  'Perfumed oils and soaps',
  'Handcrafted musical instruments',
  'Leather saddles and tack'
];

const townPopulationRaceOptions = [
  { key: 'humans', label: 'Humans', color: '#9bb6d8' },
  { key: 'dwarves', label: 'Dwarves', color: '#f4c069' },
  { key: 'elves', label: 'Elves', color: '#6ecf85' },
  { key: 'halflings', label: 'Halflings', color: '#f7a072' },
  { key: 'gnomes', label: 'Gnomes', color: '#c9a3e6' },
  { key: 'dragonborn', label: 'Dragonborn', color: '#c16a6a' },
  { key: 'tieflings', label: 'Tieflings', color: '#b064b0' },
  { key: 'others', label: 'Others', color: '#9e9e9e' }
];

const townProminentFamilyNames = [
  'Ambermere',
  'Briarhelm',
  'Crownhill',
  'Dunleigh',
  'Emberfast',
  'Fairbloom',
  'Hallowmere',
  'Kestrelbourne',
  'Marrowind',
  'Ravenbrook',
  'Stormholt',
  'Thornwall',
  'Underford',
  'Wintermere'
];

const townGuildOptions = [
  'Merchants Consortium',
  'River Bargemen Union',
  'Artisan Collective',
  'Scribes and Illuminators Guild',
  'Shipwrights Assembly',
  'Alchemists Conclave',
  'Vintners Circle',
  'Weavers Syndicate',
  'Stevedores Brotherhood',
  'Stonemasons Chapter',
  'Cartographers Fellowship',
  'Apothecaries Guild',
  'Wrights and Carpenters Lodge',
  'Guard Captains Council',
  'Miners Exchange'
];

const townFirstNamePools = {
  male: ['Aldric', 'Berend', 'Cedric', 'Darian', 'Edric', 'Garran', 'Henric', 'Loric', 'Rowan', 'Therin'],
  female: ['Adela', 'Brienne', 'Celia', 'Elowen', 'Fiora', 'Gwendolyn', 'Isolde', 'Maren', 'Rowena', 'Seren'],
  neutral: ['Arlen', 'Ember', 'Finley', 'Morgan', 'Robin', 'Sage', 'Tarian']
};

const settlementDetailTypes = new Set([
  'dwarfhold',
  'greatDwarfhold',
  'town',
  'city',
  'village',
  'hamlet',
  'evilWizardTower',
  'tower',
  'woodElfGrove'
]);

function resolveTownRulerTitle(gender, randomFn) {
  const genderPool =
    (gender === 'male' && townRulerTitles.male) ||
    (gender === 'female' && townRulerTitles.female) ||
    townRulerTitles.neutral;
  const fallbackPool = townRulerTitles.neutral.length > 0 ? townRulerTitles.neutral : townRulerTitles.male;
  return pickRandomFrom(genderPool && genderPool.length > 0 ? genderPool : fallbackPool, randomFn) || 'Magistrate';
}

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

const towerNamePrefixes = [
  'Obsidian',
  'Gilded',
  'Runed',
  'Frost',
  'Storm',
  'Ivory',
  'Crimson',
  'Verdant',
  'Azure',
  'Shadow',
  'Sunset',
  'Moonrise',
  'Starfall',
  'Ember',
  'Sapphire'
];

const towerNameNouns = [
  'Tower',
  'Spire',
  'Watch',
  'Keep',
  'Pinnacle',
  'Bastion',
  'Citadel',
  'Lantern'
];

const towerNameQualifiers = [
  'of Dawn',
  'of Twilight',
  'of Storms',
  'of Secrets',
  'of Embers',
  'of Whispers',
  'of the North',
  'of the Veil',
  'of Echoes',
  'of the First Light',
  'of the Last Watch',
  'of the Silent Choir'
];

const evilWizardRulerTitles = [
  'Archwizard',
  'Grand Warlock',
  'Mistress of Hexes',
  'Dread Magister',
  'Shadow Thaumaturge',
  'High Necromancer'
];

const evilWizardGivenNames = [
  'Malachar',
  'Ilyria',
  'Vorstag',
  'Seraphine',
  'Kharzul',
  'Nymera',
  'Vaelix',
  'Thalorin',
  'Mordra',
  'Zephyros',
  'Elandra',
  'Raziel'
];

const evilWizardSurnames = [
  'Nightweaver',
  'Grimspire',
  'Voidbinder',
  'Dusksong',
  'Ashmantle',
  'Frostvein',
  'Starshroud',
  'Runeveil'
];

const evilWizardEpithets = [
  'the Unseen',
  'the Cruel',
  'the Whisperer',
  'the Pale Flame',
  'the Crimson Star',
  'the Endless',
  'the Voidcalled',
  'the Shadowed',
  'the Withering Gale',
  'the Stormbinder'
];

const evilWizardCabalNames = [
  'Circle of Nightglass',
  'Order of the Ebon Star',
  'Covenant of Ashen Veils',
  'Cabal of Thorned Sigils',
  'Symphony of Hollow Suns',
  'Chorus of Silent Bells'
];

const evilWizardTowerHallmarks = [
  'Shrouded perpetually in stormclouds that crackle with violet lightning.',
  'Whispers say its halls rearrange themselves with each moonrise.',
  'The central spire hums with runes that siphon magic from the ley.',
  'Populated by constructs wrought from obsidian and bone.',
  'Its beacon pulses nightly, summoning spirits from distant graves.',
  'Said to house a library bound in the memories of captured heroes.'
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

const woodElfGroveElderTitles = [
  'Grove Warden',
  'Verdant Speaker',
  'Circle Elder',
  'Keeper of Boughs',
  'Songwarden',
  'Dawnwatcher'
];

const woodElfGroveElderGivenNames = [
  'Aelar',
  'Lethariel',
  'Thamior',
  'Keyleth',
  'Varis',
  'Nymeria',
  'Caelynn',
  'Theren',
  'Sylvar',
  'Ilyana',
  'Faelar',
  'Lunessa'
];

const woodElfGroveElderSurnames = [
  'Silversong',
  'Oakenshade',
  'Nightbloom',
  'Moonglade',
  'Thornweaver',
  'Starpetal',
  'Sunshadow',
  'Mistralwind',
  'Fernstep',
  'Willowstrand'
];

const woodElfGroveHallmarks = [
  'Moonlit rites that weave auroras between the branches.',
  'Ancient treants stand guard over every winding path.',
  'Hidden pools shimmer with restorative starlight dew.',
  'The groves chorus echoes across the forest at dusk.',
  'Bough-bridges knit the canopy into spiralling promenades.',
  'Druidic songcraft summons blossoms even in winter.'
];

const woodElfGroveCircleNames = [
  'Circle of the Silver Bough',
  'Circle of Verdant Stars',
  'Circle of Whispering Winds',
  'Circle of Dawnpetals',
  'Circle of the Emerald Veil',
  'Circle of Moonshadow Paths',
  'Circle of the Luminous Seed',
  'Circle of the Elder Stag'
];

const woodElfGroveOrders = [
  'Wardens of the High Canopy',
  'Rangers of the Verdant Way',
  'Singers of the Luminous Thread',
  'Druids of the Moonwell Accord',
  'Keepers of the Auric Grove',
  'Mistwalkers of the Emerald Watch'
];

const woodElfGroveExports = [
  'Phials of rejuvenating moonwater',
  'Runed arrowheads carved from starwood',
  'Perfumed resins and incense petals',
  'Luminous moss for healing rituals',
  'Silken banners woven from leaf-fibres',
  'Seedstones that sprout protective thickets'
];

const woodElfGrovePopulationRoleOptions = [
  { key: 'wardens', label: 'Bough Wardens', color: '#6ecf85' },
  { key: 'druids', label: 'Circle Druids', color: '#9bd4a9' },
  { key: 'scouts', label: 'Glade Scouts', color: '#8bbbcf' },
  { key: 'singers', label: 'Chorus Singers', color: '#c4a6e8' },
  { key: 'artisans', label: 'Canopy Artisans', color: '#f4c069' },
  { key: 'others', label: 'Forest Folk', color: '#9e9e9e' }
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

function pickUniqueFrom(array, count, random) {
  if (!Array.isArray(array) || array.length === 0 || count <= 0) {
    return [];
  }
  const randomFn = typeof random === 'function' ? random : Math.random;
  const pool = array.slice();
  const picks = [];
  const maxCount = Math.min(Math.max(count, 0), pool.length);
  for (let i = 0; i < maxCount; i += 1) {
    const index = Math.floor(randomFn() * pool.length);
    const clampedIndex = Math.max(0, Math.min(pool.length - 1, index));
    const [choice] = pool.splice(clampedIndex, 1);
    if (choice !== undefined) {
      picks.push(choice);
    }
  }
  return picks;
}

function generatePopulationBreakdownFromOptions(options, population, random, config = {}) {
  if (!Array.isArray(options) || options.length === 0) {
    return [];
  }

  const randomFn = typeof random === 'function' ? random : Math.random;
  const {
    majorityIndex = 0,
    majorityShareRange = [0, 1],
    ensureMajority = true
  } = config;

  const shares = [];
  const candidates = options.slice();
  let majorityShare = 0;

  if (ensureMajority && candidates.length > 0) {
    const rawIndex = Number.isFinite(majorityIndex) ? Math.round(majorityIndex) : 0;
    const index = clamp(rawIndex, 0, candidates.length - 1);
    const [rangeMinRaw, rangeMaxRaw] = Array.isArray(majorityShareRange)
      ? majorityShareRange
      : [0, 1];
    const rangeMin = clamp(Number.isFinite(rangeMinRaw) ? rangeMinRaw : 0, 0, 1);
    const rangeMax = clamp(Number.isFinite(rangeMaxRaw) ? rangeMaxRaw : 1, rangeMin, 1);
    const [selected] = candidates.splice(index, 1);
    if (selected) {
      const shareRange = rangeMax - rangeMin;
      const share = shareRange <= 0 ? rangeMin : rangeMin + randomFn() * shareRange;
      majorityShare = clamp(share, 0, 1);
      shares.push({ config: selected, share: majorityShare });
    }
  }

  const remainingConfigs = candidates;
  if (remainingConfigs.length > 0) {
    const remainingShare = ensureMajority ? Math.max(0, 1 - majorityShare) : 1;
    const weights = remainingConfigs.map(() => 0.2 + randomFn());
    const weightSum = weights.reduce((sum, value) => sum + value, 0) || 1;
    remainingConfigs.forEach((config, index) => {
      const portion = weights[index] / weightSum;
      shares.push({ config, share: remainingShare * portion });
    });
  }

  let totalShare = shares.reduce((sum, entry) => sum + entry.share, 0);
  if (shares.length > 0 && Number.isFinite(totalShare) && totalShare !== 1) {
    const lastEntry = shares[shares.length - 1];
    const adjustment = clamp(1 - totalShare, -1, 1);
    lastEntry.share = clamp(lastEntry.share + adjustment, 0, 1);
    totalShare = shares.reduce((sum, entry) => sum + entry.share, 0);
  }

  const safeTotalShare = totalShare > 0 ? totalShare : 1;
  const normalizedShares = shares.map((entry) => ({
    config: entry.config,
    share: clamp(entry.share / safeTotalShare, 0, 1)
  }));

  const percentageDecimals = 2;
  const percentageScale = 10 ** percentageDecimals;
  const totalUnits = 100 * percentageScale;

  const scaledEntries = normalizedShares.map(({ config, share }) => {
    const safeShare = clamp(share, 0, 1);
    const rawPercentage = safeShare * 100;
    const scaledRaw = rawPercentage * percentageScale;
    const baseUnit = Math.floor(scaledRaw);
    const fraction = Math.max(0, Math.min(1, scaledRaw - baseUnit));
    return {
      config,
      baseUnit,
      fraction
    };
  });

  const baseUnits = scaledEntries.map((entry) => entry.baseUnit);
  let remainderUnits = totalUnits - baseUnits.reduce((sum, value) => sum + value, 0);
  const fractionalOrder = scaledEntries
    .map((entry, index) => ({ index, fraction: entry.fraction }))
    .sort((a, b) => b.fraction - a.fraction);

  if (fractionalOrder.length > 0) {
    let incrementIndex = 0;
    while (remainderUnits > 0) {
      const target = fractionalOrder[incrementIndex % fractionalOrder.length];
      baseUnits[target.index] += 1;
      remainderUnits -= 1;
      incrementIndex += 1;
    }

    const ascending = fractionalOrder.slice().reverse();
    let decrementIndex = 0;
    while (remainderUnits < 0 && ascending.length > 0) {
      const target = ascending[decrementIndex % ascending.length];
      if (baseUnits[target.index] > 0) {
        baseUnits[target.index] -= 1;
        remainderUnits += 1;
      }
      decrementIndex += 1;
    }
  }

  if (remainderUnits !== 0 && baseUnits.length > 0) {
    const lastIndex = baseUnits.length - 1;
    const adjusted = Math.max(0, Math.min(totalUnits, baseUnits[lastIndex] + remainderUnits));
    remainderUnits -= adjusted - baseUnits[lastIndex];
    baseUnits[lastIndex] = adjusted;
  }

  const resolvedPopulation = Number.isFinite(population) ? Math.max(0, Math.round(population)) : null;

  return scaledEntries.map(({ config }, index) => {
    const percentage = clamp(baseUnits[index] / percentageScale, 0, 100);
    const count =
      resolvedPopulation === null
        ? null
        : Math.max(0, Math.round((resolvedPopulation * percentage) / 100));
    return {
      key: config.key,
      label: config.label,
      color: config.color,
      percentage,
      population: count
    };
  });
}

function generateTowerPopulationBreakdown(population, random) {
  return generatePopulationBreakdownFromOptions(towerPopulationRoleOptions, population, random, {
    majorityIndex: 0,
    majorityShareRange: [0.45, 0.7],
    ensureMajority: true
  });
}

function generateDwarfholdPopulationBreakdown(population, random) {
  return generatePopulationBreakdownFromOptions(dwarfholdPopulationRaceOptions, population, random, {
    majorityIndex: 0,
    majorityShareRange: [0.9, 1],
    ensureMajority: true
  });
}

function generateEvilWizardTowerPopulationBreakdown(population, random, wizardCount) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const resolvedPopulation = Math.max(0, Math.round(Number.isFinite(population) ? population : 0));
  const resolvedWizardCount = Math.max(
    0,
    Math.min(
      Math.round(Number.isFinite(wizardCount) ? wizardCount : 0),
      resolvedPopulation
    )
  );
  const remainderPopulation = Math.max(0, resolvedPopulation - resolvedWizardCount);

  const remainderBreakdown =
    remainderPopulation > 0
      ? generatePopulationBreakdownFromOptions(
          evilWizardTowerPopulationRaceOptions.slice(1),
          remainderPopulation,
          randomFn,
          {
            majorityIndex: 1,
            majorityShareRange: [0.35, 0.6],
            ensureMajority: true
          }
        )
      : [];

  const wizardEntry = {
    ...evilWizardTowerPopulationRaceOptions[0],
    percentage:
      resolvedPopulation === 0
        ? 0
        : clamp((resolvedWizardCount / resolvedPopulation) * 100, 0, 100),
    population: resolvedWizardCount
  };

  if (remainderBreakdown.length === 0) {
    return [wizardEntry];
  }

  return [
    wizardEntry,
    ...remainderBreakdown.map((entry) => ({
      ...entry,
      percentage:
        resolvedPopulation === 0
          ? 0
          : clamp((entry.population / resolvedPopulation) * 100, 0, 100)
    }))
  ];
}

function generateTownPopulationBreakdown(population, random) {
  return generatePopulationBreakdownFromOptions(townPopulationRaceOptions, population, random, {
    majorityIndex: 0,
    majorityShareRange: [0.6, 0.85],
    ensureMajority: true
  });
}

function generateWoodElfGrovePopulationBreakdown(population, random) {
  return generatePopulationBreakdownFromOptions(
    woodElfGrovePopulationRoleOptions,
    population,
    random,
    {
      majorityIndex: 0,
      majorityShareRange: [0.55, 0.75],
      ensureMajority: true
    }
  );
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

function generateDwarfholdDetails(name, random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const population = Math.max(120, Math.floor(450 + randomFn() * 4200));
  const genderRoll = randomFn();
  const gender = genderRoll < 0.9 ? 'male' : 'female';
  const namePool = dwarfNamePools[gender] || dwarfNamePools.male;
  const firstName = pickRandomFrom(namePool, randomFn) || 'Urist';
  const clanOption = pickRandomFrom(dwarfOptions.clan, randomFn) || dwarfOptions.clan?.[0];
  const clanName = clanOption?.label || 'Stonebeard';
  const titlePool = dwarfholdRulerTitles[gender] || dwarfholdRulerTitles.male;
  const titleFallback = 'Thane';
  const thaneBiasRoll = randomFn();
  const nonThaneTitles = titlePool.filter((title) => title !== 'Thane');
  const rulerTitle =
    thaneBiasRoll < 0.65 || nonThaneTitles.length === 0
      ? 'Thane'
      : pickRandomFrom(nonThaneTitles, randomFn) || titleFallback;
  const hallmark = pickRandomFrom(dwarfholdHallmarks, randomFn) ||
    'Renowned for stout walls and heartier spirits.';
  const foundedYearsAgo = Math.max(30, Math.floor(80 + randomFn() * 540));
  const prominentClanOption = randomFn() < 0.35 ? pickRandomFrom(dwarfOptions.clan, randomFn) : clanOption;
  const prominentClan = prominentClanOption?.label || clanName;
  const majorGuildCount = clamp(Math.floor(2 + randomFn() * 3), 1, dwarfGuildOptions.length);
  const majorGuilds = pickUniqueFrom(
    dwarfGuildOptions.map((option) => option.label),
    majorGuildCount,
    randomFn
  );
  const majorExportCount = clamp(Math.floor(2 + randomFn() * 2), 1, dwarfholdExportOptions.length);
  const majorExports = pickUniqueFrom(dwarfholdExportOptions, majorExportCount, randomFn);
  const populationBreakdown = generateDwarfholdPopulationBreakdown(population, randomFn);

  const classification = population >= 4000 ? 'greatDwarfhold' : 'dwarfhold';
  const classificationLabel = classification === 'greatDwarfhold' ? 'Great Dwarfhold' : 'Dwarfhold';

  return {
    type: classification,
    classification: classificationLabel,
    name,
    population,
    populationLabel: 'Population',
    populationDescriptor: 'dwarves',
    isSettlement: true,
    ruler: {
      title: rulerTitle,
      name: `${firstName} ${clanName}`
    },
    foundedYearsAgo,
    prominentClan,
    prominentGroup: prominentClan,
    prominentGroupLabel: 'Prominent Clan',
    hallmark,
    majorGuilds,
    majorExports,
    populationBreakdown
  };
}

function generateEvilWizardTowerDetails(name, random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const population = Math.max(40, Math.floor(80 + randomFn() * 520));
  const wizardRoll = randomFn();
  const wizardCount =
    wizardRoll < 0.7
      ? 1
      : 2 + Math.floor(randomFn() * 9);
  const resolvedWizardCount = Math.max(1, Math.min(wizardCount, population));
  let classification = 'Wizard Tower';
  if (population >= 400) {
    classification = 'Dread Citadel';
  } else if (population >= 240) {
    classification = 'Shadow Spire';
  } else if (population >= 140) {
    classification = 'Arcane Bastion';
  }

  const rulerTitle = pickRandomFrom(evilWizardRulerTitles, randomFn) || 'Archwizard';
  const rulerName = generateEvilWizardName(randomFn);
  const foundedYearsAgo = Math.max(6, Math.floor(20 + randomFn() * 240));
  const cabal = pickRandomFrom(evilWizardCabalNames, randomFn);
  const prominentGroup = cabal || null;
  const hallmark = pickRandomFrom(evilWizardTowerHallmarks, randomFn) ||
    'Shrouded in eldritch wards that thrum through the night.';
  const populationBreakdown = generateEvilWizardTowerPopulationBreakdown(
    population,
    randomFn,
    resolvedWizardCount
  );

  return {
    type: 'evilWizardTower',
    classification,
    name,
    population,
    populationLabel: 'Population',
    populationDescriptor: 'denizens',
    isSettlement: true,
    ruler: {
      title: rulerTitle,
      name: rulerName
    },
    foundedYearsAgo,
    prominentGroup,
    prominentGroupLabel: 'Dominant Cabal',
    hallmark,
    hallmarkLabel: 'Notorious For',
    populationBreakdown
  };
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

function generateTownDetails(name, random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const population = Math.max(120, Math.floor(220 + randomFn() * 6000));
  let classification = 'Village';
  if (population >= 6000) {
    classification = 'City';
  } else if (population >= 3600) {
    classification = 'Large Town';
  } else if (population >= 1800) {
    classification = 'Town';
  }

  const type = classification === 'City' ? 'city' : classification === 'Village' ? 'village' : 'town';
  const genderRoll = randomFn();
  const gender = genderRoll < 0.45 ? 'male' : genderRoll < 0.9 ? 'female' : 'neutral';
  const firstNamePool =
    (gender === 'male' && townFirstNamePools.male) ||
    (gender === 'female' && townFirstNamePools.female) ||
    townFirstNamePools.neutral;
  const fallbackPool = townFirstNamePools.male || townFirstNamePools.neutral || [];
  const firstName = pickRandomFrom(firstNamePool && firstNamePool.length > 0 ? firstNamePool : fallbackPool, randomFn) ||
    'Aldric';
  const familyName = pickRandomFrom(townProminentFamilyNames, randomFn) || 'Ambermere';
  const rulerTitle = resolveTownRulerTitle(gender, randomFn);
  const hallmark = pickRandomFrom(townHallmarks, randomFn) || 'Bustling markets draw traders from afar.';
  const foundedYearsAgo = Math.max(12, Math.floor(30 + randomFn() * 420));
  const prominentFamily = pickRandomFrom(townProminentFamilyNames, randomFn) || familyName;
  const majorGuildCount = clamp(Math.floor(1 + randomFn() * 3), 1, townGuildOptions.length);
  const majorGuilds = pickUniqueFrom(townGuildOptions, majorGuildCount, randomFn);
  const majorExportCount = clamp(Math.floor(1 + randomFn() * 3), 1, townExportOptions.length);
  const majorExports = pickUniqueFrom(townExportOptions, majorExportCount, randomFn);
  const populationBreakdown = generateTownPopulationBreakdown(population, randomFn);
  let populationDescriptor = 'residents';
  if (classification === 'City') {
    populationDescriptor = 'citizens';
  } else if (classification === 'Large Town') {
    populationDescriptor = 'townsfolk';
  } else if (classification === 'Village') {
    populationDescriptor = 'villagers';
  }

  const prominentGroup = `House ${prominentFamily}`;

  return {
    type,
    classification,
    name,
    population,
    populationLabel: 'Population',
    populationDescriptor,
    isSettlement: true,
    ruler: {
      title: rulerTitle,
      name: `${firstName} ${familyName}`
    },
    foundedYearsAgo,
    prominentGroup,
    prominentGroupLabel: 'Prominent House',
    hallmark,
    majorGuilds,
    majorExports,
    populationBreakdown
  };
}

function generateEvilWizardName(random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const givenName = pickRandomFrom(evilWizardGivenNames, randomFn) || 'Malachar';
  const surnameRoll = randomFn();
  let name = givenName;
  if (surnameRoll < 0.55) {
    const surname = pickRandomFrom(evilWizardSurnames, randomFn);
    if (surname) {
      name = `${givenName} ${surname}`;
    }
  }
  const epithet = pickRandomFrom(evilWizardEpithets, randomFn);
  if (epithet && randomFn() < 0.8) {
    const baseName = name || givenName;
    name = `${baseName} ${epithet}`;
  }
  return name;
}

function generateTowerName(random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const prefix = pickRandomFrom(towerNamePrefixes, randomFn) || 'Obsidian';
  const noun = pickRandomFrom(towerNameNouns, randomFn) || 'Tower';
  const qualifier = pickRandomFrom(towerNameQualifiers, randomFn);
  const styleRoll = randomFn();
  if (styleRoll < 0.35 && qualifier) {
    return `${prefix} ${noun} ${qualifier}`;
  }
  if (styleRoll < 0.65) {
    return `${prefix} ${noun}`;
  }
  if (qualifier) {
    return `Tower ${qualifier}`;
  }
  return `${prefix} ${noun}`;
}

function generateTowerDetails(name, random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const population = Math.max(24, Math.floor(60 + randomFn() * 360));
  let classification = 'Watchtower';
  if (population >= 320) {
    classification = 'Border Fortress';
  } else if (population >= 240) {
    classification = 'Signal Bastion';
  } else if (population >= 160) {
    classification = 'Garrison Keep';
  } else if (population >= 100) {
    classification = 'Beacon Tower';
  }

  const commanderTitle = pickRandomFrom(towerCommanderTitles, randomFn) || 'Castellan';
  const firstName = pickRandomFrom(towerCommanderGivenNames, randomFn) || 'Aldren';
  const surname = pickRandomFrom(towerCommanderSurnames, randomFn) || 'Stonewatch';
  const commanderName = `${firstName} ${surname}`;
  const foundedYearsAgo = Math.max(6, Math.floor(14 + randomFn() * 220));
  const prominentGroup = pickRandomFrom(towerOrderNames, randomFn) || 'Order of the Dawnwatch';
  const hallmark = pickRandomFrom(towerHallmarks, randomFn) ||
    'Maintains vigilant watch over the frontier beacons.';
  const detachmentCount = clamp(Math.floor(1 + randomFn() * 3), 1, towerDetachmentOptions.length);
  const detachments = pickUniqueFrom(towerDetachmentOptions, detachmentCount, randomFn);
  const dutyCount = clamp(Math.floor(1 + randomFn() * 2), 1, towerDutyOptions.length);
  const duties = pickUniqueFrom(towerDutyOptions, dutyCount, randomFn);
  const populationBreakdown = generateTowerPopulationBreakdown(population, randomFn);

  return {
    type: 'tower',
    classification,
    name,
    population,
    populationLabel: 'Garrison Strength',
    populationDescriptor: 'guards',
    isSettlement: true,
    ruler: {
      title: commanderTitle,
      name: commanderName
    },
    foundedYearsAgo,
    prominentGroup,
    prominentGroupLabel: 'Garrison Order',
    hallmark,
    hallmarkLabel: 'Renowned For',
    majorGuilds: detachments,
    majorGuildsLabel: 'Special Detachments',
    majorExports: duties,
    majorExportsLabel: 'Primary Duties',
    populationBreakdown
  };
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

function generateWoodElfGroveDetails(name, random) {
  const randomFn = typeof random === 'function' ? random : Math.random;
  const population = Math.max(60, Math.floor(140 + randomFn() * 420));
  let classification = 'Forest Retreat';
  if (population >= 500) {
    classification = 'Ancient Grove';
  } else if (population >= 360) {
    classification = 'Sacred Grove';
  } else if (population >= 240) {
    classification = 'Hidden Enclave';
  } else if (population >= 180) {
    classification = 'Canopy Sanctuary';
  }

  let populationDescriptor = 'wardens';
  if (classification === 'Ancient Grove') {
    populationDescriptor = 'elders';
  } else if (classification === 'Sacred Grove') {
    populationDescriptor = 'keepers';
  } else if (classification === 'Hidden Enclave') {
    populationDescriptor = 'sentinels';
  } else if (classification === 'Canopy Sanctuary') {
    populationDescriptor = 'guardians';
  }

  const elderTitle = pickRandomFrom(woodElfGroveElderTitles, randomFn) || 'Grove Warden';
  const givenName = pickRandomFrom(woodElfGroveElderGivenNames, randomFn) || 'Aelar';
  const surname = pickRandomFrom(woodElfGroveElderSurnames, randomFn) || 'Silversong';
  const hallmark = pickRandomFrom(woodElfGroveHallmarks, randomFn) ||
    'Moonlit rites that weave auroras between the branches.';
  const foundedYearsAgo = Math.max(40, Math.floor(120 + randomFn() * 520));
  const prominentGroup = pickRandomFrom(woodElfGroveCircleNames, randomFn) || 'Circle of the Silver Bough';
  const majorGuildCount = clamp(Math.floor(1 + randomFn() * 2), 1, woodElfGroveOrders.length);
  const majorGuilds = pickUniqueFrom(woodElfGroveOrders, majorGuildCount, randomFn);
  const majorExportCount = clamp(Math.floor(1 + randomFn() * 2), 1, woodElfGroveExports.length);
  const majorExports = pickUniqueFrom(woodElfGroveExports, majorExportCount, randomFn);
  const populationBreakdown = generateWoodElfGrovePopulationBreakdown(population, randomFn);

  return {
    type: 'woodElfGrove',
    classification,
    name,
    population,
    populationLabel: 'Population',
    populationDescriptor,
    isSettlement: true,
    ruler: {
      title: elderTitle,
      name: `${givenName} ${surname}`
    },
    foundedYearsAgo,
    prominentGroup,
    prominentGroupLabel: 'Circle in Residence',
    hallmark,
    hallmarkLabel: 'Revered For',
    majorGuilds,
    majorGuildsLabel: 'Sacred Orders',
    majorExports,
    majorExportsLabel: 'Seasonal Offerings',
    populationBreakdown
  };
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
    forestFrequency: defaultForestFrequency,
    mountainFrequency: defaultMountainFrequency,
    riverFrequency: 50,
    humanSettlementFrequency: 50,
    dwarfSettlementFrequency: 50,
    woodElfSettlementFrequency: 50
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
  { value: 'miners-guild', label: 'Miners Guild' },
  { value: 'merchants-guild', label: 'Merchants Guild' },
  { value: 'commerce-guild', label: 'Commerce Guild' },
  { value: 'armourers-weaponsmiths-guild', label: 'Armourers and Weaponsmiths Guild' },
  { value: 'artisans-guild', label: 'Artisans Guild' },
  { value: 'bakers-guild', label: 'Bakers Guild' },
  { value: 'brewers-guild', label: 'Brewers Guild' },
  { value: 'carpenters-guild', label: 'Carpenters Guild' },
  { value: 'construction-guild', label: 'Construction Guild' },
  { value: 'corpsebinders-guild', label: 'Corpsebinders Guild' },
  { value: 'distiller-guild', label: 'Distiller Guild' },
  { value: 'dyers-guild', label: 'Dyers Guild' },
  { value: 'engineers-guild', label: 'Engineers Guild' },
  { value: 'farmers-herders-guild', label: 'Farmers and Herders Guild' },
  { value: 'gemcutters-guild', label: 'Gemcutters Guild' },
  { value: 'goldsmiths-guild', label: 'Goldsmiths Guild' },
  { value: 'guild-of-alchemists', label: 'Guild of Alchemists' },
  { value: 'jewelsmiths-guild', label: 'Jewelsmiths Guild' },
  { value: 'leatherworkers-guild', label: 'Leatherworkers Guild' },
  { value: 'metalsmiths-guild', label: 'Metalsmiths Guild' },
  { value: 'powdermakers-guild', label: 'Powdermakers Guild' },
  { value: 'saltworkers-guild', label: 'Saltworkers Guild' },
  { value: 'stonemasons-guild', label: 'Stonemasons Guild' },
  { value: 'runescribes-guild', label: 'Runescribes Guild' },
  { value: 'runesmiths', label: 'Runesmiths' },
  { value: 'warriors-guild', label: 'Warriors Guild' },
  { value: 'toolmakers-guild', label: "Toolmakers' Guild" },
  { value: 'soapmakers-guild', label: 'Soapmakers Guild' },
  { value: 'candlelighters-guild', label: 'Candlelighters Guild' },
  { value: 'lamplighters-guild', label: 'Lamplighters Guild' },
  { value: 'butchers-guild', label: 'Butchers Guild' },
  { value: 'ropemakers-guild', label: 'Ropemakers Guild' },
  { value: 'cartwrights-wheelwrights-guild', label: 'Cartwrights & Wheelwrights Guild' },
  { value: 'glassblowers-guild', label: 'Glassblowers Guild' },
  { value: 'millers-guild', label: 'Millers Guild' },
  { value: 'cobblers-guild', label: 'Cobblers Guild' },
  { value: 'cartographers-guild', label: 'Cartographers Guild' },
  { value: 'lorekeepers-guild', label: 'Lorekeepers Guild' },
  { value: 'tunnel-wardens-guild', label: 'Tunnel Wardens Guild' },
  { value: 'smelters-guild', label: 'Smelters Guild' }
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
  bald: {
    label: 'Bald',
    description: 'bald',
    rows: { default: null },
    hideHairColorDescription: true
  },
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
  curly_stubble: {
    label: 'Curly — Close Shave',
    description: 'closely shorn curly',
    sheet: 'hairCurly',
    rows: { default: 0 }
  },
  curly_short_unkempt: {
    label: 'Curly — Short & Tousled',
    description: 'short unkempt curly',
    sheet: 'hairCurly',
    rows: { default: 1 }
  },
  curly_mid_unkempt: {
    label: 'Curly — Mid-Length Tousled',
    description: 'mid-length unkempt curly',
    sheet: 'hairCurly',
    rows: { default: 2 }
  },
  curly_long_unkempt: {
    label: 'Curly — Long & Tousled',
    description: 'long unkempt curly',
    sheet: 'hairCurly',
    rows: { default: 3 }
  },
  curly_short_combed: {
    label: 'Curly — Short Combed',
    description: 'short combed curly',
    sheet: 'hairCurly',
    rows: { default: 4 }
  },
  curly_mid_combed: {
    label: 'Curly — Mid-Length Combed',
    description: 'mid-length combed curly',
    sheet: 'hairCurly',
    rows: { default: 5 }
  },
  curly_long_combed: {
    label: 'Curly — Long Combed',
    description: 'long combed curly',
    sheet: 'hairCurly',
    rows: { default: 6 }
  },
  curly_short_braided: {
    label: 'Curly — Short Braids',
    description: 'short braided curly',
    sheet: 'hairCurly',
    rows: { default: 7 }
  },
  curly_mid_braided: {
    label: 'Curly — Mid Braids',
    description: 'mid-length braided curly',
    sheet: 'hairCurly',
    rows: { default: 8 }
  },
  curly_long_braided: {
    label: 'Curly — Long Braids',
    description: 'long braided curly',
    sheet: 'hairCurly',
    rows: { default: 9 }
  },
  curly_short_double_braids: {
    label: 'Curly — Short Double Braids',
    description: 'short double-braided curly',
    sheet: 'hairCurly',
    rows: { default: 10 }
  },
  curly_mid_double_braids: {
    label: 'Curly — Mid Double Braids',
    description: 'mid-length double-braided curly',
    sheet: 'hairCurly',
    rows: { default: 11 }
  },
  curly_long_double_braids: {
    label: 'Curly — Long Double Braids',
    description: 'long double-braided curly',
    sheet: 'hairCurly',
    rows: { default: 12 }
  }
};

const dwarfHairStyleAliases = {
  curly_short: 'curly_short_combed',
  curly_full: 'curly_mid_combed',
  curly_wild: 'curly_long_combed'
};

const dwarfHeadTypes = {
  type1: { label: 'Head Type I', column: 0 },
  type2: { label: 'Head Type II', column: 1 },
  type3: { label: 'Head Type III', column: 2 },
  type4: { label: 'Head Type IV', column: 3 },
  type5: { label: 'Head Type V', column: 4 },
  type6: { label: 'Head Type VI', column: 5 },
  type7: { label: 'Head Type VII', column: 6 },
  type8: { label: 'Head Type VIII', column: 7 }
};

const dwarfHeadOptions = Object.entries(dwarfHeadTypes).map(([value, config]) => ({
  value,
  label: config.label
}));

const defaultHeadTypeValue = 'type5';

function resolveHeadTypeValue(value) {
  if (!value) {
    return defaultHeadTypeValue;
  }
  return Object.prototype.hasOwnProperty.call(dwarfHeadTypes, value) ? value : defaultHeadTypeValue;
}

const dwarfOptions = {
  gender: [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' }
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
  head: dwarfHeadOptions,
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
  'head',
  'hairStyle',
  'hair',
  'beard',
  'clan',
  'guild',
  'profession'
]);

const dwarfTraitAttributeDefinitions = [
  {
    key: 'beardless',
    label: 'Beardless',
    description:
      'You are the shame of your clan and the disgrace of your holdfast. Without a beard a dwarf is nothing, consider this path to be one that will lead to scorn and ridicule among your peers.',
    icon: 'tilesheet/beardless.png',
    isActive: (dwarf) => dwarf?.gender === 'male' && dwarf?.beard === 'clean'
  },
  {
    key: 'dark-dwarf',
    label: 'Dark Dwarf Heritage',
    description:
      'Your soot colored skin indicates you to hail from the ash covered lands of Dun Mortis. You are known by your ivory skinned cousins as the Dark Dwarves, a race cast away from the light of the All-father into the refuge bin of Stonebeards furance. You are hated by your kin as an oathbreaker by virture of your birthright and if you attempt to enter into their holds will likely be killed on sight.',
    icon: 'tilesheet/darkdwarf.png',
    isActive: (dwarf) => dwarf?.skin === 'umber'
  }
];

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
  ]
};

const presetDwarfFirstNames = new Set(
  Object.values(dwarfNamePools).reduce((allNames, pool) => allNames.concat(pool), [])
);

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
  if (!value) {
    return defaultHairStyleValue;
  }
  const alias = dwarfHairStyleAliases[value];
  const key = alias || value;
  return dwarfHairStyles[key] ? key : defaultHairStyleValue;
}

function getHairStyleConfig(value) {
  const key = resolveHairStyleValue(value);
  return dwarfHairStyles[key];
}

function getHairStyleDescription(value) {
  const config = getHairStyleConfig(value);
  return config?.description || getOptionLabel('hairStyle', value);
}

function getHairSummaryPhrase(dwarf) {
  const styleConfig = getHairStyleConfig(dwarf?.hairStyle);
  const hairStyleDescription = (getHairStyleDescription(dwarf?.hairStyle) || '').toLowerCase();
  if (styleConfig?.hideHairColorDescription) {
    return hairStyleDescription || 'bald';
  }
  const hairLabel = (getOptionLabel('hair', dwarf?.hair) || '').toLowerCase();
  if (hairStyleDescription && hairLabel) {
    return `${hairStyleDescription} ${hairLabel} hair`;
  }
  if (hairStyleDescription) {
    return `${hairStyleDescription} hair`;
  }
  if (hairLabel) {
    return `${hairLabel} hair`;
  }
  return 'hair';
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

const dwarfBaseBodyTint = '#5b473c';

const dwarfPortraitBaseFrames = {
  male: { sheet: 'body', col: 4, row: 8, tint: dwarfBaseBodyTint, offsetY: 4 },
  female: { sheet: 'body', col: 4, row: 9, tint: dwarfBaseBodyTint, offsetY: 4 }
};

const dwarfPortraitConfig = {
  tileSize: 32,
  scale: 4,
  baseFrame: dwarfPortraitBaseFrames.male,
  baseFrames: dwarfPortraitBaseFrames,
  head: { sheet: 'eyes', row: 0, offsetY: 0 },
  hairOffsetY: -2,
  beardOffsetY: 2,
  eyePositions: [
    { x: 13.75, y: 9.75 },
    { x: 18.75, y: 9.75 }
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

const soundEffects = {
  randomiseClick: createSoundEffect('sound/sounds/rolling-dice.mp3', {
    volume: 0.6
  })
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
  worldMapSizeSelect: document.getElementById('world-map-size-select'),
  worldSeedInput: document.getElementById('world-seed-input'),
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
  dwarfPrev: document.getElementById('dwarf-prev'),
  dwarfNext: document.getElementById('dwarf-next'),
  dwarfSlotLabel: document.getElementById('dwarf-slot-label'),
  dwarfNameInput: document.getElementById('dwarf-name-input'),
  dwarfGenderButtons: document.getElementById('dwarf-gender-buttons'),
  dwarfClanSelect: document.getElementById('dwarf-clan-select'),
  dwarfGuildSelect: document.getElementById('dwarf-guild-select'),
  dwarfProfessionSelect: document.getElementById('dwarf-profession-select'),
  dwarfSkinSlider: document.getElementById('dwarf-skin-slider'),
  dwarfSkinSliderValue: document.getElementById('dwarf-skin-slider-value'),
  dwarfHeadSlider: document.getElementById('dwarf-head-slider'),
  dwarfHeadSliderValue: document.getElementById('dwarf-head-slider-value'),
  dwarfEyeSlider: document.getElementById('dwarf-eye-slider'),
  dwarfEyeSliderValue: document.getElementById('dwarf-eye-slider-value'),
  dwarfHairStyleSlider: document.getElementById('dwarf-hair-style-slider'),
  dwarfHairStyleSliderValue: document.getElementById('dwarf-hair-style-slider-value'),
  dwarfHairSlider: document.getElementById('dwarf-hair-slider'),
  dwarfHairSliderValue: document.getElementById('dwarf-hair-slider-value'),
  dwarfBeardSlider: document.getElementById('dwarf-beard-slider'),
  dwarfBeardSliderValue: document.getElementById('dwarf-beard-slider-value'),
  dwarfBeardFieldGroup: document.getElementById('dwarf-beard-field-group'),
  dwarfRandomise: document.getElementById('dwarf-randomise'),
  dwarfBack: document.getElementById('dwarf-back'),
  dwarfPortrait: document.getElementById('dwarf-portrait'),
  dwarfPortraitCanvas: document.getElementById('dwarf-portrait-canvas'),
  dwarfTraitSummary: document.getElementById('dwarf-trait-summary'),
  dwarfTraitAttributes: document.getElementById('dwarf-trait-attributes')
};

function createSoundEffect(src, options = {}) {
  const audio = new Audio(src);
  audio.preload = options.preload ?? 'auto';
  if (typeof options.volume === 'number') {
    const clampedVolume = Math.max(0, Math.min(1, options.volume));
    audio.volume = clampedVolume;
  }
  return audio;
}

function playSoundEffect(audio) {
  if (!audio) {
    return;
  }
  try {
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  } catch (error) {
    /* ignore playback errors triggered by browser policies */
  }
}

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
  const riverFrequencyRaw = elements.riverFrequencyInput
    ? Number.parseInt(elements.riverFrequencyInput.value, 10)
    : state.settings.riverFrequency;
  const humanSettlementFrequencyRaw = elements.humanSettlementFrequencyInput
    ? Number.parseInt(elements.humanSettlementFrequencyInput.value, 10)
    : state.settings.humanSettlementFrequency;
  const dwarfSettlementFrequencyRaw = elements.dwarfSettlementFrequencyInput
    ? Number.parseInt(elements.dwarfSettlementFrequencyInput.value, 10)
    : state.settings.dwarfSettlementFrequency;
  const woodElfSettlementFrequencyRaw = elements.woodElfSettlementFrequencyInput
    ? Number.parseInt(elements.woodElfSettlementFrequencyInput.value, 10)
    : state.settings.woodElfSettlementFrequency;

  applyMapSizePresetToState(preset);
  state.settings.seedString = seedString;
  if (seedString) {
    state.settings.lastSeedString = seedString;
  }
  state.settings.forestFrequency = sanitizeFrequencyValue(
    Number.isNaN(forestFrequencyRaw) ? state.settings.forestFrequency : forestFrequencyRaw,
    state.settings.forestFrequency
  );
  state.settings.mountainFrequency = sanitizeFrequencyValue(
    Number.isNaN(mountainFrequencyRaw) ? state.settings.mountainFrequency : mountainFrequencyRaw,
    state.settings.mountainFrequency
  );
  state.settings.riverFrequency = sanitizeFrequencyValue(
    Number.isNaN(riverFrequencyRaw) ? state.settings.riverFrequency : riverFrequencyRaw,
    state.settings.riverFrequency
  );
  state.settings.humanSettlementFrequency = sanitizeFrequencyValue(
    Number.isNaN(humanSettlementFrequencyRaw)
      ? state.settings.humanSettlementFrequency
      : humanSettlementFrequencyRaw,
    state.settings.humanSettlementFrequency
  );
  state.settings.dwarfSettlementFrequency = sanitizeFrequencyValue(
    Number.isNaN(dwarfSettlementFrequencyRaw)
      ? state.settings.dwarfSettlementFrequency
      : dwarfSettlementFrequencyRaw,
    state.settings.dwarfSettlementFrequency
  );
  state.settings.woodElfSettlementFrequency = sanitizeFrequencyValue(
    Number.isNaN(woodElfSettlementFrequencyRaw)
      ? state.settings.woodElfSettlementFrequency
      : woodElfSettlementFrequencyRaw,
    state.settings.woodElfSettlementFrequency
  );

  if (elements.worldMapSizeSelect) {
    elements.worldMapSizeSelect.value = state.settings.mapSize;
  }
  updateWorldInfoSizeDisplay();

  if (elements.worldSeedInput) {
    elements.worldSeedInput.value = state.settings.seedString;
  }
  updateWorldInfoSeedDisplay(state.settings.seedString);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function compute1dDistanceTransform(sourceLine, length, outputLine, v, z) {
  let k = 0;
  v[0] = 0;
  z[0] = Number.NEGATIVE_INFINITY;
  z[1] = Number.POSITIVE_INFINITY;
  for (let q = 1; q < length; q += 1) {
    let s;
    do {
      const p = v[k];
      const numerator = sourceLine[q] + q * q - (sourceLine[p] + p * p);
      const denominator = 2 * (q - p);
      s = numerator / denominator;
      if (s <= z[k]) {
        k -= 1;
      } else {
        break;
      }
    } while (k >= 0);
    k += 1;
    v[k] = q;
    z[k] = s;
    z[k + 1] = Number.POSITIVE_INFINITY;
  }
  k = 0;
  for (let q = 0; q < length; q += 1) {
    while (z[k + 1] < q) {
      k += 1;
    }
    const p = v[k];
    const diff = q - p;
    outputLine[q] = diff * diff + sourceLine[p];
  }
}

function computeEuclideanDistanceField(sourceMask, width, height) {
  const size = width * height;
  const distances = new Float64Array(size);
  const inf = 1e12;
  for (let i = 0; i < size; i += 1) {
    distances[i] = sourceMask[i] ? 0 : inf;
  }
  const maxDim = Math.max(width, height);
  const lineBuffer = new Float64Array(maxDim);
  const lineResult = new Float64Array(maxDim);
  const v = new Int32Array(maxDim);
  const z = new Float64Array(maxDim + 1);

  for (let y = 0; y < height; y += 1) {
    const offset = y * width;
    for (let x = 0; x < width; x += 1) {
      lineBuffer[x] = distances[offset + x];
    }
    compute1dDistanceTransform(lineBuffer, width, lineResult, v, z);
    for (let x = 0; x < width; x += 1) {
      distances[offset + x] = lineResult[x];
    }
  }

  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      lineBuffer[y] = distances[y * width + x];
    }
    compute1dDistanceTransform(lineBuffer, height, lineResult, v, z);
    for (let y = 0; y < height; y += 1) {
      distances[y * width + x] = lineResult[y];
    }
  }

  return distances;
}

function escapeHtml(value) {
  if (value === null || value === undefined) {
    return '';
  }
  return String(value).replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return char;
    }
  });
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

function computeFrequencyMultiplier(setting, minMultiplier = 0.25, maxMultiplier = 1.75) {
  const normalized = clamp(setting / 100, 0, 1);
  return lerp(minMultiplier, maxMultiplier, normalized);
}

function computeStructurePlacementLimit(baseTarget, baseLimit, multiplier) {
  const scaledTarget = Math.max(1, Math.round(baseTarget * multiplier));
  const scaledLimit = Math.max(1, Math.round(baseLimit * multiplier));
  return Math.min(scaledTarget, scaledLimit);
}

function adjustMinDistance(baseDistance, normalized) {
  const scale = lerp(1.35, 0.7, clamp(normalized, 0, 1));
  return Math.max(2, Math.round(baseDistance * scale));
}

function connectTownsWithinRange(tiles, towns, options = {}) {
  if (!Array.isArray(tiles) || !Array.isArray(towns) || towns.length < 2) {
    return;
  }

  const {
    maxDistance = 25,
    overlayKey = TOWN_ROAD_OVERLAY_KEY,
    width,
    height,
    isLandBaseTile,
    waterMask,
    treeOverlayKey,
    treeSnowOverlayKey,
    isMountainOverlay,
    replaceableOverlays
  } = options;

  if (!overlayKey || !Number.isFinite(maxDistance) || maxDistance <= 0) {
    return;
  }

  const mapHeight = Number.isFinite(height) ? height : tiles.length;
  const mapWidth = Number.isFinite(width)
    ? width
    : tiles.length > 0 && Array.isArray(tiles[0])
      ? tiles[0].length
      : 0;

  if (!Number.isFinite(mapWidth) || mapWidth <= 0 || !Number.isFinite(mapHeight) || mapHeight <= 0) {
    return;
  }

  const maxDistanceSq = maxDistance * maxDistance;

  for (let i = 0; i < towns.length; i += 1) {
    const townA = towns[i];
    if (!townA || !Number.isFinite(townA.x) || !Number.isFinite(townA.y)) {
      continue;
    }
    for (let j = i + 1; j < towns.length; j += 1) {
      const townB = towns[j];
      if (!townB || !Number.isFinite(townB.x) || !Number.isFinite(townB.y)) {
        continue;
      }
      const dx = townA.x - townB.x;
      const dy = townA.y - townB.y;
      if (dx * dx + dy * dy > maxDistanceSq) {
        continue;
      }
      carveRoadBetweenPoints(townA, townB, {
        tiles,
        overlayKey,
        width: mapWidth,
        height: mapHeight,
        isLandBaseTile,
        waterMask,
        treeOverlayKey,
        treeSnowOverlayKey,
        isMountainOverlay,
        replaceableOverlays
      });
    }
  }
}

function carveRoadBetweenPoints(start, end, options) {
  if (!start || !end || !options || !options.tiles) {
    return;
  }

  let x0 = Math.round(start.x);
  let y0 = Math.round(start.y);
  const x1 = Math.round(end.x);
  const y1 = Math.round(end.y);

  const dx = Math.abs(x1 - x0);
  const sx = x0 < x1 ? 1 : -1;
  const dy = -Math.abs(y1 - y0);
  const sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;

  while (true) {
    placeRoadOverlayAt(x0, y0, options);
    if (x0 === x1 && y0 === y1) {
      break;
    }
    const e2 = err * 2;
    if (e2 >= dy) {
      err += dy;
      x0 += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y0 += sy;
    }
  }
}

function placeRoadOverlayAt(x, y, options) {
  const {
    tiles,
    overlayKey = TOWN_ROAD_OVERLAY_KEY,
    width,
    height,
    isLandBaseTile,
    waterMask,
    treeOverlayKey,
    treeSnowOverlayKey,
    isMountainOverlay,
    replaceableOverlays
  } = options || {};

  if (!tiles || !overlayKey) {
    return;
  }

  if (x < 0 || y < 0 || !Number.isFinite(x) || !Number.isFinite(y)) {
    return;
  }

  const mapWidth = Number.isFinite(width) ? width : tiles.length > 0 ? tiles[0].length : 0;
  const mapHeight = Number.isFinite(height) ? height : tiles.length;

  if (x >= mapWidth || y >= mapHeight) {
    return;
  }

  const row = tiles[y];
  if (!Array.isArray(row)) {
    return;
  }

  const tile = row[x];
  if (!tile || tile.structure || tile.river) {
    return;
  }

  if (typeof isLandBaseTile === 'function' && !isLandBaseTile(tile.base)) {
    return;
  }

  if (waterMask && (Array.isArray(waterMask) || waterMask instanceof Uint8Array)) {
    const idx = y * mapWidth + x;
    if (idx >= 0 && idx < waterMask.length && waterMask[idx]) {
      return;
    }
  }

  if (typeof isMountainOverlay === 'function' && isMountainOverlay(tile.overlay)) {
    return;
  }

  if (tile.overlay && tile.overlay !== overlayKey) {
    let canReplace = false;
    if (replaceableOverlays) {
      if (typeof replaceableOverlays.has === 'function') {
        canReplace = replaceableOverlays.has(tile.overlay);
      } else if (Array.isArray(replaceableOverlays)) {
        canReplace = replaceableOverlays.includes(tile.overlay);
      }
    }
    if (!canReplace) {
      const isTreeOverlay =
        treeOverlayKey && (tile.overlay === treeOverlayKey || tile.overlay === treeSnowOverlayKey);
      if (!isTreeOverlay) {
        return;
      }
    }
  }

  tile.overlay = overlayKey;
}

function tryPlaceDwarfhold(candidate, options) {
  if (!candidate || !options) {
    return false;
  }
  const {
    placed,
    minDistanceSq,
    tiles,
    width,
    waterMask,
    mountainScores,
    fallbackMountainScoreThreshold,
    mountainOverlayKey,
    dwarfholdKey,
    greatDwarfholdKey,
    rng,
    dwarfholds
  } = options;

  if (!tiles || !Array.isArray(tiles[candidate.y])) {
    return false;
  }

  const tile = tiles[candidate.y][candidate.x];
  if (!tile || tile.structure || tile.river) {
    return false;
  }

  if (
    Array.isArray(placed) &&
    Number.isFinite(minDistanceSq) &&
    minDistanceSq > 0 &&
    placed.length > 0
  ) {
    for (let i = 0; i < placed.length; i += 1) {
      const other = placed[i];
      const dx = candidate.x - other.x;
      const dy = candidate.y - other.y;
      if (dx * dx + dy * dy < minDistanceSq) {
        return false;
      }
    }
  }

  const idx = candidate.y * width + candidate.x;
  const qualifiesForPlacement =
    candidate.isMountainTile ||
    (!tile.overlay &&
      mountainScores &&
      mountainScores[idx] >= fallbackMountainScoreThreshold &&
      waterMask &&
      !waterMask[idx]);

  if (!qualifiesForPlacement) {
    return false;
  }

  if (!candidate.isMountainTile && mountainOverlayKey && !tile.overlay) {
    tile.overlay = mountainOverlayKey;
  }

  const name = generateDwarfholdName(rng);
  const details = generateDwarfholdDetails(name, rng);
  const structureKey =
    details.type === 'greatDwarfhold' && greatDwarfholdKey
      ? greatDwarfholdKey
      : dwarfholdKey;

  tile.structure = structureKey;
  tile.structureName = name;
  tile.structureDetails = details;

  if (Array.isArray(placed)) {
    placed.push(candidate);
  }
  if (Array.isArray(dwarfholds)) {
    dwarfholds.push({ x: candidate.x, y: candidate.y, ...details });
  }

  return true;
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
  let resolvedValue = value;
  if (category === 'hairStyle') {
    resolvedValue = resolveHairStyleValue(value);
  } else if (category === 'head') {
    resolvedValue = resolveHeadTypeValue(value);
  }
  return bucket.find((option) => option.value === resolvedValue) || bucket[0];
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

function extractFirstName(fullName) {
  if (!fullName) {
    return '';
  }
  const trimmed = fullName.trim();
  if (!trimmed) {
    return '';
  }
  const [firstName] = trimmed.split(/\s+/);
  return firstName || '';
}

function isPresetDwarfFirstName(firstName) {
  return presetDwarfFirstNames.has(firstName);
}

function createRandomDwarf(preferredGender) {
  const genderOption = preferredGender
    ? getOptionByValue('gender', preferredGender)
    : randomChoice(dwarfOptions.gender);
  const genderValue = genderOption ? genderOption.value : dwarfOptions.gender[0].value;
  const skinOption = randomChoice(dwarfOptions.skin) || dwarfOptions.skin[0];
  const eyeOption = randomChoice(dwarfOptions.eyes) || dwarfOptions.eyes[0];
  const headOption = randomChoice(dwarfOptions.head) || dwarfOptions.head[0];
  const hairStyleOption = randomChoice(dwarfOptions.hairStyle) || dwarfOptions.hairStyle[0];
  const hairOption = randomChoice(dwarfOptions.hair) || dwarfOptions.hair[0];
  const beardOption =
    genderValue === 'female'
      ? dwarfOptions.beard.find((option) => option.value === 'clean') || dwarfOptions.beard[0]
      : randomChoice(dwarfOptions.beard) || dwarfOptions.beard[0];
  const clanOption = randomChoice(dwarfOptions.clan) || dwarfOptions.clan[0];
  const guildOption = randomChoice(dwarfOptions.guild) || dwarfOptions.guild[0];
  const professionOption = randomChoice(dwarfOptions.profession) || dwarfOptions.profession[0];

  return {
    name: generateDwarfName(genderValue, clanOption?.value),
    gender: genderValue,
    skin: skinOption.value,
    eyes: eyeOption.value,
    head: resolveHeadTypeValue(headOption.value),
    hairStyle: resolveHairStyleValue(hairStyleOption.value),
    hair: hairOption.value,
    beard: genderValue === 'female' ? 'clean' : beardOption.value,
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

function getBaseBodyFrame(dwarf) {
  const frames = dwarfPortraitConfig.baseFrames;
  const gender = dwarf?.gender;
  if (gender && frames && Object.prototype.hasOwnProperty.call(frames, gender)) {
    return frames[gender];
  }
  return dwarfPortraitConfig.baseFrame || null;
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

function getHeadFrame(headValue) {
  const headConfig = dwarfPortraitConfig.head;
  const resolvedValue = resolveHeadTypeValue(headValue);
  const headType = dwarfHeadTypes[resolvedValue];
  if (!headConfig || !headType) {
    return null;
  }
  return {
    sheet: headConfig.sheet,
    col: headType.column,
    row: headConfig.row,
    offsetY: headConfig.offsetY ?? 0
  };
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

function getBeardFrame(dwarf, hairOption) {
  if (!dwarf || dwarf.gender === 'female') {
    return null;
  }
  const beardValue = dwarf.beard || 'clean';
  const hasBeardConfig = Object.prototype.hasOwnProperty.call(dwarfBeardRows, beardValue);
  const row = hasBeardConfig ? dwarfBeardRows[beardValue] : dwarfBeardRows.default;
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

function renderDwarfPortrait(dwarf, skinOption, hairOption, eyeOption, hairStyleOption, headOption) {
  const ctx = ensurePortraitContext();
  if (!ctx) {
    return;
  }
  const canvas = dwarfPortraitState.canvas;
  if (!canvas) {
    return;
  }
  const { tileSize, scale, head, eyePositions, eyeSize } = dwarfPortraitConfig;
  const destSize = tileSize * scale;
  const baseX = Math.floor((canvas.width - destSize) / 2);
  const baseY = Math.floor((canvas.height - destSize) / 2);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const baseFrame = getBaseBodyFrame(dwarf);
  if (baseFrame) {
    drawTintedSprite(ctx, baseFrame.sheet, baseFrame, baseX, baseY, scale, baseFrame.tint);
  }

  if (head) {
    const headFrame = getHeadFrame(headOption?.value ?? dwarf?.head);
    if (headFrame) {
      const skinColor = skinOption?.color || '#c59b7d';
      drawTintedSprite(ctx, headFrame.sheet, headFrame, baseX, baseY, scale, skinColor);
    }
  }

  const hairStyleValue = resolveHairStyleValue(hairStyleOption?.value ?? dwarf?.hairStyle);
  const hairFrame = getHairFrame(dwarf, hairOption, hairStyleValue);
  if (hairFrame) {
    drawTintedSprite(ctx, hairFrame.sheet, hairFrame, baseX, baseY, scale, hairFrame.tint);
  }

  const beardFrame = getBeardFrame(dwarf, hairOption);
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
  const headOption = getOptionByValue('head', dwarf.head);

  renderDwarfPortrait(dwarf, skinOption, hairOption, eyeOption, hairStyleOption, headOption);

  const beardValue = dwarf.beard || 'clean';
  const genderLabel = getOptionLabel('gender', dwarf.gender);
  const skinLabel = getOptionLabel('skin', dwarf.skin).toLowerCase();
  const hairPhrase = getHairSummaryPhrase(dwarf);
  const eyeLabel = getOptionLabel('eyes', dwarf.eyes).toLowerCase();
  const beardLabel = getOptionLabel('beard', beardValue).toLowerCase();
  const headLabel = getOptionLabel('head', dwarf.head).toLowerCase();
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
  let ariaDescription = `${genderLabel} dwarf with ${headLabel} features, ${skinLabel} skin, ${hairPhrase}, ${eyeLabel} eyes, and ${beardLabel}.`;
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
  const hairPhrase = getHairSummaryPhrase(dwarf);
  const beardLabel = getOptionLabel('beard', dwarf.beard).toLowerCase();
  const headLabel = getOptionLabel('head', dwarf.head).toLowerCase();
  const clanLabel = getOptionLabel('clan', dwarf.clan);
  const guildLabel = getOptionLabel('guild', dwarf.guild);
  const professionLabel = getOptionLabel('profession', dwarf.profession);
  let summary = `${genderLabel} dwarf with ${headLabel} features, ${skinLabel} skin, ${hairPhrase}, ${eyeLabel} eyes, and ${beardLabel}.`;
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
  const dwarf = getActiveDwarf();
  if (elements.dwarfTraitSummary) {
    elements.dwarfTraitSummary.textContent = buildDwarfSummary(dwarf);
  }
  updateDwarfTraitAttributes(dwarf);
}

function getActiveTraitAttributes(dwarf) {
  if (!dwarf) {
    return [];
  }
  return dwarfTraitAttributeDefinitions.filter((attribute) => {
    try {
      return typeof attribute.isActive === 'function' ? attribute.isActive(dwarf) : false;
    } catch (error) {
      return false;
    }
  });
}

function createTraitAttributeElement(attribute) {
  const item = document.createElement('div');
  item.className = 'trait-attribute';
  item.setAttribute('role', 'listitem');
  item.setAttribute('tabindex', '0');
  item.setAttribute('aria-label', attribute.label);

  const icon = document.createElement('img');
  icon.className = 'trait-attribute__icon';
  icon.src = attribute.icon;
  icon.alt = attribute.label;
  icon.loading = 'lazy';

  const tooltip = document.createElement('span');
  tooltip.className = 'trait-attribute__tooltip';
  tooltip.textContent = attribute.description;

  item.appendChild(icon);
  item.appendChild(tooltip);

  return item;
}

function updateDwarfTraitAttributes(dwarf = getActiveDwarf()) {
  const container = elements.dwarfTraitAttributes;
  if (!container) {
    return;
  }
  container.innerHTML = '';
  const activeAttributes = getActiveTraitAttributes(dwarf);
  if (activeAttributes.length === 0) {
    container.setAttribute('aria-hidden', 'true');
    container.dataset.hasAttributes = 'false';
    return;
  }
  container.setAttribute('aria-hidden', 'false');
  container.dataset.hasAttributes = 'true';
  const fragment = document.createDocumentFragment();
  activeAttributes.forEach((attribute) => {
    fragment.appendChild(createTraitAttributeElement(attribute));
  });
  container.appendChild(fragment);
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
    const headLabel = getOptionLabel('head', dwarf.head);
    const hairStyleLabel = getOptionLabel('hairStyle', dwarf.hairStyle);
    const hairLabel = getOptionLabel('hair', dwarf.hair);
    const beardLabel = getOptionLabel('beard', dwarf.beard);
    traits.textContent = `${genderLabel} • ${headLabel} • ${hairStyleLabel} • ${hairLabel} • ${beardLabel}`;

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

function getTraitOptions(trait) {
  const options = dwarfOptions[trait];
  return Array.isArray(options) ? options : [];
}

function updateTraitSliderDisplay(trait, sliderElement, valueElement, indexOverride) {
  if (!sliderElement) {
    return;
  }
  const options = getTraitOptions(trait);
  const maxIndex = Math.max(0, options.length - 1);
  const rawIndex =
    typeof indexOverride === 'number' && Number.isFinite(indexOverride)
      ? indexOverride
      : Math.round(Number(sliderElement.value) || 0);
  const index = clamp(rawIndex, 0, maxIndex);
  const option = options[index];

  sliderElement.setAttribute('aria-valuemin', '0');
  sliderElement.setAttribute('aria-valuemax', String(maxIndex));
  sliderElement.setAttribute('aria-valuenow', String(index));
  sliderElement.setAttribute('aria-valuetext', option ? option.label : '');

  if (valueElement) {
    if (option) {
      valueElement.textContent = option.label;
      if (option.color) {
        valueElement.style.setProperty('--trait-color', option.color);
        valueElement.classList.add('has-color');
      } else {
        valueElement.style.removeProperty('--trait-color');
        valueElement.classList.remove('has-color');
      }
      valueElement.dataset.traitValue = option.value;
    } else {
      valueElement.textContent = '—';
      valueElement.style.removeProperty('--trait-color');
      valueElement.classList.remove('has-color');
      delete valueElement.dataset.traitValue;
    }
  }
}

function ensureTraitSliderValue(trait, sliderElement, valueElement, value, fallback) {
  if (!sliderElement) {
    return;
  }
  const options = getTraitOptions(trait);
  const fallbackValue = fallback ?? options[0]?.value ?? null;
  let targetIndex = options.findIndex((option) => option.value === value);
  if (targetIndex === -1 && fallbackValue) {
    targetIndex = options.findIndex((option) => option.value === fallbackValue);
  }
  if (targetIndex === -1) {
    targetIndex = 0;
  }
  targetIndex = clamp(targetIndex, 0, Math.max(0, options.length - 1));
  sliderElement.max = String(Math.max(0, options.length - 1));
  sliderElement.value = String(targetIndex);
  updateTraitSliderDisplay(trait, sliderElement, valueElement, targetIndex);
}

function setupTraitSliderControl(trait, sliderElement, valueElement) {
  if (!sliderElement) {
    return;
  }
  const options = getTraitOptions(trait);
  const maxIndex = Math.max(0, options.length - 1);
  sliderElement.min = '0';
  sliderElement.max = String(maxIndex);
  sliderElement.step = '1';
  sliderElement.value = clamp(Number(sliderElement.value) || 0, 0, maxIndex).toString();
  sliderElement.dataset.trait = trait;
  sliderElement.disabled = options.length === 0;

  const updateDisplay = (index) => {
    updateTraitSliderDisplay(trait, sliderElement, valueElement, index);
  };

  sliderElement.addEventListener('input', () => {
    const currentIndex = clamp(Math.round(Number(sliderElement.value)), 0, maxIndex);
    sliderElement.value = String(currentIndex);
    updateDisplay(currentIndex);
    const option = options[currentIndex];
    if (option) {
      updateDwarfTrait(trait, option.value);
    }
  });

  sliderElement.addEventListener('change', () => {
    const currentIndex = clamp(Math.round(Number(sliderElement.value)), 0, maxIndex);
    sliderElement.value = String(currentIndex);
    updateDisplay(currentIndex);
  });

  updateDisplay();
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

function updateBeardFieldState(dwarf) {
  const fieldGroup = elements.dwarfBeardFieldGroup;
  const beardSlider = elements.dwarfBeardSlider;
  if (!fieldGroup || !beardSlider) {
    return;
  }
  const isFemale = dwarf?.gender === 'female';
  fieldGroup.classList.toggle('hidden', isFemale);
  fieldGroup.setAttribute('aria-hidden', isFemale ? 'true' : 'false');
  beardSlider.disabled = isFemale;
  if (isFemale) {
    beardSlider.setAttribute('tabindex', '-1');
  } else {
    beardSlider.removeAttribute('tabindex');
  }
}

function updateCustomizerUI() {
  ensureDwarfParty();
  const dwarf = getActiveDwarf();
  if (!dwarf) {
    return;
  }
  dwarf.head = resolveHeadTypeValue(dwarf.head);
  const total = state.dwarfParty.dwarves.length;
  if (elements.dwarfSlotLabel) {
    elements.dwarfSlotLabel.textContent =
      total > 1 ? `Dwarf ${state.dwarfParty.activeIndex + 1} of ${total}` : '';
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
  ensureTraitSliderValue(
    'skin',
    elements.dwarfSkinSlider,
    elements.dwarfSkinSliderValue,
    dwarf.skin,
    dwarfOptions.skin[0].value
  );
  ensureTraitSliderValue(
    'head',
    elements.dwarfHeadSlider,
    elements.dwarfHeadSliderValue,
    resolveHeadTypeValue(dwarf.head),
    defaultHeadTypeValue
  );
  ensureTraitSliderValue(
    'eyes',
    elements.dwarfEyeSlider,
    elements.dwarfEyeSliderValue,
    dwarf.eyes,
    dwarfOptions.eyes[0].value
  );
  ensureTraitSliderValue(
    'hairStyle',
    elements.dwarfHairStyleSlider,
    elements.dwarfHairStyleSliderValue,
    resolveHairStyleValue(dwarf.hairStyle),
    defaultHairStyleValue
  );
  ensureTraitSliderValue(
    'hair',
    elements.dwarfHairSlider,
    elements.dwarfHairSliderValue,
    dwarf.hair,
    dwarfOptions.hair[0].value
  );
  if (dwarf.gender === 'female' && dwarf.beard !== 'clean') {
    dwarf.beard = 'clean';
  }
  ensureTraitSliderValue(
    'beard',
    elements.dwarfBeardSlider,
    elements.dwarfBeardSliderValue,
    dwarf.beard,
    dwarfOptions.beard[0].value
  );

  updateBeardFieldState(dwarf);

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
    if (trait === 'gender') {
      const previousGender = dwarf.gender;
      const trimmedName = (dwarf.name || '').trim();
      dwarf.gender = value;
      if (value === 'female') {
        dwarf.beard = 'clean';
      }
      if (value !== previousGender && trimmedName) {
        const firstName = extractFirstName(trimmedName);
        const clanLabel = dwarf.clan ? getOptionLabel('clan', dwarf.clan) : null;
        const matchesClan = clanLabel
          ? trimmedName === `${firstName} ${clanLabel}`
          : trimmedName === firstName;
        if (firstName && matchesClan && isPresetDwarfFirstName(firstName)) {
          const newFirstName = generateDwarfFirstName(value);
          dwarf.name = clanLabel ? `${newFirstName} ${clanLabel}` : newFirstName;
        }
      }
    } else if (trait === 'head') {
      dwarf.head = resolveHeadTypeValue(value);
    } else if (trait === 'hairStyle') {
      dwarf[trait] = resolveHairStyleValue(value);
    } else if (trait === 'beard' && dwarf.gender === 'female') {
      dwarf.beard = 'clean';
    } else {
      dwarf[trait] = value;
    }
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
  if (!Number.isFinite(exponent) || exponent <= 0) {
    return randomInt(lower, upper);
  }
  const clampedWeight = clamp(biasWeight, 0, 1);
  const effectiveExponent = 1 + clampedWeight * (exponent - 1);
  const quadrupleDigitThreshold = 1000;
  const maxRetries = 4;
  const highYearPenalty = 0.85;

  let year = biasedRandomInt(lower, upper, effectiveExponent);

  if (year >= quadrupleDigitThreshold) {
    let retries = 0;
    const amplifiedExponent = effectiveExponent * 1.5;
    while (
      year >= quadrupleDigitThreshold &&
      retries < maxRetries &&
      Math.random() < highYearPenalty
    ) {
      year = biasedRandomInt(lower, upper, amplifiedExponent);
      retries += 1;
    }
  }

  return year;
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

function updateWorldInfoSizeDisplay() {
  if (!elements.worldInfoSize) {
    return;
  }
  const preset = getMapSizePreset(state.settings.mapSize);
  elements.worldInfoSize.textContent = getMapSizeLabel(
    preset,
    state.settings.width,
    state.settings.height
  );
}

function updateWorldInfoSeedDisplay(seedValue) {
  if (!elements.worldInfoSeed) {
    return;
  }
  const trimmed = typeof seedValue === 'string' ? seedValue.trim() : '';
  elements.worldInfoSeed.textContent = trimmed || 'Random';
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
  const sizePreset = getMapSizePreset(state.settings.mapSize);
  applyMapSizePresetToState(sizePreset);
  if (elements.worldMapSizeSelect) {
    elements.worldMapSizeSelect.value = state.settings.mapSize;
  }
  if (elements.mapSizeSelect) {
    elements.mapSizeSelect.value = state.settings.mapSize;
  }
  updateWorldInfoSizeDisplay();

  const seed = ensureSeedString();
  state.settings.lastSeedString = seed;
  if (elements.worldSeedInput) {
    elements.worldSeedInput.value = seed;
  }
  if (elements.seedInput) {
    elements.seedInput.value = seed;
  }
  updateWorldInfoSeedDisplay(seed);

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
  ensureMusicStarted();
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

function formatPercentageDisplay(value) {
  if (!Number.isFinite(value)) {
    return '0';
  }
  const rounded = Math.round(value * 100) / 100;
  return rounded.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

function formatGradientPercentage(value) {
  if (!Number.isFinite(value)) {
    return '0';
  }
  const rounded = Math.round(value * 100) / 100;
  return Number(rounded.toFixed(2)).toString();
}

function buildPopulationBreakdownSection(resolvedName, breakdown) {
  if (!Array.isArray(breakdown) || breakdown.length === 0) {
    return '';
  }

  const resolvedEntries = breakdown
    .filter((entry) => Number.isFinite(entry?.percentage) && entry.percentage > 0)
    .map((entry) => {
      const rawPercentage = Number(entry.percentage);
      const safePercentage = Number.isFinite(rawPercentage) ? Math.max(0, rawPercentage) : 0;
      const roundedPercentage = Math.round(safePercentage * 100) / 100;
      return {
        key: typeof entry.key === 'string' && entry.key ? entry.key : null,
        label: entry.label || entry.key || 'Unknown',
        percentage: roundedPercentage,
        color: entry.color || '#999999',
        population:
          Number.isFinite(entry.population) && entry.population > 0
            ? Math.max(0, Math.round(entry.population))
            : null
      };
    });

  const priorityEntries = [];
  const majorEntries = [];
  let otherPercentage = 0;
  let otherPopulation = 0;
  let otherPopulationKnown = true;

  resolvedEntries.forEach((entry) => {
    if (entry.key === 'wizards') {
      priorityEntries.push(entry);
      return;
    }

    if (entry.percentage < 0.5) {
      otherPercentage += entry.percentage;
      if (entry.population === null) {
        otherPopulationKnown = false;
      } else if (otherPopulationKnown) {
        otherPopulation += entry.population;
      }
    } else {
      majorEntries.push(entry);
    }
  });

  const combinedEntries = [...priorityEntries, ...majorEntries];

  if (otherPercentage > 0) {
    const roundedOtherPercentage = Math.round(otherPercentage * 100) / 100;
    combinedEntries.push({
      label: 'Other',
      percentage: roundedOtherPercentage,
      color: '#666666',
      population: otherPopulationKnown ? otherPopulation : null
    });
  }

  const displayEntries = combinedEntries.length > 0 ? combinedEntries : resolvedEntries;

  if (displayEntries.length === 0) {
    return '';
  }

  let cumulative = 0;
  const stops = displayEntries.map((entry, index) => {
    const start = Math.min(100, Math.max(0, Math.round(cumulative * 100) / 100));
    cumulative = Math.round((cumulative + entry.percentage) * 100) / 100;
    const end =
      index === displayEntries.length - 1
        ? 100
        : Math.min(100, Math.max(0, Math.round(cumulative * 100) / 100));
    return `${entry.color} ${formatGradientPercentage(start)}% ${formatGradientPercentage(end)}%`;
  });

  if (stops.length === 0) {
    return '';
  }

  const pieStyle = `background: conic-gradient(${stops.join(', ')});`;
  const ariaLabelParts = ['Population breakdown'];
  if (resolvedName) {
    ariaLabelParts.push(`for ${resolvedName}`);
  }
  const ariaLabel = ariaLabelParts.join(' ');

  const legendItems = displayEntries
    .map((entry) => {
      const valueParts = [`${formatPercentageDisplay(entry.percentage)}%`];
      if (entry.population !== null) {
        valueParts.push(`(${entry.population.toLocaleString('en-US')})`);
      }
      return `
        <li>
          <span class="legend-swatch" style="background:${escapeHtml(entry.color)}"></span>
          <span class="legend-label">${escapeHtml(entry.label)}</span>
          <span class="legend-value">${escapeHtml(valueParts.join(' '))}</span>
        </li>
      `;
    })
    .join('');

  return `
    <div class="tooltip-subtitle">Population Breakdown</div>
    <div class="tooltip-chart">
      <div
        class="tooltip-chart-pie"
        role="img"
        aria-label="${escapeHtml(ariaLabel)}"
        style="${escapeHtml(pieStyle)}"
      ></div>
      <ul class="tooltip-chart-legend">${legendItems}</ul>
    </div>
  `;
}

function buildStructureTooltipContent(tile) {
  if (!tile || !tile.structureName) {
    return null;
  }

  const details = tile.structureDetails;
  const isSettlement =
    details && (details.isSettlement || (details.type && settlementDetailTypes.has(details.type)));
  if (isSettlement) {
    const sections = [];
    const entries = [];
    const resolvedName = details.name || tile.structureName;
    sections.push(`<div class="tooltip-title">${escapeHtml(resolvedName)}</div>`);

    if (details.classification) {
      entries.push({ label: 'Classification', value: details.classification });
    }

    if (Number.isFinite(details.population)) {
      const populationValue = Math.max(0, Math.round(details.population));
      const formattedPopulation = populationValue.toLocaleString('en-US');
      const populationLabel = details.populationLabel || 'Population';
      const populationDescriptor = details.populationDescriptor || null;
      const populationDisplay = populationDescriptor
        ? `${formattedPopulation} ${populationDescriptor}`
        : formattedPopulation;
      entries.push({ label: populationLabel, value: populationDisplay });
    }

    if (details.ruler) {
      const rulerTitle = details.ruler.title ? `${details.ruler.title} ` : '';
      const rulerName = details.ruler.name || '';
      const combined = `${rulerTitle}${rulerName}`.trim();
      if (combined) {
        const rulerLabel = details.ruler.label || 'Ruler';
        entries.push({ label: rulerLabel, value: combined });
      }
    }

    if (Number.isFinite(details.foundedYearsAgo)) {
      const foundedValue = Math.max(1, Math.round(details.foundedYearsAgo));
      entries.push({ label: 'Founded', value: `${foundedValue} years ago` });
    }

    const prominentGroup = details.prominentGroup || details.prominentClan;
    if (prominentGroup) {
      const prominentLabel = details.prominentGroupLabel || (details.prominentClan ? 'Prominent Clan' : 'Prominent Group');
      entries.push({ label: prominentLabel, value: prominentGroup });
    }

    if (Array.isArray(details.majorGuilds) && details.majorGuilds.length > 0) {
      const uniqueGuilds = Array.from(
        new Set(details.majorGuilds.filter((guild) => typeof guild === 'string' && guild.trim()))
      );
      if (uniqueGuilds.length > 0) {
        const guildsLabel = details.majorGuildsLabel || 'Major Guilds';
        entries.push({ label: guildsLabel, value: uniqueGuilds.join(', ') });
      }
    }

    if (Array.isArray(details.majorExports) && details.majorExports.length > 0) {
      const uniqueExports = Array.from(
        new Set(details.majorExports.filter((item) => typeof item === 'string' && item.trim()))
      );
      if (uniqueExports.length > 0) {
        const exportsLabel = details.majorExportsLabel || 'Major Exports';
        entries.push({ label: exportsLabel, value: uniqueExports.join(', ') });
      }
    }

    if (entries.length > 0) {
      const listItems = entries
        .map(
          ({ label, value }) =>
            `<li><span class="tooltip-term">${escapeHtml(label)}</span><span class="tooltip-value">${escapeHtml(
              value
            )}</span></li>`
        )
        .join('');
      sections.push(`<ul class="tooltip-list">${listItems}</ul>`);
    }

    const breakdownSection = buildPopulationBreakdownSection(resolvedName, details.populationBreakdown);

    if (breakdownSection) {
      sections.push(breakdownSection);
    }

    if (details.hallmark) {
      const hallmarkLabel = details.hallmarkLabel;
      const noteContent = escapeHtml(details.hallmark);
      if (hallmarkLabel) {
        sections.push(`
          <div class="tooltip-subtitle">${escapeHtml(hallmarkLabel)}</div>
          <p class="tooltip-note">${noteContent}</p>
        `);
      } else {
        sections.push(`<p class="tooltip-note">${noteContent}</p>`);
      }
    }

    return sections.join('');
  }

  return `<div class="tooltip-title">${escapeHtml(tile.structureName)}</div>`;
}

function showMapTooltip(content, pointerX, pointerY, boundsRect) {
  if (!elements.mapTooltip) {
    return;
  }
  if (!content) {
    hideMapTooltip();
    return;
  }
  const tooltip = elements.mapTooltip;
  tooltip.innerHTML = content;
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
    if (!tile) {
      hideMapTooltip();
      return;
    }
    const tooltipContent = buildStructureTooltipContent(tile);
    if (!tooltipContent) {
      hideMapTooltip();
      return;
    }
    showMapTooltip(tooltipContent, pointerX, pointerY, rect);
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

function buildRiverMap(
  elevation,
  rainfall,
  drainage,
  width,
  height,
  seaLevel,
  options = {}
) {
  const frequencyNormalized = clamp(
    typeof options.frequencyNormalized === 'number' ? options.frequencyNormalized : 0.5,
    0,
    1
  );
  const frequencyMultiplier = lerp(0.45, 1.75, frequencyNormalized);
  const rainfallThreshold = lerp(0.65, 0.45, frequencyNormalized);
  const weightThreshold = 0.12 * lerp(1.7, 0.6, frequencyNormalized);
  const majorRiverThreshold = lerp(0.45, 0.28, frequencyNormalized);

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
      if (rain < rainfallThreshold) {
        continue;
      }
      const sink = 1 - drainage[idx];
      const weight = rain * rain * (elev - seaLevel) * (0.5 + sink * 0.5);
      if (weight > weightThreshold) {
        candidates.push({ x, y, weight });
      }
    }
  }

  candidates.sort((a, b) => b.weight - a.weight);
  const baseSources = Math.max(8, Math.floor((width * height) / 3200));
  const maxSources = Math.max(4, Math.round(baseSources * frequencyMultiplier));
  const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]
  ];

  for (let i = 0; i < candidates.length && i < maxSources; i += 1) {
    let { x, y } = candidates[i];
    let steps = 0;
    let strength = candidates[i].weight > majorRiverThreshold ? 2 : 1;
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

const riverNeighborDefinitions = [
  { dx: 0, dy: -1, key: 'N', bit: 1 },
  { dx: 1, dy: 0, key: 'E', bit: 2 },
  { dx: 0, dy: 1, key: 'S', bit: 4 },
  { dx: -1, dy: 0, key: 'W', bit: 8 }
];

const riverMaskSuffixLookup = {
  0: '0',
  1: 'N',
  2: 'E',
  3: 'NE',
  4: 'S',
  5: 'NS',
  6: 'SE',
  7: 'NSE',
  8: 'W',
  9: 'NW',
  10: 'WE',
  11: 'NWE',
  12: 'SW',
  13: 'NSW',
  14: 'SWE',
  15: 'NSWE'
};

function resolveRiverTile(riverMap, width, height, x, y, waterMask) {
  const idx = y * width + x;
  const strength = riverMap[idx];
  if (strength === 0) {
    return null;
  }

  const prefix = 'RIVER_';

  let mask = 0;
  riverNeighborDefinitions.forEach(({ dx, dy, bit }) => {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
      return;
    }
    if (riverMap[ny * width + nx] > 0) {
      mask |= bit;
    }
  });
  const suffix = riverMaskSuffixLookup[mask] || 'NSWE';
  const baseKey = `${prefix}${suffix}`;
  const majorKey = `RIVER_MAJOR_${suffix}`;
  const hasMajor = tileLookup.has(majorKey);
  const useMajor = strength >= 3 && hasMajor;

  let tileKey = useMajor ? majorKey : baseKey;

  if (!useMajor && suffix.length === 1 && suffix !== '0' && waterMask) {
    const direction = suffix;
    const mouthKey = `RIVER_MOUTH_NARROW_${direction}`;
    if (tileLookup.has(mouthKey)) {
      const neighbor = riverNeighborDefinitions.find(({ key }) => key === direction);
      if (neighbor) {
        const nx = x + neighbor.dx;
        const ny = y + neighbor.dy;
        if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
          const nIdx = ny * width + nx;
          if (waterMask[nIdx]) {
            tileKey = mouthKey;
          }
        }
      }
    }
  }

  if (useMajor && suffix.length === 1 && suffix !== '0' && waterMask) {
    const direction = suffix;
    const mouthKey = `RIVER_MAJOR_MOUTH_NARROW_${direction}`;
    if (tileLookup.has(mouthKey)) {
      const neighbor = riverNeighborDefinitions.find(({ key }) => key === direction);
      if (neighbor) {
        const nx = x + neighbor.dx;
        const ny = y + neighbor.dy;
        if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
          const nIdx = ny * width + nx;
          if (waterMask[nIdx]) {
            tileKey = mouthKey;
          }
        }
      }
    }
  }

  return {
    key: tileKey,
    mask,
    strength,
    connections: suffix,
    tileKey
  };
}

function ensureRiverConnectionsToWater(riverMap, waterMask, tiles, width, height) {
  const waterTileKey = tileLookup.has('WATER') ? 'WATER' : null;
  if (!waterTileKey) {
    return;
  }

  const visited = new Uint8Array(width * height);

  const convertToWater = (idx) => {
    if (waterMask[idx]) {
      return true;
    }
    const x = idx % width;
    const y = Math.floor(idx / width);
    const tile = tiles[y] && tiles[y][x];
    if (!tile) {
      return false;
    }
    tile.base = waterTileKey;
    tile.overlay = null;
    tile.structure = null;
    tile.structureName = null;
    tile.structureDetails = null;
    tile.river = null;
    waterMask[idx] = 1;
    return true;
  };

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      if (visited[idx] || riverMap[idx] === 0) {
        continue;
      }

      const stack = [idx];
      const component = [];
      const endpoints = [];
      let touchesWater = false;

      while (stack.length > 0) {
        const current = stack.pop();
        if (visited[current]) {
          continue;
        }
        visited[current] = 1;
        component.push(current);
        const cx = current % width;
        const cy = Math.floor(current / width);

        let neighborCount = 0;
        riverNeighborDefinitions.forEach(({ dx, dy }) => {
          const nx = cx + dx;
          const ny = cy + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            return;
          }
          const nIdx = ny * width + nx;
          if (waterMask[nIdx]) {
            touchesWater = true;
          }
          if (riverMap[nIdx] > 0) {
            neighborCount += 1;
            if (!visited[nIdx]) {
              stack.push(nIdx);
            }
          }
        });

        if (neighborCount <= 1) {
          endpoints.push(current);
        }
      }

      if (touchesWater) {
        continue;
      }

      const candidates = endpoints.length > 0 ? endpoints : component;
      for (let i = 0; i < candidates.length; i += 1) {
        if (convertToWater(candidates[i])) {
          touchesWater = true;
          break;
        }
      }

      if (!touchesWater && component.length > 0) {
        convertToWater(component[0]);
      }
    }
  }
}

function createWorld(seedString) {
  const seedNumber = stringToSeed(seedString);
  const rng = mulberry32(seedNumber || 1);
  const width = state.settings.width;
  const height = state.settings.height;
  const forestFrequencySetting = sanitizeFrequencyValue(
    state.settings.forestFrequency,
    defaultForestFrequency
  );
  const mountainFrequencySetting = sanitizeFrequencyValue(
    state.settings.mountainFrequency,
    defaultMountainFrequency
  );
  const riverFrequencySetting = sanitizeFrequencyValue(state.settings.riverFrequency, 50);
  const humanSettlementFrequencySetting = sanitizeFrequencyValue(
    state.settings.humanSettlementFrequency,
    50
  );
  const dwarfSettlementFrequencySetting = sanitizeFrequencyValue(
    state.settings.dwarfSettlementFrequency,
    50
  );
  const woodElfSettlementFrequencySetting = sanitizeFrequencyValue(
    state.settings.woodElfSettlementFrequency,
    50
  );
  const forestBias = (forestFrequencySetting - defaultForestFrequency) / 50;
  const mountainFrequencyNormalized = clamp(mountainFrequencySetting / 100, 0, 1);
  const riverFrequencyNormalized = clamp(riverFrequencySetting / 100, 0, 1);
  const humanSettlementFrequencyNormalized = clamp(humanSettlementFrequencySetting / 100, 0, 1);
  const dwarfSettlementFrequencyNormalized = clamp(dwarfSettlementFrequencySetting / 100, 0, 1);
  const woodElfSettlementFrequencyNormalized = clamp(woodElfSettlementFrequencySetting / 100, 0, 1);
  const towerSettlementFrequencySetting =
    (humanSettlementFrequencySetting + dwarfSettlementFrequencySetting) / 2;
  const towerSettlementFrequencyNormalized = clamp(towerSettlementFrequencySetting / 100, 0, 1);
  const humanSettlementMultiplier = computeFrequencyMultiplier(humanSettlementFrequencySetting);
  const dwarfSettlementMultiplier = computeFrequencyMultiplier(dwarfSettlementFrequencySetting);
  const woodElfSettlementMultiplier = computeFrequencyMultiplier(woodElfSettlementFrequencySetting);
  const towerSettlementMultiplier = computeFrequencyMultiplier(towerSettlementFrequencySetting);
  const mountainBiasLinear = mountainFrequencyNormalized * 2 - 1;
  const mountainBias =
    mountainBiasLinear === 0
      ? 0
      : Math.sign(mountainBiasLinear) * Math.pow(Math.abs(mountainBiasLinear), 0.8);
  const mountainScarcity = 1 - mountainFrequencyNormalized;
  const mountainGrowthFactor = 0.42 + mountainFrequencyNormalized * 0.7;

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
  const rainfallField = new Float32Array(width * height);
  const drainageField = new Float32Array(width * height);
  const rainfallBaseSeed = (seedNumber + 0x7f4a7c15) >>> 0;
  const rainfallDetailSeed = (seedNumber + 0x6c8e9cf1) >>> 0;
  const rainfallBaseScale = 2.2 + rng() * 1.8;
  const rainfallDetailScale = 5.4 + rng() * 4.1;
  const rainfallBaseOffsetX = rng() * 4096;
  const rainfallBaseOffsetY = rng() * 4096;
  const rainfallDetailOffsetX = rng() * 8192;
  const rainfallDetailOffsetY = rng() * 8192;
  const drainageNoiseSeed = (seedNumber + 0x51a7f5d3) >>> 0;
  const drainageNoiseOffsetX = rng() * 4096;
  const drainageNoiseOffsetY = rng() * 4096;
  const drainageNoiseScale = 4.3 + rng() * 3.6;
  const drainageOffsets = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1]
  ];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      const normalizedX = (x + 0.5) / width;
      const normalizedY = (y + 0.5) / height;
      const elevationValue = elevationField[idx];
      const baseRainNoise = octaveNoise(
        (normalizedX + rainfallBaseOffsetX) * rainfallBaseScale,
        (normalizedY + rainfallBaseOffsetY) * rainfallBaseScale,
        rainfallBaseSeed,
        3,
        0.6,
        2.05
      );
      const detailRainNoise = octaveNoise(
        (normalizedX + rainfallDetailOffsetX) * rainfallDetailScale,
        (normalizedY + rainfallDetailOffsetY) * rainfallDetailScale,
        rainfallDetailSeed,
        4,
        0.55,
        2.25
      );
      const latitudeInfluence = 1 - Math.abs(normalizedY - 0.5) * 1.8;
      const coastalInfluence = clamp(1 - Math.abs(elevationValue - seaLevel) * 2.4, 0, 1);
      let rainfallValue = baseRainNoise * 0.65 + detailRainNoise * 0.35;
      rainfallValue = clamp(
        rainfallValue * 0.55 + latitudeInfluence * 0.25 + coastalInfluence * 0.2,
        0,
        1
      );
      rainfallField[idx] = rainfallValue;

      let outwardSlope = 0;
      let inwardSlope = 0;
      let neighborCount = 0;
      for (let i = 0; i < drainageOffsets.length; i += 1) {
        const nx = x + drainageOffsets[i][0];
        const ny = y + drainageOffsets[i][1];
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
          continue;
        }
        const nIdx = ny * width + nx;
        const diff = elevationValue - elevationField[nIdx];
        if (diff > 0) {
          outwardSlope += diff;
        } else {
          inwardSlope += -diff;
        }
        neighborCount += 1;
      }
      const slopeAverage = neighborCount > 0 ? outwardSlope / neighborCount : 0;
      const basinAverage = neighborCount > 0 ? inwardSlope / neighborCount : 0;
      const slopeComponent = clamp(slopeAverage * 5.2, 0, 1);
      const basinComponent = clamp(basinAverage * 3.2, 0, 1);
      const drainageNoise = octaveNoise(
        (normalizedX + drainageNoiseOffsetX) * drainageNoiseScale,
        (normalizedY + drainageNoiseOffsetY) * drainageNoiseScale,
        drainageNoiseSeed,
        3,
        0.6,
        2.2
      );
      let drainageValue = slopeComponent * 0.7 + (1 - basinComponent) * 0.3;
      drainageValue = clamp(drainageValue * 0.68 + drainageNoise * 0.32, 0, 1);
      if (elevationValue <= seaLevel) {
        drainageValue = 1;
      }
      drainageField[idx] = drainageValue;
    }
  }

  const adjustedRainfall = applyRainShadow(elevationField, rainfallField, width, height);
  rainfallField.set(adjustedRainfall);
  normalizeField(drainageField);
  const grassTileKey = resolveTileName('GRASS');
  const hasMarshTile = tileLookup.has('MARSH');
  const marshTileKey = hasMarshTile ? 'MARSH' : grassTileKey;
  const waterTileKey = resolveTileName('WATER');
  const hasSnowTile = tileLookup.has('SNOW');
  const snowTileKey = hasSnowTile ? 'SNOW' : grassTileKey;
  // Disable desert generation so no sand tiles are produced on the world map.
  const sandGenerationEnabled = false;
  const hasSandTile = sandGenerationEnabled && tileLookup.has('SAND');
  const sandTileKey = hasSandTile ? 'SAND' : grassTileKey;
  const landBaseKeys = new Set([grassTileKey]);
  if (hasSnowTile) {
    landBaseKeys.add(snowTileKey);
  }
  if (hasSandTile) {
    landBaseKeys.add(sandTileKey);
  }
  if (hasMarshTile) {
    landBaseKeys.add(marshTileKey);
  }
  const snowLatitudeStart = 0.7;
  const snowLatitudeFull = 0.86;
  const snowLatitudeRange = Math.max(snowLatitudeFull - snowLatitudeStart, 0.0001);
  const snowNoiseSeed = (seedNumber + 0x27d4eb2d) >>> 0;
  const snowNoiseScale = 5.3 + rng() * 3.2;
  const snowNoiseOffsetX = rng() * 4096;
  const snowNoiseOffsetY = rng() * 4096;

  const computeSnowPresence = (normalizedX, normalizedY, heightValue) => {
    const latitude = 1 - normalizedY;
    if (latitude >= snowLatitudeFull) {
      return true;
    }
    if (latitude > snowLatitudeStart) {
      const snowBandFactor = clamp((latitude - snowLatitudeStart) / snowLatitudeRange, 0, 1);
      const elevationFactor = clamp((heightValue - seaLevel) * 3.8, 0, 1);
      const coverage = clamp(snowBandFactor * 0.7 + elevationFactor * 0.3, 0, 1);
      const snowNoise = octaveNoise(
        (normalizedX + snowNoiseOffsetX) * snowNoiseScale,
        (normalizedY + snowNoiseOffsetY) * snowNoiseScale,
        snowNoiseSeed,
        3,
        0.55,
        2.2
      );
      return snowNoise < coverage;
    }
    return false;
  };

  const icebergOverlayKeys = Object.keys(icebergTileCoords).filter((key) => tileLookup.has(key));
  const hasIcebergOverlay = icebergOverlayKeys.length > 0;
  const needSnowPresenceField = hasSnowTile || hasIcebergOverlay;
  const snowPresenceField = needSnowPresenceField ? new Uint8Array(width * height) : null;
  const icebergVariantSeed = hasIcebergOverlay ? (seedNumber + 0x3d0e12f7) >>> 0 : 0;
  const icebergPresenceSeed = hasIcebergOverlay ? (seedNumber + 0x5ad1f32b) >>> 0 : 0;

  const marshNoiseSeed = hasMarshTile ? (seedNumber + 0x1922b3a5) >>> 0 : 0;
  const marshNoiseScale = hasMarshTile ? 3.9 + rng() * 3 : 1;
  const marshNoiseOffsetX = hasMarshTile ? rng() * 4096 : 0;
  const marshNoiseOffsetY = hasMarshTile ? rng() * 4096 : 0;
  const desertNoiseSeed = hasSandTile ? (seedNumber + 0x51b74f03) >>> 0 : 0;
  const desertNoiseScale = hasSandTile ? 3.8 + rng() * 2.6 : 1;
  const desertNoiseOffsetX = hasSandTile ? rng() * 4096 : 0;
  const desertNoiseOffsetY = hasSandTile ? rng() * 4096 : 0;
  const desertWarpSeedX = hasSandTile ? (seedNumber + 0x2a58d2a5) >>> 0 : 0;
  const desertWarpSeedY = hasSandTile ? (seedNumber + 0x165667b1) >>> 0 : 0;
  const desertWarpScale = hasSandTile ? 2.2 + rng() * 2.6 : 1;
  const desertWarpStrength = hasSandTile ? 0.12 + rng() * 0.18 : 0;
  const desertWarpOffsetX = hasSandTile ? rng() * 4096 : 0;
  const desertWarpOffsetY = hasSandTile ? rng() * 4096 : 0;
  const desertHeatSeed = hasSandTile ? (seedNumber + 0x3b1d23c7) >>> 0 : 0;
  const desertHeatScale = hasSandTile ? 3.1 + rng() * 3.3 : 1;
  const desertHeatOffsetX = hasSandTile ? rng() * 4096 : 0;
  const desertHeatOffsetY = hasSandTile ? rng() * 4096 : 0;
  const desertBandSeed = hasSandTile ? (seedNumber + 0x6a09e667) >>> 0 : 0;
  const desertBandScale = hasSandTile ? 1.4 + rng() * 1.6 : 1;
  const desertBandOffsetX = hasSandTile ? rng() * 2048 : 0;
  const desertBandOffsetY = hasSandTile ? rng() * 2048 : 0;
  const desertBandStrength = hasSandTile ? 0.2 + rng() * 0.25 : 0;
  const desertSuitabilitySeed = hasSandTile ? (seedNumber + 0xbb67ae85) >>> 0 : 0;
  const desertSuitabilityScale = hasSandTile ? 2.8 + rng() * 2.8 : 1;
  const desertSuitabilityOffsetX = hasSandTile ? rng() * 8192 : 0;
  const desertSuitabilityOffsetY = hasSandTile ? rng() * 8192 : 0;
  const desertSuitabilityStrength = hasSandTile ? 0.18 + rng() * 0.15 : 0;
  const desertThresholdSeed = hasSandTile ? (seedNumber + 0x84caa73d) >>> 0 : 0;
  const desertThresholdScale = hasSandTile ? 3.6 + rng() * 3.2 : 1;
  const desertThresholdOffsetX = hasSandTile ? rng() * 4096 : 0;
  const desertThresholdOffsetY = hasSandTile ? rng() * 4096 : 0;
  const desertThresholdStrength = hasSandTile ? 0.05 + rng() * 0.06 : 0;
  const desertVariationSeed = hasSandTile ? (seedNumber + 0x7c3f0a5b) >>> 0 : 0;
  const desertVariationScale = hasSandTile ? 4.4 + rng() * 3.8 : 1;
  const desertVariationOffsetX = hasSandTile ? rng() * 4096 : 0;
  const desertVariationOffsetY = hasSandTile ? rng() * 4096 : 0;
  const desertVariationStrength = hasSandTile ? 0.08 + rng() * 0.07 : 0;
  const desertSuitabilityField = hasSandTile ? new Float32Array(width * height) : null;
  const desertMask = hasSandTile ? new Uint8Array(width * height) : null;

  const determineLandBaseTile = (x, y, heightValue) => {
    const normalizedX = (x + 0.5) / width;
    const normalizedY = (y + 0.5) / height;
    const latitude = 1 - normalizedY;
    let warpedLatitude = latitude;
    let warpX = 0;
    let warpY = 0;
    const idx = y * width + x;

    if (hasSandTile) {
      desertSuitabilityField[idx] = 0;
      desertMask[idx] = 0;
    }

    if (hasSandTile && desertWarpStrength > 0) {
      const warpSampleX = octaveNoise(
        (normalizedX + desertWarpOffsetX) * desertWarpScale,
        (normalizedY + desertWarpOffsetY) * desertWarpScale,
        desertWarpSeedX,
        3,
        0.55,
        2.05
      );
      const warpSampleY = octaveNoise(
        (normalizedX + desertWarpOffsetX + 37.71) * (desertWarpScale * 1.1),
        (normalizedY + desertWarpOffsetY + 11.53) * (desertWarpScale * 0.92),
        desertWarpSeedY,
        3,
        0.55,
        2.05
      );
      warpX = (warpSampleX * 2 - 1) * desertWarpStrength;
      warpY = (warpSampleY * 2 - 1) * desertWarpStrength;
      warpedLatitude = clamp(latitude + warpY * 0.8, 0, 1);
    }

    if (hasSnowTile && computeSnowPresence(normalizedX, normalizedY, heightValue)) {
      return snowTileKey;
    }

    const rainfallValue = rainfallField[idx];
    const drainageValue = drainageField[idx];
    if (hasMarshTile) {
      const equatorialAlignment = clamp(1 - Math.abs(warpedLatitude - 0.5) * 2, 0, 1);
      const elevationAboveSea = heightValue - seaLevel;
      const elevationHeatPenalty = clamp(elevationAboveSea * 3.6, 0, 1);
      const heat = clamp(equatorialAlignment * 0.65 + (1 - elevationHeatPenalty) * 0.35, 0, 1);
      const wetness = clamp(rainfallValue * 0.7 + (1 - drainageValue) * 0.3, 0, 1);
      const lowlandFactor = clamp(1 - Math.max(0, elevationAboveSea) * 5.2, 0, 1);
      if (wetness > 0.68 && heat > 0.58 && lowlandFactor > 0.35) {
        const marshNoise =
          octaveNoise(
            (normalizedX + marshNoiseOffsetX) * marshNoiseScale,
            (normalizedY + marshNoiseOffsetY) * marshNoiseScale,
            marshNoiseSeed,
            3,
            0.55,
            2.15
          ) *
            2 -
          1;
        const marshScore = wetness * 0.6 + lowlandFactor * 0.25 + marshNoise * 0.15;
        if (marshScore > 0.62) {
          return marshTileKey;
        }
      }
    }

    if (hasSandTile) {
      const aridity = clamp(1 - rainfallValue * 1.2, 0, 1);
      let equatorialAlignment = clamp(1 - Math.abs(warpedLatitude - 0.5) * 2, 0, 1);
      if (desertBandStrength > 0) {
        const bandNoise = octaveNoise(
          (normalizedX + desertBandOffsetX) * desertBandScale,
          (normalizedY + desertBandOffsetY) * desertBandScale,
          desertBandSeed,
          4,
          0.55,
          2.1
        );
        const bandWarp = (bandNoise * 2 - 1) * desertBandStrength;
        equatorialAlignment = clamp(equatorialAlignment + bandWarp, 0, 1);
      }
      const elevationFactor = clamp((heightValue - seaLevel) * 2.6, 0, 1);
      const desertHeatNoise =
        (octaveNoise(
          (normalizedX + warpX + desertHeatOffsetX) * desertHeatScale,
          (normalizedY + warpY + desertHeatOffsetY) * desertHeatScale,
          desertHeatSeed,
          4,
          0.55,
          2.2
        ) *
          2 -
          1) *
        0.25;
      const heat = clamp(equatorialAlignment * 0.55 + (1 - elevationFactor) * 0.3 + desertHeatNoise, 0, 1);
      let suitability = clamp(aridity * 0.68 + heat * 0.42, 0, 1);
      if (desertSuitabilityStrength > 0) {
        const suitabilityNoise =
          octaveNoise(
            (normalizedX + warpX + desertSuitabilityOffsetX) * desertSuitabilityScale,
            (normalizedY + warpY + desertSuitabilityOffsetY) * desertSuitabilityScale,
            desertSuitabilitySeed,
            4,
            0.55,
            2.2
          ) *
            2 -
          1;
        suitability = clamp(
          suitability + suitabilityNoise * desertSuitabilityStrength,
            0,
            1
        );
      }
      if (desertVariationStrength > 0) {
        const variationNoise =
          octaveNoise(
            (normalizedX + warpX + desertVariationOffsetX) * desertVariationScale,
            (normalizedY + warpY + desertVariationOffsetY) * desertVariationScale,
            desertVariationSeed,
            4,
            0.55,
            2.15
          ) *
            2 -
          1;
        suitability = clamp(
          suitability + variationNoise * desertVariationStrength,
          0,
          1
        );
      }
      desertSuitabilityField[idx] = suitability;
      desertMask[idx] = 0;
      if (suitability > 0.52) {
        const desertNoise = octaveNoise(
          (normalizedX + warpX + desertNoiseOffsetX) * desertNoiseScale,
          (normalizedY + warpY + desertNoiseOffsetY) * desertNoiseScale,
          desertNoiseSeed,
          3,
          0.55,
          2.15
        );
        let latitudeThreshold = lerp(0.58, 0.52, equatorialAlignment);
        if (desertThresholdStrength > 0) {
          const thresholdNoise =
            octaveNoise(
              (normalizedX + warpX + desertThresholdOffsetX) * desertThresholdScale,
              (normalizedY + warpY + desertThresholdOffsetY) * desertThresholdScale,
              desertThresholdSeed,
              3,
              0.55,
              2.1
            ) *
              2 -
            1;
          latitudeThreshold = clamp(
            latitudeThreshold + thresholdNoise * desertThresholdStrength,
            0.45,
            0.65
          );
        }
        if (desertNoise < suitability && suitability > latitudeThreshold) {
          desertMask[idx] = 1;
          return sandTileKey;
        }
      }
    }

    return grassTileKey;
  };

  const isLandBaseTile = (baseKey) => landBaseKeys.has(baseKey);
  const tiles = Array.from(
    { length: height },
    () =>
      Array.from({ length: width }, () => ({
        base: grassTileKey,
        overlay: null,
        structure: null,
        structureName: null,
        structureDetails: null,
        river: null
      }))
  );
  const dwarfholds = [];
  const towns = [];
  const towers = [];
  const caves = [];
  const evilWizardTowers = [];
  const woodElfGroves = [];
  const waterMask = new Uint8Array(width * height);
  const hasMountainTile = tileLookup.has('MOUNTAIN');
  const mountainOverlayKey = hasMountainTile ? 'MOUNTAIN' : null;
  const mountainTopVariantKeys = hasMountainTile
    ? ['MOUNTAIN_TOP_A', 'MOUNTAIN_TOP_B'].filter((key) => tileLookup.has(key))
    : [];
  const mountainBottomVariantKeys = hasMountainTile
    ? ['MOUNTAIN_BOTTOM_A', 'MOUNTAIN_BOTTOM_B'].filter((key) => tileLookup.has(key))
    : [];
  const mountainOverlayKeySet = hasMountainTile
    ? new Set([
        mountainOverlayKey,
        ...mountainTopVariantKeys,
        ...mountainBottomVariantKeys
      ].filter(Boolean))
    : new Set();
  const isMountainOverlay = (overlayKey) =>
    overlayKey != null && mountainOverlayKeySet.has(overlayKey);
  let mountainBaseThreshold = hasMountainTile ? Math.min(Math.max(seaLevel + 0.1, 0.58), 0.82) : 1;
  let mountainFullThreshold = hasMountainTile ? Math.min(0.98, mountainBaseThreshold + 0.35) : 1;
  let mountainRange = hasMountainTile ? Math.max(mountainFullThreshold - mountainBaseThreshold, 0.0001) : 1;
  if (hasMountainTile) {
    const thresholdShift = mountainBias * 0.18;
    const minBaseThreshold = Math.min(
      Math.max(seaLevel + 0.08 + mountainScarcity * 0.05, 0.5),
      0.92
    );
    mountainBaseThreshold = clamp(mountainBaseThreshold - thresholdShift, minBaseThreshold, 0.92);
    mountainFullThreshold = clamp(
      mountainFullThreshold - thresholdShift * 1.3,
      mountainBaseThreshold + 0.12,
      0.99
    );
    mountainRange = Math.max(mountainFullThreshold - mountainBaseThreshold, 0.0001);
  }
  let mountainScores = null;
  let mountainCandidateThreshold = null;
  let mountainMask = null;
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
      tile.base = isWater ? waterTileKey : determineLandBaseTile(x, y, heightValue);
      tile.overlay = null;
      tile.structure = null;
      tile.structureName = null;
      tile.structureDetails = null;
      tile.river = null;
    }
  }

  if (hasSandTile) {
    const blurIterations = 2;
    const blurRadius = 2;
    const smoothingSamples = [];
    for (let dy = -blurRadius; dy <= blurRadius; dy += 1) {
      for (let dx = -blurRadius; dx <= blurRadius; dx += 1) {
        const distance = Math.sqrt(dx * dx + dy * dy);
        const weight = distance === 0 ? 1.25 : 1 / (1 + distance);
        smoothingSamples.push({ dx, dy, weight });
      }
    }
    let blurFieldCurrent = new Float32Array(width * height);
    let blurFieldBuffer = new Float32Array(width * height);
    blurFieldCurrent.set(desertSuitabilityField);

    for (let iteration = 0; iteration < blurIterations; iteration += 1) {
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (waterMask[idx]) {
            blurFieldBuffer[idx] = 0;
            continue;
          }
          const baseTile = tiles[y][x].base;
          if (baseTile === snowTileKey) {
            blurFieldBuffer[idx] = 0;
            continue;
          }
          let weightSum = 0;
          let sampleSum = 0;
          for (let i = 0; i < smoothingSamples.length; i += 1) {
            const { dx, dy, weight } = smoothingSamples[i];
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              continue;
            }
            const nIdx = ny * width + nx;
            if (waterMask[nIdx]) {
              continue;
            }
            const neighborTile = tiles[ny][nx].base;
            if (neighborTile === snowTileKey) {
              continue;
            }
            sampleSum += blurFieldCurrent[nIdx] * weight;
            weightSum += weight;
          }
          if (weightSum > 0) {
            blurFieldBuffer[idx] = sampleSum / weightSum;
          } else {
            blurFieldBuffer[idx] = blurFieldCurrent[idx];
          }
        }
      }
      const swap = blurFieldCurrent;
      blurFieldCurrent = blurFieldBuffer;
      blurFieldBuffer = swap;
    }

    const updatedMask = new Uint8Array(width * height);
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          updatedMask[idx] = 0;
          continue;
        }
        const baseTile = tiles[y][x].base;
        if (baseTile === snowTileKey) {
          updatedMask[idx] = 0;
          continue;
        }
        const baseSuitability = desertSuitabilityField[idx];
        const clusteredSuitability = blurFieldCurrent[idx];
        let neighborDesert = 0;
        let neighborCount = 0;
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const nIdx = ny * width + nx;
          if (waterMask[nIdx]) {
            continue;
          }
          const neighborTile = tiles[ny][nx].base;
          if (neighborTile === snowTileKey) {
            continue;
          }
          neighborDesert += desertMask[nIdx];
          neighborCount += 1;
        }
        const localDensity = neighborCount > 0 ? neighborDesert / neighborCount : desertMask[idx];
        const combinedScore = baseSuitability * 0.55 + clusteredSuitability * 0.45 + localDensity * 0.15;
        if (combinedScore > 0.62 && baseSuitability > 0.48) {
          updatedMask[idx] = 1;
        } else if (combinedScore < 0.5 || baseSuitability < 0.45) {
          updatedMask[idx] = 0;
        } else {
          updatedMask[idx] = desertMask[idx];
        }
      }
    }

    desertMask.set(updatedMask);

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        if (desertMask[idx]) {
          tiles[y][x].base = sandTileKey;
        } else if (tiles[y][x].base === sandTileKey) {
          tiles[y][x].base = grassTileKey;
        }
      }
    }

    if (hasSnowTile) {
      const snowClearRadius = 2;
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (tiles[y][x].base !== sandTileKey) {
            continue;
          }
          let nearSnow = false;
          for (let dy = -snowClearRadius; dy <= snowClearRadius && !nearSnow; dy += 1) {
            for (let dx = -snowClearRadius; dx <= snowClearRadius; dx += 1) {
              if (dx === 0 && dy === 0) {
                continue;
              }
              const nx = x + dx;
              const ny = y + dy;
              if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
                continue;
              }
              const neighborTile = tiles[ny][nx].base;
              if (neighborTile === snowTileKey) {
                nearSnow = true;
                break;
              }
            }
          }
          if (nearSnow) {
            tiles[y][x].base = grassTileKey;
            desertMask[idx] = 0;
          }
        }
      }
    }
  }

  if (hasMountainTile) {
    mountainScores = new Float32Array(width * height);
    const mountainHeightField = new Float32Array(width * height);
    let ridgeField = new Float32Array(width * height);
    const ridgeDirectionIndex = new Int8Array(width * height);
    ridgeDirectionIndex.fill(-1);
    const ridgeDirectionStrength = new Float32Array(width * height);
    mountainMask = new Uint8Array(width * height);
    const directionOpposites = new Int8Array([7, 6, 5, 4, 3, 2, 1, 0]);
    const baseMountainSeedThreshold = 0.8;
    const baseMountainCandidateThreshold = 0.52;
    const baseMountainPruneThreshold = 0.9;
    const mountainSeedThreshold = clamp(
      baseMountainSeedThreshold - mountainBias * 0.32,
      0.52,
      0.97
    );
    mountainCandidateThreshold = clamp(
      baseMountainCandidateThreshold - mountainBias * 0.28,
      0.2,
      0.78
    );
    const mountainPruneThreshold = clamp(
      baseMountainPruneThreshold - mountainBias * 0.2,
      0.62,
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
      const maxFallbackSeeds = Math.max(1, Math.round(4 * mountainFrequencyNormalized));
      const limit = Math.min(maxFallbackSeeds, fallbackCandidates.length);
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
      const rangeScale = (seedScore * 4 + ridgeStrength * 3) * (0.5 + reliability * 0.4);
      const baseLength = 2 + Math.floor(rangeScale);
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

    for (let pass = 0; pass < 2; pass += 1) {
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
          const dirIndex = ridgeDirectionIndex[idx];
          let directionalSupport = false;
          if (dirIndex >= 0) {
            const directionalOffsets = [dirIndex, directionOpposites[dirIndex]];
            for (let i = 0; i < directionalOffsets.length; i += 1) {
              const offset = neighborOffsets8[directionalOffsets[i]];
              const nx = x + offset[0];
              const ny = y + offset[1];
              if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
                continue;
              }
              if (mountainMask[ny * width + nx]) {
                directionalSupport = true;
                break;
              }
            }
          }
          const baseProbability = 0.12 + score * 0.6 + orientationStrength * 0.25;
          let probability = Math.min(0.85, baseProbability * mountainGrowthFactor);
          if (!directionalSupport) {
            probability *= 0.45;
            if (orientationStrength > 0.6) {
              probability *= 0.6;
            }
          }
          const highScoreThreshold = 0.75 + mountainScarcity * 0.12;
          if (
            mountainNeighbors >= minNeighbors &&
            (score > highScoreThreshold || rng() < probability)
          ) {
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
        const baseRequiredNeighbors = orientationStrength > 0.6 ? 2 : orientationStrength > 0.35 ? 3 : 4;
        const scarcityNeighborPenalty = mountainScarcity > 0.6 ? 2 : mountainScarcity > 0.35 ? 1 : 0;
        const requiredNeighbors = Math.min(7, baseRequiredNeighbors + scarcityNeighborPenalty);
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
        const pruneBoost = lerp(1.18, 0.85, mountainFrequencyNormalized);
        const effectiveThreshold =
          mountainPruneThreshold * pruneBoost * (1 - orientationStrength * 0.25);
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
        }
      }
    }

    const dwarfholdKey = tileLookup.has('DWARFHOLD') ? 'DWARFHOLD' : null;
    const greatDwarfholdKey = tileLookup.has('GREAT_DWARFHOLD') ? 'GREAT_DWARFHOLD' : null;
    if (dwarfholdKey) {
      const fallbackMountainScoreThreshold =
        mountainScores && mountainCandidateThreshold !== null
          ? clamp(mountainCandidateThreshold * 0.85, 0.28, 0.62)
          : 0.45;
      const dwarfholdCandidates = [];
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (waterMask[idx]) {
            continue;
          }
          const tile = tiles[y][x];
          if (!tile) {
            continue;
          }
          const score = mountainScores ? mountainScores[idx] : 0;
          const isMountainTile = isMountainOverlay(tile.overlay);
          const fallbackEligible =
            !isMountainTile &&
            !tile.overlay &&
            mountainScores &&
            score >= fallbackMountainScoreThreshold;
          if (!isMountainTile && !fallbackEligible) {
            continue;
          }
          dwarfholdCandidates.push({ x, y, score, isMountainTile });
        }
      }

      if (dwarfholdCandidates.length > 0) {
        dwarfholdCandidates.sort((a, b) => b.score - a.score);
        const baseTarget = Math.max(1, Math.round(dwarfholdCandidates.length / 500));
        const maxDwarfholds = computeStructurePlacementLimit(
          baseTarget,
          24,
          dwarfSettlementMultiplier
        );
        const minDistanceBase = 5;
        const minDistance = adjustMinDistance(minDistanceBase, dwarfSettlementFrequencyNormalized);
        const minDistanceSq = minDistance * minDistance;
        const placed = [];

        const basePlacementContext = {
          tiles,
          width,
          waterMask,
          mountainScores,
          fallbackMountainScoreThreshold,
          mountainOverlayKey,
          dwarfholdKey,
          greatDwarfholdKey,
          rng,
          dwarfholds
        };

        for (let i = 0; i < dwarfholdCandidates.length && placed.length < maxDwarfholds; i += 1) {
          const candidate = dwarfholdCandidates[i];
          tryPlaceDwarfhold(candidate, {
            ...basePlacementContext,
            placed,
            minDistanceSq
          });
        }

        if (placed.length === 0) {
          for (let i = 0; i < dwarfholdCandidates.length; i += 1) {
            if (
              tryPlaceDwarfhold(dwarfholdCandidates[i], {
                ...basePlacementContext,
                placed,
                minDistanceSq: null
              })
            ) {
              break;
            }
          }
        }

        const southBoundary = Math.floor(height * 0.45);
        let southernCandidateCount = 0;
        for (let i = 0; i < dwarfholdCandidates.length; i += 1) {
          if (dwarfholdCandidates[i].y >= southBoundary) {
            southernCandidateCount += 1;
          }
        }

        if (southernCandidateCount > 0) {
          let placedSouthCount = 0;
          for (let i = 0; i < placed.length; i += 1) {
            if (placed[i].y >= southBoundary) {
              placedSouthCount += 1;
            }
          }

          const southBaseTarget = Math.max(1, Math.round(southernCandidateCount / 650));
          const southMax = computeStructurePlacementLimit(
            southBaseTarget,
            16,
            dwarfSettlementMultiplier
          );
          const southLimitFromTotal = Math.max(1, Math.ceil(maxDwarfholds * 0.5));
          const southCandidateCapacity = southernCandidateCount - placedSouthCount;
          const southExtraNeeded = Math.max(
            0,
            Math.min(southMax - placedSouthCount, southLimitFromTotal, southCandidateCapacity)
          );

          if (southExtraNeeded > 0) {
            const southMinDistanceBase = Math.max(3, Math.round(minDistanceBase * 0.85));
            const southMinDistance = adjustMinDistance(
              southMinDistanceBase,
              dwarfSettlementFrequencyNormalized
            );
            const southMinDistanceSq = southMinDistance * southMinDistance;
            let southPlaced = 0;

            for (
              let i = 0;
              i < dwarfholdCandidates.length && southPlaced < southExtraNeeded;
              i += 1
            ) {
              const candidate = dwarfholdCandidates[i];
              if (candidate.y < southBoundary) {
                continue;
              }
              if (
                tryPlaceDwarfhold(candidate, {
                  ...basePlacementContext,
                  placed,
                  minDistanceSq: southMinDistanceSq
                })
              ) {
                southPlaced += 1;
              }
            }
          }
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
        const heightValue = elevationField[idx];
        tile.base = determineLandBaseTile(x, y, heightValue);
        tile.overlay = null;
        tile.structure = null;
        tile.structureName = null;
        tile.structureDetails = null;
        tile.river = null;
      }
    }
  }

  if (snowPresenceField) {
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        const normalizedX = (x + 0.5) / width;
        const normalizedY = (y + 0.5) / height;
        const heightValue = elevationField[idx];
        snowPresenceField[idx] = computeSnowPresence(normalizedX, normalizedY, heightValue) ? 1 : 0;
      }
    }
  }

  if (hasMarshTile && hasSnowTile) {
    const snowMask = new Uint8Array(width * height);
    let snowCount = 0;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        const tile = tiles[y][x];
        if (tile && tile.base === snowTileKey) {
          snowMask[idx] = 1;
          snowCount += 1;
        }
      }
    }
    if (snowCount > 0) {
      const distanceField = computeEuclideanDistanceField(snowMask, width, height);
      const marshExclusionRadiusSq = 75 * 75;
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          const tile = tiles[y][x];
          if (tile && tile.base === marshTileKey && distanceField[idx] <= marshExclusionRadiusSq) {
            tile.base = grassTileKey;
          }
        }
      }
    }
  }

  if (hasSnowTile && hasIcebergOverlay && waterTileKey) {
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        const tile = tiles[y][x];
        if (!tile || tile.base !== snowTileKey) {
          continue;
        }
        let fullySurroundedByWater = true;
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (ny < 0) {
            if (y === 0) {
              continue;
            }
            fullySurroundedByWater = false;
            break;
          }
          if (nx < 0 || nx >= width || ny >= height) {
            fullySurroundedByWater = false;
            break;
          }
          if (!waterMask[ny * width + nx]) {
            fullySurroundedByWater = false;
            break;
          }
        }
        if (!fullySurroundedByWater) {
          continue;
        }
        waterMask[idx] = 1;
        tile.base = waterTileKey;
        tile.overlay = null;
        tile.structure = null;
        tile.structureName = null;
        tile.structureDetails = null;
        tile.river = null;
        const variantNoise = hashCoords(x, y, icebergVariantSeed);
        const variantIndex = Math.min(
          icebergOverlayKeys.length - 1,
          Math.floor(variantNoise * icebergOverlayKeys.length)
        );
        const overlayKey = icebergOverlayKeys[Math.max(0, variantIndex)];
        tile.overlay = overlayKey;
        if (snowPresenceField) {
          snowPresenceField[idx] = 1;
        }
      }
    }
  }

  if (hasIcebergOverlay && snowPresenceField) {
    const icebergChance = 1 / 50;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (!waterMask[idx] || !snowPresenceField[idx]) {
          continue;
        }
        const normalizedY = (y + 0.5) / height;
        const latitude = 1 - normalizedY;
        if (latitude < snowLatitudeStart) {
          continue;
        }
        const presenceNoise = hashCoords(x, y, icebergPresenceSeed);
        if (presenceNoise >= icebergChance) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || tile.overlay) {
          continue;
        }
        const variantNoise = hashCoords(x, y, icebergVariantSeed);
        const variantIndex = Math.min(
          icebergOverlayKeys.length - 1,
          Math.floor(variantNoise * icebergOverlayKeys.length)
        );
        const overlayKey = icebergOverlayKeys[Math.max(0, variantIndex)];
        tile.overlay = overlayKey;
      }
    }
  }

  const riverMap = buildRiverMap(elevationField, rainfallField, drainageField, width, height, seaLevel, {
    frequencyNormalized: riverFrequencyNormalized
  });
  ensureRiverConnectionsToWater(riverMap, waterMask, tiles, width, height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      const tile = tiles[y][x];
      if (!tile) {
        continue;
      }
      if (riverMap[idx] === 0 || waterMask[idx]) {
        tile.river = null;
        continue;
      }
      const riverTile = resolveRiverTile(riverMap, width, height, x, y, waterMask);
      tile.river = riverTile || null;
    }
  }

  const townKey = tileLookup.has('TOWN') ? 'TOWN' : null;
  const portTownKey = tileLookup.has('PORT_TOWN') ? 'PORT_TOWN' : null;
  if (townKey) {
    const townCandidates = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || !isLandBaseTile(tile.base) || tile.overlay || tile.structure || tile.river) {
          continue;
        }
        const elevationValue = elevationField[idx];
        const preferredElevation = seaLevel + 0.18;
        const elevationScore = clamp(1 - Math.abs(elevationValue - preferredElevation) * 2.1, 0, 1);
        let roughness = 0;
        let neighborCount = 0;
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const nIdx = ny * width + nx;
          if (waterMask[nIdx]) {
            continue;
          }
          roughness += Math.abs(elevationValue - elevationField[nIdx]);
          neighborCount += 1;
        }
        const averageRoughness = neighborCount > 0 ? roughness / neighborCount : 0;
        const slopeScore = clamp(1 - averageRoughness * 12, 0, 1);
        const edgeDistance = Math.min(x, width - 1 - x, y, height - 1 - y);
        const maxEdgeDistance = Math.max(1, Math.min(width, height) / 2);
        const edgeScore = clamp(edgeDistance / maxEdgeDistance, 0, 1);
        let riverAdjacency = 0;
        for (let i = 0; i < cardinalOffsets.length; i += 1) {
          const nx = x + cardinalOffsets[i][0];
          const ny = y + cardinalOffsets[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const neighborTile = tiles[ny][nx];
          if (neighborTile && neighborTile.river) {
            riverAdjacency += 1;
          }
        }
        const riverScore = riverAdjacency > 0 ? clamp(0.18 + riverAdjacency * 0.06, 0, 0.32) : 0;
        const score =
          elevationScore * 0.4 + slopeScore * 0.25 + edgeScore * 0.15 + riverScore + rng() * 0.2;
        townCandidates.push({ x, y, score });
      }
    }

    if (townCandidates.length > 0) {
      townCandidates.sort((a, b) => b.score - a.score);
      const area = width * height;
      const baseTarget = Math.max(2, Math.round(area / 4800));
      const maxTowns = computeStructurePlacementLimit(baseTarget, 36, humanSettlementMultiplier);
      const baseMinDistance = Math.max(6, Math.round(Math.min(width, height) / 12));
      const minDistance = adjustMinDistance(baseMinDistance, humanSettlementFrequencyNormalized);
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
        if (!tile || !isLandBaseTile(tile.base) || tile.overlay || tile.structure || tile.river) {
          continue;
        }
        const name = generateTownName(rng);
        const details = generateTownDetails(name, rng);
        let structureKey = townKey;
        if (portTownKey) {
          let touchesWater = false;
          for (let i = 0; i < neighborOffsets8.length; i += 1) {
            const nx = candidate.x + neighborOffsets8[i][0];
            const ny = candidate.y + neighborOffsets8[i][1];
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              continue;
            }
            const nIdx = ny * width + nx;
            if (waterMask[nIdx]) {
              touchesWater = true;
              break;
            }
          }
          if (touchesWater) {
            structureKey = portTownKey;
          }
        }
        tile.structure = structureKey;
        tile.structureName = name;
        tile.structureDetails = details;
        towns.push({ x: candidate.x, y: candidate.y, ...details });
        placed.push(candidate);
      }
    }
  }

  const hillOverlayKey = tileLookup.has('HILLS') ? 'HILLS' : null;
  if (hillOverlayKey) {
    const hillUpperThreshold = hasMountainTile
      ? mountainBaseThreshold
      : Math.min(0.92, seaLevel + 0.32);
    const hillLowerBaseline = hasMountainTile
      ? mountainBaseThreshold - Math.max(0.16, mountainRange * 0.9)
      : seaLevel + 0.12;
    const hillLowerThreshold = clamp(
      hillLowerBaseline,
      seaLevel + 0.08,
      hillUpperThreshold - 0.04
    );
    if (hillUpperThreshold - hillLowerThreshold > 0.015) {
      const hillRange = Math.max(hillUpperThreshold - hillLowerThreshold, 0.0001);
      const hillPresenceSeed = (seedNumber + 0x0d4d0015) >>> 0;
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          if (waterMask[idx]) {
            continue;
          }
          const tile = tiles[y][x];
          if (
            !tile ||
            tile.overlay ||
            tile.structure ||
            tile.river
          ) {
            continue;
          }
          const baseIsGrass = tile.base === grassTileKey;
          const baseIsSnow = tile.base === snowTileKey;
          if (!baseIsGrass && !baseIsSnow) {
            continue;
          }
          const heightValue = elevationField[idx];
          if (heightValue < hillLowerThreshold || heightValue >= hillUpperThreshold) {
            continue;
          }
          let slopeSum = 0;
          let neighborCount = 0;
          let hasMountainNeighbor = false;
          for (let i = 0; i < neighborOffsets8.length; i += 1) {
            const nx = x + neighborOffsets8[i][0];
            const ny = y + neighborOffsets8[i][1];
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
              continue;
            }
            const nIdx = ny * width + nx;
            const neighborHeight = elevationField[nIdx];
            slopeSum += Math.abs(heightValue - neighborHeight);
            neighborCount += 1;
            if (!hasMountainNeighbor) {
              if (mountainMask && mountainMask[nIdx]) {
                hasMountainNeighbor = true;
              } else {
                const neighborTile = tiles[ny][nx];
                if (
                  neighborTile &&
                  mountainOverlayKey &&
                  isMountainOverlay(neighborTile.overlay)
                ) {
                  hasMountainNeighbor = true;
                }
              }
            }
          }
          const averageSlope = neighborCount > 0 ? slopeSum / neighborCount : 0;
          const slopeScore = clamp((averageSlope - 0.01) * 32, 0, 1);
          if (slopeScore < 0.08 && !hasMountainNeighbor) {
            continue;
          }
          const heightScore = clamp((heightValue - hillLowerThreshold) / hillRange, 0, 1);
          let mountainBonus = hasMountainNeighbor ? 0.25 : 0;
          if (!hasMountainNeighbor && mountainScores) {
            mountainBonus = Math.max(mountainBonus, clamp(mountainScores[idx] * 0.2, 0, 0.2));
          }
          const noiseValue = hashCoords(x, y, hillPresenceSeed) - 0.5;
          const compositeScore =
            heightScore * 0.6 +
            slopeScore * 0.3 +
            mountainBonus +
            noiseValue * 0.12;
          const threshold = 0.5 - mountainBonus * 0.18;
          if (compositeScore > threshold) {
            tile.overlay = hillOverlayKey;
          }
        }
      }
    }
  }

  const caveKey = tileLookup.has('CAVE') ? 'CAVE' : null;
  if (caveKey) {
    const caveCandidates = [];
    const caveNoiseSeed = (seedNumber + 0x21f0e1eb) >>> 0;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSnow = tile.base === snowTileKey;
        if (!baseIsGrass && !baseIsSnow) {
          continue;
        }
        const overlayIsHill = tile.overlay === hillOverlayKey;
        if (tile.overlay && !overlayIsHill) {
          continue;
        }
        const heightValue = elevationField[idx];
        let slopeSum = 0;
        let neighborCount = 0;
        let mountainNeighbors = 0;
        for (let i = 0; i < neighborOffsets8.length; i += 1) {
          const nx = x + neighborOffsets8[i][0];
          const ny = y + neighborOffsets8[i][1];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const nIdx = ny * width + nx;
          if (waterMask[nIdx]) {
            continue;
          }
          slopeSum += Math.abs(heightValue - elevationField[nIdx]);
          neighborCount += 1;
          if (mountainMask && mountainMask[nIdx]) {
            mountainNeighbors += 1;
          } else {
            const neighborTile = tiles[ny][nx];
            if (neighborTile && mountainOverlayKey && isMountainOverlay(neighborTile.overlay)) {
              mountainNeighbors += 1;
            }
          }
        }
        const averageSlope = neighborCount > 0 ? slopeSum / neighborCount : 0;
        const slopeScore = clamp((averageSlope - 0.009) * 36, 0, 1);
        const hillBonus = overlayIsHill ? 0.35 : 0;
        const mountainBonus = Math.min(0.25, mountainNeighbors * 0.08);
        const elevationScore = clamp((heightValue - seaLevel) * 1.9, 0, 1);
        const noise = hashCoords(x, y, caveNoiseSeed) - 0.5;
        const compositeScore =
          hillBonus + slopeScore * 0.45 + mountainBonus + elevationScore * 0.2 + noise * 0.15;
        if (compositeScore > 0.22) {
          caveCandidates.push({ x, y, score: compositeScore, hill: overlayIsHill });
        }
      }
    }

    if (caveCandidates.length > 0) {
      caveCandidates.sort((a, b) => b.score - a.score);
      const area = width * height;
      const baseTarget = Math.max(1, Math.round(area / 9000));
      const maxCaves = computeStructurePlacementLimit(baseTarget, 22, 1);
      const minDistanceBase = 6;
      const minDistance = Math.max(3, minDistanceBase);
      const placed = [];

      for (let i = 0; i < caveCandidates.length; i += 1) {
        if (placed.length >= maxCaves) {
          break;
        }
        const candidate = caveCandidates[i];
        if (candidate.score < 0.28) {
          continue;
        }
        const requiredDistance = candidate.hill ? Math.max(3, minDistance - 1) : minDistance;
        const requiredDistanceSq = requiredDistance * requiredDistance;
        let tooClose = false;
        for (let j = 0; j < placed.length; j += 1) {
          const other = placed[j];
          const dx = candidate.x - other.x;
          const dy = candidate.y - other.y;
          if (dx * dx + dy * dy < requiredDistanceSq) {
            tooClose = true;
            break;
          }
        }
        if (tooClose) {
          continue;
        }
        const tile = tiles[candidate.y][candidate.x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        const overlay = tile.overlay;
        const overlayIsHill = overlay === hillOverlayKey;
        if (overlay && !overlayIsHill) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSnow = tile.base === snowTileKey;
        if (!baseIsGrass && !baseIsSnow) {
          continue;
        }
        tile.structure = caveKey;
        tile.structureName = 'Cave';
        tile.structureDetails = { type: 'cave' };
        placed.push(candidate);
        caves.push({ x: candidate.x, y: candidate.y });
      }
    }
  }

  const hasTreeTile = tileLookup.has('TREE');
  const treeOverlayKey = hasTreeTile ? 'TREE' : null;
  const treeSnowOverlayKey = hasTreeTile && tileLookup.has('TREE_SNOW') ? 'TREE_SNOW' : treeOverlayKey;
  if (hasTreeTile) {
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
        const rainfallValue = rainfallField[idx];
        density = clamp(density * 0.55 + rainfallValue * 0.45, 0, 1);
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
        if (
          tile.overlay ||
          !isLandBaseTile(tile.base) ||
          tile.structure ||
          tile.river ||
          (hasSandTile && tile.base === sandTileKey)
        ) {
          continue;
        }
        const density = treeDensityField[idx];
        if (
          density >= seedThreshold ||
          (density > softSeedThreshold && rng() < (density - softSeedThreshold) * softSeedMultiplier)
        ) {
          treeMask[idx] = 1;
          tile.overlay = tile.base === snowTileKey ? treeSnowOverlayKey : treeOverlayKey;
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
          if (
            tile.overlay ||
            !isLandBaseTile(tile.base) ||
            tile.structure ||
            tile.river ||
            (hasSandTile && tile.base === sandTileKey)
          ) {
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
        if (
          tile.overlay ||
          !isLandBaseTile(tile.base) ||
          tile.structure ||
          tile.river ||
          (hasSandTile && tile.base === sandTileKey)
        ) {
          continue;
        }
        treeMask[idx] = 1;
        tile.overlay = tile.base === snowTileKey ? treeSnowOverlayKey : treeOverlayKey;
      }
    }

    const woodElfGroveKey = tileLookup.has('WOOD_ELF_GROVES') ? 'WOOD_ELF_GROVES' : null;
    if (woodElfGroveKey) {
      const groveCandidates = [];
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const idx = y * width + x;
          const tile = tiles[y][x];
          if (
            !tile ||
            (tile.overlay !== treeOverlayKey && tile.overlay !== treeSnowOverlayKey) ||
            tile.structure
          ) {
            continue;
          }
          const score = treeDensityField ? treeDensityField[idx] : 0;
          groveCandidates.push({ x, y, score });
        }
      }

      if (groveCandidates.length > 0) {
        groveCandidates.sort((a, b) => b.score - a.score);
        const baseTarget = Math.max(1, Math.round(groveCandidates.length / 1350));
        const maxGroves = computeStructurePlacementLimit(
          baseTarget,
          28,
          woodElfSettlementMultiplier
        );
        // Increase the base separation so wood elf groves feel rare and distinct.
        const minDistanceBase = 14;
        const minDistance = adjustMinDistance(minDistanceBase, woodElfSettlementFrequencyNormalized);
        const minDistanceSq = minDistance * minDistance;
        const placed = [];

        for (let i = 0; i < groveCandidates.length; i += 1) {
          if (placed.length >= maxGroves) {
            break;
          }
          const candidate = groveCandidates[i];
          if (candidate.score < 0.32) {
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
          if (
            !tile ||
            (tile.overlay !== treeOverlayKey && tile.overlay !== treeSnowOverlayKey) ||
            tile.structure
          ) {
            continue;
          }
          const name = generateWoodElfGroveName(rng);
          const details = generateWoodElfGroveDetails(name, rng);
          tile.structure = woodElfGroveKey;
          tile.structureName = details.name || name;
          tile.structureDetails = details;
          placed.push(candidate);
          woodElfGroves.push({ x: candidate.x, y: candidate.y, ...details });
        }
      }
    }
  }

  if (towns.length > 1) {
    const roadReplaceableOverlays = new Set(
      [treeOverlayKey, treeSnowOverlayKey, hillOverlayKey].filter((key) => key)
    );
    connectTownsWithinRange(tiles, towns, {
      maxDistance: 25,
      overlayKey: TOWN_ROAD_OVERLAY_KEY,
      width,
      height,
      isLandBaseTile,
      waterMask,
      treeOverlayKey,
      treeSnowOverlayKey,
      isMountainOverlay,
      replaceableOverlays: roadReplaceableOverlays
    });
  }

  const evilWizardTowerKey = tileLookup.has('EVIL_WIZARDS_TOWER') ? 'EVIL_WIZARDS_TOWER' : null;
  if (evilWizardTowerKey) {
    const towerCandidates = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        if (
          treeOverlayKey &&
          (tile.overlay === treeOverlayKey || tile.overlay === treeSnowOverlayKey)
        ) {
          continue;
        }
        if (mountainOverlayKey && isMountainOverlay(tile.overlay)) {
          continue;
        }
        if (tile.overlay) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSnow = tile.base === snowTileKey;
        if (!baseIsGrass && !baseIsSnow) {
          continue;
        }
        const heightValue = elevationField[idx];
        const elevationScore = clamp((heightValue - seaLevel) * 3.1, 0, 1);
        const rainfallValue = rainfallField[idx];
        const drynessScore = clamp(1 - rainfallValue, 0, 1);
        let terrainBonus = 0;
        if (baseIsSnow) {
          terrainBonus += 0.18;
        } else if (baseIsGrass) {
          terrainBonus += 0.12;
        }
        const edgeDistance = Math.min(x, width - 1 - x, y, height - 1 - y);
        const maxEdgeDistance = Math.max(1, Math.min(width, height) / 2.2);
        const edgeScore = clamp(edgeDistance / maxEdgeDistance, 0, 1);
        const score =
          elevationScore * 0.35 + drynessScore * 0.2 + terrainBonus + edgeScore * 0.15 + rng() * 0.3;
        towerCandidates.push({ x, y, score });
      }
    }

    if (towerCandidates.length > 0) {
      towerCandidates.sort((a, b) => b.score - a.score);
      const area = width * height;
      const baseTarget = Math.max(1, Math.round(area / 20000));
      const maxTowers = computeStructurePlacementLimit(baseTarget, 18, towerSettlementMultiplier);
      const baseMinDistance = Math.max(5, Math.round(Math.min(width, height) / 14));
      const minDistance = adjustMinDistance(baseMinDistance, towerSettlementFrequencyNormalized);
      const minDistanceSq = minDistance * minDistance;
      const placed = [];

      for (let i = 0; i < towerCandidates.length; i += 1) {
        if (placed.length >= maxTowers) {
          break;
        }
        const candidate = towerCandidates[i];
        if (candidate.score < 0.22) {
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
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        if (
          treeOverlayKey &&
          (tile.overlay === treeOverlayKey || tile.overlay === treeSnowOverlayKey)
        ) {
          continue;
        }
        if (mountainOverlayKey && isMountainOverlay(tile.overlay)) {
          continue;
        }
        if (tile.overlay) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSnow = tile.base === snowTileKey;
        if (!baseIsGrass && !baseIsSnow) {
          continue;
        }
        const name = `Evil Wizard's ${generateTowerName(rng)}`;
        const details = generateEvilWizardTowerDetails(name, rng);
        tile.structure = evilWizardTowerKey;
        tile.structureName = name;
        tile.structureDetails = details;
        placed.push(candidate);
        evilWizardTowers.push({ x: candidate.x, y: candidate.y, ...details });
      }
    }
  }

  const towerKey = tileLookup.has('TOWER') ? 'TOWER' : null;
  if (towerKey) {
    const towerCandidates = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (waterMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        if (
          treeOverlayKey &&
          (tile.overlay === treeOverlayKey || tile.overlay === treeSnowOverlayKey)
        ) {
          continue;
        }
        if (tile.overlay) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSnow = tile.base === snowTileKey;
        if (!baseIsGrass && !baseIsSnow) {
          continue;
        }
        const heightValue = elevationField[idx];
        const elevationScore = clamp((heightValue - seaLevel) * 3.1, 0, 1);
        const rainfallValue = rainfallField[idx];
        const drynessScore = clamp(1 - rainfallValue, 0, 1);
        let terrainBonus = 0;
        if (baseIsSnow) {
          terrainBonus += 0.18;
        } else if (baseIsGrass) {
          terrainBonus += 0.12;
        }
        const edgeDistance = Math.min(x, width - 1 - x, y, height - 1 - y);
        const maxEdgeDistance = Math.max(1, Math.min(width, height) / 2.2);
        const edgeScore = clamp(edgeDistance / maxEdgeDistance, 0, 1);
        const score =
          elevationScore * 0.35 + drynessScore * 0.2 + terrainBonus + edgeScore * 0.15 + rng() * 0.3;
        towerCandidates.push({ x, y, score });
      }
    }

    if (towerCandidates.length > 0) {
      towerCandidates.sort((a, b) => b.score - a.score);
      const area = width * height;
      const baseTarget = Math.max(1, Math.round(area / 20000));
      const maxTowers = computeStructurePlacementLimit(baseTarget, 18, towerSettlementMultiplier);
      const baseMinDistance = Math.max(5, Math.round(Math.min(width, height) / 14));
      const minDistance = adjustMinDistance(baseMinDistance, towerSettlementFrequencyNormalized);
      const minDistanceSq = minDistance * minDistance;
      const placed = [];

      for (let i = 0; i < towerCandidates.length; i += 1) {
        if (placed.length >= maxTowers) {
          break;
        }
        const candidate = towerCandidates[i];
        if (candidate.score < 0.22) {
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
        if (!tile || tile.structure || tile.river) {
          continue;
        }
        if (
          treeOverlayKey &&
          (tile.overlay === treeOverlayKey || tile.overlay === treeSnowOverlayKey)
        ) {
          continue;
        }
        if (tile.overlay) {
          continue;
        }
        const baseIsGrass = tile.base === grassTileKey;
        const baseIsSnow = tile.base === snowTileKey;
        if (!baseIsGrass && !baseIsSnow) {
          continue;
        }
        const name = generateTowerName(rng);
        const details = generateTowerDetails(name, rng);
        tile.structure = towerKey;
        tile.structureName = name;
        tile.structureDetails = details;
        placed.push(candidate);
        towers.push({ x: candidate.x, y: candidate.y, ...details });
      }
    }
  }

  if (
    mountainOverlayKey &&
    mountainMask &&
    (mountainTopVariantKeys.length > 0 || mountainBottomVariantKeys.length > 0)
  ) {
    const selectVariant = (keys, x, y) => {
      if (!keys || keys.length === 0) {
        return null;
      }
      const hash = ((x + 1) * 73856093) ^ ((y + 1) * 19349663);
      const index = Math.abs(hash) % keys.length;
      return keys[index];
    };

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = y * width + x;
        if (!mountainMask[idx]) {
          continue;
        }
        const tile = tiles[y][x];
        if (!tile || !isMountainOverlay(tile.overlay)) {
          continue;
        }
        const hasMountainAbove = y > 0 && mountainMask[(y - 1) * width + x];
        const hasMountainBelow = y < height - 1 && mountainMask[(y + 1) * width + x];
        if (!hasMountainAbove && hasMountainBelow) {
          const variant = selectVariant(mountainTopVariantKeys, x, y);
          if (variant) {
            tile.overlay = variant;
            continue;
          }
        }
        if (!hasMountainBelow && hasMountainAbove) {
          const variant = selectVariant(mountainBottomVariantKeys, x, y);
          if (variant) {
            tile.overlay = variant;
            continue;
          }
        }
        tile.overlay = mountainOverlayKey;
      }
    }
  }

  const finalSeed = seedString && seedString.trim().length ? seedString.trim() : generateSeedString(seedNumber);
  return {
    tiles,
    seedString: finalSeed,
    dwarfholds,
    towns,
    towers,
    caves,
    evilWizardTowers,
    woodElfGroves
  };
}

function generateSeedString(seedNumber) {
  return seedNumber.toString(16).padStart(8, '0');
}

function drawRiverSegment(ctx, river, x, y) {
  if (!river) {
    return;
  }
  const definition = tileLookup.get(river.tileKey || river.key);
  if (!definition) {
    return;
  }
  const sheet = state.tileSheets[definition.sheet];
  if (!sheet || !sheet.image) {
    return;
  }
  ctx.drawImage(
    sheet.image,
    definition.sx,
    definition.sy,
    definition.size,
    definition.size,
    x * drawSize,
    y * drawSize,
    drawSize,
    drawSize
  );
}

function getRoadTileVariantDefinition(x, y) {
  if (!Number.isFinite(x) || !Number.isFinite(y) || roadTileVariantDefinitions.length === 0) {
    return null;
  }
  const hash = ((x + 1) * 73856093) ^ ((y + 1) * 19349663);
  const index = Math.abs(hash) % roadTileVariantDefinitions.length;
  return roadTileVariantDefinitions[index] || null;
}

function drawRoadOverlay(ctx, x, y) {
  if (!ctx) {
    return false;
  }
  const definition = getRoadTileVariantDefinition(x, y);
  if (!definition) {
    return false;
  }
  const sheet = state.tileSheets[definition.sheetKey];
  if (!sheet || !sheet.image) {
    return false;
  }

  ctx.drawImage(
    sheet.image,
    definition.sx,
    definition.sy,
    definition.size,
    definition.size,
    x * drawSize,
    y * drawSize,
    drawSize,
    drawSize
  );
  return true;
}

function drawCustomOverlay(ctx, overlayKey, x, y) {
  if (overlayKey === TOWN_ROAD_OVERLAY_KEY) {
    return drawRoadOverlay(ctx, x, y);
  }
  return false;
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

      if (cell.river) {
        drawRiverSegment(ctx, cell.river, x, y);
      }

      if (cell.overlay) {
        const overlayDefinition = tileLookup.get(cell.overlay);
        if (!overlayDefinition) {
          drawCustomOverlay(ctx, cell.overlay, x, y);
        } else {
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
  if (elements.worldSeedInput) {
    elements.worldSeedInput.value = seedString;
  }
  updateWorldInfoSeedDisplay(seedString);
  if (elements.worldMapSizeSelect) {
    elements.worldMapSizeSelect.value = state.settings.mapSize;
  }
  updateWorldInfoSizeDisplay();
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
  if (elements.worldSeedInput) {
    elements.worldSeedInput.value = world.seedString;
  }
  updateWorldInfoSeedDisplay(world.seedString);
}

function randomSeedString() {
  return Math.random().toString(36).slice(2, 10);
}

function handleRegenerate() {
  const randomSeed = randomSeedString();
  state.settings.seedString = randomSeed;
  elements.seedInput.value = randomSeed;
  if (elements.worldSeedInput) {
    elements.worldSeedInput.value = randomSeed;
  }
  updateWorldInfoSeedDisplay(randomSeed);
  generateAndRender(randomSeed);
}

function syncInputsWithSettings() {
  if (elements.mapSizeSelect) {
    elements.mapSizeSelect.value = state.settings.mapSize;
  }
  if (elements.worldMapSizeSelect) {
    elements.worldMapSizeSelect.value = state.settings.mapSize;
  }
  updateWorldInfoSizeDisplay();
  if (elements.seedInput) {
    elements.seedInput.value = state.settings.seedString;
  }
  if (elements.worldSeedInput) {
    elements.worldSeedInput.value = state.settings.seedString;
  }
  updateWorldInfoSeedDisplay(state.settings.seedString);
  if (elements.forestFrequencyInput) {
    const value = sanitizeFrequencyValue(
      state.settings.forestFrequency,
      defaultForestFrequency
    );
    elements.forestFrequencyInput.value = value.toString();
    updateFrequencyDisplay(elements.forestFrequencyValue, value);
  }
  if (elements.mountainFrequencyInput) {
    const value = sanitizeFrequencyValue(
      state.settings.mountainFrequency,
      defaultMountainFrequency
    );
    elements.mountainFrequencyInput.value = value.toString();
    updateFrequencyDisplay(elements.mountainFrequencyValue, value);
  }
  if (elements.riverFrequencyInput) {
    const value = sanitizeFrequencyValue(state.settings.riverFrequency, 50);
    elements.riverFrequencyInput.value = value.toString();
    updateFrequencyDisplay(elements.riverFrequencyValue, value);
  }
  if (elements.humanSettlementFrequencyInput) {
    const value = sanitizeFrequencyValue(state.settings.humanSettlementFrequency, 50);
    elements.humanSettlementFrequencyInput.value = value.toString();
    updateFrequencyDisplay(elements.humanSettlementFrequencyValue, value);
  }
  if (elements.dwarfSettlementFrequencyInput) {
    const value = sanitizeFrequencyValue(state.settings.dwarfSettlementFrequency, 50);
    elements.dwarfSettlementFrequencyInput.value = value.toString();
    updateFrequencyDisplay(elements.dwarfSettlementFrequencyValue, value);
  }
  if (elements.woodElfSettlementFrequencyInput) {
    const value = sanitizeFrequencyValue(state.settings.woodElfSettlementFrequency, 50);
    elements.woodElfSettlementFrequencyInput.value = value.toString();
    updateFrequencyDisplay(elements.woodElfSettlementFrequencyValue, value);
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

  if (elements.riverFrequencyInput) {
    elements.riverFrequencyInput.addEventListener('input', (event) => {
      const value = sanitizeFrequencyValue(event.target.value, state.settings.riverFrequency);
      updateFrequencyDisplay(elements.riverFrequencyValue, value);
    });
  }

  if (elements.humanSettlementFrequencyInput) {
    elements.humanSettlementFrequencyInput.addEventListener('input', (event) => {
      const value = sanitizeFrequencyValue(
        event.target.value,
        state.settings.humanSettlementFrequency
      );
      updateFrequencyDisplay(elements.humanSettlementFrequencyValue, value);
    });
  }

  if (elements.dwarfSettlementFrequencyInput) {
    elements.dwarfSettlementFrequencyInput.addEventListener('input', (event) => {
      const value = sanitizeFrequencyValue(
        event.target.value,
        state.settings.dwarfSettlementFrequency
      );
      updateFrequencyDisplay(elements.dwarfSettlementFrequencyValue, value);
    });
  }

  if (elements.woodElfSettlementFrequencyInput) {
    elements.woodElfSettlementFrequencyInput.addEventListener('input', (event) => {
      const value = sanitizeFrequencyValue(
        event.target.value,
        state.settings.woodElfSettlementFrequency
      );
      updateFrequencyDisplay(elements.woodElfSettlementFrequencyValue, value);
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
      const selectedMapSizeKey = elements.worldMapSizeSelect
        ? elements.worldMapSizeSelect.value
        : state.settings.mapSize;
      const selectedPreset = getMapSizePreset(selectedMapSizeKey);
      applyMapSizePresetToState(selectedPreset);
      if (elements.worldMapSizeSelect) {
        elements.worldMapSizeSelect.value = state.settings.mapSize;
      }
      if (elements.mapSizeSelect) {
        elements.mapSizeSelect.value = state.settings.mapSize;
      }
      updateWorldInfoSizeDisplay();

      if (elements.worldSeedInput) {
        state.settings.seedString = elements.worldSeedInput.value.trim();
      }
      let finalSeed = state.settings.seedString;
      if (!finalSeed) {
        finalSeed = ensureSeedString();
        if (elements.worldSeedInput) {
          elements.worldSeedInput.value = finalSeed;
        }
      }
      state.settings.lastSeedString = finalSeed;
      if (elements.seedInput) {
        elements.seedInput.value = finalSeed;
      }
      updateWorldInfoSeedDisplay(finalSeed);

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

  if (elements.worldMapSizeSelect) {
    elements.worldMapSizeSelect.addEventListener('change', (event) => {
      const preset = getMapSizePreset(event.target.value);
      applyMapSizePresetToState(preset);
      if (elements.mapSizeSelect) {
        elements.mapSizeSelect.value = state.settings.mapSize;
      }
      updateWorldInfoSizeDisplay();
    });
  }

  if (elements.worldSeedInput) {
    elements.worldSeedInput.addEventListener('input', (event) => {
      const newValue = event.target.value;
      state.settings.seedString = newValue.trim();
      updateWorldInfoSeedDisplay(newValue);
      if (elements.seedInput && elements.seedInput !== event.target) {
        elements.seedInput.value = newValue;
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
      playSoundEffect(soundEffects.randomiseClick);
      elements.dwarfRandomise.classList.add('randomise-button__dice--rolled');
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

  setupTraitSliderControl('skin', elements.dwarfSkinSlider, elements.dwarfSkinSliderValue);
  setupTraitSliderControl('head', elements.dwarfHeadSlider, elements.dwarfHeadSliderValue);
  setupTraitSliderControl('eyes', elements.dwarfEyeSlider, elements.dwarfEyeSliderValue);
  setupTraitSliderControl(
    'hairStyle',
    elements.dwarfHairStyleSlider,
    elements.dwarfHairStyleSliderValue
  );
  setupTraitSliderControl('hair', elements.dwarfHairSlider, elements.dwarfHairSliderValue);

  setupTraitSliderControl('beard', elements.dwarfBeardSlider, elements.dwarfBeardSliderValue);

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
