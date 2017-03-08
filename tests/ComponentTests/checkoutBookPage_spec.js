import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import CheckoutPage from '../../public/javascripts/components/CheckoutPage'

const wrapper = shallow(<CheckoutPage />)

describe('(Component) CheckoutPage', () => {
  expect(wrapper).to.have.length(1)
})