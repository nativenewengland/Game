import { elements } from './src/ui/elements.js';

function setVisibility(element, shouldShow) {
  if (!element) {
    return;
  }

  const method = shouldShow ? 'remove' : 'add';
  element.classList[method]('hidden');
  element.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
}

function setLoadingProgress(percent, statusText) {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));

  if (elements.loadingProgressBar) {
    elements.loadingProgressBar.setAttribute('aria-valuenow', String(clamped));
  }

  if (elements.loadingProgressFill) {
    elements.loadingProgressFill.style.width = `${clamped}%`;
  }

  if (elements.loadingStatus && typeof statusText === 'string') {
    elements.loadingStatus.textContent = statusText;
  }
}

function focusElement(element) {
  if (!element) {
    return;
  }

  if (typeof element.focus === 'function') {
    element.focus();
  }
}

function finishLoading() {
  setVisibility(elements.loadingScreen, false);
  setVisibility(elements.gameContainer, true);
  focusElement(elements.gameContainer);
}

function simulateLoadingSequence(onComplete) {
  const steps = [
    { progress: 20, message: 'Surveying mountains and valleys…' },
    { progress: 45, message: 'Settling clan disputes…' },
    { progress: 70, message: 'Stocking the expedition caravan…' },
    { progress: 100, message: 'Finalising your embark site…' }
  ];

  let currentStep = 0;

  const advance = () => {
    const step = steps[currentStep];
    if (!step) {
      if (typeof onComplete === 'function') {
        onComplete();
      }
      return;
    }

    setLoadingProgress(step.progress, step.message);
    currentStep += 1;
    window.setTimeout(advance, 600);
  };

  setLoadingProgress(5, 'Consulting the Mountainhome…');
  window.setTimeout(advance, 400);
}

function handleStartClick(event) {
  event.preventDefault();

  if (!elements.startButton || elements.startButton.disabled) {
    return;
  }

  elements.startButton.disabled = true;
  elements.startButton.setAttribute('aria-disabled', 'true');

  setVisibility(elements.titleScreen, false);
  setVisibility(elements.loadingScreen, true);
  focusElement(elements.loadingPanel);

  simulateLoadingSequence(() => {
    finishLoading();
  });
}

function initialise() {
  if (!elements.startButton) {
    return;
  }

  elements.startButton.addEventListener('click', handleStartClick);
}

initialise();
