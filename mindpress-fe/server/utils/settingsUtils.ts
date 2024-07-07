import fs from 'node:fs';

export async function validateToken(token: string): Promise<boolean> {
    const settings = await useStorage('MINDPRESS_CONFIG').getItem<SettingStruct>('settings')
    if (!settings) {
        return false;
    }

    const configToken = settings.token;
    reloadConfigFile().then(() => {
        console.log('reloadConfigFile success!')
    })

    if ((!configToken) || configToken.trim().length == 0) {
        console.warn('token not configed in server side!')
        return true;
    } else {
        return token === configToken
    }
}

export async function reloadConfigFile(filePath: string | null = null) {
    const confFile = filePath || await useStorage('MINDPRESS_CONFIG').getItem<string>('configfile') as string
    let configFileContent = {} as any
    const configStorage = useStorage('MINDPRESS_CONFIG')

    if (fs.existsSync(confFile)) {
        const content = fs.readFileSync(confFile, 'utf8');
        configFileContent = { ...JSON.parse(content) }
        console.log(' #### reload config file content ###' + (filePath ? " @init process" : "other"))
        console.log(configFileContent)
        await configStorage.setItem<any>('settings', configFileContent)
    }
}