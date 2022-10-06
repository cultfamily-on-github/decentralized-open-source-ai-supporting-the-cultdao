import { AdminServer } from "./admin-server/admin-server.ts"

const port = Number(Deno.args[0])

const adminServer = AdminServer.getInstance(port)
adminServer.startListening()