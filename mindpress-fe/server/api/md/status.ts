import { defineEventHandler } from 'h3'
import { downloadImageAxios } from '~/server/utils/markdownUtils'

export default defineEventHandler(async (event) => {
    console.log("----------- nitro ------------")
    console.log("nitro: req comming...(status)")
    const req = event.node.req
    const query = getQuery(event)
    let data = '';
    console.log(req.url)
    console.log(query)

    console.log(req.headers)
    console.log(req.headers['host'])

    // const image =query.i
    // const url = await downloadImageAxios(image as string)

    return {
        md: data,
        api: 'mindpress works',
        fcm: true,
        mode: 'fcm',
    }
})
