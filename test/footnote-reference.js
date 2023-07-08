import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from 'mdast-util-assert'

test('assert(footnoteReference)', async function (t) {
  await t.test(
    'should throw if `footnoteReference` has no `identifier`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'footnoteReference'})
      }, /`identifier` must be `string`: `{ type: 'footnoteReference' }`$/)
    }
  )

  await t.test(
    'should throw if `identifier` is not a `string`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'footnoteReference', identifier: 1})
      }, /`identifier` must be `string`: `{ type: 'footnoteReference', identifier: 1 }`$/)
    }
  )

  await t.test(
    'should not throw if `footnoteReference` has no other properties',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'footnoteReference', identifier: '1'})
      })
    }
  )

  await t.test('should throw if `label` is not a `string`', async function () {
    nodeAssert.throws(function () {
      assert({type: 'footnoteReference', identifier: '1', label: 1})
    }, /`label` must be `string`: `{ type: 'footnoteReference', identifier: '1', label: 1 }`$/)
  })
})
