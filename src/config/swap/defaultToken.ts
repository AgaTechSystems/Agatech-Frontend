import { TOKEN, Field } from "../../../typeing";
import BSCToken from "../../config/swap/tokenlist.json";

const tokenListFromSDK = {
  56: BSCToken.tokens,
};


  const defaultToken: Record<number, Record<Field, TOKEN>> = {
    56: {
      [Field.INPUT]: {
        "name": "Binance smart chain",
        "address": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "symbol": "BNB",
        "decimals": 18,
        "chainId": 56,
        "logoURI": "https://assets-cdn.trustwallet.com/blockchains/smartchain/assets/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/logo.png",
        "isNative":true
      },
      [Field.OUTPUT]: {
        name: "Agatech",
        address: "0xb427e47e8fDD678278d2A91EEaC014ffcDDaF029",
        symbol: "AGATA",
        decimals: 18,
        chainId: 56,
        logoURI: "https://assets.coingecko.com/coins/images/35835/thumb/IMG_20240229_111252_206.jpg?1709888815",
      }
    },
  };

  export default defaultToken;
