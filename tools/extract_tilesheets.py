import pathlib
import re

RE_TILE_PAGE = re.compile(r"^\[TILE_PAGE:([^\]]+)\]")
RE_FILE = re.compile(r"^\[FILE:([^\]]+)\]")
RE_TILE_DIM = re.compile(r"^\[TILE_DIM:(\d+):(\d+)\]")
RE_PAGE_DIM = re.compile(r"^\[PAGE_DIM:(\d+):(\d+)\]")
RE_PAGE_DIM_PIXELS = re.compile(r"^\[PAGE_DIM_PIXELS:(\d+):(\d+)\]")

REPO_ROOT = pathlib.Path(__file__).resolve().parents[1]
BASE_DIR = REPO_ROOT / "Dwarf.Fortress" / "data" / "vanilla"

entries = []

for tile_page_path in sorted(BASE_DIR.rglob("tile_page_*.txt")):
    rel_path = tile_page_path.relative_to(REPO_ROOT)
    current = None

    def push_current(state):
        if state and state.get("file"):
            entries.append((rel_path, state.copy()))
        return None

    with tile_page_path.open("r", encoding="utf-8") as f:
        for raw_line in f:
            line = raw_line.strip()
            if not line:
                continue

            m = RE_TILE_PAGE.match(line)
            if m:
                current = push_current(current)
                current = {
                    "name": m.group(1),
                    "tile_dim": None,
                    "page_dim": None,
                    "page_dim_pixels": None,
                    "file": None,
                }
                continue

            if current is None:
                continue

            m = RE_TILE_DIM.match(line)
            if m:
                current["tile_dim"] = (int(m.group(1)), int(m.group(2)))
                continue

            m = RE_PAGE_DIM.match(line)
            if m:
                current["page_dim"] = (int(m.group(1)), int(m.group(2)))
                continue

            m = RE_PAGE_DIM_PIXELS.match(line)
            if m:
                current["page_dim_pixels"] = (int(m.group(1)), int(m.group(2)))
                continue

            m = RE_FILE.match(line)
            if m:
                relative_image = m.group(1)
                image_path = (tile_page_path.parent / relative_image).resolve()
                try:
                    repo_relative_image = image_path.relative_to(REPO_ROOT)
                except ValueError:
                    repo_relative_image = pathlib.Path(relative_image)
                current["file"] = repo_relative_image.as_posix()
                continue

    current = push_current(current)

sections = {}
for rel_path, entry in entries:
    sections.setdefault(rel_path, []).append(entry)

md_lines = [
    "# Dwarf Fortress Tile Sheet Lookup",
    "",
    "This list is generated from the `tile_page_*.txt` definitions shipped with the game. Each entry shows the tile page name and the path to the image file within this repository. Dimensions are given when available.",
    "",
]

for rel_path, pages in sorted(sections.items()):
    md_lines.append(f"## {rel_path}")
    md_lines.append("")
    for page in pages:
        dim_parts = []
        if page["tile_dim"]:
            dim_parts.append(f"tile size {page['tile_dim'][0]}×{page['tile_dim'][1]}")
        if page["page_dim"]:
            dim_parts.append(f"grid {page['page_dim'][0]}×{page['page_dim'][1]}")
        if page["page_dim_pixels"]:
            dim_parts.append(f"sheet {page['page_dim_pixels'][0]}×{page['page_dim_pixels'][1]} px")
        dims = ", ".join(dim_parts)
        if dims:
            dims = f" ({dims})"
        md_lines.append(f"- **{page['name']}** → `{page['file']}`{dims}")
    md_lines.append("")

output_path = REPO_ROOT / "docs" / "TILE_SHEETS.md"
output_path.parent.mkdir(parents=True, exist_ok=True)
output_path.write_text("\n".join(md_lines) + "\n", encoding="utf-8")

print(f"Wrote {output_path.relative_to(REPO_ROOT)} with {len(entries)} entries.")
