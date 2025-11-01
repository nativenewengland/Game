function createNiceTickStep(maxValue, targetTickCount = 5) {
  if (!Number.isFinite(maxValue) || maxValue <= 0) {
    return 1;
  }
  const safeTargetCount = Math.max(1, targetTickCount);
  const roughStep = maxValue / safeTargetCount;
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const residual = roughStep / magnitude;
  if (residual >= 5) {
    return 5 * magnitude;
  }
  if (residual >= 2) {
    return 2 * magnitude;
  }
  return magnitude;
}

function generateAxisTicks(maxValue, targetTickCount = 5, options = {}) {
  const { includeZero = true } = options;
  if (!Number.isFinite(maxValue) || maxValue <= 0) {
    return includeZero ? [0] : [];
  }
  const step = Math.max(createNiceTickStep(maxValue, targetTickCount), 1);
  const tickTotal = Math.max(1, Math.floor(maxValue / step));
  const ticks = [];
  if (includeZero) {
    ticks.push(0);
  }
  for (let index = 1; index <= tickTotal; index += 1) {
    ticks.push(step * index);
  }
  const lastTick = ticks[ticks.length - 1];
  if (!Number.isFinite(lastTick) || Math.abs(lastTick - maxValue) > step * 0.25) {
    ticks.push(maxValue);
  } else if (ticks.length > 0) {
    ticks[ticks.length - 1] = Math.max(lastTick, maxValue);
  }
  return Array.from(new Set(ticks)).sort((a, b) => a - b);
}

  const maxYearsAgo = sanitizedPoints.reduce(
    (accumulator, point) =>
      Number.isFinite(point.yearsAgo) ? Math.max(accumulator, point.yearsAgo) : accumulator,
    0
  );
  const hasYearsData = maxYearsAgo > 0;

  const yTicks = generateAxisTicks(maxValue, 4);
  const yScaleMax = yTicks.length > 0 ? yTicks[yTicks.length - 1] : maxValue || 1;
  const xTicks = hasYearsData ? generateAxisTicks(maxYearsAgo, 6) : [];

    const x = hasYearsData && Number.isFinite(point.yearsAgo)
      ? chartWidth - (point.yearsAgo / Math.max(maxYearsAgo, 1)) * chartWidth
      : sanitizedPoints.length === 1
      ? chartWidth
      : (index / (sanitizedPoints.length - 1)) * chartWidth;
    const y = chartHeight - (point.population / Math.max(yScaleMax, 1)) * chartHeight;
  const horizontalGridLines = yTicks
    .map((tick) => {
      const y = chartHeight - (tick / Math.max(yScaleMax, 1)) * chartHeight;
      return `<line class="structure-details-history-chart__grid-line structure-details-history-chart__grid-line--horizontal" x1="0" y1="${y.toFixed(2)}" x2="${chartWidth.toFixed(2)}" y2="${y.toFixed(2)}" aria-hidden="true"></line>`;
    })
    .join('');

  const verticalGridLines = hasYearsData
    ? xTicks
        .map((tick) => {
          const x = chartWidth - (tick / Math.max(maxYearsAgo, 1)) * chartWidth;
          return `<line class="structure-details-history-chart__grid-line structure-details-history-chart__grid-line--vertical" x1="${x.toFixed(2)}" y1="0" x2="${x.toFixed(2)}" y2="${chartHeight.toFixed(2)}" aria-hidden="true"></line>`;
        })
        .join('')
    : '';

  const yTickLabels = yTicks
    .map((tick) => {
      const y = chartHeight - (tick / Math.max(yScaleMax, 1)) * chartHeight;
      const labelY = Math.min(Math.max(y, 6), chartHeight - 6);
      return `<text class="structure-details-history-chart__axis-label structure-details-history-chart__axis-label--y" x="4" y="${labelY.toFixed(2)}" text-anchor="start" aria-hidden="true">${escapeHtml(
        tick.toLocaleString('en-US')
      )}</text>`;
    })
    .join('');

  const xTickLabels = hasYearsData
    ? xTicks
        .map((tick) => {
          const x = chartWidth - (tick / Math.max(maxYearsAgo, 1)) * chartWidth;
          const labelX = Math.min(Math.max(x, 12), chartWidth - 12);
          return `<text class="structure-details-history-chart__axis-label structure-details-history-chart__axis-label--x" x="${labelX.toFixed(2)}" y="${(chartHeight - 2).toFixed(2)}" text-anchor="middle" aria-hidden="true">${escapeHtml(
            tick.toLocaleString('en-US')
          )}</text>`;
        })
        .join('')
    : '';

  const pointData = positions.map(({ x, y, data }) => ({
    x: Number(x.toFixed(2)),
    y: Number(y.toFixed(2)),
    population: data.population,
    yearsAgo: data.yearsAgo,
    year: data.year
  }));
  const encodedPoints = encodeURIComponent(JSON.stringify(pointData));

          data-chart-width="${chartWidth}"
          data-chart-height="${chartHeight}"
          data-points="${escapeHtml(encodedPoints)}"
          data-has-years="${hasYearsData ? 'true' : 'false'}"
          data-descriptor="${escapeHtml(descriptor)}"
          <g class="structure-details-history-chart__grid" aria-hidden="true">
            ${horizontalGridLines}${verticalGridLines}
          </g>
          <g class="structure-details-history-chart__axis structure-details-history-chart__axis--y" aria-hidden="true">
            ${yTickLabels}
          </g>
          <g class="structure-details-history-chart__axis structure-details-history-chart__axis--x" aria-hidden="true">
            ${xTickLabels}
          </g>
          <line class="structure-details-history-chart__cursor-line" x1="0" y1="0" x2="0" y2="${chartHeight.toFixed(2)}"></line>
          <circle class="structure-details-history-chart__marker" cx="0" cy="0" r="4"></circle>
          <rect
            class="structure-details-history-chart__interaction-layer"
            x="0"
            y="0"
            width="${chartWidth}"
            height="${chartHeight}"
            fill="transparent"
          ></rect>
        <div class="structure-details-history-chart__tooltip" aria-hidden="true" hidden></div>
function enhancePopulationHistoryCharts(rootElement) {
  if (!rootElement || typeof rootElement.querySelectorAll !== 'function') {
    return;
  }

  const charts = rootElement.querySelectorAll(
    '.structure-details-history-chart__sparkline[data-points]'
  );
  if (!charts || charts.length === 0) {
    return;
  }

  charts.forEach((svg) => {
    if (!svg || svg.dataset.chartEnhanced === 'true') {
      return;
    }
    svg.dataset.chartEnhanced = 'true';

    const rawPoints = svg.getAttribute('data-points');
    if (!rawPoints) {
      return;
    }

    let decodedPoints = rawPoints;
    try {
      decodedPoints = decodeURIComponent(rawPoints);
    } catch (error) {
      decodedPoints = rawPoints;
    }

    let parsedPoints;
    try {
      parsedPoints = JSON.parse(decodedPoints);
    } catch (error) {
      return;
    }

    if (!Array.isArray(parsedPoints) || parsedPoints.length === 0) {
      return;
    }

    const chartWidth = Number(svg.getAttribute('data-chart-width')) || 320;
    const chartHeight = Number(svg.getAttribute('data-chart-height')) || 140;
    const descriptorValue = (svg.getAttribute('data-descriptor') || 'residents').trim();
    const descriptorLabel = descriptorValue.length > 0 ? descriptorValue : 'residents';
    const marker = svg.querySelector('.structure-details-history-chart__marker');
    const cursorLine = svg.querySelector('.structure-details-history-chart__cursor-line');
    const interactionLayer = svg.querySelector(
      '.structure-details-history-chart__interaction-layer'
    );
    const tooltip = svg.parentElement?.querySelector(
      '.structure-details-history-chart__tooltip'
    );
    const figure = svg.closest('.structure-details-history-chart__figure');

    if (!marker || !cursorLine || !interactionLayer) {
      return;
    }

    const points = parsedPoints
      .map((point) => {
        const x = Number(point?.x);
        const y = Number(point?.y);
        const population = Number(point?.population);
        const hasYearsAgo = point?.yearsAgo != null && point.yearsAgo !== '';
        const yearsAgoValue = hasYearsAgo ? Number(point.yearsAgo) : NaN;
        const hasYear = point?.year != null && point.year !== '';
        const yearValue = hasYear ? Number(point.year) : NaN;
        return {
          x: Number.isFinite(x) ? x : 0,
          y: Number.isFinite(y) ? y : chartHeight,
          population: Number.isFinite(population) ? population : 0,
          yearsAgo: Number.isFinite(yearsAgoValue) ? Math.max(0, Math.round(yearsAgoValue)) : null,
          year: Number.isFinite(yearValue) ? Math.round(yearValue) : null
        };
      })
      .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y))
      .sort((a, b) => a.x - b.x);

    if (points.length === 0) {
      return;
    }

    let hideTimeoutId = null;

    const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

    const formatTimeLabel = (point) => {
      if (Number.isFinite(point?.yearsAgo)) {
        if (point.yearsAgo <= 0) {
          if (Number.isFinite(point?.year)) {
            return `Present • ${point.year.toLocaleString('en-US')}`;
          }
          return 'Present';
        }
        const suffix = point.yearsAgo === 1 ? 'year ago' : 'years ago';
        if (Number.isFinite(point?.year)) {
          return `${point.yearsAgo.toLocaleString('en-US')} ${suffix} • ${point.year.toLocaleString('en-US')}`;
        }
        return `${point.yearsAgo.toLocaleString('en-US')} ${suffix}`;
      }
      if (Number.isFinite(point?.year)) {
        return `Year ${point.year.toLocaleString('en-US')}`;
      }
      return '';
    };

    const clearHideTimeout = () => {
      if (hideTimeoutId !== null) {
        clearTimeout(hideTimeoutId);
        hideTimeoutId = null;
      }
    };

    const hideTooltip = () => {
      clearHideTimeout();
      svg.classList.remove('is-active');
      if (tooltip) {
        tooltip.hidden = true;
        tooltip.setAttribute('aria-hidden', 'true');
        tooltip.textContent = '';
        tooltip.style.left = '';
        tooltip.style.top = '';
      }
    };

    const updateTooltip = (clientX, clientY) => {
      if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) {
        return;
      }
      const rect = svg.getBoundingClientRect();
      if (!rect || rect.width === 0 || rect.height === 0) {
        return;
      }

      const localX = clampValue(clientX - rect.left, 0, rect.width);
      const scaledX = (localX / rect.width) * chartWidth;
      let nearestPoint = points[0];
      let minDistance = Math.abs(nearestPoint.x - scaledX);
      for (let index = 1; index < points.length; index += 1) {
        const candidate = points[index];
        const distance = Math.abs(candidate.x - scaledX);
        if (distance < minDistance) {
          nearestPoint = candidate;
          minDistance = distance;
        }
      }

      marker.setAttribute('cx', nearestPoint.x.toFixed(2));
      marker.setAttribute('cy', nearestPoint.y.toFixed(2));
      cursorLine.setAttribute('x1', nearestPoint.x.toFixed(2));
      cursorLine.setAttribute('x2', nearestPoint.x.toFixed(2));
      cursorLine.setAttribute('y1', '0');
      cursorLine.setAttribute('y2', chartHeight.toFixed(2));
      svg.classList.add('is-active');

      if (tooltip && figure) {
        const figureRect = figure.getBoundingClientRect();
        if (figureRect && figureRect.width > 0 && figureRect.height > 0) {
          const maxX = Math.max(12, figureRect.width - 12);
          const maxY = Math.max(16, figureRect.height - 16);
          const figureX = clampValue(clientX - figureRect.left, 12, maxX);
          const figureY = clampValue(clientY - figureRect.top, 16, maxY);
          const populationText = Number.isFinite(nearestPoint.population)
            ? nearestPoint.population.toLocaleString('en-US')
            : '—';
          const timeLabel = formatTimeLabel(nearestPoint);
          tooltip.textContent = `${populationText} ${descriptorLabel}${
            timeLabel ? ` • ${timeLabel}` : ''
          }`;
          tooltip.hidden = false;
          tooltip.setAttribute('aria-hidden', 'false');
          tooltip.style.left = `${figureX}px`;
          tooltip.style.top = `${figureY}px`;
        }
      }

      clearHideTimeout();
    };

    const scheduleHide = (delay = 900) => {
      clearHideTimeout();
      hideTimeoutId = setTimeout(() => {
        hideTimeoutId = null;
        hideTooltip();
      }, delay);
    };

    const handlePointerEnter = (event) => {
      updateTooltip(event.clientX, event.clientY);
    };

    const handlePointerMove = (event) => {
      updateTooltip(event.clientX, event.clientY);
    };

    const handlePointerDown = (event) => {
      if (typeof interactionLayer.setPointerCapture === 'function') {
        try {
          interactionLayer.setPointerCapture(event.pointerId);
        } catch (error) {
          // Ignore errors if the pointer cannot be captured.
        }
      }
      updateTooltip(event.clientX, event.clientY);
    };

    const handlePointerUp = (event) => {
      if (typeof interactionLayer.releasePointerCapture === 'function') {
        try {
          interactionLayer.releasePointerCapture(event.pointerId);
        } catch (error) {
          // Ignore errors if the pointer capture was not active.
        }
      }
      if (event.pointerType && event.pointerType !== 'mouse') {
        scheduleHide(1200);
      }
    };

    const handlePointerLeave = () => {
      hideTooltip();
    };

    const handlePointerCancel = () => {
      hideTooltip();
    };

    interactionLayer.addEventListener('pointerenter', handlePointerEnter);
    interactionLayer.addEventListener('pointermove', handlePointerMove);
    interactionLayer.addEventListener('pointerdown', handlePointerDown);
    interactionLayer.addEventListener('pointerup', handlePointerUp);
    interactionLayer.addEventListener('pointerleave', handlePointerLeave);
    interactionLayer.addEventListener('pointercancel', handlePointerCancel);
  });
}

    if (resolvedTabId === 'history') {
      enhancePopulationHistoryCharts(elements.structureDetailsContent);
    }
