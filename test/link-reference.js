import test from 'tape'
import {assert} from '../index.js'

test('assert(linkReference)', (t) => {
  t.throws(
    () => {
      assert({type: 'linkReference'})
    },
    /parent should have `children`: `{ type: 'linkReference' }`$/,
    'should throw if `linkReference` has no children'
  )

  t.throws(
    () => {
      assert({type: 'linkReference', children: []})
    },
    /`identifier` must be `string`: `{ type: 'linkReference', children: \[] }`$/,
    'should throw if `linkReference` has no `identifier`'
  )

  t.throws(
    () => {
      assert({type: 'linkReference', identifier: 1, children: []})
    },
    /`identifier` must be `string`: `{ type: 'linkReference', identifier: 1, children: \[] }`$/,
    'should throw if `identifier` is not a `string`'
  )

  t.doesNotThrow(() => {
    assert({type: 'linkReference', identifier: '1', children: []})
  }, 'should not throw if `linkReference` has no other properties')

  t.throws(
    () => {
      assert({
        type: 'linkReference',
        identifier: '1',
        referenceType: 1,
        children: []
      })
    },
    /`referenceType` must be `shortcut`, `collapsed`, or `full`/,
    'should throw if `referenceType` is not a `string`'
  )

  t.doesNotThrow(() => {
    assert({
      type: 'linkReference',
      identifier: '1',
      referenceType: 'collapsed',
      children: []
    })
  }, 'should not throw if `referenceType` is valid')

  t.throws(
    () => {
      assert({type: 'linkReference', identifier: '1', children: [], label: 1})
    },
    /`label` must be `string`: `{ type: 'linkReference', identifier: '1', children: \[], label: 1 }`$/,
    'should throw if `label` is not a `string`'
  )

  t.end()
})
