import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import * as mod from '../index.js'

/* eslint-disable import/no-unassigned-import */
import './node.js'
import './children.js'
import './root.js'
import './list.js'
import './list-item.js'
import './code.js'
import './definition.js'
import './footnote-definition.js'
import './heading.js'
import './link.js'
import './image.js'
import './link-reference.js'
import './image-reference.js'
import './footnote-reference.js'
import './table.js'
/* eslint-enable import/no-unassigned-import */

test('assert', () => {
  nodeAssert.deepEqual(
    Object.keys(mod).sort(),
    ['_void', 'assert', 'literal', 'parent', 'wrap'],
    'should expose the public api'
  )
})
