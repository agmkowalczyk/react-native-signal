import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types'
import { Avatar } from '@rneui/themed'
import { CustomPressable } from '@/components'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>

const ChatScreen = ({ navigation, route }: Props) => {
  const { chatName } = route.params
  const [message, setMessage] = useState('')
  const name = 'John Doew'

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Avatar
            rounded
            source={{ uri: `https://ui-avatars.com/api/?name=${name}` }}
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
  }, [navigation])

  const sendMessage = () => {}

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.innerContainer}
        keyboardVerticalOffset={90}
      >
        <>
          <ScrollView></ScrollView>
          <View style={styles.footer}>
            <TextInput
              placeholder='Signal Message'
              style={styles.textInput}
              value={message}
              onChangeText={setMessage}
            />
            <CustomPressable onPress={sendMessage}>
              <Ionicons name='send' size={24} color='#2b68e6' />
            </CustomPressable>
          </View>
        </>
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
})
