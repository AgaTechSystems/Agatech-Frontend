import {
  arbitrum,
  avalanche,
  base,
  bsc,
  fantom,
  mainnet,
  optimism,
  polygon,
} from "viem/chains"

export enum ChainId {
  // ETHEREUM = 1,
  BSC = 56,
  ARBITRUM = 42161,
  BASE = 8453,
  AVAX = 43114,
  POLYGON = 137,
  OPTIMISM = 10,
  FANTOM = 250,
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
  [ChainId.AVAX]: {
    config: avalanche,
    icon: "/network/avax.svg",
  },
  [ChainId.POLYGON]: {
    config: polygon,
    icon: "/network/polygon.svg",
  },
  [ChainId.OPTIMISM]: {
    config: optimism,
    icon: "/network/optimism.svg",
  },
  [ChainId.FANTOM]: {
    config: fantom,
    icon: "/network/fantom.svg",
  },
}

export const SUPPORTED_NETWORK = [
  // ChainId.ETHEREUM,
  ChainId.BSC,
  ChainId.ARBITRUM,
  ChainId.BASE,
  ChainId.AVAX,
  ChainId.POLYGON,
  ChainId.OPTIMISM,
  ChainId.FANTOM,
]

export const EIDS: { [chain in ChainId]: number } = {
  // [ChainId.ETHEREUM]: 30101,
  [ChainId.BSC]: 30102,
  [ChainId.ARBITRUM]: 30110,
  [ChainId.BASE]: 30184,
  [ChainId.AVAX]: 30106,
  [ChainId.POLYGON]: 30109,
  [ChainId.OPTIMISM]: 30111,
  [ChainId.FANTOM]: 30112,
}
