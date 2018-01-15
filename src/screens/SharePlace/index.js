import React, { Component } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import AddPlaces from '../../components/AddPlaces'
import DefaultButton from '../../components/UI/DefaultButton'
import DefaultHeader from '../../components/UI/DefaultHeader'
import MainText from '../../components/UI/MainText'
import { addPlace, placeAddedEnd } from '../../store/actions'
import PickImage from '../../components/PickImage'
import PickLocation from '../../components/PickLocation'
import validate from '../../util/validations'

class SharePlace extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isSubmitted: false,
      validations: {
        placename: {
          value: '',
          valid: false,
          rules: {
            notEmpty: 2
          }
        },
        location: {
          value: null,
          valid: false
        },
        image: {
          base64: null,
          uri: null,
          valid: false
        }
      }
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

    this.handleOnPress = () => {
      const name = this.state.validations.placename.value.trim()
      const location = this.state.validations.location.value
      const image = this.state.validations.image
      if (this.state.validations.placename.valid &&
        this.state.validations.location.valid &&
        this.state.validations.image.valid) {
        this.props.addPlace(name, location, image)
        this.setState(prevState => ({
          isSubmitted: false,
          validations: {
            ...prevState.validations,
            placename: {
              ...prevState.validations.placename,
              value: '',
              valid: false
            },
            location: {
              value: null,
              valid: false
            },
            image: {
              base64: null,
              uri: null,
              valid: false
            }
          }
        }))
      } else {
        this.setState(prevState => ({
          isSubmitted: true
        }))
      }
    }

    this.handleChangeText = value => {
      this.setState(prevState => ({
        validations: {
          ...prevState.validations,
          placename: {
            ...prevState.validations.placename,
            value,
            valid: validate(value, prevState.validations.placename.rules)
          }
        }
      }))
    }

    this.handlePickLocation = location => {
      this.setState(prevState => {
        return {
          validations: {
            ...prevState.validations,
            location: {
              value: location,
              valid: true
            }
          }
        }
      })
    }

    this.handlePickImage = (uri, base64) => {
      this.setState(prevState => {
        return {
          validations: {
            ...prevState.validations,
            image: {
              base64,
              uri,
              valid: true
            }
          }
        }
      })
    }
    this.renderShareButton = () => {
      if (this.props.isLoading) {
        return <ActivityIndicator />
      }
      return (
        <DefaultButton onPress={this.handleOnPress} disable={this.props.isLoading}>
          Share place
        </DefaultButton>
      )
    }
  }

  componentDidUpdate () {
    this.props.placeAdded && this.props.navigator.switchToTab({ tabIndex: 0 })
    this.props.placeAddedEnd()
  }

  render () {
    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.container}>
          <DefaultHeader style={styles.header}>
            <MainText>Share a place with us!</MainText>
          </DefaultHeader>
          <PickImage uri={this.state.validations.image.uri} onImagePick={this.handlePickImage} />
          <PickLocation region={this.state.validations.location.value} onLocationPick={this.handlePickLocation} />
          <AddPlaces
            placename={this.state.validations.placename.value}
            handleChangeText={this.handleChangeText}
            validName={this.state.validations.placename.valid}
            validlocation={this.state.validations.location.valid}
            validImage={this.state.validations.image.valid}
            isSubmitted={this.state.isSubmitted}
          />
          {this.renderShareButton()}
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    margin: 10
  },
  placeholder: {
    backgroundColor: '#eee',
    elevation: 4,
    height: 150,
    width: '80%'
  }
})

const mapStateToProps = ({ ui, places }) => {
  return {
    isLoading: ui.isLoading,
    placeAdded: places.placeAdded
  }
}

export default connect(mapStateToProps, {
  addPlace,
  placeAddedEnd
})(SharePlace)
