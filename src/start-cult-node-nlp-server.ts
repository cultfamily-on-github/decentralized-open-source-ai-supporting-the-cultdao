import { CULTNodeNLPServer } from "./nlp-server/node-nlp-server.ts"

const port = Number(Deno.args[0])

const cultNodeNLPServer: CULTNodeNLPServer = CULTNodeNLPServer.getInstance(port)
cultNodeNLPServer.startListening()