import { NodeNLPService } from "./node-nlp-service";

import express from "express";

export class CULTNodeNLPServer {

    private static instance: CULTNodeNLPServer

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
        this.port = port
        this.nodeNLPService = NodeNLPService.getInstance()
    }

    public startListening() {
        if (this.serverStarted) {
            throw new Error(`The AdminServer has already been started earlier.`)
        }

        this.serverStarted = true

        // http://65.108.89.236:8081/getresponse/input/CULT // port 8081 currently closed via firewall
        // if someone wants to reuse the nlp part like this, I can open it and potentially introduce api keys to protect this server
        // people can already reuse those features indirectly - just like the https://cultbeast.org (also a CULT AI client) reuses them. 
        // see also https://github.com/cultfamily-on-github/cultbeast-training-interface-microservice/blob/main/frontend/cultbeast.org-ui/src/App.svelte#L58-L78
        this.app.get("/getresponse/input/:input", async (request: any, response: any) => {
            const result: any = await this.nodeNLPService.getResponse(request.params.input)
            if (result.answer === "" || result.answer === undefined) {
                // console.log(result) // check this when accurracy seems strange
                const pleaseHelpMeLearnMessage =
                    "I'm not sure enough to give you a specific answer to your request. You might want to improve my training data: https://github.com/cultfamily-on-github/decentralized-open-source-ai-supporting-the-cultdao/issues/new?assignees=octocat&labels=trainingdata%2Cfaq&template=q-and-a-pair.yaml&title=A+new+example+q+%26+a+pair+is+coming+to+train+the+CULT+Beast."
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

const port = Number(process.argv[2])

const cultNodeNLPServer: CULTNodeNLPServer = CULTNodeNLPServer.getInstance(port)

cultNodeNLPServer.startListening()
