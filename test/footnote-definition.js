import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('assert(footnoteDefinition)', async function (t) {
  await t.test(
    'should throw if `footnoteDefinition` is not a parent',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'footnoteDefinition'})
      }, /parent should have `children`: `{ type: 'footnoteDefinition' }`$/)
    }
  )

  await t.test(
    'should throw if `footnoteDefinition` has no identifier',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'footnoteDefinition', children: []})
      }, /`footnoteDefinition` must have `identifier`: `{ type: 'footnoteDefinition', children: \[] }`$/)
    }
  )

  await t.test(
    'should throw if `identifier` is not a `string`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'footnoteDefinition', identifier: 1, children: []})
      }, /`footnoteDefinition` must have `identifier`: `{ type: 'footnoteDefinition', identifier: 1, children: \[] }`$/)
    }
  )

  await t.test(
    'should not throw if `footnoteDefinition` has an identifier',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'footnoteDefinition', identifier: '1', children: []})
      })
    }
  )

  await t.test('should throw if `label` is not a `string`', async function () {
    nodeAssert.throws(function () {
      assert({
        type: 'footnoteDefinition',
        identifier: '1',
        label: 1,
        children: []
      })
    }, /`label` must be `string`: `{ type: 'footnoteDefinition',\s+identifier: '1',\s+label: 1,\s+children: \[] }`$/)
  })
})
