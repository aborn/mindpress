<template>
    <div ref="doc" class="doc">

    </div>
</template>

<script lang="ts">
import { basicSetup, EditorView } from "codemirror"
import { markdown } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import { testDoc } from '~/unjs/editor/demo/doc-example'
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { basicLight, basicLightTheme, basicLightHighlightStyle } from "~/unjs/editor/themes/default-theme"
import { content } from "#tailwind-config"

export default {
    props: ['content'],
    emits: ['change'],
    name: "MarkdownEditor",
    data() {
        return {
            doc: this.content,
            editor: null as any,
        }
    },
    watch: {
        doc(newV, oldV) {
            console.log('changeeeeeeeeeeeed')
        },
        content(newV, oldV) {
            console.log('props updated!')
            if (!this.editor) {
                this.createArea(newV);
            }

            //console.log('oldV: \n' + oldV)
            //console.log('newV: \n' + newV)
        }
    },
    computed: {
        doc() {
            return this.content
        }
    },
    methods: {
        createArea(content: string) {
            if (!content && content.length == 0) {
                return
            }
            let view = new EditorView({
                doc: content,  //文本内容
                extensions: [  //扩展
                    basicSetup,  //行数显示扩展
                    basicLightTheme,  //自定义主题
                    syntaxHighlighting(basicLightHighlightStyle),
                    markdown({   //markdown语言解析扩展
                        codeLanguages: languages  //这里指定markdown中代码块使用的解析扩展
                    }),
                    EditorView.lineWrapping,
                    EditorView.updateListener.of(update => {
                        if (update.changes) {
                            console.log('MarkdownEditor content changed event!.')
                            console.log(update.state) // state.doc.toString()
                            this.$emit('change', update.state.doc.toString())
                        }
                    })
                ],
                parent: this.$refs.doc,  //挂载的div块
            })
            this.editor = view
        }

    },
    mounted: function () {
        this.createArea(this.content);
    }

}
</script>

<style scoped>
div {
    height: 100%;
    text-align: left;
}
</style>