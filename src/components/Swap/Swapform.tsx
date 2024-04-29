import React, { useEffect, useState } from "react";
import SwapCurrencyInputPanel from "./Helper/SwapCurrencyInputPanel";
import MiddeToggle from "./MiddeToggle";
import Outputinfo from "./Helper/Outputinfo";
import Header from "./Header";
import { TokenList } from "../model/TokenList";
import { Settings } from "../model/Settings";
import { toggleTokenListModal } from "@/store/reducer/swapslice";
import { Field } from "../../../typeing";
import { useAppSelector, useAppdispatch } from "../../hooks/redux";
import useUpdateCurrencies from "../../hooks/swap/useUpdateCurrencies";
import { TradeType, Native, Percent } from "@pancakeswap/sdk";
import useGetRoute from "../../hooks/swap/useGetRoute";
import { useAccount, useNetwork } from "wagmi";
import { useDebounce } from "../../hooks/useDebounce";
import { FormatEther } from "@/utils/numbers";
import ScaleLoader from "react-spinners/ScaleLoader";
import Swapconnetbtn from "@/components/connetbutton/ConnectButton";
import { useEthersSigner } from "@/hooks/useEthersSigner";

import {
  SmartRouter,
  SmartRouterTrade,
  SMART_ROUTER_ADDRESSES,
  SwapRouter,
} from "@pancakeswap/smart-router";
import useTransation from "../../hooks/swap/useTransation";
import { hexToBigInt } from "viem";
import { toast } from "react-toastify";
type Props = {};

function Swapform({}: Props) {
  const chainID = 56;
  const dispatch = useAppdispatch();
  const { address } = useAccount();
  const  signer = useEthersSigner();
  const { chain } = useNetwork();
  const isWRONG_NETWORK = chainID == chain?.id;
  useEffect(() => {
    if (!chain?.id) return;
    if (!isWRONG_NETWORK) {
      toast.info(
        "Please switch to Binance Smart Chain (BSC) to use this swap feature. Check your wallet settings and ensure you are connected to the correct network."
      );
    }
  }, [isWRONG_NETWORK]);
  // Single object to store both input and output information
  const [swapinputInfo, setswapinputInfo] = useState({
    [Field.INPUT]: {
      amount: "0",
    },
    [Field.OUTPUT]: {
      amount: "0",
    },
  });
  const [toggleOutput, setToggleOutput] = useState(true); // Initial state, assuming output is displayed
  const [RecallRoute, setRecallRoute] = useState("");
  const debounceData = useDebounce(RecallRoute);

  const {
    updateInputCurrency,
    updateOutputCurrency,
    tokenListModel,
    modelType,
    currencies,
    toggleInputOutputTokens,
    setDefaultTokens,
    OpenSettingModel,
    settingModel,
    SwapInfo,
    setTransactionSetting,
    AddActiveInput,
    getBestRoute,
    bestRoute,
    allowedSlippage,
    currencyBalances,
    balanceload,
    activeField,
    UpdateBalance,
  } = useUpdateCurrencies(chainID, signer, address);

  const { approve, SetApproveToken, HandleSwap, loading } = useTransation(
    signer,
    address,
    SMART_ROUTER_ADDRESSES[chainID],
    swapinputInfo[Field.INPUT].amount,
    currencies.INPUT
  );

  const Route = useGetRoute({
    currencies,
    swapinputInfo,
    SwapInfo,
    chainID,
    debounceData,
  });

  //set default token for bsc....
  useEffect(() => {
    setDefaultTokens(chainID);
  }, []);

  const handleAmountChange = async (field: Field, value: any) => {
    if (
      (!isNaN(parseFloat(value)) && isFinite(value)) ||
      [0, "", null].includes(value)
    ) {
      setswapinputInfo((prevSwapInfo) => ({
        ...prevSwapInfo,
        [field]: {
          ...prevSwapInfo[field],
          amount: value,
        },
      }));
      setRecallRoute(value);
      AddActiveInput(field);
    }

    // Add any additional logic you need here
  };

  const roundedOutputAmount = bestRoute?.outputAmount?.toExact()
    ? Number(bestRoute.outputAmount.toExact()).toFixed(2)
    : "";

  const roundedInputAmount = bestRoute?.inputAmount?.toExact()
    ? Number(bestRoute.inputAmount.toExact()).toFixed(2)
    : "";

  useEffect(() => {
    if (SwapInfo.activeField == Field.INPUT) {
      setswapinputInfo((prevSwapInfo) => ({
        ...prevSwapInfo,
        [Field.OUTPUT]: {
          ...prevSwapInfo[Field.OUTPUT],
          amount: roundedOutputAmount,
        },
      }));
    } else {
      setswapinputInfo((prevSwapInfo) => ({
        ...prevSwapInfo,
        [Field.INPUT]: {
          ...prevSwapInfo[Field.INPUT],
          amount: roundedInputAmount,
        },
      }));
    }
  }, [roundedOutputAmount, roundedInputAmount]);

  const Trade = async () => {
    if (!isWRONG_NETWORK) return;
    if (!currencies) return;
    if (SwapInfo.loading == "pending") return;
    const inputBalance = currencyBalances.INPUT;

    // Check if the input amount is greater than the balance
    if (Number(roundedInputAmount) >= Number(inputBalance)) {
      // Display a message or take appropriate action for low balance
      console.log("Low balance. Please check your input amount.");
      toast.info("Low balance. Please check your input amount.");
    } else {
      // Continue with the trade if the balance is sufficient
      const route: any = bestRoute;
      const { value, calldata } = SwapRouter.swapCallParameters(route, {
        recipient: address,
        slippageTolerance: new Percent(allowedSlippage),
      });

      const tx = {
        to: SMART_ROUTER_ADDRESSES[chainID],
        data: calldata,
        value: hexToBigInt(value),
      };
      HandleSwap(tx).then((e) => {
        if (e.isDone) {
          UpdateBalance();
        }
      });
    }
  };

  const Approve = async () => {
    if (!isWRONG_NETWORK) return;
    if (!currencies.INPUT || !currencies.OUTPUT) {
      console.error("Input or output currency is undefined");
      return;
    }

    const _convertDecimals = FormatEther(
      swapinputInfo[Field.INPUT].amount,
      currencies.INPUT.decimals
    );
    await SetApproveToken("approve", [
      SMART_ROUTER_ADDRESSES[chainID],
      _convertDecimals,
    ]);
  };

  return (
    <div
      id="swap"
    
      className=" py-2 "
    >
      {/* token input  */}
      {/* <Header openSettingmodel={OpenSettingModel} /> */}
      <div>
        <SwapCurrencyInputPanel
          loading={
            SwapInfo.activeField == Field.OUTPUT &&
            SwapInfo.loading == "pending"
          }
          field={Field.INPUT}
          currencies={currencies.INPUT}
           amount={swapinputInfo[Field.INPUT].amount}
      
        
          handleChange={handleAmountChange}
          bestRouteAmount={roundedOutputAmount}
          currencyBalances={currencyBalances}
          balanceload={balanceload == "pending"}
          titletext="You pay"
        />
        <MiddeToggle toggleToken={toggleInputOutputTokens} />
        <SwapCurrencyInputPanel
          loading={
            SwapInfo.activeField == Field.INPUT && SwapInfo.loading == "pending"
          }
          field={Field.OUTPUT}
          currencies={currencies.OUTPUT}
          amount={swapinputInfo[Field.OUTPUT].amount}
          handleChange={handleAmountChange}
          bestRouteAmount={roundedOutputAmount}
          currencyBalances={currencyBalances}
          balanceload={balanceload == "pending"}
          titletext="You receive"
        />
        {/* <Outputinfo
          currencies={currencies}
          roundedInputAmount={roundedInputAmount}
          roundedOutputAmount={roundedOutputAmount}
          loading={SwapInfo.loading == "pending"}
        /> */}

        {/* swap button */}
        <div className="py-5">
          {/* <button onClick={Trade} className="swapBtn">
            Connect a Wallet
          </button> */}
          {!address ? (
            <Swapconnetbtn />
          ) : !approve ? (
            <button
              disabled={loading}
              onClick={() => Approve()}
              className="swapBtn bg_swap_btn"
            >
              {!loading && "Approve"}
              <ScaleLoader
                height={20}
                loading={loading}
                color="#ffffff"
                className="text-white"
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </button>
          ) : (
            <button disabled={loading} onClick={Trade} className="swapBtn bg_swap_btn">
              {!loading && "Swap"}
              <ScaleLoader
                height={20}
                loading={loading}
                color="#ffffff"
                className="text-white"
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </button>
          )}
        </div>
        {/* swap button */}
      </div>

      {/* token input  */}

      {/* model */}
      <TokenList
        open={tokenListModel}
        modelType={modelType}
        onClose={() => {
          dispatch(
            toggleTokenListModal({ isOpen: false, modelType: modelType })
          );
        }}
      />
      <Settings
        open={settingModel}
        onClose={OpenSettingModel}
        SwapInfo={SwapInfo}
        onChange={setTransactionSetting}
        allowedSlippage={allowedSlippage}
      />
    </div>
  );
}

export default Swapform;
