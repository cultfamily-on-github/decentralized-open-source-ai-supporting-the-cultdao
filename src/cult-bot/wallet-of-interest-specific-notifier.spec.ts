import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts"
import { WalletOfInterestSpecificNotifier } from "./wallet-of-interest-specific-notifier.ts"


const walletOfInterestSpecificNotifier: WalletOfInterestSpecificNotifier = WalletOfInterestSpecificNotifier.getInstance()

Deno.test("test isEthereumWalletAddress", async () => {

    const validAddressUnderTest = "0x9E972a43B3B8D68cD70930697E16429E47E88151".toLowerCase()
    const unValidaddressUnderTest = "0x9E972a43B3B8D68cD70930697E1642947E88151".toLowerCase()

    let actualResult =
        walletOfInterestSpecificNotifier.isEthereumWalletAddress(validAddressUnderTest)
    assertEquals(actualResult, true)

    actualResult =
        walletOfInterestSpecificNotifier.isEthereumWalletAddress(unValidaddressUnderTest)
    assertEquals(actualResult, false)

})