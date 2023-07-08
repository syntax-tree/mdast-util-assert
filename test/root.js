import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('assert(root)', async function (t) {
  await t.test('should throw if a `root` is not a parent', async function () {
    nodeAssert.throws(function () {
      assert({type: 'root'})
    }, /parent should have `children`: `{ type: 'root' }`$/)
  })

  await t.test('should throw if a `root` has a parent', async function () {
    nodeAssert.throws(function () {
      assert({type: 'paragraph', children: [{type: 'root', children: []}]})
    }, /`root` should not have a parent: `{ type: 'root', children: \[] }`/)
  })
})
