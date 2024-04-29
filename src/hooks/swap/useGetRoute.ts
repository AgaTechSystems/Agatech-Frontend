import { useEffect, useMemo } from "react";
import { useAppdispatch } from "@/hooks/redux";
import { getRoute } from "@/store/action/swap/swapaction";
import { TOKEN } from "../../../typeing";
import { TradeType } from "@pancakeswap/sdk";
interface UseGetRouteParams {
  currencies?: {
    INPUT?: TOKEN;
    OUTPUT?: TOKEN;
  };
  swapinputInfo: any; // Adjust the type as needed
  SwapInfo: {
    activeField: string; // Adjust the type as needed
  };
  chainID: number;
  debounceData: any;
}

const useGetRoute = ({
  currencies,
  swapinputInfo,
  SwapInfo,
  chainID,
  debounceData,
}: UseGetRouteParams) => {
  const dispatch = useAppdispatch();

  useEffect(() => {
    if (!currencies) return;

    let routePromise: any = null;

    if (SwapInfo.activeField === "INPUT") {
      const token = currencies.INPUT;
      if (!token) return;
      const inputAmount =
        Number(swapinputInfo.INPUT.amount) * 10 ** token.decimals;
      // Check if inputAmount is a valid number
      if (!isNaN(inputAmount) && isFinite(inputAmount)) {
        const params = {
          chainId: chainID,
          currencyAmount: inputAmount,
          inputCurrency: currencies?.INPUT,
          outputCurrency: currencies?.OUTPUT,
          TradeType: TradeType.EXACT_INPUT,
        };
       
        routePromise = dispatch(getRoute(params));
      }
    } else {
      const token = currencies.OUTPUT;
      if (!token) return;
      const outputAmount =
        Number(swapinputInfo.OUTPUT.amount) * 10 ** token.decimals;
      console.log(!isNaN(outputAmount));

      // Check if outputAmount is a valid number
      if (!isNaN(outputAmount) && isFinite(outputAmount)) {
        const params = {
          chainId: chainID,
          currencyAmount: outputAmount,
          inputCurrency: currencies.OUTPUT,
          outputCurrency: currencies.INPUT,
          TradeType: TradeType.EXACT_OUTPUT,
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
  }, [currencies, debounceData, SwapInfo.activeField, chainID]);

  return {
    // Add other values you might want to expose
  };
};

export default useGetRoute;
