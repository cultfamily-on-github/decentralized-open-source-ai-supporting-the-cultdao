import { ISubscriber, IMessage, ILearningOpportunity, EMedium } from "../helpers/data-model.ts"
import { PersistenceService } from "../helpers/persistence-service.ts"


export class MessageHandler {

    private static instance: PersistenceService

    public static getInstance(): MessageHandler { // singleton pattern
        if (MessageHandler.instance === undefined) {
            MessageHandler.instance = new MessageHandler()
        }
        return MessageHandler.instance
    }

    private persistenceService: PersistenceService
    private nlpServerURL: string
    
    private constructor() {
        // this.nlpServerURL = `http://116.203.185.185:8081`
        this.nlpServerURL = `http://localhost:8081`
        this.persistenceService = PersistenceService.getInstance()
    }
    public async handleReceivedMessage(message: any, medium: EMedium, bot?: any) {
        if (message.message.from.is_bot) {
            // let potential DOS attacks pass 
        } else {

            console.log(message.message)

            const receivedMessages: IMessage[] = await this.persistenceService.readReceivedMessages()
            const receivedMessage: IMessage = {
                chatID: message.message.chat.id,
                userName: message.message.from.username,
                date: new Date().toISOString(),
                text: message.message.text
            }

            receivedMessages.push(receivedMessage)

            await this.persistenceService.writeReceivedMessages(receivedMessages)

            const subscribers = await this.persistenceService.readSubscribers()
            if (subscribers.filter((e: ISubscriber) => e.chatID === message.message.chat.id)[0] === undefined) {
                const newSubscriber: ISubscriber = {
                    chatID: message.message.chat.id,
                    userName: message.message.from.username,
                }
                subscribers.push(newSubscriber)

                await this.persistenceService.writeSubscribers(subscribers)
            }


            let text
            if (message.message.text === "/start") {
                text = `Welcome Ser. I'm honored that you honor my service. What can I do for you?`
            } else {
                text = await this.getAnswer(message.message.text)

                if (text === "I'm not sure enough to give you a specific answer to your request. You might want to improve my training data: https://github.com/cultfamily-on-github/decentralized-open-source-ai-supporting-the-cultdao/issues/new?assignees=octocat&labels=trainingdata%2Cfaq&template=q-and-a-pair.yaml&title=A+new+example+q+%26+a+pair+is+coming+to+train+the+CULT+Beast.") {
                    const learningOpportunities: ILearningOpportunity[] = await this.persistenceService.readLearningOpportunities()
                    const newLearningOpportunity: ILearningOpportunity = {
                        input: message.message.text,
                        receivedOn: new Date().toUTCString()
                    }
                    learningOpportunities.push(newLearningOpportunity)
                    await this.persistenceService.writeLearningOpportunities(learningOpportunities)
                }
            }
            if (text === undefined || text === "") {
                text = `The node nlp server seems unavailable atm. Please submit an issue here: https://github.com/cultfamily-on-github/decentralized-open-source-ai-supporting-the-cultdao/issues/new.`
            } 
            
            if (medium === EMedium.TELEGRAM && bot !== undefined) {
                await bot.sendMessage({ chat_id: message.message.chat.id, text })
            } else if (medium === EMedium.CULTBEASTDOTORG) {
                console.log(`received message via https://cultbeast.org`)
                // do nothing because sender will see the answer on page in 2 seconds
            } else if (medium === EMedium.SLACK) {
                console.log(`received message via slack`)
                // tbd
            } else if (medium === EMedium.DISCORD) {
                console.log(`received message via discord`)
                // tbd
            } 

            const sentMessages: IMessage[] = await this.persistenceService.readSentMessages()
            const sentMessage: IMessage = {
                chatID: message.message.chat.id,
                userName: message.message.from.username,
                date: new Date().toISOString(),
                text: text
            }

            sentMessages.push(sentMessage)

            await this.persistenceService.writeSentMessages(sentMessages)



        }
    }

        
    public async getAnswer(input: string): Promise<string> {

        const requestURL = `${this.nlpServerURL}/getresponse/input/${input}`
        console.log(`asking for an answer from ${requestURL}`)
        const response = await fetch(requestURL)
        const result = await response.json()

        return result.answer

    }
}