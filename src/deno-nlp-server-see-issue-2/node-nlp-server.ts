import { NodeNLPService } from "./node-nlp-service.ts";

import express from "npm:express";

export class CULTNodeNLPServer {

    private static instance

    public static getInstance(port: Number) {
        if (CULTNodeNLPServer.instance === undefined) {
            CULTNodeNLPServer.instance = new CULTNodeNLPServer(port)
        }
        return CULTNodeNLPServer.instance
    }


    private app: any
    private port: Number
    private nodeNLPService: NodeNLPService
    private serverStarted = false

    private constructor(port: Number) {
        this.app = express();
        this.nodeNLPService = NodeNLPService.getInstance()
    }

    public startListening() {
        if (this.serverStarted) {
            throw new Error(`The AdminServer has already been started earlier.`)
        }

        this.serverStarted = true

        // http://116.203.185.185:8081/getresponse/input/CULT
        this.app.get("/getresponse/input/:input", async (request: any, response: any) => {
            const result: any = await this.nodeNLPService.getResponse(request.params.input)
            if (result.answer === "" || result.answer === undefined) {
                const pleaseHelpMeLearnMessage =
                    "I'm not sure enough to give you a specific answer to your request. You might want to improve my training data: https://github.com/cultfamily-on-github/decentralized-open-source-ai-supporting-the-cultdao/blob/main/node-nlp-server/training-data.ts"
                response.send({ answer: pleaseHelpMeLearnMessage });
            } else {
                response.send({ answer: result.answer });
            }
        });

        app.get("/getsubscribers/adminkey/:adminkey", async (request: any, response: any) => {
            const result: any = await this.nodeNLPService.getResponse(request.params.input)
            if (result.answer === "" || result.answer === undefined) {
                const pleaseHelpMeLearnMessage =
                    "I'm not sure enough to give you a specific answer to your request. You might want to improve my training data: https://github.com/cultfamily-on-github/decentralized-open-source-ai-supporting-the-cultdao/blob/main/node-nlp-server/training-data.ts"
                response.send({ answer: pleaseHelpMeLearnMessage });
            } else {
                response.send({ answer: result.answer });
            }
        });

        this.app.listen(this.port, () => {
            console.log(`NLP Server is listening on http://localhost:${this.port}`);
        });

    }
}


