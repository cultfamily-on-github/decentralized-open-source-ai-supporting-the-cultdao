import { Request } from 'https://deno.land/x/request@1.1.0/request.ts'
import * as log from "https://deno.land/std/log/mod.ts";

export class Sender {

    private static instance: Sender

    public static getInstance(): Sender { // singleton pattern
        if (Sender.instance === undefined) {
            Sender.instance = new Sender()
        }
        return Sender.instance
    }

    private counter = 0

    private constructor() { // private to ensure singleton pattern

    }

    public async send(token: string, chatId: number, text: string) {
        this.counter += 1
        log.info(`sending message to chatId ${chatId}: ${text}`)
        await Request.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`)
    }

    public startResetSecurityCounterInterval() {
        setInterval(() => {
            log.info(`resetting counter from ${this.counter} to 0`)
            this.counter = 0
        }, 1000 * 60 * 60)
    }
}

