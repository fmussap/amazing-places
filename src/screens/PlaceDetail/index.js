import React, { Component } from 'react'
import { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import MapView from 'react-native-maps'

import { deletePlace } from '../../store/actions'

class PlaceDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fadeinDetail: new Animated.Value(0),
      fadeoutDelete: new Animated.Value(2),
      orientation: 'vertical',
      showType: 'in'
    }

    props.navigator.setStyle({
      navBarBackgroundColor: '#43A047',
      navBarTextColor: 'white',
      navBarButtonColor: 'white'
    })

    this.handleDelete = () => {
      this.setState(() => ({ showType: 'out' }))
      Animated.timing(
        this.state.fadeoutDelete,
        {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }
      ).start(() => {
        props.deletePlace(this.props.id)
        props.navigator.pop()
      })
    }

    this.updateOrientation = dimension => {
      const orientation = dimension.window.height > dimension.window.width
        ? 'vertical'
        : 'horizontal'
      this.setState(() => ({ orientation }))
    }

    Dimensions.addEventListener('change', this.updateOrientation)
  }

  componentWillMount () {
    Animated.timing(
      this.state.fadeinDetail,
      {
        toValue: 2,
        duration: 500,
        useNativeDriver: true
      }
    ).start()
  }

  componentWillUnmount () {
    Dimensions.removeEventListener('change', this.updateOrientation)
  }

  render () {
    const delta = {
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
    }
    return (
      <Animated.View style={{
        justifyContent: 'center',
        flex: 1,
        opacity: this.state.showType === 'in'
          ? this.state.fadeinDetail
          : this.state.fadeoutDelete,
        transform: [
          {
            scale: this.state.showType === 'in'
              ? this.state.fadeinDetail.interpolate(
                {
                  inputRange: [0, 1, 2],
                  outputRange: [0, 0.5, 1]
                }
                )
              : this.state.fadeoutDelete.interpolate(
                {
                  inputRange: [0, 1, 2],
                  outputRange: [0, 0.5, 1]
                }
              )
          }
        ]
      }}>
        <ScrollView>
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Text style={styles.placeText}>{this.props.name}</Text>
          </View>
          <View style={[
            styles.placeContent,
            this.state.orientation === 'horizontal' && styles.placeContentAlt
          ]}>
            <Image source={this.props.image} resizeMode='cover' style={[
              styles.placeImage,
              this.state.orientation === 'horizontal' && styles.placeImageAlter
            ]} />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.handleDelete}
              >
                <Icon name='ios-trash' size={30} color='white' />
              </TouchableOpacity>
            </View>
            <MapView
              initialRegion={{...this.props.location, ...delta}}
              style={[
                styles.mapContainer,
                this.state.orientation === 'horizontal' && styles.mapContainerAlter
              ]}
            >
              <MapView.Marker coordinate={{...this.props.location, ...delta}} />
            </MapView>
          </View>
        </ScrollView>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 25,
    elevation: 4,
    height: 50,
    justifyContent: 'center',
    width: 50
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  detailContainer: {
    backgroundColor: 'white'
  },
  icon: {
    alignItems: 'center',
    marginRight: 10
  },
  mapContainer: {
    backgroundColor: '#eee',
    elevation: 4,
    height: 200,
    width: '100%'
  },
  mapContainerAlter: {
    backgroundColor: '#eee',
    elevation: 4,
    height: 200,
    width: '40%'
  },
  placeContent: {
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    width: '100%'
  },
  placeContentAlt: {
    flexDirection: 'row'
  },
  placeImage: {
    height: 200,
    width: '100%',
    marginBottom: 10
  },
  placeImageAlter: {
    height: 200,
    width: '40%',
    marginBottom: 0
  },
  placeText: {
    fontSize: 28,
    fontWeight: '500',
    margin: 10
  },
  textButtonContainer: {
    alignItems: 'center'
  }
})

export default connect(null, {
  deletePlace
})(PlaceDetail)
