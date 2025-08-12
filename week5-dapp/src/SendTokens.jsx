import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
import { useRef } from "react"

export function SendTokens(){

    const toRef = useRef(null)
    const amountRef = useRef(null)
    const wallet = useWallet()
    const {connection} = useConnection()

    async function sendToken(){
        let to = toRef.current.value
        let amount = amountRef.current.value
        console.log(to)
        console.log(amount)
        const transaction = new Transaction()
        transaction.add(SystemProgram.transfer({
            fromPubkey:wallet.publicKey,
            toPubkey:new PublicKey(to),
            lamports:amount*LAMPORTS_PER_SOL
        }))
        console.log(connection)
        await wallet.sendTransaction(transaction,connection)
        alert("Sent "+amount+" SOL to "+to);
    }


    return(
        <div>
            <input  ref={toRef} type="text" placeholder="To"/>
            <input ref={amountRef} type="text" placeholder="amount"/>
            <button onClick={sendToken}>Send</button>
        </div>
    )
}