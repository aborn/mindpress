import { defineEventHandler } from 'h3'
import fs from 'node:fs';
import { type StorageValue, prefixStorage, type Storage, createStorage } from 'unstorage'
import { parseContent } from '#content/server'

export default defineEventHandler(async (event) => {
    console.log("----------- nitro ------------")
    console.log("nitro: req comming...(query)")
    const req = event.node.req
    const query: any = getQuery(event)
    let data = '';
    console.log(req.url)
    console.log(query)

    const cacheParsedStorage: Storage = prefixStorage(useStorage(), 'cache:markdown:parsed')
    const markdownStorage: Storage = prefixStorage(useStorage(), 'markdown:source')
    let keys = await markdownStorage.getKeys('markdown:source')
    let keys2 = await cacheParsedStorage.getKeys('cache:markdown:parsed')
    // console.log(keys)
    // console.log(keys2)

    if (query._id) {
        const realId = query._id.substring('content:'.length)
        const parsedKey = `cache:markdown:parsed:${realId}`;
        const paserdValue = await cacheParsedStorage.getItem(parsedKey);
        if (paserdValue) {
            return paserdValue;
        }
    }

    const length = 'markdown:source'.length;
    const res: any[] = []

    await Promise.all(
        keys.map(async (key: string) => {
            const parsedKey = `cache:markdown:parsed:${key.substring(length + 1)}`;
            const paserdValue = await cacheParsedStorage.getItem(parsedKey);
            res.push(paserdValue)
        })
    )

    if (query._id) {
        const fond = res.find(i => i.permalink === ('/article/' + query._id))
        if (fond) {
            return fond
        }
    }
    return res
})
