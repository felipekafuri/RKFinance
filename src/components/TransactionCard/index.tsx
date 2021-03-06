import React from 'react'
import { categories } from '../../utils/categories'

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

export interface TransactionCardProps {
  id: string
  type: 'income' | 'outcome'
  amount: string
  name: string
  category: string
  date: string
}

interface Props {
  data: TransactionCardProps
}

export function TransactionCard({ data }: Props) {
  const category = categories.filter(item => item.key === data.category)[0]

  return (
    <Container key={data.id}>
      <Title>{data.name}</Title>

      <Amount typeColor={data.type}>
        {data.type === 'outcome' && '-'} {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}
