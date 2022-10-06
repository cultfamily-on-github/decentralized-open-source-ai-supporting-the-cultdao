import { sentimentClassificationExampleData } from "./sentiment-classification-example-data.ts";

// const { NlpManager } = require('node-nlp'); // https://github.com/cultfamily-on-github/decentralized-open-source-ai-supporting-the-cultdao/issues/2

export class SentimentClassifierService {

    private static instance: SentimentClassifierService

    public static getInstance(): SentimentClassifierService { // singleton pattern
        if (SentimentClassifierService.instance === undefined) {
            SentimentClassifierService.instance = new SentimentClassifierService()
        }
        return SentimentClassifierService.instance
    }

    private brain: any

    private constructor() {

        // this.brain = new NlpManager({ languages: ['en'], forceNER: true })
        // this.trainBrain()
        // this.startTrainBrainInterval()

    }

    private trainBrain() {


        // for (const sentimentClassificationExampleEntry of sentimentClassificationExampleData) {
        //     this.brain.addDocument(sentimentClassificationExampleEntry.language, sentimentClassificationExampleEntry.utterance, sentimentClassificationExampleEntry.intent);
        // }

        // (async () => {
        //     await this.brain.train();
        //     this.brain.save();
        // })();

    }

    public async classify(input: string): Promise<any> {

        let response: any

        response = await this.brain.process('en', input);
        return response

    }

    private startTrainBrainInterval() {
        setInterval(() => {
            this.trainBrain()
        }, 1000 * 60 * 60 * 24) // once a day
    }
}