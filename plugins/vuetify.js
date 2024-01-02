// plugins/vuetify.js
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const customTheme = {
    dark: false,
    colors: {
        background: '#eae7dc',
        surface: '#FFFFFF',
        primary: '#e85a45',
        'primary-darken-1': '#9a3927',
        secondary: '#e98074',
        'secondary-darken-1': '#9f554e',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    },
}

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        ssr: true,
        components,
        directives,
        theme: {
            defaultTheme: 'customTheme',
            themes: {customTheme}
        }
    })

    nuxtApp.vueApp.use(vuetify)
})