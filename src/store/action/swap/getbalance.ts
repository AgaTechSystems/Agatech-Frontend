import { createAsyncThunk } from "@reduxjs/toolkit";
import { TOKEN } from "../../../../typeing";
import {
  getTokeninstanceBysigner,
  ConvertEthTonormal,
} from "@/utils/contracthelper";
import globalService from "@/service/globalservice";
import { getUserTokenbalance, TOKEN_SEARCH } from "@/service/Tokenservice";

import { ethers } from "ethers";
import { RPC_CLIENT } from "../../../config/network";
import axios from "axios";
export const getBalance = createAsyncThunk(
  "getBalance",
  async (
    params: {
      chainId: number;
      inputCurrency: TOKEN | undefined;
      outputCurrency: TOKEN | undefined;
      user: any;
      signer: any;
    },
    { rejectWithValue, signal }
  ) => {
    try {
      const { inputCurrency, outputCurrency, user, signer, chainId } = params;
      const provider = new ethers.providers.JsonRpcProvider(
        RPC_CLIENT[chainId]
      );

      if (signal.aborted) {
        throw new Error("Request aborted");
      }

      let inputBalance,
        outputBalance = "0";

      if (inputCurrency && !inputCurrency.isNative) {
        const inputContract = await getTokeninstanceBysigner(
          inputCurrency?.address,
          signer
        );
        const BalanceA = await inputContract.balanceOf(user);
        inputBalance = await ConvertEthTonormal(
          BalanceA,
          inputCurrency.decimals
        );
      } else if (inputCurrency && inputCurrency.isNative) {
        const balanceA = await provider.getBalance(user);
        inputBalance = await ConvertEthTonormal(
          balanceA,
          inputCurrency.decimals
        );
      }

      if (outputCurrency && !outputCurrency.isNative) {
        const outputContract = await getTokeninstanceBysigner(
          outputCurrency?.address,
          signer
        );
        const BalanceB = (await outputContract.balanceOf(user)).toString();
        console.log(BalanceB, "outputCurrency", outputCurrency.decimals);

        outputBalance = await ConvertEthTonormal(
          BalanceB,
          outputCurrency.decimals
        );
      } else if (outputCurrency && outputCurrency.isNative) {
        const balanceA = await provider.getBalance(user);
        outputBalance = await ConvertEthTonormal(
          balanceA,
          outputCurrency.decimals
        );
      }

      return { inputBalance, outputBalance };
    } catch (e) {
      return rejectWithValue("Request failed");
    }
  }
);

export const getMyToken = createAsyncThunk(
  "swap/getMyToken",
  async (
    params: {
      user: any;
      chainId: number;
    },
    { rejectWithValue, signal }
  ) => {
    const { chainId, user } = params;
    try {
      const data = await getUserTokenbalance(user, chainId);
      return data;
    } catch (e) {
      return rejectWithValue("Request failed");
    }
  }
);

export const SearchToken = createAsyncThunk(
  "swap/SearchToken",
  async (
    params: {
      chainId: number;
      query: string;
    },
    { rejectWithValue, signal }
  ) => {
    const { chainId, query } = params;
    if (signal.aborted) {
      throw new Error("Request aborted");
    }
    try {
      const data = await globalService.TOKEN_SEARCH_NEXT_API({ ...params });
      return data.data;
    } catch (e) {
      return rejectWithValue("Request failed");
    }
  }
);
