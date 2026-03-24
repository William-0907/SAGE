import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: { display: 'none' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <Ionicons size={28} name={focused ? 'home' : 'home-outline'} color={color} />,
        }}
      />
      <Tabs.Screen
        name="activities"
        options={{
          title: 'Activities',
          tabBarIcon: ({ color, focused }) => <Ionicons size={28} name={focused ? 'layers' : 'layers-outline'} color={color} />,
        }}
      />
      <Tabs.Screen
        name="assistant"
        options={{
          title: 'Assistant',
          tabBarIcon: ({ color, focused }) => <Ionicons size={28} name={focused ? 'chatbox' : 'chatbox-outline'} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <Ionicons size={28} name={focused ? 'person' : 'person-outline'} color={color} />,
        }}
      />
    </Tabs>
  );
}
