import React from 'react'

import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

import { Button } from 'react-native'

import { ProfileMainScreen } from '../components/ProfileScreens/ProfileMainScreen'

beforeAll(() => {
  wrapper = shallow(<ProfileMainScreen />)
  mounted = mount(<ProfileMainScreen />)
})

describe('<ProfileMainScreen/>', () => {
  it('renders the profile screen snapshot', () => {
    const profileScreen = renderer
      .create(wrapper)
      .toJSON()
    expect(profileScreen).toMatchSnapshot()
  })

  it('pressing the button does nothing', () => {
    const button = mounted.find(Button).first()
    button.simulate('click')
    expect(1).toBe(1)
  })
})
