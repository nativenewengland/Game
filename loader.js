(function () {
  if (typeof document === 'undefined') {
    return;
  }

  function loadScript(src, type, onError, onLoad) {
    var script = document.createElement('script');
    if (type) {
      script.type = type;
    }
    script.defer = true;
    script.src = src;
    if (typeof onLoad === 'function') {
      script.addEventListener('load', onLoad);
    }
    script.addEventListener('error', function () {
      console.error('Failed to load the script for Dwarfhold:', src);
      if (typeof onError === 'function') {
        onError();
      }
    });
    document.head.appendChild(script);
    return script;
  }

  var legacyLoaded = false;
  function loadLegacyBundle() {
    if (legacyLoaded) {
      return;
    }
    legacyLoaded = true;
    loadScript('./bundle.js', null, null, function () {
      if (typeof window === 'undefined') {
        return;
      }
      if (!window.__gameUiWired) {
        console.warn(
          'Legacy bundle loaded, but UI wiring was not detected. The bundle may be out of sync with main.js.'
        );
      }
    });
  }

  if (!('noModule' in document.createElement('script'))) {
    loadLegacyBundle();
    return;
  }

  loadScript('./main.js', 'module', loadLegacyBundle);
})();
