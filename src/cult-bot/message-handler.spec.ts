import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts"
import { MessageHandler } from "./message-handler.ts"


const messageHandler: MessageHandler = MessageHandler.getInstance()

Deno.test("reduce array size", async () => {

    const exampleArray = ["a", "b", "c", "d", "e", "f", "g"]
    
    const resultArray = messageHandler.reduceSizeOfArray(exampleArray, 5)
    
    assertEquals(resultArray.length, 5)
    assertEquals(resultArray, ["c", "d", "e", "f", "g"])

})