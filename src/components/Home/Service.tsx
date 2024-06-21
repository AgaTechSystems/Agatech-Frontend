import React from "react";
import Servicebox from "./Helper/Servicebox";
import { SERVICE_CONTENT } from "@/config";
type Props = {};

function Service({}: Props) {
  return (
    <div className="w-full   mx-auto py-24 sectionPadding relative" id="service">
    
       {/* <img src="/vector/1.png" className='absolute  left-0 top-0 opacity-50'/>   */}
  

  
       <img src="/vector/1.png" className='absolute right-0 md:right-[10%] top-[10%]  opacity-50'/>  

       <img src="/vector/1.png" className='absolute left-0 top-0 opacity-50'/>  
     
       <img src="/vector/2.png" className='absolute left-0 top-[-20%] opacity-30'/>  




      <div className="space-y-5">
      <div className="header-small_banner w-fit mx-auto my-10">SERVICES</div>
        <h2 className="text-center text-white text-2xl md:text-3xl font-Ruberoid  font-bold  uppercase">
          what we do
        </h2>
        <p className="text-center text-white text-base font-normal font-['Ruberoid'] leading-normal">
          Empower forenic investigators with ingenious tools to detect and
          explore crypto-enabled crimes.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 pt-10 max-w-7xl mx-auto relative ">

      <img src="/vector/3.png" className='absolute left-0 md:left-[20%] bottom-0 opacity-55'/>  


        {SERVICE_CONTENT.map((e, indx) => {
          return (
            <Servicebox
              key={indx}
              index={indx}
              title={e.title}
              logo={e.icon}
              dec={e.content}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Service;
