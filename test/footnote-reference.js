import test from 'tape'
import {assert} from '../index.js'

test('assert(footnoteReference)', function (t) {
  t.throws(
    function () {
      assert({type: 'footnoteReference'})
    },
    /`identifier` must be `string`: `{ type: 'footnoteReference' }`$/,
    'should throw if `footnoteReference` has no `identifier`'
  )

  t.throws(
    function () {
      assert({type: 'footnoteReference', identifier: 1})
    },
    /`identifier` must be `string`: `{ type: 'footnoteReference', identifier: 1 }`$/,
    'should throw if `identifier` is not a `string`'
  )

  t.doesNotThrow(function () {
    assert({type: 'footnoteReference', identifier: '1'})
  }, 'should not throw if `footnoteReference` has no other properties')

  t.throws(
    function () {
      assert({type: 'footnoteReference', identifier: '1', label: 1})
    },
    /`label` must be `string`: `{ type: 'footnoteReference', identifier: '1', label: 1 }`$/,
    'should throw if `label` is not a `string`'
  )

  t.end()
})
