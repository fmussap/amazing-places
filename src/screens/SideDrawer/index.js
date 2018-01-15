import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'

import logo from '../../assets/logoAFMussap.png'
import DefaultDrawerItem from '../../components/UI/DefaultDrawerItem'
import { connect } from 'react-redux'

import { authLogout } from '../../store/actions'

class SideDrawer extends Component {
  constructor () {
    super()
    this.state = {
      orientation: 'vertical'
    }

    this.updateOrientation = dimension => {
      const orientation = dimension.window.height > dimension.window.width
        ? 'vertical'
        : 'horizontal'
      this.setState(() => ({ orientation }))
    }

    Dimensions.addEventListener('change', this.updateOrientation)
  }

  render () {
    return (
      <View style={[styles.container, {
        width: this.state.orientation === 'vertical'
        ? Dimensions.get('window').width * 0.8
        : Dimensions.get('window').width * 0.5
      }]}>
        <View style={styles.logoContainer}>
          {this.state.orientation === 'vertical' && <Image source={logo} style={styles.logo} />}
          <Text style={styles.companyTitle}>AFMussap Tech </Text>
          <Text style={styles.appTitle}>Amazing Places</Text>
        </View>
        <View style={styles.touchContainer}>
          <View>
            <DefaultDrawerItem subject='Please rate this App' iconName='apps' />
            <DefaultDrawerItem subject='Ours Apps' iconName='thumb-up-outline' />
          </View>
          <DefaultDrawerItem subject='Sign out' iconName='logout' onPress={this.props.authLogout} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  appTitle: {
    color: 'white',
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold'
  },
  companyTitle: {
    color: 'white',
    flex: 1,
    fontSize: 14,
    fontStyle: 'italic'
  },
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  logo: {
    flex: 3,
    resizeMode: 'contain'
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E7D32',
    flex: 1,
    padding: 5
  },
  touchContainer: {
    backgroundColor: '#43A047',
    flex: 3,
    justifyContent: 'space-between'
  }
})

export default connect(null, {
  authLogout
})(SideDrawer)
