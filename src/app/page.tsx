"use client";
import AirDrop from "@/components/AirDrop";
import Metadata from "@/components/Metadata";
import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";
import SendSolana from "@/components/SendSolana";
import SignTransaction from "@/components/SignTransaction";
import { useWalletModal, WalletModal } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  const { visible } = useWalletModal();

  return (
    <>
      <main className="min-h-screen">
        <Navbar />
        {visible && <WalletModal />}
        <section className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Features:</h2>
          <AirDrop />
          <SignTransaction />
          <SendSolana/>
          <Metadata/>
        </section>
      </main>
    </>
  );
}
