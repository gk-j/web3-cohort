import { useState } from 'react'
import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import './App.css'
import { RequestAirdrop } from './RequestAirdrop';
import { ShowBalance } from './ShowBalance';
import { SendTokens } from './SendTokens';
import { SignMessage } from './SignMessage';

function App() {
  const [count, setCount] = useState(0)

  return (
      <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/stahab8VwSigoRcWzJeY98l9ibdDu4qx"}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                  <div style={{width:"100vw",display:"flex",justifyContent:"center"}}>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                    
                  </div>
                  <div style={{width:"100vw",display:"flex",justifyContent:"center"}}>
                    {/* <RequestAirdrop/> */}
                  </div>
                  {/* <ShowBalance/>
                  <SendTokens/> */}
                  <SignMessage/>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
  )
}

export default App
