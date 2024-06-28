export default defineNuxtPlugin(async () => {
    const asyncData = await useFetch('/api/settings')
  
    return {
      provide: {
        settings: asyncData.data.value
      }
    }
  })
  