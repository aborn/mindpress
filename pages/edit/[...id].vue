<template>
    <div>
        <NavBar />
        <main class="container">
            <input id="title" name="title" style="height:2.5rem" placeholder="Article title" v-model="title" required>
            <label>{{ hint }}</label>
            <ColorScheme placeholder="loading..." tag="span">
                <md-editor v-model="mkdContent" :theme="$colorMode.value" :toolbarsExclude="toolbarsExclude"
                    style="height:480px;" @onChange="changeAction" @onSave="saveAction" />
            </ColorScheme>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { mpConfig } from '~~/composables/utils';

// docs==> https://vuejs.org/api/sfc-script-setup.html
const route = useRoute()
const articleids = route.params.id
const articleid = articleids[0]
const toolbarsExclude = ['github']
const mp = mpConfig(useRuntimeConfig().public.minpress)

const url = mp.contentUrl + '/' + articleid
console.log(url)
const defaultData = { content: "", id: 0 }
const { data } = articleid ? await useFetch(url) : defaultData;
// console.log(data)

const processData = (data) => {
    if (data.value) {
        return {
            content: data.value.content,
            title: data.value.title,
            id: data.value.id,
            msg: 'success',
            status: true
        }
    } else {
        console.log('error in http')
        return {
            content: "",
            id: 0,
            msg: "error http fetch content, articleid=" + articleid,
            status: false,
            title: ""
        }
    }
}

const pData = articleid ? processData(data) : defaultData;
const mkdContent = ref(pData.content)
const title = ref(pData.title)
// console.log(mkdContent)
</script>

<script>
export default {
    data: () => {
        return {
            hint: '',
            articleid: '',
            title: '',
            mp: {}
        }
    },
    methods: {
        changeAction(e) {
            // console.log('content changed. data=' + new Date())
        },
        saveAction(text) {
            const route = useRoute()
            const articleids = route.params.id
            const articleid = articleids[0] || this.articleid

            const extInfo = JSON.stringify(simpleParser(text))
            console.log(extInfo)
            if (extInfo.title && extInfo.title !== '') {
                this.title = extInfo.title
            }
            const title = this.title

            console.log('--- now save event triggled. articleid=' + articleid + '---')
            // console.log(text)            
            const requestSpace = articleid + "t" + new Date()
            console.log(this.mp)

            // this.hint = "save action triggled."
            useFetch(this.mp.contentUrl,
                {
                    key: requestSpace,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: {
                        articleid: articleid,
                        content: text,
                        title: title,
                        extInfo: extInfo,
                        pub: true
                    }
                }).then(res => {
                    const data = res.data.value
                    const error = res.error.value
                    // res.refresh()   // TODO: Cannot undstand why must it?
                    console.log(data)
                    console.log(error)

                    this.hint = data ? data.msg : error;
                    if (data && data.success) {
                        this.hint = data.msg + " " + new Date();
                        if (data.ext && data.ext.articleid) {
                            console.log(data.ext.articleid)
                            this.articleid = data.ext.articleid   // begin edit it when file created.
                        }
                    }
                }, error => {
                    console.log('exception...')
                    console.log(error)
                })
        }
    }
}
</script>

