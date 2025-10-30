import { clamp } from './src/utils/math.js';

function escapeHtml(value) {
  if (value === null || value === undefined) {
    return '';
  }
  return String(value).replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return char;
    }
  });
}

function stringToSeed(str) {
  if (!str) {
    return Math.floor(Math.random() * 0xffffffff);
  }
  let hash = 2166136261;
  for (let index = 0; index < str.length; index += 1) {
    hash ^= str.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function formatPopulationTimelineLabel(point) {
  if (!point) {
    return 'Recorded';
  }
  if (Number.isFinite(point.yearsAgo)) {
    if (point.yearsAgo <= 0) {
      if (Number.isFinite(point.year)) {
        return `Current (${point.year.toLocaleString('en-US')})`;
      }
      return 'Current';
    }
    if (point.yearsAgo === 1) {
      return '1 year ago';
    }
    return `${point.yearsAgo.toLocaleString('en-US')} years ago`;
  }
  if (Number.isFinite(point.year)) {
    return `Year ${point.year.toLocaleString('en-US')}`;
  }
  return 'Recorded';
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

export function buildPopulationHistoryChartMarkup(timeline, details, tile) {
  if (!Array.isArray(timeline) || timeline.length < 2) {
    return '';
  }

  const sanitizedPoints = timeline
    .map((point) => ({
      population: Number.isFinite(point?.population)
        ? Math.max(0, Math.round(point.population))
        : Number.isFinite(point?.value)
        ? Math.max(0, Math.round(point.value))
        : null,
      year: Number.isFinite(point?.year) ? Math.round(point.year) : null,
      yearsAgo: Number.isFinite(point?.yearsAgo) ? Math.max(0, Math.round(point.yearsAgo)) : null
    }))
    .filter((point) => point.population !== null);

  if (sanitizedPoints.length < 2) {
    return '';
  }

  const values = sanitizedPoints.map((point) => point.population);
  if (values.every((value) => value === 0)) {
    return '';
  }

  const maxValue = Math.max(...values, 1);
  const chartWidth = 360;
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

  const positions = sanitizedPoints.map((point, index) => {
    const resolvedYearsAgo = Number.isFinite(point.yearsAgo) ? point.yearsAgo : null;
    const xRatio =
      hasYearsAgoData && resolvedYearsAgo !== null
        ? 1 - (clamp(resolvedYearsAgo, xAxisMin, xAxisMax) - xAxisMin) / xAxisRange
        : sanitizedPoints.length === 1
        ? 1
        : index / Math.max(sanitizedPoints.length - 1, 1);
    const yRatio = yAxisMax > 0 ? clamp(point.population / yAxisMax, 0, 1) : 0;
    const x = padding.left + xRatio * plotWidth;
    const y = padding.top + (1 - yRatio) * plotHeight;
    return { x, y, data: point };
  });

  const lineCommands = positions
    .map(({ x, y }, index) => `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(' ');

  const areaPath = [
    `M ${padding.left.toFixed(2)} ${(padding.top + plotHeight).toFixed(2)}`,
    ...positions.map(({ x, y }) => `L ${x.toFixed(2)} ${y.toFixed(2)}`),
    `L ${(padding.left + plotWidth).toFixed(2)} ${(padding.top + plotHeight).toFixed(2)}`,
    'Z'
  ].join(' ');

  const startPoint = sanitizedPoints[0];
  const endPoint = sanitizedPoints[sanitizedPoints.length - 1];
  const peakValue = Math.max(...values);
  const peakIndex = values.indexOf(peakValue);
  const peakPoint = sanitizedPoints[Math.max(peakIndex, 0)];

  const startLabel = formatPopulationTimelineLabel(startPoint);
  const peakLabel = formatPopulationTimelineLabel(peakPoint);
  const currentLabel = formatPopulationTimelineLabel(endPoint);

  const startValueText = startPoint.population.toLocaleString('en-US');
  const peakValueText = peakPoint.population.toLocaleString('en-US');
  const currentValueText = endPoint.population.toLocaleString('en-US');

  const descriptor = (details?.populationDescriptor || 'residents').trim() || 'residents';
  const settlementName = details?.name || tile?.structureName || 'the settlement';
  const chartIdSeed = `${settlementName}|${details?.type || 'hold'}|population-history`;
  const chartIdSuffix = ((stringToSeed(chartIdSeed) + 0x4f1b) >>> 0).toString(36);
  const titleId = `population-history-title-${chartIdSuffix}`;
  const descId = `population-history-desc-${chartIdSuffix}`;

  const summarySegments = [];
  summarySegments.push(
    `Population began near ${startValueText} ${descriptor}${startLabel ? ` (${startLabel})` : ''}.`
  );
  if (
    peakIndex > 0 &&
    peakIndex < sanitizedPoints.length - 1 &&
    peakPoint.population !== startPoint.population
  ) {
    summarySegments.push(
      `It peaked at ${peakValueText} ${descriptor}${peakLabel ? ` (${peakLabel})` : ''}.`
    );
  }
  summarySegments.push(
    `${endPoint.population >= peakPoint.population ? 'It now stands at' : 'It has since fallen to'} ${currentValueText} ${descriptor}${
      currentLabel ? ` (${currentLabel})` : ''
    }.`
  );
  const summaryText = summarySegments.join(' ');

  const peakLabelText =
    peakIndex === sanitizedPoints.length - 1 && peakPoint.population === endPoint.population
      ? 'Current peak'
      : 'Peak';
  const peakHeading = peakLabel ? `${peakLabelText} • ${peakLabel}` : peakLabelText;

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
          <text x="${tick.x.toFixed(2)}" y="${(padding.top + plotHeight + 18).toFixed(
            2
          )}" text-anchor="middle">${escapeHtml(tick.label)}</text>
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

  const sanitizedDescriptor = escapeHtml(descriptor);
  const sanitizedSummaryText = escapeHtml(summaryText);

  return `
    <section class="structure-details-history-chart">
      <header class="structure-details-history-chart__header">
        <h3 class="structure-details-history-chart__title structure-details-heading">Population Trend</h3>
        <p class="structure-details-history-chart__current">${escapeHtml(
          currentValueText
        )} ${sanitizedDescriptor}</p>
      </header>
      <figure class="structure-details-history-chart__figure">
        <svg
          class="structure-details-history-chart__sparkline"
          viewBox="0 0 ${chartWidth} ${chartHeight}"
          role="img"
          aria-labelledby="${titleId} ${descId}"
          data-chart-points="${escapeHtml(encodedInteractivePoints)}"
          data-population-descriptor="${sanitizedDescriptor}"
        >
          <title id="${titleId}">${escapeHtml(`Population trend for ${settlementName}`)}</title>
          <desc id="${descId}">${sanitizedSummaryText}</desc>
          <path class="structure-details-history-chart__area" d="${areaPath}"></path>
          <path class="structure-details-history-chart__line" d="${lineCommands}"></path>
          ${axesMarkup}
          <text
            class="structure-details-history-chart__axis-label structure-details-history-chart__axis-label--y"
            x="${(padding.left - 34).toFixed(2)}"
            y="${(chartHeight / 2).toFixed(2)}"
            text-anchor="middle"
            transform="rotate(-90 ${(padding.left - 34).toFixed(2)} ${(chartHeight / 2).toFixed(2)})"
            aria-hidden="true"
          >Population</text>
          <text
            class="structure-details-history-chart__axis-label structure-details-history-chart__axis-label--x"
            x="${(padding.left + plotWidth / 2).toFixed(2)}"
            y="${(padding.top + plotHeight + 32).toFixed(2)}"
            text-anchor="middle"
            aria-hidden="true"
          >Years Ago</text>
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
        </svg>
        <div class="structure-details-history-chart__tooltip" data-population-chart-tooltip hidden></div>
        <figcaption class="structure-details-history-chart__caption">
          <dl class="structure-details-history-chart__stats">
            <div class="structure-details-history-chart__stat">
              <dt>${escapeHtml(startLabel)}</dt>
              <dd>${escapeHtml(startValueText)}</dd>
            </div>
            <div class="structure-details-history-chart__stat">
              <dt>${escapeHtml(peakHeading)}</dt>
              <dd>${escapeHtml(peakValueText)}</dd>
            </div>
            <div class="structure-details-history-chart__stat">
              <dt>${escapeHtml(currentLabel)}</dt>
              <dd>${escapeHtml(currentValueText)}</dd>
            </div>
          </dl>
        </figcaption>
      </figure>
    </section>
  `.trim();
}

export default buildPopulationHistoryChartMarkup;
