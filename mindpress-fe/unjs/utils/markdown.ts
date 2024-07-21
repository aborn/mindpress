
export const MD_DIVIDER = '<!-- Content of the page -->';
export const MD_HEADER_KEYS = ['title', 'date', 'authors', 'author', 'permalink', 'category', 'tag', 'createTime', 'mpid', 'mpstatus']
import { parseFrontMatter } from 'remark-mdc'

export function buildHeaderKeyValue(key: string, value: string, useQuote: boolean = true) {
    return useQuote ? `${key}: '` + value + `'\n`
        : `${key}: ` + value + `\n`
}

export function buildMDHeaderWithUpdateKeyValue(mdheader: any, changedKeyValueObj: any) {
    let header = '---\n'
    const headerObj = { ...mdheader, ...changedKeyValueObj }

    MD_HEADER_KEYS.forEach(item => {
        if (headerObj.hasOwnProperty(item)) {
            if ('authors' === item || 'author' === item) {
                header = header + buildHeaderKeyValue(item, JSON.stringify(headerObj[item]), false)
            } else if ('category' === item || 'tag' === item) {
                header = header + buildHeaderKeyValue(item, buildHeaderArray(headerObj[item]), false)
            } else {
                header = header + buildHeaderKeyValue(item, headerObj[item] as string)
            }
        }
    })
    header = header + `---\n\n${MD_DIVIDER}\n`;
    return header;
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
    let count = 0;
    arrayVal.forEach(item => {
        initValue = initValue + "  - " + item + (count == arrayVal.length - 1 ? "" : "\n")
        count++
    })
    return initValue
}