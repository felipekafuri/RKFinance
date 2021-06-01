import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '../../components/Form/Button'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
import { InputForm } from '../../components/Form/InputForm'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { CategorySelect } from '../CategorySelect'
import { Container, Fields, Form, Header, Title, TransactionsTypes } from './styles'

interface FormData {
  name: string;
  amount: string
}

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório.'),
  amount: yup
  .number()
  .typeError('Informe um valor numérico.')
  .positive('O valor não pode ser negativo.')
  .required('O valor é obrigatório.'),

})

export function Register() {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })


  function handleTransactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  const handleRegister = useCallback(async (formData: FormData) => {
    if (!transactionType) return Alert.alert('Selecione o tipo da transação.')

    if (category.key === 'category') return Alert.alert('Selecione a categoria.')


    const data = {
      name: formData.name,
      amount: formData.amount,
      transactionType,
      category: category.key
    }

    console.log(data)

  }, [transactionType, category])


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>
            Cadastrar
        </Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              placeholder="Nome"
              name="name"
              control={control}
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              keyboardType="numeric"
              placeholder="Preço"
              name="amount"
              control={control}
              error={errors.amount && errors.amount.message}
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
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>
          <Button title="Enviar" activeOpacity={0.5} onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen} animationType="slide">
          <CategorySelect
            category={category}
            closeSelectCategory={handleCloseSelectCategoryModal}
            setCategory={setCategory}
          />
        </Modal>

      </Container>
    </TouchableWithoutFeedback>
  )
}