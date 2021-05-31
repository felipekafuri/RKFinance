import React, { useState } from 'react';
import { Button } from '../../components/Form/Button';
import { CategorySelect } from '../../components/Form/CategorySelect';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles'

export function Register() {
  const [transactionType, setTransactionType] = useState('')


  function handleTransactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type)
  }

  return (
    <Container>
      <Header>
        <Title>
          Cadastrar
        </Title>
      </Header>

      <Form>
        <Fields>
          <Input
            placeholder="Nome"
          />
          <Input
            placeholder="Preço"
          />

          <TransactionsTypes>
            <TransactionTypeButton
              type="income"
              title="Entrada"
              onPress={() => handleTransactionTypeSelect('income')}
              isActive={transactionType === 'income'}
            />
            <TransactionTypeButton
              type="outcome"
              title="Saida"
              onPress={() => handleTransactionTypeSelect('outcome')}
              isActive={transactionType === 'outcome'}
            />

          </TransactionsTypes>
          <CategorySelect title="Categoria"/>
        </Fields>


        <Button title="Enviar" activeOpacity={0.5} />
      </Form>

    </Container>
  )
}