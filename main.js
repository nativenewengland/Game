function getStartButtonElement() {
  const button = elements.startButton;
  if (button && typeof button.addEventListener === 'function') {
    return button;
  }
  if (typeof document === 'undefined') {
    return null;
  }
  const resolved = document.getElementById('start-button');
  if (resolved && typeof resolved.addEventListener === 'function') {
    elements.startButton = resolved;
    return resolved;
  }
  return null;
}

function updateStartButtonState() {
  const button = getStartButtonElement();
  if (!button) {
    return;
  }
  if (state.ready) {
    button.disabled = false;
    button.textContent = 'Start Game';
    return;
  }
  button.disabled = true;
  button.textContent = 'Loading tiles…';
}

function handleStartButtonClick() {
  if (!state.ready) {
    startRequestedBeforeReady = true;
    const button = getStartButtonElement();
    if (button) {
      button.disabled = true;
      button.textContent = 'Finishing loading…';
    }
    return;
  }
  handleStartButtonRequest();
function attachStartButtonListener() {
  const button = getStartButtonElement();
  if (!button || button.dataset.startHandlerAttached === 'true') {
    return;
  }
  button.addEventListener('click', handleStartButtonClick);
  button.dataset.startHandlerAttached = 'true';
}

function initialiseStartButton() {
  updateStartButtonState();
  attachStartButtonListener();
}

if (typeof document !== 'undefined' && document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialiseStartButton, { once: true });
}

initialiseStartButton();

    updateStartButtonState();
    attachStartButtonListener();
  attachStartButtonListener();
