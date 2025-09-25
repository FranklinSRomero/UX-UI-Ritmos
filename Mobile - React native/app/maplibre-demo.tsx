import { ThemedView } from '@/components/themed-view';
import { RitmosColors, RitmosElevation, RitmosSpacing } from '@/constants/theme';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MapLibreDemoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>🗺️ MapLibre Demo</Text>
            <Text style={styles.subtitle}>Mapa sin API Key configurado</Text>
          </View>

          <View style={styles.demoContainer}>
            <View style={styles.mapDemo}>
              <Text style={styles.mapText}>MapLibre GL JS</Text>
              <Text style={styles.coordinates}>Bogotá, Colombia</Text>
              <Text style={styles.coords}>4.6097, -74.0817</Text>
            </View>
          </View>

          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Características de MapLibre</Text>

            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🆓</Text>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Sin API Key</Text>
                <Text style={styles.featureDescription}>
                  No requiere claves de API para funcionar
                </Text>
              </View>
            </View>

            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🌍</Text>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>OpenStreetMap</Text>
                <Text style={styles.featureDescription}>
                  Usa tiles gratuitos de OSM
                </Text>
              </View>
            </View>

            <View style={styles.feature}>
              <Text style={styles.featureIcon}>⚡</Text>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Performante</Text>
                <Text style={styles.featureDescription}>
                  Renderizado vectorial nativo
                </Text>
              </View>
            </View>

            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🎨</Text>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Personalizable</Text>
                <Text style={styles.featureDescription}>
                  Estilos completamente customizables
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.buildInfo}>
            <Text style={styles.buildTitle}>Para ver el mapa real:</Text>
            <Text style={styles.buildText}>
              1. npx expo prebuild
            </Text>
            <Text style={styles.buildText}>
              2. npx expo run:android/ios
            </Text>
            <Text style={styles.note}>
              MapLibre requiere build nativo para funcionar
            </Text>
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
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: RitmosSpacing.xl,
    paddingHorizontal: RitmosSpacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: RitmosColors.primary,
    marginBottom: RitmosSpacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: RitmosColors.text.secondary,
  },
  demoContainer: {
    paddingHorizontal: RitmosSpacing.lg,
    marginBottom: RitmosSpacing.xl,
  },
  mapDemo: {
    backgroundColor: RitmosColors.surface,
    borderRadius: RitmosSpacing.lg,
    padding: RitmosSpacing.xl,
    alignItems: 'center',
    minHeight: 200,
    justifyContent: 'center',
    ...RitmosElevation.level2,
  },
  mapText: {
    fontSize: 24,
    fontWeight: '600',
    color: RitmosColors.primary,
    marginBottom: RitmosSpacing.md,
  },
  coordinates: {
    fontSize: 18,
    color: RitmosColors.text.onSurface,
    marginBottom: RitmosSpacing.sm,
  },
  coords: {
    fontSize: 14,
    color: RitmosColors.text.secondary,
    fontFamily: 'monospace',
  },
  featuresContainer: {
    paddingHorizontal: RitmosSpacing.lg,
    marginBottom: RitmosSpacing.xl,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: RitmosColors.text.onBackground,
    marginBottom: RitmosSpacing.lg,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RitmosSpacing.lg,
    backgroundColor: RitmosColors.surface,
    borderRadius: RitmosSpacing.md,
    padding: RitmosSpacing.md,
    ...RitmosElevation.level1,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: RitmosSpacing.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: RitmosColors.text.onSurface,
    marginBottom: RitmosSpacing.xs,
  },
  featureDescription: {
    fontSize: 14,
    color: RitmosColors.text.secondary,
  },
  buildInfo: {
    paddingHorizontal: RitmosSpacing.lg,
    marginBottom: RitmosSpacing.xl,
  },
  buildTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: RitmosColors.text.onBackground,
    marginBottom: RitmosSpacing.md,
  },
  buildText: {
    fontSize: 14,
    color: RitmosColors.text.secondary,
    fontFamily: 'monospace',
    backgroundColor: RitmosColors.placeholder,
    padding: RitmosSpacing.sm,
    borderRadius: RitmosSpacing.sm,
    marginBottom: RitmosSpacing.sm,
  },
  note: {
    fontSize: 12,
    color: RitmosColors.text.secondary,
    fontStyle: 'italic',
    marginTop: RitmosSpacing.sm,
  },
});