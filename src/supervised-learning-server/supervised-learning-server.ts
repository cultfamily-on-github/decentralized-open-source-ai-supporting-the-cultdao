import { PersistenceService } from "../helpers/persistence-service.ts"
import { ILearningOpportunity } from "../helpers/data-model.ts"
import express from "npm:express";

export class SupervisedLearningServer {

    private static instance

    private app: any
    private port: Number
    private persistencService: any
    private serverStarted = false

    public static getInstance(port: Number) {
        if (SupervisedLearningServer.instance === undefined) {
            SupervisedLearningServer.instance = new SupervisedLearningServer(port)
        }
        return SupervisedLearningServer.instance
    }

    private constructor(port: Number) {
        this.app = express();
        this.port = port
        this.persistencService = PersistenceService.getInstance()
    }

    public startListening() {
        if (this.serverStarted) {
            throw new Error(`The SupervisedLearningServer has already been started earlier.`)
        }

        this.serverStarted = true


        // http://cultmagazine.org:3002/api/v1/getLearningOpportunities
        this.app.get("/api/v1/getLearningOpportunities", async (request: any, response: any) => {
            console.log(`reading learning opportunities`)
            const learningOpportunities: ILearningOpportunity[] = await this.persistencService.readLearningOpportunities()

            response.send(learningOpportunities)
        });


        this.app.listen(this.port, () => {
            console.log(`Listen on http://localhost:${this.port}`);
        });
    }

    
}





