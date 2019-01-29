import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import HomeScreen from '../components/HomeScreen'


describe('<HomeScreen/>', () => {
  it('renders the home screen', () => {
    const homeScreen = renderer
      .create(<HomeScreen/>)
      .toJSON()
    expect(homeScreen).toMatchSnapshot()
  })


  it('the counter starts from 0', () => {
    const homeScreen = shallow(<HomeScreen/>)
    expect(homeScreen.state().counter).toEqual(0)
  })

  it('increases the counter when clicked', () => {
    const homeScreen = shallow(<HomeScreen/>)
    const button = homeScreen.find("Button")
    button.props().onPress()
    expect(homeScreen.state().counter).toEqual(1)
  })

})
