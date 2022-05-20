<template>
  <NavBar />
  <main class="container">
    <div class="articles">
      <div class="article" v-for="article in articles" :key="article.id">
        <div style="flex-shrink: 0">
          <img src="/assets/img/flex.JPG" alt="flex demo" loading="lazy" width="480px" height="auto"
            sizes="sm:355px md:320px lg:480px" class="card-image" />
        </div>
        <div class="card-content">
          <a :href="`${article.path}`">
            <h2 class="text-gray-900">{{ article.title }}</h2>
            <p class="text-gray-500">{{ article.description }}</p>
          </a>
          <div class="card-footer">
            <div class="card-footer-date">May 19, 2022</div>
          </div>
        </div>
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

