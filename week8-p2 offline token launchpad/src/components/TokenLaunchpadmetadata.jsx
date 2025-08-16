import { useRef } from "react"
import { TOKEN_2022_PROGRAM_ID, getMintLen, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, TYPE_SIZE, LENGTH_SIZE, ExtensionType, getMinimumBalanceForRentExemptMint } from "@solana/spl-token"
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js"
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
export function TokenLaunchpadmetadata() {

    const nameRef = useRef(null)
    const symbolRef = useRef(null)
    const imageRef = useRef(null)
    const initialSupplyRef = useRef(null)
    const wallet = useWallet()
    const { connection } = useConnection()
    async function createToken(){
        
        const mintKeypair = Keypair.generate()
        const metadata = {
            mint: mintKeypair.publicKey,
            name: 'GK',
            symbol: '&&&@@',
            uri: 'https://cdn.100xdevs.com/metadata.json',
            additionalMetadata: [],
        };

        const mintLen = getMintLen([ExtensionType.MetadataPointer]);
        const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
        const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);;
        
        const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: wallet.publicKey,
                    newAccountPubkey: mintKeypair.publicKey,
                    space: mintLen,
                    lamports,
                    programId:TOKEN_2022_PROGRAM_ID,
                }),
                createInitializeMetadataPointerInstruction(mintKeypair.publicKey, wallet.publicKey, mintKeypair.publicKey, TOKEN_2022_PROGRAM_ID),
                createInitializeMintInstruction(mintKeypair.publicKey, 9, wallet.publicKey, null, TOKEN_2022_PROGRAM_ID),
                createInitializeInstruction({
                programId: TOKEN_2022_PROGRAM_ID,
                mint: mintKeypair.publicKey,
                metadata: mintKeypair.publicKey,
                name: metadata.name,
                symbol: metadata.symbol,
                uri: metadata.uri,
                mintAuthority: wallet.publicKey,
                updateAuthority: wallet.publicKey,
            }),
            );
        transaction.feePayer = wallet.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        
        
        transaction.partialSign(mintKeypair)
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