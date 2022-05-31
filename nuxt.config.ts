import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
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
    modules: [
        '@nuxt/content',
        '@nuxtjs/color-mode'
    ],
    content: {
        highlight: {
            theme: "one-dark-pro",
            preload: ['java', 'javascript', 'typescript', 'vue', 'bash', 'json', 'objc', 'ts', 'js', 'css', 'go', 'html']
        }
    },
    runtimeConfig: {
        public: {
            minpress: {
                mode: 'server',   // 'static'
                baseUrl: 'http://localhost:3012/api/content/'
            }
        }
    }
})
