
import { defineEventHandler } from 'h3'
import { createStorage, type WatchEvent, prefixStorage } from 'unstorage'

export default defineEventHandler(async (event) => {
    console.log("----------- nitro ------------")
    console.log("nitro: req comming...(test)")
    const req = event.node.req
    const query = getQuery(event)
    let data: any = '';
    console.log(req.url)

    //if (query.id) {
    //    const cacheParsedStorageLocal = prefixStorage(useStorage(), 'cache:content:parsed')
    //    const body = await cacheParsedStorageLocal.getItem(query.id as string);
    //    data = body;
    //}

    // const sourceStorage: Storage = prefixStorage(useStorage(), 'content:source')
    // const sourceV = await sourceStorage.getItem('content:中国文化展.md')
    //const body = await sourceStorage.getItem(query.id);
    //console.log(body)

    return {
        md: data,
        api: 'mindpress works',
    }
})

