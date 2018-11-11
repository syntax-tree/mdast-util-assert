'use strict'

var test = require('tape')
var assert = require('..')

test('assert(definition)', function(t) {
  t.throws(
    function() {
      assert({type: 'definition'})
    },
    /`identifier` must be `string`: `{ type: 'definition' }`$/,
    'should throw if `definition` has no `identifier`'
  )

  t.throws(
    function() {
      assert({type: 'definition', identifier: '1'})
    },
    /`url` must be `string`: `{ type: 'definition', identifier: '1' }`$/,
    'should throw if `definition` has no `url`'
  )

  t.throws(
    function() {
      assert({type: 'definition', identifier: 1})
    },
    /`identifier` must be `string`: `{ type: 'definition', identifier: 1 }`$/,
    'should throw if `identifier` is not a `string`'
  )

  t.throws(
    function() {
      assert({type: 'definition', url: 1})
    },
    /`identifier` must be `string`: `{ type: 'definition', url: 1 }`$/,
    'should throw if `url` is not a `string`'
  )

  t.doesNotThrow(function() {
    assert({type: 'definition', identifier: '1', url: '1'})
  }, 'should not throw if `definition` has no other properties')

  t.throws(
    function() {
      assert({type: 'definition', identifier: '1', url: '1', title: 1})
    },
    /`title` must be `string`: `{ type: 'definition', identifier: '1', url: '1', title: 1 }`$/,
    'should throw if `title` is not a `string`'
  )

  t.throws(
    function() {
      assert({type: 'definition', identifier: '1', url: '1', label: 1})
    },
    /`label` must be `string`: `{ type: 'definition', identifier: '1', url: '1', label: 1 }`$/,
    'should throw if `label` is not a `string`'
  )

  t.end()
})
