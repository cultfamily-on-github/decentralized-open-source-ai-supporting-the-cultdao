export interface ISubscriber{
    chatID: number
    userName: string, 
    wois?: string[]
}
export interface IMessage{
    chatID: number,
    userName: string, 
    date: string,
    text: string
}

export interface ILearningOpportunity {
    input: string,
    receivedOn: string
}

export enum EMedium {
    TELEGRAM = "TELEGRAM",
    CULTBEASTDOTORG = "CULTBEASTDOTORG",
    DISCORD = "DISCORD",
    SLACK = "SLACK"
}
