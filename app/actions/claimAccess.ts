"use server";

import { importJWK, SignJWT } from "jose";
import { cookies } from "next/headers";
import { createPublicClient, erc20Abi, http, verifyMessage } from "viem";
import { sepolia } from "viem/chains";
import { type Claim } from "../../types";

async function generateJWT(data: Claim): Promise<string> {
  const secretKey = await importJWK(
    { kty: "oct", k: process.env.SECRET_KEY },
    "HS256"
  );
  const jwt = await new SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secretKey);

  return jwt;
}

export async function claimAccess(data: Claim): Promise<string | undefined> {
  if (!data.signature) {
    throw new Error("No signature provided");
  }

  const valid = await verifyMessage({
    address: data.ownerAddress,
    message: `I own the token with address ${data.tokenAddress} on ${data.network}`,
    signature: data.signature,
  });

  if (!valid) {
    throw new Error("Invalid signature");
  }

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const balanceOf = await publicClient.readContract({
    address: data.tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [data.ownerAddress],
  });

  if (balanceOf === BigInt(0)) {
    throw new Error("You do not own such token!");
  }

  const jwtToken = await generateJWT({
    tokenAddress: data.tokenAddress,
    ownerAddress: data.ownerAddress,
    network: data.network,
  });

  cookies().set({
    name: "tokenOwnership",
    value: jwtToken,
    httpOnly: true,
    path: "/",
  });

  return jwtToken;
}
