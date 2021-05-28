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

export interface TransactionCardProps {
  type: 'positive' | 'negative' ,
  amount: string
  title: string
  category: Category
  date: string
}

interface Props {
  data: TransactionCardProps
}


const icon = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
}

export function TransactionCard({ data }: Props) {
  return (
    <Container>
      <Title>
        {data.title}
      </Title>

      <Amount typeColor={data.type}>
        {data.type === 'negative' && '-'} {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={data.category.icon} />
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