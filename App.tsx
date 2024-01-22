import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AddChat, ChatScreen, HomeScreen, LoginScreen, RegisterScreen } from './screens'
import { RootStackParamList } from '@/types'

const Stack = createNativeStackNavigator<RootStackParamList>()

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2c6bed' },
  headerTitleStyle: { color: '#fff' },
  headerTintColor: '#fff',
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={globalScreenOptions}
        initialRouteName='Home'
      >
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='AddChat' component={AddChat} />
        <Stack.Screen name='Chat' component={ChatScreen} />
      </Stack.Navigator>

      <StatusBar style='light' />
    </NavigationContainer>
  )
}
