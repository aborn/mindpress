
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

export async function queryPageData(pageNo: number, mode: string = 'fcm') {
    const dataQ = await $fetch('/api/md/query', {
        method: "POST",
        body: {
            'pageNo': pageNo,  // start from 1
            'pageSize': 9,
            'sort': { 'createTime': -1, 'title': 1 }
        }
    });

    // console.log(dataQ)
    dataQ.data = dataQ.data.map((value: any) => {
        return staticMdTransform(value)
    })
    return dataQ;
}