import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
interface walletState {
  account: string | undefined;
  chainId: number;
}

const initialState: walletState = {
  account: undefined,
  chainId: 56,
};

// Define the slice for pools data and token prices
const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setNetwork: (state, action) => {
      state.chainId = action.payload.chainId;
    },
  },
  extraReducers: (builder) => {},
});

export const { setNetwork } = walletSlice.actions;
export default walletSlice.reducer;
