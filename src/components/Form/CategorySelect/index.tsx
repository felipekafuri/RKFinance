import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { 
  Container, 
  Category, 
  Icon 
} from './styles';

interface Props{
  title: string
}

export function CategorySelect({ title, ...rest }:Props){
  return(
    <Container {...rest}>
      <Category>
        {title}
      </Category>
      <Icon name="chevron-down"/>
    </Container>
  )
}