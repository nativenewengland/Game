extends Node2D

@export var message: String = "Godot stub for browser game"
@export var source_repo_url: String = "https://example.com"

func _ready() -> void:
    print(message)
    print("Import assets from the browser version and rewire logic here.")
