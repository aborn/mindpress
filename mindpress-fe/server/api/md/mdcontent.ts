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
    try {
        data = fs.readFileSync('/Users/aborn/github/mindpress/mindpress-fe/content/' + file, 'utf8');
        // console.log(data);
    } catch (err) {
        console.error(err);
    }

    if (data) {
        const modestr = '<!-- Content of the page -->';
        let idx = data.lastIndexOf(modestr);
        if (idx >= 0) {
            data = data.substring(idx + modestr.length + 1)
        }
    }

    return {
        md: data,
        api: 'mdcontent api works',
    }
})
