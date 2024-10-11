"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Button } from "./components/ui/Button";

export default function Page() {
  const router = useRouter();
  const { address } = useAccount();
  return (
    <div className="flex flex-col text-lg gap-y-5 h-[60vh] items-center justify-center">
      <h1>This page is available for everyone.</h1>
      <p>Confirm ownership of the token to access the secret page.</p>
      {!address ? (
        <ConnectButton />
      ) : (
        <Button onClick={() => router.push("/restricted")}>
          Go to restricted page
        </Button>
      )}
    </div>
  );
}
