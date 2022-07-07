import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import './libs/cb-static/cb.util'
// import './libs/cb-static/sprintf.min'
// import './libs/cb-static/cb.date'

// 以下順序需固定
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
// import cb_theme from './libs/cb-theme'
import './index.css'
import 'virtual:windi-utilities.css'

import 'virtual:windi-devtools'

const app = createApp(App)

// app.use(cb_theme)
app.use(router)

app.mount('#app')
