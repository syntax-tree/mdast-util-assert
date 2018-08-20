'use strict'

var test = require('tape')
var assert = require('..')

test('assert(footnoteDefinition)', function(t) {
  t.throws(
    function() {
      assert({type: 'footnoteDefinition'})
    },
    /parent should have `children`: `{ type: 'footnoteDefinition' }`$/,
    'should throw if `footnoteDefinition` is not a parent'
  )

  t.throws(
    function() {
      assert({type: 'footnoteDefinition', children: []})
    },
    /`footnoteDefinition` must have `identifier`: `{ type: 'footnoteDefinition', children: \[] }`$/,
    'should throw if `footnoteDefinition` has no identifier'
  )

  t.throws(
    function() {
      assert({type: 'footnoteDefinition', identifier: 1, children: []})
    },
    /`footnoteDefinition` must have `identifier`: `{ type: 'footnoteDefinition', identifier: 1, children: \[] }`$/,
    'should throw if `identifier` is not a `string`'
  )

  t.doesNotThrow(function() {
    assert({type: 'footnoteDefinition', identifier: '1', children: []})
  }, 'should not throw if `footnoteDefinition` has an identifier')

  t.end()
})
