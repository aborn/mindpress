<template>
    <NavBar />
    <main class="container">
        <ColorScheme placeholder="..." tag="span">
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
const text = ref(DEMO_TEXT_MARKDOWN)
const articleids = route.params.id
const articleid = articleids[0]
const toolbarsExclude = ['github']

const url = 'http://localhost:3012/api/content/' + articleid
console.log(url)
const { data } = await useFetch(url)
// console.log(data)

const processData = (data) => {
    if (data.value) {
        return {
            content: data.value.content,
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
            status: false
        }
    }
}

const pData = processData(data);
const mkdContent = ref(pData.content)
const id = pData.id
// console.log(mkdContent)

const changeAction = (e) => {
    console.log('content changed. data=' + new Date())
}

const saveAction = (text) => {
    console.log('--- now save event triggled. articleid=' + articleid + '---')
    // console.log(text)
    const cuUrl = 'http://localhost:3012/api/content'
    // console.log('id=' + id + ', articleid=' + articleid)
    useFetch(cuUrl,
        {
            key: "cu_action",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                "articleid": articleid,
                "content": text
            }
        }).then(res => {
            const data = res.data.value
            const error = res.error.value
            if (error) {
                // dealing error
                console.log(error)
            } else {
                console.log(data)
            }
        }, error => {
            console.log('exception...')
            console.log(error)
        })
}

</script>
