import React, { useEffect, useState } from "react";
import { pools, Pool } from "../../../config/Pool";
import { useMediaQuery } from "react-responsive";
import { InfoLine } from "./InfoLine";
import AmountInput from "./AmountInput";
import { useAppSelector, useAppdispatch } from "../../../hooks/redux";
import Connetbtn from "../../Header/Connetbtn";
import { useAccount, useSigner } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import useStakeTransation from "../../../hooks/useStakeTransation";
import { FormatUnit } from "../../../utils/contracthelper";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../utils/numbers";
import { getALLpool } from "../../../data/pool/getPool";
import { useChainId } from "wagmi";
import { CHAIN_ID_STAKING } from "../../../config/Pool";
import { useNetwork, useSwitchNetwork } from "wagmi";

type Props = {
  data: Pool;
  indx: number;
};

function Poolbox({ data, indx }: Props) {
  const { address } = useAccount();
  const dispatch = useAppdispatch();
  const { data: signer } = useSigner();
  const [activeSubpoolIndex, setActiveSubpoolIndex] = useState<number>(1);

  const { pools, loading } = useAppSelector((state) => state.pool) || {};
  const { unclaimed, totaldeposit, rate,user, poolloading, staked } =
    pools[indx] || {};

  const { chain } = useNetwork();
  const isWRONG_NETWORK = CHAIN_ID_STAKING != chain?.id;
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  // change chain

  const ChangeChain = () => {
    switchNetwork?.(CHAIN_ID_STAKING);
  };

  const {
    name,
    earnname,
    contract,
    stakename,
    staketoken,
    ABI,
    earnlogosrc,
    subpool,
    stakingTokenDecimals,
    rewardTokenDecimals,
  } = data || {};

  // Token
  const [tokenamount, settokenamount] = useState("");

  // hook
  const {
    approve,
    loading: TransationLoad,
    SetapproveToken,
    HandleRun,
    balance,
  } = useStakeTransation(
    signer,
    address,
    tokenamount,
    contract,
    staketoken,
    ABI,
    stakingTokenDecimals,
    rewardTokenDecimals
  );

  //responsive state
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 550px)" });

  const stake = async () => {
   const balances = Number(balance)??0;
   const stakeAmount = Number(tokenamount)??0

    
    if (balances >= stakeAmount) {
      const amount = await FormatUnit(tokenamount, stakingTokenDecimals);
      HandleRun(
        "stake",
        [activeSubpoolIndex, amount],
        `Stake Successful! You staked ${formatNumber(
          Number(tokenamount)
        )} tokens for ${Math.floor(
          subpool ? subpool[activeSubpoolIndex].apy : 0
        )}% apy`,
        Number(tokenamount)
      ).then((E) => {
        if (E.isDone) {
          //getALLpool
          dispatch(
            getALLpool({
              user: address,
            })
          );
        }
      });
    } else {
      toast.warn(
        "Insufficient balance. Please make sure you have enough tokens to stake."
      );
    }
  };


  useEffect(()=>{
    if(user!=address){
      dispatch(
        getALLpool({
          user: address,
        })
      );
    }

  },[address])
  const ApproveToken = async () => {
    const amount = await FormatUnit(tokenamount, stakingTokenDecimals);
    SetapproveToken("approve", [contract, amount]);
  };

  const handleaddamount = async (e: string) => {
    settokenamount(e);
  };
  const handleSubpoolClick = (index: number) => {
    setActiveSubpoolIndex(index);
    // Perform any other actions you want when a subpool is clicked
  };

  return (
    <div className="m-3  p-[.5px]  whitespace-nowrap bg_btn_gr    rounded-2xl relative  ">
      <div className="h-[7px]"></div>
      <div className=" m-[1px]  bg-black w-[90vw]   whitespace-nowrap rounded-2xl    sm:w-[500px] h-auto    flex flex-col">
        {/* title */}
        <div className="px-4 md:px-7 py-4 w-full bg-gradient-to-r from-[#fff0] to-[#ffffff17] border-[#ffffff17] border-b  rounded-2xl ">
          <h1 className="text-lg tracking-wide text-white md:text-2xl font-extrabold flex flex-row items-end py-1 gap-5">
            Stake {stakename}
          </h1>
          <p className="flex flex-row  gap-3 text-gray-400">
            {`Earn ${earnname ? earnname : "--"}`}{" "}
          </p>
        </div>

        {/* title */}

        {/* 1st selction */}
        <div className="p-5 md:p-7 flex flex-col gap-y-3">
          {/* total deposit  and user deposit  */}
          <InfoLine
            text={`${isTabletOrMobile ? "Total Staked" : "Total Staked"}`}
            load={loading == "done" && !poolloading}
            value={totaldeposit ? formatNumber(totaldeposit) : 0}
          />

          <InfoLine
            text={`${
              isTabletOrMobile ? "My Staked Balance" : "My Staked Balance"
            }`}
            load={loading == "done" && !poolloading}
            value={staked ? formatNumber(staked) : 0}
          />
          <InfoLine
            text={`APY Rate            `}
            load={loading == "done" && !poolloading}
            value={`${subpool ? subpool[activeSubpoolIndex].apy : 0}%`}
          />

          <div>
            <div className="  text-lg md:text-xl  py-2 text-[#cecece] ">
              Lock Deadline
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 md:flex-row justify-center gap-3 ">
              {subpool?.map((e: any, indx: number) => {
                const isMatched = activeSubpoolIndex === indx;

                return (
                  <button
                    onClick={() => handleSubpoolClick(indx)}
                    key={indx}
                    className={`w-full mx-auto md:m-0 ${
                      isMatched
                        ? "  text-white bg-gradient-to-r from-[#DAA200] to-[#FFD600] "
                        : "text-white"
                    }  border-[#ffffff17] border  w-fit px-3  uppercase font-semibold py-2 rounded-xl text-sm`}
                  >
                    {`${Math.floor(e.lockDays / 30)} Month`}
                    <div></div>
                  </button>
                );
              })}
            </div>
          </div>
          <AmountInput
            handlevaluechange={handleaddamount}
            value={tokenamount}
            label="Amount"
            maxValue={Number(balance).toFixed(0)}
          />
          <div className="text-sm text-right text-white text-wrap">
            Available Balance: {formatNumber(Number(balance))} TRT
          </div>

          {/* unclaimed reward */}

          {/* unclaimed reward */}

          <div className="flex flex-col justify-center gap-5 pt-3">
            {!address && <Connetbtn />}
            {/* claim button */}

            {/* claim button */}
            {address && (
              <div>
                {!isWRONG_NETWORK ? (
                  !approve ? (
                    <button
                      disabled={TransationLoad}
                      onClick={() => ApproveToken()}
                      className={`stake_btn w-full`}
                    >
                      {!TransationLoad && "Approve"}
                      <ScaleLoader
                        height={20}
                        loading={TransationLoad}
                        color="#ffffff"
                        className="text-white"
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </button>
                  ) : (
                    <button
                      disabled={TransationLoad}
                      onClick={() => stake()}
                      className={`stake_btn w-full`}
                    >
                      {!TransationLoad && "STAKE"}
                      <ScaleLoader
                        height={20}
                        loading={TransationLoad}
                        color="#ffffff"
                        className="text-white"
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </button>
                  )
                ) : (
                  <div className="">
                    <button
                      onClick={() => ChangeChain()}
                      disabled={isLoading}
                      className={`stake_btn w-full `}
                    >
                      Wrong Network!
                    </button>
                    <p className="text-center py-2 text-red-700 text-wrap font-bold">
                      Please switch to the correct network to access this pool.
                    </p>
                  </div>
                )}
              </div>
            )}
            {address && (
              <Link
                to={`/view?poolID=${indx}`}
                // onClick={() => unstake()}
                // disabled={!IsUnstaked}
                className={`stake_btn w-full`}
              >
                UNSTAKE
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Poolbox;
