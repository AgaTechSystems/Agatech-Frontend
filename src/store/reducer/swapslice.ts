import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TOKEN, SwapInfo, Field, chainData } from "../../../typeing";
import { getRoute } from "@/store/action/swap/swapaction";
import {
  getBalance,
  getMyToken,
  SearchToken,
} from "@/store/action/swap/getbalance";
import { Blockchain } from "@/config/swap";

export const EMPTY_DERIVED_SWAP_INFO: SwapInfo = Object.freeze({
  loading: "idle",
  currencies: {},
  currencyBalances: {},
  // inputTax: new Percent(0),
  // outputTax: new Percent(0),
  // autoSlippage: new Percent(0),
  allowedSlippage: "0.5",
  trade: undefined,
  txTime: "20",
  activeField: Field.INPUT,
  nativePrice: 0,
});

const DEFAULT_INITIAL_STATE = {
  balance: undefined,
  searchToken: undefined,
  loading: "idle",
};

export interface SwapState {
  loading: "idle" | "pending" | "done" | "error";
  balanceload: "idle" | "pending" | "done" | "error";
  swap: SwapInfo;
  tokenListModel: boolean;
  modelType: Field;
  settingModel: boolean;
  [key: number]: chainData | any; // Allow dynamic keys for token balances
}

const initialState: SwapState = {
  loading: "idle",
  balanceload: "idle",
  swap: EMPTY_DERIVED_SWAP_INFO,
  tokenListModel: false,
  modelType: Field.INPUT,
  settingModel: false,
  [Blockchain.Binance_Smart_Chain]: DEFAULT_INITIAL_STATE,
  [Blockchain.Polygon]: DEFAULT_INITIAL_STATE,

};

// Define the slice for pools data and token prices
const Swapslice = createSlice({
  name: "Swapslice",
  initialState,
  reducers: {
    addCurrency: (
      state,
      action: PayloadAction<{ field: Field; currency: TOKEN | undefined }>
    ) => {
      const { field, currency } = action.payload;
      if (currency != undefined) {
        state.swap.currencies[field] = currency;
      }
    },
    toggleTokenListModal: (
      state,
      action: PayloadAction<{ isOpen: boolean; modelType: Field }>
    ) => {
      const { isOpen, modelType } = action.payload;
      state.tokenListModel = isOpen;
      if (state.modelType != modelType) {
        state.modelType = modelType;
      }
    },
    setTransactionSettings: (
      state,
      action: PayloadAction<{ txTime: string; allowedSlippage: string }>
    ) => {
      const { txTime, allowedSlippage } = action.payload;
      state.swap.txTime = txTime;
      state.swap.allowedSlippage = allowedSlippage;
    },
    togglesettingModal: (state, action: PayloadAction<any>) => {
      state.settingModel = !state.settingModel;
    },
    changeActiveField: (state, action: PayloadAction<Field>) => {
      state.swap.activeField = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRoute.pending, (state) => {
      state.swap.loading = "pending";
    });
    builder.addCase(getRoute.fulfilled, (state, action) => {
      state.swap.trade = action.payload.data;
      state.swap.loading = "done";
      state.swap.nativePrice = Number(action.payload.nativePrice);
    });

    builder.addCase(getRoute.rejected, (state, action) => {}),
      builder.addCase(getBalance.pending, (state) => {
        state.balanceload = "pending";
      });
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.swap.currencyBalances[Field.INPUT] = action.payload.inputBalance;
      state.swap.currencyBalances[Field.OUTPUT] = action.payload.outputBalance;
      state.balanceload = "done";
    });
    builder.addCase(getBalance.rejected, (state, action) => {
      state.balanceload = "error";
    }),
      builder.addCase(getMyToken.pending, (state, action) => {
        state.balanceload = "pending";
      });
    builder.addCase(getMyToken.fulfilled, (state, action) => {
      const { chainId, tokens } = action.payload;
      state[chainId] = {
        ...state[chainId],
        balance: tokens,
      };
      state.balanceload = "done";
    });
    builder.addCase(getMyToken.rejected, (state, action) => {
      state.balanceload = "error";
    }),
      builder.addCase(SearchToken.pending, (state, action) => {

        state[action.meta.arg.chainId] = {
          ...state[action.meta.arg.chainId],
          loading: "pending",
        };
      });
    builder.addCase(SearchToken.fulfilled, (state, action) => {
      const { chainId, tokens } = action.payload;
      state[chainId] = {
        ...state[chainId],
        searchToken: tokens,
        loading: "done",
      };
  
    });
    builder.addCase(SearchToken.rejected, (state, action) => {
  
    });
  },
});

export const {
  toggleTokenListModal,
  addCurrency,
  setTransactionSettings,
  togglesettingModal,
  changeActiveField,
} = Swapslice.actions;
export default Swapslice.reducer;
