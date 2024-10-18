# ERC20 Token-Based Access Control Boilerplate

It's an example of an ERC20 token-based access control system, providing a flexible way to restrict access to digital resources using Ethereum tokens.

## Demo

Check out the live demo at: [token-based-access.vercel.app](https://token-based-access.vercel.app)

## Features

- 🔐 **ERC20 Token Access Control**: Users must hold a specific ERC20 token to unlock content.
- 🍪 **Cookie-Based Session Management**: Stores session data after verifying wallet and token balance, reducing repeated wallet requests.
- 💼 **Web3 Integration**: Powered by Wagmi and RainbowKit for smooth wallet connection.
- 🎨 **Headless UI**: Shadcn/UI components minimalistically styled with TailwindCSS for a modern look.
- 🚀 **Modern Stack**: Built on top of Next.js 14, leveraging features like React Server Components (RSC) and Server Actions with Next.js's App Router (app directory).
- 💳 **Web3 Wallet Integration**: Supports various wallets like MetaMask & WalletConnect for user convenience.

## **How It Works**

1. **ERC20 Token Verification**: When a user connects their wallet, the app checks if they hold the required ERC20 token.
2. **Cookie Session**: After verifying the proof of ownership of the required token, a cookie with a JWT token is set to persist the user's access, so they don’t need to re-verify their wallet repeatedly.

### **Token Configuration**

The token address is defined in the environment variables:

```typescript
// below is address of ChainLink Token (LINK) on Sepolia Testnet

// in your .env.local or .env file add the following:
NEXT_PUBLIC_TOKEN_TO_PROVE_OWNERSHIP =
  "0x779877A7B0D9E8603169DdbD7836e478b4624789";
```

## **File Structure**

```bash
├── pages/
│ ├── auth.tsx # Authentication page for signing a messsage proving token ownership
│ ├── restricted.tsx # Restricted content page gated by the token ownership
│ └── index.tsx # Home page accessible to all users
├── actions/
│ └── claimAccess.ts # Server action for claiming access via token ownership
└── .env.local # Environment variables
```

## **Getting Started**

### **Prerequisites**

- node installed
- npm | yarn | pnpm installed
- MetaMask or WalletConnect for testing

### **Installation**

1. Clone the repository:

```bash
git clone https://github.com/21142/token-based-access.git
cd token-based-access
```

2. Install dependencies:

```bash
npm install (or yarn/pnpm)
```

3. Create a `.env.local` file in the root directory and add the following:

```typescript
SECRET_KEY=<jwt_secret_key>
NEXT_PUBLIC_TOKEN_TO_PROVE_OWNERSHIP=<proof_ownership_token_address>
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=<wallet_connect_project_id>

NEXT_PUBLIC_ENABLE_TESTNETS=true // Optional: Enable testnets
```

4. Starting the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to access the application.

<br />

This is a [RainbowKit](https://rainbowkit.com) + [wagmi](https://wagmi.sh) + [Next.js](https://nextjs.org/) project bootstrapped with [`create-rainbowkit`](/packages/create-rainbowkit).
