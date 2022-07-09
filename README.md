# MindPress
[![cd](https://github.com/aborn/mindpress/actions/workflows/cd.yml/badge.svg)](https://github.com/aborn/mindpress/actions/workflows/cd.yml)

Press your mind(markdown) gracefully, which is powered by [nuxt.js 3.0](https://v3.nuxtjs.org) and [nuxt content 2.0](https://github.com/nuxt/content). Markdown editor use [md-editor-v3](https://github.com/imzbf/md-editor-v3). MindPress provide two mode: `server` and `static` (default). For `server mode`, the markdown file edit and update upstream from another server. An java language server implementation here [mindpress-serv](https://github.com/aborn/mindpress-serv). For `static mode`, mindpress generate static site from markdown files, here is static site [https://aborn.github.io/mindpress/](https://aborn.github.io/mindpress/).

## server mode
1. The home page `/`  

![index](assets/img/index.png)

2. Edit file `/edit/articleid`  

![edit](assets/img/edit.png)

3. Markdown file(article) detail `/article/articleid`  

![article](assets/img/article.png)

4. Create new file `/edit`

![new](assets/img/new.png)

5. Search by keyword `/search`

![search](assets/img/search.png)

6. Tag group page `/tag/your_query_tag`

![tag](assets/img/tag.png)

7. My space docs `/my`  

![my](assets/img/my.png)

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment) for more information.
