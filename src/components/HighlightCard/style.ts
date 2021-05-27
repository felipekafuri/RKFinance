import styled, { css } from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'

interface TypeProps {
  typeColor: 'income' | 'outcome' | 'total'
}

export const Container = styled.View<TypeProps>`
  background-color: 
  ${({ theme, typeColor }) => typeColor === 'total' ? 
    theme.colors.secondary : theme.colors.shape};

  width: ${RFValue(300)}px;
  height: ${RFValue(200)}px;
  border-radius: 5px;

  padding: ${RFValue(19)}px ${RFValue(23)}px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: ${RFValue(16)}px;

`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Title = styled.Text<TypeProps>`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: 
  ${({ theme, typeColor }) => typeColor === 'total' ? 
    theme.colors.shape : theme.colors.title};
`

export const Icon = styled(Feather) <TypeProps>`
  font-size: ${RFValue(40)}px;
  ${({ typeColor }) => typeColor === 'income' && css`
    color: ${({ theme }) => theme.colors.success};
  `}
  ${({ typeColor }) => typeColor === 'outcome' && css`
    color: ${({ theme }) => theme.colors.attention};
  `}
  ${({ typeColor }) => typeColor === 'total' && css`
    color: ${({ theme }) => theme.colors.shape};
  `}
`
export const Footer = styled.View`
  margin-top: auto;
`

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: 
  ${({ theme, typeColor }) => typeColor === 'total' ? 
    theme.colors.shape : theme.colors.title};
`

export const LastTransaction = styled.Text<TypeProps>`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: 
  ${({ theme, typeColor }) => typeColor === 'total' ? 
    theme.colors.shape : theme.colors.text};
`