/**
 * @typedef {Parent['children'][number]|Root} Node
 * @typedef {import('mdast').Parent} Parent
 * @typedef {import('mdast').Literal} Literal
 * @typedef {import('mdast').Root} Root
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
 * Assert that `node` is a valid mdast node.
 * If `node` is a parent, all children will be asserted too.
 *
 * @param {unknown} [node]
 * @param {Parent} [parent]
 * @returns {asserts node is Node}
 */
export function assert(node, parent) {
  return wrap(mdast)(node, parent)
}

/**
 * Assert that `node` is a valid mdast parent.
 *
 * @param {unknown} [node]
 * @param {Parent} [parent]
 * @returns {asserts node is Parent}
 */
export function parent(node, parent) {
  return wrap(assertParent)(node, parent)
}

/**
 * Assert that `node` is a valid mdast literal.
 *
 * @param {unknown} [node]
 * @param {Parent} [parent]
 * @returns {asserts node is Literal}
 */
export function literal(node, parent) {
  return wrap(assertLiteral)(node, parent)
}

export {_void, wrap}

// Construct.
const mdast = zwitch('type', {
  // Core interface.
  // @ts-expect-error: fine.
  unknown,
  // @ts-expect-error: fine.
  invalid: unknown,
  // Per-type handling.
  handlers: {
    // @ts-expect-error: fine.
    root: wrap(root),
    // @ts-expect-error: fine.
    paragraph: parent,
    // @ts-expect-error: fine.
    blockquote: parent,
    // @ts-expect-error: fine.
    tableRow: parent,
    // @ts-expect-error: fine.
    tableCell: parent,
    // @ts-expect-error: fine.
    strong: parent,
    // @ts-expect-error: fine.
    emphasis: parent,
    // @ts-expect-error: fine.
    delete: parent,
    // @ts-expect-error: fine.
    listItem: wrap(listItem),
    // @ts-expect-error: fine.
    footnote: parent,
    // @ts-expect-error: fine.
    heading: wrap(heading),
    // @ts-expect-error: fine.
    text: literal,
    // @ts-expect-error: fine.
    inlineCode: literal,
    // @ts-expect-error: fine.
    yaml: literal,
    // @ts-expect-error: fine.
    toml: literal,
    // @ts-expect-error: fine.
    code: wrap(code),
    // @ts-expect-error: fine.
    thematicBreak: _void,
    // @ts-expect-error: fine.
    break: _void,
    // @ts-expect-error: fine.
    list: wrap(list),
    // @ts-expect-error: fine.
    footnoteDefinition: wrap(footnoteDefinition),
    // @ts-expect-error: fine.
    definition: wrap(definition),
    // @ts-expect-error: fine.
    link: wrap(link),
    // @ts-expect-error: fine.
    image: wrap(image),
    // @ts-expect-error: fine.
    linkReference: wrap(linkReference),
    // @ts-expect-error: fine.
    imageReference: wrap(imageReference),
    // @ts-expect-error: fine.
    footnoteReference: wrap(footnoteReference),
    // @ts-expect-error: fine.
    table: wrap(table),
    // @ts-expect-error: fine.
    html: literal
  }
})

const all = mapz(mdast, {key: 'children'})

/**
 * @param {unknown} node
 * @param {Parent} [ancestor]
 * @returns {asserts node is Node}
 */
function unknown(node, ancestor) {
  unistAssert(node, ancestor)
}

/**
 * @param {unknown} node
 * @returns {asserts node is Parent}
 */
function assertParent(node) {
  unistParent(node)
  all(node)
}

/**
 * @param {unknown} node
 * @returns {asserts node is Literal}
 */
function assertLiteral(node) {
  unistLiteral(node)
  nodeAssert(
    typeof node.value === 'string',
    'literal should have a string `value`'
  )
}

/**
 * @param {unknown} node
 * @param {Parent} ancestor
 * @returns {asserts node is Root}
 */
function root(node, ancestor) {
  parent(node)

  nodeAssert(ancestor === undefined, '`root` should not have a parent')
}

/**
 * @param {unknown} node
 * @returns {asserts node is List}
 */
function list(node) {
  parent(node)
  indexable(node)

  if (node.spread != null) {
    nodeAssert(typeof node.spread === 'boolean', '`spread` must be `boolean`')
  }

  if (node.ordered != null) {
    nodeAssert(typeof node.ordered === 'boolean', '`ordered` must be `boolean`')
  }

  if (!node.ordered) {
    nodeAssert(node.start == null, 'unordered lists must not have `start`')
  } else if (node.start != null) {
    nodeAssert(
      typeof node.start === 'number',
      'ordered lists must have `start`'
    )
    nodeAssert(node.start >= 0, '`start` must be gte `0`')
  }
}

/**
 * @param {unknown} node
 * @returns {asserts node is ListItem}
 */
function listItem(node) {
  parent(node)
  indexable(node)

  if (node.spread != null) {
    nodeAssert(typeof node.spread === 'boolean', '`spread` must be `boolean`')
  }

  if (node.checked != null) {
    nodeAssert(typeof node.checked === 'boolean', '`checked` must be `boolean`')
  }
}

/**
 * @param {unknown} node
 * @returns {asserts node is Heading}
 */
function heading(node) {
  parent(node)
  indexable(node)

  nodeAssert(typeof node.depth === 'number', '`depth` should be a number')
  nodeAssert(node.depth > 0, '`depth` should be gte `1`')
  nodeAssert(node.depth <= 6, '`depth` should be lte `6`')
}

/**
 * @param {unknown} node
 * @returns {asserts node is Code}
 */
function code(node) {
  literal(node)
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
 * @param {unknown} node
 * @returns {asserts node is FootnoteDefinition}
 */
function footnoteDefinition(node) {
  parent(node)
  indexable(node)

  nodeAssert(
    typeof node.identifier === 'string',
    '`footnoteDefinition` must have `identifier`'
  )

  if (node.label != null) {
    nodeAssert(typeof node.label === 'string', '`label` must be `string`')
  }
}

/**
 * @param {unknown} node
 * @returns {asserts node is Definition}
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
 * @param {unknown} node
 * @returns {asserts node is Link}
 */
function link(node) {
  parent(node)
  indexable(node)

  nodeAssert(typeof node.url === 'string', '`url` must be `string`')

  if (node.title != null) {
    nodeAssert(typeof node.title === 'string', '`title` must be `string`')
  }
}

/**
 * @param {unknown} node
 * @returns {asserts node is Image}
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
 * @param {unknown} node
 * @returns {asserts node is LinkReference}
 */
function linkReference(node) {
  parent(node)
  indexable(node)

  nodeAssert(
    typeof node.identifier === 'string',
    '`identifier` must be `string`'
  )

  if (node.label != null) {
    nodeAssert(typeof node.label === 'string', '`label` must be `string`')
  }

  if (node.referenceType != null) {
    nodeAssert(
      // @ts-expect-error Check if it’s a string.
      ['shortcut', 'collapsed', 'full'].includes(node.referenceType),
      '`referenceType` must be `shortcut`, `collapsed`, or `full`'
    )
  }
}

/**
 * @param {unknown} node
 * @returns {asserts node is ImageReference}
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
      // @ts-expect-error Check if it’s a string.
      ['shortcut', 'collapsed', 'full'].includes(node.referenceType),
      '`referenceType` must be `shortcut`, `collapsed`, or `full`'
    )
  }
}

/**
 * @param {unknown} node
 * @returns {asserts node is FootnoteReference}
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
 * @param {unknown} node
 * @returns {asserts node is Table}
 */
function table(node) {
  let index = -1

  parent(node)
  indexable(node)

  if (node.align != null) {
    nodeAssert(Array.isArray(node.align), '`align` must be `array`')
    /** @type {Array.<unknown>} */
    const align = node.align // type-coverage:ignore-line

    while (++index < align.length) {
      const value = align[index]

      if (value != null) {
        nodeAssert(
          // @ts-expect-error Check if it’s a string.
          ['left', 'right', 'center'].includes(value),
          "each align in table must be `null, 'left', 'right', 'center'`"
        )
      }
    }
  }
}

/**
 * @param {unknown} value
 * @returns {asserts value is Record<string, unknown>}
 */
function indexable(value) {
  // Always called when something is an object, this is just for TS.
  /* c8 ignore next 3 */
  if (!value || typeof value !== 'object') {
    throw new Error('Expected object')
  }
}
