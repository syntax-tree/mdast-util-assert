import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('assert(list)', async function (t) {
  await t.test('should throw if a `list` is not a parent', async function () {
    nodeAssert.throws(function () {
      assert({type: 'list'})
    }, /parent should have `children`: `{ type: 'list' }`$/)
  })

  await t.test(
    'should not throw for a list without extra properties',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'list', children: []})
      })
    }
  )

  await t.test(
    'should throw if `spread` is not a `boolean`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'list', spread: 1, children: []})
      }, /`spread` must be `boolean`: `{ type: 'list', spread: 1, children: \[] }`$/)
    }
  )

  await t.test(
    'should not throw if `spread` is a `boolean`',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'list', spread: false, children: []})
      })
    }
  )

  await t.test(
    'should throw if a `ordered` is not a `boolean`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'list', ordered: 'yup', children: []})
      }, /`ordered` must be `boolean`: `{ type: 'list', ordered: 'yup', children: \[] }`$/)
    }
  )

  await t.test(
    'should not throw if `ordered` is a `boolean`',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'list', ordered: true, children: []})
      })
    }
  )

  await t.test(
    'should throw if an `ordered: false` list has a `start`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'list', ordered: false, start: 1, children: []})
      }, /unordered lists must not have `start`: `{ type: 'list', ordered: false, start: 1, children: \[] }`$/)
    }
  )

  await t.test(
    'should throw if an `ordered` list has a non-numeric `start`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'list', ordered: true, start: false, children: []})
      }, /ordered lists must have `start`: `{ type: 'list', ordered: true, start: false, children: \[] }`$/)
    }
  )

  await t.test(
    'should throw if an `ordered` list has a negative `start`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'list', ordered: true, start: -1, children: []})
      }, /`start` must be gte `0`: `{ type: 'list', ordered: true, start: -1, children: \[] }`$/)
    }
  )

  await t.test(
    'should not throw if an `ordered` list has a zero `start`',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'list', ordered: true, start: 0, children: []})
      })
    }
  )

  await t.test(
    'should not throw if an `ordered` list has a positive `start`',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'list', ordered: true, start: 5, children: []})
      })
    }
  )
})
