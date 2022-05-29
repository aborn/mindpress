<template>
    <NavBar />
    <main class="container">
        <ColorScheme placeholder="..." tag="span">
            <md-editor v-model="mkdContent" :theme="$colorMode.value" :toolbarsExclude="toolbarsExclude" style="height:480px;"
                @onChange="changeAction" @onSave="saveAction" />
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
const id = route.params.id
const toolbarsExclude = ['github']
console.log('id=' + id)

const url = 'http://localhost:3012/api/content/' + id
console.log(url)
const { data } = await useFetch(url)
console.log(data)

const processData = (data) => {
    if (data.value) {
        return data.value.content
    } else {
        console.log('error in http')
        return ''
    }
}

const mkdContent = ref(processData(data))
//console.log(mkdContent)

const changeAction = (e) => {
    console.log('content changed. data=' + new Date())
}

const saveAction = (text) => {
    console.log('--- now save event triggled. ---')
    console.log(text)
}

</script>
