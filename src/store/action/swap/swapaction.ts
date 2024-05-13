import { createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { RouteTrade } from "@/utils/swap/bsc/Route";
import { TOKEN } from "../../../../typeing";
import { TradeType } from "@pancakeswap/sdk";
import axios from "axios";

interface GetRouteParams {
  chainId: number;
  currencyAmount: string;
  inputCurrency: TOKEN | undefined;
  outputCurrency: TOKEN | undefined;
  TradeType: TradeType;
  user:any
}

// Create async thunk with explicit types
const getRoute = createAsyncThunk(
  "getRoute",
  async (params: GetRouteParams, { dispatch, rejectWithValue, signal }) => {
    try {
      if (signal.aborted) {
        throw new Error('stop the work, this has been aborted!');
      }
    
      const trade = await RouteTrade(
        params.chainId,
        params.currencyAmount,
        params.inputCurrency,
        params.outputCurrency,
        params.TradeType,
        params.user
      );

      return trade;
    } catch (error) {
      return rejectWithValue("Request aborted");
    }
  }
);

export { getRoute }; // Exporting the action creator
