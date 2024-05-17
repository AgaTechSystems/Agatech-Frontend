import { Token_Balance } from "../../../typeing";
import {
  getTokeninstanceBysigner,
  ConvertEthTonormal,
} from "@/utils/contracthelper";
import { CHAINNAME } from "@/config/swap";
export const ParseToken = async (data: any) => {
  try {
    console.log(data);

    if (!data.items) {
      return {
        chainId: data.chain_id,
        tokens: [],
      };
    }

    // Check if data.items exists and is an array
    if (!Array.isArray(data.items)) {
      console.error("data.items is not an array or is undefined");
      return {
        chainId: data.chain_id,
        tokens: [],
      };
    }
//https://token-registry.s3.amazonaws.com/icons/tokens/bsc/128/0xb427e47e8fdd678278d2a91eeac014ffcddaf029.png
    const validItems = data.items.filter((e: any) => e.contract_name != null && e.quote_rate != null && e.balance  !="0");

    const tokenPromises = validItems.map(async (e: any) => {
      const chainId = data.chain_id;
      const name = e.contract_name;
      const symbol = e.contract_ticker_symbol;
      const decimals = e.contract_decimals;
      const address = e.contract_address;
      const isNative = e.native_token;
      const balance = await ConvertEthTonormal(e.balance, decimals);
      const usdvalue = Number(balance) * Number(e.quote_rate);

      const _url = `https://token-registry.s3.amazonaws.com/icons/tokens/${CHAINNAME[chainId]}/128/${address}.png`

      return {
        chainId,
        name,
        symbol,
        decimals,
        address,
        isNative,
        logoURI: _url,
        balance:Number(balance),
        usdValue: usdvalue,
      };
    });

    const tokens = await Promise.all(tokenPromises);

    return {
      chainId: data.chain_id,
      tokens,
    };
  } catch (error) {
    console.log(error, "error");

    return {
      chainId: data.chain_id,
      tokens: [],
    };
  }
};
