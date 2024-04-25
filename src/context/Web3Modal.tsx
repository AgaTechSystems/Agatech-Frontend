"use client";
import React, { ReactNode } from 'react';

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
    bscTestnet
  } from "wagmi/chains";
  import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
  export const chains = [bsc];
  import { WagmiConfig } from "wagmi";
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";
interface Web3ModalProps {
    children: ReactNode;
  }
const metadata = {
    name: "WTE",
    description: "WTE",
    url: "",
    icons: [""],
  };
  
  const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
  
  createWeb3Modal({ wagmiConfig, projectId, chains });


  export function Web3Modal({ children }: Web3ModalProps) {
    return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
  }