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

test('assert(image)', function (t) {
  t.doesNotThrow(
    function () {
      assert({type: 'image'});
    },
    'should not throw if `image` has no other properties'
  );

  t.throws(
    function () {
      assert({type: 'image', url: 1});
    },
    /^AssertionError: `url` must be `string`: `{ type: 'image', url: 1 }`$/,
    'should throw if `identifier` is not a `string`'
  );

  t.throws(
    function () {
      assert({type: 'image', title: 1});
    },
    /^AssertionError: `title` must be `string`: `{ type: 'image', title: 1 }`$/,
    'should throw if `title` is not a `string`'
  );

  t.throws(
    function () {
      assert({type: 'image', alt: 1});
    },
    /^AssertionError: `alt` must be `string`: `{ type: 'image', alt: 1 }`$/,
    'should throw if `alt` is not a `string`'
  );

  t.end();
});
