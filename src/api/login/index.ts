import request from "@/utils/request";
import type {LoginType, LoginParam, ResponseData} from '@/api/login/type'

export const getUserInfoAPI = ()=>{
    return request.get('/api/userinfo')
}
export const userLoginAPI = (data:LoginParam)=>{
    return request.post<any,LoginType>("/api/login", data)
}

export const userRegisterAPI = (data:LoginParam)=>{
    return request.post<any,LoginType>("/api/register", data)
}