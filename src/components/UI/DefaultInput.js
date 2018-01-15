import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const DefaultInput = (props) => {
  return (
    <View style={styles.container}>
      {props.message && <Text style={{ color: 'red' }}>{props.message}</Text>}
      <TextInput
        {...props}
        style={[styles.input, props.style, !props.valid && props.isSubmitted && styles.invalid]}
        underlineColorAndroid='transparent'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%'
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#ddd',
    borderWidth: 1,
    margin: 8,
    opacity: 0.8,
    padding: 5,
    width: '100%'
  },
  invalid: {
    backgroundColor: '#f9c0c0',
    borderColor: 'red',
    borderWidth: 1
  }
})

export default DefaultInput
