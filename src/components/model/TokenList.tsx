import Popup from "reactjs-popup";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { CalculatorIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ScaleLoader from "react-spinners/ScaleLoader";
import TokenSearch from "./Helper/tokenlist/TokenSearch";
import { bscTokens } from "@pancakeswap/tokens";
import { Token, Currency } from "@pancakeswap/sdk";
import JsonToken from "../../config/swap/tokenlist.json";
import InfiniteScroll from "react-infinite-scroll-component";
import Tokenline from "./Helper/tokenlist/Tokenline";
import { Field, TOKEN } from "../../../typeing";
import Modal from "react-modal";
import { Content, Overlay } from "./Helper/modeconfig";

import useUpdateCurrencies from "../../hooks/swap/useUpdateCurrencies";
const BNB =
  "https://tokens.pancakeswap.finance/images/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c.png";

const tokenListFromSDK = {
  56: JsonToken,
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  modelType: Field;
}

export const TokenList: FC<ModalProps> = ({ open, onClose, modelType }) => {
  const customTokens = tokenListFromSDK[56].tokens.map((tokenInfo: any) => {
    const { address, decimals, symbol, name, chainId, logoURI } = tokenInfo;
    return {
      ...tokenInfo,
    };
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTokens, setFilteredTokens] = useState(customTokens);

  const {
    updateInputCurrency,
    currencies,
    updateOutputCurrency,
    closeTokenListModel,
    tokenBalances,
  } = useUpdateCurrencies(56);

  const handleSearchChange = (event: any) => {
    const query = event.target.value.toLowerCase();
    // Update the search query state
    setSearchQuery(query);
    // Filter tokens based on the search query
    const filtered = customTokens.filter((token) => {
      const { symbol, name } = token;
      return (
        symbol.toLowerCase().includes(query) ||
        name?.toLowerCase().includes(query)
      );
    });

    // Update the filtered tokens state
    setFilteredTokens(filtered);
  };

  const Addtoken = (token: any) => {
    console.log(token,"token");
    
    if (modelType == Field.INPUT) {
      updateInputCurrency(token);
    } else {
      updateOutputCurrency(token);
    }
    closeTokenListModel(modelType);
  };

  return (
    <Modal
      isOpen={open}
      className="bg-transparent transition-all z-[100] "
      onRequestClose={onClose}
      style={{
        overlay: Overlay,
        content: Content,
      }}
    >
      <div className="bg-[#171717] md:w-[590px] mx-auto pb-5 z-[100] relative">
        <div className="flex flex-row  justify-between  px-4 py-4 ">
          <div className="text-lg text-white font-semibold">Select a token</div>

          <div className="relative  h-fit">
            <XMarkIcon
              onClick={onClose}
              className="text-white hover:text-gray-500 font-semibold  cursor-pointer relative"
              width={22}
              height={22}
            />
          </div>
        </div>

        <TokenSearch value={searchQuery} handleChange={handleSearchChange} />

        <div
          className="flex flex-col gap-3 overflow-y-scroll pt-5 h-[50vh]"
          id="scrollableDiv"
        
        >
          <InfiniteScroll
            dataLength={tokenBalances?.length} //This is important field to render the next data
            loader={<h4>Loading...</h4>}
            // style={{ display: "flex", flexDirection: "column" }} //To put endMessage and loader to the top.
            hasMore={false}
            className="flex flex-col "
            next={() => {}}
            scrollableTarget="scrollableDiv"
          >
            {" "}
            <div className="px-3  text-white opacity-70 pb-3 text-sm">My Tokens</div>
            {tokenBalances?.map((e: any, indx: any) => {
              const isMatchedToken =
                currencies.INPUT == e || currencies.OUTPUT == e;

              return (
                <div
                  key={indx}
                  className={`mb-4 ${
                    isMatchedToken ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <button onClick={() => Addtoken(e)} className="w-full">
                    <Tokenline data={e} />
                  </button>
                </div>
              );
            })}
      <div className="px-3  text-white opacity-70 pb-3 text-sm">My Tokens</div>
            {filteredTokens.map((e, indx) => {
              const isMatchedToken =
                currencies.INPUT == e || currencies.OUTPUT == e;

              return (
                <div
                  key={indx}
                  className={`mb-4 ${
                    isMatchedToken ? "opacity-50 pointer-events-none" : ""
                  } w-full`}
                >
                  <button onClick={() => Addtoken(e)} className="w-full">
                    <Tokenline data={e} />
                  </button>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>

        {/* <div
          className="flex flex-col gap-3 h-[50vh] md:h-[500px] overflow-y-scroll pt-5"
          id="scrollableDiv"
          style={{
            scrollbarWidth: "thin",
          }}
        >
          <InfiniteScroll
            dataLength={filteredTokens.length} //This is important field to render the next data
            loader={<h4>Loading...</h4>}
            // style={{ display: "flex", flexDirection: "column" }} //To put endMessage and loader to the top.
            hasMore={false}
            className="flex flex-col "
            next={() => {}}
            scrollableTarget="scrollableDiv"
          >
            {filteredTokens.map((e, indx) => {
              const isMatchedToken =
                currencies.INPUT == e || currencies.OUTPUT == e;

              return (
                <div
                  key={indx}
                  className={`mb-4 ${
                    isMatchedToken ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <button onClick={() => Addtoken(e)}>
                    <Tokenline data={e} />
                  </button>
                </div>
              );
            })}
          </InfiniteScroll>
        </div> */}
      </div>
    </Modal>
  );
};
