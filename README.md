# Gewässerkarte SAV Hemelingen – Prototyp

Statische Seite: `index.html` + `map.js` + `style.css`, Daten als GeoJSON in `daten/`.

## Lokal starten
```
python -m http.server 8000
```
Dann http://localhost:8000 öffnen (direktes Öffnen der HTML-Datei geht nicht, weil die GeoJSON-Dateien per fetch geladen werden).

## Mapbox anbinden
1. Konto auf https://account.mapbox.com anlegen.
2. Unter *Tokens* einen öffentlichen Token (`pk.…`) erstellen; unter *URL restrictions* `http://localhost:8000` und später die echte Domain eintragen.
3. `config.example.js` nach `config.js` kopieren und Token eintragen. `config.js` steht in `.gitignore`.
4. Seite neu laden – unten links im Panel steht dann "Engine: Mapbox GL JS".

Ohne Token läuft dieselbe Karte mit MapLibre + OpenFreeMap (Karte) und Esri (Luftbild).

## Daten
- `daten/sav-eigene-seen.geojson` – 4 eigene Seen, Umrisse aus OSM
- `daten/weser4-vorlaeufig.geojson` – erste 8 Weser-IV-Gewässer, Zuordnung noch prüfen
- `daten/test-kanaele.geojson` – Test: Arberger Kanal als Linie aus OSM
- Abgleich und offene Punkte: `notizen/osm-abgleich.md`
- Bearbeiten: geojson.io oder QGIS
