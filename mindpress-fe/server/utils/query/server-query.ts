import { type StorageValue, prefixStorage, type Storage, createStorage } from 'unstorage'
import type { QueryParams } from '~/types'
import { sortList } from '~/server/utils/query/sort';
import { parseFrontMatter } from 'remark-mdc'
import fs from 'node:fs';
import { getMindPressRootPath } from '~/unjs/inf/env'
import { extractBody } from '~/unjs/utils/markdown'
import { MOCK_MD_CONTENT, MOCK_MD_CONTENT2, MOCK_MD_HEADER } from '~/test/mock/mockdata'


// TODO add filter function.
export async function serverQueryContent(query: QueryParams) {
    console.log('--------serverQueryContent----------')
    console.log(query)
    const cacheParsedStorage: Storage = prefixStorage(useStorage(), 'cache:markdown:parsed')
    const markdownStorage: Storage = prefixStorage(useStorage(), 'markdown:source')
    let keys = await markdownStorage.getKeys('markdown:source')
    // let keys2 = await cacheParsedStorage.getKeys('cache:markdown:parsed')
    // console.log(keys)
    // console.log(keys2)

    if (query._id) {
        const realId = query._id.substring('content:'.length)
        const parsedKey = `cache:markdown:parsed:${realId}`;
        const paserdValue = await cacheParsedStorage.getItem(parsedKey);
        return paserdValue;
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
        const fond = res.find(i => i.permalink === ('/article/' + query._id) || i._id == query._id)
        if (fond) {
            return fond
        } else {
            console.error(`not find articleid=${query._id} file in server side.`)
        }
    }

    const sortedList = sortList(res, query.sort || { 'createTime': -1, 'title': 1 })
    // console.log('!!!!!!!!------sorted')
    // console.log(sortedList)

    let pageNo = query.pageNo
    const pageSize = query.pageSize || 10
    if (pageNo) {
        pageNo = pageNo - 1;     // origin pageNo starts from 1
        const totalPage = Math.ceil(sortedList.length / pageSize)  // 向上取正
        pageNo = pageNo > totalPage ? totalPage : pageNo;
        const startIdx = pageNo * pageSize;
        const endIdx = (pageNo * pageSize + pageSize) > sortedList.length ? sortedList.length : (pageNo * pageSize + pageSize);
        console.log('pageNo:' + pageNo + ', totalPage:' + totalPage + ", total:" + sortedList.length + ", sIdx:" + startIdx + ", eIdx:" + endIdx)
        return {
            data: sortedList.slice(startIdx, endIdx),
            pageNo: query.pageNo,
            pageSize: pageSize,
            total: sortedList.length,
            totalPage: totalPage
        }
    }

    return sortedList
}

export async function queryFileContent(query: { file: string, articleid: string }) {
    let mdcontent
    let data = '';
    const { file, articleid } = query;
    try {
        const baseDir = getMindPressRootPath() + '/content/';
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
        console.error(JSON.stringify(err));
    }

    let mdheader: any = '';
    //console.warn('--------------mkdcont------')
    //console.log(mdcontent)

    if (mdcontent) {
        const { content, data: frontmatter } = await parseFrontMatter(mdcontent)
        mdheader = frontmatter;
        data = extractBody(content)
    }

    return {
        mdcontent: data,
        mdheader,
        api: 'mdcontent api works',
        status: true,
        msg: 'query success'
    }
}