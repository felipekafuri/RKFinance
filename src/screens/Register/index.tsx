import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native'
import uuid from 'react-native-uuid'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'

import { Button } from '../../components/Form/Button'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
import { InputForm } from '../../components/Form/InputForm'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { useAuth } from '../../hooks/auth'
import { CategorySelect } from '../CategorySelect'
import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionsTypes
} from './styles'

interface FormData {
  name: string
  amount: string
}

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório.'),
  amount: yup
    .number()
    .typeError('Informe um valor numérico.')
    .positive('O valor não pode ser negativo.')
    .required('O valor é obrigatório.')
})

export function Register() {
  const { user } = useAuth()

  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  const dataKey = `@rkfinance:transactions_user:${user.id}`

  const { navigate } = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  })

  function handleTransactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  const handleRegister = useCallback(
    async (formData: FormData) => {
      if (!transactionType) return Alert.alert('Selecione o tipo da transação.')

      if (category.key === 'category')
        return Alert.alert('Selecione a categoria.')

      const newTransaction = {
        id: String(uuid.v4()),
        name: formData.name,
        amount: formData.amount,
        type: transactionType,
        category: category.key,
        date: new Date()
      }
      try {
        const data = await AsyncStorage.getItem(dataKey)
        const currentData = data ? JSON.parse(data) : []

        const dataFormatted = [...currentData, newTransaction]

        await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))
        setTransactionType('')
        setCategory({
          key: 'category',
          name: 'Categoria'
        })
        reset()
        navigate('Dashboard')
      } catch (error) {
        console.log(error)
        Alert.alert('Não foi possível salvar')
      }
    },
    [transactionType, category, navigate, reset]
  )

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastrar</Title>
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
              testID="button-modal-category"
            />
          </Fields>
          <Button
            title="Enviar"
            activeOpacity={0.5}
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal
          testID="modal-category"
          visible={categoryModalOpen}
          animationType="slide"
        >
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
