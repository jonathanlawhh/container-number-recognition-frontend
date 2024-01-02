// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'

export default defineNuxtConfig({
    devtools: {enabled: true},
    app: {
        head: {
            meta: [
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            ],
            htmlAttrs: {
                lang: 'en'
            },
        },
    },
    css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css', '@/assets/override.scss'],
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },
    runtimeConfig: {
        public: {
            ctnrApiUrl: process.env.NUXT_CTNR_API_URL
        }
    }
})
