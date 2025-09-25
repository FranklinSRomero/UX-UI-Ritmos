import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { WebMap } from '@/components/ui/web-map';
import { RitmosColors, RitmosComponents, RitmosElevation, RitmosSpacing } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

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

  const handleMarkerPress = (markerId: string) => {
    setSelectedMarker(selectedMarker === markerId ? null : markerId);
    // Opcional: mostrar información del marcador
    const marker = markers.find(m => m.id === markerId);
    if (marker) {
      console.log('Marcador seleccionado:', marker.title);
    }
  };

  const handleLocationPress = (location: LocationCard) => {
    if (location.type === 'add') {
      console.log('Agregar nueva alarma desde mapa');
      router.push('/crear-alarma');
    } else {
      console.log('Ver detalles de ubicación:', location.title);
      // Resaltar el marcador correspondiente
      setSelectedMarker(location.id);
    }
  };

  const handleBackPress = () => {
    // En el contexto de tabs, esto podría navegar a otra pestaña o cerrar el mapa
    console.log('Navegación hacia atrás');
    // Por ahora, simplemente limpiar la selección
    setSelectedMarker(null);
  };

  const getMarkerColor = (color: 'red' | 'green' | 'blue') => {
    const colors = {
      red: 'red',
      green: 'green',
      blue: 'blue',
    };
    return colors[color];
  }; const getCardIconColor = (color: 'red' | 'green' | 'blue') => {
    const colors = {
      red: RitmosColors.error,
      green: RitmosColors.success,
      blue: RitmosColors.primary,
    };
    return colors[color];
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <IconSymbol size={24} name="chevron.left" color={RitmosColors.surface} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Mapa de alarmas</Text>
          <View style={styles.backButton} />
        </View>

        <ScrollView style={styles.content}>
          {/* Mapa Real con Leaflet - Funciona en Expo Go */}
          <View style={styles.mapContainer}>
            <WebMap
              latitude={4.6097}
              longitude={-74.0817}
              zoom={12}
              markers={markers.map(marker => ({
                lat: marker.latitude,
                lng: marker.longitude,
                title: marker.title,
                color: marker.color
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
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RitmosColors.background,
  },
  header: {
    ...RitmosComponents.screenHeader,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    ...RitmosComponents.screenHeaderText,
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    height: 300,
    margin: 0,
    ...RitmosElevation.level1,
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