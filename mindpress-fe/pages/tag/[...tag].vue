<template>
    <div>
        <NavBar />
        <main class="container">
            <label style="margin-bottom:1rem" v-html="hint"></label>
            <div class="articles">
                <div class="article" v-for="article in articles" :key="article.id">
                    <PostCard :item="article" />
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref } from "vue";
const mp = mpConfig(useRuntimeConfig().public.minpress)
const route = useRoute()
const tags = route.params.tag
const tag = tags[0]
const articles = ref([]);

const url = mp.searchUrl + "?tag=" + tag
console.log(url)

const { data } = await useFetch(url)
// console.log(data.value)

if (data.value.totalElements > 0) {
    const dataS = ref([])
    dataS.value = data.value.content.map((value) => {
        return mpTransform(value)
    })
    // console.log(dataS)
    articles.value = dataS.value;
} else {
    articles.value = []
}

const hint = ref('find <span style="color:red">' + data.value.totalElements + '</span> markdown files contains tag: <span style="color:red">' + tag + '</span>.')

</script>