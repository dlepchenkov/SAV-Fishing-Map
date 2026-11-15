// Gewässerkarte SAV Hemelingen – Prototyp
// Mit Token (config.js) -> Mapbox GL JS, sonst MapLibre GL JS + OpenFreeMap (gleiche API).

const TOKEN = (window.MAPBOX_TOKEN || '').trim();
const USE_MAPBOX = TOKEN.startsWith('pk.');

const ENGINE = USE_MAPBOX
  ? { js: 'https://api.mapbox.com/mapbox-gl-js/v3.8.0/mapbox-gl.js',
      css: 'https://api.mapbox.com/mapbox-gl-js/v3.8.0/mapbox-gl.css' }
  : { js: 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js',
      css: 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css' };

const BASEMAPS = USE_MAPBOX
  ? { plan: 'mapbox://styles/mapbox/outdoors-v12',
      luftbild: 'mapbox://styles/mapbox/satellite-streets-v12' }
  : { plan: 'https://tiles.openfreemap.org/styles/liberty',
      luftbild: {
        version: 8,
        glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
        sources: { esri: { type: 'raster', tileSize: 256, maxzoom: 19,
          tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
          attribution: 'Luftbild © Esri, Maxar, Earthstar Geographics' } },
        layers: [{ id: 'esri', type: 'raster', source: 'esri' }] } };

const LABEL_FONT = USE_MAPBOX ? ['DIN Pro Medium', 'Arial Unicode MS Regular'] : ['Noto Sans Regular'];

// Ebenen: eine GeoJSON-Datei je Gruppe
const GRUPPEN = [
  // Kräftige Nicht-Blau-Töne, damit sich die Gewässer vom blauen Wasser der Grundkarte abheben
  { id: 'sav', name: 'SAV – eigene Gewässer', datei: 'daten/sav-eigene-seen.geojson', farbe: '#ff6d00', gestrichelt: false },
  { id: 'w4', name: 'Pachtgemeinschaft Weser IV (vorläufig)', datei: 'daten/weser4-vorlaeufig.geojson', farbe: '#e6007e', gestrichelt: true },
];

const sichtbar = Object.fromEntries(GRUPPEN.map(g => [g.id, true]));
const daten = {};
let gl, map;

function loadEngine() {
  return new Promise((resolve, reject) => {
    const css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = ENGINE.css;
    document.head.appendChild(css);
    const s = document.createElement('script');
    s.src = ENGINE.js; s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}

const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Route in Google Maps (öffnet auf dem Handy die App)
const gmapsUrl = ll => `https://www.google.com/maps/dir/?api=1&destination=${ll.lat.toFixed(6)},${ll.lng.toFixed(6)}`;

function popupHtml(p, ll) {
  return `<div class="popup">
    <h3>${esc(p.name)}</h3>
    <div class="gruppe">${esc(p.gruppe)}</div>
    ${p.fische ? `<p><b>Fische:</b> ${esc(p.fische)}</p>` : ''}
    ${p.hinweis ? `<p><b>Hinweis:</b> ${esc(p.hinweis)}</p>` : ''}
    ${p.status ? `<p class="status">${esc(p.status)}</p>` : ''}
    ${p.seite ? `<p><a href="${esc(p.seite)}" target="_blank" rel="noopener">Seite beim SAV</a></p>` : ''}
    <a class="gmaps" href="${gmapsUrl(ll)}" target="_blank" rel="noopener">Route in Google Maps</a>
  </div>`;
}

// Immer nur eine Infokarte offen: eine neue schließt die vorherige
let offenesPopup = null;
function zeigePopup(lngLat, props) {
  if (offenesPopup) offenesPopup.remove();
  const ll = gl.LngLat.convert(lngLat);
  offenesPopup = new gl.Popup({ maxWidth: '300px' }).setLngLat(ll).setHTML(popupHtml(props, ll)).addTo(map);
}

function addLayers() {
  for (const g of GRUPPEN) {
    if (map.getSource(g.id)) continue;
    map.addSource(g.id, { type: 'geojson', data: daten[g.id] });
    const vis = sichtbar[g.id] ? 'visible' : 'none';
    map.addLayer({ id: `${g.id}-fill`, type: 'fill', source: g.id, layout: { visibility: vis },
      paint: { 'fill-color': g.farbe, 'fill-opacity': 0.55 } });
    map.addLayer({ id: `${g.id}-line`, type: 'line', source: g.id, layout: { visibility: vis },
      paint: { 'line-color': g.farbe, 'line-width': 3,...(g.gestrichelt ? { 'line-dasharray': [2, 1.5] } : {}) } });
    map.addLayer({ id: `${g.id}-label`, type: 'symbol', source: g.id, minzoom: 11,
      layout: { visibility: vis, 'text-field': ['get', 'name'], 'text-font': LABEL_FONT, 'text-size': 12 },
      paint: { 'text-color': '#0d2233', 'text-halo-color': '#fff', 'text-halo-width': 1.5 } });
  }
}

function bbox(features) {
  let b = [180, 90, -180, -90];
  const walk = c => typeof c[0] === 'number'
    ? (b = [Math.min(b[0], c[0]), Math.min(b[1], c[1]), Math.max(b[2], c[0]), Math.max(b[3], c[1])])
    : c.forEach(walk);
  features.forEach(f => walk(f.geometry.coordinates));
  return [[b[0], b[1]], [b[2], b[3]]];
}

function buildPanel() {
  const gruppenEl = document.getElementById('gruppen');
  const liste = document.getElementById('liste');
  for (const g of GRUPPEN) {
    const lbl = document.createElement('label');
    lbl.innerHTML = `<input type="checkbox" checked> <span class="swatch" style="background:${g.farbe}55;border-color:${g.farbe}"></span> ${esc(g.name)}`;
    lbl.querySelector('input').addEventListener('change', e => {
      sichtbar[g.id] = e.target.checked;
      for (const suf of ['fill', 'line', 'label'])
        map.setLayoutProperty(`${g.id}-${suf}`, 'visibility', e.target.checked ? 'visible' : 'none');
    });
    gruppenEl.appendChild(lbl);

    for (const f of daten[g.id].features) {
      const li = document.createElement('li');
      li.innerHTML = `${esc(f.properties.name)}<small>${esc(f.properties.hinweis || f.properties.fische || '')}</small>`;
      li.addEventListener('click', () => {
        const bb = bbox([f]);
        map.fitBounds(bb, { padding: 80, maxZoom: 15 });
        zeigePopup([(bb[0][0] + bb[1][0]) / 2, (bb[0][1] + bb[1][1]) / 2], f.properties);
      });
      liste.appendChild(li);
    }
  }

  document.querySelectorAll('.basemap button').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.basemap button').forEach(b => b.classList.toggle('active', b === btn));
    // diff:false -> Stil wird komplett neu geladen, 'style.load' feuert und fügt eigene Ebenen wieder hinzu
    map.setStyle(BASEMAPS[btn.dataset.base], { diff: false });
  }));
}

async function init() {
  const [_, ...json] = await Promise.all([loadEngine(), ...GRUPPEN.map(g => fetch(g.datei).then(r => r.json()))]);
  GRUPPEN.forEach((g, i) => (daten[g.id] = json[i]));

  gl = USE_MAPBOX ? window.mapboxgl : window.maplibregl;
  if (USE_MAPBOX) gl.accessToken = TOKEN;
  document.getElementById('engine').textContent =
    USE_MAPBOX ? 'Engine: Mapbox GL JS' : 'Engine: MapLibre (kein Mapbox-Token in config.js)';

  map = new gl.Map({
    container: 'map',
    style: BASEMAPS.plan,
    bounds: bbox(GRUPPEN.flatMap(g => daten[g.id].features)),
    fitBoundsOptions: { padding: 40 },
  });
  map.addControl(new gl.NavigationControl(), 'top-right');
  map.addControl(new gl.ScaleControl(), 'bottom-right');
  map.on('style.load', addLayers);

  for (const g of GRUPPEN) {
    map.on('click', `${g.id}-fill`, e => zeigePopup(e.lngLat, e.features[0].properties));
    map.on('mouseenter', `${g.id}-fill`, () => (map.getCanvas().style.cursor = 'pointer'));
    map.on('mouseleave', `${g.id}-fill`, () => (map.getCanvas().style.cursor = ''));
  }
  buildPanel();
}

init().catch(err => {
  console.error(err);
  document.getElementById('map').innerHTML = `<p style="padding:20px">Fehler beim Laden: ${esc(err.message)}</p>`;
});
