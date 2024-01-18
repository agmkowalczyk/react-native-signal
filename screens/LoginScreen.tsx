import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import React, { useState } from 'react'
import { Button, Image, Input } from '@rneui/themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types'
import { signalLogo } from '@/assets'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = () => {}

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Image source={signalLogo} style={{ width: 100, height: 100 }} />
        <View style={styles.inputContainer}>
          <Input
            placeholder='Email'
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder='Password'
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Button title='Login' onPress={signIn} containerStyle={styles.button} />
        <Button
          title='Register'
          type='outline'
          onPress={() => navigation.navigate('Register')}
          containerStyle={styles.button}
        />
        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default LoginScreen

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
    marginTop: 20,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
})
