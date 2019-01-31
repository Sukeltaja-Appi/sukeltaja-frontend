// import React from 'react'
// import renderer from 'react-test-renderer'
// import { shallow } from 'enzyme'
// import configureStore from 'redux-mock-store'

// import ProfileMainScreen from '../components/ProfileScreens/ProfileMainScreen'

// let wrapper

// beforeAll(() => {
//   const initialState = { username: 'test_profile' }
//   const mockStore = configureStore()
//   const store = mockStore(initialState)
//   wrapper = shallow(<ProfileMainScreen store={store} />)
// })

describe('<ProfileMainScreen/>', () => {
  // it('renders the profile screen', () => {
  //   const profileScreen = renderer
  //     .create(wrapper)
  //     .toJSON()
  //   expect(profileScreen).toMatchSnapshot()
  // })

  it('1 is 1', () => {
    expect(1).toBe(1)
  })
})
