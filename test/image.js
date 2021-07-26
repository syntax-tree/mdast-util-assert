import test from 'tape'
import {assert} from '../index.js'

test('assert(image)', (t) => {
  t.throws(
    () => {
      assert({type: 'image'})
    },
    /`url` must be `string`: `{ type: 'image' }`$/,
    'should throw without `url`'
  )

  t.throws(
    () => {
      assert({type: 'image', url: 1})
    },
    /`url` must be `string`: `{ type: 'image', url: 1 }`$/,
    'should throw if `url` is not a `string`'
  )

  t.doesNotThrow(() => {
    assert({type: 'image', url: '1'})
  }, 'should not throw if `image` has no other properties')

  t.throws(
    () => {
      assert({type: 'image', url: '1', title: 1})
    },
    /`title` must be `string`: `{ type: 'image', url: '1', title: 1 }`$/,
    'should throw if `title` is not a `string`'
  )

  t.throws(
    () => {
      assert({type: 'image', url: '1', alt: 1})
    },
    /`alt` must be `string`: `{ type: 'image', url: '1', alt: 1 }`$/,
    'should throw if `alt` is not a `string`'
  )

  t.end()
})
