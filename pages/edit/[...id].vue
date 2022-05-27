<template>
    <NavBar />
    <main class="container">
        <ColorScheme placeholder="..." tag="span">
            <md-editor v-model="text" :theme="$colorMode.value" :toolbarsExclude="toolbarsExclude" style="height:480px;"
                @onChange="changeAction" @onSave="saveAction" />
        </ColorScheme>
    </main>
</template>

<script>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default {
    setup() {
        const route = useRoute()
        const text = ref(DEMO_TEXT_MARKDOWN)
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
        this.theme = 'dark'
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

</script>
