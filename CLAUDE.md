# Projekt: Gewässerkarte für SAV Hemelingen (Mapbox)

Ziel: interaktive Karte nach dem Vorbild von https://karte.sfv-bremen.de, aber mit den Gewässern des Vereins SAV Hemelingen.
Kontext: Idee eines Kollegen (Sebastian), Dima hilft technisch.

## Stand (15.11.2026)
- Recherche erledigt, siehe notizen/recherche.md
- Eigene Seen von SAV mit Koordinaten: daten/sav-eigene-seen.json
- Prototyp steht (index.html, map.js, Mapbox GL JS mit MapLibre-Fallback ohne Token), siehe README.md
- Umrisse aus OSM: 4 eigene Seen komplett, 8 Weser-IV-Gewässer vorläufig, siehe notizen/osm-abgleich.md
- Entscheidung (15.11.2026): MapLibre + OpenFreeMap statt Mapbox (Lizenz, kein persönliches Konto/Token, keine Limits). Begründung in Notion: "Angeln Mapbox" -> "Почему MapLibre, а не Mapbox". Code läuft weiter mit beiden; Mapbox nur mit Token in config.js.
- Daten als GeoJSON im Projekt (keine Mapbox-Tilesets)
- Live: https://angeln.lirichkon.de (VPS, Caddy file_server, Cloudflare-Proxy). Update: push, dann auf VPS `git -C /var/www/sav-karte pull`.
- Cloudflare cacht .js/.css bis 4 h -> bei jeder Änderung an map.js/style.css `?v=` in index.html hochzählen.

## Offene Fragen
- Wer pflegt die Karte später? Für den Verein oder privat?
- Daten zu Pachtgemeinschaft Weser IV: beim Verein / SFV anfragen oder selbst aus OpenStreetMap bauen?

## Nächste Schritte
1. Luftbild klären: Esri-Nutzungsbedingungen prüfen oder offene DOP Bremen/Niedersachsen einbinden
2. Vollständige Weser-IV-Liste von der SAV-Seite erfassen und mit OSM abgleichen
3. Fehlende Gewässer und Sperrzonen selbst zeichnen
