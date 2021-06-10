import 'react-native-gesture-handler'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import AppLoading from 'expo-app-loading'
import React from 'react'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts
} from '@expo-google-fonts/poppins'
import { Routes } from './src/routes'

import { AuthProvider, useAuth } from './src/hooks/auth'
import theme from './src/global/styles/theme'

export default function App() {
  const { userStorageLoading } = useAuth()

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  )
}
