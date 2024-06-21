import axios from "axios";
import { ParseToken } from "@/utils/swap/Mytoken";
import { isAddress } from "@/utils/contracthelper";
export const getUserTokenbalance = async (
  user: string | undefined,
  chainId: number
) => {
  const data = await axios.get(
    `https://api.covalenthq.com/v1/${chainId}/address/${user}/balances_v2/?key=ckey_44bb30a2a6b8496d893fecb142f`
  );

  const res = await ParseToken(data.data.data);

  return res;
};

export const TOKEN_SEARCH = async (chainId: number, query: string) => {

  let tokenData;
  if (isAddress(query)) {
    const data = await axios.get(
      `https://matcha.xyz/api/tokens/search?addresses=${query}&chainId=${chainId}`
    );
    tokenData = data.data.data;
    // Query is a contract address
    console.log("Query is a contract address:", query);
  } else {
    //https://matcha.xyz/api/tokens/search?chainId=1&limit=50&page=0&query=agaa
    const data = await axios.get(
      `https://matcha.xyz/api/tokens/search?chainId=${chainId}&limit=50&page=0&query=${query}`
    );
    tokenData = data.data.data;
    // Query is a token name
    console.log("Query is a token name:", query);
  }

  return tokenData;
};
