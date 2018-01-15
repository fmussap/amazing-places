import React from 'react'
import ListPlacesItem from './ListPlacesItem'

import renderer from 'react-test-renderer'

test('renders ListPlacesItem without crashing', () => {
  const rendered = renderer.create(<ListPlacesItem />).toJSON()
  expect(rendered).toBeTruthy()
})
