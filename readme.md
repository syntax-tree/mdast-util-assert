# mdast-util-assert [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Assert [MDAST][] nodes.

## Installation

[npm][]:

```bash
npm install mdast-util-assert
```

## Usage

```javascript
var assert = require('mdast-util-assert');

assert({type: 'root', children: []});
assert({type: 'break'});
assert({type: 'listItem', checked: true, children: []});
// All OK.

assert({children: []});
// AssertionError: node should have a type: `{ children: [] }`

assert({type: 'paragraph', value: 'foo'});
// AssertionError: parent should have children: `{ type: 'paragraph', value: 'foo' }`
```

## API

### `assert(node)`

Assert that `node` is a valid [MDAST][] node.  If `node` has `children`,
all children will be asserted as well.

The `assert.parent`, `assert.text`, `assert.void`, and `assert.wrap`
methods from [`unist-util-assert`][unist-util-assert] are also included.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/mdast-util-assert.svg

[travis]: https://travis-ci.org/wooorm/mdast-util-assert

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/mdast-util-assert.svg

[codecov]: https://codecov.io/github/wooorm/mdast-util-assert

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[mdast]: https://github.com/wooorm/mdast

[unist-util-assert]: https://github.com/wooorm/unist-util-assert
