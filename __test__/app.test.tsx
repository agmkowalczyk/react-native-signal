import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react-native'
import App from '../App'

describe('App', () => {
  it('navigates to Register screen on Register button press', () => {
    render(<App />)
    // Simulate pressing the register button

    fireEvent.press(screen.getByText('Register'))
    expect(screen.getByText('Create a Signal account')).toBeTruthy()
    // You can't directly test navigation in unit tests,
    // but you can mock the navigation prop and check if the expected function is called
    // For more advanced navigation testing, consider using integration or end-to-end tests
    // e.g., with tools like Detox.
  })
})
