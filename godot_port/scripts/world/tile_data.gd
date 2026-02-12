class_name TileData
extends RefCounted

var base: String = ""
var biome_type: String = ""
var overlay: StringName = &""
var hill_overlay: StringName = &""
var structure: Variant = null
var structure_details: Variant = null
var river: bool = false
var coast_proximity: float = 0.0
var forest_canopy_density: float = 0.0
var cultural_influence: Variant = null
var cultural_influence_scores: Dictionary = {}
var ambient_structure: Variant = null

func to_save_data() -> Dictionary:
    return {
        "base": base,
        "biome_type": biome_type,
        "overlay": String(overlay),
        "hill_overlay": String(hill_overlay),
        "structure": structure,
        "structure_details": structure_details,
        "river": river,
        "coast_proximity": coast_proximity,
        "forest_canopy_density": forest_canopy_density,
        "cultural_influence": cultural_influence,
        "ambient_structure": ambient_structure,
    }
