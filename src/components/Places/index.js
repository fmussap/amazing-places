import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import AddPlaces from '../AddPlaces'
import ListPlaces from '../ListPlaces'
import { addPlace, closeModal, deletePlace, selectPlace } from '../../store/actions'
import placeImage from '../../assets/beach.jpg'

class Places extends Component {
  state = {
    places: [],
    placeSelected: undefined,
    placeIndex: undefined,
    isOpen: false
  }

  handleOnPress = (name) => {
    if (name) {
      this.props.addPlace(name)
    }
    return
  }

  onSelect = (i) => {
    this.props.selectPlace(i)
  }

  onDeleteItem = (i) => {
    this.props.deletePlace(i)
  }

  render () {
    return (
      <View>
        <AddPlaces handleOnPress={this.handleOnPress} />
        <ListPlaces places={this.props.places} onSelect={this.onSelect} />
      </View>
    )
  }
}

const mapStateToProps = ({ places }) => ({
  places: places.places,
  placeSelected: places.placeSelected,
  isOpen: places.isOpen
})


export default connect(mapStateToProps, {
  addPlace,
  closeModal,  
  deletePlace,
  selectPlace
})(Places)
