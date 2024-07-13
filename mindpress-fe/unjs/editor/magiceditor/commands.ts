import { expectTypeOf } from 'vitest'
import { EditorView } from './basicSetup'
import { EditorSelection, SelectionRange, Compartment } from '@codemirror/state'
import * as prettier from 'prettier/standalone'
import pluginMarkdown from 'prettier/plugins/markdown'

function sliceDoc(editor: EditorView, from?: number, to?: number): string {
    return editor.state.sliceDoc(from, to)
}

function getDocString(editor: EditorView): string {
    return editor.state.doc.toString()
}

function getDocLength(editor: EditorView): number {
    return editor.state.doc.length
}

function insert(editor: EditorView, istFrom: number, istTo: number, content: string, selectFrom: number, selectTo: number) {
    let changeByRange = {
        /* 创建变更的内容, 可以是个数组, 说明同时修改多个部分 */
        changes: [{ from: istFrom, to: istTo, insert: content }],
        /* 修改之后光标移动到的位置 */
        selection: EditorSelection.create([EditorSelection.range(selectFrom, selectTo)])
    }
    // editor.dispatch(
    //   /**
    //    * @param _range 当前选中的位置
    //    */
    //   editor.state.changeByRange((_range: SelectionRange) => {
    //     console.log(_range);
    //     return changeByRange
    //   })
    // )
    editor.dispatch(changeByRange)
}

function replaceInlineCommand(editor: EditorView, range: SelectionRange, target: string, endTarget: string | null = null): any {
    let endT = endTarget || target;
    let len = target.length
    let lenEnTarget = endT.length;

    const prefixFrom: number = range.from - len
    const prefixTo: number = range.from
    const prefix = sliceDoc(editor, prefixFrom, prefixTo)

    const suffixFrom: number = range.to
    const suffixTo: number = range.to + lenEnTarget
    const suffix = sliceDoc(editor, suffixFrom, suffixTo)
    // 判断是取消还是添加, 如果被选中的文本前后已经是 target 字符, 则删除前后字符
    console.log('prefix:' + prefix + ', suffix:' + suffix + ', endT:' + endT)
    if (prefix == target && suffix == endT) {
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
                { from: range.to, insert: endT }
            ],
            range: EditorSelection.range(range.from + len, range.to + len)
        }
    }
}

function insertBlockCommand(editor: EditorView, content: string) {
    return editor.dispatch(editor.state.replaceSelection(content))
}

export function commandBold(_view: EditorView) {
    _view.dispatch(_view.state.changeByRange((range: SelectionRange) => {
        return replaceInlineCommand(_view, range, '**');
    }))
    return true;
}

export function commandItalic(editor: EditorView) {
    editor.dispatch(editor.state.changeByRange((range: SelectionRange) => replaceInlineCommand(editor, range, '*')))
    return true
}

export function commandUnderline(editor: EditorView) {
    editor.dispatch(editor.state.changeByRange((range: SelectionRange) => replaceInlineCommand(editor, range, '<u>', '</u>')))
    return true
}

export function commandStrike(editor: EditorView) {
    editor.dispatch(editor.state.changeByRange((range: SelectionRange) => replaceInlineCommand(editor, range, '~~')))
    return true
}

export function commandFormatMarkdown(editor: EditorView) {
    prettier.format(getDocString(editor), { semi: false, parser: 'markdown', plugins: [pluginMarkdown] })
        .then((formatContent: any) => {
            let maxLen = getDocLength(editor)
            let position = editor.state.selection.main.from
            insert(editor, 0, maxLen, formatContent, position, position)
        })
    return true
}

export function commandImg(editor: EditorView) {
    return insertBlockCommand(editor, `\n![]()\n`)
}

export function commandLink(editor: EditorView) {
    return insertBlockCommand(editor, `\n[]()\n`)
}

export function commandCode(editor: EditorView) {
    return editor.dispatch(editor.state.changeByRange((range: SelectionRange) => replaceInlineCommand(editor, range, '`')))
}

// code block
export function commandPre(editor: EditorView) {
    return insertBlockCommand(editor, `\n\`\`\`javascript\n\n\`\`\`\n`)
}

export function commandCheckBox(editor: EditorView) {
    return insertBlockCommand(editor, `\n- [ ] \n`)
}

export function commandSeparator(editor: EditorView) {
    return insertBlockCommand(editor, `\n---\n`)
}

export function commandQuote(editor: EditorView) {
    return insertBlockCommand(editor, `\n>\n>\n`)
}

export function commandTable(editor: EditorView) {
    return insertBlockCommand(editor, `\n|||\n|---|---|\n|||\n`)
}
