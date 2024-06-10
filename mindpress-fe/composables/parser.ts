import { toMarkdown } from 'mdast-util-to-markdown'
import { toString } from 'hast-util-to-string'


type MDCParserResult = /*unresolved*/ any

export function compileHastToStringify(ast: MDCParserResult) {
    return toString(ast)
}