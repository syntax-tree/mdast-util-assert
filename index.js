/**
 * @typedef {import('unist').Node} UnistNode
 * @typedef {import('unist').Parent} UnistParent
 * @typedef {import('unist').Literal} UnistLiteral
 *
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Content} Content
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

/**
 * @typedef {Root | Content} Node
 * @typedef {Extract<Node, UnistParent>} Parent
 * @typedef {Extract<Node, UnistLiteral>} Literal
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
 * @param {UnistParent | null | undefined} [parent]
 * @returns {asserts node is Node}
 */
export function assert(node, parent) {
  return wrap(mdast)(node, parent)
}

/**
 * Assert that `node` is a valid mdast parent.
 *
 * @param {unknown} [node]
 * @param {UnistParent | null | undefined} [parent]
 * @returns {asserts node is Parent}
 */
export function parent(node, parent) {
  return wrap(assertParent)(node, parent)
}

/**
 * Assert that `node` is a valid mdast literal.
 *
 * @param {unknown} [node]
 * @param {UnistParent | null | undefined} [parent]
 * @returns {asserts node is Literal}
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
 * @param {unknown} node
 * @param {UnistParent | null | undefined} [ancestor]
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
    // `value` in unist literals is `any`.
    // type-coverage:ignore-next-line
    typeof node.value === 'string',
    'literal should have a string `value`'
  )
}

/**
 * @param {unknown} node
 * @param {UnistParent | null | undefined} [ancestor]
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
    /** @type {Array<unknown>} */
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

export {_void, wrap} from 'unist-util-assert'
