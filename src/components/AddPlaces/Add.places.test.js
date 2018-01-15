import React from 'react'
import AddPlaces from './index'

import renderer from 'react-test-renderer'

test('renders AddPlaces without crashing', () => {
  const rendered = renderer.create(<AddPlaces />).toJSON()
  expect(rendered).toBeTruthy()
})
