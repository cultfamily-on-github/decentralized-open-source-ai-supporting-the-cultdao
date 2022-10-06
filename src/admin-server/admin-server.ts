import { PersistenceService } from "../helpers/persistence-service.ts"
import { ISubscriber, IMessage } from "../helpers/data-model.ts"
import express from "npm:express";


export class AdminServer {

    private static instance

    private app: any
    private port: Number
    private persistencService: any
    private serverStarted = false

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
            
           
            response.send(this.analyzeSentiment())
        
        });
        
        
        
        this.app.listen(this.port, () => {
            console.log(`Listen on http://localhost:${this.port}`);
        });
    }
    
    private checkAuthorization(req: any, res: any, next: any) { // middleware
        next() // might ask the CULT community if we shall leave this open for everyone 
    }

    private async analyzeSentiment(): Promise<Number> {
    
        const receivedMessages: IMessage[] = await this.persistencService.readReceivedMessages()
    
        const anonymizedReceivedMessages: IMessage[] = this.anonymizeReceivedMessages(receivedMessages)
    
        console.log(`checking the trend wrt the sentiment - based on ${anonymizedReceivedMessages.length} received messages`)
        // ... might be an interesting field for programmers and data scientists to do this. 
        // The https://www.npmjs.com/package/node-nlp library which we already use in node-nlp-server would be a good start
        // to explore this, because its intent matching features can be seen as classifier imo

        return 42 // for the moment
    
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





