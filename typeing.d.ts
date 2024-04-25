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