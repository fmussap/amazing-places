import React from 'react'
import { StyleSheet, Text } from 'react-native'

const DefaultHeader = (props) => (
  <Text
    {...props}
    style={[styles.header, props.style]}
  >
    {props.children}
  </Text>
)

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: '500'
  }
})

export default DefaultHeader
