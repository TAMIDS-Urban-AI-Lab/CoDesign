import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/navigation/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/navigation/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TAB_ROUTES } from '@/constants/Routes';

const TAB_BAR_HEIGHT = 90;
const TAB_BAR_GAP = 5;
const TAB_LABEL_FONT_SIZE = 12;

const styles = StyleSheet.create({
  tabBar: {
    height: TAB_BAR_HEIGHT,
    paddingTop: TAB_BAR_GAP,
    ...Platform.select({
      ios: {
        position: 'absolute' // Use a transparent background on iOS to show the blur effect
      },
      web: {
        // Centering on native apps gets clipped, so only apply to web
        flexDirection: 'row',
        alignItems: 'center'
      },
      default: {}
    })
  },
  tabBarLabel: {
    paddingTop: TAB_BAR_GAP,
    fontSize: TAB_LABEL_FONT_SIZE
  },
  tabBarIcon: {}
});

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      backBehavior="firstRoute"
      screenOptions={{
        animation: 'shift',
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: styles.tabBar,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarLabelStyle: styles.tabBarLabel
      }}
    >
      <Tabs.Screen
        name={TAB_ROUTES.INDEX}
        options={{
          title: 'View Map',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="map.fill" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name={TAB_ROUTES.REPORT}
        options={{
          title: 'Create Report',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="pencil" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name={TAB_ROUTES.PROFILE}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="person.crop.circle.fill"
              color={color}
            />
          )
        }}
      />
    </Tabs>
  );
}
