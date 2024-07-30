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
                            <span class="toolbaritem" style="padding:0px;margin-right: 5px;"
                                @click="copyToWeChatAction">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="M15.85 8.14c.39 0 .77.03 1.14.08C16.31 5.25 13.19 3 9.44 3c-4.25 0-7.7 2.88-7.7 6.43c0 2.05 1.15 3.86 2.94 5.04L3.67 16.5l2.76-1.19c.59.21 1.21.38 1.87.47c-.09-.39-.14-.79-.14-1.21c-.01-3.54 3.44-6.43 7.69-6.43M12 5.89a.96.96 0 1 1 0 1.92a.96.96 0 0 1 0-1.92M6.87 7.82a.96.96 0 1 1 0-1.92a.96.96 0 0 1 0 1.92" />
                                    <path fill="currentColor"
                                        d="M22.26 14.57c0-2.84-2.87-5.14-6.41-5.14s-6.41 2.3-6.41 5.14s2.87 5.14 6.41 5.14c.58 0 1.14-.08 1.67-.2L20.98 21l-1.2-2.4c1.5-.94 2.48-2.38 2.48-4.03m-8.34-.32a.96.96 0 1 1 .96-.96c.01.53-.43.96-.96.96m3.85 0a.96.96 0 1 1 0-1.92a.96.96 0 0 1 0 1.92" />
                                </svg>
                            </span>
                            <NuxtLink :to="'/md/edit?id=' + articles.articleid">
                                <UIcon name="i-heroicons-pencil-square" />
                                <span class="article-edit">Edit</span>
                            </NuxtLink>
                        </span>
                    </div>
                    <section id="output" v-html="output"></section>
                </div>
                <div id="snackbar"></div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { wxRenderer } from "~/unjs/render/wxRenderer";
import { config } from '~/unjs/render/config'
import { copyToWechat } from "~/unjs/editor/wechat";
const route = useRoute()
const articles = ref()
const hint = ref('')
const output = ref('');
const toc = ref('')
const formatDate = mpFormatDate;
const mp = mpConfig(useRuntimeConfig().public.mindpress)
const queryV = route.query
let file = ref<string | undefined>('');
const useReqURL = useRequestURL()
const hostname = useReqURL.hostname

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

function copyToWeChatAction() {
    copyToWechat(output.value)
}

console.log('mode===>' + mp.mode + ',  articleid.value=' + articleid.value)
if (mp.mode === MINDPRESS_MODE.SSG) {
    hint.value = 'No content found.'
    const permalink = '/article/' + articleid.value
    console.log(permalink)
    const dataL: any = articleid.value.indexOf(':') >= 0 ?
        await queryContent().where({ _id: { $eq: articleid.value } }).findOne()
        : await queryContent().where({ permalink: { $eq: permalink } }).findOne()
    console.log(dataL)
    articles.value = dataL
    articles.value.time = dataL.date
    articles.value.author = mpFormatAuthor(dataL)
    articles.value.articleid = articleid.value
    toc.value = dataL.body.toc;
    const markdown = compileHastToStringify(dataL.body)
    const html = wxRenderer(markdown)
    // console.log(html)
    output.value = html
    // console.log('toc value....')
    // console.log(toc.value)
} else if (mp.mode == MINDPRESS_MODE.FCM) {
    try {
        // const { data: data } = await useFetch('/api/md/queryContent?_id=' + articleid.value) as any
        // const dataQ = data.value
        const dataQ = await $fetch('/api/md/queryContent?_id=' + articleid.value) as any
        console.log('***************  client api ---')
        console.log(dataQ)
        articles.value = dataQ
        articles.value.time = dataQ.date
        articles.value.author = mpFormatAuthor(dataQ)
        articles.value.articleid = articleid.value
        toc.value = dataQ.body && dataQ.body.toc;
        file.value = dataQ._file;
        const markdown = dataQ.mdcontent;
        const html = wxRenderer(markdown)
        // console.log(html)
        output.value = html
    } catch (error) {
        console.warn(error)
    }
} else {
    console.log('server mode.')
    const url = mp.contentUrl + "/" + articleid.value
    // console.log(url)
    const { data } = await useFetch(url) as any
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