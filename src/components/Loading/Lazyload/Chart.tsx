import React from 'react'

type Props = {
    title:string
}

function Chartload({title}: Props) {
  return (

<div role="status" className="max-w-[1000px] animate-pulse p-10 bg-white dark:bg-darkbg rounded-2xl mb-5 ">
<h1 className="text-sm md:text-2xl font-semibold py-3 mb-3">{title}</h1>
    <div className="h-2.5 bg-[#9d9d9d] rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div className="h-2 bg-[#9d9d9d] rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
    <div className="h-2 bg-[#9d9d9d] rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-[#9d9d9d] rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
    <div className="h-2 bg-[#9d9d9d] rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
    <div className="h-2 bg-[#9d9d9d] rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    <span className="sr-only">Loading...</span>
</div>

  )
}

export default Chartload