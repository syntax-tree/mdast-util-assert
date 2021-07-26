import test from 'tape'
import {assert} from '../index.js'

test('assert(footnoteDefinition)', (t) => {
  t.throws(
    () => {
      assert({type: 'footnoteDefinition'})
    },
    /parent should have `children`: `{ type: 'footnoteDefinition' }`$/,
    'should throw if `footnoteDefinition` is not a parent'
  )

  t.throws(
    () => {
      assert({type: 'footnoteDefinition', children: []})
    },
    /`footnoteDefinition` must have `identifier`: `{ type: 'footnoteDefinition', children: \[] }`$/,
    'should throw if `footnoteDefinition` has no identifier'
  )

  t.throws(
    () => {
      assert({type: 'footnoteDefinition', identifier: 1, children: []})
    },
    /`footnoteDefinition` must have `identifier`: `{ type: 'footnoteDefinition', identifier: 1, children: \[] }`$/,
    'should throw if `identifier` is not a `string`'
  )

  t.doesNotThrow(() => {
    assert({type: 'footnoteDefinition', identifier: '1', children: []})
  }, 'should not throw if `footnoteDefinition` has an identifier')

  t.throws(
    () => {
      assert({
        type: 'footnoteDefinition',
        identifier: '1',
        label: 1,
        children: []
      })
    },
    /`label` must be `string`: `{ type: 'footnoteDefinition',\s+identifier: '1',\s+label: 1,\s+children: \[] }`$/,
    'should throw if `label` is not a `string`'
  )

  t.end()
})
