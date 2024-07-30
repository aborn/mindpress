import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    console.log("----------- nitro ------------")
    console.log("nitro: req comming...(checkToken)")
    const req = event.node.req
    const query = getQuery(event)
    const token = req.headers['token'] as string
    console.log('token=' + token)

    const validateResult = await validateToken(token)
    console.log(validateResult)
    return {
        status: validateResult,
        api: 'checkToken works',
        msg: validateResult ? 'validate success' : 'validate token is error，please retry!',
        code: validateResult ? 200 : 501,
        fcm: true,
        mode: 'fcm',
    }
})
