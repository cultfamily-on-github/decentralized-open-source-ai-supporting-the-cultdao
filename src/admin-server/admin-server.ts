import { PersistenceService } from "../helpers/persistence-service.ts"
import { ISubscriber, IMessage } from "../helpers/data-model.ts"
import express from "npm:express";
import { SentimentClassifierService } from "./sentiment-classifier-service.ts";


export class AdminServer {

    private static instance

    private app: any
    private port: Number
    private persistencService: any
    private serverStarted = false
    // private sentimentClassifierService: SentimentClassifierService

    public static getInstance(port: Number) {
        if (AdminServer.instance === undefined) {
            AdminServer.instance = new AdminServer(port)
        }
        return AdminServer.instance
    }

    private constructor(port: Number) {
        this.app = express();
        this.port = port
        this.persistencService = PersistenceService.getInstance()
        // this.sentimentClassifierService = SentimentClassifierService.getInstance()
    }

    public startListening() {
        if (this.serverStarted) {
            throw new Error(`The AdminServer has already been started earlier.`)
        }

        this.serverStarted = true


        this.app.get("/getsubscribers", this.checkAuthorization, async (request: any, response: any) => {
            const subscribers: ISubscriber[] = await this.persistencService.readSubscribers()

            response.send(subscribers)
        });

        this.app.get("/getReceivedMessages", this.checkAuthorization, async (request: any, response: any) => {

            const receivedMessages: IMessage[] = await this.persistencService.readReceivedMessages()

            response.send(receivedMessages)
        });

        this.app.get("/getSentMessages", this.checkAuthorization, async (request: any, response: any) => {

            const sentMessages: ISubscriber[] = await this.persistencService.readSentMessages()

            response.send(sentMessages)

        });

        this.app.get("/analyzeSentiment", this.checkAuthorization, async (request: any, response: any) => {

            response.send(await this.analyzeSentiment())

        });



        this.app.listen(this.port, () => {
            console.log(`Listen on http://localhost:${this.port}`);
        });
    }

    private checkAuthorization(req: any, res: any, next: any) { // middleware
        next() // might ask the CULT community if we shall leave this open for everyone 
    }

    private async analyzeSentiment(): Promise<any> {

        const receivedMessages: IMessage[] = await this.persistencService.readReceivedMessages()

        const anonymizedReceivedMessages: IMessage[] = this.anonymizeReceivedMessages(receivedMessages)

        console.log(`checking the trend wrt the sentiment - based on ${anonymizedReceivedMessages.length} received messages`)
        // ... might be an interesting field for programmers and data scientists to do this. 
        // The https://www.npmjs.com/package/node-nlp library which we already use in node-nlp-server would be a good start
        // to explore this, because its intent matching features can be seen as classifier imo

        // const classificationCompleteStructure = await this.sentimentClassifierService.classify()
        // return classificationCompleteStructure
        return 42 // for the moment - the structure is roughly prepared - completing & optimizing the sentiment analyzer can be a data science students project

    }

    private anonymizeReceivedMessages(receivedMessages: IMessage[]): IMessage[] {

        const anonymizedReceivedMessages: IMessage[] = []

        for (const receivedMessage of receivedMessages) {
            receivedMessage.chatID = 0
            receivedMessage.userName = ""
            anonymizedReceivedMessages.push(receivedMessage)
        }

        return anonymizedReceivedMessages
    }
}





