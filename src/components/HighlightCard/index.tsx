import React from 'react'
import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction
} from './style'

interface HighlightCardProps {
  type: 'income' | 'outcome' | 'total'
  title: string
  amount: string
  lastTransaction: string
}

const icon = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
  total: 'dollar-sign'
}

export function HighlightCard({
  type,
  title,
  amount,
  lastTransaction
}: HighlightCardProps) {
  return (
    <Container typeColor={type}>
      <Header>
        <Title typeColor={type}>{title}</Title>
        <Icon name={icon[type]} typeColor={type} />
      </Header>

      <Footer>
        <Amount typeColor={type}>{amount}</Amount>
        <LastTransaction typeColor={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  )
}
