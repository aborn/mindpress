import { defineEventHandler } from 'h3'
import fs from 'node:fs';
import { serverQueryContent } from '~/server/utils/query/server-query'
import type { QueryParams } from '~/types';

export default defineEventHandler(async (event) => {
    console.log("----------- nitro ------------")
    console.log("nitro: req comming...(query)")
    const req = event.node.req
    const query: any = getQuery(event)
    console.log(req.url)
    console.log(query)

    let serverQuery: QueryParams = {} as QueryParams;
    serverQuery._id = query._id
    if (req.method === 'POST') {
        const body = await readBody(event)
        console.log(body)

        serverQuery.sort = body.sort;
        serverQuery.pageNo = body.pageNo;
        serverQuery.pageSize = body.pageSize;
    }

    return await serverQueryContent(serverQuery);
})
