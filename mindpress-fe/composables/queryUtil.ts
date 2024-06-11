
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