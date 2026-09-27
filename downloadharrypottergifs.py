#!/usr/bin/env python3

import argparse
import os
import sys
from pathlib import Path

import requests


GIPHY_API_URL = "https://api.giphy.com/v1/gifs/search"
ANZAHL_GIFS = 20


def lade_gifs(zielverzeichnis: Path, api_key: str) -> None:
    zielverzeichnis.mkdir(parents=True, exist_ok=True)

    parameter = {
        "api_key": api_key,
        "q": "Harry Potter",
        "limit": ANZAHL_GIFS,
        "rating": "pg-13",
        "lang": "de",
    }

    try:
        antwort = requests.get(GIPHY_API_URL, params=parameter, timeout=30)
        antwort.raise_for_status()
        daten = antwort.json()
    except requests.RequestException as fehler:
        print(f"Fehler beim Abrufen der GIFs: {fehler}", file=sys.stderr)
        sys.exit(1)

    gifs = daten.get("data", [])

    if not gifs:
        print("Keine GIFs gefunden.")
        return

    erfolgreich = 0

    for nummer, gif in enumerate(gifs, start=1):
        bilder = gif.get("images", {})
        original = bilder.get("original", {})
        url = original.get("url")

        if not url:
            print(f"GIF {nummer} übersprungen: keine URL vorhanden.")
            continue

        dateiname = zielverzeichnis / f"harry_potter_{nummer:02d}.gif"

        try:
            bildantwort = requests.get(url, timeout=60)
            bildantwort.raise_for_status()
            dateiname.write_bytes(bildantwort.content)

            erfolgreich += 1
            print(f"Gespeichert: {dateiname}")

        except requests.RequestException as fehler:
            print(f"GIF {nummer} konnte nicht geladen werden: {fehler}")

    print(f"\n{erfolgreich} GIF(s) wurden in '{zielverzeichnis}' gespeichert.")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Lädt Harry-Potter-GIFs von GIPHY herunter."
    )
    parser.add_argument(
        "verzeichnis",
        type=Path,
        help="Verzeichnis, in dem die GIFs gespeichert werden",
    )

    args = parser.parse_args()

    api_key = os.environ.get("GIPHY_API_KEY")

    if not api_key:
        print(
            "Fehler: Bitte den GIPHY-API-Schlüssel in der "
            "Umgebungsvariable GIPHY_API_KEY setzen.",
            file=sys.stderr,
        )
        sys.exit(1)

    lade_gifs(args.verzeichnis, api_key)


if __name__ == "__main__":
    main()
