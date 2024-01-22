import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types'
import { Avatar } from '@rneui/themed'
import { CustomPressable } from '@/components'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  DocumentData,
} from 'firebase/firestore'
import { auth, db } from '@/services/firebase'

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>

const ChatScreen = ({ navigation, route }: Props) => {
  const { id, chatName } = route.params
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState([] as DocumentData[])
  const ref = useRef<ScrollView>(null)

  if (!auth.currentUser)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Please Log in</Text>
      </View>
    )

  const { displayName, email, photoURL } = auth.currentUser
  const name = 'John Doew'

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Avatar
            rounded
            source={{
              uri:
                messages[0]?.data.photoURL ||
                `https://ui-avatars.com/api/?name=${messages[0]?.data.displayName}`,
            }}
          />
          <Text style={styles.headerTitle}>{chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <CustomPressable onPress={navigation.goBack}>
          <AntDesign name='arrowleft' size={24} color='#fff' />
        </CustomPressable>
      ),
      headerRight: () => (
        <View style={styles.iconContainer}>
          <CustomPressable onPress={() => {}}>
            <FontAwesome name='video-camera' size={24} color='#fff' />
          </CustomPressable>
          <CustomPressable onPress={() => {}}>
            <Ionicons name='call' size={24} color='#fff' />
          </CustomPressable>
        </View>
      ),
    })
  }, [navigation, messages])

  const sendMessage = () => {
    Keyboard.dismiss()

    addDoc(collection(db, 'chats', id, 'messages'), {
      timestamp: serverTimestamp(),
      message: inputMessage,
      displayName,
      email,
      photoURL,
    })

    setInputMessage('')
  }

  useLayoutEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'chats', id, 'messages'),
        orderBy('timestamp', 'asc')
      ),
      (snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
    )

    return unsubscribe
  }, [route])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.innerContainer}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView
              contentContainerStyle={{ paddingTop: 15 }}
              ref={ref}
              onContentSizeChange={() =>
                ref.current?.scrollToEnd({ animated: false })
              }
            >
              {messages.map(({ id, data }) =>
                data.email === email ? (
                  <View key={id} style={styles.receiver}>
                    <Avatar
                      rounded
                      size={30}
                      source={{ uri: data.photoURL }}
                      containerStyle={styles.receiverAvatarStyle}
                    />
                    <Text style={styles.receiverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      rounded
                      size={30}
                      source={{ uri: data.photoURL }}
                      containerStyle={styles.senderAvatarStyle}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder='Signal Message'
                style={styles.textInput}
                value={inputMessage}
                onChangeText={setInputMessage}
                onSubmitEditing={sendMessage}
              />
              <CustomPressable onPress={sendMessage}>
                <Ionicons name='send' size={24} color='#2b68e6' />
              </CustomPressable>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: '700',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 70,
    marginLeft: 20,
    marginRight: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: { flex: 1 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: 'transparent',
    backgroundColor: '#ececec',
    borderWidth: 1,
    padding: 10,
    color: 'grey',
    borderRadius: 30,
  },
  receiverText: {
    color: '#000',
    fontWeight: '500',
    marginRight: 2,
  },
  senderText: {
    color: '#fff',
    fontWeight: '500',
    marginLeft: 2,
    marginBottom: 15,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: '#fff',
  },
  receiver: {
    padding: 15,
    backgroundColor: '#ececec',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  sender: {
    padding: 15,
    backgroundColor: '#2b68e6',
    alignSelf: 'flex-start',
    borderRadius: 20,
    margin: 15,
    maxWidth: '80%',
    position: 'relative',
  },
  receiverAvatarStyle: { position: 'absolute', bottom: -15, right: -5 },
  senderAvatarStyle: { position: 'absolute', bottom: -15, left: -5 },
})
