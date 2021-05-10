import test from 'tape'
import {assert} from '../index.js'

test('assert(link)', function (t) {
  t.throws(
    function () {
      assert({type: 'link'})
    },
    /parent should have `children`: `{ type: 'link' }`$/,
    'should throw if `link` is not a parent'
  )

  t.throws(
    function () {
      assert({type: 'link', children: []})
    },
    /`url` must be `string`: `{ type: 'link', children: \[] }`$/,
    'should throw without `url`'
  )

  t.throws(
    function () {
      assert({type: 'link', children: [], url: 1})
    },
    /`url` must be `string`: `{ type: 'link', children: \[], url: 1 }`$/,
    'should throw if `url` is not a `string`'
  )

  t.doesNotThrow(function () {
    assert({type: 'link', children: [], url: '1'})
  }, 'should not throw if `link` has no other properties')

  t.throws(
    function () {
      assert({type: 'link', children: [], url: '1', title: 1})
    },
    /`title` must be `string`: `{ type: 'link', children: \[], url: '1', title: 1 }`$/,
    'should throw if `title` is not a `string`'
  )

  t.end()
})
