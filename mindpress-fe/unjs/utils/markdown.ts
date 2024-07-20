
export const MD_DIVIDER = '<!-- Content of the page -->';

export function buildHeaderKeyValue(key: string, value: string) {
    return `${key}: '` + value + `'\n`
}

export function extractBody(content: string | null) {
    if (!content) { return '' }
    let idx = content.lastIndexOf(MD_DIVIDER);
    return (idx >= 0) ? content.substring(idx + MD_DIVIDER.length + 1) : content
}

export function buildHeaderArray(arrayVal: any[]) {
    if (arrayVal.length == 0) {
        return ''
    }

    let initValue = '\n';
    arrayVal.forEach(item => {
        initValue = initValue + "  - " + item + "\n"
    })
    return initValue
}