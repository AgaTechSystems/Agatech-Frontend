import { TOKEN } from "../../../../typeing";
import { SmartRouter } from "@pancakeswap/smart-router";
import AGAService from "@/service/globalservice";
import axios from "axios";

export const RouteTrade = async (
  chainId: number,
  currencyAmount: string,
  inputCurrency: TOKEN | undefined,
  outputCurrency: TOKEN | undefined,
  TradeType: any,
  address: any
) => {
  if (!inputCurrency || !outputCurrency) {
    console.error("Input or output currency is undefined");
    return;
  }

  try {
    const param = {
      sellToken: inputCurrency.address,
      buyToken: outputCurrency.address,
      sellAmount: currencyAmount,
      chainId: chainId,
      takerAddress: address,
      feeRecipient: "0xb427e47e8fdd678278d2a91eeac014ffcddaf029",
      skipValidation: false,
    };

    const res = await AGAService.routeswap(param);

    return res.data;
  } catch (error) {
    console.error("Error in Route:", error);
  }
};

export const getQuote = async (
  chainId: number,
  currencyAmount: string,
  inputCurrency: TOKEN | undefined,
  outputCurrency: TOKEN | undefined,
  TradeType: any,
  address: any,
  slippagePercentage:string
) => {
  if (!inputCurrency || !outputCurrency) {
    console.error("Input or output currency is undefined");
    return;
  }

  try {
    const param = {
      sellToken: inputCurrency.address,
      buyToken: outputCurrency.address,
      sellAmount: currencyAmount,
      chainId: chainId,
      takerAddress: address,
      feeRecipient: "0xb427e47e8fdd678278d2a91eeac014ffcddaf029",
      skipValidation: false,
      slippagePercentage:Number(slippagePercentage)/100
    };

    const res = await AGAService.quoteswap(param);
    console.log(res,"res");
    
   return res.data;
  } catch {}
};

// Example usage
// const res = await Route(56, 10000, currencies.INPUT
