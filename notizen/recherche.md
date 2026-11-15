# Recherche (15.11.2026)

## 1. Vorbild: Karte des SFV Bremen — https://karte.sfv-bremen.de
- Technik: Mapbox GL JS 2.6.1, jQuery, eine eigene Datei map.js (~13 KB). Seite wahrscheinlich Silverstripe CMS.
- Texte zu 103 Gewässern stehen direkt im HTML der Seite (JS-Array "MapEntries"): Name, Art, Gruppe, Größe, Tiefe, Auflagen, Link Gastkarte, ein Punkt-Koordinate.
- Umrisse der Gewässer liegen NICHT auf der Website, sondern im Mapbox-Konto "sfv-bremen" (5 Tilesets, 2 Kartenstile: Plan + Luftbild). Klick-Layer: "gewaesser_1", Verknüpfung über G_ID = gewaesserID.
- Hinweis auf der Karte: "Stand 06.03.2024: wird gerade aktualisiert".
- 53 der 103 Einträge sind Gewässer der Pachtgemeinschaft Weser IV -> deckt sich fast komplett mit der SAV-Liste.
- Die 4 eigenen Seen von SAV fehlen dort.
- Rechtlich: Daten gehören dem SFV; aus den Mapbox-Kacheln abziehen = Grauzone und ungenau. Besser anfragen.

## 2. SAV Hemelingen — https://www.sav-hemelingen.de/index.php/gewaesser/gewaesser-uebersicht/
- WordPress, Seite zuletzt 2017 geändert.
- 4 eigene Seen mit OSM-Koordinaten, Fischarten, Fotos (siehe daten/sav-eigene-seen.json).
- ~55 Gewässer der Pachtgemeinschaft Weser IV, nur Namensliste + Sonderregeln, in 3 Bezirken: Bremen, Achim/Thedinghausen, Verden.
- 3 gescannte Karten "Gewässerkarte I–III" (JPG 3508x2480), Maßstab 1:50000, Stand Januar 1995:
  - https://www.sav-hemelingen.de/wp-content/uploads/2015/10/pachtgemeinschaft_weser4_1.jpg
  - https://www.sav-hemelingen.de/wp-content/uploads/2015/10/pachtgemeinschaft_weser4_2.jpg
  - https://www.sav-hemelingen.de/wp-content/uploads/2015/10/pachtgemeinschaft_weser4_3.jpg
  -> nur zum Abgleich, nicht als Geodaten nutzbar.

### Sonderregeln (Auszug von der SAV-Seite)
- Hansa-Beton-See: Boote erlaubt 1.6.–31.12.
- Blauer Werder, Korbhauskuhle: nur von der Weserseite
- Hemelinger See: keine Boote
- Sperrzone: Ausgleichsflächen Hemelinger Weserseite zwischen Eisenbahn- und Autobahnbrücke (km 358), Zu- und Abläufe
- Ueser Hafen: zur Zeit Sperrgebiet
- Lüssenhafen, Sandabbau Karpe: Sperrzonen, keine Boote
- Alte Aller (Verden): 1.1.–31.5. komplett gesperrt
- Besondere Auflagen: Schwarze Kuhle, Wiedbüschenkuhle, Sukernkuhle, Rottkuhle Morsum, Sandacker, Steinkuhle

## 3. Landesfischereiverband Bremen — http://lfvbremen.de/13_Gesetze.html
- Dachverband, 17 Vereine, ca. 6300 Mitglieder.
- Nur Gesetze/Verordnungen als PDF (Fischereigesetz, Binnenfischereiverordnung 2011, Schongebiete, Hafenordnung, Nds. Gesetze). Keine Geodaten zu SAV.

## 4. PDF "Lageplan ab 01.01.2019" — http://lfvbremen.de/temp/angelgebiete%20hafen2019.pdf
- Anlage zum Hafen-Erlaubnisschein, 3 Seiten.
- Screenshots von OpenStreetMap, schwarze Linien = erlaubte Uferabschnitte in Häfen (Hemelinger Häfen, Hohentorshafen, Neustädter/Lankenauer Hafen …).
- Evtl. später als eigene Ebene "Häfen".
