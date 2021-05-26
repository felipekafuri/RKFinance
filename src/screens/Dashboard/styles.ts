import styled from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.primary};
`

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
`

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`

export const UserAvatar = styled.Image`
  width:  ${RFValue(48)}px;
  height:  ${RFValue(48)}px;
  border-radius: 10px;
`

export const Greetings = styled.View`
  margin-left: 17px;
`
export const GreetingText = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`

export const UserName = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  color: ${({theme}) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
;
`