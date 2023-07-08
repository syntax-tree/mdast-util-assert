import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from 'mdast-util-assert'

test('assert(link)', async function (t) {
  await t.test('should throw if `link` is not a parent', async function () {
    nodeAssert.throws(function () {
      assert({type: 'link'})
    }, /parent should have `children`: `{ type: 'link' }`$/)
  })

  await t.test('should throw without `url`', async function () {
    nodeAssert.throws(function () {
      assert({type: 'link', children: []})
    }, /`url` must be `string`: `{ type: 'link', children: \[] }`$/)
  })

  await t.test('should throw if `url` is not a `string`', async function () {
    nodeAssert.throws(function () {
      assert({type: 'link', children: [], url: 1})
    }, /`url` must be `string`: `{ type: 'link', children: \[], url: 1 }`$/)
  })

  await t.test(
    'should not throw if `link` has no other properties',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'link', children: [], url: '1'})
      })
    }
  )

  await t.test('should throw if `title` is not a `string`', async function () {
    nodeAssert.throws(function () {
      assert({type: 'link', children: [], url: '1', title: 1})
    }, /`title` must be `string`: `{ type: 'link', children: \[], url: '1', title: 1 }`$/)
  })
})
