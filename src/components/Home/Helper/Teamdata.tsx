import React from "react";
import { CEOProfile } from "../../../../typeing";
import Image from "next/image";
type Props = {
  data: CEOProfile;
};

function Teamdata({ data }: Props) {
  const { name, bridge, content, network, logo } = data;
  return (
    <div className="text-white font-Ruberoid  p-5  ">
      <div className="member__img flex justify-center mx-auto py-3 ">
        <Image
          src={`/team/${logo}`}
          width={300}
          height={300}
          className="object-cover rounded-2xl mx-auto  pointer-events-none "
          alt={name}
        />
      </div>
      <h2 className="text-center font-bold pt-3 uppercase">{name}</h2>
      <p className="text-center text-sm pt-3">{bridge}</p>
      <p className="text-center text-[13px] pt-3 max-w-[300px] mx-auto opacity-75">
        {content}
      </p>

      <div className="flex flex-row items-center justify-center gap-6 py-6">
        {network.map((e,index)=>{
          return <a key={index} className=" w-[50px] hover:scale-105  transition-all  slimeborder service-card_wrapper  hover:bg-opacity-50  h-[52px] flex items-center justify-center   rounded-xl bg-opacity-10" href={e.link} target="_blank">
            <Image src={`/teamSocials/${e.name}.svg`} className='opacity-70' width={30} height={30} alt={e.name}/>
          </a>
        })}
      </div>
    </div>
  );
}

export default Teamdata;
