import { defineEventHandler } from 'h3'
import fs from 'node:fs';
import os from 'node:os';
import { generatePermalinkHash, downloadImageAndReplaseContent } from '../../utils/markdownUtils'
import { validateToken } from '~/server/utils/settingsUtils';
import { dateFormat } from '~/unjs/utils/date'
import { updateCache } from '../../storage'
import { isBlank, isValidFilename } from '~/unjs/utils/utils';
import { getMindPressRootPath } from '~/unjs/inf/env'
import { buildHeaderArray, MD_DIVIDER, buildHeaderKeyValue, extractBody } from '~/unjs/utils/markdown'

export default defineEventHandler(async (event) => {
    console.log("----------- nitro ------------")
    console.log("nitro: req comming...(savecontent)")
    const req = event.node.req
    const query = getQuery(event)
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
    if (isBlank(articleTitle)) {
        return {
            md: data,
            success: false,
            msg: 'article title cannot be blank!',
        }
    }
    let header: string;

    let isCreateFile = false;
    const computerName = os.hostname()
    const __rootDir = getMindPressRootPath();
    console.log('cccccccnnnnn->' + computerName + ",,,," + __rootDir)
    const todayDate = dateFormat(new Date());  // update time

    const baseDir = __rootDir + '/content/';
    if (!file || file.length == 0) { // create new file.
        const permalinkHash = generatePermalinkHash();
        const subDir = "test/"
        if (!fs.existsSync(baseDir + subDir)) {
            console.log(baseDir + subDir + ' doesnot exists! now create it!')
            fs.mkdirSync(baseDir + subDir, { recursive: true });
        }

        file = subDir + articleTitle + ".md"
        const isValidate = isValidFilename(articleTitle);
        if (!isValidate) {
            console.warn('invalid fileName:' + file)
        }
        // if file exists, generate new random name!
        if (fs.existsSync(baseDir + file) || !isValidate) {
            file = subDir + permalinkHash + ".md"
        }
        isCreateFile = true;
        console.log("create new file, file name=" + file)
        header = await buildHeader(body, true, { permalinkHash })
    } else { // file exists!
        if (fs.existsSync(baseDir + file)) {
            const stats = fs.statSync(baseDir + file);
            const createTime = dateFormat(new Date(stats.birthtimeMs > 0 ? stats.birthtime : stats.ctime), true)
            header = await buildHeader(body, false, { createTime })
        } else {
            header = await buildHeader(body, false)
        }
    }

    let contentStruct = await buildContent(body)
    const content = contentStruct.content
    console.log(header)

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
            md: data,
            success: false,
            msg: 'articleid=' + (articleid || file) + ", save failed! reason:" + err,
            ext: {
                file: file
            },
            isCreateFile
        }
    }

    return {
        md: data,
        success: true,
        msg: 'articleid=' + (articleid || file) + ", save success!",
        date: todayDate,
        ext: {
            file: file,
            contentUpdate: contentStruct.state,
            content: contentStruct.state ? content : '',
        },
        isCreateFile
    }
})

async function buildContent(body: any) {
    let content = extractBody(body.content)
    const contentUpdate = await downloadImageAndReplaseContent(content);
    content = contentUpdate.state ? contentUpdate.content : content;
    return {
        content,
        state: contentUpdate.state
    }
}

async function buildHeader(body: any, isCreateNewFile: boolean, extra: any = {}): Promise<string> {
    const articleTitle = body.title
    const todayDate = dateFormat(new Date());  // update time
    let header =
        `---\ntitle: '` + articleTitle + `'\n` +
        `date: '` + todayDate + `'\n`;
    const idxNames = ['author', 'authors', 'permalink', 'category', 'tag', 'mpid', 'mpstatus']

    console.log('---body header---')
    console.log(body.header)
    console.log('----------')

    idxNames.forEach(item => {
        if (body.hasOwnProperty(item)) {
            if ('permalink' === item) {
                if (body.header && body.header.permalink) {
                    header = header + `permalink: '` + body.header.permalink + `'\n`
                } else if (body[item] && body[item].indexOf(':') < 0) {
                    header = header + `permalink: '` + body[item] + `'\n`
                }
            } else {
                if ('author' === item || 'authors' === item) {
                    const value = JSON.stringify(body[item])
                    header = header + item + `: ` + value + `\n`
                } else {
                    header = header + item + `: '` + body[item] + `'\n`
                }
            }
        } else if (body && body.header && body.header.hasOwnProperty(item)) {
            console.log('itttttteeeeeeeeeeemmm:' + item)
            console.log(body.header[item])
            if ('category' === item || 'tag' === item) {
                header = header + buildHeaderKeyValue(item, buildHeaderArray(body.header[item]), false)
            } else {
                header = header + buildHeaderKeyValue(item, body.header[item] as string)
            }
        }
    })

    let createTimeUpdate = false;
    if (body.header && body.header.createTime) {
        header = header + `createTime: '` + body.header.createTime + `'\n`
        createTimeUpdate = true
    }

    if (isCreateNewFile) {
        const settings = await useStorage('MINDPRESS_CONFIG').getItem<SettingStruct>('settings')
        const author = settings && settings.author ?
            `author: {"name":"${settings.author}","link":"${settings.author}"}\n` : ''
        const permalinkHash = extra.permalinkHash
        header = header
            + buildHeaderKeyValue('createTime', dateFormat(new Date()))
            + buildHeaderKeyValue('permalink', '/article/' + permalinkHash)
            + buildHeaderKeyValue('mpid', permalinkHash)
            + buildHeaderKeyValue('mpstatus', 'draft')  // draft publish  (mppubtime --> publish time)
            + author
    } else {
        const createTime = extra.createTime
        if (createTime && !createTimeUpdate) {
            header = header + buildHeaderKeyValue('createTime', createTime)
        }
    }

    header = header + `---\n\n${MD_DIVIDER}\n`;
    return header;
}
