import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { ProfileScreen } from '../components/ProfileScreens/ProfileTabs/ProfileScreen'

let wrapper

beforeAll(() => {
  wrapper = shallow(<ProfileScreen />)
})

describe('<ProfileScreen/>', () => {
  it('renders the profile screen snapshot', () => {
    const profileScreen = renderer
      .create(wrapper)
      .toJSON()

    expect(profileScreen).toMatchSnapshot()
  })
})
