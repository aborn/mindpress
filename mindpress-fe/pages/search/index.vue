<template>
  <div>
    <NavBar />
    <main class="container">
      <form @submit.prevent="submit" style="display: flex;justify-content: center;margin-bottom:0rem">
        <input type="text" style="height:2.5rem" v-model="search" placeholder="Please input your keyword." />
        <UButton :onclick="submit" icon="i-heroicons-magnifying-glass-16-solid" style="width: 10rem;margin-left: 10px" block>Search</UButton>
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
import mdcontent from "~/server/api/md/mdcontent";
import type { QueryParams } from "~/types";
import type { MarkdownMetaPageResponse, MarkdownMetaS, MarkdownMeta } from "~~/composables/types";
const search = ref("")
const mp = mpConfig(useRuntimeConfig().public.minpress)
const hint = ref("")
const articles = ref<MarkdownMeta[]>([]);

console.log('search.....')
console.log('mode===>' + mp.mode)

const pageNo = ref(1)

function searchShows(searchKey: string) {
  const url = mp.searchUrl + "?q=" + searchKey
  console.log(url)

  if (mp.mode === MINDPRESS_MODE.SSG) {
    articles.value = []
    hint.value = "no markdown file find." + mp.mode
  } else if (mp.mode === MINDPRESS_MODE.FCM) {
    try {
      const url = '/api/md/search'
      searchPageData({ pageNo: pageNo.value, url: url, q: searchKey } as QueryParams).then(res => {
        if (res) {
          articles.value = res.map((value: MarkdownMetaS) => {
            return staticMdTransform(value)
          })
          hint.value = 'find <span style="color:red">' + res.length + "</span> markdown files."
        } else {
          hint.value = 'find <span style="color:red">' + 0 + "</span> markdown files."
        }
      }, error => {

      });
    } catch (error) {
      console.warn(error)
    }
  } else {
    useFetch(url, {
      key: url + searchKey
    }).then(res => {
      const data = res.data.value as MarkdownMetaPageResponse
      console.log(data)

      if (data && data.totalElements > 0) {
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
}

function submit() {
  console.log('submit... q=' + search.value)

  if (!search.value) {
    articles.value = []
    hint.value = ''
    return;
  }
  searchShows(search.value);
}
</script>
