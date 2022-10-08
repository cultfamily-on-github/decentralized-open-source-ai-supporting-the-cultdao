import { PersistenceService } from "../helpers/persistence-service.ts"
import { ILearningOpportunity } from "../helpers/data-model.ts"
import express from "npm:express";
import cors from "npm:cors";

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
        this.app.use(cors())
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


        if (this.port.toString().indexOf("443") === -1) {
            void this.app.listen(this.port)
            console.log(`server has started on http://localhost:${this.port} 🚀`);
        } else {
            const pathToCertificates = '/etc/letsencrypt/live/cultmagazine.org';
        
            console.log(`reading certificates from ${pathToCertificates}`);
        
            // const cert = await Deno.readTextFile(`/etc/letsencrypt/live/cultmagazine.org/fullchain.pem`);
            // const key = await Deno.readTextFile(`/etc/letsencrypt/live/cultmagazine.org/privkey.pem`);
            // console.log(cert.length);
            // console.log(key.length);
        
            const options = {
                port: this.port,
                certFile: '/etc/letsencrypt/live/cultmagazine.org/fullchain.pem',
                keyFile: '/etc/letsencrypt/live/cultmagazine.org/privkey.pem'
            };
        
            try {
                void this.app.listen(options);
                console.log(`server has started on https://localhost:${this.port} 🚀`);
            } catch (error) {
                console.log(`shit happened: ${error}`);
            }
        }
        

    }

    
}





