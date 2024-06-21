import { NextApiRequest, NextApiResponse } from 'next';
// swap import
import {
    SmartRouter,
    SmartRouterTrade,
    SMART_ROUTER_ADDRESSES,
    SwapRouter,
  } from "@pancakeswap/smart-router";
  const {
    parseCurrency,
    parseCurrencyAmount,
    parsePool,
    serializeTrade,
    parseTrade,
    parseRoute,
  } = SmartRouter.Transformer;
  import {
    Native,
    ChainId,
    CurrencyAmount,
    Token,
    Trade,
    TradeType,
  } from "@pancakeswap/sdk";

  import {
    v3SubgraphClient,
    v2SubgraphClient,
    bscClient,
    quoteProvider,
  } from "../../config/blockchainProvider";
  import { parseToken } from "@/utils/swap/backend";
export default async (req: any, res: NextApiResponse) => {
    try {

      const { currencyAmount, tradeType, currency, pools } = req.body;
      const chainId = 56;
    
    const tradeTypes = (tradeType as TradeType) || TradeType.EXACT_INPUT;

    const currencyAIsnative = currency.INPUT.isNative;
    const currencyBIsnative = currency.OUTPUT.isNative;

    const currencyA = currencyAIsnative
      ? Native.onChain(chainId)
      : parseToken(currency.INPUT, chainId);
    const currencyB = currencyBIsnative
      ? Native.onChain(chainId)
      : parseToken(currency.OUTPUT, chainId);

    const amount = CurrencyAmount.fromRawAmount(currencyA, currencyAmount);

    const candidatePools = pools.map((pool: any) =>
      parsePool(chainId, pool as any)
    );

    const getTrade = async () => {
      const trade = await SmartRouter.getBestTrade(
        amount,
        currencyB,
        tradeTypes,
        {
          gasPriceWei: () => bscClient.getGasPrice(),
          maxHops: 5,
          maxSplits: 5,
          poolProvider: SmartRouter.createStaticPoolProvider(candidatePools),
          quoteProvider,
          quoterOptimization: false,
        }
      );

      if (!trade) {
        throw new Error("No valid trade");
      }

      return trade;
    };

    const response = await getTrade();
    
      // Response
      res.status(200).json({
        success: true,
        message: "Trade found",
        route: serializeTrade(response),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
      });
    }
  };