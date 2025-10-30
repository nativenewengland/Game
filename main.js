function formatPopulationTimelineTickLabel(point) {
  if (!point) {
    return 'Recorded';
  }
  if (Number.isFinite(point.year)) {
    return point.year.toLocaleString('en-US');
  }
  if (Number.isFinite(point.yearsAgo)) {
    if (point.yearsAgo === 0) {
      return 'Now';
    }
    if (point.yearsAgo === 1) {
      return '1y ago';
    }
    return `${point.yearsAgo.toLocaleString('en-US')}y ago`;
  }
  return 'Recorded';
}

function formatPopulationTimelineMarkerLabel(point) {
  if (!point) {
    return 'Recorded';
  }
  if (Number.isFinite(point.year)) {
    return `Year ${point.year.toLocaleString('en-US')}`;
  }
  if (Number.isFinite(point.yearsAgo)) {
    if (point.yearsAgo === 0) {
      return 'Current';
    }
    if (point.yearsAgo === 1) {
      return '1 year ago';
    }
    return `${point.yearsAgo.toLocaleString('en-US')} years ago`;
  }
  return 'Recorded';
}

function getNicePopulationAxisStep(maxValue, tickTarget = 4) {
  if (!Number.isFinite(maxValue) || maxValue <= 0) {
    return 1;
  }
  const safeTickTarget = Math.max(1, tickTarget);
  const roughStep = maxValue / safeTickTarget;
  const exponent = Math.floor(Math.log10(roughStep));
  const magnitude = 10 ** exponent;
  const residual = roughStep / magnitude;
  if (residual >= 7.5) {
    return 10 * magnitude;
  }
  if (residual >= 3.5) {
    return 5 * magnitude;
  }
  if (residual >= 1.5) {
    return 2 * magnitude;
  }
  return magnitude;
}

function buildPopulationHistorySliderValueText(point, descriptor) {
  if (!point) {
    return 'Recorded';
  }
  const populationText = Number.isFinite(point.population)
    ? point.population.toLocaleString('en-US')
    : 'Unknown';
  return `${formatPopulationTimelineMarkerLabel(point)} • ${populationText} ${descriptor}`;
}

const populationHistoryChartStates = new WeakMap();
const activePopulationHistoryCharts = new Set();
let populationHistoryChartListenersAttached = false;

function refreshActivePopulationHistoryCharts() {
  const charts = Array.from(activePopulationHistoryCharts);
  charts.forEach((chart) => {
    const state = populationHistoryChartStates.get(chart);
    if (!state) {
      activePopulationHistoryCharts.delete(chart);
      return;
    }
    if (!chart.isConnected) {
      activePopulationHistoryCharts.delete(chart);
      return;
    }
    if (!Array.isArray(state.points) || !Number.isInteger(state.activeIndex)) {
      activePopulationHistoryCharts.delete(chart);
      return;
    }
    if (!state.points[state.activeIndex] || (state.marker && state.marker.hidden)) {
      activePopulationHistoryCharts.delete(chart);
      return;
    }
    const point = state.points[state.activeIndex];
    const leftPercent = (point.x / state.chartWidth) * 100;
    const topPercent = (point.y / state.chartHeight) * 100;
    positionPopulationHistoryChartTooltip(chart, state, leftPercent, topPercent);
  });
}

function ensurePopulationHistoryChartListeners() {
  if (populationHistoryChartListenersAttached || typeof window === 'undefined') {
    return;
  }
  window.addEventListener('resize', refreshActivePopulationHistoryCharts);
  window.addEventListener('scroll', refreshActivePopulationHistoryCharts, true);
  populationHistoryChartListenersAttached = true;
}

function parsePopulationHistoryChartPoints(value) {
  if (!value) {
    return [];
  }
  let parsed;
  try {
    parsed = JSON.parse(value);
  } catch (error) {
    return [];
  }
  if (!Array.isArray(parsed) || parsed.length === 0) {
    return [];
  }
  return parsed
    .map((point) => {
      const x = Number(point?.x);
      const y = Number(point?.y);
      const population = Number(point?.population);
      const year = Number(point?.year);
      const yearsAgo = Number(point?.yearsAgo);
      if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(population)) {
        return null;
      }
      const resolvedPopulation = Math.max(0, Math.round(population));
      const resolvedYear = Number.isFinite(year) ? Math.round(year) : null;
      const resolvedYearsAgo = Number.isFinite(yearsAgo) ? Math.max(0, Math.round(yearsAgo)) : null;
      return {
        x,
        y,
        population: resolvedPopulation,
        year: resolvedYear,
        yearsAgo: resolvedYearsAgo
      };
    })
    .filter((point) => point !== null);
}

function findNearestPopulationHistoryPointIndex(points, targetX) {
  if (!Array.isArray(points) || points.length === 0) {
    return -1;
  }
  let nearestIndex = 0;
  let smallestDistance = Math.abs(points[0].x - targetX);
  for (let index = 1; index < points.length; index += 1) {
    const distance = Math.abs(points[index].x - targetX);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      nearestIndex = index;
    }
  }
  return nearestIndex;
}

function positionPopulationHistoryChartTooltip(chart, state, leftPercent, topPercent) {
  if (!chart || !state || !state.tooltip) {
    return;
  }
  const tooltip = state.tooltip;
  const containerWidth = chart.clientWidth;
  const containerHeight = chart.clientHeight;
  if (!containerWidth || !containerHeight) {
    return;
  }

  const markerLeft = (leftPercent / 100) * containerWidth;
  const markerTop = (topPercent / 100) * containerHeight;

  const tooltipWidth = tooltip.offsetWidth || 0;
  const tooltipHeight = tooltip.offsetHeight || 0;
  const horizontalPadding = 12;
  const verticalOffset = 16;

  let left = markerLeft - tooltipWidth / 2;
  left = Math.max(horizontalPadding, Math.min(containerWidth - tooltipWidth - horizontalPadding, left));

  let top = markerTop - tooltipHeight - verticalOffset;
  if (top < horizontalPadding) {
    top = Math.min(containerHeight - tooltipHeight - horizontalPadding, markerTop + verticalOffset);
    tooltip.classList.add('structure-details-history-chart__tooltip--below');
  } else {
    tooltip.classList.remove('structure-details-history-chart__tooltip--below');
  }

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

function updatePopulationHistoryChartMarker(chart, state, index) {
  if (!chart || !state || !Array.isArray(state.points) || state.points.length === 0) {
    return;
  }
  const resolvedIndex = Math.max(0, Math.min(state.points.length - 1, index));
  const point = state.points[resolvedIndex];
  if (!point) {
    return;
  }

  const leftPercent = (point.x / state.chartWidth) * 100;
  const topPercent = (point.y / state.chartHeight) * 100;

  if (state.marker) {
    state.marker.style.setProperty('--marker-left', `${leftPercent}%`);
    state.marker.style.setProperty('--marker-top', `${topPercent}%`);
    state.marker.hidden = false;
  }

  const descriptor = state.descriptor || 'residents';
  const populationText = `${point.population.toLocaleString('en-US')} ${descriptor}`;
  const timelineLabel = formatPopulationTimelineMarkerLabel(point);
  if (state.tooltip) {
    state.tooltip.hidden = false;
    state.tooltip.innerHTML = `
      <span class="structure-details-history-chart__tooltip-label">${escapeHtml(timelineLabel)}</span>
      <span class="structure-details-history-chart__tooltip-value">${escapeHtml(populationText)}</span>
    `.trim();
    positionPopulationHistoryChartTooltip(chart, state, leftPercent, topPercent);
  }

  if (state.surface) {
    state.surface.setAttribute('aria-valuenow', String(resolvedIndex));
    state.surface.setAttribute('aria-valuetext', buildPopulationHistorySliderValueText(point, descriptor));
  }

  chart.classList.add('is-active');
  state.activeIndex = resolvedIndex;
  activePopulationHistoryCharts.add(chart);
}

function hidePopulationHistoryChartMarker(chart, state, options = {}) {
  if (!chart || !state) {
    return;
  }
  const { resetToDefault = false } = options;
  activePopulationHistoryCharts.delete(chart);
  if (state.marker) {
    state.marker.hidden = true;
  }
  if (state.tooltip) {
    state.tooltip.hidden = true;
  }
  chart.classList.remove('is-active');
  if (resetToDefault && Array.isArray(state.points) && state.points.length > 0) {
    const fallbackIndex = Math.max(0, Math.min(state.points.length - 1, state.defaultIndex || state.points.length - 1));
    const fallbackPoint = state.points[fallbackIndex];
    if (state.surface && fallbackPoint) {
      state.surface.setAttribute('aria-valuenow', String(fallbackIndex));
      state.surface.setAttribute(
        'aria-valuetext',
        buildPopulationHistorySliderValueText(fallbackPoint, state.descriptor || 'residents')
      );
    }
    state.activeIndex = fallbackIndex;
  } else {
    state.activeIndex = null;
  }
}

function showPopulationHistoryPointFromPointer(chart, state, event) {
  if (!chart || !state || !state.surface || !Array.isArray(state.points) || state.points.length === 0) {
    return;
  }
  const rect = state.surface.getBoundingClientRect();
  if (!rect.width) {
    return;
  }
  const relativeX = ((event.clientX - rect.left) / rect.width) * state.chartWidth;
  if (!Number.isFinite(relativeX)) {
    return;
  }
  const index = findNearestPopulationHistoryPointIndex(state.points, relativeX);
  if (index >= 0) {
    updatePopulationHistoryChartMarker(chart, state, index);
  }
}

function initializePopulationHistoryCharts(root) {
  const scope = root || document;
  if (!scope) {
    return;
  }
  const charts = scope.querySelectorAll('[data-population-history-chart]');
  charts.forEach((chart) => {
    if (!chart || populationHistoryChartStates.has(chart)) {
      return;
    }

    const points = parsePopulationHistoryChartPoints(chart.getAttribute('data-chart-points'));
    if (!Array.isArray(points) || points.length === 0) {
      return;
    }

    const surface = chart.querySelector('[data-population-history-surface]');
    const marker = chart.querySelector('.structure-details-history-chart__marker');
    const tooltip = chart.querySelector('.structure-details-history-chart__tooltip');
    if (!surface || !marker || !tooltip) {
      return;
    }

    const chartWidth = Number(chart.getAttribute('data-chart-width')) || 320;
    const chartHeight = Number(chart.getAttribute('data-chart-height')) || 180;
    const descriptor = (chart.getAttribute('data-population-descriptor') || 'residents').trim() || 'residents';

    const state = {
      points,
      surface,
      marker,
      tooltip,
      descriptor,
      chartWidth,
      chartHeight,
      activeIndex: null,
      defaultIndex: Math.max(0, points.length - 1)
    };

    surface.setAttribute('aria-valuemin', '0');
    surface.setAttribute('aria-valuemax', String(points.length - 1));
    surface.setAttribute('aria-orientation', 'horizontal');
    surface.setAttribute(
      'aria-valuetext',
      buildPopulationHistorySliderValueText(points[state.defaultIndex], descriptor)
    );
    surface.setAttribute('aria-valuenow', String(state.defaultIndex));

    const handlePointer = (event) => {
      showPopulationHistoryPointFromPointer(chart, state, event);
    };

    surface.addEventListener('pointerdown', (event) => {
      surface.focus({ preventScroll: true });
      handlePointer(event);
    });
    surface.addEventListener('pointermove', handlePointer);
    surface.addEventListener('pointerenter', handlePointer);
    surface.addEventListener('pointerleave', () => {
      if (document.activeElement !== surface) {
        hidePopulationHistoryChartMarker(chart, state);
      }
    });
    surface.addEventListener('pointercancel', () => {
      if (document.activeElement !== surface) {
        hidePopulationHistoryChartMarker(chart, state);
      }
    });

    surface.addEventListener('focus', () => {
      const targetIndex = Number.isInteger(state.activeIndex) ? state.activeIndex : state.defaultIndex;
      updatePopulationHistoryChartMarker(chart, state, targetIndex);
    });

    surface.addEventListener('blur', () => {
      hidePopulationHistoryChartMarker(chart, state, { resetToDefault: true });
    });

    surface.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
        return;
      }
      event.preventDefault();
      const lastIndex = state.points.length - 1;
      let targetIndex = Number.isInteger(state.activeIndex) ? state.activeIndex : state.defaultIndex;
      if (event.key === 'ArrowLeft') {
        targetIndex = Math.max(0, targetIndex - 1);
      } else if (event.key === 'ArrowRight') {
        targetIndex = Math.min(lastIndex, targetIndex + 1);
      } else if (event.key === 'Home') {
        targetIndex = 0;
      } else if (event.key === 'End') {
        targetIndex = lastIndex;
      }
      updatePopulationHistoryChartMarker(chart, state, targetIndex);
    });

    ensurePopulationHistoryChartListeners();
    populationHistoryChartStates.set(chart, state);
  });
}

  const paddedMaxValue = Math.max(maxValue * 1.05, maxValue + 1);
  const step = getNicePopulationAxisStep(paddedMaxValue, 4);
  const axisMax = Math.max(step, Math.ceil(paddedMaxValue / step) * step);

  const chartWidth = 360;
  const chartHeight = 200;
  const padding = {
    top: 18,
    right: 28,
    bottom: 42,
    left: 52
  };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;
  const plotBottom = padding.top + plotHeight;
  const plotRight = padding.left + plotWidth;
    const normalizedX = sanitizedPoints.length === 1 ? 1 : index / (sanitizedPoints.length - 1);
    const normalizedY = axisMax === 0 ? 0 : point.population / axisMax;
    const x = padding.left + normalizedX * plotWidth;
    const y = plotBottom - normalizedY * plotHeight;
    `M ${padding.left.toFixed(2)} ${plotBottom.toFixed(2)}`,
    `L ${plotRight.toFixed(2)} ${plotBottom.toFixed(2)}`,
  const yTicks = [];
  for (let value = 0; value <= axisMax + step * 0.5; value += step) {
    const clampedValue = Math.min(value, axisMax);
    const normalized = axisMax === 0 ? 0 : clampedValue / axisMax;
    const y = plotBottom - normalized * plotHeight;
    yTicks.push({
      value: Math.round(clampedValue),
      y
    });
    if (clampedValue >= axisMax) {
      break;
    }
  }

  const xTickCount = Math.min(5, sanitizedPoints.length);
  const xTickIndexes = new Set();
  for (let index = 0; index < xTickCount; index += 1) {
    const target =
      xTickCount === 1
        ? sanitizedPoints.length - 1
        : Math.round((index / (xTickCount - 1)) * (sanitizedPoints.length - 1));
    xTickIndexes.add(target);
  }
  const xTicks = Array.from(xTickIndexes)
    .sort((a, b) => a - b)
    .map((tickIndex) => {
      const point = sanitizedPoints[tickIndex];
      const normalizedX = sanitizedPoints.length === 1 ? 1 : tickIndex / (sanitizedPoints.length - 1);
      const x = padding.left + normalizedX * plotWidth;
      return { x, label: formatPopulationTimelineTickLabel(point) };
    });

  const interactivePoints = positions.map(({ x, y, data }) => ({
    x: Number(x.toFixed(2)),
    y: Number(y.toFixed(2)),
    population: data.population,
    year: data.year,
    yearsAgo: data.yearsAgo
  }));
  const interactivePointsJson = escapeHtml(JSON.stringify(interactivePoints));

  const horizontalGridLines = yTicks
    .filter((tick) => tick.value > 0 && tick.value < axisMax)
    .map(
      ({ y }) =>
        `<line class="structure-details-history-chart__grid-line structure-details-history-chart__grid-line--horizontal" x1="${padding.left.toFixed(2)}" y1="${y.toFixed(2)}" x2="${plotRight.toFixed(2)}" y2="${y.toFixed(2)}"></line>`
    )
    .join('');
  const verticalGridLines = xTicks
    .filter((_, index) => index !== 0 && index !== xTicks.length - 1)
    .map(
      ({ x }) =>
        `<line class="structure-details-history-chart__grid-line structure-details-history-chart__grid-line--vertical" x1="${x.toFixed(2)}" y1="${padding.top.toFixed(2)}" x2="${x.toFixed(2)}" y2="${plotBottom.toFixed(2)}"></line>`
    )
    .join('');

  const yAxisTicksMarkup = yTicks
    .map(({ value, y }) => {
      const label = value.toLocaleString('en-US');
      const tickLine = `<line class="structure-details-history-chart__axis-tick structure-details-history-chart__axis-tick--y" x1="${(padding.left - 6).toFixed(2)}" y1="${y.toFixed(2)}" x2="${padding.left.toFixed(2)}" y2="${y.toFixed(2)}"></line>`;
      const tickLabel = `<text class="structure-details-history-chart__tick-label structure-details-history-chart__tick-label--y" x="${(padding.left - 10).toFixed(2)}" y="${(y + 4).toFixed(2)}">${escapeHtml(label)}</text>`;
      return `${tickLine}${tickLabel}`;
    })
    .join('');

  const xAxisTicksMarkup = xTicks
    .map(({ x, label }) => {
      const tickLine = `<line class="structure-details-history-chart__axis-tick structure-details-history-chart__axis-tick--x" x1="${x.toFixed(2)}" y1="${plotBottom.toFixed(2)}" x2="${x.toFixed(2)}" y2="${(plotBottom + 8).toFixed(2)}"></line>`;
      const tickLabel = `<text class="structure-details-history-chart__tick-label structure-details-history-chart__tick-label--x" x="${x.toFixed(2)}" y="${(plotBottom + 22).toFixed(2)}">${escapeHtml(label)}</text>`;
      return `${tickLine}${tickLabel}`;
    })
    .join('');

  const xAxisCaption = `<text class="structure-details-history-chart__axis-caption structure-details-history-chart__axis-caption--x" x="${((padding.left + plotRight) / 2).toFixed(2)}" y="${(chartHeight - 6).toFixed(2)}">Timeline</text>`;
  const yAxisCaption = `<text class="structure-details-history-chart__axis-caption structure-details-history-chart__axis-caption--y" x="${(padding.left - 36).toFixed(2)}" y="${(padding.top + plotHeight / 2).toFixed(2)}" transform="rotate(-90 ${(padding.left - 36).toFixed(2)} ${(padding.top + plotHeight / 2).toFixed(2)})">Population</text>`;

  const sliderDefaultValueText = buildPopulationHistorySliderValueText(endPoint, descriptor);
  const sliderAriaLabel = `Explore the population history for ${settlementName}. Use the arrow keys to move along the timeline.`;

        <div
          class="structure-details-history-chart__visual"
          data-population-history-chart
          data-chart-width="${chartWidth}"
          data-chart-height="${chartHeight}"
          data-chart-points="${interactivePointsJson}"
          data-population-descriptor="${escapeHtml(descriptor)}"
          <svg
            class="structure-details-history-chart__sparkline"
            viewBox="0 0 ${chartWidth} ${chartHeight}"
            role="img"
            aria-labelledby="${titleId} ${descId}"
          >
            <title id="${titleId}">${escapeHtml(`Population trend for ${settlementName}`)}</title>
            <desc id="${descId}">${escapeHtml(summaryText)}</desc>
            <g class="structure-details-history-chart__grid">${horizontalGridLines}${verticalGridLines}</g>
            <g class="structure-details-history-chart__axes">
              <line
                class="structure-details-history-chart__axis-line"
                x1="${padding.left.toFixed(2)}"
                y1="${padding.top.toFixed(2)}"
                x2="${padding.left.toFixed(2)}"
                y2="${plotBottom.toFixed(2)}"
              ></line>
              <line
                class="structure-details-history-chart__axis-line"
                x1="${padding.left.toFixed(2)}"
                y1="${plotBottom.toFixed(2)}"
                x2="${plotRight.toFixed(2)}"
                y2="${plotBottom.toFixed(2)}"
              ></line>
              ${yAxisTicksMarkup}
              ${xAxisTicksMarkup}
              ${xAxisCaption}
              ${yAxisCaption}
            </g>
            <path class="structure-details-history-chart__area" d="${areaPath}"></path>
            <path class="structure-details-history-chart__line" d="${lineCommands}"></path>
          </svg>
          <div
            class="structure-details-history-chart__surface"
            data-population-history-surface
            tabindex="0"
            role="slider"
            aria-label="${escapeHtml(sliderAriaLabel)}"
            aria-orientation="horizontal"
            aria-valuemin="0"
            aria-valuemax="${interactivePoints.length - 1}"
            aria-valuenow="${interactivePoints.length - 1}"
            aria-valuetext="${escapeHtml(sliderDefaultValueText)}"
          ></div>
          <div class="structure-details-history-chart__marker" hidden>
            <div class="structure-details-history-chart__marker-line"></div>
            <div class="structure-details-history-chart__marker-dot"></div>
          </div>
          <output class="structure-details-history-chart__tooltip" role="status" hidden></output>
        </div>
    initializePopulationHistoryCharts(elements.structureDetailsContent);
    refreshActivePopulationHistoryCharts();
