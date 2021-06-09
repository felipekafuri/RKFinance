import React, { useContext } from 'react'

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

export function SignIn() {
  const { user } = useAuth()
  console.log(user.email)

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>Controle suas finanças de forma muito simples </Title>
        </TitleWrapper>

        <SignInTitle>Faça seu login com uma das contas abaixo</SignInTitle>
      </Header>

      <Footer>
        <ButtonsWrapper>
          <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} />
          <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
        </ButtonsWrapper>
      </Footer>
    </Container>
  )
}
