export function attachEvents(elements, deps) {
  const {
    structureContextMenuState,
    hideStructureContextMenu,
    openOptionsScreen,
    closeOptionsScreen,
    hideStructureDetails,
    showLocalViewAt,
    showDwarfholdInterior,
    showStructureDetails,
    hideLocalView,
    adjustLocalMapZoom,
    resetLocalMapZoom,
    closeDwarfholdInterior,
    state,
    refreshOverlayToggleButtons,
    refreshStructureHighlightControls,
    ensureStructureHighlightState,
    drawWorld,
    updateFrequencyDisplay,
    sanitizeFrequencyValue,
    defaultForestFrequency,
    defaultMountainFrequency,
    ensureSeedString,
    getRandomWorldName,
    getSanitisedChronologyFromInputs,
    generateRandomChronology,
    updateChronologyDisplay,
    openDwarfCustomizer,
    closeWorldInfoModal,
    applyMapSizePresetToState,
    getMapSizePreset,
    handleRegenerate,
    changeActiveDwarf,
    randomiseActiveDwarf,
    playSoundEffect,
    soundEffects,
    ensureMusicStarted,
    beginGame,
    updateDwarfTrait,
    setupTraitSliderControl,
    isDwarfCustomizerVisible,
    closeDwarfCustomizer,
    toggleDwarfTest,
    isDwarfTestActive,
    closeDwarfTest,
    structureDetailsState,
    setActiveStructureDetailsTab,
    isOptionsVisible,
    updateWorldInfoSeedDisplay,
    updateWorldInfoSizeDisplay,
    updateWorldInfoGenerationTypeDisplay,
    setWorldGenerationType,
    toggleMapEditor,
    closeMapEditor,
    setMapEditorTerrainKey,
    setMapEditorStructureKey,
    setMapEditorApplyTerrain,
    setMapEditorApplyStructure,
    setMapEditorBrushSize,
    clearMapEditorStructure
  } = deps;

  const baseRefreshOverlayToggleButtons = refreshOverlayToggleButtons;
  const baseDrawWorld = drawWorld;

  let regionLabelOverlay = null;
  let worldInfoReturnTrigger = null;

  const restoreWorldInfoTriggerFocus = () => {
    if (worldInfoReturnTrigger && typeof worldInfoReturnTrigger.focus === 'function') {
      worldInfoReturnTrigger.focus();
    }
    worldInfoReturnTrigger = null;
  };

  const prepareWorldInfoModal = () => {
    if (!elements.worldInfoModal || !state) {
      return;
    }

    if (!state.worldChronology) {
      state.worldChronology = generateRandomChronology();
    }

    if (elements.worldMapSizeSelect && state.settings?.mapSize) {
      elements.worldMapSizeSelect.value = state.settings.mapSize;
    }

    if (elements.worldInfoGenerationTypeSelect && state.settings?.worldGenerationType) {
      elements.worldInfoGenerationTypeSelect.value = state.settings.worldGenerationType;
    }

    let seedString = state.settings?.seedString;
    if (!seedString) {
      seedString = ensureSeedString();
      if (state.settings) {
        state.settings.seedString = seedString;
      }
    }
    if (elements.worldSeedInput) {
      elements.worldSeedInput.value = seedString;
    }
    if (elements.seedInput) {
      elements.seedInput.value = seedString;
    }
    updateWorldInfoSeedDisplay(seedString);

    if (elements.worldNameInput) {
      let worldName = typeof state.worldName === 'string' ? state.worldName.trim() : '';
      if (!worldName) {
        worldName = getRandomWorldName(state.worldName);
        state.worldName = worldName;
      }
      elements.worldNameInput.value = worldName;
    }

    if (elements.worldYearInput && Number.isFinite(state.worldChronology?.year)) {
      elements.worldYearInput.value = state.worldChronology.year.toString();
    }

    if (elements.worldAgeInput && Number.isFinite(state.worldChronology?.age)) {
      elements.worldAgeInput.value = state.worldChronology.age.toString();
    }

    updateWorldInfoSizeDisplay();
    updateWorldInfoGenerationTypeDisplay();
    updateChronologyDisplay();
  };

  const focusWorldInfoInitialField = () => {
    const focusCandidates = [
      elements.worldNameInput,
      elements.worldYearInput,
      elements.worldMapSizeSelect,
      elements.worldInfoModal?.querySelector('input, select, button, textarea')
    ];

    for (let index = 0; index < focusCandidates.length; index += 1) {
      const candidate = focusCandidates[index];
      if (candidate && typeof candidate.focus === 'function') {
        candidate.focus();
        break;
      }
    }
  };

  const openWorldInfoScreen = ({ trigger } = {}) => {
    if (!elements.worldInfoModal) {
      return;
    }

    worldInfoReturnTrigger = trigger || null;

    if (isOptionsVisible()) {
      closeOptionsScreen();
    }

    prepareWorldInfoModal();

    if (elements.titleScreen) {
      elements.titleScreen.classList.add('hidden');
      if (elements.titleScreen.hasAttribute('aria-hidden')) {
        elements.titleScreen.setAttribute('aria-hidden', 'true');
      }
    }

    elements.worldInfoModal.classList.remove('hidden');
    elements.worldInfoModal.setAttribute('aria-hidden', 'false');

    if (elements.worldInfoModal instanceof HTMLElement) {
      elements.worldInfoModal.scrollTop = 0;
    }

    focusWorldInfoInitialField();
  };

  const getTileSize = () => {
    const explicitSize = Number.isFinite(deps?.drawSize) ? deps.drawSize : null;
    if (explicitSize) {
      return explicitSize;
    }
    if (elements?.canvas && elements.canvas.width && state?.currentWorld) {
      const dimensions = getWorldDimensions(state.currentWorld);
      if (dimensions && dimensions.width) {
        return elements.canvas.width / dimensions.width;
      }
    }
    return 32;
  };

  const ensureRegionLabelOverlay = () => {
    if (!elements.canvasWrapper) {
      regionLabelOverlay = null;
      if (elements) {
        elements.regionNameOverlay = null;
      }
      return null;
    }

    if (regionLabelOverlay && regionLabelOverlay.parentElement !== elements.canvasWrapper) {
      regionLabelOverlay = null;
    }

    if (!regionLabelOverlay) {
      regionLabelOverlay = document.createElement('div');
      regionLabelOverlay.id = 'region-name-overlay';
      regionLabelOverlay.className = 'region-name-overlay';
      regionLabelOverlay.setAttribute('aria-hidden', 'true');
      if (elements.mapTooltip && elements.canvasWrapper.contains(elements.mapTooltip)) {
        elements.canvasWrapper.insertBefore(regionLabelOverlay, elements.mapTooltip);
      } else {
        elements.canvasWrapper.appendChild(regionLabelOverlay);
      }
      if (elements) {
        elements.regionNameOverlay = regionLabelOverlay;
        if (elements.canvas && elements.canvas.style.transform) {
          regionLabelOverlay.style.transform = elements.canvas.style.transform;
        }
      }
    }

    return regionLabelOverlay;
  };

  const clearRegionLabelOverlay = () => {
    if (!regionLabelOverlay) {
      return;
    }
    regionLabelOverlay.innerHTML = '';
    regionLabelOverlay.classList.remove('region-name-overlay--visible');
    regionLabelOverlay.style.width = '';
    regionLabelOverlay.style.height = '';
  };

  const getWorldDimensions = (world) => {
    if (!world) {
      return null;
    }
    const width = Number.isFinite(world.width) ? world.width : null;
    const height = Number.isFinite(world.height) ? world.height : null;
    if (width && height) {
      return { width, height };
    }

    const tiles = Array.isArray(world.tiles) ? world.tiles : null;
    if (!tiles || tiles.length === 0) {
      return null;
    }

    let inferredWidth = 0;
    for (let i = 0; i < tiles.length; i += 1) {
      const row = tiles[i];
      if (Array.isArray(row) && row.length > inferredWidth) {
        inferredWidth = row.length;
      }
    }

    if (!inferredWidth) {
      return null;
    }

    return { width: inferredWidth, height: tiles.length };
  };

  const getRegionNameFromTile = (tile) => {
    if (!tile) {
      return '';
    }

    const candidateFields = [
      'areaName',
      'regionName',
      'regionLabel',
      'namedRegion',
      'namedArea',
      'areaDisplayName'
    ];

    for (let i = 0; i < candidateFields.length; i += 1) {
      const field = candidateFields[i];
      const value = tile[field];
      if (typeof value === 'string') {
        const trimmed = value.trim();
        if (trimmed) {
          return trimmed;
        }
      }
    }

    return '';
  };

  const collectRegionNameAreas = (world) => {
    const tiles = Array.isArray(world?.tiles) ? world.tiles : null;
    if (!tiles || tiles.length === 0) {
      return [];
    }

    const regionMap = new Map();

    for (let y = 0; y < tiles.length; y += 1) {
      const row = tiles[y];
      if (!Array.isArray(row)) {
        continue;
      }
      for (let x = 0; x < row.length; x += 1) {
        const tile = row[x];
        const name = getRegionNameFromTile(tile);
        if (!name) {
          continue;
        }

        const key = name.toLowerCase();
        let region = regionMap.get(key);
        if (!region) {
          region = {
            key,
            name,
            minX: x,
            maxX: x,
            minY: y,
            maxY: y,
            count: 0
          };
          regionMap.set(key, region);
        } else {
          if (name.length > region.name.length) {
            region.name = name;
          }
          if (x < region.minX) {
            region.minX = x;
          }
          if (x > region.maxX) {
            region.maxX = x;
          }
          if (y < region.minY) {
            region.minY = y;
          }
          if (y > region.maxY) {
            region.maxY = y;
          }
        }

        region.count += 1;
      }
    }

    const regions = [];
    regionMap.forEach((region) => {
      if (region.count <= 0) {
        return;
      }
      const spanX = region.maxX - region.minX + 1;
      const spanY = region.maxY - region.minY + 1;
      region.centerX = region.minX + spanX / 2;
      region.centerY = region.minY + spanY / 2;
      region.spanX = spanX;
      region.spanY = spanY;
      regions.push(region);
    });

    return regions;
  };

  const renderRegionNameLabels = () => {
    const overlay = ensureRegionLabelOverlay();
    if (!overlay) {
      return;
    }

    if (!state || !state.ui || !state.currentWorld || !state.ui.showRegionNames) {
      clearRegionLabelOverlay();
      return;
    }

    const world = state.currentWorld;
    const dimensions = getWorldDimensions(world);
    if (!dimensions || !dimensions.width || !dimensions.height) {
      clearRegionLabelOverlay();
      return;
    }

    const regions = collectRegionNameAreas(world);
    if (!Array.isArray(regions) || regions.length === 0) {
      clearRegionLabelOverlay();
      return;
    }

    regions.sort((a, b) => b.count - a.count);

    overlay.innerHTML = '';
    const tileSize = getTileSize();
    const pixelWidth = dimensions.width * tileSize;
    const pixelHeight = dimensions.height * tileSize;

    overlay.style.width = `${pixelWidth}px`;
    overlay.style.height = `${pixelHeight}px`;
    const fragment = document.createDocumentFragment();

    regions.forEach((region) => {
      const label = document.createElement('div');
      label.className = 'region-name-label';
      label.textContent = region.name;
      const pixelLeft = region.centerX * tileSize;
      const pixelTop = region.centerY * tileSize;
      label.style.left = `${pixelLeft}px`;
      label.style.top = `${pixelTop}px`;

      const span = Math.max(region.spanX, region.spanY);
      if (Number.isFinite(span) && span > 0) {
        const estimatedSize = Math.min(Math.max(span * tileSize * 0.22, 16), 72);
        label.style.fontSize = `${estimatedSize}px`;
      }
      fragment.appendChild(label);
    });

    overlay.appendChild(fragment);
    overlay.classList.add('region-name-overlay--visible');
  };

  const updateRegionNameToggleButton = () => {
    if (!elements.regionNameToggle) {
      return;
    }
    const showRegionNames = Boolean(state?.ui?.showRegionNames);
    elements.regionNameToggle.setAttribute('aria-pressed', showRegionNames ? 'true' : 'false');
    elements.regionNameToggle.textContent = showRegionNames ? 'Hide Region Names' : 'Show Region Names';
  };

  const refreshOverlayToggleButtonsWithRegionNames = () => {
    baseRefreshOverlayToggleButtons();
    updateRegionNameToggleButton();
    renderRegionNameLabels();
  };

  const drawWorldWithRegionLabels = (...args) => {
    baseDrawWorld(...args);
    renderRegionNameLabels();
  };

  if (deps && typeof deps === 'object') {
    deps.drawWorld = drawWorldWithRegionLabels;
  }

  const dismissContextMenuOnPointerDown = (event) => {
    if (!structureContextMenuState.visible) {
      return;
    }
    if (event.button !== undefined && event.button !== 0) {
      return;
    }
    const menu = elements.structureContextMenu;
    if (menu && menu.contains(event.target)) {
      return;
    }
    hideStructureContextMenu();
  };

  const dismissContextMenuOnKeyDown = (event) => {
    if (!structureContextMenuState.visible) {
      return;
    }
    if (event.key === 'Escape' || event.key === 'Esc') {
      hideStructureContextMenu();
    }
  };

  function closeStructureHighlightMenu({ returnFocus = false } = {}) {
    const highlightState = ensureStructureHighlightState();
    if (!highlightState.menuOpen) {
      return;
    }
    highlightState.menuOpen = false;
    refreshStructureHighlightControls();
    if (returnFocus && elements.structureHighlightToggle) {
      const toggle = elements.structureHighlightToggle;
      if (typeof toggle.focus === 'function') {
        toggle.focus();
      }
    }
  }

  const dismissContextMenuOnScroll = () => {
    if (structureContextMenuState.visible) {
      hideStructureContextMenu();
    }
    closeStructureHighlightMenu();
  };

  const handleStructureHighlightPointerDown = (event) => {
    const highlightState = ensureStructureHighlightState();
    if (!highlightState.menuOpen) {
      return;
    }
    const toggle = elements.structureHighlightToggle;
    const menu = elements.structureHighlightMenu;
    if ((toggle && toggle.contains(event.target)) || (menu && menu.contains(event.target))) {
      return;
    }
    closeStructureHighlightMenu();
  };

  const handleStructureHighlightKeyDown = (event) => {
    if (event.key !== 'Escape' && event.key !== 'Esc') {
      return;
    }
    const highlightState = ensureStructureHighlightState();
    if (!highlightState.menuOpen) {
      return;
    }
    closeStructureHighlightMenu({ returnFocus: true });
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('pointerdown', dismissContextMenuOnPointerDown, true);
    document.addEventListener('pointerdown', handleStructureHighlightPointerDown, true);
    document.addEventListener('keydown', dismissContextMenuOnKeyDown, true);
    document.addEventListener('keydown', handleStructureHighlightKeyDown, true);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        hideStructureContextMenu();
        closeStructureHighlightMenu();
      }
    });
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', dismissContextMenuOnScroll, true);
    window.addEventListener('blur', dismissContextMenuOnScroll);
  }

  if (elements.canvasWrapper) {
    elements.canvasWrapper.addEventListener('focusout', () => {
      if (structureContextMenuState.visible) {
        hideStructureContextMenu();
      }
    });
  }

  if (elements.startButton) {
    elements.startButton.addEventListener('click', () => {
      openWorldInfoScreen({ trigger: elements.startButton });
    });
  }

  if (elements.optionsButton) {
    elements.optionsButton.addEventListener('click', () => {
      openOptionsScreen('title');
    });
  }

  if (elements.inGameOptions) {
    elements.inGameOptions.addEventListener('click', () => {
      openOptionsScreen('game');
    });
  }

  if (elements.closeOptions) {
    elements.closeOptions.addEventListener('click', () => {
      closeOptionsScreen();
    });
  }

  if (elements.structureDetailsClose) {
    elements.structureDetailsClose.addEventListener('click', () => {
      hideStructureDetails({ returnFocus: true });
    });
  }

  if (Array.isArray(elements.structureDetailsTabs) && elements.structureDetailsTabs.length > 0) {
    elements.structureDetailsTabs.forEach((tab) => {
      if (!tab) {
        return;
      }
      tab.addEventListener('click', () => {
        if (!structureDetailsState.visible) {
          return;
        }
        setActiveStructureDetailsTab(tab.getAttribute('data-tab-id'));
      });
    });
  }

  if (elements.structureHighlightToggle) {
    elements.structureHighlightToggle.addEventListener('click', () => {
      const highlightState = ensureStructureHighlightState();
      highlightState.menuOpen = !highlightState.menuOpen;
      refreshStructureHighlightControls();
      if (
        highlightState.menuOpen &&
        elements.structureHighlightMenu &&
        typeof elements.structureHighlightMenu.focus === 'function'
      ) {
        elements.structureHighlightMenu.focus({ preventScroll: true });
      }
    });
  }

  if (elements.structureHighlightMenu) {
    elements.structureHighlightMenu.addEventListener('change', (event) => {
      const target = event.target;
      if (!target || !target.matches("input[type='checkbox'][data-highlight-type]")) {
        return;
      }
      const type = target.getAttribute('data-highlight-type');
      if (!type) {
        return;
      }
      const highlightState = ensureStructureHighlightState();
      if (!Object.prototype.hasOwnProperty.call(highlightState, type)) {
        return;
      }
      highlightState[type] = target.checked;
      refreshStructureHighlightControls();
      if (state.currentWorld) {
        drawWorldWithRegionLabels(state.currentWorld, { preserveView: true });
      }
    });
  }

  if (elements.mapEditorToggle) {
    elements.mapEditorToggle.addEventListener('click', () => {
      const enabled = toggleMapEditor();
      if (enabled && elements.mapEditorTerrainInput && typeof elements.mapEditorTerrainInput.focus === 'function') {
        elements.mapEditorTerrainInput.focus({ preventScroll: true });
        elements.mapEditorTerrainInput.select?.();
      }
    });
  }

  if (elements.mapEditorClose) {
    elements.mapEditorClose.addEventListener('click', () => {
      closeMapEditor({ returnFocus: true });
    });
  }

  const handleMapEditorTerrainChange = (event) => {
    setMapEditorTerrainKey(event.target.value);
  };

  if (elements.mapEditorTerrainInput) {
    elements.mapEditorTerrainInput.addEventListener('change', handleMapEditorTerrainChange);
    elements.mapEditorTerrainInput.addEventListener('blur', handleMapEditorTerrainChange);
    elements.mapEditorTerrainInput.addEventListener('input', () => {
      setMapEditorTerrainKey(elements.mapEditorTerrainInput.value);
    });
  }

  const handleMapEditorStructureChange = (event) => {
    setMapEditorStructureKey(event.target.value);
  };

  if (elements.mapEditorStructureInput) {
    elements.mapEditorStructureInput.addEventListener('change', handleMapEditorStructureChange);
    elements.mapEditorStructureInput.addEventListener('blur', handleMapEditorStructureChange);
    elements.mapEditorStructureInput.addEventListener('input', () => {
      setMapEditorStructureKey(elements.mapEditorStructureInput.value);
    });
  }

  if (elements.mapEditorApplyTerrain) {
    elements.mapEditorApplyTerrain.addEventListener('change', (event) => {
      setMapEditorApplyTerrain(event.target.checked);
    });
  }

  if (elements.mapEditorApplyStructure) {
    elements.mapEditorApplyStructure.addEventListener('change', (event) => {
      setMapEditorApplyStructure(event.target.checked);
    });
  }

  if (elements.mapEditorBrushSizeInput) {
    elements.mapEditorBrushSizeInput.addEventListener('input', (event) => {
      setMapEditorBrushSize(event.target.value);
    });
    elements.mapEditorBrushSizeInput.addEventListener('change', (event) => {
      setMapEditorBrushSize(event.target.value);
    });
  }

  if (elements.mapEditorClearStructure) {
    elements.mapEditorClearStructure.addEventListener('click', () => {
      clearMapEditorStructure();
    });
  }

  const dwarfholdStructureKeys = new Set([
    'DWARFHOLD',
    'GREAT_DWARFHOLD',
    'ABANDONED_DWARFHOLD',
    'DARK_DWARFHOLD',
    'DARKDWARFHOLD',
    'HILLHOLD'
  ]);
  const isDwarfholdStructureTile = (tile) => {
    if (!tile) {
      return false;
    }
    if (typeof tile.structure === 'string' && dwarfholdStructureKeys.has(tile.structure)) {
      return true;
    }
    const rawType = tile.structureDetails?.type;
    if (typeof rawType === 'string' && dwarfholdStructureKeys.has(rawType.toUpperCase())) {
      return true;
    }
    if (typeof tile.structureName === 'string') {
      const upperName = tile.structureName.toUpperCase();
      for (const key of dwarfholdStructureKeys) {
        if (upperName.includes(key)) {
          return true;
        }
      }
    }
    return false;
  };

  const getWorldTileAt = (x, y) => {
    const world = state.currentWorld;
    if (!world || !Array.isArray(world.tiles)) {
      return null;
    }
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      return null;
    }
    const row = world.tiles[y];
    if (!Array.isArray(row)) {
      return null;
    }
    return row[x] || null;
  };

  const enrichWithDwarfholdDetails = (tile, x, y) => {
    if (!tile) {
      return null;
    }
    if (tile.structureDetails && Object.keys(tile.structureDetails).length > 0) {
      return tile;
    }

    if (!isDwarfholdStructureTile(tile)) {
      return tile;
    }

    const world = state.currentWorld;
    if (!world || !Array.isArray(world.dwarfholds)) {
      return tile;
    }

    const match = world.dwarfholds.find((hold) => hold && hold.x === x && hold.y === y);
    if (!match) {
      return tile;
    }

    const { x: holdX, y: holdY, ...details } = match;
    const mergedDetails = { ...(tile.structureDetails || {}), ...details };
    const resolvedName = mergedDetails.name || tile.structureName || tile.areaName;

    tile.structureDetails = mergedDetails;
    if (resolvedName) {
      tile.structureName = resolvedName;
    }

    return tile;
  };

  const resolveTileForDetails = (tile, tileX, tileY) => {
    const worldTile = getWorldTileAt(tileX, tileY);
    const baseTile = worldTile || tile || null;
    if (!baseTile) {
      return null;
    }
    return enrichWithDwarfholdDetails(baseTile, tileX, tileY);
  };

  if (elements.structureContextMenuBegin) {
    elements.structureContextMenuBegin.addEventListener('click', () => {
      const { tile, tileX, tileY } = structureContextMenuState;
      hideStructureContextMenu();
      if (!Number.isInteger(tileX) || !Number.isInteger(tileY)) {
        return;
      }
      const resolvedTile = resolveTileForDetails(tile, tileX, tileY);
      if (isDwarfholdStructureTile(resolvedTile)) {
        showDwarfholdInterior(resolvedTile, tileX, tileY);
      } else {
        showLocalViewAt(tileX, tileY);
      }
    });
  }

  if (elements.structureContextMenuMoreInfo) {
    elements.structureContextMenuMoreInfo.addEventListener('click', () => {
      const { tile, tileX, tileY } = structureContextMenuState;
      const resolvedTile = resolveTileForDetails(tile, tileX, tileY);
      hideStructureContextMenu();
      if (resolvedTile && resolvedTile.structureName) {
        showStructureDetails(resolvedTile, { tileX, tileY });
      }
    });
  }

  if (elements.localMapClose) {
    elements.localMapClose.addEventListener('click', () => {
      hideLocalView({ returnFocus: true });
    });
  }

  if (elements.localMapZoomIn) {
    elements.localMapZoomIn.addEventListener('click', () => {
      adjustLocalMapZoom('in');
    });
  }

  if (elements.localMapZoomOut) {
    elements.localMapZoomOut.addEventListener('click', () => {
      adjustLocalMapZoom('out');
    });
  }

  if (elements.localMapZoomReset) {
    elements.localMapZoomReset.addEventListener('click', () => {
      resetLocalMapZoom();
    });
  }

  if (elements.localMapCanvas) {
    elements.localMapCanvas.addEventListener(
      'wheel',
      (event) => {
        if (!state.localView || !state.localView.active) {
          return;
        }
        if (event.ctrlKey || event.metaKey) {
          return;
        }
        event.preventDefault();
        if (event.deltaY < 0) {
          adjustLocalMapZoom('in');
        } else if (event.deltaY > 0) {
          adjustLocalMapZoom('out');
        }
      },
      { passive: false }
    );
  }

  if (elements.dwarfholdExit) {
    elements.dwarfholdExit.addEventListener('click', () => {
      closeDwarfholdInterior({ returnFocus: true });
    });
  }

  if (elements.politicalBordersToggle) {
    elements.politicalBordersToggle.addEventListener('click', () => {
      state.ui.showPoliticalBorders = !state.ui.showPoliticalBorders;
      refreshOverlayToggleButtonsWithRegionNames();
      if (state.currentWorld) {
        drawWorldWithRegionLabels(state.currentWorld);
      }
    });
  }

  if (elements.politicalInfluenceToggle) {
    elements.politicalInfluenceToggle.addEventListener('click', () => {
      state.ui.showPoliticalInfluence = !state.ui.showPoliticalInfluence;
      refreshOverlayToggleButtonsWithRegionNames();
      if (state.currentWorld) {
        drawWorldWithRegionLabels(state.currentWorld);
      }
    });
  }

  if (elements.elevationToggle) {
    elements.elevationToggle.addEventListener('click', () => {
      state.ui.showElevation = !state.ui.showElevation;
      refreshOverlayToggleButtonsWithRegionNames();
      if (state.currentWorld) {
        drawWorldWithRegionLabels(state.currentWorld);
      }
    });
  }

  if (elements.biomeToggle) {
    elements.biomeToggle.addEventListener('click', () => {
      state.ui.showBiomes = !state.ui.showBiomes;
      refreshOverlayToggleButtonsWithRegionNames();
      if (state.currentWorld) {
        drawWorldWithRegionLabels(state.currentWorld);
      }
    });
  }

  if (elements.temperatureToggle) {
    elements.temperatureToggle.addEventListener('click', () => {
      state.ui.showTemperature = !state.ui.showTemperature;
      refreshOverlayToggleButtonsWithRegionNames();
      if (state.currentWorld) {
        drawWorldWithRegionLabels(state.currentWorld);
      }
    });
  }

  if (elements.locationLabelToggle) {
    elements.locationLabelToggle.addEventListener('click', () => {
      state.ui.showLocationLabels = !state.ui.showLocationLabels;
      refreshOverlayToggleButtonsWithRegionNames();
      if (state.currentWorld) {
        drawWorldWithRegionLabels(state.currentWorld);
      }
    });
  }

  if (elements.regionNameToggle) {
    elements.regionNameToggle.addEventListener('click', () => {
      const currentState = Boolean(state.ui.showRegionNames);
      state.ui.showRegionNames = !currentState;
      refreshOverlayToggleButtonsWithRegionNames();
      if (state.currentWorld) {
        drawWorldWithRegionLabels(state.currentWorld);
      } else {
        renderRegionNameLabels();
      }
    });
  }

  if (elements.mapSizeSelect) {
    elements.mapSizeSelect.addEventListener('change', (event) => {
      const preset = getMapSizePreset(event.target.value);
      applyMapSizePresetToState(preset);
      updateWorldInfoSizeDisplay();
      if (elements.worldMapSizeSelect) {
        elements.worldMapSizeSelect.value = state.settings.mapSize;
      }
    });
  }

  if (elements.worldGenerationTypeSelect) {
    elements.worldGenerationTypeSelect.addEventListener('change', (event) => {
      setWorldGenerationType(event.target.value);
      updateWorldInfoGenerationTypeDisplay();
      if (elements.worldInfoGenerationTypeSelect) {
        elements.worldInfoGenerationTypeSelect.value = state.settings.worldGenerationType;
      }
    });
  }

  const sliderInputHandlers = [
    {
      input: elements.forestFrequencyInput,
      valueElement: elements.forestFrequencyValue,
      defaultValue: defaultForestFrequency,
      key: 'forestFrequency'
    },
    {
      input: elements.mountainFrequencyInput,
      valueElement: elements.mountainFrequencyValue,
      defaultValue: defaultMountainFrequency,
      key: 'mountainFrequency'
    },
    {
      input: elements.riverFrequencyInput,
      valueElement: elements.riverFrequencyValue,
      defaultValue: 50,
      key: 'riverFrequency'
    },
    {
      input: elements.humanSettlementFrequencyInput,
      valueElement: elements.humanSettlementFrequencyValue,
      defaultValue: 50,
      key: 'humanSettlementFrequency'
    },
    {
      input: elements.dwarfSettlementFrequencyInput,
      valueElement: elements.dwarfSettlementFrequencyValue,
      defaultValue: 50,
      key: 'dwarfSettlementFrequency'
    },
    {
      input: elements.woodElfSettlementFrequencyInput,
      valueElement: elements.woodElfSettlementFrequencyValue,
      defaultValue: 50,
      key: 'woodElfSettlementFrequency'
    },
    {
      input: elements.lizardmenSettlementFrequencyInput,
      valueElement: elements.lizardmenSettlementFrequencyValue,
      defaultValue: 50,
      key: 'lizardmenSettlementFrequency'
    }
  ];

  sliderInputHandlers.forEach(({ input, valueElement, defaultValue, key }) => {
    if (!input) {
      return;
    }
    input.addEventListener('input', (event) => {
      const rawValue = Number.parseInt(event.target.value, 10);
      const sanitisedValue = sanitizeFrequencyValue(
        Number.isNaN(rawValue) ? state.settings[key] : rawValue,
        defaultValue
      );
      state.settings[key] = sanitisedValue;
      updateFrequencyDisplay(valueElement, sanitisedValue);
    });
  });

  if (elements.optionsForm) {
    elements.optionsForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const mapSizePreset = getMapSizePreset(elements.mapSizeSelect ? elements.mapSizeSelect.value : state.settings.mapSize);
      applyMapSizePresetToState(mapSizePreset);
      updateWorldInfoSizeDisplay();
      if (elements.worldMapSizeSelect) {
        elements.worldMapSizeSelect.value = state.settings.mapSize;
      }
      const selectedGenerationType = elements.worldGenerationTypeSelect
        ? elements.worldGenerationTypeSelect.value
        : state.settings.worldGenerationType;
      setWorldGenerationType(selectedGenerationType);
      updateWorldInfoGenerationTypeDisplay();
      const seedString = (elements.seedInput.value || '').trim();
      state.settings.seedString = seedString;
      updateWorldInfoSeedDisplay(seedString);
      closeOptionsScreen();
    });
  }

  if (elements.worldInfoForm) {
    elements.worldInfoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const selectedPreset = getMapSizePreset(elements.worldMapSizeSelect?.value || state.settings.mapSize);
      applyMapSizePresetToState(selectedPreset);
      if (elements.mapSizeSelect) {
        elements.mapSizeSelect.value = state.settings.mapSize;
      }
      updateWorldInfoSizeDisplay();
      const selectedGenerationType = elements.worldInfoGenerationTypeSelect
        ? elements.worldInfoGenerationTypeSelect.value
        : state.settings.worldGenerationType;
      setWorldGenerationType(selectedGenerationType);
      if (elements.worldSeedInput) {
        state.settings.seedString = elements.worldSeedInput.value.trim();
      }
      let finalSeed = state.settings.seedString;
      if (!finalSeed) {
        finalSeed = ensureSeedString();
        if (elements.worldSeedInput) {
          elements.worldSeedInput.value = finalSeed;
        }
      }
      state.settings.lastSeedString = finalSeed;
      if (elements.seedInput) {
        elements.seedInput.value = finalSeed;
      }
      updateWorldInfoSeedDisplay(finalSeed);
      const submittedName = elements.worldNameInput ? elements.worldNameInput.value.trim() : '';
      state.worldName = submittedName || getRandomWorldName(state.worldName);
      const submittedChronology = getSanitisedChronologyFromInputs();
      if (submittedChronology) {
        state.worldChronology = submittedChronology;
      } else {
        state.worldChronology = generateRandomChronology();
        if (elements.worldYearInput) {
          elements.worldYearInput.value = state.worldChronology.year.toString();
        }
        if (elements.worldAgeInput) {
          elements.worldAgeInput.value = state.worldChronology.age.toString();
        }
      }
      updateChronologyDisplay();
      worldInfoReturnTrigger = null;
      openDwarfCustomizer();
    });
  }

  if (elements.worldInfoCancel) {
    elements.worldInfoCancel.addEventListener('click', () => {
      closeWorldInfoModal({ returnFocus: true });
      restoreWorldInfoTriggerFocus();
    });
  }

  if (elements.worldYearInput) {
    elements.worldYearInput.addEventListener('input', updateChronologyDisplay);
  }

  if (elements.worldAgeInput) {
    elements.worldAgeInput.addEventListener('input', updateChronologyDisplay);
  }

  if (elements.worldChronologyRandom) {
    elements.worldChronologyRandom.addEventListener('click', () => {
      const newChronology = generateRandomChronology();
      state.worldChronology = newChronology;
      if (elements.worldYearInput) {
        elements.worldYearInput.value = newChronology.year.toString();
        elements.worldYearInput.focus();
        elements.worldYearInput.select();
      }
      if (elements.worldAgeInput) {
        elements.worldAgeInput.value = newChronology.age.toString();
      }
      updateChronologyDisplay();
    });
  }

  if (elements.worldNameRandom) {
    elements.worldNameRandom.addEventListener('click', () => {
      const newName = getRandomWorldName(state.worldName);
      state.worldName = newName;
      if (elements.worldNameInput) {
        elements.worldNameInput.value = newName;
        elements.worldNameInput.focus();
        elements.worldNameInput.select();
      }
    });
  }

  if (elements.worldMapSizeSelect) {
    elements.worldMapSizeSelect.addEventListener('change', (event) => {
      const preset = getMapSizePreset(event.target.value);
      applyMapSizePresetToState(preset);
      if (elements.mapSizeSelect) {
        elements.mapSizeSelect.value = state.settings.mapSize;
      }
      updateWorldInfoSizeDisplay();
    });
  }

  if (elements.worldInfoGenerationTypeSelect) {
    elements.worldInfoGenerationTypeSelect.addEventListener('change', (event) => {
      setWorldGenerationType(event.target.value);
      if (elements.worldGenerationTypeSelect) {
        elements.worldGenerationTypeSelect.value = state.settings.worldGenerationType;
      }
    });
  }

  if (elements.worldSeedInput) {
    elements.worldSeedInput.addEventListener('input', (event) => {
      const newValue = event.target.value;
      state.settings.seedString = newValue.trim();
      updateWorldInfoSeedDisplay(newValue);
      if (elements.seedInput && elements.seedInput !== event.target) {
        elements.seedInput.value = newValue;
      }
    });
  }

  if (elements.regenerate) {
    elements.regenerate.addEventListener('click', handleRegenerate);
  }

  if (elements.dwarfPrev) {
    elements.dwarfPrev.addEventListener('click', () => {
      changeActiveDwarf(-1);
    });
  }

  if (elements.dwarfNext) {
    elements.dwarfNext.addEventListener('click', () => {
      changeActiveDwarf(1);
    });
  }

  if (elements.dwarfRandomise) {
    elements.dwarfRandomise.addEventListener('click', () => {
      randomiseActiveDwarf();
      playSoundEffect(soundEffects.randomiseClick);
      elements.dwarfRandomise.classList.add('randomise-button__dice--rolled');
    });
  }

  if (elements.dwarfBack) {
    elements.dwarfBack.addEventListener('click', () => {
      closeDwarfCustomizer({ returnFocus: true });
    });
  }

  if (elements.dwarfCustomizerForm) {
    elements.dwarfCustomizerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      closeDwarfTest();
      beginGame();
      ensureMusicStarted();
    });
  }

  if (elements.dwarfTestButton) {
    elements.dwarfTestButton.addEventListener('click', () => {
      toggleDwarfTest('overworld', { trigger: elements.dwarfTestButton });
    });
  }

  if (elements.dwarfTestDungeonButton) {
    elements.dwarfTestDungeonButton.addEventListener('click', () => {
      toggleDwarfTest('dungeon', { trigger: elements.dwarfTestDungeonButton });
    });
  }

  if (elements.dwarfNameInput) {
    elements.dwarfNameInput.addEventListener('input', (event) => {
      updateDwarfTrait('name', event.target.value);
    });
    elements.dwarfNameInput.addEventListener('blur', (event) => {
      const trimmed = event.target.value.trim();
      if (trimmed !== event.target.value) {
        event.target.value = trimmed;
      }
      updateDwarfTrait('name', trimmed);
    });
  }

  if (elements.dwarfGenderButtons) {
    elements.dwarfGenderButtons.addEventListener('click', (event) => {
      const button = event.target.closest('[data-gender-value]');
      if (!button || !elements.dwarfGenderButtons.contains(button)) {
        return;
      }
      const { genderValue } = button.dataset;
      if (!genderValue) {
        return;
      }
      updateDwarfTrait('gender', genderValue);
    });

    elements.dwarfGenderButtons.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        return;
      }
      event.preventDefault();
      const buttons = Array.from(elements.dwarfGenderButtons.querySelectorAll('[data-gender-value]'));
      if (buttons.length === 0) {
        return;
      }
      const currentIndex = buttons.findIndex((button) => button.classList.contains('active'));
      const direction = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;
      const nextIndex = currentIndex === -1 ? 0 : (currentIndex + direction + buttons.length) % buttons.length;
      const nextButton = buttons[nextIndex];
      if (!nextButton) {
        return;
      }
      nextButton.focus();
      const { genderValue } = nextButton.dataset;
      if (genderValue) {
        updateDwarfTrait('gender', genderValue);
      }
    });
  }

  if (elements.dwarfClanSelect) {
    elements.dwarfClanSelect.addEventListener('change', (event) => {
      updateDwarfTrait('clan', event.target.value);
    });
  }

  if (elements.dwarfProfessionSelect) {
    elements.dwarfProfessionSelect.addEventListener('change', (event) => {
      updateDwarfTrait('profession', event.target.value);
    });
  }

  setupTraitSliderControl('skin', elements.dwarfSkinSlider, elements.dwarfSkinSliderValue);
  setupTraitSliderControl('eyes', elements.dwarfEyeSlider, elements.dwarfEyeSliderValue);
  setupTraitSliderControl('hairStyle', elements.dwarfHairStyleSlider, elements.dwarfHairStyleSliderValue);
  setupTraitSliderControl('hair', elements.dwarfHairSlider, elements.dwarfHairSliderValue);
  setupTraitSliderControl('beard', elements.dwarfBeardSlider, elements.dwarfBeardSliderValue);

  document.addEventListener('keydown', (event) => {
    const activeElement = document.activeElement;
    const isFormControl = activeElement && ['INPUT', 'SELECT', 'TEXTAREA'].includes(activeElement.tagName);

    if (isDwarfCustomizerVisible() && !isFormControl && !isDwarfTestActive()) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        changeActiveDwarf(-1);
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        changeActiveDwarf(1);
        return;
      }
    }

    if (event.key === 'Escape') {
      if (isDwarfTestActive()) {
        closeDwarfTest({ returnFocus: true });
        return;
      }
      if (state.localView && state.localView.active) {
        hideLocalView({ returnFocus: true });
        return;
      }
      if (structureDetailsState.visible) {
        hideStructureDetails({ returnFocus: true });
        return;
      }
      if (isDwarfCustomizerVisible()) {
        closeDwarfCustomizer({ returnFocus: true });
        return;
      }
      if (elements.worldInfoModal && !elements.worldInfoModal.classList.contains('hidden')) {
        closeWorldInfoModal({ returnFocus: true });
        restoreWorldInfoTriggerFocus();
        return;
      }
      if (isOptionsVisible()) {
        closeOptionsScreen();
      }
    }
  });

  refreshOverlayToggleButtonsWithRegionNames();
}
