import React from 'react';
import ConnectWallet from './ConnectWallet';
import ShowBalance from './ShowBalance';

const Navbar = () => {
    return (
        <nav className="w-full px-6 py-4 flex justify-between items-center shadow-md">
            <h1 className="text-xl font-bold tracking-wide ">
                Wallet Adapter
            </h1>
            {/* TODO - Add balance here*/}
            <div className='flex gap-5'>
                <ShowBalance />
                <ConnectWallet />
            </div>
        </nav>
    );
};

export default Navbar;
