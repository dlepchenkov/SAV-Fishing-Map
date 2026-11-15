# OSM-Abgleich (15.11.2026)

Abfrage: Overpass API, alle benannten Wasserflächen (natural=water, landuse=reservoir) im Rechteck 52.85–53.15 N / 8.70–9.35 E -> 195 Treffer.
Lizenz: ODbL -> Quellenangabe "© OpenStreetMap contributors" Pflicht.

## SAV eigene Seen – alle 4 als Fläche vorhanden -> daten/sav-eigene-seen.geojson
| SAV-Name | OSM | Bemerkung |
|---|---|---|
| Mahndorfer See | relation/1099570 | Multipolygon mit 2 Inseln (Vogelschutzinsel) |
| Osterholzer See (Radio-Bremen-See) | way/23332643 | |
| Panrepelsee | way/23332654 ("Panrepel See") | |
| Rodensee und Rodenfleet | way/22699906 + way/23220695 | zwei Flächen |

## Weser IV – nur Namen aus den Sonderregeln geprüft (volle Liste noch nicht erfasst)
Gefunden -> daten/weser4-vorlaeufig.geojson (Zuordnung prüfen!):
- Hansa-Beton-See -> way/4294750 "HansaBeton-See"
- Hemelinger See -> way/159898234
- Lüssenhafen -> way/304098596 "Lüssen Kieshafen" (gleiches Gewässer?)
- Alte Aller -> way/74056449 bei Achim/Langwedel. SAV schreibt "Alte Aller (Verden)" -> evtl. anderes Gewässer, prüfen
- Schwarze Kuhle -> way/95157832
- Sukernkuhle -> way/95158114
- Rottkuhle Morsum -> way/92924221
- Sandacker -> way/92924167

Mehrdeutig: Steinkuhle (way/92966575 bei Achim-Uesen ODER way/74130409 bei Verden) -> noch nicht übernommen.

Nicht gefunden unter dem Namen: Blauer Werder, Korbhauskuhle, Ueser Hafen, Sandabbau Karpe, Wiedbüschenkuhle
-> evtl. ohne Namen in OSM oder andere Schreibweise; sonst selbst zeichnen (Luftbild, ggf. direkt in OSM eintragen).
