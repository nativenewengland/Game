extends Node

# Typed dictionary prevents Variant inference so append is recognized.
var coastline_groups: Dictionary[String, Array[Vector2i]] = {
    "lake_island": Array[Vector2i](),
    "sea_island": Array[Vector2i](),
}

func add_coastline_cell(coord: Vector2i, adjacent_lake: bool, adjacent_ocean: bool) -> void:
    if adjacent_lake || adjacent_ocean:
        if adjacent_lake && !adjacent_ocean:
            var lake_islands: Array[Vector2i] = coastline_groups["lake_island"]
            lake_islands.append(coord)
        else:
            var sea_islands: Array[Vector2i] = coastline_groups["sea_island"]
            sea_islands.append(coord)
