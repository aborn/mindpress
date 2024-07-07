import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { buildHeaderArray } from '../server/utils/markdownUtils'


describe('markdownUtils test', () => {
    it('test buildHeaderArray', () => {
        const input = ['demo', 'test']
        const result = "\n  - demo\n  - test\n"
        expect(buildHeaderArray(input)).toBe(result)
    })
})