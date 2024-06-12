import { defineEventHandler } from 'h3'
import fs from 'node:fs';
import os from 'node:os';
import { parseFrontMatter } from 'remark-mdc'

export default defineEventHandler(async (event) => {
    console.log("----------- nitro ------------")
    console.log("nitro: req comming...(mdcontent)")
    const req = event.node.req
    const query = getQuery(event)
    let data = '';

    console.log(req.url)
    //console.log(query)

    const computerName = os.hostname()
    const __rootDir = process.cwd();
    console.log('cccccccnnnnn->' + computerName + ", rootDir:" + __rootDir)

    let file;
    let articleid;
    if (req.method === 'POST') {
        // response_mode=form_post ('POST' method)
        const body = await readBody(event)
        file = body.file;
        articleid = body.articleid;
    } else {
        file = query.file;
        articleid = query.articleid;
    }
    let mdcontent
    try {
        const baseDir = __rootDir + '/content/';
        console.log('file--->' + baseDir + file)
        if (!fs.existsSync(baseDir + file)) {
            return {
                mdcontent: '',
                mdheader: {},
                api: 'mdcontent api works',
                status: false,
                msg: 'cannot query content, because file:' + baseDir + file + ' doesnot exists!'
            }
        }
        mdcontent = fs.readFileSync(baseDir + file, 'utf8');
    } catch (err) {
        console.log('eeeee')
        console.error(JSON.stringify(err));
    }

    let mdheader: any = '';
    if (mdcontent) {
        const { content, data: frontmatter } = await parseFrontMatter(mdcontent)
        mdheader = frontmatter;
        const modestr = '<!-- Content of the page -->';
        let idx = content.lastIndexOf(modestr);
        if (idx >= 0) {
            data = content.substring(idx + modestr.length + 1)
        } else {
            data = content;
        }
    }

    return {
        mdcontent: data,
        mdheader,
        api: 'mdcontent api works',
        status: true,
        msg: 'query success'
    }
})
