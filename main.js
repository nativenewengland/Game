  const isEvilWizardTower = details?.type === 'evilWizardTower';
  const settlementArtPool = isEvilWizardTower
    ? [
        {
          file: 'Evil-Tower_1.webp',
          alt: "Illustration of an evil wizard's tower"
        }
      ]
    : settlementArtVariants;
  const settlementArtIndex = Math.floor(settlementArtRandom() * settlementArtPool.length) || 0;
    settlementArtPool[Math.min(Math.max(settlementArtIndex, 0), settlementArtPool.length - 1)] || settlementArtPool[0];
