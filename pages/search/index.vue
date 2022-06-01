<script setup>
import { ref } from "vue";
import "../../app.css";
const search = ref("")
const mp = mpConfig(useRuntimeConfig().public.minpress)

</script>

<script>
export default {
  data: () => {
    return {
      hint: '',
      search: '',
      mp: {},
      articles: []
    }
  },
  methods: {
    searchShows(search) {
      const url = this.mp.searchUrl + "?q=" + search.value
      console.log(url)

      useFetch(url).then(res => {
        const data = res.data.value
        console.log(data)

        if (data.totalElements > 0) {
          const dataS = ref([])
          dataS.value = data.content.map((value) => {
            return mpTransform(value)
          })
          // console.log(dataS)
          this.articles = dataS.value;
          this.hint = 'find <span style="color:red">' + data.totalElements + "</span> markdown files."
          console.log(this.articles)
          console.log(this.hint)
        } else {
          this.articles = []
          this.hint = "no markdown file find."
        }
      }, error => {
        this.hint = "http request error. " + error
        this.articles = []
      })
    },
    submit(e) {
      console.log(e)
      const search = ref(this.search)
      console.log('submit... q=' + search.value)
      if (!search.value) return;
      this.searchShows(search);
    }
  }
}
</script>

<template>
  <NavBar />
  <main class="container">
    <form @submit.prevent="submit" style="display: flex;justify-content: center;margin-bottom:0rem">
      <input type="text" style="height:2.5rem" v-model="search" placeholder="Please input your keyword." />
      <button class="outline" style="margin-left: .5rem;height:2.5rem;width: 10rem;">Search</button>
    </form>

    <label style="margin-bottom:1rem" v-html="hint"></label>

    <div class="articles">
      <div class="article" v-for="article in articles" :key="article.id">
        <PostCard :item="article" />
      </div>
    </div>
  </main>
</template>
