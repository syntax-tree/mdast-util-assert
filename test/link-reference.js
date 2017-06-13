'use strict';

var test = require('tape');
var assert = require('..');

test('assert(linkReference)', function (t) {
  t.throws(
    function () {
      assert({type: 'linkReference'});
    },
    /parent should have `children`: `{ type: 'linkReference' }`$/,
    'should throw if `linkReference` has no children'
  );

  t.throws(
    function () {
      assert({type: 'linkReference', children: []});
    },
    /`identifier` must be `string`: `{ type: 'linkReference', children: \[] }`$/,
    'should throw if `linkReference` has no `identifier`'
  );

  t.throws(
    function () {
      assert({type: 'linkReference', identifier: 1, children: []});
    },
    /`identifier` must be `string`: `{ type: 'linkReference', identifier: 1, children: \[] }`$/,
    'should throw if `identifier` is not a `string`'
  );

  t.doesNotThrow(
    function () {
      assert({type: 'linkReference', identifier: '1', children: []});
    },
    'should not throw if `linkReference` has no other properties'
  );

  t.throws(
    function () {
      assert({type: 'linkReference', identifier: '1', referenceType: 1, children: []});
    },
    /`referenceType` must be `shortcut`, `collapsed`, or `full`: `{ type: 'linkReference',\n {2}identifier: '1',\n {2}referenceType: 1,\n {2}children: \[] }`$/,
    'should throw if `referenceType` is not a `string`'
  );

  t.doesNotThrow(
    function () {
      assert({type: 'linkReference', identifier: '1', referenceType: 'collapsed', children: []});
    },
    'should not throw if `referenceType` is valid'
  );

  t.end();
});
