export function attachEvents(elements, deps) {
  const {
    structureContextMenuState,
    hideStructureContextMenu,
    openOptionsScreen,
    closeOptionsScreen,
    hideStructureDetails,
    showLocalViewAt,
    showStructureDetails,
    hideLocalView,
    state,
    refreshOverlayToggleButtons,
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
    structureDetailsState,
    isOptionsVisible,
    updateWorldInfoSeedDisplay,
    updateWorldInfoSizeDisplay,
    updateWorldInfoGenerationTypeDisplay,
    setWorldGenerationType
  } = deps;

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

  const dismissContextMenuOnScroll = () => {
    if (structureContextMenuState.visible) {
      hideStructureContextMenu();
    }
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('pointerdown', dismissContextMenuOnPointerDown, true);
    document.addEventListener('keydown', dismissContextMenuOnKeyDown, true);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        hideStructureContextMenu();
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

  if (elements.structureContextMenuBegin) {
    elements.structureContextMenuBegin.addEventListener('click', () => {
      const { tileX, tileY } = structureContextMenuState;
      hideStructureContextMenu();
      if (Number.isInteger(tileX) && Number.isInteger(tileY)) {
        showLocalViewAt(tileX, tileY);
      }
    });
  }

  if (elements.structureContextMenuMoreInfo) {
    elements.structureContextMenuMoreInfo.addEventListener('click', () => {
      const { tile, tileX, tileY } = structureContextMenuState;
      hideStructureContextMenu();
      if (tile && tile.structureName) {
        showStructureDetails(tile, { tileX, tileY });
      }
    });
  }

  if (elements.localMapClose) {
    elements.localMapClose.addEventListener('click', () => {
      hideLocalView();
      if (elements.canvasWrapper) {
        elements.canvasWrapper.focus();
      }
    });
  }

  if (elements.politicalBordersToggle) {
    elements.politicalBordersToggle.addEventListener('click', () => {
      state.ui.showPoliticalBorders = !state.ui.showPoliticalBorders;
      refreshOverlayToggleButtons();
      if (state.currentWorld) {
        drawWorld(state.currentWorld);
      }
    });
  }

  if (elements.politicalInfluenceToggle) {
    elements.politicalInfluenceToggle.addEventListener('click', () => {
      state.ui.showPoliticalInfluence = !state.ui.showPoliticalInfluence;
      refreshOverlayToggleButtons();
      if (state.currentWorld) {
        drawWorld(state.currentWorld);
      }
    });
  }

  if (elements.elevationToggle) {
    elements.elevationToggle.addEventListener('click', () => {
      state.ui.showElevation = !state.ui.showElevation;
      refreshOverlayToggleButtons();
      if (state.currentWorld) {
        drawWorld(state.currentWorld);
      }
    });
  }

  if (elements.biomeToggle) {
    elements.biomeToggle.addEventListener('click', () => {
      state.ui.showBiomes = !state.ui.showBiomes;
      refreshOverlayToggleButtons();
      if (state.currentWorld) {
        drawWorld(state.currentWorld);
      }
    });
  }

  if (elements.temperatureToggle) {
    elements.temperatureToggle.addEventListener('click', () => {
      state.ui.showTemperature = !state.ui.showTemperature;
      refreshOverlayToggleButtons();
      if (state.currentWorld) {
        drawWorld(state.currentWorld);
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
      openDwarfCustomizer();
    });
  }

  if (elements.worldInfoCancel) {
    elements.worldInfoCancel.addEventListener('click', () => {
      closeWorldInfoModal({ returnFocus: true });
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
      beginGame();
      ensureMusicStarted();
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

  if (elements.dwarfGuildSelect) {
    elements.dwarfGuildSelect.addEventListener('change', (event) => {
      updateDwarfTrait('guild', event.target.value);
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

    if (isDwarfCustomizerVisible() && !isFormControl) {
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
      if (state.localView && state.localView.active) {
        hideLocalView();
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
        return;
      }
      if (isOptionsVisible()) {
        closeOptionsScreen();
      }
    }
  });

  refreshOverlayToggleButtons();
}
