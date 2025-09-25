import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { RitmosColors } from '@/constants/theme';

interface ScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  safeAreaStyle?: StyleProp<ViewStyle>;
}

export const Screen: React.FC<PropsWithChildren<ScreenProps>> = ({
  children,
  style,
  safeAreaStyle,
}) => {
  return (
    <SafeAreaView style={[styles.safeArea, safeAreaStyle]}>
      <ThemedView style={[styles.container, style]}>{children}</ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: RitmosColors.background,
  },
  container: {
    flex: 1,
    backgroundColor: RitmosColors.background,
  },
});
