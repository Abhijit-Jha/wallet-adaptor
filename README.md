# Solana Wallet Adapter for Next.js

This project is a comprehensive Solana wallet adapter built with Next.js, providing a seamless user experience for interacting with the Solana blockchain. It includes essential features for wallet management, token operations, and transaction handling, all within a modern and responsive user interface.

## Features

This application comes with a variety of features that demonstrate the core functionalities of the Solana wallet adapter.

### 1. Wallet Connectivity

- **Connect and Disconnect:** Users can easily connect their Solana wallets (like Phantom, Solflare, etc.) using a dedicated "Connect Wallet" button. The application's state updates dynamically based on the wallet's connection status, and the user's public key is displayed upon successful connection.

### 2. Balance Inquiry

- **Real-time Balance Display:** Once a wallet is connected, the application fetches and displays the user's current SOL balance. This feature provides immediate feedback to the user about their available funds.

### 3. SOL Transfers

- **Send SOL:** Users can send SOL to any Solana address. The interface includes fields for the recipient's address and the amount to be sent, with clear confirmation and error notifications.

### 4. Testnet SOL Airdrop

- **Airdrop Functionality:** For development and testing purposes, users can airdrop test SOL to their connected wallet address. This is particularly useful when working on devnet or testnet.

### 5. Transaction Signing

- **Sign Transactions:** The application includes a feature to sign a test transaction. This demonstrates how to create and sign transactions on the client-side, a fundamental aspect of dApp development.

### 6. Token Display

- **View Tokens:** The application can display a list of SPL (Solana Program Library) tokens held by the connected wallet. This feature is essential for any application that deals with fungible or non-fungible tokens.

### 7. Wallet Metadata

- **Display Wallet Info:** Users can view metadata associated with their connected wallet, such as the wallet's public key.

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

2.  **Open your browser:**
    Navigate to `http://localhost:3000` to see the application in action.

## Technologies Used

- **Next.js:** A React framework for building server-side rendered and static web applications.
- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **Solana Web3.js:** The Solana JavaScript API for interacting with the Solana JSON RPC API and Solana runtime.
- **Solana Wallet Adapter:** A set of React components and hooks for integrating Solana wallets into a React application.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **shadcn/ui:** A collection of re-usable UI components.