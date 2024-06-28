export default cachedEventHandler(async () => {
    return await useStorage('MINDPRESS_CONFIG').getItem<any>('settings') || {}
})