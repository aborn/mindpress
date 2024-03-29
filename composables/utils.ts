
import { MarkdownMetaS, MarkdownMeta } from './types';

export const mpTransform = (server: MarkdownMetaS): MarkdownMeta => {
    return {
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
        title: server.title,
        updateTime: server.updateTime,
        "_type": "markdown",
    }
}

export const staticMdTransform = (md: any) => {
    return {
        title: md.title,
        description: md.description,
        permalink: md.permalink ? md.permalink : md._path,
        date: md.date ? md.date : new Date(),
        createTime: md.date ? md.date : new Date(),
        id: md._id,
        articleid: md._id
    }
}

export const mpConfig = (config: any) => {
    return {
        mode: config.mode,
        contentUrl: config.baseUrl + 'content',
        metaUrl: config.baseUrl + 'meta',
        spaceUrl: config.baseUrl + 'space',
        searchUrl: config.baseUrl + 'search'
    }
}

export const mpFormatDate = (date: any, lang: string) => {
    if (!date) { return '' }
    return new Date(date).toLocaleDateString(lang || 'en', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
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