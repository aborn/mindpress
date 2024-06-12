import { createStorage, type WatchEvent, prefixStorage } from 'unstorage'
import fsDriver from "unstorage/drivers/fs";
import { parseContent } from '#content/server'

export async function updateCache(fileId: string) {
    const storage = prefixStorage(useStorage(), 'markdown:source');
    const cacheParsedStorage = prefixStorage(useStorage(), 'cache:markdown:parsed')
    const PREFIX = 'markdown:source:'

    const length = 'markdown:source'.length;
    let keys = await storage.getKeys('markdown:source')

    if (fileId) {
        const articleid = PREFIX + fileId.replace(/\//g, ':')
        console.log('fileid=', fileId + ', articleid=' + articleid)
        keys = keys.filter(item => item == articleid)
        console.log(keys)
    }

    await Promise.all(
        keys.map(async (key: string) => {
            const value = await storage.getItem(key);
            const meta = await storage.getMeta(key);
            const pKey = `${key.substring(length + 1)}`;
            // console.log('------pkey')
            // console.log(pKey)
            const parsedKey = `cache:markdown:parsed:${pKey}`;
            const parsedValue = await parseContent('content:' + pKey, value)
            // console.log(key)
            // console.log(parsedValue)
            await cacheParsedStorage.setItem(parsedKey, parsedValue)
        })
    )
}