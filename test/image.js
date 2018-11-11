'use strict'

var test = require('tape')
var assert = require('..')

test('assert(image)', function(t) {
  t.throws(
    function() {
      assert({type: 'image'})
    },
    /`url` must be `string`: `{ type: 'image' }`$/,
    'should throw without `url`'
  )

  t.throws(
    function() {
      assert({type: 'image', url: 1})
    },
    /`url` must be `string`: `{ type: 'image', url: 1 }`$/,
    'should throw if `url` is not a `string`'
  )

  t.doesNotThrow(function() {
    assert({type: 'image', url: '1'})
  }, 'should not throw if `image` has no other properties')

  t.throws(
    function() {
      assert({type: 'image', url: '1', title: 1})
    },
    /`title` must be `string`: `{ type: 'image', url: '1', title: 1 }`$/,
    'should throw if `title` is not a `string`'
  )

  t.throws(
    function() {
      assert({type: 'image', url: '1', alt: 1})
    },
    /`alt` must be `string`: `{ type: 'image', url: '1', alt: 1 }`$/,
    'should throw if `alt` is not a `string`'
  )

  t.end()
})
