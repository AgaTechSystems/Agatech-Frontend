import React, { useEffect, useState } from "react";
import SwapCurrencyInputPanel from "./Helper/SwapCurrencyInputPanel";
import MiddeToggle from "./MiddeToggle";

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
import { FormatEther, ConvertEthTonormal } from "@/utils/numbers";
import ScaleLoader from "react-spinners/ScaleLoader";
import Swapconnetbtn from "@/components/connetbutton/swapConnetbtn";
import { useEthersSigner } from "@/hooks/useEthersSigner";
import ToggleInfo from "./Helper/ToggleInfo";
import { Exchange_CONTRACT } from "@/config/swap";
import useTransation from "../../hooks/swap/useTransation";
import { hexToBigInt } from "viem";
import { toast } from "react-toastify";
type Props = {};

function Swapform({}: Props) {

  const dispatch = useAppdispatch();
  const { address } = useAccount();
  const signer = useEthersSigner();

  // Single object to store both input and output information
  const [swapinputInfo, setswapinputInfo] = useState({
    [Field.INPUT]: {
      amount: "1",
      price: 0,
    },
    [Field.OUTPUT]: {
      amount: "0",
      price: 0,
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
    callData,
    callvalue,
    chainId
  } = useUpdateCurrencies( signer, address);

  const { approve, SetApproveToken, HandleSwap, loading } = useTransation(
    signer,
    address,
    Exchange_CONTRACT[chainId],
    swapinputInfo[Field.INPUT].amount,
    currencies.INPUT
  );

  const { getSwapQuote } = useGetRoute({
    currencies,
    swapinputInfo,
    SwapInfo,
    chainID:chainId,
    debounceData,
    address,
  });

  //set default token for bsc....
  useEffect(() => {
    setDefaultTokens(chainId);
  }, [chainId]);

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

  useEffect(() => {
    const callSwapPrice = async () => {
      const buyAmount = bestRoute?.buyAmount
        ? await ConvertEthTonormal(
            bestRoute?.buyAmount,
            currencies[Field.OUTPUT]?.decimals || 0
          )
        : "";

      const _priceA =
        (1 / Number(bestRoute?.sellTokenToEthRate)) * SwapInfo?.nativePrice;
      const _priceB =
        (1 / Number(bestRoute?.buyTokenToEthRate)) * SwapInfo?.nativePrice;

      setswapinputInfo((prevSwapInfo) => ({
        ...prevSwapInfo,
        [Field.INPUT]: {
          ...prevSwapInfo[Field.INPUT],
          price: _priceA,
        },
      }));
      setswapinputInfo((prevSwapInfo) => ({
        ...prevSwapInfo,
        [Field.OUTPUT]: {
          ...prevSwapInfo[Field.OUTPUT],
          price: _priceB,
        },
      }));

      const sellAmount = bestRoute?.sellAmount
        ? await ConvertEthTonormal(
            bestRoute?.sellAmount,
            currencies[Field.INPUT]?.decimals || 0
          )
        : "";

      if (SwapInfo.activeField == Field.INPUT) {
        setswapinputInfo((prevSwapInfo) => ({
          ...prevSwapInfo,
          [Field.OUTPUT]: {
            ...prevSwapInfo[Field.OUTPUT],
            amount: Number(buyAmount).toFixed(4),
          },
        }));
      } else {
        setswapinputInfo((prevSwapInfo) => ({
          ...prevSwapInfo,
          [Field.INPUT]: {
            ...prevSwapInfo[Field.INPUT],
            amount: Number(buyAmount).toFixed(4),
          },
        }));
      }
    };
    callSwapPrice();
  }, [bestRoute?.buyAmount, bestRoute?.sellAmount]);

  const Trade = async () => {
  
    if (!currencies) return;
    if (SwapInfo.loading == "pending") return;
    const inputBalance = currencyBalances.INPUT;

    // Check if the input amount is greater than the balance
    if (Number(swapinputInfo[Field.INPUT].amount) >= Number(inputBalance)) {
      // Display a message or take appropriate action for low balance
      console.log("Low balance. Please check your input amount.");
      toast.info("Low balance. Please check your input amount.");
    } else {
      // call the func..

      const data = await getSwapQuote();
      console.log(data, "data");
      if (data.code) {
        toast.info(data.reason);
      }

      if (data.data) {
        const tx = {
          to: Exchange_CONTRACT[chainId],
          data: data.data,
          value: hexToBigInt(data.value),
        };
        HandleSwap(tx).then((e) => {
          if (e.isDone) {
            UpdateBalance();
          }
        });
      }
    }
  };

  const Approve = async () => {
    // if (!isWRONG_NETWORK) return;
    if (!currencies.INPUT || !currencies.OUTPUT) {
      console.error("Input or output currency is undefined");
      return;
    }

    const _convertDecimals = FormatEther(
      swapinputInfo[Field.INPUT].amount,
      currencies.INPUT.decimals
    );
    await SetApproveToken("approve", [
      Exchange_CONTRACT[chainId],
      _convertDecimals,
    ]);
  };

  return (
    <div id="swap" className=" py-2 swap_main ">
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
          bestRouteAmount={swapinputInfo[Field.INPUT].amount}
          currencyBalances={currencyBalances}
          balanceload={balanceload == "pending"}
          titletext="You pay"
          tokenRate={swapinputInfo[Field.INPUT].price}
          nativePrice={SwapInfo.nativePrice || null}
        />
        <MiddeToggle
          toggleToken={toggleInputOutputTokens}
          loading={SwapInfo.loading == "pending"}
        />
        <SwapCurrencyInputPanel
          loading={
            SwapInfo.activeField == Field.INPUT && SwapInfo.loading == "pending"
          }
          field={Field.OUTPUT}
          currencies={currencies.OUTPUT}
          amount={swapinputInfo[Field.OUTPUT].amount}
          handleChange={handleAmountChange}
          bestRouteAmount={swapinputInfo[Field.OUTPUT].amount}
          currencyBalances={currencyBalances}
          balanceload={balanceload == "pending"}
          titletext="You receive"
          tokenRate={swapinputInfo[Field.OUTPUT].price}
          nativePrice={SwapInfo.nativePrice || null}
        />
        <ToggleInfo
          currencies={currencies}
          roundedInputAmount={swapinputInfo[Field.INPUT].amount}
          roundedOutputAmount={swapinputInfo[Field.OUTPUT].amount}
          loading={SwapInfo.loading == "pending"}
          allowedSlippage={allowedSlippage}
          outputTokenrate={swapinputInfo[Field.OUTPUT].price}
          sources={bestRoute?.sources}
          estimatedPriceImpact={bestRoute?.estimatedPriceImpact}
          estimatedGas={bestRoute?.estimatedGas}
          nativePrice={SwapInfo.nativePrice || null}
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
            <button
              disabled={loading}
              onClick={Trade}
              className="swapBtn bg_swap_btn"
            >
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
        chainID={chainId}
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
