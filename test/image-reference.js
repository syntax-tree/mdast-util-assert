import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from 'mdast-util-assert'

test('assert(imageReference)', async function (t) {
  await t.test(
    'should throw if `imageReference` has no `identifier`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'imageReference'})
      }, /`identifier` must be `string`: `{ type: 'imageReference' }`$/)
    }
  )

  await t.test(
    'should throw if `identifier` is not a `string`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'imageReference', identifier: 1})
      }, /`identifier` must be `string`: `{ type: 'imageReference', identifier: 1 }`$/)
    }
  )

  await t.test(
    'should not throw if `imageReference` has no other properties',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'imageReference', identifier: '1'})
      })
    }
  )

  await t.test('should throw if `alt` is not a `string`', async function () {
    nodeAssert.throws(function () {
      assert({type: 'imageReference', identifier: '1', alt: 1})
    }, /`alt` must be `string`: `{ type: 'imageReference', identifier: '1', alt: 1 }`$/)
  })

  await t.test(
    'should throw if `referenceType` is not a `string`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'imageReference', identifier: '1', referenceType: 1})
      }, /`referenceType` must be `shortcut`, `collapsed`, or `full`: `{ type: 'imageReference', identifier: '1', referenceType: 1 }`$/)
    }
  )

  await t.test(
    'should not throw if `referenceType` is valid',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({
          type: 'imageReference',
          identifier: '1',
          referenceType: 'collapsed'
        })
      })
    }
  )

  await t.test('should throw if `label` is not a `string`', async function () {
    nodeAssert.throws(function () {
      assert({type: 'imageReference', identifier: '1', label: 1})
    }, /`label` must be `string`: `{ type: 'imageReference', identifier: '1', label: 1 }`$/)
  })
})
