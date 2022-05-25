import { visit } from 'unist-util-visit'
import { withBase } from 'ufo'

export default {
  name: 'markdown',
  extentions: ['.md'],
  transform: async (content) => {
    const codeBlocks = []
    visit(
      content.body,
      (node: any) => node.tag === 'code' && node?.props.code,
      (node) => { codeBlocks.push(node) }
    )
    await Promise.all(codeBlocks.map(highlightBlock))

    const inlineCodes = []
    visit(
      content.body,
      (node: any) => node.tag === 'code-inline' && (node.props?.lang || node.props?.language),
      (node) => { inlineCodes.push(node) }
    )

    await Promise.all(inlineCodes.map(highlightInline))

    return content
  }
}

const tokenSpan = ({ content, color }) => ({
  type: 'element',
  tag: 'span',
  props: { style: { color } },
  children: [{ type: 'text', value: content }]
})

const highlightInline = async (node) => {
  const code = node.children[0].value

  const base = useRuntimeConfig().content.base
  console.log(base);

  // Fetch highlighted tokens
  const lines = await $fetch(withBase('highlight', `/api/${base}`), {
    method: 'POST',
    body: {
      code,
      lang: node.props.lang || node.props.language
    }
  })

  // Generate highlighted children
  node.children = lines[0].map(tokenSpan)

  node.props = node.props || {}
  node.props.class = 'colored'

  return node
}

const highlightBlock = async (node) => {
  const { code, language: lang, highlights = [] } = node.props

  const base = useRuntimeConfig().content.base
  console.log(base);

  // Fetch highlighted tokens
  const lines = await $fetch(withBase('highlight', `/api/${base}`), {
    method: 'POST',
    body: {
      code,
      lang
    }
  })

  // Generate highlighted children
  const innerCodeNode = node.children[0].children[0]
  innerCodeNode.children = lines.map((line, lineIndex) => ({
    type: 'element',
    tag: 'span',
    props: { class: ['line', highlights.includes(lineIndex + 1) ? 'highlight' : ''].join(' ').trim() },
    children: line.map(tokenSpan)
  }))
  return node
}
