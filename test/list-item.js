import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('assert(listItem)', () => {
  nodeAssert.throws(
    () => {
      assert({type: 'listItem'})
    },
    /parent should have `children`: `{ type: 'listItem' }`$/,
    'should throw if a `listItem` is not a parent'
  )

  nodeAssert.doesNotThrow(() => {
    assert({type: 'listItem', children: []})
  }, 'should not throw for a listItem without extra properties')

  nodeAssert.throws(
    () => {
      assert({type: 'listItem', spread: 1, children: []})
    },
    /`spread` must be `boolean`: `{ type: 'listItem', spread: 1, children: \[] }`$/,
    'should throw if `spread` is not a `boolean`'
  )

  nodeAssert.doesNotThrow(() => {
    assert({type: 'listItem', spread: false, children: []})
  }, 'should not throw if `spread` is a `boolean`')

  nodeAssert.throws(
    () => {
      assert({type: 'listItem', checked: 'yup', children: []})
    },
    /`checked` must be `boolean`: `{ type: 'listItem', checked: 'yup', children: \[] }`$/,
    'should throw if a `checked` is not a `boolean`'
  )

  nodeAssert.doesNotThrow(() => {
    assert({type: 'listItem', checked: true, children: []})
  }, 'should not throw if `checked` is a `boolean`')
})
