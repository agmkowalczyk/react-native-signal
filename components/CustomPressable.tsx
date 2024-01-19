import { Pressable, StyleSheet } from 'react-native'
import React from 'react'

const CustomPressable = ({
  style,
  children,
  onPress,
}: {
  style?: any
  children: any
  onPress: () => void
}) => {
  return (
    <Pressable
      style={({ pressed }) => [style, pressed && styles.pressed]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  )
}

export default CustomPressable

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
})
