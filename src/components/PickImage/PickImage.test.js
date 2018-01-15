import React from 'react'
import PickImage from './index'

import renderer from 'react-test-renderer'

test('renders PickImage without crashing', () => {
  const rendered = renderer.create(<PickImage />).toJSON()
  expect(rendered).toBeTruthy()
})
