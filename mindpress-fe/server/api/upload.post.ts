import path from 'path'
import fs from 'fs'
import { generatePermalinkHash, IMAGE_UPLOAD_PATH, MINDPRESS_ROOT_PATH, makeSureImagePathExists, buildImageUrl } from '../utils/markdownUtils'
import type { ImageItem } from '~/types';

export default defineEventHandler(async (event) => {
  console.log("----------- nitro ------------")
  console.log("nitro: req comming...(upload)")
  const files = await readMultipartFormData(event)

  const articleidArr = files?.filter(item =>
    item.name == 'articleid'
  )
  const articleid = articleidArr && articleidArr.length > 0 ? articleidArr[0].data : '';
  console.log("...articleid=" + articleid + ", file.lengh" + files?.length)

  const uploadedFilePaths: ImageItem[] = []
  makeSureImagePathExists()

  files?.forEach((file) => {
    if (!file.filename) { // keep file exists!
      return
    }

    const rdmFileName = buildRandomFileName(articleid as string, file.filename);
    const destPath = path.join(MINDPRESS_ROOT_PATH, IMAGE_UPLOAD_PATH, rdmFileName);
    const filePath = path.join(process.cwd(), destPath)

    console.log(filePath)
    try {
      const res = fs.writeFileSync(filePath, file.data, 'utf8')
      if (!fs.existsSync(filePath)) {
        console.log('write error:' + filePath)
      } else {
        console.log('write file success:' + filePath)
      }

      uploadedFilePaths.push({
        alt: file.filename,
        title: file.filename,
        url: buildImageUrl(IMAGE_UPLOAD_PATH, rdmFileName)
      })
    } catch (err) {
      console.log(err)
    }
  })

  console.log(uploadedFilePaths)
  return {
    data: uploadedFilePaths,
    success: true,
    msg: 'success'
  }
})

function buildRandomFileName(articleid: string, filename: string): string {
  const uuid = generatePermalinkHash();
  const pureId = (articleid && articleid.length > 0) ? (articleid + '-').replace(/[:\.]+/g, '') : ''
  return pureId + uuid + '-' + filename;
}