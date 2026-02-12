class_name WorldGen
extends Node

const DIRECTION_OFFSETS: Array[Vector2i] = [
    Vector2i(-1, -1), Vector2i(0, -1), Vector2i(1, -1),
    Vector2i(-1, 0), Vector2i(1, 0),
    Vector2i(-1, 1), Vector2i(0, 1), Vector2i(1, 1),
]

const CULTURE_LIBRARY: Dictionary = {
    "humans": {"label": "Humans", "color": Color("#e8d5b7")},
    "elves": {"label": "Elves", "color": Color("#78d68f")},
    "wood_elves": {"label": "Wood Elves", "color": Color("#4caf50")},
    "dwarves": {"label": "Dwarves", "color": Color("#d2a679")},
    "halflings": {"label": "Halflings", "color": Color("#f5e89a")},
    "gnomes": {"label": "Gnomes", "color": Color("#f7b267")},
    "ogres": {"label": "Ogres", "color": Color("#8d6a9f")},
    "trolls": {"label": "Trolls", "color": Color("#4a7c59")},
    "harpies": {"label": "Harpies", "color": Color("#9ba9c4")},
    "giants": {"label": "Giants", "color": Color("#b0a8b9")},
    "dragons": {"label": "Dragons", "color": Color("#d7263d")},
    "merfolks": {"label": "Merfolks", "color": Color("#4db6e2")},
    "fae": {"label": "Fae", "color": Color("#c77dff")},
    "beastmen": {"label": "Beastmen", "color": Color("#7c5c3e")},
    "snakemen": {"label": "Snakemen", "color": Color("#7fbf3f")},
    "centaurs": {"label": "Centaurs", "color": Color("#ad7a53")},
    "gnolls": {"label": "Gnolls", "color": Color("#a57939")},
    "quilboar": {"label": "Quilboar", "color": Color("#7e5a9b")},
    "fimir": {"label": "Fimir", "color": Color("#3f6c6f")},
    "tuskar": {"label": "Tuskar", "color": Color("#cfe8ff")},
    "demons": {"label": "Demons", "color": Color("#901f3d")},
    "minor_folk": {"label": "Minor Folk", "color": Color("#dfc27d")},
    "others": {"label": "Others", "color": Color("#9aa0a6")},
}

const AMBIENT_STRUCTURE_OPTIONS_BY_CULTURE: Dictionary = {
    "humans": [
        "Wayside Shrine",
        {"label": "Homestead", "key": "homestead", "disallowForestOverlay": true},
        {"label": "Lumber Mill", "key": "lumber_mill", "requiresTreeNeighbor": true},
    ],
    "elves": [
        "Moonwell",
        {"label": "Great Tree", "key": "great_tree", "requiresTreeNeighbor": true},
    ],
    "wood_elves": [
        "Moonwell",
        {"label": "Great Tree", "key": "great_tree", "requiresTreeOverlay": true},
    ],
    "dwarves": [
        {"label": "Stone Marker", "requiresMountainOverlay": true},
        "Watch Cairn",
    ],
    "dragons": [
        {"label": "Sleeping Dragon", "key": "sleeping_dragon", "requiresMountainOverlay": true},
    ],
    "demons": ["Ruin Sigil", "Infernal Idol"],
    "others": ["Wayside Shrine", "Old Camp", "Weathered Totem"],
}

@export var config: WorldGenConfig

func _ready() -> void:
    if config == null:
        config = WorldGenConfig.new()

func apply_cultural_influence(
    width: int,
    height: int,
    tiles: Array,
    settlements: Array,
    factions: Array,
    is_land_base_tile_fn: Callable,
    seed_number: int,
    wood_elf_territory_info: Dictionary
) -> Dictionary:
    _ = factions
    _reset_cultural_state(tiles)
    var sources: Array = _build_cultural_sources(width, height, tiles, settlements, is_land_base_tile_fn, seed_number)
    _apply_sources_to_tiles(width, height, tiles, sources, is_land_base_tile_fn)
    _resolve_tile_cultural_influence(tiles)
    _place_ambient_structures(width, height, tiles, is_land_base_tile_fn, seed_number, wood_elf_territory_info)
    return {
        "dominant_culture_tint": build_dominant_culture_tint_overlay(tiles),
        "strength_heatmap": build_strength_heatmap_overlay(tiles),
        "ambient_icons": build_ambient_structure_overlay(tiles),
    }

func influence_description_for_strength(strength: float) -> String:
    if strength >= 0.85:
        return "Seat of Power"
    if strength >= 0.65:
        return "Heartland"
    if strength >= 0.45:
        return "Core Territory"
    if strength >= 0.25:
        return "Border March"
    if strength >= 0.12:
        return "Outer Reach"
    return "Faint Influence"

func build_dominant_culture_tint_overlay(tiles: Array) -> Array:
    var overlay: Array = []
    overlay.resize(tiles.size())
    for i in tiles.size():
        var tile: TileData = tiles[i]
        if tile.cultural_influence == null:
            overlay[i] = Color(0, 0, 0, 0)
            continue
        var color_value: Variant = tile.cultural_influence.get("color", Color(0, 0, 0, 0))
        var tint: Color = color_value if color_value is Color else Color(str(color_value))
        tint.a = clampf(tile.cultural_influence.get("strength", 0.0), 0.0, 1.0)
        overlay[i] = tint
    return overlay

func build_strength_heatmap_overlay(tiles: Array) -> Array:
    var overlay: Array = []
    overlay.resize(tiles.size())
    for i in tiles.size():
        var tile: TileData = tiles[i]
        var strength: float = 0.0
        if tile.cultural_influence != null:
            strength = clampf(tile.cultural_influence.get("strength", 0.0), 0.0, 1.0)
        overlay[i] = Color(strength, 0.0, 1.0 - strength, 0.65)
    return overlay

func build_ambient_structure_overlay(tiles: Array) -> Array:
    var overlay: Array = []
    overlay.resize(tiles.size())
    for i in tiles.size():
        var tile: TileData = tiles[i]
        if tile.ambient_structure == null:
            overlay[i] = ""
            continue
        overlay[i] = tile.ambient_structure.get("key", "")
    return overlay

func _reset_cultural_state(tiles: Array) -> void:
    for tile_variant in tiles:
        var tile: TileData = tile_variant
        tile.cultural_influence = null
        tile.ambient_structure = null
        tile.cultural_influence_scores.clear()

func _build_cultural_sources(
    width: int,
    height: int,
    tiles: Array,
    settlements: Array,
    is_land_base_tile_fn: Callable,
    seed_number: int
) -> Array:
    var sources: Array = []
    sources.append_array(_build_settlement_sources(settlements))
    sources.append_array(_build_biome_sources(width, height, tiles, is_land_base_tile_fn, seed_number))
    return sources

func _build_settlement_sources(settlements: Array) -> Array:
    var sources: Array = []
    for settlement_variant in settlements:
        var settlement: Dictionary = settlement_variant
        var settlement_type: String = str(settlement.get("type", "default")).to_lower()
        var profile: Dictionary = config.settlement_type_profiles.get(
            settlement_type,
            config.settlement_type_profiles.get("default", {})
        )
        var claim_radius: float = float(settlement.get("claim_radius", 6.0))
        var radius_multiplier: float = float(profile.get("radius_multiplier", 1.0))
        var radius: float = maxf(config.minimum_settlement_radius, claim_radius * radius_multiplier)
        var falloff: float = maxf(0.1, float(profile.get("falloff", 1.6)))
        var entries: Array = _entries_from_breakdown(
            settlement.get("population_breakdown", profile.get("defaults", {"humans": 100.0}))
        )
        if entries.is_empty():
            continue
        sources.append({
            "x": int(settlement.get("x", 0)),
            "y": int(settlement.get("y", 0)),
            "radius": radius,
            "falloff": falloff,
            "entries": entries,
        })
    return sources

func _build_biome_sources(
    width: int,
    height: int,
    tiles: Array,
    is_land_base_tile_fn: Callable,
    seed_number: int
) -> Array:
    var sources: Array = []
    for y in height:
        for x in width:
            var idx: int = _index_for(width, x, y)
            if idx < 0 || idx >= tiles.size():
                continue
            var tile: TileData = tiles[idx]
            var biome_key: String = str(tile.biome_type).to_lower()
            var threshold: float = float(config.biome_source_thresholds.get(
                biome_key,
                config.biome_source_thresholds.get("fallback", 0.999)
            ))
            var roll: float = hash_coords(seed_number, x, y, "biome-source-threshold")
            if roll < threshold:
                continue
            var entries: Array = _ambient_entries_for_tile(tile, x, y, seed_number)
            if entries.is_empty():
                continue
            var radius_roll: float = hash_coords(seed_number, x, y, "biome-source-radius")
            var radius: float = config.ambient_source_base_radius + radius_roll * config.ambient_source_radius_jitter
            var tile_filter: Callable = Callable()
            if _is_water_tile(tile, is_land_base_tile_fn):
                tile_filter = Callable(self, "_water_or_shore_filter")
            sources.append({
                "x": x,
                "y": y,
                "radius": maxf(6.0, radius),
                "falloff": 1.8,
                "entries": entries,
                "tile_filter": tile_filter,
            })
    return sources

func _ambient_entries_for_tile(tile: TileData, x: int, y: int, seed_number: int) -> Array:
    var biome: String = str(tile.biome_type).to_lower()
    var options: Array = []
    match biome:
        "coast", "ocean", "sea", "water", "lake":
            options = [{"key": "merfolks", "share": 1.0}]
        "forest":
            options = [
                {"key": "fae", "share": 0.58},
                {"key": "beastmen", "share": 0.34},
                {"key": "minor_folk", "share": 0.08},
            ]
        "mountain":
            options = [
                {"key": "gnomes", "share": 0.20},
                {"key": "ogres", "share": 0.24},
                {"key": "trolls", "share": 0.18},
                {"key": "harpies", "share": 0.16},
                {"key": "giants", "share": 0.17},
                {"key": "dragons", "share": 0.05},
            ]
        "jungle":
            options = [{"key": "snakemen", "share": 1.0}]
        "grassland":
            options = [
                {"key": "centaurs", "share": 0.45},
                {"key": "gnolls", "share": 0.3},
                {"key": "quilboar", "share": 0.25},
            ]
        "badlands":
            options = [
                {"key": "gnolls", "share": 0.4},
                {"key": "quilboar", "share": 0.3},
                {"key": "ogres", "share": 0.3},
            ]
        "marsh", "swamp":
            options = [{"key": "fimir", "share": 0.65}, {"key": "ogres", "share": 0.35}]
        "tundra":
            options = [{"key": "tuskar", "share": 1.0}]
        "dungeon", "evil_tower", "evil_wizard_tower":
            options = [{"key": "demons", "share": 1.0}]
        "cave":
            options = [{"key": "dragons", "share": 1.0}]
        _:
            options = [
                {"key": "humans", "share": 0.75},
                {"key": "minor_folk", "share": 0.25},
            ]
    if hash_coords(seed_number, x, y, "ambient-minor-human") > 0.985:
        options.append({"key": "humans", "share": 0.14})
    return _normalize_entry_shares(options)

func _apply_sources_to_tiles(
    width: int,
    height: int,
    tiles: Array,
    sources: Array,
    is_land_base_tile_fn: Callable
) -> void:
    for source_variant in sources:
        var source: Dictionary = source_variant
        var source_x: int = int(source.get("x", 0))
        var source_y: int = int(source.get("y", 0))
        var radius: float = float(source.get("radius", 0.0))
        var radius_ceiling: int = int(ceil(radius))
        var falloff: float = maxf(0.1, float(source.get("falloff", 1.0)))
        var entries: Array = source.get("entries", [])
        var tile_filter: Callable = source.get("tile_filter", Callable())
        var has_filter: bool = tile_filter.is_valid()
        var min_x: int = maxi(0, source_x - radius_ceiling)
        var max_x: int = mini(width - 1, source_x + radius_ceiling)
        var min_y: int = maxi(0, source_y - radius_ceiling)
        var max_y: int = mini(height - 1, source_y + radius_ceiling)
        for y in range(min_y, max_y + 1):
            for x in range(min_x, max_x + 1):
                var idx: int = _index_for(width, x, y)
                if idx < 0 || idx >= tiles.size():
                    continue
                var tile: TileData = tiles[idx]
                var is_land: bool = bool(is_land_base_tile_fn.call(tile.base))
                if has_filter:
                    var passes_filter: bool = bool(tile_filter.call(tile, is_land))
                    if !passes_filter:
                        continue
                elif !is_land:
                    continue
                var dx: float = float(x - source_x)
                var dy: float = float(y - source_y)
                var distance: float = sqrt(dx * dx + dy * dy)
                if distance > radius:
                    continue
                var proximity: float = clampf(1.0 - (distance / radius), 0.0, 1.0)
                var influence_factor: float = pow(proximity, falloff)
                for entry_variant in entries:
                    var entry: Dictionary = entry_variant
                    var key: String = str(entry.get("key", "others"))
                    var contribution: float = float(entry.get("share", 0.0)) * influence_factor
                    tile.cultural_influence_scores[key] = float(tile.cultural_influence_scores.get(key, 0.0)) + contribution

func _resolve_tile_cultural_influence(tiles: Array) -> void:
    for tile_variant in tiles:
        var tile: TileData = tile_variant
        if tile.cultural_influence_scores.is_empty():
            tile.cultural_influence = null
            continue
        var total_score: float = 0.0
        var best_key: String = ""
        var best_score: float = -1.0
        for key_variant in tile.cultural_influence_scores.keys():
            var key: String = str(key_variant)
            var score: float = maxf(0.0, float(tile.cultural_influence_scores[key]))
            if score <= 0.0:
                continue
            total_score += score
            if score > best_score:
                best_key = key
                best_score = score
        if total_score <= 0.0 || best_key == "":
            tile.cultural_influence = null
            continue
        var breakdown: Array = []
        for key_variant in tile.cultural_influence_scores.keys():
            var key: String = str(key_variant)
            var score: float = maxf(0.0, float(tile.cultural_influence_scores[key]))
            if score <= 0.0:
                continue
            var culture_meta: Dictionary = _culture_meta(key)
            breakdown.append({
                "key": key,
                "label": culture_meta.get("label", key.capitalize()),
                "color": culture_meta.get("color", Color.GRAY),
                "strength": score,
                "share": score / total_score,
            })
        breakdown.sort_custom(func(a: Dictionary, b: Dictionary) -> bool: return float(a["strength"]) > float(b["strength"]))
        var dominant_meta: Dictionary = _culture_meta(best_key)
        tile.cultural_influence = {
            "key": best_key,
            "label": dominant_meta.get("label", best_key.capitalize()),
            "color": dominant_meta.get("color", Color.GRAY),
            "strength": clampf(best_score, 0.0, 1.0),
            "breakdown": breakdown,
            "description": influence_description_for_strength(clampf(best_score, 0.0, 1.0)),
        }

func _place_ambient_structures(
    width: int,
    height: int,
    tiles: Array,
    is_land_base_tile_fn: Callable,
    seed_number: int,
    wood_elf_territory_info: Dictionary
) -> void:
    for y in height:
        for x in width:
            var idx: int = _index_for(width, x, y)
            if idx < 0 || idx >= tiles.size():
                continue
            var tile: TileData = tiles[idx]
            if tile.ambient_structure != null || tile.structure != null || tile.river:
                continue
            if !bool(is_land_base_tile_fn.call(tile.base)):
                continue
            if tile.cultural_influence == null:
                continue
            var strength: float = clampf(float(tile.cultural_influence.get("strength", 0.0)), 0.0, 1.0)
            if strength < config.ambient_strength_minimum:
                continue
            var culture_key: String = str(tile.cultural_influence.get("key", "others"))
            var options: Array = AMBIENT_STRUCTURE_OPTIONS_BY_CULTURE.get(
                culture_key,
                AMBIENT_STRUCTURE_OPTIONS_BY_CULTURE.get("others", [])
            )
            if options.is_empty():
                continue
            var chance: float = config.ambient_base_chance + strength * config.ambient_strength_scalar
            var placement_roll: float = hash_coords(seed_number, x, y, "ambient-place-%s" % culture_key)
            if placement_roll >= chance:
                continue
            var eligible: Array = _filter_ambient_options(width, height, tiles, x, y, options, culture_key, wood_elf_territory_info)
            if eligible.is_empty():
                continue
            var selection_roll: float = hash_coords(seed_number, x, y, "ambient-select-%s" % culture_key)
            var selected_index: int = int(floor(selection_roll * float(eligible.size()))) % eligible.size()
            var chosen: Dictionary = eligible[selected_index]
            _assign_ambient_structure(width, tiles, x, y, chosen, culture_key, tile.cultural_influence, seed_number)

func _filter_ambient_options(
    width: int,
    height: int,
    tiles: Array,
    x: int,
    y: int,
    options: Array,
    culture_key: String,
    wood_elf_territory_info: Dictionary
) -> Array:
    var eligible: Array = []
    var idx: int = _index_for(width, x, y)
    var tile: TileData = tiles[idx]
    var has_tree_neighbor: bool = _has_tree_neighbor(width, height, tiles, x, y)
    var has_tree_overlay: bool = _has_tree_overlay(tile)
    var has_mountain_overlay: bool = _has_mountain_overlay(tile)
    for option_variant in options:
        var option: Dictionary = _normalize_option(option_variant)
        var key: String = str(option.get("key", ""))
        if bool(option.get("requiresTreeNeighbor", false)) and !has_tree_neighbor:
            continue
        if bool(option.get("requiresTreeOverlay", false)) and !has_tree_overlay:
            continue
        if bool(option.get("requiresMountainOverlay", false)) and !has_mountain_overlay:
            continue
        if bool(option.get("disallowForestOverlay", false)) and has_tree_overlay:
            continue
        if key == "lumber_mill" and culture_key == "wood_elves" and _is_in_wood_elf_territory(x, y, wood_elf_territory_info):
            continue
        eligible.append(option)
    return eligible

func _assign_ambient_structure(
    width: int,
    tiles: Array,
    x: int,
    y: int,
    option: Dictionary,
    culture_key: String,
    influence: Dictionary,
    seed_number: int
) -> void:
    var idx: int = _index_for(width, x, y)
    var tile: TileData = tiles[idx]
    var key: String = str(option.get("key", ""))
    var label: String = str(option.get("label", key.capitalize()))
    tile.ambient_structure = {
        "key": key,
        "label": label,
        "culture": culture_key,
        "cultureLabel": str(influence.get("label", culture_key.capitalize())),
    }
    match key:
        "lumber_mill":
            tile.structure = "AMBIENT_LUMBER_MILL"
            tile.structure_details = {"type": "lumber_mill"}
            _convert_nearby_trees_to_cut_variant(width, tiles, x, y)
        "homestead":
            tile.structure = "AMBIENT_HOMESTEAD"
            tile.structure_details = {"type": "homestead"}
        "sleeping_dragon":
            tile.structure = "AMBIENT_SLEEPING_DRAGON"
            tile.structure_details = {"type": "sleeping_dragon"}
        "great_tree":
            var variant_roll: float = hash_coords(seed_number, x, y, "great-tree-variant")
            tile.structure = "AMBIENT_GREAT_TREE" if variant_roll < 0.5 else "AMBIENT_GREAT_TREE_ALT"
            tile.structure_details = {"type": "great_tree"}
        "moonwell":
            tile.structure = "AMBIENT_MOONWELL"
            tile.structure_details = {"type": "moonwell"}
        _:
            tile.structure = null
            tile.structure_details = null

func _convert_nearby_trees_to_cut_variant(width: int, tiles: Array, x: int, y: int) -> void:
    for offset in DIRECTION_OFFSETS:
        var nx: int = x + offset.x
        var ny: int = y + offset.y
        if nx < 0 || ny < 0:
            continue
        var idx: int = _index_for(width, nx, ny)
        if idx < 0 || idx >= tiles.size():
            continue
        var neighbor: TileData = tiles[idx]
        if _has_tree_overlay(neighbor):
            neighbor.overlay = &"cut_tree"

func _normalize_option(option_variant: Variant) -> Dictionary:
    if option_variant is String:
        var label: String = str(option_variant)
        return {"label": label, "key": _slugify(label)}
    var option: Dictionary = option_variant
    var label = str(option.get("label", "Unknown"))
    var normalized: Dictionary = option.duplicate(true)
    normalized["label"] = label
    if !normalized.has("key"):
        normalized["key"] = _slugify(label)
    return normalized

func _entries_from_breakdown(breakdown_variant: Variant) -> Array:
    var entries: Array = []
    if breakdown_variant is Dictionary:
        var totals: Dictionary = breakdown_variant
        var total: float = 0.0
        for val in totals.values():
            total += maxf(0.0, float(val))
        if total <= 0.0:
            return []
        for key_variant in totals.keys():
            var key: String = str(key_variant)
            var share: float = maxf(0.0, float(totals[key])) / total
            var meta: Dictionary = _culture_meta(key)
            entries.append({
                "key": key,
                "share": share,
                "label": meta.get("label", key.capitalize()),
                "color": meta.get("color", Color.GRAY),
            })
    return _normalize_entry_shares(entries)

func _normalize_entry_shares(entries: Array) -> Array:
    var total: float = 0.0
    for entry_variant in entries:
        var entry: Dictionary = entry_variant
        total += maxf(0.0, float(entry.get("share", 0.0)))
    if total <= 0.0:
        return []
    var normalized: Array = []
    for entry_variant in entries:
        var entry: Dictionary = entry_variant
        var key: String = str(entry.get("key", "others"))
        var meta: Dictionary = _culture_meta(key)
        normalized.append({
            "key": key,
            "share": maxf(0.0, float(entry.get("share", 0.0))) / total,
            "label": entry.get("label", meta.get("label", key.capitalize())),
            "color": entry.get("color", meta.get("color", Color.GRAY)),
        })
    return normalized

func _water_or_shore_filter(tile: TileData, is_land: bool) -> bool:
    return !is_land || tile.coast_proximity >= 0.2

func _has_tree_neighbor(width: int, height: int, tiles: Array, x: int, y: int) -> bool:
    for offset in DIRECTION_OFFSETS:
        var nx: int = x + offset.x
        var ny: int = y + offset.y
        if nx < 0 || ny < 0 || nx >= width || ny >= height:
            continue
        var idx: int = _index_for(width, nx, ny)
        if idx < 0 || idx >= tiles.size():
            continue
        if _has_tree_overlay(tiles[idx]):
            return true
    return false

func _has_tree_overlay(tile: TileData) -> bool:
    var value: String = str(tile.overlay).to_lower()
    return value.contains("tree") || value.contains("forest") || tile.forest_canopy_density >= 0.35

func _has_mountain_overlay(tile: TileData) -> bool:
    var overlay_value: String = str(tile.overlay).to_lower()
    var hill_value: String = str(tile.hill_overlay).to_lower()
    return overlay_value.contains("mount") || hill_value.contains("mount") || str(tile.biome_type).to_lower() == "mountain"

func _is_in_wood_elf_territory(x: int, y: int, info: Dictionary) -> bool:
    if info.has("radius"):
        var cx: float = float(info.get("x", 0.0))
        var cy: float = float(info.get("y", 0.0))
        var radius: float = float(info.get("radius", 0.0))
        if radius > 0.0:
            return Vector2(cx, cy).distance_to(Vector2(float(x), float(y))) <= radius
    var claimed_tiles: Array = info.get("claimed_tiles", [])
    for tile_variant in claimed_tiles:
        var coord: Vector2i = tile_variant
        if coord.x == x && coord.y == y:
            return true
    return false

func _culture_meta(culture_key: String) -> Dictionary:
    return CULTURE_LIBRARY.get(culture_key, CULTURE_LIBRARY["others"])

func _is_water_tile(tile: TileData, is_land_base_tile_fn: Callable) -> bool:
    return !bool(is_land_base_tile_fn.call(tile.base))

func _index_for(width: int, x: int, y: int) -> int:
    return y * width + x

func hash_coords(seed: int, x: int, y: int, salt: String) -> float:
    var value: int = int(seed) ^ int(x * 73856093) ^ int(y * 19349663) ^ int(salt.hash())
    value = int((value ^ (value >> 16)) * 2246822519)
    value = int((value ^ (value >> 13)) * 3266489917)
    value = value ^ (value >> 16)
    var unsigned: int = value & 0x7fffffff
    return float(unsigned) / 2147483647.0

func export_tile_save_data(tiles: Array) -> Array:
    var data: Array = []
    data.resize(tiles.size())
    for i in tiles.size():
        var tile: TileData = tiles[i]
        data[i] = tile.to_save_data()
    return data

func _slugify(value: String) -> String:
    return value.to_lower().replace(" ", "_").replace("-", "_")
