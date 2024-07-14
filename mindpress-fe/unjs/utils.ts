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

export function showToast(info: any, timeout: number = 3000) {
    var x = document.getElementById("snackbar") as HTMLFormElement;
    if (!x) {
        console.warn('snackbar doesnot exists!')
        return
    }
    x.className = "show";
    x.innerText = info.title || 'toast tips message!'
    setTimeout(function () { x.className = x.className.replace("show", ""); }, timeout);
}