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
import { viemProviders, v3SubgraphClients } from "./provider";
import { bsc, bscTestnet, goerli, mainnet } from "viem/chains";
const { parseCurrency, parseCurrencyAmount, parsePool, serializeTrade } =
  SmartRouter.Transformer;

interface GetCandidatePoolsParams {
  currencyA: any; // Adjust the type according to your needs
  currencyB: any; // Adjust the type according to your needs
  chainId: number;
}

export const getCandidatePools = async ({
  currencyA,
  currencyB,
  chainId,
}: GetCandidatePoolsParams) => {
  try {
    const pairs = SmartRouter.getPairCombinations(currencyA, currencyB);

    const v2Subgraph:any = new GraphQLClient(
      "https://proxy-worker-api.pancakeswap.com/bsc-exchange"
    );

    const quoteProvider = SmartRouter.createQuoteProvider({
      onChainProvider: () => viemProviders({ chainId }),
    });

    const [v2Pools, v3Pools] = await Promise.all([
      SmartRouter.getV2CandidatePools({
        pairs,
        onChainProvider: () => viemProviders({ chainId }),
        v2SubgraphProvider: () => v2Subgraph,
        v3SubgraphProvider: () => v3SubgraphClients({ chainId }),
        currencyA,
        currencyB,
      }).catch((error) => {
        console.error("Error in getV2CandidatePools:", error);
        throw error; // Rethrow the error to propagate it to the Promise.all catch block
      }),
      SmartRouter.getV3CandidatePools({
        pairs,
        onChainProvider: () => viemProviders({ chainId }),
        subgraphProvider: () => v3SubgraphClients({ chainId }),
        currencyA,
        currencyB,
        // subgraphCacheFallback: false,
      }).catch((error) => {
        console.error("Error in getV3CandidatePools:", error);
        throw error; // Rethrow the error to propagate it to the Promise.all catch block
      }),
    ]);

    const candidatePools = [...v2Pools, ...v3Pools];
    // const pools = candidatePools.map((pool) => parsePool(chainId, pool as any))



    return candidatePools;
  } catch (error) {
    console.error("Error fetching candidate pools:", error);
    throw error;
  }
};
