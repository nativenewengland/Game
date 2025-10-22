const tileSize = 19;
const drawSize = 32;

const tileDefinitions = [
  { name: 'sand', row: 0, col: 0 },
  { name: 'grass', row: 1, col: 2 },
  { name: 'stone', row: 0, col: 1 },
  { name: 'mountain-1', row: 0, col: 3 },
  { name: 'mountain-2', row: 0, col: 4 },
  { name: 'mountain-3', row: 0, col: 5 },
  { name: 'trees', row: 3, col: 0 },
  { name: 'cold climate trees', row: 3, col: 2 },
  { name: 'badlands', row: 2, col: 3 },
  { name: 'dwarfhold', row: 1, col: 5 },
  { name: 'water', row: 2, col: 6 },
  { name: 'cave', row: 0, col: 6 },
  { name: 'thick-trees', row: 1, col: 7 },
  { name: 'village', row: 1, col: 8 },
  { name: 'monistary', row: 1, col: 4 }
];

const tileLookup = new Map(
  tileDefinitions.map((def, index) => [def.name, { index, sx: def.col * tileSize, sy: def.row * tileSize }])
);

const state = {
  settings: {
    width: 96,
    height: 64,
    seedString: '',
    lastSeedString: ''
  },
  tileSheet: null,
  ready: false
};

const musicTracks = [
  { title: 'Another Year', src: 'sound/tracks/another_year/AY_Full.ogg' },
  { title: 'Craftsdwarfship', src: 'sound/tracks/craftsdwarfship/CS_Full.ogg' },
  { title: 'Death Spiral', src: 'sound/tracks/death_spiral/DS_Full.ogg' },
  { title: 'Drink & Industry', src: 'sound/tracks/drink_&_industry/DI_Full.ogg' },
  { title: 'Dwarf Fortress', src: 'sound/tracks/dwarf_fortress/Dwarf_Fortress.ogg' },
  { title: 'Expansive Cavern', src: 'sound/tracks/expansive_cavern/EC_Full.ogg' },
  { title: 'First Year', src: 'sound/tracks/first_year/FY_Full.ogg' },
  { title: 'Forgotten Beast', src: 'sound/tracks/forgotten_beast/FB_Full.ogg' },
  { title: 'Hill Dwarf', src: 'sound/tracks/hill_dwarf/HD_Full.ogg' },
  { title: 'Koganusan', src: 'sound/tracks/koganusan/KG_Full.ogg' },
  { title: 'Mountainhome', src: 'sound/tracks/mountainhome/MH_Full.ogg' },
  { title: 'Strike the Earth!', src: 'sound/tracks/strike_the_earth!/STE_Full.ogg' },
  { title: 'Strange Moods', src: 'sound/tracks/strange_moods/SM_Full.ogg' },
  { title: 'Vile Force of Darkness', src: 'sound/tracks/vile_force_of_darkness/VFOD_Full.ogg' },
  { title: 'Winter Entombs You', src: 'sound/tracks/winter_entombs_you/WEY_Full.ogg' }
];

const audioState = {
  tracks: musicTracks,
  currentIndex: 0,
  isPlaying: false,
  initialised: false
};

const elements = {
  startButton: document.getElementById('start-button'),
  titleScreen: document.getElementById('title-screen'),
  gameContainer: document.getElementById('game-container'),
  optionsButton: document.getElementById('title-options-button'),
  inGameOptions: document.getElementById('in-game-options'),
  optionsPanel: document.getElementById('options-panel'),
  closeOptions: document.getElementById('close-options'),
  optionsForm: document.getElementById('options-form'),
  regenerate: document.getElementById('regenerate-button'),
  canvas: document.getElementById('world-canvas'),
  seedDisplay: document.querySelector('.seed-display'),
  mapWidthInput: document.getElementById('map-width'),
  mapHeightInput: document.getElementById('map-height'),
  seedInput: document.getElementById('world-seed'),
  musicToggle: document.getElementById('music-toggle'),
  musicVolume: document.getElementById('music-volume'),
  musicNowPlaying: document.getElementById('music-now-playing'),
  audioElement: document.getElementById('background-music')
};

const tileSheetPromise = loadImage('tilesheet/Overworld.png')
  .then((img) => {
    state.tileSheet = img;
    state.ready = true;
    return img;
  })
  .catch((error) => {
    console.error('Failed to load tile sheet', error);
    throw error;
  });

elements.startButton.disabled = true;
elements.startButton.textContent = 'Loading tiles…';

tileSheetPromise.then(() => {
  elements.startButton.disabled = false;
  elements.startButton.textContent = 'Start Game';
});

let optionsVisible = false;

function toggleOptions(forceState) {
  optionsVisible = typeof forceState === 'boolean' ? forceState : !optionsVisible;
  elements.optionsPanel.classList.toggle('hidden', !optionsVisible);
}

function applyFormSettings() {
  const width = clamp(parseInt(elements.mapWidthInput.value, 10) || state.settings.width, 30, 200);
  const height = clamp(parseInt(elements.mapHeightInput.value, 10) || state.settings.height, 20, 150);
  const seedString = (elements.seedInput.value || '').trim();

  state.settings.width = width;
  state.settings.height = height;
  state.settings.seedString = seedString;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function updateMusicToggleLabel() {
  if (!elements.musicToggle) {
    return;
  }
  elements.musicToggle.textContent = audioState.isPlaying ? 'Pause Music' : 'Play Music';
  elements.musicToggle.setAttribute('aria-pressed', audioState.isPlaying.toString());
}

function updateNowPlaying() {
  if (!elements.musicNowPlaying || !audioState.tracks.length) {
    return;
  }
  const track = audioState.tracks[audioState.currentIndex];
  elements.musicNowPlaying.textContent = audioState.isPlaying
    ? `Now playing: ${track.title}`
    : `Ready: ${track.title}`;
}

function loadTrack(index) {
  if (!elements.audioElement || !audioState.tracks.length) {
    return;
  }
  const trackCount = audioState.tracks.length;
  const normalizedIndex = ((index % trackCount) + trackCount) % trackCount;
  audioState.currentIndex = normalizedIndex;
  const track = audioState.tracks[normalizedIndex];
  const encodedSrc = encodeURI(track.src);
  elements.audioElement.src = encodedSrc;
  elements.audioElement.load();
  audioState.initialised = true;
  updateNowPlaying();
}

function attemptPlay() {
  if (!elements.audioElement) {
    return Promise.resolve();
  }
  const playPromise = elements.audioElement.play();
  if (playPromise && typeof playPromise.then === 'function') {
    return playPromise
      .then(() => {
        audioState.isPlaying = true;
        updateMusicToggleLabel();
        updateNowPlaying();
      })
      .catch((error) => {
        console.warn('Music playback prevented:', error);
        audioState.isPlaying = false;
        updateMusicToggleLabel();
        updateNowPlaying();
      });
  }
  audioState.isPlaying = true;
  updateMusicToggleLabel();
  updateNowPlaying();
  return Promise.resolve();
}

function playNextTrack() {
  if (!audioState.tracks.length) {
    return;
  }
  const nextIndex = (audioState.currentIndex + 1) % audioState.tracks.length;
  loadTrack(nextIndex);
  attemptPlay();
}

function ensureMusicStarted() {
  if (!elements.audioElement || !elements.musicToggle) {
    return;
  }
  if (!audioState.initialised) {
    loadTrack(audioState.currentIndex);
  }
  attemptPlay();
}

function setupAudioControls() {
  if (!elements.audioElement || !elements.musicToggle || !elements.musicVolume) {
    return;
  }

  const volumeValue = clamp(parseFloat(elements.musicVolume.value) || 0.5, 0, 1);
  elements.audioElement.volume = volumeValue;
  elements.musicVolume.value = volumeValue.toString();
  loadTrack(audioState.currentIndex);
  updateMusicToggleLabel();

  elements.musicVolume.addEventListener('input', (event) => {
    const newVolume = clamp(parseFloat(event.target.value), 0, 1);
    elements.audioElement.volume = Number.isNaN(newVolume) ? elements.audioElement.volume : newVolume;
  });

  elements.musicToggle.addEventListener('click', () => {
    if (!audioState.initialised) {
      loadTrack(audioState.currentIndex);
    }
    if (audioState.isPlaying) {
      elements.audioElement.pause();
      audioState.isPlaying = false;
      updateMusicToggleLabel();
      updateNowPlaying();
    } else {
      attemptPlay();
    }
  });

  elements.audioElement.addEventListener('ended', () => {
    audioState.isPlaying = false;
    playNextTrack();
  });

  elements.audioElement.addEventListener('play', () => {
    audioState.isPlaying = true;
    updateMusicToggleLabel();
    updateNowPlaying();
  });

  elements.audioElement.addEventListener('pause', () => {
    audioState.isPlaying = false;
    updateMusicToggleLabel();
    updateNowPlaying();
  });

  elements.audioElement.addEventListener('error', () => {
    console.error('Failed to play track, skipping to next.');
    audioState.isPlaying = false;
    playNextTrack();
  });
}

function loadImage(src) {
  const img = new Image();
  img.src = src;
  img.decoding = 'async';
  if (img.decode) {
    return img.decode().then(() => img);
  }
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

function stringToSeed(str) {
  if (!str) {
    return Math.floor(Math.random() * 0xffffffff);
  }
  let hash = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(a) {
  return function rng() {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashCoords(x, y, seed) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ seed;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function valueNoise(x, y, seed) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = x0 + 1;
  const y1 = y0 + 1;
  const sx = fade(x - x0);
  const sy = fade(y - y0);

  const n00 = hashCoords(x0, y0, seed);
  const n10 = hashCoords(x1, y0, seed);
  const n01 = hashCoords(x0, y1, seed);
  const n11 = hashCoords(x1, y1, seed);

  const ix0 = lerp(n00, n10, sx);
  const ix1 = lerp(n01, n11, sx);
  return lerp(ix0, ix1, sy);
}

function octaveNoise(x, y, seed, octaves = 4, persistence = 0.5, lacunarity = 2.1) {
  let amplitude = 1;
  let frequency = 1;
  let sum = 0;
  let maxAmplitude = 0;
  for (let i = 0; i < octaves; i += 1) {
    sum += amplitude * valueNoise(x * frequency, y * frequency, seed + i * 131);
    maxAmplitude += amplitude;
    amplitude *= persistence;
    frequency *= lacunarity;
  }
  return sum / maxAmplitude;
}

function createWorld(seedString) {
  const seedNumber = stringToSeed(seedString);
  const rng = mulberry32(seedNumber || 1);
  const offsetX = rng() * 512;
  const offsetY = rng() * 512;

  const width = state.settings.width;
  const height = state.settings.height;

  const structureTargets = {
    village: Math.max(1, Math.floor((width * height) / 5200)),
    monistary: Math.max(1, Math.floor((width * height) / 6800)),
    dwarfhold: Math.max(1, Math.floor((width * height) / 6000))
  };
  const structureCounts = { village: 0, monistary: 0, dwarfhold: 0 };

  const tiles = new Array(height);
  for (let y = 0; y < height; y += 1) {
    const row = new Array(width);
    for (let x = 0; x < width; x += 1) {
      const sampleX = (x + offsetX) / width;
      const sampleY = (y + offsetY) / height;
      const heightValue = octaveNoise(sampleX * 2.4, sampleY * 2.4, seedNumber + 101, 5, 0.52, 2.35);
      const moistureValue = octaveNoise(sampleX * 2.1, sampleY * 2.1, seedNumber + 701, 4, 0.55, 2.4);
      const roughness = octaveNoise(sampleX * 3.5, sampleY * 3.5, seedNumber + 1401, 3, 0.5, 2.6);
      const randomFactor = hashCoords(x, y, seedNumber + 2909);
      const featureRoll = hashCoords(x, y, seedNumber + 8117);

      let tileKey;

      if (heightValue < 0.24) {
        tileKey = 'water';
      } else if (heightValue < 0.3) {
        tileKey = randomFactor > 0.5 ? 'sand' : 'water';
      } else if (heightValue < 0.36) {
        tileKey = randomFactor > 0.3 ? 'sand' : 'grass';
      } else if (heightValue > 0.82) {
        if (featureRoll < 0.08) {
          tileKey = 'cave';
        } else if (heightValue > 0.9) {
          tileKey = 'mountain-3';
        } else if (heightValue > 0.86) {
          tileKey = 'mountain-2';
        } else {
          tileKey = 'mountain-1';
        }
      } else if (heightValue > 0.7) {
        if (moistureValue > 0.55) {
          tileKey = 'cold climate trees';
        } else {
          tileKey = randomFactor > 0.4 ? 'mountain-1' : 'stone';
        }
      } else if (heightValue > 0.58) {
        if (moistureValue > 0.68) {
          tileKey = roughness > 0.55 ? 'thick-trees' : 'trees';
        } else if (moistureValue < 0.32) {
          tileKey = 'badlands';
        } else if (moistureValue > 0.48 && randomFactor > 0.45) {
          tileKey = 'trees';
        } else {
          tileKey = 'grass';
        }
      } else if (heightValue > 0.46) {
        if (moistureValue > 0.72) {
          tileKey = 'thick-trees';
        } else if (moistureValue > 0.5) {
          tileKey = randomFactor > 0.35 ? 'trees' : 'grass';
        } else if (moistureValue < 0.25) {
          tileKey = randomFactor > 0.5 ? 'badlands' : 'stone';
        } else {
          tileKey = 'grass';
        }
      } else {
        if (moistureValue > 0.6) {
          tileKey = randomFactor > 0.6 ? 'trees' : 'grass';
        } else if (moistureValue < 0.28) {
          tileKey = randomFactor > 0.4 ? 'badlands' : 'stone';
        } else {
          tileKey = 'grass';
        }
      }

      if (tileKey === 'mountain-1' || tileKey === 'mountain-2') {
        if (featureRoll < 0.05) {
          tileKey = 'cave';
        } else if (structureCounts.dwarfhold < structureTargets.dwarfhold && featureRoll > 0.92) {
          tileKey = 'dwarfhold';
          structureCounts.dwarfhold += 1;
        }
      }

      if (tileKey === 'grass' || tileKey === 'trees' || tileKey === 'thick-trees') {
        if (structureCounts.village < structureTargets.village && featureRoll > 0.975) {
          tileKey = 'village';
          structureCounts.village += 1;
        } else if (structureCounts.monistary < structureTargets.monistary && featureRoll < 0.015 && heightValue > 0.48) {
          tileKey = 'monistary';
          structureCounts.monistary += 1;
        }
      }

      row[x] = tileKey;
    }
    tiles[y] = row;
  }

  return { tiles, seedString: seedString || generateSeedString(seedNumber) };
}

function generateSeedString(seedNumber) {
  return seedNumber.toString(16).padStart(8, '0');
}

function drawWorld(world) {
  const { tiles, seedString } = world;
  const height = tiles.length;
  const width = tiles[0].length;
  const ctx = elements.canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  elements.canvas.width = width * drawSize;
  elements.canvas.height = height * drawSize;
  const wrapper = elements.canvas.parentElement;
  const pixelWidth = width * drawSize;
  const pixelHeight = height * drawSize;
  const wrapperWidth = wrapper ? wrapper.clientWidth : pixelWidth;
  elements.canvas.style.width = pixelWidth <= wrapperWidth ? `${pixelWidth}px` : '100%';
  elements.canvas.style.height = pixelWidth <= wrapperWidth ? `${pixelHeight}px` : 'auto';

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const tileKey = tiles[y][x];
      const definition = tileLookup.get(tileKey) || tileLookup.get('grass');
      ctx.drawImage(
        state.tileSheet,
        definition.sx,
        definition.sy,
        tileSize,
        tileSize,
        x * drawSize,
        y * drawSize,
        drawSize,
        drawSize
      );
    }
  }

  state.settings.lastSeedString = seedString;
  state.settings.seedString = seedString;
  elements.seedDisplay.textContent = `Seed: ${seedString} | ${width}×${height}`;
}

function beginGame() {
  elements.titleScreen.classList.add('hidden');
  elements.gameContainer.classList.remove('hidden');
  elements.seedDisplay.textContent = '';
  generateAndRender();
}

function generateAndRender(seedOverride) {
  const seedToUse = typeof seedOverride === 'string' ? seedOverride : state.settings.seedString;
  const world = createWorld(seedToUse);
  drawWorld(world);
  elements.seedInput.value = world.seedString;
}

function randomSeedString() {
  return Math.random().toString(36).slice(2, 10);
}

function handleRegenerate() {
  const randomSeed = randomSeedString();
  state.settings.seedString = randomSeed;
  elements.seedInput.value = randomSeed;
  generateAndRender(randomSeed);
}

function syncInputsWithSettings() {
  elements.mapWidthInput.value = state.settings.width.toString();
  elements.mapHeightInput.value = state.settings.height.toString();
  elements.seedInput.value = state.settings.seedString;
}

function attachEvents() {
  elements.optionsButton.addEventListener('click', () => {
    syncInputsWithSettings();
    toggleOptions(true);
  });

  elements.inGameOptions.addEventListener('click', () => {
    syncInputsWithSettings();
    toggleOptions(true);
  });

  elements.closeOptions.addEventListener('click', () => toggleOptions(false));

  elements.optionsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    applyFormSettings();
    toggleOptions(false);
    if (!elements.gameContainer.classList.contains('hidden')) {
      generateAndRender();
    }
  });

  elements.startButton.addEventListener('click', async () => {
    if (!state.ready) {
      return;
    }
    toggleOptions(false);
    beginGame();
    ensureMusicStarted();
  });

  elements.regenerate.addEventListener('click', handleRegenerate);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      toggleOptions(false);
    }
  });
}

attachEvents();

function initialise() {
  syncInputsWithSettings();
  elements.canvas.style.maxWidth = '100%';
  elements.canvas.style.height = 'auto';
  setupAudioControls();
}

initialise();
