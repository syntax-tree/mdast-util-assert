'use strict'

var test = require('tape')
var assert = require('..')

test('assert(listItem)', function(t) {
  t.throws(
    function() {
      assert({type: 'listItem'})
    },
    /parent should have `children`: `{ type: 'listItem' }`$/,
    'should throw if a `listItem` is not a parent'
  )

  t.doesNotThrow(function() {
    assert({type: 'listItem', children: []})
  }, 'should not throw for a listItem without extra properties')

  t.throws(
    function() {
      assert({type: 'listItem', loose: 1, children: []})
    },
    /`loose` must be `boolean`: `{ type: 'listItem', loose: 1, children: \[] }`$/,
    'should throw if `loose` is not a `boolean`'
  )

  t.doesNotThrow(function() {
    assert({type: 'listItem', loose: false, children: []})
  }, 'should not throw if `loose` is a `boolean`')

  t.throws(
    function() {
      assert({type: 'listItem', checked: 'yup', children: []})
    },
    /`checked` must be `boolean`: `{ type: 'listItem', checked: 'yup', children: \[] }`$/,
    'should throw if a `checked` is not a `boolean`'
  )

  t.doesNotThrow(function() {
    assert({type: 'listItem', checked: true, children: []})
  }, 'should not throw if `checked` is a `boolean`')

  t.end()
})
