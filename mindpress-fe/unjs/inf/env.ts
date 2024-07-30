import path from 'path'
import { MINDPRESS_ROOT_PATH } from '~/server/utils/markdownUtils'
import fs from 'fs'

export function getMindPressRootPath(): string {
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