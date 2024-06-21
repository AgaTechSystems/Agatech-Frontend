import { Blockchain } from "./swap";

export const RPC_CLIENT: { [key: number]: string } = {
  97: 'https://bsc-testnet.publicnode.com',
  80001:"https://rpc-mumbai.maticvigil.com",
  [Blockchain.Binance_Smart_Chain]:"https://bsc-dataseed.binance.org",
  [Blockchain.Polygon]:"https://rpc.ankr.com/polygon	"
};
export const QUOTING_API = "http://localhost:5000/api/global/route"



