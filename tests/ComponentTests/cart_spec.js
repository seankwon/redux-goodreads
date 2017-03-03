import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Cart from '../../public/javascripts/components/Cart'

const wrapper = shallow(<Cart />)

describe('(Component) Cart', () => {
  it('should render without exploding', () => {
    expect(wrapper).to.have.length(1)
  })

})