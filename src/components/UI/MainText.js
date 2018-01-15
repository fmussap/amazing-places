import React from 'react'
import { StyleSheet, Text } from 'react-native'

const MainText = (props) => (
  <Text
    {...props}
    style={[styles.text, props.style]}
  >
    {props.children}
  </Text>
)

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'transparent',
    color: 'black'
  }
})

export default MainText
