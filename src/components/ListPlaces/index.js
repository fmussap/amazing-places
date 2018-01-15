import React from 'react'
import { FlatList } from 'react-native'
import ListPlacesItem from './ListPlacesItem'

const ListPlaces = ({ places, onSelect }) => {
  const _keyExtractor = (item, index) => item.item + item.key
  const _renderListPlaces = (place) => {
    return (
      <ListPlacesItem {...place.item} id={place.item.key} onSelect={onSelect} />
    )
  }

  return (
    <FlatList
      data={places}
      ref={(ref) => { this.flatListRef = ref }}
      keyExtractor={_keyExtractor}
      renderItem={_renderListPlaces}
    />
  )
}

export default ListPlaces
