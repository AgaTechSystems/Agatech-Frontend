import {TOKEN} from "../../../../typeing"
import { SmartRouter } from "@pancakeswap/smart-router";
import {getCandidatePools} from "./poolget";
import {QUOTING_API} from "../../../config/network"
import {parseToken} from "./Swap"
import AGAService from "@/service/globalservice"
import axios from 'axios'

export const RouteTrade = async (
    chainId: number,
    currencyAmount: number,
    inputCurrency: TOKEN | undefined,
    outputCurrency: TOKEN | undefined,
    TradeType:any,
    source:any
  
  ) => {
    if (!inputCurrency || !outputCurrency) {
      console.error("Input or output currency is undefined");
      return;
    }
  
    const A = parseToken(inputCurrency, chainId);
    const B = parseToken(outputCurrency, chainId);
  
    try {
      const pools: any = await getCandidatePools({
        currencyA: A,
        currencyB: B,
        chainId: chainId,
      });
  
      const data = {
        currencyAmount: currencyAmount,
        tradeType: TradeType,
        currency: {
          INPUT: inputCurrency,
          OUTPUT: outputCurrency,
        },
        pools: pools.map(SmartRouter.Transformer.serializePool),
      };


      const res = await AGAService.routeswap(data,source)
      const serializedRes = res.data;

      return serializedRes.route;
    } catch (error) {
      console.error("Error in Route:", error);
    
    }
  };
  
  // Example usage
  // const res = await Route(56, 10000, currencies.INPUT
  