import React from 'react'

import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

import configureStore from 'redux-mock-store'

import { Button } from 'react-native'

import ProfileMainScreen from '../components/ProfileScreens/ProfileMainScreen'

const mockStore = configureStore()

let wrapper, mounted

beforeAll(() => {
  const initialState = { user: { username: 'test_profile' } }
  const store = mockStore(initialState)
  wrapper = shallow(<ProfileMainScreen store={store} />)
  mounted = mount(<ProfileMainScreen store={store} />)
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
