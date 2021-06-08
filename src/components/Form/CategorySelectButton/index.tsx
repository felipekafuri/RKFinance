import React from 'react'
import { Container, Category, Icon } from './styles'

interface Props {
  title: string
  onPress: () => void
}

export function CategorySelectButton({ title, onPress }: Props) {
  return (
    <Container onPress={onPress} activeOpacity={0.5}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  )
}
