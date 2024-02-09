import React from "react";
import { AppLayout } from "../components";
import { FRUIT_ADDRESS } from "../addresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import { NFT } from "../components";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

const Shop = () => {
  const nftVariant = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };
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
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
        {fruitNFTs?.map((nft, index) => (
          <NFT key={index} nft={nft} />
        ))}
      </div>
    </AppLayout>
  );
};

export default Shop;
