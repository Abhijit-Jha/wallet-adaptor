import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react';

const ShowBalance = () => {
    const [balance, setBalance] = useState(0);
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    useEffect(() => {
        setBalance(0)
        if (!publicKey) return;

        const getBalance = async () => {
            const bal = await connection.getBalance(publicKey);
            setBalance(bal);
        };

        getBalance();
    }, [connection, publicKey]);

    return (
        <div className='w-22 border-2 border-black rounded px-2 py-1'>
            {`${(balance / 1e9).toFixed(2)} SOL`}
        </div>
    );
};

export default ShowBalance;
