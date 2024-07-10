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