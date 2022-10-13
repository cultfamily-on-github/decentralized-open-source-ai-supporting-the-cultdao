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

    public readonly pathToCerts = `/etc/letsencrypt/live/cultbeast.org`;
    public readonly pathToCertFile = `${this.pathToCerts}/fullchain.pem`;
    public readonly pathToKeyFile = `${this.pathToCerts}/privkey.pem`;
    private pathToOperationalData = `${Deno.cwd()}/operational-data`;
    private pathToSubscribers = `${this.pathToOperationalData}/subscribers.json`;
    private pathToMessages = `${this.pathToOperationalData}/messages.json`;
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

    public async readMessages(): Promise<IMessage[]> {
        const messages: IMessage[] = JSON.parse(await Deno.readTextFile(this.pathToMessages))
        return messages
    }

    public async writeMessages(messages: IMessage[]): Promise<void> {
        await Deno.writeTextFile(this.pathToMessages, JSON.stringify(messages))
    }

    public async readLearningOpportunities(): Promise<ILearningOpportunity[]> {
        const learningOpportunities: ILearningOpportunity[] = JSON.parse(await Deno.readTextFile(this.pathToLearningOpportunities))
        return learningOpportunities
    }

    public async writeLearningOpportunities(learningOpportunities: ILearningOpportunity[]): Promise<void> {
        await Deno.writeTextFile(this.pathToLearningOpportunities, JSON.stringify(learningOpportunities))
    }

}