import { useAppSelector, useAppdispatch } from "../hooks/redux";
import { useEffect } from "react";
import Nav from "@/components/Header/Header";

import GoToTop from "@/components/Gtop/GoToTop";
import { useAccount } from "wagmi";
import { setNetwork } from "@/store/walletSlice";
import { useNetwork, useSwitchNetwork } from "wagmi";
import Fotter from "@/components/Fotter/Fotter";
import AOS from "aos";
import "aos/dist/aos.css";

const Layout = (props: any) => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-sine",
      // delay: 100,
    });
  }, []);

  return (
    <div className="bg-gray  mx-auto  ">
       <Nav /> 

      {/* <div className="h-screen mx-auto max-w-[700px] text-2xl text-center font-Ruberoid font-bold px-3 text-white flex justify-center items-center">
        {" "}
        <h1 className="textShine">
   {`       Exciting news! Our new website is almost here. Stay tuned for updates
          and get ready to explore something amazing. In the meantime, enjoy a
          sneak peek at what's to come.`}
        </h1>
      </div> */}

     {props.children}
      <GoToTop />
    <Fotter /> 
    </div>
  );
};

export default Layout;
