/**
 * @typedef {import('unist-util-assert').AssertionError} AssertionError
 *
 * @typedef {import('unist').Parent} UnistParent
 *
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Nodes} Nodes
 * @typedef {import('mdast').Parents} Parents
 * @typedef {import('mdast').Literals} Literals
 * @typedef {import('mdast').List} List
 * @typedef {import('mdast').ListItem} ListItem
 * @typedef {import('mdast').Heading} Heading
 * @typedef {import('mdast').Code} Code
 * @typedef {import('mdast').FootnoteDefinition} FootnoteDefinition
 * @typedef {import('mdast').Definition} Definition
 * @typedef {import('mdast').Link} Link
 * @typedef {import('mdast').Image} Image
 * @typedef {import('mdast').LinkReference} LinkReference
 * @typedef {import('mdast').ImageReference} ImageReference
 * @typedef {import('mdast').FootnoteReference} FootnoteReference
 * @typedef {import('mdast').Table} Table
 */

import nodeAssert from 'node:assert'
import {zwitch} from 'zwitch'
import {mapz} from 'mapz'
import {
  assert as unistAssert,
  parent as unistParent,
  literal as unistLiteral,
  wrap,
  _void
} from 'unist-util-assert'

/**
 * Assert that `tree` is a valid mdast node.
 *
 * If `tree` is a parent, all children will be asserted too.
 *
 * Supports unknown mdast nodes.
 *
 * @param {unknown} [tree]
 *   Thing to assert.
 * @param {UnistParent | null | undefined} [parent]
 *   Optional, valid parent.
 * @returns {asserts tree is Nodes}
 *   Nothing.
 * @throws {AssertionError}
 *   When `tree` (or its descendants) is not an mdast node.
 */
export function assert(tree, parent) {
  return wrap(mdast)(tree, parent)
}

/**
 * Assert that `tree` is a valid mdast parent.
 *
 * All children will be asserted too.
 *
 * Supports unknown mdast nodes.
 *
 * @param {unknown} [tree]
 *   Thing to assert.
 * @param {UnistParent | null | undefined} [parent]
 *   Optional, valid parent.
 * @returns {asserts tree is Parents}
 *   Nothing.
 * @throws {AssertionError}
 *   When `tree` is not a parent or its descendants are not nodes.
 */
export function parent(tree, parent) {
  return wrap(assertParent)(tree, parent)
}

/**
 * Assert that `node` is a valid mdast literal.
 *
 * Supports unknown mdast nodes.
 *
 * @param {unknown} [node]
 *   Thing to assert.
 * @param {UnistParent | null | undefined} [parent]
 *   Optional, valid parent.
 * @returns {asserts node is Literals}
 *   Nothing.
 * @throws {AssertionError}
 *   When `node` is not an mdast literal.
 */
export function literal(node, parent) {
  return wrap(assertLiteral)(node, parent)
}

// Construct.
const mdast = zwitch('type', {
  // Core interface.
  unknown,
  invalid: unknown,
  // Per-type handling.
  handlers: {
    root: wrap(root),
    paragraph: parent,
    blockquote: parent,
    tableRow: parent,
    tableCell: parent,
    strong: parent,
    emphasis: parent,
    delete: parent,
    listItem: wrap(listItem),
    footnote: parent,
    heading: wrap(heading),
    text: literal,
    inlineCode: literal,
    yaml: literal,
    toml: literal,
    code: wrap(code),
    thematicBreak: _void,
    break: _void,
    list: wrap(list),
    footnoteDefinition: wrap(footnoteDefinition),
    definition: wrap(definition),
    link: wrap(link),
    image: wrap(image),
    linkReference: wrap(linkReference),
    imageReference: wrap(imageReference),
    footnoteReference: wrap(footnoteReference),
    table: wrap(table),
    html: literal
  }
})

const all = mapz(mdast, {key: 'children'})

/**
 * Assert that `node` (which is not a known mdast node) is a valid unist node.
 *
 * @param {unknown} [node]
 *   Thing to assert.
 * @param {UnistParent | null | undefined} [parent]
 *   Optional, valid parent.
 * @returns {asserts node is Nodes}
 *   Nothing.
 * @throws {AssertionError}
 *   When `node` is not a unist node.
 */
function unknown(node, parent) {
  unistAssert(node, parent)
}

/**
 * Assert that `tree` is a valid mdast parent, with valid children.
 *
 * All children will be asserted too.
 *
 * Supports unknown mdast nodes.
 *
 * @param {unknown} [tree]
 *   Thing to assert.
 * @returns {asserts tree is Parents}
 *   Nothing.
 * @throws {AssertionError}
 *   When `tree` is not a parent or its descendants are not nodes.
 */
function assertParent(tree) {
  unistParent(tree)
  all(tree)
}

/**
 * Assert that `node` is a valid mdast literal.
 *
 * Supports unknown mdast nodes.
 *
 * @param {unknown} [node]
 *   Thing to assert.
 * @returns {asserts node is Literals}
 *   Nothing.
 * @throws {AssertionError}
 *   When `node` is not an mdast literal.
 */
function assertLiteral(node) {
  unistLiteral(node)
  nodeAssert(
    // `value` in unist literals is `any`.
    // type-coverage:ignore-next-line
    typeof node.value === 'string',
    'literal should have a string `value`'
  )
}

/**
 * Assert that `tree` is an mdast root with valid children.
 *
 * Supports unknown mdast descendants.
 *
 * @param {unknown} [tree]
 *   Thing to assert.
 * @param {UnistParent | null | undefined} [parent]
 *   Optional, valid parent.
 * @returns {asserts tree is Root}
 *   Nothing.
 * @throws {AssertionError}
 *   When `tree` is not a root or its descendants are not valid.
 */
function root(tree, parent) {
  assertParent(tree)
  nodeAssert(parent === undefined, '`root` should not have a parent')
}

/**
 * Assert that `tree` is an mdast list with valid children.
 *
 * Supports unknown mdast descendants.
 *
 * @param {unknown} [tree]
 *   Thing to assert.
 * @returns {asserts tree is List}
 *   Nothing.
 * @throws {AssertionError}
 *   When `tree` is not a list or its descendants are not valid.
 */
function list(tree) {
  assertParent(tree)
  indexable(tree)

  if (tree.spread != null) {
    nodeAssert(typeof tree.spread === 'boolean', '`spread` must be `boolean`')
  }

  if (tree.ordered != null) {
    nodeAssert(typeof tree.ordered === 'boolean', '`ordered` must be `boolean`')
  }

  if (!tree.ordered) {
    nodeAssert(tree.start == null, 'unordered lists must not have `start`')
  } else if (tree.start != null) {
    nodeAssert(
      typeof tree.start === 'number',
      'ordered lists must have `start`'
    )
    nodeAssert(tree.start >= 0, '`start` must be gte `0`')
  }
}

/**
 * Assert that `tree` is an mdast list item with valid children.
 *
 * Supports unknown mdast descendants.
 *
 * @param {unknown} [tree]
 *   Thing to assert.
 * @returns {asserts tree is ListItem}
 *   Nothing.
 * @throws {AssertionError}
 *   When `tree` is not a list item or its descendants are not valid.
 */
function listItem(tree) {
  assertParent(tree)
  indexable(tree)

  if (tree.spread != null) {
    nodeAssert(typeof tree.spread === 'boolean', '`spread` must be `boolean`')
  }

  if (tree.checked != null) {
    nodeAssert(typeof tree.checked === 'boolean', '`checked` must be `boolean`')
  }
}

/**
 * Assert that `tree` is an mdast heading with valid children.
 *
 * Supports unknown mdast descendants.
 *
 * @param {unknown} [tree]
 *   Thing to assert.
 * @returns {asserts tree is Heading}
 *   Nothing.
 * @throws {AssertionError}
 *   When `tree` is not a heading or its descendants are not valid.
 */
function heading(tree) {
  assertParent(tree)
  indexable(tree)

  nodeAssert(typeof tree.depth === 'number', '`depth` should be a number')
  nodeAssert(tree.depth > 0, '`depth` should be gte `1`')
  nodeAssert(tree.depth <= 6, '`depth` should be lte `6`')
}

/**
 * Assert that `node` is an mdast code node.
 *
 * @param {unknown} [node]
 *   Thing to assert.
 * @returns {asserts tree is Code}
 *   Nothing.
 * @throws {AssertionError}
 *   When `node` is not a code.
 */
function code(node) {
  assertLiteral(node)
  indexable(node)

  if (node.lang != null) {
    nodeAssert(typeof node.lang === 'string', '`lang` must be `string`')
  }

  if (node.meta != null) {
    nodeAssert(node.lang != null, 'code with `meta` must also have `lang`')
    nodeAssert(typeof node.meta === 'string', '`meta` must be `string`')
  }
}

/**
 * Assert that `tree` is an mdast footnote definition with valid children.
 *
 * Supports unknown mdast descendants.
 *
 * @param {unknown} [tree]
 *   Thing to assert.
 * @returns {asserts tree is FootnoteDefinition}
 *   Nothing.
 * @throws {AssertionError}
 *   When `tree` is not a footnote definition or its descendants are not valid.
 */
function footnoteDefinition(tree) {
  assertParent(tree)
  indexable(tree)

  nodeAssert(
    typeof tree.identifier === 'string',
    '`footnoteDefinition` must have `identifier`'
  )

  if (tree.label != null) {
    nodeAssert(typeof tree.label === 'string', '`label` must be `string`')
  }
}

/**
 * Assert that `node` is an mdast definition.
 *
 * @param {unknown} [node]
 *   Thing to assert.
 * @returns {asserts tree is Definition}
 *   Nothing.
 * @throws {AssertionError}
 *   When `node` is not a definition.
 */
function definition(node) {
  _void(node)
  indexable(node)

  nodeAssert(
    typeof node.identifier === 'string',
    '`identifier` must be `string`'
  )

  if (node.label != null) {
    nodeAssert(typeof node.label === 'string', '`label` must be `string`')
  }

  nodeAssert(typeof node.url === 'string', '`url` must be `string`')

  if (node.title != null) {
    nodeAssert(typeof node.title === 'string', '`title` must be `string`')
  }
}

/**
 * Assert that `tree` is an mdast link with valid children.
 *
 * Supports unknown mdast descendants.
 *
 * @param {unknown} [tree]
 *   Thing to assert.
 * @returns {asserts tree is Link}
 *   Nothing.
 * @throws {AssertionError}
 *   When `tree` is not a link or its descendants are not valid.
 */
function link(tree) {
  assertParent(tree)
  indexable(tree)

  nodeAssert(typeof tree.url === 'string', '`url` must be `string`')

  if (tree.title != null) {
    nodeAssert(typeof tree.title === 'string', '`title` must be `string`')
  }
}

/**
 * Assert that `node` is an mdast image.
 *
 * @param {unknown} [node]
 *   Thing to assert.
 * @returns {asserts tree is Image}
 *   Nothing.
 * @throws {AssertionError}
 *   When `node` is not an image.
 */
function image(node) {
  _void(node)
  indexable(node)

  nodeAssert(typeof node.url === 'string', '`url` must be `string`')

  if (node.title != null) {
    nodeAssert(typeof node.title === 'string', '`title` must be `string`')
  }

  if (node.alt != null) {
    nodeAssert(typeof node.alt === 'string', '`alt` must be `string`')
  }
}

/**
 * Assert that `tree` is an mdast link reference with valid children.
 *
 * Supports unknown mdast descendants.
 *
 * @param {unknown} [tree]
 *   Thing to assert.
 * @returns {asserts tree is LinkReference}
 *   Nothing.
 * @throws {AssertionError}
 *   When `tree` is not a link reference or its descendants are not valid.
 */
function linkReference(tree) {
  assertParent(tree)
  indexable(tree)

  nodeAssert(
    typeof tree.identifier === 'string',
    '`identifier` must be `string`'
  )

  if (tree.label != null) {
    nodeAssert(typeof tree.label === 'string', '`label` must be `string`')
  }

  if (tree.referenceType != null) {
    nodeAssert(
      typeof tree.referenceType === 'string',
      '`referenceType` must be `shortcut`, `collapsed`, or `full`'
    )
    nodeAssert(
      ['shortcut', 'collapsed', 'full'].includes(tree.referenceType),
      '`referenceType` must be `shortcut`, `collapsed`, or `full`'
    )
  }
}

/**
 * Assert that `node` is an mdast image reference.
 *
 * @param {unknown} [node]
 *   Thing to assert.
 * @returns {asserts tree is ImageReference}
 *   Nothing.
 * @throws {AssertionError}
 *   When `node` is not an image reference.
 */
function imageReference(node) {
  _void(node)
  indexable(node)

  nodeAssert(
    typeof node.identifier === 'string',
    '`identifier` must be `string`'
  )

  if (node.label != null) {
    nodeAssert(typeof node.label === 'string', '`label` must be `string`')
  }

  if (node.alt != null) {
    nodeAssert(typeof node.alt === 'string', '`alt` must be `string`')
  }

  if (node.referenceType != null) {
    nodeAssert(
      typeof node.referenceType === 'string',
      '`referenceType` must be `shortcut`, `collapsed`, or `full`'
    )
    nodeAssert(
      ['shortcut', 'collapsed', 'full'].includes(node.referenceType),
      '`referenceType` must be `shortcut`, `collapsed`, or `full`'
    )
  }
}

/**
 * Assert that `node` is an mdast footnote reference.
 *
 * @param {unknown} [node]
 *   Thing to assert.
 * @returns {asserts tree is FootnoteReference}
 *   Nothing.
 * @throws {AssertionError}
 *   When `node` is not a footnote reference.
 */
function footnoteReference(node) {
  _void(node)
  indexable(node)

  nodeAssert(
    typeof node.identifier === 'string',
    '`identifier` must be `string`'
  )

  if (node.label != null) {
    nodeAssert(typeof node.label === 'string', '`label` must be `string`')
  }
}

/**
 * Assert that `tree` is an mdast table with valid children.
 *
 * Supports unknown mdast descendants.
 *
 * @param {unknown} [tree]
 *   Thing to assert.
 * @returns {asserts tree is Table}
 *   Nothing.
 * @throws {AssertionError}
 *   When `tree` is not a table or its descendants are not valid.
 */
function table(tree) {
  assertParent(tree)
  indexable(tree)

  if (tree.align != null) {
    nodeAssert(isArrayUnknown(tree.align), '`align` must be `array`')
    let index = -1

    while (++index < tree.align.length) {
      const value = tree.align[index]

      if (value != null) {
        nodeAssert(
          typeof value === 'string',
          "each align in table must be `null, 'left', 'right', 'center'`"
        )
        nodeAssert(
          ['left', 'right', 'center'].includes(value),
          "each align in table must be `null, 'left', 'right', 'center'`"
        )
      }
    }
  }
}

/**
 * TypeScript helper to check if something is indexable (any object is
 * indexable in JavaScript).
 *
 * @param {unknown} value
 *   Thing to check.
 * @returns {asserts value is Record<string, unknown>}
 *   Nothing.
 * @throws {Error}
 *   When `value` is not an object.
 */
function indexable(value) {
  // Always called when something is an object, this is just for TS.
  /* c8 ignore next 3 */
  if (!value || typeof value !== 'object') {
    throw new Error('Expected object')
  }
}

/**
 * TypeScript type guard to check if something is an array.
 *
 * @param {unknown} value
 *   Thing to check.
 * @returns {value is Array<unknown>}
 *   Whether `value` is an array.
 */
function isArrayUnknown(value) {
  return Array.isArray(value)
}

export {_void, wrap} from 'unist-util-assert'
