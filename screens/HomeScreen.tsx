import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types'
import { CustomListItem, CustomPressable } from '@/components'
import { Avatar } from '@rneui/themed'
import { auth, db } from '@/services/firebase'
import { signOut } from 'firebase/auth'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { DocumentData, collection, onSnapshot } from 'firebase/firestore'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

type ChatProps = {
  id: string
  data: { chatName: string }
}

const HomeScreen = ({ navigation }: Props) => {
  const [chats, setChats] = useState([] as ChatProps[])

  const signOutUser = () => {
    signOut(auth).then(() => navigation.navigate('Login'))
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'chats'), (snapshot) =>
      setChats(
        snapshot.docs.map((doc: DocumentData) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    )

    return unsubscribe
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { color: '#000' },
      headerTintColor: '#000',
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <CustomPressable onPress={signOutUser}>
            <Avatar
              rounded
              source={{ uri: auth?.currentUser?.photoURL as string }}
              avatarStyle={{ borderWidth: 1, borderColor: 'lightgray' }}
            />
          </CustomPressable>
        </View>
      ),
      headerRight: () => (
        <View style={styles.rightIconsContainer}>
          <CustomPressable onPress={() => {}}>
            <AntDesign name='camerao' size={24} color='#000' />
          </CustomPressable>
          <CustomPressable onPress={() => navigation.navigate('AddChat')}>
            <AntDesign name='edit' size={24} color='#000' />
          </CustomPressable>
        </View>
      ),
    })
  }, [navigation])

  const enterChat = (id: string, chatName: string) => {
    navigation.navigate('Chat', {
      id,
      chatName,
    })
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  rightIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
    marginLeft: 20,
  },
})
