import { getMindPressRootPath } from '~/unjs/inf/env'
import fs from 'node:fs';
import { updateCache } from '../../storage'
import { dateFormat } from '~/unjs/utils/date';
import { buildMDHeaderWithUpdateKeyValue, extractBody } from '~/unjs/utils/markdown'

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
    const currentTime = dateFormat(new Date());

    const fileData = await queryFileContent({ file, articleid })
    let header: string = buildMDHeaderWithUpdateKeyValue(fileData.mdheader, {
        mpstatus,
        mppubtime: currentTime,
        date: currentTime
    });

    const content = fileData.mdcontent
    const baseDir = getMindPressRootPath() + '/content/';

    if (fs.existsSync(baseDir + file)) {
        try {
            fs.writeFileSync(baseDir + file, header + content);
            // async updateCache.
            updateCache(file).then(() => {
                console.log('update cache success! triggle by:' + file)
            })
        } catch (err) {
            console.error(err);
            return {
                md: data,
                status: false,
                msg: 'articleid=' + (articleid || file) + ", update status failed! reason:" + err,
            }
        }
    } else {
        console.warn(`file ${baseDir + file} does not exists!`,)
        return {
            md: data,
            status: false,
            msg: `file ${file} does not exists!`,
        }
    }

    return {
        md: data,
        status: true,
        msg: 'articleid=' + (articleid || file) + ", update status success!",
        mpstatus
    }
})