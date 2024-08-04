<template>
  <div>
    <NavBar />
    <main class="container">
      <div class="articles">
        <div class="article" v-for="article in articles" :key="article.id">
          <PostCard :item="article" />
        </div>
      </div>
      <a href="#" v-if="showLoadingComponent">Loading
        <UIcon name="i-heroicons-ellipsis-horizontal-16-solid" />
      </a>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
const articles = ref([]);
const mp = mpConfig(useRuntimeConfig().public.mindpress)
const useReqURL = useRequestURL()
const { $settings } = useNuxtApp()
console.log('settttttttts--->')
console.log($settings)
// console.log(useReqURL)
const apiBaseURL = useReqURL.protocol + '//' + useReqURL.host
console.log(mp)
console.log(apiBaseURL)
console.log('mode===>' + mp.mode)
const pageNo = ref(1)
const isLoading = ref(false)
const isLastPage = ref(false)

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener("scroll", handleScroll);
    let documentHeight = document.body.scrollHeight;
    let currentScroll = window.scrollY + window.innerHeight;
    console.log('d:' + documentHeight + ", s:" + currentScroll)

    if (documentHeight < currentScroll) {
      loadingMore()
    }
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener("scroll", handleScroll);
  }
})

const showLoadingComponent = ref(false)

function loadingMore() {
  if (!isLoading.value && !isLastPage.value) {
    isLoading.value = true
    try {
      if (mp.mode == MINDPRESS_MODE.SSG) {
        return;
      }
      
      console.log("pageNo==" + pageNo.value)
      const url = (mp.mode == MINDPRESS_MODE.FCM) ? '/api/md/query?mpstatus=publish' : (mp.mode == MINDPRESS_MODE.SCM ? mp.metaUrl : null)
      queryPageData({ pageNo: pageNo.value, url: url }).then((res) => {
        isLoading.value = false
        if (pageNo.value >= res.totalPage) {
          isLastPage.value = true
        } else {
          pageNo.value = pageNo.value + 1;
        }
        // console.warn("Now add items to articles" + res.pageNo + ", size:" + res.data.length)
        articles.value.push(...res.data)
      }, error => {
        isLoading.value = false
        console.error(error)
      })
    } catch (error) {
      console.warn(error)
      isLoading.value = false
    }
  }

  if (isLastPage.value) {
    showLoadingComponent.value = false;
  }
}

function handleScroll(e) {
  if (import.meta.client) {
    var currentScrollPosition = window.scrollY
    if (currentScrollPosition < this.scrollPosition) {
      console.log("Scrolling up");
    } else {
      console.log("Scrolling down");
    }

    let documentHeight = document.body.scrollHeight;
    let currentScroll = window.scrollY + window.innerHeight;
    // When the user is [modifier]px from the bottom, fire the event.
    let modifier = 200;
    if (currentScroll + modifier > documentHeight) {
      console.log('You are at the bottom! isLoading=' + isLoading.value + ', is isLastPage=' + isLastPage.value)
      showLoadingComponent.value = true;
      loadingMore()
    } else {
      showLoadingComponent.value = false;
    }
    this.scrollPosition = window.scrollY
  }
}

if (mp.mode === MINDPRESS_MODE.SSG) {
  if (articles.value.length <= 0) {
    const { data } = await useAsyncData('home', () => queryContent().sort({ _id: 1 }).find())
    console.log('--------data SSG-----')
    console.log(data.value)
    const tdata = data.value.map((value) => {
      return staticMdTransform(value)
    })
    // console.log('***************')
    // console.log(tdata)
    articles.value = tdata; //data.value;
  }
} else if (mp.mode === MINDPRESS_MODE.FCM) {
  try {
    const { data: dataQ } = await useFetch('/api/md/query?mpstatus=publish', {
      method: "POST",
      body: {
        'pageNo': pageNo.value,  // start from 1
        'pageSize': 9,
        'sort': { 'createTime': -1, 'title': 1 }
      }
    });
    pageNo.value = pageNo.value + 1
    console.log(dataQ.value.data)
    const tdata = dataQ.value.data.map((value) => {
      return staticMdTransform(value)
    })
    articles.value = tdata
    console.log('***************')
    //console.log(tdata)
  } catch (error) {
    console.warn(error)
  }
} else {
  const { data: dataServer } = await useFetch(mp.metaUrl)
  // console.log(dataServer.value)
  pageNo.value = pageNo.value + 1

  if (dataServer.value.totalElements > 0) {
    const dataS = ref([])
    dataS.value = dataServer.value.content.map((value) => {
      return mpTransform(value)
    })
    // console.log(dataS)
    articles.value = dataS.value;
  }
}

</script>
