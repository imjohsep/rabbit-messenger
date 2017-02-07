import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import sinon from 'sinon'
import Counter from 'components/counter'

describe('components/counter', () => {

    describe(Counter.name, () => {

        const props = overrides => ({
            onUpdate: sinon.spy(),
            ...overrides
        })

        const render = props => {
            const wrapper = shallow(<Counter {...props} />)
            return { wrapper, instance: wrapper.instance() }
        }

        it('should render default count', () => {
            const {wrapper} = render(props())
            const span = wrapper.find('span')
            expect(span.text()).to.equal('0')
        })

        it('should render current count', () => {
            const {wrapper} = render(props({count: 5}))
            const span = wrapper.find('span')
            expect(span.text()).to.equal('5')
            wrapper.unmount()
        })

    })

})