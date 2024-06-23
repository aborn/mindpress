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