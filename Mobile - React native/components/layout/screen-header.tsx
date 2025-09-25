import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { RitmosColors, RitmosComponents, RitmosSpacing } from '@/constants/theme';

interface ScreenHeaderProps {
  title: string;
  onBackPress?: () => void;
  rightSlot?: React.ReactNode;
  testID?: string;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  onBackPress,
  rightSlot,
  testID,
}) => {
  const touchableHitSlop = {
    top: RitmosSpacing.xs,
    bottom: RitmosSpacing.xs,
    left: RitmosSpacing.xs,
    right: RitmosSpacing.xs,
  } as const;

  return (
    <View style={styles.header} testID={testID}>
      {onBackPress ? (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Volver"
          hitSlop={touchableHitSlop}
          style={styles.side}
          onPress={onBackPress}
        >
          <IconSymbol size={24} name="chevron.left" color={RitmosColors.surface} />
        </TouchableOpacity>
      ) : (
        <View style={styles.side} />
      )}

      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>

      <View style={styles.side}>{rightSlot}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    ...RitmosComponents.screenHeader,
    width: '100%',
    flexGrow: 0,
    flexShrink: 0,
  },
  side: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...RitmosComponents.screenHeaderText,
    textAlign: 'center',
  },
});
