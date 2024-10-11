import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata, Viewport } from "next";
import { type ReactNode } from "react";
import "../styles/globals.css";
import { AppProviders } from "./providers";

export const metadata: Metadata = {
  title: "Token Based Access",
  description:
    "Token Based Access is a decentralized application that allows you to access content after confirming ownership of an ERC20/NFT token.",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

interface RootLayoutProps {
  children: ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto">
          <AppProviders>
            <header className="px-8 z-40">
              <div className="flex h-20 items-center justify-end py-6">
                <nav>
                  <ConnectButton />
                </nav>
              </div>
            </header>
            <main>{children}</main>
          </AppProviders>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
