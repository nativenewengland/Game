extends Node

# Typed dictionary prevents Variant inference so append is recognized.
var coastline_groups: Dictionary[String, Array[Vector2i]] = {
    "lake_island": [],
    "sea_island": [],
}

func add_coastline_cell(coord: Vector2i, adjacent_lake: bool, adjacent_ocean: bool) -> void:
    if adjacent_lake || adjacent_ocean:
        if adjacent_lake && !adjacent_ocean:
            coastline_groups["lake_island"].append(coord)
        else:
            coastline_groups["sea_island"].append(coord)
