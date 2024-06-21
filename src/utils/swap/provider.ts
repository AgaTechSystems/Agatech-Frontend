import { ethers } from "ethers";
import { ProviderRpc } from "@/config/blockchainProvider";
import { SWAP_ROUTER } from "@/config/blockchainProvider";
export async function estimateGasFee(
  chainID: number,
  address: any,
  callData:any
): Promise<string | null> {
  try {
    const provider = new ethers.providers.JsonRpcProvider(ProviderRpc[chainID]); // Connect to the Ethereum node or the relevant blockchain node using the provided URL
    const gasPrice = await provider.getGasPrice(); // Get current gas price

    const tx = {
        from: address,
	    to: SWAP_ROUTER[chainID],
	    data: callData,
	    gasPrice:gasPrice,
    }
    const estimatedGas = await provider.estimateGas(tx);
    console.log(estimatedGas,"as");
    
    
    const fee = ethers.utils.formatEther(estimatedGas.mul(gasPrice)); // Calculate fee
    console.log(fee,"fee");
    
    return fee;
  } catch (error) {
    console.log("calls");
    
    console.log( error);
    return null;
  }
}
