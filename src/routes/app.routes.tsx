import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';

import { useTheme } from 'styled-components'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  const theme = useTheme()

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.secondary,
        inactiveTintColor: theme.colors.text,
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 88
        }
      }}
    >
      <Screen
        component={Dashboard}
        name="Dashboard"
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              color={color}
              size={size}
            />
          ))
        }}
      />
      <Screen component={Register} name="Register" options={{
        tabBarIcon: (({ size, color }) => (
          <MaterialIcons
            name="attach-money"
            color={color}
            size={size}
          />
        ))
      }} />
      <Screen component={Register} name="Resumo" options={{
        tabBarIcon: (({ size, color }) => (
          <MaterialIcons
            name="pie-chart"
            color={color}
            size={size}
          />
        ))
      }} />
    </Navigator>
  )
}