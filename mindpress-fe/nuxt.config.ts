// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        baseURL: process.env.MINDPRESS_MODE === 'ghpages' ? '/mindpress/' : '/',   // default '/'  (change to your need.)
        head: {
            title: 'MindPress, Press your mind gracefully.',
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://unpkg.com/@picocss/pico@latest/css/pico.min.css'
                }
            ]
        }
    },
    routeRules: {
        '/api/v1/**': { proxy: process.env.BUILD_MODE === 'docker' ? 'http://mindpress-serv:3012/api/v1/**' : 'http://localhost:3012/api/v1/**' },
        '/_nuxt/**': { cors: true },
    },
    css: [
        '@/assets/css/app.css',
    ],
    modules: [
        '@nuxt/content',
        '@nuxtjs/color-mode'
    ],
    content: {
        highlight: {
            theme: "one-dark-pro",
            preload: ['bash', 'c', 'csharp', 'c#', 'css', 'docker', 'go', 'groovy', 'html', 'java', 'javascript', 'js', 'jsx',
                'json', 'julia', 'kotlin', 'markdown', 'lua', 'less', 'md', 'nginx', 'objc', 'python', 'py', 'ruby', 'rb', 'rust',
                'rs', 'swift', 'sql', 'typescript', 'ts', 'tsx', 'vue', 'xml', 'yaml']
        }
    },
    runtimeConfig: {
        public: {
            minpress: {
                mode: (process.env.MINDPRESS_MODE === 'ghpages' || process.env.MINDPRESS_MODE === 'static') ? 'static' : 'server',   // 'static' (default) or 'server'
                baseUrl: '/api/v1/mindpress/'
            }
        }
    }
})