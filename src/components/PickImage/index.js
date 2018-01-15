import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import ImagePicker from 'react-native-image-picker'

import DefaultButton from '../UI/DefaultButton'

class PickImage extends Component {
  constructor () {
    super()

    this.handlePickImage = () => {
      ImagePicker.showImagePicker({
        title: 'Pick an image',
        maxWidth: 400,
        maxHeight: 300
      }, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker')
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error)
        } else {
          this.props.onImagePick(response.uri, response.data)
        }
      })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={{ uri: this.props.uri }} style={styles.imageContainer} />
        </View>
        <DefaultButton onPress={this.handlePickImage}>
          Pick an image
        </DefaultButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%'
  },
  imageContainer: {
    height: '100%',
    width: '100%'
  },
  placeholder: {
    backgroundColor: '#eee',
    elevation: 4,
    height: 150,
    width: '80%'
  }
})

export default PickImage
