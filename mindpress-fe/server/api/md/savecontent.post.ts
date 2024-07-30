import { defineEventHandler } from 'h3'
import fs from 'node:fs';
import os from 'node:os';
import { generatePermalinkHash, downloadImageAndReplaseContent } from '../../utils/markdownUtils'
import { validateToken } from '~/server/utils/settingsUtils';
import { dateFormat } from '~/unjs/utils/date'
import { updateCache } from '../../storage'
import { isBlank, isValidFilename } from '~/unjs/utils/utils';
import { getMindPressRootPath } from '~/unjs/inf/env'
import { extractBody, buildMDHeaderWithUpdateKeyValue } from '~/unjs/utils/markdown'
import { queryFileContent, serverQueryContent } from '~/server/utils/query/server-query'

export default defineEventHandler(async (event) => {
    console.log("----------- nitro ------------")
    console.log("nitro: req comming...(savecontent)")
    const req = event.node.req
    const token = req.headers['token'] as string
    console.log(req.url + '  >> token=' + token)

    const validateResult = await validateToken(token)
    if (!validateResult) {
        return {
            success: false,
            msg: 'validate token is error，please retry!',
            code: 501
        }
    }

    let body: any = await readBody(event);
    let file = body.file;
    let articleid = body.articleid;
    const articleTitle = body.title
    if (isBlank(articleTitle)) {
        return {
            success: false,
            msg: 'article title cannot be blank!',
        }
    }
    let header: string;

    let isCreateFile = false;
    const computerName = os.hostname()
    const __rootDir = getMindPressRootPath();
    console.log('cccccccnnnnn->' + computerName + ",,,," + __rootDir + '  articleid:' + articleid + '  file:' + file)
    const todayDate = dateFormat(new Date());  // update time

    if ((!file || file.length == 0) && articleid) {
        const res = await serverQueryContent({ _id: articleid } as any);
        console.log(' ==== query by articleid ====' + articleid)
        console.log(res)
        file = res._file
    }

    const baseDir = __rootDir + '/content/';
    let mpstatus = 'draft'
    if (!file || file.length == 0) {   // create new file.
        const permalinkHash = generatePermalinkHash();
        articleid = permalinkHash;
        const subDir = "test/"
        createFolderIfNotExists(baseDir + subDir)

        file = subDir + articleTitle + ".md"
        const isValidate = isValidFilename(articleTitle);
        if (!isValidate) {
            console.warn('invalid fileName:' + file)
        }
        // if file exists or articleTitle is invalid, generate new random name!
        if (fs.existsSync(baseDir + file) || !isValidate) {
            file = subDir + permalinkHash + ".md"
        }

        isCreateFile = true;
        console.log("create new file, file name=" + file)
        const settings = await useStorage('MINDPRESS_CONFIG').getItem<SettingStruct>('settings')
        const changedKeyValueObj = {
            title: body.title,
            date: todayDate,
            createTime: todayDate,
            permalink: '/article/' + permalinkHash,
            mpid: permalinkHash,
            mpstatus,
        } as any;

        if (settings && settings.author) {
            changedKeyValueObj.author = {
                name: settings.author,
                link: settings.author
            }
        }
        header = buildMDHeaderWithUpdateKeyValue({}, changedKeyValueObj);
    } else {   // file exists!
        let mdheader = body.mdHeader;
        if (!mdheader) {
            console.log('header pase from origin file, not from client side.')
            const mdData = queryFileContent({ file } as any)
            mdheader = (await mdData).mdheader
        }
        const changedKeyValueObj = {
            title: body.title,
            date: todayDate,
            mpid: mdheader.mpid || articleid,
            mpstatus: mdheader.mpstatus || 'draft',
        } as any;

        if (fs.existsSync(baseDir + file) && !mdheader.createTime) {
            const stats = fs.statSync(baseDir + file);
            const createTime = dateFormat(new Date(stats.birthtimeMs > 0 ? stats.birthtime : stats.ctime), true)
            changedKeyValueObj.createTime = createTime;
        }
        mpstatus = changedKeyValueObj.mpstatus
        header = buildMDHeaderWithUpdateKeyValue(mdheader, changedKeyValueObj);
    }

    console.log(header)
    let contentStruct = await buildContent(body)
    const content = contentStruct.content

    try {
        fs.writeFileSync(baseDir + file, header + content);
        // async updateCache.
        updateCache(file).then(() => {
            console.log('update cache success! triggle by:' + file)
        })
        console.log('save content success!')
        // console.log(data);
    } catch (err) {
        console.error(err);
        return {
            success: false,
            msg: 'articleid=' + (articleid || file) + ", save failed! reason:" + err,
            ext: {
                file: file
            },
            isCreateFile
        }
    }

    return {
        success: true,
        msg: 'articleid=' + (articleid || file) + ", save success!",
        date: todayDate,
        articleid,
        mpstatus,
        ext: {
            file: file,
            contentUpdate: contentStruct.state,
            content: contentStruct.state ? content : '',
        },
        isCreateFile
    }
})

function createFolderIfNotExists(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
        console.warn(folderPath + ' doesnot exists! now create it!')
        fs.mkdirSync(folderPath, { recursive: true });
    }
}

async function buildContent(body: any) {
    let content = extractBody(body.content)
    const contentUpdate = await downloadImageAndReplaseContent(content);
    content = contentUpdate.state ? contentUpdate.content : content;
    return {
        content,
        state: contentUpdate.state
    }
}
