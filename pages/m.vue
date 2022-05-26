<template>
    <NavBar />
    <main class="container">
        <ContentRenderer :value="doc">
            <div class="article-title">{{ doc.title }}</div>
            <MarkdownRenderer :value="doc" />
        </ContentRenderer>
    </main>
</template>

<script setup>
const content = ref(DEMO_TEXT_MARKDOWN)
const { data: doc } = await useAsyncData('serv', async () => {
  try {
    return await $fetch('/api/parse', {
      method: 'POST',
      cors: true,
      body: {
        id: 'content:_servercontent.md',
        content: content.value
      }
    })
  } catch (e) {
    return doc.value
  }
})

</script>