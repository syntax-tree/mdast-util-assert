'use strict'

var test = require('tape')
var assert = require('..')

test('assert(imageReference)', function (t) {
  t.throws(
    function () {
      assert({type: 'imageReference'})
    },
    /`identifier` must be `string`: `{ type: 'imageReference' }`$/,
    'should throw if `imageReference` has no `identifier`'
  )

  t.throws(
    function () {
      assert({type: 'imageReference', identifier: 1})
    },
    /`identifier` must be `string`: `{ type: 'imageReference', identifier: 1 }`$/,
    'should throw if `identifier` is not a `string`'
  )

  t.doesNotThrow(function () {
    assert({type: 'imageReference', identifier: '1'})
  }, 'should not throw if `imageReference` has no other properties')

  t.throws(
    function () {
      assert({type: 'imageReference', identifier: '1', alt: 1})
    },
    /`alt` must be `string`: `{ type: 'imageReference', identifier: '1', alt: 1 }`$/,
    'should throw if `alt` is not a `string`'
  )

  t.throws(
    function () {
      assert({type: 'imageReference', identifier: '1', referenceType: 1})
    },
    /`referenceType` must be `shortcut`, `collapsed`, or `full`: `{ type: 'imageReference', identifier: '1', referenceType: 1 }`$/,
    'should throw if `referenceType` is not a `string`'
  )

  t.doesNotThrow(function () {
    assert({
      type: 'imageReference',
      identifier: '1',
      referenceType: 'collapsed'
    })
  }, 'should not throw if `referenceType` is valid')

  t.throws(
    function () {
      assert({type: 'imageReference', identifier: '1', label: 1})
    },
    /`label` must be `string`: `{ type: 'imageReference', identifier: '1', label: 1 }`$/,
    'should throw if `label` is not a `string`'
  )

  t.end()
})
