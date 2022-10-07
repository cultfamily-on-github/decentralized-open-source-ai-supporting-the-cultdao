import { ISubscriber, IMessage, ILearningOpportunity  } from "./data-model.ts";
// import { SortService, Direction } from "https://deno.land/x/sort@v1.1.1/mod.ts"

export class PersistenceService {

    private static instance: PersistenceService

    public static getInstance(): PersistenceService { // singleton pattern
        if (PersistenceService.instance === undefined) {
            PersistenceService.instance = new PersistenceService()
        }
        return PersistenceService.instance
    }

    private pathToOperationalData = `${Deno.cwd()}/operational-data`;
    private pathToSubscribers = `${this.pathToOperationalData}/subscribers.json`;
    private pathToReceivedMessages = `${this.pathToOperationalData}/received-messages.json`;
    private pathToSentMessages = `${this.pathToOperationalData}/sent-messages.json`;
    private pathToLearningOpportunities = `${this.pathToOperationalData}/learning-opportunities.json`;

    private constructor() {
    }

    public async readSubscribers(): Promise<ISubscriber[]> {
        const subscribers: ISubscriber[] = JSON.parse(await Deno.readTextFile(this.pathToSubscribers))
        return subscribers
    }

    public async writeSubscribers(subscribers: ISubscriber[]): Promise<void> {
        await Deno.writeTextFile(this.pathToSubscribers, JSON.stringify(subscribers))
    }

    public async readReceivedMessages(): Promise<IMessage[]> {
        const messages: IMessage[] = JSON.parse(await Deno.readTextFile(this.pathToReceivedMessages))
        return messages
    }

    public async writeReceivedMessages(receivedMessages: IMessage[]): Promise<void> {
        await Deno.writeTextFile(this.pathToReceivedMessages, JSON.stringify(receivedMessages))
    }

    public async readSentMessages(): Promise<IMessage[]> {
        const messages: IMessage[] = JSON.parse(await Deno.readTextFile(this.pathToSentMessages))
        return messages
    }

    public async writeSentMessages(subscribers: IMessage[]): Promise<void> {
        await Deno.writeTextFile(this.pathToSentMessages, JSON.stringify(subscribers))
    }

    public async readLearningOpportunities(): Promise<ILearningOpportunity[]> {
        const learningOpportunities: ILearningOpportunity[] = JSON.parse(await Deno.readTextFile(this.pathToLearningOpportunities))
        return learningOpportunities
    }

    public async writeLearningOpportunities(learningOpportunities: ILearningOpportunity[]): Promise<void> {
        await Deno.writeTextFile(this.pathToLearningOpportunities, JSON.stringify(learningOpportunities))
    }

}