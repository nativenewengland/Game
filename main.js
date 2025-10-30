  const mergeTouchingWoodElfTerritories = () => {
    if (!Array.isArray(factions) || factions.length === 0) {
      return;
    }

    const woodElfFactionIds = new Set();
    factions.forEach((faction) => {
      if (!faction || faction.id === null || faction.id === undefined) {
        return;
      }
      const capitalType =
        typeof faction?.capital?.type === 'string' ? faction.capital.type.trim().toLowerCase() : '';
      if (capitalType === 'woodelfgrove') {
        woodElfFactionIds.add(faction.id);
      }
    });

    if (woodElfFactionIds.size < 2) {
      return;
    }

    const parents = new Map();
    woodElfFactionIds.forEach((id) => {
      parents.set(id, id);
    });

    const findRoot = (id) => {
      let parent = parents.get(id);
      if (parent === undefined) {
        parents.set(id, id);
        return id;
      }
      if (parent === id) {
        return id;
      }
      const root = findRoot(parent);
      parents.set(id, root);
      return root;
    };

    const unionRoots = (a, b) => {
      if (a === b) {
        return findRoot(a);
      }
      const rootA = findRoot(a);
      const rootB = findRoot(b);
      if (rootA === rootB) {
        return rootA;
      }
      const newRoot = rootA < rootB ? rootA : rootB;
      const otherRoot = newRoot === rootA ? rootB : rootA;
      parents.set(otherRoot, newRoot);
      return newRoot;
    };

    for (let y = 0; y < height; y += 1) {
      const row = tiles[y];
      if (!row) {
        continue;
      }
      for (let x = 0; x < width; x += 1) {
        const tile = row[x];
        if (!tile) {
          continue;
        }
        const factionId = tile.factionId;
        if (!woodElfFactionIds.has(factionId)) {
          continue;
        }
        for (let i = 0; i < surroundingNeighborOffsets.length; i += 1) {
          const [ox, oy] = surroundingNeighborOffsets[i];
          const nx = x + ox;
          const ny = y + oy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            continue;
          }
          const neighborRow = tiles[ny];
          const neighborTile = neighborRow ? neighborRow[nx] : null;
          if (!neighborTile) {
            continue;
          }
          const neighborFactionId = neighborTile.factionId;
          if (!woodElfFactionIds.has(neighborFactionId) || neighborFactionId === factionId) {
            continue;
          }
          unionRoots(factionId, neighborFactionId);
        }
      }
    }

    const groups = new Map();
    woodElfFactionIds.forEach((id) => {
      const root = findRoot(id);
      if (!groups.has(root)) {
        groups.set(root, []);
      }
      groups.get(root).push(id);
    });

    const reassignmentMap = new Map();
    const removedIds = new Set();

    groups.forEach((members) => {
      if (!Array.isArray(members) || members.length <= 1) {
        return;
      }

      let primaryFaction = null;
      members.forEach((memberId) => {
        const faction = factionById.get(memberId);
        if (!faction) {
          return;
        }
        if (!primaryFaction) {
          primaryFaction = faction;
          return;
        }
        const primaryTerritory = Number.isFinite(primaryFaction.territory) ? primaryFaction.territory : 0;
        const factionTerritory = Number.isFinite(faction.territory) ? faction.territory : 0;
        if (factionTerritory > primaryTerritory) {
          primaryFaction = faction;
        } else if (factionTerritory === primaryTerritory && faction.id < primaryFaction.id) {
          primaryFaction = faction;
        }
      });

      if (!primaryFaction) {
        return;
      }

      members.forEach((memberId) => {
        if (memberId === primaryFaction.id) {
          return;
        }
        reassignmentMap.set(memberId, primaryFaction.id);
        removedIds.add(memberId);
      });
    });

    if (reassignmentMap.size === 0) {
      return;
    }

    for (let y = 0; y < height; y += 1) {
      const row = tiles[y];
      if (!row) {
        continue;
      }
      for (let x = 0; x < width; x += 1) {
        const tile = row[x];
        if (!tile) {
          continue;
        }
        const factionId = tile.factionId;
        if (factionId === null || factionId === undefined) {
          continue;
        }
        const replacementId = reassignmentMap.get(factionId);
        if (replacementId === undefined) {
          continue;
        }
        tile.factionId = replacementId;
      }
    }

    if (removedIds.size === 0) {
      return;
    }

    for (let i = factions.length - 1; i >= 0; i -= 1) {
      const faction = factions[i];
      if (!faction) {
        continue;
      }
      if (removedIds.has(faction.id)) {
        factions.splice(i, 1);
      }
    }

    removedIds.forEach((id) => {
      factionById.delete(id);
    });
  };

  mergeTouchingWoodElfTerritories();
