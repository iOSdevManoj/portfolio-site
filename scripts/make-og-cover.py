#!/usr/bin/env python3
"""
Generate public/og-cover.png — the 1200x630 card shown when the site is shared
on LinkedIn, WhatsApp, Slack, X, iMessage.

Run after changing the name, title, platforms or portrait:
    python3 scripts/make-og-cover.py

Design intent: match the site's dark palette and teal accent so the preview and
the page read as one brand. Text is kept large and short — most previews render
around 500px wide, where anything under ~28px in this space becomes unreadable.
"""

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630
BG = (16, 22, 28)
TEAL = (94, 205, 214)
TEAL_DIM = (56, 178, 190)
WHITE = (247, 249, 250)
MUTED = (150, 165, 175)

NAME = "Manoj Barad"
ROLE = "Senior Mobile & Web Engineer"
PLATFORMS = "iOS  ·  Android  ·  Flutter  ·  React Native  ·  Web"
PITCH = "12+ years building healthcare, Bluetooth\nand AI products that ship."
FOOTER = "portfolio-site-roan-mu-47.vercel.app"

FONT_STACK = [
    "/System/Library/Fonts/Supplemental/Avenir Next.ttc",
    "/System/Library/Fonts/HelveticaNeue.ttc",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
]


def font(size, bold=True):
    for path in FONT_STACK:
        try:
            # Avenir Next / Helvetica Neue are collections; index picks the weight.
            return ImageFont.truetype(path, size, index=(2 if bold else 0))
        except Exception:
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


def main():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    # --- teal bloom, top-left, mirroring --gradient-hero on the site ---
    glow = Image.new("RGB", (W, H), BG)
    gd = ImageDraw.Draw(glow)
    gd.ellipse([-260, -420, 900, 420], fill=(26, 62, 74))
    gd.ellipse([720, 300, 1420, 900], fill=(22, 52, 62))
    img = Image.blend(img, glow.filter(ImageFilter.GaussianBlur(150)), 0.85)
    d = ImageDraw.Draw(img)

    # --- faint grid, same 56px rhythm as .grid-bg ---
    for x in range(0, W, 56):
        d.line([(x, 0), (x, H)], fill=(26, 34, 41), width=1)
    for y in range(0, H, 56):
        d.line([(0, y), (W, y)], fill=(26, 34, 41), width=1)

    # --- portrait, circular, teal ring ---
    try:
        size = 300
        cx, cy = 950, 300
        photo = Image.open("src/assets/manoj.jpg").convert("RGB")
        s = min(photo.size)
        photo = photo.crop(((photo.width - s) // 2, (photo.height - s) // 2,
                            (photo.width + s) // 2, (photo.height + s) // 2))
        photo = photo.resize((size, size), Image.LANCZOS)
        mask = Image.new("L", (size * 4, size * 4), 0)
        ImageDraw.Draw(mask).ellipse([0, 0, size * 4 - 1, size * 4 - 1], fill=255)
        mask = mask.resize((size, size), Image.LANCZOS)
        img.paste(photo, (cx - size // 2, cy - size // 2), mask)
        r = size // 2
        d.ellipse([cx - r - 6, cy - r - 6, cx + r + 6, cy + r + 6], outline=TEAL, width=4)
    except FileNotFoundError:
        pass

    # --- left column ---
    x = 80
    d.rectangle([x, 92, x + 54, 97], fill=TEAL)

    d.text((x, 128), NAME, font=font(78), fill=WHITE)
    d.text((x, 224), ROLE, font=font(38), fill=TEAL)
    d.text((x, 296), PLATFORMS, font=font(23, bold=False), fill=MUTED)
    d.multiline_text((x, 366), PITCH, font=font(30, bold=False), fill=WHITE, spacing=12)

    # availability pill
    py = 486
    pill = "Available for new projects  ·  Replies in 24h"
    tw = d.textbbox((0, 0), pill, font=font(21, bold=False))[2]
    d.rounded_rectangle([x, py, x + tw + 60, py + 52], radius=26,
                        fill=(22, 44, 52), outline=TEAL_DIM, width=2)
    d.ellipse([x + 24, py + 21, x + 34, py + 31], fill=TEAL)
    d.text((x + 48, py + 14), pill, font=font(21, bold=False), fill=WHITE)

    d.text((x, 566), FOOTER, font=font(20, bold=False), fill=(110, 128, 138))

    img.save("public/og-cover.png", optimize=True)
    print(f"public/og-cover.png  {W}x{H}")


if __name__ == "__main__":
    main()
