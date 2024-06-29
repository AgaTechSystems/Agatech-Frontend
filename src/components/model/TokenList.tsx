import Popup from "reactjs-popup";
import React, { FC, ReactNode, useEffect, useState ,useMemo} from "react";
import { CalculatorIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ScaleLoader from "react-spinners/ScaleLoader";
import TokenSearch from "./Helper/tokenlist/TokenSearch";
import { Token, Currency } from "@pancakeswap/sdk";

import InfiniteScroll from "react-infinite-scroll-component";
import Tokenline from "./Helper/tokenlist/Tokenline";
import { Field, TOKEN } from "../../../typeing";
import Modal from "react-modal";
import { Content, Overlay } from "./Helper/modeconfig";
import { useDebounce } from "@/hooks/useDebounce";
import Tokensearch from "../Loading/Tokeserch/Tokensearch";
import { TokenListLocal } from "@/config/swap";
import useUpdateCurrencies from "../../hooks/swap/useUpdateCurrencies";
import NetworkSelector from "../networkSelector/network";
interface ModalProps {
  open: boolean;
  onClose: () => void;
  modelType: Field;
  chainID: any;
}

export const TokenList: FC<ModalProps> = ({
  open,
  onClose,
  modelType,
  chainID,
}) => {
  

  const [searchQuery, setSearchQuery] = useState("");
  const debounceData = useDebounce(searchQuery);

  const [filteredTokens, setFilteredTokens] = useState([]);


  const customTokens = useMemo(() => {
    const customTokens = TokenListLocal[chainID]?.tokens.map((tokenInfo: any) => {
      const { address, decimals, symbol, name, chainId, logoURI } = tokenInfo;
      return {
        ...tokenInfo,
      };
    });
    setFilteredTokens(customTokens)

    return customTokens;
  }, [chainID]);


  const {
    updateInputCurrency,
    currencies,
    updateOutputCurrency,
    closeTokenListModel,
    tokenState,
    SearchERC20Token,
  } = useUpdateCurrencies(56);

  useEffect(() => {
    if (searchQuery != "") {
      SearchERC20Token(debounceData);
    }
  }, [debounceData,chainID]);







  const handleSearchChange = (event: any) => {
    const query = event.target.value.toLowerCase();
    // Update the search query state
    setSearchQuery(query);

    // Filter tokens based on the search query
    const filtered = customTokens.filter((token: any) => {
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
      className="bg-transparent transition-all duration-300 z-[100] "
      onRequestClose={onClose}
      style={{
        overlay: Overlay,
        content: Content,
      }}
    >
      <div className="bg-[rgb(19, 19, 19)]  w-[90vw] md:w-[450px] mx-auto pb-5 z-[100] relative  transition-all duration-300">
        <div className="flex flex-row  justify-between  px-4 py-4 ">
          <div className="text-lg text-white font-semibold">Select a token</div>

          <div className="relative  h-fit">
            <XMarkIcon
              onClick={onClose}
              className="text-white hover:text-gray-500 font-semibold  cursor-pointer relative hover:opacity-50"
              width={22}
              height={22}
            />
          </div>
        </div>
        <div className="flex flex-row items-center w-full justify-between px-3  gap-3">
          <TokenSearch value={searchQuery} handleChange={handleSearchChange} />
          <NetworkSelector isbuttonBg={true} />
        </div>

        <div
          className="flex flex-col overflow-y-scroll pt-5 h-[50vh]"
          id="scrollableDiv"
        >
          <InfiniteScroll
            dataLength={
              (tokenState?.balance?.length || 0) +
              filteredTokens?.length +
              (tokenState?.searchToken?.length || 0)
            } // This is important field to render the next data
            loader={<h4>Loading...</h4>}
            hasMore={false}
            className="flex flex-col"
            next={() => {}}
            scrollableTarget="scrollableDiv"
          >
            {tokenState?.loading === "pending" ? (
              <Tokensearch />
            ) : (
              <>
                {tokenState?.searchToken?.length > 0 && searchQuery !== "" && (
                  <div className="px-3 text-white opacity-70 pb-3 text-sm">
                    Results{" "}
                  </div>
                )}

                {tokenState?.searchToken?.length > 0 &&
                  searchQuery !== "" &&
                  tokenState?.searchToken?.map((e: any, indx: any) => {
                    const isMatchedToken =
                      currencies.INPUT === e || currencies.OUTPUT === e;

                    return (
                      <div
                        key={indx}
                        className={` ${
                          isMatchedToken ? "opacity-50 pointer-events-none" : ""
                        }`}
                      >
                        <button
                          onClick={() => {
                            if (!isMatchedToken) {
                              Addtoken(e);
                            }
                          }}
                          className="w-full"
                        >
                          <Tokenline data={e} chainID={chainID} />
                        </button>
                      </div>
                    );
                  })}
                {tokenState?.balance?.length > 0 && (
                  <div className="px-3  text-white opacity-70 pb-3 text-sm">
                    My Tokens
                  </div>
                )}
                {tokenState?.balance?.length > 0 &&
                  tokenState?.balance?.map((e: any, indx: any) => {
                    const isMatchedToken =
                      currencies.INPUT === e || currencies.OUTPUT === e;

                    return (
                      <div
                        key={indx}
                        className={` ${
                          isMatchedToken ? "opacity-50 pointer-events-none" : ""
                        }`}
                      >
                        <button
                          onClick={() => {
                            if (!isMatchedToken) {
                              Addtoken(e);
                            }
                          }}
                          className="w-full"
                        >
                          <Tokenline data={e} chainID={chainID} />
                        </button>
                      </div>
                    );
                  })}
                <div className="px-3 pt-3 text-white opacity-70 pb-3 text-sm">
                  Tokens
                </div>
                {filteredTokens.map((e: any, indx: any) => {
                  const isMatchedToken =
                    currencies.INPUT === e || currencies.OUTPUT === e;

                  return (
                    <div
                      key={indx}
                      className={` ${
                        isMatchedToken ? "opacity-50 pointer-events-none" : ""
                      } w-full`}
                    >
                      <button onClick={() => Addtoken(e)} className="w-full">
                        <Tokenline data={e} chainID={chainID} />
                      </button>
                    </div>
                  );
                })}
              </>
            )}
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
