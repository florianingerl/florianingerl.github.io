#!/usr/bin/env python3
import sys
import os
import json

# Gängige Bilddateierweiterungen
IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp", ".tif", ".tiff", ".svg"}

def main():
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <directory>", file=sys.stderr)
        sys.exit(1)

    directory = sys.argv[1]
    if not os.path.isdir(directory):
        print(f"Error: Not a directory: {directory}", file=sys.stderr)
        sys.exit(1)

    names = []
    for entry in os.listdir(directory):
        path = os.path.join(directory, entry)
        if os.path.isfile(path):
            _, ext = os.path.splitext(entry)
            if ext.lower() in IMAGE_EXTS:
                names.append(entry)

    # Optional: sortieren für deterministische Ausgabe
    names.sort()

    print(json.dumps(names, ensure_ascii=False))

if __name__ == "__main__":
    main()
