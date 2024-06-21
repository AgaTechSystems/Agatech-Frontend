function Tokensearch() {
  return (
    <div
      role="status"
      className="space-y-8  px-4  mb-3 flex-end  animate-pulse md:space-y-0 md:space-x-8 md:flex items-center  w-[100%] "
    >
      <div className=" space-y-3 w-[90%]  ">
        <div className="h-[13px]  rounded-[5px] bg-skeleton-gray w-full "></div>
        <div className="h-[13px]  rounded-[5px] bg-skeleton-gray w-[90%] "></div>
        <div className="h-[13px]  rounded-[5px] bg-skeleton-gray w-[70%] "></div>
        <div className="h-[13px]  rounded-[5px] bg-skeleton-gray w-[50%] "></div>{" "}
        <div className="h-[13px]  rounded-[5px] bg-skeleton-gray w-[40%] "></div>
        <div className="h-[13px]  rounded-[5px] bg-skeleton-gray w-[30%] "></div>
      </div>
    </div>
  );
}

export default Tokensearch;
