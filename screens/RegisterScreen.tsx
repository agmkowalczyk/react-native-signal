import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types'
import { Button, Input, Text } from '@rneui/themed'

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>

const RegisterScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const register = () => {

  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Text h3 style={{ marginBottom: 50 }}>
          Create a Signal account
        </Text>

        <View style={styles.inputContainer}>
          <Input
            placeholder='Full Name'
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Input
            placeholder='Email'
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder='Password'
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <Input
            placeholder='Profile Picture URL (optional)'
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
            onSubmitEditing={register}
          />
        </View>

        <Button
          title='Register'
          raised
          onPress={register}
          containerStyle={styles.button}
        />
        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
})
