import { Alert, StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types'
import { Button, Input } from '@rneui/themed'
import { AntDesign } from '@expo/vector-icons'
import { db } from '@/services/firebase'
import { addDoc, collection } from 'firebase/firestore'

type Props = NativeStackScreenProps<RootStackParamList, 'AddChat'>

const AddChat = ({ navigation }: Props) => {
  const [chatName, setChatName] = useState('')

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new Chat',
      headerBackTitle: 'Chats',
    })
  }, [])

  const createChat = async () => {
    await addDoc(collection(db, 'chats'), {
      chatName,
    })
      .then(() => navigation.goBack())
      .catch((error) => Alert.alert(error))
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder='Enter a chat name'
        value={chatName}
        onChangeText={setChatName}
        onSubmitEditing={createChat}
        leftIcon={<AntDesign name='wechat' size={28} color='#000' />}
      />
      <Button onPress={createChat} title='Create new Chat' disabled={!chatName} />
    </View>
  )
}

export default AddChat

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'fff',
    padding: 30,
    height: '100%',
  },
})
