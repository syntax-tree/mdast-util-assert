import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('assert(imageReference)', () => {
  nodeAssert.throws(
    () => {
      assert({type: 'imageReference'})
    },
    /`identifier` must be `string`: `{ type: 'imageReference' }`$/,
    'should throw if `imageReference` has no `identifier`'
  )

  nodeAssert.throws(
    () => {
      assert({type: 'imageReference', identifier: 1})
    },
    /`identifier` must be `string`: `{ type: 'imageReference', identifier: 1 }`$/,
    'should throw if `identifier` is not a `string`'
  )

  nodeAssert.doesNotThrow(() => {
    assert({type: 'imageReference', identifier: '1'})
  }, 'should not throw if `imageReference` has no other properties')

  nodeAssert.throws(
    () => {
      assert({type: 'imageReference', identifier: '1', alt: 1})
    },
    /`alt` must be `string`: `{ type: 'imageReference', identifier: '1', alt: 1 }`$/,
    'should throw if `alt` is not a `string`'
  )

  nodeAssert.throws(
    () => {
      assert({type: 'imageReference', identifier: '1', referenceType: 1})
    },
    /`referenceType` must be `shortcut`, `collapsed`, or `full`: `{ type: 'imageReference', identifier: '1', referenceType: 1 }`$/,
    'should throw if `referenceType` is not a `string`'
  )

  nodeAssert.doesNotThrow(() => {
    assert({
      type: 'imageReference',
      identifier: '1',
      referenceType: 'collapsed'
    })
  }, 'should not throw if `referenceType` is valid')

  nodeAssert.throws(
    () => {
      assert({type: 'imageReference', identifier: '1', label: 1})
    },
    /`label` must be `string`: `{ type: 'imageReference', identifier: '1', label: 1 }`$/,
    'should throw if `label` is not a `string`'
  )
})
