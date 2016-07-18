/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module mdast-util-assert
 * @fileoverview Test suite for `mdast-util-assert`.
 */

'use strict';

/* eslint-env node */

/* Dependencies. */
var test = require('tape');
var assert = require('..');

test('assert(table)', function (t) {
  t.throws(
    function () {
      assert({type: 'table'});
    },
    /^AssertionError: parent should have `children`: `{ type: 'table' }`$/,
    'should throw if `table` is not a parent'
  );

  t.doesNotThrow(
    function () {
      assert({type: 'table', children: []});
    },
    'should not throw if `table` has no other properties'
  );

  t.throws(
    function () {
      assert({type: 'table', children: [], align: 1});
    },
    /^AssertionError: `align` must be `array`: `{ type: 'table', children: \[\], align: 1 }`$/,
    'should throw if `align` is not a `string`'
  );

  t.throws(
    function () {
      assert({type: 'table', children: [], align: [1]});
    },
    /^AssertionError: each align in table must be `null, 'left', 'right', 'center'`: `{ type: 'table', children: \[\], align: \[ 1 \] }`$/,
    'should throw if an `align` is unknown'
  );

  t.doesNotThrow(
    function () {
      assert({type: 'table', children: [], align: [null, undefined, 'left', 'right', 'center']});
    },
    'should allow defined aligns'
  );

  t.end();
});
