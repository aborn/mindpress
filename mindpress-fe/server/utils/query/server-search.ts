import type { SearchParams } from "~/types";
import { type StorageValue, prefixStorage, type Storage, createStorage } from 'unstorage'
import MiniSearch from 'minisearch'

export async function serverSearchContent(query: SearchParams) {
    let searchKey: string | undefined = query.q
    if (!searchKey) { return [] }
    const cacheParsedStorage: Storage = prefixStorage(useStorage(), 'cache:markdown:parsed')
    const markdownStorage: Storage = prefixStorage(useStorage(), 'markdown:source')
    let keys = await markdownStorage.getKeys('markdown:source')

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

    if (query.autoSuggest) {
        return miniSearch.autoSuggest(searchKey)
    }

    // Search with default options
    let startTime = performance.now()
    let results = miniSearch.search(searchKey)
    let endTime = performance.now()
    console.log(`search time const: ${endTime - startTime} milliseconds`)
    // console.log(results)

    let ids = results.map(item => item.id)
    let KV: any = {}
    results.map(item => {
        KV[item.id] = item
    })
    const searchRes = res.filter(item => {
        const idx = ids.indexOf(item._id)
        return idx >= 0
    })

    // toLowerCase() toLocaleLowerCase()
    const searchKeyIgnoreCase = searchKey.toLocaleLowerCase();

    let startTimeHight = performance.now()
    const hightResult = searchRes.map(item => {
        const matchPatten = KV[item._id].match
        console.log('           \n')
        let startTimeA = performance.now()
        console.log(matchPatten)
        const keys = matchPatten[searchKeyIgnoreCase];

        keys.forEach((key: string) => {
            const value = item[key] // 原始字符串的值
            let results = [] as string[]
            console.log('       ##')

            console.time('-----time match idx:' + item._id + ' k:' + key)
            const indexes = [...value.matchAll(new RegExp(searchKeyIgnoreCase, 'gi'))].map(a => a.index);
            console.log(indexes); // [2, 25, 27, 33]
            console.timeEnd('-----time match idx:' + item._id + ' k:' + key)
            indexes.forEach(idx => {
                const itemIdx = { s: idx, e: idx + searchKeyIgnoreCase.length } as IdxStruct;
                results.push(extraWithSurroundings(itemIdx, value))
            })

            /** 为什么这个耗时会更大？
            console.time('-----time match:' + item._id + ' k:' + key)
            const regexp = new RegExp(`(${searchKey})`, 'gi');
            //const matches = value.matchAll(regexp);
            const matches = value.matchAll(searchKeyIgnoreCase);
            console.timeEnd('-----time match:' + item._id + ' k:' + key)
            console.time(' -- time hight: ' + item._id + ' k:' + key)
            for (const match of matches) {
                console.log(
                    `Found ${match[0]} start=${match.index} end=${match.index + match[0].length
                    }.`,
                );
                const itemIdx = { s: match.index, e: match.index + match[0].length } as IdxStruct;
                console.time('----extraWithSurroundings' + item._id + ' #' + match.index)
                // results.push(extraWithSurroundings(itemIdx, value))
                console.timeEnd('----extraWithSurroundings' + item._id + ' #' + match.index)
            }
            console.timeEnd(' -- time hight: ' + item._id + ' k:' + key)
            */

            const highlightKey = (key == 'title') ? 'highlightTitle' : (key == 'originContent' ? 'highlightHtml' : null)
            if (results.length >= 0 && highlightKey) {
                item[highlightKey] = results.join(' ')
            }
        })
        let endTimeA = performance.now()
        console.log(`time spend: ${endTimeA - startTimeA} milliseconds`)
        return item;
    }).map(i => {
        i.originContent = ''
        return i;
    })
    let endTimeHight = performance.now()
    console.log(`\n\nhightlight const time spend: ${endTimeHight - startTimeHight} milliseconds`)

    return hightResult;
}

