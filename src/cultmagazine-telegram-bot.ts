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
    
    private constructor() {
        // this.sender = Sender.getInstance()
        this.persistenceService = new PersistenceService()
        
        if (!telegramBotToken) throw new Error("Bot token is not provided");
        
        this.telegramBot = new TelegramBot(telegramBotToken);

        this.telegramBot.on(UpdateType.Message, async (message: any) => {

            const text = message.message.text || "I can't hear you";

            await this.telegramBot.sendMessage({ chat_id: message.message.chat.id, text: `echo ${text}` })

        });

        this.telegramBot.run({
            polling: true,
        });

    }

    public startCULTGameOfTheDayReminderInterval() {
        if (this.started) {
            throw new Error(`The Game Of the Day Reminder Interval has already been started earlier.`)
        }
        this.started = true
        setInterval(async () => {
            const subscribers: ISubscriber[] = await this.persistenceService.readSubscribers()
            for (const subscriber of subscribers) {
                this.sender.send(telegramBotToken, subscriber.chatID, "hello world")
            }
        }, 1000 * 60 * 60)
    }
}