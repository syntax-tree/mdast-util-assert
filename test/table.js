import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from 'mdast-util-assert'

test('assert(table)', async function (t) {
  await t.test('should throw if `table` is not a parent', async function () {
    nodeAssert.throws(function () {
      assert({type: 'table'})
    }, /parent should have `children`: `{ type: 'table' }`$/)
  })

  await t.test(
    'should not throw if `table` has no other properties',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'table', children: []})
      })
    }
  )

  await t.test('should throw if `align` is not a `string`', async function () {
    nodeAssert.throws(function () {
      assert({type: 'table', children: [], align: 1})
    }, /`align` must be `array`: `{ type: 'table', children: \[], align: 1 }`$/)
  })

  await t.test('should throw if an `align` is unknown', async function () {
    nodeAssert.throws(function () {
      assert({type: 'table', children: [], align: [1]})
    }, /each align in table must be `null, 'left', 'right', 'center'`: `{ type: 'table', children: \[], align: \[ 1 ] }`$/)
  })

  await t.test('should allow defined aligns', async function () {
    nodeAssert.doesNotThrow(function () {
      assert({
        type: 'table',
        children: [],
        align: [null, 'left', 'right', 'center']
      })
    })
  })
})
