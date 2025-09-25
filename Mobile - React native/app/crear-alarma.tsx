import { ThemedView } from '@/components/themed-view';
import { RitmosColors, RitmosComponents, RitmosSpacing, RitmosTypography } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CrearAlarmaScreen() {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleCrearAlarma = () => {
    if (!nombre.trim()) {
      alert('Por favor ingresa el nombre de la alarma');
      return;
    }

    if (!ubicacion.trim()) {
      alert('Por favor ingresa la ubicación');
      return;
    }

    if (!descripcion.trim()) {
      alert('Por favor ingresa una descripción');
      return;
    }

    // TODO: Implementar lógica para guardar la alarma
    console.log('Crear alarma:', { nombre, ubicacion, descripcion });
    alert(`¡Alarma creada! Nombre: ${nombre}`);

    // Regresar a la vista anterior después de crear la alarma
    router.back();
  };

  const handleVolver = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Crear alarma</Text>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoIconContainer}>
            <View style={styles.logoIcon}>
              <View style={styles.logoIconLeaf} />
            </View>
            <Text style={styles.logoText}>ritmos</Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre de la alarma"
            placeholderTextColor={RitmosColors.placeholder}
            value={nombre}
            onChangeText={setNombre}
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            placeholder="Ubicación"
            placeholderTextColor={RitmosColors.placeholder}
            value={ubicacion}
            onChangeText={setUbicacion}
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            placeholder="Descripción"
            placeholderTextColor={RitmosColors.placeholder}
            value={descripcion}
            onChangeText={setDescripcion}
            autoCapitalize="sentences"
            multiline={true}
            numberOfLines={2}
          />

          <TouchableOpacity style={styles.createButton} onPress={handleCrearAlarma}>
            <Text style={styles.createButtonText}>Crear Alarma</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleVolver}>
            <Text style={styles.backText}>Volver atrás</Text>
          </TouchableOpacity>
        </View>
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
  headerText: {
    ...RitmosComponents.screenHeaderText,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: RitmosSpacing.xxl + RitmosSpacing.xxl,
    marginBottom: RitmosSpacing.xxl + RitmosSpacing.lg,
  },
  logoIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RitmosSpacing.sm + 2,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: RitmosColors.primary,
    position: 'relative',
    overflow: 'hidden',
  },
  logoIconLeaf: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 24,
    height: 24,
    backgroundColor: '#8b4513',
    borderRadius: 12,
    transform: [{ rotate: '45deg' }],
  },
  logoText: {
    ...RitmosComponents.headingLarge,
    fontSize: 48,
    fontWeight: '700',
  },
  formContainer: {
    paddingHorizontal: RitmosSpacing.lg + RitmosSpacing.md,
    alignItems: 'center',
  },
  input: {
    ...RitmosComponents.input,
    width: '100%',
    minHeight: 50,
    paddingVertical: RitmosSpacing.md,
    marginBottom: RitmosSpacing.md,
    textAlignVertical: 'top',
  },
  createButton: {
    ...RitmosComponents.primaryButton,
    width: '100%',
    marginTop: RitmosSpacing.lg,
    marginBottom: RitmosSpacing.xl - RitmosSpacing.xs,
  },
  createButtonText: {
    ...RitmosComponents.primaryButtonText,
  },
  backText: {
    ...RitmosComponents.placeholderText,
    fontSize: RitmosTypography.scale.bodyMedium.fontSize,
  },
});