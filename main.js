  const transform = `translate(${viewState.translateX}px, ${viewState.translateY}px) scale(${viewState.scale})`;
  elements.canvas.style.transform = transform;
  if (elements.regionNameOverlay) {
    elements.regionNameOverlay.style.transform = transform;
  }
  clearMapEditorStructure,
  drawSize
