export default cachedEventHandler(async () => {
    console.log("----------- nitro ------------")
    console.log("nitro: req comming...(api/settings)")
    return await useStorage('MINDPRESS_CONFIG').getItem<any>('settings') || {}
})