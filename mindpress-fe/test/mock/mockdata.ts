export const MOCK_MD_CONTENT = `---
title: 'Getting Started'
date: '2024-07-18 11:36:55'
authors: [{"name":"Aborn Jiang","link":"aborn.jiang"},{"name":"John","link":"aborn.jiang"}]
permalink: '/article/8dd81e'
category: 
  - MindPress
  - Guide
tag: 
  - Guide
  - API
createTime: '2024-06-05 22:29:37'
mpid: '8dd81e'
mpstatus: 'draft'
---

<!-- Content of the page -->
# MindPress
Press your mind gracefully, which is powered by nuxt.js 3.0 and nuxt.js content 2.0. You can use it for your personal site.

## Setup

Make sure to install the dependencies:

\`\`\`bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
\`\`\`

## Development Server

Start the development server on http://localhost:3000

\`\`\`bash
npm run dev
\`\`\`

## Production

Build the application for production:

\`\`\`bash
npm run build
\`\`\`

Locally preview production build:

\`\`\`bash
npm run preview
\`\`\`

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment) for more information.
`

export const MOCK_MD_HEADER = `---
title: 'Getting Started'
date: '2024-07-18 11:36:55'
authors: [{"name":"Aborn Jiang","link":"aborn.jiang"},{"name":"John","link":"aborn.jiang"}]
permalink: '/article/8dd81e'
category: 
  - MindPress
  - Guide
tag: 
  - Guide
  - API
createTime: '2024-06-05 22:29:37'
mpid: '8dd81e'
mpstatus: 'publish'
---

<!-- Content of the page -->
`

export const MOCK_MD_CONTENT_BODY = `# MindPress
Press your mind gracefully, which is powered by nuxt.js 3.0 and nuxt.js content 2.0. You can use it for your personal site.

## Setup

Make sure to install the dependencies:

\`\`\`bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
\`\`\`

## Development Server

Start the development server on http://localhost:3000

\`\`\`bash
npm run dev
\`\`\`

## Production

Build the application for production:

\`\`\`bash
npm run build
\`\`\`

Locally preview production build:

\`\`\`bash
npm run preview
\`\`\`

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment) for more information.
`

export const MOCK_MD_HEADER2 = `---
title: 'Nuxt (Nitro) 服务端实现图片上传功能 2024-06-24'
date: '2024-07-20 18:23:57'
author: {"name":"Aborn Jiang","link":"Aborn Jiang"}
permalink: '/article/8a5a7d9908ba2004'
createTime: '2024-07-18 22:53:09'
mpstatus: 'publish'
---

<!-- Content of the page -->
`

export const MOCK_MD_CONTENT2 = `---
title: 'Nuxt (Nitro) 服务端实现图片上传功能 2024-06-24'
date: '2024-07-20 18:23:57'
author: {"name":"Aborn Jiang","link":"Aborn Jiang"}
permalink: '/article/8a5a7d9908ba2004'
createTime: '2024-07-18 22:53:09'
---

<!-- Content of the page -->
# Nitro 服务端接口
对于上传的图片，一般可以保存在\`/public\` 目录下，上传接口\`/api/upload\`。在\`/server/api/\`目录下创建 \`upload.post.ts\` 这个接口文档，代码如下：
\`\`\`js
import path from 'path'
import fs from 'fs'
import { generatePermalinkHash } from '../utils/markdownUtils'
import type { ImageItem } from '~/types';


export default defineEventHandler(async (event) => {
  console.log("----------- nitro ------------")
  console.log("nitro: req comming...(upload)")
  const files = await readMultipartFormData(event)

  const uploadedFilePaths: ImageItem[] = []
  const uploadDir = "uploads"

  const imagePath = path.join(process.cwd(), 'public', uploadDir)
  if (!fs.existsSync(imagePath)) {
    console.log(imagePath + ' doesnot exists! now create it!')
    fs.mkdirSync(imagePath, { recursive: true });
  }

  files?.forEach((file) => {
    if (!file.filename) { // 过滤参数
      return
    }

    const fileName = file.filename
    const destPath = path.join('public', uploadDir, fileName);
    const filePath = path.join(process.cwd(), destPath)

    fs.writeFileSync(filePath, file.data)
    uploadedFilePaths.push({
      alt: file.filename,
      title: file.filename,
      url: '/' + uploadDir + '/' + fileName
    })
  })

  return {
    data: uploadedFilePaths,
    success: true,
    msg: 'success'
  }
})

function buildRandomFileName(articleid: string, filename: string): string {
  const uuid = generatePermalinkHash();
  return articleid && articleid.length > 0 ?
    articleid + '-' + uuid + '-' + filename : uuid + '-' + filename;
}
\`\`\`
这里我们将图片上传到 \`/public/uploads\` 这个目录下，举例来说：如果上传了一张\`a.png\`的图片，那图片的完整访问路径是 
\`/public/uploads/a.png\`

# 客户端上传代码
客户端上传图片代码如下：
\`\`\`js
const onUploadImg = async (files: any, callback: any) => {
    const res = await Promise.all(
        files.map((file: any) => {
            return new Promise((rev, rej) => {
                const form = new FormData();
                form.append('file', file);
                axios.post('/api/upload', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => rev(res))
                    .catch((error) => rej(error));
            });
        })
    );
    console.log(res)
};
\`\`\`
这样 [mindpress](https://github.com/aborn/mindpress) 图片上传功能完成：
![image.png](/file/uploads/1398857131c049ab80ecf471d82919db.png)
`