import { getRandomWorldName } from './src/utils/world-name.js';

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

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

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

function showWorldInfo() {
  if (!worldInfo || !titleScreen) {
    return;
  }
  if (worldNameInput) {
    const existingName = worldNameInput.value.trim();
    if (!existingName) {
      worldNameInput.value = getRandomWorldName();
    }
  }
  setHidden(titleScreen, true);
  setHidden(worldInfo, false);
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
  dwarfCustomizerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    setHidden(dwarfCustomizer, true);
    await transitionToGame();
  });
}

export {};
