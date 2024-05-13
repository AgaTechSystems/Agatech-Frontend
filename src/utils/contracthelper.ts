import { Contract } from "@ethersproject/contracts";
import { RPC_CLIENT } from "../config/network";
import { ethers } from "ethers";
import erc20 from "@/abi/erc20.json";




export const getContractInstance = (
  contractaddress: string,
  ABI: any,
  netId: number
) => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_CLIENT[netId]);
  const contract = new Contract(contractaddress, ABI.abi, provider);
  return contract;
};

export const Erc20Balance = async (
  contractaddress: string,
  ABI: any,
  netId: number,
  user:string
) => {
  const instance = await getContractInstance(contractaddress,ABI,netId)
  const currentBalance = await instance.balanceOf(user);
  return currentBalance.toString()
};

export const getContractInstanceSigner = (
  contractaddress: string,
  ABI: any,
  provider: any
) => {
  const contract = new Contract(contractaddress, ABI.abi, provider);
  return contract;
};

export const getTokeninstance = (
  staketoken: string,
  isUsercall: boolean,
  netId: number,
  library?: any
) => {
  if (isUsercall) {
    const contract = new Contract(staketoken, erc20.abi, library);
    return contract;
  } else {
    const provider = new ethers.providers.JsonRpcProvider(RPC_CLIENT[netId]);
    const contract = new Contract(staketoken, erc20.abi, provider);
    return contract;
  }
};

export const getTokeninstanceBysigner = (staketoken: string, library: any) => {
  const contract = new Contract(staketoken, erc20.abi, library);
  return contract;
};

export const ConvertEthTonormal = async (amount: any, decimals: number) => {
  const _amount = await ethers.utils.formatUnits(amount, decimals);
  return _amount;
};

export const FormatUnit = async (amount: any, decimals: number) => {
  const _amount = await ethers.utils.parseUnits(amount.toString());
  return _amount.toString();
};
