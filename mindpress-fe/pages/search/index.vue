<template>
  <div>
    <NavBar />
    <main class="container">
      <form @submit.prevent="submit" style="display: flex;justify-content: center;margin-bottom:0rem">
        <input ref="searchInput" type="text" v-model="search" placeholder="Please input your keyword." />
        <UButton @click="submit" icon="i-heroicons-magnifying-glass-16-solid"
          style="width: 10rem;margin-left: 10px; font-size: larger;" block>Search</UButton>
      </form>

      <label style="margin-bottom:1rem" v-html="hint"></label>
      <UProgress v-if="loading" animation="carousel" />

      <div class="articles">
        <div v-if="!loading" class="article" v-for="article in articles" :key="article.id">
          <PostCard :item="article" />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { SearchParams } from "~/types";
import { doMiniSearch, searchContentWrap, searchMindPressSSG } from "~/unjs/search/minisearch";
import type { MarkdownMetaPageResponse, MarkdownMetaS, MarkdownMeta } from "~~/composables/types";

const search = ref("")
const mp = mpConfig(useRuntimeConfig().public.mindpress)
const hint = ref("")
const articles = ref<MarkdownMeta[]>([]);
const loading = ref(false)
const searchInput = ref(null as any)
console.log('search.....')
console.log('mode===>' + mp.mode)
const pageNo = ref(1)

onMounted(() => {
  if (import.meta.client) {
    // https://vuejs.org/guide/essentials/template-refs
    if (searchInput && searchInput.value) {
      searchInput.value.focus()
    }
  }
})

function searchShows(searchKey: string) {
  const url = mp.searchUrl + "?q=" + searchKey
  console.log(url)

  if (mp.mode === MINDPRESS_MODE.SSG) {
    loading.value = true
    let startTime = performance.now()

    searchMindPressSSG(searchKey).then(async (searchResult: any) => {
      console.log(searchResult)

      if (searchResult.length > 0) {
        articles.value = searchResult as any;
        let endTime = performance.now()
        let timeCost = (endTime - startTime).toFixed(2)
        hint.value = `Mindpress found <span style="color:red">${searchResult.length}</span> files (key:<span style="color:red">${searchKey}</span>). Time cost: ${timeCost} milliseconds.`
        loading.value = false
      } else {
        articles.value = []
        hint.value = "no markdown file find." + mp.mode
        loading.value = false
      }
    })

    /**
    searchContent(searchKey).then(async (res: any) => {
      const searchResult = res.value
      console.log(searchResult)

      if (searchResult.length > 0) {
        const ids = searchResult.map((i: any) => {
          const arr = i.id.split('#')
          return arr[0]
        })
        //console.log(ids)
        const { data } = await useAsyncData('home', () => queryContent().where({ _path: { $in: ids } }).sort({ _id: 1 }).find())
        const tdata = data.value && data.value.map((value) => {
          return staticMdTransform(value)
        })

        articles.value = tdata as any;
        let endTime = performance.now()
        let timeCost = (endTime - startTime).toFixed(2)
        hint.value = `Mindpress found <span style="color:red">${searchResult.length}</span> files (key:<span style="color:red">${searchKey}</span>). Time cost: ${timeCost} milliseconds.`
        loading.value = false
      } else {
        articles.value = []
        hint.value = "no markdown file find." + mp.mode
        loading.value = false
      }
    })*/

    articles.value = []
    hint.value = "no markdown file find." + mp.mode
    loading.value = false
  } else if (mp.mode === MINDPRESS_MODE.FCM) {
    try {
      const url = '/api/md/search'
      let startTime = performance.now()
      loading.value = true
      hint.value = ''
      articles.value = []
      searchPageData({ pageNo: pageNo.value, url: url, q: searchKey, highlight: true } as SearchParams).then(res => {
        if (res) {
          articles.value = res.map((value: MarkdownMetaS) => {
            return staticMdTransform(value)
          })
          let endTime = performance.now()
          let timeCost = (endTime - startTime).toFixed(2)
          hint.value = `Mindpress found <span style="color:red">${res.length}</span> files (key:<span style="color:red">${searchKey}</span>). Time cost: ${timeCost} milliseconds.`
        } else {
          hint.value = 'find <span style="color:red">' + 0 + "</span> markdown files."
        }
        loading.value = false
      }, error => {
        loading.value = false
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
