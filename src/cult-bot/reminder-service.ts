import { ISubscriber } from "../helpers/data-model.ts"
import { Sender } from "../helpers/sender.ts"
import { PersistenceService } from "../helpers/persistence-service.ts"

export class ReminderService {

    private static instance: ReminderService

    public static getInstance(telegramBotToken: string): ReminderService { // singleton pattern
        if (ReminderService.instance === undefined) {
            ReminderService.instance = new ReminderService(telegramBotToken)
        }
        return ReminderService.instance
    }

    private started = false
    private telegramBotToken = ""
    private persistenceService: PersistenceService
    private sender: Sender

    private constructor(telegramBotToken: string) { // private to ensure programmers adhere to the singleton pattern for services
        this.sender = Sender.getInstance()
        this.persistenceService = PersistenceService.getInstance()
        this.telegramBotToken = telegramBotToken
    }

    public async registerWalletOfInterest(messageObject: any){
        console.log(`someone wants to receive wallet specific notifications - e.g. when being a CULTMander`)

        const subscribers = await this.persistenceService.readSubscribers()
        const subscriber = subscribers.filter((entry: any) => entry.chatID === messageObject.message.chat.id)[0]
        
        if (subscriber === undefined) {
            throw new Error(`subscriber could not be found`)
        } else if (subscriber.wois === undefined) {
            subscriber.wois = [messageObject.message.text]
        } else {
            subscriber.wois.push(messageObject.message.text)
        }

        await this.persistenceService.writeSubscribers(subscribers) 
    }

    public isEthereumWalletAddress (address: string) {

        if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            // check if it has the basic requirements of an address
            return false;
        } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
            // If it's all small caps or all all caps, return true
            return true;
        } else {
            throw new Error(`I guess it's fine toLowerCase the input as a client`)
        }
    };
    
    public startReminderCheckInterval() {

        if (this.started) {
            throw new Error(`The Game Of the Day Reminder Interval has already been started earlier.`)
        }
        this.started = true
        setInterval(async () => {
            const dt = new Date()
            if (dt.getHours() === 2 && dt.getMinutes() === 10) {
                await this.sendReminders()
            }
            console.log(dt.getHours(), dt.getMinutes())
        }, 1000 * 60) // checking each minute if it's time to remind subscribers of the new Game of the Day

    }


    private async sendReminders(): Promise<void> {

        const subscribers: ISubscriber[] = await this.persistenceService.readSubscribers()

        for (const subscriber of subscribers) {
        
            await this.sender.send(this.telegramBotToken, subscriber.chatID, `CULT Game of the Day: https://cultplayground.org`)
            
            const response = await fetch("https://revoltapi.cultdao.io/static/manders.json")
            const cultMandersAPIJSON = await response.json()
            const votersForTheCurrentVotingCycle = cultMandersAPIJSON.MANDERS.concat(cultMandersAPIJSON.NFT_OWNERS)
            votersForTheCurrentVotingCycle.push("0x9E972a43B3B8D68cD70930697E16429E47E88151") // temp to test things
            if (subscriber.wois !== undefined) {
                
                for (const woi of subscriber.wois) {
                    const theMatch = votersForTheCurrentVotingCycle.filter((entry: string) => entry.toLowerCase() === woi.toLowerCase())[0]
                    if (theMatch !== undefined) {
                        await this.sender.send(this.telegramBotToken, subscriber.chatID, `The following wallet has the honor and the power to vote on acts of revolt in the current voting cycle: ${woi}`)
                    }
                }
            }
        }
    }
}