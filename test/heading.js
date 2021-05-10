import test from 'tape'
import {assert} from '../index.js'

test('assert(heading)', function (t) {
  t.throws(
    function () {
      assert({type: 'heading'})
    },
    /parent should have `children`: `{ type: 'heading' }`$/,
    'should throw if a `heading` is not a parent'
  )

  t.throws(
    function () {
      assert({type: 'heading', depth: 0, children: []})
    },
    /`depth` should be gte `1`: `{ type: 'heading', depth: 0, children: \[] }`$/,
    'should throw if `depth` is lower than 1'
  )

  t.throws(
    function () {
      assert({type: 'heading', depth: 7, children: []})
    },
    /`depth` should be lte `6`: `{ type: 'heading', depth: 7, children: \[] }`$/,
    'should throw if `depth` is lower than 7'
  )

  t.doesNotThrow(function () {
    assert({type: 'heading', depth: 1, children: []})
  }, 'should not throw if `heading` is between 0 and 7')

  t.end()
})
