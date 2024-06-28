export interface ResponseType  {
    code: number
    msg: string
}

export interface AnswerData{
    id?:number,
    createTime?:string,
    updateTime?: string,
    answer?: string,
    questionId?: number,
    likeCount?: number,
    collectionCount?: number,
    readCount?: number,
    status?: number,
    creatorId?: number
}

export interface ResponseDataType extends ResponseType {
    data:{
        rows:AnswerData[],
        total: number
    }
}