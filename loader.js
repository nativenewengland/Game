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

  var legacyWarningShown = false;
  function showLegacyWarning() {
    if (legacyWarningShown) {
      return;
    }
    if (!document.body) {
      window.addEventListener('DOMContentLoaded', showLegacyWarning);
      return;
    }
    legacyWarningShown = true;
    var warning = document.createElement('div');
    warning.id = 'legacy-warning';
    warning.textContent =
      'Dwarfhold is running a legacy build because the latest module failed to load. Some features may be missing or out of date.';
    warning.setAttribute('role', 'status');
    warning.setAttribute('aria-live', 'polite');
    warning.style.cssText =
      'position:fixed;left:0;right:0;bottom:0;z-index:9999;padding:12px 16px;background:rgba(45,17,17,0.92);color:#f8e8d3;font:600 14px/1.4 "Cormorant Garamond", serif;text-align:center;box-shadow:0 -2px 6px rgba(0,0,0,0.35);';
    document.body.appendChild(warning);
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

  loadScript('./main.js', 'module', function () {
    showLegacyWarning();
    loadLegacyBundle();
  });
})();
