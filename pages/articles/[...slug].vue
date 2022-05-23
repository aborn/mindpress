<script setup>
const route = useRoute()

const contentQuery = queryContent('drafts')
const permalink = '/articles/' + route.params.slug;
const articles = await queryContent('drafts').where({ permalink: { $eq: permalink } }).findOne()
console.log(articles);


if (route.params.slug === 'index') {
    console.log('index file route')
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
