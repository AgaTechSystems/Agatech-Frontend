import React from "react";

type Props = {};

function sa({}: Props) {
  return (
    <div>
      <div className="group relative flex items-center justify-between w-full">
        <input className="truncate appearance-none dark:text-slate-50 text-gray-900 w-full  outline-none min-h-[40px] h-[40px] py-2 border-0 flex items-center px-3 rounded-lg font-medium bg-secondary group-hover:bg-muted group-focus:bg-accent rounded-r-none !border-r-0 flex-grow flex-1" />
        <div className="truncate appearance-none dark:text-slate-50 text-gray-900 w-full !ring-0 !outline-none min-h-[40px] h-[40px] py-2 border-0 flex items-center px-3 rounded-lg font-medium  bg-secondary group-hover:bg-muted group-focus:bg-accent text-muted-foreground rounded-l-none ">
          %
        </div>
      </div>
    </div>
  );
}

export default sa;
