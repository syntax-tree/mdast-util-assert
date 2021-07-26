import test from 'tape'
import {assert} from '../index.js'

test('assert(root)', (t) => {
  t.throws(
    () => {
      assert({type: 'root'})
    },
    /parent should have `children`: `{ type: 'root' }`$/,
    'should throw if a `root` is not a parent'
  )

  t.throws(
    () => {
      assert({type: 'paragraph', children: [{type: 'root', children: []}]})
    },
    /`root` should not have a parent: `{ type: 'root', children: \[] }`/,
    'should throw if a `root` has a parent'
  )

  t.end()
})
