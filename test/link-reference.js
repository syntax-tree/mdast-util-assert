import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from 'mdast-util-assert'

test('assert(linkReference)', async function (t) {
  await t.test(
    'should throw if `linkReference` has no children',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'linkReference'})
      }, /parent should have `children`: `{ type: 'linkReference' }`$/)
    }
  )

  await t.test(
    'should throw if `linkReference` has no `identifier`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'linkReference', children: []})
      }, /`identifier` must be `string`: `{ type: 'linkReference', children: \[] }`$/)
    }
  )

  await t.test(
    'should throw if `identifier` is not a `string`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'linkReference', identifier: 1, children: []})
      }, /`identifier` must be `string`: `{ type: 'linkReference', identifier: 1, children: \[] }`$/)
    }
  )

  await t.test(
    'should not throw if `linkReference` has no other properties',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'linkReference', identifier: '1', children: []})
      })
    }
  )

  await t.test(
    'should throw if `referenceType` is not a `string`',
    async function () {
      nodeAssert.throws(function () {
        assert({
          type: 'linkReference',
          identifier: '1',
          referenceType: 1,
          children: []
        })
      }, /`referenceType` must be `shortcut`, `collapsed`, or `full`/)
    }
  )

  await t.test(
    'should not throw if `referenceType` is valid',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({
          type: 'linkReference',
          identifier: '1',
          referenceType: 'collapsed',
          children: []
        })
      })
    }
  )

  await t.test('should throw if `label` is not a `string`', async function () {
    nodeAssert.throws(function () {
      assert({type: 'linkReference', identifier: '1', children: [], label: 1})
    }, /`label` must be `string`: `{ type: 'linkReference', identifier: '1', children: \[], label: 1 }`$/)
  })
})
