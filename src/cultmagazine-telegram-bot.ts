import { Sender } from "./sender.ts"
import { ISubscriber } from "./data-model.ts"
import { PersistenceService } from "./persistence-service.ts"
import { TelegramBot, UpdateType } from "https://deno.land/x/telegram_chatbot/mod.ts"
import { telegramBotToken } from '../.env.ts'


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
        this.nlpServerURL = `http://116.203.185.185:8081`
        // this.nlpServerURL = `http://localhost:8081`


        this.persistenceService = new PersistenceService()
        
        if (!telegramBotToken) throw new Error("Bot token is not provided");
        
        this.telegramBot = new TelegramBot(telegramBotToken);

        this.telegramBot.on(UpdateType.Message, async (message: any) => {

            console.log(message.message)
            let text = await this.getAnswer(message.message.text)
            if (text === undefined || text === "") {
                text = `The node nlp server seems unavailable atm. Please submit an issue here: https://github.com/cultfamily-on-github/decentralized-open-source-ai-supporting-the-cultdao/issues/new.`
            }
            await this.telegramBot.sendMessage({ chat_id: message.message.chat.id, text })

        });

        this.telegramBot.run({
            polling: true,
        });

        console.log(`https://t.me/cultmagazine_bot is there for you.`)
    }

    public async getAnswer(input: string): Promise<string> {

        const requestURL = `${this.nlpServerURL}/getresponse/input/${input}`
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
            const subscribers: ISubscriber[] = await this.persistenceService.readSubscribers()
            for (const subscriber of subscribers) {
                this.sender.send(telegramBotToken, subscriber.chatID, `CULT Game of the Day: https://cultplayground.org`)
            }
        }, 1000 * 60 * 60)

    }

}