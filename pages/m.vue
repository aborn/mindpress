<template>
    <article>
        <h1>{{ page.title }}</h1>
        
    </article>
</template>

<script>
export default {
    setup() {
        parseMdContent(DEMO_TEXT_MARKDOWN).then(res => {
            console.log(res)
        })
        // console.log(mdArticle)
        return {
            page: {
                title: "aaa"
            }
        }
    },
    async asyncData({ $content }) {
        const page = await $content('home').fetch()
        console.log(page)
        return {
            page
        }
    }
}
</script>