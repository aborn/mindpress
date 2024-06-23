<template>
    <div>
        <NavBar />
        <main class="container">
            <form @submit.prevent="formSubmit" style="display: flex;justify-content: center;margin-bottom:0rem">
                <SearchAutocomplete :items="itemsV" @input="inputAction" v-model="search" @search="enterAction" />
                <UButton @click="submit" icon="i-heroicons-magnifying-glass-16-solid"
                    style="width: 10rem;margin-left: 10px;height: 3.0rem;" block>Search</UButton>
            </form>

            <label style="margin-bottom:1rem;margin-top:1rem" v-html="hint"></label>
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
const itemsV = ref([]);
const pageNo = ref(1)
const search = ref("")
const hint = ref("")
const articles = ref<MarkdownMeta[]>([]);
const loading = ref(false)
const debounce = createDebounce()
const mp = mpConfig(useRuntimeConfig().public.minpress)
import type { SearchParams, QueryParams } from "~/types";

function inputAction(e: any) {
    console.log(e)
    const searchKey = typeof (e) === 'string' ? e : e.target.value
    search.value = searchKey
    // console.log(search.value)
    debounce(() => onChange(searchKey), 500)
}

function enterAction(key: string) {
    console.log('------ searchAction ---')
    console.log(key)
    search.value = key
    searchShows(key);
}

function onChange(key: any) {
    const searchKey = key;
    hint.value = ''
    loading.value = false;
    console.log('----onchanged:' + searchKey)
    if ((!key || key.length == 0) || mp.mode !== MINDPRESS_MODE.FCM) {
        return
    }
    const url = '/api/md/search'
    const startTime = performance.now()
    searchPageData({
        pageNo: pageNo.value, url: url
        , q: searchKey, autoSuggest: true
    } as SearchParams)
        .then(res => {
            console.log(res)
            if (res) {
                let endTime = performance.now()
                let timeCost = (endTime - startTime).toFixed(2)
                const result = res.map((i: any) => i.suggestion);
                console.log(result)
                itemsV.value = result
            } else {
                // hint.value = 'find <span style="color:red">' + 0 + "</span> markdown files."
            }
        }, error => {
            console.warn(error)
        });
}

function searchShows(searchKey: string) {
    const url = mp.searchUrl + "?q=" + searchKey
    console.log(url)

    if (mp.mode === MINDPRESS_MODE.SSG) {
        articles.value = []
        hint.value = "no markdown file find." + mp.mode
        loading.value = false
    } else if (mp.mode === MINDPRESS_MODE.FCM) {
        try {
            const url = '/api/md/search'
            let startTime = performance.now()
            loading.value = true
            searchPageData({ pageNo: pageNo.value, url: url, q: searchKey } as SearchParams).then(res => {
                if (res) {
                    articles.value = res.map((value: MarkdownMetaS) => {
                        return staticMdTransform(value)
                    })
                    let endTime = performance.now()
                    let timeCost = (endTime - startTime).toFixed(2)

                    hint.value = 'find <span style="color:red">' + res.length + `</span> markdown files. Time cost: ${timeCost} milliseconds.`
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
    console.log('--now submit... q=' + search.value)

    if (!search.value) {
        articles.value = []
        hint.value = ''
        return;
    }
    searchShows(search.value);
}

function formSubmit() {
    // case `enter` event in SearchAutocomplete component.
    console.log('--form submit, do nothing... q=' + search.value)
}
</script>