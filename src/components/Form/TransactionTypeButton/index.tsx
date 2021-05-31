import React from 'react';
import {TouchableOpacityProps} from 'react-native'

import { Container, Icon, Title } from './styles';

interface Props extends TouchableOpacityProps {
  title: string
  type: 'income' | 'outcome'
  isActive: boolean
}

const icons = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle'
}

export function TransactionTypeButton({title, type, isActive,...rest}:Props){
  return(
    <Container 
      isActive={isActive} 
      type={type} 
      {...rest}
    >
      <Icon name={icons[type]} type={type}/>
      <Title>{title}</Title>
    </Container>
  )
}