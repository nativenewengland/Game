(function () {
  if (typeof document === 'undefined') {
    return;
  }

  var FALLBACK_SCRIPT_ID = 'dwarfhold-main-fallback';

  function loadFallback() {
    if (document.getElementById(FALLBACK_SCRIPT_ID)) {
      return;
    }

    var fallback = document.createElement('script');
    fallback.id = FALLBACK_SCRIPT_ID;
    fallback.src = 'dist/main.bundle.js';
    fallback.defer = true;
    fallback.addEventListener('error', function () {
      console.error('Failed to load the bundled fallback script for Dwarfhold.');
    });

    document.head.appendChild(fallback);
  }

  function loadModule() {
    var moduleScript = document.createElement('script');
    moduleScript.type = 'module';
    moduleScript.src = './main.js';
    moduleScript.defer = true;
    moduleScript.addEventListener('error', function () {
      console.warn('Falling back to bundled script after module load failure.');
      loadFallback();
    });

    document.head.appendChild(moduleScript);
  }

  if (window.location && window.location.protocol === 'file:') {
    loadFallback();
    return;
  }

  loadModule();
})();
