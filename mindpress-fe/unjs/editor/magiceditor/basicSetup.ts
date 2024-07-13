import {
  keymap, highlightSpecialChars, drawSelection, highlightActiveLine, dropCursor,
  rectangularSelection, crosshairCursor,
  lineNumbers, highlightActiveLineGutter
} from "@codemirror/view"
import { Extension, EditorState } from "@codemirror/state"
import {
  defaultHighlightStyle, syntaxHighlighting, indentOnInput, bracketMatching,
  foldGutter, foldKeymap
} from "@codemirror/language"
import {
  insertTab, indentLess, defaultKeymap, cursorSyntaxLeft, selectSyntaxLeft, selectSyntaxRight, cursorSyntaxRight, moveLineUp, copyLineUp, moveLineDown, copyLineDown, simplifySelection,
  insertBlankLine, selectLine, selectParentSyntax, indentMore, indentSelection, deleteLine, cursorMatchingBracket, toggleComment, toggleBlockComment, toggleTabFocusMode, standardKeymap, history, historyKeymap
} from '@codemirror/commands'
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search"
import { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete"
import { lintKeymap } from "@codemirror/lint"
import {
  commandBold, commandItalic, commandStrike, commandFormatMarkdown, commandCode, commandImg, commandLink
  , commandPre, commandCheckBox, commandSeparator, commandQuote, commandTable
} from "~/unjs/editor/magiceditor/commands"
import type { EditorView } from "codemirror"

// https://github.com/codemirror/basic-setup/blob/main/src/codemirror.ts
export const basicSetup: Extension = (() => [
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter(),
  // drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap
  ])
])()

/// A minimal set of extensions to create a functional editor. Only
/// includes [the default keymap](#commands.defaultKeymap), [undo
/// history](#commands.history), [special character
/// highlighting](#view.highlightSpecialChars), [custom selection
/// drawing](#view.drawSelection), and [default highlight
/// style](#language.defaultHighlightStyle).
export const minimalSetup: Extension = (() => [
  highlightSpecialChars(),
  history(),
  drawSelection(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  keymap.of([
    ...defaultKeymap,
    ...historyKeymap,
  ])
])()

const demoCommand = ({ state, dispatch }) => {
  console.log('demo command click...')
};
type KeyBinding = /*unresolved*/ any

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
  { key: "Ctrl-b", run: commandBold },
  { key: 'Alt-t', mac: 'Cmd-t', run: commandTable },
  { key: 'Alt-i', run: commandItalic },
  { key: 'Alt-s', run: commandStrike },
  { key: 'Alt-e', mac: 'Cmd-e', run: commandCode },
  { key: 'Alt-m', mac: 'Cmd-m', run: commandImg },
  { key: 'Alt-k', mac: 'Cmd-k', run: commandLink },
  { key: 'Ctrl-Alt-e', mac: 'Ctrl-Cmd-e', run: commandPre },
  { key: 'Ctrl-Alt-s', mac: 'Ctrl-Cmd-s', run: commandSeparator },
  { key: 'Shift-Alt-f', mac: 'Shift-Alt-f', run: commandFormatMarkdown },
] as readonly KeyBinding[]).concat(standardKeymap)

const funMap: any = {
  'bold': commandBold,
  'table': commandTable,
  'link': commandLink,
  'strike': commandStrike,
  'italic': commandItalic,
}

export function runCommand(_view: EditorView, command: string) {
  if (!_view) { return }
  funMap[command] && funMap[command](_view)
}

export { EditorView } from "@codemirror/view"