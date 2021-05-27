import React from 'react'

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date
} from './style'

interface Category {
  name: string
  icon: string
}

interface Data {
  type: 'income' | 'outcome' | 'total',
  amount: string
  title: string
  category: Category
  date: string
}

interface TransactionCardProps {
  data: Data
}


const icon = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
}

export function TransactionCard({ data }: TransactionCardProps) {
  return (
    <Container>
      <Title>
        {data.title}
      </Title>

      <Amount typeColor={data.type}>
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name="dollar-sign" />
          <CategoryName>
            {data.category.name}
          </CategoryName>
        </Category>

        <Date>
          {data.date}
        </Date>
      </Footer>
    </Container>
  )
}