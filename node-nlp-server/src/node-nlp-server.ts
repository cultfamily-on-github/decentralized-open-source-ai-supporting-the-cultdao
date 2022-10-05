import { NodeNLPService } from "./node-nlp-service";

const express = require("express");
const app = express();
const nodeNLPService: NodeNLPService = NodeNLPService.getInstance()

app.get("/getresponse/input/:input", async (request: any, response: any) => {
    const result: any = await nodeNLPService.getResponse(request.params.input)
    response.send(result.answer);
});

console.log(process.argv[0])
app.listen(3000, () => {
    console.log(`Listen on http://localhost:3000...`);
});