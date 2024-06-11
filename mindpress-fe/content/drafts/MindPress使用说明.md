---
title: 'MindPress使用说明'
date: '2024-06-11 10:28:39'
permalink: '/article/8dd81d'
createTime: '2024-06-07 22:07:45'
---

<!-- Content of the page -->
# 1. MindPress
**MindPress** 是一个基于 Nuxt 和 Nuxt/Content 的 markdown 文件发布框架。它有三种模式：
1. SSG：生成静态文件
2. FCMS: File-based CMS 基于静态文件的模式，基于 Content
3. SCMS：Server-based CMS 基于后端服务器模式，这也是最复杂的一种模式


## 1.1 SSG
基于本地的 markdown 文件生成静态站点。部署最简单，可以部署在 Githhub Pages 里[MindPress](https://aborn.github.io/mindpress/) 这是个示例。

这种模式有个缺点是，静态站点无法在部署成功后编辑。编辑需要在本地处理。

## 1.2 FCMS
这也是基于本地 markdown 文件进行站点部署。它需要使用 `node` 的部署环境，无法在 Github Pages 上部署。它需要你在自己的服务器上进行部署。

这个模式相比于 **SSG**，有个优点是部署后你可以再进行编辑。编辑保存完成后会重新自动生成站点。

适用的场景：自己的个人博客站点，或者用于写作书。

## 1.3 SCMS
这种模式最复杂，也能满足最多诉求。部署它需要使用api server。这个api server 是有 DB 对内容进行存储。再加上`es`的话，可以进行全文的内容检索。




