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

    console.log('--------results-----')
    console.log(JSON.stringify(results))

    let ids = results.map(item => item.id)
    let KV: any = {}
    results.map(item => {
        KV[item.id] = item
    })
    // console.log('--------KV-----')

    //console.log(KV)


    const searchRes = res.filter(item => {
        const idx = ids.indexOf(item._id)
        return idx >= 0
    })
    /*.map(i => {
        i.originContent = ''
        return i;
    })*/

    const hightResult = searchRes.map(item => {
        const matchPatten = KV[item._id].match
        console.log('-----key' + item._id)
        console.log(matchPatten)
        const keys = matchPatten[searchKey];
        console.log(keys)
        keys.forEach((key: string) => {
            const value = item[key]
            const idx = value.toLowerCase().indexOf(searchKey.toLowerCase())
            const idxLast = value.toLowerCase().lastIndexOf(searchKey.toLowerCase());
            const highlightKey = (key == 'title') ? 'highlightTitle' : (key == 'originContent' ? 'highlightHtml' : null)
            console.log('---h>>>' + highlightKey + ' , idx=' + idx)
            if (idx >= 0 && highlightKey) {
                item[highlightKey] = getHtmlValue(idx, idxLast, value, searchKey)
            }
        })
        return item;
    }).map(i => {
        i.originContent = ''
        return i;
    })

    // console.log('-------hhhhh')
    // console.log(hightResult)

    return hightResult
})


function getHtmlValue(idx: number, idxLast: number | undefined, value: string, searchKey: string) {
    const highlight = '<span style="color:red">' + searchKey + '</span>';
    const searchBackLength = 10;
    const startIdx = (idx - searchBackLength) >= 0 ? idx - searchBackLength : 0;
    let result = value.substring(startIdx, idx) + highlight;

    const searchFowardLength = 10;
    const maxIdx = (idxLast && idxLast >= 0) ?
        (idxLast + searchKey.length + searchFowardLength) :
        (idx + searchKey.length + searchFowardLength);
    const endIdx = maxIdx > value.length ? value.length : maxIdx;
    return result + value.substring(idx + searchKey.length, maxIdx)

}