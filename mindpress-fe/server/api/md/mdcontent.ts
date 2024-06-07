import { defineEventHandler } from 'h3'
import fs from 'node:fs';

export default defineEventHandler(async (event) => {
    console.log("nitro: req comming...")
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

    return {
        md: data,
        api: 'nuxt-openid-connect api works'
    }
})
