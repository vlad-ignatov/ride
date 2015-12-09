/* global describe, it */
import EditorSelectionRange from '../src/editor/EditorSelectionRange'
var assert = require('chai').assert

describe ('EritorSelectionRange', () => {
    describe ('constructor', () => {

        it ('should require at least one argument', () => {
            assert.throws(() => {
                return new EditorSelectionRange()
            }, 'At least one argument is required')
        })

        // it ('should accept rows as DOMElements or as numbers')
        it ('should create collapsed range if only one argument is present', () => {
            let rng = new EditorSelectionRange({
                col: 5,
                row: 6
            })
            assert.equal(rng.start.col, 5)
            assert.equal(rng.start.row, 6)
            assert.equal(rng.end.col  , 5)
            assert.equal(rng.end.row  , 6)
            assert.notEqual(rng.start, rng.end)
            assert.deepEqual(rng.start, rng.end)
        })
    });

    describe('setStart', () => {
        it ('does not allow the start point to be after the end point', () => {
            let rng = new EditorSelectionRange({
                col: 5,
                row: 5
            }, {
                col: 5,
                row: 5
            })
            assert.throws(() => { rng.setStart({ col: 6, row: 5}) })
            assert.throws(() => { rng.setStart({ col: 5, row: 6}) })
            assert.doesNotThrow(() => { rng.setStart({ col: 5, row: 5}) })
        })
    })

    describe('setEnd', () => {
        it ('does not allow the end point to be before the start point', () => {
            let rng = new EditorSelectionRange({
                col: 5,
                row: 5
            }, {
                col: 5,
                row: 5
            })
            assert.throws(() => { rng.setEnd({ col: 4, row: 5}) })
            assert.throws(() => { rng.setEnd({ col: 5, row: 4}) })
            assert.doesNotThrow(() => { rng.setEnd({ col: 5, row: 5}) })
        })
    })

    describe('isCollapsed', () => {
        it ('should return true when the range is collapsed', () => {
            let rng = new EditorSelectionRange({
                row: 1,
                col: 2
            }, {
                row: 1,
                col: 2
            })
            assert.equal(rng.isCollapsed(), true)
        })
        it ('should return false when the range is not collapsed', () => {
            let rng = new EditorSelectionRange({
                row: 1,
                col: 2
            }, {
                row: 3,
                col: 4
            })
            assert.equal(rng.isCollapsed(), false)
        })
    })

    describe('serialize', () => {
        it ('should return serialized json', () => {
            let rng = new EditorSelectionRange({
                row: 2,
                col: 3
            }, {
                row: 4,
                col: 5
            })
            assert.deepEqual(
                rng.serialize(),
                '[{"row":2,"col":3},{"row":4,"col":5}]'
            )
        })
    })

    describe('toString', () => {
        it ('should be an alias of serialize', () => {
            let rng = new EditorSelectionRange({
                row: 1,
                col: 2
            }, {
                row: 3,
                col: 4
            })
            assert.equal(rng.serialize(), rng + '')
        })
    })

    describe('unserialize', () => {
        it ('should be able to set state from the serialized version', () => {
            let rng = new EditorSelectionRange({
                row: 1,
                col: 2
            }, {
                row: 3,
                col: 4
            })
            assert.equal(rng.unserialize('[{"row":5,"col":6},{"row":7,"col":8}]'), true)
            assert.equal(rng.start.row, 5)
            assert.equal(rng.start.col, 6)
            assert.equal(rng.end  .row, 7)
            assert.equal(rng.end  .col, 8)
        })
    })

    describe('toJSON', () => {
        it ('should return the JSON version of the range', () => {
            let rng = new EditorSelectionRange({
                row: 1,
                col: 2
            }, {
                row: 3,
                col: 4
            })
            assert.deepEqual(rng.toJSON(), [{
                row: 1,
                col: 2
            }, {
                row: 3,
                col: 4
            }])
        })
    })

});
