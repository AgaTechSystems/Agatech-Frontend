import { Address } from "viem"
import { ChainId } from "./chain"

export const AGA_TOKEN_ADDR: { [chain in ChainId]: Address } = {
  [ChainId.BSC]: "0xb427e47e8fDD678278d2A91EEaC014ffcDDaF029",
  // [ChainId.ETHEREUM]: "0xb427e47e8fDD678278d2A91EEaC014ffcDDaF029",
  [ChainId.ARBITRUM]: "0x2fA82A27902195Add27850A291F6571ce9047fad",
  [ChainId.BASE]: "0x45aAB2f68c70A75f21BCB77b5893F913bBEd696F",
}

export const AGA_BRIDGE_ADDR: { [chain in ChainId]: Address } = {
  [ChainId.BSC]: "0x76Be34f0Eb70088c2D6890a78758bcc4e1C8553a",
  // [ChainId.ETHEREUM]: "0xb427e47e8fDD678278d2A91EEaC014ffcDDaF029",
  [ChainId.ARBITRUM]: "0x2fA82A27902195Add27850A291F6571ce9047fad",
  [ChainId.BASE]: "0x45aAB2f68c70A75f21BCB77b5893F913bBEd696F",
}
