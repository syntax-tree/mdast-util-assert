import test from 'tape'
import {assert} from '../index.js'

test('assert(list)', (t) => {
  t.throws(
    () => {
      assert({type: 'list'})
    },
    /parent should have `children`: `{ type: 'list' }`$/,
    'should throw if a `list` is not a parent'
  )

  t.doesNotThrow(() => {
    assert({type: 'list', children: []})
  }, 'should not throw for a list without extra properties')

  t.throws(
    () => {
      assert({type: 'list', spread: 1, children: []})
    },
    /`spread` must be `boolean`: `{ type: 'list', spread: 1, children: \[] }`$/,
    'should throw if `spread` is not a `boolean`'
  )

  t.doesNotThrow(() => {
    assert({type: 'list', spread: false, children: []})
  }, 'should not throw if `spread` is a `boolean`')

  t.throws(
    () => {
      assert({type: 'list', ordered: 'yup', children: []})
    },
    /`ordered` must be `boolean`: `{ type: 'list', ordered: 'yup', children: \[] }`$/,
    'should throw if a `ordered` is not a `boolean`'
  )

  t.doesNotThrow(() => {
    assert({type: 'list', ordered: true, children: []})
  }, 'should not throw if `ordered` is a `boolean`')

  t.throws(
    () => {
      assert({type: 'list', ordered: false, start: 1, children: []})
    },
    /unordered lists must not have `start`: `{ type: 'list', ordered: false, start: 1, children: \[] }`$/,
    'should throw if an `ordered: false` list has a `start`'
  )

  t.throws(
    () => {
      assert({type: 'list', ordered: true, start: false, children: []})
    },
    /ordered lists must have `start`: `{ type: 'list', ordered: true, start: false, children: \[] }`$/,
    'should throw if an `ordered` list has a non-numeric `start`'
  )

  t.throws(
    () => {
      assert({type: 'list', ordered: true, start: -1, children: []})
    },
    /`start` must be gte `0`: `{ type: 'list', ordered: true, start: -1, children: \[] }`$/,
    'should throw if an `ordered` list has a negative `start`'
  )

  t.doesNotThrow(() => {
    assert({type: 'list', ordered: true, start: 0, children: []})
  }, 'should not throw if an `ordered` list has a zero `start`')

  t.doesNotThrow(() => {
    assert({type: 'list', ordered: true, start: 5, children: []})
  }, 'should not throw if an `ordered` list has a positive `start`')

  t.end()
})
