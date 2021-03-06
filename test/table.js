import test from 'tape'
import {assert} from '../index.js'

test('assert(table)', function (t) {
  t.throws(
    function () {
      assert({type: 'table'})
    },
    /parent should have `children`: `{ type: 'table' }`$/,
    'should throw if `table` is not a parent'
  )

  t.doesNotThrow(function () {
    assert({type: 'table', children: []})
  }, 'should not throw if `table` has no other properties')

  t.throws(
    function () {
      assert({type: 'table', children: [], align: 1})
    },
    /`align` must be `array`: `{ type: 'table', children: \[], align: 1 }`$/,
    'should throw if `align` is not a `string`'
  )

  t.throws(
    function () {
      assert({type: 'table', children: [], align: [1]})
    },
    /each align in table must be `null, 'left', 'right', 'center'`: `{ type: 'table', children: \[], align: \[ 1 ] }`$/,
    'should throw if an `align` is unknown'
  )

  t.doesNotThrow(function () {
    assert({
      type: 'table',
      children: [],
      align: [null, 'left', 'right', 'center']
    })
  }, 'should allow defined aligns')

  t.end()
})
