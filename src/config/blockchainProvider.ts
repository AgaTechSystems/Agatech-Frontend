import { createPublicClient, http } from "viem";
import {JsonRpcProvider} from '@ethersproject/providers';

const BSC_NODE ="https://bsc-dataseed1.binance.org"
import { SmartRouter, SmartRouterTrade, SMART_ROUTER_ADDRESSES, SwapRouter } from '@pancakeswap/smart-router'
import { GraphQLClient } from "graphql-request";
import { bsc, bscTestnet, goerli, mainnet } from 'viem/chains'

export const bscClienta:any = createPublicClient({
  chain: bsc,
  transport: http(BSC_NODE),
})

export const ProviderRpc: { [key: number]: string } = {
  1: 'https://eth-mainnet.g.alchemy.com/v2/98rABqQNNFKxptM6OVawc6gynJRl7o4k',
  56:'https://bsc-dataseed1.binance.org',
};

export const SWAP_ROUTER : { [key: number]: string } = {
  56:"0x13f4EA83D0bd40E75C8222255bc855a974568Dd4"
}

export const bscClient:any = new JsonRpcProvider("https://bsc-dataseed1.binance.org");

export const v3SubgraphClient: any = new GraphQLClient(
  "https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-bsc"
);
export const v2SubgraphClient: any = new GraphQLClient(
  "https://proxy-worker-api.pancakeswap.com/bsc-exchange"
);

// @ts-ignore
export const quoteProvider:any = SmartRouter.createQuoteProvider({
  // @ts-ignore
  onChainProvider: () => bscClient,
})



