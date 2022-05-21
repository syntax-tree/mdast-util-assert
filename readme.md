# mdast-util-assert

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[mdast][] utility to assert trees.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`assert(node)`](#assertnode)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a tiny utility that helps you deal with nodes.

## When should I use this?

This utility is typically useful when you expect certain nodes in your APIs
and want to make sure they’re valid and as expected.

A different utility, [`unist-util-assert`][unist-util-assert], does the same but
for any [unist][] node.

## Install

This package is [ESM only][esm].
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install mdast-util-assert
```

In Deno with [`esm.sh`][esmsh]:

```js
import {assert} from 'https://esm.sh/mdast-util-assert@4'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {assert} from 'https://esm.sh/mdast-util-assert@4?bundle'
</script>
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

This package exports the identifiers `assert`, `parent`, `literal`, `_void`,
and `wrap`.
There is no default export.

### `assert(node)`

Assert that [`tree`][tree] is a valid [mdast][] [node][].
If `tree` is a [parent][], all [child][]ren will be asserted as well.

The `parent`, `literal`, `_void`, and `wrap` methods from
[`unist-util-assert`][unist-util-assert] are also exported.

###### Throws

When `node`, or one of its children, is not a valid mdast node.

###### Returns

Nothing.

## Types

This package is fully typed with [TypeScript][].
It does not export additional types.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

## Security

Use of `mdast-util-assert` does not involve [**hast**][hast] so there are no
openings for [cross-site scripting (XSS)][xss] attacks.

## Related

*   [`unist-util-assert`][unist-util-assert]
    — check unist nodes
*   [`hast-util-assert`](https://github.com/syntax-tree/hast-util-assert)
    — check hast nodes
*   [`nlcst-test`](https://github.com/syntax-tree/nlcst-test)
    — check nlcst nodes

## Contribute

See [`contributing.md`][contributing] in [`syntax-tree/.github`][health] for
ways to get started.
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

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[license]: license

[author]: https://wooorm.com

[health]: https://github.com/syntax-tree/.github

[contributing]: https://github.com/syntax-tree/.github/blob/main/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/main/support.md

[coc]: https://github.com/syntax-tree/.github/blob/main/code-of-conduct.md

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[unist]: https://github.com/syntax-tree/unist

[tree]: https://github.com/syntax-tree/unist#tree

[child]: https://github.com/syntax-tree/unist#child

[unist-util-assert]: https://github.com/syntax-tree/unist-util-assert

[mdast]: https://github.com/syntax-tree/mdast

[node]: https://github.com/syntax-tree/mdast#nodes

[parent]: https://github.com/syntax-tree/mdast#parent

[hast]: https://github.com/syntax-tree/hast
