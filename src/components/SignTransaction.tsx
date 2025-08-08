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
import { ed25519 } from '@noble/curves/ed25519';
import { Button } from "./ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "./ui/input";

const SignTransaction = () => {
    const { publicKey, signMessage, connected } = useWallet();
    const { setVisible } = useWalletModal();
    const [signature, setSignature] = useState<Uint8Array>();
    const [message, setMessage] = useState<string>();

    const handleTransaction = async () => {
        if (!publicKey || !signMessage || !connected) {
            setVisible(true);
            return;
        }

        const msg = new TextEncoder().encode(message);

        try {
            const sig = await signMessage(msg);
            setSignature(sig);
            toast.success("Message signed!");
        } catch {
            toast.error("Signing failed.");
        }
    };

    const verifySignature = async () => {
        if (!publicKey || !signature || !message) {
            toast.error("Missing public key, message or signature");
            return;
        }

        try {
            const isValid = ed25519.verify(signature, new TextEncoder().encode(message), publicKey.toBytes());

            if (!isValid) {
                throw new Error("Message signature invalid!");
            }

            toast.success("Signature verified successfully!");
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Verification failed");
            }
        }

    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Sign message</CardTitle>
                <CardDescription className="text-gray-400">
                    This demonstrates Solana wallet message signing and verification.
                </CardDescription>
                <CardAction >2</CardAction>
            </CardHeader>

            <CardContent className="space-y-4">
                <>
                    <Input
                        placeholder="Enter Your message"
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </>
                <Button onClick={handleTransaction} disabled={!message}>
                    Sign A Message
                </Button>

                <Button variant="secondary" onClick={verifySignature}>
                    Verify Signature
                </Button>
            </CardContent>

            <CardFooter className="text-sm text-gray-500 justify-center">
                You’ll need a connected wallet. Only works on <strong className="ml-1">Devnet</strong>.
            </CardFooter>
        </Card>
    );
};

export default SignTransaction;
