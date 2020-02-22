/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {Hello} from './Hello'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let hello

  beforeEach(() => {
    hello = shallow(<Hello email="cody@email.com" />)
  })

  it('renders the email handle in a span', () => {
    expect(hello.find('span').text()).to.be.equal('Hello, cody.')
  })
})
