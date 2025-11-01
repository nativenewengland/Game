const dwarfholdStructureKeys = new Set([
  'DWARFHOLD',
  'GREAT_DWARFHOLD',
  'ABANDONED_DWARFHOLD',
  'DARK_DWARFHOLD',
  'DARKDWARFHOLD',
  'HILLHOLD'
]);

function isDwarfholdStructureTile(tile) {
  if (!tile) {
    return false;
  }
  if (typeof tile.structure === 'string' && dwarfholdStructureKeys.has(tile.structure)) {
    return true;
  }
  const rawType = tile.structureDetails?.type;
  if (typeof rawType === 'string' && dwarfholdStructureKeys.has(rawType.toUpperCase())) {
    return true;
  }
  if (typeof tile.structureName === 'string') {
    const upperName = tile.structureName.toUpperCase();
    for (const key of dwarfholdStructureKeys) {
      if (upperName.includes(key)) {
        return true;
      }
    }
  }
  return false;
}

function enrichTileWithDwarfholdDetails(tile, tileX, tileY, world) {
  if (!tile) {
    return null;
  }

  const existingDetails = tile.structureDetails;
  if (existingDetails && Object.keys(existingDetails).length > 0) {
    if (!tile.structureName && existingDetails.name) {
      tile.structureName = existingDetails.name;
    }
    return tile;
  }

  if (!isDwarfholdStructureTile(tile)) {
    return tile;
  }

  const resolvedWorld = world || state.currentWorld;
  if (!resolvedWorld || !Array.isArray(resolvedWorld.dwarfholds)) {
    return tile;
  }
  if (!Number.isInteger(tileX) || !Number.isInteger(tileY)) {
    return tile;
  }

  const match = resolvedWorld.dwarfholds.find((hold) => hold && hold.x === tileX && hold.y === tileY);
  if (!match) {
    return tile;
  }

  const { x: holdX, y: holdY, ...details } = match;
  const mergedDetails = { ...(tile.structureDetails || {}), ...details };
  tile.structureDetails = mergedDetails;

  const resolvedName = mergedDetails.name || tile.structureName || tile.areaName;
  if (resolvedName) {
    tile.structureName = resolvedName;
  }

  return tile;
}

function resolveTileForContextMenu(tile, tileX, tileY) {
  let resolvedTile = tile || null;
  const world = state.currentWorld;
  const tiles = world && Array.isArray(world.tiles) ? world.tiles : null;
  const height = tiles ? tiles.length : 0;
  const width = height > 0 && Array.isArray(tiles[0]) ? tiles[0].length : 0;

  if (tiles && width > 0 && Number.isInteger(tileX) && Number.isInteger(tileY)) {
    const worldTile = getWorldTileAt(tiles, width, height, tileX, tileY);
    if (worldTile) {
      resolvedTile = worldTile;
    }
    resolvedTile = enrichTileWithDwarfholdDetails(resolvedTile, tileX, tileY, world);
  } else if (resolvedTile) {
    resolvedTile = enrichTileWithDwarfholdDetails(resolvedTile, tileX, tileY, world);
  }

  return resolvedTile;
}

  const resolvedTile = resolveTileForContextMenu(tile, tileX, tileY) || tile || null;
  structureContextMenuState.tile = resolvedTile;
  updateStructureContextMenuActions(resolvedTile);
    const enrichedTile = enrichTileWithDwarfholdDetails(tile, tileX, tileY, state.currentWorld);
    return { tile: enrichedTile || tile, tileX, tileY, pointerX, pointerY, rect };
