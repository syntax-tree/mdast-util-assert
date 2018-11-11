# mdast-util-assert [![Build][build-badge]][build] [![Coverage][coverage-badge]][coverage] [![Downloads][downloads-badge]][downloads] [![Chat][chat-badge]][chat]

Assert [MDAST][] nodes.

## Installation

[npm][]:

```bash
npm install mdast-util-assert
```

## Usage

```javascript
var assert = require('mdast-util-assert')

assert({type: 'root', children: []})
assert({type: 'break'})
assert({type: 'listItem', checked: true, children: []})
// All OK.

assert({children: []})
// AssertionError: node should have a type: `{ children: [] }`

assert({type: 'paragraph', value: 'foo'})
// AssertionError: parent should have children: `{ type: 'paragraph', value: 'foo' }`
```

## API

### `assert(node)`

Assert that `node` is a valid [MDAST][] node.  If `node` has `children`,
all children will be asserted as well.

The `assert.parent`, `assert.text`, `assert.void`, and `assert.wrap`
methods from [`unist-util-assert`][unist-util-assert] are also included.

## Contribute

See [`contributing.md` in `syntax-tree/mdast`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/syntax-tree/mdast-util-assert.svg

[build]: https://travis-ci.org/syntax-tree/mdast-util-assert

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/mdast-util-assert.svg

[coverage]: https://codecov.io/github/syntax-tree/mdast-util-assert

[downloads-badge]: https://img.shields.io/npm/dm/mdast-util-assert.svg

[downloads]: https://www.npmjs.com/package/mdast-util-assert

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/remark

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[mdast]: https://github.com/syntax-tree/mdast

[unist-util-assert]: https://github.com/syntax-tree/unist-util-assert

[contributing]: https://github.com/syntax-tree/mdast/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/mdast/blob/master/code-of-conduct.md
