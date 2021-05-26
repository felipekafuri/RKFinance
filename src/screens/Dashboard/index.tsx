import React from 'react'
import {
  Container,
  Greetings,
  GreetingText,
  Header,
  UserAvatar,
  UserWrapper,
  UserInfo,
  UserName
} from './styles'

export function Dashboard() {
  return (
    <Container>

      <Header>
        <UserWrapper>
          <UserInfo>
            <UserAvatar source={{ uri: 'https://xesque.rocketseat.dev/users/avatar/profile-3919b117-7689-4d8f-aeaa-1a82581c5fd2.jpg' }} />

            <Greetings>
              <GreetingText>Olá,</GreetingText>
              <UserName>Felipe</UserName>
            </Greetings>
          </UserInfo>
        </UserWrapper>

      </Header>
    </Container>
  )
}
