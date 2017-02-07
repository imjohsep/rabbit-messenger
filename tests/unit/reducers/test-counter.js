import {expect} from 'chai'
import * as actions from 'actions/counter'
import reducer from 'reducers/counter'

describe('reducers/counter', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).to.eql({ count: 0 })
    })

    it('should increase the count', () => {
        const expected = { count: 1 }
        expect(reducer(undefined, actions.increase())).to.eql(expected)
    })
})
