export interface ISubscriber{
    chatID: number
    userName: string, 
}
export interface IMessage{
    chatID: number,
    userName: string, 
    date: number,
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
