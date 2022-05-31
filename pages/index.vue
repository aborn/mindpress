<template>
  <NavBar />
  <main class="container">
    <div class="articles">
      <div class="article" v-for="article in articles" :key="article.id">
        <PostCard :item="article" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue"
const articles = ref([]);
const mp = useRuntimeConfig().public.minpress

if (mp.mode === MINDPRESS_MODE.static) {
  console.log('static mode')
  const { data } = await useAsyncData('home', () => queryContent().find())
  // console.log(data.value)
  articles.value = data.value;
} else {
  console.log('server mode')
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

