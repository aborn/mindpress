export interface SortParams {
    /**
     * Locale specifier for sorting
     * A string with a BCP 47 language tag
     *
     * @default undefined
     */
    $locale?: string
    /**
     * Whether numeric collation should be used, such that "1" < "2" < "10".
     * Possible values are `true` and `false`;
     *
     * @default false
     */
    $numeric?: boolean
    /**
     * Whether upper case or lower case should sort first.
     * Possible values are `"upper"`, `"lower"`, or `"false"`
     *
     * @default "depends on locale"
     */
    $caseFirst?: 'upper' | 'lower' | 'false'
    /**
     * Which differences in the strings should lead to non-zero result values. Possible values are:
     *  - "base": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A.
     *  - "accent": Only strings that differ in base letters or accents and other diacritic marks compare as unequal. Examples: a ≠ b, a ≠ á, a = A.
     *  - "case": Only strings that differ in base letters or case compare as unequal. Examples: a ≠ b, a = á, a ≠ A.
     *  - "variant": Strings that differ in base letters, accents and other diacritic marks, or case compare as unequal. Other differences may also be taken into consideration. Examples: a ≠ b, a ≠ á, a ≠ A.
     *
     * @default "variant"
     */
    $sensitivity?: 'base' | 'accent' | 'case' | 'variant'
}

export interface SortFields {
    [field: string]: -1 | 1
}

export type SortOptions = SortParams | SortFields

export interface QueryParamsFields {
    sort: SortOptions
    _id: string
    pageNo: number | undefined
    pageSize: number | undefined
    url: string | undefined
    q: string | undefined
}

export type QueryParams = QueryParamsFields;

export interface SearchParamsFields {
    q: string | undefined
    autoSuggest: boolean
    pageNo: number | undefined
    pageSize: number | undefined
    url: string | undefined
    sort: SortOptions
}

export type SearchParams = SearchParamsFields
