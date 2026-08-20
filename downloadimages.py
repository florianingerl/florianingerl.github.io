import os
import re
import time
import hashlib
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

PAGE_URL = "https://www.italien-facile.com/exercices/exercice-italien-2/exercice-italien-131685.php"
OUT_DIR = r"C:\Users\imelf\Documents\website\assets\img\spanisch"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"
}

def safe_filename_from_url(img_url: str, fallback_prefix="img"):
    parsed = urlparse(img_url)
    name = os.path.basename(parsed.path)

    # If the URL doesn't end with a useful name, generate one
    if not name or "." not in name:
        h = hashlib.sha256(img_url.encode("utf-8")).hexdigest()[:12]
        name = f"{fallback_prefix}_{h}.bin"

    # Remove characters that can be problematic on Windows filenames
    name = re.sub(r'[<>:"/\\|?*]+', "_", name)
    return name

def extract_image_urls(html: str, base_url: str):
    soup = BeautifulSoup(html, "html.parser")
    urls = set()

    # <img src="...">
    for img in soup.find_all("img"):
        src = img.get("src")
        if src:
            urls.add(urljoin(base_url, src))

        # <img srcset="...">
        srcset = img.get("srcset")
        if srcset:
            # entries look like: "url 1x, url2 2x"
            for part in srcset.split(","):
                part = part.strip()
                if not part:
                    continue
                candidate = part.split()[0]  # url is first token
                urls.add(urljoin(base_url, candidate))

    return urls

def download_images(img_urls, out_dir):
    os.makedirs(out_dir, exist_ok=True)

    session = requests.Session()
    session.headers.update(HEADERS)

    downloaded = 0
    for img_url in sorted(img_urls):
        try:
            filename = safe_filename_from_url(img_url)
            filepath = os.path.join(out_dir, filename)

            # If already downloaded, skip
            if os.path.exists(filepath) and os.path.getsize(filepath) > 0:
                continue

            r = session.get(img_url, timeout=30, stream=True)
            r.raise_for_status()

            # Use content-type to optionally adjust extension
            content_type = r.headers.get("Content-Type", "").lower()
            # If filename ends with .bin but server gives a clear image type, rename.
            ext_map = {
                "image/jpeg": ".jpg",
                "image/jpg": ".jpg",
                "image/png": ".png",
                "image/gif": ".gif",
                "image/webp": ".webp",
                "image/svg+xml": ".svg",
            }
            if filename.endswith(".bin"):
                for ct, ext in ext_map.items():
                    if ct in content_type:
                        new_filepath = filepath[:-4] + ext  # remove ".bin"
                        filepath = new_filepath
                        break

            with open(filepath, "wb") as f:
                for chunk in r.iter_content(chunk_size=1024 * 64):
                    if chunk:
                        f.write(chunk)

            downloaded += 1
            time.sleep(0.2)  # small delay to be polite
            print(f"Downloaded: {img_url} -> {filepath}")

        except Exception as e:
            print(f"Skipped (error): {img_url} ({e})")

    return downloaded

def main():
    r = requests.get(PAGE_URL, headers=HEADERS, timeout=30)
    r.raise_for_status()
    html = r.text

    img_urls = extract_image_urls(html, PAGE_URL)
    if not img_urls:
        print("No images found on the page.")
        return

    print(f"Found {len(img_urls)} image(s). Downloading...")
    n = download_images(img_urls, OUT_DIR)
    print(f"Done. Downloaded {n} new image(s) to: {OUT_DIR}")

if __name__ == "__main__":
    main()
