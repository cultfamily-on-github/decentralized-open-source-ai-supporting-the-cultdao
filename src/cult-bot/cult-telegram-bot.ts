import { Sender } from "../helpers/sender.ts"
import { ISubscriber, EMedium } from "../helpers/data-model.ts"
import { PersistenceService } from "../helpers/persistence-service.ts"
import { TelegramBot, UpdateType } from "https://deno.land/x/telegram_chatbot/mod.ts"
import { telegramBotToken } from '../../.env.ts'
import { MessageHandler } from "./message-handler.ts"


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
    private messageHandler: MessageHandler

    private constructor() {
        this.sender = Sender.getInstance()

        this.messageHandler = MessageHandler.getInstance()

        this.persistenceService = new PersistenceService()

        if (!telegramBotToken) throw new Error("Bot token is not provided");

        this.telegramBot = new TelegramBot(telegramBotToken);

        this.telegramBot.on(UpdateType.Message, async (message: any) => {
            if (message.message.from.is_bot) {
                // The CULT Beast talks only to one of teh many 
            } else {

                
                this.messageHandler.handleReceivedMessage(message, EMedium.TELEGRAM, this.telegramBot)
            }
        });

        this.telegramBot.run({
            polling: true,
        });

        console.log(`https://t.me/cultmagazine_bot is there for you.`)
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