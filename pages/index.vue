<template>
  <NavBar />
  <main class="container">
    <div class="shows">
      <div class="show" v-for="article in articles" :key="article.id">
          <article>
            <header>{{ article.title }}</header>
            <NuxtLink :to="`${article.path}`">
            {{ article.description }}
            </NuxtLink>
            <footer>{{ article.mtime }}</footer>
          </article>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue"
const articles = ref([]);

async function query() {
  const { data } = await useAsyncData('home', () => queryContent().find())
  articles.value = data.value;
}

query();
</script>

