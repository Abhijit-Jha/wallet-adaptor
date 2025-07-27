"use client";
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import React from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react'; // Assuming you're using lucide-react icons

const ConnectWallet = () => {
    const { setVisible } = useWalletModal();
    const { connected, publicKey, disconnect, connecting, disconnecting } = useWallet();

    const handleConnect = () => {
        setVisible(true); 
    };

    const shortenAddress = (address: string) => {
        return address.slice(0, 4) + '...' + address.slice(-4);
    };

    return (
        <>
            {!connected ? (
                <Button onClick={handleConnect} disabled={connecting}>
                    {connecting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        </>
                    ) : (
                        "Connect Wallet"
                    )}
                </Button>
            ) : (
                <Button onClick={disconnect} disabled={disconnecting} className='w-24'>
                    {disconnecting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        </>
                    ) : (
                        shortenAddress(publicKey?.toString() || '')
                    )}
                </Button>
            )}
        </>
    );
};

export default ConnectWallet;
