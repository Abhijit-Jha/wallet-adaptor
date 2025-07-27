"use client"

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { Loader2, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import TokenCard from "./Tokens"


interface TokenInfo {
  mint: string
  amount: string
  decimals: number
}

const TokenMetadata = () => {
  const { connection } = useConnection()
  const { publicKey, connected } = useWallet()
  const { setVisible } = useWalletModal()
  const [tokenInfo, setTokenInfo] = useState<TokenInfo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!publicKey || !connected) {
      setTokenInfo([])
      return
    }

    async function getTokensOfOwner() {
      if (!publicKey) return

      setLoading(true)
      setError("")

      try {
        const accounts = await connection.getParsedTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID })

        const tokenList = accounts.value
          .map((acc) => {
            const parsed = acc.account.data.parsed.info
            return {
              mint: parsed.mint,
              amount: parsed.tokenAmount.amount,
              decimals: parsed.tokenAmount.decimals,
            }
          })
          .filter((token) => Number(token.amount) > 0) // Filter out zero balance tokens

        setTokenInfo(tokenList)
      } catch (err: any) {
        console.error("Error fetching token accounts:", err)
        setError(`Failed to fetch tokens: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    getTokensOfOwner()
  }, [connection, publicKey, connected])

  const handleConnectWallet = () => {
    setVisible(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">🪙 Your Token Portfolio</CardTitle>
        <CardDescription className="text-gray-400">
          View all tokens in your connected wallet with their current balances.
        </CardDescription>
        <CardAction>4</CardAction>
      </CardHeader>

      <CardContent className="space-y-4">
        {!connected ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Wallet className="w-12 h-12 text-gray-400" />
            <p className="text-gray-500 text-center">Connect your wallet to view your tokens</p>
            <Button onClick={handleConnectWallet} className="mt-4">
              Connect Wallet
            </Button>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-8 space-x-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-gray-500">Loading tokens...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400 text-sm">{error}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 bg-transparent"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        ) : tokenInfo.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No tokens found in your wallet.</p>
            <p className="text-gray-400 text-sm mt-1">Your wallet appears to be empty or contains only SOL.</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {tokenInfo.map((token, index) => (
              <TokenCard
                key={`${token.mint}-${index}`}
                tokenAddr={token.mint}
                tokenAmount={token.amount}
                decimals={token.decimals}
              />
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="text-sm text-gray-500 justify-center">
        {connected && tokenInfo.length > 0 && (
          <>
            Showing {tokenInfo.length} token{tokenInfo.length !== 1 ? "s" : ""} with positive balances.
          </>
        )}
        {connected && tokenInfo.length === 0 && !loading && !error && (
          <>Only tokens with positive balances are displayed.</>
        )}
      </CardFooter>
    </Card>
  )
}

export default TokenMetadata
