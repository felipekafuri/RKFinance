import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { RectButtonProps } from 'react-native-gesture-handler'

import { Container, Icon, Title, Button } from './styles'

interface Props extends RectButtonProps {
  title: string
  type: 'income' | 'outcome'
  isActive: boolean
}

const icons = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle'
}

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: Props) {
  return (
    <Container isActive={isActive} type={type}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  )
}
