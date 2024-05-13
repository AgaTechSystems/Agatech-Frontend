import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TOKEN, SwapInfo, Field } from "../../../typeing";
import {getRoute} from "@/store/action/swap/swapaction";
import {getBalance} from "@/store/action/swap/getbalance";


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
  activeField:Field.INPUT,
  nativePrice:0
});

export interface SwapState {
  loading: "idle" | "pending" | "done" | "error";
  balanceload: "idle" | "pending" | "done" | "error";
  swap: SwapInfo;
  tokenListModel: boolean;
  modelType: Field;
  settingModel:boolean,
}

const initialState: SwapState = {
  loading: "idle",
  balanceload:'idle',
  swap: EMPTY_DERIVED_SWAP_INFO,
  tokenListModel: false,
  modelType: Field.INPUT,
  settingModel:false
};

// Define the slice for pools data and token prices
const Swapslice = createSlice({
  name: "Poolslice",
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
    togglesettingModal: (
      state,
      action: PayloadAction<any>
    ) => {
      state.settingModel = !state.settingModel;

    },
    changeActiveField: (state, action: PayloadAction<Field>) => {
      state.swap.activeField = action.payload;
    },
    
  },
  extraReducers: (builder) => {
   
    builder.addCase(getRoute.pending, (state) => {
      // Handle the pending state if needed
      state.swap.loading = "pending"
    });
    builder.addCase(getRoute.fulfilled, (state, action) => {
      console.log(action.payload,"action.payload");
    
      state.swap.trade = action.payload.data;
      state.swap.loading = 'done';
      state.swap.nativePrice = Number(action.payload.nativePrice);
  
    });

    builder.addCase(getRoute.rejected, (state, action) => {
 
    }),
    builder.addCase(getBalance.pending, (state) => {
      state.balanceload = 'pending'
    });
    builder.addCase(getBalance.fulfilled, (state, action) => {
    
 

    state.swap.currencyBalances[Field.INPUT] = action.payload.inputBalance;
    state.swap.currencyBalances[Field.OUTPUT] = action.payload.outputBalance;
    state.balanceload = "done";

    
    });
    builder.addCase(getBalance.rejected, (state, action) => {
      state.balanceload = 'error'
    });
  },
});

export const { toggleTokenListModal, addCurrency,setTransactionSettings,togglesettingModal,changeActiveField } =
  Swapslice.actions;
export default Swapslice.reducer;
