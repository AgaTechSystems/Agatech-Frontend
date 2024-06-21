
type Props = {
  h:string
};

function SkeletonLoad({h}:Props) {
    return (
      <div
        role="status"
        className="space-y-8 flex-end animate-pulse md:space-y-0 md:space-x-8 md:flex items-center max-w-[200px]  w-[100%] h-[16px]"
        style={{
          height:`${h}px`
        }}
      >
        <div className="w-full">
          <div className="h-[16px]  rounded-[5px] bg-skeleton-gray w-full "></div>
        </div>
      </div>
    );
  }

export default   SkeletonLoad;