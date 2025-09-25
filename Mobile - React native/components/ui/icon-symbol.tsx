import React, { ComponentType } from 'react';
import { OpaqueColorValue, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import {
  ArrowRightOnRectangleIcon,
  ArrowUpOnSquareIcon,
  BellIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CodeBracketIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  HomeIcon,
  InformationCircleIcon,
  LinkIcon,
  LockClosedIcon,
  MapIcon,
  MicrophoneIcon,
  PaperAirplaneIcon,
  PauseCircleIcon,
  PencilSquareIcon,
  PhotoIcon,
  PlayCircleIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
  UserMinusIcon,
  XMarkIcon,
} from 'react-native-heroicons/outline';

const ICON_COMPONENTS = {
  'bell.fill': BellIcon,
  'chevron.left': ChevronLeftIcon,
  'chevron.left.forwardslash.chevron.right': CodeBracketIcon,
  'chevron.right': ChevronRightIcon,
  eye: EyeIcon,
  'eye.slash': EyeSlashIcon,
  'gearshape.fill': Cog6ToothIcon,
  'house.fill': HomeIcon,
  'info.circle': InformationCircleIcon,
  link: LinkIcon,
  'location.fill': MapIcon,
  microphone: MicrophoneIcon,
  lock: LockClosedIcon,
  'paperplane.fill': PaperAirplaneIcon,
  'pause.fill': PauseCircleIcon,
  pencil: PencilSquareIcon,
  photo: PhotoIcon,
  'person.fill.xmark': UserMinusIcon,
  'play.fill': PlayCircleIcon,
  'rectangle.portrait.and.arrow.right': ArrowRightOnRectangleIcon,
  'check.circle': CheckCircleIcon,
  'square.and.arrow.up': ArrowUpOnSquareIcon,
  trash: TrashIcon,
  xmark: XMarkIcon,
  envelope: EnvelopeIcon,
} as const satisfies Record<string, ComponentType<{ color?: string; size?: number }>>;

export type IconSymbolName = keyof typeof ICON_COMPONENTS;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
}) {
  const IconComponent = ICON_COMPONENTS[name] ?? QuestionMarkCircleIcon;
  const resolvedColor = typeof color === 'string' ? color : undefined;

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style as StyleProp<ViewStyle>,
      ]}
    >
      <IconComponent size={size} color={resolvedColor} />
    </View>
  );
}



