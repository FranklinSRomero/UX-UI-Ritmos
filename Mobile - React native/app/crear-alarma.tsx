import { Screen } from '@/components/layout/screen';
import { FormField } from '@/components/ui/form-field';
import { IconSymbol } from '@/components/ui/icon-symbol';
import {
  RitmosBorder,
  RitmosColors,
  RitmosElevation,
  RitmosSpacing,
  RitmosTypography,
} from '@/constants/theme';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Defs, Path, Pattern, Rect } from 'react-native-svg';

type LocationMode = 'map' | 'current';
const RADIUS_OPTIONS = [5, 10, 15, 25, 50];

const GRID_COLOR = 'rgba(34, 83, 96, 0.18)';

export default function CrearAlarmaScreen() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [locationMode, setLocationMode] = useState<LocationMode>('map');
  const [selectedRadius, setSelectedRadius] = useState<number>(50);

  const descripcionInputRef = useRef<TextInput>(null);

  const handleCrearAlarma = () => {
    if (!nombre.trim()) {
      Alert.alert('Campo requerido', 'Por favor ingresa el nombre de la alarma');
      return;
    }

    if (!descripcion.trim()) {
      Alert.alert('Campo requerido', 'Por favor ingresa una nota para la alarma');
      return;
    }

    console.log('Crear alarma:', {
      nombre,
      descripcion,
      locationMode,
      radio: selectedRadius,
    });
    Alert.alert('Alarma creada', `Nombre: ${nombre}`);
    router.back();
  };

  const handleVolver = () => {
    router.back();
  };

  const handleAttachmentPress = (type: 'photo' | 'audio') => {
    Alert.alert('Próximamente', `La opción de ${type === 'photo' ? 'fotos' : 'audio'} estará disponible pronto.`);
  };

  return (
    <Screen style={styles.screen} safeAreaStyle={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.headerTitle}>Crear Alarma</Text>
        </View>
        <TouchableOpacity style={styles.headerButton} onPress={handleVolver}>
          <IconSymbol name="chevron.left" size={22} color={RitmosColors.tabBarBackground} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <GridBackground />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.section}>
            <FormField
              label="Nombre"
              placeholder="Nombre..."
              value={nombre}
              onChangeText={setNombre}
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() => descripcionInputRef.current?.focus()}
              containerStyle={styles.fieldContainer}
              labelStyle={styles.fieldLabel}
              wrapperStyle={styles.inputWrapper}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ubicación</Text>
            <View style={styles.optionRow}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  locationMode === 'map' && styles.optionButtonActive,
                ]}
                onPress={() => setLocationMode('map')}
              >
                <Text
                  style={[
                    styles.optionText,
                    locationMode === 'map' && styles.optionTextActive,
                  ]}
                >
                  Elegir punto del mapa
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.optionButton,
                  locationMode === 'current' && styles.optionButtonActive,
                ]}
                onPress={() => setLocationMode('current')}
              >
                <Text
                  style={[
                    styles.optionText,
                    locationMode === 'current' && styles.optionTextActive,
                  ]}
                >
                  Usar mi ubicación
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Radio de la alarma</Text>
            <View style={styles.segmentGroup}>
              {RADIUS_OPTIONS.map((radius) => (
                <TouchableOpacity
                  key={radius}
                  style={[
                    styles.segmentButton,
                    selectedRadius === radius && styles.segmentButtonActive,
                  ]}
                  onPress={() => setSelectedRadius(radius)}
                >
                  <Text
                    style={[
                      styles.segmentLabel,
                      selectedRadius === radius && styles.segmentLabelActive,
                    ]}
                  >
                    {radius}m
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <FormField
              ref={descripcionInputRef}
              label="Nota y adjuntos"
              placeholder="Recuerda..."
              value={descripcion}
              onChangeText={setDescripcion}
              autoCapitalize="sentences"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              returnKeyType="default"
              containerStyle={styles.fieldContainer}
              labelStyle={styles.fieldLabel}
              wrapperStyle={[styles.inputWrapper, styles.noteInputWrapper]}
              style={styles.noteInput}
            />

            <View style={styles.attachmentRow}>
              <TouchableOpacity
                style={styles.attachmentButton}
                onPress={() => handleAttachmentPress('photo')}
              >
                <IconSymbol name="photo" size={22} color={RitmosColors.tabIconForeground} />
                <Text style={styles.attachmentText}>Fotos</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.attachmentButton}
                onPress={() => handleAttachmentPress('audio')}
              >
                <IconSymbol name="microphone" size={22} color={RitmosColors.tabIconForeground} />
                <Text style={styles.attachmentText}>Audio</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleCrearAlarma}>
            <View style={styles.submitContent}>
              <IconSymbol
                name="check.circle"
                size={24}
                color={RitmosColors.surface}
                style={styles.submitIcon}
              />
              <Text style={styles.submitText}>Crear alarma</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Screen>
  );
}

const GridBackground = () => (
  <Svg pointerEvents="none" width="100%" height="100%" style={styles.gridOverlay}>
    <Defs>
      <Pattern id="gridPattern" patternUnits="userSpaceOnUse" width={32} height={32}>
        <Rect width={32} height={32} fill="transparent" />
        <Path d="M32 0H0" stroke={GRID_COLOR} strokeWidth={0.6} />
        <Path d="M0 0V32" stroke={GRID_COLOR} strokeWidth={0.6} />
      </Pattern>
    </Defs>
    <Rect width="100%" height="100%" fill="url(#gridPattern)" opacity={0.35} />
  </Svg>
);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: RitmosColors.surface,
  },
  safeArea: {
    backgroundColor: RitmosColors.tabBarBackground,
  },
  header: {
    backgroundColor: RitmosColors.tabBarBackground,
    paddingHorizontal: RitmosSpacing.lg,
    paddingTop: RitmosSpacing.xl,
    paddingBottom: RitmosSpacing.md,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  headerCopy: {
    flex: 1,
    paddingRight: RitmosSpacing.lg,
  },
  headerTitle: {
    fontSize: RitmosTypography.scale.headerLarge.fontSize + 6,
    fontWeight: '700',
    fontFamily: RitmosTypography.fonts.secondary,
    color: RitmosColors.surface,
    marginBottom: RitmosSpacing.sm,
  },

  headerButton: {
    width: 48,
    height: 48,
    borderRadius: RitmosBorder.radius.sm,
    backgroundColor: RitmosColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...RitmosElevation.level2,
  },
  body: {
    flex: 1,
    position: 'relative',
    backgroundColor: RitmosColors.surface,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContent: {
    paddingHorizontal: RitmosSpacing.lg,
    paddingTop: RitmosSpacing.xxl,
    paddingBottom: RitmosSpacing.xxl + RitmosSpacing.lg,
    gap: RitmosSpacing.xl,
  },
  section: {
    gap: RitmosSpacing.md,
  },
  fieldContainer: {
    width: '100%',
  },
  fieldLabel: {
    fontSize: RitmosTypography.scale.labelMedium.fontSize,
    fontFamily: RitmosTypography.fonts.secondary,
    fontWeight: '600',
    color: RitmosColors.text.onBackground,
    marginBottom: RitmosSpacing.xs,
  },
  inputWrapper: {
    backgroundColor: 'rgba(214, 226, 232, 0.95)',
    borderRadius: RitmosBorder.radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(58, 124, 134, 0.2)',
    paddingVertical: RitmosSpacing.md + 2,
    ...RitmosElevation.level2,
  },
  optionRow: {
    flexDirection: 'row',
    gap: RitmosSpacing.sm,
    flexWrap: 'wrap',
  },
  optionButton: {
    flex: 1,
    minHeight: 56,
    borderRadius: RitmosBorder.radius.full,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: RitmosSpacing.md,
    borderWidth: 1,
    borderColor: 'rgba(34, 83, 96, 0.15)',
    ...RitmosElevation.level1,
  },
  optionButtonActive: {
    backgroundColor: RitmosColors.surfaceVariant,
    borderColor: RitmosColors.tabIconAccent,
  },
  optionText: {
    fontSize: RitmosTypography.scale.bodyMedium.fontSize,
    fontFamily: RitmosTypography.fonts.secondary,
    color: RitmosColors.text.primary,
    fontWeight: '500',
  },
  optionTextActive: {
    color: RitmosColors.tabIconAccent,
  },
  sectionTitle: {
    fontSize: RitmosTypography.scale.headerSmall.fontSize,
    fontWeight: RitmosTypography.scale.headerSmall.fontWeight,
    fontFamily: RitmosTypography.fonts.primary,
    color: RitmosColors.text.primary,
  },
  segmentGroup: {
    flexDirection: 'row',
    borderRadius: RitmosBorder.radius.full,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(34, 83, 96, 0.12)',
    padding: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    ...RitmosElevation.level1,
  },
  segmentButton: {
    flex: 1,
    height: 44,
    borderRadius: RitmosBorder.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentButtonActive: {
    backgroundColor: RitmosColors.tabBarBackground,
  },
  segmentLabel: {
    fontSize: RitmosTypography.scale.bodySmall.fontSize,
    fontFamily: RitmosTypography.fonts.secondary,
    fontWeight: '600',
    color: RitmosColors.text.primary,
  },
  segmentLabelActive: {
    color: RitmosColors.surface,
  },
  noteInputWrapper: {
    minHeight: 140,
    alignItems: 'flex-start',
  },
  noteInput: {
    fontSize: RitmosTypography.scale.bodyMedium.fontSize,
  },
  attachmentRow: {
    flexDirection: 'row',
    gap: RitmosSpacing.sm,
    marginTop: RitmosSpacing.md,
  },
  attachmentButton: {
    flex: 1,
    minHeight: 60,
    borderRadius: RitmosBorder.radius.sm,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(34, 83, 96, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: RitmosSpacing.sm,
    ...RitmosElevation.level1,
  },
  attachmentText: {
    fontSize: RitmosTypography.scale.bodyMedium.fontSize,
    fontFamily: RitmosTypography.fonts.secondary,
    color: RitmosColors.text.primary,
    fontWeight: '500',
  },
  submitButton: {
    marginTop: RitmosSpacing.sm,
    borderRadius: RitmosBorder.radius.full,
    backgroundColor: RitmosColors.primary,
    ...RitmosElevation.level2,
  },
  submitContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RitmosSpacing.md + RitmosSpacing.xs,
    paddingHorizontal: RitmosSpacing.lg,
    gap: RitmosSpacing.sm,
  },
  submitIcon: {
    marginRight: RitmosSpacing.xs,
  },
  submitText: {
    fontSize: RitmosTypography.scale.labelLarge.fontSize,
    fontWeight: RitmosTypography.scale.labelLarge.fontWeight,
    fontFamily: RitmosTypography.fonts.primary,
    color: RitmosColors.surface,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});