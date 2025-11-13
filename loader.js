(function () {
  if (typeof document === 'undefined') {
    return;
  }

  function loadScript(src, type) {
    var script = document.createElement('script');
    if (type) {
      script.type = type;
    }
    script.defer = true;
    script.src = src;
    script.addEventListener('error', function () {
      console.error('Failed to load the script for Dwarfhold:', src);
    });
    document.head.appendChild(script);
  }

  if (window.location.protocol === 'file:') {
    loadScript('./bundle.js');
  } else {
    loadScript('./main.js', 'module');
  }
})();
