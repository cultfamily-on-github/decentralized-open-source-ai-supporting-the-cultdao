import { CultMagazineTelegramBot } from "../src/cult-bot/cult-telegram-bot.ts";

const cultMagazineTelegramBot = CultMagazineTelegramBot.getInstance()

cultMagazineTelegramBot.startCULTGameOfTheDayReminderInterval()