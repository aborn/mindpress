import { defineEventHandler, useBody } from 'h3'
import { parseContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)

  try {
    // @ts-ignore
    const parsedContent = await parseContent(body.id || 'content:_file.md', body.content)
    return {
      data: parsedContent,
      msg: 'parse success.',
      success: true,
      code: 200
    }
  } catch (err) {
    console.error('error parsing content.', err)
    return {
      data: {},
      msg: '' + err,
      success: false,
      code: 500
    }
  }
})
