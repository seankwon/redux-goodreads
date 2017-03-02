import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import CheckoutBook from '../../public/javascripts/components/CheckoutBook'

const wrapper = shallow(<CheckoutBook />)

describe('(Component) CheckoutBook', () => {
  it('should render without exploding', () => {
    expect(wrapper).to.have.length(1)
  })
})