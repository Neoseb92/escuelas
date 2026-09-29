import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import Comunicacion from './Comunicacion';
import Boleta from './Boleta';
import Alumnos from './Alumnos';
import Horario from './Horario';
import Tareas from './Tareas';

const Tab = createBottomTabNavigator();

const TabIcon = ({ emoji, focused }) => (
  <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>
);

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#002f6c' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e8e8e8',
          height: 62,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarActiveTintColor: '#002f6c',
        tabBarInactiveTintColor: '#aaa',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}>
      <Tab.Screen
        name="Comunicación"
        component={Comunicacion}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="📢" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Boleta"
        component={Boleta}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="📋" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Alumnos"
        component={Alumnos}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Horario"
        component={Horario}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🗓️" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Tareas"
        component={Tareas}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon emoji="✅" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}
