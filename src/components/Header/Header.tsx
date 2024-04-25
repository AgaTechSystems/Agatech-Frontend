import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect, FC, useRef } from "react"; // Import useState
import NavLinks from "./NavLinks";
import Image from "next/image";
import axios from "axios";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

const Nav = () => {
  const router = useRouter();
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);

  const submenuRef: any = useRef(null);

  // Toggle function for mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuVisible(!isMobileMenuVisible);
  };

  useEffect(() => {
    if (isMobileMenuVisible) {
      const height = submenuRef.current.scrollHeight;
      submenuRef.current.style.height = `${height}px`;
    } else {
      submenuRef.current.style.height = "0px";
    }
  }, [isMobileMenuVisible]);

  const [Priceloading, setPriceloading] = useState(false);
  const [price, setprice] = useState(0);
  // gettig  data

  const Updater = async () => {
    try {
      setPriceloading(true);
      const res = await axios.get("/api/Tokeninfo");
      const maindata = res.data.data;
      setprice(maindata.price);

      setPriceloading(false);
    } catch {
      setPriceloading(false);
    }
  };

  useEffect(() => {
    Updater();
  }, []);

  return (
    <header>
      <div className="fixed top-6 w-full px-4 z-50">
        <div
          // id="submanu-collapse-box"
          className="mx-auto max-w-screen-xl px-6 py-4 md:py-2 md:flex md:flex-row md:justify-between   bg-zinc-950/30 backdrop-blur-md border-2 border-zinc-800 rounded-2xl shadow-xl "
        >
          <div className=" justify-between flex flex-shrink-0 items-center lg:h-auto w-full md:max-w-[200px]">
            {" "}
            <Link
              href="/"
              className="font-Ruberoid font-bold text-2xl flex flex-row items-center gap-3 text-white relative"
            >
              <Image src="/logo.png" width={150} height={150} alt="logo" />
              {!Priceloading && (
                <div
                  id="menuBarPriceLbl"
                  className="absolute right-[-10px] text-[12px] top-[-6px] font-Ruberoid text-green"
                >
                  {price.toFixed(4)}
                </div>
              )}
              {/* <h1 className="logo mt-2">GATECH</h1> */}
            </Link>
            {isMobileMenuVisible ? (
              <XMarkIcon
                className="md:hidden w-8 h-8 text-white cursor-pointer duration-300 ease-in-out transition-opacity "
                onClick={toggleMobileMenu} // Attach toggle function here
              />
            ) : (
              <Bars3Icon
                className="md:hidden w-8 h-8 text-white cursor-pointer duration-300 ease-in-out transition-opacity "
                onClick={toggleMobileMenu} // Attach toggle function here
              />
            )}
          </div>

          <div
            ref={submenuRef}
            id="submanu-collapse-box"
            className={` md:hidden w-full  overflow-hidden  ${
              isMobileMenuVisible ? "relative  " : ""
            } `}
          >
            <div className="block md:hidden px-6 py-4">
              <NavLinks />
            </div>

            <div className="pt-2 pb-2 flex justify-center space-x-4 mt-3"></div>
          </div>

          <div className="hidden md:flex md:gap-5">
            <NavLinks />
          </div>

          {/* <div className="flex items-center space-x-4 max-md:hidden">
            <div className="lg:ml-auto ">
              <a
                className="group text-white border-[1px] border-[#4d4d4d] inline-flex font-heading tracking-wide uppercase no-underline items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  px-3 w-full py-4 lg:py-2"
                href="/#start-building"
              >
                Start building
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Nav;
