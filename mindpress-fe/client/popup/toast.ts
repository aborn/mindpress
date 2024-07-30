import { isString } from "~/unjs/utils/utils";

export function showToast(info: any, type: string = 'success', timeout: number = 3000) {
    var x = document.getElementById("snackbar") as HTMLFormElement;
    if (!x) {
        console.warn('snackbar doesnot exists!')
        return
    }
    x.className = "show";
    x.innerText = (isString(info) ? info : info.title) || 'toast tips message!'
    const bgColor = (info.type == 'error' || type == 'error') ? '#e60012' : '#22db84'
    x.setAttribute("style", `background-color: ${bgColor}`);
    setTimeout(() => { x.className = x.className.replace("show", ""); }, timeout);
}