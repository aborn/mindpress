import { defineEventHandler } from 'h3'
import fs from 'node:fs';

export default defineEventHandler(async (event) => {
    console.log("nitro: req comming...(savecontent)")
    const req = event.node.req
    const query = getQuery(event)
    let data = '';

    console.log(req.url)
    //console.log(query)

    let file;
    let articleid;
    let body;
    if (req.method === 'POST') {
        // response_mode=form_post ('POST' method)
        body = await readBody(event)
        file = body.file;
        articleid = body.articleid;
    } else {
        file = query.file;
        articleid = query.articleid;
    }

    const header =
        `---\ntitle: '` + body.title + `'\n---\n\n<!-- Content of the page -->\n`
    console.log(body)

    let isCreateFile = false;
    if (!file || file.length == 0) {
        file = "test/" + body.title + ".md"
        isCreateFile = true;
        console.log("create new file, file name=" + file)
    }

    let content = body.content
    if (body.content) {
        const modestr = '<!-- Content of the page -->';
        let idx = body.content.lastIndexOf(modestr);
        if (idx >= 0) {
            console.log('find it!!!' + idx)
            content = body.content.substring(idx + modestr.length + 1)
            console.log(content)
        }
    }
    try {
        fs.writeFileSync('/Users/aborn/github/mindpress/mindpress-fe/content/' + file, header + content);
        // console.log(data);
    } catch (err) {
        console.error(err);
    }

    return {
        md: data,
        api: 'savecontent api works',
        success: true,
        msg: 'articleid=' + articleid + ", save success!",
        ext: {
            file: file
        }
    }
})
