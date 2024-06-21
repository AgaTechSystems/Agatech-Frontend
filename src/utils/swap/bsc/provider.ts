import { GraphQLClient } from "graphql-request";
import {
  Native,
  ChainId,
  CurrencyAmount,
  Token,
  Trade,
  TradeType,
  Percent,
  computePriceImpact,
  Route,
  Pair,
} from "@pancakeswap/sdk";
import { createPublicClient, hexToBigInt, http } from "viem";
import {
  SmartRouter,
  SmartRouterTrade,
  SMART_ROUTER_ADDRESSES,
  SwapRouter,
} from "@pancakeswap/smart-router";
import { bsc, bscTestnet, goerli, mainnet } from "viem/chains";



const publicClient: any = createPublicClient({
    chain: bsc,
    transport: http("https://bsc-dataseed1.binance.org"),
    batch: {
      multicall: {
        batchSize: 1024 * 200,
      },
    },
  });
  
  export const viemProviders = ({ chainId }: { chainId?: ChainId }) => {
    switch (chainId) {
      case ChainId.ETHEREUM:
        return publicClient;
      case ChainId.BSC:
        return publicClient;
      default:
        return publicClient;
    }
  };


export const v3SubgraphClients:any = {
    [ChainId.BSC]: new GraphQLClient(
      "https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-bsc",
      { fetch }
    ),
  } as const;

