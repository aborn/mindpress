<script setup>
const route = useRoute()
const permalink = '/articles/' + route.params.slug;
//const articles = await queryContent().where({ permalink: { $eq: permalink } }).findOne()

const articleid = route.params.slug[0]
const url = 'http://localhost:3012/api/content/' + articleid
// console.log(url)

const { data } = await useFetch(url)
// console.log(data.value)

const content = ref(data.value.content)

const { data: doc, refresh } = await useAsyncData(articleid, async () => {
    try {
        return await $fetch('/api/parse', {
            method: 'POST',
            cors: true,
            body: {
                id: 'content:_file.md',
                content: content.value
            }
        })
    } catch (e) {
        return doc.value
    }
})

// console.log(doc.value)

// modify title
doc.value.title = data.value.title;
const articles = doc.value

// console.log(articles);
</script>

<template>
    <NavBar />
    <main class="container">
        <div class="article-title">{{ articles.title }}</div>
        <ContentRenderer :value="articles">
            <template #empty>
                <p>No content found.</p>
            </template>
        </ContentRenderer>
    </main>
</template>
