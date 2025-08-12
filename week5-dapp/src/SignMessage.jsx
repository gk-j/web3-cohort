import { ed25519 } from '@noble/curves/ed25519'
import { useWallet } from '@solana/wallet-adapter-react'
import bs58 from 'bs58';
import { useRef } from 'react';



export function SignMessage(){
    const {publicKey,signMessage} = useWallet()
    
    const messageRef = useRef(null)

    async function signMes(){
        if(!publicKey) throw new Error('Wallet not connected!');
        if(!signMessage) throw new Error('Wallet doesnot support message signing!')

        const message = messageRef.current.value
        const encodeMessage = new TextEncoder().encode(message)
        const signature = await signMessage(encodeMessage)

        if(!ed25519.verify(signature,encodeMessage,publicKey.toBytes())) throw new Error('signature not valid!')
        // alert('success')
        console.log(`Message signature: ${bs58.encode(signature)}`)
    } 

    return(
        <div>
            <input ref={messageRef} type="text" placeholder='Message'/>
            <button onClick={signMes}>
                sign message
            </button>
        </div>
    )


}