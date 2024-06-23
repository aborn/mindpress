import { editorEmits } from 'md-editor-v3/lib/types/MdEditor/props';
import { v4 as uuidv4 } from 'uuid'

export function generatePermalinkHash() {
    const uuid = uuidv4();
    const permalink = uuid.replace(/-/g, '');
    return permalink.length > 16 ? permalink.substring(permalink.length - 16) : permalink
}

export const MD_DIVIDER = '<!-- Content of the page -->';

export function extractBody(content: string | null) {
    if (!content) { return '' }
    let idx = content.lastIndexOf(MD_DIVIDER);
    return (idx >= 0) ? content.substring(idx + MD_DIVIDER.length + 1) : content
}

export interface IdxStruct {
    s: number,
    e: number
}

export function extraWithSurroundings(idx: IdxStruct, value: string) {
    const searchKey = value.substring(idx.s, idx.e);
    const highlight = '<span style="color:red">' + searchKey + '</span>';
    const searchBackLength = 10;
    const startIdx = (idx.s - searchBackLength) >= 0 ? idx.s - searchBackLength : 0;
    let result = value.substring(startIdx, idx.s) + highlight;
    const searchFowardLength = 10;
    const maxIdx = (idx.e + 1 + searchFowardLength)
    const endIdx = maxIdx > value.length ? value.length : maxIdx;
    return result + value.substring(idx.e + 1, endIdx)
}