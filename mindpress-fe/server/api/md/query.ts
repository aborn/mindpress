import { defineEventHandler } from 'h3'
import fs from 'node:fs';
import { type StorageValue, prefixStorage, type Storage, createStorage } from 'unstorage'
import { parseContent } from '#content/server'
import { sortList } from '~/server/utils/match/sort';

export default defineEventHandler(async (event) => {
    console.log("----------- nitro ------------")
    console.log("nitro: req comming...(query)")
    const req = event.node.req
    const query: any = getQuery(event)
    let data = '';
    console.log(req.url)
    console.log(query)

    let sortParams: any = undefined;
    let pageQuery = false;
    let pageNo = 0;
    let pageSize = 0;
    if (req.method === 'POST') {
        const body = await readBody(event)
        sortParams = body.sort;
        if (body.pageNo && body.pageSize) {
            pageQuery = true;
            pageNo = body.pageNo - 1;
            pageSize = body.pageSize;
        }
        console.log(body)
    }

    const cacheParsedStorage: Storage = prefixStorage(useStorage(), 'cache:markdown:parsed')
    const markdownStorage: Storage = prefixStorage(useStorage(), 'markdown:source')
    let keys = await markdownStorage.getKeys('markdown:source')
    let keys2 = await cacheParsedStorage.getKeys('cache:markdown:parsed')
    // console.log(keys)
    // console.log(keys2)

    if (query._id) {
        const realId = query._id.substring('content:'.length)
        const parsedKey = `cache:markdown:parsed:${realId}`;
        const paserdValue = await cacheParsedStorage.getItem(parsedKey);
        if (paserdValue) {
            return paserdValue;
        }
    }

    const length = 'markdown:source'.length;
    const res: any[] = []

    await Promise.all(
        keys.map(async (key: string) => {
            const parsedKey = `cache:markdown:parsed:${key.substring(length + 1)}`;
            const paserdValue = await cacheParsedStorage.getItem(parsedKey);
            res.push(paserdValue)
        })
    )

    if (query._id) {
        const fond = res.find(i => i.permalink === ('/article/' + query._id))
        if (fond) {
            return fond
        }
    }

    // console.log('!!!!!!!!')
    // console.log(res)
    const sortedResult = sortList(res, sortParams || { 'createTime': -1, 'title': 1 })
    // console.log('!!!!!!!!------sorted')
    // console.log(sortedList)

    if (pageQuery) {
        const totalPage = Math.ceil(sortedResult.length / pageSize)
        pageNo = pageNo > totalPage ? totalPage : pageNo;
        const startIdx = pageNo * pageSize;
        const endIdx = (pageNo * pageSize + pageSize) > sortedResult.length ? sortedResult.length : (pageNo * pageSize + pageSize);
        return sortedResult.slice(startIdx, endIdx)
    }
    return sortedResult
})
