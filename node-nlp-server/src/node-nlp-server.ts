import { NodeNLPService } from "./node-nlp-service";

const express = require("express");
const app = express();
const nodeNLPService: NodeNLPService = NodeNLPService.getInstance()

// http://116.203.185.185:8081/getresponse/input/CULT
app.get("/getresponse/input/:input", async (request: any, response: any) => {
    const result: any = await nodeNLPService.getResponse(request.params.input)
    if (result.answer === "" || result.answer === undefined) {
        const pleaseHelpMeLearnMessage =
            "I'm not sure enough to give you a specific answer to your request. You might want to improve my training data which you can find here: https://github.com/cultfamily-on-github/decentralized-open-source-ai-supporting-the-cultdao/blob/main/node-nlp-server/training-data.ts"
        response.send({answer: pleaseHelpMeLearnMessage});
    } else {
        response.send({answer: result.answer});
    }
});

app.get("/getsubscribers/adminkey/:adminkey", async (request: any, response: any) => {
    const result: any = await nodeNLPService.getResponse(request.params.input)
    if (result.answer === "" || result.answer === undefined) {
        const pleaseHelpMeLearnMessage =
            "I'm not sure enough to give you a specific answer to your request. You might want to improve my training data which you can find here: https://github.com/cultfamily-on-github/decentralized-open-source-ai-supporting-the-cultdao/blob/main/node-nlp-server/training-data.ts"
        response.send({answer: pleaseHelpMeLearnMessage});
    } else {
        response.send({answer: result.answer});
    }
});

const port = Number(process.argv[2]) 

app.listen(port, () => {
    console.log(`Listen on http://localhost:${port}`);
});