import request from "@/utils/request";
import type {ChannelDataType, ChannelParam, ChannelDataRespType, ChannelPageBean, ChannelDataRespTypeList} from '@/api/channel/type'

export const FindAllChannelAPI = (page:number = 1, pageSize:number =6, orderBy:string = 'default', orderMethod:string='asc')=>{
    return request.get<any, ChannelPageBean>(`/api/channel?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&orderMethod=${orderMethod}`)
}

export const UpdateChannelAPI = (data:ChannelParam)=>{
    return request.put("/api/channel", data)
}

export const AddChannelAPI = (data: ChannelParam)=>{
    return request.post("/api/channel", data)
}

export const DeleteChannelAPI = (id:number)=>{
    return request.delete(`/api/channel/${id}`)
}

export const FindChannelById = (id:number)=>{
    return request.get<any, ChannelDataRespType>(`/api/channel/${id}`)
}

export const FindChannelListByIdsAPI = (ids: number[])=>{
    return request.get<any, ChannelDataRespTypeList>(`/api/channel/findByIds?ids=${ids}`)
}