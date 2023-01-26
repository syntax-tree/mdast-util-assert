import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('assert(link)', () => {
  nodeAssert.throws(
    () => {
      assert({type: 'link'})
    },
    /parent should have `children`: `{ type: 'link' }`$/,
    'should throw if `link` is not a parent'
  )

  nodeAssert.throws(
    () => {
      assert({type: 'link', children: []})
    },
    /`url` must be `string`: `{ type: 'link', children: \[] }`$/,
    'should throw without `url`'
  )

  nodeAssert.throws(
    () => {
      assert({type: 'link', children: [], url: 1})
    },
    /`url` must be `string`: `{ type: 'link', children: \[], url: 1 }`$/,
    'should throw if `url` is not a `string`'
  )

  nodeAssert.doesNotThrow(() => {
    assert({type: 'link', children: [], url: '1'})
  }, 'should not throw if `link` has no other properties')

  nodeAssert.throws(
    () => {
      assert({type: 'link', children: [], url: '1', title: 1})
    },
    /`title` must be `string`: `{ type: 'link', children: \[], url: '1', title: 1 }`$/,
    'should throw if `title` is not a `string`'
  )
})
