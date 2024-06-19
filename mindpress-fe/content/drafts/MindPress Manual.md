---
title: 'MindPress Manual'
date: '2024-06-11 10:32:19'
author: {"name":"aborn","link":"aborn"}
permalink: '/article/8dd818'
createTime: '2024-06-05 22:29:37'
---

<!-- Content of the page -->
# MindPress
Press your mind gracefully, which is powered by **nuxt.js 3.0** and **nuxt.js content 2.0**.

>MindPress based on Nuxt and Nuxt Content.  
>Please install it first.  
>[MindPress](https://github.com/aborn/mindpress "MindPress")

## Secondary title
Secondary content, *dealing* content。

### Third title 
Image demo：

![image description](https://img-blog.csdnimg.cn/2683990278cf4ee0803d372bb0c622a2.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6b2Q5qC8SW5zaWdodA==,size_20,color_FFFFFF,t_70,g_se,x_16)

Here a list:
1. Nuxt
2. Content

#### Fourth title
Here's java code snappit highlight.

```java
public List<String> matchScan(String pattern) {
        List<String> keys = redisTemplate.execute((RedisCallback<List<String>>) connection -> {
            List<String> keysTmp = new ArrayList<>();
            Cursor<byte[]> cursor = connection.scan(ScanOptions.scanOptions().match(pattern).count(10000).build());

            while (cursor.hasNext()) {
                keysTmp.add(new String(cursor.next()));
            }
            return keysTmp;
        });

        return keys;
    }
```

##### Fifth title 
fifth content

## Secondary Title again
Secondary

