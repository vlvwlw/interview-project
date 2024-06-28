export type ResponseData = {
    code: number
    msg: string
}


export type ChannelDataType =  {
    id?: number,
    createTime?:string,
    updateTime?:string,
    name:string
} 

export type ChannelDataRespType = ResponseData & {
    data: ChannelDataType
}
export type ChannelDataRespTypeList = ResponseData & {
    data: ChannelDataType[]
}
export type ChannelParam = {
    name:string
    id?:number
}

export type ChannelPageBean = ResponseData & { 
    data:{
        total:number,
        rows:ChannelDataType[]
    }
}