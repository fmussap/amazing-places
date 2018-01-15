import React, { Component } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps'

import DefaultButton from '../UI/DefaultButton'

class PickLocation extends Component {
  state = {
    region: {
      latitude: 37.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
    },
    showMarker: false
  }

  handlePickLocation = event => {
    const { latitude, longitude } = event.nativeEvent.coordinate
    this.map.animateToRegion({
        ...this.state.region,
        latitude,
        longitude
    })
    this.setState(prevState => ({
      region: {
        ...prevState.region,
        latitude,
        longitude
      },
      showMarker: true
    }))
    this.props.onLocationPick({
      latitude,
      longitude,
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
    })

  }

  handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      }
      this.handlePickLocation(coordsEvent)
    }, err => {
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <MapView
          // initialRegion={this.state.region}
          region={this.props.region ? this.props.region : {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 200,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
          }}
          style={styles.mapContainer}
          onPress={this.handlePickLocation}
          ref={ref => this.map = ref}
        >
          {this.state.showMarker && this.props.region && <MapView.Marker coordinate={this.props.region} />}
        </MapView>
        <DefaultButton onPress={this.handleGetLocation}>
          My local
        </DefaultButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%'
  },
  mapContainer: {
    backgroundColor: '#eee',
    elevation: 4,
    height: 250,
    width: '100%'
  }
})

export default PickLocation
