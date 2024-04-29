import { TOKEN, Field } from "../../../typeing";
import BSCToken from "../../config/swap/tokenlist.json";

const tokenListFromSDK = {
  56: BSCToken.tokens,
};

const defaultToken: Record<number, Record<Field, TOKEN>> = {
    56: {
      [Field.INPUT]: {
        name: "Agatech",
        address: "0xb427e47e8fDD678278d2A91EEaC014ffcDDaF029",
        symbol: "AGATA",
        decimals: 18,
        chainId: 56,
        logoURI: "https://assets.coingecko.com/coins/images/35835/thumb/IMG_20240229_111252_206.jpg?1709888815",
      },
      [Field.OUTPUT]: {
        name: "Binance Pegged USDT",
        address: "0x55d398326f99059fF775485246999027B3197955",
        symbol: "USDT",
        decimals: 18,
        chainId: 56,
        logoURI: "https://tokens.pancakeswap.finance/images/0x55d398326f99059fF775485246999027B3197955.png"

  
      },
    },
  };

  export default defaultToken;
