import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useRef } from "react";

export function RequestAirdrop(){

    const wallet = useWallet()
    const {connection} = useConnection()
    const inputRef = useRef(null);

    function requestAirDrop(){
        const publickey=wallet.publicKey
        const amount = inputRef.current.value
        console.log(amount*LAMPORTS_PER_SOL)
        connection.requestAirdrop(publickey,amount*LAMPORTS_PER_SOL)
        
    }

    return(
        <div>
           <input type="text" ref={inputRef} placeholder="Amount.."/>
            <button onClick={requestAirDrop}>Request airdrop</button>
        </div>
    )
}