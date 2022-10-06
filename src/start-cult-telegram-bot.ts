import { CultMagazineTelegramBot } from "../src/cult-telegram-bot/cultmagazine-telegram-bot.ts";

const cultMagazineTelegramBot = CultMagazineTelegramBot.getInstance()

cultMagazineTelegramBot.startCULTGameOfTheDayReminderInterval()