import { PersistenceService } from "./persistence-service.ts"
import { ISubscriber, IMessage } from "./data-model.ts"
// import { opine } from "https://deno.land/x/opine@2.3.3/mod.ts";
import express from "npm:express";

const app = express();
// const app = opine();

const persistencService = PersistenceService.getInstance()


function authorizationMiddleware(req: any, res: any, next: any) {
    next() // might ask the CULT community if we shall leave this open for everyone 
}

async function analyzeSentiment() {

    const receivedMessages: IMessage[] = await persistencService.readReceivedMessages()

    const anonymizedReceivedMessages: IMessage[] = anonymizeReceivedMessages(receivedMessages)

    console.log(`checking the trend wrt the sentiment - based on ${anonymizedReceivedMessages.length} received messages`)
    // ... might be an interesting field for programmers and data scientists to do this. 
    // The https://www.npmjs.com/package/node-nlp library which we already use in node-nlp-server would be a good start
    // to explore this, because its intent matching features can be seen as classifier imo

}

function anonymizeReceivedMessages(receivedMessages: IMessage[]): IMessage[] {

    const anonymizedReceivedMessages: IMessage[] = []

    for (const receivedMessage of receivedMessages) {
        receivedMessage.chatID = 0
        receivedMessage.userName = ""
        receivedMessage.firstName = ""
        receivedMessage.lastName = ""
        anonymizedReceivedMessages.push(receivedMessage)
    }

    return anonymizedReceivedMessages


}

app.get("/getsubscribers", authorizationMiddleware, async (request: any, response: any) => {
    const subscribers: ISubscriber[] = await persistencService.readSubscribers()

    response.send(subscribers)
});

app.get("/getReceivedMessages", authorizationMiddleware, async (request: any, response: any) => {

    const receivedMessages: IMessage[] = await persistencService.readReceivedMessages()

    response.send(receivedMessages)
});

app.get("/getSentMessages", authorizationMiddleware, async (request: any, response: any) => {
    
    const sentMessages: ISubscriber[] = await persistencService.readSentMessages()
    
    response.send(sentMessages)

});

const port = Number(Deno.args[0])

app.listen(port, () => {
    console.log(`Listen on http://localhost:${port}`);
});