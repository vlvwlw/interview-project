import request from "@/utils/request";
import type {ResponseResult, QuestionType, FindByIdResponseDataType, FindAllResponseDataType} from '@/api/question/type'

export const AddQuestionAPI = (question: QuestionType)=>{
    return request.post<any, ResponseResult>("/api/question", question)
}

export const DeleteQuestionAPI = (id: number)=>{
    return request.delete<any, ResponseResult>(`/api/question/${id}`)
}

export const UpdateQuestionAPI = (question: QuestionType)=>{
    return request.put<any, ResponseResult>("/api/question", question)
}

export const FindQuestionById = (id: number)=>{
    return request.get<any, FindByIdResponseDataType>(`/api/question/${id}`)
}

export type FindAllQuestionAPIParamType = {
    page?:number, 
    pageSize?: number, 
    keyWord?: string, 
    channelId?: number, 
    begin?:string, 
    end?:string,
    orderBy?:string ,
    orderMethod?: string
}

export const FindAllQuestionAPI = (
        {
            page = 1, 
            pageSize = 10, 
            keyWord = '', 
            channelId = 0, 
            begin = '2000-01-01', 
            end = '2100-01-01',
            orderBy = 'updateTime',
            orderMethod = 'desc'
        }: FindAllQuestionAPIParamType
    )=>{
    return request.get<any, FindAllResponseDataType>(`/api/question?page=${page}&pageSize=${pageSize}&keyWord=${keyWord}&channelId=${channelId}&begin=${begin}&end=${end}&orderBy=${orderBy}&orderMethod=${orderMethod}`)
}

export const RestoreDeletedAPI = ()=>{
    return request.get<any, ResponseResult>(`/api/question/restore`)
}