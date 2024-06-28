import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
import './tailwind.css'
// 引入全局样式
import '@/styles/index.scss'

import ArcoVueIcon from '@arco-design/web-vue/es/icon';

import '@arco-design/web-vue/es/style/index.css';

// 引入Message组件样式
import '@arco-design/web-vue/es/message/style/index.css'
import '@arco-design/web-vue/dist/arco.less'

// 引入自定义指令
import { reachBottom } from './utils/reachBottom'

const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(ArcoVueIcon)
app.use(reachBottom)

app.mount('#app')