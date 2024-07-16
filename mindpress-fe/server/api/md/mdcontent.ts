import { defineEventHandler } from 'h3'
import fs from 'node:fs';
import os from 'node:os';
import { parseFrontMatter } from 'remark-mdc'
import { extractBody } from '~/server/utils/markdownUtils';
import { queryFileContent } from '~/server/utils/query/server-query';

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
    return await queryFileContent({ file, articleid })
})
