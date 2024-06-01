<template>
  <div>
    <NavBar />
    <main class="container">
      <form @submit.prevent="submit" style="display: flex;justify-content: center;margin-bottom:0rem">
        <input type="text" style="height:2.5rem" v-model="search" placeholder="Please input your keyword." />
        <button class="outline" style="margin-left: .5rem;height:2.5rem;width: 10rem;">Search</button>
      </form>

      <label style="margin-bottom:1rem" v-html="hint"></label>

      <div class="articles">
        <div class="article" v-for="article in articles" :key="article.id">
          <PostCard :item="article" />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { MarkdownMetaPageResponse, MarkdownMetaS, MarkdownMeta } from "~~/composables/types";
const search = ref("")
const mp = mpConfig(useRuntimeConfig().public.minpress)
const hint = ref("")
const articles = ref<MarkdownMeta[]>([]);

function searchShows(searchKey: string) {
  const url = mp.searchUrl + "?q=" + searchKey
  console.log(url)

  useFetch(url).then(res => {
    const data = res.data.value as MarkdownMetaPageResponse
    console.log(data)

    if (data.totalElements > 0) {
      articles.value = data.content.map((value: MarkdownMetaS) => {
        return mpTransform(value)
      })
      hint.value = 'find <span style="color:red">' + data.totalElements + "</span> markdown files."
      console.log(articles.value)
      console.log(hint.value)
    } else {
      articles.value = []
      hint.value = "no markdown file find."
    }
  }, error => {
    hint.value = "http request error. " + error
    articles.value = []
  })
}

function submit() {
  console.log('submit... q=' + search.value)
  if (!search.value) return;
  searchShows(search.value);
}
</script>
