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

function unknown(node, ancestor) {
  unistAssert(node, ancestor)
}

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

function root(node, ancestor) {
  parent(node)

  nodeAssert.strictEqual(ancestor, undefined, '`root` should not have a parent')
}

function list(node) {
  parent(node)

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

function listItem(node) {
  parent(node)

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

function heading(node) {
  parent(node)

  nodeAssert.ok(node.depth > 0, '`depth` should be gte `1`')
  nodeAssert.ok(node.depth <= 6, '`depth` should be lte `6`')
}

function code(node) {
  literal(node)

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

function footnoteDefinition(node) {
  parent(node)

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

function definition(node) {
  _void(node)

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

function link(node) {
  parent(node)

  nodeAssert.strictEqual(typeof node.url, 'string', '`url` must be `string`')

  if (node.title != null) {
    nodeAssert.strictEqual(
      typeof node.title,
      'string',
      '`title` must be `string`'
    )
  }
}

function image(node) {
  _void(node)

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

function linkReference(node) {
  parent(node)

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
      ['shortcut', 'collapsed', 'full'].indexOf(node.referenceType),
      -1,
      '`referenceType` must be `shortcut`, `collapsed`, or `full`'
    )
  }
}

function imageReference(node) {
  _void(node)

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
      ['shortcut', 'collapsed', 'full'].indexOf(node.referenceType),
      -1,
      '`referenceType` must be `shortcut`, `collapsed`, or `full`'
    )
  }
}

function footnoteReference(node) {
  _void(node)

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

function table(node) {
  var index = -1
  var value

  parent(node)

  if (node.align != null) {
    nodeAssert.ok(Array.isArray(node.align), '`align` must be `array`')

    while (++index < node.align.length) {
      value = node.align[index]

      if (value != null) {
        nodeAssert.notStrictEqual(
          ['left', 'right', 'center'].indexOf(value),
          -1,
          "each align in table must be `null, 'left', 'right', 'center'`"
        )
      }
    }
  }
}
