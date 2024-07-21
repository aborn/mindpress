import { describe, it, expect } from 'vitest'
import { generateAutoSaveTitle } from '../server/utils/markdownUtils'
import { permalinkAdapt, isValidFilename } from '../unjs/utils/utils'
import { dateFormat } from '../unjs/utils/date'
import { buildHeaderArray, updateHeaderKeyValue } from '~/unjs/utils/markdown'
import { parseFrontMatter } from 'remark-mdc'
import { MOCK_MD_CONTENT, MOCK_MD_HEADER } from './mock/mockdata'

describe('markdownUtils test', () => {
    it('test buildHeaderArray', () => {
        const input = ['demo', 'test']
        const result = "\n  - demo\n  - test"
        expect(buildHeaderArray(input)).toBe(result)
    }),
        it('test generateAutoSaveTitle', () => {
            const date = new Date();
            const res = ('Auto Save ' + dateFormat(date, false)).replace(/:/g, '');;
            expect(generateAutoSaveTitle(date)).toBe(res);

        }),
        it('test validate file name', () => {
            expect(isValidFilename('Auto Save 2024-07-17 231325.md')).toBe(true)
        })
})

describe('utils test', () => {
    it('test permalinkAdapt', () => {
        const input = '/article/885bd628b6c2c57e'
        const result = "/md/885bd628b6c2c57e"
        expect(permalinkAdapt(input)).toBe(result)
        const input2 = '/md/885bd628b6c2c57e'
        const result2 = "/md/885bd628b6c2c57e"
        expect(permalinkAdapt(input2)).toBe(result2)
    })
})

describe('markdown test', () => {
    it('test updateHeaderKeyValue', async () => {
        const { content, data: frontmatter } = await parseFrontMatter(MOCK_MD_CONTENT)
        console.log(frontmatter)
        const header = updateHeaderKeyValue(frontmatter, 'mpstatus', 'publish');
        console.log(header)
        expect(header).toBe(MOCK_MD_HEADER)
    })
})