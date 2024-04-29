import { createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { RouteTrade } from "@/utils/swap/bsc/Route";
import { TOKEN } from "../../../../typeing";
import { TradeType } from "@pancakeswap/sdk";
import axios from "axios";

interface GetRouteParams {
  chainId: number;
  currencyAmount: number;
  inputCurrency: TOKEN | undefined;
  outputCurrency: TOKEN | undefined;
  TradeType: TradeType;
}

// Create async thunk with explicit types
const getRoute = createAsyncThunk(
  "getRoute",
  async (params: GetRouteParams, { dispatch, rejectWithValue, signal }) => {
    try {
      if (signal.aborted) {
        throw new Error('stop the work, this has been aborted!');
      }
      
      // Attach the signal to the input parameters
      const paramsWithAbortSignal = {
        ...params,
      };
      
      const trade = await RouteTrade(
        params.chainId,
        params.currencyAmount,
        params.inputCurrency,
        params.outputCurrency,
        params.TradeType,
        []
      );

      return trade;
    } catch (error) {
      return rejectWithValue("Request aborted");
    }
  }
);

export { getRoute }; // Exporting the action creator
