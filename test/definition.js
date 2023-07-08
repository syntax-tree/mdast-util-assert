import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('assert(definition)', async function (t) {
  await t.test(
    'should throw if `definition` has no `identifier`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'definition'})
      }, /`identifier` must be `string`: `{ type: 'definition' }`$/)
    }
  )

  await t.test('should throw if `definition` has no `url`', async function () {
    nodeAssert.throws(function () {
      assert({type: 'definition', identifier: '1'})
    }, /`url` must be `string`: `{ type: 'definition', identifier: '1' }`$/)
  })

  await t.test(
    'should throw if `identifier` is not a `string`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'definition', identifier: 1})
      }, /`identifier` must be `string`: `{ type: 'definition', identifier: 1 }`$/)
    }
  )

  await t.test('should throw if `url` is not a `string`', async function () {
    nodeAssert.throws(function () {
      assert({type: 'definition', url: 1})
    }, /`identifier` must be `string`: `{ type: 'definition', url: 1 }`$/)
  })

  await t.test(
    'should not throw if `definition` has no other properties',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'definition', identifier: '1', url: '1'})
      })
    }
  )

  await t.test('should throw if `title` is not a `string`', async function () {
    nodeAssert.throws(function () {
      assert({type: 'definition', identifier: '1', url: '1', title: 1})
    }, /`title` must be `string`: `{ type: 'definition', identifier: '1', url: '1', title: 1 }`$/)
  })

  await t.test('should throw if `label` is not a `string`', async function () {
    nodeAssert.throws(function () {
      assert({type: 'definition', identifier: '1', url: '1', label: 1})
    }, /`label` must be `string`: `{ type: 'definition', identifier: '1', url: '1', label: 1 }`$/)
  })
})
