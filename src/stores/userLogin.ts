import { defineStore } from "pinia";
import { userLoginAPI, userRegisterAPI } from '@/api/login'
import type {LoginType, LoginParam, ResponseData} from '@/api/login/type'
import { ref } from "vue";


export const useUserLoginStore = defineStore('userLogin',()=>{
    let token = ref(localStorage.getItem("token"))
    let userinfo = ref(JSON.parse(localStorage.getItem("userinfo") as string))
    // 用户登录
    const userLogin = async (data: LoginParam)=>{
        let res = await userLoginAPI(data)
        if(res.code != 0){
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("userinfo", JSON.stringify(res.data))
            console.log(res)
            return 'ok'
        }else{
            return Promise.reject(new Error(res.msg))
        }
    }

    // 退出登录


    return {
        token,
        userLogin,
        userinfo
    }
})