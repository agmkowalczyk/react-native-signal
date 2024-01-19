import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react-native'
import { LoginScreen } from '@/screens'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '@/types'

// Mock navigation prop
const navigationMock = {
  navigate: jest.fn(),
} as unknown as NativeStackNavigationProp<RootStackParamList, 'Login'>
// Mock route prop
const routeMock = {} as RouteProp<RootStackParamList, 'Login'>

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginScreen navigation={navigationMock} route={routeMock} />
    )

    // Check if components are rendered
    expect(getByText('Login')).toBeTruthy()
    expect(getByPlaceholderText('Email')).toBeTruthy()
    expect(getByPlaceholderText('Password')).toBeTruthy()
  })

  it('updates email and password state on input change', () => {
    const { getByPlaceholderText } = render(
      <LoginScreen navigation={navigationMock} route={routeMock} />
    )

    // Simulate text change in email field
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com')
    // Check if the email state is updated
    expect(getByPlaceholderText('Email').props.value).toBe('test@example.com')

    // Simulate text change in password field
    fireEvent.changeText(getByPlaceholderText('Password'), 'test123')
    // Check if the password state is updated
    expect(getByPlaceholderText('Password').props.value).toBe('test123')
  })

  it('calls signIn function on button press', async () => {
    const signInMock = jest.fn()
    const { getByText } = render(
      <LoginScreen navigation={navigationMock} route={routeMock} />
    )

    // Simulate pressing the login button
    fireEvent.press(getByText('Login'))
    // Check if the signIn function is called
    // expect(getByText('Login')).
  }) 
})
