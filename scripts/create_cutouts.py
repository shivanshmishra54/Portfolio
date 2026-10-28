import os
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

brain_dir = r"C:\Users\SHIVANSH MISHRA\.gemini\antigravity-ide\brain\6ce8d17f-7d0b-4766-9a01-7734106454d0"
out_dir = r"C:\Project\Portfolio\portfolio\public\character"
os.makedirs(out_dir, exist_ok=True)

scenes = [
    {
        "id": 1,
        "name": "intro",
        "src": os.path.join(out_dir, "scene1_intro.webp"),
        "dest_rgb": os.path.join(out_dir, "scene1_intro.webp"),
        "dest_cutout": os.path.join(out_dir, "scene1_cutout.webp"),
    },
    {
        "id": 2,
        "name": "learning",
        "src": os.path.join(out_dir, "scene2_learning.webp"),
        "dest_rgb": os.path.join(out_dir, "scene2_learning.webp"),
        "dest_cutout": os.path.join(out_dir, "scene2_cutout.webp"),
    },
    {
        "id": 3,
        "name": "thinking",
        "src": os.path.join(out_dir, "scene3_thinking.webp"),
        "dest_rgb": os.path.join(out_dir, "scene3_thinking.webp"),
        "dest_cutout": os.path.join(out_dir, "scene3_cutout.webp"),
    },
    {
        "id": 4,
        "name": "coding",
        "src": os.path.join(brain_dir, "scene4_coding_test_1793194996392.jpg"),
        "dest_rgb": os.path.join(out_dir, "scene4_coding.webp"),
        "dest_cutout": os.path.join(out_dir, "scene4_cutout.webp"),
    },
    {
        "id": 5,
        "name": "hackathon",
        "src": os.path.join(brain_dir, "scene5_hackathon_pose_1793195016591.jpg"),
        "dest_rgb": os.path.join(out_dir, "scene5_hackathon.webp"),
        "dest_cutout": os.path.join(out_dir, "scene5_cutout.webp"),
    },
    {
        "id": 6,
        "name": "opensource",
        "src": os.path.join(brain_dir, "scene6_opensource_pose_1793195034919.jpg"),
        "dest_rgb": os.path.join(out_dir, "scene6_opensource.webp"),
        "dest_cutout": os.path.join(out_dir, "scene6_cutout.webp"),
    },
    {
        "id": 7,
        "name": "nextchapter",
        "src": os.path.join(out_dir, "scene7_nextchapter.webp"),
        "dest_rgb": os.path.join(out_dir, "scene7_nextchapter.webp"),
        "dest_cutout": os.path.join(out_dir, "scene7_cutout.webp"),
    },
]

def extract_cutout(img_path, threshold=24):
    im = Image.open(img_path).convert("RGB")
    arr = np.array(im)
    h, w, _ = arr.shape

    # Compute luminance
    lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]

    # Dark background detection
    dark = lum < threshold

    # Connected components
    labels, _ = ndimage.label(dark)

    # Gather labels at the border
    border_labels = set()
    # top and bottom borders
    for x in range(w):
        if dark[0, x]:
            border_labels.add(labels[0, x])
    # left and right borders (top half)
    for y in range(h // 2):
        if dark[y, 0]:
            border_labels.add(labels[y, 0])
        if dark[y, w - 1]:
            border_labels.add(labels[y, w - 1])

    bg_mask = np.isin(labels, list(border_labels))
    char_mask = ~bg_mask

    # Morphological closing and hole filling
    char_mask = ndimage.binary_fill_holes(char_mask)

    # Smooth the mask boundary for anti-aliasing (feathering)
    mask_float = char_mask.astype(float)
    smoothed_mask = ndimage.gaussian_filter(mask_float, sigma=1.0)
    # Re-normalize transition zone
    alpha = np.clip((smoothed_mask - 0.2) / 0.6, 0.0, 1.0) * 255.0
    alpha = alpha.astype(np.uint8)

    # Construct RGBA image
    rgba_arr = np.dstack((arr, alpha))
    return im, Image.fromarray(rgba_arr, mode="RGBA")

print("Processing cutouts...")
for s in scenes:
    print(f"Processing Scene {s['id']}: {s['name']} from {s['src']}...")
    rgb_im, cutout_im = extract_cutout(s["src"])
    
    # Save RGB WebP (quality 95)
    rgb_im.save(s["dest_rgb"], format="WEBP", quality=95)
    
    # Save RGBA WebP cutout
    cutout_im.save(s["dest_cutout"], format="WEBP", quality=95)
    
    # Also save PNG cutout for maximum lossless fidelity
    png_cutout = s["dest_cutout"].replace(".webp", ".png")
    cutout_im.save(png_cutout, format="PNG")
    
    # Calculate non-zero alpha pixel percentage
    alpha_arr = np.array(cutout_im.split()[-1])
    opaque_ratio = (alpha_arr > 128).mean() * 100
    print(f"Scene {s['id']} completed! Character cutout: {opaque_ratio:.1f}% of image.")

print("All cutouts extracted successfully!")
