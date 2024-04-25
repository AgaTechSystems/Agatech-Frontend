import React, { useState } from "react";
import Link from "next/link";
import { links } from "@/config/Navlink";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
const NavLinks = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  return (
    <>
      {links.map((link, indx) => (
        <div className="submanu-collapse-box font-Ruberoid " key={indx}>
          <div className="px-3 text-left md:cursor-pointer group submanu-collapse-box ">
            <Link
            target={link.link?.type === "anchorlink" ? "_blank" : (link.submenu ? "" : "_blank")}
            href={link.submenu ? "" : link.link.url}
              className="py-4 flex justify-between items-center text-sm md:pr-0 pr-5 group text-white"
              onClick={(e) => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
                setSubHeading("");
                if(link.submenu){
                  e.preventDefault()
                }
              }}
            >
              {link.name}
              {link.submenu && (
                <span className="text-xl md:hidden inline">
                  <ChevronDownIcon
                    className={`${
                      heading === link.name
                        ? "rotate-180 transform transition-all"
                        : ""
                    } h-5 w-5 text-white font-bold`}
                  />
                </span>
              )}

              {link.submenu && (
                <span className="text-xl md:ml-2  md:block hidden group-hover:rotate-180">
                  <ChevronDownIcon
                    className={`${
                      heading === link.name
                        ? "rotate-180 transform transition-all"
                        : ""
                    } h-5 w-5 text-white font-bold`}
                  />
                </span>
              )}
            </Link>

            {link?.submenu && (
              <div>
                <div className="absolute top-10 hidden group-hover:md:block hover:md:block ">
                  <div className="py-3">
                    <div
                      className="w-4 h-4 left-3 absolute 
                    mt-1 bg-red rotate-45"
                    ></div>
                  </div>
                  <div className="bg-zinc-950/90  submanu-collapse-box px-6 backdrop-blur-md border-2 border-zinc-800 rounded-2xl shadow-xl p-5 grid grid-cols-1 gap-10">
                    {link.sublinks &&
                      link.sublinks.map((mysublinks, indx) => (
                        <div className="" key={indx}>
                          <div className=" text-white cursor-pointer ">
                            <Link
                              href={mysublinks.link}
                              className="hover:text-primary text-white"
                              // onClick={() => mysublinks.on}
                              onClick={() => {
                                if (mysublinks.onClick) {
                                  // mysublinks.onClick();
                                }
                              }}
                            >
                              {mysublinks.name}
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Mobile menus */}
          <div
            className={` 
            ${
              heading === link.name ? "md:hidden" : "hidden"
            }  submanu-collapse-box bg-[#1a1a1a] rounded-2xl
          `}
          >
            {/* sublinks */}
            {link.submenu &&
              link.sublinks?.map((slinks, indx) => (
                <div key={indx}>
                  <div>
                    <h1
                      onClick={() =>
                        subHeading !== slinks.name
                          ? setSubHeading(slinks.name)
                          : setSubHeading("")
                      }
                      className="py-4 pl-7 font-light md:pr-0 pr-5 flex justify-between items-center"
                    >
                      <Link
                        href={link.submenu ? "" :slinks.link}
                        className="hover:text-primary text-white"
                        // onClick={() => mysublinks.on}
                        onClick={() => {
                          if (slinks.onClick) {
                            //   slinks.onClick();
                          }
                        }}
                      >
                        {slinks.name}
                      </Link>
                    </h1>
                    <div
                      className={`${
                        subHeading === slinks.name ? "md:hidden" : "hidden"
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavLinks;
