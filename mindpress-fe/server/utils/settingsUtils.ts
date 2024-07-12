import fs from 'node:fs';

export function useAdaptFile(runtimeConfigFile: string | undefined, confiFile: string, defFile: string) {
    if (runtimeConfigFile && fs.existsSync(runtimeConfigFile)) {
        return runtimeConfigFile;
    } else if (fs.existsSync(confiFile)) {
        return confiFile; 
    } else if (fs.existsSync(defFile)) {
        return defFile
    } else {
        throw new Error('config file doesnot exists!')
    }
}
export async function validateToken(token: string): Promise<boolean> {
    const settings = await useStorage('MINDPRESS_CONFIG').getItem<SettingStruct>('settings')
    if (!settings) {
        const file = await useStorage('MINDPRESS_CONFIG').getItem<string>('configfile') as string
        console.log('config not in cache...' + file)
        return false;
    }

    const configToken = settings.token;
    //reloadConfigFile().then(() => {
    //    console.log('reloadConfigFile success!')
    //})

    if ((!configToken) || configToken.trim().length == 0) {
        console.warn('token not configed in server side!')
        return true;
    } else {
        console.log(`input token=${token} and configToken=${configToken}`)
        return token === configToken
    }
}

export async function reloadConfigFile(filePath: string | null = null) {
    const confFile = filePath || await useStorage('MINDPRESS_CONFIG').getItem<string>('configfile') as string
    let configFileContent = {} as any
    const configStorage = useStorage('MINDPRESS_CONFIG')

    try {
        if (fs.existsSync(confFile)) {
            const content = fs.readFileSync(confFile, 'utf8');
            configFileContent = { ...JSON.parse(content) }
            console.log(' #### reload config file content ###' + (filePath ? " @init process" : "other"))
            console.log(configFileContent)
            await configStorage.setItem<any>('settings', configFileContent)
        }
    } catch (err) {
        console.log('reloadConfigFile error!')
        console.error(err)
    }
}