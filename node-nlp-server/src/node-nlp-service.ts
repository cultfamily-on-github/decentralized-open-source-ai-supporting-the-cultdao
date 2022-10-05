const { NlpManager } = require('node-nlp');
export class NodeNLPService {

    private static instance: NodeNLPService

    public static getInstance(): NodeNLPService { // singleton pattern
        if (NodeNLPService.instance === undefined) {
            NodeNLPService.instance = new NodeNLPService()
        }
        return NodeNLPService.instance
    }

    private brain: any
    private readyToRock = false

    private constructor() {

        this.brain = new NlpManager({ languages: ['en'], forceNER: true })
        this.trainBrain()
        
    }

    private trainBrain() {

        // Adds the utterances and intents for the NLP
        this.brain.addDocument('en', 'goodbye for now', 'greetings.bye');
        this.brain.addDocument('en', 'bye bye take care', 'greetings.bye');
        this.brain.addDocument('en', 'okay see you later', 'greetings.bye');
        this.brain.addDocument('en', 'bye for now', 'greetings.bye');
        this.brain.addDocument('en', 'i must go', 'greetings.bye');
        this.brain.addDocument('en', 'hello', 'greetings.hello');
        this.brain.addDocument('en', 'hi', 'greetings.hello');
        this.brain.addDocument('en', 'howdy', 'greetings.hello');

        // Train also the NLG
        this.brain.addAnswer('en', 'greetings.bye', 'Till next time');
        this.brain.addAnswer('en', 'greetings.bye', 'see you soon!');
        this.brain.addAnswer('en', 'greetings.hello', 'Hey there!');
        this.brain.addAnswer('en', 'greetings.hello', 'Greetings!');

        (async () => {
            this.readyToRock = false
            await this.brain.train();
            this.readyToRock = true
            this.brain.save();
        })();
    }

    public async getResponse(input: string): Promise<string> {

        let response = ""

        if (this.readyToRock) {

            response = await this.brain.process('en', input);
            return response

        } else {
            response =
                `You reached out to me while I was in training mode which normally takes less than a second. Please try again right now.`
        }

        return response

    }

}