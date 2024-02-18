import React from "react";
import { AppLayout } from "../components";
import { FRUIT_ADDRESS } from "../addresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import { NFT } from "../components";
import Image from "next/image";

const Shop = () => {
  const { data: fruitContract } = useContract(FRUIT_ADDRESS);
  const { data: fruitNFTs, isLoading } = useNFTs(fruitContract);
  if (isLoading)
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-[100%]">
          <Image src="/loader.svg" alt="Loading" width={100} height={100} />
        </div>
      </AppLayout>
    );
  return (
    <AppLayout>
      <button>
        <a
          href="https://pancakeswap.finance/swap?outputCurrency=0xc292A5A91f3296b8F081B0f2B1404401Ca4300D2&chain=bsc"
          target="_blank"
          className="font-bold font-mono bg-yellow-500 px-4 py-2 my-2 rounded-lg hover:opacity-80 transition-all duration-300"
        >
          BUY $FRUIT ON PANCAKESWAP
        </a>
      </button>
      <div className="flex flex-wrap gap-8 justify-center mt-5">
        {fruitNFTs?.map((nft, index) => (
          <NFT key={index} nft={nft} />
        ))}
      </div>
    </AppLayout>
  );
};

export default Shop;
