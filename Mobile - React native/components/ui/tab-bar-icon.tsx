import React from 'react';
import { StyleSheet, View } from 'react-native';

import { RitmosColors, RitmosSpacing } from '@/constants/theme';
import { IconSymbol, IconSymbolName } from './icon-symbol';
import { IconBackground } from './iconbackground';

interface TabBarIconProps {
  name: IconSymbolName;
  focused: boolean;
  size?: number;
}

export function TabBarIcon({ name, focused, size = 56 }: TabBarIconProps) {
  const iconColor = focused ? RitmosColors.tabIconForeground : RitmosColors.tabIconForegroundInactive;
  const primaryColor = focused ? RitmosColors.tabIconBase : RitmosColors.tabIconBaseInactive;
  const accentColor = focused ? RitmosColors.tabIconAccent : RitmosColors.tabIconAccentInactive;
  const containerSize = size + RitmosSpacing.md;

  return (
    <View style={[styles.wrapper, { width: containerSize, height: containerSize }]}>
      <View
        style={[
          styles.badge,
          focused ? styles.badgeFocused : styles.badgeInactive,
        ]}
      >
        <IconBackground
          primaryColor={primaryColor}
          accentColor={accentColor}
          size={containerSize}
          style={styles.backgroundSvg}
        />
        <IconSymbol
          name={name}
          size={Math.round(size * 1)}
          color={iconColor}
          style={styles.icon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  badgeFocused: {
    shadowOpacity: 0.18,
  },
  badgeInactive: {
    shadowOpacity: 0.08,
  },
  backgroundSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

  },
  icon: {
    marginTop: 4,
  },
});
