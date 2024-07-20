import { getMindPressRootPath } from '~/unjs/inf/env'
import fs from 'node:fs';
import { updateCache } from '../../storage'


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
    //console.log(query)

    let body: any = await readBody(event);
    let file = body.file;
    let articleid = body.articleid;
    const articleTitle = body.title

    let header: string = '';
    const content = buildContent(body)
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

function buildContent(body: any) {
    let content = body.content
    if (body.content) {
        let idx = body.content.lastIndexOf(MD_DIVIDER);
        if (idx >= 0) {
            // console.log('find it!!!' + idx)
            content = body.content.substring(idx + MD_DIVIDER.length + 1)
            // console.log(content)
        }
    }
    return content
}