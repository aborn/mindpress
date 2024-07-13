<template>
    <div>
        <NavBar />
        <main class="contentContainer">
            <div class="row">
                <div class="column-all">
                    <input type="title" id="title" ref="titleInput" name="title" placeholder="Article title"
                        v-model="title" required>
                </div>
            </div>
            <MagicEditor :content="mkdContent" @change="onChange" :ratio="scrollToRatio" @save="editorSaveAction" />
            <div class="row">
                <div class="column-all-goodle">
                    <UAlert v-if="hint.title" :title="`${hint.desc}`" :color="`${hint.color}`" />
                </div>
            </div>
        </main>
        <UModal v-model="isOpen" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            User Validate
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpen = false" />
                    </div>
                </template>
                <UInput color="primary" ref="tokenInput" v-model="token" variant="outline"
                    placeholder="Your validate token..." />
                <UButtonGroup size="sm" orientation="horizontal">
                    <UButton color="gray" @click="isOpen = false">Cancel</UButton>
                    <UButton style="margin-left: 10px;" @click="onTokenSubmit">Submit</UButton>
                </UButtonGroup>
            </UCard>
        </UModal>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { mpConfig } from '~~/composables/utils';
import axios from 'axios'
import { imageMatches } from '~/server/utils/markdownUtils';
import { wxRenderer } from "~/unjs/render/wxRenderer";
import { initEditorEntity } from '~/unjs/editor/codeMirrorEditor';
import { color } from '@codemirror/theme-one-dark';

const output = ref('');
// docs==> https://vuejs.org/api/sfc-script-setup.html
const route = useRoute()
const titleInput = ref(null as any)
const tokenInput = ref(null as any)
const title = ref<string | undefined>('')
const token = ref<string | undefined>('')
const mkdContent = ref('')
const scrollToRatio = ref(0)
const hint = ref({} as any)
const debounce = createDebounce()
const articleids = route.params.id
const queryV = route.query
console.log(queryV)

const useReqURL = useRequestURL()
console.log(useReqURL)

const apiBaseURL = useReqURL.protocol + '//' + useReqURL.host
const mp = mpConfig(useRuntimeConfig().public.mindpress)
const articleid = ((mp.mode === MINDPRESS_MODE.SSG || mp.mode === MINDPRESS_MODE.FCM) && 'undefined' === articleids[0]) ?
    ref(null) : ref(articleids[0]);
if (!articleid.value && queryV.id) {
    articleid.value = queryV.id as string
}

onMounted(() => {
    if (import.meta.client) {
        // https://vuejs.org/guide/essentials/template-refs
        if (titleInput && titleInput.value) {
            titleInput.value.focus()
        }
    }
})

function editorSaveAction(text: any) {
    console.log('save.........action.................')
    // console.log(text)
    console.log('now save it !...')
    saveAction(text)
}

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

const bodyExtra: any = {};
const mdHeader: any = {};
const isOpen = ref(false)

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
                    console.log('content updated')
                    mdHeader.value = res.mdheader
                    const html = wxRenderer(mkdContent.value)
                    output.value = html
                    // editor.value = initEditorEntity(mkdContent.value)
                    // console.log(editor.value)
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

const onTokenSubmit = () => {
    console.log('token submit')
    console.log('value:' + token.value)
    console.log(mkdContent.value)
    if (token.value && token.value.length > 0) {
        isOpen.value = false;
        localStorage.setItem('token', token.value);
        saveAction(mkdContent.value)
    } else {
        isOpen.value = true;
    }
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

    const token = localStorage.getItem('token');
    if (!token) {
        isOpen.value = true
        if (tokenInput && tokenInput.value) {
            tokenInput.value.focus()
        }
        return;
    }

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
        color: 'primary',
        desc: 'save......'
    }
    console.log(bodyContent)
    console.log(mp.contentUrl)
    $fetch(mp.mode === MINDPRESS_MODE.FCM ? '/api/md/savecontent' : mp.contentUrl,
        {
            key: requestSpace,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token || ''
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
                if (res.code === 501) {
                    localStorage.removeItem('token')
                }
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

const onChange = (content: string) => {
    console.log('changed .... ' + new Date())
    debounce(() => changeAction(content), 500)
}

const changeAction = (content: string) => {
    console.log(' ----------action: ' + new Date())
    // console.log(content)

    const html = wxRenderer(content)
    output.value = html

    const filterMatches = imageMatches(content) as any[];
    if (filterMatches && filterMatches.length > 0) {
        console.log('process images....')

        if (mp.mode !== MINDPRESS_MODE.FCM) {
            return;
        }

        const bodyContent = {
            articleid: articleid.value,
            content: content,
            title: title.value,
        }
        $fetch(mp.mode === MINDPRESS_MODE.FCM ? '/api/md/mdimage' : mp.contentUrl,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: bodyContent
            }).then((res: any) => {
                console.log(res)
                if (res && res.success) {
                    if (res.state) {
                        console.warn('content updated!')
                        mkdContent.value = res.content
                    }
                } else {
                    console.warn('call /api/md/mdimage error')
                }
            }, error => {
                console.log('exception...')
                console.log(error)
            })
    }
}
</script>
<style scoped>
.preview-wrapper_night {
    overflow-y: inherit;
    position: relative;
    left: -3px;

    .preview {
        background-color: #fff;
    }
}

#output-wrapper {
    position: relative;
    user-select: text;
}
</style>