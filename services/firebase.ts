import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: 'AIzaSyA4ed9dOKlGb-Gc4CKt2OWNb_sNxOnzrxs',
  authDomain: 'react-native-signal1.firebaseapp.com',
  projectId: 'react-native-signal1',
  storageBucket: 'react-native-signal1.appspot.com',
  messagingSenderId: '125681146237',
  appId: '1:125681146237:web:c17593ccc00b910e0c9414',
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})

export { db, auth }
