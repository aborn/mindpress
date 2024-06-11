<template>
    <div>
        <NavBar />
        <main class="container">
            <input id="title" name="title" style="height:2.5rem" placeholder="Article title" v-model="title" required>
            <label>{{ hint }}</label>
            <NuxtLink v-if="articleid" :to="`/article/${articleid}`" class="secondary" target="_blank">Article Detail
            </NuxtLink>
            <ColorScheme placeholder="loading..." tag="span">
                <md-editor v-model="mkdContent" :theme="$colorMode.value as Themes"
                    :toolbarsExclude="toolbarsExclude as ToolbarNames[]" style="height:480px;" @onChange="changeAction"
                    @onSave="saveAction" />
            </ColorScheme>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MdEditor, type Themes, type ToolbarNames } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css';
import { mpConfig } from '~~/composables/utils';
// docs==> https://vuejs.org/api/sfc-script-setup.html
const route = useRoute()

const articleids = route.params.id
const queryV = route.query
console.log(queryV)

const useReqURL = useRequestURL()
console.log(useReqURL)

let isDev = isDevMode(useReqURL.hostname);
const apiBaseURL = useReqURL.protocol + '//' + useReqURL.host
const mp = mpConfig(useRuntimeConfig().public.minpress)
const articleid = (mp.mode === MINDPRESS_MODE.static && 'undefined' === articleids[0]) ?
    ref(null) : ref(articleids[0]);
if (!articleid.value && queryV.id) {
    articleid.value = queryV.id as string
}

const mkdContent = ref('')
const hint = ref('')
const title = ref<string | undefined>('')
const toolbarsExclude = ['github']
let file = ref<string | undefined>('');

console.log('articleid === ' + articleid.value)
const url = apiBaseURL + mp.contentUrl + '/' + articleid.value
console.log(url)

async function getDataAx() {
    return await request({
        url: url,
        method: "get",
        headers: {
            uid: ''
        }
    }) as any;
}

async function getData() {
    return await useFetch(
        url,
        {
            method: "get",
            headers: {
                uid: ''
            }
        }) as any;
}

const bodyExtra: any = {};
if (articleid.value) {
    if (mp.mode === MINDPRESS_MODE.static) {
        console.log('static mode. articleid:' + articleid.value)
        const permalink = '/article/' + articleid.value
        console.log(permalink)
        const dataL = articleid.value.indexOf(':') >= 0 ?
            await queryContent().where({ _id: { $eq: articleid.value } }).findOne()
            : await queryContent().where({ permalink: { $eq: permalink } }).findOne()
        file.value = dataL._file;
        console.log(dataL)
        const idxNames = ['author', 'authors', 'permalink']
        idxNames.forEach(item => {
            if (dataL.hasOwnProperty(item)) {
                bodyExtra[item] = dataL[item]
            }
        })

        const markdownContent = compileHastToStringify(dataL.body)
        //console.log(JSON.stringify(dataL.body))
        // mkdContent.value = JSON.stringify(dataL.body.children)
        title.value = dataL.title

        $fetch('/api/md/mdcontent',
            {
                key: articleid,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    file: file.value,
                    articleid: articleid.value
                }
            }).then((res: any) => {
                // console.log(res)
                mkdContent.value = res.md
            }, error => {
                console.log('exception...')
                console.log(error)
                hint.value = "request exception" + error
                if (!isDev) {
                    hint.value = "Tips: SSG Mode cannot save md content!! "
                    mkdContent.value = markdownContent //JSON.stringify(dataL.body.children)
                }
            })

        // articles.value.time = dataL.date
        // articles.value.author = getAuthor(dataL)
    } else {
        const dataAx = await getDataAx()
        mkdContent.value = dataAx.content
        title.value = dataAx.title

        // console.log(dataAx)
        // const { data: dataS } = await getData()
        // mkdContent.value = dataS.value.content
        // title.value = dataS.value.title
    }
}

function changeAction(e: any) {
    // console.log('content changed. data=' + new Date())
}

function saveAction(text: string) {
    const route = useRoute()
    const extInfo = simpleParser(text)
    console.log(extInfo)

    if ((!title.value || title.value.trim().length === 0) && extInfo.title && extInfo.title !== '') {
        title.value = extInfo.title
    }

    console.log('title:' + title.value)
    console.log('--- now save event triggled. articleid=' + articleid.value + '---')
    // console.log(text)            
    const requestSpace = articleid.value + "t" + new Date()
    // static mode for save to local files !!
    extInfo.mode = mp.mode;

    const bodyContent = {
        articleid: articleid.value,
        content: text,
        title: title.value,
        extInfo: JSON.stringify(extInfo),
        file: file.value,
        permalink: '/article/' + articleid.value,
        pub: true, // default value
        ...bodyExtra
    }
    hint.value = "保存中......"
    console.log(bodyContent)
    console.log(mp.contentUrl)
    // this.hint = "save action triggled."
    $fetch(mp.mode === MINDPRESS_MODE.static ? '/api/md/savecontent' : mp.contentUrl,
        {
            key: requestSpace,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: bodyContent
        }).then((res: any) => {
            console.log(res)
            hint.value = res.msg
            if (res && res.success) {
                hint.value = res.msg + " ,Time:" + new Date();
                if (res.ext && res.ext.articleid) {
                    console.log(res.ext.articleid)
                    articleid.value = res.ext.articleid // begin edit it when file created success.
                    console.log('saved articleid: ' + articleid.value)
                }

                if (res.ext && res.ext.file) {
                    file.value = res.ext.file
                    console.log('static mode, save articleid:' + file.value)
                }
            }
        }, error => {
            console.log('exception...')
            console.log(error)
        })

}
</script>
<style scoped></style>