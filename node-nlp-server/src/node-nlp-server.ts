import { NodeNLPService } from "./node-nlp-service";

const express = require("express");
const app = express();
const nodeNLPService: NodeNLPService = NodeNLPService.getInstance()

app.get("/getresponse/input/:input", async (request: any, response: any) => {
    const result: any = await nodeNLPService.getResponse(request.params.input)
    if (result.answer === "") {
        const pleaseHelpMeLearnMessage =
            "I'm not sure enough to give you a specific answer to your request. You might want to improve my training data."
        response.send(pleaseHelpMeLearnMessage);
    } else {
        response.send(result.answer);
    }
});

const port = Number(process.argv[2]) 

app.listen(port, () => {
    console.log(`Listen on http://localhost:${port}`);
});