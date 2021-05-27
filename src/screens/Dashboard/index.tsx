import React from 'react'
import { getBottomSpace } from 'react-native-iphone-x-helper'

import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard } from '../../components/TransactionCard'
import {
  Container,
  Greetings,
  GreetingText,
  Header,
  HighlightCards,
  Icon,
  Title,
  TransactionList,
  Transactions,
  UserAvatar,
  UserInfo,
  UserName,
  UserWrapper
} from './styles'

interface Data {
  type: 'income' | 'outcome' | 'total',
  amount: string
  title: string
  category: { name: string, icon: string },
  date: string
}

export function Dashboard() {
  const data = [{
    type: "income",
    amount: "R$ 16.400,00",
    title: "Desenvolvimento de sites",
    category: { name: 'Vendas', icon: "dollar-sign" },
    date: "30/06/2021"
  },
  {
    type: "income",
    amount: "R$ 16.400,00",
    title: "Desenvolvimento de sites",
    category: { name: 'Vendas', icon: "dollar-sign" },
    date: "30/06/2021"
  },
  {
    type: "income",
    amount: "R$ 16.400,00",
    title: "Desenvolvimento de sites",
    category: { name: 'Vendas', icon: "dollar-sign" },
    date: "30/06/2021"
  }
] as Data[]

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
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="income"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada em 13 de abril"
        />
        <HighlightCard
          type="outcome"
          title="Saídas"
          amount="R$ 1.400,00"
          lastTransaction="Última saida em 13 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.400,00"
          lastTransaction="Total em 13 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>
          Listagem
        </Title>

        <TransactionList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) =>
            <TransactionCard
              data={item}
            />
          }
          contentContainerStyle={{
            paddingBottom: getBottomSpace()
          }}
        />


      </Transactions>
    </Container>
  )
}
