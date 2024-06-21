import { defineEventHandler } from 'h3'
import MiniSearch from 'minisearch'
import { type StorageValue, prefixStorage, type Storage, createStorage } from 'unstorage'

export default defineEventHandler(async (event) => {
    console.log("----------- nitro ------------")
    console.log("nitro: req comming...(search)")
    const req = event.node.req
    const query = getQuery(event)
    let data = '';
    console.log(req.url)
    console.log(query)

    let searchKey: any = query.q
    if (req.method === 'POST') {
        const body = await readBody(event)
        searchKey = body.q;
    }

    if (!searchKey || searchKey.trim().length == 0) {
        return []
    }

    const cacheParsedStorage: Storage = prefixStorage(useStorage(), 'cache:markdown:parsed')
    const markdownStorage: Storage = prefixStorage(useStorage(), 'markdown:source')
    let keys = await markdownStorage.getKeys('markdown:source')
    // let keys2 = await cacheParsedStorage.getKeys('cache:markdown:parsed')
    // console.log(keys)
    // console.log(keys2)

    const length = 'markdown:source'.length;
    const res: any[] = []

    await Promise.all(
        keys.map(async (key: string) => {
            const parsedKey = `cache:markdown:parsed:${key.substring(length + 1)}`;
            const sourceKey = `markdown:source:${key.substring(length + 1)}`;
            const paserdValue = await cacheParsedStorage.getItem(parsedKey);
            const sourceValue = await markdownStorage.getItem(sourceKey);
            paserdValue.originContent = sourceValue
            res.push(paserdValue)
        })
    )

    let miniSearch = new MiniSearch({
        fields: ['title', 'originContent'], // fields to index for full-text search
        storeFields: ['title', 'category'] // fields to return with search results
    })

    const documents = res.map(item => {
        item.id = item._id
        return item;
    })

    // Index all documents
    miniSearch.addAll(documents)

    // Search with default options
    let results = miniSearch.search(searchKey)

    let ids: any[] = []
    results.map(item => {
        ids.push(item.id);
    })

    const searchRes = res.filter(item => {
        const idx = ids.indexOf(item._id)
        return idx >= 0
    }).map(i => {
        i.originContent = ''
        return i;
    })

    return searchRes
})
