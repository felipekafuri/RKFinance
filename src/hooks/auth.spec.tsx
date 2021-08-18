import { renderHook, act, RenderResult } from '@testing-library/react-hooks'
import { mocked } from 'ts-jest/utils'
import { logInAsync } from 'expo-google-app-auth'
import { signInAsync } from 'expo-apple-authentication'

import { AuthProvider, useAuth } from './auth'

jest.mock('expo-google-app-auth')
jest.mock('expo-apple-authentication')

// Global variable that will be typed as RenderResult with the returned type of the hook
let hookResult: RenderResult<ReturnType<typeof useAuth>>

describe('Auth Hook', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })
    hookResult = result
  })

  it('Should be able to sign in with a existing Google account', async () => {
    const googleMocked = mocked(logInAsync as any)
    googleMocked.mockReturnValue({
      type: 'success',
      accessToken: 'accessToken',
      idToken: 'idToken',
      user: {
        id: 'userId',
        email: 'jihuuja@ve.gg',
        name: 'Jihuuja',
        photo: 'any_photo.png'
      }
    })

    await act(() => hookResult.current.signInWithGoogle())
    expect(hookResult.current.user.name).toBe('Jihuuja')
  })

  it('Should not connect if cancel authentication with Google', async () => {
    const googleMocked = mocked(logInAsync as any)
    googleMocked.mockReturnValue({
      type: 'canceled'
    })

    await act(() => hookResult.current.signInWithGoogle())
    expect(hookResult.current.user).not.toHaveProperty('id')
  })

  it('should be able to sign in with a existing apple account', async () => {
    const appleMocked = mocked(signInAsync as any)
    appleMocked.mockReturnValue({
      user: 'userId',
      email: 'jihuuja@ve.gg',
      fullName: {
        givenName: 'Jihuuja'
      },
      photo: 'any_photo.png',
      authorizationCode: 'authorizationCode'
    })

    await act(() => hookResult.current.signInWithApple())
    expect(hookResult.current.user.name).toBe('Jihuuja')
  })
})
