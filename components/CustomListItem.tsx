import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem, Avatar } from '@rneui/themed'

type Props = {
  id: string
  chatName: string
  enterChat: (id: string, chatName: string) => void
}

const CustomListItem = ({ id, chatName, enterChat }: Props) => {
  const name = 'John Doew'

  return (
    <ListItem bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{ uri: `https://ui-avatars.com/api/?name=${name}` }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          subtitle
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})
