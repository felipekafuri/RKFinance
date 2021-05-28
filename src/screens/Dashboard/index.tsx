import React from 'react'

import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'
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

export interface DataListProps extends TransactionCardProps {
  id: string
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: "positive",
      amount: "R$ 16.400,00",
      title: "Desenvolvimento de sites",
      category: { name: 'Vendas', icon: "dollar-sign" },
      date: "30/06/2021"
    },
    {
      id: '2',
      type: "negative",
      amount: "R$ 8.000,00",
      title: "Compra de moto elétrica",
      category: { name: 'Vendas', icon: "dollar-sign" },
      date: "30/06/2021"
    },
    {
      id: '3',
      type: "negative",
      amount: "R$ 90,00",
      title: "Pizza",
      category: { name: 'Vendas', icon: "coffee" },
      date: "30/06/2021"
    }
  ]

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
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  )
}
