import { createStorage, type WatchEvent, prefixStorage } from 'unstorage'
import fsDriver from "unstorage/drivers/fs";
import { parseContent } from '#content/server'
import fs from 'node:fs';
import path from 'path'
import { MINDPRESS_ROOT_PATH, IMAGE_UPLOAD_PATH, makeSureImagePathExists } from '~/server/utils/markdownUtils'
import { reloadConfigFile, useAdaptFile } from '../utils/settingsUtils';
import { getMindPressRootPath, isSSGMode } from '~/unjs/inf/env'
import { CONFIG_FILE_NAME } from '~/unjs/inf/conf';


export default defineNitroPlugin(async (nitroApp) => {
    //console.log('Nitro plugin', nitroApp)
    if (isSSGMode()) { return }
    const storage = prefixStorage(useStorage(), 'markdown:source');
    const cacheParsedStorage = prefixStorage(useStorage(), 'cache:markdown:parsed')
    const ROOT_PATH = getMindPressRootPath()
    console.log('nitro init, mindpress rootpath=' + ROOT_PATH)
    const sources = {} as any;
    sources['markdown:source'] = {
        driver: 'fs',
        base: path.join(ROOT_PATH, '/content')
    }

    for (const [key, source] of Object.entries(sources)) {
        storage.mount(key, fsDriver({ base: path.join(ROOT_PATH, '/content') }));
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
    const runtimeConfigFile = process.env.MINDPRESS_CONF
    // const confFile = useAdaptFile(runtimeConfigFile, mdConfig.conf, path.join(process.cwd(), MINDPRESS_ROOT_PATH, CONFIG_FILE_NAME))
    const confFile = path.join(ROOT_PATH, CONFIG_FILE_NAME)
    console.log('current use confFile=' + confFile + ', runtimeConfigFile=' + runtimeConfigFile)
    const configStorage = useStorage('MINDPRESS_CONFIG')
    let watched = false;

    try {
        if (fs.existsSync(confFile)) {
            watched = true
            await watchConfigFile(confFile)
            await configStorage.setItem<any>('configfile', confFile)
        } else {
            console.warn(confFile + ' doesnot exists!')
            fs.watch(ROOT_PATH, async function (event, filename) {
                console.log(ROOT_PATH + 'is watching, event is: ' + event);
                if (filename === CONFIG_FILE_NAME) {
                    if (event == 'rename' && fs.existsSync(confFile)) {
                        if (!watched) {
                            watched = true;
                            await watchConfigFile(confFile)
                        }
                    }
                    console.log(CONFIG_FILE_NAME + " event:" + event)
                } else {
                    console.log(`filename: ${filename} changed event:` + event);
                }
            });
        }
    } catch (err) {
        console.error(err)
    }

    console.log('-------mdConfig value---')
    console.log(mdConfig)
})

async function watchConfigFile(confFile: string) {
    fs.watchFile(confFile, function (curr, prev) {
        console.log(`file ${confFile} changed event`);
        console.log(`the current mtime is: ${curr.mtime}`);
        console.log(`the previous mtime was: ${prev.mtime}`);
        reloadConfigFile().then(() => {
            console.log('reloadConfigFile success based on watch!')
        })
    });
    await reloadConfigFile(confFile)
}