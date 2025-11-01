    const volcanoStoneConversionFalloff = 6.4;
          const conversionProximity = clamp(
            1 - distanceToVolcano / volcanoStoneConversionFalloff,
            0,
            1
          );
          if (conversionProximity >= volcanoStoneConversionThreshold) {
            maybeConvertBaseToStoneNearVolcano(tile, x, y, conversionProximity);
