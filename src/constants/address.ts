import { Address } from "viem"
import { ChainId } from "./chain"

export const AGA_TOKEN_ADDR: { [chain in ChainId]: Address } = {
  [ChainId.BSC]: "0xb427e47e8fDD678278d2A91EEaC014ffcDDaF029",
  // [ChainId.ETHEREUM]: "0xb427e47e8fDD678278d2A91EEaC014ffcDDaF029",
  [ChainId.ARBITRUM]: "0xDa315aAD0c080B40A3859b0b039FEC4f28b56797",
  [ChainId.BASE]: "0x45aAB2f68c70A75f21BCB77b5893F913bBEd696F",
}

export const AGA_BRIDGE_ADDR: { [chain in ChainId]: Address } = {
  [ChainId.BSC]: "0x76Be34f0Eb70088c2D6890a78758bcc4e1C8553a",
  // [ChainId.ETHEREUM]: "0xb427e47e8fDD678278d2A91EEaC014ffcDDaF029",
  [ChainId.ARBITRUM]: "0xDa315aAD0c080B40A3859b0b039FEC4f28b56797",
  [ChainId.BASE]: "0x45aAB2f68c70A75f21BCB77b5893F913bBEd696F",
}
