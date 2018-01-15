import { AsyncStorage } from 'react-native'
import * as actions from '../types'
import { FIREBASE_API_KEY } from '../../config/keys'
import { uiStartLoading, uiStopLoading } from './index'
import startMainTabs from '../../screens/MainTabs/startMainTabs'
import App from '../../../App'

export const authUser = (userData, type) => {
  return dispatch => {
    if (type === 'signup') {
      const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${FIREBASE_API_KEY}`
      dispatch(signUser(userData, url))
    } else if (type === 'signin') {
      const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${FIREBASE_API_KEY}`
      dispatch(signUser(userData, url))
    }
  }
}

const signUser = (userData, url) => {
  const {email, password} = userData
  return dispatch => {
    dispatch(uiStartLoading())
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .catch(err => {
      dispatch(uiStopLoading())
      console.log('signup error', err)
      alert('Something went wrong, sorry :/')
    })
    .then(res => res.json())
    .then(parseRes => {
      // console.log('parseRes', parseRes)
      dispatch(uiStopLoading())
      if (parseRes.error || !parseRes.idToken) {
        let message = 'Authentication failed :( Please try again'
        if (parseRes.error.message === 'INVALID_PASSWORD' || parseRes.error.message === 'EMAIL_NOT_FOUND') {
          message = 'Sorry. Invalid Email/Password.'
        } else if (parseRes.error.message === 'EMAIL_EXISTS') {
          message = 'The email address is already in use by another account.'
        }
        alert(message)
      } else {
        const token = parseRes.idToken
        const expiresIn = parseRes.expiresIn
        const refreshToken = parseRes.refreshToken
        dispatch(authStoreToken(token, expiresIn, refreshToken))
        startMainTabs()
      }
    })
  }
}

export const authStoreToken = (token, expiresIn, refreshToken) => {
  return async dispatch => {
    const now = new Date()
    const expiryDate = now.getTime() + expiresIn * 1000
    AsyncStorage.setItem('ap:auth:token', token)
    AsyncStorage.setItem('ap:auth:expiryDate', expiryDate.toString())
    AsyncStorage.setItem('ap:auth:refreshToken', refreshToken)
    dispatch(authSetToken(token, expiryDate))
  }
}

const authSetToken = (token, expiryDate) => ({
  type: actions.AUTH_SET_TOKEN,
  token,
  expiryDate
})

export const authGetToken = () => {
  return async (dispatch, getState) => {
    let token = await getState().auth.token
    const expiryDate = await getState().auth.expiryDate
    const parsedExpiryDate = new Date(expiryDate)
    const now = new Date()
    if (!token || parsedExpiryDate <= now) {
      token = await AsyncStorage.getItem('ap:auth:token')
      const expiryDate = await AsyncStorage.getItem('ap:auth:expiryDate')

      if (expiryDate) {
        const parsedExpiryDate = new Date(parseInt(expiryDate))
        const refreshToken = await AsyncStorage.getItem('ap:auth:refreshToken')

        if (token && parsedExpiryDate > now) {
          return dispatch(authSetToken(token, expiryDate))
        } else if (refreshToken) {
          return fetch(`https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`, {
            method: 'POST',
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(res => {
            if (res.ok) {
              return res.json()
            } else {
              throw (new Error())
            }
          })
          .then(parseRes => {
            if (parseRes.id_token) {
              dispatch(authStoreToken(parseRes.id_token, parseRes.expires_in,
                parseRes.refresh_token))
              return parseRes.id_token
            } else {
              return null
            }
          })
          .catch(err => {
            console.log('error refresh_token', err)
          })
        } else {
          return null
        }
      }
    }
    return token
  }
}

export const authAutoSignIn = () => {
  return async dispatch => {
    const token = await dispatch(authGetToken())
    if (!token) {
      return
    }
    startMainTabs()
  }
}

export const authClearStorage = () => {
  return async dispatch => {
    AsyncStorage.removeItem('ap:auth:token')
    AsyncStorage.removeItem('ap:auth:expiryDate')
    AsyncStorage.removeItem('ap:auth:refreshToken')
  }
}

export const authLogout = () => {
  return async dispatch => {
    await dispatch(authClearStorage())
    App()
    dispatch(authRemoveToken())
  }
}

export const authRemoveToken = () => {
  return {
    type: actions.AUTH_REMOVE_TOKEN
  }
}
