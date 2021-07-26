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

import nodeAssert from 'assert'
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
var mdast = zwitch('type', {
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

var all = mapz(mdast, {key: 'children'})

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
  nodeAssert.strictEqual(
    typeof node.value,
    'string',
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

  nodeAssert.strictEqual(ancestor, undefined, '`root` should not have a parent')
}

/**
 * @param {unknown} node
 * @returns {asserts node is List}
 */
function list(node) {
  parent(node)
  indexable(node)

  if (node.spread != null) {
    nodeAssert.strictEqual(
      typeof node.spread,
      'boolean',
      '`spread` must be `boolean`'
    )
  }

  if (node.ordered != null) {
    nodeAssert.strictEqual(
      typeof node.ordered,
      'boolean',
      '`ordered` must be `boolean`'
    )
  }

  if (!node.ordered) {
    nodeAssert.ok(node.start == null, 'unordered lists must not have `start`')
  } else if (node.start != null) {
    nodeAssert.strictEqual(
      typeof node.start,
      'number',
      'ordered lists must have `start`'
    )
    nodeAssert.ok(node.start >= 0, '`start` must be gte `0`')
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
    nodeAssert.strictEqual(
      typeof node.spread,
      'boolean',
      '`spread` must be `boolean`'
    )
  }

  if (node.checked != null) {
    nodeAssert.strictEqual(
      typeof node.checked,
      'boolean',
      '`checked` must be `boolean`'
    )
  }
}

/**
 * @param {unknown} node
 * @returns {asserts node is Heading}
 */
function heading(node) {
  parent(node)
  indexable(node)

  nodeAssert.ok(node.depth > 0, '`depth` should be gte `1`')
  nodeAssert.ok(node.depth <= 6, '`depth` should be lte `6`')
}

/**
 * @param {unknown} node
 * @returns {asserts node is Code}
 */
function code(node) {
  literal(node)
  indexable(node)

  if (node.lang != null) {
    nodeAssert.strictEqual(
      typeof node.lang,
      'string',
      '`lang` must be `string`'
    )
  }

  if (node.meta != null) {
    nodeAssert.ok(node.lang != null, 'code with `meta` must also have `lang`')
    nodeAssert.strictEqual(
      typeof node.meta,
      'string',
      '`meta` must be `string`'
    )
  }
}

/**
 * @param {unknown} node
 * @returns {asserts node is FootnoteDefinition}
 */
function footnoteDefinition(node) {
  parent(node)
  indexable(node)

  nodeAssert.strictEqual(
    typeof node.identifier,
    'string',
    '`footnoteDefinition` must have `identifier`'
  )

  if (node.label != null) {
    nodeAssert.strictEqual(
      typeof node.label,
      'string',
      '`label` must be `string`'
    )
  }
}

/**
 * @param {unknown} node
 * @returns {asserts node is Definition}
 */
function definition(node) {
  _void(node)
  indexable(node)

  nodeAssert.strictEqual(
    typeof node.identifier,
    'string',
    '`identifier` must be `string`'
  )

  if (node.label != null) {
    nodeAssert.strictEqual(
      typeof node.label,
      'string',
      '`label` must be `string`'
    )
  }

  nodeAssert.strictEqual(typeof node.url, 'string', '`url` must be `string`')

  if (node.title != null) {
    nodeAssert.strictEqual(
      typeof node.title,
      'string',
      '`title` must be `string`'
    )
  }
}

/**
 * @param {unknown} node
 * @returns {asserts node is Link}
 */
function link(node) {
  parent(node)
  indexable(node)

  nodeAssert.strictEqual(typeof node.url, 'string', '`url` must be `string`')

  if (node.title != null) {
    nodeAssert.strictEqual(
      typeof node.title,
      'string',
      '`title` must be `string`'
    )
  }
}

/**
 * @param {unknown} node
 * @returns {asserts node is Image}
 */
function image(node) {
  _void(node)
  indexable(node)

  nodeAssert.strictEqual(typeof node.url, 'string', '`url` must be `string`')

  if (node.title != null) {
    nodeAssert.strictEqual(
      typeof node.title,
      'string',
      '`title` must be `string`'
    )
  }

  if (node.alt != null) {
    nodeAssert.strictEqual(typeof node.alt, 'string', '`alt` must be `string`')
  }
}

/**
 * @param {unknown} node
 * @returns {asserts node is LinkReference}
 */
function linkReference(node) {
  parent(node)
  indexable(node)

  nodeAssert.strictEqual(
    typeof node.identifier,
    'string',
    '`identifier` must be `string`'
  )

  if (node.label != null) {
    nodeAssert.strictEqual(
      typeof node.label,
      'string',
      '`label` must be `string`'
    )
  }

  if (node.referenceType != null) {
    nodeAssert.notStrictEqual(
      // @ts-expect-error Check if it’s a string.
      ['shortcut', 'collapsed', 'full'].indexOf(node.referenceType),
      -1,
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

  nodeAssert.strictEqual(
    typeof node.identifier,
    'string',
    '`identifier` must be `string`'
  )

  if (node.label != null) {
    nodeAssert.strictEqual(
      typeof node.label,
      'string',
      '`label` must be `string`'
    )
  }

  if (node.alt != null) {
    nodeAssert.strictEqual(typeof node.alt, 'string', '`alt` must be `string`')
  }

  if (node.referenceType != null) {
    nodeAssert.notStrictEqual(
      // @ts-expect-error Check if it’s a string.
      ['shortcut', 'collapsed', 'full'].indexOf(node.referenceType),
      -1,
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

  nodeAssert.strictEqual(
    typeof node.identifier,
    'string',
    '`identifier` must be `string`'
  )

  if (node.label != null) {
    nodeAssert.strictEqual(
      typeof node.label,
      'string',
      '`label` must be `string`'
    )
  }
}

/**
 * @param {unknown} node
 * @returns {asserts node is Table}
 */
function table(node) {
  var index = -1
  /** @type {Array.<unknown>} */
  var align
  /** @type {unknown} */
  var value

  parent(node)
  indexable(node)

  if (node.align != null) {
    nodeAssert.ok(Array.isArray(node.align), '`align` must be `array`')
    align = node.align // type-coverage:ignore-line

    while (++index < align.length) {
      value = align[index]

      if (value != null) {
        nodeAssert.notStrictEqual(
          // @ts-expect-error Check if it’s a string.
          ['left', 'right', 'center'].indexOf(value),
          -1,
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
