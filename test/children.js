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

test('children', function (t) {
  t.throws(
    function () {
      assert({type: 'paragraph', children: {alpha: 'bravo'}});
    },
    /^AssertionError: `children` should be an array: `{ type: 'paragraph', children: { alpha: 'bravo' } }`$/,
    'should throw if given a non-node child in children'
  );

  t.throws(
    function () {
      assert({type: 'paragraph', children: ['one']});
    },
    /^AssertionError: node should be an object: `'one'` in `{ type: 'paragraph', children: \[ 'one' \] }`$/,
    'should throw if given a non-node child in children'
  );

  t.doesNotThrow(
    function () {
      assert({type: 'paragraph', children: [{type: 'text', value: 'alpha'}]});
    },
    'should not throw on vald children'
  );

  t.throws(
    function () {
      assert({type: 'paragraph', children: [{
        type: 'bar',
        children: ['one']
      }]});
    },
    /^AssertionError: node should be an object: `'one'` in `{ type: 'bar', children: \[ 'one' \] }`$/,
    'should throw on invalid descendants'
  );

  t.end();
});
