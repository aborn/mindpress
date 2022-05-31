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
        permalink: "/articles/" + server.articleid,
        tag: server.tags ? server.tags.split(',') : [],
        "_type": "markdown",
    }
}