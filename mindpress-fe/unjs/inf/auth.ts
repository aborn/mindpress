import { AUTH_TOKEN, AUTH_VALIDATE_SUCCESS_TIME } from "../editor/staticValue";
import { dateFormat } from '~/unjs/utils/date'

export async function validateToken(failedCallBack: Function) {
    const res = await $fetch('/api/inf/checkToken', {
        key: "t" + new Date(),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem(AUTH_TOKEN) || ''
        },
    }) as any;

    console.log(res)
    if (!res.status) {
        localStorage.removeItem(AUTH_TOKEN)
        localStorage.removeItem(AUTH_VALIDATE_SUCCESS_TIME)
        failedCallBack()
    } else {
        localStorage.setItem(AUTH_VALIDATE_SUCCESS_TIME, dateFormat(new Date()))
        console.log('validate token success.')
    }
}