'use strict'

var test = require('tape')
var assert = require('..')

test('assert(root)', function(t) {
  t.throws(
    function() {
      assert({type: 'root'})
    },
    /parent should have `children`: `{ type: 'root' }`$/,
    'should throw if a `root` is not a parent'
  )

  t.throws(
    function() {
      assert({type: 'paragraph', children: [{type: 'root', children: []}]})
    },
    /`root` should not have a parent: `{ type: 'root', children: \[] }` in `{ type: 'paragraph',\n {2}children: \[ { type: 'root', children: \[] } ] }`$/,
    'should throw if a `root` has a parent'
  )

  t.end()
})
