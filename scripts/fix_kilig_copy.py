from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
FONT_REGULAR = Path(r"C:\Windows\Fonts\arial.ttf")


def font(size: int):
    return ImageFont.truetype(str(FONT_REGULAR), size=size)


def patch_card(draw, *, bubble_box, input_box, bubble_size, input_size, line_gap=2):
    bx0, by0, bx1, by1 = bubble_box
    ix0, iy0, ix1, iy1 = input_box
    bubble_fill = (119, 103, 204, 255)
    input_fill = (239, 236, 231, 255)
    draw.rounded_rectangle(bubble_box, radius=max(3, (by1 - by0) // 3), fill=bubble_fill)
    bubble_font = font(bubble_size)
    lines = ["My longing for you never fades,", "day in and day out."]
    total_h = sum(draw.textbbox((0, 0), line, font=bubble_font)[3] for line in lines) + line_gap
    y = by0 + ((by1 - by0) - total_h) / 2
    for line in lines:
        draw.text((bx0 + max(4, (bx1 - bx0) * .055), y), line, font=bubble_font, fill=(244, 241, 250, 255))
        y += draw.textbbox((0, 0), line, font=bubble_font)[3] + line_gap
    draw.rounded_rectangle(input_box, radius=max(2, (iy1 - iy0) // 3), fill=input_fill)
    input_font = font(input_size)
    bbox = draw.textbbox((0, 0), "I miss you.", font=input_font)
    draw.text((ix0 + max(3, (ix1 - ix0) * .04), iy0 + ((iy1 - iy0) - (bbox[3] - bbox[1])) / 2 - bbox[1]),
              "I miss you.", font=input_font, fill=(78, 73, 91, 255))


def edit(path: Path, cards):
    backup = path.with_suffix(path.suffix + ".before-copy-fix")
    if not backup.exists():
        backup.write_bytes(path.read_bytes())
    image = Image.open(path).convert("RGBA")
    draw = ImageDraw.Draw(image)
    for card in cards:
        patch_card(draw, **card)
    image.convert("RGB").save(path, quality=96)


edit(ROOT / "public/images/miste/collection/kilig.png", [
    dict(bubble_box=(143, 226, 255, 254), input_box=(143, 262, 226, 284), bubble_size=6, input_size=7, line_gap=0),
])

edit(ROOT / "public/images/miste/product-details.png", [
    dict(bubble_box=(1065, 205, 1414, 276), input_box=(1052, 304, 1313, 351), bubble_size=16, input_size=19, line_gap=1),
    dict(bubble_box=(386, 518, 590, 566), input_box=(382, 580, 535, 613), bubble_size=9, input_size=11, line_gap=0),
])

edit(ROOT / "public/images/miste/interaction.png", [
    dict(bubble_box=(252, 515, 409, 550), input_box=(248, 555, 366, 582), bubble_size=7, input_size=9, line_gap=0),
    dict(bubble_box=(1093, 690, 1166, 715), input_box=(1081, 721, 1144, 739), bubble_size=3, input_size=4, line_gap=0),
    dict(bubble_box=(1288, 691, 1372, 716), input_box=(1276, 723, 1347, 742), bubble_size=3, input_size=4, line_gap=0),
])

edit(ROOT / "public/images/miste/form-study/front.png", [
    dict(bubble_box=(242, 526, 460, 571), input_box=(238, 588, 405, 625), bubble_size=9, input_size=12, line_gap=0),
])

print("KILIG copy repaired in collection, product details, and interaction artwork.")
