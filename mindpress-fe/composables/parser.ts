import { toMarkdown } from 'mdast-util-to-markdown'
import { toString } from 'hast-util-to-string'
import { toMdast } from 'hast-util-to-mdast'
import { toHtml } from 'hast-util-to-html'
import { fromHtml } from 'hast-util-from-html'
import { toText } from 'hast-util-to-text'
import {gfmFromMarkdown, gfmToMarkdown} from 'mdast-util-gfm'

type MDCParserResult = /*unresolved*/ any

export function compileHastToStringify(mdcResult: MDCParserResult) {
    console.log('bbbbbbb')
    console.log(mdcResult)
    const hast = toHast(mdcResult);
    console.log('afffffff')
    console.log(hast)
    //const html = toHtml(ast);
    //const hast = fromHtml(html, { fragment: true })

    const mdast = toMdast(hast)
    try {
        console.log('eeee')
        const markdown = toMarkdown(mdast, {extensions: [gfmToMarkdown()]})
        //const rawV = raw(ast);
        return markdown
    } catch (err) {
        console.log(err)
        return toText(mdcResult)
    }
}

function toHast(node: any) {
    if (node.type === 'root') {
        return {
            type: 'root',
            children: node.children.map((child: any) => toHast(child)).filter(Boolean)
        }
    } else if (node.type == 'element') {
        return {
            type: 'element',
            tagName: node.tag,
            properties: node.props,
            children: node.children ? node.children.map((child: any) => toHast(child)).filter(Boolean) : []
        }
    } else {
        return node
    }
}