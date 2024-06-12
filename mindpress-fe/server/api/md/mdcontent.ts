import { defineEventHandler } from 'h3'
import fs from 'node:fs';
import os  from 'node:os';

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
    console.log('cccccccnnnnn->' + computerName + ",,,," + __rootDir)

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
        mdcontent = fs.readFileSync( baseDir + file, 'utf8');
    } catch (err) {
        console.error(err);
    }

    let mdheader = '';
    if (mdcontent) {
        const modestr = '<!-- Content of the page -->';
        let idx = mdcontent.lastIndexOf(modestr);
        if (idx >= 0) {
            mdheader = mdcontent.substring(0, idx)
            data = mdcontent.substring(idx + modestr.length + 1)
        } else {
            data = mdcontent;
        }
    }

    return {
        md: data,
        mdheader,
        api: 'mdcontent api works',
    }
})
