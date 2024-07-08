import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { buildHeaderArray, permalinkAdapt } from '../server/utils/markdownUtils'

describe('markdownUtils test', () => {
    it('test buildHeaderArray', () => {
        const input = ['demo', 'test']
        const result = "\n  - demo\n  - test\n"
        expect(buildHeaderArray(input)).toBe(result)
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