import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    console.log("----------- nitro ------------")
    console.log("nitro: req comming...(mdimage)")
    const req = event.node.req
    const query = getQuery(event)
    let data = '';
    console.log(req.url)

    const body = await readBody(event)
    let content = body.content
    const contentUpdate = await downloadImageAndReplaseContent(content);
    content = contentUpdate.state ? contentUpdate.content : '';

    return {
        state: contentUpdate.state,
        content: content,
        success: true
    }
})
