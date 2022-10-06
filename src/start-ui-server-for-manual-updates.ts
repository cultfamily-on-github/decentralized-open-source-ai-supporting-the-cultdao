import { UIServer } from "./bot-ui-for-manual-updates/bot-ui-server.ts";

const port: Number = Number(Deno.args[0])

UIServer.serve(port)