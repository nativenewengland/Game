class_name WorldGenConfig
extends Resource

@export var minimum_settlement_radius: float = 8.0
@export var ambient_base_chance: float = 0.0015
@export var ambient_strength_scalar: float = 0.0075
@export var ambient_strength_minimum: float = 0.08
@export var ambient_source_base_radius: float = 7.5
@export var ambient_source_radius_jitter: float = 7.0

@export var biome_source_thresholds: Dictionary = {
    "coast": 0.992,
    "forest": 0.988,
    "mountain": 0.992,
    "jungle": 0.993,
    "grassland": 0.994,
    "badlands": 0.994,
    "marsh": 0.993,
    "tundra": 0.994,
    "dungeon": 0.996,
    "cave": 0.9965,
    "fallback": 0.998,
}

@export var settlement_type_profiles: Dictionary = {
    "capital": {
        "radius_multiplier": 1.7,
        "falloff": 1.2,
        "defaults": {"humans": 70.0, "dwarves": 10.0, "elves": 10.0, "halflings": 10.0},
    },
    "city": {
        "radius_multiplier": 1.35,
        "falloff": 1.35,
        "defaults": {"humans": 75.0, "dwarves": 8.0, "elves": 7.0, "halflings": 10.0},
    },
    "town": {
        "radius_multiplier": 1.1,
        "falloff": 1.5,
        "defaults": {"humans": 82.0, "dwarves": 6.0, "elves": 4.0, "halflings": 8.0},
    },
    "village": {
        "radius_multiplier": 0.95,
        "falloff": 1.65,
        "defaults": {"humans": 88.0, "halflings": 8.0, "gnomes": 4.0},
    },
    "default": {
        "radius_multiplier": 1.0,
        "falloff": 1.6,
        "defaults": {"humans": 100.0},
    },
}
