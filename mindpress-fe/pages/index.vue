<template>
  <div>
    <NavBar />
    <main class="container">
      <div class="articles">
        <div class="article" v-for="article in articles" :key="article.id">
          <PostCard :item="article" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue"
const articles = ref([]);
const mp = mpConfig(useRuntimeConfig().public.minpress)
const useReqURL = useRequestURL()
// console.log(useReqURL)
const apiBaseURL = useReqURL.protocol + '//' + useReqURL.host
console.log(mp)
console.log(apiBaseURL)
let isDev = isDevMode(useReqURL.hostname);
console.log('isDevMode:' + isDev)
console.log('mode===>' + mp.mode)

if (mp.mode === MINDPRESS_MODE.SSG) {
  if (articles.value.length <= 0) {
    const { data } = await useAsyncData('home', () => queryContent().sort({ _id: 1 }).find())
    console.log('--------dataVVVVVVV-----')
    console.log(data.value)
    const tdata = data.value.map((value) => {
      return staticMdTransform(value, isDev)
    })
    // console.log('***************')
    // console.log(tdata)
    articles.value = tdata; //data.value;
  }
} else if (mp.mode === MINDPRESS_MODE.FCM) {
  try {
    const { data: dataQ } = await useFetch('/api/md/query');
    const tdata = dataQ.value.map((value) => {
      return staticMdTransform(value, isDev)
    })
    articles.value = tdata
    console.log('***************')
    console.log(tdata)
  } catch (error) {
    console.warn(error)
  }
} else {
  const { data: dataServer } = await useFetch(mp.metaUrl)
  // console.log(dataServer.value)

  if (dataServer.value.totalElements > 0) {
    const dataS = ref([])
    dataS.value = dataServer.value.content.map((value) => {
      return mpTransform(value)
    })
    // console.log(dataS)
    articles.value = dataS.value;
  }
}

</script>
