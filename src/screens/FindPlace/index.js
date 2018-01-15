import React, { Component } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

import ListPlaces from '../../components/ListPlaces'
import { getPlaces } from '../../store/actions'

class FindPlace extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fadeoutButton: new Animated.Value(1),
      searchLoad: false,
      fadeinList: new Animated.Value(0)
    }
    this.onNavigatorEvent = (event) => {
      if (event.type === 'NavBarButtonPress') {
        if (event.id === 'sideDrawerToggle') {
          this.props.navigator.toggleDrawer({
            animated: true,
            side: 'left'
          })
        }
      }
    }

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    this.handleSelect = (image, id, location, name) => {
      this.props.navigator.push({
        screen: 'amazing-places.PlaceDetailScreen',
        title: name,
        passProps: {
          image,
          id,
          location,
          name
        }
      })
    }

    this.handlePlacesList = () => {
      Animated.timing(
        this.state.fadeinList,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }
      ).start()
    }

    this.handleSearch = () => {
      Animated.timing(
        this.state.fadeoutButton,
        {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true
        }
      ).start(() => {
        this.setState(() => ({ searchLoad: true }))
        this.handlePlacesList()
      })
    }
  }

  componentDidMount () {
    this.props.getPlaces()
  }

  renderPlacesANimation () {
    if (!this.state.searchLoad) {
      return (
        <View style={styles.aninContainer}>
          <Animated.View style={{
            opacity: this.state.fadeoutButton,
            transform: [
              {
                scale: this.state.fadeoutButton.interpolate(
                  {
                    inputRange: [0, 1],
                    outputRange: [3, 1]
                  }
                )
              },
              {
                rotate: this.state.fadeoutButton.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '-720deg']
                })
              }
            ]
          }}>
            <TouchableOpacity style={styles.buttonAnin} onPress={this.handleSearch}>
              <Text style={styles.buttonAninText}>Find Places</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )
    }

    return (
      <Animated.View style={{
        opacity: this.state.fadeinList,
        transform: [
          {
            scale: this.state.fadeinList.interpolate(
              {
                inputRange: [0, 0.5, 1],
                outputRange: [0, 0.5, 1]
              }
            )
          }
        ]
      }}>
        <ListPlaces places={this.props.places} onSelect={this.handleSelect} />
      </Animated.View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderPlacesANimation()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  aninContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  buttonAnin: {
    alignItems: 'center',
    borderColor: '#43A047',
    borderRadius: 40,
    borderWidth: 5,
    justifyContent: 'center',
    padding: 20
  },
  buttonAninText: {
    color: '#43A047',
    fontSize: 28,
    fontWeight: '900'
  },
  container: {
    flex: 1
  }
})

const mapStateToProps = ({ places }) => ({
  places: places.places
})

export default connect(mapStateToProps, {
  getPlaces
})(FindPlace)
