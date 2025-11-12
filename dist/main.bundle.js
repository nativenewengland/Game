    if (!gameContainerHidden) {
    if (state.currentWorld) {
      return;
    }
    if (elements.startButton && typeof elements.startButton.focus === "function") {
      try {
        elements.startButton.focus({ preventScroll: true });
      } catch (_) {
      }
