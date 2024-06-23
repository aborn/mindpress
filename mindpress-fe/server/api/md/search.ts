import { defineEventHandler } from 'h3'
import MiniSearch from 'minisearch'
import { type StorageValue, prefixStorage, type Storage, createStorage } from 'unstorage'
import { extractBody } from '~/server/utils/markdownUtils';

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
            const paserdValue = await cacheParsedStorage.getItem(parsedKey) as any;
            const sourceValue = await markdownStorage.getItem(sourceKey);
            paserdValue.originContent = extractBody(sourceValue as string)
            res.push(paserdValue)
        })
    )

    // CJK Search https://github.com/lucaong/minisearch/issues/201
    const segmenter = Intl.Segmenter && new Intl.Segmenter("zh", { granularity: "word" });
    let miniSearch = new MiniSearch({
        fields: ['title', 'originContent'], // fields to index for full-text search
        storeFields: ['title', 'category'], // fields to return with search results
        processTerm: (term) => {
            if (!segmenter) return term;
            const tokens = [];
            for (const seg of segmenter.segment(term)) {
                tokens.push(seg.segment);
            }
            return tokens;
        }
    })

    const documents = res.map(item => {
        item.id = item._id
        return item;
    })

    // Index all documents
    miniSearch.addAll(documents)

    // Search with default options
    var startTime = performance.now()
    let results = miniSearch.search(searchKey)
    var endTime = performance.now()
    console.log(`search time const: ${endTime - startTime} milliseconds`)

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

    // toLowerCase() toLocaleLowerCase()
    const searchKeyIgnoreCase = searchKey.toLocaleLowerCase();
    console.log('---origin:' + searchKey + ', now search:' + searchKeyIgnoreCase)
    const hightResult = searchRes.map(item => {
        const matchPatten = KV[item._id].match
        console.log('-----key--->' + item._id)
        console.log(matchPatten)
        const keys = matchPatten[searchKeyIgnoreCase];
        keys.forEach((key: string) => {
            const value = item[key]
            const idx = value.toLowerCase().indexOf(searchKeyIgnoreCase)
            const idxLast = value.toLowerCase().lastIndexOf(searchKeyIgnoreCase);
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

    var endTime2 = performance.now()
    console.log(`dealing time spend: ${endTime2 - endTime} milliseconds`)

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