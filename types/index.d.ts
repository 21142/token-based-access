import type { Address, ByteArray, Hex, Signature } from "viem";

export type Claim = {
  tokenAddress: Address;
  signature?: Hex | ByteArray | Signature | undefined;
  ownerAddress: Address;
  network: string;
};
