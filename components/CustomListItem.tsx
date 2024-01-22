import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, Avatar } from '@rneui/themed'
import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { db } from '@/services/firebase'

type Props = {
  id: string
  chatName: string
  enterChat: (id: string, chatName: string) => void
}

const CustomListItem = ({ id, chatName, enterChat }: Props) => {
  const name = 'John Doew'
  const [chatMessages, setChatMessages] = useState([] as DocumentData[])
  const { photoURL, displayName, message } = chatMessages?.[0] || {}

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'chats', id, 'messages'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => setChatMessages(snapshot.docs.map((doc) => doc.data()))
    )

    return unsubscribe
  }, [])

  return (
    <ListItem bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{ uri: photoURL || `https://ui-avatars.com/api/?name=${name}` }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          {displayName}: {message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})
