export function generateCropsNearFarm({
  tiles,
  mapWidth,
  mapHeight,
  centerX,
  centerY,
  farmCropOverlayKey,
  farmCropSeed = 0,
  isTileEligibleForFarmCrops,
  hashCoords,
  registerCropPlacement,
  radius = 3,
  maxCropsPerFarm = 3
} = {}) {
  if (!farmCropOverlayKey) {
    return 0;
  }
  if (!Array.isArray(tiles) || tiles.length === 0) {
    return 0;
  }

  const height = Number.isFinite(mapHeight) ? mapHeight : tiles.length;
  const width = Number.isFinite(mapWidth) ? mapWidth : tiles[0]?.length || 0;
  if (!Number.isFinite(centerX) || !Number.isFinite(centerY) || width <= 0 || height <= 0) {
    return 0;
  }

  const effectiveRadius = Math.max(0, Math.floor(radius));
  if (effectiveRadius === 0) {
    return 0;
  }

  const eligibilityFn = typeof isTileEligibleForFarmCrops === 'function'
    ? isTileEligibleForFarmCrops
    : (tile) => Boolean(tile) && !tile.structure && !tile.river;
  const hashFn = typeof hashCoords === 'function'
    ? hashCoords
    : (x, y, seed) => {
        const n = Math.sin((x * 374761393 + y * 668265263 + seed) | 0) * 43758.5453;
        return n - Math.floor(n);
      };

  const seed = (farmCropSeed + Math.imul(centerX, 0x27d4eb2d) + Math.imul(centerY, 0x9e3779b9)) >>> 0;
  let cropsPlaced = 0;

  for (let dy = -effectiveRadius; dy <= effectiveRadius; dy += 1) {
    const ny = centerY + dy;
    if (ny < 0 || ny >= height) {
      continue;
    }
    const row = tiles[ny];
    if (!Array.isArray(row)) {
      continue;
    }

    for (let dx = -effectiveRadius; dx <= effectiveRadius; dx += 1) {
      const nx = centerX + dx;
      if (nx < 0 || nx >= width || (dx === 0 && dy === 0)) {
        continue;
      }

      const neighborTile = row[nx];
      if (!eligibilityFn(neighborTile)) {
        continue;
      }

      const distance = Math.max(Math.abs(dx), Math.abs(dy));
      if (distance > effectiveRadius) {
        continue;
      }

      let chance = 0;
      if (distance <= 1) {
        chance = 0.65;
      } else if (distance === 2) {
        chance = 0.4;
      } else if (distance === 3) {
        chance = 0.22;
      }
      if (chance <= 0) {
        continue;
      }

      const roll = hashFn(nx, ny, seed);
      if (roll < chance) {
        neighborTile.overlay = farmCropOverlayKey;
        if (typeof registerCropPlacement === 'function') {
          registerCropPlacement(nx, ny);
        }
        cropsPlaced += 1;
        if (cropsPlaced >= maxCropsPerFarm) {
          return cropsPlaced;
        }
      }
    }
  }

  return cropsPlaced;
}

function generateNiceAxisTicks(minValue, maxValue, desiredCount = 5) {
  const resolvedMin = Number.isFinite(minValue) ? minValue : 0;
  const resolvedMax = Number.isFinite(maxValue) ? Math.max(maxValue, resolvedMin) : resolvedMin;
  const targetCount = Math.max(2, Math.round(desiredCount));

  if (resolvedMax - resolvedMin <= 0) {
    return {
      ticks: [resolvedMin],
      min: resolvedMin,
      max: resolvedMin || 1
    };
  }

  const rawStep = (resolvedMax - resolvedMin) / (targetCount - 1);
  const magnitude = Math.pow(10, Math.floor(Math.log10(Math.max(rawStep, 1e-6))));
  const residual = rawStep / magnitude;
  let niceStep;
  if (residual >= 5) {
    niceStep = 5 * magnitude;
  } else if (residual >= 2) {
    niceStep = 2 * magnitude;
  } else if (residual >= 1) {
    niceStep = 1 * magnitude;
  } else {
    niceStep = magnitude;
  }

  if (!Number.isFinite(niceStep) || niceStep <= 0) {
    niceStep = Math.max(rawStep, 1);
  }

  const niceMin = Math.floor(resolvedMin / niceStep) * niceStep;
  const niceMax = Math.ceil(resolvedMax / niceStep) * niceStep;

  const ticks = [];
  for (let value = niceMin; value <= niceMax + niceStep * 0.5; value += niceStep) {
    const clampedValue = Math.round(value);
    if (clampedValue < 0) {
      continue;
    }
    if (!ticks.includes(clampedValue)) {
      ticks.push(clampedValue);
    }
  }

  if (ticks[0] > 0) {
    ticks.unshift(0);
  }

  return {
    ticks,
    min: Math.min(0, niceMin),
    max: Math.max(niceMax, resolvedMax)
  };
}

let populationChartInteractionsInitialized = false;

function ensurePopulationChartInteractionsInitialized() {
  if (populationChartInteractionsInitialized || typeof document === 'undefined') {
    return;
  }

  populationChartInteractionsInitialized = true;

  let activeChart = null;

  function parseChartPoints(svg) {
    const encoded = svg?.dataset?.chartPoints;
    if (!encoded) {
      return null;
    }
    try {
      return JSON.parse(decodeURIComponent(encoded));
    } catch (error) {
      return null;
    }
  }

  function hideChartOverlay(svg) {
    if (!svg) {
      return;
    }
    const overlay = svg.querySelector('[data-population-chart-overlay]');
    if (overlay) {
      overlay.setAttribute('data-visible', 'false');
    }
    const tooltip = svg.parentElement?.querySelector('[data-population-chart-tooltip]');
    if (tooltip) {
      tooltip.hidden = true;
    }
  }

  function updateChartOverlay(svg, event) {
    const points = parseChartPoints(svg);
    if (!Array.isArray(points) || points.length === 0) {
      hideChartOverlay(svg);
      return;
    }

    const viewBox = svg.getAttribute('viewBox');
    if (!viewBox) {
      hideChartOverlay(svg);
      return;
    }

    const [viewX, viewY, viewWidth, viewHeight] = viewBox
      .split(/\s+/)
      .map((value) => Number.parseFloat(value));
    if (!Number.isFinite(viewWidth) || !Number.isFinite(viewHeight)) {
      hideChartOverlay(svg);
      return;
    }

    const rect = svg.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;
    if (!Number.isFinite(pointerX) || !Number.isFinite(pointerY)) {
      hideChartOverlay(svg);
      return;
    }

    const relativeX = (pointerX / rect.width) * viewWidth + viewX;

    let nearestPoint = points[0];
    let nearestDistance = Math.abs(relativeX - nearestPoint.x);
    for (let index = 1; index < points.length; index += 1) {
      const candidate = points[index];
      const distance = Math.abs(relativeX - candidate.x);
      if (distance < nearestDistance) {
        nearestPoint = candidate;
        nearestDistance = distance;
      }
    }

    const overlay = svg.querySelector('[data-population-chart-overlay]');
    const indicatorLine = overlay?.querySelector('[data-population-chart-line]');
    const indicatorPoint = overlay?.querySelector('[data-population-chart-point]');
    if (!overlay || !indicatorLine || !indicatorPoint) {
      return;
    }

    indicatorLine.setAttribute('x1', nearestPoint.x);
    indicatorLine.setAttribute('x2', nearestPoint.x);
    indicatorPoint.setAttribute('cx', nearestPoint.x);
    indicatorPoint.setAttribute('cy', nearestPoint.y);
    overlay.setAttribute('data-visible', 'true');

    const figure = svg.parentElement;
    const tooltip = figure?.querySelector('[data-population-chart-tooltip]');
    if (!tooltip || !(figure instanceof HTMLElement)) {
      return;
    }

    const figureRect = figure.getBoundingClientRect();
    const tooltipX = event.clientX - figureRect.left;
    const tooltipY = event.clientY - figureRect.top;

    const populationDescriptor = svg.dataset.populationDescriptor || 'residents';
    const populationText = `${nearestPoint.population.toLocaleString('en-US')} ${populationDescriptor}`;
    const timeText = nearestPoint.yearText || nearestPoint.label;

    tooltip.hidden = false;
    tooltip.textContent = `${populationText}\n${timeText}`;
    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${tooltipY}px`;

    requestAnimationFrame(() => {
      const tooltipRect = tooltip.getBoundingClientRect();
      const bounds = figure.getBoundingClientRect();
      let adjustedLeft = tooltipX;
      let adjustedTop = tooltipY;

      if (tooltipRect.width > 0) {
        if (tooltipRect.left < bounds.left) {
          adjustedLeft = tooltipX + (bounds.left - tooltipRect.left);
        } else if (tooltipRect.right > bounds.right) {
          adjustedLeft = tooltipX - (tooltipRect.right - bounds.right);
        }
      }

      if (tooltipRect.height > 0 && tooltipRect.top < bounds.top) {
        adjustedTop = tooltipY + (bounds.top - tooltipRect.top);
      }

      tooltip.style.left = `${adjustedLeft}px`;
      tooltip.style.top = `${adjustedTop}px`;
    });
  }

  function handlePointerMove(event) {
    const svg = event.target?.closest?.('.structure-details-history-chart__sparkline');
    if (!svg) {
      if (activeChart) {
        hideChartOverlay(activeChart);
        activeChart = null;
      }
      return;
    }
    activeChart = svg;
    updateChartOverlay(svg, event);
  }

  function handlePointerOver(event) {
    const svg = event.target?.closest?.('.structure-details-history-chart__sparkline');
    if (svg) {
      activeChart = svg;
    }
  }

  function handlePointerOut(event) {
    const svg = event.target?.closest?.('.structure-details-history-chart__sparkline');
    if (!svg) {
      return;
    }
    if (!svg.contains(event.relatedTarget)) {
      hideChartOverlay(svg);
      if (activeChart === svg) {
        activeChart = null;
      }
    }
  }

  function handlePointerCancel(event) {
    if (activeChart && event.target && activeChart.contains(event.target)) {
      hideChartOverlay(activeChart);
      activeChart = null;
    }
  }

  document.addEventListener('pointermove', handlePointerMove, { passive: true });
  document.addEventListener('pointerover', handlePointerOver, true);
  document.addEventListener('pointerout', handlePointerOut, true);
  document.addEventListener('pointercancel', handlePointerCancel, true);
  document.addEventListener('pointerleave', handlePointerCancel, true);
}

  const chartHeight = 160;
  const padding = {
    top: 16,
    right: 16,
    bottom: 36,
    left: 56
  };

  const plotWidth = Math.max(chartWidth - padding.left - padding.right, 1);
  const plotHeight = Math.max(chartHeight - padding.top - padding.bottom, 1);

  const yTickData = generateNiceAxisTicks(0, maxValue, 5);
  const yAxisMax = Math.max(yTickData.max, maxValue);

  const hasYearsAgoData = sanitizedPoints.some((point) => Number.isFinite(point.yearsAgo));
  const yearsAgoValues = sanitizedPoints
    .map((point) => (Number.isFinite(point.yearsAgo) ? point.yearsAgo : null))
    .filter((value) => value !== null);
  const minYearsAgo = yearsAgoValues.length > 0 ? Math.min(...yearsAgoValues) : 0;
  const maxYearsAgo = yearsAgoValues.length > 0 ? Math.max(...yearsAgoValues) : 0;
  const xTickData = generateNiceAxisTicks(minYearsAgo, maxYearsAgo, 5);
  const xAxisMax = hasYearsAgoData ? Math.max(xTickData.max, maxYearsAgo) : sanitizedPoints.length - 1;
  const xAxisMin = hasYearsAgoData ? Math.min(xTickData.min, minYearsAgo) : 0;
  const xAxisRange = hasYearsAgoData
    ? Math.max(xAxisMax - xAxisMin, 1)
    : Math.max((sanitizedPoints.length - 1) || 1, 1);
    const resolvedYearsAgo = Number.isFinite(point.yearsAgo) ? point.yearsAgo : null;
    const xRatio = hasYearsAgoData && resolvedYearsAgo !== null
      ? 1 - (clamp(resolvedYearsAgo, xAxisMin, xAxisMax) - xAxisMin) / xAxisRange
      : sanitizedPoints.length === 1
      ? 1
      : index / Math.max(sanitizedPoints.length - 1, 1);
    const yRatio = yAxisMax > 0 ? clamp(point.population / yAxisMax, 0, 1) : 0;
    const x = padding.left + xRatio * plotWidth;
    const y = padding.top + (1 - yRatio) * plotHeight;
    `M ${padding.left.toFixed(2)} ${(padding.top + plotHeight).toFixed(2)}`,
    `L ${(padding.left + plotWidth).toFixed(2)} ${(padding.top + plotHeight).toFixed(2)}`,
  const yTicks = yTickData.ticks
    .map((value) => {
      const ratio = yAxisMax > 0 ? clamp(value / yAxisMax, 0, 1) : 0;
      const y = padding.top + (1 - ratio) * plotHeight;
      return {
        value,
        y,
        label: value.toLocaleString('en-US')
      };
    })
    .filter((tick) => tick.y >= padding.top - 0.5 && tick.y <= padding.top + plotHeight + 0.5);

  const xTicks = hasYearsAgoData
    ? xTickData.ticks
        .map((value) => {
          const clampedValue = clamp(value, xAxisMin, xAxisMax);
          const ratio = 1 - (clampedValue - xAxisMin) / xAxisRange;
          const x = padding.left + ratio * plotWidth;
          return {
            value: clampedValue,
            x,
            label: clampedValue === 0 ? '0' : clampedValue.toLocaleString('en-US')
          };
        })
        .filter((tick) => tick.x >= padding.left - 0.5 && tick.x <= padding.left + plotWidth + 0.5)
    : Array.from({ length: Math.min(5, Math.max(sanitizedPoints.length, 2)) }, (_, index) => {
        const ratio = Math.min(index / Math.max((Math.min(5, sanitizedPoints.length) - 1) || 1, 1), 1);
        const x = padding.left + ratio * plotWidth;
        const value = Math.round(ratio * Math.max(sanitizedPoints.length - 1, 1));
        return {
          value,
          x,
          label: value.toLocaleString('en-US')
        };
      });

  const axesMarkup = `
    <g class="structure-details-history-chart__axes">
      <line
        class="structure-details-history-chart__axis-line structure-details-history-chart__axis-line--y"
        x1="${padding.left.toFixed(2)}"
        y1="${padding.top.toFixed(2)}"
        x2="${padding.left.toFixed(2)}"
        y2="${(padding.top + plotHeight).toFixed(2)}"
      ></line>
      <line
        class="structure-details-history-chart__axis-line structure-details-history-chart__axis-line--x"
        x1="${padding.left.toFixed(2)}"
        y1="${(padding.top + plotHeight).toFixed(2)}"
        x2="${(padding.left + plotWidth).toFixed(2)}"
        y2="${(padding.top + plotHeight).toFixed(2)}"
      ></line>
      ${yTicks
        .map(
          (tick) => `
        <g class="structure-details-history-chart__axis-tick structure-details-history-chart__axis-tick--y">
          <line x1="${(padding.left - 6).toFixed(2)}" y1="${tick.y.toFixed(2)}" x2="${padding.left.toFixed(
            2
          )}" y2="${tick.y.toFixed(2)}"></line>
          <line
            class="structure-details-history-chart__grid-line"
            x1="${padding.left.toFixed(2)}"
            y1="${tick.y.toFixed(2)}"
            x2="${(padding.left + plotWidth).toFixed(2)}"
            y2="${tick.y.toFixed(2)}"
          ></line>
          <text x="${(padding.left - 10).toFixed(2)}" y="${tick.y.toFixed(2)}" text-anchor="end">${escapeHtml(
            tick.label
          )}</text>
        </g>
      `
        )
        .join('')}
      ${xTicks
        .map(
          (tick) => `
        <g class="structure-details-history-chart__axis-tick structure-details-history-chart__axis-tick--x">
          <line x1="${tick.x.toFixed(2)}" y1="${(padding.top + plotHeight).toFixed(
            2
          )}" x2="${tick.x.toFixed(2)}" y2="${(padding.top + plotHeight + 6).toFixed(2)}"></line>
          <text x="${tick.x.toFixed(2)}" y="${(padding.top + plotHeight + 18).toFixed(2)}" text-anchor="middle">${escapeHtml(
            tick.label
          )}</text>
        </g>
      `
        )
        .join('')}
    </g>
  `;

  const interactivePoints = positions.map((position) => {
    const { data } = position;
    return {
      x: Number(position.x.toFixed(2)),
      y: Number(position.y.toFixed(2)),
      population: data.population,
      year: Number.isFinite(data.year) ? data.year : null,
      yearsAgo: Number.isFinite(data.yearsAgo) ? data.yearsAgo : null,
      label: formatPopulationTimelineLabel(data),
      yearText: Number.isFinite(data.year)
        ? `Year ${data.year.toLocaleString('en-US')}`
        : Number.isFinite(data.yearsAgo)
        ? `${data.yearsAgo.toLocaleString('en-US')} years ago`
        : formatPopulationTimelineLabel(data)
    };
  });
  const encodedInteractivePoints = encodeURIComponent(JSON.stringify(interactivePoints));

  ensurePopulationChartInteractionsInitialized();

          data-chart-points="${escapeHtml(encodedInteractivePoints)}"
          data-population-descriptor="${escapeHtml(descriptor)}"
            x="${(padding.left - 34).toFixed(2)}"
            transform="rotate(-90 ${(padding.left - 34).toFixed(2)} ${(chartHeight / 2).toFixed(2)})"
          ${axesMarkup}
          <g class="structure-details-history-chart__overlay" data-population-chart-overlay data-visible="false">
            <line
              class="structure-details-history-chart__overlay-line"
              data-population-chart-line
              x1="${padding.left.toFixed(2)}"
              y1="${padding.top.toFixed(2)}"
              x2="${padding.left.toFixed(2)}"
              y2="${(padding.top + plotHeight).toFixed(2)}"
            ></line>
            <circle
              class="structure-details-history-chart__overlay-point"
              data-population-chart-point
              cx="${padding.left.toFixed(2)}"
              cy="${(padding.top + plotHeight).toFixed(2)}"
              r="4"
            ></circle>
          </g>
        <div class="structure-details-history-chart__tooltip" data-population-chart-tooltip hidden></div>
