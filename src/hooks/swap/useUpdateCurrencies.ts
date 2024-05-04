import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector, useAppdispatch } from "../../hooks/redux"; // Assuming you have a custom Redux hook
import { hexToBigInt } from "viem";
import {
  Currency,
  Token,
  Percent,
  CurrencyAmount,
  TradeType,
  Native,
} from "@pancakeswap/sdk";
import defaultToken from "../../config/swap/defaultToken";
import {
  addCurrency,
  toggleTokenListModal,
  setTransactionSettings,
  togglesettingModal,
  changeActiveField,
} from "@/store/reducer/swapslice"; // Update the path accordingly
import { getRoute } from "@/store/action/swap/swapaction";
import { Field, TOKEN, SwapInfo } from "../../../typeing";
import { getBalance } from "@/store/action/swap/getbalance";
import { useAccount } from "wagmi";
import {
  SmartRouter,
  SmartRouterTrade,
  SMART_ROUTER_ADDRESSES,
  SwapRouter,
} from "@pancakeswap/smart-router";
import { estimateGasFee } from "@/utils/swap/provider";
import { SWAP_ROUTER } from "@/config/blockchainProvider";

const useUpdateCurrencies = (chainId: number, signer?: any, user?: any) => {
  const dispatch = useAppdispatch(); // Replace with your custom Redux hook
  const { address } = useAccount();
  const [callData, setCallData] = useState<any>("");
  const [callvalue, setcallvalue] = useState<any>("");

  const {
    trade,
    currencies,
    activeField,
    allowedSlippage,
    currencyBalances,
    txTime,
  } = useAppSelector((state) => state.swapState.swap); // Replace with your Redux state path
  const { tokenListModel, modelType, settingModel, swap, balanceload } =
    useAppSelector((state) => state.swapState);

  const SwapInfo = useMemo(() => {
    return swap;
  }, [swap]);

  const bestRoute = useMemo(() => {
    return swap.trade !== undefined
      ? SmartRouter.Transformer.parseTrade(chainId, swap.trade)
      : {
          outputAmount: CurrencyAmount.fromRawAmount(
            Native.onChain(chainId),
            0
          ),
          inputAmount: CurrencyAmount.fromRawAmount(Native.onChain(chainId), 0),
        }; // Provide a default value
  }, [swap.trade, chainId]);

  useEffect(() => {
    if (!currencies) return;
    if (SwapInfo.loading == "pending") return;

    const route: any = bestRoute;
    const estimatedGasAndTrade = async () => {
      const slippageInteger = Math.floor(Number(allowedSlippage) * 100); // Convert percentage to integer
      const slippagePercent = new Percent(slippageInteger.toString());

      if (route) {
        const { value, calldata } = SwapRouter.swapCallParameters(route, {
          recipient: address,
          slippageTolerance:slippagePercent,
        });
        setCallData(calldata);
        setcallvalue(value);
      }
    };

    estimatedGasAndTrade();
  }, [bestRoute]);

  const openTokenListModel = (Field: Field) => {
    dispatch(toggleTokenListModal({ isOpen: true, modelType: Field }));
  };
  const closeTokenListModel = (Field: Field) => {
    dispatch(toggleTokenListModal({ isOpen: false, modelType: Field }));
  };

  const updateInputCurrency = (currency: TOKEN) => {
    if (currencies.INPUT != currency) {
      dispatch(addCurrency({ field: Field.INPUT, currency }));
    }
  };

  const updateOutputCurrency = (currency: TOKEN) => {
    if (currencies.OUTPUT != currency) {
      dispatch(addCurrency({ field: Field.OUTPUT, currency }));
    }
  };

  const toggleInputOutputTokens = () => {
    dispatch(addCurrency({ field: Field.INPUT, currency: currencies.OUTPUT }));
    dispatch(addCurrency({ field: Field.OUTPUT, currency: currencies.INPUT }));
  };

  const setDefaultTokens = (chainId: number) => {
    // Assuming defaultToken is an object with the structure you provided
    dispatch(
      addCurrency({
        field: Field.INPUT,
        currency: defaultToken[chainId][Field.INPUT],
      })
    );
    dispatch(
      addCurrency({
        field: Field.OUTPUT,
        currency: defaultToken[chainId][Field.OUTPUT],
      })
    );
  };

  const setTransactionSetting = (txTime: string, allowedSlippage: string) => {
      // Save allowedSlippage to local storage
    localStorage.setItem("allowedSlippage", allowedSlippage);
    dispatch(setTransactionSettings({ txTime, allowedSlippage }));
  };
  const allowedSlippageFromLocal = localStorage.getItem("allowedSlippage");
  useEffect(() => {

    if (allowedSlippageFromLocal) {
      // Dispatch action to set transaction settings with loaded allowedSlippage
      dispatch(setTransactionSettings({ txTime,allowedSlippage:allowedSlippageFromLocal }));
    }
  }, [allowedSlippageFromLocal]);

  const OpenSettingModel = () => {
    dispatch(togglesettingModal(0));
  };
  const AddActiveInput = (Field: Field) => {
    if (Field != activeField) {
      dispatch(changeActiveField(Field));
    }
  };

  const getBestRoute = async (
    chainId: number,
    currencyAmount: number,
    inputCurrency: TOKEN | undefined,
    outputCurrency: TOKEN | undefined,
    TradeType: TradeType
  ) => {
    await dispatch(
      getRoute({
        chainId,
        currencyAmount,
        inputCurrency,
        outputCurrency,
        TradeType,
      })
    );
  };

  const UpdateBalance = () => {
    dispatch(
      getBalance({
        chainId: chainId,
        inputCurrency: currencies.INPUT,
        outputCurrency: currencies.OUTPUT,
        user: user,
        signer,
      })
    );
  };

  useEffect(() => {
    if (signer) {
      UpdateBalance();
    }
  }, [signer, currencies.INPUT, currencies.OUTPUT, activeField]);

  return {
    openTokenListModel,
    updateInputCurrency,
    updateOutputCurrency,
    tokenListModel,
    modelType,
    currencies,
    currencyBalances,
    toggleInputOutputTokens,
    setDefaultTokens,
    closeTokenListModel,
    setTransactionSetting,
    OpenSettingModel,
    settingModel,
    SwapInfo,
    AddActiveInput,
    getBestRoute,
    bestRoute,
    allowedSlippage,
    balanceload,
    UpdateBalance,
    activeField,
    callData,
    callvalue,
  };
};

export default useUpdateCurrencies;