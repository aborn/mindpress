import fs from "fs";
import path from 'path'
import { MINDPRESS_ROOT_PATH, IMAGE_UPLOAD_PATH, makeSureImagePathExists } from '~/server/utils/markdownUtils'
import { getMindPressRootPath } from '~/unjs/inf/env'

export default defineEventHandler(async (event) => {
    console.log("----------- nitro ------------")
    console.log("nitro: req comming...(file)")
    const req = event.node.req
    const query = getQuery(event)

    // console.log(query)
    // console.log(req.url)
    const dir = event.context.params?.path
    const fileName = event.context.params?.name ? decodeURI(event.context.params?.name) : undefined

    console.log('dir=' + dir + ', fileName=' + fileName)
    makeSureImagePathExists()

    if (!fileName || dir !== IMAGE_UPLOAD_PATH) {
        return {
            msg: 'unsupported files!'
        }
    }
    const ROOT_PATH = getMindPressRootPath()
    const filePath = path.join(ROOT_PATH, IMAGE_UPLOAD_PATH, fileName);
    return sendStream(event, fs.createReadStream(filePath));
});