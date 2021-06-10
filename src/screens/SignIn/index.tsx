import React, { useContext, useState } from 'react'

import {
  Container,
  Header,
  Title,
  TitleWrapper,
  SignInTitle,
  Footer,
  ButtonsWrapper
} from './styles'

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize'
import { useAuth } from '../../hooks/auth'

import { SignInSocialButton } from '../../components/SignInSocialButton'
import { ActivityIndicator, Alert, Platform } from 'react-native'
import theme from '../../global/styles/theme'

export function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true)
      return await signInWithGoogle()
    } catch (error) {
      console.log(error)
      Alert.alert('Ops!!', 'Houve um erro ao logar com a conta Google')
      setIsLoading(false)
    }
  }
  async function handleSignInWithApple() {
    try {
      setIsLoading(true)
      return await signInWithApple()
    } catch (error) {
      console.log(error)
      Alert.alert('Ops!!', 'Houve um erro ao logar com a conta Apple')
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>Controle suas finanças de forma muito simples</Title>
        </TitleWrapper>

        <SignInTitle>Faça seu login com uma das contas abaixo</SignInTitle>
      </Header>

      <Footer>
        <ButtonsWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />

          {Platform.OS === 'ios' && (
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          )}
        </ButtonsWrapper>

        {isLoading && (
          <ActivityIndicator
            style={{ marginTop: 18 }}
            color={theme.colors.shape}
            size="small"
          />
        )}
      </Footer>
    </Container>
  )
}
