<template>
    <div>
        <NavBar />
        <main class="container">
            <input id="title" name="title" style="height:2.5rem" placeholder="Article title" v-model="title" required>
            <UAlert v-if="hint.title" icon="i-heroicons-chat-bubble-left-ellipsis" :color="`${hint.color}`"
                variant="outline" :title="`${hint.title}`" :description="`${hint.desc}`" style="margin-bottom: 10px;" />
            <NuxtLink v-if="articleid" :to="`/article/${articleid}`" class="secondary" target="_blank">Article Detail
            </NuxtLink>
            <ColorScheme placeholder="loading..." tag="span">
                <md-editor v-model="mkdContent" :theme="$colorMode.value as Themes"
                    :toolbarsExclude="toolbarsExclude as ToolbarNames[]" style="height:480px;" @onChange="changeAction"
                    @onSave="saveAction" @onUploadImg="onUploadImg" />
            </ColorScheme>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MdEditor, type Themes, type ToolbarNames } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css';
import { mpConfig } from '~~/composables/utils';
import axios from 'axios'
// docs==> https://vuejs.org/api/sfc-script-setup.html
const route = useRoute()

const articleids = route.params.id
const queryV = route.query
console.log(queryV)

const useReqURL = useRequestURL()
console.log(useReqURL)

const apiBaseURL = useReqURL.protocol + '//' + useReqURL.host
const mp = mpConfig(useRuntimeConfig().public.minpress)
const articleid = ((mp.mode === MINDPRESS_MODE.SSG || mp.mode === MINDPRESS_MODE.FCM) && 'undefined' === articleids[0]) ?
    ref(null) : ref(articleids[0]);
if (!articleid.value && queryV.id) {
    articleid.value = queryV.id as string
}

const mkdContent = ref('')
const hint = ref({} as any)
const title = ref<string | undefined>('')
const toolbarsExclude = ['github']
let file = ref<string | undefined>('');

console.log('articleid === ' + articleid.value)
const url = apiBaseURL + mp.contentUrl + '/' + articleid.value
console.log(url)

async function getDataAx() {
    console.log(' ---- getDataAx')
    console.log(url)
    return await request({
        url: url,
        method: "get",
        params: {
            articleid: articleid.value || file.value
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
const mdHeader: any = {};

console.log('mode===>' + mp.mode)
if (mp.mode === MINDPRESS_MODE.SSG) {
    console.log('SSG mode. articleid:' + articleid.value)
    const permalink = '/article/' + articleid.value
    console.log(permalink)
    if (articleid.value) {
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
        title.value = dataL.title
        hint.value = {
            title: 'Tips',
            desc: "SSG Mode cannot save md content!! ",
            color: 'orange'
        }
        const markdownContent = compileHastToStringify(dataL.body)
        mkdContent.value = markdownContent //JSON.stringify(dataL.body.children)
    } else {
        hint.value = {
            title: 'Tips',
            desc: "SSG mode: cannot save file content!! ",
            color: 'orange'
        }
    }
} else if (mp.mode === MINDPRESS_MODE.FCM) {
    let dataL: any;
    if (articleid.value) {
        try {
            const { data: dataQ } = await useFetch('/api/md/query?_id=' + articleid.value)
            console.log('***************')
            dataL = dataQ.value
            console.log(dataL)
        } catch (error) {
            console.warn(error)
        }
        file.value = dataL._file;
        console.log(dataL)
        const idxNames = ['author', 'authors', 'permalink']
        idxNames.forEach(item => {
            if (dataL.hasOwnProperty(item)) {
                bodyExtra[item] = dataL[item]
            }
        })
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
                if (!res.status) {
                    hint.value = {
                        title: 'Info',
                        desc: res.msg,
                        color: 'primary'
                    }
                } else {
                    mkdContent.value = res.mdcontent
                    mdHeader.value = res.mdheader
                }
            }, error => {
                console.log('exception...')
                console.log(error)
                hint.value = {
                    title: 'Error',
                    desc: "request exception" + error,
                    color: 'orange'
                }
            })
    }
} else {
    const dataAx = await getDataAx()
    mkdContent.value = dataAx.content
    title.value = dataAx.title

    // console.log(dataAx)
    // const { data: dataS } = await getData()
    // mkdContent.value = dataS.value.content
    // title.value = dataS.value.title
}

function changeAction(e: any) {
    // console.log('content changed. data=' + new Date())
}

function saveAction(text: string) {
    if (mp.mode === MINDPRESS_MODE.SSG) {
        console.error("SSG mode cannot save edit content!")
        hint.value = {
            title: 'Error',
            desc: 'SSG mode cannot save edit content!',
            color: 'orange'
        }
        return
    }
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
        permalink: articleid.value ? '/article/' + articleid.value : undefined,
        pub: true, // default value
        header: mdHeader.value,
        ...bodyExtra
    }
    hint.value = {
        title: "save......",
    }
    console.log(bodyContent)
    console.log(mp.contentUrl)
    $fetch(mp.mode === MINDPRESS_MODE.FCM ? '/api/md/savecontent' : mp.contentUrl,
        {
            key: requestSpace,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: bodyContent
        }).then((res: any) => {
            console.log(res)
            if (res && res.success) {
                hint.value = {
                    title: 'Info',
                    desc: res.msg + " , Complete Time: " + mpFormatDate(new Date()),
                    color: 'primary'
                }
                // scm mode
                if (res.ext && res.ext.articleid) {
                    console.log(res.ext.articleid)
                    articleid.value = res.ext.articleid // begin edit it when file created success.
                    console.log('scm mode, saved articleid: ' + articleid.value)
                }

                // fcm mode
                if (res.ext && res.ext.file) {
                    file.value = res.ext.file
                    if (res.ext.contentUpdate) {
                        console.warn('content updated!')
                        mkdContent.value = res.ext.content
                    }
                    console.log('fcm mode, save articleid:' + file.value)
                }
            } else {
                hint.value = {
                    title: 'Tips',
                    desc: res.msg + " , Time: " + mpFormatDate(new Date()),
                    color: 'orange'
                }
            }
        }, error => {
            console.log('exception...')
            console.log(error)
            hint.value = {
                title: 'Error',
                desc: "request exception!!" + error,
                color: 'orange'
            }
        })

}

const onUploadImg = async (files: any, callback: any) => {
    const res = await Promise.all(
        files.map((file: any) => {
            return new Promise((rev, rej) => {
                const form = new FormData();
                form.append('file', file);
                if (articleid.value) {
                    form.append('articleid', articleid.value || "");
                }
                axios.post('/api/upload', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => rev(res))
                    .catch((error) => rej(error));
            });
        })
    );

    console.log(res)

    callback(
        res.map((item: any) => {
            const itemData = item.data.data
            console.log(itemData)

            return {
                url: itemData[0].url,
                alt: itemData[0].alt,
                title: itemData[0].title
            }
        })
    );
};
</script>
<style scoped></style>