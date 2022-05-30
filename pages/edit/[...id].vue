<template>
    <NavBar />
    <main class="container">
        <input id="title" name="title" placeholder="Article title" v-model="title" required>
        <label>{{ hint }}</label>
        <ColorScheme placeholder="loading..." tag="span">
            <md-editor v-model="mkdContent" :theme="$colorMode.value" :toolbarsExclude="toolbarsExclude"
                style="height:480px;" @onChange="changeAction" @onSave="saveAction" />
        </ColorScheme>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

// docs==> https://vuejs.org/api/sfc-script-setup.html

const route = useRoute()
const articleids = route.params.id
const articleid = articleids[0]
const toolbarsExclude = ['github']
//const hint = 'This is a simple tips.'

const url = 'http://localhost:3012/api/content/' + articleid
console.log(url)
const defaultData = { content: "", id: 0 }
const { data } = articleid ? await useFetch(url) : defaultData;
// console.log(data)

const processData = (data) => {
    console.log(data)
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

const changeAction = (e) => {
    // console.log('content changed. data=' + new Date())
}

</script>

<script>
export default {
    data: () => {
        return {
            hint: '',
            articleid: '',
            title: ''
        }
    },
    methods: {
        saveAction(text) {
            const route = useRoute()
            const articleids = route.params.id
            const articleid = articleids[0] || this.articleid
            const title = this.title

            console.log('--- now save event triggled. articleid=' + articleid + '---')
            // console.log(text)
            const cuUrl = 'http://localhost:3012/api/content'
            // console.log('id=' + id + ', articleid=' + articleid)
            const keyValue = articleid + "t" + new Date()

            // this.hint = "save action triggled."
            useFetch(cuUrl,
                {
                    key: keyValue,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: {
                        "articleid": articleid,
                        "content": text,
                        "title": title
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

