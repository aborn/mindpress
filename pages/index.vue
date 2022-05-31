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
const url = 'http://localhost:3012/api/markdownMeta'

async function query() {
  const { data } = await useAsyncData('home', () => queryContent().find())
  console.log(data.value)
  const { data: dataServer } = await useFetch(url)

  console.log(dataServer.value)

  if (dataServer.value.totalElements > 0) {
    const dataS = ref([])
    dataS.value = dataServer.value.content.map((value) => {
      return mpTransform(value)
    })
    console.log(dataS)
    articles.value = dataS.value;
  } else {
    articles.value = data.value;
  }
}

query();
</script>

