# Future Updates

We have an ambitious roadmap planned for the world of **Game**. Here are just a few of the major features on the horizon:

- **Religion System** – Found your own cult and guide its rise to prominence.
- **Underdark** – Explore an entirely new world map filled with underground adventures.
- **Multiple Races** – Encounter and play as a diverse range of races, each with unique traits.
- **Necromancy Updates** – Delve deeper into the dark arts with expanded necromantic abilities.
- **Demon Update** – Visit the underworld or demon realm and uncover its secrets.
- **Real-Time Strategy Elements Update** – Command your forces in dynamic, real-time encounters.
- **Story Mode** – Experience a narrative-driven campaign that reacts to your choices.
- **Map Painter** – Sketch and edit the overworld tile by tile to sculpt your ideal realm before embarking.

We are always listening to player suggestions—and there is much, much more to come!

## Local Development

Because the game relies on modern JavaScript modules, opening `index.html` directly from the filesystem prevents the browser from loading the module graph. You can start a tiny static server instead:

```bash
node dev-server.js
```

Then visit [http://localhost:8080](http://localhost:8080) in your browser to play the game. Set the `PORT` environment variable if you prefer a different port.
