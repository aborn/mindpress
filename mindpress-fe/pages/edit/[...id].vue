<template>
    <div>
        <NavBar />
        <main class="container">
            <input id="title" name="title" style="height:2.5rem" placeholder="Article title" v-model="title" required>
            <label>{{ hint }}</label>
            <NuxtLink v-if="articleid" :to="`/article/${articleid}`" class="secondary" target="_blank">Article Detail
            </NuxtLink>
            <ColorScheme placeholder="loading..." tag="span">
                <md-editor v-model="mkdContent" :theme="$colorMode.value as Themes" :toolbarsExclude="toolbarsExclude as ToolbarNames[]"
                    style="height:480px;" @onChange="changeAction" @onSave="saveAction" />
            </ColorScheme>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MdEditor, { Themes, ToolbarNames } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css';
import { mpConfig } from '~~/composables/utils';

// docs==> https://vuejs.org/api/sfc-script-setup.html
const route = useRoute()
const articleids = route.params.id
const articleid = ref(articleids[0])

const mkdContent = ref('')
const hint = ref('')
const title = ref('')

const toolbarsExclude = ['github']
const mp = mpConfig(useRuntimeConfig().public.minpress)

const url = mp.contentUrl + '/' + articleid.value
console.log(url)
const defaultData = { content: "", id: 0 }
// console.log(data)

async function getData() {
    return await request({
        url: url,
        method: "get",
        headers: {
            uid: ''
        }
    }) as any;
}

if (articleid.value) {
    const dataS = await getData()
    mkdContent.value = dataS.content
    title.value = dataS.title
} else {
}

function changeAction(e: any) {
    // console.log('content changed. data=' + new Date())
}

function saveAction(text: string) {
    const route = useRoute()
    const extInfo = simpleParser(text)
    console.log(extInfo)
    if (extInfo.title && extInfo.title !== '') {
        title.value = extInfo.title
    }

    console.log('title:' + title.value)
    console.log('--- now save event triggled. articleid=' + articleid.value + '---')
    // console.log(text)            
    const requestSpace = articleid + "t" + new Date()

    const bodyContent = {
        articleid: articleid.value,
        content: text,
        title: title.value,
        extInfo: JSON.stringify(extInfo),
        pub: true, // 默认都为开文档
    }
    hint.value = "保存中......"

    console.log(mp)

    console.log(mp.contentUrl)
    // this.hint = "save action triggled."
    useFetch(mp.contentUrl,
        {
            key: requestSpace,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: bodyContent
        }).then(res => {
            const data = res.data.value as any
            const error = res.error.value
            // res.refresh()   // TODO: Cannot undstand why must it?
            console.log(data)
            console.log(error)

            hint.value = data ? data.msg : error
            if (data && data.success) {
                hint.value = data.msg + " ,Time:" + new Date();
                if (data.ext && data.ext.articleid) {
                    console.log(data.ext.articleid)
                    articleid.value = data.ext.articleid // begin edit it when file created success.
                    console.log('saved articleid: ' + articleid.value)
                }
            }
        }, error => {
            console.log('exception...')
            console.log(error)
        })
}

</script>
