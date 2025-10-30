function formatPopulationTimelineAxisLabel(point, options = {}) {
  if (!point) {
    return '';
  }

  const { hasYearValues = false, hasYearsAgoValues = false } = options;

  if (hasYearValues && Number.isFinite(point.year)) {
    return point.year.toLocaleString('en-US');
  }

  if (hasYearsAgoValues && Number.isFinite(point.yearsAgo)) {
    return point.yearsAgo.toLocaleString('en-US');
  }

  return formatPopulationTimelineLabel(point);
}

  const chartWidth = 340;
  const chartHeight = 180;
  const padding = { top: 12, right: 18, bottom: 36, left: 56 };
  const plotWidth = Math.max(1, chartWidth - padding.left - padding.right);
  const plotHeight = Math.max(1, chartHeight - padding.top - padding.bottom);
    const ratio =
        ? 1
        : index / Math.max(1, sanitizedPoints.length - 1);
    const x = padding.left + ratio * plotWidth;
    const y = padding.top + (1 - point.population / maxValue) * plotHeight;
    `M ${padding.left.toFixed(2)} ${(padding.top + plotHeight).toFixed(2)}`,
    `L ${(padding.left + plotWidth).toFixed(2)} ${(padding.top + plotHeight).toFixed(2)}`,
  const yTickCount = 4;
  const yTicks = [];
  for (let index = 0; index <= yTickCount; index += 1) {
    const fraction = index / yTickCount;
    const value = Math.round(maxValue * fraction);
    const y = padding.top + (1 - fraction) * plotHeight;
    yTicks.push({ value, y });
  }

  const hasYearValues = sanitizedPoints.some((point) => Number.isFinite(point.year));
  const hasYearsAgoValues = sanitizedPoints.some((point) => Number.isFinite(point.yearsAgo));

  const xAxisLabelIndices = new Set([0, sanitizedPoints.length - 1]);
  if (sanitizedPoints.length >= 3) {
    xAxisLabelIndices.add(Math.round((sanitizedPoints.length - 1) / 2));
  }
  if (sanitizedPoints.length >= 5) {
    xAxisLabelIndices.add(Math.round((sanitizedPoints.length - 1) / 3));
    xAxisLabelIndices.add(Math.round(((sanitizedPoints.length - 1) * 2) / 3));
  }

  const xAxisLabels = Array.from(xAxisLabelIndices)
    .filter((index) => index >= 0 && index < sanitizedPoints.length)
    .sort((a, b) => a - b)
    .map((index) => {
      const point = sanitizedPoints[index];
      const label = formatPopulationTimelineAxisLabel(point, { hasYearValues, hasYearsAgoValues });
      const x = positions[index]?.x ?? padding.left;
      return { label, x };
    })
    .filter((entry) => entry.label);

  const pointData = positions.map((position) => ({
    x: Number(position.x.toFixed(2)),
    y: Number(position.y.toFixed(2)),
    population: position.data.population,
    year: position.data.year,
    yearsAgo: position.data.yearsAgo
  }));

  const xAxisUnitLabel = hasYearValues ? 'Year' : hasYearsAgoValues ? 'Years Ago' : 'Timeline';

      <figure class="structure-details-history-chart__figure" data-population-chart-root>
          data-population-chart="true"
          data-width="${chartWidth}"
          data-height="${chartHeight}"
          data-plot-left="${padding.left}"
          data-plot-top="${padding.top}"
          data-plot-width="${plotWidth}"
          data-plot-height="${plotHeight}"
          data-descriptor="${escapeHtml(descriptor)}"
          data-points="${escapeHtml(JSON.stringify(pointData))}"
          <g class="structure-details-history-chart__grid" aria-hidden="true">
            ${yTicks
              .map(
                (tick) =>
                  `<line x1="${padding.left.toFixed(2)}" y1="${tick.y.toFixed(2)}" x2="${(padding.left + plotWidth).toFixed(2)}" y2="${tick.y.toFixed(2)}"></line>`
              )
              .join('')}
          </g>
          <g class="structure-details-history-chart__axes" aria-hidden="true">
            <line x1="${padding.left.toFixed(2)}" y1="${padding.top.toFixed(2)}" x2="${padding.left.toFixed(2)}" y2="${(padding.top + plotHeight).toFixed(2)}"></line>
            <line x1="${padding.left.toFixed(2)}" y1="${(padding.top + plotHeight).toFixed(2)}" x2="${(padding.left + plotWidth).toFixed(2)}" y2="${(padding.top + plotHeight).toFixed(2)}"></line>
          </g>
          <g class="structure-details-history-chart__y-axis-labels" aria-hidden="true">
            ${yTicks
              .map(
                (tick) =>
                  `<text x="${(padding.left - 8).toFixed(2)}" y="${tick.y.toFixed(2)}">${escapeHtml(tick.value.toLocaleString('en-US'))}</text>`
              )
              .join('')}
          </g>
          <g class="structure-details-history-chart__x-axis-labels" aria-hidden="true">
            ${xAxisLabels
              .map(
                (entry) =>
                  `<text x="${entry.x.toFixed(2)}" y="${(padding.top + plotHeight + 16).toFixed(2)}">${escapeHtml(entry.label)}</text>`
              )
              .join('')}
          </g>
          <text
            class="structure-details-history-chart__axis-caption structure-details-history-chart__axis-caption--y"
            x="${(padding.left - 42).toFixed(2)}"
            y="${(padding.top + plotHeight / 2).toFixed(2)}"
            transform="rotate(-90 ${(padding.left - 42).toFixed(2)} ${(padding.top + plotHeight / 2).toFixed(2)})"
            aria-hidden="true"
          >Population</text>
          <text
            class="structure-details-history-chart__axis-caption structure-details-history-chart__axis-caption--x"
            x="${(padding.left + plotWidth / 2).toFixed(2)}"
            y="${(padding.top + plotHeight + 32).toFixed(2)}"
            aria-hidden="true"
          >${escapeHtml(xAxisUnitLabel)}</text>
          <g class="structure-details-history-chart__marker" data-population-chart-marker hidden aria-hidden="true">
            <line class="structure-details-history-chart__marker-line" x1="0" y1="${padding.top.toFixed(2)}" x2="0" y2="${(padding.top + plotHeight).toFixed(2)}"></line>
            <circle class="structure-details-history-chart__marker-dot" cx="0" cy="0" r="4"></circle>
          </g>
          <rect
            class="structure-details-history-chart__interaction-surface"
            x="${padding.left.toFixed(2)}"
            y="${padding.top.toFixed(2)}"
            width="${plotWidth.toFixed(2)}"
            height="${plotHeight.toFixed(2)}"
            fill="transparent"
            aria-label="Explore population history"
            data-population-chart-overlay
          ></rect>
        <div class="structure-details-history-chart__tooltip" data-population-chart-tooltip aria-hidden="true">
          <div class="structure-details-history-chart__tooltip-label" data-population-chart-tooltip-label></div>
          <div class="structure-details-history-chart__tooltip-value" data-population-chart-tooltip-value></div>
        </div>
function enhanceStructureDetailsHistoryCharts(rootElement) {
  if (!rootElement || typeof rootElement.querySelectorAll !== 'function') {
    return;
  }

  const figures = rootElement.querySelectorAll('[data-population-chart-root]');
  figures.forEach((figure) => {
    if (!figure || figure.dataset.chartEnhanced === 'true') {
      return;
    }

    const svg = figure.querySelector('[data-population-chart="true"]');
    const overlay = figure.querySelector('[data-population-chart-overlay]');
    const marker = figure.querySelector('[data-population-chart-marker]');
    const tooltip = figure.querySelector('[data-population-chart-tooltip]');
    const tooltipLabel = figure.querySelector('[data-population-chart-tooltip-label]');
    const tooltipValue = figure.querySelector('[data-population-chart-tooltip-value]');
    const markerLine = marker?.querySelector('.structure-details-history-chart__marker-line');
    const markerDot = marker?.querySelector('.structure-details-history-chart__marker-dot');

    if (
      !svg ||
      !overlay ||
      !marker ||
      !tooltip ||
      !tooltipLabel ||
      !tooltipValue ||
      !markerLine ||
      !markerDot
    ) {
      return;
    }

    let points;
    try {
      points = JSON.parse(svg.getAttribute('data-points') || '[]');
    } catch (error) {
      points = [];
    }

    if (!Array.isArray(points) || points.length === 0) {
      return;
    }

    const descriptor = svg.getAttribute('data-descriptor') || 'residents';
    const svgWidth = Number.parseFloat(svg.getAttribute('data-width')) || svg.viewBox.baseVal?.width || 0;
    const svgHeight = Number.parseFloat(svg.getAttribute('data-height')) || svg.viewBox.baseVal?.height || 0;
    const plotLeft = Number.parseFloat(svg.getAttribute('data-plot-left')) || 0;
    const plotTop = Number.parseFloat(svg.getAttribute('data-plot-top')) || 0;
    const plotWidth = Number.parseFloat(svg.getAttribute('data-plot-width')) || svgWidth;
    const plotHeight = Number.parseFloat(svg.getAttribute('data-plot-height')) || svgHeight;

    if (!overlay.hasAttribute('tabindex')) {
      overlay.setAttribute('tabindex', '0');
    }

    let activeIndex = points.length - 1;

    const hideTooltip = (options = {}) => {
      const forceHide = options.force === true;
      if (!forceHide && document.activeElement === overlay) {
        return;
      }
      tooltip.classList.remove('is-visible');
      tooltip.setAttribute('aria-hidden', 'true');
      marker.classList.remove('is-active');
      if (!marker.hasAttribute('hidden')) {
        marker.setAttribute('hidden', '');
      }
    };

    const renderAtPoint = (targetPoint, pointerPosition) => {
      if (!targetPoint) {
        return;
      }

      const markerX = targetPoint.x;
      const markerY = targetPoint.y;
      markerLine.setAttribute('x1', markerX.toFixed(2));
      markerLine.setAttribute('x2', markerX.toFixed(2));
      markerDot.setAttribute('cx', markerX.toFixed(2));
      markerDot.setAttribute('cy', markerY.toFixed(2));
      marker.removeAttribute('hidden');
      marker.classList.add('is-active');

      let labelText;
      if (Number.isFinite(targetPoint.year)) {
        labelText = `Year ${targetPoint.year.toLocaleString('en-US')}`;
      } else if (Number.isFinite(targetPoint.yearsAgo)) {
        if (targetPoint.yearsAgo === 0) {
          labelText = 'Current';
        } else if (targetPoint.yearsAgo === 1) {
          labelText = '1 year ago';
        } else {
          labelText = `${targetPoint.yearsAgo.toLocaleString('en-US')} years ago`;
        }
      } else {
        labelText = formatPopulationTimelineLabel(targetPoint);
      }

      tooltipLabel.textContent = labelText;
      tooltipValue.textContent = `${targetPoint.population.toLocaleString('en-US')} ${descriptor}`;

      const figureRect = figure.getBoundingClientRect();
      let pointerX = pointerPosition?.pointerX;
      let pointerY = pointerPosition?.pointerY;

      if (!Number.isFinite(pointerX) || !Number.isFinite(pointerY)) {
        const svgRect = svg.getBoundingClientRect();
        if (svgRect.width > 0 && svgRect.height > 0 && svgWidth > 0 && svgHeight > 0) {
          const ratioX = targetPoint.x / Math.max(svgWidth, 0.0001);
          const ratioY = targetPoint.y / Math.max(svgHeight, 0.0001);
          pointerX = svgRect.left - figureRect.left + ratioX * svgRect.width;
          pointerY = svgRect.top - figureRect.top + ratioY * svgRect.height;
        } else {
          pointerX = figureRect.width / 2;
          pointerY = figureRect.height / 2;
        }
      }

      const margin = 12;
      const tooltipWidth = tooltip.offsetWidth || 0;
      const tooltipHeight = tooltip.offsetHeight || 0;

      let left = pointerX + margin;
      if (left + tooltipWidth > figureRect.width - margin) {
        left = pointerX - tooltipWidth - margin;
      }
      if (left < margin) {
        left = margin;
      }

      let top = pointerY - tooltipHeight - margin;
      if (top < margin) {
        top = pointerY + margin;
      }
      if (top + tooltipHeight > figureRect.height - margin) {
        top = Math.max(margin, figureRect.height - tooltipHeight - margin);
      }

      tooltip.style.left = `${Math.round(left)}px`;
      tooltip.style.top = `${Math.round(top)}px`;
      tooltip.classList.add('is-visible');
      tooltip.setAttribute('aria-hidden', 'false');
    };

    const showPointAtIndex = (index, pointerPosition) => {
      const clampedIndex = Math.max(0, Math.min(points.length - 1, index));
      activeIndex = clampedIndex;
      const targetPoint = points[clampedIndex];
      renderAtPoint(targetPoint, pointerPosition);
    };

    const resolvePointer = (event) => {
      if (!event) {
        return null;
      }
      let clientX = event.clientX;
      let clientY = event.clientY;
      if (event.touches && event.touches.length > 0) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else if (event.changedTouches && event.changedTouches.length > 0) {
        clientX = event.changedTouches[0].clientX;
        clientY = event.changedTouches[0].clientY;
      }
      if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) {
        return null;
      }

      const svgRect = svg.getBoundingClientRect();
      if (svgRect.width <= 0 || svgRect.height <= 0) {
        return null;
      }

      const relativeX = ((clientX - svgRect.left) / svgRect.width) * svgWidth;
      const relativeY = ((clientY - svgRect.top) / svgRect.height) * svgHeight;

      return {
        clientX,
        clientY,
        svgX: clamp(relativeX, 0, svgWidth),
        svgY: clamp(relativeY, 0, svgHeight)
      };
    };

    const updateForEvent = (event) => {
      const pointer = resolvePointer(event);
      if (!pointer) {
        return;
      }

      const normalizedX = clamp(
        (pointer.svgX - plotLeft) / Math.max(plotWidth, 0.0001),
        0,
        1
      );
      const rawIndex = normalizedX * (points.length - 1);
      const index = Math.round(rawIndex);
      const figureRect = figure.getBoundingClientRect();
      showPointAtIndex(index, {
        pointerX: pointer.clientX - figureRect.left,
        pointerY: pointer.clientY - figureRect.top
      });
    };

    const handlePointerMove = (event) => {
      if (event) {
        event.preventDefault();
      }
      updateForEvent(event);
    };

    const handlePointerLeave = () => {
      hideTooltip();
    };

    overlay.addEventListener('pointermove', handlePointerMove);
    overlay.addEventListener('pointerdown', handlePointerMove);
    overlay.addEventListener('pointerup', handlePointerMove);
    overlay.addEventListener('pointerenter', updateForEvent);
    overlay.addEventListener('pointerleave', handlePointerLeave);
    overlay.addEventListener('pointercancel', handlePointerLeave);

    overlay.addEventListener('focus', () => {
      showPointAtIndex(activeIndex);
    });
    overlay.addEventListener('blur', () => {
      hideTooltip({ force: true });
    });
    overlay.addEventListener('keydown', (event) => {
      let handled = false;
      if (event.key === 'ArrowLeft') {
        showPointAtIndex(activeIndex - 1);
        handled = true;
      } else if (event.key === 'ArrowRight') {
        showPointAtIndex(activeIndex + 1);
        handled = true;
      } else if (event.key === 'Home') {
        showPointAtIndex(0);
        handled = true;
      } else if (event.key === 'End') {
        showPointAtIndex(points.length - 1);
        handled = true;
      } else if (event.key === 'Escape') {
        hideTooltip({ force: true });
        if (typeof overlay.blur === 'function') {
          overlay.blur();
        }
        handled = true;
      }
      if (handled) {
        event.preventDefault();
      }
    });

    figure.addEventListener('mouseleave', hideTooltip);

    figure.dataset.chartEnhanced = 'true';
  });
}

    enhanceStructureDetailsHistoryCharts(elements.structureDetailsContent);
