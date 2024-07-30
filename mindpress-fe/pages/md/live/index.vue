<template>
    <div ref="doc" class="doc">
    </div>
</template>

<script>
import { basicSetup, EditorView } from "codemirror"
import { markdown } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import { testDoc } from '~/unjs/editor/demo/doc-example'
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"

import { basicLight, basicLightTheme, basicLightHighlightStyle } from "~/unjs/editor/themes/default-theme"


export default {
    name: "MarkCodeMirrorArea",
    data() {
        return {
            doc: testDoc,
        }
    },
    methods: {
        createArea() {
            const customTheme = EditorView.theme({
                '&.cm-editor.cm-focused': {
                    outline: "none"   //移除外边框线
                },
                '&': {
                    font: "16px Arial, monospace ",  //字体
                }
            })
            let view = new EditorView({
                doc: this.doc,  //文本内容
                extensions: [  //扩展
                    basicSetup,  //行数显示扩展
                    basicLightTheme,  //自定义主题
                    syntaxHighlighting(basicLightHighlightStyle),
                    markdown({   //markdown语言解析扩展
                        codeLanguages: languages  //这里指定markdown中代码块使用的解析扩展
                    })
                ],
                parent: this.$refs.doc,  //挂载的div块
            })
        }
    },
    mounted: function () {
        this.createArea();
    }

}
</script>

<style scoped>
div {
    height: 100%;
    text-align: left;
}
</style>