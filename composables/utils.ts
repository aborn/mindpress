export const mpTransform = (server: any) => {
    return {
        title: server.title,
        description: server.desc,
        authors: [
            {
                name: server.createBy,
                link: server.createBy
            }
        ],
        date: server.createTime,
        updateTime: server.updateTime,
        createTime: server.createTime,
        space: server.space,
        isPublic: server.isPublic === 1,
        permalink: "/articles/" + server.articleid,
        articleid: server.articleid,
        id: server.id,
        editlink: "/edit/" + server.articleid,
        tag: server.tags ? server.tags.split(',') : [],
        "_type": "markdown",
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

export const mpFormatDate = (date, lang) => {
    if (!date) { return '' }
    return new Date(date).toLocaleDateString(lang || 'en', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
}