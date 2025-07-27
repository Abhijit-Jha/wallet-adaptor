"use client";
import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'

const DEFAULT_ADDRESS = '5MT4T9ysGdruBGM8XKPgMKU2QP3Tirobt1ZCF8Y1Q4sg' // Your wallet

const SendSolana = () => {
    const [recieverAddress, setRecieverAddress] = useState('')
    const [amount, setAmount] = useState(0)
    const [error, setError] = useState('');
    const { connection } = useConnection();
    const wallet = useWallet();
    const { setVisible } = useWalletModal()

    const handleSend = async () => {
        if (!recieverAddress || !amount) {
            setError("Please fill both fields")
            toast.error("Please fill both fields")
            return;
        }

        if (!wallet.publicKey || !wallet.connected) {
            setVisible(true);
            return;
        }

        setError('');

        try {
            //Creating a new Transaction
            const transaction = new Transaction();
            transaction.add(SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(recieverAddress),
                lamports: amount * LAMPORTS_PER_SOL
            }))
            
            await wallet.sendTransaction(transaction,connection);
            toast.success(`Sent ${amount} SOL to ${recieverAddress}`)
        } catch (error: any) {
            toast.error(`Transaction failed: ${error.message}`)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">🚀 Send SOL Tokens</CardTitle>
                <CardDescription className="text-gray-400">
                    Transfer test SOL or Real SOL from one wallet to another wallet.
                </CardDescription>
                <CardAction>3</CardAction>
                <div className="mt-2">
                    <Button variant="outline" size="sm" onClick={() => setRecieverAddress(DEFAULT_ADDRESS)}>
                        TIP ME (Use My Wallet)
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <Input
                    placeholder="Receiver’s Public Key"
                    value={recieverAddress}
                    onChange={(e) => setRecieverAddress(e.target.value)}
                />
                <Input
                    type="number"
                    placeholder="Amount (e.g. 1 SOL)"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                {error && <p className="text-red-400 text-xs pl-2">{error}</p>}
                <Button onClick={handleSend} disabled={!recieverAddress || !amount}>
                    Send SOL
                </Button>
            </CardContent>
        </Card>
    )
}

export default SendSolana
