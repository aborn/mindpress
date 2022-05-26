<template>
    <NavBar />
    <main class="container">
        <ContentRenderer :value="articles">
            <div class="article-title">{{ articles.title }}</div>
            <MarkdownRenderer :value="articles" />
        </ContentRenderer>
    </main>
</template>

<script setup>
const articles = await parseText(DEMO_TEXT_MARKDOWN);
console.log(articles)
</script>