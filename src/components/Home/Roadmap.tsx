import React,{useRef} from "react";
import { Roadmap_data } from "@/config";
import Roadmapbox from "./Helper/Roadmapbox";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination ,Navigation,Autoplay} from "swiper/modules";
import { useMediaQuery } from "react-responsive";




type Props = {};

function Roadmap({}: Props) {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 900px)'
  })

  const isTab = useMediaQuery({
    query: '(min-width: 768px)'
  });

  const isPhone = useMediaQuery({
    query: '(max-width: 768px)'
  })


  // className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto py-10"
  return (
    <div className="py-20 bg-black sectionPadding relative " id="Roadmap">
      <img
        src="/vector/2.png"
        className="absolute left-0 top-[-20%] opacity-30"
      />
      <img
        src="/vector/2.png"
        className="absolute right-0 top-[-20%] rotate-180	  opacity-30"
      />

      <div className="space-y-3">
        <h2 className="text-center text-white text-2xl md:text-3xl font-Ruberoid  font-bold  uppercase">
          ROADMAP
        </h2>
        <p className="text-center text-white text-base font-normal font-['Ruberoid'] leading-normal">
          Empower forenic investigators with ingenious tools to detect and
          explore crypto-enabled crimes.
        </p>
      </div>

      <div className="md:px-6 pt-10 max-w-7xl mx-auto">
        <Swiper
          slidesPerView={isDesktopOrLaptop ? 2 :1}
          spaceBetween={50}
          pagination={{
            clickable: true,
          }}
          navigation={true}
        
          autoHeight={isPhone ? true:false}
          modules={[Pagination,Autoplay]}
          className="mySwiper"
      
        
        >
          {Roadmap_data.map((e, indx) => {
            return (
              <SwiperSlide key={indx} className=" !h-auto cursor-pointer">
                <Roadmapbox e={e} key={indx} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>



     


    </div>
  );
}

export default Roadmap;
