
import { Html } from '#build/components';
import type { MarkdownMetaS, MarkdownMeta } from './types';

export const mpTransform = (server: MarkdownMetaS): MarkdownMeta => {
    const value = {
        articleid: server.articleid,
        authors: [
            {
                name: server.createBy,
                link: server.createBy
            }
        ],
        category: server.category,
        createBy: server.createBy,
        createTime: server.createTime,
        editlink: "/edit/" + server.articleid,
        date: server.createTime,
        description: server.desc,
        id: server.id,
        isPublic: server.isPublic === 1,
        likeCount: server.likeCountVo || 0,
        permalink: "/article/" + server.articleid,
        reviewInfo: server.reviewInfo,
        status: server.status,
        space: server.space,
        tags: server.tags ? server.tags.split(',') : [],
        tag: server.tag,
        title: server.title,
        updateTime: server.updateTime,
        "_type": "markdown",
    } as MarkdownMeta;

    if (server.highlight) {
        // console.log(server.highlight)

        // To avoid logging inherited properties, check with hasOwnProperty :
        for (let key in server.highlight) {
            let hlHtml = ''
            if (server.highlight.hasOwnProperty(key)) {
                // @ts-ignore
                hlHtml += server.highlight[key].join(" ")
            }

            const patten = '<span style="color:red">';
            const idx = hlHtml.indexOf(patten);
            const pattenLast = '</span>';
            const idxLast = hlHtml.lastIndexOf(pattenLast);
            const step = 100 + patten.length;
            if (idx >= 0) {
                const startIdx = idx - 10 >= 0 ? idx - 10 : 0
                let endIdx = idx + step > hlHtml.length ? hlHtml.length - 1 : idx + step;
                if (idxLast > 0) {
                    endIdx = (idxLast + pattenLast.length) > hlHtml.length ? hlHtml.length - 1 : (idxLast + pattenLast.length)
                }
                const subHlHtml = hlHtml.substring(startIdx, endIdx);
                if (key === 'content') {
                    value.highlightHtml = subHlHtml;
                } else if (key === 'title') {
                    value.highlightTitle = hlHtml;
                }
            }
        }
    }
    // console.log(value)
    return value;
}

export const isDevMode = (hoatname: string) => {
    if (hoatname === 'localhost' || hoatname === '127.0.0.1') {
        return true;
    }
    return false;
}

export const staticMdTransform = (md: any) => {
    return {
        title: md.title,
        description: md.description,
        permalinkOrigin: md.permalink,
        permalink: md.permalink ? md.permalink :
            (md._id ? ("/article?id=" + md._id) : md._path),
        date: md.date ? md.date : (md.createTime ? md.createTime : new Date()),
        createTime: md.createTime ? md.createTime : new Date(),
        updateTime: md.updateTime ? md.updateTime : (md.date ? md.date : new Date()),
        id: md._id,
        articleid: md._id,
        author: md.author,
        _path: md._path,
        _id: md._id,
        editlink: "/edit/" + md._id,
        authors: md.authors ? md.authors : (md.author ? [md.author] : []),
        category: md.category,
        tag: md.tag,
        highlightHtml: md.highlightHtml,
        highlightTitle: md.highlightTitle
    }
}

export const mpConfig = (config: any): MPStruct => {
    return {
        mode: config.mode,
        contentUrl: config.baseUrl + 'content',
        metaUrl: config.baseUrl + 'meta',
        spaceUrl: config.baseUrl + 'space',
        searchUrl: config.baseUrl + 'search'
    } as MPStruct
}

export const mpFormatDate = (date: any, lang: string = 'en') => {
    if (!date) { return '' }
    return new Date(date).toLocaleDateString(lang || 'en', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
}

export const mpFormatAuthor = (doc: any) => {
    const authorsArr = [] as string[]
    let authors = doc.authors
    if (!authors && doc.author) {
        authors = [doc.author]
    }

    if (authors) {
        const len = authors.length;
        authors.forEach((item: any, idx: number) => {
            if (authorsArr.length < 5) {
                // 列表页最多显示前3个作者
                authorsArr.push(item.name)
                if (idx !== len - 1 && idx !== 2) {
                    authorsArr.push("|")
                }
            }
        })
    }
    return authorsArr.join(' ')
}

export const simpleParser = (text: string) => {
    let lines = text.split('\n');
    let count = 0;
    let result = {} as any;
    let legalKeys = ['title', 'author', 'categories', 'category', 'tags', 'tag', 'date', 'permalink', 'desc']
    let pointer = 0
    for (var i = 0; i < lines.length; i++) {
        if ('---' === lines[i].trim()) {
            count++
            pointer++
            if (count === 2) {
                break
            }
        }

        if (lines[i].includes(':')) {
            let keyValue = lines[i].split(/:(.*)/s);
            let key = keyValue[0].trim()
            let value = keyValue[1].trim()
            if ('author' === key) {
                result[key] = parseToJson(value)
            } else {
                if (legalKeys.indexOf(key) >= 0) {
                    result[key] = value
                }
            }
        }
    }

    if (!result['desc']) {
        let desc = '';
        let startLine = 0;
        for (var i = pointer; i < lines.length; i++) {
            if (startLine > 0) {
                desc += lines[i]
            }

            if (lines[i].trim().startsWith("#")) {
                if (startLine > 0) {
                    break;
                }
                startLine = i + 1
            }
        }
        result['desc'] = desc
    }

    return result
}

// input str text = 'name: aborn, link: aborn' or '{name: aborn, link: aborn}'
// out: {name: "aborn", link: "wangzichen"}
export const parseToJson = (text: string) => {
    let textVaule = (text.trim().startsWith('{') && text.trim().endsWith('}')) ?
        text.substring(text.indexOf('{') + 1, text.indexOf('}')) : text
    let obj = {} as any;
    for (let item of textVaule.split(',')) {
        if (item.includes(':')) {
            let itemArr = item.split(':')
            obj[itemArr[0].trim()] = itemArr[1].trim();
        }
    }
    return obj
}