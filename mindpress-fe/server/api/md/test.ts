
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    console.log("nitro: req comming...(status)")
    const req = event.node.req
    const query = getQuery(event)
    let data = '';
    console.log(req.url)

    // const sourceStorage: Storage = prefixStorage(useStorage(), 'content:source')
    // const sourceV = await sourceStorage.getItem('content:中国文化展.md')
    //const body = await sourceStorage.getItem(query.id);
    //console.log(body)

    return {
        md: data,
        api: 'mindpress works',
    }
})

 