import axios from 'axios'
import { Message } from '@arco-design/web-vue'
import router from '@/router'

const request = axios.create({
    timeout: 3000
})

// 请求拦截器
request.interceptors.request.use(config => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.token = token
    }
    return config
})

// 响应拦截器
let isLoginMessageShow = true

request.interceptors.response.use((response) => {
    const userinfo = JSON.parse(localStorage.getItem("userinfo") as string)
    if (response.data.code == 0) {
        Message.error(response.data.msg)
    }
    if (response.data.code == 2) {
        Message.success(response.data.msg)
    }
    if (response.data.msg == '登录失效，请重新登录' || !userinfo) {
        console.log('================>', router.currentRoute.value.path)
        Message.error("登录失效，请重新登录")
        router.push(`/login?route=${router.currentRoute.value.path}`)
    }
    return response.data
}, (error) => {
    console.log(error.response)
    Message.error("请求失败")
    return Promise.reject(error)
})


export default request