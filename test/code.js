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

test('assert(code)', function (t) {
  t.throws(
    function () {
      assert({type: 'code'});
    },
    /^AssertionError: text should have `value`: `{ type: 'code' }`$/,
    'should throw if `code` is not a text'
  );

  t.doesNotThrow(
    function () {
      assert({type: 'code', value: ''});
    },
    'should not throw if `code` has no extra properties'
  );

  t.throws(
    function () {
      assert({type: 'code', lang: 0, value: ''});
    },
    /^AssertionError: `lang` must be `string`: `{ type: 'code', lang: 0, value: '' }`$/,
    'should throw if `lang` is not a string'
  );

  t.end();
});
