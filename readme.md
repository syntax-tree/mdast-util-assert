# mdast-util-assert

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**mdast**][mdast] utility to assert trees.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install mdast-util-assert
```

## Use

```js
import {assert} from 'mdast-util-assert'

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

This package exports the following identifiers: `assert`, `parent`, `literal`,
`_void`, `wrap`.
There is no default export.

### `assert(node)`

Assert that [`tree`][tree] is a valid [mdast][] [node][].
If `tree` is a [parent][], all [child][]ren will be asserted as well.

The `parent`, `literal`, `_void`, and `wrap` methods from
[`unist-util-assert`][unist-util-assert] are also included.

## Security

Use of `mdast-util-assert` does not involve [**hast**][hast] so there are no
openings for [cross-site scripting (XSS)][xss] attacks.

## Related

*   [`unist-util-assert`][unist-util-assert]
    — check [unist](https://github.com/syntax-tree/unist) nodes
*   [`hast-util-assert`](https://github.com/syntax-tree/hast-util-assert)
    — check [hast](https://github.com/syntax-tree/hast) nodes
*   [`nlcst-test`](https://github.com/syntax-tree/nlcst-test)
    — check [nlcst](https://github.com/syntax-tree/nlcst) nodes

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/syntax-tree/mdast-util-assert/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/mdast-util-assert/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/mdast-util-assert.svg

[coverage]: https://codecov.io/github/syntax-tree/mdast-util-assert

[downloads-badge]: https://img.shields.io/npm/dm/mdast-util-assert.svg

[downloads]: https://www.npmjs.com/package/mdast-util-assert

[size-badge]: https://img.shields.io/bundlephobia/minzip/mdast-util-assert.svg

[size]: https://bundlephobia.com/result?p=mdast-util-assert

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/HEAD/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/HEAD/support.md

[coc]: https://github.com/syntax-tree/.github/blob/HEAD/code-of-conduct.md

[mdast]: https://github.com/syntax-tree/mdast

[unist-util-assert]: https://github.com/syntax-tree/unist-util-assert

[tree]: https://github.com/syntax-tree/unist#tree

[child]: https://github.com/syntax-tree/unist#child

[node]: https://github.com/syntax-tree/mdast#nodes

[parent]: https://github.com/syntax-tree/mdast#parent

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[hast]: https://github.com/syntax-tree/hast
