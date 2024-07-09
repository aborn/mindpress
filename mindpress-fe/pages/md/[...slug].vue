<template>
    <div>
        <NavBar />
        <main class="container">
            <div class="main-container">
                <div class="content-container">
                    <div class="article-title">{{ articles.title }}</div>
                    <div class="article-meta-container">
                        <span class="article-meta">
                            <UIcon name="i-heroicons-calendar-days" />
                        </span>
                        <UTooltip :text="`Update time: ` + formatDate(articles.time, 'en')" :popper="{ arrow: true }">
                            <span class="article-meta">{{ formatDate(articles.createTime, 'en') }} </span>
                        </UTooltip>
                        <span class="article-meta" style="margin-left:0.3rem">{{ articles.author }}</span>
                        <span class="article-meta">
                            <NuxtLink :to="'/md/edit?id=' + articles.articleid">
                                <UIcon name="i-heroicons-pencil-square" />
                                <span class="article-edit">Edit</span>
                            </NuxtLink>
                        </span>
                    </div>
                    <section id="output" v-html="output"></section>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { marked } from "marked";
import { wxRenderer } from "~/composables/render/wxRenderer";
import { config } from '~/composables/render/config'
const route = useRoute()
const articles = ref()
const hint = ref('')
const output = ref('');
const toc = ref('')
const formatDate = mpFormatDate;
const mp = mpConfig(useRuntimeConfig().public.mindpress)
const queryV = route.query
let file = ref < string | undefined > ('');

const articleids = route.params.slug
const articleid = ((mp.mode === MINDPRESS_MODE.SSG || mp.mode === MINDPRESS_MODE.FCM) && 'undefined' === articleids[0]) ?
    ref(null) : ref(articleids[0]);
if (!articleid.value && queryV.id) {
    articleid.value = queryV.id
}

onMounted(() => {
  if (import.meta.client) {
    let cssUrl = config.codeThemeOption[2].value
      let el = document.getElementById(`hljs`)
      if (el != undefined) {
        el.setAttribute(`href`, cssUrl)
      } else {
        const link = document.createElement(`link`)
        link.setAttribute(`type`, `text/css`)
        link.setAttribute(`rel`, `stylesheet`)
        link.setAttribute(`href`, cssUrl)
        link.setAttribute(`id`, `hljs`)
        document.head.appendChild(link)
      }
  }
})

console.log('mode===>' + mp.mode)
if (mp.mode === MINDPRESS_MODE.SSG) {
    hint.value = 'No content found.'
    const permalink = '/article/' + articleid.value
    console.log(permalink)
    const dataL = articleid.value.indexOf(':') >= 0 ?
        await queryContent().where({ _id: { $eq: articleid.value } }).findOne()
        : await queryContent().where({ permalink: { $eq: permalink } }).findOne()
    console.log(dataL)
    articles.value = dataL
    articles.value.time = dataL.date
    articles.value.author = mpFormatAuthor(dataL)
    articles.value.articleid = articleid.value
    toc.value = dataL.body.toc;
    // console.log('toc value....')
    // console.log(toc.value)
} else if (mp.mode == MINDPRESS_MODE.FCM) {
    try {
        const { data: dataQ } = await useFetch('/api/md/query?_id=' + articleid.value)
        console.log('***************')
        const dataL = dataQ.value
        console.log(dataL)
        articles.value = dataL
        articles.value.time = dataL.date
        articles.value.author = mpFormatAuthor(dataL)
        articles.value.articleid = articleid.value
        toc.value = dataL.body.toc;
        file.value = dataL._file;

        $fetch('/api/md/mdcontent', {
            key: articleid.value,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                file: file.value,
                articleid: articleid.value
            }
        }).then((res) => {
            // console.log(res)
            if (res.status) {
                const markdown = res.mdcontent;
                const html = wxRenderer(markdown)
                // console.log(html)
                output.value = html
            }
        }, error => {
            console.log('exception...')
            console.log(error)
        })
    } catch (error) {
        console.warn(error)
    }
} else {
    console.log('server mode.')
    const url = mp.contentUrl + "/" + articleid.value
    // console.log(url)
    const { data } = await useFetch(url)
    // console.log(data.value)
    const content = ref(data.value.content)
    const { data: doc, refresh } = await useAsyncData(articleid.value, async () => {
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

    if (!doc.value.success) {
        hint.value = 'Markdown parser error: <span style="color:red">' + doc.value.msg + '</span>. Program language does not support.'
    }
    articles.value = doc.value.data
    articles.value.title = data.value.title
    articles.value.author = data.value.createBy
    articles.value.time = data.value.createTime
    articles.value.articleid = data.value.articleid
    articles.value.editable = data.value.editable
}
</script>