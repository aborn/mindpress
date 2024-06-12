import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    console.log("----------- nitro ------------")
    console.log("nitro: req comming...(status)")
    const req = event.node.req
    const query = getQuery(event)
    let data = '';
    console.log(req.url)

    return {
        md: data,
        api: 'mindpress works',
        fcm: true,
        mode: 'fcm'
    }
})
