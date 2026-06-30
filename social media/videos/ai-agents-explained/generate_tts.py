"""Generate TTS audio using edge-tts (Microsoft Edge online TTS)."""
import os, sys, re, json, asyncio, subprocess
import edge_tts

SCRIPT_PATH = sys.argv[1] if len(sys.argv) > 1 else "SCRIPT.md"
OUT_DIR = sys.argv[2] if len(sys.argv) > 2 else "public/audio"
os.makedirs(OUT_DIR, exist_ok=True)

with open(SCRIPT_PATH, "r", encoding="utf-8") as f:
    script_md = f.read()

# Parse SCRIPT.md
lines = []
cur_frame = None
cur_text = ""
for line in script_md.split("\n"):
    m = re.match(r"#{2,3}\s+.+?\([Ff]rame\s+(\d+)\)", line)
    if m:
        if cur_frame and cur_text.strip():
            lines.append({"frame": cur_frame, "text": cur_text.strip()})
        cur_frame = int(m.group(1))
        cur_text = ""
        continue
    if cur_frame is not None and (line.startswith("    ") or line.startswith("\t")):
        cur_text += " " + line.strip()
if cur_frame is not None and cur_text.strip():
    lines.append({"frame": cur_frame, "text": cur_text.strip()})

print(f"Found {len(lines)} lines to synthesize\n")

async def main():
    results = []
    for entry in lines:
        frame_num = entry["frame"]
        text = entry["text"]
        out_path = os.path.join(os.path.abspath(OUT_DIR), f"frame_{frame_num:02d}.mp3")
        
        print(f"Frame {frame_num}: \"{text[:70]}...\"")
        
        communicate = edge_tts.Communicate(text, voice="en-US-GuyNeural")
        await communicate.save(out_path)
        
        result = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "default=noprint_wrappers=1:nokey=1", out_path],
            capture_output=True, text=True, timeout=15
        )
        duration = float(result.stdout.strip()) if result.stdout.strip() else 0
        
        print(f"  saved ({duration:.1f}s)")
        results.append({
            "id": f"{frame_num:02d}",
            "frame": frame_num,
            "text": text,
            "path": out_path,
            "duration_s": round(duration, 3),
        })

    meta_path = os.path.join(os.path.abspath(OUT_DIR), "tts_meta.json")
    with open(meta_path, "w") as f:
        json.dump(results, f, indent=2)
    print(f"\nDone! Total duration: {sum(r['duration_s'] for r in results):.1f}s")

asyncio.run(main())
