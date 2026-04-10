#!/usr/bin/env python3
"""
Generate 24 runner character images using MiniMax image_generation API.
Style: consistent cute flat cartoon illustration, running themed.
"""

import requests
import os
import time
import json
import base64

API_KEY = os.environ.get("MINIMAX_API_KEY")
API_URL = "https://api.minimax.chat/v1/image_generation"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "public/characters")

# Style prefix for all prompts to ensure consistency
STYLE = "Cute kawaii chibi style flat cartoon illustration of a runner character, "
STYLE_SUFFIX = ", bold outlines, flat colors, clean vector art, white background, no text, square composition, vibrant colors, 1024x1024"

# 24 runner types with English names and image prompts
CHARACTERS = [
    {
        "id": "lone_wolf",
        "cn": "独行侠",
        "en": "Lone Wolf",
        "prompt": "a cool wolf character wearing a running bib and headband, running alone on a mountain trail at golden dawn, confident and solitary, slight smile, wind blowing fur",
    },
    {
        "id": "medal_freak",
        "cn": "完赛怪",
        "en": "Medal Freak",
        "prompt": "an enthusiastic runner character covered in shiny marathon medals around neck and arms, wearing a huge grin, holding up a trophy, sparkling eyes, medals jingling everywhere",
    },
    {
        "id": "shot_hunter",
        "cn": "拍照精",
        "en": "Shot Hunter",
        "prompt": "a stylish runner character holding a smartphone on a selfie stick while running, striking a perfect pose, wearing trendy running outfit, camera flash effects, instagram filter aesthetic",
    },
    {
        "id": "wall_hugger",
        "cn": "撞墙王",
        "en": "Wall Hugger",
        "prompt": "a exhausted runner character literally hugging a brick wall at kilometer 30, sweat drops flying, legs wobbly like noodles, determined but suffering expression, dramatic lighting",
    },
    {
        "id": "bib_hoarder",
        "cn": "号码布收藏家",
        "en": "Bib Hoarder",
        "prompt": "a collector runner character sitting in a room full of race bib numbers pinned everywhere, wearing a running jacket covered in bibs, satisfied smile, bibs hanging like wallpaper",
    },
    {
        "id": "snack_nomad",
        "cn": "补给站流浪者",
        "en": "Snack Nomad",
        "prompt": "a happy runner character at an aid station with mountains of food, holding watermelon in one hand and banana in other, backpack stuffed with snacks, food paradise vibes, drooling slightly",
    },
    {
        "id": "data_cultist",
        "cn": "Garmin信徒",
        "en": "Data Cultist",
        "prompt": "a nerdy runner character worshiping a giant glowing GPS watch like a deity, wearing glasses, surrounded by floating data numbers and heart rate graphs, zealous expression, digital aura",
    },
    {
        "id": "couch_runner",
        "cn": "Keep原住民",
        "en": "Couch Runner",
        "prompt": "a lazy runner character sitting on a couch wearing full running gear, phone showing running app, looking proud, potato chips nearby, fuzzy slippers instead of running shoes, cozy vibes",
    },
    {
        "id": "pack_leader",
        "cn": "跑团团长",
        "en": "Pack Leader",
        "prompt": "a charismatic runner character leading a crowd of runners from the front, wearing a whistle and clipboard, megaphone in hand, enthusiastic cheerleader energy, herding cats energy",
    },
    {
        "id": "weather_nerd",
        "cn": "赛道天气预报员",
        "en": "Weather Nerd",
        "prompt": "an anxious runner character surrounded by multiple weather forecasts and radars, wearing rain jacket under sunny sky, holding umbrella and sunscreen simultaneously, paranoid expression",
    },
    {
        "id": "gear_monk",
        "cn": "装备极简主义者",
        "en": "Gear Monk",
        "prompt": "a zen minimalist runner character with almost no gear, wearing simple t-shirt and shorts, tiny waist pack, meditative peaceful expression, running barefoot style, ultra light and free",
    },
    {
        "id": "gear_panic",
        "cn": "装备焦虑者",
        "en": "Gear Panic",
        "prompt": "a stressed runner character surrounded by piles of running gear, frantically switching between three pairs of shoes, backpack overflowing, panic expression, tangled in compression socks",
    },
    {
        "id": "ghost_runner",
        "cn": "素人跑者",
        "en": "Ghost Runner",
        "prompt": "a mysterious transparent ghostly runner character, barely visible, running silently on a quiet path, no race bib no gadgets, peaceful and invisible, ethereal glowing outline",
    },
    {
        "id": "cyber_runner",
        "cn": "赛博跑者",
        "en": "Cyber Runner",
        "prompt": "a futuristic cyborg runner character with holographic HUD glasses showing real-time stats, neon glowing running shoes, data streams flowing around, futuristic city background",
    },
    {
        "id": "soul_finisher",
        "cn": "精神完赛者",
        "en": "Soul Finisher",
        "prompt": "a spiritual runner character lying in bed under blankets with eyes closed, astral projection of their running spirit crossing a finish line, dreamy ethereal vibes, zen meditation",
    },
    {
        "id": "day_one",
        "cn": "回归初心型",
        "en": "Day One",
        "prompt": "a nostalgic runner character with half their body as a beginner runner and half as experienced, looking at old photos, sparkly eyes remembering first race, sentimental warm glow",
    },
    {
        "id": "hill_victim",
        "cn": "爬山遇难型",
        "en": "Hill Victim",
        "prompt": "a dramatic runner character crawling up an impossibly steep mountain trail, legs like jelly, SOS flag in hand, crying cartoon tears, theatrical suffering, mountain looming above",
    },
    {
        "id": "diy_fuel",
        "cn": "自补给大师",
        "en": "DIY Fuel",
        "prompt": "a prepared runner character with a vest full of organized gel packets and salt pills, military-style supply arrangement, ninja-like efficiency, self-sufficient survival expert vibe",
    },
    {
        "id": "slow_mo",
        "cn": "散步跑者",
        "en": "Slow Mo",
        "prompt": "a super relaxed sloth-like runner character jogging at glacial pace, enjoying scenery, no rush at all, casual walking stance but technically running, zen peaceful smile, snail friend nearby",
    },
    {
        "id": "dnf_phoenix",
        "cn": "DNF重生者",
        "en": "DNF Phoenix",
        "prompt": "a phoenix runner character rising from flames of a DNF failure, determined fierce expression, broken race bib behind them, wings of fire, comeback energy, dramatic rebirth scene",
    },
    {
        "id": "5am_warrior",
        "cn": "打工人跑者",
        "en": "5AM Warrior",
        "prompt": "a tired but determined runner character running at 5am in darkness with headlamp, coffee cup in one hand, briefcase visible nearby, dark circles under eyes but soldiering on, corporate warrior",
    },
    {
        "id": "buffet_warrior",
        "cn": "刷脂战士",
        "en": "Buffet Warrior",
        "prompt": "a food-loving runner character imagining hotpot and BBQ while running, drooling, food thought bubbles above head, running fork and spoon instead of normal gear, food motivation vibes",
    },
    {
        "id": "zen_runner",
        "cn": "佛系跑者",
        "en": "Zen Runner",
        "prompt": "a meditative monk-like runner character running in slow motion with a peaceful smile, floating lotus flowers around, no watch no phone, totally chill vibes, buddha-like serenity",
    },
    {
        "id": "pb_tyrant",
        "cn": "卷王",
        "en": "PB Tyrant",
        "prompt": "an intense competitive runner character with fiery eyes and steam coming from head, chasing their own shadow, stopwatches everywhere, obsessive competitive energy, burning determination",
    },
]


def generate_image(prompt: str) -> str | None:
    """Generate image using MiniMax API, return URL or None."""
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    data = {
        "model": "image-01",
        "prompt": prompt,
        "image_size": "1024x1024",
        "num_images": 1,
    }
    try:
        resp = requests.post(API_URL, headers=headers, json=data, timeout=120)
        result = resp.json()
        if result.get("data", {}).get("image_urls"):
            return result["data"]["image_urls"][0]
        else:
            print(f"  API error: {json.dumps(result, ensure_ascii=False)[:200]}")
            return None
    except Exception as e:
        print(f"  Request failed: {e}")
        return None


def download_image(url: str, path: str) -> bool:
    """Download image from URL to path."""
    try:
        resp = requests.get(url, timeout=60)
        if resp.status_code == 200:
            with open(path, "wb") as f:
                f.write(resp.content)
            return True
        return False
    except Exception as e:
        print(f"  Download failed: {e}")
        return False


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Save character metadata
    metadata = []
    for char in CHARACTERS:
        metadata.append({
            "id": char["id"],
            "cn": char["cn"],
            "en": char["en"],
            "file": f"/characters/{char['id']}.png",
        })

    meta_path = os.path.join(OUTPUT_DIR, "metadata.json")
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, ensure_ascii=False, indent=2)
    print(f"Metadata saved to {meta_path}")

    # Generate images
    for i, char in enumerate(CHARACTERS):
        out_path = os.path.join(OUTPUT_DIR, f"{char['id']}.png")

        # Skip if already exists
        if os.path.exists(out_path) and os.path.getsize(out_path) > 10000:
            print(f"[{i+1}/24] {char['cn']} ({char['en']}) - already exists, skipping")
            continue

        full_prompt = STYLE + char["prompt"] + STYLE_SUFFIX
        print(f"[{i+1}/24] {char['cn']} ({char['en']}) - generating...")

        url = generate_image(full_prompt)
        if url:
            if download_image(url, out_path):
                size_kb = os.path.getsize(out_path) // 1024
                print(f"  ✓ Saved ({size_kb}KB)")
            else:
                print(f"  ✗ Download failed")
        else:
            print(f"  ✗ Generation failed")

        # Rate limit: wait between requests
        if i < len(CHARACTERS) - 1:
            time.sleep(2)

    print(f"\nDone! Images saved to {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
