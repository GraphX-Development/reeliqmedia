import os
import rawpy
import imageio
import shutil
from PIL import Image

# Source and destination directories
UPLOAD_DIR = "/home/ubuntu/upload"
DEST_DIR = "/home/ubuntu/reel-iq-media/client/public/images"

# Ensure destination directory exists
os.makedirs(DEST_DIR, exist_ok=True)

def convert_cr2_to_jpg(source_path, dest_path):
    try:
        with rawpy.imread(source_path) as raw:
            rgb = raw.postprocess()
            imageio.imsave(dest_path, rgb)
        print(f"Converted {source_path} to {dest_path}")
    except Exception as e:
        print(f"Error converting {source_path}: {e}")

def process_images():
    for filename in os.listdir(UPLOAD_DIR):
        source_path = os.path.join(UPLOAD_DIR, filename)
        
        if not os.path.isfile(source_path):
            continue
            
        name, ext = os.path.splitext(filename)
        ext = ext.lower()
        
        if ext == '.cr2':
            dest_filename = f"{name}.jpg"
            dest_path = os.path.join(DEST_DIR, dest_filename)
            convert_cr2_to_jpg(source_path, dest_path)
        elif ext in ['.jpg', '.jpeg', '.png']:
            dest_path = os.path.join(DEST_DIR, filename)
            shutil.copy2(source_path, dest_path)
            print(f"Copied {filename} to {DEST_DIR}")

if __name__ == "__main__":
    process_images()
