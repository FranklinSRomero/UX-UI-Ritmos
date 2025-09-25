/**
 * Sistema de tema unificado para la aplicación Ritmos
 * Colores, tipografías y estilos consistentes según Material 3
 */

import { Platform, StyleSheet } from 'react-native';

// Paleta de colores unificada
export const RitmosColors = {
  // Colores principales
  primary: '#2f6370',        // Verde oscuro del logo y partes oscuras
  placeholder: '#97b1b8',    // Color verdoso para placeholders
  background: '#ffffff',     // Blanco puro para fondos
  alarmCard: '#9ac6e3',      // Azul de las tarjetas de alarmas
  
  // Colores de sistema
  text: {
    primary: '#2f6370',
    secondary: '#97b1b8',
    onBackground: '#333333',
    onSurface: '#666666',
    disabled: '#999999',
  },
  
  // Estados
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  
  // Superficies
  surface: '#ffffff',
  surfaceVariant: '#f5f5f5',
  outline: '#E0E0E0',
};

// Tipografías unificadas
export const RitmosTypography = {
  // Configuración de fuentes
  fonts: {
    primary: Platform.select({
      ios: 'DM Sans',
      android: 'DM Sans',
      default: 'DM Sans',
    }),
    secondary: Platform.select({
      ios: 'Inter',
      android: 'Inter', 
      default: 'Inter',
    }),
  },
  
  // Escalas tipográficas
  scale: {
    // Headers
    headerLarge: {
      fontSize: 24,
      fontWeight: '700' as const,
      lineHeight: 32,
    },
    headerMedium: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 24,
    },
    headerSmall: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 22,
    },
    
    // Body texts
    bodyLarge: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    bodyMedium: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    bodySmall: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
    },
    
    // Labels
    labelLarge: {
      fontSize: 16,
      fontWeight: '500' as const,
      lineHeight: 20,
    },
    labelMedium: {
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 18,
    },
    labelSmall: {
      fontSize: 12,
      fontWeight: '500' as const,
      lineHeight: 16,
    },
  },
};

// Sombras Material 3
export const RitmosElevation = {
  level1: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  level2: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  level3: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
};

// Espaciado consistente
export const RitmosSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Bordes y radios
export const RitmosBorder = {
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 999,
  },
  width: {
    thin: 1,
    medium: 2,
    thick: 3,
  },
};

// Estilos de componentes unificados
export const RitmosComponents = StyleSheet.create({
  // Inputs unificados
  input: {
    height: 50,
    backgroundColor: RitmosColors.surface,
    borderRadius: RitmosBorder.radius.full,
    paddingHorizontal: RitmosSpacing.lg,
    fontSize: RitmosTypography.scale.bodyLarge.fontSize,
    fontFamily: RitmosTypography.fonts.primary,
    color: RitmosColors.text.onBackground,
    ...RitmosElevation.level1,
  },
  
  inputPlaceholder: {
    color: RitmosColors.placeholder,
  },
  
  // Botones primarios
  primaryButton: {
    height: 50,
    backgroundColor: RitmosColors.primary,
    borderRadius: RitmosBorder.radius.full,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    ...RitmosElevation.level2,
  },
  
  primaryButtonText: {
    fontSize: RitmosTypography.scale.labelLarge.fontSize,
    fontWeight: RitmosTypography.scale.labelLarge.fontWeight,
    fontFamily: RitmosTypography.fonts.primary,
    color: RitmosColors.surface,
  },
  
  // Botones secundarios
  secondaryButton: {
    height: 50,
    backgroundColor: RitmosColors.surface,
    borderRadius: RitmosBorder.radius.full,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    ...RitmosElevation.level1,
  },
  
  secondaryButtonText: {
    fontSize: RitmosTypography.scale.labelLarge.fontSize,
    fontWeight: RitmosTypography.scale.labelLarge.fontWeight,
    fontFamily: RitmosTypography.fonts.primary,
    color: RitmosColors.text.onSurface,
  },
  
  // Headers consistentes
  screenHeader: {
    backgroundColor: RitmosColors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  
  screenHeaderText: {
    color: RitmosColors.surface,
    fontSize: RitmosTypography.scale.headerLarge.fontSize,
    fontWeight: RitmosTypography.scale.headerLarge.fontWeight,
    fontFamily: RitmosTypography.fonts.secondary,
    flex: 1,
  },
  
  // Tarjetas
  card: {
    backgroundColor: RitmosColors.surface,
    borderRadius: RitmosBorder.radius.lg,
    padding: RitmosSpacing.md,
    ...RitmosElevation.level1,
  },
  
  alarmCard: {
    backgroundColor: RitmosColors.alarmCard,
    borderRadius: RitmosBorder.radius.lg,
    padding: RitmosSpacing.md,
    ...RitmosElevation.level1,
  },
  
  // Texto consistente
  headingLarge: {
    fontSize: RitmosTypography.scale.headerLarge.fontSize,
    fontWeight: RitmosTypography.scale.headerLarge.fontWeight,
    fontFamily: RitmosTypography.fonts.primary,
    color: RitmosColors.text.primary,
    lineHeight: RitmosTypography.scale.headerLarge.lineHeight,
  },
  
  headingMedium: {
    fontSize: RitmosTypography.scale.headerMedium.fontSize,
    fontWeight: RitmosTypography.scale.headerMedium.fontWeight,
    fontFamily: RitmosTypography.fonts.primary,
    color: RitmosColors.text.onBackground,
    lineHeight: RitmosTypography.scale.headerMedium.lineHeight,
  },
  
  bodyText: {
    fontSize: RitmosTypography.scale.bodyLarge.fontSize,
    fontWeight: RitmosTypography.scale.bodyLarge.fontWeight,
    fontFamily: RitmosTypography.fonts.secondary,
    color: RitmosColors.text.onSurface,
    lineHeight: RitmosTypography.scale.bodyLarge.lineHeight,
  },
  
  placeholderText: {
    fontSize: RitmosTypography.scale.bodyLarge.fontSize,
    fontFamily: RitmosTypography.fonts.secondary,
    color: RitmosColors.placeholder,
  },
});

// Mantener compatibilidad con el sistema existente
export const Colors = {
  light: {
    text: RitmosColors.text.onBackground,
    background: RitmosColors.background,
    tint: RitmosColors.primary,
    icon: RitmosColors.text.onSurface,
    tabIconDefault: RitmosColors.text.onSurface,
    tabIconSelected: RitmosColors.primary,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: RitmosTypography.fonts.primary,
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: RitmosTypography.fonts.primary,
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: `${RitmosTypography.fonts.primary}, system-ui, -apple-system, sans-serif`,
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', sans-serif",
    mono: "monospace",
  },
});
