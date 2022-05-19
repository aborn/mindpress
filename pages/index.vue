<template>
  <NavBar />
  <main class="container">
    <ContentDoc />
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue"
const articles = ref([]);

async function query() {
  const datas = await useAsyncData('home', () => queryContent().find())
  console.log(datas)
}

</script>

