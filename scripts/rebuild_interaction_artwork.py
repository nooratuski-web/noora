from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / "public/images/miste/interaction.png"
ORIGINAL = TARGET.with_suffix(TARGET.suffix + ".before-copy-fix")
REFERENCE = ROOT / "public/images/miste/memory-photo-reference.jpg"
ARIAL = Path(r"C:\Windows\Fonts\arial.ttf")


def memory_card(width: int, height: int, opacity: int = 255, blur: float = 0):
    source = Image.open(REFERENCE).convert("RGB")
    source_draw = ImageDraw.Draw(source)
    source_draw.rounded_rectangle((386, 50, 1227, 224), radius=54, fill=(78, 61, 198))
    bubble_font = ImageFont.truetype(str(ARIAL), 43)
    source_draw.text((421, 79), "My longing for you never fades, day in", font=bubble_font, fill=(255, 255, 255))
    source_draw.text((421, 137), "and day out.", font=bubble_font, fill=(255, 255, 255))
    source_draw.rounded_rectangle((145, 278, 605, 354), radius=18, fill=(250, 250, 249))
    input_font = ImageFont.truetype(str(ARIAL), 48)
    source_draw.text((158, 285), "I miss you.", font=input_font, fill=(22, 22, 24))
    # The bottle's insert is landscape. Use the top interaction area and the
    # first keyboard row from the supplied screenshot without stretching it.
    crop_height = round(source.width * height / width)
    crop_height = min(crop_height, source.height)
    crop = source.crop((0, 0, source.width, crop_height)).resize(
        (width, height), Image.Resampling.LANCZOS
    )
    if blur:
        crop = crop.filter(ImageFilter.GaussianBlur(blur))
    layer = crop.convert("RGBA")
    layer.putalpha(opacity)
    return layer


def paste_card(canvas, box, opacity=255, blur=0, radius=0):
    x0, y0, x1, y1 = box
    card = memory_card(x1 - x0, y1 - y0, opacity=opacity, blur=blur)
    if radius:
        mask = Image.new("L", card.size, 0)
        ImageDraw.Draw(mask).rounded_rectangle((0, 0, card.width, card.height), radius=radius, fill=opacity)
        card.putalpha(mask)
    canvas.alpha_composite(card, (x0, y0))


base = Image.open(ORIGINAL if ORIGINAL.exists() else TARGET).convert("RGBA")
cover = ImageDraw.Draw(base, "RGBA")

# Main bottle: the photo sits behind the frosted front panel.
cover.rounded_rectangle((211, 482, 420, 600), radius=3, fill=(247, 244, 239, 236))
paste_card(base, (212, 483, 419, 599), opacity=155, blur=.75, radius=3)

# Step 03: the loose insert is clearer while it is being placed.
insert = memory_card(104, 60, opacity=235, blur=.12).rotate(5.5, resample=Image.Resampling.BICUBIC, expand=True)
base.alpha_composite(insert, (1078, 684))

# Step 04: once closed, the same image softens behind the panel again.
cover.rounded_rectangle((1291, 689, 1398, 750), radius=2, fill=(247, 244, 239, 230))
paste_card(base, (1292, 690, 1397, 749), opacity=145, blur=.6, radius=2)

base.convert("RGB").save(TARGET, quality=97)
print("Interaction artwork rebuilt from the supplied memory image.")
