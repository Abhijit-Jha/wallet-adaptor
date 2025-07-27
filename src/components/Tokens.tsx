"use client"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface TokenCardProps {
  tokenAddr: string
  tokenAmount: string
  decimals: number
  tokenName?: string
}

const TokenCard = ({ tokenAddr, tokenAmount, decimals, tokenName = "Unknown Token" }: TokenCardProps) => {
  const humanAmount = Number(tokenAmount) / Math.pow(10, decimals)
  const truncatedAddr = `${tokenAddr.slice(0, 6)}...${tokenAddr.slice(-4)}`

  const handleViewOnSolscan = () => {
    window.open(`https://solscan.io/token/${tokenAddr}`, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="flex items-center space-x-3">
        {/* Token Avatar */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-medium">
          {tokenAddr.slice(0, 2).toUpperCase()}
        </div>

        {/* Token Info */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-900">{tokenName}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-sm text-gray-500">
            <span>{humanAmount.toLocaleString()}</span>
            <span className="hidden sm:inline">•</span>
            <span className="font-mono">{truncatedAddr}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleViewOnSolscan}
        className="flex items-center space-x-1 hover:bg-gray-50 bg-transparent"
      >
        <span className="hidden sm:inline">View on Solscan</span>
        <span className="sm:hidden">View</span>
        <ExternalLink className="w-3 h-3" />
      </Button>
    </div>
  )
}

export default TokenCard
