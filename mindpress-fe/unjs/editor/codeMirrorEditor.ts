import { basicSetup, minimalSetup } from "codemirror"
import { EditorView, keymap } from "@codemirror/view"
import { defaultKeymap } from "@codemirror/commands"
import { tags } from "@lezer/highlight"
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import prettier from 'prettier/standalone'
import { basicLight, basicLightTheme, basicLightHighlightStyle } from "./themes/defauult-theme"
import { javascript } from "@codemirror/lang-javascript"
import { EditorState, Compartment } from "@codemirror/state"
import { htmlLanguage, html } from "@codemirror/lang-html"
import { language } from "@codemirror/language"



export function formatDoc(content: string) {
    return content;
}

const modPrefix = `Ctrl`

let baseTheme = EditorView.baseTheme({
    ".cm-o-replacement": {
        display: "inline-block",
        width: ".5em",
        height: ".5em",
        borderRadius: ".25em"
    },
    "&light .cm-o-replacement": {
        backgroundColor: "#04c"
    },
    "&dark .cm-o-replacement": {
        backgroundColor: "#5bf"
    }
})

let myTheme = EditorView.theme({
    "&": {
        color: "white",
        backgroundColor: "#034"
    },
    ".cm-content": {
        caretColor: "#0e9"
    },
    "&.cm-focused .cm-cursor": {
        borderLeftColor: "#0e9"
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "#074"
    },
    ".cm-gutters": {
        backgroundColor: "#045",
        color: "#ddd",
        border: "none"
    }
}, { dark: true })

const myHighlightStyle = HighlightStyle.define([
    { tag: tags.keyword, color: "#fc6" },
    { tag: tags.comment, color: "#f5d", fontStyle: "italic" }
])

function editorFromTextArea(textarea: any, extensions: any) {
    let view = new EditorView({ doc: textarea.value, extensions })
    textarea.parentNode.insertBefore(view.dom, textarea)
    textarea.style.display = "none"
    if (textarea.form) textarea.form.addEventListener("submit", () => {
        textarea.value = view.state.doc.toString()
    })
    return view
}

const languageConf = new Compartment

const autoLanguage = EditorState.transactionExtender.of(tr => {
    if (!tr.docChanged) return null
    let docIsHTML = /^\s*</.test(tr.newDoc.sliceString(0, 100))
    let stateIsHTML = tr.startState.facet(language) == htmlLanguage
    if (docIsHTML == stateIsHTML) return null
    return {
        effects: languageConf.reconfigure(docIsHTML ? html() : javascript())
    }
})

export function initEditorEntity(content: string) {
    if (!import.meta.client) {
        return
    }

    const editorDom = document.getElementById(`editor`) as any

    if (!editorDom.value) {
        editorDom.value = formatDoc(content)
    }
    //const editor = editorFromTextArea(editorDom, [basicSetup, languageConf.of(javascript()), autoLanguage, myTheme, syntaxHighlighting(myHighlightStyle)])
    const editor = editorFromTextArea(editorDom, [basicSetup, languageConf.of(javascript()), autoLanguage, basicLight])


    return editor;

    /*
    const editor = editorFromTextArea(editorDom, {
        mode: `text/x-markdown`,
        theme: `xq-light`,
        lineNumbers: false,
        lineWrapping: true,
        styleActiveLine: true,
        autoCloseBrackets: true,
        extensions: [keymap.of(defaultKeymap)],
        extraKeys: {
            [`${modPrefix}-F`]: function autoFormat(editor: any) {
                const doc = formatDoc(editor.getValue(0))
                editor.setValue(doc)
            },
            [`${modPrefix}-B`]: function bold(editor: any) {
                const selected = editor.getSelection()
                editor.replaceSelection(`**${selected}**`)
            },
            [`${modPrefix}-D`]: function del(editor: any) {
                const selected = editor.getSelection()
                editor.replaceSelection(`~~${selected}~~`)
            },
            [`${modPrefix}-I`]: function italic(editor: any) {
                const selected = editor.getSelection()
                editor.replaceSelection(`*${selected}*`)
            },
            [`${modPrefix}-K`]: function italic(editor: any) {
                const selected = editor.getSelection()
                editor.replaceSelection(`[${selected}]()`)
            },
            [`${modPrefix}-L`]: function code(editor: any) {
                const selected = editor.getSelection()
                editor.replaceSelection(`\`${selected}\``)
            },
        },
    })*/
}