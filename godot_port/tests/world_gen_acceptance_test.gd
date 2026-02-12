extends SceneTree

const WorldGen = preload("res://scripts/world/world_gen.gd")
const TileData = preload("res://scripts/world/tile_data.gd")

func _init() -> void:
    run_tests()
    quit()

func run_tests() -> void:
    var width := 14
    var height := 14
    var settlements := [
        {
            "x": 4,
            "y": 4,
            "type": "city",
            "claim_radius": 6,
            "population_breakdown": {"humans": 70.0, "elves": 30.0},
        }
    ]

    var world_a := _generate_world(width, height, 1337, settlements)
    var world_b := _generate_world(width, height, 1337, settlements)
    var world_c := _generate_world(width, height, 7331, settlements)

    # 1) Same seed deterministic
    assert(JSON.stringify(world_a["save"]) == JSON.stringify(world_b["save"]), "Same seed should match exactly")

    # 2) Different seed different distributions
    assert(JSON.stringify(world_a["save"]) != JSON.stringify(world_c["save"]), "Different seed should differ")

    # 3) Settlement influence decreases with distance
    var center: TileData = world_a["tiles"][_idx(width, 4, 4)]
    var edge: TileData = world_a["tiles"][_idx(width, 11, 11)]
    var center_strength: float = center.cultural_influence.get("strength", 0.0) if center.cultural_influence != null else 0.0
    var edge_strength: float = edge.cultural_influence.get("strength", 0.0) if edge.cultural_influence != null else 0.0
    assert(center_strength >= edge_strength, "Center influence should not be weaker than distant tile")

    # 4) structure placement validity constraints
    for tile_variant in world_a["tiles"]:
        var tile: TileData = tile_variant
        if tile.ambient_structure == null:
            continue
        assert(tile.structure == null or !tile.river, "Ambient structure cannot be on river tile")
        assert(tile.structure == null or tile.base != "ocean", "Ambient structure cannot be on water tile")

    # 5) no source tile has null influence (corner with muted biomes)
    var isolated: TileData = world_a["tiles"][_idx(width, 13, 13)]
    if isolated.cultural_influence_scores.is_empty():
        assert(isolated.cultural_influence == null, "No scores should resolve to null cultural influence")

    # 6) breakdown sums to ~1.0
    for tile_variant in world_a["tiles"]:
        var tile: TileData = tile_variant
        if tile.cultural_influence == null:
            continue
        var total_share := 0.0
        for entry_variant in tile.cultural_influence.get("breakdown", []):
            total_share += float(entry_variant.get("share", 0.0))
        assert(abs(total_share - 1.0) <= 0.001, "Breakdown shares should normalize to 1")

func _generate_world(width: int, height: int, seed_number: int, settlements: Array) -> Dictionary:
    var world_gen: Node = WorldGen.new()
    var tiles: Array = []
    tiles.resize(width * height)
    for y in height:
        for x in width:
            var t := TileData.new()
            t.base = "ocean" if x == 0 or y == 0 else "grass"
            t.biome_type = "forest" if x > 8 and y < 4 else "grassland"
            t.overlay = &"trees" if x > 8 and y < 4 else &""
            t.coast_proximity = 1.0 if x <= 2 or y <= 2 else 0.0
            t.forest_canopy_density = 0.8 if t.overlay == &"trees" else 0.0
            tiles[_idx(width, x, y)] = t
    var is_land: Callable = func(base: String) -> bool:
        return base != "ocean"
    world_gen.apply_cultural_influence(width, height, tiles, settlements, [], is_land, seed_number, {"x": 10, "y": 2, "radius": 2.0})
    return {
        "tiles": tiles,
        "save": world_gen.export_tile_save_data(tiles),
    }

func _idx(width: int, x: int, y: int) -> int:
    return y * width + x
