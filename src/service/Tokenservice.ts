import axios from "axios";
import { ParseToken } from "@/utils/swap/Mytoken";
export const getUserTokenbalance = async (
  user: string | undefined,
  chainId: number
) => {
  const data = await axios.get(
    `https://api.covalenthq.com/v1/${chainId}/address/${user}/balances_v2/?key=ckey_44bb30a2a6b8496d893fecb142f`
  );

  const res = await ParseToken(data.data.
    data
);
  console.log(res, "res");

  return res;
};
