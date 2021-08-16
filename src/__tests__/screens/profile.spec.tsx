import React from 'react'
import { render } from '@testing-library/react-native'

import { Profile } from '../../screens/Profile'

describe('Profile', () => {
  it('Should be able to verify if input with placeholder "Nome" exists on the screen', () => {
    const { getByPlaceholderText } = render(<Profile />)
    const inputName = getByPlaceholderText('Nome')

    expect(inputName.props.placeholder).toBe('Nome')
  })

  it('Should be able to check if user data has been loaded', () => {
    const { getByTestId } = render(<Profile />)
    const inputName = getByTestId('input-name')
    const inputSurname = getByTestId('input-surname')

    expect(inputName.props.value).toBe('Felipe')
    expect(inputSurname.props.value).toBe('Kafuri')
  })

  it('Should be able to check if title is render correctly', () => {
    const { getByTestId } = render(<Profile />)

    const textTitle = getByTestId('text-title')

    expect(textTitle.props.children).toBe('Perfil')
  })
})
