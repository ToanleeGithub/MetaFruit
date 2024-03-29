import { ThirdwebProvider, metamaskWallet, walletConnect } from "@thirdweb-dev/react";
import Head from "next/head";
import "../styles/globals.css";
import { Binance, Mumbai } from "@thirdweb-dev/chains";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "mumbai";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={Binance}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      supportedWallets={[metamaskWallet(), walletConnect()]}
    >
      <Head>
        <title>Meta Fruit</title>
        <link rel="icon" href="/orange.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
