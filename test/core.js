import nodeAssert from 'node:assert/strict'
import test from 'node:test'

test('assert', async function (t) {
  await t.test('should expose the public api', async function () {
    nodeAssert.deepEqual(
      Object.keys(await import('mdast-util-assert')).sort(),
      ['_void', 'assert', 'literal', 'parent', 'wrap']
    )
  })
})
