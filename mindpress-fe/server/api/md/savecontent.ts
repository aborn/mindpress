import { defineEventHandler } from 'h3'
import fs from 'node:fs';
import os from 'node:os';
import { generatePermalinkHash, downloadImageAndReplaseContent, MD_DIVIDER, buildHeaderArray } from '../../utils/markdownUtils'
import { validateToken } from '~/server/utils/settingsUtils';
import { dateFormat } from '~/unjs/utils/date'
import { updateCache } from '../../storage'
import { isBlank, isValidFilename } from '~/unjs/utils/utils';
import { getMindPressRootPath } from '~/unjs/inf/env'

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

    let file;
    let articleid;
    let body: any;
    if (req.method === 'POST') {
        body = await readBody(event)
        file = body.file;
        articleid = body.articleid;
    } else {
        file = query.file;
        articleid = query.articleid;
    }

    const todayDate = dateFormat(new Date());
    const articleTitle = body.title
    if (isBlank(articleTitle)) {
        return {
            md: data,
            success: false,
            msg: 'article title cannot be blank!',
        }
    }

    let header =
        `---\ntitle: '` + articleTitle + `'\n` +
        `date: '` + todayDate + `'\n`;

    console.log('---body header---')
    console.log(body.header)
    console.log('----------')
    const idxNames = ['author', 'authors', 'permalink', 'category', 'tag']
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
                header = header + `${item}: ` + buildHeaderArray(body.header[item]) + ``
            } else {
                header = header + `${item}: '` + body.header[item] + `'\n`
            }
        }
    })

    // console.log('------bodyheader-----')
    // console.log(body.header)

    let isCreateFile = false;
    const computerName = os.hostname()
    const __rootDir = getMindPressRootPath();
    console.log('cccccccnnnnn->' + computerName + ",,,," + __rootDir)

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
        const settings = await useStorage('MINDPRESS_CONFIG').getItem<SettingStruct>('settings')
        const author = settings && settings.author ?
            `author: {"name":"${settings.author}","link":"${settings.author}"}\n` : ''
        header = header +
            `createTime: '` + dateFormat(new Date()) + `'\n` +
            `permalink: '/article/` + permalinkHash + `'\n` + author
    } else { // file exists!
        if (body.header && body.header.createTime) {
            header = header + `createTime: '` + body.header.createTime + `'\n`
        } else if (fs.existsSync(baseDir + file)) {
            const stats = fs.statSync(baseDir + file);
            // console.log(stats);
            header = header +
                `createTime: '` + dateFormat(new Date(stats.birthtimeMs > 0 ? stats.birthtime : stats.ctime), true) + `'\n`
        }
    }

    let content = body.content
    if (body.content) {
        let idx = body.content.lastIndexOf(MD_DIVIDER);
        if (idx >= 0) {
            // console.log('find it!!!' + idx)
            content = body.content.substring(idx + MD_DIVIDER.length + 1)
            // console.log(content)
        }
    }

    const contentUpdate = await downloadImageAndReplaseContent(content);
    content = contentUpdate.state ? contentUpdate.content : content;

    console.log('hhhh--header-----' + contentUpdate.state)
    console.log(header)
    header = header + `---\n\n${MD_DIVIDER}\n`;
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
        ext: {
            file: file,
            contentUpdate: contentUpdate.state,
            content: contentUpdate.state ? contentUpdate.content : ''
        },
        isCreateFile
    }
})