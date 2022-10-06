import { Sender } from "./sender.ts"
import { ISubscriber } from "./data-model.ts"
import { PersistenceService } from "./persistence-service.ts"
import { TelegramBot, UpdateType } from "https://deno.land/x/telegram_chatbot/mod.ts"
import { telegramBotToken } from '../.env.ts'
import { IMessage } from "./data-model.ts"


export class CultMagazineTelegramBot {

    private static instance: CultMagazineTelegramBot

    public static getInstance(): CultMagazineTelegramBot { // singleton pattern
        if (CultMagazineTelegramBot.instance === undefined) {
            CultMagazineTelegramBot.instance = new CultMagazineTelegramBot()
        }
        return CultMagazineTelegramBot.instance
    }

    private sender: Sender
    private persistenceService: PersistenceService
    private telegramBot: TelegramBot
    private started = false
    private nlpServerURL: string

    private constructor() {
        this.sender = Sender.getInstance()
        // this.nlpServerURL = `http://116.203.185.185:8081`
        this.nlpServerURL = `http://localhost:8081`


        this.persistenceService = new PersistenceService()

        if (!telegramBotToken) throw new Error("Bot token is not provided");

        this.telegramBot = new TelegramBot(telegramBotToken);

        this.telegramBot.on(UpdateType.Message, async (message: any) => this.handleReceivedMessage(message));

        this.telegramBot.run({
            polling: true,
        });

        console.log(`https://t.me/cultmagazine_bot is there for you.`)
    }

    public async handleReceivedMessage(message: any) {
        if (message.message.from.is_bot) {
            // let potential DOS attacks pass 
        } else {

            console.log(message.message)

            const receivedMessages: IMessage[] = await this.persistenceService.readReceivedMessages()
            const receivedMessage: IMessage = {
                chatID: message.message.chat.id,
                userName: message.message.from.username,
                firstName: message.message.from.first_name,
                lastName: message.message.from.last_name,
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
                    firstName: message.message.from.first_name,
                    lastName: message.message.from.last_name
                }
                subscribers.push(newSubscriber)

                await this.persistenceService.writeSubscribers(subscribers)
            }

            let text = await this.getAnswer(message.message.text)
            if (text === undefined || text === "") {
                text = `The node nlp server seems unavailable atm. Please submit an issue here: https://github.com/cultfamily-on-github/decentralized-open-source-ai-supporting-the-cultdao/issues/new.`
            }
            await this.telegramBot.sendMessage({ chat_id: message.message.chat.id, text })

            const sentMessages: IMessage[] = await this.persistenceService.readSentMessages()
            const sentMessage: IMessage = {
                chatID: message.message.chat.id,
                userName: message.message.from.username,
                firstName: message.message.from.first_name,
                lastName: message.message.from.last_name,
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

    public startCULTGameOfTheDayReminderInterval() {

        if (this.started) {
            throw new Error(`The Game Of the Day Reminder Interval has already been started earlier.`)
        }
        this.started = true
        setInterval(async () => {
            const dt = new Date()
            if (dt.getHours() === 2 && dt.getMinutes() === 10) {
                const subscribers: ISubscriber[] = await this.persistenceService.readSubscribers()
                for (const subscriber of subscribers) {
                    this.sender.send(telegramBotToken, subscriber.chatID, `CULT Game of the Day: https://cultplayground.org`)
                }
            }
            console.log(dt.getHours(), dt.getMinutes())
        }, 1000 * 60) // checking each minute if it's time to remind subscribers of the new Game of the Day

    }

}