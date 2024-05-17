export const swap_tab = [
  {
    name: "swap",
  },
  {
    name: "buy",
  },
];

export const AFFILIATE_FEE = 0.01; // Percentage of the buyAmount that should be attributed to feeRecipient as affiliate fees
export const FEE_RECIPIENT = "0x2F7dcB15C515ae851B98B54b498d562e852d513B"; // The ETH address that should receive affiliate fees

export enum Blockchain {
  Ethereum_Mainnet = 1,
  Ethereum_Sepolia = 2,
  Arbitrum = 42161,
  Avalanche = 43114,
  Base = 8453,
  Binance_Smart_Chain = 56,
  Celo = 42220,
  Fantom = 250,
  Optimism = 10,
  Polygon = 137,
}

export const CHAINNAME: { [key: number]: string } = {
  [Blockchain.Ethereum_Mainnet]: "ethereum",
  [Blockchain.Ethereum_Sepolia]: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
  [Blockchain.Arbitrum]: "arbitrum",
  [Blockchain.Avalanche]: "avalanche",
  [Blockchain.Base]: "base",
  [Blockchain.Binance_Smart_Chain]: "bsc",
  [Blockchain.Celo]: "celo",
  [Blockchain.Fantom]: "fantom",
  [Blockchain.Optimism]: "optimism",
  [Blockchain.Polygon]: "polygon",
};
export const NATIVE_PRICE_ADDRESS: { [key: number]: string } = {
  [Blockchain.Ethereum_Mainnet]: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
  [Blockchain.Ethereum_Sepolia]: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
  [Blockchain.Arbitrum]: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
  [Blockchain.Avalanche]: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
  [Blockchain.Base]: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
  [Blockchain.Binance_Smart_Chain]:
    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  [Blockchain.Celo]: "0x471ece3750da237f93b8e339c536989b8978a438",
  [Blockchain.Fantom]: "0x4e15361fd6b4bb609fa63c81a2be19d873717870",
  [Blockchain.Optimism]: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
  [Blockchain.Polygon]: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
};
export const SWAP_ENDPOINT: { [key: number]: string } = {
  [Blockchain.Ethereum_Mainnet]: "https://api.0x.org/",
  [Blockchain.Ethereum_Sepolia]: "https://sepolia.api.0x.org/",
  [Blockchain.Arbitrum]: "https://arbitrum.api.0x.org/",
  [Blockchain.Avalanche]: "https://avalanche.api.0x.org/",
  [Blockchain.Base]: "https://base.api.0x.org/",
  [Blockchain.Binance_Smart_Chain]: "https://bsc.api.0x.org/",
  [Blockchain.Celo]: "https://celo.api.0x.org/",
  [Blockchain.Fantom]: "https://fantom.api.0x.org/",
  [Blockchain.Optimism]: "https://optimism.api.0x.org/",
  [Blockchain.Polygon]: "https://polygon.api.0x.org/",
};

export const PRICE_ENDPOINT: { [key: number]: string } = {
  [Blockchain.Ethereum_Mainnet]: "https://api.0x.org/",
  [Blockchain.Ethereum_Sepolia]: "https://sepolia.api.0x.org/",
  [Blockchain.Arbitrum]: "https://arbitrum.api.0x.org/",
  [Blockchain.Avalanche]: "https://avalanche.api.0x.org/",
  [Blockchain.Base]: "https://base.api.0x.org/",
  [Blockchain.Binance_Smart_Chain]: "https://bsc.api.0x.org/",
  [Blockchain.Celo]: "https://celo.api.0x.org/",
  [Blockchain.Fantom]: "https://fantom.api.0x.org/",
  [Blockchain.Optimism]: "https://optimism.api.0x.org/",
  [Blockchain.Polygon]: "https://polygon.api.0x.org/",
};

export const Exchange_CONTRACT: { [key: number]: string } = {
  [Blockchain.Ethereum_Mainnet]: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
  [Blockchain.Ethereum_Sepolia]: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
  [Blockchain.Arbitrum]: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
  [Blockchain.Avalanche]: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
  [Blockchain.Base]: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
  [Blockchain.Binance_Smart_Chain]:
    "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
  [Blockchain.Celo]: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
  [Blockchain.Fantom]: "0xdef189deaef76e379df891899eb5a00a94cbc250",
  [Blockchain.Optimism]: "0xdef1abe32c034e558cdd535791643c58a13acc10",
  [Blockchain.Polygon]: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
};
