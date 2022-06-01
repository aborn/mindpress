<script setup>
import { ref } from "vue";
import "../../app.css";
const mp = mpConfig(useRuntimeConfig().public.minpress)
const route = useRoute()
const tags = route.params.tag
const tag = tags[0]

const url = this.mp.searchUrl + "?tag=" + tag
console.log(url)

const { data } = await useFetch(url)
// console.log(data.value)
if (data.value.totalElements > 0) {
    const dataS = ref([])
    dataS.value = data.value.content.map((value) => {
        return mpTransform(value)
    })
    // console.log(dataS)
    const articles = dataS.value;
} else {
    const articles = []
}

</script>

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
