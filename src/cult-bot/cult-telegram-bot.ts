import { EMedium } from "../helpers/data-model.ts"
import { TelegramBot, UpdateType } from "https://deno.land/x/telegram_chatbot/mod.ts"
import { telegramBotToken } from '../../.env.ts'
import { MessageHandler } from "./message-handler.ts"
import { ReminderService } from "./reminder-service.ts";
import { Sender } from "../helpers/sender.ts"


export class CultMagazineTelegramBot {

    private static instance: CultMagazineTelegramBot

    public static getInstance(): CultMagazineTelegramBot { // singleton pattern
        if (CultMagazineTelegramBot.instance === undefined) {
            CultMagazineTelegramBot.instance = new CultMagazineTelegramBot()
        }
        return CultMagazineTelegramBot.instance
    }

    private reminderService: ReminderService
    private telegramBot: TelegramBot
    private messageHandler: MessageHandler
    private sender: Sender

    private constructor() {

        if (!telegramBotToken) throw new Error("Bot token is not provided");

        this.messageHandler = MessageHandler.getInstance()
        this.reminderService = ReminderService.getInstance(telegramBotToken)
        this.sender = Sender.getInstance()


        this.telegramBot = new TelegramBot(telegramBotToken);

        this.telegramBot.on(UpdateType.Message, async (message: any) => {
            if (message.message.from.is_bot) {
                // The CULT Beast talks only to one of teh many 
            } else {

                if (this.reminderService.isEthereumWalletAddress(message.message.text.toLowerCase())) {

                    this.reminderService.registerWalletOfInterest(message)
                    const notificationsActiveInfo =
                        `I will regularly check if this wallet address is a CULTMander in the current voting cycle and send a reminder to the telegram user who sent this wallet address as a reminder to vote.`
                    console.log(`sending to ${message.message.chat.id}: ${notificationsActiveInfo}`)
                    // await this.telegramBot.sendMessage({ chat_id: message.message.chat.id, notificationsActiveInfo })
                    await this.sender.send(telegramBotToken, message.message.chat.id, notificationsActiveInfo)

                } else {
                    this.messageHandler.handleReceivedMessage(message, EMedium.TELEGRAM, this.telegramBot)
                }
            }
        });

        this.telegramBot.run({
            polling: true,
        });

        this.reminderService.startReminderCheckInterval()

        console.log(`https://t.me/cultmagazine_bot is there for you.`)
    }

}