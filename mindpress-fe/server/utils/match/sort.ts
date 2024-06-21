import type { SortOptions } from '../../../types'

export const get = (obj: any, path: string): any => path.split('.').reduce((acc, part) => acc && acc[part], obj)

/**
 * Sort list of items by givin options
 * source code from @nuxt/content
 */
export const sortList = (data: any[], params: SortOptions) => {
  const comperable = new Intl.Collator(params.$locale as string, {
    numeric: params.$numeric as boolean,
    caseFirst: params.$caseFirst as any,
    sensitivity: params.$sensitivity as any
  })
  const keys = Object.keys(params).filter(key => !key.startsWith('$'))
  for (const key of keys) {
    data = data.sort((a, b) => {
      const values = [get(a, key), get(b, key)]
        .map((value) => {
          // `null` values are treated as `"null"` strings and ordered alphabetically
          // Turn `null` values into `undefined` so they place at the end of the list
          if (value === null) {
            return undefined
          }
          // Convert Date object to ISO string
          if (value instanceof Date) {
            return value.toISOString()
          }
          return value
        })
      if (params[key as keyof SortOptions] === -1) {
        values.reverse()
      }
      return comperable.compare(values[0], values[1])
    })
  }

  return data
}