import * as actions from '../types'
import { authGetToken, uiStartLoading, uiStopLoading } from './index'

const firebaseUrl = 'https://fir-app-a8e15.firebaseio.com/'

export const addPlace = (name, location, image) => {
  return async dispatch => {
    dispatch(uiStartLoading())
    const token = await dispatch(authGetToken())
    if (!token) {
      dispatch(uiStopLoading())
      return alert('No valid token found, sorry :/')
    }
    fetch('https://us-central1-fir-app-a8e15.cloudfunctions.net/storeImage', {
      method: 'POST',
      body: JSON.stringify({
        image: image.base64
      }),
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .catch(err => {
      dispatch(uiStopLoading())
      console.log('fetch image error', err)
      alert('Something went wrong, sorry :/')
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw (new Error())
      }
    })
    .then(parseRes => {
      const placeData = {
        name,
        location,
        image: parseRes.imageUrl,
        imagePath: parseRes.imagePath
      }
      return fetch(`${firebaseUrl}places.json?auth=${token}`, {
        method: 'POST',
        body: JSON.stringify(placeData)
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw (new Error())
      }
    })
    .then(parseRes => {
      dispatch(getPlaces())
      dispatch(uiStopLoading())
      dispatch(placeAddedStart())
    })
    .catch(err => {
      dispatch(uiStopLoading())
      console.log('fetch data error', err)
      alert('Something went wrong, sorry :/')
    })
  }
}

export const deletePlace = (key) => {
  return async dispatch => {
    const token = await dispatch(authGetToken())
    if (!token) {
      return alert('No valid token found, sorry :/')
    }
    return fetch(`${firebaseUrl}places/${key}.json?auth=${token}`, {
      method: 'DELETE'
    })
    .then(res => dispatch(removePlace(key)))
    .catch(err => {
      console.log('error deleting place', err)
      alert('Something went wrong, sorry :/')
    })
  }
}

export const getPlaces = () => {
  return async (dispatch) => {
    const token = await dispatch(authGetToken())
    if (!token) {
      return alert('No valid token found, sorry :/')
    }
    fetch(`${firebaseUrl}places.json?auth=${token}`)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw (new Error())
      }
    })
    .then(parseRes => {
      if (parseRes) {
        const places = Object.keys(parseRes).map((place) => {
          return {...parseRes[place], key: place, image: { uri: parseRes[place].image }}
        })
        dispatch(setPlaces(places))
      }
    })
    .catch(err => {
      console.log('error getPlaces', err)
      alert('Something went wrong, sorry :/')
    })
  }
}

export const setPlaces = (places) => ({
  type: actions.SET_PLACES,
  places
})

export const removePlace = (key) => ({
  type: actions.REMOVE_PLACE,
  key
})

export const placeAddedStart = () => ({
  type: actions.PLACE_ADDED_START
})

export const placeAddedEnd = () => ({
  type: actions.PLACE_ADDED_END
})
