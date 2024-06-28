import request from "@/utils/request";

export const getChannelQuestionCount = ()=>{
    return request.get('/api/home/questionCount')
}

export const getDailyIncreaseCount = (days=14)=>{
    return request.get(`/api/home/dailyIncreaseCount?days=${days}`)
}

export const getTableRowCountAPI = ()=>{
    return request.get(`/api/home/tableRowCount`)
}