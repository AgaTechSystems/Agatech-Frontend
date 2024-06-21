import { useEffect, useMemo } from "react";
import { useAppdispatch } from "@/hooks/redux";
import { getRoute } from "@/store/action/swap/swapaction";
import { TOKEN } from "../../../typeing";
import { TradeType } from "@pancakeswap/sdk";
import { FormatUnit } from "@/utils/contracthelper";
import { getQuote } from "@/utils/swap/bsc/Route";
import { useAccount } from "wagmi";

interface UseGetRouteParams {
  currencies?: {
    INPUT?: TOKEN;
    OUTPUT?: TOKEN;
  };
  swapinputInfo: any; // Adjust the type as needed
  SwapInfo: {
    activeField: string; // Adjust the type as needed
    allowedSlippage:string
  };
  chainID: number;
  debounceData: any;
  address:any
}

const useGetRoute =  ({
  currencies,
  swapinputInfo,
  SwapInfo,
  chainID,
  debounceData,
  address
}: UseGetRouteParams) => {
  const dispatch = useAppdispatch();

  

  useEffect(() => {
    const fetchData = async () => {
      // Define an inner async function
      if (!currencies) return;

      let routePromise: any = null;

      if (SwapInfo.activeField === "INPUT") {
        const token = currencies.INPUT;
        if (!token) return;

        if(Number( swapinputInfo.INPUT.amount) ==0 && Number( swapinputInfo.OUTPUT.amount)) return;

        const inputAmount = await FormatUnit(
          swapinputInfo.INPUT.amount,
          token.decimals
        );

        if (!isNaN(Number(inputAmount)) && isFinite(Number(inputAmount))) {
          const params = {
            chainId: chainID,
            currencyAmount: inputAmount,
            inputCurrency: currencies?.INPUT,
            outputCurrency: currencies?.OUTPUT,
            TradeType: TradeType.EXACT_INPUT,
            user:address,
            allowedSlippage:SwapInfo.allowedSlippage
          };

          routePromise = dispatch(getRoute(params));
        }
      } else {
        const token = currencies.OUTPUT;
        if (!token) return;
        const outputAmount = await FormatUnit(
          swapinputInfo.OUTPUT.amount,
          token.decimals
        );

        if (!isNaN(Number(outputAmount)) && isFinite(Number(outputAmount))) {
          const params = {
            chainId: chainID,
            currencyAmount: outputAmount,
            inputCurrency: currencies.OUTPUT,
            outputCurrency: currencies.INPUT,
            TradeType: TradeType.EXACT_OUTPUT,
            user:address,
            allowedSlippage:SwapInfo.allowedSlippage
          };

          routePromise = dispatch(getRoute(params));
        }
      }

      return () => {
        if (routePromise != null) {
          routePromise.abort();
          console.log("cancel...");
        }
      };
    };

    fetchData(); // Call the inner async function
  }, [currencies, debounceData, SwapInfo.activeField, chainID,SwapInfo.allowedSlippage]);

  const getSwapQuote = async () => {
    if (!currencies) return;
    const token = currencies.INPUT;
    if (!token) return;
    const inputAmount = await FormatUnit(
      swapinputInfo.INPUT.amount,
      token.decimals
    );

    const res:any = await getQuote(
      chainID,
      inputAmount,
      currencies.INPUT,
      currencies.OUTPUT,
      TradeType.EXACT_OUTPUT,
      address,
      SwapInfo.allowedSlippage
      
    );

   return res?.data
    
  };

  return {
    getSwapQuote
  };
};

export default useGetRoute;
