import request from "@/utils/request";
import type { AnswerData, ResponseDataType } from './type'


export const AddAnswerAPI = (answerData: AnswerData)=>{
    return request.post('/api/answer', answerData)
}

export const FindAllAnswerAPI = (quesId: number, orderBy= 'updateTime', orderMethod='desc')=>{
    return request.get<any, ResponseDataType>(`/api/answer?id=${quesId}&orderBy=${orderBy}&orderMethod=${orderMethod}`)
}