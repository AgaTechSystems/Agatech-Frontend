import React, { useEffect, useState,useRef } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
type Props = {
  e: any;
};

function Roadmapbox({ e }: Props) {
  const [data, setdata] = useState(e.data);
  const [seeAll, setseeAll] = useState(false);
  const ref: any = useRef(null);

  const handleSeeAll = () => {
    setseeAll(!seeAll);
  };

  useEffect(() => {
    if (seeAll) {
      const height = ref.current.scrollHeight;
      //ref.current.style.height = `${height}px`;
      setdata(e.data);
    } else {
      const _newdata = e.data.slice(0, 5);
      setdata(_newdata);
    }
  }, [seeAll]);

  const sw = document.getElementById(".swiper-wrapper");
console.log(sw);







  return (
    <div ref={ref}
      className={`service-card_wrapper z-10  slimeborder  transition-all  border-[1px] border-[#3d3d3d] px-4 md:px-6 py-5 rounded-xl ${
        e.active ? "" : ""
      }`}
    >
      <h1 className="font-Ruberoid text-white text-center text-2xl font-bold py-3">
        {e.name}
      </h1>

      <ul className="flex flex-col gap-3 list-disc md:px-3 mt-4">
        {e.data.map((e: any, indx: number) => {
          return (
            <li
            key={indx}
              className={`text-gray7 ${e.isDone ? "list-none" : "ml-[12px]"} text-sm`}
            >
              {e.isDone ? "✔" : ""} {e.name}
            </li>
          );
        })}

        {/* {e.data.length > 5 && (
          <button
            onClick={() => handleSeeAll()}
            className="text-white hover:underline flex flex-row items-center justify-center text-sm py-3"
          >
            {seeAll ? "close all" : "see all"}
            <ChevronDownIcon
              className={`${
                seeAll ? "rotate-180 transform transition-all" : ""
              } h-5 w-5 text-white font-bold`}
            />
          </button>
        )} */}
      </ul>
    </div>
  );
}

export default Roadmapbox;
