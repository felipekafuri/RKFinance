import { addMonths, subMonths, format } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { VictoryPie } from 'victory-native'
import { ptBR } from 'date-fns/locale'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'

import { HistoryCard } from '../../components/HistoryCard'
import { categories } from '../../utils/categories'
import {
  ChartContainer,
  Container,
  Content,
  Header,
  Month,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Title,
  LoadContainer
} from './styles'
import { ActivityIndicator } from 'react-native'

interface TransactionData {
  id: string
  type: 'income' | 'outcome'
  amount: string
  name: string
  category: string
  date: string
}

interface CategoryData {
  name: string
  total: number
  totalFormatted: string
  color: string
  percentage: number
  percentageFormatted: string
}

export function Resume() {
  const [totalCategories, setTotalCategories] = useState<CategoryData[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)

  const theme = useTheme()

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      const newDate = addMonths(selectedDate, 1)

      setSelectedDate(newDate)
    } else {
      const newDate = subMonths(selectedDate, 1)

      setSelectedDate(newDate)
    }
  }

  const loadData = useCallback(async () => {
    const dataKey = '@rkfinance:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : []

    const costs = responseFormatted.filter(
      (cost: TransactionData) =>
        cost.type === 'outcome' &&
        new Date(cost.date).getMonth() === selectedDate.getMonth() &&
        new Date(cost.date).getFullYear() === selectedDate.getFullYear()
    )

    const totalCosts = costs.reduce(
      (accumulator: number, cost: TransactionData) => {
        return accumulator + Number(cost.amount)
      },
      0
    )

    const totalByCategory: CategoryData[] = []

    categories.forEach(category => {
      let categorySum = 0

      costs.forEach((cost: TransactionData) => {
        if (cost.category === category.key) {
          categorySum += Number(cost.amount)
        }
      })

      if (categorySum > 0) {
        const percentage = (categorySum / totalCosts) * 100
        const percentageFormatted = `${percentage.toFixed(0)}%`

        totalByCategory.push({
          name: category.name,
          totalFormatted: categorySum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          total: categorySum,
          color: category.color,
          percentage,
          percentageFormatted
        })
      }
    })

    setTotalCategories(totalByCategory)
  }, [selectedDate])

  useFocusEffect(
    useCallback(() => {
      loadData()
      setIsLoading(false)
    }, [loadData])
  )
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: useBottomTabBarHeight()
            }}
          >
            <MonthSelect>
              <MonthSelectButton onPress={() => handleDateChange('prev')}>
                <MonthSelectIcon name="chevron-left" />
              </MonthSelectButton>
              <Month>
                {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
              </Month>
              <MonthSelectButton onPress={() => handleDateChange('next')}>
                <MonthSelectIcon name="chevron-right" />
              </MonthSelectButton>
            </MonthSelect>

            <ChartContainer>
              <VictoryPie
                data={totalCategories}
                x="percentageFormatted"
                y="total"
                colorScale={totalCategories.map(category => category.color)}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: theme.colors.shape
                  }
                }}
                innerRadius={54}
                labelRadius={100}
              />
            </ChartContainer>
            {totalCategories.map(category => (
              <HistoryCard
                key={category.name}
                color={category.color}
                title={category.name}
                amount={category.totalFormatted}
              />
            ))}
          </Content>
        </>
      )}
    </Container>
  )
}
