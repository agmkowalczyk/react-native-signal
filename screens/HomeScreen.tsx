import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types'
import { CustomListItem, CustomPressable } from '@/components'
import { Avatar } from '@rneui/themed'
import { auth } from '@/services/firebase'
import { signOut } from 'firebase/auth'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen = ({ navigation }: Props) => {
  const signOutUser = () => {
    signOut(auth).then(() => navigation.navigate('Login'))
  }

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

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem id='' chatName='' enterChat='' />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  rightIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
    marginLeft: 20,
  },
})
