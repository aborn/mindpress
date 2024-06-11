import { defineEventHandler } from 'h3'
import fs from 'node:fs';
import { type StorageValue, prefixStorage, type Storage, createStorage } from 'unstorage'
import { parseContent } from '#content/server'

export default defineEventHandler(async (event) => {
    console.log("nitro: req comming...(status)")
    const req = event.node.req
    const query = getQuery(event)
    let data = '';
    console.log(req.url)

    const cacheParsedStorage: Storage = prefixStorage(useStorage(), 'cache:markdown:parsed')
    const markdownStorage: Storage = prefixStorage(useStorage(), 'markdown:source')
    let keys = await markdownStorage.getKeys('markdown:source')

    console.log('kkkkkkkkkkk------')
    console.log(keys)

    const contentId = 'markdown:source:中国文化展.md';
    let body = await markdownStorage.getItem(contentId);
    console.log(body)

    const paserdV = await cacheParsedStorage.getItem('cache:markdown:parsed:中国文化展.md')
    let keys2 = await markdownStorage.getKeys('cache:markdown:parsed')

    // const parsed = await parseContent(contentId, body)
    console.log('###########')
    //console.log(parsed)

    const length = 'markdown:source'.length;

    const res: any[] = []

    await Promise.all(
        keys.map(async (key: string) => {
            const parsedKey = `cache:markdown:parsed:${key.substring(length + 1)}`;
            const paserdValue = await cacheParsedStorage.getItem(parsedKey);
            res.push(paserdValue)
        })
    )

    //keys.map(async (key: string) => {
    //    const parsedKey = `cache:markdown:parsed:${key.substring(length + 1)}`;
    //    res.push(await cacheParsedStorage.getItem(parsedKey))
    //})

    return res
})
