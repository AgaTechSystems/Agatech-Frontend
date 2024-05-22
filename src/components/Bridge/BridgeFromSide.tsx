import Image from "next/image";
import NetworkSelector from "./NetworkSelector";
// biome-ignore lint/style/useImportType: <explanation>
import { ChainId } from "@/constants";
import { Address, useAccount, useBalance } from "wagmi";
import { AGA_TOKEN_ADDR } from "@/constants/address";

interface BridgeFromSideProps {
	chainId: ChainId;
	setChainId: any;
	amount: string;
	setAmount: any;
}

const BridgeFromSide: React.FC<BridgeFromSideProps> = ({
	chainId,
	setChainId,
	amount,
	setAmount,
}) => {
	const { address } = useAccount();
	const { data: balance } = useBalance({
		address,
		chainId,
		token: AGA_TOKEN_ADDR[chainId],
		watch: true,
	});

	const onMax = () => {
		setAmount(balance?.formatted);
	};

	return (
		<div className="w-full z-[2]">
			<h6 className="text-[#7E7E7F] text-sm font-bold">Transfer from</h6>
			<div className="bg-[#1C1D1E] rounded-2xl mt-2">
				<div className="flex flex-col sm:flex-row justify-between items-center border-b border-[#292929] px-3.5 py-2.5">
					<NetworkSelector chain={chainId} setChain={setChainId} />
					<div className="flex flex-row sm:flex-col items-end w-full sm:w-fit justify-between mt-2 sm:mt-0">
						<span className="text-[#8B8991] font-bold">Balance</span>
						<span className="text-[#BCBCBC] text-sm font-bold">
							{Number(balance?.formatted ?? 0).toLocaleString("en-US", {
								maximumFractionDigits: 2,
							})}
						</span>
					</div>
				</div>
				<div className="flex">
					<div className="relative">
						<input
							type="number"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							placeholder="0"
							className="bg-transparent text-3xl font-bold h-full outline-none pl-4 pr-16 w-full placeholder:text-[#BCBCBC] text-[#FDFDFD] [&::-webkit-inner-spin-button]:hidden"
						/>
						<button
							type="button"
							className="absolute top-1/2 -translate-y-1/2 right-2 text-[#FDFDFD] text-sm py-1.5 px-2 rounded-lg bg-[#292929]"
							onClick={onMax}
						>
							MAX
						</button>
					</div>
					<div className="flex items-center min-w-[120px] border-l border-[#292929] py-4 px-2">
						<Image
							src={"/logo.webp"}
							width={32}
							height={32}
							alt="logo"
							className="w-8 h-8 rounded-full"
						/>
						<span className="text-[#BCBCBC] font-bold ml-2">AGATA</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BridgeFromSide;
