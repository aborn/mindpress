<template>
    <div ref="doc" class="doc">
    </div>
</template>

<script lang="ts">
import { basicSetup, EditorView } from "codemirror"
import { ViewUpdate, keymap, BlockInfo } from '@codemirror/view'
import {
    insertTab, indentLess, defaultKeymap, cursorSyntaxLeft, selectSyntaxLeft, selectSyntaxRight, cursorSyntaxRight, moveLineUp, copyLineUp, moveLineDown, copyLineDown, simplifySelection,
    insertBlankLine, selectLine, selectParentSyntax, indentMore, indentSelection, deleteLine, cursorMatchingBracket, toggleComment, toggleBlockComment, toggleTabFocusMode, standardKeymap
} from '@codemirror/commands'
import { EditorState } from '@codemirror/state'
import { markdown } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { basicLight, basicLightTheme, basicLightHighlightStyle } from "~/unjs/editor/themes/default-theme"
type KeyBinding = /*unresolved*/ any

const demoCommand = ({ state, dispatch }) => {
    console.log('ssssssssssssssssss')
};

// https://github.com/codemirror/commands/blob/main/src/commands.ts
export const myDefaultKeymap: readonly KeyBinding[] = ([
    { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: cursorSyntaxLeft, shift: selectSyntaxLeft },
    { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: cursorSyntaxRight, shift: selectSyntaxRight },

    { key: "Alt-ArrowUp", run: moveLineUp },
    { key: "Shift-Alt-ArrowUp", run: copyLineUp },

    { key: "Alt-ArrowDown", run: moveLineDown },
    { key: "Shift-Alt-ArrowDown", run: copyLineDown },

    { key: "Escape", run: simplifySelection },
    { key: "Mod-Enter", run: insertBlankLine },

    { key: "Alt-l", mac: "Ctrl-l", run: selectLine },
    { key: "Alt-,", mac: "Ctrl-,", run: demoCommand },
    { key: "Mod-i", run: selectParentSyntax, preventDefault: true },

    { key: "Mod-[", run: indentLess },
    { key: "Mod-]", run: indentMore },
    { key: "Mod-Alt-\\", run: indentSelection },

    { key: "Shift-Mod-k", run: deleteLine },

    { key: "Shift-Mod-\\", run: cursorMatchingBracket },

    { key: "Mod-/", run: toggleComment },
    { key: "Alt-A", run: toggleBlockComment },

    { key: "Ctrl-m", mac: "Shift-Alt-m", run: toggleTabFocusMode },
] as readonly KeyBinding[]).concat(standardKeymap)

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
                        console.log('mouse enter...')
                    },
                    mouseleave() {
                        that.innnerCSA = 'preview'
                        console.log('mouse out...')
                    }
                })
            }

            let view = new EditorView({
                doc: content,  //文本内容
                extensions: [  //扩展
                    basicSetup,  //行数显示扩展
                    basicLightTheme,  //自定义主题
                    keymap.of(myDefaultKeymap),
                    /**
                    keymap.of([
                        {
                            key: "Alt-S",
                            run: () => {
                                console.log('eeeeeeeeeeeeeee')
                               // this.$emit('change', _view)
                                return true
                            }
                        }
                    ]),  */
                    syntaxHighlighting(basicLightHighlightStyle),
                    markdown({   //markdown语言解析扩展
                        codeLanguages: languages,  //这里指定markdown中代码块使用的解析扩展
                        addKeymap: false
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