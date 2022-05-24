<template>
    <NavBar />
    <main class="container">
        <md-editor v-model="text" theme="dark" :toolbarsExclude="toolbarsExclude"/>
    </main>
</template>

<script>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default {
    setup() {
        const route = useRoute()
        const text = ref('')
        const id = route.params.id
        const toolbarsExclude = ['github']

        // demo id: 8dd81d
        return {
            id,
            text,
            toolbarsExclude            
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
