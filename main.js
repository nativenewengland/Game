    const maxCropsPerFarm = 3;
    let cropsPlaced = 0;
    for (let dy = -radius; dy <= radius && cropsPlaced < maxCropsPerFarm; dy += 1) {
      for (let dx = -radius; dx <= radius && cropsPlaced < maxCropsPerFarm; dx += 1) {
          cropsPlaced += 1;
