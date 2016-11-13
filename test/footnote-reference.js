'use strict';

var test = require('tape');
var assert = require('..');

test('assert(footnoteReference)', function (t) {
  t.throws(
    function () {
      assert({type: 'footnoteReference'});
    },
    /^AssertionError: `identifier` must be `string`: `{ type: 'footnoteReference' }`$/,
    'should throw if `footnoteReference` has no `identifier`'
  );

  t.throws(
    function () {
      assert({type: 'footnoteReference', identifier: 1});
    },
    /^AssertionError: `identifier` must be `string`: `{ type: 'footnoteReference', identifier: 1 }`$/,
    'should throw if `identifier` is not a `string`'
  );

  t.doesNotThrow(
    function () {
      assert({type: 'footnoteReference', identifier: '1'});
    },
    'should not throw if `footnoteReference` has no other properties'
  );

  t.end();
});
