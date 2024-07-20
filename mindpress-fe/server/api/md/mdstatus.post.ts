import { getMindPressRootPath } from '~/unjs/inf/env'
import fs from 'node:fs';
import { updateCache } from '../../storage'
import { extractBody, buildHeaderArray, buildHeaderKeyValue } from '../../utils/markdownUtils'
import { dateFormat } from '~/unjs/utils/date';

export default defineEventHandler(async (event) => {
    console.log("----------- nitro ------------")
    console.log("nitro: req comming...(mdstatus)")
    const req = event.node.req
    const token = req.headers['token'] as string
    console.log('token=' + token)
    let data = '';

    const validateResult = await validateToken(token)
    if (!validateResult) {
        return {
            md: data,
            success: false,
            msg: 'validate token is error，please retry!',
            code: 501
        }
    }

    console.log(req.url)
    let body: any = await readBody(event);
    let file = body.file;
    let articleid = body.articleid;
    const mpstatus = body.mpstatus
    const articleTitle = body.title

    let header: string = buildHeader(body, mpstatus);
    const content = extractBody(body)
    const __rootDir = getMindPressRootPath();
    const baseDir = __rootDir + '/content/';

    if (fs.existsSync(baseDir + file)) {
        try {
            fs.writeFileSync(baseDir + file, header + content);
            // async updateCache.
            updateCache(file).then(() => {
                console.log('update cache success! triggle by:' + file)
            })
            console.log('update status success!')
        } catch (err) {
            console.error(err);
            return {
                md: data,
                success: false,
                msg: 'articleid=' + (articleid || file) + ", update status failed! reason:" + err,
            }
        }
    } else {
        console.warn(`file ${baseDir + file} does not exists!`,)
        return {
            md: data,
            success: false,
            msg: `file ${file} does not exists!`,
        }

    }

})

function buildHeader(body: any, mpstatus: string): string {
    let header = ''
    let mppubtimeIsUpdated = false;
    if (body && body.header) {
        for (let [key, value] of Object.entries(body.header)) {
            if (body.header.hasOwnProperty(key)) {
                if ('category' === key || 'tag' === key) {
                    header = header + `${key}: ` + buildHeaderArray(value as any[]) + ``
                } else if (mpstatus === 'publish' && key === 'mpstatus') {
                    header = buildHeaderKeyValue(key, mpstatus)
                    if (!mppubtimeIsUpdated) {
                        header = buildHeaderKeyValue('mppubtime', dateFormat(new Date()))
                        mppubtimeIsUpdated = true
                    }
                } else if (key === 'mppubtime' && mpstatus === 'publish') {
                    if (!mppubtimeIsUpdated) {
                        header = buildHeaderKeyValue('mppubtime', dateFormat(new Date()))
                        mppubtimeIsUpdated = true
                    }
                } else {
                    header = header + buildHeaderKeyValue(key, value as string)
                }
            }
        }
    }
    return header
}