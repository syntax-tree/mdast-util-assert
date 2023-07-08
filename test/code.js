import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('assert(code)', async function (t) {
  await t.test('should throw if `code` is not a text', async function () {
    nodeAssert.throws(function () {
      assert({type: 'code'})
    }, /literal should have `value`: `{ type: 'code' }`$/)
  })
  await t.test('', async function () {
    nodeAssert.doesNotThrow(function () {
      assert({
        type: 'code',
        value: 'should not throw if `code` has no extra properties'
      })
    })
  })

  await t.test('should throw if `lang` is not a string', async function () {
    nodeAssert.throws(function () {
      assert({type: 'code', lang: 0, value: ''})
    }, /`lang` must be `string`: `{ type: 'code', lang: 0, value: '' }`$/)
  })

  await t.test('should throw if `meta` is not a string', async function () {
    nodeAssert.throws(function () {
      assert({type: 'code', lang: 'js', meta: 1, value: ''})
    }, /`meta` must be `string`: `{ type: 'code', lang: 'js', meta: 1, value: '' }`$/)
  })

  await t.test(
    'should throw if `meta` is defined but not `lang`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'code', meta: '', value: ''})
      }, /code with `meta` must also have `lang`: `{ type: 'code', meta: '', value: '' }`$/)
    }
  )
})
