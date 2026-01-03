      const deltaX = Number.isFinite(event.deltaX) ? event.deltaX : 0;
      const deltaY = Number.isFinite(event.deltaY) ? event.deltaY : 0;
      let delta = Math.abs(deltaY) >= Math.abs(deltaX) ? deltaY : deltaX;
      if (!delta) {
        delta = Number.isFinite(event.wheelDelta) && event.wheelDelta !== 0 && -event.wheelDelta || Number.isFinite(event.detail) && event.detail !== 0 && event.detail || 0;
      }
    const isSecondaryPointer = (event, isTouchPointer) => {
      if (event.button === 2) {
        return true;
      }
      if (typeof event.buttons === "number" && (event.buttons & 2) === 2) {
        return true;
      }
      if (!isTouchPointer && event.button === 0 && event.ctrlKey && isMacLikePlatform) {
        return true;
      }
      return false;
    };
      const isContextMenuClick = !isTouchPointer && isSecondaryPointer(event, isTouchPointer);
