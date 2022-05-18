<script setup lang="ts">
import { onMounted, ref } from "vue";
const route = useRoute();

const episodes = ref([]);

onMounted(async () => {
  const fetchData = await fetch(
    `https://api.tvmaze.com/shows/${route.params.id}?embed=episodes`
  );
  const json = await fetchData.json();
  episodes.value = json._embedded.episodes;
});
console.log("route", route.params.id);
</script>

<template>
  <div>
    <NuxtLink to="/">
      <button>Back</button>
    </NuxtLink>
    <h3>List Of Episodes</h3>
    <div class="shows">
      <div class="show" v-for="episode in episodes" :key="episode.id">
        <div>
          {{ episode.name }}
        </div>
        Season: {{ episode.season }} Episode: {{ episode.number }}
        <img :src="episode.image?.medium" alt="" />
      </div>
    </div>
  </div>
</template>
