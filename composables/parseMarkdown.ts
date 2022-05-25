import { parse } from '../node_modules/@nuxt/content/dist/runtime/markdown-parser'
import type { MarkdownOptions } from '../node_modules/@nuxt/content/dist/runtime/types'

const importPlugin = async (p: [string, any]) => ([
  await import(/* @vite-ignore */p[0]).then(res => res.default || res),
  typeof p[1] === 'object' ? { ...p[1] } : p[1]
])

export async function parseMdContent(content: any) {
  const config: MarkdownOptions = {
    ...useRuntimeConfig().content?.markdown || {},
    mdc: true,
    toc: {
      depth: 2,
      searchDepth: 2
    }
  }

  // const { theme, preload } = useRuntimeConfig().content.highlight
  // console.log(theme)
  // console.log(preload);

  const base = useRuntimeConfig().content.base

  config.rehypePlugins = await Promise.all((config.rehypePlugins || []).map(importPlugin))
  config.remarkPlugins = await Promise.all((config.remarkPlugins || []).map(importPlugin))

  // console.log(config)
  const parsed = await parse(content.trimStart(), config)

  return {
    ...parsed.meta,
    body: parsed.body,
    type: 'markdown',
    _base: base
  }

}
