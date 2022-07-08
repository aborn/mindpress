const t={static:"static",server:"server"},e=`---
title: 'Demo Page'
author: {name: aborn, link: aborn}
description: 'A markdown demo page.'
---

<!-- Content of the page -->
# Primary title
This is a **demo** markdown file, quote example:

>MindPress based on Nuxt and Nuxt Content.  
>Please install it first.  
>[MindPress](https://github.com/aborn/mindpress "MindPress")

## Secondary title
Secondary content, *dealing* content\uFF0C~~strikethrough~~\u3002

### Third title 
Image demo\uFF1A

![image description](https://img-blog.csdnimg.cn/2683990278cf4ee0803d372bb0c622a2.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6b2Q5qC8SW5zaWdodA==,size_20,color_FFFFFF,t_70,g_se,x_16)

Here a list:
1. Nuxt
2. Content

#### Fourth title
Here's java code snappit highlight.
\`\`\`js
    const content = ref(DEMO_TEXT_MARKDOWN)
    const { data: doc } = await useAsyncData('serv', async () => {
      try {
        return await $fetch('/api/parse', {
          method: 'POST',
          cors: true,
          body: {
            id: 'content:_servercontent.md',
            content: content.value
          }
        })
      } catch (e) {
        return doc.value
      }
    })
\`\`\`

##### Fifth title 
fifth content

## Secondary Title again
Secondary

    `;export{e as D,t as M};
