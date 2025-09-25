// Estilo OSM para MapLibre - Sin API key requerido
export const OSM_RASTER_STYLE = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors"
    }
  },
  layers: [
    {
      id: "osm",
      type: "raster", 
      source: "osm",
      minzoom: 0,
      maxzoom: 19
    }
  ]
};

// URL pública de un estilo vectorial sin API key
export const FREE_STYLE_URL = "https://demotiles.maplibre.org/style.json";