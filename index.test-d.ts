import {expectType, expectNotType} from 'tsd'
import type {Parent as UnistParent} from 'unist'
import type {Root, Content} from 'mdast'
import {assert, parent} from './index.js'

type Node = Root | Content
type Parent = Extract<Node, UnistParent>

const emptyNode = {type: 'doctype'}
const literalNode = {type: 'text', value: 'a'}
const parentNode = {type: 'element', children: [emptyNode, literalNode]}

expectNotType<Node>(emptyNode)
expectNotType<Node>(literalNode)
expectNotType<Node>(parentNode)

assert(emptyNode)
expectType<Node>(emptyNode)

expectNotType<Parent>(parentNode)
parent(parentNode)
expectType<Parent>(parentNode)
