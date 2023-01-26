import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('assert(image)', () => {
  nodeAssert.throws(
    () => {
      assert({type: 'image'})
    },
    /`url` must be `string`: `{ type: 'image' }`$/,
    'should throw without `url`'
  )

  nodeAssert.throws(
    () => {
      assert({type: 'image', url: 1})
    },
    /`url` must be `string`: `{ type: 'image', url: 1 }`$/,
    'should throw if `url` is not a `string`'
  )

  nodeAssert.doesNotThrow(() => {
    assert({type: 'image', url: '1'})
  }, 'should not throw if `image` has no other properties')

  nodeAssert.throws(
    () => {
      assert({type: 'image', url: '1', title: 1})
    },
    /`title` must be `string`: `{ type: 'image', url: '1', title: 1 }`$/,
    'should throw if `title` is not a `string`'
  )

  nodeAssert.throws(
    () => {
      assert({type: 'image', url: '1', alt: 1})
    },
    /`alt` must be `string`: `{ type: 'image', url: '1', alt: 1 }`$/,
    'should throw if `alt` is not a `string`'
  )
})
