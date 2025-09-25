import type { ComponentType } from 'react';
import React from 'react';
import type { StyleProp } from 'react-native';
import { View, ViewStyle } from 'react-native';
import {
  ArrowRightOnRectangleIcon,
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
  LinkIcon,
  MapPinIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  ShareIcon,
  TrashIcon,
  UserMinusIcon,
  XMarkIcon,
} from 'react-native-heroicons/solid';

// Definir los tipos de iconos disponibles
export type CustomIconName =
  // Navigation
  | 'chevron-left'
  | 'chevron-right'
  // Tabs
  | 'location-fill'
  | 'bell-fill'
  | 'gearshape-fill'
  // Actions
  | 'pencil'
  | 'trash'
  | 'share'
  | 'close'
  | 'link'
  // Auth
  | 'eye'
  | 'eye-slash'
  | 'envelope'
  // Info
  | 'info-circle'
  // User  
  | 'logout'
  | 'delete-user';

type IconComponent = ComponentType<{ color?: string; size?: number }>;

const ICON_COMPONENTS: Record<CustomIconName, IconComponent> = {
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  'location-fill': MapPinIcon,
  'bell-fill': BellIcon,
  'gearshape-fill': Cog6ToothIcon,
  pencil: PencilSquareIcon,
  trash: TrashIcon,
  share: ShareIcon,
  close: XMarkIcon,
  link: LinkIcon,
  eye: EyeIcon,
  'eye-slash': EyeSlashIcon,
  envelope: EnvelopeIcon,
  'info-circle': InformationCircleIcon,
  logout: ArrowRightOnRectangleIcon,
  'delete-user': UserMinusIcon,
};

interface CustomIconProps {
  name: CustomIconName;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Componente de icono personalizado que renderiza SVGs nativos
 * Sustituye a IconSymbol para iconos personalizados del diseño
 */
export const CustomIcon: React.FC<CustomIconProps> = ({
  name,
  size = 24,
  color = '#000',
  style
}) => {
  const IconComponent = ICON_COMPONENTS[name];

  if (!IconComponent) {
    console.warn(`CustomIcon: Icono "${name}" no implementado aún`);
  }

  const ResolvedIcon = IconComponent ?? QuestionMarkCircleIcon;

  return (
    <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
      <ResolvedIcon size={size} color={color} />
    </View>
  );
};

export default CustomIcon;