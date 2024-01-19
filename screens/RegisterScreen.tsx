import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types'
import { Button, Input, Text } from '@rneui/themed'
import { auth } from '@/services/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>

const RegisterScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login',
    })
  }, [navigation])

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(authUser.user, {
          displayName: name,
          photoURL: imageUrl || `https://ui-avatars.com/api/?name=${name}`,
        })
      })
      .catch((error) => Alert.alert(error.message))
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
            autoCapitalize='none'
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder='Password'
            autoCapitalize='none'
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <Input
            placeholder='Profile Picture URL (optional)'
            autoCapitalize='none'
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
