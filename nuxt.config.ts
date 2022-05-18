import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://unpkg.com/@picocss/pico@latest/css/pico.min.css'
                }
            ]
        }
    },
    modules: [
        '@nuxt/content'
    ],
    content: {
        // Options
    }
})
