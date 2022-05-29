<script setup>

const content = ref(DEMO_TEXT_MARKDOWN)

const { data: doc, refresh } = await useAsyncData('playground', async () => {
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

const { data } = await useFetch('http://localhost:3012/api/content?articleid=1hdefa')
console.log(data.value)

const tab = ref('Preview')

const tabs = ref(['Preview', 'AST'])
</script>

<template>
  <NavBar />
  <main class="live-playground">
    <textarea class="live-textarea" v-model="content" @input="refresh" />
    <div class="live-content">
      <div class="live-tabs">
        <button v-for="name in tabs" :key="name" class="outline" :class="{ active: name === tab }" @click="tab = name">
          {{ name }}
        </button>
      </div>
      <ContentRenderer v-if="tab === 'Preview'" :value="doc">
        <template #empty>
          <div>Content is empty.</div>
        </template>
      </ContentRenderer>
      <pre v-if="tab === 'AST'" style="padding: 1rem;">{{ doc }}</pre>
    </div>
  </main>
</template>

<style scoped>

.live-playground {
  display: flex;
  align-items: stretch;
}

.live-textarea {
  flex: 1;
  min-height: 100vh;
  width: 50%;
  border-radius: 0;
}

.live-content {
  flex: 1;
  width: 50%;
  min-height: 100vh;
  padding: 1rem;
}

.live-tabs {
  display: flex;
  flex-direction: row;
  padding: 1rem;
  gap: 1rem;
}

.tabs>button {
  opacity: 0.75;
}

.tabs>button.active {
  border-width: 2px;
  opacity: 1;
}
</style>
