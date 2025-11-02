import { tileLookup } from '../assets.js';

export const defaultWorldGenerationType = 'normal';
export const hillOverlayKeySet = new Set([
  'HILLS',
  'HILLS_VARIANT_A',
  'HILLS_VARIANT_B',
  'HILLS_SNOW',
  'HILLS_BADLANDS'
]);
export const treeOverlayKeySet = new Set(['TREE', 'TREE_LONE', 'TREE_SNOW', 'JUNGLE_TREE']);
export const cutTreeOverlayKey = tileLookup.has('CUT_TREES') ? 'CUT_TREES' : null;
export const farmCropOverlayKey = tileLookup.has('FARM_CROPS') ? 'FARM_CROPS' : null;
export const jungleOverlayKey = 'JUNGLE_TREE';
export const woodElfGroveStructureKeys = ['WOOD_ELF_GROVES', 'WOOD_ELF_GROVES_LARGE', 'WOOD_ELF_GROVES_GRAND'];
export const woodElfGroveStructureKeySet = new Set(woodElfGroveStructureKeys);
export const isWoodElfGroveStructureKey = (key) =>
  typeof key === 'string' && woodElfGroveStructureKeySet.has(key);

export const volcanoOverlayKeySet = new Set(['VOLCANO', 'ACTIVE_VOLCANO']);
export const isVolcanoOverlayKey = (key) => typeof key === 'string' && volcanoOverlayKeySet.has(key);
export const isMountainOverlayKey = (key) =>
  typeof key === 'string' && (key.startsWith('MOUNTAIN') || isVolcanoOverlayKey(key));
export const isHillOverlayKey = (key) => typeof key === 'string' && hillOverlayKeySet.has(key);
export const isTreeOverlayKey = (key) => typeof key === 'string' && treeOverlayKeySet.has(key);
export const tileHasTreeOverlay = (tile) =>
  Boolean(tile) && (isTreeOverlayKey(tile.overlay) || isTreeOverlayKey(tile.hillOverlay));
export const isJungleOverlayKey = (key) => typeof key === 'string' && key === jungleOverlayKey;
export const tileHasJungleOverlay = (tile) =>
  Boolean(tile) && (isJungleOverlayKey(tile.overlay) || isJungleOverlayKey(tile.hillOverlay));
export const darkDwarfholdVolcanoRadius = 4;
export const townSettlementTypes = new Set(['town', 'city', 'village']);
export const isTownSettlementDetails = (details) =>
  Boolean(details) &&
  details.isSettlement === true &&
  typeof details.type === 'string' &&
  townSettlementTypes.has(details.type);
export const tileHasTownSettlement = (tile) => isTownSettlementDetails(tile?.structureDetails);

export function evaluateFactionTileSuitability(faction, tile, x, y) {
  if (!faction || !tile) {
    return 0;
  }

  const type =
    (faction.capital && typeof faction.capital.type === 'string' && faction.capital.type) || 'settlement';

  switch (type) {
    case 'hillhold':
    case 'dwarfhold': {
      if (
        tile.structure === 'DWARFHOLD' ||
        tile.structure === 'GREAT_DWARFHOLD' ||
        tile.structure === 'ABANDONED_DWARFHOLD' ||
        tile.structure === 'HILLHOLD'
      ) {
        return 1;
      }
      if (isMountainOverlayKey(tile.overlay) || isMountainOverlayKey(tile.hillOverlay)) {
        return 1;
      }
      if (isHillOverlayKey(tile.overlay) || isHillOverlayKey(tile.hillOverlay)) {
        return 0.45;
      }
      return 0;
    }
    case 'woodElfGrove': {
      if (isWoodElfGroveStructureKey(tile.structure)) {
        return 1;
      }
      if (tileHasTreeOverlay(tile)) {
        return 1;
      }
      return 0;
    }
    case 'lizardmenCity': {
      if (tile.structure === 'LIZARDMEN_CITY') {
        return 1;
      }
      if (tile.base === 'WATER') {
        return 0;
      }
      if (tileHasJungleOverlay(tile)) {
        return 1;
      }
      if (tileHasTreeOverlay(tile)) {
        return 0.3;
      }
      return 0;
    }
    case 'tower':
    case 'evilWizardTower': {
      if (tile.base === 'WATER') {
        return 0;
      }

      const overlayIsMountain = isMountainOverlayKey(tile.overlay) || isMountainOverlayKey(tile.hillOverlay);
      const overlayIsHill = isHillOverlayKey(tile.overlay) || isHillOverlayKey(tile.hillOverlay);
      const overlayIsForest = isTreeOverlayKey(tile.overlay);

      let suitability = 1;

      if (overlayIsMountain) {
        if (Number.isFinite(x) && Number.isFinite(y)) {
          const dx = x - faction.capital.x;
          const dy = y - faction.capital.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance <= Math.SQRT2) {
            suitability *= 0.35;
          } else {
            return 0.05;
          }
        } else {
          return 0.05;
        }
      }

      if (overlayIsHill) {
        suitability *= 0.35;
      }

      if (overlayIsForest) {
        suitability *= 0.35;
      }

      return suitability;
    }
    case 'village': {
      if (tile.base === 'WATER') {
        return 0;
      }

      const overlayIsMountain = isMountainOverlayKey(tile.overlay) || isMountainOverlayKey(tile.hillOverlay);
      const overlayIsHill = isHillOverlayKey(tile.overlay) || isHillOverlayKey(tile.hillOverlay);
      const overlayIsForest = isTreeOverlayKey(tile.overlay);

      let suitability = 1;

      if (overlayIsMountain) {
        suitability *= 0.2;
      } else if (overlayIsHill) {
        suitability *= 0.45;
      }

      if (overlayIsForest) {
        suitability *= 0.5;
      }

      return suitability;
    }
    case 'town': {
      if (tile.base === 'WATER') {
        return 0;
      }

      const overlayIsMountain = isMountainOverlayKey(tile.overlay) || isMountainOverlayKey(tile.hillOverlay);
      const overlayIsHill = isHillOverlayKey(tile.overlay) || isHillOverlayKey(tile.hillOverlay);
      const overlayIsForest = isTreeOverlayKey(tile.overlay);

      let suitability = 1;

      if (overlayIsMountain) {
        suitability *= 0.3;
      } else if (overlayIsHill) {
        suitability *= 0.6;
      }

      if (overlayIsForest) {
        suitability *= 0.75;
      }

      return suitability;
    }
    default:
      return 1;
  }
}


export const mapSizePresets = [
  { key: 'mini', label: 'Mini', width: 192, height: 144 },
  { key: 'small', label: 'Small', width: 260, height: 195 },
  { key: 'normal', label: 'Normal', width: 324, height: 243 },
  { key: 'large', label: 'Large', width: 424, height: 318 },
  { key: 'extra-large', label: 'Extra Large', width: 520, height: 390 }
];

export const mapSizeByKey = mapSizePresets.reduce((acc, preset) => {
  acc[preset.key] = preset;
  return acc;
}, {});

export function getMapSizePreset(key) {
  return mapSizeByKey[key] || mapSizeByKey.normal;
}

export function applyMapSizePreset(settings, preset) {
  if (!settings || !preset) {
    return;
  }
  settings.mapSize = preset.key;
  settings.width = preset.width;
  settings.height = preset.height;
}

export function getMapSizeLabel(preset, width, height) {
  if (preset) {
    return `${preset.label} — ${preset.width} × ${preset.height} tiles`;
  }
  if (typeof width === 'number' && typeof height === 'number') {
    return `${width} × ${height} tiles`;
  }
  return '—';
}

export const defaultMapSize = getMapSizePreset('normal');
export const defaultForestFrequency = 35;
export const defaultMountainFrequency = 35;

export const worldNames = [
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
  'Tarnadam',
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
  'Skibiti Toliterium',
  'Syx',
  'Quidd'
];

export const realmNameAdjectives = [
  'Azure',
  'Gilded',
  'Obsidian',
  'Verdant',
  'Crimson',
  'Sable',
  'Ivory',
  'Stormborn',
  'Radiant',
  'Umbral',
  'Ember',
  'Frostbound',
  'Sunlit',
  'Twilight',
  'Shattered',
  'Celestial',
  'Runed',
  'Eclipsed'
];

export const realmNameNouns = [
  'Dominion',
  'Compact',
  'Marches',
  'Concord',
  'Throne',
  'Hegemony',
  'Alliance',
  'Syndicate',
  'Banner',
  'Legion',
  'Pact',
  'Confederacy',
  'Circle',
  'Assembly',
  'Holdings',
  'Enclave',
  'Sovereignty',
  'Ward'
];

export const factionColorPalette = [
  '#ef4444',
  '#3b82f6',
  '#22c55e',
  '#eab308',
  '#a855f7',
  '#f97316',
  '#0ea5e9',
  '#ec4899',
  '#14b8a6',
  '#c084fc',
  '#facc15',
  '#38bdf8'
];

export function pickFactionColor(index) {
  if (!Array.isArray(factionColorPalette) || factionColorPalette.length === 0) {
    return '#f97316';
  }
  const size = factionColorPalette.length;
  if (!Number.isFinite(index)) {
    return factionColorPalette[0];
  }
  const normalized = ((Math.floor(index) % size) + size) % size;
  return factionColorPalette[normalized];
}

export const dwarfholdCuratedNames = [
  'Khazadûn Kharn',
  'Dhurnomli Bûr',
  'Zarak-az-Garaz',
  'Barûn-karag',
  'Gundûm Garmak',
  'Azar-khazad',
  'Thûrdrim Duraz',
  'Kazad-grimil',
  'Bêrdûm Barak',
  'Zirak-khazad',
  'Uzbad-az-Narg',
  'Karag Gor',
  'Dûmthûr Mîn',
  'Gûndâl Grum',
  'Thrâng-khazad',
  'Khirûn-karag',
  'Gazad-az-Bôr',
  'Dûrgrim Dûm',
  'Bazâr-durin',
  'Kharak-khazad',
  'Thûrdûn Thrum',
  'Gazûl-dûm',
  'Gor Dûrgheled',
  'Khûrmak Dûm',
  'Barak-dûrûn',
  'Gadrin-karag',
  'Mornûl Khazad',
  'Tharûm Barûn',
  'Dûr-az-Gor',
  'Kûzad Thrang',
  'Grumkhaz Dûm',
  'Narûm-barak',
  'Khûldar Narg',
  'Azûl-az-Khazad',
  'Dûmthrûn Garaz',
  'Grom-dûrin',
  'Khazdûl Garm',
  'Burin-dûm',
  'Zarak-nâl',
  'Thuldûn Karag',
  'Durgrûn Khazad',
  'Garak-dûm',
  'Tharn-az-Dûr',
  'Kharûm Grimdûm',
  'Balzûr Karûn',
  'Mûrkhaz Barak',
  'Thrûm-az-Garaz',
  'Gundûl-dûm',
  'Bârgrin Khazad',
  'Dûmbar Thûr',
  'Nûrgrim Karag',
  'Thûlûm Dûrûn',
  'Kharn-dûm-nâl',
  'Throgar-Mâl',
  'Krundûn Barak',
  'Dûrkhal Varrum',
  'Ghazdûr Grimbar',
  'Kuldûn-Dûr',
  'Brakûl Thrang',
  'Zarnak-dûm',
  'Throldar Kharn',
  'Mûldûn Grakhaz',
  'Durmûr Barûn',
  'Merûn Barin',
  'Dûldar Harnûm',
  'Bronarûm',
  'Kharalûn Dûr',
  'Garûn-kaz',
  'Thûrli Barûn',
  'Balnar Dûm',
  'Orûn Khazal',
  'Dûmren Thûr',
  'Beldûr Karûn',
  'Uldûm Nargaz',
  'Khardûl Barzûn',
  'Thûrkûn-Môr',
  'Zuldarûn',
  'Dûrthang Kharûz',
  'Brûm-dûl',
  'Gûldûn Thazrak',
  'Khazûr-Dumli',
  'Thrûnûl Barûz',
  'Mûrzan-Dûm',
  'Grendûl Varrin',
  'Kharnfell',
  'Dûmholm',
  'Barakdel',
  'Thûrdûn Holdfast',
  'Gromir Karûn',
  'Kharûm Tor',
  "Thulgar's Deep",
  'Brumkeldûm',
  'Dûrmar Hollow'
];

export const dwarfholdNamePrefixes = [
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

export const dwarfholdNameSuffixes = [
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

export const dwarfholdNameDescriptors = [
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

export const dwarfholdNameRegions = [
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

export const dwarfholdRulerTitles = {
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

export const darkDwarfholdLeaderTitles = [
  'Emperor',
  'Sorcerer-Thane',
  'Warlork High Lord',
  'Sorcerer-Prophet',
  'Lawgiver',
  'Dark-Thane'
];

export const dwarfholdHallmarks = [
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

export const dwarfholdExportOptions = [
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

export const mineNamePrefixes = [
  'Iron',
  'Silver',
  'Copper',
  'Gold',
  'Mithril',
  'Coal',
  'Gem',
  'Obsidian',
  'Crystal',
  'Rune',
  'Ember',
  'Thunder',
  'Star',
  'Deep'
];

export const mineNameSuffixes = [
  'delve',
  'reach',
  'shaft',
  'vein',
  'hollow',
  'works',
  'forge',
  'deep',
  'spire',
  'gate'
];

export const mineNameDescriptors = ['Mine', 'Delve', 'Excavation', 'Works', 'Prospect'];

export const mineResourceProfiles = [
  {
    resource: 'iron ore',
    export: 'pig iron billets',
    description: 'Magnetite seams glow ember-red beneath rune lanterns.'
  },
  {
    resource: 'silver ore',
    export: 'refined silver ingots',
    description: 'Silver veins lace the rock like moonlight trapped in stone.'
  },
  {
    resource: 'gold ore',
    export: 'gold dust and ingots',
    description: 'Gold threads shimmer in quartz pockets with every pick strike.'
  },
  {
    resource: 'mithril ore',
    export: 'mithril flakes and bars',
    description: 'Mithril filaments sing softly when teased free of the bedrock.'
  },
  {
    resource: 'coal seams',
    export: 'smokeless coke bricks',
    description: 'Coal seams burn clean and hot, prized by deep forges.'
  },
  {
    resource: 'gemstone geodes',
    export: 'uncut gemstones',
    description: 'Geodes crack open to reveal lantern-lit caverns of colour.'
  },
  {
    resource: 'copper ore',
    export: 'worked copper ingots',
    description: 'Copper veins patina the tunnels with a verdant sheen.'
  }
];

export const mineHazardOptions = [
  'sulfur vents that hiss until rune chimneys release the pressure',
  'echo spirits that steal tools left unattended in dark galleries',
  'shatterstone pockets that collapse without rune-braced timbers',
  'flood-prone shafts kept dry by steam-powered pumps',
  'tunnelwyrms that gnaw the deepest stopes if watchfires go dim',
  'glittermote swarms that daze miners who forget their goggles'
];

export const mineCrewNames = [
  'Deepdelver Crew',
  'Amberpick Syndicate',
  'Runehammer Shift',
  'Thunderpick Assembly',
  'Glowforge Line',
  'Stonebite League'
];

export const mineSecondaryExports = [
  'runed support struts',
  'cut granite blocks',
  'slagglass baubles',
  'precision drill heads',
  'barrels of blasting powder'
];

export const hillholdNamePrefixes = [
  'Stone',
  'Amber',
  'Bronze',
  'Granite',
  'Cloud',
  'Storm',
  'Frost',
  'Ember',
  'Ridge',
  'Hearth',
  'Rune',
  'Copper',
  'Oak',
  'Pine',
  'Crown',
  'Deep',
  'Iron'
];

export const hillholdNameSuffixes = [
  'watch',
  'guard',
  'hold',
  'fast',
  'hearth',
  'delve',
  'gate',
  'spire',
  'tor',
  'bastion'
];

export const hillholdNameDescriptors = [
  'Hill',
  'Heights',
  'Tor',
  'Rise',
  'Overlook',
  'Sentinel',
  'Cairn',
  'Keep'
];

export const hillholdHallmarks = [
  'Terraced stone halls clutch the hillside with iron-rooted buttresses.',
  'Signal beacons line the ridge, flaring to warn the mountain clans.',
  'Stonecut breweries age ember-ale in vaults carved into the slope.',
  'A ring of rune-warded cairns keeps avalanches at bay.',
  'Watchful ballistae peer over the passes, ready for skyborne threats.',
  'Ancestral murals glow softly where the hill meets the mountain.',
  'Tunnel orchards cultivate silverleaf whose sap steeps hardy brews.',
  'Gear-driven lifts ferry caravans up the steep approach roads.'
];

export const hillholdWatchOrders = [
  'Ridgeguard Brotherhood',
  'Hearthward Sentinels',
  'Torwatch Lodge',
  'Amberhorn Vigil',
  'Thunderpeak Watch',
  'Mistveil Wardens',
  'Stoneflare Rangers',
  'Copper Torches'
];

export const hillholdWardenTitles = [
  'Holdthane',
  'Ridgekeeper',
  'Beacon Marshal',
  'Hearthwarden',
  'Overthane',
  'Watch Captain',
  'Stoneward',
  'Beaconwarden'
];

export const hillholdExports = [
  'Granite keystones for mountain keeps',
  'Casks of ember-aged hill ale',
  'Runic beacons and signal braziers',
  'Polished horn trumpets for war warnings',
  'Refined copper filigree and fastenings',
  'Carved cairn-stones blessed by runepriests',
  'Seasoned pine from terraced groves',
  'Skybridge chains and hoist mechanisms'
];

export const hillholdDefensiveTraits = [
  'Triple-beacon towers crown the ridgeline.',
  'Hidden sally tunnels open behind the hill.',
  'Rampart ballistae track the mountain pass day and night.',
  'Iron portcullises seal the ascent at a gesture.',
  'Seismic wards rumble whenever giants near.',
  'Water-driven sirens wail when the beacons ignite.'
];

export const hillholdSentinelFocuses = [
  'guarding the trade-lanes that skirt the mountains',
  'keeping troll warbands from spilling onto the plains',
  'escorting caravans between hill clans and deep holds',
  'tracking wyvern flights that nest in the cliffs',
  'holding vigil for goblin raiders slipping through the passes',
  'surveying avalanche-prone slopes for signs of collapse',
  'maintaining the beacon-chain that links the northern holds',
  'patrolling ancient roads carved before the age of kings'
];

export const goblinCaveNamePrefixes = [
  'Murkfang',
  'Skullcleft',
  'Rotlash',
  'Gloomspine',
  'Ashknuckle',
  'Blightvein',
  'Snarltooth',
  'Festerwick'
];

export const goblinCaveNameSuffixes = ['Warrens', 'Lair', 'Grotto', 'Den', 'Burrows', 'Hollow', 'Tunnels'];

export const goblinCaveHallmarks = [
  'Smoke-stained vents belch the scent of tallow and fungus brew.',
  'Caged cave wolves snarl from pits lining the main approach.',
  'Raid trophies dangle from sinew cords woven between stalactites.',
  'Alarm drums echo through the tunnels at the slightest intrusion.',
  'Glowmoss lanterns trace the paths of nightly war parties.',
  'Entrances are trapped with bone chimes and caltrop pits.',
  'Goblin glyphs warn trespassers of feasting clans within.'
];

export const goblinCaveActivities = [
  'plotting raids on passing caravans',
  'brewing acrid fungus ales',
  'training warg packs for night assaults',
  'hammering crude iron spikes into jagged armour',
  'chanting to cavern spirits for luck in plunder',
  'bartering stolen steel with hidden hobgoblin envoys',
  'raising squirming litters of goblin young'
];

export const goblinClanNames = [
  'Spitebite Clan',
  'Murkmaw Mob',
  'Rotcap Ragers',
  'Gloomlash Gang',
  'Ashgullet Horde',
  'Festerwick Rabble',
  'Skulknock Tribe',
  'Snarlfang Pack'
];

export const dwarfholdPopulationRaceOptions = [
  { key: 'dwarves', label: 'Dwarves', color: '#f4c069' },
  { key: 'humans', label: 'Humans', color: '#9bb6d8' },
  { key: 'halflings', label: 'Halflings', color: '#f7a072' },
  { key: 'gnomes', label: 'Gnomes', color: '#c9a3e6' },
  { key: 'goblins', label: 'Goblins', color: '#7f8c4d' },
  { key: 'kobolds', label: 'Kobolds', color: '#b1c8ff' },
  { key: 'others', label: 'Others', color: '#9e9e9e' }
];

export const dwarfholdOccupationRaces = [
  { key: 'orcs', label: 'Orcs', color: '#6b8f23' },
  { key: 'trolls', label: 'Trolls', color: '#4f6d7a' },
  { key: 'ratkin', label: 'Ratkin', color: '#7b5e57' },
  { key: 'kobolds', label: 'Kobolds', color: '#b1c8ff' }
];

export const dwarfholdNearbyTownRadius = 12;

export const evilWizardTowerBasePopulationOptions = [
  { key: 'wizards', label: 'Wizards', color: '#9c5cff' }
];

export const evilWizardArchetypes = [
  {
    key: 'necromancer',
    label: 'Necromancer',
    populationOptions: [
      { key: 'undead', label: 'Undead', color: '#b1b1b1' }
    ]
  },
  {
    key: 'warlock',
    label: 'Warlock',
    populationOptions: [
      { key: 'undead', label: 'Undead', color: '#b1b1b1' },
      { key: 'humans', label: 'Humans', color: '#9bb6d8' }
    ]
  },
  {
    key: 'artificer',
    label: 'Artificer',
    populationOptions: [
      { key: 'elementals', label: 'Elementals', color: '#48cae4' }
    ]
  },
  {
    key: 'elementalist',
    label: 'Elementalist',
    populationOptions: [
      { key: 'elementals', label: 'Elementals', color: '#48cae4' },
      { key: 'mindflayers', label: 'Mindflayers', color: '#845ec2' }
    ]
  },
  {
    key: 'voidcaller',
    label: 'Voidcaller',
    populationOptions: [
      { key: 'mindflayers', label: 'Mindflayers', color: '#845ec2' },
      { key: 'undead', label: 'Undead', color: '#b1b1b1' }
    ]
  }
];

export const towerCommanderTitles = [
  'Castellan',
  'Commander of the Watch',
  'High Warden',
  'Beacon Marshal',
  'Captain of the Rampart',
  'Signal Master'
];

export const towerCommanderGivenNames = [
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

export const towerCommanderSurnames = [
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

export const towerOrderNames = [
  'Order of the Dawnwatch',
  'Azure Sentinel Brigade',
  'Wardens of the Highroad',
  'Gilded Lantern Cohort',
  'Scarlet Banner Watch',
  'Guardians of the Stormline',
  'Emerald Rampart Order'
];

export const towerDetachmentOptions = [
  'Hawkrider Wing',
  'Rune-Signal Corps',
  'Ballista Battery',
  'Skysteel Artillery',
  'Shadow Lanterners',
  'Emberguard Phalanx',
  'Stormlance Cavalry'
];

export const towerDutyOptions = [
  'Guarding the high pass road',
  'Maintaining the beacon chain',
  'Patrolling the border marches',
  'Escorting vital trade caravans',
  'Watching over ancient ruins nearby',
  'Shielding frontier villages from raiders'
];

export const towerHallmarks = [
  'Beacon flames that can be seen clear across the frontier.',
  'Clockwork lifts that carry scouts to the highest parapets.',
  'Signal mirrors that flash messages to distant allies at dusk.',
  'A vaulted armoury stocked with relic blades and bannered shields.',
  'An observatory dome charting the movements of stormclouds and foes alike.',
  'Stone walls etched with oath-runes that glow at the approach of danger.'
];

export const towerPopulationRaceOptions = [
  { key: 'elves', label: 'Elves', color: '#6ecf85' },
  { key: 'humans', label: 'Humans', color: '#9bb6d8' },
  { key: 'dwarves', label: 'Dwarves', color: '#f4c069' },
  { key: 'halflings', label: 'Halflings', color: '#f7a072' },
  { key: 'dragonborn', label: 'Dragonborn', color: '#c16a6a' },
  { key: 'tieflings', label: 'Tieflings', color: '#b064b0' },
  { key: 'others', label: 'Others', color: '#9e9e9e' }
];

export const townRulerTitles = {
  male: ['Mayor', 'Lord Mayor', 'High Steward', 'Burgomaster', 'Castellan'],
  female: ['Mayor', 'Lady Mayor', 'High Steward', 'Burgomistress', 'Castellan'],
  neutral: ['Governor', 'Magistrate', 'Marshal', 'Chamberlain', 'Steward']
};

export const townHallmarks = [
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

export const townExportOptions = [
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

export const townPopulationRaceOptions = [
  { key: 'humans', label: 'Humans', color: '#9bb6d8' },
  { key: 'dwarves', label: 'Dwarves', color: '#f4c069' },
  { key: 'elves', label: 'Elves', color: '#6ecf85' },
  { key: 'halflings', label: 'Halflings', color: '#f7a072' },
  { key: 'gnomes', label: 'Gnomes', color: '#c9a3e6' },
  { key: 'dragonborn', label: 'Dragonborn', color: '#c16a6a' },
  { key: 'tieflings', label: 'Tieflings', color: '#b064b0' },
  { key: 'others', label: 'Others', color: '#9e9e9e' }
];

export const townProminentFamilyNames = [
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

export const townGuildOptions = [
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

export const snowVillageNamePrefixes = [
  'Aput',
  'Nanu',
  'Siku',
  'Qimmi',
  'Tuktu',
  'Aklaq',
  'Sila',
  'Ukpik',
  'Imaq',
  'Nuna',
  'Kangi',
  'Talir'
];

export const snowVillageNameSuffixes = [
  'vik',
  'ruq',
  'naq',
  'lik',
  'juq',
  'toq',
  'riaq',
  'suk',
  'aluk',
  'tuuq'
];

export const snowVillageNameDescriptors = ['Camp', 'Harbor', 'Haven', 'Settlement', 'Encampment'];

export const snowVillageLeaderNamePools = {
  male: ['Aputi', 'Tulugaq', 'Inuk', 'Panik', 'Qajaq', 'Nanuq'],
  female: ['Sila', 'Nukka', 'Pipaluk', 'Kaya', 'Tala', 'Tekkeitsertok'],
  neutral: ['Siku', 'Atka', 'Ilu', 'Tuktu', 'Amaruq']
};

export const snowVillageClanNames = ['Qimmiq', 'Sirmiq', 'Ukialik', 'Auyuittuq', 'Nunavik', 'Kugluktuk', 'Panaq', 'Talur'];

export const snowVillageRulerTitles = {
  male: ['Isumataq', 'Angakkuq', 'Head Elder'],
  female: ['Isumataq', 'Angakkuq', 'Head Elder'],
  neutral: ['Isumataq', 'Angakkuq', 'Storykeeper']
};

export const townFirstNamePools = {
  male: ['Aldric', 'Berend', 'Cedric', 'Darian', 'Edric', 'Garran', 'Henric', 'Loric', 'Rowan', 'Therin'],
  female: ['Adela', 'Brienne', 'Celia', 'Elowen', 'Fiora', 'Gwendolyn', 'Isolde', 'Maren', 'Rowena', 'Seren'],
  neutral: ['Arlen', 'Ember', 'Finley', 'Morgan', 'Robin', 'Sage', 'Tarian']
};

export const settlementDetailTypes = new Set([
  'dwarfhold',
  'greatDwarfhold',
  'abandonedDwarfhold',
  'mine',
  'town',
  'city',
  'village',
  'hamlet',
  'evilWizardTower',
  'tower',
  'woodElfGrove',
  'lizardmenCity',
  'cave'
]);

export function resolveTownRulerTitle(gender, randomFn) {
  const genderPool =
    (gender === 'male' && townRulerTitles.male) ||
    (gender === 'female' && townRulerTitles.female) ||
    townRulerTitles.neutral;
  const fallbackPool = townRulerTitles.neutral.length > 0 ? townRulerTitles.neutral : townRulerTitles.male;
  return pickRandomFrom(genderPool && genderPool.length > 0 ? genderPool : fallbackPool, randomFn) || 'Magistrate';
}

export const townNamePrefixes = [
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

export const townNameSuffixes = [
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

export const townNameDescriptors = [
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

export const towerNamePrefixes = [
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

export const towerNameNouns = [
  'Tower',
  'Spire',
  'Watch',
  'Keep',
  'Pinnacle',
  'Bastion',
  'Citadel',
  'Lantern'
];

export const towerNameQualifiers = [
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

export const evilWizardRulerTitles = [
  'Archwizard',
  'Grand Warlock',
  'Mistress of Hexes',
  'Dread Magister',
  'Shadow Thaumaturge',
  'High Necromancer'
];

export const evilWizardGivenNames = [
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

export const evilWizardSurnames = [
  'Nightweaver',
  'Grimspire',
  'Voidbinder',
  'Dusksong',
  'Ashmantle',
  'Frostvein',
  'Starshroud',
  'Runeveil'
];

export const evilWizardEpithets = [
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

export const evilWizardCabalNames = [
  'Circle of Nightglass',
  'Order of the Ebon Star',
  'Covenant of Ashen Veils',
  'Cabal of Thorned Sigils',
  'Symphony of Hollow Suns',
  'Chorus of Silent Bells'
];

export const evilWizardTowerHallmarks = [
  'Shrouded perpetually in stormclouds that crackle with violet lightning.',
  'Whispers say its halls rearrange themselves with each moonrise.',
  'The central spire hums with runes that siphon magic from the ley.',
  'Populated by constructs wrought from obsidian and bone.',
  'Its beacon pulses nightly, summoning spirits from distant graves.',
  'Said to house a library bound in the memories of captured heroes.'
];

export const woodElfGrovePrefixes = [
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

export const woodElfGroveSuffixes = [
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

export const woodElfGroveDescriptors = [
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

export const woodElfGroveElderTitles = [
  'Grove Warden',
  'Verdant Speaker',
  'Circle Elder',
  'Keeper of Boughs',
  'Songwarden',
  'Dawnwatcher'
];

export const woodElfGroveElderGivenNames = [
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

export const woodElfGroveElderSurnames = [
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

export const woodElfGroveHallmarks = [
  'Moonlit rites that weave auroras between the branches.',
  'Ancient treants stand guard over every winding path.',
  'Hidden pools shimmer with restorative starlight dew.',
  'The groves chorus echoes across the forest at dusk.',
  'Bough-bridges knit the canopy into spiralling promenades.',
  'Druidic songcraft summons blossoms even in winter.'
];

export const forestRegionNamePrefixes = [
  'Verdant',
  'Whispering',
  'Emerald',
  'Silver',
  'Shadow',
  'Golden',
  'Moonlit',
  'Ancient',
  'Wild',
  'Sunset'
];

export const forestRegionNameSuffixes = [
  'Groves',
  'Woods',
  'Thicket',
  'Wilds',
  'Canopy',
  'Boughs',
  'Hollows',
  'Glade',
  'Expanse',
  'Reserve'
];

export const forestRegionNameMotifs = [
  'Echoes',
  'Mists',
  'Cicadas',
  'Fables',
  'Starlight',
  'Owls',
  'Whispers',
  'Lanterns',
  'Spirits',
  'Willows'
];

export const mountainRangeNamePrefixes = [
  'Stone',
  'Iron',
  'Storm',
  'Thunder',
  'Frost',
  'Dragon',
  'Obsidian',
  'Moon',
  'Sunspire',
  'Titan'
];

export const mountainRangeNameSuffixes = [
  'Peaks',
  'Range',
  'Highlands',
  'Crown',
  'Mountains',
  'Spines',
  'Escarpment',
  'Ridge',
  'Tor',
  'Bastions'
];

export const mountainRangeNameMotifs = [
  'Storms',
  'Giants',
  'Dawn',
  'Ash',
  'Echoes',
  'Legends',
  'Stars',
  'Anvils',
  'Dragons',
  'Auroras'
];

export const desertNameDescriptors = [
  'Shifting',
  'Burning',
  'Golden',
  'Silent',
  'Glass',
  'Crimson',
  'Howling',
  'Endless',
  'Scoured',
  'Sunken'
];

export const desertNameNouns = [
  'Dunes',
  'Waste',
  'Expanse',
  'Sea',
  'Desert',
  'Reach',
  'Barrens',
  'Quarter',
  'Wastes',
  'Sands'
];

export const desertNameMotifs = [
  'Mirages',
  'Ashes',
  'Suns',
  'Bones',
  'Scorpions',
  'Dust',
  'Secrets',
  'Hollows',
  'Echoes',
  'Zephyrs'
];

export const tundraNameDescriptors = [
  'Frozen',
  'Ivory',
  'Bleak',
  'Glimmering',
  'Shivering',
  'Frostbound',
  'Auric',
  'Pale',
  'Windshorn',
  'Starlit'
];

export const tundraNameNouns = [
  'Tundra',
  'Reach',
  'Steppes',
  'Barrens',
  'Fields',
  'Expanse',
  'Marches',
  'Plateau',
  'Glade',
  'March'
];

export const tundraNameMotifs = [
  'Auroras',
  'Frost',
  'Comets',
  'Stars',
  'Echoes',
  'Drifts',
  'Owls',
  'Lights',
  'Mammoths',
  'Silence'
];

export const grasslandNameDescriptors = [
  'Windward',
  'Emerald',
  'Golden',
  'Rolling',
  'Open',
  'Skylit',
  'Silver',
  'Gentle',
  'Breezy',
  'Sunlit'
];

export const grasslandNameNouns = [
  'Plains',
  'Meadows',
  'Fields',
  'Prairies',
  'Steppes',
  'Expanse',
  'Downs',
  'Reach',
  'Hearth',
  'Lowlands'
];

export const grasslandNameMotifs = [
  'Larks',
  'Horizon',
  'Harvests',
  'Echoes',
  'Sunsets',
  'Breezes',
  'Lanterns',
  'Auroras',
  'Stones',
  'Dreams'
];

export const jungleNameDescriptors = [
  'Emerald',
  'Verdant',
  'Sun-dappled',
  'Obsidian',
  'Mist-shrouded',
  'Ancient',
  'Thundering',
  'Canopy',
  'Moonlit',
  'Serpent'
];

export const jungleNameNouns = [
  'Jungle',
  'Wilds',
  'Canopy',
  'Rainforest',
  'Tangle',
  'Deepwood',
  'Labyrinth',
  'Greenway',
  'Expanse',
  'Verdure'
];

export const jungleNameMotifs = [
  'Serpents',
  'Drums',
  'Monsoons',
  'Spirits',
  'Cenotes',
  'Orchids',
  'Tempests',
  'Roots',
  'Jaguar Spirits',
  'Emerald Dawn'
];

export const marshNameDescriptors = [
  'Glimmer',
  'Mire',
  'Gloom',
  'Low',
  'Sodden',
  'Willow',
  'Brackish',
  'Sable',
  'Sunken',
  'Twilight'
];

export const marshNameNouns = [
  'Bog',
  'Fen',
  'Morass',
  'Quagmire',
  'Wetlands',
  'Mires',
  'Marsh',
  'Reeds',
  'Pools',
  'Sinks'
];

export const marshNameMotifs = [
  'Fireflies',
  'Lilies',
  'Secrets',
  'Mist',
  'Echoes',
  'Cranes',
  'Reeds',
  'Moss',
  'Shadows',
  'Frogs'
];

export const badlandsNameDescriptors = [
  'Shattered',
  'Redstone',
  'Sundered',
  'Dustfallen',
  'Sunblasted',
  'Windswept',
  'Bleached',
  'Broken',
  'Scorched',
  'Cracked'
];

export const badlandsNameNouns = [
  'Badlands',
  'Wastes',
  'Breaks',
  'Barrens',
  'Tablelands',
  'Escarpment',
  'Canyons',
  'Bluffs',
  'Ridges',
  'Maze'
];

export const badlandsNameMotifs = [
  'Bones',
  'Dust',
  'Echoes',
  'Thunderheads',
  'Vultures',
  'Ash',
  'Mirages',
  'Sunstorms',
  'Ruins',
  'Storms'
];

export const oceanNameDescriptors = [
  'Sapphire',
  'Tempest',
  'Sunken',
  'Cerulean',
  'Midnight',
  'Gilded',
  'Storm',
  'Azure',
  'Silent',
  'Everdeep'
];

export const oceanNameNouns = [
  'Sea',
  'Ocean',
  'Gulf',
  'Sound',
  'Reach',
  'Current',
  'Depths',
  'Expanse',
  'Waters',
  'Strait'
];

export const oceanNameMotifs = [
  'Sirens',
  'Stars',
  'Moons',
  'Whales',
  'Voyagers',
  'Storms',
  'Legends',
  'Coral',
  'Mists',
  'Echoes'
];

export const lakeNameDescriptors = [
  'Silver',
  'Crystal',
  'Mirror',
  'Still',
  'Glimmer',
  'Duskwater',
  'Bright',
  'Moon',
  'Amber',
  'Serene'
];

export const lakeNameNouns = [
  'Lake',
  'Mere',
  'Loch',
  'Pond',
  'Basin',
  'Reservoir',
  'Waters',
  'Lagoon',
  'Pool',
  'Bay'
];

export const lakeNameMotifs = [
  'Echoes',
  'Willows',
  'Lanterns',
  'Dreams',
  'Reflections',
  'Whispers',
  'Herons',
  'Lilies',
  'Dawn',
  'Stars'
];

export const woodElfGroveCircleNames = [
  'Circle of the Silver Bough',
  'Circle of Verdant Stars',
  'Circle of Whispering Winds',
  'Circle of Dawnpetals',
  'Circle of the Emerald Veil',
  'Circle of Moonshadow Paths',
  'Circle of the Luminous Seed',
  'Circle of the Elder Stag'
];

export const woodElfGroveOrders = [
  'Wardens of the High Canopy',
  'Rangers of the Verdant Way',
  'Singers of the Luminous Thread',
  'Druids of the Moonwell Accord',
  'Keepers of the Auric Grove',
  'Mistwalkers of the Emerald Watch'
];

export const woodElfGroveExports = [
  'Phials of rejuvenating moonwater',
  'Runed arrowheads carved from starwood',
  'Perfumed resins and incense petals',
  'Luminous moss for healing rituals',
  'Silken banners woven from leaf-fibres',
  'Seedstones that sprout protective thickets'
];

export const woodElfGrovePopulationRoleOptions = [
  { key: 'elves', label: 'Wood Elves', color: '#6ecf85' },
  { key: 'satyrs', label: 'Satyrs', color: '#c18c5d' },
  { key: 'nymphs', label: 'Nymphs', color: '#9bd4a9' },
  { key: 'ents', label: 'Ents', color: '#8bbbcf' }
];

export const woodElfGroveClassificationPopulationMax = {
  'Forest Retreat': 180,
  'Canopy Sanctuary': 240,
  'Hidden Enclave': 360,
  'Sacred Grove': 500,
  'Ancient Grove': 560
};

export const lizardmenCityPopulationRoleOptions = [
  { key: 'lizardmen', label: 'Lizardmen', color: '#3a9f68' }
];

export const lizardmenCityPrefixes = ['Ix', 'Zan', 'Tla', 'Chal', 'Maz', 'Quet', 'Ssz', 'Olo', 'Yax', 'Huac'];
export const lizardmenCitySuffixes = ['atl', 'tlan', 'co', 'maz', 'naka', 'zotl', 'chan', 'poc', 'quil', 'pan'];
export const lizardmenCityClassifications = [
  'Temple City',
  'Sacred Ziggurat',
  'Jungle Metropolis',
  'Canal Citadel',
  'Sun Pyramid Enclave'
];
export const lizardmenCityHallmarks = [
  'Sun-drenched step pyramids rising above the canopy.',
  'Mist-draped terraces fed by warm jungle springs.',
  'Obsidian causeways linking flooded plazas.',
  'Crocodilian cavalry drilling in emerald plazas.',
  'Sacred cenotes ringed with chanting acolytes.',
  'Jade-lined canals glowing with bioluminescent algae.'
];
export const lizardmenCityRulerTitles = [
  'High Scale-Priest',
  'Sunblood Speaker',
  'Serpent King',
  'Celadon Oracle',
  'Dawn-Caller',
  'Mist Matron'
];
export const lizardmenCityRulerNames = [
  'Xilqua',
  'Mazaton',
  'Tezcali',
  'Chakli',
  'Zazamet',
  'Itzali',
  'Qaztil',
  'Sszara',
  'Olotec',
  'Tzimek'
];
export const lizardmenCityOrders = [
  'Order of the Dawnfang',
  'Jade Sentinel Cohort',
  'Scaled Oracle Council',
  'Mistfang Navigators',
  'Emerald Tide Wardens',
  'Obsidian Fang Legion',
  'Sunblood Procession',
  'Stormscale Tidewatch'
];
export const lizardmenCityExports = [
  'Sun-baked obsidian blades',
  'Jade ritual masks',
  'Rare dyes pressed from jungle blooms',
  'Sacred incense cones',
  'Feathered cloaks lacquered in gold',
  'Fermented serpentwine',
  'Glittering shell mosaics'
];

export const orcTribeAdjectives = [
  'Ironjaw',
  'Bloodfang',
  'Stormhide',
  'Ashen',
  'Bonegnaw',
  'Thunderhoof',
  'Grimgaze',
  'Skullsplitter',
  'Nightscar',
  'Rageborn'
];
export const orcTribeNouns = [
  'Clan',
  'Warband',
  'Legion',
  'Brood',
  'Horde',
  'Reavers',
  'Marauders',
  'Prowlers'
];
export const orcCampFeatures = [
  'War drums thunder at dusk from within the palisade.',
  'Spiked palisades bear trophies from raided caravans.',
  'Tattered war banners crackle in the smoky wind.',
  'An arena of packed earth hosts nightly combat rites.',
  'Blacksmith forges belch sparks as crude blades are hammered.',
  'Watchfires burn green with alchemical fumes.',
  'Captured standards hang as warnings to intruders.',
  'Siege totems ring the muster fields with carved skulls.',
  'Wolf pens echo with snarls as wargs are blooded for war.',
  'Smouldering pyres roast slabs of captured game beneath iron spits.',
  "Runic totems glow faintly, channeling the shamans' war magic.",
  'War shamans trace scars of conquest in ash across the ground.'
];
export const orcWarLeaders = [
  'Gorath the Red',
  'Mazrak One-Eye',
  'Thura Ironhide',
  'Balgrom Spinebreaker',
  'Igra Wildfang',
  'Vorgh the Thunderer',
  'Sagra the Ember Fist',
  'Druza Stormchant'
];
export const orcThreatDescriptors = ['Elevated', 'Severe', 'Dire', 'Menacing'];
export const gnollPackAdjectives = [
  'Dustmane',
  'Howling',
  'Sunscar',
  'Nightmaw',
  'Boneclaw',
  'Ashsnout',
  'Stormsnout',
  'Ragged',
  'Skullmuzzle',
  'Emberfang'
];
export const gnollPackNouns = [
  'Pack',
  'Raid',
  'Howlers',
  'Hunters',
  'Warband',
  'Maw',
  'Snarl',
  'Scavengers'
];
export const gnollCampFeatures = [
  'Hyena laughter ripples through the night around bone-festooned totems.',
  'Racks of scavenged shields rattle in the dusty wind.',
  'Smoke from marrow fires mingles with the copper scent of fresh kills.',
  'Bone fetishes clatter from lines strung between crude hide tents.',
  'Fresh tracks circle the camp where scouts prowl for prey.',
  'Hidebound drums pulse with erratic, feral rhythms.',
  'Stolen banners flutter from poles, their colors daubed over in ochre runes.'
];
export const gnollWarLeaders = [
  'Szimri Bone-Eater',
  'Raka Sun-Scar',
  'Yagra Laughing Maw',
  'Thokha Dusthowl',
  'Mekri Clawtaker',
  'Zharri Emberfur',
  'Gkala Night-Cackle',
  'Fenrik Thornsnout'
];
export const gnollThreatDescriptors = ['Elevated', 'Severe', 'Ravenous', 'Unstable'];
export const trollDenAdjectives = [
  'Bog',
  'Stone',
  'Mire',
  'Frost',
  'Grim',
  'Thunder',
  'Rot',
  'Boulder',
  'Moss',
  'Brine'
];
export const trollDenNouns = [
  'Den',
  'Brood',
  'Hollow',
  'Pit',
  'Haunt',
  'Grotto',
  'Crag',
  'Hold'
];
export const trollCampFeatures = [
  'Sodden logs reinforce earthen berms slick with algae.',
  'Cauldrons bubble with pungent stews of swamp herbs and bone.',
  'Huge footprints sink deep into the mud around crude watchposts.',
  'Petrified trophies hang from stalagmites that jut through the camp.',
  'Pools of regeneration glow faintly beneath dangling charms.',
  'Stone totems scarred by claw marks mark the brood\'s territory.',
  'Fetid mists coil low where shamans chant to forgotten spirits.'
];
export const trollWarLeaders = [
  'Gorvul the Regrown',
  'Svara Mireblood',
  'Thrum Rockhide',
  'Ulmak Bone-Twister',
  'Yrog the Trollfather',
  'Brelga Marsh-Eye',
  'Drumm Stonebelly',
  'Hulra Riverbane'
];
export const trollThreatDescriptors = ['Elevated', 'Severe', 'Dire', 'Relentless'];
export const ogreClanAdjectives = [
  'Crushjaw',
  'Bonegrinder',
  'Thundermaul',
  'Ironbelly',
  'Boulderfist',
  'Skullsmash',
  'Stormbreaker',
  'Gorehammer',
  'Rubblehide',
  'Maulbrand'
];
export const ogreClanNouns = [
  'Clan',
  'Muster',
  'Warband',
  'Brutes',
  'Crushers',
  'Maulers',
  'Slam',
  'Rend'
];
export const ogreCampFeatures = [
  'Enormous clubs lean against boulders beside shattered siege engines.',
  'Meat racks sag beneath the weight of whole roasted beasts.',
  'Stone drums boom as ogres challenge one another for dominance.',
  'Piles of splintered shields form makeshift barricades.',
  'Massive footprints churn the earth into muddy pits.',
  'Bone totems crowned with cracked helms tower over the encampment.',
  'Wagons stripped for timber bolster crude siege towers.'
];
export const ogreWarLeaders = [
  'Grunak Boulderborn',
  'Mazga Skullsplit',
  'Durmag the Slammer',
  'Olra Ironbelly',
  'Thurg Grudgebite',
  'Rendha Thunderhand',
  'Krolf Meat-Hewer',
  'Vorga Stonecrusher'
];
export const ogreThreatDescriptors = ['Severe', 'Dire', 'Overwhelming', 'Menacing'];
export const banditCrewAdjectives = [
  'Red',
  'Black',
  'Iron',
  'Rust',
  'Shadow',
  'Amber',
  'Silver',
  'Wild',
  'Gravel',
  'Broken'
];
export const banditCrewNouns = [
  'Knives',
  'Riders',
  'Coyotes',
  'Lanterns',
  'Vultures',
  'Hands',
  'Blades',
  'Company',
  'Road',
  'Hollows'
];
export const banditCampFeatures = [
  'Lookouts with hooded lanterns signal across hidden paths.',
  'A palisade of wagons shields caches of stolen goods.',
  'Practice dummies are riddled with crossbow bolts by moonlight.',
  'Cookfires smoke with the scent of spiced trail stew and black powder.',
  'Maps of trade routes lie weighted beneath daggers in the command tent.',
  'Captured banners hang upside down as trophies of defiance.',
  'Hidden pitfall traps are dusted over to snare unwary pursuers.'
];
export const banditLeaders = [
  'Captain Rysa Blackflint',
  'Ser Caldor the Spare',
  'Matron Vel Tallow',
  'Garrin Embercloak',
  'The Grinning Fox',
  'Jessa Quickthorn',
  'Marshal Darek Ironlace',
  'Nyra of the Broken Road'
];
export const banditThreatDescriptors = ['Wary', 'Perilous', 'Severe', 'Menacing'];
export const banditSpecialties = [
  'ambushing caravans that brave the frontier passes',
  'selling illicit guides across the border wilds',
  'smuggling relics through hidden ravines',
  'extorting frontier villages for tribute',
  'hijacking supply barges before they reach port',
  'raiding tax convoys returning to the heartland',
  'running contraband between rival duchies',
  'training cutthroat outriders for mercenary companies'
];
export const warCampTypeBaseWeights = {
  orcCamp: 1.05,
  gnollCamp: 0.95,
  trollCamp: 0.85,
  ogreCamp: 0.8,
  banditCamp: 1.1
};
export const centaurHerdAdjectives = [
  'Swiftwind',
  'Stormhoof',
  'Sunmane',
  'Moonstride',
  'Galeheart',
  'Starhoof',
  'Dawnrunner',
  'Thunderleaf',
  'Mistveil',
  'Wildsong'
];
export const centaurHerdNouns = [
  'Herd',
  'Circle',
  'Moot',
  'Outriders',
  'Gathering',
  'Courers',
  'Skyriders',
  'Wardens'
];
export const centaurEncampmentPurposes = [
  'holds council over the roaming tribes',
  'guards the border trails against marauders',
  'drills its outriders for the next great hunt',
  'prepares offerings to the sky-spirits',
  'keeps watch on encroaching warbands',
  'tends the wounded after a clash on the plains',
  'celebrates the seasonal moot beneath streaming banners'
];
export const centaurEncampmentFeatures = [
  'Hoofbeat drums echo across a packed-earth arena.',
  'Banners woven from tall grasses ripple between painted wagons.',
  'Stone cairns ring a central fire that never dies.',
  'Archery buttes bristle with moon-feathered shafts.',
  'Totem poles carved with galloping figures mark each quarter of the camp.',
  'Bronze-lashed chariots gleam beside neatly stacked spear racks.'
];
export const centaurLeaderTitles = [
  'Herdspeaker',
  'Skycaller',
  'Trail-Warden',
  'High Courser',
  'Windseer',
  'Spear Marshal'
];
export const centaurLeaderNames = [
  'Thandros',
  'Mirael',
  'Koryn',
  'Ilys',
  'Brastan',
  'Velith',
  'Serane',
  'Oran',
  'Kaelith',
  'Drevan'
];
export const centaurMajorClans = [
  'Sunmane Banner',
  'Stormhoof Lodge',
  'Mistplain Riders',
  'Starbrook Company',
  'Galehorn Cohort',
  'Ambertrail Scouts',
  'Stonehoof Fellowship',
  'Larksong Reavers'
];
export const centaurSacredVows = ['Sky Oaths', 'Trailwatch Pledge', 'Galloping Accord', 'Sunfire Pact'];
export const travelerCampHosts = [
  'the Emberlane siblings',
  'Matron Heila Oakshaw',
  'a circle of veteran rangers',
  'Quartermaster Brond of the West March',
  'the caravan guild of Lanterntrail',
  'Scoutmaster Vessa Quillsong'
];
export const travelerCampFocuses = [
  'guiding caravans through the border wilds',
  'trading maps and rumours for supplies',
  'harbouring refugees bound for safer lands',
  'drilling outriders to patrol the marches',
  'stockpiling goods for a distant expedition',
  'watching the roads for bandit movement'
];
export const travelerCampSupplies = [
  'fresh water skins, smoked meats, and wagon grease',
  'oiled cloaks, mended harnesses, and hardy ponies',
  'herbal poultices, coil rope, and trimmed torches',
  'arrow sheaves, spare axles, and starlight charts',
  'travel bread, pitch tarps, and finely balanced spears'
];
export const travelerCampAtmospheres = [
  'Lanterns sway from tall poles, casting amber halos across the tents.',
  'A cookfire crackles beside a ring of storytellers comparing pathfinding lore.',
  'Watchmen pace the palisade while scouts tally the night sky.',
  'Scribes annotate trail ledgers by the glow of rune-lit stones.',
  'Children chase one another between carts while lookouts scan the horizon.'
];
export const travelerCampServices = [
  'fresh mounts for weary outriders',
  'hireling guards to bolster caravan ranks',
  'trail wardens who escort pilgrims between towns',
  'medics stitching wounds earned on the road',
  'scouts selling the latest safe passage reports'
];

export const tavernAdjectives = ['Golden', 'Starlit', 'Roaring', 'Whispering', 'Copper', 'Moonlit', 'Wandering'];
export const tavernNouns = ['Hearth', 'Steed', 'Keg', 'Anvil', 'Lantern', 'Drum', 'Oak'];
export const tavernDescriptors = [
  'Crossroads Inn',
  'Wayside Rest',
  'Taphouse',
  'Roadhouse',
  "Pilgrim's Lodge",
  'Caravan Hostel'
];
export const tavernInnkeepers = [
  'Innkeep Mara Hearthspoon',
  'Old Rulfen Barrelhelm',
  'Mistress Sera Dawnsong',
  'Tarin Embercoat and his wife Lysa',
  'The twins Peira and Pell',
  'Guilder Hask of the Wayfarer League'
];
export const tavernSpecialties = [
  'cinder-spiced stout poured over hot stones',
  'wildberry mead and cedar-smoked trout',
  'poppyseed bread with cavern cheese',
  'applejack mulled with sprig-mint',
  'honey-glazed boar shanks carved tableside'
];
export const tavernReputations = [
  'favoured by caravan guards trading tall tales',
  'famed for calming border disputes over shared cups',
  'whispered about by merchants chasing lucky omens',
  'beloved by pilgrims making the long journey north',
  'a trusted muster point for royal couriers'
];
export const tavernAmenities = [
  'a roaring hearth and slate-tiled baths',
  'private loft bunks lined with fleece blankets',
  'secure stables tended through the night',
  'a stage for bards and a loft for dice games',
  'a stocked cellar with rare vintages on tap'
];
export const tavernAtmospheres = [
  'Music drifts into the road while travellers warm chilled hands.',
  'Lantern light spills across wagon ruts like melted gold.',
  'Scented smoke and laughter mingle beneath the eaves.',
  'Patrons cluster around maps pinned to the main beam.',
  'Night watch bells hang ready beside the doorway.'
];
export const tavernServices = [
  'message runners willing to brave the moonlit pass',
  'guides charting quick routes between duchies',
  'lockboxes for merchant tithes and purses',
  'farriers who shoe beasts while you dine',
  'scribes drafting contracts over candlelight'
];
export const tavernRatePhrases = [
  'four silver a room with hearth-warmed blankets',
  "a single gold buys a week's board and fodder",
  'two silver a night, breakfast and stall included',
  'one silver for the common loft, five for a private suite',
  'coin or fresh news accepted for a bed and a meal'
];
export const tavernSpecialGuests = [
  'wandering magi swapping spellcraft rumours',
  'dwarven merchants peddling gem-cut curios',
  'elves mapping safe shadow crossings',
  'lancers offering escort to the next hold',
  'minstrels composing sagas for generous patrons'
];

export const dungeonNamePrefixes = [
  'Whispering',
  'Sunken',
  'Forsaken',
  'Crumbling',
  'Midnight',
  'Shrouded',
  'Veiled',
  'Obsidian'
];
export const dungeonNameSuffixes = [
  'Vault',
  'Depths',
  'Catacomb',
  'Sepulchre',
  'Labyrinth',
  'Halls',
  'Crypt'
];
export const dungeonPerils = [
  'echo with restless spirits',
  'are laced with shifting stonework traps',
  'are patrolled by tireless constructs',
  'hide relics bound with cursed wards',
  'are veiled in ever-burning witchfire',
  'conceal a slumbering wyrm'
];
export const dungeonDepths = ['three', 'five', 'seven', 'nine'];

export const monasteryOrders = [
  'Order of the Dawn Lantern',
  'Order of Silent Rivers',
  'Brotherhood of the Verdant Star',
  'Scribes of the Hidden Song',
  'Wardens of the Azure Flame',
  'Sisters of the Gentle Bell'
];
export const monasteryVirtues = [
  'contemplation',
  'vigilance',
  'compassion',
  'illumination',
  'endurance',
  'harmony'
];
export const monasteryRelics = [
  'a saintly bell that rings without wind',
  'scrolls penned in starlight ink',
  'the Ember Chalice of first dawn',
  'a reliquary of luminous feathers',
  'a mirror that remembers forgotten hymns'
];

export const castleHouseNames = [
  'House Blackthorn',
  'House Rivenshield',
  'House Cindergate',
  'House Frostmere',
  'House Dawnspear',
  'House Emberhall'
];
export const castleDefensiveTraits = [
  'Commands a triple-ring curtain wall.',
  'Boasts arrow-slitted towers overlooking the vale.',
  'Is girded by rune-carved gatehouses.',
  'Holds a hidden sally tunnel for swift sorties.',
  'Is anchored to living stone by dwarven masonry.'
];
export const castleBanners = [
  'a silver gryphon on midnight blue',
  'twin suns over a crimson field',
  'a sable stag wreathed in ivy',
  'interlocked hammers upon gold',
  'a white phoenix rising from ash'
];

export const saintlyNames = [
  'Saint Elowen',
  'Saint Calder',
  'Saint Miriel',
  'Saint Tharan',
  'Saint Ysoria',
  'Saint Brannoc'
];
export const saintMiracles = [
  'calmed a wildfire with a whispered prayer',
  'healed an entire plague-struck village',
  'turned back a tide of marauding spirits',
  'walked across a frozen sea to guide refugees',
  'struck down a demon with a blade of light'
];
export const shrineOfferings = [
  'garlands of moonpetals',
  'etched votive coins',
  'bottled starlight dew',
  'hand-carved icons',
  'woven prayer cords'
];
export const shrinePilgrims = [
  'penitents seeking absolution',
  'knights pledging holy vows',
  'healers learning forgotten benedictions',
  'pilgrims chasing whispered visions',
  'shepherds praying for gentle winters'
];

