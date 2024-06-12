import { defineEventHandler } from 'h3'
import fs from 'node:fs';
import os from 'node:os';

import { dateFormat } from '../../utils/date'
import { updateCache } from '../../storage'

export default defineEventHandler(async (event) => {
    console.log("----------- nitro ------------")
    console.log("nitro: req comming...(savecontent)")
    const req = event.node.req
    const query = getQuery(event)
    let data = '';

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
    let header =
        `---\ntitle: '` + body.title + `'\n` +
        `date: '` + todayDate + `'\n`;

    const idxNames = ['author', 'authors', 'permalink']

    idxNames.forEach(item => {
        if (body.hasOwnProperty(item)) {
            if ('permalink' === item) {
                if (body[item] && body[item].indexOf(':') < 0) {
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
        }
    })

    let isCreateFile = false;
    const computerName = os.hostname()
    const __rootDir = process.cwd();
    console.log('cccccccnnnnn->' + computerName + ",,,," + __rootDir)

    const baseDir = __rootDir + '/content/';
    if (!file || file.length == 0) { // create new file. TODO: deal with file name exits.
        file = "test/" + body.title + ".md"
        isCreateFile = true;
        console.log("create new file, file name=" + file)
    } else { // file exists!
        if (fs.existsSync(baseDir + file)) {
            const stats = fs.statSync(baseDir + file);
            if (stats.birthtime) {
                header = header +
                    `createTime: '` + dateFormat(new Date(stats.birthtime)) + `'\n`
            }
            // console.log(stats);
        }
    }

    let content = body.content
    if (body.content) {
        const modestr = '<!-- Content of the page -->';
        let idx = body.content.lastIndexOf(modestr);
        if (idx >= 0) {
            // console.log('find it!!!' + idx)
            content = body.content.substring(idx + modestr.length + 1)
            // console.log(content)
        }
    }

    console.log('hhhhh0-----')
    console.log(header)
    header = header + `---\n\n<!-- Content of the page -->\n`;
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
    }

    return {
        md: data,
        success: true,
        msg: 'articleid=' + (articleid || file) + ", save success!",
        ext: {
            file: file
        }
    }
})
