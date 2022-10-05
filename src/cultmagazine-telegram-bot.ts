import { Sender } from "./bot-ui-for-manual-updates/sender"
import { telegramBotToken } from './src/telegram-bot-ui/.env.ts'
import { ISubscriber } from "./data-model"
import { PersistenceService } from "./persistence/persistence-service-ts"
import { TelegramBot, UpdateType } from "https://deno.land/x/telegram_chatbot/mod.ts"


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
    
    private constructor() {
        this.sender = Sender.getInstance()
        this.persistenceService = new PersistenceService()
        this.startCULTGameOfTheDayReminderInterval()
        
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

    private startCULTGameOfTheDayReminderInterval() {
        setInterval(async () => {
            const subscribers: ISubscriber[] = await this.persistenceService.readSubscribers()
            for (const subscriber of subscribers) {
                this.sender.send(telegramBotToken, subscriber.chatID, "hello world")
            }
        }, 1000 * 60 * 60)
    }
}