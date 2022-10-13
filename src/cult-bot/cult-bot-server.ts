import { opine } from "https://deno.land/x/opine@2.3.3/mod.ts";
import { PersistenceService } from "../helpers/persistence-service.ts";
import { MessageHandler } from "./message-handler.ts";
import { EMedium } from "../helpers/data-model.ts";
import { opineCors } from "https://deno.land/x/cors/mod.ts";

export class CULTBotServer {

    private static instance: CULTBotServer

    public static getInstance(): CULTBotServer { // singleton pattern
        if (CULTBotServer.instance === undefined) {
            CULTBotServer.instance = new CULTBotServer()
        }
        return CULTBotServer.instance
    }


    private app = opine();
    private serverIsListening = false
    private persistenceService: PersistenceService
    private messageHandler: MessageHandler


    
    private constructor() { // private to ensure programmers adhere to the singleton pattern
        this.persistenceService = PersistenceService.getInstance()
        this.messageHandler = MessageHandler.getInstance()
        this.app.use(opineCors())
    } 

    public async startListening(port: number) {
        
        if (this.serverIsListening === false) {
            this.serverIsListening = true

            this.app.get("/", function (req, res) {
                res.send("Hello World");
            });

            this.app.post('/api/v1/addMessage', async function (req, res) {
                this.messageHandler.handleReceivedMessage(req.body.text, EMedium.CULTBEASTDOTORG)
                res.send({ message: "Message Added. Thank You." })
            })
    
            if (port.toString().indexOf("443") === -1) {
    
                await this.app.listen(port)
                console.log(`listening on http://localhost:${port}`)
    
            } else {
    
                console.log(`reading certificates from ${this.persistenceService.pathToCerts}`);
    
                Deno.readTextFile(this.persistenceService.pathToCertFile)
                    .then((cert) => {
                        console.log(cert.length);
                    })
                Deno.readTextFile(this.persistenceService.pathToKeyFile)
                    .then((key) => {
                        console.log(key.length);
                    })
    
                const options = {
                    port: port,
                    certFile: this.persistenceService.pathToCertFile,
                    keyFile: this.persistenceService.pathToKeyFile
                };
    
                await this.app.listen(options)
                console.log(`listening on https://localhost:${port}`)
    
            }

        }
    }
}

const port = Number(Deno.args[0])

CULTBotServer.getInstance().startListening(port)

