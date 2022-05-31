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
    doc.value.author = data.value.updateBy;
    doc.value.time = data.value.updateTime;
    articles.value = doc.value
}
const formatDate = mpFormatDate;
</script>

<template>
    <NavBar />
    <main class="container">
        <div class="article-title">{{ articles.title }}</div>
        <div class="article-meta">
            <img style="max-width: 23px;margin-right: 0.3rem;"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABQElEQVRoge2aWwqDMBBFb4u76DraNfjl5lvpv49VCLYfTiRiHkajGWUOBDEOM7l5DYYAy8kB1AB+VCqqi8Xe/kcqLYge7Cz+R5Rz23tS//eIDUmKLqQA0GI+vL6esdmHllD/LbV5hkuEKWAsAVv8Ny7lvp5Zah9KqP/J90uuER81PfWeqC22a4jm3zeUOaZ7/R4JMcS/tb2x5/zeyBphTWaoO9P0Grn0iNwOb8U6JjPnMiMiQrghQrghQrghQrghQrghQriRQsgLQAn/mVVJtsEc9c++RIQqH4ef5IcPPcUx/QspMrLpHTbJhSyNIyeNp0aEcEOEbEDtNL7tV7f1kkLIl54d7ImwI5tyTYCj8sgLQ8b2ZfU3gKfDT/KEGAtJiKwRIdzQ9/IWwAPnWvCtqbLAcJNgrxsNsUsDyxUOgQN/Ae4C203zZCwAAAAASUVORK5CYII=" />
            <span class="article-meta">{{ formatDate(articles.time, 'zh') }} </span>
            <span class="article-meta" style="margin-left:0.3rem">{{articles.author}}</span>
            <span class="article-edit">Edit</span>
        </div>
        <ContentRenderer :value="articles">
            <template #empty>
                <p>No content found.</p>
            </template>
        </ContentRenderer>
    </main>
</template>
