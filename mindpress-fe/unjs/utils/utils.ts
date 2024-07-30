export function permalinkAdapt(link: string) {
    const prefix = "/article/"
    if (link.startsWith(prefix)) {
        return "/md/" + link.substring(prefix.length)
    }

    return link;
}

export function isBlank(txt: string) {
    if (!txt) { return true }
    return txt.trim().length === 0
}

export function forceToArray(item: any) {
    if (!item) {
        return []
    } else {
        return Array.isArray(item) ? item : [item]
    }
}
export function isString(str: any): boolean {
    return typeof str === 'string' || str instanceof String
}

export function isValidFilename(filename: string) {
    // https://stackoverflow.com/a/122431
    // https://support.microsoft.com/en-us/office/restrictions-and-limitations-in-onedrive-and-sharepoint-64883a5d-228e-48f5-b3d2-eb39e07630fa#invalidcharacters
    const invalidFilenameCharactersRegexp = /[/?<>\\:*|"^\u0000-\u001F]/g
    const invalidFilenameReservedWordsRegexp =
        /^(\.|\.\.|con|prn|aux|nul|com\d|lpt\d)$/i
    const invalidFilenamePatternsRegexp = /[ .]$/
    return (
        filename &&
        filename.length < 255 &&
        invalidFilenameReservedWordsRegexp.test(filename) === false &&
        invalidFilenameCharactersRegexp.test(filename) === false &&
        invalidFilenamePatternsRegexp.test(filename) === false
    )
}

export function isLocalHost(hostname: string) {
    return (
        (['localhost', '127.0.0.1', '', '::1', '[::1]'].includes(hostname))
        || (hostname.startsWith('192.168.'))
        || (hostname.startsWith('10.'))
        || (hostname.endsWith('.local'))
    )
}