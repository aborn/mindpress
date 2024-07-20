
export const MD_DIVIDER = '<!-- Content of the page -->';
export const MD_HEADER_KEYS = ['title', 'date', 'authors', 'author', 'permalink', 'category', 'tag', 'createTime', 'mpid', 'mpstatus']
import { parseFrontMatter } from 'remark-mdc'

export function buildHeaderKeyValue(key: string, value: string) {
    return `${key}: '` + value + `'\n`
}

export function updateHeaderKeyValue(headerObj: any, key: string, value: any) {
    let header = ''
    for (let [headKey, headValue] of Object.entries(headerObj)) {
        if (key === headKey) {
            if (headValue !== value) {
                console.log('changed key:' + headKey + ' value from:' + headValue + ' to:' + value)
                headerObj[key] = value
            }
        }
    }

    MD_HEADER_KEYS.forEach(item => {
        if (headerObj.hasOwnProperty(item)) {
            if ('category' === item || 'tag' === item) {
                header = header + buildHeaderKeyValue(item, buildHeaderArray(headerObj[item]))
            } else {
                header = header + buildHeaderKeyValue(item, headerObj[item] as string)
            }
        }
    })
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
    arrayVal.forEach(item => {
        initValue = initValue + "  - " + item + "\n"
    })
    return initValue
}