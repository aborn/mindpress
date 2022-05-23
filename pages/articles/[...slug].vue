<script setup>
const route = useRoute()
const permalink = '/articles/' + route.params.slug;
const articles = await queryContent().where({ permalink: { $eq: permalink } }).findOne()
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
