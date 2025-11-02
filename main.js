import {
  registerCustomStructure,
  customStructureDrawers,
  mapEditorBrushConfig,
  setStructureHighlightKeys,
  getDefaultMapEditorTerrainKey,
  normalizeTileKey,
  normalizeStructureKey,
  state,
  ensureStructureHighlightState,
  ensureMapEditorState,
  mapEditorTerrainSuggestionKeys,
  defaultWorldGenerationType,
  hillOverlayKeySet,
  treeOverlayKeySet,
  cutTreeOverlayKey,
  farmCropOverlayKey,
  jungleOverlayKey,
  woodElfGroveStructureKeys,
  woodElfGroveStructureKeySet,
  isWoodElfGroveStructureKey,
  volcanoOverlayKeySet,
  isVolcanoOverlayKey,
  isMountainOverlayKey,
  isHillOverlayKey,
  isTreeOverlayKey,
  tileHasTreeOverlay,
  isJungleOverlayKey,
  tileHasJungleOverlay,
  darkDwarfholdVolcanoRadius,
  townSettlementTypes,
  isTownSettlementDetails,
  tileHasTownSettlement,
  evaluateFactionTileSuitability,
  getMapSizePreset,
  applyMapSizePresetToState,
  getMapSizeLabel,
  defaultMapSize,
  defaultForestFrequency,
  defaultMountainFrequency,
  worldNames,
  realmNameAdjectives,
  realmNameNouns,
  factionColorPalette,
  pickFactionColor,
  dwarfholdCuratedNames,
  dwarfholdNamePrefixes,
  dwarfholdNameSuffixes,
  dwarfholdNameDescriptors,
  dwarfholdNameRegions,
  dwarfholdRulerTitles,
  darkDwarfholdLeaderTitles,
  dwarfholdHallmarks,
  dwarfholdExportOptions,
  mineNamePrefixes,
  mineNameSuffixes,
  mineNameDescriptors,
  mineResourceProfiles,
  mineHazardOptions,
  mineCrewNames,
  mineSecondaryExports,
  hillholdNamePrefixes,
  hillholdNameSuffixes,
  hillholdNameDescriptors,
  hillholdHallmarks,
  hillholdWatchOrders,
  hillholdWardenTitles,
  hillholdExports,
  hillholdDefensiveTraits,
  hillholdSentinelFocuses,
  goblinCaveNamePrefixes,
  goblinCaveNameSuffixes,
  goblinCaveHallmarks,
  goblinCaveActivities,
  goblinClanNames,
  dwarfholdPopulationRaceOptions,
  dwarfholdOccupationRaces,
  dwarfholdNearbyTownRadius,
  evilWizardTowerBasePopulationOptions,
  evilWizardArchetypes,
  towerCommanderTitles,
  towerCommanderGivenNames,
  towerCommanderSurnames,
  towerOrderNames,
  towerDetachmentOptions,
  towerDutyOptions,
  towerHallmarks,
  towerPopulationRaceOptions,
  townRulerTitles,
  townHallmarks,
  townExportOptions,
  townPopulationRaceOptions,
  townProminentFamilyNames,
  townGuildOptions,
  snowVillageNamePrefixes,
  snowVillageNameSuffixes,
  snowVillageNameDescriptors,
  snowVillageLeaderNamePools,
  snowVillageClanNames,
  snowVillageRulerTitles,
  townFirstNamePools,
  settlementDetailTypes,
  resolveTownRulerTitle,
  townNamePrefixes,
  townNameSuffixes,
  townNameDescriptors,
  towerNamePrefixes,
  towerNameNouns,
  towerNameQualifiers,
  evilWizardRulerTitles,
  evilWizardGivenNames,
  evilWizardSurnames,
  evilWizardEpithets,
  evilWizardCabalNames,
  evilWizardTowerHallmarks,
  woodElfGrovePrefixes,
  woodElfGroveSuffixes,
  woodElfGroveDescriptors,
  woodElfGroveElderTitles,
  woodElfGroveElderGivenNames,
  woodElfGroveElderSurnames,
  woodElfGroveHallmarks,
  forestRegionNamePrefixes,
  forestRegionNameSuffixes,
  forestRegionNameMotifs,
  mountainRangeNamePrefixes,
  mountainRangeNameSuffixes,
  mountainRangeNameMotifs,
  desertNameDescriptors,
  desertNameNouns,
  desertNameMotifs,
  tundraNameDescriptors,
  tundraNameNouns,
  tundraNameMotifs,
  grasslandNameDescriptors,
  grasslandNameNouns,
  grasslandNameMotifs,
  jungleNameDescriptors,
  jungleNameNouns,
  jungleNameMotifs,
  marshNameDescriptors,
  marshNameNouns,
  marshNameMotifs,
  badlandsNameDescriptors,
  badlandsNameNouns,
  badlandsNameMotifs,
  oceanNameDescriptors,
  oceanNameNouns,
  oceanNameMotifs,
  lakeNameDescriptors,
  lakeNameNouns,
  lakeNameMotifs,
  woodElfGroveCircleNames,
  woodElfGroveOrders,
  woodElfGroveExports,
  woodElfGrovePopulationRoleOptions,
  woodElfGroveClassificationPopulationMax,
  lizardmenCityPopulationRoleOptions,
  lizardmenCityPrefixes,
  lizardmenCitySuffixes,
  lizardmenCityClassifications,
  lizardmenCityHallmarks,
  lizardmenCityRulerTitles,
  lizardmenCityRulerNames,
  lizardmenCityOrders,
  lizardmenCityExports,
  orcTribeAdjectives,
  orcTribeNouns,
  orcCampFeatures,
  orcWarLeaders,
  orcThreatDescriptors,
  gnollPackAdjectives,
  gnollPackNouns,
  gnollCampFeatures,
  gnollWarLeaders,
  gnollThreatDescriptors,
  trollDenAdjectives,
  trollDenNouns,
  trollCampFeatures,
  trollWarLeaders,
  trollThreatDescriptors,
  ogreClanAdjectives,
  ogreClanNouns,
  ogreCampFeatures,
  ogreWarLeaders,
  ogreThreatDescriptors,
  banditCrewAdjectives,
  banditCrewNouns,
  banditCampFeatures,
  banditLeaders,
  banditThreatDescriptors,
  banditSpecialties,
  warCampTypeBaseWeights,
  centaurHerdAdjectives,
  centaurHerdNouns,
  centaurEncampmentPurposes,
  centaurEncampmentFeatures,
  centaurLeaderTitles,
  centaurLeaderNames,
  centaurMajorClans,
  centaurSacredVows,
  travelerCampHosts,
  travelerCampFocuses,
  travelerCampSupplies,
  travelerCampAtmospheres,
  travelerCampServices,
  tavernAdjectives,
  tavernNouns,
  tavernDescriptors,
  tavernInnkeepers,
  tavernSpecialties,
  tavernReputations,
  tavernAmenities,
  tavernAtmospheres,
  tavernServices,
  tavernRatePhrases,
  tavernSpecialGuests,
  dungeonNamePrefixes,
  dungeonNameSuffixes,
  dungeonPerils,
  dungeonDepths,
  monasteryOrders,
  monasteryVirtues,
  monasteryRelics,
  castleHouseNames,
  castleDefensiveTraits,
  castleBanners,
  saintlyNames,
  saintMiracles,
  shrineOfferings,
  shrinePilgrims
} from './src/index.js';
import { clamp } from './src/utils/math.js';
import { elements, getMusicToggleElements, getMusicVolumeInputs, getMusicNowPlayingDisplays } from './src/ui/elements.js';
import { attachEvents } from './src/ui/events.js';
let cachedDwarfholdGeneratorPromise = null;
async function loadDwarfholdGenerator() {
  if (!cachedDwarfholdGeneratorPromise) {
    cachedDwarfholdGeneratorPromise = import('./src/local/dwarfhold-map.js')
      .then((module) => {
        if (module && typeof module.generateDwarfholdMap === 'function') {
          return module.generateDwarfholdMap;
        }
        throw new Error('Dwarfhold map module is missing the generateDwarfholdMap export.');
      })
      .catch((error) => {
        cachedDwarfholdGeneratorPromise = null;
        throw error;
      });
  }
  return cachedDwarfholdGeneratorPromise;
}
const drawSize = 32;
const defaultLoadingStatusMessage = 'Calculating terrain layers…';
const icebergOverlayKeySet = new Set(Object.keys(icebergTileCoords || {}));
) {
  ctx.save();
  ctx.translate(pixelX, pixelY);
  const clearingRadiusX = size * 0.46;
  const clearingRadiusY = size * 0.28;
  const clearingCenterX = size * 0.5;
  const clearingCenterY = size * 0.64;
  ctx.fillStyle = '#355640';
  ctx.beginPath();
  ctx.ellipse(clearingCenterX, clearingCenterY, clearingRadiusX, clearingRadiusY, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#4e7256';
  ctx.beginPath();
  ctx.ellipse(clearingCenterX, clearingCenterY, clearingRadiusX * 0.84, clearingRadiusY * 0.82, 0, 0, Math.PI * 2);
  ctx.fill();
  const poolRadiusX = clearingRadiusX * 0.62;
  const poolRadiusY = clearingRadiusY * 0.68;
  ctx.fillStyle = '#7cd6ff';
  ctx.beginPath();
  ctx.ellipse(clearingCenterX, clearingCenterY, poolRadiusX, poolRadiusY, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#b6f4ff';
  ctx.beginPath();
  ctx.ellipse(clearingCenterX, clearingCenterY - size * 0.04, poolRadiusX * 0.65, poolRadiusY * 0.62, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#d6f7ff';
  ctx.lineWidth = Math.max(1.2, size * 0.025);
  ctx.beginPath();
  ctx.ellipse(clearingCenterX, clearingCenterY, poolRadiusX, poolRadiusY, 0, 0, Math.PI * 2);
  ctx.stroke();
  const stoneCount = 6;
  const ringRadius = poolRadiusX * 1.1;
  ctx.fillStyle = '#d4d8f0';
  for (let i = 0; i < stoneCount; i += 1) {
    const angle = (Math.PI * 2 * i) / stoneCount;
    const stoneX = clearingCenterX + Math.cos(angle) * ringRadius;
    const stoneY = clearingCenterY + Math.sin(angle) * ringRadius * 0.8;
    const stoneWidth = size * 0.12;
    const stoneHeight = size * 0.18;
    ctx.save();
    ctx.translate(stoneX, stoneY);
    ctx.rotate(Math.sin(angle) * 0.12);
    ctx.beginPath();
    ctx.ellipse(0, 0, stoneWidth * 0.5, stoneHeight * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  const lightCount = 4;
  ctx.fillStyle = 'rgba(180, 246, 255, 0.85)';
  for (let i = 0; i < lightCount; i += 1) {
    const angle = (Math.PI * 2 * i) / lightCount + Math.PI / lightCount;
    const lightX = clearingCenterX + Math.cos(angle) * poolRadiusX * 0.55;
    const lightY = clearingCenterY + Math.sin(angle) * poolRadiusY * 0.5 - size * 0.1;
    const lightRadius = size * 0.06;
    const gradient = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, lightRadius);
    gradient.addColorStop(0, 'rgba(210, 255, 255, 0.95)');
    gradient.addColorStop(1, 'rgba(180, 246, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(lightX, lightY, lightRadius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}
registerTiles('base', baseTileCoords);
registerTiles('worldDetails', riverTileCoords);
registerTiles('base', icebergTileCoords);
Object.entries(customStructureDrawers).forEach(([structureKey, drawer]) => {
  if (typeof drawer === 'function') {
    registerCustomStructure(structureKey, (ctx, drawOptions) => drawer(ctx, drawOptions));
  }
});
// AMBIENT_HOMESTEAD draws directly from the base sprite sheet via baseTileCoords.
if (!tileLookup.has('EVIL_WIZARDS_TOWER')) {
  const fallbackTower = tileLookup.get('TOWER');
  if (fallbackTower) {
    tileLookup.set('EVIL_WIZARDS_TOWER', { ...fallbackTower });
  }
}
const TOWN_ROAD_OVERLAY_KEY = 'TOWN_ROAD';
setStructureHighlightKeys(structureHighlightTypeKeys);
