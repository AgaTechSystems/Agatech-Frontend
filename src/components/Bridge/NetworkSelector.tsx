import { type ChainId, ChainInfo, SUPPORTED_NETWORK } from "@/constants";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import type React from "react";
import { Fragment } from "react";

interface NetworkSelectorProps {
	chain: ChainId;
	setChain: any;
	className?: string;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({
	chain,
	setChain,
	className,
}) => {
	return (
		<Menu
			as="div"
			className={`relative inline-block text-left w-full sm:w-fit z-[1] ${
				className ?? ""
			}`}
		>
			<div>
				<Menu.Button className="flex items-center justify-between w-full sm:min-w-[220px] bg-[#292929] rounded-xl outline-none pl-2 pr-4 py-1">
					<div className="flex items-center">
						<Image
							src={ChainInfo[chain].icon}
							width={40}
							height={40}
							alt={ChainInfo[chain].config.name}
							className="w-8 h-8"
						/>
						<span className="font-bold ml-2.5">
							{ChainInfo[chain].config.name}
						</span>
					</div>
					<ChevronDownIcon
						className="-mr-1 ml-2 h-5 w-5 text-[#7E7E7F]"
						aria-hidden="true"
					/>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute left-0 right-0 w-full mt-2 rounded-md bg-[#292929] outline-none py-2">
					{SUPPORTED_NETWORK.filter((item) => item !== chain).map((item) => (
						<Menu.Item
							key={item}
							as="div"
							className="flex items-center px-2 py-1 cursor-pointer hover:bg-white/5 transition-all"
							onClick={() => setChain(item)}
						>
							<Image
								src={ChainInfo[item].icon}
								width={40}
								height={40}
								alt={ChainInfo[item].config.name}
								className="w-8 h-8"
							/>
							<span className="font-bold ml-2.5">
								{ChainInfo[item].config.name}
							</span>
						</Menu.Item>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default NetworkSelector;
