import { type StorageValue, prefixStorage, type Storage, createStorage } from 'unstorage'
import type { QueryParams } from '~/types'
import { sortList } from '~/server/utils/query/sort';

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
        const fond = res.find(i => i.permalink === ('/article/' + query._id) || i._id == query._id)
        if (fond) {
            return fond
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