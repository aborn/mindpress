import type { SortOptions } from '~/types'

export const get = (obj: any, path: string): any => path.split('.').reduce((acc, part) => acc && acc[part], obj)

/**
 * Sort list of items by givin options
 * sort array of object by multi fields.
 * example:
 * const sortedArray = sortList(toBeSortedArray, { 'createTime': -1, 'title': 1 })
 */
export const sortList = (data: any[], params: SortOptions) => {
  const comperable = new Intl.Collator(params.$locale as string, {
    numeric: params.$numeric as boolean,
    caseFirst: params.$caseFirst as any,
    sensitivity: params.$sensitivity as any
  })
  const keys = Object.keys(params).filter(key => !key.startsWith('$'))
  data = data.sort((a, b) => {
    var res = 0;
    for (var i = 0; i < keys.length; i++) {
      const key = keys[i];
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
      res = comperable.compare(values[0], values[1])
      if (res != 0) return res;
    }
    return res;
  })
  return data
}