import { Screen } from '@/components/layout/screen';
import { ScreenHeader } from '@/components/layout/screen-header';
import { WebMap } from '@/components/ui/web-map';
import { RitmosColors, RitmosComponents, RitmosElevation, RitmosSpacing } from '@/constants/theme';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface LocationMarker {
  id: string;
  title: string;
  color: 'red' | 'green' | 'blue';
  latitude: number;
  longitude: number;
  description?: string;
}

interface LocationCard {
  id: string;
  title: string;
  color: 'red' | 'green' | 'blue';
  type: 'location' | 'add';
}

export default function UbicacionesScreen() {
  // Coordenadas de ejemplo en Bogotá, Colombia
  const markers: LocationMarker[] = [
    {
      id: '1',
      title: 'Centro comercial',
      color: 'red',
      latitude: 4.6097,
      longitude: -74.0817,
      description: 'Centro Comercial Principal'
    },
    {
      id: '2',
      title: 'Ferretería',
      color: 'green',
      latitude: 4.6351,
      longitude: -74.0703,
      description: 'Ferretería del Norte'
    },
    {
      id: '3',
      title: 'Aniversario',
      color: 'blue',
      latitude: 4.5981,
      longitude: -74.0758,
      description: 'Lugar de celebración'
    },
  ];

  const locationCards: LocationCard[] = [
    { id: '1', title: 'Centro comercial', color: 'red', type: 'location' },
    { id: '2', title: 'Ferretería', color: 'green', type: 'location' },
    { id: '3', title: 'Aniversario', color: 'blue', type: 'location' },
    { id: '4', title: '', color: 'blue', type: 'add' },
  ];

  const handleLocationPress = (location: LocationCard) => {
    if (location.type === 'add') {
      console.log('Agregar nueva alarma desde mapa');
      router.push('/crear-alarma');
    } else {
      router.push('/detalle-alarma');
    }
  };

  const handleBackPress = () => {
    console.log('Navegación hacia atrás');
  };

  const getCardIconColor = (color: 'red' | 'green' | 'blue') => {
    const colors = {
      red: RitmosColors.error,
      green: RitmosColors.success,
      blue: RitmosColors.primary,
    };
    return colors[color];
  };

  return (
    <Screen>
      <ScreenHeader title="Mapa de alarmas" onBackPress={handleBackPress} />

      <ScrollView style={styles.content}>
        {/* Mapa Real con Leaflet - Funciona en Expo Go */}
        <View style={styles.mapContainer}>
          <WebMap
            latitude={4.6097}
            longitude={-74.0817}
            zoom={12}
            borderRadius={RitmosSpacing.md}
            markers={markers.map(marker => ({
              lat: marker.latitude,
              lng: marker.longitude,
              title: marker.title,
              color: getCardIconColor(marker.color)
            }))}
          />
        </View>

        {/* Lista de ubicaciones */}
        <View style={styles.locationsContainer}>
          {locationCards.map((location) => {
            if (location.type === 'add') {
              return (
                <TouchableOpacity
                  key={location.id}
                  style={styles.addLocationCard}
                  onPress={() => handleLocationPress(location)}
                >
                  <Text style={styles.addLocationText}>+</Text>
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity
                key={location.id}
                style={styles.locationCard}
                onPress={() => handleLocationPress(location)}
              >
                <View
                  style={[
                    styles.locationIcon,
                    { backgroundColor: getCardIconColor(location.color) }
                  ]}
                />
                <Text style={styles.locationText}>{location.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  mapContainer: {
    height: 300,
    marginTop: RitmosSpacing.lg,
    padding: 0,
    borderRadius: RitmosSpacing.md,
    marginLeft: RitmosSpacing.lg,
    marginRight: RitmosSpacing.lg,
    backgroundColor: RitmosColors.surface,
    ...RitmosElevation.level1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  locationsContainer: {
    padding: RitmosSpacing.lg,
    gap: RitmosSpacing.sm + RitmosSpacing.xs,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: RitmosColors.alarmCard,
    borderRadius: RitmosSpacing.lg + RitmosSpacing.sm,
    paddingVertical: RitmosSpacing.md,
    paddingHorizontal: RitmosSpacing.lg,
    gap: RitmosSpacing.md,
    ...RitmosElevation.level1,
  },
  locationIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  locationText: {
    ...RitmosComponents.bodyText,
    color: RitmosColors.text.onBackground,
    flex: 1,
  },
  addLocationCard: {
    backgroundColor: RitmosColors.surface,
    borderWidth: 2,
    borderColor: RitmosColors.placeholder,
    borderStyle: 'dashed',
    borderRadius: RitmosSpacing.lg + RitmosSpacing.sm,
    paddingVertical: RitmosSpacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...RitmosElevation.level1,
  },
  addLocationText: {
    fontSize: 24,
    fontWeight: '700',
    color: RitmosColors.primary,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: RitmosColors.placeholder,
    borderRadius: RitmosSpacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    padding: RitmosSpacing.lg,
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: RitmosColors.text.onBackground,
    textAlign: 'center',
    marginBottom: RitmosSpacing.sm,
  },
  mapInfoText: {
    fontSize: 14,
    color: RitmosColors.text.secondary,
    textAlign: 'center',
    marginBottom: RitmosSpacing.md,
  },
  demoButton: {
    backgroundColor: RitmosColors.primary,
    borderRadius: RitmosSpacing.md,
    paddingVertical: RitmosSpacing.sm,
    paddingHorizontal: RitmosSpacing.lg,
    ...RitmosElevation.level1,
  },
  demoButtonText: {
    color: RitmosColors.surface,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});