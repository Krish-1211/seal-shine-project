import os
from PIL import Image, ImageOps

def crop_products(image_path, output_prefix, output_dir, expected_count):
    try:
        img = Image.open(image_path)
        img = img.convert("RGBA")
        width, height = img.size
        
        # Simple equal split
        segment_width = width // expected_count
        
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            
        for i in range(expected_count):
            start = i * segment_width
            end = (i + 1) * segment_width
            
            # Crop the strip
            strip = img.crop((start, 0, end, height))
            
            # Now try to trim whitespace from this strip
            bg = Image.new("RGBA", strip.size, (255, 255, 255, 255))
            diff = Image.composite(strip, bg, strip)
            bbox = diff.convert("L").getbbox()
            
            if bbox:
                # Add padding
                pad = 10
                crop_box = (
                    max(0, bbox[0] - pad),
                    max(0, bbox[1] - pad),
                    min(segment_width, bbox[2] + pad),
                    min(height, bbox[3] + pad)
                )
                final_img = strip.crop(crop_box)
            else:
                final_img = strip
                
            output_filename = f"{output_prefix}_{i}.png"
            final_img.save(os.path.join(output_dir, output_filename))
            print(f"Saved {output_filename}")

    except Exception as e:
        print(f"Error processing {image_path}: {e}")

# Process the images
base_dir = "/Users/krish/Library/CloudStorage/GoogleDrive-krishkavathia27@gmail.com/My Drive/macbook/Suresealsealants/seal-shine-project-main/public/images"

# Cleaners: 5 products
crop_products(os.path.join(base_dir, "cleaners.png"), "cleaner", base_dir, 5)

# Aerosols: 4 products
crop_products(os.path.join(base_dir, "aerosols.png"), "aerosol", base_dir, 4)

# Sealers 1: 3 products
crop_products(os.path.join(base_dir, "sealers_1.png"), "sealer_1", base_dir, 3)

# Sealers 2: 4 products
crop_products(os.path.join(base_dir, "sealers_2.png"), "sealer_2", base_dir, 4)
