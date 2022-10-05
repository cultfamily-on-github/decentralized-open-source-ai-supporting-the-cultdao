import { ISubscriber  } from "./data-model.ts";
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
    private pathToReceivedMessages = `${this.pathToOperationalData}/receivedMessages.json`;

    private constructor() {
    }

    public async readSubscribers(): Promise<ISubscriber[]> {
        const subscribers: ISubscriber[] = JSON.parse(await Deno.readTextFile(this.pathToSubscribers))
        return subscribers
    }

    public async writeSubscribers(subscribers: ISubscriber[]): Promise<void> {
        await Deno.writeTextFile(this.pathToSubscribers, JSON.stringify(subscribers))
    }

}