"use client";

import { Button } from "@/components/ui/Button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type Address } from "viem";
import { useAccount, useSignMessage } from "wagmi";
import { claimAccess } from "../actions/claimAccess";

const TOKEN_TO_PROVE_OWNERSHIP = process.env
  .NEXT_PUBLIC_TOKEN_TO_PROVE_OWNERSHIP as Address;

export default function Auth() {
  const router = useRouter();
  const { address, chain } = useAccount();
  const [error, setError] = useState<string | null>(null);

  const { signMessageAsync } = useSignMessage();

  const proofOwnership = async (event: unknown): Promise<void> => {
    if (!address || !chain) {
      return;
    }

    const message = `I own the token with address ${TOKEN_TO_PROVE_OWNERSHIP} on ${chain.name}`;

    try {
      const signature = await signMessageAsync({ message });

      const token = await claimAccess({
        tokenAddress: TOKEN_TO_PROVE_OWNERSHIP,
        signature,
        ownerAddress: address,
        network: chain.name,
      });

      if (token) {
        router.push("/restricted");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-y-6 h-[60vh] items-center justify-center">
      <h1>
        You need to confirm ownership of the token to access that content.
      </h1>
      {address ? (
        <Button onClick={proofOwnership}>Proof ownership</Button>
      ) : (
        <ConnectButton />
      )}
      {error && <p className="text-red-500 font-semibold">{error}</p>}
    </div>
  );
}
