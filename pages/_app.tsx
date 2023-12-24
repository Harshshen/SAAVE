import "../styles/globals.css";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/context/auth";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "@/components/Navbar";

const { chains, provider, webSocketProvider } = configureChains(
  [
    polygon,
    // // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
    // //   ? [polygonMumbai]
    // //   : []),
  ],
  [
    alchemyProvider({
      apiKey:
        process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ||
        "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Saave Finance",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains}>
        <AuthProvider>
          <Navbar />
          <Component {...pageProps} />
        </AuthProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});

// export default MyApp;
