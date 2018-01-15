import React from 'react'
import ListPlaces from './index'

import renderer from 'react-test-renderer'

test('renders ListPlaces without crashing', () => {
  const rendered = renderer.create(<ListPlaces />).toJSON()
  expect(rendered).toBeTruthy()
})
