"use client"
import React, { ReactNode } from "react"

import {
  arbitrum,
  avalanche,
  bsc,
  fantom,
  gnosis,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
  pulsechain,
  bscTestnet,
  base,
  harmonyOne,
  celo,
  klaytn,
  metis,
  kava,
  coreDao,
  linea,
  mantle,
} from "wagmi/chains"
import { createWeb3Modal } from "@web3modal/wagmi/react"
import {} from "@web3modal/wagmi/react"
export const chains = [
  bsc,
  arbitrum,
  base,
  avalanche,
  polygon,
  optimism,
  fantom,
  harmonyOne,
  celo,
  gnosis,
  klaytn,
  metis,
  kava,
  mainnet,
  coreDao,
  linea,
  mantle,
] as const
import { WagmiProvider } from "wagmi"
import { defaultWagmiConfig } from "@web3modal/wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || ""
interface Web3ModalProps {
  children: ReactNode
}
const metadata = {
  name: "WTE",
  description: "WTE",
  url: "",
  icons: [""],
}

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

const queryClient = new QueryClient()

createWeb3Modal({ wagmiConfig, projectId, enableAnalytics: true })

export function Web3Modal({ children }: Web3ModalProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
