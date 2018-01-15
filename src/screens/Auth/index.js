import React, { Component } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  View
} from 'react-native'
import { connect } from 'react-redux'

import DefaultInput from '../../components/UI/DefaultInput'
import DefaultHeader from '../../components/UI/DefaultHeader'
import MainText from '../../components/UI/MainText'
import bgImage from '../../assets/bg.jpg'
import DefaultButton from '../../components/UI/DefaultButton'
import validate from '../../util/validations'
import { authAutoSignIn, authUser } from '../../store/actions'

class AuthScreen extends Component {
  constructor () {
    super()
    this.state = {
      isSignin: false,
      orientation: 'vertical',
      isSubmitted: false,
      validations: {
        email: {
          value: '',
          valid: false,
          rules: {
            isEmail: true
          }
        },
        password: {
          value: '',
          valid: false,
          rules: {
            minLength: 6
          }
        },
        confirmPassword: {
          value: '',
          valid: false,
          rules: {
            equalTo: ''
          }
        }
      }
    }

    this.handleLogin = () => {
      this.setState(() => ({ isSubmitted: true }))
      const userData = {
        email: this.state.validations.email.value,
        password: this.state.validations.password.value
      }

      if (this.state.isSignin && this.state.validations.email.valid &&
      this.state.validations.password.valid &&
      this.state.validations.confirmPassword.valid) {
        this.props.authUser(userData, 'signup')
      } else if (!this.state.isSignin && this.state.validations.email.valid &&
      this.state.validations.password.valid) {
        this.props.authUser(userData, 'signin')
      }
    }

    this.updateOrientation = dimension => {
      const orientation = dimension.window.height > dimension.window.width
        ? 'vertical'
        : 'horizontal'
      this.setState(() => ({ orientation }))
    }

    this.loginSignin = () => {
      this.setState(prevState => ({
        isSignin: !prevState.isSignin,
        isSubmitted: false,
        validations: {
          ...prevState.validations,
          email: {
            ...prevState.validations.email,
            value: ''
          },
          password: {
            ...prevState.validations.password,
            value: ''
          },
          confirmPassword: {
            ...prevState.validations.confirmPassword,
            value: ''
          }
        }
      }))
    }

    this.handleInput = (key, value, checkValue) => {
      this.setState(prevState => ({
        validations: {
          ...prevState.validations,
          [key]: {
            ...prevState.validations[key],
            value,
            valid: validate(value, prevState.validations[key].rules)
          }
        }
      }))

      if (key === 'password') {
        this.setState(prevState => ({
          validations: {
            ...prevState.validations,
            confirmPassword: {
              ...prevState.validations.confirmPassword,
              rules: {
                ...prevState.validations.confirmPassword.rules,
                equalTo: value
              }
            }
          }
        }))
        this.setState(prevState => ({
          validations: {
            ...prevState.validations,
            confirmPassword: {
              ...prevState.validations.confirmPassword,
              valid: validate(prevState.validations.confirmPassword.value, prevState.validations.confirmPassword.rules)
            }
          }
        }))
      }
    }
    Dimensions.addEventListener('change', this.updateOrientation)
  }

  renderHeader () {
    if (this.state.orientation === 'vertical') {
      return (
        <MainText>
          <DefaultHeader>
            {this.state.isSignin ? 'Please Sign in' : 'Please Login'}
          </DefaultHeader>
        </MainText>
      )
    }
    return null
  }
  renderSignButton () {
    if (this.props.isLoading) {
      return <ActivityIndicator />
    }
    return (
      <DefaultButton onPress={this.handleLogin} disable={this.props.isLoading}>
        Submit
      </DefaultButton>
    )
  }

  componentDidMount () {
    this.props.authAutoSignIn()
  }

  componentWillUnmount () {
    Dimensions.removeEventListener('change', this.updateOrientation)
  }

  render () {
    return (
      <View style={styles.container} >
        <Image style={styles.image}source={bgImage} />
        {this.renderHeader()}
        <DefaultButton
          onPress={this.loginSignin}
        >
          {this.state.isSignin ? 'Switch to Login' : 'Switch to Sign in'}
        </DefaultButton>
        <KeyboardAvoidingView style={styles.inputContainer} behavior='padding'>
          <DefaultInput
            placeholder='Your email address'
            value={this.state.validations.email.value}
            onChangeText={(val) => this.handleInput('email', val)}
            valid={this.state.validations.email.valid}
            isSubmitted={this.state.isSubmitted}
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
          />
          <View style={[styles.pswContainer,
            this.state.orientation === 'horizontal' && this.state.isSignin && styles.pswContainerAlt]}>
            <DefaultInput
              placeholder='Password'
              value={this.state.validations.password.value}
              style={this.state.orientation === 'horizontal' && this.state.isSignin && styles.DefaultInputAlt}
              onChangeText={(val) => this.handleInput('password', val)}
              valid={this.state.validations.password.valid}
              isSubmitted={this.state.isSubmitted}
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry
            />
            {this.state.isSignin && <DefaultInput
              placeholder='Confirm Password'
              value={this.state.validations.confirmPassword.value}
              style={this.state.orientation === 'horizontal' && styles.DefaultInputAlt}
              onChangeText={(val) => this.handleInput('confirmPassword', val)}
              valid={this.state.validations.confirmPassword.valid}
              isSubmitted={this.state.isSubmitted}
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry
            />}
          </View>
        </KeyboardAvoidingView>
        {this.renderSignButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  DefaultInputAlt: {
    margin: 0,
    width: '48%'
  },
  image: {
    flex: 1,
    opacity: 0.6,
    position: 'absolute',
    resizeMode: 'cover',
    width: '100%'
  },
  inputContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pswContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%'
  },
  pswContainerAlt: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

const mapStateToProps = ({ ui }) => {
  return {
    isLoading: ui.isLoading
  }
}

export default connect(mapStateToProps, {
  authAutoSignIn,
  authUser
})(AuthScreen)
