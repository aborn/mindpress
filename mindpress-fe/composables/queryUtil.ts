import type { QueryParams } from "~/types";

export async function queryMode() {
    const url = '/api/md/status'
    let mode = 'ssg'
    try {
        const { data: dataStatus } = await useFetch(url);
        const status = dataStatus.value as any
        if (status.mode) {
            mode = status.mode
        }
    } catch (error) {
        console.warn(error)
    }
    return mode;
}

export async function searchPageData(query: QueryParams) {
    if (!query.url) { return {} }
    const dataQ: any = await $fetch(query.url, {
        method: "POST",
        body: {
            'q': query.q,
            'pageNo': query.pageNo,  // start from 1
            'pageSize': query.pageSize || 9,
            'sort': query.sort || { 'createTime': -1, 'title': 1 }
        }
    });

    console.log('search result .......')
    console.log(dataQ)
   
    return dataQ;
}

export async function queryPageData(query: QueryParams) {
    if (!query.url) { return {} }
    const dataQ: any = await $fetch(query.url, {
        method: "POST",
        body: {
            'pageNo': query.pageNo,  // start from 1
            'pageSize': query.pageSize || 9,
            'sort': query.sort || { 'createTime': -1, 'title': 1 }
        }
    });

    // console.log(dataQ)
    dataQ.data = dataQ.data.map((value: any) => {
        return staticMdTransform(value)
    })
    return dataQ;
}