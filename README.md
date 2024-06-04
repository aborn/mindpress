# MindPress
[![cd](https://github.com/aborn/mindpress/actions/workflows/cd.yml/badge.svg)](https://github.com/aborn/mindpress/actions/workflows/cd.yml)

Press your mind(markdown) gracefully, which is powered by [nuxt.js 3.0](https://v3.nuxtjs.org) and [nuxt content 2.0](https://github.com/nuxt/content). Markdown editor use [md-editor-v3](https://github.com/imzbf/md-editor-v3). Mindpress provides two site mode: `server` (SSR) and `static` (default, SSG). For `server mode`, you can edit/save markdown file upstream from another api server. Here is an java language server api implementation [mindpress-serv](https://github.com/aborn/mindpress/mindpress-serv). For `static mode`, mindpress use nuxt static site generation (SSG) prerenders every route of your markdown files at build time. Here is static site example [https://aborn.github.io/mindpress/](https://aborn.github.io/mindpress/), which is hosted by github pages.

## Server mode
1. The home page `/`  

![index](docs/img/index.png)

2. Edit file `/edit/articleid`  

![edit](docs/img/edit.png)

3. Markdown file(article) detail `/article/articleid`  

![article](docs/img/article.png)

4. Create new file `/edit`

![new](docs/img/new.png)

5. Search by keyword `/search`

![search](docs/img/search.png)

6. Tag group page `/tag/your_query_tag`

![tag](docs/img/tag.png)

7. My space docs `/my`  

![my](docs/img/my.png)

## Setup

Make sure to install the dependencies: (Node 18+)

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:6001

```bash
yarn dev
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
