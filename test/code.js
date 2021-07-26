import test from 'tape'
import {assert} from '../index.js'

test('assert(code)', (t) => {
  t.throws(
    () => {
      assert({type: 'code'})
    },
    /literal should have `value`: `{ type: 'code' }`$/,
    'should throw if `code` is not a text'
  )

  t.doesNotThrow(() => {
    assert({type: 'code', value: ''})
  }, 'should not throw if `code` has no extra properties')

  t.throws(
    () => {
      assert({type: 'code', lang: 0, value: ''})
    },
    /`lang` must be `string`: `{ type: 'code', lang: 0, value: '' }`$/,
    'should throw if `lang` is not a string'
  )

  t.throws(
    () => {
      assert({type: 'code', lang: 'js', meta: 1, value: ''})
    },
    /`meta` must be `string`: `{ type: 'code', lang: 'js', meta: 1, value: '' }`$/,
    'should throw if `meta` is not a string'
  )

  t.throws(
    () => {
      assert({type: 'code', meta: '', value: ''})
    },
    /code with `meta` must also have `lang`: `{ type: 'code', meta: '', value: '' }`$/,
    'should throw if `meta` is defined but not `lang`'
  )

  t.end()
})
