import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector, useAppdispatch } from "../../hooks/redux"; // Assuming you have a custom Redux hook
import { hexToBigInt } from "viem";
import { SUPPORTED_NETWORK, defaultChain } from "@/config/swap";
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
import {
  getBalance,
  getMyToken,
  SearchToken,
} from "@/store/action/swap/getbalance";
import { useAccount } from "wagmi";

const useUpdateCurrencies = (signer?: any, user?: any) => {
  const dispatch = useAppdispatch(); // Replace with your custom Redux hook
  const { chain, address } = useAccount();

  const [callData, setCallData] = useState<any>("");
  const [callvalue, setcallvalue] = useState<any>("");
  // const [chainId,setchainId] = useState<number>(56)

  const chainId = useMemo(() => {
    if (chain?.id) {
      if (SUPPORTED_NETWORK.includes(chain?.id)) {
        return chain?.id;
      } else {
        return defaultChain;
      }
    } else {
      return defaultChain;
    }
  }, [chain?.id]);

  const isSupportedNetwork = useMemo(() => {
    return chain?.id ? SUPPORTED_NETWORK.includes(chain?.id) : false;
  }, [chain?.id]);

  const {
    trade,
    currencies,
    activeField,
    allowedSlippage,
    currencyBalances,
    txTime,
  } = useAppSelector((state) => state.swapState.swap);
  const tokenState = useAppSelector((state) => state.swapState[chainId]);

  const { tokenListModel, modelType, settingModel, swap, balanceload } =
    useAppSelector((state) => state.swapState);

  const SwapInfo = useMemo(() => {
    return swap;
  }, [swap]);

  const bestRoute = useMemo(() => {
    return swap.trade;
  }, [swap.trade, chainId]);


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
      dispatch(
        setTransactionSettings({
          txTime,
          allowedSlippage: allowedSlippageFromLocal,
        })
      );
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
    currencyAmount: string,
    inputCurrency: TOKEN | undefined,
    outputCurrency: TOKEN | undefined,
    TradeType: TradeType,
    user: any
  ) => {
    await dispatch(
      getRoute({
        chainId,
        currencyAmount,
        inputCurrency,
        outputCurrency,
        TradeType,
        user,
        allowedSlippage,
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

  const SearchERC20Token = (query: string) => {
    dispatch(
      SearchToken({
        chainId: chainId,
        query: query,
      })
    );
  };

  const getTokenbalanceforchain = () => {
    dispatch(
      getMyToken({
        chainId: chainId,
        user: user,
      })
    );
  };

  useEffect(() => {
    if (signer) {
      UpdateBalance();
      getTokenbalanceforchain();
    }
  }, [signer, currencies.INPUT, currencies.OUTPUT, activeField, chainId]);

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
    tokenState,
    SearchERC20Token,
    chainId,
    isSupportedNetwork,
  };
};

export default useUpdateCurrencies;
