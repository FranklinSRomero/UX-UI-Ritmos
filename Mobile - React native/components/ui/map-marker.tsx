import { CircleLayer, ShapeSource } from '@maplibre/maplibre-react-native';
import React from 'react';

interface MarkerProps {
  lng: number;
  lat: number;
  title?: string;
  color?: string;
}

const createFeature = (lng: number, lat: number, props: any = {}) => ({
  type: "Feature" as const,
  geometry: {
    type: "Point" as const,
    coordinates: [lng, lat]
  },
  properties: props
});

export function MapMarker({ lng, lat, title = '', color = '#1976d2' }: MarkerProps) {
  const featureCollection = {
    type: "FeatureCollection" as const,
    features: [createFeature(lng, lat, { title })]
  };

  return (
    <ShapeSource id={`marker-${lng}-${lat}`} shape={featureCollection}>
      <CircleLayer
        id={`marker-layer-${lng}-${lat}`}
        style={{
          circleRadius: 8,
          circleColor: color,
          circleStrokeWidth: 3,
          circleStrokeColor: "#ffffff",
          circleOpacity: 0.8,
        }}
      />
    </ShapeSource>
  );
}