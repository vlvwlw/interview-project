import type {UserInfoType} from '@/api/userinfo/type'
import type {ChannelDataType} from '@/api/channel/type'

export type ResponseResult = {  // 响应数据类型
    code: number,
    msg: string
}

export type FindByIdResponseDataType = ResponseResult & {
    data:QuestionType
}

export type FindAllResponseDataType = ResponseResult & {
    data: {
        total: number,
        rows:QuestionType[]
    }
}

export type QuestionType = {  // 问题表 类型
    createTime?: string,
    updateTime?: string,
    id?: number,
    title?: string,
    likeCount?: number,
    readCount?: number,
    collectionCount?: number,
    channelId?: number,
    creatorId?: number,
    content?: string,
    status?: number,
    tags?: string,
    channel?: ChannelDataType,
    userinfo?: UserInfoType
}