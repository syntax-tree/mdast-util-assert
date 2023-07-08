import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('assert(heading)', async function (t) {
  await t.test(
    'should throw if a `heading` is not a parent',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'heading'})
      }, /parent should have `children`: `{ type: 'heading' }`$/)
    }
  )

  await t.test('should throw if `depth` is lower than 1', async function () {
    nodeAssert.throws(function () {
      assert({type: 'heading', depth: 0, children: []})
    }, /`depth` should be gte `1`: `{ type: 'heading', depth: 0, children: \[] }`$/)
  })

  await t.test('should throw if `depth` is lower than 7', async function () {
    nodeAssert.throws(function () {
      assert({type: 'heading', depth: 7, children: []})
    }, /`depth` should be lte `6`: `{ type: 'heading', depth: 7, children: \[] }`$/)
  })

  await t.test(
    'should not throw if `heading` is between 0 and 7',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'heading', depth: 1, children: []})
      })
    }
  )
})
