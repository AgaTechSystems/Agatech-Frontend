import { useAccount, useSwitchChain } from "wagmi";
import { useAppSelector, useAppdispatch } from "./redux";
import { setNetwork } from "@/store/reducer/walletslice";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SUPPORTED_NETWORK, defaultChain } from "@/config/swap";

const useNetwork = () => {
  const dispatch = useAppdispatch();
  const { chainId, account } = useAppSelector((state) => state.wallet);
  const { chainId: CorechainID } = useAccount();

  const pathname = usePathname();

  const { switchChainAsync } = useSwitchChain();

  const switchNetwork = async (chainId: number) => {
    if (pathname == "/swap") {
      const isSupportedNetwork = SUPPORTED_NETWORK.includes(chainId);
      // if user connected ...
      if (isSupportedNetwork) {
        switchChainAsync?.({ chainId }).then(() => {
          dispatch(
            setNetwork({
              chainId,
            })
          );
        });
      }else{
        
      }
    } else {  
      await switchChainAsync?.({ chainId });
      dispatch(
        setNetwork({
          chainId,
        })
      );
    }
  };

  useEffect(() => {
    if (pathname == "/swap") {
    
      const isSupportedNetwork = CorechainID
        ? SUPPORTED_NETWORK.includes(CorechainID)
        : false;
      if (!isSupportedNetwork) {
        console.log("no chain");
        
        dispatch(
          setNetwork({
            chainId:defaultChain,
          })
        );
      }
    } else {
      dispatch(
        setNetwork({
            chainId:CorechainID,
        })
      );
    }
  }, [pathname, CorechainID]);

  useEffect(()=>{
console.log(chainId,"chainId");

  },[chainId])

  //   const isSupportedNetwork = useMemo(() => {
  //     return chain?.id ? SUPPORTED_NETWORK.includes(chain?.id) : false;
  //   }, [chain?.id]);

  return {
    switchNetwork,
    chainId,
    CorechainID
  };
};

export default useNetwork;
