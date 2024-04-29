import React, { useState, useEffect } from "react";

import {toast} from "react-toastify";
import {
  getTokeninstance,
  getContractInstanceSigner,
  ConvertEthTonormal,
  getTokeninstanceBysigner,
} from "../../utils/contracthelper";
import { TOKEN } from "../../../typeing";

import { ethers } from "ethers";
//buy contract  - contractaddress
import { erc20ABI, multicall } from "@wagmi/core";

const useTransation = (
  signer: any,
  account: any,
  swapcontract: any,
  inputAmount: string,
  inputCurrency?: TOKEN
) => {
  const [loading, setSellTokenLoading] = useState(false);
  const [balance, setbalance] = useState("0");
  const [approve, setapprove] = useState(false);

  useEffect(() => {
    if (
      account != undefined &&
      signer != undefined &&
      inputCurrency != undefined
    ) {
      const _amount = Number(inputAmount) * 10 ** inputCurrency.decimals;

      if (inputCurrency.isNative) {
        setapprove(true);
      } else if (_amount > 0) {
        CheckApproval();
      } else {
        setapprove(false);
      }
    }
  }, [account, signer, inputAmount, inputCurrency]);

  const CheckApproval = async () => {
    if (!inputCurrency) return;
    setSellTokenLoading(true);
    const _amount = Number(inputAmount) * 10 ** inputCurrency.decimals;

    const myContract = await getTokeninstanceBysigner(
      inputCurrency.address,
      signer
    );
    const currentAllowance = await myContract.allowance(account, swapcontract);

    const getAmount = currentAllowance.toString();

    if (inputCurrency.isNative) {
      setapprove(true);
    } else if (Number(getAmount) >= _amount) {
      setapprove(true);
    } else {
      setapprove(false);
    }

    setSellTokenLoading(false);
  };

  //run func for allowance token  to contract
  const SetApproveToken = async (fname: string, args: Array<any>) => {
    if (!inputCurrency) return;

    const name = String(fname);
    setSellTokenLoading(true);
    //coming from hook
    const myContract = await getTokeninstanceBysigner(
      inputCurrency.address,
      signer
    );

    try {
      const response = await myContract?.[name](...args);
      const receipt = await response.wait();
      toast.success("Successfully Approved");
      CheckApproval();
      setSellTokenLoading(false);
      return { isDone: true };
    } catch (error: any) {
      if (error.code == "ACTION_REJECTED") {
        toast.error("User Cancelled The Transaction");
      } else {
        toast.error(error.reason || "Something went wrong try again");
      }
      setSellTokenLoading(false);
      console.log(error);
      return { isDone: false };
    }
  };

  const HandleSwap = async (tx: any) => {

    let sign_toast_id;
    sign_toast_id = toast.loading("Swapping...");
  
    try {
      setSellTokenLoading(true);
  
      const transaction = await signer.sendTransaction(tx);
      console.log("Transaction Hash:", transaction.hash);
      const res = await transaction.wait(); // Wait for confirmation
      toast.dismiss(sign_toast_id);
      toast.success("Congratulations! Your swap has been completed!");

      setSellTokenLoading(false);
      return { isDone: true, error: null };
    } catch (error: any) {
      setSellTokenLoading(false);
      toast.dismiss(sign_toast_id);
      if (error.code === "ACTION_REJECTED") {
        toast.error("User Cancelled The Transaction");
        return { isDone: false, error: null };
      } else if (error.data) {
        if (error.data.code === -32000) {
          toast.error("Insufficient funds. Please ensure you have a minimum fund");
        }
        return { isDone: false, error: null };
      }

      toast.error("Something went wrong. Please try again");
      return { isDone: false, error: null };
  

    }
  };

  return { loading, balance, HandleSwap, approve, SetApproveToken };
};

export default useTransation;
