import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useEffect, useState } from "react"

export function ShowBalance(){

    const [balance,setBalance] = useState(0)
    const wallet = useWallet()
    const {connection} =  useConnection()

    async function  getBalance(){
        const balance=await connection.getBalance(wallet.publicKey)
        console.log(balance)
        setBalance(balance/LAMPORTS_PER_SOL)
    }
    useEffect(()=>{
        if (wallet.publicKey) {
        getBalance();
    }
    },[wallet.publicKey])

    return(
        <div>
            Balance : {balance}
        </div>
    )
}