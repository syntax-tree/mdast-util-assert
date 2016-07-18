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

test('assert(list)', function (t) {
  t.throws(
    function () {
      assert({type: 'list'});
    },
    /^AssertionError: parent should have `children`: `{ type: 'list' }`$/,
    'should throw if a `list` is not a parent'
  );

  t.doesNotThrow(
    function () {
      assert({type: 'list', children: []});
    },
    'should not throw for a list without extra properties'
  );

  t.throws(
    function () {
      assert({type: 'list', loose: 1, children: []});
    },
    /^AssertionError: `loose` must be `boolean`: `{ type: 'list', loose: 1, children: \[\] }`$/,
    'should throw if `loose` is not a `boolean`'
  );

  t.doesNotThrow(
    function () {
      assert({type: 'list', loose: false, children: []});
    },
    'should not throw if `loose` is a `boolean`'
  );

  t.throws(
    function () {
      assert({type: 'list', ordered: 'yup', children: []});
    },
    /^AssertionError: `ordered` must be `boolean`: `{ type: 'list', ordered: 'yup', children: \[\] }`$/,
    'should throw if a `ordered` is not a `boolean`'
  );

  t.doesNotThrow(
    function () {
      assert({type: 'list', ordered: true, children: []});
    },
    'should not throw if `ordered` is a `boolean`'
  );

  t.throws(
    function () {
      assert({type: 'list', ordered: false, start: 1, children: []});
    },
    /^AssertionError: unordered lists must not have `start`: `{ type: 'list', ordered: false, start: 1, children: \[\] }`$/,
    'should throw if an `ordered: false` list has a `start`'
  );

  t.throws(
    function () {
      assert({type: 'list', ordered: true, start: false, children: []});
    },
    /^AssertionError: ordered lists must have `start`: `{ type: 'list', ordered: true, start: false, children: \[\] }`$/,
    'should throw if an `ordered` list has a non-numeric `start`'
  );

  t.throws(
    function () {
      assert({type: 'list', ordered: true, start: -1, children: []});
    },
    /^AssertionError: `start` must be gte `0`: `{ type: 'list', ordered: true, start: -1, children: \[\] }`$/,
    'should throw if an `ordered` list has a negative `start`'
  );

  t.doesNotThrow(
    function () {
      assert({type: 'list', ordered: true, start: 0, children: []});
    },
    'should not throw if an `ordered` list has a zero `start`'
  );

  t.doesNotThrow(
    function () {
      assert({type: 'list', ordered: true, start: 5, children: []});
    },
    'should not throw if an `ordered` list has a positive `start`'
  );

  t.end();
});
