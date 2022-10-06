export interface ISubscriber{
    chatID: number
    userName: string, 
    firstName: string,
    lastName: string
}
export interface IMessage{
    chatID: number,
    userName: string, 
    firstName: string,
    lastName: string,
    date: number,
    text: string
}
