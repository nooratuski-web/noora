from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance


ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / "public/images/miste/campaign.png"
BACKUP = TARGET.with_suffix(TARGET.suffix + ".before-tagline-fix")
FONT = ROOT / "public/fonts/CormorantGaramond-Variable.ttf"


if not BACKUP.exists():
    BACKUP.write_bytes(TARGET.read_bytes())

image = Image.open(BACKUP).convert("RGBA")
x0, y0, x1, y1 = 370, 518, 716, 596

# Reuse a clean strip of the same textured paper immediately below the old
# copy so the repaired area keeps the photograph's original grain.
patch = image.crop((x0, 600, x1, 678)).resize((x1 - x0, y1 - y0), Image.Resampling.LANCZOS)
patch = ImageEnhance.Brightness(patch).enhance(1.0)
patch = patch.filter(ImageFilter.GaussianBlur(.18))

mask = Image.new("L", patch.size, 0)
mask_draw = ImageDraw.Draw(mask)
mask_draw.rectangle((8, 5, patch.width - 9, patch.height - 6), fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(5))
image.paste(patch, (x0, y0), mask)

draw = ImageDraw.Draw(image)
copy = "Memory, held in scent."
font = ImageFont.truetype(str(FONT), 24)
spacing = 5
widths = [draw.textlength(char, font=font) for char in copy]
total = sum(widths) + spacing * (len(copy) - 1)
x = (image.width - total) / 2
y = 542
for char, width in zip(copy, widths):
    draw.text((x, y), char, font=font, fill=(45, 42, 39, 255))
    x += width + spacing

image.convert("RGB").save(TARGET, quality=97)
print("Campaign tagline unified to 'Memory, held in scent.'")
