import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/core'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'

import { HighlightCard } from '../../components/HighlightCard'
import {
  TransactionCard,
  TransactionCardProps
} from '../../components/TransactionCard'
import { useAuth } from '../../hooks/auth'
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
  LogoutButton,
  LoadContainer
} from './styles'

interface HighlightProps {
  amount: string
  lastTransaction: string
}

interface HighlightData {
  incomes: HighlightProps
  outcomes: HighlightProps
  total: HighlightProps
}

export function Dashboard() {
  const { user, signOut } = useAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<TransactionCardProps[]>([])
  const [highlight, setHighlight] = useState<HighlightData>({} as HighlightData)

  const theme = useTheme()
  const dataKey = `@rkfinance:transactions_user:${user.id}`

  function getLastTransactionDate(
    collection: TransactionCardProps[],
    type: 'income' | 'outcome'
  ) {
    const collectionFiltered = collection.filter(
      transaction => transaction.type === type
    )
    if (collectionFiltered.length === 0) {
      return '0'
    }

    const lastTransactions = new Date(
      Math.max(
        ...collectionFiltered.map(transaction =>
          new Date(transaction.date).getTime()
        )
      )
    )

    return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString(
      'pt-BR',
      { month: 'long' }
    )}`
  }

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    let incomesTotal = 0
    let outcomesTotal = 0

    const transactionsFormatted: TransactionCardProps[] = transactions.map(
      (transaction: TransactionCardProps) => {
        if (transaction.type === 'income') {
          incomesTotal += Number(transaction.amount)
        } else {
          outcomesTotal += Number(transaction.amount)
        }

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

    const lastTransactionIncome = getLastTransactionDate(transactions, 'income')
    const lastTransactionOutcome = getLastTransactionDate(
      transactions,
      'outcome'
    )

    const totalInterval =
      lastTransactionOutcome === '0'
        ? 'Não há transações'
        : `01 a ${lastTransactionOutcome}`

    setHighlight({
      incomes: {
        amount: incomesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionIncome
      },
      outcomes: {
        amount: outcomesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionOutcome
      },
      total: {
        amount: (incomesTotal - outcomesTotal).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })
    setIsLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions()
    }, [])
  )

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <UserAvatar
                  source={{
                    uri: user.photo
                  }}
                />

                <Greetings>
                  <GreetingText>Olá,</GreetingText>
                  <UserName>{user.name}</UserName>
                </Greetings>
              </UserInfo>
              <LogoutButton
                onPress={() => {
                  signOut()
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
              amount={highlight.incomes.amount}
              lastTransaction={
                highlight.incomes.lastTransaction === '0'
                  ? 'Não há transações'
                  : `Última entrada dia ${highlight.incomes.lastTransaction}`
              }
            />
            <HighlightCard
              type="outcome"
              title="Saídas"
              amount={highlight.outcomes.amount}
              lastTransaction={
                highlight.outcomes.lastTransaction === '0'
                  ? 'Não há transações'
                  : `Última entrada dia ${highlight.incomes.lastTransaction}`
              }
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlight.total.amount}
              lastTransaction={highlight.total.lastTransaction}
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
        </>
      )}
    </Container>
  )
}
