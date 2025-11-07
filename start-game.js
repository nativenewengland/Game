document.addEventListener('DOMContentLoaded', () => {
const startButton = document.getElementById('start-button');
const titleScreen = document.getElementById('title-screen');
const worldInfo = document.getElementById('world-info');
const worldInfoForm = document.getElementById('world-info-form');
const worldInfoCancel = document.getElementById('world-info-cancel');
const dwarfCustomizer = document.getElementById('dwarf-customizer');
const dwarfCustomizerForm = document.getElementById('dwarf-customizer-form');
const dwarfBackButton = document.getElementById('dwarf-back');
const gameContainer = document.getElementById('game-container');
const loadingScreen = document.getElementById('loading-screen');
const loadingPanel = document.querySelector('#loading-screen .loading-panel');
const canvasWrapper = document.querySelector('.canvas-wrapper');
const worldNameInput = document.getElementById('world-name-input');
const dwarfNameInput = document.getElementById('dwarf-name-input');
const worldYearInput = document.getElementById('world-year-input');
const worldAgeInput = document.getElementById('world-age-input');
const optionsButton = document.getElementById('title-options-button');
const inGameOptionsButton = document.getElementById('in-game-options');
const optionsScreen = document.getElementById('options-screen');
const closeOptionsButton = document.getElementById('close-options');

const FOCUSABLE_SELECTOR = [
  '[autofocus]','button','input','select','textarea','[tabindex]:not([tabindex="-1"])'
].join(',');

function setHidden(element, hidden) {
  if (!element) {
    return;
  }
  element.classList.toggle('hidden', hidden);
  if (hidden) {
    element.setAttribute('aria-hidden', 'true');
  } else {
    element.setAttribute('aria-hidden', 'false');
  }
}

function focusFirstChild(element) {
  if (!element) {
    return;
  }
  requestAnimationFrame(() => {
    const focusTarget = element.querySelector(FOCUSABLE_SELECTOR);
    if (focusTarget && typeof focusTarget.focus === 'function') {
      focusTarget.focus();
    }
  });
}

function focusElement(element) {
  if (!element) {
    return;
  }
  requestAnimationFrame(() => {
    if (typeof element.focus === 'function') {
      element.focus({ preventScroll: true });
    }
  });
}

function isHidden(element) {
  return !element || element.classList.contains('hidden');
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

let optionsOrigin = null;
let lastFocusedElement = null;

async function transitionToGame() {
  if (!gameContainer) {
    return;
  }
  if (loadingScreen) {
    setHidden(loadingScreen, false);
    const focusTarget = loadingPanel || loadingScreen;
    focusElement(focusTarget);
    await wait(650);
    setHidden(loadingScreen, true);
  }
  setHidden(gameContainer, false);
  focusElement(canvasWrapper || gameContainer);
}

function openOptionsScreen(origin = 'title') {
  if (!optionsScreen) {
    return;
  }
  optionsOrigin = origin;
  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  if (origin === 'title' && titleScreen && !isHidden(titleScreen)) {
    setHidden(titleScreen, true);
  }
  setHidden(optionsScreen, false);
  focusFirstChild(optionsScreen);
}

function closeOptionsScreen() {
  if (!optionsScreen) {
    return;
  }
  const origin = optionsOrigin;
  optionsOrigin = null;
  setHidden(optionsScreen, true);
  if (origin === 'title' && titleScreen) {
    setHidden(titleScreen, false);
    focusElement(optionsButton || startButton);
    lastFocusedElement = null;
    return;
  }
  const focusTarget =
    (lastFocusedElement && document.contains(lastFocusedElement) && lastFocusedElement) ||
    inGameOptionsButton ||
    startButton ||
    null;
  focusElement(focusTarget);
  lastFocusedElement = null;
}

function showWorldInfo() {
  if (!worldInfo || !titleScreen) {
    return;
  }
  setHidden(titleScreen, true);
  setHidden(worldInfo, false);
  if (worldNameInput && !worldNameInput.value.trim()) {
    worldNameInput.value = 'New Dwarfhold';
  }
  if (worldYearInput && !worldYearInput.value) {
    worldYearInput.value = '1250';
  }
  if (worldAgeInput && !worldAgeInput.value) {
    worldAgeInput.value = '5';
  }
  focusFirstChild(worldInfo);
}

function returnToTitle() {
  if (!worldInfo || !titleScreen) {
    return;
  }
  setHidden(worldInfo, true);
  setHidden(titleScreen, false);
  focusElement(startButton);
}

function openDwarfCustomizer() {
  if (!worldInfo || !dwarfCustomizer) {
    return;
  }
  setHidden(worldInfo, true);
  setHidden(dwarfCustomizer, false);
  if (dwarfNameInput && !dwarfNameInput.value.trim()) {
    dwarfNameInput.value = 'Founding Overseer';
  }
  focusFirstChild(dwarfCustomizer);
}

function closeDwarfCustomizer() {
  if (!dwarfCustomizer || !worldInfo) {
    return;
  }
  setHidden(dwarfCustomizer, true);
  setHidden(worldInfo, false);
  focusFirstChild(worldInfo);
}

if (titleScreen) {
  titleScreen.setAttribute('aria-hidden', 'false');
}

if (startButton && worldInfo) {
  startButton.addEventListener('click', (event) => {
    event.preventDefault();
    showWorldInfo();
  });
}

if (worldInfoCancel) {
  worldInfoCancel.addEventListener('click', (event) => {
    event.preventDefault();
    returnToTitle();
  });
}

if (worldInfoForm && dwarfCustomizer) {
  worldInfoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    openDwarfCustomizer();
  });
}

if (dwarfBackButton) {
  dwarfBackButton.addEventListener('click', (event) => {
    event.preventDefault();
    closeDwarfCustomizer();
  });
}

if (dwarfCustomizerForm) {
  dwarfCustomizerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (typeof window.beginGame === 'function') {
      window.beginGame();
    }
  });
}

if (optionsButton && optionsScreen) {
  optionsButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (!isHidden(optionsScreen)) {
      return;
    }
    openOptionsScreen('title');
  });
}

if (inGameOptionsButton && optionsScreen) {
  inGameOptionsButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (!isHidden(optionsScreen)) {
      return;
    }
    openOptionsScreen('game');
  });
}

if (closeOptionsButton && optionsScreen) {
  closeOptionsButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (isHidden(optionsScreen)) {
      return;
    }
    closeOptionsScreen();
  });
}

if (optionsScreen) {
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' && event.key !== 'Esc') {
      return;
    }
    if (isHidden(optionsScreen)) {
      return;
    }
    closeOptionsScreen();
  });
}

});
