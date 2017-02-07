import {expect} from 'chai'
import * as actions from 'actions/counter'
import * as data from 'data/counter'

describe('actions/counter', () => {
    it('should create action to increase count', () => {
        const expected = { type: data.TYPE_INCREASE }
        expect(actions.increase()).to.eql(expected)
    })
})
