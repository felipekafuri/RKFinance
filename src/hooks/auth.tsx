import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

import * as Google from 'expo-google-app-auth'
import * as AppleAuthentication from 'expo-apple-authentication'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: string
  name: string
  email: string
  photo?: string
}

interface IAuthContextData {
  user: User
  signInWithGoogle: () => Promise<void>
  signInWithApple: () => Promise<void>
  signOut: () => Promise<void>
  userStorageLoading: boolean
}

export const AuthContext = createContext({} as IAuthContextData)

function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User>({} as User)
  const [userStorageLoading, setUserStorageLoading] = useState(true)

  const userStorageKey = '@rkfinance:user'

  useEffect(() => {
    async function loadUserStorageData() {
      const user = await AsyncStorage.getItem(userStorageKey)

      if (user) {
        setUser(JSON.parse(user) as User)
      }
      setUserStorageLoading(false)
    }
    loadUserStorageData()
  }, [])

  async function signInWithGoogle() {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          '14974896508-7cui0lvauan9jqa1uucnas93fjnm87ag.apps.googleusercontent.com',
        androidClientId:
          '14974896508-ffqsbmrb6v06bgcstpp7otlir69h4c5a.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      })

      if (result.type === 'success') {
        const userLogged = {
          id: String(result.user.id),
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photoUrl!
        }

        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
        setUser(userLogged)
      } else {
        return
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      })
      if (credential) {
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName!.givenName!,
          photo: `https://ui-avatars.com/api/?name=${credential.fullName!
            .givenName!}`
        }
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
        setUser(userLogged)
      } else {
        return
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async function signOut() {
    setUser({} as User)
    await AsyncStorage.removeItem(userStorageKey)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        userStorageLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
