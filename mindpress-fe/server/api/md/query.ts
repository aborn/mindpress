import { defineEventHandler } from 'h3'
import fs from 'node:fs';
import { useNitroApp, useRuntimeConfig, useStorage } from '#imports'
import { type StorageValue, prefixStorage, type Storage, createStorage } from 'unstorage'
import { parseContent } from '#content/server'


export default defineEventHandler(async (event) => {
    console.log("nitro: req comming...(status)")
    const req = event.node.req
    const query = getQuery(event)
    let data = '';
    console.log(req.url)

    // const sourceStorage: Storage = prefixStorage(useStorage(), 'content:source')
    // const sourceV = await sourceStorage.getItem('content:中国文化展.md')

    const cacheParsedStorage: Storage = prefixStorage(useStorage(), 'cache:markdown:parsed')

    console.log('-----now sourceStorage: ' + query.id)
    //const body = await sourceStorage.getItem(query.id);
    //console.log(body)

    const markdownStorage: Storage = prefixStorage(useStorage(), 'markdown:source')
    let keys = await markdownStorage.getKeys('markdown:source')
    console.log('kkkkkkkkkkk------')
    console.log(keys)

    const contentId = 'markdown:source:中国文化展.md';
    let body = await markdownStorage.getItem(contentId);
    console.log(body)

    const paserdV = await markdownStorage.getItem('cache:markdown:parsed:中国文化展.md')
    let keys2 = await markdownStorage.getKeys('cache:markdown:parsed')

    //const parsed = await parseContent(contentId, body)
    console.log('###########')
    //console.log(parsed)
    return {
        md: body,
        paserdV,
        keys,
        keys2,
        api: 'mindpress works',
    }
})
