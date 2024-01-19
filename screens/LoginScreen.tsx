import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Image, Input } from '@rneui/themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types'
import { signalLogo } from '../assets'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/services/firebase'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        navigation.replace('Home')
      }
    })

    return unsubcribe
  }, [])

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      Alert.alert(error.message)
    )
  }

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
            autoCapitalize='none'
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder='Password'
            autoCapitalize='none'
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            onSubmitEditing={signIn}
          />
        </View>
        <Button
          title='Login'
          id='email'
          onPress={signIn}
          containerStyle={styles.button}
        />
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
