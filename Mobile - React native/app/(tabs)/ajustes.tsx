import { Screen } from '@/components/layout/screen';
import { ScreenHeader } from '@/components/layout/screen-header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { RitmosBorder, RitmosColors, RitmosComponents, RitmosElevation, RitmosSpacing, RitmosTypography } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function AjustesScreen() {
  const [invertirHorario, setInvertirHorario] = useState(false);

  // Datos del usuario (normalmente vendrían de un contexto o estado global)
  const userData = {
    nombre: 'Pepito perez',
    correo: 'Pepito.perez@ejemplo.com',
    horaInicio: '8 AM',
    horaFin: '10 PM',
  };

  const handleEditPassword = () => {
    Alert.alert(
      'Editar Contraseña',
      '¿Deseas cambiar tu contraseña?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cambiar', onPress: () => console.log('Navegar a cambiar contraseña') }
      ]
    );
  };

  const handleBackPress = () => {
    console.log('Navegación hacia atrás desde ajustes');
  };

  const handleCerrarSesion = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => {
            console.log('Cerrando sesión...');
            router.replace('/login');
          }
        }
      ]
    );
  };

  const handleEliminarCuenta = () => {
    Alert.alert(
      'Eliminar Cuenta',
      'Esta acción no se puede deshacer. ¿Estás seguro que deseas eliminar tu cuenta permanentemente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            console.log('Eliminando cuenta...');
            // TODO: Implementar eliminación de cuenta
            Alert.alert('Cuenta eliminada', 'Tu cuenta ha sido eliminada exitosamente');
            router.replace('/login');
          }
        }
      ]
    );
  };

  return (
    <Screen>
      <ScreenHeader title="Ajustes" onBackPress={handleBackPress} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Sección de Perfil */}
        <View style={styles.section}>
          <View style={styles.profileField}>
            <Text style={styles.fieldLabel}>Nombre</Text>
            <Text style={styles.fieldValue}>{userData.nombre}</Text>
          </View>

          <View style={styles.profileField}>
            <Text style={styles.fieldLabel}>Correo</Text>
            <Text style={[styles.fieldValue, { textDecorationLine: 'underline' }]}>{userData.correo}</Text>
          </View>
        </View>

        {/* Sección de Contraseña */}
        <View style={styles.section}>
          <View style={styles.passwordField}>
            <View>
              <Text style={styles.fieldLabel}>Contraseña</Text>
              <Text style={styles.fieldValue}>••••••••</Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditPassword}>
              <IconSymbol size={16} name="pencil" color={RitmosColors.primary} />
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sección de Horarios */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horas activas</Text>

          <View style={styles.hoursContainer}>
            <View style={styles.hourPill}>
              <Text style={styles.hourText}>{userData.horaInicio}</Text>
            </View>
            <Text style={styles.hourConnector}>a</Text>
            <View style={styles.hourPill}>
              <Text style={styles.hourText}>{userData.horaFin}</Text>
            </View>
          </View>

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Invertir horario</Text>
            <Switch
              value={invertirHorario}
              onValueChange={setInvertirHorario}
              trackColor={{ false: RitmosColors.outline, true: RitmosColors.primary }}
              thumbColor={invertirHorario ? RitmosColors.surface : RitmosColors.surfaceVariant}
              ios_backgroundColor={RitmosColors.outline}
            />
          </View>
        </View>

        {/* Sección de Acciones de Cuenta */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCerrarSesion}>
            <IconSymbol size={20} name="rectangle.portrait.and.arrow.right" color={RitmosColors.text.onSurface} />
            <Text style={styles.actionButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.dangerButton]} onPress={handleEliminarCuenta}>
            <IconSymbol size={20} name="person.fill.xmark" color={RitmosColors.error} />
            <Text style={[styles.actionButtonText, styles.dangerText]}>Eliminar cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: RitmosSpacing.lg,
  },
  section: {
    marginTop: RitmosSpacing.xl - RitmosSpacing.xs,
  },
  profileField: {
    marginBottom: RitmosSpacing.xl - RitmosSpacing.sm,
  },
  fieldLabel: {
    ...RitmosComponents.headingMedium,
    fontWeight: '900',
    marginBottom: RitmosSpacing.xs - 1,
  },
  fieldValue: {
    ...RitmosComponents.bodyText,
    color: RitmosColors.text.onSurface,
  },
  passwordField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: RitmosColors.surfaceVariant,
    paddingHorizontal: RitmosSpacing.md,
    paddingVertical: RitmosSpacing.xs + 4,
    borderRadius: RitmosSpacing.lg,
    gap: RitmosSpacing.xs + 1,
    ...RitmosElevation.level1,
  },
  editButtonText: {
    color: RitmosColors.primary,
    fontSize: RitmosTypography.scale.bodyMedium.fontSize,
    fontWeight: RitmosTypography.scale.labelMedium.fontWeight,
    fontFamily: RitmosTypography.fonts.primary,
  },
  sectionTitle: {
    ...RitmosComponents.headingMedium,
    marginBottom: RitmosSpacing.lg,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: RitmosSpacing.xl - RitmosSpacing.xs,
    gap: RitmosSpacing.md,
  },
  hourPill: {
    backgroundColor: RitmosColors.surfaceVariant,
    paddingHorizontal: RitmosSpacing.md,
    paddingVertical: RitmosSpacing.xs + 4,
    borderRadius: RitmosBorder.radius.lg,
    ...RitmosElevation.level1,
  },
  hourText: {
    fontSize: RitmosTypography.scale.bodyMedium.fontSize,
    color: RitmosColors.text.onSurface,
    fontWeight: RitmosTypography.scale.labelMedium.fontWeight,
    fontFamily: RitmosTypography.fonts.secondary,
  },
  hourConnector: {
    fontSize: RitmosTypography.scale.bodyMedium.fontSize,
    color: RitmosColors.text.onSurface,
    fontFamily: RitmosTypography.fonts.secondary,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  toggleLabel: {
    ...RitmosComponents.bodyText,
    color: RitmosColors.text.onBackground,
  },
  actionsSection: {
    marginTop: RitmosSpacing.xxl,
    gap: RitmosSpacing.md,
    paddingBottom: RitmosSpacing.xxl,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: RitmosColors.surface,
    paddingHorizontal: RitmosSpacing.lg,
    paddingVertical: RitmosSpacing.md,
    borderRadius: RitmosBorder.radius.sm,
    gap: RitmosSpacing.md,
    ...RitmosElevation.level2,
  },
  dangerButton: {
    borderWidth: 1,
    borderColor: RitmosColors.error,
  },
  actionButtonText: {
    fontSize: RitmosTypography.scale.bodyLarge.fontSize,
    color: RitmosColors.text.onSurface,
    fontWeight: RitmosTypography.scale.labelMedium.fontWeight,
    fontFamily: RitmosTypography.fonts.primary,
  },
  dangerText: {
    color: RitmosColors.error,
  },
});