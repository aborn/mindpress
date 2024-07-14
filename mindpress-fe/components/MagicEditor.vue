<template>
    <div class="editorContainer" id="editorContainer" ref="editorContainerRef">
        <div class="row toolbarRow">
            <div class="toolbaritems md-editor-toolbar-wrapper">
                <div class="toolbar-col">
                    <span class="toolbaritem" @click="toobarItemAction('bold')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5">
                                <path d="M6 3.75h7.125a4.125 4.125 0 1 1 0 8.25H6z" />
                                <path
                                    d="M7.5 4.5h4.875a3.375 3.375 0 1 1 0 6.75H7.5zM6 11.25h7.5a4.5 4.5 0 1 1 0 9H6z" />
                                <path d="M7.5 12h5.25a3.75 3.75 0 1 1 0 7.5H7.5z" />
                            </g>
                        </svg>
                    </span>
                    <span class="toolbaritem" @click="toobarItemAction('underline')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5" d="M18 3.75v7.5a6 6 0 0 1-12 0v-7.5m-2.25 16.5h16.5" />
                        </svg>
                    </span>
                    <span class="toolbaritem" @click="toobarItemAction('italic')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="22" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M11.25 3.75h3.696m3.804 0h-3.804M5.25 20.25h3.804m3.696 0H9.054m0 0l5.892-16.5" />
                        </svg>
                    </span>
                    <span class="toolbaritem" @click="toobarItemAction('strike')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 256 256">
                            <path fill="currentColor"
                                d="M224 128a8 8 0 0 1-8 8h-40.07c9.19 7.11 16.07 17.2 16.07 32c0 13.34-7 25.7-19.75 34.79C160.33 211.31 144.61 216 128 216s-32.33-4.69-44.25-13.21C71 193.7 64 181.34 64 168a8 8 0 0 1 16 0c0 17.35 22 32 48 32s48-14.65 48-32c0-14.85-10.54-23.58-38.77-32H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8M76.33 104a8 8 0 0 0 7.61-10.49a17.3 17.3 0 0 1-.83-5.51c0-18.24 19.3-32 44.89-32c18.84 0 34.16 7.42 41 19.85a8 8 0 0 0 14-7.7C173.33 50.52 152.77 40 128 40c-34.71 0-60.89 20.63-60.89 48a33.7 33.7 0 0 0 1.62 10.49a8 8 0 0 0 7.6 5.51" />
                        </svg>
                    </span>
                    <span style=" text-align: center;display: inline-block;padding: 4px 4px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                            <path fill="currentColor" d="M7.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0v-9a.5.5 0 0 1 .5-.5" />
                        </svg>
                    </span>
                    <span class="toolbaritem" @click="toobarItemAction('image')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 16 16">
                            <path fill="currentColor" fill-rule="evenodd"
                                d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0-.146.353V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5zM12 5a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                </div>
                <div class="toolbar-col">
                    <div class="toobar-message-box" :style="`color: ${msg.color};`">{{ msg.desc }}</div>
                </div>
                <div class="toolbar-col">
                    <span class="toolbaritem" @click="toobarItemAction('save')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 32 32">
                            <path fill="currentColor"
                                d="m27.71 9.29l-5-5A1 1 0 0 0 22 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V10a1 1 0 0 0-.29-.71M12 6h8v4h-8Zm8 20h-8v-8h8Zm2 0v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8H6V6h4v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6.41l4 4V26Z" />
                        </svg>
                    </span>
                    <span class="toolbaritem" @click="toobarItemAction('pagefull')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21 11V3h-8l3.29 3.29l-10 10L3 13v8h8l-3.29-3.29l10-10z" />
                        </svg>
                        <!--
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M22 3.41L16.71 8.7L20 12h-8V4l3.29 3.29L20.59 2zM3.41 22l5.29-5.29L12 20v-8H4l3.29 3.29L2 20.59z"/></svg>
                        -->
                    </span>
                    <span class="toolbaritem" @click="toobarItemAction('screenfull')">
                        <svg v-if="!fullScreen" xmlns="http://www.w3.org/2000/svg" width="28" height="24"
                            viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M5 19h2q.425 0 .713.288T8 20t-.288.713T7 21H4q-.425 0-.712-.288T3 20v-3q0-.425.288-.712T4 16t.713.288T5 17zm14 0v-2q0-.425.288-.712T20 16t.713.288T21 17v3q0 .425-.288.713T20 21h-3q-.425 0-.712-.288T16 20t.288-.712T17 19zM5 5v2q0 .425-.288.713T4 8t-.712-.288T3 7V4q0-.425.288-.712T4 3h3q.425 0 .713.288T8 4t-.288.713T7 5zm14 0h-2q-.425 0-.712-.288T16 4t.288-.712T17 3h3q.425 0 .713.288T21 4v3q0 .425-.288.713T20 8t-.712-.288T19 7z" />
                        </svg>
                        <svg v-if="fullScreen" xmlns="http://www.w3.org/2000/svg" width="28" height="24"
                            viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M6 21v-3H3v-2h5v5zm10 0v-5h5v2h-3v3zM3 8V6h3V3h2v5zm13 0V3h2v3h3v2z" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
        <div class="row containerRow">
            <div class="column" id="editorCol">
                <div class="CoderMirror" id="editorTextArea">
                    <div ref="doc" class="doc"></div>
                </div>
            </div>
            <div class="column" id="preview">
                <section id="output-wrapper" ref="previewRef" class="preview-wrapper" @scroll="previewScrollAction">
                    <div class="preview">
                        <section id="output" v-html="output"></section>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { basicSetup, EditorView, myDefaultKeymap, runCommand } from "~/unjs/editor/magiceditor/basicSetup"
import { uploadFileCallback, commandImg } from "~/unjs/editor/magiceditor/commands"
import { markdown } from '~/unjs/editor/codemirror/markdown/index'
import { languages } from "~/unjs/editor/codemirror/language-data/language-data"
import { ViewUpdate, keymap, BlockInfo } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
// import { basicSetup, EditorView } from "codemirror"
// import { markdown } from "@codemirror/lang-markdown"
//import { languages } from "@codemirror/language-data"
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { basicLight, basicLightTheme, basicLightHighlightStyle } from "~/unjs/editor/themes/default-theme"
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorSelection, SelectionRange, Compartment } from '@codemirror/state'
import { wxRenderer } from "~/unjs/render/wxRenderer";
import { forceToArray, isBlank } from "~/unjs/utils"
const debounce = createDebounce()

export default {
    props: ['content', 'csa', 'tips'],   // current scroll area, only: 'preview', 'editor'
    emits: ['change', 'save', 'uploadImg'],
    name: "MarkdownEditor",
    data() {
        return {
            doc: this.content,
            editor: null as any,
            output: '' as string,
        }
    },
    setup() {
        const previewRef = ref(null as any)
        const editorContainerRef = ref(null as any)
        const innnerCSA = 'preview'
        const fullScreen = ref(false)
        return { previewRef, innnerCSA, editorContainerRef, fullScreen }
    },
    computed: {
        msg() {
            return this.tips
        }
    },
    watch: {
        tba(newV, oldV) {
            console.log('action: ' + newV + '        oldV:' + oldV)
        },
        content(newV, oldV) {
            console.log('props.content changed!')
            if (!this.editor) {
                this.createArea(newV);
            } else {
                this.editor.dispatch({
                    changes: { from: 0, to: this.editor.state.doc.length, insert: newV }
                });
            }
        }
    },
    methods: {
        syncScrollPreview(ratio: number) {
            console.log('syncScrollPreview csa = ' + this.innnerCSA)
            if (this.innnerCSA !== 'editor') {
                return;
            }
            console.log('edit scroll:' + ratio)
            console.log(this.previewRef)

            const clientH = this.previewRef.clientHeight
            const scrollH = this.previewRef.scrollHeight
            this.previewRef.scrollTop = (ratio * (scrollH - clientH))
        },
        previewScrollAction() {
            console.log('preview ui scroll csa = ' + this.innnerCSA)
            const offsetH = this.previewRef.offsetHeight
            const clientH = this.previewRef.clientHeight
            const scrollH = this.previewRef.scrollHeight
            const scrollTop = this.previewRef.scrollTop.toFixed(4)

            if (this.innnerCSA === 'preview') {
                const ratio = (scrollTop / (scrollH - clientH))
                const scrolView = this.editor.docView.view.scrollDOM;
                const iclientH = scrolView.clientHeight
                const iscrollH = scrolView.scrollHeight
                scrolView.scrollTop = ratio * (iscrollH - iclientH)
            }
            //console.log('scrolling....' + clientH + '  ' + scrollH + '  :' + scrollTop + "  " + offsetH)
        },
        toobarItemAction(type: string) {
            console.log(type)
            if ('save' === type) {
                if (!this.editor) {
                    console.error('editor instance doesnot exists!')
                }
                this.$emit('save', this.editor.viewState.state.doc.toString())
                return true
            } else if ('image' === type) {
                var input = document.createElement('input') as any;
                input.type = 'file';
                input.multiple = 'multiple';
                input.onchange = (e: any) => {
                    var files = e.target.files;
                    var fileArray = Object.keys(files).map((key) => files[key]);
                    this.uploadImage(e, fileArray)
                }
                input.click();
            } else if ('screenfull' === type) {
                console.log(this.fullScreen)
                if (!this.fullScreen) {
                    this.editorContainerRef.requestFullscreen()
                    this.fullScreen = true
                } else {
                    document.exitFullscreen();
                    this.fullScreen = false;
                }
            } else if ('pagefull' === type) {
                //this.editorContainerRef.requestFullscreen()
            }
            else {
                runCommand(this.editor, type)
            }
        },
        commandSave(_view: EditorView) {
            console.log('save action............')
            console.log(_view)
            // console.log(_view.viewState.state.doc.toString())
            this.$emit('save', _view.viewState.state.doc.toString())
            return true
        },
        uploadImage(event: any, files: any = null) {
            const imageCallBackFn = (image: any) => {
                console.log('callback files........')
                console.log(image)
                const images = Array.isArray(image) ? image : [image];
                images.forEach(item => {
                    commandImg(this.editor, item)
                })
            }

            if (files) {
                const fileArray = forceToArray(files);
                this.$emit('uploadImg', fileArray, imageCallBackFn)
            } else {
                return uploadFileCallback(event, (file: string) => {
                    this.$emit('uploadImg', file, imageCallBackFn)
                })
            }
        },
        createArea(content: string) {
            if (!content && content.length == 0) {
                return
            }
            const that = this;
            const languageComp = new Compartment()
            const domEventHandlersPlugin = () => {
                return EditorView.domEventHandlers({
                    scroll(e: any, view: any) {
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
                        that.syncScrollPreview(ratio)
                    },
                    mouseenter() {
                        that.innnerCSA = 'editor'
                        //console.log('mouse enter...')
                    },
                    mouseleave() {
                        that.innnerCSA = 'preview'
                        //console.log('mouse out...')
                    },
                    focus() {
                        console.log('fouced event.')
                    },
                    drop(event: DragEvent) {
                        uploadFileCallback(event, (file: string) => {
                            that.$emit('uploadImg', file, (image: any) => {
                                console.log('callback........')
                                console.log(image)
                                const images = Array.isArray(image) ? image : [image];
                                images.forEach(item => {
                                    commandImg(that.editor, item)
                                })
                            })
                        })
                        return
                    },
                    paste(event: ClipboardEvent) {
                        that.uploadImage(event)
                        return
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
                            ...myDefaultKeymap
                        ]),
                        syntaxHighlighting(basicLightHighlightStyle),
                        markdown({   //markdown语言解析扩展
                            codeLanguages: languages,  //这里指定markdown中代码块使用的解析扩展
                        }),
                        EditorView.lineWrapping,
                        EditorView.updateListener.of((update: any) => {
                            if (update.changes) {
                                // all changes 
                                // console.log('chnage. event.' + update.changes)
                            }

                            if (update.docChanged || isBlank(this.output)) {
                                console.log('--------markdown content changed--------')
                                this.$emit('change', update.state.doc.toString())
                                const content = update.state.doc.toString();
                                debounce(() => {
                                    const html = wxRenderer(content)
                                    this.output = html
                                }, 500)
                            }
                        }),
                        domEventHandlersPlugin()
                    ],
                }),
                parent: this.$refs.doc as Element,  //挂载的div块
            })
            this.editor = view
        },
        onEditorScroll() {
            console.log('scrolling.......')
        }
    },
    mounted: function () {
        this.createArea(this.content);
        document.addEventListener('keydown', e => {
            if (e.ctrlKey && e.key === 's') {
                // Prevent the Save dialog to open
                e.preventDefault();
                // Place your code here
                console.log('CTRL + S');
                if (!this.editor) {
                    console.error('editor instance doesnot exists!')
                }
                this.$emit('save', this.editor.viewState.state.doc.toString())
            }
        });
    }
}
</script>