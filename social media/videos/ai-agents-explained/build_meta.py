import json
with open("public/audio/tts_meta.json") as f:
    entries = json.load(f)
voices = []
for e in entries:
    voices.append({
        "frame": e["frame"],
        "path": e["path"],
        "duration_s": e["duration_s"],
        "words": []
    })
meta = {
    "tts_provider": "edge-tts",
    "voice_id": "en-US-GuyNeural",
    "bgm": None,
    "voices": voices,
    "sfx": [],
    "total_duration_s": sum(v["duration_s"] for v in voices)
}
with open("audio_meta.json", "w") as f:
    json.dump(meta, f, indent=2)
print(f"Done. Total: {meta['total_duration_s']:.1f}s")
