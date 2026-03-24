import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Dashboard from './Dashboard';
import ProfileScreen from './Profile';
import ActivitiesScreen from './ActivitiesScreen';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ color, size }) => {
            let iconName: any;

            if (route.name === 'Dashboard') iconName = 'home-outline';
            if (route.name === 'ActivitiesScreen') iconName = 'layers-outline';
            if (route.name === 'ProfileScreen') iconName = 'person-outline';
            
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="ActivitiesScreen" component={ActivitiesScreen} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      </Tab.Navigator>
  );
}