import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { faqs_data } from "@/config";

type Props = {};

function FAQ({}: Props) {
  return (
    <div id="FaQs" className="py-16 md:py-20 stopscrollpadding relative">
            <img
        src="/vector/2.png"
        className="absolute left-0 top-[-20%] opacity-30 z-0"
      />
      <img
        src="/vector/2.png"
        className="absolute right-0 top-[-20%] rotate-180	  opacity-30 z-0"
      />
      {/* <img src="/layer/Vector152.png" className="absolute bottom-[0%] left-[-15%]  max-w-[785px] max-h-[414px]"></img> */}

      <div className="max-w-[857px] mx-auto ">
        <div className="space-y-5">
          <div className="header-small_banner w-fit mx-auto my-10">FAQ</div>
          <h2 className="text-center text-white text-2xl md:text-3xl font-Ruberoid  font-bold !capitalize leading-8">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="pt-10 px-3 z-10 relative transition-all submanu-collapse-box ">
          {faqs_data &&
            faqs_data.map((e, indx: any) => {
              return (
                <Disclosure key={indx}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`flex border-t ${
                          open
                            ? "text-teal-300 border-teal-300"
                            : "border-zinc-500"
                        }  w-full justify-between slimeborder submanu-collapse-box service-card_wrapper  my-4 rounded-2xl font-Ruberoid   px-6 py-8 text-left text-sm md:text-xl font-medium   focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
                      >
                        <span
                          className={`font-normal w-[80%] text-sm! font-Ruberoid 
                          ${open ? "text-yellow-500 " : "text-white"}`}
                        >
                          {e.question}
                        </span>

                        <ChevronUpIcon
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-5 w-5 text-white font-bold   `}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 transition-all  pt-4 pb-6 text-sm md:text-xl text-zinc-100">
                        <h2 className="pb-5 font-['Manjari']" key={indx}>
                          {e.answer}
                        </h2>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
