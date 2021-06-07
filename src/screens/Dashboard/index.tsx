import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/core'
import React, { useCallback, useEffect, useState } from 'react'

import { HighlightCard } from '../../components/HighlightCard'
import {
  TransactionCard,
  TransactionCardProps
} from '../../components/TransactionCard'
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
  UserWrapper,
  LogoutButton
} from './styles'

const dataKey = '@rkfinance:transactions'

export function Dashboard() {
  const [transactions, setTransactions] = useState<TransactionCardProps[]>([])

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    const transactionsFormatted: TransactionCardProps[] = transactions.map(
      (transaction: TransactionCardProps) => {
        const amount = Number(transaction.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(transaction.date))

        return {
          id: transaction.id,
          name: transaction.name,
          type: transaction.type,
          category: transaction.category,
          amount,
          date
        }
      }
    )

    setTransactions(transactionsFormatted)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadTransactions()
    }, [])
  )

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <UserAvatar
              source={{
                uri:
                  'https://xesque.rocketseat.dev/users/avatar/profile-3919b117-7689-4d8f-aeaa-1a82581c5fd2.jpg'
              }}
            />

            <Greetings>
              <GreetingText>Olá,</GreetingText>
              <UserName>Felipe</UserName>
            </Greetings>
          </UserInfo>
          <LogoutButton
            onPress={() => {
              console.log('saiu')
            }}
          >
            <Icon name="power" />
          </LogoutButton>
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
        <Title>Listagem</Title>

        <TransactionList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  )
}
