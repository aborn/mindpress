import path from 'path'
import { MINDPRESS_ROOT_PATH } from '~/server/utils/markdownUtils'
import { MINDPRESS_MODE } from '~/composables/consts'
import fs from 'fs'

export function isSSGMode(): boolean {
    const config = useRuntimeConfig();
    const { mode } = config.public.mindpress
    console.log('isSSGMode  mode ===' + mode)
    return mode === MINDPRESS_MODE.SSG
}

export function getMindPressRootPath(): string {
    if (isSSGMode()) {
        return process.cwd()
    }

    const runtimeNodeConf = process.env.MINDPRESS_PATH
    const defaultPath = path.join(process.cwd(), MINDPRESS_ROOT_PATH)
    const mindPathDir = runtimeNodeConf || defaultPath;
    const contentPath = path.join(mindPathDir, 'content')
    if (!fs.existsSync(contentPath)) {
        console.log(contentPath + ' doesnot exists! now create it!')
        fs.mkdirSync(contentPath, { recursive: true });
    }
    return mindPathDir;
}