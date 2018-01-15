import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const DefaultButton = (props) => (
  <TouchableOpacity onPress={props.onPress} activeOpacity={0.75}>
    <View style={[styles.button, props.style, { backgroundColor: props.color }]}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  </TouchableOpacity>
)

DefaultButton.defaultProps = {
  color: '#0288D1'
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 5,
    elevation: 4,
    justifyContent: 'center',
    margin: 10,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default DefaultButton
