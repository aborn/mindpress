<template>
    <div :class="`editorContainer ${editorfullcss}`" id="editorContainer" ref="editorContainerRef">
        <div class="row toolbarRow">
            <div class="toolbaritems toolbaritems-wrapper">
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
                    <span class="toolbaritem" @click="toobarItemAction('subscript')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M19 20v-2q0-.425.288-.712T20 17h2v-1h-3v-1h3q.425 0 .713.288T23 16v1q0 .425-.288.713T22 18h-2v1h3v1zM5.875 18l4.625-7.275L6.2 4h2.65l3.1 5h.1l3.075-5H17.8l-4.325 6.725L18.125 18H15.45l-3.4-5.425h-.1L8.55 18z" />
                        </svg>
                    </span>
                    <span class="toolbaritem" @click="toobarItemAction('superscript')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M19 9V7q0-.425.288-.712T20 6h2V5h-3V4h3q.425 0 .713.288T23 5v1q0 .425-.288.713T22 7h-2v1h3v1zM5.875 20l4.625-7.275L6.2 6h2.65l3.1 5h.1l3.075-5H17.8l-4.325 6.725L18.125 20H15.45l-3.4-5.425h-.1L8.55 20z" />
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
                    <span v-if="!isrecovered" class="toolbaritem" @click="toobarItemAction('recover')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="22" viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5" color="currentColor">
                                <path d="M3 12c0 1.657 3.582 3 8 3q.508 0 1-.023" />
                                <path d="M19 5v6.5M3 5v14c0 1.657 3.582 3 8 3q.508 0 1-.023" />
                                <ellipse cx="11" cy="5" rx="8" ry="3" />
                                <path
                                    d="M7 8v2m0 5v2m12.987-3l.5 2.084l-.83-.518a3.5 3.5 0 0 0-2.122-.715c-1.952 0-3.535 1.6-3.535 3.575C14 20.4 15.583 22 17.535 22c1.71 0 3.137-1.228 3.465-2.86" />
                            </g>
                        </svg>
                    </span>
                    <span v-if="isrecovered" class="toolbaritem" @click="toobarItemAction('recover')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" fill-rule="evenodd"
                                d="M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12S17.937 22.75 12 22.75S1.25 17.937 1.25 12m16.321-.89l-.05.055l-3.5 3.375a.75.75 0 1 1-1.042-1.08l2.163-2.085H9.789l-.062.004a2.5 2.5 0 0 0-.982.281a1.74 1.74 0 0 0-.673.624c-.178.288-.322.71-.322 1.341c0 1.438.567 2.032 1.029 2.312a2.25 2.25 0 0 0 1.014.313h.807a.75.75 0 0 1 0 1.5h-.8a3.7 3.7 0 0 1-1.798-.53c-.933-.565-1.752-1.658-1.752-3.595c0-.87.202-1.572.545-2.128c.341-.554.796-.92 1.238-1.157A4 4 0 0 1 9.8 9.875h5.433L12.96 7.521a.75.75 0 0 1 1.08-1.042l3.498 3.623a.75.75 0 0 1 .033 1.009"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                </div>
                <div class="toolbar-col">
                    <span class="toolbaritem" @click="toobarItemAction('save')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 32 32">
                            <path fill="currentColor"
                                d="m27.71 9.29l-5-5A1 1 0 0 0 22 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V10a1 1 0 0 0-.29-.71M12 6h8v4h-8Zm8 20h-8v-8h8Zm2 0v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8H6V6h4v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6.41l4 4V26Z" />
                        </svg>
                    </span>
                    <span class="toolbaritem" @click="toobarItemAction('copyToWeChat')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M15.85 8.14c.39 0 .77.03 1.14.08C16.31 5.25 13.19 3 9.44 3c-4.25 0-7.7 2.88-7.7 6.43c0 2.05 1.15 3.86 2.94 5.04L3.67 16.5l2.76-1.19c.59.21 1.21.38 1.87.47c-.09-.39-.14-.79-.14-1.21c-.01-3.54 3.44-6.43 7.69-6.43M12 5.89a.96.96 0 1 1 0 1.92a.96.96 0 0 1 0-1.92M6.87 7.82a.96.96 0 1 1 0-1.92a.96.96 0 0 1 0 1.92" />
                            <path fill="currentColor"
                                d="M22.26 14.57c0-2.84-2.87-5.14-6.41-5.14s-6.41 2.3-6.41 5.14s2.87 5.14 6.41 5.14c.58 0 1.14-.08 1.67-.2L20.98 21l-1.2-2.4c1.5-.94 2.48-2.38 2.48-4.03m-8.34-.32a.96.96 0 1 1 .96-.96c.01.53-.43.96-.96.96m3.85 0a.96.96 0 1 1 0-1.92a.96.96 0 0 1 0 1.92" />
                        </svg>
                    </span>
                    <span class="toolbaritem" @click="toobarItemAction('pagefull')">
                        <svg v-if="!fullPage" xmlns="http://www.w3.org/2000/svg" width="28" height="24"
                            viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21 11V3h-8l3.29 3.29l-10 10L3 13v8h8l-3.29-3.29l10-10z" />
                        </svg>

                        <svg v-if="fullPage" xmlns="http://www.w3.org/2000/svg" width="28" height="24"
                            viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M22 3.41L16.71 8.7L20 12h-8V4l3.29 3.29L20.59 2zM3.41 22l5.29-5.29L12 20v-8H4l3.29 3.29L2 20.59z" />
                        </svg>

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
        <div class="row containerRow" :style="`height: calc(100vh - ${heightExp}px)`">
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
        <div class="row footerbarRow">
            <div class="toolbaritems toolbaritems-wrapper">
                <div style="padding: 5px;font-size: x-small;">
                    <div>{{ footerinfo }}</div>
                </div>
                <div class="toobar-message-box" :style="`color: ${msg.color};`">{{ msg.desc }}</div>
                <div style="padding: 5px;font-size: x-small;">
                    <div>{{ fr }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { basicSetup, EditorView, myDefaultKeymap, runCommand } from "~/unjs/editor/magiceditor/basicSetup"
import { uploadFileCallback, commandImg, moveCursorToEndOfLine, moveCursorToBeginOfLine } from "~/unjs/editor/magiceditor/commands"
import { markdown } from '~/unjs/editor/codemirror/markdown/index'
import { languages } from "~/unjs/editor/codemirror/language-data/language-data"
// import { basicSetup, EditorView } from "codemirror"
// import { markdown } from "@codemirror/lang-markdown"
// import { languages } from "@codemirror/language-data"
// @ts-ignore
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
// @ts-ignore
import { ViewUpdate, keymap, BlockInfo } from '@codemirror/view'
import { basicLight, basicLightTheme, basicLightHighlightStyle } from "~/unjs/editor/themes/default-theme"
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorSelection, SelectionRange, Compartment, EditorState } from '@codemirror/state'
import { wxRenderer } from "~/unjs/render/wxRenderer"
import { forceToArray, isBlank, showToast } from "~/unjs/utils"
import { copyToWechat, mergeCss, solveWeChatImage } from "~/unjs/editor/wechat"
import { MD_CURRENT_CONTENT, MD_ORIGIN_CONTENT, MD_RECENT_CONTENT } from "~/unjs/editor/staticValue"
const debounce = createDebounce()

export default {
    props: ['content', 'csa', 'tips', 'title'],   // current scroll area, only: 'preview', 'editor'
    emits: ['change', 'save', 'uploadImg', 'fullpage'],
    name: "MarkdownEditor",
    data() {
        return {
            doc: this.content,
            editor: null as any,
            output: '' as string,
            footerinfo: '' as string,
            footerinfoR: '' as string,
            isrecovered: false as boolean,
        }
    },
    setup() {
        const previewRef = ref(null as any)
        const editorContainerRef = ref(null as any)
        const innnerCSA = 'preview'
        const fullScreen = ref(false)
        const fullPage = ref(false)
        const curPos = 0;
        const pos = {} as { from: number, to: number, pos: number, row: number, col: number, info: string };
        return { previewRef, innnerCSA, editorContainerRef, fullScreen, fullPage, curPos, pos }
    },
    computed: {
        msg() {
            return this.tips
        },
        editorfullcss() {
            return this.fullPage ? 'fullpage' : ''
        },
        heightExp() {
            return (this.fullPage || this.fullScreen) ? 75 : 290;
        },
        fr() {
            return (this.fullPage || this.fullScreen) ? this.title : '';
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
        },
        fullPage(newV, oldV) {
            this.$emit('fullpage', newV)
        }
    },
    methods: {
        syncScrollPreview(ratio: number) {
            // console.log('syncScrollPreview csa = ' + this.innnerCSA)
            if (this.innnerCSA !== 'editor') {
                return;
            }
            // console.log('edit scroll:' + ratio)
            // console.log(this.previewRef)
            const clientH = this.previewRef.clientHeight
            const scrollH = this.previewRef.scrollHeight
            this.previewRef.scrollTop = (ratio * (scrollH - clientH))
        },
        previewScrollAction() {
            // console.log('preview ui scroll csa = ' + this.innnerCSA)
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
            } else if ('copyToWeChat' === type) {
                copyToWechat(this.output)
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
                } else {
                    document.exitFullscreen();
                }
                this.fullScreen = !this.fullScreen
            } else if ('pagefull' === type) {
                console.log(this.fullPage)
                this.fullPage = !this.fullPage
            } else if ('recover' === type) {
                if (!this.editor) { return; }
                const mdContent = this.isrecovered ? localStorage.getItem(MD_RECENT_CONTENT) : localStorage.getItem(MD_ORIGIN_CONTENT)
                if (!mdContent) {
                    console.warn('no recent content.!')
                }

                if (!this.isrecovered) {
                    const content = this.editor.state.doc.toString();
                    localStorage.setItem(MD_RECENT_CONTENT, content)
                }
                this.editor.dispatch({
                    changes: { from: 0, to: this.editor.state.doc.length, insert: mdContent }
                });

                showToast({ title: this.isrecovered ? 'Markdown data recover to recent!' : 'Markdown data recover to origin!' })
                this.isrecovered = !this.isrecovered
            } else {
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
            if (content == undefined || content == null) {
                return
            }
            localStorage.setItem(MD_ORIGIN_CONTENT, content)
            const that = this;
            const languageComp = new Compartment()
            const domEventHandlersPlugin = () => {
                return EditorView.domEventHandlers({
                    scroll(e: any, view: any) {
                        // console.log('\n\n')
                        // console.log('editor scroll csa = ' + that.innnerCSA)
                        // console.log(view)

                        const from = view.viewport.from;
                        const to = view.viewport.to;
                        // console.log(view.docView.view.scrollDOM)
                        const scrolView = view.docView.view.scrollDOM;

                        const clientH = scrolView.clientHeight
                        const scrollH = scrolView.scrollHeight
                        const scrollTop = scrolView.scrollTop
                        const ratio = scrollTop / (scrollH - clientH)

                        // console.log('scroll......from:' + from + "  to:" + to + ' sH:' + scrollH + '   ' + clientH + '  sT:' + scrollTop)
                        // console.log(ratio)
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
                            const content = update.state.doc.toString();

                            if (update.changes) {
                                // all changes 
                                // console.log('chnage. event.' + update.changes)

                                const lineAt = this.editor.state.doc.lineAt(this.editor.state.selection.main.head)
                                const currentPos = this.editor.state.selection.main.head
                                const info = lineAt.number + "," + (currentPos - lineAt.from)
                                this.pos = {
                                    from: lineAt.from, to: lineAt.to, pos: currentPos, row: lineAt.number, col: (currentPos - lineAt.from),
                                    info: lineAt.number + ':' + (currentPos - lineAt.from)
                                }
                                this.footerinfo = 'Ln ' + this.pos.row + ', Col ' + this.pos.col
                                if (content && content.length > 0) {
                                    this.footerinfo = this.footerinfo + ' ' + content.length
                                }
                            }

                            if (update.docChanged || isBlank(this.output)) {
                                console.log('--------markdown content changed--------')
                                localStorage.setItem(MD_CURRENT_CONTENT, content)
                                this.$emit('change', content)
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
    beforeUnmount: function () {
        console.log('befor unmount...')
        if (!this.editor) { return }
        this.$emit('save', this.editor.viewState.state.doc.toString())
    },
    mounted: function () {
        this.createArea(this.content);
        document.addEventListener('keydown', e => {
            // e.preventDefault();
            if (!this.editor) { return; }
            const lineAt = this.editor.state.doc.lineAt(this.editor.state.selection.main.head)
            const text = lineAt.text
            if (text.length > 0) {
                const curPos = this.editor.state.selection;
                const from = curPos.ranges && curPos.ranges[0].from
                const sArr = text.split(' ')
                this.curPos = (sArr.length > 0 && text.startsWith('#')) ? lineAt.from + sArr[0].length : lineAt.from
            }

            // windows: Ctrl + S, mac: Command + s
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                // Prevent the Save dialog to open
                e.preventDefault();
                if (!this.editor) {
                    console.error('editor instance doesnot exists!')
                }
                this.$emit('save', this.editor.viewState.state.doc.toString())
            } else if (e.ctrlKey && e.key === 'e') {
                e.preventDefault();
                this.editor.focus()
                //  current select position from to, if not selected, use cursor
                const curPos = this.editor.state.selection;
                const from = curPos.ranges && curPos.ranges[0].from
                const to = curPos.ranges && curPos.ranges[0].to
                // current line info
                // const lineAt = this.editor.state.doc.lineAt(this.editor.state.selection.main.head)
                moveCursorToEndOfLine(this.editor)
            } else if (e.ctrlKey && e.key === 'a') {
                e.preventDefault();
                this.editor.focus()
                moveCursorToBeginOfLine(this.editor)
                // console.log('from .....>>>>>' + this.from)
                this.editor.dispatch({ selection: { anchor: this.curPos, head: this.curPos } })
            }
            else if (e.key === "Escape") {
                console.log('esc key click....')
                this.fullPage = false;
                this.fullScreen = false;
            }
        });

        /**
         * document.addEventListener('fullscreenchange', exitHandler);
         * document.addEventListener('webkitfullscreenchange', exitHandler);
         * document.addEventListener('mozfullscreenchange', exitHandler);
         * document.addEventListener('MSFullscreenChange', exitHandler);
         * */
        document.addEventListener('fullscreenchange', e => {
            if (document.fullscreenElement) {
                console.log('enter fullscreen')
            } else {
                console.log('exit fullscreen')
                this.fullScreen = false;
                this.fullPage = false;
            }
        })
    }
}
</script>