from __future__ import annotations

import argparse
import base64
import sys
from io import BytesIO
from pathlib import Path
from typing import Callable

from PIL import Image, ImageDraw

TILE_SIZE = 16
COLUMNS = 7
TILES: list[tuple[str, Callable[[Image.Image, ImageDraw.ImageDraw], None]]] = []


def register(name: str):
    def decorator(func: Callable[[Image.Image, ImageDraw.ImageDraw], None]):
        TILES.append((name, func))
        return func

    return decorator


@register("rock")
def draw_rock(tile: Image.Image, draw: ImageDraw.ImageDraw) -> None:
    draw.rectangle([(0, 0), (TILE_SIZE - 1, TILE_SIZE - 1)], fill=(104, 104, 104, 255), outline=(60, 60, 60, 255))
    for y in range(1, TILE_SIZE - 1, 2):
        for x in range(1, TILE_SIZE - 1, 2):
            shade = 90 + ((x * 3 + y * 5) % 32)
            draw.point((x, y), fill=(shade, shade, shade, 255))


@register("corridor")
def draw_corridor(tile: Image.Image, draw: ImageDraw.ImageDraw) -> None:
    draw.rectangle([(0, 0), (TILE_SIZE - 1, TILE_SIZE - 1)], fill=(58, 46, 43, 255), outline=(32, 26, 24, 255))
    for y in range(3, TILE_SIZE - 2, 4):
        draw.line([(1, y), (TILE_SIZE - 2, y)], fill=(92, 80, 70, 255))


@register("entrance")
def draw_entrance(tile: Image.Image, draw: ImageDraw.ImageDraw) -> None:
    draw.rectangle([(0, 0), (TILE_SIZE - 1, TILE_SIZE - 1)], fill=(74, 59, 46, 255), outline=(40, 30, 22, 255))
    draw.rectangle([(3, 4), (12, 12)], fill=(126, 130, 138, 255), outline=(68, 74, 82, 255))
    draw.line([(3, 8), (12, 8)], fill=(90, 96, 104, 255))
    draw.line([(7, 4), (7, 12)], fill=(90, 96, 104, 255))


@register("hall")
def draw_hall(tile: Image.Image, draw: ImageDraw.ImageDraw) -> None:
    draw.rectangle([(0, 0), (TILE_SIZE - 1, TILE_SIZE - 1)], fill=(120, 94, 72, 255), outline=(76, 58, 42, 255))
    for y in range(2, TILE_SIZE - 2, 4):
        for x in range(2, TILE_SIZE - 2, 4):
            draw.rectangle([(x, y), (x + 1, y + 1)], fill=(194, 170, 132, 255))


@register("forge")
def draw_forge(tile: Image.Image, draw: ImageDraw.ImageDraw) -> None:
    draw.rectangle([(0, 0), (TILE_SIZE - 1, TILE_SIZE - 1)], fill=(44, 41, 46, 255), outline=(18, 16, 20, 255))
    draw.rectangle([(4, 10), (11, 13)], fill=(210, 96, 42, 255), outline=(112, 36, 18, 255))
    draw.rectangle([(5, 5), (10, 9)], fill=(254, 202, 96, 255))


@register("market")
def draw_market(tile: Image.Image, draw: ImageDraw.ImageDraw) -> None:
    draw.rectangle([(0, 0), (TILE_SIZE - 1, TILE_SIZE - 1)], fill=(98, 74, 56, 255), outline=(62, 46, 34, 255))
    colors = [(198, 64, 64, 255), (212, 164, 60, 255), (84, 156, 112, 255)]
    for idx, color in enumerate(colors):
        draw.rectangle([(2 + idx * 4, 2), (5 + idx * 4, 6)], fill=color)
    draw.line([(1, 8), (TILE_SIZE - 2, 8)], fill=(54, 38, 28, 255))


@register("dormitory")
def draw_dormitory(tile: Image.Image, draw: ImageDraw.ImageDraw) -> None:
    draw.rectangle([(0, 0), (TILE_SIZE - 1, TILE_SIZE - 1)], fill=(84, 66, 52, 255), outline=(46, 36, 28, 255))
    for offset in (2, 9):
        draw.rectangle([(offset, 3), (offset + 4, 12)], fill=(46, 36, 32, 255))
        draw.rectangle([(offset, 4), (offset + 4, 7)], fill=(138, 198, 222, 255))
        draw.rectangle([(offset, 7), (offset + 4, 8)], fill=(230, 236, 240, 255))


@register("brewery")
def draw_brewery(tile: Image.Image, draw: ImageDraw.ImageDraw) -> None:
    draw.rectangle([(0, 0), (TILE_SIZE - 1, TILE_SIZE - 1)], fill=(88, 62, 40, 255), outline=(58, 40, 28, 255))
    draw.ellipse([(3, 4), (12, 13)], fill=(142, 96, 62, 255), outline=(66, 42, 22, 255))
    draw.line([(3, 9), (12, 9)], fill=(186, 134, 84, 255))


@register("storage")
def draw_storage(tile: Image.Image, draw: ImageDraw.ImageDraw) -> None:
    draw.rectangle([(0, 0), (TILE_SIZE - 1, TILE_SIZE - 1)], fill=(102, 78, 44, 255), outline=(70, 54, 32, 255))
    draw.rectangle([(3, 3), (12, 12)], outline=(62, 48, 28, 255))
    draw.line([(3, 7), (12, 7)], fill=(62, 48, 28, 255))
    draw.line([(7, 3), (7, 12)], fill=(62, 48, 28, 255))


@register("shrine")
def draw_shrine(tile: Image.Image, draw: ImageDraw.ImageDraw) -> None:
    draw.rectangle([(0, 0), (TILE_SIZE - 1, TILE_SIZE - 1)], fill=(48, 42, 78, 255), outline=(28, 24, 46, 255))
    draw.ellipse([(5, 4), (10, 9)], fill=(182, 176, 224, 255))
    draw.rectangle([(6, 9), (9, 12)], fill=(224, 212, 128, 255))


@register("throne")
def draw_throne(tile: Image.Image, draw: ImageDraw.ImageDraw) -> None:
    draw.rectangle([(0, 0), (TILE_SIZE - 1, TILE_SIZE - 1)], fill=(94, 74, 50, 255), outline=(60, 46, 30, 255))
    draw.rectangle([(5, 4), (10, 12)], fill=(198, 156, 60, 255), outline=(132, 100, 38, 255))
    draw.rectangle([(6, 5), (9, 8)], fill=(238, 214, 120, 255))


@register("garden")
def draw_garden(tile: Image.Image, draw: ImageDraw.ImageDraw) -> None:
    draw.rectangle([(0, 0), (TILE_SIZE - 1, TILE_SIZE - 1)], fill=(54, 88, 62, 255), outline=(32, 52, 38, 255))
    mushrooms = [(4, 9, (198, 90, 98, 255)), (9, 7, (188, 130, 202, 255)), (12, 10, (230, 186, 96, 255))]
    for x, y, cap in mushrooms:
        draw.rectangle([(x - 1, y + 2), (x + 1, y + 4)], fill=(224, 224, 210, 255))
        draw.rectangle([(x - 2, y), (x + 2, y + 1)], fill=cap)


@register("water")
def draw_water(tile: Image.Image, draw: ImageDraw.ImageDraw) -> None:
    draw.rectangle([(0, 0), (TILE_SIZE - 1, TILE_SIZE - 1)], fill=(30, 92, 132, 255), outline=(14, 50, 76, 255))
    for y in range(3, TILE_SIZE - 1, 4):
        draw.arc([(1, y - 2), (TILE_SIZE - 2, y + 2)], start=0, end=180, fill=(120, 196, 226, 255))


@register("stairs")
def draw_stairs(tile: Image.Image, draw: ImageDraw.ImageDraw) -> None:
    draw.rectangle([(0, 0), (TILE_SIZE - 1, TILE_SIZE - 1)], fill=(70, 70, 70, 255), outline=(40, 40, 40, 255))
    for step in range(4):
        y = 3 + step * 3
        draw.rectangle([(2, y), (13, y + 1)], fill=(130, 130, 130, 255))
        draw.line([(2, y + 2), (13, y + 2)], fill=(46, 46, 46, 255))


def build_tilesheet() -> Image.Image:
    rows = (len(TILES) + COLUMNS - 1) // COLUMNS
    sheet = Image.new("RGBA", (COLUMNS * TILE_SIZE, rows * TILE_SIZE), (0, 0, 0, 0))
    for index, (name, painter) in enumerate(TILES):
        tile = Image.new("RGBA", (TILE_SIZE, TILE_SIZE), (0, 0, 0, 0))
        draw = ImageDraw.Draw(tile)
        painter(tile, draw)
        x = (index % COLUMNS) * TILE_SIZE
        y = (index // COLUMNS) * TILE_SIZE
        sheet.paste(tile, (x, y))
    return sheet


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate the dwarfhold interior tilesheet without committing binary assets.")
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        default=Path(__file__).parents[1] / "tilesheet" / "dwarfhold_interior.png",
        help="Where to write the PNG tilesheet (default: %(default)s).",
    )
    parser.add_argument(
        "--print-base64",
        action="store_true",
        help="Print the generated PNG as a base64 string so it can be downloaded without committing binaries.",
    )
    args = parser.parse_args()

    sheet = build_tilesheet()

    if args.output is not None:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        sheet.save(args.output)
        print(f"Saved dwarfhold tilesheet to {args.output}", file=sys.stderr)

    if args.print_base64:
        buffer = BytesIO()
        sheet.save(buffer, format="PNG")
        encoded = base64.b64encode(buffer.getvalue()).decode("ascii")
        print(encoded)

