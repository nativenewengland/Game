(function () {
  if (typeof document === 'undefined') {
    return;
  }

  function loadModule() {
    var moduleScript = document.createElement('script');
    moduleScript.type = 'module';
    moduleScript.src = './main.js';
    moduleScript.defer = true;
    moduleScript.addEventListener('error', function () {
      console.error('Failed to load the module script for Dwarfhold.');
    });

    document.head.appendChild(moduleScript);
  }

  loadModule();
})();
