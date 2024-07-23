<template>
    <div :class="`editorContainer ${editorfullcss}`" id="editorContainer" ref="editorContainerRef">
        <div class="row toolbarRow">
            <div class="toolbaritems toolbaritems-wrapper">
                <div class="toolbar-col">
                    <ToolBarIcon :icon="`bold`" @click="toobarItemAction('bold')" />
                    <ToolBarIcon :icon="`underline`" @click="toobarItemAction('underline')" />
                    <ToolBarIcon :icon="`italic`" @click="toobarItemAction('italic')" />
                    <ToolBarIcon :icon="`strike`" @click="toobarItemAction('strike')" />
                    <ToolBarDivider />
                    <ToolBarIcon :icon="`subscript`" @click="toobarItemAction('subscript')" />
                    <ToolBarIcon :icon="`superscript`" @click="toobarItemAction('superscript')" />
                    <ToolBarDivider />
                    <ToolBarIcon :icon="`image`" @click="toobarItemAction('image')" />
                    <ToolBarIcon v-if="!isrecovered && showRecover" :icon="`recover`"
                        @click="toobarItemAction('recover')" />
                    <ToolBarIcon v-if="showRecover" :icon="`diff`" @click="toobarItemAction('diff')" />
                    <ToolBarIcon v-if="isrecovered" :icon="`unrecover`" @click="toobarItemAction('recover')" />
                </div>
                <div class="toolbar-col">
                    <ToolBarIcon :icon="`save`" @click="toobarItemAction('save')" />
                    <ToolBarIcon :icon="`copyToWeChat`" @click="toobarItemAction('copyToWeChat')" tips="复制到微信公众号" />
                    <ToolBarIcon :icon="fullPage ? `fullPage` : `nonfullPage`" @click="toobarItemAction('pagefull')"
                        :tips="!fullPage ? 'Full Page' : 'Exist'" />
                    <ToolBarIcon :icon="fullScreen ? `screenfull` : `nonscreenfull`"
                        @click="toobarItemAction('screenfull')" :tips="!fullScreen ? 'Full Screen' : 'Exist'" />
                    <ToolBarDivider />
                    <ToolBarIcon v-if="markdown.mpstatus === 'draft'" :icon="`publish`"
                        @click="toobarItemAction('publish')" tips="Publish" />
                    <ToolBarIcon v-if="markdown.mpstatus === 'publish'" :icon="`republish`"
                        @click="toobarItemAction('republish')" tips="Update publish" />
                    <ToolBarIcon v-if="markdown.mpstatus === 'publish'" :icon="`unpublish`"
                        @click="toobarItemAction('unpublish')" tips="Cancel publish" />
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
        <UModal v-model="isOpen">
            <div class="p-4 w-100" id="outputHtml"
                :style="`max-height: calc(100vh - ${heightExp}px - 10px);overflow: auto;`">
                <section id="diffHtml" v-html="diffHtml"></section>
            </div>
        </UModal>
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
import { forceToArray, isBlank } from "~/unjs/utils/utils"
import { showToast } from "~/client/popup/toast"
import { copyToWechat, mergeCss, solveWeChatImage } from "~/unjs/editor/wechat"
import { AUTO_SAVE, MD_CURRENT_CONTENT, MD_ORIGIN_CONTENT, MD_RECENT_CONTENT } from "~/unjs/editor/staticValue"
import { countWords, countLines } from "alfaaz";
import * as Diff from 'diff'
import * as Diff2Html from 'diff2html';
import { ColorSchemeType } from "diff2html/lib/types"
import ToolBarIcon from './Editor/ToolBarIcon.vue'
import ToolBarDivider from './Editor/ToolBarDivider.vue'
// import { Diff2HtmlUI } from 'diff2html/lib/ui/js/diff2html-ui-slim.js';
import 'diff2html/bundles/css/diff2html.min.css';

const debounce = createDebounce()

export default {
    props: ['content', 'csa', 'tips', 'title', 'markdown'],   // current scroll area, only: 'preview', 'editor'
    emits: ['change', 'save', 'uploadImg', 'fullpage', 'action'],
    name: "MagicEditor",
    components: {
        ToolBarIcon, ToolBarDivider
    },
    data() {
        return {
            doc: this.content,
            editor: null as any,
            output: '' as string,
            footerinfo: '' as string,
            footerinfoR: '' as string,
            isrecovered: false as boolean,
            isContentChanged: false as boolean,
            showRecover: false as boolean,
            isOpen: false as boolean,
            diffHtml: '' as string,
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
            return (this.fullPage || this.fullScreen) ? this.title : this.markdown.date || '';
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
            localStorage.setItem(MD_ORIGIN_CONTENT, newV)
        },
        fullPage(newV, oldV) {
            this.$emit('fullpage', newV)
            this.processEditorHeight()
        },
        fullScreen(newV, oldV) {
            this.processEditorHeight()
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
        processEditorHeight() {
            console.log('... processEditorHeight:' + this.fullPage + ", this.fullS:" + this.fullScreen)
            var editors = document.querySelectorAll(".cm-editor");
            editors.forEach((editor, index) => {
                // console.log(editor)
                if (this.fullPage || this.fullScreen) {
                    editor.classList.add('cm-editor-fullpage');
                } else {
                    editor.classList.remove('cm-editor-fullpage');
                }
            })
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
                if (!mdContent || mdContent.length == 0) {
                    console.warn('no recent content.!')
                    showToast('no content to be recovered!')
                    return;
                }
                if (!this.isrecovered) {
                    const content = this.editor.state.doc.toString();
                    localStorage.setItem(MD_RECENT_CONTENT, content)
                }
                this.editor.dispatch({
                    changes: { from: 0, to: this.editor.state.doc.length, insert: mdContent }
                });

                showToast(this.isrecovered ? 'Markdown data recover to recent!' : 'Markdown data recover to origin!')
                this.isrecovered = !this.isrecovered
            } else if ('publish' === type || 'republish' === type || 'unpublish' === type) {
                this.$emit('action', type)
            } else if ('diff' === type) {
                this.isOpen = !this.isOpen
                const currentContent = localStorage.getItem(MD_CURRENT_CONTENT)
                const originCOntent = localStorage.getItem(MD_ORIGIN_CONTENT)
                const fileName = this.markdown?.articleid || 'markdown.md'
                //const diff = Diff.createPatch(fileName, 'abc ', 'abc \n ad')
                const diff = Diff.createPatch(fileName, originCOntent, currentContent)

                this.diffHtml = Diff2Html.html(diff, {
                    drawFileList: true,
                    matching: 'lines',
                    outputFormat: 'side-by-side',
                    colorScheme: ColorSchemeType.AUTO,
                });
                // console.log(diff)
            } else {
                runCommand(this.editor, type)
            }
        },
        commandSave(_view: EditorView) {
            console.log('commandSave action............')
            // console.log(_view)
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
        doBeforeUnloadAction(e: any = null) {
            // e && e.preventDefault();
            console.log(' --->before unload<---')
            const currentContent = localStorage.getItem(MD_CURRENT_CONTENT)
            const originCOntent = localStorage.getItem(MD_ORIGIN_CONTENT)

            if (originCOntent !== currentContent) {
                console.log('content changed, now save it!')
                this.$emit('save', this.editor.viewState.state.doc.toString(), AUTO_SAVE, this.markdown.articleid)
            } else {
                console.log('content not change, no need to save!')
            }
            localStorage.removeItem(MD_ORIGIN_CONTENT)
        },
        createArea(content: string) {
            if (content == undefined || content == null) {
                return
            }
            const that = this;
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
                                    this.footerinfo = this.footerinfo + '  ch ' + content.length + ' word ' + countWords(content)
                                }
                            }

                            if (update.docChanged || isBlank(this.output)) {
                                console.log('--------markdown content changed--------')
                                localStorage.setItem(MD_CURRENT_CONTENT, content)
                                this.$emit('change', content)
                                this.isContentChanged = true; // 第一次请求网络的时候，这个内容也会更新，如何检测是手工更新的呢？？
                                const originCOntent = localStorage.getItem(MD_ORIGIN_CONTENT)

                                // console.log('isBlank(originCOntent as string)' + isBlank(originCOntent as string))
                                // console.log('isBlank(content)' + isBlank(content))
                                // console.log('fa==' + originCOntent != content)
                                if (!isBlank(originCOntent as string) && !isBlank(content) && originCOntent != content) {
                                    this.showRecover = true
                                } else {
                                    this.showRecover = false
                                }
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
        this.doBeforeUnloadAction()
    },
    unmounted: function () {
        console.log('editor unmounted...')
        this.editor && this.editor.destroy()
        window.removeEventListener("beforeunload", this.doBeforeUnloadAction)
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
        window.addEventListener("beforeunload", this.doBeforeUnloadAction);
    }
}
</script>