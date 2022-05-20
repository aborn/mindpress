<template>
  <NavBar />
  <main class="container">
    <div class="articles">
      <div class="article" v-for="article in articles" :key="article.id">
          <article>
            <header>{{ article.title }}</header>
            <a :href="`${article.path}`">
            {{ article.description }}
            </a>
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

