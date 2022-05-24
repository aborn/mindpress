<template>
    <NavBar />
    <main class="container">
        <md-editor v-model="text" :theme="theme" :toolbarsExclude="toolbarsExclude"
            style="background-color: var(--md-background-color);height:480px;" 
            @onChange="changeAction" @onSave="saveAction" />
    </main>
</template>

<script>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default {
    setup() {
        const route = useRoute()
        const colorMode = useColorMode()
        const text = ref('')
        const id = route.params.id
        const toolbarsExclude = ['github']

        // three values: system dark light, TODO: md-editor not support 'system'.
        const theme = colorMode.value

        // demo id: 8dd81d
        return {
            id,
            text,
            toolbarsExclude,
            theme
        }
    },
    components: {
        MdEditor
    },
    mounted() {
        console.log("article_id=" + this.id);
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            const newColorScheme = event.matches ? "dark" : "light";
        });
    },
    methods: {
        changeAction(e) {
            // console.log('ch')
        },
        saveAction(text) {
            console.log('--- now save event triggled. ---')
            console.log(text)
        }
    }
}

/**
const permalink = '/articles/' + id
let articles
if (id.length > 0) {
    articles = await queryContent().where({ permalink: { $eq: permalink } }).findOne()
    console.log(articles);
    console.log(useUnwrap(articles))
}
 */

</script>
