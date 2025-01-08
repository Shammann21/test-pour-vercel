// Rainbow and Wagmi integration guide: https://billyjitsu.hashnode.dev/the-rainbowkit-wagmi-guide-i-wish-i-had

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { base, baseSepolia } from 'viem/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;
if (!alchemyId) {
  throw new Error('NEXT_PUBLIC_ALCHEMY_ID is not defined');
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [base],
  [
    alchemyProvider({ apiKey: alchemyId }),
    publicProvider()
  ]
);
//const baseChain = {
//  ...base,
//  rpcUrls: {
//    ...base.rpcUrls,
//    default: {
//      http: ['https://mainnet.base.org'],
//      },
//    public: {
//      http: ['https://mainnet.base.org'],
//    },
//  },
//};
const { connectors } = getDefaultWallets({
  appName: 'AFA ICO',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} initialChain={base}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
