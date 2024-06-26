import { createStorage, type WatchEvent, prefixStorage } from 'unstorage'
import fsDriver from "unstorage/drivers/fs";
import { parseContent } from '#content/server'

export default defineNitroPlugin(async (nitroApp) => {
    //console.log('Nitro plugin', nitroApp)
    const storage = prefixStorage(useStorage(), 'markdown:source');
    const cacheParsedStorage = prefixStorage(useStorage(), 'cache:markdown:parsed')
    
    const sources = {} as any;
    sources['markdown:source'] = {
        driver: 'fs',
        base: './content'
    }

    for (const [key, source] of Object.entries(sources)) {
        storage.mount(key, fsDriver({ base: './content' }));
    }
    const length = 'markdown:source'.length;
    let keys = await storage.getKeys('markdown:source')

    await Promise.all(
        keys.map(async (key: string) => {
            const value = await storage.getItem(key);
            const meta = await storage.getMeta(key);
            const pKey = `${key.substring(length + 1)}`;
            const parsedKey = `cache:markdown:parsed:${pKey}`;
            const parsedValue = await parseContent('content:' + pKey, value)
            await cacheParsedStorage.setItem(parsedKey, parsedValue)
        })
    )
})