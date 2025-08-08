"use client"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { toast } from "sonner";

const AirDrop = () => {
    const [airDropAmount, setAirDropAmount] = useState(0);
    const { publicKey, connected } = useWallet();
    const { setVisible } = useWalletModal();
    const [error, setError] = useState("");

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setAirDropAmount(value);

        if (value > 10) {
            setError("Be in your limits! Max 10 SOL.");
        } else if (value < 0) {
            setError("Amount can't be negative.");
        } else {
            setError("");
        }
    };

    const handleAirDrop = async () => {
        if (!connected || !publicKey) {
            setVisible(true);
            return;
        }

        try {
            const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
            const sig = await connection.requestAirdrop(publicKey, airDropAmount * 10 ** 9);
            toast.success(`Airdrop successful! Txn Signature: ${sig}`);
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(`Airdrop failed: ${err.message}`);
            } else {
                toast.error(`Airdrop failed: ${String(err)}`);
            }
        }

    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">💸 Get Free Devnet SOL</CardTitle>
                <CardDescription className="text-gray-400">
                    Devnet SOL is just for testing — it has no real-world value.
                </CardDescription>
                <CardAction />
            </CardHeader>

            <CardContent className="space-y-4">
                <Input
                    type="number"
                    placeholder="Amount (e.g. 1 SOL)"
                    onChange={handleAmountChange}
                    className="mb-1"
                />
                <p className="text-red-400 text-xs pl-2">{error}</p>
                <Button onClick={handleAirDrop}>
                    Airdrop Now
                </Button>
            </CardContent>

            <CardFooter className="text-sm text-gray-500 justify-center">
                You’ll need a connected wallet. Only works on <strong className="ml-1">Devnet</strong>.
            </CardFooter>
        </Card>
    );
};

export default AirDrop;
