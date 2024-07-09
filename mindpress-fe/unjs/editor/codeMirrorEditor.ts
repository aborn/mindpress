import { EditorView, keymap } from "@codemirror/view"
import { defaultKeymap } from "@codemirror/commands"
import prettier from 'prettier/standalone'


export function formatDoc(content: string) {
    return content;
}

const modPrefix = `Ctrl`

function editorFromTextArea(textarea: any, extensions: any) {
    let view = new EditorView({ doc: textarea.value, extensions })
    textarea.parentNode.insertBefore(view.dom, textarea)
    textarea.style.display = "none"
    if (textarea.form) textarea.form.addEventListener("submit", () => {
        textarea.value = view.state.doc.toString()
    })
    return view
}

export function initEditorEntity(content: string) {
    if (!import.meta.client) {
        return
    }

    const editorDom = document.getElementById(`editor`) as any

    if (!editorDom.value) {
        editorDom.value = formatDoc(content)
    }

    const editor = editorFromTextArea(editorDom, {
        mode: `text/x-markdown`,
        theme: `xq-light`,
        lineNumbers: false,
        lineWrapping: true,
        styleActiveLine: true,
        autoCloseBrackets: true,
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
    })
}