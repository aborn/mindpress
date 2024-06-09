import { defineEventHandler } from 'h3'
import fs from 'node:fs';

export default defineEventHandler(async (event) => {
    console.log("nitro: req comming...(mdcontent)")
    const req = event.node.req
    const query = getQuery(event)
    let data = '';

    console.log(req.url)
    //console.log(query)

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
        mdcontent = fs.readFileSync('/Users/aborn/github/mindpress/mindpress-fe/content/' + file, 'utf8');
        // console.log(data);
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
    console.log('$$$$$')
    console.log(mdheader)

    return {
        md: data,
        mdheader,
        api: 'mdcontent api works',
    }
})
