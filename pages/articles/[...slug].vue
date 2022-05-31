<script setup>
const route = useRoute()
const articles = ref();

const mp = useRuntimeConfig().public.minpress
// console.log(mp)

if (mp.mode === MINDPRESS_MODE.static) {
    console.log('static mode.')
    const permalink = '/articles/' + route.params.slug;
    const dataL = await queryContent().where({ permalink: { $eq: permalink } }).findOne()
    articles.value = dataL.value;
} else {
    console.log('server mode.')
    const articleid = route.params.slug[0]
    const url = mp.baseUrl + articleid
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
    articles.value = doc.value
}
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
