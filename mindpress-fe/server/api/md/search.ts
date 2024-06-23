import { defineEventHandler } from 'h3'
import { serverSearchContent } from '~/server/utils/query/server-search';
import type { SearchParams } from '~/types';

export default defineEventHandler(async (event) => {
    console.log("----------- nitro ------------")
    console.log("nitro: req comming...(search)")
    const req = event.node.req
    const query = getQuery(event)
    console.log(req.url)
    console.log(query)

    let searchKey: any = query.q
    let autoSuggest = query.autoSuggest as boolean;
    if (req.method === 'POST') {
        const body = await readBody(event)
        searchKey = body.q;
        autoSuggest = body.autoSuggest;
    }

    if (!searchKey || searchKey.trim().length == 0) {
        return []
    }

    const searchQuery = { q: searchKey, autoSuggest: autoSuggest } as SearchParams;
    return serverSearchContent(searchQuery)
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