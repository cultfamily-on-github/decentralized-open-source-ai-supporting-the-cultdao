import { SupervisedLearningServer } from "./supervised-learning-server/supervised-learning-server.ts"

const port = Number(Deno.args[0])

const supervisedLearningServer = SupervisedLearningServer.getInstance(port)
supervisedLearningServer.startListening()