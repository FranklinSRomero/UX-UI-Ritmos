import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface WebMapProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  markers?: {
    lat: number;
    lng: number;
    title: string;
    color?: string;
  }[];
  borderRadius?: number;
  style?: any;
}

export function WebMap({
  latitude = 4.6097,
  longitude = -74.0817,
  zoom = 12,
  markers = [],
  borderRadius = 0,
  style
}: WebMapProps) {

  const markersJS = markers.map((marker, index) => `
    // Crear icono personalizado con color
    var customIcon${index} = L.divIcon({
      className: 'custom-marker',
      html: '<div style="background-color: ${marker.color || '#2f6370'}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
    
    L.marker([${marker.lat}, ${marker.lng}], {icon: customIcon${index}})
      .addTo(map)
      .bindPopup('${marker.title}');
  `).join('\n');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Mapa Leaflet</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <style>
        body { 
          margin: 0; 
          padding: 0; 
          font-family: Arial, sans-serif; 
          overflow: hidden;
        }
        #map { 
          width: 100vw; 
          height: 100vh; 
          border-radius: ${borderRadius}px;
          overflow: hidden;
        }
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script>
        // Crear el mapa
        var map = L.map('map').setView([${latitude}, ${longitude}], ${zoom});
        
        // Agregar tiles de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map);
        
        // Agregar marcadores
        ${markersJS}
        
        // Ajustar la vista si hay marcadores
        if (${markers.length} > 0) {
          var group = new L.featureGroup([
            ${markers.map(m => `L.marker([${m.lat}, ${m.lng}])`).join(',\n            ')}
          ]);
          map.fitBounds(group.getBounds().pad(0.1));
        }
      </script>
    </body>
    </html>
  `;

  const containerStyle = [
    styles.container,
    {
      borderRadius: borderRadius,
      overflow: 'hidden'
    },
    style
  ];

  return (
    <View style={containerStyle}>
      <WebView
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        mixedContentMode="compatibility"
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});