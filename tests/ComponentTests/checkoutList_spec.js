import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import CheckoutList from '../../public/javascripts/components/CheckoutList'

const wrapper = shallow(<CheckoutList />)

describe('(Component) CheckoutList', () => {
  it('renders without exploding', () => {
    expect(wrapper).to.have.length(1)
  })
})
