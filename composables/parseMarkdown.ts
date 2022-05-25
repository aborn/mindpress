import { parse } from '../node_modules/@nuxt/content/dist/runtime/markdown-parser'
import type { MarkdownOptions } from '../node_modules/@nuxt/content/dist/runtime/types'
import { useRuntimeConfig } from '#imports'

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
  config.rehypePlugins = await Promise.all((config.rehypePlugins || []).map(importPlugin))
  config.remarkPlugins = await Promise.all((config.remarkPlugins || []).map(importPlugin))

  const parsed = await parse(content, config)

  return {
    ...parsed.meta,
    body: parsed.body,
    type: 'markdown'
  }

}
