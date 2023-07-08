import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('assert(image)', async function (t) {
  await t.test('should throw without `url`', async function () {
    nodeAssert.throws(function () {
      assert({type: 'image'})
    }, /`url` must be `string`: `{ type: 'image' }`$/)
  })

  await t.test('should throw if `url` is not a `string`', async function () {
    nodeAssert.throws(function () {
      assert({type: 'image', url: 1})
    }, /`url` must be `string`: `{ type: 'image', url: 1 }`$/)
  })

  await t.test(
    'should not throw if `image` has no other properties',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'image', url: '1'})
      })
    }
  )

  await t.test('should throw if `title` is not a `string`', async function () {
    nodeAssert.throws(function () {
      assert({type: 'image', url: '1', title: 1})
    }, /`title` must be `string`: `{ type: 'image', url: '1', title: 1 }`$/)
  })

  await t.test('should throw if `alt` is not a `string`', async function () {
    nodeAssert.throws(function () {
      assert({type: 'image', url: '1', alt: 1})
    }, /`alt` must be `string`: `{ type: 'image', url: '1', alt: 1 }`$/)
  })
})
