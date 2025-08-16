import { useRef } from "react"
import {createInitializeMint2Instruction, createMint, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID} from '@solana/spl-token'
import { Keypair, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
export function TokenLaunchpad() {

    const nameRef = useRef(null)
    const symbolRef = useRef(null)
    const imageRef = useRef(null)
    const initialSupplyRef = useRef(null)
    const wallet = useWallet()
    const { connection } = useConnection()
    async function createToken(){
        const keypair = Keypair.generate()
        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        
        const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: wallet.publicKey,
                    newAccountPubkey: keypair.publicKey,
                    space: MINT_SIZE,
                    lamports,
                    programId:TOKEN_PROGRAM_ID,
                }),
                createInitializeMint2Instruction(keypair.publicKey, 6, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID),
            );
        transaction.feePayer = wallet.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        
        
        transaction.partialSign(keypair)
        let response = await wallet.sendTransaction(transaction,connection)
        console.log(response)
    }

    return  <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input className='inputText' ref={nameRef} type='text' placeholder='Name'></input> <br />
        <input className='inputText'  ref={symbolRef} type='text' placeholder='Symbol'></input> <br />
        <input className='inputText' ref={imageRef} type='text' placeholder='Image URL'></input> <br />
        <input className='inputText' ref={initialSupplyRef} type='text' placeholder='Initial Supply'></input> <br />
        <button onClick={createToken} className='btn'>Create a token</button>
    </div>
}