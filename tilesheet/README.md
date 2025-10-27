# Dwarfhold interior tilesheet

The repository keeps only the generator script so pull requests avoid bundling binary PNGs. Run the helper script to rebuild the tilesheet locally and optionally copy a base64 representation that can be downloaded separately.

```bash
python tools/generate_dwarfhold_tilesheet.py
```

The command above saves `tilesheet/dwarfhold_interior.png` next to this README. Install [Pillow](https://python-pillow.org/) (``pip install pillow``) first if it is not already available in your Python environment.

If you need a text-only payload (for example, to attach to an issue comment or upload outside of git) use:

```bash
python tools/generate_dwarfhold_tilesheet.py --print-base64 > dwarfhold_tilesheet.b64
```

The resulting file can be downloaded and decoded with:

```bash
base64 -d dwarfhold_tilesheet.b64 > dwarfhold_interior.png
# or: base64 --decode dwarfhold_tilesheet.b64 > dwarfhold_interior.png
```

Both the PNG output and the base64 text are generated from the same source, so you always receive the identical tileset without checking in binary blobs.
