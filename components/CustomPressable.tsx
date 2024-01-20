import { Pressable, StyleSheet, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native'
import React from 'react'

const CustomPressable = ({
  style,
  children,
  onPress,
}: {
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
  onPress: (event: GestureResponderEvent) => void
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
