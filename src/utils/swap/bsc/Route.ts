import { TOKEN } from "../../../../typeing";
import { SmartRouter } from "@pancakeswap/smart-router";
import AGAService from "@/service/globalservice";
import axios from "axios";
const Nativeaddress=""
export const RouteTrade = async (
  chainId: number,
  currencyAmount: string,
  inputCurrency: TOKEN | undefined,
  outputCurrency: TOKEN | undefined,
  TradeType: any,
  address: any,
  allowedSlippage: string
) => {
  if (!inputCurrency || !outputCurrency) {
    console.error("Input or output currency is undefined");
    return;
  }

  console.log(allowedSlippage, "Number(slippagePercentage)/100");
//0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
  try {
    const param = {
      sellToken: inputCurrency.isNative ? "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee":inputCurrency.address,
      buyToken:  outputCurrency.isNative ? "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee":outputCurrency.address   ,
      sellAmount: currencyAmount,
      chainId: chainId,
      takerAddress: address,
      feeRecipient: "0x2F7dcB15C515ae851B98B54b498d562e852d513B",
      skipValidation: false,
      buyTokenPercentageFee: "0.001",
      slippagePercentage: Number(allowedSlippage) / 100,
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
  slippagePercentage: string
) => {
  if (!inputCurrency || !outputCurrency) {
    console.error("Input or output currency is undefined");
    return;
  }

  try {
    const param = {
      sellToken: inputCurrency.isNative ? "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee":inputCurrency.address,
      buyToken:  outputCurrency.isNative ? "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee":outputCurrency.address   ,
      sellAmount: currencyAmount,
      chainId: chainId,
      takerAddress: address,
      feeRecipient: "0x2F7dcB15C515ae851B98B54b498d562e852d513B",
      skipValidation: false,
      slippagePercentage: Number(slippagePercentage) / 100,
      buyTokenPercentageFee: "0.001",
    };

    const res = await AGAService.quoteswap(param);

    return res.data;
  } catch {}
};

// Example usage
// const res = await Route(56, 10000, currencies.INPUT
