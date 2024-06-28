import request from "@/utils/request";
import type {UserInfoType} from './type'

export const UpdateUserInfoAPI = (userinfo: UserInfoType)=>{
    return request.put('/api/userinfo',userinfo)
}