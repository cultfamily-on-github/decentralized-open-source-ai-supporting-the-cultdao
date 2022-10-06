import { trainingData } from "./training-data.ts"

import NlpManager from 'npm:node-nlp';
// const { NlpManager } = require('npm:node-nlp');

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
        this.startTrainBrainInterval()

    }

    private trainBrain() {

        for (const entry of trainingData.utterancesToIntents) {
            this.brain.addDocument(entry.language, entry.utterance, entry.intent);
        }

        for (const entry of trainingData.intentsToPotentialAnswers) {
            this.brain.addAnswer(entry.language, entry.intent, entry.answer);
        }

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

    private startTrainBrainInterval() {
        setInterval(() => {
            this.trainBrain()
        }, 1000 * 60 * 60 * 24) // once a day
    }
}