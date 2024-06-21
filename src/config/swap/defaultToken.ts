import { TOKEN, Field } from "../../../typeing";
import {Blockchain} from "./index"


  const defaultToken: Record<number, Record<Field, TOKEN>> = {
    [Blockchain.Binance_Smart_Chain]: {
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
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/28592.png",
      }
    },
    [Blockchain.Polygon]: {
      [Field.INPUT]: {
        name: "Matic",
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        symbol: "Matic",
        decimals: 18,
        chainId: 137,
        logoURI: "https://app.uniswap.org/static/media/matic-token-icon.efed2ee4e843195b44bf68ffc7439403.svg",
        isNative:true
      },
      [Field.OUTPUT]: {
        name: "Agatech",
        address: "0x86564008BE7C84E4aeedc55598d7A0a5bDAEfe83",
        symbol: "AGATA",
        decimals: 18,
        chainId: 137,
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/28592.png",
      }
    },
  };

  export default defaultToken;
