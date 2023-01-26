import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('assert(definition)', () => {
  nodeAssert.throws(
    () => {
      assert({type: 'definition'})
    },
    /`identifier` must be `string`: `{ type: 'definition' }`$/,
    'should throw if `definition` has no `identifier`'
  )

  nodeAssert.throws(
    () => {
      assert({type: 'definition', identifier: '1'})
    },
    /`url` must be `string`: `{ type: 'definition', identifier: '1' }`$/,
    'should throw if `definition` has no `url`'
  )

  nodeAssert.throws(
    () => {
      assert({type: 'definition', identifier: 1})
    },
    /`identifier` must be `string`: `{ type: 'definition', identifier: 1 }`$/,
    'should throw if `identifier` is not a `string`'
  )

  nodeAssert.throws(
    () => {
      assert({type: 'definition', url: 1})
    },
    /`identifier` must be `string`: `{ type: 'definition', url: 1 }`$/,
    'should throw if `url` is not a `string`'
  )

  nodeAssert.doesNotThrow(() => {
    assert({type: 'definition', identifier: '1', url: '1'})
  }, 'should not throw if `definition` has no other properties')

  nodeAssert.throws(
    () => {
      assert({type: 'definition', identifier: '1', url: '1', title: 1})
    },
    /`title` must be `string`: `{ type: 'definition', identifier: '1', url: '1', title: 1 }`$/,
    'should throw if `title` is not a `string`'
  )

  nodeAssert.throws(
    () => {
      assert({type: 'definition', identifier: '1', url: '1', label: 1})
    },
    /`label` must be `string`: `{ type: 'definition', identifier: '1', url: '1', label: 1 }`$/,
    'should throw if `label` is not a `string`'
  )
})
