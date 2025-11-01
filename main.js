      const enrichedTile = resolveTileForContextMenu(tile, tileX, tileY) || tile;
      const details = enrichedTile?.structureDetails || null;
      const resolvedName =
        (typeof enrichedTile?.structureName === 'string' && enrichedTile.structureName) ||
        (typeof details?.name === 'string' ? details.name : null);

      if (isSettlement && resolvedName) {
        const tileWithName =
          enrichedTile && enrichedTile.structureName === resolvedName
            ? enrichedTile
            : { ...enrichedTile, structureName: resolvedName };
        showStructureDetails(tileWithName, { tileX, tileY });
