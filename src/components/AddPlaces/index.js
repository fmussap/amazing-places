import React from 'react'

import DefaultInput from '../UI/DefaultInput'

const AddPlaces = ({ placename, handleChangeText, isSubmitted, validImage, validlocation, validName }) => {
  let message = null
  let valid = validName && isSubmitted
  if (!validName && isSubmitted) {
    message = 'Place name should\' not be empty'
    valid = false
  } else if (!validlocation && isSubmitted) {
    message = 'Please pick a location'
    valid = false
  } else if (!validImage && isSubmitted) {
    message = 'Please pick an image'
    valid = false
  }
  return (
    <DefaultInput
      message={message}
      onChangeText={handleChangeText}
      placeholder='Place name'
      value={placename}
      valid={valid}
      isSubmitted={isSubmitted}
    />
  )
}

export default AddPlaces
