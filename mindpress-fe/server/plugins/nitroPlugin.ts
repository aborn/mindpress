import { createStorage, type WatchEvent, prefixStorage } from 'unstorage'
import fsDriver from "unstorage/drivers/fs";
import { parseContent } from '#content/server'
import fs from 'node:fs';
import path from 'path'
import { MINDPRESS_ROOT_PATH, IMAGE_UPLOAD_PATH, makeSureImagePathExists } from '~/server/utils/markdownUtils'


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

    // https://github.com/nuxt/nuxt/issues/15366
    // https://stackoverflow.com/questions/76488291/how-to-fetch-data-as-part-of-server-start-up-in-nuxt-3
    const config = useRuntimeConfig();
    const mdConfig = config.public.mindpress

    const filePath = path.join(process.cwd(), MINDPRESS_ROOT_PATH, "mindpress.conf")
    let configFileContent = {} as any
    const configStorage = useStorage('MINDPRESS_CONFIG')

    try {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            configFileContent = { ...JSON.parse(content) }
            console.log(' #### jsonocnfig ###')
            console.log(configFileContent)
            await configStorage.setItem<any>('settings', configFileContent)
        } else {
            console.warn(filePath + ' doesnot exists!')
        }
    } catch (err) {
        console.error(err)
    }

    console.log('-------mdConfig value---')
    console.log(mdConfig)
})