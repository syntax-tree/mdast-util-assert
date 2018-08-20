'use strict'

var test = require('tape')
var assert = require('..')

test('assert(image)', function(t) {
  t.doesNotThrow(function() {
    assert({type: 'image'})
  }, 'should not throw if `image` has no other properties')

  t.throws(
    function() {
      assert({type: 'image', url: 1})
    },
    /`url` must be `string`: `{ type: 'image', url: 1 }`$/,
    'should throw if `identifier` is not a `string`'
  )

  t.throws(
    function() {
      assert({type: 'image', title: 1})
    },
    /`title` must be `string`: `{ type: 'image', title: 1 }`$/,
    'should throw if `title` is not a `string`'
  )

  t.throws(
    function() {
      assert({type: 'image', alt: 1})
    },
    /`alt` must be `string`: `{ type: 'image', alt: 1 }`$/,
    'should throw if `alt` is not a `string`'
  )

  t.end()
})
