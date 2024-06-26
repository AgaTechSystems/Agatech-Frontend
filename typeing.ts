import { Currency, Token, Percent, CurrencyAmount ,Native} from "@pancakeswap/sdk";

export interface tokendata {
  name: string;
  decimals: number;
  symbol:string,
  contractaddress: string;
  isNative: boolean;
}


export type NetworkProfile = {
  name: string;
  link: string;
};

export type CEOProfile = {
  name: string;
  logo: string;
  bridge: string;
  content: string;
  network: NetworkProfile[];
};


export type TOKEN_INFO_DATA  = {
  price:number,
  totalLiquidityUSD:number,
  totalVolume24h:number,
  totalBuy:number,
  totalSell:number
}



export type TOKEN = {
  name: string;
  address: string;
  symbol: string;
  decimals: number;
  chainId: number;
  logoURI: string;
  isNative?:boolean
};
export enum Field {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
}
export type SwapInfo = {
  currencies: { [field in Field]?: TOKEN };
  currencyBalances: { [field in Field]?: string};
  // inputTax: Percent;
  // outputTax: Percent;
  parsedAmount?: CurrencyAmount<Currency>;
  trade: any;
  allowedSlippage: string;
  txTime:string,
  activeField:Field
  loading: "idle" | "pending" | "done" | "error";
  nativePrice:number
};

export interface RouteTradeParams {
  chainId: number;
  currencyAmount: number;
  inputCurrency: TOKEN | undefined;
  outputCurrency: TOKEN | undefined;
  TradeType: any;
}


export interface Token_Balance  {
  chainId:number,
  name: string;
  decimals: number;
  symbol:string,
  address: string;
  isNative: boolean;
  logoURI:string;
  balance:string
}

export interface Tokens  {
  chainId:number,
  name: string;
  decimals: number;
  symbol:string,
  address: string;
  isNative: boolean;
  logoURI:string;
}



export  interface User {
  [networkId: number]: {
   balance:Token_Balance[]
  };
}


export interface chainData {
  balance: Token_Balance[];
  loading: "idle" | "pending" | "done" | "error";
  tradingInfo?: any;
  searchToken:Tokens[]
}