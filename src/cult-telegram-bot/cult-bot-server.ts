import { opine } from "https://deno.land/x/opine@2.3.3/mod.ts";

export class CULTBotServer {

    private app = opine();
    private serverStarted = false

    public constructor(port: number) {
        if (this.serverStarted === false) {
            this.startServing(port)
            this.serverStarted = true
        }
    }

    private startServing(port: number) {

        this.app.get("/", function (req, res) {
            res.send("Hello World");
        });

        this.app.listen(port, () =>
            console.log(`server has started on http://localhost:${port} 🚀`)
        );
    }
}

