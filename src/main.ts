import {createApp} from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import i18n from '@/locales'
import {useThemeStore} from '@/stores/theme'

import {registerGlobalComponents} from '@/plugins/globalComponents'
import {registerGlobalProperties} from '@/plugins/globalProperties'

const app = createApp(App)
const pinia = createPinia()

registerGlobalComponents(app)
registerGlobalProperties(app)

app.use(pinia)
app.use(i18n)
app.use(Antd)
app.use(router)

// 初始化主题(应用 CSS 变量到 document)
useThemeStore()

app.mount('#app')
