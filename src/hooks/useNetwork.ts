import { useAccount, useSwitchChain } from "wagmi";
import { useAppSelector, useAppdispatch } from "./redux";
import { setNetwork } from "@/store/reducer/walletslice";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SUPPORTED_NETWORK, defaultChain } from "@/config/swap";

const useNetwork = () => {
  const dispatch = useAppdispatch();
  const { chainId, account } = useAppSelector((state) => state.wallet);
  const { chainId: CorechainID,isConnected } = useAccount();

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
      if(isConnected){
        dispatch(
          setNetwork({
              chainId:CorechainID,
          })
        );
      }else{
        dispatch(
          setNetwork({
              chainId:defaultChain,
          })
        );
      }
  
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
