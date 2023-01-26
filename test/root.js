import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('assert(root)', () => {
  nodeAssert.throws(
    () => {
      assert({type: 'root'})
    },
    /parent should have `children`: `{ type: 'root' }`$/,
    'should throw if a `root` is not a parent'
  )

  nodeAssert.throws(
    () => {
      assert({type: 'paragraph', children: [{type: 'root', children: []}]})
    },
    /`root` should not have a parent: `{ type: 'root', children: \[] }`/,
    'should throw if a `root` has a parent'
  )
})
