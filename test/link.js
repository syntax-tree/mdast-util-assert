'use strict'

var test = require('tape')
var assert = require('..')

test('assert(link)', function(t) {
  t.throws(
    function() {
      assert({type: 'link'})
    },
    /parent should have `children`: `{ type: 'link' }`$/,
    'should throw if `link` is not a parent'
  )

  t.doesNotThrow(function() {
    assert({type: 'link', children: []})
  }, 'should not throw if `link` has no other properties')

  t.throws(
    function() {
      assert({type: 'link', children: [], url: 1})
    },
    /`url` must be `string`: `{ type: 'link', children: \[], url: 1 }`$/,
    'should throw if `identifier` is not a `string`'
  )

  t.throws(
    function() {
      assert({type: 'link', children: [], title: 1})
    },
    /`title` must be `string`: `{ type: 'link', children: \[], title: 1 }`$/,
    'should throw if `title` is not a `string`'
  )

  t.end()
})
