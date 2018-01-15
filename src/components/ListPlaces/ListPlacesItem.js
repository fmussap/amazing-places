import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

const ListPlacesItem = ({ name, id, image, location, onSelect }) => {
  const handleSelect = () => {
    onSelect(image, id, location, name)
  }

  return (
    <TouchableOpacity onPress={handleSelect}>
      <View style={styles.container}>
        <Image resizeMode='contain' style={styles.placeImage} source={image} />
        <Text>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#eee',
    width: '100%',
    flexDirection: 'row',
    height: 40,
    marginBottom: 5,
    padding: 5
  },
  placeImage: {
    marginRight: 5,
    height: 30,
    width: 30
  }
})

export default ListPlacesItem
