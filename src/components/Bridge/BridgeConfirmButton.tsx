"use client";

import { type ChainId, EIDS } from "@/constants";
import type React from "react";
import {
	type Address,
	erc20ABI,
	useAccount,
	useBalance,
	useContractRead,
	useNetwork,
	usePublicClient,
	useSwitchNetwork,
	useWalletClient,
} from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { AGA_BRIDGE_ADDR, AGA_TOKEN_ADDR } from "@/constants/address";
import { toast } from "react-toastify";
import { isAddress, padHex, parseEther, parseUnits } from "viem";
import BridgeABI from "@/contracts/BridgeABI";
import { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

interface BridgeConfirmButtonProps {
	chainId0: ChainId;
	chainId1: ChainId;
	amount: string;
	recipient?: string;
}

const BridgeConfirmButton: React.FC<BridgeConfirmButtonProps> = ({
	chainId0,
	amount,
	chainId1,
	recipient,
}) => {
	const { address } = useAccount();
	const { chain } = useNetwork();
	const publicClient = usePublicClient();
	const { data: walletClient } = useWalletClient();
	const { open } = useWeb3Modal();
	const { switchNetworkAsync } = useSwitchNetwork();
	const [loading, setLoading] = useState(false);

	const { data: balance } = useBalance({
		address,
		chainId: chainId0,
		token: AGA_TOKEN_ADDR[chainId0],
		watch: true,
	});

	const onConfirm = async () => {
		if (!address || !publicClient || !walletClient) {
			open?.();
		} else if (chain?.id !== chainId0) {
			await switchNetworkAsync?.(chainId0);
		} else {
			if (Number.isNaN(Number(amount)) || Number(amount) <= 0) {
				toast.error("Invalid bridge amount");
				return;
			}
			if (Number(balance?.formatted ?? "0") < Number(amount)) {
				toast.error("Insufficient balance");
				return;
			}
			if (!recipient || !isAddress(recipient ?? "")) {
				toast.error("Invalid recipient address");
				return;
			}
			setLoading(true);
			try {
				const allowance = await publicClient.readContract({
					abi: erc20ABI,
					address: AGA_TOKEN_ADDR[chainId0],
					functionName: "allowance",
					args: [address, AGA_BRIDGE_ADDR[chainId0]],
				});

				const parsedAmount = parseUnits(amount, 18);

				if (allowance < parsedAmount) {
					const { request: approveRequest } =
						await publicClient.simulateContract({
							account: address,
							abi: erc20ABI,
							address: AGA_TOKEN_ADDR[chainId0],
							functionName: "approve",
							args: [AGA_BRIDGE_ADDR[chainId0], parsedAmount],
						});

					const approveHash = await walletClient.writeContract(approveRequest);

					const approveRes = await publicClient.waitForTransactionReceipt({
						hash: approveHash,
					});
				}

				const params = {
					amountLD: parsedAmount,
					minAmountLD: (parsedAmount / 1000000000000n) * 1000000000000n,
					dstEid: EIDS[chainId1],
					to: padHex(recipient as Address, {
						dir: "left",
					}) as `0x${string}`,
					extraOptions:
						"0x0003010011010000000000000000000000000000ea60" as `0x${string}`,
					composeMsg: "0x" as `0x${string}`,
					oftCmd: "0x" as `0x${string}`,
				};

				const quote = await publicClient.readContract({
					abi: BridgeABI,
					address: AGA_BRIDGE_ADDR[chainId0],
					functionName: "quoteSend",
					args: [params, false],
				});

				const { request } = await publicClient.simulateContract({
					account: address,
					abi: BridgeABI,
					address: AGA_BRIDGE_ADDR[chainId0],
					functionName: "send",
					args: [params, quote, address],
					value: quote.nativeFee,
				});

				const hash = await walletClient.writeContract(request);

				const res = await publicClient.waitForTransactionReceipt({ hash });

				console.log(res);

				toast.success(
					"Your transaction has been submitted successfully. Please wait a few minutes for confirmation.",
				);
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<button
			type="button"
			className="flex justify-center items-center w-full h-[56px] rounded-2xl font-bold text-xl text-[#FDFDFD] bg-[linear-gradient(rgba(134,230,163,.4),rgba(50,192,218,.4)),linear-gradient(90deg,rgba(134,230,163,.4),rgba(50,192,218,.4))] disabled:opacity-75"
			onClick={onConfirm}
			disabled={loading}
		>
			{!address ? (
				"Connect Wallet"
			) : chain?.id !== chainId0 ? (
				"Switch Network"
			) : loading ? (
				<ScaleLoader
					height={20}
					loading={loading}
					color="#ffffff"
					className="text-white"
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			) : (
				"Bridge"
			)}
		</button>
	);
};

export default BridgeConfirmButton;
