import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('assert(listItem)', async function (t) {
  await t.test(
    'should throw if a `listItem` is not a parent',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'listItem'})
      }, /parent should have `children`: `{ type: 'listItem' }`$/)
    }
  )

  await t.test(
    'should not throw for a listItem without extra properties',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'listItem', children: []})
      })
    }
  )

  await t.test(
    'should throw if `spread` is not a `boolean`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'listItem', spread: 1, children: []})
      }, /`spread` must be `boolean`: `{ type: 'listItem', spread: 1, children: \[] }`$/)
    }
  )

  await t.test(
    'should not throw if `spread` is a `boolean`',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'listItem', spread: false, children: []})
      })
    }
  )

  await t.test(
    'should throw if a `checked` is not a `boolean`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'listItem', checked: 'yup', children: []})
      }, /`checked` must be `boolean`: `{ type: 'listItem', checked: 'yup', children: \[] }`$/)
    }
  )

  await t.test(
    'should not throw if `checked` is a `boolean`',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'listItem', checked: true, children: []})
      })
    }
  )
})
