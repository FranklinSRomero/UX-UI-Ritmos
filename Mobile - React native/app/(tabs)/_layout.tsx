import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { TabBarIcon } from '@/components/ui/tab-bar-icon';
import { RitmosColors, RitmosSpacing, RitmosTypography } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: RitmosColors.surface,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.75)',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: RitmosColors.tabBarBackground,
          height: 90,
          borderTopWidth: 0,
          paddingTop: RitmosSpacing.md,
          paddingBottom: RitmosSpacing.sm,
        },
        tabBarLabelStyle: {
          fontSize: RitmosTypography.scale.bodySmall.fontSize,
          fontFamily: RitmosTypography.fonts.secondary,
          fontWeight: '600',
          marginTop: RitmosSpacing.md,
        },
      }}>
      <Tabs.Screen
        name="ubicaciones"
        options={{
          title: 'Ubicaciones',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="location.fill" />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Alarmas',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="bell.fill" />
          ),
        }}
      />
      <Tabs.Screen
        name="ajustes"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="gearshape.fill" />
          ),
        }}
      />
    </Tabs>
  );
}
