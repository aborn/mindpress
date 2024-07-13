<template>
    <div ref="doc" class="doc">
    </div>
</template>

<script lang="ts">
// import { basicSetup, EditorView } from "codemirror"
import { basicSetup, EditorView, myDefaultKeymap } from "~/unjs/editor/basicSetup"
import { markdown } from '~/unjs/editor/codemirror/markdown/index'
import { languages } from "~/unjs/editor/codemirror/language-data/language-data"
import { ViewUpdate, keymap, BlockInfo } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
// import { markdown } from "@codemirror/lang-markdown"
//import { languages } from "@codemirror/language-data"
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { basicLight, basicLightTheme, basicLightHighlightStyle } from "~/unjs/editor/themes/default-theme"
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorSelection, SelectionRange } from '@codemirror/state'

export default {
    props: ['content', 'ratio', 'csa'],   // current scroll area, only: 'preview', 'editor'
    emits: ['change', 'scroll', 'update:csa', 'save'],
    name: "MarkdownEditor",
    data() {
        return {
            doc: this.content,
            editor: null as any,
        }
    },
    computed: {
        innnerCSA: {
            get() {
                return this.csa
            },
            set(value) {
                this.$emit('update:csa', value)
            }
        },
        doc() {
            return this.content
        }
    },
    watch: {
        ratio(newV, oldV) {
            console.log('syncScrollEditor csa = ' + this.innnerCSA)
            console.log('scrollTo!newV=' + newV + ', oldV=' + oldV)
            if (!this.editor || this.innnerCSA == 'editor') {
                return
            }

            const scrolView = this.editor.docView.view.scrollDOM;
            const clientH = scrolView.clientHeight
            const scrollH = scrolView.scrollHeight
            scrolView.scrollTop = newV * (scrollH - clientH)
        },
        content(newV, oldV) {
            console.log('props.content changed!')
            if (!this.editor) {
                this.createArea(newV);
            }
        }
    },
    methods: {
        sliceDoc(editor: EditorView, from?: number, to?: number): string {
            return editor.state.sliceDoc(from, to)
        },
        replaceInlineCommand(editor: EditorView, range: SelectionRange, target: string): any {
            let len = target.length

            const prefixFrom: number = range.from - len
            const prefixTo: number = range.from
            const prefix = this.sliceDoc(editor, prefixFrom, prefixTo)

            const suffixFrom: number = range.to
            const suffixTo: number = range.to + len
            const suffix = this.sliceDoc(editor, suffixFrom, suffixTo)
            // 判断是取消还是添加, 如果被选中的文本前后已经是 target 字符, 则删除前后字符
            if (prefix == target && suffix == target) {
                return {
                    changes: [
                        { from: prefixFrom, to: prefixTo, insert: '' },
                        { from: suffixFrom, to: suffixTo, insert: '' }
                    ],
                    range: EditorSelection.range(prefixFrom, suffixFrom - len)
                }
            } else {
                return {
                    changes: [
                        { from: range.from, insert: target },
                        { from: range.to, insert: target }
                    ],
                    range: EditorSelection.range(range.from + len, range.to + len)
                }
            }
        },
        commandSave(_view: EditorView) {
            console.log('save action............')
            console.log(_view)
            // console.log(_view.viewState.state.doc.toString())
            this.$emit('save', _view.viewState.state.doc.toString())
            return true
        },
        commandBold(editor: EditorView) {
            editor.dispatch(editor.state.changeByRange((range: SelectionRange) => {
                this.replaceInlineCommand(editor, range, '**')
            }))
            return true;
        },
        createArea(content: string) {
            if (!content && content.length == 0) {
                return
            }
            const that = this;
            const scrollPlugin = () => {
                return EditorView.domEventHandlers({
                    scroll(e, view) {
                        console.log('\n\n')
                        console.log('editor scroll csa = ' + that.innnerCSA)

                        console.log(view)
                        const from = view.viewport.from;
                        const to = view.viewport.to;
                        // console.log(view.docView.view.scrollDOM)
                        const scrolView = view.docView.view.scrollDOM;

                        const clientH = scrolView.clientHeight
                        const scrollH = scrolView.scrollHeight
                        const scrollTop = scrolView.scrollTop
                        const ratio = scrollTop / (scrollH - clientH)

                        console.log('scroll......from:' + from + "  to:" + to + ' sH:' + scrollH + '   ' + clientH + '  sT:' + scrollTop)
                        console.log(ratio)
                        that.$emit('scroll', ratio)
                    },
                    mouseenter() {
                        that.innnerCSA = 'editor'
                        //console.log('mouse enter...')
                    },
                    mouseleave() {
                        that.innnerCSA = 'preview'
                        //console.log('mouse out...')
                    }
                })
            }

            let view = new EditorView({
                state: EditorState.create({
                    doc: content,  //文本内容
                    extensions: [  //扩展
                        basicSetup,  //行数显示扩展
                        basicLightTheme,  //自定义主题
                        keymap.of([
                            {
                                key: "Ctrl-s",
                                run: that.commandSave
                            },
                            {
                                key: "Ctrl-b",
                                run: that.commandBold
                            },
                            ...myDefaultKeymap
                        ]),
                        syntaxHighlighting(basicLightHighlightStyle),
                        markdown({   //markdown语言解析扩展
                            codeLanguages: languages,  //这里指定markdown中代码块使用的解析扩展
                        }),
                        EditorView.lineWrapping,
                        EditorView.updateListener.of(update => {
                            if (update.changes) {
                                console.log('MarkdownEditor content changed event!.')
                                console.log(update.state) // state.doc.toString()
                                this.$emit('change', update.state.doc.toString())
                            }
                        }),
                        scrollPlugin()
                    ],
                }),
                parent: this.$refs.doc as Element,  //挂载的div块
            })
            this.editor = view
            // this.editor.on("scroll", this.onEditorScroll);
        },
        onEditorScroll() {
            console.log('scrolling.......')
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