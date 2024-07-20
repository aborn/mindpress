
import { defineEventHandler } from 'h3'
import { createStorage, type WatchEvent, prefixStorage } from 'unstorage'
import { parseFrontMatter } from 'remark-mdc'
import { MOCK_MD_CONTENT, MOCK_MD_HEADER } from '~/test/mock/mockdata'
import { updateHeaderKeyValue } from '~/unjs/utils/markdown'

export default defineEventHandler(async (event) => {
    console.log("----------- nitro ------------")
    console.log("nitro: req comming...(test)")
    const req = event.node.req
    const query = getQuery(event)
    let data: any = '';
    console.log(req.url)


    /**
    const result = await queryFileContent({ file: 'test/Nuxt (Nitro) 服务端实现图片上传功能 2024-06-24.md', 
        articleid: '8a5a7d9908ba2004' })
 */

    console.error('-----------mockkkkkkkkkkkkk')
    const { content, data: frontmatter } = parseFrontMatter(MOCK_MD_CONTENT)
    const mdheader = frontmatter;
    console.warn(mdheader)
    const header = updateHeaderKeyValue(frontmatter, 'mpstatus', 'publish');
    console.log(header)

    //if (query.id) {
    //    const cacheParsedStorageLocal = prefixStorage(useStorage(), 'cache:content:parsed')
    //    const body = await cacheParsedStorageLocal.getItem(query.id as string);
    //    data = body;
    //}

    // const sourceStorage: Storage = prefixStorage(useStorage(), 'content:source')
    // const sourceV = await sourceStorage.getItem('content:中国文化展.md')
    //const body = await sourceStorage.getItem(query.id);
    //console.log(body)

    return {
        md: data,
        api: 'mindpress works',
        mdheader,
        header,
        MOCK_MD_HEADER
    }
})

