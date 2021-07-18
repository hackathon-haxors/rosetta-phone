/* global describe beforeEach it */

// Imports
import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {Hello} from './Hello'

// Initializations
const adapter = new Adapter()
enzyme.configure({adapter})

// Tests
describe('Hello', () => {
  let hello

  beforeEach(() => {
    hello = shallow(<Hello firstName="Cody" />)
  })

  it('renders the first name in a span', () => {
    expect(hello.find('span').text()).to.be.equal('Hello, Cody.')
  })
})
