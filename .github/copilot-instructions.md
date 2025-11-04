## Repository overview

This workspace contains multiple, largely independent web/game projects. The two primary user-facing pieces are:

- Dwarfhold (root): a browser-first ES module game. Entry: `index.html` → `main.js` (imports `./src/...`). No bundler.
- Fantasy-Map-Generator (subfolder): a standalone static web app with its own `.github/copilot-instructions.md` at `Fantasy-Map-Generator-master/.github/copilot-instructions.md` — read that file for project-specific rules.

When working in this repository, identify which project you are changing and prefer the nearest `.github/copilot-instructions.md` if present (see the map generator subfolder).

## High-level architecture (root / Dwarfhold)

- Entry: `index.html` loads `main.js` as an ES module (`<script type="module" src="main.js">`). Changes are usually client-side only.
- Modular source: `src/` contains named exports (assets, utils, UI helpers). `main.js` imports from `./src/*` — keep named exports stable when refactoring.
- UI glue: `start-game.js` handles title/options flow and accessibility focus; keep DOM ID conventions when adding UI elements (e.g. `start-button`, `options-screen`, `game-container`).
- Assets: `tilesheet/`, `images/` and `src/assets.js` are the canonical places for sprites/tile registration (`registerTiles`, `registerCustomStructure`).

## Key developer workflows

- Run locally: both projects are static; run a simple HTTP server from the project root. Example (works on Windows PowerShell):

```powershell
python -m http.server 8000
# then open http://localhost:8000 in a browser
```

- No build step: Do not run `npm install` or expect a bundler. Editing JS/HTML/CSS and reloading the browser is the fast feedback loop.
- Validate changes in-browser: open DevTools Console, then exercise the UI (Start Game → generate world / New Map → check Layers). Look for errors and generation logs.

## Project-specific conventions to follow

- Versioning/cache-busting: `versioning.js` and explicit query strings in HTML (e.g. `file.js?v=1.108.1`) are used for release/version tracking and cache-busting. When changing core behavior, update `versioning.js` and the `?v=` token in `index.html` for changed files.
- ES module exports: prefer named exports in `src/*` (the codebase imports specific functions/objects). Avoid changing export names without updating all import sites.
- UI IDs: `start-button`, `options-screen`, `world-info`, and `game-container` are referenced by `start-game.js` and other scripts—preserve or update both markup and JS together.
- Asset registration: use `src/assets.js` and the tile registration helpers (`registerTiles`, `registerCustomStructure`) for new tiles/structures so rendering modules pick them up.

## Integration points & external dependencies

- External CDN fonts and analytics are referenced in `index.html` — failures there are normal in offline or sandboxed environments. Tests should not rely on these to pass.
- Third-party libraries for the map generator live under `Fantasy-Map-Generator-master/libs/` (D3, TinyMCE, etc.). The root game uses internal `libs/` and `tilesheet/` assets.

## Where to look for examples

- Map/world generation flow: `main.js` (root) imports generation modules in `src/local/` — inspect `src/local/dwarfhold-map.js` for how a map is produced and logged.
- UI flow & accessibility: `start-game.js` demonstrates the project's focus management conventions and modal toggling.
- Tile/structure registration: `src/assets.js` and calls like `registerCustomStructure('HAMLET', ...)` in `main.js` show how custom drawings are attached.
- Subproject rules: `Fantasy-Map-Generator-master/.github/copilot-instructions.md` contains authoritative, project-specific instructions — read it before making changes in that folder.

## Quick validation checklist (for PRs)

1. Run an HTTP server from the project folder.
2. Open the app in a Chromium/Firefox browser.
3. Click Start / generate a world (or for the map generator: open menu → New Map!).
4. Verify no uncaught errors in DevTools console and that the primary feature (map generation, UI flows) still works.
5. If core JS files changed, bump `versioning.js` and update `?v=` tokens in `index.html` or the relevant HTML file.

## Notes to agents

- Prefer reading nearby README or `.github/copilot-instructions.md` in a subfolder before changing that subproject.
- Be conservative with named exports and DOM IDs — these are cross-referenced widely across modules.
- Where behavior is unclear, run the app locally and exercise the UI to observe console output and generation logs before committing changes.

If you want, I can merge the Fantasy Map Generator instructions into this file or keep them separate — tell me which you prefer.
