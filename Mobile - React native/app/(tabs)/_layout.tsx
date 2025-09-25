import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#5f8a6d',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#5f8a6d',
          paddingTop: 10,
          paddingBottom: 10,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          color: 'white',
        },
        tabBarIconStyle: {
          marginBottom: 5,
        },
      }}>
      <Tabs.Screen
        name="ubicaciones"
        options={{
          title: 'Ubicaciones',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="location.fill" color="white" />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Alarmas',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="bell.fill" color="white" />,
        }}
      />
      <Tabs.Screen
        name="ajustes"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="gearshape.fill" color="white" />,
        }}
      />
    </Tabs>
  );
}
