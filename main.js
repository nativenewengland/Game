  const resolvedStructureName =
    tile && typeof tile.structureName === 'string' && tile.structureName
      ? tile.structureName
      : tile && tile.structureDetails && typeof tile.structureDetails.name === 'string'
      ? tile.structureDetails.name
      : null;

  const hasStructureDetails = Boolean(resolvedStructureName || isDwarfholdStructureTile(tile));

