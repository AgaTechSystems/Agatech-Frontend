import React from "react";
import { Team_data } from "@/config";
import Teamdata from "./Helper/Teamdata";
type Props = {};

function Team({}: Props) {
  return (
    <div className="sectionPadding py-16 md:py-20 relative">
 

      <img src="/vector/1.png" className="absolute left-[30%] top-[-10%] opacity-50" />

  

      <div className="space-y-3">
        {/* <h2 className="text-center text-white text-2xl md:text-3xl font-Ruberoid  font-bold  uppercase">
         Team
        </h2> */}
        <div className="header-small_banner w-fit mx-auto my-10 uppercase">Team</div>
        <p className="text-center text-white text-base font-normal font-['Ruberoid'] leading-normal">
        Meet the People Behind Our Success
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 mx-auto gap-10 md:gap-14 py-12 max-w-7xl">
        {Team_data.map((e, indx) => {
          return <Teamdata data={e} key={indx} />;
        })}
      </div>
    </div>
  );
}

export default Team;
