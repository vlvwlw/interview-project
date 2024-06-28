export type ResponseData = {
    code: number
    msg: string
}
export type LoginType = ResponseData & {
    data: {
        id:number,
        name: string,
        username:string,
        customerType:number,
        token: string
    }
}
export type LoginParam = {
    username: string
    password: string
}