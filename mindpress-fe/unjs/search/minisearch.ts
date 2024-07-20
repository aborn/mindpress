import { createError } from 'h3'
import MiniSearch, { type Options as MiniSearchOptions } from 'minisearch'
import { useRuntimeConfig, useFetch, type MaybeRefOrGetter, ref, computed, toValue, type Ref } from '#imports'

export function doMiniSearch(documents: any[], searchKey: string, sFields: string[] = ['title']) {
    const segmenter = Intl.Segmenter && new Intl.Segmenter("zh", { granularity: "word" });
    let miniSearch = new MiniSearch({
        fields: sFields, // fields to index for full-text search
        storeFields: ['title', 'category'], // fields to return with search results
        processTerm: (term) => {
            if (!segmenter) return term;
            const tokens = [];
            for (const seg of segmenter.segment(term)) {
                tokens.push(seg.segment.toLowerCase());
            }
            return tokens;
        },
    })
    // Index all documents
    miniSearch.addAll(documents)
    let results = miniSearch.search(searchKey)
    return results;
}

type DataItem = /*unresolved*/ any

export async function searchMindPressSSG(searchKey: string) {
    const titleAndDescResult = await searchTitleAndDesc(searchKey);
    const res = await searchContentWrap(searchKey);
    const searchResult = res.value
    if (searchResult.length > 0) {
        const ids = searchResult.map((i: any) => {
            const arr = i.id.split('#')
            return arr[0]
        })
        const { data } = await useAsyncData('home', () => queryContent().where({ _path: { $in: ids } }).sort({ _id: 1 }).find())
        const tdata = data.value && data.value.map((value) => {
            return staticMdTransform(value)
        })

        if (tdata) {
            return titleAndDescResult.concat(tdata.filter(
                item2 => !titleAndDescResult.some(item1 => item1.id === item2.id)));
        }
    } else {
        console.log(' no search reslult...........')
    }
    return titleAndDescResult;
}

export async function searchTitleAndDesc(searchKey: string) {
    const { data } = await useAsyncData('home', () => queryContent().sort({ _id: 1 }).find())
    if (data.value && data.value.length > 0) {
        const tdata = data.value && data.value.map((value) => {
            return staticMdTransform(value)
        })
        const tdataMap = {} as any;
        tdata.forEach(i => {
            tdataMap[i.id] = i
        })
        const searchTitleResult = doMiniSearch(tdata, searchKey, ['title', 'description'])

        return searchTitleResult.map(i => {
            return tdataMap[i.id]
        })
    }

    return []
}

export async function searchContentWrap(search: MaybeRefOrGetter<string>, options: { miniSearch?: MaybeRefOrGetter<MiniSearchOptions<DataItem>> } = {}) {
    const runtimeConfig = useRuntimeConfig()
    const { content } = runtimeConfig.public
    const { integrity, api: { baseURL: baseAPI }, search: searchOptions } = content
    const { indexed: useIndexedSearch } = searchOptions || {}

    const searchRoute = `${baseAPI}/search${integrity ? '-' + integrity : ''}`

    if (useIndexedSearch) {
        const { options: miniSearchOptions } = searchOptions || {}

        const { data } = await useFetch<string>(searchRoute, { responseType: 'text' })

        if (!data.value) {
            throw createError({
                statusCode: 500,
                message: 'Missing search data'
            })
        }

        const results = useIndexedMiniSearch(search, data as Ref<string>, miniSearchOptions!)

        return results
    }

    if (!options.miniSearch) {
        throw createError({
            statusCode: 500,
            message: 'Missing miniSearch options'
        })
    }

    const { data } = await useFetch<DataItem[]>(searchRoute)

    if (!data.value) {
        throw createError({
            statusCode: 500,
            message: 'Missing search data'
        })
    }

    const results = useMiniSearch(search, data as Ref<DataItem[]>, options.miniSearch)

    return results
}

const useIndexedMiniSearch = <DataItem>(search: MaybeRefOrGetter<string>, indexedData: MaybeRefOrGetter<string>, options: MaybeRefOrGetter<MiniSearchOptions<DataItem>>) => {
    const indexedMiniSearch = computed(() => {
        return MiniSearch.loadJSON(toValue(indexedData), toValue(options))
    })

    const results = computed(() => {
        return indexedMiniSearch.value.search(toValue(search))
    })

    return results
}

const useMiniSearch = function <T = any>(search: MaybeRefOrGetter<string>, data: MaybeRefOrGetter<T[]>, options: MaybeRefOrGetter<MiniSearchOptions<T>>) {
    const miniSearch = computed(() => {
        return new MiniSearch(toValue(options))
    })

    miniSearch.value.addAll(toValue(data))

    const results = computed(() => {
        return miniSearch.value.search(toValue(search))
    })

    return results
}
