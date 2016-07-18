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

test('assert(link)', function (t) {
  t.throws(
    function () {
      assert({type: 'link'});
    },
    /^AssertionError: parent should have `children`: `{ type: 'link' }`$/,
    'should throw if `link` is not a parent'
  );

  t.doesNotThrow(
    function () {
      assert({type: 'link', children: []});
    },
    'should not throw if `link` has no other properties'
  );

  t.throws(
    function () {
      assert({type: 'link', children: [], url: 1});
    },
    /^AssertionError: `url` must be `string`: `{ type: 'link', children: \[\], url: 1 }`$/,
    'should throw if `identifier` is not a `string`'
  );

  t.throws(
    function () {
      assert({type: 'link', children: [], title: 1});
    },
    /^AssertionError: `title` must be `string`: `{ type: 'link', children: \[\], title: 1 }`$/,
    'should throw if `title` is not a `string`'
  );

  t.end();
});
