import { arbitrum, base, bsc, mainnet } from "viem/chains"

export enum ChainId {
  // ETHEREUM = 1,
  BSC = 56,
  ARBITRUM = 42161,
  BASE = 8453,
}

export const ChainInfo = {
  // [ChainId.ETHEREUM]: {
  //   config: mainnet,
  //   icon: "/network/eth.svg",
  // },
  [ChainId.BSC]: {
    config: bsc,
    icon: "/network/bsc.svg",
  },
  [ChainId.ARBITRUM]: {
    config: arbitrum,
    icon: "/network/arb.svg",
  },
  [ChainId.BASE]: {
    config: base,
    icon: "/network/base.svg",
  },
}

export const SUPPORTED_NETWORK = [
  // ChainId.ETHEREUM,
  ChainId.BSC,
  ChainId.ARBITRUM,
  ChainId.BASE,
]

export const EIDS = {
  // [ChainId.ETHEREUM]: 30101,
  [ChainId.BSC]: 30102,
  [ChainId.ARBITRUM]: 30110,
  [ChainId.BASE]: 30184,
}
